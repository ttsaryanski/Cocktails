import { api } from "../utils/requester";

const endPoints = {
    random: "/randomselection.php",
    latest: "/latest.php",
    popular: "/popular.php",
    searchByName: (query: string) =>
        `/search.php?s=${encodeURIComponent(query)}`,
    detailsById: (query: string) => `/lookup.php?i=${query}`,
    filterByType: (type: string) => `/filter.php?a=${type}`,
    filterByCategory: (type: string) => `/filter.php?c=${type}`,
    listOption: (option: string) => `/list.php?${option}=list`,
};

async function getRandom() {
    return api.get<Cocktails>(endPoints.random);
}

async function getLatest() {
    return api.get<Cocktails>(endPoints.latest);
}

async function getPopular() {
    return api.get<Cocktails>(endPoints.popular);
}

async function searchByName(query: string) {
    return api.get<Cocktails>(endPoints.searchByName(query));
}

async function getDetails(query: string) {
    return api.get<Cocktail>(endPoints.detailsById(query));
}

async function filterByType(type: string) {
    return api.get<Cocktails>(endPoints.filterByType(type));
}

async function filterByCategory(type: string) {
    return api.get<Cocktails>(endPoints.filterByCategory(type));
}

async function getOption(option: string) {
    const config = optionConfig[option as OptionType];

    const res = await api.get<RawOptions>(endPoints.listOption(config.query));

    return res.drinks.map((item) => ({
        value: item[config.property],
    }));
}

export const cocktailServices = {
    getRandom,
    getLatest,
    getPopular,
    searchByName,
    getDetails,
    filterByType,
    filterByCategory,
    getOption,
};

type OptionType = "a" | "c" | "g" | "i";
const optionConfig = {
    a: {
        query: "a",
        property: "strAlcoholic",
    },
    c: {
        query: "c",
        property: "strCategory",
    },
    g: {
        query: "g",
        property: "strGlass",
    },
    i: {
        query: "i",
        property: "strIngredient1",
    },
} as const;
