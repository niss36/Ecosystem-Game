# -*- coding: utf-8 -*-
"""
Created on Tue Feb 18 22:06:38 2020

@author: MikeHa
"""
import numpy as np
import math
import random
import matplotlib.pyplot as plt

##
# ncell = Integer number of grid cells
# herbivore_masses = vector of real numbers for the bodymasses of herbivores
# carnivore_masses = vector of real numbers for the bodymasses of carnivores
##
def InitialiseGrid(ncells,bms):
    global bodymasses
    global herbivore_biomasses
    global herbivore_abundances
    global carnivore_biomasses
    global carnivore_abundances
    global primary_producer_biomass

    bodymasses = bms

    herbivore_biomasses = [[GetInitialBiomass(m,len(bodymasses)) for m in bodymasses] for c in range(ncells)]
    herbivore_abundances = [[herbivore_biomasses[c][m]/bodymasses[m] for m in range(len(bodymasses))] for c in range(ncells)]

    carnivore_biomasses = [[GetInitialBiomass(m,len(bodymasses)) for m in bodymasses] for c in range(ncells)]
    carnivore_abundances = [[carnivore_biomasses[c][m]/bodymasses[m] for m in range(len(bodymasses))] for c in range(ncells)]

    primary_producer_biomass = [0 for c in range(ncells)]




def GetInitialBiomass(m,nm):
    return (3300 / nm) * 30 * np.random.normal(loc = 0.5,scale = 0.01)*math.pow(0.6, (math.log10(m*0.01))) * (cell_area)


def MiamiNPP(t):
    max_NPP = 0.961644704
    t1_NPP = 0.237468183
    t2_NPP = 0.100597089
    return 3000000 * max_NPP / (1 + math.exp(t1_NPP - t2_NPP * t))


def HerbivoryRate(n,m, b):
    RateConstant=np.random.normal(loc = 1.0,scale = 0.01)*1.00E-11
    HandlingTimeExponent = 0.7
    #_HerbivoryRateConstant * Math.Pow(herbivoreIndividualMass, (_HerbivoryRateMassExponent))
    return n * RateConstant * m * math.pow(b,2)/(1+RateConstant * m * math.pow(b,2) * math.pow(m,HandlingTimeExponent))

def CarnivoryRate(n,m,window,c):
    global bodymasses
    global herbivore_abundances
    global herbivore_biomasses
    global carnivore_abundances
    global carnivore_biomasses

    HandlingTimeScalar=0.5
    HandlingTimeExponent=0.7
    KillRateConstant=np.random.normal(loc = 1.0,scale = 0.01)*0.000001

    #Add up all hererotroph biomass in the window: remove the current bin to avoid carnivory
    PreyAbundance = np.sum([herbivore_abundances[c][i] for i in window]+[carnivore_abundances[c][i] for i in window])

    BiomassEaten = 0

    if(PreyAbundance > 0):

        AbundanceEaten = n*KillRateConstant * m * math.pow(PreyAbundance,2)/(1+(KillRateConstant * m * math.pow(PreyAbundance,2) * HandlingTimeScalar * math.pow(m,HandlingTimeExponent)))


        for i in window:
            BiomassEaten += bodymasses[i]*AbundanceEaten*herbivore_abundances[c][i]/PreyAbundance
            herbivore_abundances[c][i] -= AbundanceEaten*herbivore_abundances[c][i]/PreyAbundance
            herbivore_biomasses[c][i] = herbivore_abundances[c][i]*bodymasses[i]
            if herbivore_abundances[c][i] < 0:
                herbivore_abundances[c][i] = 0
                herbivore_biomasses[c][i] = 0

            BiomassEaten += bodymasses[i]*AbundanceEaten*herbivore_abundances[c][i]/PreyAbundance
            carnivore_abundances[c][i] -= AbundanceEaten*carnivore_abundances[c][i]/PreyAbundance
            carnivore_biomasses[c][i] = carnivore_abundances[c][i]*bodymasses[i]
            if carnivore_abundances[c][i] < 0:
                carnivore_abundances[c][i] = 0
                carnivore_biomasses[c][i] = 0

    return BiomassEaten


