import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import React from "react";
import { TracksProvider } from "./src/context/TracksContext";
import { TrackListScreen } from "./src/screens/TrackListScreen";
import { TrackSearchScreen } from "./src/screens/TrackSearchScreen";
import { TabNavigator } from "./src/tab/TabNavigator";

export default function App() {
  const [loaded] = useFonts({
    ReadexProLight: require("./assets/fonts/ReadexPro-Light.ttf"),
    ReadexProRegular: require("./assets/fonts/ReadexPro-Regular.ttf"),
    ReadexProBold: require("./assets/fonts/ReadexPro-Bold.ttf"),
  });

  const Stack = createNativeStackNavigator();

  if (!loaded) return <AppLoading />;

  return (
    <TracksProvider>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </TracksProvider>
  );
}
