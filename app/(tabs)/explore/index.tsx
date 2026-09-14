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
                className="flex-1 px-5"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    minHeight: "100%",
                    paddingBottom: 100,
                }}
                // refreshControl={
                //     <RefreshControl
                //         refreshing={trendingLoading || cocktailsLoading}
                //         onRefresh={handleRefresh}
                //         tintColor="#AB8BFF"
                //     />
                // }
            >
                <Image
                    source={icons.logo}
                    className="w-16 h-16 mt-10 mb-1 mx-auto"
                />

                <View className="flex-1 items-center">
                    <Text className="text-lg text-light-200 text-center font-bold mb-10">
                        Explore cocktails
                    </Text>

                    <View className="w-full h-52 rounded-xl overflow-hidden mb-10 bg-white">
                        <Image
                            source={images.choice}
                            className="absolute inset-0 w-full h-full"
                            resizeMode="stretch"
                            style={{ opacity: 0.75 }}
                        />

                        <Text
                            className="font-bold text-4xl text-light-100 text-center uppercase ml-4 my-4 text-shadow-lg"
                            style={{
                                textShadowColor: "#030014",
                                textShadowOffset: { width: 5, height: 5 },
                                textShadowRadius: 10,
                            }}
                        >
                            Type of drink
                        </Text>

                        <Pressable
                            onPress={() => {
                                router.push("/explore/type");
                            }}
                        >
                            <View
                                className="flex flex-row p-4 justify-between items-center"
                                style={{
                                    backgroundColor: "rgba(0, 11, 17, 0.5)",
                                }}
                            >
                                <Text className="text-2xl text-light-100 text-center font-bold">
                                    Explore by type
                                </Text>

                                <AntDesign
                                    name="caret-right"
                                    size={24}
                                    color="#D6C7FF"
                                />
                            </View>
                        </Pressable>
                    </View>

                    <View className="w-full h-52 rounded-xl overflow-hidden mb-10 bg-white">
                        <Image
                            source={images.categories}
                            className="absolute inset-0 w-full h-full"
                            resizeMode="stretch"
                            style={{ opacity: 0.75 }}
                        />

                        <Text
                            className="font-bold text-4xl text-light-100 text-center uppercase ml-4 my-4 text-shadow-lg"
                            style={{
                                textShadowColor: "#030014",
                                textShadowOffset: { width: 5, height: 5 },
                                textShadowRadius: 10,
                            }}
                        >
                            Category
                        </Text>

                        <Pressable onPress={() => {}}>
                            <View
                                className="flex flex-row p-4 justify-between items-center"
                                style={{
                                    backgroundColor: "rgba(0, 11, 17, 0.5)",
                                }}
                            >
                                <Text className="text-2xl text-light-100 text-center font-bold">
                                    Explore by category
                                </Text>

                                <AntDesign
                                    name="caret-right"
                                    size={24}
                                    color="#D6C7FF"
                                />
                            </View>
                        </Pressable>
                    </View>

                    <View className="w-full h-52 rounded-xl overflow-hidden mb-10 bg-white">
                        <Image
                            source={images.ingredients}
                            className="absolute inset-0 w-full h-full"
                            resizeMode="stretch"
                            style={{ opacity: 0.75 }}
                        />

                        <Text
                            className="font-bold text-4xl text-light-100 text-center uppercase ml-4 my-4 text-shadow-lg"
                            style={{
                                textShadowColor: "#030014",
                                textShadowOffset: { width: 5, height: 5 },
                                textShadowRadius: 10,
                            }}
                        >
                            Ingredients
                        </Text>

                        <Pressable onPress={() => {}}>
                            <View
                                className="flex flex-row p-4 justify-between items-center"
                                style={{
                                    backgroundColor: "rgba(0, 11, 17, 0.5)",
                                }}
                            >
                                <Text className="text-2xl text-light-100 text-center font-bold">
                                    Explore by ingredient
                                </Text>

                                <AntDesign
                                    name="caret-right"
                                    size={24}
                                    color="#D6C7FF"
                                />
                            </View>
                        </Pressable>
                    </View>

                    <View className="w-full h-52 rounded-xl overflow-hidden mb-10 bg-white">
                        <Image
                            source={images.glasses}
                            className="absolute inset-0 w-full h-full"
                            resizeMode="stretch"
                            style={{ opacity: 0.75 }}
                        />

                        <Text
                            className="font-bold text-4xl text-light-100 text-center uppercase ml-4 my-4 text-shadow-lg"
                            style={{
                                textShadowColor: "#030014",
                                textShadowOffset: { width: 5, height: 5 },
                                textShadowRadius: 10,
                            }}
                        >
                            Glass
                        </Text>

                        <Pressable onPress={() => {}}>
                            <View
                                className="flex flex-row p-4 justify-between items-center"
                                style={{
                                    backgroundColor: "rgba(0, 11, 17, 0.5)",
                                }}
                            >
                                <Text className="text-2xl text-light-100 text-center font-bold">
                                    Explore by glass
                                </Text>

                                <AntDesign
                                    name="caret-right"
                                    size={24}
                                    color="#D6C7FF"
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