def Metabolism(m,T):

    EnergyScalar = 0.036697248
    NormalizationConstant = 148984000000
    MetabolismExponent = 0.88
    Ea = 0.69
    Kb = 0.00008617

    return EnergyScalar * NormalizationConstant * math.pow(m,MetabolismExponent) * math.exp(-(Ea/(Kb*(T + 273))))




###
# ncells  = number of grid cells
# herbivore_masses = vector of herbivore body masses
# carnivore_masses = vector of carnivore body masses
###

# nmonths, the number of months to run the model for
# T = 25 degrees C - the default temperature in the cell
# warming = degrees of warming or cooling relative to the default conditions = 25C
# lower_harvest_bodymass = real vector of lower bodymass of organisms targetted for harvest in each grid cell
# harvest.effort = real vector intensity of effort expended in harvest equivalent to the proportion of the time spent harvesting in each grid cell
#
# Returns two vectors of real numbers in a dictionary:
# 'harvested_biomass
# 'mean_harvested_bodymass'
#
def UpdateModelState(nmonths, T = 25, warming = 0, lower_harvest_bodymass = [0],
                harvest_effort = [0]):

    global bodymasses
    global herbivore_biomasses
    global herbivore_abundances
    global carnivore_biomasses
    global carnivore_abundances
    global primary_producer_biomass

    harvested_biomass = [0 for i in range(ncells)]
    harvested_abundance = [0 for i in range(ncells)]
    mean_harvested_bodymass = [0 for i in range(ncells)]

    for mon in range(nmonths):
        #production into the system
        for c in range(len(primary_producer_biomass)):
            primary_producer_biomass[c] = np.random.normal(loc = 1.0,scale = 0.01)*MiamiNPP(T+warming) *cell_area

            #Update herbivores
            for b in random.sample(range(len(herbivore_biomasses[c])), len(herbivore_biomasses[c])):
                mass_eaten = HerbivoryRate(herbivore_abundances[c][b],bodymasses[b],0.1*primary_producer_biomass[c])
                mass_eaten = min(mass_eaten, primary_producer_biomass[c])
                herbivore_biomasses[c][b] = herbivore_biomasses[c][b] + mass_eaten - (30*herbivore_abundances[c][b]*Metabolism(bodymasses[b],T+warming))
                primary_producer_biomass[c] -= mass_eaten

                #Calculate abundance including some background mortality
                herbivore_abundances[c][b] = (herbivore_biomasses[c][b]/bodymasses[b])
                herbivore_abundances[c][b] = (1-math.exp(-np.random.beta(a = 1,b = 2)*30))*herbivore_abundances[c][b]
                herbivore_biomasses[c][b] = herbivore_abundances[c][b]*bodymasses[b]

            #Update Carnivores
            for b in random.sample(range(len(carnivore_biomasses[c])), len(carnivore_biomasses[c])):
                bodymass_ratios = np.array([bodymasses[j]/bodymasses[b] for j in range(len(bodymasses))])
                FeedingWindow = np.where((bodymass_ratios > np.random.gamma(1,0.1)) &
                                         (bodymass_ratios < np.random.gamma(2,0.5)))[0].tolist()
                if b in FeedingWindow: FeedingWindow.remove(b)
                biomass_eaten = CarnivoryRate(carnivore_abundances[c][b],bodymasses[b], FeedingWindow,c)
                carnivore_biomasses[c][b] = carnivore_biomasses[c][b]+ biomass_eaten -(30*carnivore_abundances[c][b]*Metabolism(bodymasses[b],T+warming))
                carnivore_abundances[c][b] = carnivore_biomasses[c][b]/bodymasses[b]
                carnivore_abundances[c][b] = (1-math.exp(-np.random.beta(a = 1,b = 2)*30))*carnivore_abundances[c][b]
                carnivore_biomasses[c][b] = carnivore_abundances[c][b]*bodymasses[b]

            # Once updated ecology then harvest
            if(harvest_effort[c] > 0):
                harvested_inds = np.where(bodymasses > lower_harvest_bodymass[c])[0]

                for i in harvested_inds:
                    nharvested_h = harvest_effort[c] * herbivore_abundances[c][i]
                    harvested_abundance[c] += nharvested_h
                    herbivore_abundances[c][i] -= nharvested_h

                    nharvested_c = harvest_effort[c] * carnivore_abundances[c][i]
                    harvested_abundance += nharvested_c
                    carnivore_abundances[c][i] -= nharvested_c

                    harvested_biomass[c] += bodymasses[i]*(nharvested_h + nharvested_c)

                mean_harvested_bodymass[c] = harvested_biomass[c]/harvested_abundance[c]

    d = dict()
    d['harvested_biomass'] = harvested_biomass
    d['mean_harvested_bodymass'] = mean_harvested_bodymass
    return (d)


