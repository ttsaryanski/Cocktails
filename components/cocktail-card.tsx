import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

const CocktailCard = ({
    idDrink,
    strDrinkThumb,
    strDrink,
    strAlcoholic,
}: Cocktail) => {
    return (
        <Link href={`/cocktails/${idDrink}`} asChild>
            <TouchableOpacity className="w-[45%]">
                <Image
                    source={{
                        uri: strDrinkThumb
                            ? strDrinkThumb
                            : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
                    }}
                    className="w-full h-52 rounded-lg"
                    resizeMode="cover"
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
