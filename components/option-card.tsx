import { Text, TouchableOpacity } from "react-native";

interface CategoryCardProps {
    category?: string;
    onPress?: () => void;
    focused?: boolean;
    label?: string;
}
const CategoryCard = ({
    category,
    onPress,
    focused,
    label,
}: CategoryCardProps) => {
    return (
        <TouchableOpacity
            className={`w-content relative px-5 py-2 rounded-full ${focused ? "bg-light-200" : "bg-dark-100"}`}
            onPress={onPress}
        >
            <Text
                className={`text-sm font-bold ${focused ? "text-dark-100" : "text-light-200"}`}
                numberOfLines={1}
            >
                {category ?? label}
            </Text>
        </TouchableOpacity>
    );
};

export default CategoryCard;
