import numpy as np
import math
import random


class MadingleyModel:

    def __init__(self, n_cells, cell_area, temperature, months_elapsed, bodymasses, herbivore_biomasses,
                 herbivore_abundances, carnivore_biomasses, carnivore_abundances, primary_producer_biomass):
        self.n_cells = n_cells
        self.cell_area = cell_area
        self.temperature = temperature
        self.months_elapsed = months_elapsed
        self.bodymasses = bodymasses
        self.herbivore_biomasses = herbivore_biomasses
        self.herbivore_abundances = herbivore_abundances
        self.carnivore_biomasses = carnivore_biomasses
        self.carnivore_abundances = carnivore_abundances
        self.primary_producer_biomass = primary_producer_biomass

    # noinspection PyPep8Naming,PyMethodMayBeStatic
    def HerbivoryRate(self, n, m, b):
        RateConstant = np.random.normal(loc=1.0, scale=0.01) * 1.00E-11
        HandlingTimeExponent = 0.7
        # _HerbivoryRateConstant * Math.Pow(herbivoreIndividualMass, (_HerbivoryRateMassExponent))
        return n * RateConstant * m * math.pow(b, 2) / (1 + RateConstant * m * math.pow(b, 2) * math.pow(m, HandlingTimeExponent))

    # noinspection PyPep8Naming
    def CarnivoryRate(self, n, m, window, c):
        bodymasses = self.bodymasses
        herbivore_abundances = self.herbivore_abundances
        herbivore_biomasses = self.herbivore_biomasses
        carnivore_abundances = self.carnivore_abundances
        carnivore_biomasses = self.carnivore_biomasses

        HandlingTimeScalar = 0.5
        HandlingTimeExponent = 0.7
        KillRateConstant = np.random.normal(loc=1.0, scale=0.01) * 0.000001

        # Add up all hererotroph biomass in the window: remove the current bin to avoid carnivory
        PreyAbundance = np.sum([herbivore_abundances[c][i] for i in window] + [carnivore_abundances[c][i] for i in window])

        BiomassEaten = 0

        if (PreyAbundance > 0):

            AbundanceEaten = n * KillRateConstant * m * math.pow(PreyAbundance, 2) / (1 + (
                    KillRateConstant * m * math.pow(PreyAbundance, 2) * HandlingTimeScalar * math.pow(m,
                                                                                                      HandlingTimeExponent)))

            for i in window:
                BiomassEaten += bodymasses[i] * AbundanceEaten * herbivore_abundances[c][i] / PreyAbundance
                herbivore_abundances[c][i] -= AbundanceEaten * herbivore_abundances[c][i] / PreyAbundance
                herbivore_biomasses[c][i] = herbivore_abundances[c][i] * bodymasses[i]
                if herbivore_abundances[c][i] < 0:
                    herbivore_abundances[c][i] = 0
                    herbivore_biomasses[c][i] = 0

                BiomassEaten += bodymasses[i] * AbundanceEaten * herbivore_abundances[c][i] / PreyAbundance
                carnivore_abundances[c][i] -= AbundanceEaten * carnivore_abundances[c][i] / PreyAbundance
                carnivore_biomasses[c][i] = carnivore_abundances[c][i] * bodymasses[i]
                if carnivore_abundances[c][i] < 0:
                    carnivore_abundances[c][i] = 0
                    carnivore_biomasses[c][i] = 0

        return BiomassEaten

    # noinspection PyPep8Naming
    def UpdateModelState(self, n_months, warming, lower_harvest_bodymass, harvest_effort):
        """
        :param n_months: the number of months to run the model for
        :param warming: degrees of warming or cooling throughout this time period
        :param lower_harvest_bodymass: real vector of lower bodymass of organisms targetted for harvest in each grid cell
        :param harvest_effort: real vector intensity of effort expended in harvest equivalent to the proportion of the time spent harvesting in each grid cell
        :return: two vectors of real numbers in a dictionary:
            'harvested_biomass'
            'mean_harvested_bodymass'
        """
        self.temperature += warming
        self.months_elapsed += n_months

        n_cells = self.n_cells
        cell_area = self.cell_area
        temperature = self.temperature
        bodymasses = self.bodymasses
        herbivore_abundances = self.herbivore_abundances
        herbivore_biomasses = self.herbivore_biomasses
        carnivore_abundances = self.carnivore_abundances
        carnivore_biomasses = self.carnivore_biomasses
        primary_producer_biomass = self.primary_producer_biomass

        harvested_biomass = np.zeros(n_cells)
        harvested_abundance = np.zeros(n_cells)

        for mon in range(n_months):
            # production into the system
            for c in range(len(primary_producer_biomass)):
                primary_producer_biomass[c] = np.random.normal(loc=1.0, scale=0.01) * MiamiNPP(temperature) * cell_area

                # Update herbivores
                for b in random.sample(range(len(herbivore_biomasses[c])), len(herbivore_biomasses[c])):
                    mass_eaten = self.HerbivoryRate(herbivore_abundances[c][b], bodymasses[b],
                                               0.1 * primary_producer_biomass[c])
                    mass_eaten = min(mass_eaten, primary_producer_biomass[c])
                    herbivore_biomasses[c][b] = herbivore_biomasses[c][b] + mass_eaten - (
                            30 * herbivore_abundances[c][b] * Metabolism(bodymasses[b], temperature))
                    primary_producer_biomass[c] -= mass_eaten

                    # Calculate abundance including some background mortality
                    herbivore_abundances[c][b] = (herbivore_biomasses[c][b] / bodymasses[b])
                    herbivore_abundances[c][b] = (1 - math.exp(-np.random.beta(a=1, b=2) * 30)) * \
                                                 herbivore_abundances[c][b]
                    herbivore_biomasses[c][b] = herbivore_abundances[c][b] * bodymasses[b]

                # Update Carnivores
                for b in random.sample(range(len(carnivore_biomasses[c])), len(carnivore_biomasses[c])):
                    bodymass_ratios = np.array([bodymasses[j] / bodymasses[b] for j in range(len(bodymasses))])
                    FeedingWindow = np.where((bodymass_ratios > np.random.gamma(1, 0.1)) &
                                             (bodymass_ratios < np.random.gamma(2, 0.5)))[0].tolist()
                    if b in FeedingWindow: FeedingWindow.remove(b)
                    biomass_eaten = self.CarnivoryRate(carnivore_abundances[c][b], bodymasses[b], FeedingWindow, c)
                    carnivore_biomasses[c][b] = carnivore_biomasses[c][b] + biomass_eaten - (
                            30 * carnivore_abundances[c][b] * Metabolism(bodymasses[b], temperature))
                    carnivore_abundances[c][b] = carnivore_biomasses[c][b] / bodymasses[b]
                    carnivore_abundances[c][b] = (1 - math.exp(-np.random.beta(a=1, b=2) * 30)) * \
                                                 carnivore_abundances[c][b]
                    carnivore_biomasses[c][b] = carnivore_abundances[c][b] * bodymasses[b]

                # Once updated ecology then harvest
                if (harvest_effort[c] > 0):
                    harvested_inds = np.where(bodymasses > lower_harvest_bodymass[c])[0]

                    for i in harvested_inds:
                        nharvested_h = harvest_effort[c] * herbivore_abundances[c][i]
                        harvested_abundance[c] += nharvested_h
                        herbivore_abundances[c][i] -= nharvested_h

                        nharvested_c = harvest_effort[c] * carnivore_abundances[c][i]
                        harvested_abundance += nharvested_c
                        carnivore_abundances[c][i] -= nharvested_c

                        harvested_biomass[c] += bodymasses[i] * (nharvested_h + nharvested_c)

        mean_harvested_bodymass = harvested_biomass / harvested_abundance

        return {
            'harvested_biomass': harvested_biomass,
            'mean_harvested_biomass': mean_harvested_bodymass,
        }

    def compute_biodiversity_scores(self):
        bio_score = [0 for c in range(self.n_cells)]
        for c in range(self.n_cells):
            max_herbivore = max(np.where(np.array(self.herbivore_biomasses[c]) > 0)[0])
            max_carnivore = max(np.where(np.array(self.carnivore_biomasses[c]) > 0)[0])
            bio_score[c] = max_herbivore + (2 * max_carnivore)

        return bio_score

    def return_state(self):
        return {
            'herbivoreBiomasses': [np.sum(self.herbivore_biomasses[c]) for c in range(self.n_cells)],
            'herbivoreAbundances': [np.sum(self.herbivore_abundances[c]) for c in range(self.n_cells)],
            'carnivoreBiomasses': [np.sum(self.carnivore_biomasses[c]) for c in range(self.n_cells)],
            'carnivoreAbundances': [np.sum(self.carnivore_abundances[c]) for c in range(self.n_cells)],
            'temperature': self.temperature,
            'timeElapsed': self.months_elapsed,
        }

    def step(self, harvest_effort, lower_harvest_bodymass, warming):
        result = self.UpdateModelState(1, warming, lower_harvest_bodymass, harvest_effort)

        harvested_biomass = result['harvested_biomass']
        mean_harvested_biomass = np.mean(harvested_biomass)

        biodiversity_scores = self.compute_biodiversity_scores()

        return {
            'biodiversityScores': biodiversity_scores,
            'harvestedBiomasses': harvested_biomass,
            'meanHarvestedBiomass': mean_harvested_biomass,
            'state': self.return_state(),
        }


