import { Link } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

import { Image } from "@/utils/expo-image";

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
                    source={{
                        uri: img_url
                            ? `${img_url}/preview`
                            : "https://placehold.co/500x400/0F0D23/A8B5DB.png",
                    }}
                    className="w-full h-52 rounded-lg"
                    contentFit="cover"
                    transition={200}
                    cachePolicy="memory-disk"
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
