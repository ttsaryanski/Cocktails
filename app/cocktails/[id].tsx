import { useLocalSearchParams } from "expo-router";
import {
    ActivityIndicator,
    Image,
    Linking,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useFetch from "../../hooks/useFetch";
import { cocktailServices } from "../../services/cocktailServices";
import { extractIngredients } from "../../utils/extractIngredients";

import { icons } from "../../constants/icons";

const MovieInfo = ({ label, value }: CocktailInfoProps) => (
    <View className="flex-col items-start justify-center mt-5">
        <Text className="text-light-200 font-normal text-sm">{label}</Text>
        <Text className="text-light-100 font-bold text-sm mt-2">
            {value || "N/A"}
        </Text>
    </View>
);

const Details = () => {
    const { id } = useLocalSearchParams();

    const { data, loading, error } = useFetch(() =>
        cocktailServices.getDetails(id as string),
    );
    const details: Cocktail = data?.drinks[0];
    const ingredients = details ? extractIngredients(details) : [];

    if (loading)
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
        if (details.strVideo) {
            Linking.openURL(details.strVideo);
        }
        return;
    };

    return (
        <View className="bg-primary flex-1">
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                {loading ? (
                    <ActivityIndicator
                        size="large"
                        color="#0000ff"
                        className="mt-10 self-center"
                    />
                ) : error ? (
                    <Text style={{ color: "white" }}>
                        Error: {error?.message}
                    </Text>
                ) : (
                    <>
                        <View>
                            <Image
                                source={{
                                    uri: `${details?.strDrinkThumb}`,
                                }}
                                className="w-full h-[400px]"
                                resizeMode="stretch"
                            />

                            {details?.strVideo && (
                                <TouchableOpacity
                                    onPress={openVideo}
                                    className="absolute bottom-5 right-5 rounded-full size-14 bg-white flex items-center justify-center"
                                >
                                    <Image
                                        source={icons.play}
                                        className="w-6 h-7 ml-1"
                                        resizeMode="stretch"
                                    />
                                </TouchableOpacity>
                            )}
                        </View>

                        <View className="flex-col items-start justify-center mt-5 px-5">
                            <Text className="text-white font-bold text-xl">
                                {details?.strDrink}
                            </Text>

                            <MovieInfo
                                label="Category"
                                value={details?.strCategory}
                            />

                            {details?.strAlcoholic === "Non alcoholic" ? (
                                <View className="mt-2 bg-green-500 rounded-md p-1">
                                    <Text className="text-xs text-white">
                                        {details?.strAlcoholic}
                                    </Text>
                                </View>
                            ) : (
                                <View className="mt-2 bg-red-500 rounded-md p-1">
                                    <Text className="text-xs text-white">
                                        {details?.strAlcoholic}
                                    </Text>
                                </View>
                            )}

                            <MovieInfo
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
                                    <Text className="text-light-100 font-bold text-sm">
                                        {ingredient.name}
                                    </Text>
                                </View>
                            ))}

                            <MovieInfo
                                label="Overview"
                                value={details?.strInstructions}
                            />
                        </View>
                    </>
                )}
            </ScrollView>
        </View>
    );
};

export default Details;
