import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

import { Image } from "@/utils/expo-image";

type CocktailCardProps = Cocktail & {
    onPress?: () => void;
};
const CocktailCard = ({
    idDrink,
    strDrinkThumb,
    strDrink,
    strAlcoholic,
    onPress,
}: CocktailCardProps) => {
    return (
        <Link href={`/cocktails/${idDrink}`} asChild onPress={onPress}>
            <TouchableOpacity className="w-[45%]">
                <Image
                    source={
                        strDrinkThumb
                            ? strDrinkThumb
                            : "https://placehold.co/500x400/0F0D23/A8B5DB.png"
                    }
                    className="w-full h-52 rounded-lg bg-[#0F0D23]"
                    contentFit="cover"
                    cachePolicy="memory-disk"
                    recyclingKey={idDrink}
                />

                <Text
                    className="text-sm font-bold text-light-200 my-2"
                    numberOfLines={1}
                >
                    {strDrink}
                </Text>

                {strAlcoholic === "Non alcoholic" ? (
                    <View className="self-start bg-green-800 rounded-md p-1">
                        <Text className="text-xs text-light-200">
                            {strAlcoholic}
                        </Text>
                    </View>
                ) : (
                    <View className="self-start bg-red-800 rounded-md p-1">
                        <Text className="text-xs text-light-200">
                            {strAlcoholic}
                        </Text>
                    </View>
                )}
            </TouchableOpacity>
        </Link>
    );
};

export default CocktailCard;
