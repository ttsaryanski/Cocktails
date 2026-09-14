import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Image,
    Pressable,
    RefreshControl,
    ScrollView,
    Text,
    View,
} from "react-native";

import SavedCocktailCard from "../../components/saved-cocktail-card";
import useFetch from "../../hooks/useFetch";
import {
    deleteAllLocalCocktails,
    getLocalSavedCocktails,
} from "../../utils/storage";

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

    const handleDeleteAll = async () => {
        Alert.alert("Clear All", "Clear all saved cocktails?", [
            {
                text: "Cancel",
                style: "cancel",
            },
            {
                text: "Clear",
                onPress: async () => {
                    await deleteAllLocalCocktails();
                    refetch();
                },
            },
        ]);
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
                    <Text className="text-light-200">
                        Error: {error?.message}
                    </Text>
                ) : (
                    <View className="flex-1 mt-1">
                        {savedCocktails && savedCocktails.length > 0 ? (
                            <View>
                                <View className="flex flex-row items-center justify-between">
                                    <Text className="text-lg text-light-200 font-bold">
                                        Saved cocktails
                                    </Text>

                                    {savedCocktails &&
                                        savedCocktails.length > 1 && (
                                            <Pressable
                                                onPress={handleDeleteAll}
                                                className="rounded-full bg-accent"
                                            >
                                                <Text className=" px-3 py-1 text-dark-100">
                                                    Clear all
                                                </Text>
                                            </Pressable>
                                        )}
                                </View>

                                <FlatList
                                    data={savedCocktails.sort((a, b) =>
                                        a.title.localeCompare(b.title),
                                    )}
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
                                    className="mt-5 pb-28"
                                    scrollEnabled={false}
                                />
                            </View>
                        ) : (
                            <View className="mt-10 px-5">
                                <Text className="text-light-300 text-center mt-10">
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
