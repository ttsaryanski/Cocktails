import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    RefreshControl,
    ScrollView,
    Text,
    View,
} from "react-native";

import SavedCocktailCard from "../../components/saved-cocktail-card";
import useFetch from "../../hooks/useFetch";
import { getLocalSavedCocktails } from "../../utils/storage";

import { icons } from "../../constants/icons";

const Save = () => {
    const {
        data: savedCocktails,
        loading,
        error,
        refetch,
    } = useFetch(getLocalSavedCocktails, false);

    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [refetch]),
    );

    const handleRefresh = async () => {
        await refetch();
    };

    return (
        <View className="flex-1 bg-primary">
            <ScrollView
                className="flex-1 px-2"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={handleRefresh}
                        tintColor="#AB8BFF"
                    />
                }
            >
                <Image
                    source={icons.logo}
                    className="w-16 h-16 mt-10 mb-1 mx-auto"
                />
                {loading ? (
                    <ActivityIndicator
                        size="large"
                        color="#0000ff"
                        className="mt-10 self-center"
                    />
                ) : error ? (
                    <Text style={{ color: "white" }}>
                        Error: {error?.message}
                    </Text>
                ) : (
                    <View className="flex-1 mt-1">
                        {savedCocktails && savedCocktails.length > 0 ? (
                            <View className="mt-3">
                                <Text className="text-lg text-white text-center font-bold mb-3">
                                    Saved cocktails
                                </Text>
                                <FlatList
                                    data={savedCocktails}
                                    renderItem={({ item }) => (
                                        <SavedCocktailCard cocktail={item} />
                                    )}
                                    keyExtractor={(item) =>
                                        item.cocktail_id.toString()
                                    }
                                    numColumns={3}
                                    columnWrapperStyle={{
                                        justifyContent: "space-between",
                                        marginBottom: 10,
                                    }}
                                    className="mt-2 pb-32"
                                    scrollEnabled={false}
                                />
                            </View>
                        ) : (
                            <View className="mt-10 px-5">
                                <Text className="text-gray-500 text-center mt-10">
                                    No saved cocktails.
                                </Text>
                            </View>
                        )}
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default Save;
