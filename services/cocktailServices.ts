import { api } from "../utils/requester";

const endPoints = {
    random: "/randomselection.php",
    latest: "/latest.php",
    popular: "/popular.php",
    searchByName: (query: string) =>
        `/search.php?s=${encodeURIComponent(query)}`,
    searchIngredient: (name: string) => `/search.php?i=${name}`,
    detailsById: (query: string) => `/lookup.php?i=${query}`,
    filterByType: (type: string) => `/filter.php?a=${type}`,
    filterByCategory: (category: string) => `/filter.php?c=${category}`,
    filterByIngredient: (ingredient: string) => `/filter.php?i=${ingredient}`,
    filterByGlass: (glass: string) => `/filter.php?g=${glass}`,
    listOption: (option: string) => `/list.php?${option}=list`,
};

async function getRandom() {
    const response = await api.get<Cocktails>(endPoints.random);
    const drinks = Array.isArray(response.drinks) ? response.drinks : [];

    return { drinks };
}

async function getLatest() {
    const response = await api.get<Cocktails>(endPoints.latest);
    const drinks = Array.isArray(response.drinks) ? response.drinks : [];

    return { drinks };
}

async function getPopular() {
    const response = await api.get<Cocktails>(endPoints.popular);
    const drinks = Array.isArray(response.drinks) ? response.drinks : [];

    return { drinks };
}

async function searchByName(query: string) {
    const response = await api.get<Cocktails>(endPoints.searchByName(query));
    const drinks = Array.isArray(response.drinks) ? response.drinks : [];

    return { drinks };
}

async function getIngredientByName(name: string) {
    const response = await api.get<Ingredients>(
        endPoints.searchIngredient(name),
    );
    const ingredients = Array.isArray(response.ingredients)
        ? response.ingredients
        : [];

    return { ingredients };
}

async function getDetails(query: string) {
    const response = await api.get<Cocktails>(endPoints.detailsById(query));
    const drinks = Array.isArray(response.drinks) ? response.drinks : [];

    return { drinks };
}

async function filterByType(type: string) {
    const response = await api.get<Cocktails>(endPoints.filterByType(type));
    const drinks = Array.isArray(response.drinks) ? response.drinks : [];

    return { drinks };
}

async function filterByCategory(category: string) {
    const response = await api.get<Cocktails>(
        endPoints.filterByCategory(category),
    );
    const drinks = Array.isArray(response.drinks) ? response.drinks : [];

    return { drinks };
}

async function filterByIngredient(ingredient: string) {
    const response = await api.get<Cocktails>(
        endPoints.filterByIngredient(ingredient),
    );
    const drinks = Array.isArray(response.drinks) ? response.drinks : [];

    return { drinks };
}

async function filterByGlass(glass: string) {
    const response = await api.get<Cocktails>(endPoints.filterByGlass(glass));
    const drinks = Array.isArray(response.drinks) ? response.drinks : [];

    return { drinks };
}

async function getOptions(option: string) {
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
    getIngredientByName,
    getDetails,
    filterByType,
    filterByCategory,
    filterByIngredient,
    filterByGlass,
    getOptions,
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
