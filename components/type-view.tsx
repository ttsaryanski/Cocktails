import { useLocalSearchParams, useRouter, type Href } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    FlatList,
    Image,
    type NativeScrollEvent,
    type NativeSyntheticEvent,
    Pressable,
    RefreshControl,
    Text,
    useWindowDimensions,
    View,
} from "react-native";

import useFetch from "@/hooks/useFetch";
import { cocktailServices } from "@/services/cocktailServices";

import SavedCocktailCard from "@/components/cocktail-saved-card";
import TypeCard from "./type-option-card";

import { Ionicons } from "@expo/vector-icons";

import { types } from "@/constants/alcoholic-types";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";

type TypeViewProps = {
    showBackButton?: boolean;
    backRoute?: Href;
};

const TypeView = ({
    showBackButton = true,
    backRoute = "/explore",
}: TypeViewProps) => {
    const router = useRouter();
    const listRef = useRef<FlatList>(null);
    const { width, height } = useWindowDimensions();
    const isLandscape = width > height;
    const { type } = useLocalSearchParams<{ type: string }>();
    const [selectedType, setSelectedType] = useState<string>(
        type ?? "Alcoholic",
    );
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = event.nativeEvent.contentOffset.y;

        setShowScrollToTop(offsetY > 400);
    };

    const usedTitle = (selectedType: string) => {
        return selectedType === "Alcoholic"
            ? "Alcoholic"
            : selectedType === "Non_Alcoholic"
              ? "Non alcoholic"
              : "Optional alcohol";
    };

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
        <View className={`flex-1 bg-primary ${isLandscape ? "px-12" : ""}`}>
            <Image
                source={images.bg}
                className="flex-1 absolute w-full z-0"
                resizeMode="cover"
            />

            <FlatList
                ref={listRef}
                onScroll={handleScroll}
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
                    paddingBottom: isLandscape ? 50 : 100,
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
                            {showBackButton && (
                                <Pressable
                                    onPress={() => {
                                        router.push(backRoute);
                                    }}
                                    className="absolute left-0 p-3 mt-10"
                                >
                                    <Ionicons
                                        name="caret-back-sharp"
                                        size={24}
                                        color="#A8B5DB"
                                    />
                                </Pressable>
                            )}

                            <Image
                                source={icons.logo}
                                className="w-16 h-16 mt-10 mb-1"
                            />
                        </View>

                        <View className="mt-3 items-center">
                            <FlatList
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                className="my-3"
                                data={types ?? []}
                                contentContainerStyle={{
                                    paddingRight: 3,
                                }}
                                renderItem={({ item }) => (
                                    <TypeCard
                                        onPress={() =>
                                            setSelectedType(item.value)
                                        }
                                        focused={selectedType === item.value}
                                        label={item.label}
                                    />
                                )}
                                keyExtractor={(item) => item.id.toString()}
                                ItemSeparatorComponent={() => (
                                    <View className="w-3" />
                                )}
                            />
                        </View>

                        <Text className="text-lg text-center text-light-200 font-bold mb-5">
                            {usedTitle(selectedType)} cocktails
                        </Text>

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

            {showScrollToTop && (
                <Pressable
                    onPress={() =>
                        listRef.current?.scrollToOffset({
                            offset: 0,
                            animated: true,
                        })
                    }
                    className={`absolute ${isLandscape ? "right-16 bottom-16" : "right-5 bottom-32"} w-14 h-14 rounded-full bg-dark-100 items-center justify-center`}
                    style={{ elevation: 5 }}
                >
                    <Ionicons name="arrow-up" size={26} color="#A8B5DB" />
                </Pressable>
            )}
        </View>
    );
};

export default TypeView;
