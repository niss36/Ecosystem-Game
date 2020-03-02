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

    # noinspection PyPep8Naming
    def HerbivoryRate(self, b, ppbm):
        m = self.bodymasses[b]

        ppbm_sq = ppbm * ppbm

        RateConstant = np.random.normal(loc=1.0, scale=0.01, size=self.n_cells) * 1.00E-11
        HandlingTimeExponent = 0.7
        # _HerbivoryRateConstant * Math.Pow(herbivoreIndividualMass, (_HerbivoryRateMassExponent))
        return self.herbivore_abundances[:, b] * RateConstant * m * ppbm_sq / (
                    1 + RateConstant * m * ppbm_sq * math.pow(m, HandlingTimeExponent))

    # noinspection PyPep8Naming
    def CarnivoryRate(self, b, window):
        bodymasses = self.bodymasses
        herbivore_abundances = self.herbivore_abundances
        carnivore_abundances = self.carnivore_abundances
        m = bodymasses[b]

        HandlingTimeScalar = 0.5
        HandlingTimeExponent = 0.7
        KillRateConstant = np.random.normal(loc=1.0, scale=0.01, size=self.n_cells) * 0.000001

        # Add up all hererotroph biomass in the window: remove the current bin to avoid carnivory
        # shape (n_cells,)
        PreyAbundance = np.sum(herbivore_abundances[:, window], axis=1) + np.sum(carnivore_abundances[:, window], axis=1)

        # shape (n_cells,)
        AbundanceEatenByPreyAbundance = carnivore_abundances[:, b] * KillRateConstant * m * PreyAbundance / (1 + (
                KillRateConstant * m * (PreyAbundance * PreyAbundance) * HandlingTimeScalar * math.pow(m,
                                                                                                       HandlingTimeExponent)))

        # shape (n_cells, 1)
        AbundanceEatenByPreyAbundance = AbundanceEatenByPreyAbundance[:, np.newaxis]

        # shape (n_cells, len(window))
        herbivores_eaten = AbundanceEatenByPreyAbundance * herbivore_abundances[:, window]
        carnivores_eaten = AbundanceEatenByPreyAbundance * carnivore_abundances[:, window]

        # shape (n_cells,)
        BiomassEaten = np.sum(bodymasses[window] * (herbivores_eaten + carnivores_eaten), axis=1)

        herbivore_abundances[:, window] -= herbivores_eaten
        herbivore_abundances[:, window] = herbivore_abundances[:, window].clip(min=0)
        self.herbivore_biomasses[:, window] = herbivore_abundances[:, window] * bodymasses[window]

        carnivore_abundances[:, window] -= carnivores_eaten
        carnivore_abundances[:, window] = carnivore_abundances[:, window].clip(min=0)
        self.carnivore_biomasses[:, window] = carnivore_abundances[:, window] * bodymasses[window]

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

        total_harvested_abundance = np.zeros(n_cells)
        total_harvested_biomass = np.zeros(n_cells)

        for mon in range(n_months):
            # production into the system
            self.primary_producer_biomass = np.random.normal(loc=1.0, scale=0.01, size=n_cells) * MiamiNPP(temperature) * cell_area

            # Update herbivores
            self.herbivores()

            # Update Carnivores
            self.carnivores()

            # Once updated ecology then harvest
            harvested_abundance, harvested_biomass = self.harvest(harvest_effort, lower_harvest_bodymass)

            total_harvested_abundance += harvested_abundance
            total_harvested_biomass += harvested_biomass

        mean_harvested_bodymass = total_harvested_biomass / total_harvested_abundance

        return {
            'harvested_biomass': total_harvested_biomass,
            'mean_harvested_biomass': mean_harvested_bodymass,
        }

    def eating(self, abundances, biomasses, mass_eaten, b):
        biomasses[:, b] += mass_eaten - (30 * abundances[:, b] * Metabolism(self.bodymasses[b], self.temperature))
        abundances[:, b] = biomasses[:, b] / self.bodymasses[b]

    def mortality(self, abundances, biomasses, b):
        abundances[:, b] *= (1 - np.exp(-np.random.beta(a=1, b=2, size=self.n_cells) * 30))
        biomasses[:, b] = abundances[:, b] * self.bodymasses[b]

    def herbivores(self):
        n = len(self.bodymasses)
        for b in random.sample(range(n), n):
            mass_eaten = self.HerbivoryRate(b, 0.1 * self.primary_producer_biomass)
            mass_eaten.clip(max=self.primary_producer_biomass, out=mass_eaten)
            self.primary_producer_biomass -= mass_eaten

            self.eating(self.herbivore_abundances, self.herbivore_biomasses, mass_eaten, b)

            # Calculate abundance including some background mortality
            self.mortality(self.herbivore_abundances, self.herbivore_biomasses, b)

    def carnivores(self):
        n = len(self.bodymasses)
        for b in random.sample(range(n), n):
            bodymass_ratios = self.bodymasses / self.bodymasses[b]
            FeedingWindow = np.where((bodymass_ratios > np.random.gamma(1, 0.1)) &
                                     (bodymass_ratios < np.random.gamma(2, 0.5)))[0].tolist()
            if b in FeedingWindow:
                FeedingWindow.remove(b)

            biomass_eaten = self.CarnivoryRate(b, FeedingWindow)
            self.eating(self.carnivore_abundances, self.carnivore_biomasses, biomass_eaten, b)

            self.mortality(self.carnivore_abundances, self.carnivore_biomasses, b)

    def harvest(self, harvest_effort, lower_harvest_bodymass):
        bodymasses = self.bodymasses
        herbivore_abundances = self.herbivore_abundances
        carnivore_abundances = self.carnivore_abundances

        harvested_abundance = np.zeros(self.n_cells)
        harvested_biomass = np.zeros(self.n_cells)

        for c in range(self.n_cells):
            indices = np.where(bodymasses > lower_harvest_bodymass[c])[0]

            # shape (len(indices),)
            nharvested_h = harvest_effort[c] * herbivore_abundances[c][indices]
            herbivore_abundances[c][indices] -= nharvested_h
            self.herbivore_biomasses[c][indices] = herbivore_abundances[c][indices] * bodymasses[indices]

            # shape (len(indices),)
            nharvested_c = harvest_effort[c] * carnivore_abundances[c][indices]
            carnivore_abundances[c][indices] -= nharvested_c
            self.carnivore_biomasses[c][indices] = carnivore_abundances[c][indices] * bodymasses[indices]

            # shape (len(indices),)
            nharvested = nharvested_h + nharvested_c

            harvested_abundance[c] = np.sum(nharvested)
            harvested_biomass[c] = np.sum(bodymasses[indices] * nharvested)

        return harvested_abundance, harvested_biomass

    def compute_biodiversity_scores(self):
        bio_score = np.zeros(self.n_cells)
        for c in range(self.n_cells):
            max_herbivore = max(np.where(self.herbivore_biomasses[c] > 0)[0], default=0)
            max_carnivore = max(np.where(self.carnivore_biomasses[c] > 0)[0], default=0)
            bio_score[c] = max_herbivore + (2 * max_carnivore)

        return bio_score.tolist()

    def return_state(self):
        return {
            'herbivoreBiomasses': np.sum(self.herbivore_biomasses, axis=1).tolist(),
            'herbivoreAbundances': np.sum(self.herbivore_abundances, axis=1).tolist(),
            'carnivoreBiomasses': np.sum(self.carnivore_biomasses, axis=1).tolist(),
            'carnivoreAbundances': np.sum(self.carnivore_abundances, axis=1).tolist(),
            'temperature': self.temperature,
            'timeElapsed': self.months_elapsed,
        }

    def step(self, n_months, harvest_effort, lower_harvest_bodymass, warming):
        result = self.UpdateModelState(n_months, warming, lower_harvest_bodymass, harvest_effort)

        harvested_biomass = result['harvested_biomass']
        mean_harvested_biomass = np.mean(harvested_biomass)

        biodiversity_scores = self.compute_biodiversity_scores()

        return {
            'biodiversityScores': biodiversity_scores,
            'harvestedBiomasses': harvested_biomass.tolist(),
            'meanHarvestedBiomass': float(mean_harvested_biomass),
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
    n = len(bodymasses)
    return (3300 / n) * 30 * np.random.normal(loc=0.5, scale=0.01, size=n) * np.power(0.6, np.log10(bodymasses * 0.01)) * cell_area


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


# nc = 20 * 20
# n_months = 12
#
# model = new_model(nc)
#
# lhbm = np.random.normal(loc=10, scale=5, size=nc)
# heff = np.random.uniform(size=nc)
#
# harvested = np.zeros(shape=[n_months, nc])
# hb = np.zeros(shape=[n_months, nc])
# cb = np.zeros(shape=[n_months, nc])
# ppb = np.zeros(shape=[n_months, nc])
# sc = np.zeros(shape=[n_months, nc])
#
# for month in range(n_months):
#     print(month)
#     r = model.step(heff, lhbm, 0)
#     harvested[month, :] = r['harvestedBiomasses']
#     hb[month, :] = r['state']['herbivoreBiomasses']
#     cb[month, :] = r['state']['carnivoreBiomasses']
#     ppb[month, :] = model.primary_producer_biomass
#     sc[month, :] = r['biodiversityScores']
#
# import matplotlib.pyplot as plt
#
# # Plotting ecosystem trajectory
# plt.subplot(4, 1, 1)
# plt.plot(range(n_months), np.log10(hb[:, 0:100]))
# plt.subplot(4, 1, 2)
# plt.plot(range(n_months), np.log10(cb[:, 0:100]))
# plt.subplot(4, 1, 3)
# plt.plot(range(n_months), np.log10(ppb[:, 0:100]))
# plt.subplot(4, 1, 4)
# plt.plot(range(n_months), np.log10(harvested[:, 0:100]))
# plt.show()
#
# # Plotting the harvest effort
# plt.hist(heff)
#
# # Checking size structure
# plt.subplot(2, 1, 1)
# plt.plot(model.bodymasses, np.log10(model.herbivore_biomasses[0]))
# plt.subplot(2, 1, 2)
# plt.plot(model.bodymasses, np.log10(model.carnivore_biomasses[0]))
# plt.show()
#
# plt.subplot(1, 1, 1)
# plt.plot(range(n_months), sc[:, 0:100])
# plt.show()
