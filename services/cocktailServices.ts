import { api } from "../utils/requester";

const endPoints = {
    random: "/randomselection.php",
    popular: "/popular.php",
    searchByName: (query: string) =>
        `/search.php?s=${encodeURIComponent(query)}`,
    searchById: (query: string) => `/lookup.php?i=${query}`,
};

async function getRandom() {
    return api.get<Cocktails>(endPoints.random);
}

async function getPopular() {
    return api.get<Cocktails>(endPoints.popular);
}

async function searchByName(query: string) {
    return api.get<Cocktails>(endPoints.searchByName(query));
}

async function getDetails(query: string) {
    return api.get<Cocktails>(endPoints.searchById(query));
}

export const cocktailServices = {
    getRandom,
    getPopular,
    searchByName,
    getDetails,
};
