import { useRouter } from "expo-router";

import AntDesign from "@expo/vector-icons/AntDesign";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

import { icons } from "../../../constants/icons";
import { images } from "../../../constants/images";

const Index = () => {
    const router = useRouter();
    return (
        <View className="flex-1 bg-primary">
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
                    paddingBottom: 100,
                }}
            >
                <Image
                    source={icons.logo}
                    className="w-16 h-16 mt-10 mb-1 mx-auto"
                />

                <View className="flex-1 items-center">
                    <Text className="text-lg text-light-200 text-center font-bold mb-10">
                        Explore cocktails
                    </Text>

                    <View className="w-full min-h-40 rounded-xl mb-10 py-4 bg-dark-100">
                        <Text className="font-bold text-3xl text-light-100 text-center uppercase px-4 pb-2">
                            Type of drink
                        </Text>

                        <Pressable
                            className="flex-1"
                            onPress={() => {
                                router.push("/explore/type");
                            }}
                        >
                            <View className="flex-1 flex-row px-4 justify-between items-center">
                                <Text className="flex-1 text-2xl text-light-200 text-left font-bold">
                                    Explore by type
                                </Text>

                                <AntDesign
                                    style={{ marginLeft: 12 }}
                                    name="caret-right"
                                    size={24}
                                    color="#A8B5DB"
                                />
                            </View>
                        </Pressable>
                    </View>

                    <View className="w-full min-h-40 rounded-xl mb-10 bg-dark-100">
                        <Text className="font-bold text-3xl text-light-100 text-center uppercase px-4 pt-6 pb-2">
                            Category
                        </Text>

                        <Pressable
                            className="flex-1"
                            onPress={() => {
                                router.push("/explore/category");
                            }}
                        >
                            <View className="flex-1 flex-row px-4 pb-4 justify-between items-center">
                                <Text className="flex-1 text-2xl text-light-200 text-left font-bold">
                                    Explore by category
                                </Text>

                                <AntDesign
                                    style={{ marginLeft: 12 }}
                                    name="caret-right"
                                    size={24}
                                    color="#A8B5DB"
                                />
                            </View>
                        </Pressable>
                    </View>

                    <View className="w-full min-h-40 rounded-xl mb-10 bg-dark-100">
                        <Text className="font-bold text-3xl text-light-100 text-center uppercase px-4 pt-6 pb-2">
                            Ingredients
                        </Text>

                        <Pressable
                            className="flex-1"
                            onPress={() => {
                                router.push("/explore/ingredient");
                            }}
                        >
                            <View className="flex-1 flex-row px-4 pb-4 justify-between items-center">
                                <Text className="flex-1 text-2xl text-light-200 text-left font-bold">
                                    Explore by ingredient
                                </Text>

                                <AntDesign
                                    style={{ marginLeft: 12 }}
                                    name="caret-right"
                                    size={24}
                                    color="#A8B5DB"
                                />
                            </View>
                        </Pressable>
                    </View>

                    <View className="w-full min-h-40 rounded-xl mb-10 bg-dark-100">
                        <Text className="font-bold text-3xl text-light-100 text-center uppercase px-4 pt-6 pb-2">
                            Glass
                        </Text>

                        <Pressable
                            className="flex-1"
                            onPress={() => {
                                router.push("/explore/glass");
                            }}
                        >
                            <View className="flex-1 flex-row px-4 pb-4 justify-between items-center">
                                <Text className="flex-1 text-2xl text-light-200 text-left font-bold">
                                    Explore by glass
                                </Text>

                                <AntDesign
                                    style={{ marginLeft: 12 }}
                                    name="caret-right"
                                    size={24}
                                    color="#A8B5DB"
                                />
                            </View>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default Index;
