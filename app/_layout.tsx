import { Stack } from "expo-router";
import { StatusBar } from "react-native";

import "./global.css";

export default function RootLayout() {
    return (
        <>
            <StatusBar hidden={true} />

            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                    name="cocktails/[id]"
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ingredients/[ingredient]"
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="glasses/[glass]"
                    options={{ headerShown: false }}
                />
            </Stack>
        </>
    );
}
