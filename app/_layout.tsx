import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import "./global.css";

export default function RootLayout() {
    return (
        <>
            <StatusBar hidden />

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

                <Stack.Screen name="about" options={{ headerShown: false }} />
            </Stack>
        </>
    );
}
