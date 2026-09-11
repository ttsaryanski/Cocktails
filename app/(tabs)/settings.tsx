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

const Settings = () => {
    return (
        <View className="flex-1 bg-primary">
            <ScrollView
                className="flex-1 px-2 flexGrow-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
            >
                <Image
                    source={icons.gear}
                    className="w-8 h-8 mt-12 mb-2 mx-auto"
                    tintColor="#fff"
                />

                <Text className="text-gray-500 text-center">Settings</Text>

                <View className="mt-4 mt-auto mb-36 flex-end">
                    <TouchableOpacity
                        onPress={() =>
                            Linking.openURL(
                                "https://ttsaryanski.github.io/Cocktails-PrivacyPolicy",
                            )
                        }
                        className="flex flex-row bg-slate-600 px-2 py-5 rounded-md"
                    >
                        <MaterialCommunityIcons
                            name="shield-link-variant-outline"
                            size={24}
                            color="#C6D2FF"
                        />

                        <Text className="text-indigo-200 ml-2">
                            Privacy Policy
                        </Text>

                        <Ionicons
                            name="open-outline"
                            size={20}
                            color="#C6D2FF"
                            className="ml-auto"
                        />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default Settings;
