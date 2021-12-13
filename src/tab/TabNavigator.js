import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TrackSearchScreen } from "../screens/TrackSearchScreen";
import { TrackListScreen } from "../screens/TrackListScreen";

import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../const/colors";
import { StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Buscar"
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: styles.tabText,
        tabBarStyle: styles.tabContainer,
      }}
    >
      <Tab.Screen
        name="Buscar"
        component={TrackSearchScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="ios-musical-notes"
              size={24}
              color={focused ? colors.green : colors.white}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favoritos"
        component={TrackListScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="ios-star"
              size={24}
              color={focused ? colors.purple : colors.white}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: colors.black,
    position: "absolute",
  },

  tabText: {
    fontSize: 14,
    fontFamily: "ReadexProLight",
    color: colors.white,
  },
});