def ReturnHerbivoreAbundances():
    return [np.sum(herbivore_abundances[c]) for c in range(ncells)]

def ReturnCarnivoreAbundances():
    return [np.sum(carnivore_abundances[c]) for c in range(ncells)]

def ReturnHerbivoreBiomasses():
    return [np.sum(herbivore_biomasses[c]) for c in range(ncells)]

def ReturnCarnivoreBiomasses():
    return [np.sum(carnivore_biomasses[c]) for c in range(ncells)]

def ReturnBiodiversityScore():
    bio_score = [0 for c in range(ncells)]
    for c in range(ncells):
        max_herbivore = max(np.where(herbivore_biomasses[c] > 0)[0])
        max_carnivore = max(np.where(carnivore_biomasses[c] > 0)[0])
        bio_score[c] = max_herbivore + (2*max_carnivore)

    return bio_score


#Define 2D array of cohorts per grid cell
ncells = 20*20
herbivore_biomasses = [[]]
herbivore_abundances = [[]]
bodymasses = [[]]
carnivore_biomasses = [[]]
carnivore_abundances = [[]]


primary_producer_biomass = None

cell_area = 1000


bms = np.exp(np.arange(math.log(0.1),math.log(1000),0.08)).tolist()
#bms = [0.1,0.2,0.5,1,2,5,10,12,15,20,30,40,50,60,70,80,90,100]

#Set up the model grid
InitialiseGrid(ncells,bms)

#define a vector of harvest bodymasses per grid cell to use
lhbm = np.random.normal(loc = 10,scale = 5,size = ncells)

#define a vector of harvest efforts (0 - 1) per grid cell
heff = np.random.uniform(size = ncells)

harvest = np.zeros(shape = [12,ncells])
hb = np.zeros(shape = [12,ncells])
cb = np.zeros(shape = [12,ncells])
ppb = np.zeros(shape = [12,ncells])

for m in range(12):
    print(m)
    d = UpdateModelState(1, T = 25, warming = 0, lower_harvest_bodymass = lhbm,harvest_effort = heff)
    harvest[m,:] = d['harvested_biomass']
    hb[m,:] = ReturnHerbivoreBiomasses()
    cb[m,:] = ReturnCarnivoreBiomasses()
    ppb[m,:] = primary_producer_biomass


#Plotting ecosystem trajectory
plt.subplot(4,1,1)
plt.plot(range(12),np.log10(hb[:,0:100]))
plt.subplot(4,1,2)
plt.plot(range(12),np.log10(cb[:,0:100]))
plt.subplot(4,1,3)
plt.plot(range(12),np.log10(ppb[:,0:100]))
plt.subplot(4,1,4)
plt.plot(range(12),np.log10(harvest[:,0:100]))
plt.show()

#Plotting the harvest effort
plt.hist(heff)

#Checking size structure
plt.subplot(2,1,1)
plt.plot(bodymasses,np.log10(herbivore_biomasses[0]))
plt.subplot(2,1,2)
plt.plot(bodymasses,np.log10(carnivore_biomasses[0]))
plt.show()
