export const ABUNDANCE_DENSITY_CARNIVORE = "abundance_density_carnivore";
export const BIOMASS_DENSITY_CARNIVORE = "biomass_density_carnivore";
export const ABUNDANCE_DENSITY_HERBIVORE = "abundance_density_herbivore";
export const BIOMASS_DENSITY_HERBIVORE = "biomass_density_herbivore";
export const BIOMASS_EVENNESS = "biomass_evenness";
export const BIOMASS_RICHNESS = "biomass_richness";
export const FRACTION_YEAR_FROST = "fraction_year_frost";
export const FUNCTIONAL_RICHNESS = "functional_richness";
export const HANPP = "hanpp";
export const MAX_BODYMASS = "max_bodymass";
export const MAX_TROPHIC_INDEX = "max_trophic_index";
export const MIN_TROPHIC_INDEX = "min_trophic_index";
export const MEAN_TROPHIC_LEVEL = "mean_trophic_level";
export const REALM = "realm";
export const TROPHIC_EVENNESS = "trophic_evenness";

export default {


    [ABUNDANCE_DENSITY_CARNIVORE]:{
        name: "Abundance Density",
        description: "Number of individuals per sample",
        //This is measured individually for animal types and also overall.
    },

    [BIOMASS_DENSITY_CARNIVORE]:{
        name: "Biomass Density",
        description: "Mass of animal/plant material per meter squared",
        //This is measured individually for animal types and also overall.
    },

    [ABUNDANCE_DENSITY_HERBIVORE]:{
        name: "Abundance Density",
        description: "Number of individuals per sample",
        //This is measured individually for animal types and also overall.
    },

    [BIOMASS_DENSITY_HERBIVORE]:{
        name: "Biomass Density",
        description: "Mass of animal/plant material per meter squared",
        //This is measured individually for animal types and also overall.
    },

    [BIOMASS_EVENNESS]:{
        name: "Biomass Evenness",
        description: "The closeness in numbers the species in an environment are"
    },

    [BIOMASS_RICHNESS]:{
        name: "Biomass Richness",
        description: "The count of species in an environment",
    },

    [FRACTION_YEAR_FROST]:{
        name: "Fraction Year Frost",
        description: "The fraction of the year which has frost",
    },

    [FUNCTIONAL_RICHNESS]:{
        name: "Functional Richness",
        description: "The proportion of space occupied by a species compared to how much livable area is available",
    },

    [HANPP]:{
        name: "HANPP",
        description: "A measurment of human activities influencing the biological productivity of land",
    },

    [MAX_BODYMASS]:{
        name: "Max Bodymass",
        description: "The largest bodymass of an animal in an environment",
    },

    [MAX_TROPHIC_INDEX]:{
        name: "Max Trophic Index",
        description: "The maxiumum of the trophic index, which is a rating of water bodies on how much biological activity they sustain",
    },

    [MIN_TROPHIC_INDEX]:{
        name: "Min Trophic Index",
        description: "The minimum of the trophic index, which is a rating of water bodies on how much biological activity they sustain",
    },

    [MEAN_TROPHIC_LEVEL]:{
        name: "Mean Trophic Level",
        description: "the mean of the trophic level, which is a value measuring an animal's position on the food chain",
    },

    [REALM]:{
        name: "Realm",
        description: "Whether an area is classed as land or as water",
    },

    [TROPHIC_EVENNESS]:{
        name: "Trophic Evenness",
        description: "How close the numbers of leach trophic level there are",
    },
}