import {
    ActivityIndicator,
    FlatList,
    Image,
    RefreshControl,
    ScrollView,
    Text,
    View,
} from "react-native";

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
            <Image source={images.bg} className="absolute w-full z-0" />

            <ScrollView
                className="flex-1 px-5"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
                refreshControl={
                    <RefreshControl
                        refreshing={trendingLoading || cocktailsLoading}
                        onRefresh={handleRefresh}
                        tintColor="#AB8BFF"
                    />
                }
            >
                <Image
                    source={icons.logo}
                    className="w-16 h-16 mt-10 mb-1 mx-auto"
                />

                {cocktailsLoading || trendingLoading ? (
                    <ActivityIndicator
                        size="large"
                        color="#0000ff"
                        className="mt-10 self-center"
                    />
                ) : cocktailsError || trendingError ? (
                    <Text style={{ color: "indigo-200" }}>
                        Error:{" "}
                        {cocktailsError?.message || trendingError?.message}
                    </Text>
                ) : (
                    <View className="flex-1 mt-1">
                        {trendingCocktails && (
                            <View className="mt-3">
                                <Text className="text-lg text-indigo-200 text-center font-bold mb-3">
                                    Trending cocktails
                                </Text>
                                <FlatList
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    className="mb-4 mt-3"
                                    data={trendingCocktails}
                                    contentContainerStyle={{
                                        gap: 26,
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
                                        <View className="w-4" />
                                    )}
                                />
                            </View>
                        )}

                        <Text className="text-lg text-indigo-200 text-center font-bold mt-5 mb-3">
                            Random Cocktails
                        </Text>

                        <FlatList
                            data={cocktails?.drinks}
                            renderItem={({ item }) => (
                                <CocktailCard {...item} />
                            )}
                            keyExtractor={(item) => item.idDrink.toString()}
                            numColumns={2}
                            columnWrapperStyle={{
                                justifyContent: "space-between",
                                marginBottom: 10,
                            }}
                            className="mt-2 pb-32"
                            scrollEnabled={false}
                        />
                    </View>
                )}
            </ScrollView>
        </View>
    );
}
