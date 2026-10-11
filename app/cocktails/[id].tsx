import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Linking,
    Pressable,
    ScrollView,
    Share,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useFetch from "../../hooks/useFetch";
import { cocktailServices } from "../../services/cocktailServices";

import { Image } from "@/utils/expo-image";
import { extractIngredients } from "../../utils/extractIngredients";
import {
    deleteLocalCocktail,
    getLocalLanguage,
    getLocalSavedCocktails,
    saveLocalCocktail,
} from "../../utils/storage";

import Feather from "@expo/vector-icons/Feather";

import { icons } from "../../constants/icons";
import { languages } from "../../constants/language";

const Details = () => {
    const { id } = useLocalSearchParams();
    const [isSaved, setIsSaved] = useState(false);
    const { width, height } = useWindowDimensions();
    const isLandscape = width > height;

    const [language, setLanguage] = useState<string>("en");

    const { data, loading, error } = useFetch(async () => {
        const [detailsResponse, savedCocktails, localLanguage] =
            await Promise.all([
                cocktailServices.getDetails(id as string),
                getLocalSavedCocktails(),
                getLocalLanguage(),
            ]);

        const cocktaillId = Number(id);
        return {
            detailsResponse,
            isSaved: savedCocktails.some(
                (cocktail) => cocktail.cocktail_id === cocktaillId,
            ),
            language: localLanguage,
        };
    });

    useEffect(() => {
        if (data) {
            setIsSaved(data.isSaved);
            setLanguage(data.language || "en");
        }
    }, [data]);

    const details: Cocktail | undefined = data?.detailsResponse.drinks[0];
    const ingredients = details ? extractIngredients(details) : [];
    const languageFlag = languages.find((item) => item.code === language)?.flag;
    const instructions = details ? Instructions({ details, language }) : "N/A";

    if (loading && !data)
        return (
            <SafeAreaView className="bg-primary flex-1">
                <ActivityIndicator />
            </SafeAreaView>
        );

    if (!loading && !error && !details) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center bg-primary px-5">
                <Text className="text-center text-light-200">
                    Cocktail not found.
                </Text>
            </SafeAreaView>
        );
    }

    const openVideo = () => {
        if (details?.strVideo) {
            Linking.openURL(details?.strVideo);
        }
        return;
    };

    const onSave = async () => {
        if (!details) {
            return;
        }

        const cocktailId = Number(details.idDrink);

        if (isSaved) {
            await deleteLocalCocktail(cocktailId);
            setIsSaved(false);
        } else {
            await saveLocalCocktail({
                cocktail_id: cocktailId,
                title: details.strDrink,
                img_url: details.strDrinkThumb ?? "",
            });
            setIsSaved(true);
        }
    };

    const shareCocktail = async () => {
        if (!details) return;
        try {
            const ingredientList = ingredients
                .map(({ name, measure }) =>
                    measure ? `- ${measure} - ${name}` : `- ${name}`,
                )
                .join("\n");

            await Share.share({
                message: [
                    details.strDrink,
                    "Ingredients:",
                    ingredientList || "No ingredients listed.",
                    "Instructions:",
                    instructions || "No instructions available.",
                    "Cocktails – Bar in Pocket",
                    "https://play.google.com/store/apps/details?id=com.ttsaryanski.cocktails",
                ].join("\n\n"),
            });
        } catch (error) {
            console.error("Error sharing cocktail:", error);
        }
    };

    return (
        <View className={`flex-1 bg-primary ${isLandscape ? "px-16" : ""}`}>
            <ScrollView
                contentContainerStyle={{ paddingBottom: isLandscape ? 10 : 70 }}
            >
                {loading ? (
                    <ActivityIndicator
                        size="large"
                        color="#0000ff"
                        className="mt-10 self-center"
                    />
                ) : error && !data ? (
                    <Text className="text-red-800 text-center mt-10">
                        Error: {error?.message}
                    </Text>
                ) : (
                    <>
                        <View>
                            <Image
                                source={{
                                    uri: `${details?.strDrinkThumb}`,
                                }}
                                className={`self-center w-full h-[400px]`}
                                contentFit="fill"
                                transition={200}
                                cachePolicy="memory-disk"
                            />

                            {details?.strVideo && (
                                <TouchableOpacity
                                    onPress={openVideo}
                                    className="absolute bottom-5 right-5 rounded-full size-14 bg-light-500 flex items-center justify-center"
                                >
                                    <Image
                                        source={icons.play}
                                        className="w-6 h-7 ml-1"
                                        contentFit="fill"
                                    />
                                </TouchableOpacity>
                            )}

                            <TouchableOpacity
                                onPress={onSave}
                                className="absolute bottom-5 left-5 rounded-full size-14 bg-light-500 flex items-center justify-center"
                            >
                                <Image
                                    source={
                                        isSaved ? icons.saved : icons.unsaved
                                    }
                                    className="w-8 h-8"
                                    contentFit="fill"
                                />
                            </TouchableOpacity>
                        </View>

                        <View className="flex-col items-start justify-center mt-5 px-5">
                            <View className="flex-row items-center justify-between w-full">
                                <Text className="text-light-200 font-bold text-xl">
                                    {details?.strDrink}
                                </Text>

                                <Pressable
                                    onPress={shareCocktail}
                                    className="bg-light-500 rounded-full p-3"
                                >
                                    <Feather
                                        name="share-2"
                                        size={24}
                                        color="#221F3D"
                                    />
                                </Pressable>
                            </View>

                            <CocktailInfo
                                label="Category"
                                value={details?.strCategory}
                            />

                            {details?.strAlcoholic === "Non alcoholic" ? (
                                <View className="mt-2 bg-green-800 rounded-md px-2 py-1">
                                    <Text className="text-xs text-light-200">
                                        {details?.strAlcoholic}
                                    </Text>
                                </View>
                            ) : (
                                <View className="mt-2 bg-red-800 rounded-md px-2 py-1">
                                    <Text className="text-xs text-light-200">
                                        {details?.strAlcoholic}
                                    </Text>
                                </View>
                            )}

                            <CocktailInfo
                                label="Glass"
                                value={details?.strGlass}
                            />

                            <Text className="text-light-200 font-normal text-sm mt-5 mb-2">
                                Ingredients
                            </Text>

                            {ingredients.map((ingredient, index) => (
                                <View
                                    key={index}
                                    className="flex flex-row gap-1"
                                >
                                    {ingredient.measure && (
                                        <Text className="text-light-200 font-normal text-sm">
                                            {ingredient.measure} -
                                        </Text>
                                    )}
                                    <Text className="text-light-200 font-bold text-sm">
                                        {ingredient.name}
                                    </Text>
                                </View>
                            ))}

                            <CocktailInfo
                                label="Overview"
                                value={instructions}
                                flag={languageFlag}
                            />
                        </View>
                    </>
                )}
            </ScrollView>
        </View>
    );
};

export default Details;

const CocktailInfo = ({ label, value, flag }: CocktailInfoProps) => (
    <View className="flex-col items-start justify-center mt-5">
        <Text className="text-light-200 font-normal text-sm">
            {label}
            {flag && `  ${flag}`}
        </Text>
        <Text className="text-light-200 font-bold text-sm mt-2">
            {value || "N/A"}
        </Text>
    </View>
);

const Instructions = ({
    details,
    language,
}: {
    details: Cocktail;
    language: string;
}): string => {
    switch (language) {
        case "es":
            return details?.strInstructionsES || "N/A";
        case "de":
            return details?.strInstructionsDE || "N/A";
        case "fr":
            return details?.strInstructionsFR || "N/A";
        case "it":
            return details?.strInstructionsIT || "N/A";
        case "zh-hans":
            return details?.["strInstructionsZH-HANS"] || "N/A";
        case "zh-hant":
            return details?.["strInstructionsZH-HANT"] || "N/A";
        default:
            return details?.strInstructions || "N/A";
    }
};
