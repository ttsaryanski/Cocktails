import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

import { getLocalLanguage, saveLocalLanguage } from "../utils/storage";

import Ionicons from "@expo/vector-icons/Ionicons";

import { languages } from "../constants/language";

const Language = () => {
    const [language, setLanguage] = useState<string>("en");
    const [isOpen, setIsOpen] = useState(false);
    const isLast = (index: number) => index === languages.length - 1;

    useEffect(() => {
        const loadLanguage = async () => {
            const savedLanguage = await getLocalLanguage();
            if (savedLanguage) {
                setLanguage(savedLanguage);
            }
        };

        loadLanguage();
    }, []);

    return (
        <View>
            <Pressable
                onPress={() => setIsOpen((prev) => !prev)}
                className={`flex-row items-center bg-dark-100 px-2 py-5 w-full  ${isOpen ? "rounded-t-md" : "rounded-md"}`}
            >
                <Ionicons name="language-sharp" size={24} color="#A8B5DB" />

                <Text className="text-light-200 ml-2">Language</Text>
                <Text className="text-light-200 ml-auto mr-2">
                    {languages.find((item) => item.code === language)?.flag}
                </Text>
            </Pressable>

            {isOpen && (
                <View>
                    {languages.map((item, index) => {
                        const isSelected = item.code === language;

                        return (
                            <Pressable
                                key={item.code}
                                className={`flex-row items-center  px-2 py-3 w-full ${isSelected ? "bg-light-200" : "bg-dark-100"} ${isLast(index) ? "rounded-b-md" : ""}`}
                                onPress={() => {
                                    setLanguage(item.code);
                                    saveLocalLanguage(item.code);
                                    setIsOpen(false);
                                }}
                            >
                                <Text
                                    className={`${isSelected ? "text-dark-100 font-bold" : "text-light-200 "}`}
                                >
                                    {item.flag}
                                    {"  "}
                                    {item.label}
                                </Text>
                            </Pressable>
                        );
                    })}
                </View>
            )}
        </View>
    );
};

export default Language;
