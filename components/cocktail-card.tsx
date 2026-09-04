import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { icons } from "../constants/icons";

const CoocktailCard = ({
    idDrink,
    strDrinkThumb,
    strDrink,
    dateModified,
}: Drink) => {
    return (
        <Link href={`/cocktails/${idDrink}`} asChild>
            <TouchableOpacity className="w-[50%]">
                <Image
                    source={{ uri: strDrinkThumb }}
                    className="w-full h-52 rounded-lg"
                    resizeMode="cover"
                />

                <Text
                    className="text-sm font-bold text-white mt-2"
                    numberOfLines={1}
                >
                    {strDrink}
                </Text>

                <View className="flex-row items-center justify-start gap-x-1">
                    <Image source={icons.star} className="size-4" />
                    <Text className="text-xs text-white font-bold uppercase">
                        {Math.round(10 / 2)}
                    </Text>
                </View>

                <View className="flex-row items-center justify-between">
                    <Text className="text-xs text-light-300 font-medium mt-1">
                        {dateModified?.split("-")[0]}
                    </Text>
                    <Text className="text-xs font-medium text-light-300 uppercase">
                        Cocktail
                    </Text>
                </View>
            </TouchableOpacity>
        </Link>
    );
};

export default CoocktailCard;
