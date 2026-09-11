import { Tabs } from "expo-router";
import {
    Image,
    ImageBackground,
    ImageSourcePropType,
    Text,
    View,
} from "react-native";

import { icons } from "../../constants/icons";
import { images } from "../../constants/images";

type TabIconProps = {
    focused: boolean;
    icon: ImageSourcePropType;
    title: string;
    isFirst?: boolean;
    isLast?: boolean;
};
function TabIcon({ focused, icon, title, isFirst, isLast }: TabIconProps) {
    if (focused) {
        return (
            <ImageBackground
                source={images.highlight}
                className="flex flex-row w-full flex-1 min-w-[120px] min-h-14 my-auto justify-center items-center rounded-full overflow-hidden "
                style={
                    isLast
                        ? { justifyContent: "flex-start", paddingLeft: 5 }
                        : isFirst
                          ? { paddingLeft: 20 }
                          : {}
                }
            >
                <Image source={icon} tintColor="#151312" className="size-5" />
                <Text className="text-secondary text-base font-semibold ml-2">
                    {title}
                </Text>
            </ImageBackground>
        );
    }

    return (
        <View className="size-full justify-center items-center mt-4 rounded-full">
            <Image source={icon} tintColor="#A8B5DB" className="size-5" />
        </View>
    );
}

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                },
                tabBarStyle: {
                    backgroundColor: "#0F0D23",
                    borderRadius: 50,
                    marginHorizontal: 5,
                    marginBottom: 50,
                    height: 51,
                    position: "absolute",
                    overflow: "hidden",
                    borderWidth: 1,
                    borderColor: "#0F0D23",
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "index",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.home}
                            title="Home"
                            isFirst={true}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="search"
                options={{
                    title: "Search",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.search}
                            title="Search"
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="save"
                options={{
                    title: "Save",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.save}
                            title="Save"
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.person}
                            title="Profile"
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="settings"
                options={{
                    title: "Settings",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.gear}
                            title="Settings"
                            isLast={true}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
