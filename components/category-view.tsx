import { useLocalSearchParams, useRouter, type Href } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
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
import { randomNumber } from "@/utils/random-number";

import CategoryCard from "@/components/category-option-card";
import SavedCocktailCard from "@/components/cocktail-saved-card";

import { Ionicons } from "@expo/vector-icons";

import { icons } from "@/constants/icons";
import { images } from "@/constants/images";

type CategoryViewProps = {
    showBackButton?: boolean;
    backRoute?: Href;
};

const CategoryView = ({
    showBackButton = true,
    backRoute = "/explore",
}: CategoryViewProps) => {
    const router = useRouter();
    const listRef = useRef<FlatList>(null);
    const categoryListRef = useRef<FlatList<{ value: string }> | null>(null);
    const { width, height } = useWindowDimensions();
    const isLandscape = width > height;
    const { category } = useLocalSearchParams<{ category: string }>();
    const [selectedCategory, setSelectedCategory] = useState<string>(
        category ?? "Cocktail",
    );
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    const {
        data: options,
        loading,
        error,
        refetch,
    } = useFetch(() => cocktailServices.getOptions("c"), false);

    const {
        data: cocktails,
        loading: cocktailsLoading,
        error: cocktailsError,
        refetch: cocktailsRefetch,
    } = useFetch(
        () => cocktailServices.filterByCategory(selectedCategory),
        false,
    );

    useEffect(() => {
        refetch();
        cocktailsRefetch();
    }, [selectedCategory, refetch, cocktailsRefetch]);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = event.nativeEvent.contentOffset.y;

        setShowScrollToTop(offsetY > 400);
    };

    const CATEGORY_ITEM_WIDTH = 150;
    const selectedCategoryIndex =
        options?.findIndex((item) => item.value === selectedCategory) ?? -1;

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
                        refreshing={loading || cocktailsLoading}
                        onRefresh={() => {
                            refetch();
                            cocktailsRefetch();
                        }}
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

                        {loading && !options && (
                            <View className="mt-3 items-center">
                                <ActivityIndicator
                                    size="small"
                                    color="#AB8BFF"
                                />
                            </View>
                        )}

                        {options && (
                            <View className="mt-3">
                                <FlatList
                                    ref={categoryListRef}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    className="my-3"
                                    data={options ?? []}
                                    contentContainerStyle={{
                                        display: "flex",
                                        gap: 10,
                                    }}
                                    getItemLayout={(_, index) => ({
                                        length: CATEGORY_ITEM_WIDTH,
                                        offset: CATEGORY_ITEM_WIDTH * index,
                                        index,
                                    })}
                                    onContentSizeChange={() => {
                                        if (selectedCategoryIndex >= 0) {
                                            categoryListRef.current?.scrollToIndex(
                                                {
                                                    index: selectedCategoryIndex,
                                                    animated: false,
                                                    viewPosition: 0.5,
                                                },
                                            );
                                        }
                                    }}
                                    renderItem={({ item }) => (
                                        <View
                                            style={{
                                                width: CATEGORY_ITEM_WIDTH,
                                                alignItems: "center",
                                            }}
                                        >
                                            <CategoryCard
                                                category={item.value}
                                                onPress={() =>
                                                    setSelectedCategory(
                                                        item.value,
                                                    )
                                                }
                                                focused={
                                                    selectedCategory ===
                                                    item.value
                                                }
                                            />
                                        </View>
                                    )}
                                    keyExtractor={(item) =>
                                        `${item.value}${randomNumber}`
                                    }
                                />
                            </View>
                        )}

                        {error && (
                            <View className="mt-3">
                                <Text className="text-lg text-light-200 text-center font-bold mb-3">
                                    Category list failed to load
                                </Text>

                                <Text className="text-red-800 text-center">
                                    Error: {error?.message}
                                </Text>
                            </View>
                        )}

                        <Text className="text-lg text-light-200 text-center font-bold mt-5 mb-3">
                            Category: {selectedCategory}
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

export default CategoryView;
