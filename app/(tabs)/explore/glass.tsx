import { useRouter } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    Pressable,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import useFetch from "../../../hooks/useFetch";
import { cocktailServices } from "../../../services/cocktailServices";
import { randomNumber } from "./category";

import { Ionicons } from "@expo/vector-icons";

import GlassFooter from "../../../components/glass-footer";

import { icons } from "../../../constants/icons";
import { images } from "../../../constants/images";

const Glass = () => {
    const router = useRouter();
    const listRef = useRef<FlatList>(null);

    const [query, setQuery] = useState("");
    const [selectedGlass, setSelectedGlass] =
        useState<string>("Cocktail glass");
    const [showScrollToTop, setShowScrollToTop] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const [showAllOptions, setShowAllOptions] = useState(false);

    const {
        data: options,
        loading,
        error,
        refetch,
    } = useFetch(() => cocktailServices.getOptions("g"), false);

    const filteredOptions = useMemo(() => {
        if (!query || query.length < 1) return [];
        return options?.filter((item) =>
            item.value.toLowerCase().includes(query.toLowerCase()),
        );
    }, [query, options]);

    useEffect(() => {
        refetch();
    }, [selectedGlass, refetch]);

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

            {loading && !options && (
                <View className="mt-3 items-center">
                    <ActivityIndicator size="small" color="#AB8BFF" />
                </View>
            )}

            <FlatList
                ref={listRef}
                onScroll={handleScroll}
                data={
                    isSelected
                        ? []
                        : showAllOptions
                          ? (options ?? [])
                          : (filteredOptions ?? [])
                }
                keyboardShouldPersistTaps="handled"
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                            setSelectedGlass(item.value);
                            setQuery(item.value);
                            setIsSelected(true);
                        }}
                        className={` ${isSelected && selectedGlass === item.value ? "" : "w-2/3 mx-auto items-center px-4 py-3 border-b border-light-200"}`}
                    >
                        {(!isSelected || selectedGlass !== item.value) && (
                            <Text className="text-center text-light-200">
                                {item.value}
                            </Text>
                        )}
                    </TouchableOpacity>
                )}
                contentContainerStyle={{
                    paddingBottom: 150,
                }}
                keyExtractor={(item) => `${item.value}${randomNumber}`}
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

                        {error && (
                            <View className="mt-3">
                                <Text className="text-lg text-light-200 text-center font-bold mb-3">
                                    Glasses list failed to load
                                </Text>

                                <Text className="text-red-800 text-center">
                                    Error: {error?.message}
                                </Text>
                            </View>
                        )}

                        <Text className="text-lg text-light-200 text-center font-bold mt-5 mb-3">
                            Glasses
                        </Text>

                        <TextInput
                            value={query}
                            onFocus={() => {
                                setIsSelected(false);
                                setShowAllOptions(true);
                            }}
                            onChangeText={(text) => {
                                setQuery(text);
                                setIsSelected(false);
                                setShowAllOptions(false);
                            }}
                            placeholder="Search glass..."
                            placeholderTextColor="#a8b5db"
                            className="border border-light-200 rounded-lg mx-2 px-4 py-3 text-light-200 bg-dark-100"
                            numberOfLines={1}
                            multiline={false}
                            maxFontSizeMultiplier={1.2}
                        />
                    </>
                }
                ListFooterComponent={<GlassFooter glass={selectedGlass} />}
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
