import { Link } from "expo-router";
import { Image, Text, TouchableOpacity } from "react-native";

interface SavedCardProps {
    cocktail: SavedCocktail;
}
const SavedCocktailCard = ({
    cocktail: { cocktail_id, title, img_url },
}: SavedCardProps) => {
    return (
        <Link href={`/cocktails/${cocktail_id}`} asChild>
            <TouchableOpacity className="w-[30%]">
                <Image
                    source={{ uri: img_url }}
                    className="w-full h-52 rounded-lg"
                    resizeMode="cover"
                />

                <Text
                    className="text-sm font-bold mt-2 text-light-200"
                    numberOfLines={1}
                >
                    {title}
                </Text>
            </TouchableOpacity>
        </Link>
    );
};

export default SavedCocktailCard;
