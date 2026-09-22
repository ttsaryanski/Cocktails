import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import {
    Alert,
    FlatList,
    Image,
    Pressable,
    RefreshControl,
    Text,
    View,
} from "react-native";

import useFetch from "../../hooks/useFetch";
import {
    deleteAllLocalCocktails,
    getLocalSavedCocktails,
} from "../../utils/storage";

import SavedCocktailCard from "../../components/saved-cocktail-card";

import { icons } from "../../constants/icons";
import { images } from "../../constants/images";

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
            <Image source={images.bg} className="absolute w-full z-0" />

            <FlatList
                data={
                    savedCocktails?.sort((a, b) =>
                        a.title.localeCompare(b.title),
                    ) ?? []
                }
                renderItem={({ item }) => <SavedCocktailCard cocktail={item} />}
                keyExtractor={(item) => item.cocktail_id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                    justifyContent: "space-around",
                    marginBottom: 10,
                }}
                contentContainerStyle={{
                    paddingBottom: 100,
                }}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={handleRefresh}
                        tintColor="#AB8BFF"
                    />
                }
                ListHeaderComponent={
                    <>
                        <Image
                            source={icons.logo}
                            className="w-16 h-16 mt-10 mb-1 mx-auto"
                        />

                        <View className="flex flex-row flex-wrap gap-2 items-center justify-around my-5">
                            <Text className="text-lg text-light-200 font-bold">
                                Saved cocktails
                            </Text>

                            {savedCocktails && savedCocktails.length > 1 && (
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

                        {savedCocktails?.length === 0 && (
                            <View className="mt-10 px-5">
                                <Text className="text-light-200 text-center mt-10">
                                    No saved cocktails.
                                </Text>
                            </View>
                        )}

                        {error && (
                            <Text className="text-red-800 text-center mt-10">
                                Error: {error?.message}
                            </Text>
                        )}
                    </>
                }
            />
        </View>
    );
};

export default Save;
