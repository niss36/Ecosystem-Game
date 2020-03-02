## Outputs
Biomasses are returned per grid cell in a 1D array of length equal to the number of grid squares. (The array will be interpreted as referring to each grid cell starting at the top left, running left to right along each row.)

### Carnivore Biomasses (per grid cell)
Number[] 

### Carnivore Abundances (per grid cell)
Number[] (not int - will need to be rounded)

This is the number of individuals per grid cell

### Herbivore Biomasses (per grid cell)
Number[]

### Herbivore Abundances (per grid cell)
Number[] (not int - will need to be rounded)

This is the number of individuals per grid cell

### Harvested Biomass (per grid cell)
Number[]

### Mean Harvested Biomass (over entire grid)
Number

### Biodiversity Scores (per grid cell)
Number[]

A score for the biodiversity per grid cell, where larger is better. If you like biodiversity that is...

### Climate Temperature
Number

### Time Elapsed (since beginning of the game)
Number (in months)

## Inputs

### Harvest Effort (per grid cell, between 0 and 1)
Number[]

### Lower Harvest Bodymass (per grid cell, max body  mass just under 1000kg, lowest 0.1kg)
Number[]

### Timestep in months
Number (this will be an integer)

### Warming
Number

## Endpoints

### NewModel
path = /model/new

**Method** POST

**Data** None

**Response**
```
STATE = {
  herbivoreBiomasses: Number[],
  herbivoreAbundances: Number[],
  carnivoreBiomasses: Number[],
  carnivoreAbundances: Number[],
  temperature: Number, //in C
  timeElapsed: Number, //months
}

DATA = {
  biodiversityScores: Number[]
  harvestedBiomasses: Number[],
  meanHarvestedBiomass: Number,
  state: STATE,
}

response.data = {
  guid: String,
  data: DATA,
}
```

### UpdateModel
path = /model/{guid}/update

*The guid is a unique identifier for a given game*

**Method** 
POST

**Data**
```
{
  harvestEffort: Number[], //between 0 and 1, default 0
  lowerHarvestBodymass: Number[], //greater than 0, default 0
  timestep: Number, //months
  warming: Number, //in C, default 0
}
```

**Response**
```
STATE = {
  herbivoreBiomasses: Number[],
  herbivoreAbundances: Number[],
  carnivoreBiomasses: Number[],
  carnivoreAbundances: Number[],
  temperature: Number, //in C
  timeElapsed: Number, //months
}

response.data {
  biodiversityScores: Number[]
  harvestedBiomasses: Number[],
  meanHarvestedBiomass: Number,
  state: STATE,
}
```