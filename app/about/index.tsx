import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Image,
    Linking,
    Modal,
    Pressable,
    ScrollView,
    Share,
    Text,
    useWindowDimensions,
    View,
} from "react-native";

import EvilIcons from "@expo/vector-icons/EvilIcons";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { icons } from "../../constants/icons";
import { images } from "../../constants/images";

import { versions } from "../../constants/versions";

const About = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const router = useRouter();
    const { width, height } = useWindowDimensions();
    const isLandscape = width > height;

    const shareApp = async () => {
        try {
            await Share.share({
                message: [
                    "Cocktails – Bar in Pocket",
                    "https://play.google.com/store/apps/details?id=com.ttsaryanski.cocktails",
                ].join("\n\n"),
            });
        } catch (error) {
            console.error("Error sharing cocktail:", error);
        }
    };

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
                contentContainerStyle={{
                    minHeight: "100%",
                    ...(isLandscape
                        ? { paddingHorizontal: 10 }
                        : { paddingBottom: 40 }),
                }}
            >
                <View className="relative flex-row items-center justify-center">
                    <Pressable
                        onPress={() => {
                            router.back();
                        }}
                        className="absolute left-0 p-3 mt-10"
                    >
                        <Ionicons
                            name="caret-back-sharp"
                            size={24}
                            color="#A8B5DB"
                        />
                    </Pressable>

                    <Image source={icons.logo} className="w-16 h-16 my-10" />
                </View>

                <View className="flex-row my-8 pb-5 border-b border-light-200">
                    <Image source={images.cocktail} className="w-24 h-24" />

                    <View className="flex-col ml-10 justify-center gap-2 flex-shrink">
                        <Text className="text-lg text-light-200 text-left font-bold">
                            Cocktails - Bar in Pocket
                        </Text>

                        <Text className="text-lg text-light-200 text-left font-bold">
                            Version 1.0.4
                        </Text>
                    </View>
                </View>

                <Pressable
                    onPress={() =>
                        Linking.openURL(
                            "https://play.google.com/store/apps/details?id=com.ttsaryanski.cocktails",
                        )
                    }
                    className="flex-row items-center my-8 px-2 pb-5 border-b border-light-200"
                >
                    <MaterialCommunityIcons
                        name="star-plus"
                        size={32}
                        color="#A8B5DB"
                    />

                    <Text className="flex-1 text-lg text-light-200 font-bold ml-4">
                        Rate "Cocktails - Bar in Pocket" on Google Play
                    </Text>
                </Pressable>

                <Pressable
                    onPress={shareApp}
                    className="flex-row items-center my-8 px-2 pb-5 border-b border-light-200"
                >
                    <Feather name="share-2" size={26} color="#A8B5DB" />

                    <Text className="flex-1 text-lg text-light-200 font-bold ml-4">
                        Share "Cocktails - Bar in Pocket"
                    </Text>
                </Pressable>

                <Pressable
                    onPress={() => setModalVisible(true)}
                    className="flex-row items-center my-8 px-2 pb-5 border-b border-light-200"
                >
                    <MaterialCommunityIcons
                        name="clipboard-text-outline"
                        size={28}
                        color="#A8B5DB"
                    />

                    <Text className="flex-1 text-lg text-light-200 font-bold ml-4">
                        Release Notes
                    </Text>
                </Pressable>
                <Modal
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(!modalVisible)}
                >
                    <View className="flex-1 bg-dark-100 justify-center items-center p-2">
                        <Text className="text-lg text-light-200 font-bold my-4">
                            Release Notes
                        </Text>

                        <ScrollView>
                            {versions.map((version) => (
                                <View key={version.id} className="mb-4">
                                    <Text className="text-light-200 font-bold">
                                        Version {version.version}
                                    </Text>

                                    {version.notes.map((note, index) => (
                                        <Text
                                            key={index}
                                            className="text-light-200 pl-3"
                                        >
                                            - {note}
                                        </Text>
                                    ))}
                                </View>
                            ))}
                        </ScrollView>

                        <Pressable
                            onPress={() => setModalVisible(!modalVisible)}
                            className="my-4 bg-dark-100 p-2 rounded"
                        >
                            <Text className="text-lg text-light-200 font-bold">
                                Close
                            </Text>
                        </Pressable>
                    </View>
                </Modal>

                <Pressable
                    onPress={() =>
                        Linking.openURL(
                            "https://ttsaryanski.github.io/Portfolio/",
                        )
                    }
                    className="flex-row items-center my-8 px-2 pb-5 border-b border-light-200"
                >
                    <EvilIcons name="user" size={32} color="#A8B5DB" />

                    <Text className="flex-1 text-lg text-light-200 font-bold ml-4">
                        Author
                    </Text>

                    <Ionicons
                        name="open-outline"
                        size={20}
                        color="#A8B5DB"
                        className="ml-auto mr-2"
                    />
                </Pressable>
            </ScrollView>
        </View>
    );
};

export default About;
