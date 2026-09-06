import { Client, Query, TablesDB } from "react-native-appwrite";

const REGION = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_REGION!;
const PLATFORM = process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!;
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;

const client = new Client()
    .setEndpoint(`https://${REGION}.cloud.appwrite.io/v1`)
    .setProject(PROJECT_ID)
    .setPlatform(PLATFORM);

const tablesDB = new TablesDB(client);

// export const updateSearchCount = async (query: string, cocktail: Cocktail) => {
//     try {
//         const result = await database.listDocuments(
//             DATABASE_ID,
//             COLLECTION_ID,
//             [Query.equal("searchTerm", query)],
//         );

//         if (result.documents.length > 0) {
//             const existingCocktail = result.documents[0];
//             await database.updateDocument(
//                 DATABASE_ID,
//                 COLLECTION_ID,
//                 existingCocktail.$id,
//                 {
//                     count: existingCocktail.count + 1,
//                 },
//             );
//         } else {
//             await database.createDocument(
//                 DATABASE_ID,
//                 COLLECTION_ID,
//                 ID.unique(),
//                 {
//                     searchTerm: query,
//                     cocktail_id: Number(cocktail.idDrink),
//                     title: cocktail.strDrink,
//                     count: 1,
//                     img_url: cocktail.strDrinkThumb,
//                 },
//             );
//         }
//     } catch (error) {
//         console.error("Error updating search count:", error);
//         throw error;
//     }
// };

export const getTrendingCocktails = async (): Promise<
    TrendingCocktail[] | undefined
> => {
    try {
        const result = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: COLLECTION_ID,
            queries: [Query.limit(6), Query.orderDesc("count")],
        });

        return result.rows as unknown as TrendingCocktail[];
    } catch (error) {
        console.error(error);
        return undefined;
    }
};
