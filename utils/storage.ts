import AsyncStorage from "@react-native-async-storage/async-storage";

const COCKTAILS_KEY = "cocktails";

export const getLocalSavedCocktails = async (): Promise<SavedCocktail[]> => {
    const data = await AsyncStorage.getItem(COCKTAILS_KEY);
    return data ? JSON.parse(data) : [];
};

export const saveLocalCocktail = async (
    cocktail: Omit<SavedCocktail, "createdAt">,
): Promise<SavedCocktail> => {
    const cocktails = await getLocalSavedCocktails();
    const newCocktail: SavedCocktail = {
        ...cocktail,
        createdAt: new Date().toISOString(),
    };
    await AsyncStorage.setItem(
        COCKTAILS_KEY,
        JSON.stringify([newCocktail, ...cocktails]),
    );
    return newCocktail;
};

export const deleteLocalCocktail = async (id: number): Promise<void> => {
    const cocktails = await getLocalSavedCocktails();
    const filtered = cocktails.filter(
        (cocktail) => cocktail.cocktail_id !== id,
    );
    await AsyncStorage.setItem(COCKTAILS_KEY, JSON.stringify(filtered));
};

export const deleteAllLocalCocktails = async (): Promise<void> => {
    await AsyncStorage.removeItem(COCKTAILS_KEY);
};
