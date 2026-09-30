import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    FlatList,
    Image,
    Pressable,
    RefreshControl,
    Text,
    View,
} from "react-native";

import useFetch from "../../hooks/useFetch";
import { cocktailServices } from "../../services/cocktailServices";

import SavedCocktailCard from "../../components/saved-cocktail-card";

import { Ionicons } from "@expo/vector-icons";

import { icons } from "../../constants/icons";
import { images } from "../../constants/images";

const Glass = () => {
    const { glass } = useLocalSearchParams<{ glass: string }>();
    const router = useRouter();
    const listRef = useRef<FlatList>(null);

    const [showScrollToTop, setShowScrollToTop] = useState(false);

    const {
        data: cocktails,
        loading: cocktailsLoading,
        error: cocktailsError,
        refetch: cocktailsRefetch,
    } = useFetch(() => cocktailServices.filterByGlass(glass), false);

    useEffect(() => {
        cocktailsRefetch();
    }, [glass, cocktailsRefetch]);

    const handleScroll = (event: any) => {
        const offsetY = event.nativeEvent.contentOffset.y;

        setShowScrollToTop(offsetY > 400);
    };

    return (
        <View className="flex-1 bg-primary">
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
                    paddingBottom: 100,
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={cocktailsLoading}
                        onRefresh={() => {
                            cocktailsRefetch();
                        }}
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

                        <Text className="text-lg text-light-200 text-center font-bold mt-5 mb-3">
                            Glass{" "}
                            <Text className="text-2xl text-light-100">
                                {" "}
                                {glass}{" "}
                            </Text>
                        </Text>

                        {cocktailsError && (
                            <Text className="text-red-800 text-center mt-3">
                                Error: {cocktailsError?.message}
                            </Text>
                        )}

                        {!cocktailsLoading &&
                            !cocktailsError &&
                            cocktails?.drinks.length === 0 && (
                                <Text className="text-light-200 text-center mt-10">
                                    No glass-specific cocktails.
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
                    className="absolute bottom-32 right-5 w-14 h-14 rounded-full bg-dark-100 items-center justify-center"
                    style={{ elevation: 5 }}
                >
                    <Ionicons name="arrow-up" size={26} color="#A8B5DB" />
                </Pressable>
            )}
        </View>
    );
};

export default Glass;
