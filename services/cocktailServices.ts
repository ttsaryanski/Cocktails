import { api } from "../utils/requester";

const endPoints = {
    getRandom: "/randomselection.php",
    popular: "/popular.php",
    searchByName: (query: string) =>
        `/search.php?s=${encodeURIComponent(query)}`,
};

async function getRandom() {
    return api.get<Cocktails>(endPoints.getRandom);
}

async function getPopular() {
    return api.get<Cocktails>(endPoints.popular);
}

async function getByCoktailName(query: string) {
    return api.get<Cocktails>(endPoints.searchByName(query));
}

export const cocktailServices = {
    getRandom,
    getPopular,
    getByCoktailName,
};
