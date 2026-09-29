import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useEffect } from "react";
import {
    ActivityIndicator,
    Image,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useFetch from "../hooks/useFetch";
import { cocktailServices } from "../services/cocktailServices";

interface FooterProps {
    ingredient: string;
}
const Footer = ({ ingredient }: FooterProps) => {
    const router = useRouter();

    const {
        data: details,
        loading,
        error,
        refetch,
    } = useFetch(() => cocktailServices.getIngredientByName(ingredient), false);

    useEffect(() => {
        refetch();
    }, [ingredient, refetch]);

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
                    Ingredient not found.
                </Text>
            </SafeAreaView>
        );
    }

    return (
        <View className="px-2">
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
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
                                    pathname: "/ingredients/[ingredient]",
                                    params: { ingredient },
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

                        <Image
                            source={{
                                uri: `https://www.thecocktaildb.com/images/ingredients/${ingredient}.png`,
                            }}
                            className="w-full h-[400px]"
                            resizeMode="stretch"
                        />

                        <Text className="text-light-200 font-bold text-2xl">
                            {ingredient}
                        </Text>

                        <CocktailInfo
                            label="Type"
                            value={details?.ingredients[0].strType}
                        />

                        <CocktailInfo
                            label="Alcohol"
                            value={details?.ingredients[0].strAlcohol}
                        />

                        <CocktailInfo
                            label="ABV"
                            value={details?.ingredients[0].strABV}
                        />

                        <CocktailInfo
                            label="Overview"
                            value={details?.ingredients[0].strDescription}
                        />
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default Footer;

const CocktailInfo = ({ label, value }: CocktailInfoProps) => (
    <View className="flex-col items-start justify-center mt-5">
        <Text className="text-light-200 font-normal text-sm">{label}</Text>
        <Text className="text-light-200 font-bold text-sm mt-2">
            {value || "N/A"}
        </Text>
    </View>
);
