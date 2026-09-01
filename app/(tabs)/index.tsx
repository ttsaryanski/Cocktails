import { Image, ScrollView, View } from "react-native";
import SearchBar from "../../components/search-bar";
import { icons } from "../../constants/icons";
import { images } from "../../constants/images";

export default function Index() {
    return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} className="absolute w-full z-0" />

            <ScrollView
                className="flex-1 px-5"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
            >
                <Image
                    source={icons.logo}
                    className="w-16 h-16 mt-20 mb-5 mx-auto"
                />

                <View className="flex-1 mt-5">
                    <SearchBar />
                </View>
            </ScrollView>
        </View>
    );
}
