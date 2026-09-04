import { useRouter } from "expo-router";
import { FlatList, Image, ScrollView, Text, View } from "react-native";

import { useEffect, useState } from "react";
import CocktailCard from "../../components/cocktail-card";
import SearchBar from "../../components/search-bar";
import { icons } from "../../constants/icons";
import { images } from "../../constants/images";
import { coocktailServices } from "../../services/coocktailServices";
import { RandomCoocktails } from "../../types/coocktails";

export default function Index() {
    const router = useRouter();
    const [data, setData] = useState<RandomCoocktails>();

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                const res = await coocktailServices.getRandom();
                setData(res);
            } catch (error) {
                throw error;
            }
        };

        fetchData();
    }, []);

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
                    <SearchBar
                        onPress={() => {
                            router.push("/search");
                        }}
                        placeholder="Search for a cocktail"
                    />
                    <>
                        <Text className="text-lg text-white font-bold mt-5 mb-3">
                            Random Coocktails
                        </Text>

                        <FlatList
                            data={data?.drinks}
                            renderItem={({ item }) => (
                                <CocktailCard {...item} />
                            )}
                            keyExtractor={(item) => item.idDrink.toString()}
                            numColumns={3}
                            columnWrapperStyle={{
                                justifyContent: "flex-start",
                                gap: 20,
                                paddingRight: 5,
                                marginBottom: 10,
                            }}
                            className="mt-2 pb-32"
                            scrollEnabled={false}
                        />
                    </>
                </View>
            </ScrollView>
        </View>
    );
}
