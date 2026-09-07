import { Client, ID, Query, TablesDB } from "react-native-appwrite";

const PLATFORM = process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!;
const REGION = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_REGION!;
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const TABLE_ID = process.env.EXPO_PUBLIC_APPWRITE_TABLE_ID!;

const client = new Client()
    .setEndpoint(`https://${REGION}.cloud.appwrite.io/v1`)
    .setProject(PROJECT_ID)
    .setPlatform(PLATFORM);

const tablesDB = new TablesDB(client);

export const updateSearchCount = async (query: string, cocktail: Cocktail) => {
    try {
        const result = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: TABLE_ID,
            queries: [Query.equal("searchTerm", query)],
        });

        if (result.rows.length > 0) {
            const existingCocktail = result.rows[0];
            await tablesDB.updateRow({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID,
                rowId: existingCocktail.$id,
                data: {
                    count: existingCocktail.count + 1,
                },
            });
        } else {
            await tablesDB.createRow({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID,
                rowId: ID.unique(),
                data: {
                    searchTerm: query.toLowerCase(),
                    cocktail_id: Number(cocktail.idDrink),
                    title: cocktail.strDrink,
                    count: 1,
                    img_url: cocktail.strDrinkThumb,
                },
            });
        }
    } catch (error) {
        console.error("Error updating search count:", error);
        throw error;
    }
};

export const getTrendingCocktails = async (): Promise<
    TrendingCocktail[] | undefined
> => {
    try {
        const result = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: TABLE_ID,
            queries: [Query.limit(6), Query.orderDesc("count")],
        });

        return result.rows as unknown as TrendingCocktail[];
    } catch (error) {
        console.error(error);
        return undefined;
    }
};
