import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import React from "react";
import { StyleSheet, StatusBar, SafeAreaView } from "react-native";
import colors from "./src/const/colors";
import { TracksProvider } from "./src/context/TracksContext";
import { TrackListScreen } from "./src/screens/TrackListScreen";
import { TrackSearchScreen } from "./src/screens/TrackSearchScreen";

export default function App() {
  const screenSwitch = true;

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
        <Stack.Navigator initialRouteName="Home">
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Search" component={TrackSearchScreen} />
            <Stack.Screen name="List" component={TrackListScreen} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </TracksProvider>
  );
}
