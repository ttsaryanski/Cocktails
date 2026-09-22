import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
    Image,
    Linking,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { icons } from "../../constants/icons";
import { images } from "../../constants/images";

const Settings = () => {
    return (
        <View className="flex-1 bg-primary">
            <Image
                source={images.bg}
                className="flex-1 absolute w-full z-0"
                resizeMode="cover"
            />
            <ScrollView
                className="flex-1 px-2 flexGrow-1"
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

                <View className="mt-4 mt-auto mb-36 flex-end">
                    <TouchableOpacity
                        onPress={() =>
                            Linking.openURL(
                                "https://ttsaryanski.github.io/Cocktails-PrivacyPolicy",
                            )
                        }
                        className="flex-row items-center bg-dark-100 px-2 py-5 rounded-md"
                    >
                        <MaterialCommunityIcons
                            name="shield-link-variant-outline"
                            size={24}
                            color="#A8B5DB"
                        />

                        <Text className="text-light-200 ml-2">
                            Privacy Policy
                        </Text>

                        <Ionicons
                            name="open-outline"
                            size={20}
                            color="#A8B5DB"
                            className="ml-auto"
                        />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default Settings;