def new_model(n_cells=20*20):
    cell_area = 1000

    bodymasses = np.exp(np.arange(math.log(0.1), math.log(1000), 0.08))

    herbivore_biomasses = np.asarray([get_initial_biomasses(cell_area, bodymasses) for _ in range(n_cells)])
    herbivore_abundances = herbivore_biomasses / bodymasses

    carnivore_biomasses = np.asarray([get_initial_biomasses(cell_area, bodymasses) for _ in range(n_cells)])
    carnivore_abundances = carnivore_biomasses / bodymasses

    primary_producer_biomass = np.zeros(n_cells)

    return MadingleyModel(n_cells, cell_area, 25, 0, bodymasses, herbivore_biomasses, herbivore_abundances,
                          carnivore_biomasses, carnivore_abundances, primary_producer_biomass)


def get_initial_biomasses(cell_area, bodymasses):
    return (3300 / len(bodymasses)) * 30 * np.random.normal(loc=0.5, scale=0.01) * np.power(0.6, np.log10(
        bodymasses * 0.01)) * cell_area


# noinspection PyPep8Naming
def MiamiNPP(t):
    max_NPP = 0.961644704
    t1_NPP = 0.237468183
    t2_NPP = 0.100597089
    return 3000000 * max_NPP / (1 + math.exp(t1_NPP - t2_NPP * t))


