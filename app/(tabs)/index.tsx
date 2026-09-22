import { FlatList, Image, RefreshControl, Text, View } from "react-native";

import useFetch from "../../hooks/useFetch";
import { cocktailServices } from "../../services/cocktailServices";

import CocktailCard from "../../components/cocktail-card";

import TrendingCocktailCard from "../../components/trending-cocktail-card";
import { icons } from "../../constants/icons";
import { images } from "../../constants/images";
import { getTrendingCocktails } from "../../utils/appwrite";

export default function Index() {
    const {
        data: trendingCocktails,
        loading: trendingLoading,
        error: trendingError,
        refetch: trendingRefetch,
    } = useFetch(getTrendingCocktails);

    const {
        data: cocktails,
        loading: cocktailsLoading,
        error: cocktailsError,
        refetch: cocktailsRefetch,
    } = useFetch(() => cocktailServices.getRandom());

    const handleRefresh = async () => {
        await Promise.all([trendingRefetch(), cocktailsRefetch()]);
    };

    return (
        <View className="flex-1 bg-primary">
            <Image
                source={images.bg}
                className="absolute w-full z-0"
                resizeMode="cover"
            />

            <FlatList
                className="flex-1 px-2"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    minHeight: "100%",
                    paddingBottom: 100,
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={trendingLoading || cocktailsLoading}
                        onRefresh={handleRefresh}
                        tintColor="#AB8BFF"
                    />
                }
                data={cocktails?.drinks}
                renderItem={({ item }) => <CocktailCard {...item} />}
                keyExtractor={(item) => item.idDrink.toString()}
                numColumns={2}
                columnWrapperStyle={{
                    justifyContent: "space-between",
                    marginBottom: 10,
                }}
                ListHeaderComponent={
                    <>
                        <Image
                            source={icons.logo}
                            className="w-16 h-16 mt-10 mb-1 mx-auto"
                        />

                        {trendingCocktails && (
                            <View className="mt-3">
                                <Text className="text-lg text-light-200 text-center font-bold mb-3">
                                    Trending cocktails
                                </Text>

                                <FlatList
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    className="mb-4 mt-3"
                                    data={trendingCocktails}
                                    contentContainerStyle={{
                                        paddingRight: 20,
                                    }}
                                    renderItem={({ item, index }) => (
                                        <TrendingCocktailCard
                                            cocktail={item}
                                            index={index}
                                        />
                                    )}
                                    keyExtractor={(item) =>
                                        item.cocktail_id.toString()
                                    }
                                    ItemSeparatorComponent={() => (
                                        <View className="w-10" />
                                    )}
                                />
                            </View>
                        )}

                        {trendingError && (
                            <View className="mt-3">
                                <Text className="text-lg text-light-200 text-center font-bold mb-3">
                                    Trending cocktails
                                </Text>

                                <Text className="text-red-800 text-center mt-5">
                                    Error: {trendingError?.message}
                                </Text>
                            </View>
                        )}

                        <Text className="text-lg text-light-200 text-center font-bold mt-5 mb-3">
                            Random Cocktails
                        </Text>

                        {cocktailsError && (
                            <Text className="text-red-800 text-center mt-10">
                                Error:{" "}
                                {cocktailsError?.message ||
                                    trendingError?.message}
                            </Text>
                        )}
                    </>
                }
            />
        </View>
    );
}
