import { Image, TextInput, View } from "react-native";

import { icons } from "../constants/icons";

interface Props {
    onPress?: () => void;
    onChangeText?: (text: string) => void;
    placeholder: string;
    value?: string;
}

const SearchBar = ({ onPress, onChangeText, placeholder, value }: Props) => {
    return (
        <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
            <Image
                source={icons.search}
                className="size-5"
                resizeMode="contain"
                tintColor="#ab8bff"
            />

            <TextInput
                onPress={onPress}
                onChangeText={onChangeText}
                placeholder={placeholder}
                value={value}
                placeholderTextColor="#a8b5db"
                className="flex-1 ml-2 text-white"
            />
        </View>
    );
};

export default SearchBar;