# noinspection PyPep8Naming
def Metabolism(m, T):
    EnergyScalar = 0.036697248
    NormalizationConstant = 148984000000
    MetabolismExponent = 0.88
    Ea = 0.69
    Kb = 0.00008617

    return EnergyScalar * NormalizationConstant * math.pow(m, MetabolismExponent) * math.exp(-(Ea / (Kb * (T + 273))))


# n = 20*20
#
# model = new_model(n)
#
# lhbm = np.random.normal(loc=10, scale=5, size=n)
# heff = np.random.uniform(size=n)
#
# harvest = np.zeros(shape=[12, n])
# hb = np.zeros(shape=[12, n])
# cb = np.zeros(shape=[12, n])
# ppb = np.zeros(shape=[12, n])
#
# for m in range(12):
#     print(m)
#     r = model.step(heff, lhbm, 0)
#     harvest[m, :] = r['harvestedBiomasses']
#     hb[m, :] = r['state']['herbivoreBiomasses']
#     cb[m, :] = r['state']['carnivoreBiomasses']
#     ppb[m, :] = model.primary_producer_biomass
#
# import matplotlib.pyplot as plt
#
# # Plotting ecosystem trajectory
# plt.subplot(4,1,1)
# plt.plot(range(12),np.log10(hb[:,0:100]))
# plt.subplot(4,1,2)
# plt.plot(range(12),np.log10(cb[:,0:100]))
# plt.subplot(4,1,3)
# plt.plot(range(12),np.log10(ppb[:,0:100]))
# plt.subplot(4,1,4)
# plt.plot(range(12),np.log10(harvest[:,0:100]))
# plt.show()
#
# # Plotting the harvest effort
# plt.hist(heff)
#
# # Checking size structure
# plt.subplot(2,1,1)
# plt.plot(model.bodymasses,np.log10(model.herbivore_biomasses[0]))
# plt.subplot(2,1,2)
# plt.plot(model.bodymasses,np.log10(model.carnivore_biomasses[0]))
# plt.show()
