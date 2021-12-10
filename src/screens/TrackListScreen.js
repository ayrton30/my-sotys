import React from "react";
import { Text, View } from "react-native";
import { TrackSoty } from "../components/TrackSoty";

export const TrackListScreen = () => {
  return (
    <View>
      <Text style={{ fontSize: 20, padding: 10 }}>Canciones guardadas:</Text>
      <TrackSoty />
    </View>
  );
};
