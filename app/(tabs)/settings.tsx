import { Link } from "expo-router";
import {
    Image,
    Linking,
    Pressable,
    ScrollView,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from "react-native";

import LanguageSelect from "@/components/language";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { icons } from "@/constants/icons";
import { images } from "@/constants/images";

const Settings = () => {
    const { width, height } = useWindowDimensions();
    const isLandscape = width > height;

    return (
        <View className={`flex-1 bg-primary ${isLandscape ? "px-12" : ""}`}>
            <Image
                source={images.bg}
                className="flex-1 absolute w-full z-0"
                resizeMode="cover"
            />
            <ScrollView
                className="flex-1 px-2"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
            >
                <Image
                    source={icons.logo}
                    className="w-16 h-16 mt-10 mb-1 mx-auto"
                />

                <Text className="text-lg text-light-200 text-center font-bold mb-10">
                    Settings
                </Text>

                <LanguageSelect />

                <Link href="/about" asChild>
                    <Pressable className="flex-row items-center bg-dark-100 my-8 px-2 py-5 w-full rounded-md">
                        <MaterialCommunityIcons
                            name="information-variant-circle-outline"
                            size={24}
                            color="#A8B5DB"
                        />

                        <Text className="text-light-200 ml-2">About</Text>
                    </Pressable>
                </Link>

                <TouchableOpacity
                    onPress={() =>
                        Linking.openURL(
                            "https://ttsaryanski.github.io/Cocktails-PrivacyPolicy",
                        )
                    }
                    className={`flex-row items-center bg-dark-100 px-2 py-5 rounded-md mt-auto  ${isLandscape ? " mb-20" : "mb-36"}`}
                >
                    <MaterialCommunityIcons
                        name="shield-link-variant-outline"
                        size={24}
                        color="#A8B5DB"
                    />

                    <Text className="text-light-200 ml-2">Privacy Policy</Text>

                    <Ionicons
                        name="open-outline"
                        size={20}
                        color="#A8B5DB"
                        className="ml-auto"
                    />
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default Settings;
