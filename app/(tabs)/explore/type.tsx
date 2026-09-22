import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

import {
    FlatList,
    Image,
    Pressable,
    RefreshControl,
    Text,
    View,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import useFetch from "../../../hooks/useFetch";
import { cocktailServices } from "../../../services/cocktailServices";

import SavedCocktailCard from "../../../components/saved-cocktail-card";

import { icons } from "../../../constants/icons";
import { images } from "../../../constants/images";

const ExploreByType = () => {
    const router = useRouter();

    const [selectedType, setSelectedType] = useState<string>("Alcoholic");

    const usedClass =
        selectedType === "Alcoholic"
            ? 1
            : selectedType === "Non_Alcoholic"
              ? 2
              : 3;

    const {
        data: cocktails,
        loading,
        error,
        refetch,
    } = useFetch(() => cocktailServices.filterByType(selectedType), false);

    useEffect(() => {
        refetch();
    }, [selectedType, refetch]);

    return (
        <View className="flex-1 bg-primary">
            <Image
                source={images.bg}
                className="flex-1 absolute w-full z-0"
                resizeMode="cover"
            />

            <FlatList
                data={cocktails?.drinks ?? []}
                renderItem={({ item }) => (
                    <SavedCocktailCard
                        cocktail={{
                            cocktail_id: item.idDrink,
                            title: item.strDrink,
                            img_url: item.strDrinkThumb,
                            ...item,
                        }}
                    />
                )}
                keyExtractor={(item) => item.idDrink.toString()}
                numColumns={3}
                columnWrapperStyle={{
                    justifyContent: "space-around",
                    marginBottom: 10,
                }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 5,
                    paddingBottom: 100,
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={refetch}
                        tintColor="#AB8BFF"
                    />
                }
                ListHeaderComponent={
                    <>
                        <View className="relative flex-row items-center justify-center">
                            <Pressable
                                onPress={() => {
                                    router.back();
                                }}
                                className="absolute left-0 p-3 mt-10"
                            >
                                <Ionicons
                                    name="caret-back-sharp"
                                    size={24}
                                    color="#A8B5DB"
                                />
                            </Pressable>

                            <Image
                                source={icons.logo}
                                className="w-16 h-16 mt-10 mb-1"
                            />
                        </View>

                        <View className="flex-row flex-wrap gap-2 justify-around my-5">
                            <Pressable
                                onPress={() => {
                                    setSelectedType("Alcoholic");
                                }}
                                className={`p-3 rounded-lg ${
                                    usedClass === 1
                                        ? "bg-red-100"
                                        : "bg-red-400"
                                }`}
                            >
                                <Text className="text-dark-100 text-sm font-bold">
                                    Alcoholic
                                </Text>
                            </Pressable>

                            <Pressable
                                onPress={() => {
                                    setSelectedType("Non_Alcoholic");
                                }}
                                className={`p-3 rounded-lg ${
                                    usedClass === 2
                                        ? "bg-green-100"
                                        : "bg-green-400"
                                }`}
                            >
                                <Text className="text-dark-100 text-sm font-bold">
                                    Non alcoholic
                                </Text>
                            </Pressable>

                            <Pressable
                                onPress={() => {
                                    setSelectedType("Optional_Alcohol");
                                }}
                                className={`p-3 rounded-lg ${
                                    usedClass === 3
                                        ? "bg-red-100"
                                        : "bg-red-400"
                                }`}
                            >
                                <Text className="text-dark-100 text-sm font-bold">
                                    Optional alcohol
                                </Text>
                            </Pressable>
                        </View>

                        {error && (
                            <Text className="text-red-800 text-center mt-10">
                                Error: {error?.message}
                            </Text>
                        )}

                        {!loading &&
                            !error &&
                            cocktails?.drinks.length === 0 && (
                                <Text className="text-light-200 text-center mt-10">
                                    No type-specific cocktails.
                                </Text>
                            )}
                    </>
                }
            />
        </View>
    );
};

export default ExploreByType;
