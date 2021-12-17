import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import React from "react";
import { TabNavigator } from "./src/tab/TabNavigator";
import { Provider } from "react-redux";
import { store, persistor } from "./src/store";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  const [loaded] = useFonts({
    ReadexProLight: require("./assets/fonts/ReadexPro-Light.ttf"),
    ReadexProRegular: require("./assets/fonts/ReadexPro-Regular.ttf"),
    ReadexProBold: require("./assets/fonts/ReadexPro-Bold.ttf"),
  });

  if (!loaded) return <AppLoading />;

  return (
    <Provider store={store}>
      <PersistGate loading={<AppLoading />} persistor={persistor}>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
