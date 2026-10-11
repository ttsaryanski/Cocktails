import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useEffect } from "react";
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useFetch from "../hooks/useFetch";
import { cocktailServices } from "../services/cocktailServices";

import { Image } from "@/utils/expo-image";

interface FooterProps {
    glass: string;
    isLandscape: boolean;
}
const GlassFooter = ({ glass, isLandscape }: FooterProps) => {
    const {
        data: details,
        loading,
        error,
        refetch,
    } = useFetch(() => cocktailServices.filterByGlass(glass), false);

    useEffect(() => {
        refetch();
    }, [glass, refetch]);

    if (loading && !details)
        return (
            <SafeAreaView className="bg-primary flex-1">
                <ActivityIndicator />
            </SafeAreaView>
        );

    if (!loading && !error && !details) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center bg-primary px-5">
                <Text className="text-center text-light-200">
                    Glass not found.
                </Text>
            </SafeAreaView>
        );
    }

    return (
        <View className="px-2">
            <ScrollView>
                {loading ? (
                    <ActivityIndicator
                        size="large"
                        color="#0000ff"
                        className="mt-10 self-center"
                    />
                ) : error && !details ? (
                    <Text className="text-red-800 text-center mt-10">
                        Error: {error?.message}
                    </Text>
                ) : (
                    <View>
                        <View className="relative flex-row items-center justify-start my-5">
                            <Link
                                href={{
                                    pathname: "/glasses/[glass]",
                                    params: { glass },
                                }}
                                asChild
                            >
                                <Pressable className="flex-row items-center justify-between w-full">
                                    <Text className="text-lg text-light-200 font-bold py-3">
                                        View Cocktails with
                                    </Text>

                                    <Ionicons
                                        name="caret-forward-sharp"
                                        size={24}
                                        color="#A8B5DB"
                                    />
                                </Pressable>
                            </Link>
                        </View>

                        <Text className="text-light-100 text-center font-bold text-2xl mb-3">
                            {glass}
                        </Text>

                        <Image
                            source={{
                                uri: details?.drinks?.[0].strDrinkThumb,
                            }}
                            className={`self-center ${!isLandscape ? "w-full" : "w-[400px]"} h-[400px]`}
                            contentFit="fill"
                            transition={200}
                            cachePolicy="memory-disk"
                            alt={`${glass} image`}
                        />
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default GlassFooter;
