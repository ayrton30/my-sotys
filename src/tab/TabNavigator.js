import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TrackSearchScreen } from "../screens/TrackSearchScreen";
import { TrackListScreen } from "../screens/TrackListScreen";

import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../const/colors";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  const sotyTracks = useSelector((state) => state.sotyTracks);

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
          tabBarBadge: sotyTracks.length,
          tabBarBadgeStyle: { fontFamily: "ReadexProBold" },
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
  },

  tabText: {
    fontSize: 14,
    fontFamily: "ReadexProLight",
    color: colors.white,
  },
});
