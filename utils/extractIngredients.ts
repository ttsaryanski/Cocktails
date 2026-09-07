type Ingredient = {
    name: string;
    measure: string | null;
};

export const extractIngredients = (drink: Cocktail): Ingredient[] => {
    if (!drink) {
        return [];
    }

    const ingredients: Ingredient[] = [];

    for (let i = 1; i <= 15; i++) {
        const name = drink[`strIngredient${i}` as keyof Cocktail];
        const measure = drink[`strMeasure${i}` as keyof Cocktail];

        if (name) {
            ingredients.push({
                name: name as string,
                measure: measure as string | null,
            });
        }
    }
    return ingredients;
};
