import { Image, Pressable, Text, TextInput, View } from "react-native";

import { icons } from "../constants/icons";

interface Props {
    onPress?: () => void;
    onChangeText?: (text: string) => void;
    placeholder: string;
    value?: string;
}

const SearchBar = ({ onPress, onChangeText, placeholder, value }: Props) => {
    const onClear = () => {
        onChangeText?.("");
    };

    return (
        <View className="flex-row items-center bg-dark-200 rounded-full pl-5 py-4">
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
                className="flex-1 ml-2 text-indigo-200"
            />

            {!!value && (
                <Pressable
                    onPress={onClear}
                    className="mr-2 rounded-full"
                    style={{ backgroundColor: "#AB8BFF" }}
                >
                    <Text className=" p-3" style={{ color: "#221F3D" }}>
                        Clear
                    </Text>
                </Pressable>
            )}
        </View>
    );
};

export default SearchBar;
