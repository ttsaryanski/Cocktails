import { api } from "../utils/requester";

import { RandomCoocktails } from "../types/coocktails";

const endPoints = {
    getRandom: "/randomselection.php",
};

async function getRandom() {
    return api.get<RandomCoocktails>(endPoints.getRandom);
}

export const coocktailServices = {
    getRandom,
};
