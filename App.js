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

  if (!loaded) return <AppLoading />;

  return (
    <SafeAreaView style={styles.container}>
      <TracksProvider>
        {screenSwitch ? <TrackSearchScreen /> : <TrackListScreen />}
      </TracksProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: "center",
    paddingTop: StatusBar.currentHeight,
  },
});
