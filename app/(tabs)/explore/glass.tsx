import { useRouter } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { icons } from "../../../constants/icons";
import { images } from "../../../constants/images";

const Glass = () => {
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
                            color="#D6C7FF"
                        />
                    </Pressable>

                    <Image
                        source={icons.logo}
                        className="w-16 h-16 mt-10 mb-1"
                    />
                </View>

                <Text className="text-red-800 text-center mt-10">
                    In development
                </Text>
            </ScrollView>
        </View>
    );
};

export default Glass;
