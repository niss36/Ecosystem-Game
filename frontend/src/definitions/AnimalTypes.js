export const AUTOTROPH = "autotroph";
export const CARNIVORE = "carnivore";
export const ECTOTHERM = "ectotherm";
export const ENDOTHERM = "endotherm";
export const HERBIVORE = "herbivore";
export const ITEROPARITY = "iteroparity";
export const OMNIVORE = "omnivore";
export const SEMELPARITY = "semelparity";
export const GENERAL_ANIMAL = "general_animal";

export default{
    [AUTOTROPH]:{
        name: "autotroph",
        description: "Primary producers like plants or algae",
    },

    [CARNIVORE]:{
        name: "carnivore",
        description: "Eats animals lower down the trpohic level",
    },

    [ECTOTHERM]:{       //Most likely not relevent.
        name: "ectotherm",
        description: "Cold-blooded animals",
    },

    [ENDOTHERM]:{       //Most likely not relevent
        name: "endotherm",
        description: "Warm-blooded animals",
    },

    [HERBIVORE]:{
        name: "herbivore",
        description: "Animal that feeds on plants",
    },

    [ITEROPARITY]:{       //Most likely not relevent
        name: "iteroparity",
        description: "Animals that go through multiple redproductive cycles in one life",
    },

    [OMNIVORE]:{
        name: "omnivore",
        description: "Animal that eats both plants and animals",
    },

    [SEMELPARITY]:{       //Most likely not relevent
        name: "semelparity",
        description: "Animal that only goes through one reproductive cycle",
    },

    [GENERAL_ANIMAL]:{
        name: "general_animal",
        description: "Includes all animals",
    }
}