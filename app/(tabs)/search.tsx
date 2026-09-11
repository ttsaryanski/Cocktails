import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

import useFetch from "../../hooks/useFetch";
import { cocktailServices } from "../../services/cocktailServices";
import { updateSearchCount } from "../../utils/appwrite";

import CocktailCard from "../../components/cocktail-card";
import SearchBar from "../../components/search-bar";

import { icons } from "../../constants/icons";
import { images } from "../../constants/images";

const Search = () => {
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState<Cocktails | null>(null);
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchError, setSearchError] = useState<Error | null>(null);

    let {
        data: popularCocktails,
        loading: popularLoading,
        error: popularError,
    } = useFetch(() => cocktailServices.getPopular());

    const handleSearch = (text: string) => {
        setQuery(text);
    };

    useEffect(() => {
        const trimmedQuery = query.trim();

        if (!trimmedQuery) {
            setSearchResults(null);
            setSearchError(null);
            setSearchLoading(false);
            return;
        }

        let cancelled = false;

        const searchCocktails = async () => {
            setSearchLoading(true);
            setSearchError(null);

            try {
                const results =
                    await cocktailServices.searchByName(trimmedQuery);

                if (!cancelled) {
                    setSearchResults(results);
                }

                if (results?.drinks?.length > 0 && results?.drinks[0]) {
                    await updateSearchCount(query, results?.drinks[0]);
                }
            } catch (error) {
                if (!cancelled) {
                    setSearchError(
                        error instanceof Error
                            ? error
                            : new Error("An unknown error occurred"),
                    );
                }
            } finally {
                if (!cancelled) {
                    setSearchLoading(false);
                }
            }
        };

        searchCocktails();

        return () => {
            cancelled = true;
        };
    }, [query]);

    const cocktails = query.trim() ? searchResults : popularCocktails;
    const loading = query.trim() ? searchLoading : popularLoading;
    const error = query.trim() ? searchError : popularError;

    return (
        <View className="flex-1 bg-primary">
            <Image
                source={images.bg}
                className="flex-1 absolute w-full z-0"
                resizeMode="cover"
            />

            <FlatList
                className="px-5"
                data={cocktails?.drinks ?? []}
                renderItem={({ item }) => <CocktailCard {...item} />}
                keyExtractor={(item) => item.idDrink.toString()}
                numColumns={2}
                columnWrapperStyle={{
                    justifyContent: "space-between",
                    marginVertical: 16,
                }}
                contentContainerStyle={{ paddingBottom: 100 }}
                ListHeaderComponent={
                    <>
                        <View className="w-full flex-row justify-center mt-10 items-center">
                            <Image source={icons.logo} className="w-12 h-10" />
                        </View>

                        <View className="my-5">
                            <SearchBar
                                placeholder="Search for a cocktail by name"
                                value={query}
                                onChangeText={handleSearch}
                            />
                        </View>

                        {loading && (
                            <ActivityIndicator
                                size="large"
                                color="#0000ff"
                                className="my-3"
                            />
                        )}

                        {error && (
                            <Text className="text-red-500 px-5 my-3">
                                Error: {error.message}
                            </Text>
                        )}

                        {!loading &&
                            !error &&
                            query.trim() &&
                            (cocktails?.drinks?.length ?? 0) > 0 && (
                                <Text className="text-xl text-indigo-200 font-bold">
                                    Search Results for{" "}
                                    <Text className="text-accent">{query}</Text>
                                </Text>
                            )}
                    </>
                }
                ListEmptyComponent={
                    !loading && !error ? (
                        <View className="mt-10 px-5">
                            <Text className="text-center text-gray-500">
                                {query.trim()
                                    ? "No cocktail found"
                                    : "Start typing to search for cocktails"}
                            </Text>
                        </View>
                    ) : null
                }
            />
        </View>
    );
};

export default Search;
