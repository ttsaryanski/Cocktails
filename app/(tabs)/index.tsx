import { useRouter } from "expo-router";
import {
    ActivityIndicator,
    FlatList,
    Image,
    ScrollView,
    Text,
    View,
} from "react-native";

import useFetch from "../../hooks/useFetch";
import { cocktailServices } from "../../services/cocktailServices";

import CocktailCard from "../../components/cocktail-card";

import { icons } from "../../constants/icons";
import { images } from "../../constants/images";

export default function Index() {
    const router = useRouter();

    const {
        data: cocktails,
        loading: cocktailsLoading,
        error: cocktailsError,
    } = useFetch(() => cocktailServices.getRandom());

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
                    className="w-16 h-16 mt-10 mb-1 mx-auto"
                />

                {cocktailsLoading ? (
                    <ActivityIndicator
                        size="large"
                        color="#0000ff"
                        className="mt-10 self-center"
                    />
                ) : cocktailsError ? (
                    <Text style={{ color: "white" }}>
                        Error: {cocktailsError?.message}
                    </Text>
                ) : (
                    <View className="flex-1 mt-1">
                        <Text className="text-lg text-white text-center font-bold mt-5 mb-3">
                            Random Cocktails
                        </Text>

                        <FlatList
                            data={cocktails?.drinks}
                            renderItem={({ item }) => (
                                <CocktailCard {...item} />
                            )}
                            keyExtractor={(item) => item.idDrink.toString()}
                            numColumns={2}
                            columnWrapperStyle={{
                                justifyContent: "flex-start",
                                gap: 20,
                                paddingRight: 5,
                                marginBottom: 10,
                            }}
                            className="mt-2 pb-32"
                            scrollEnabled={false}
                        />
                    </View>
                )}
            </ScrollView>
        </View>
    );
}
