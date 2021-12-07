import React from "react";
import { StyleSheet, TouchableOpacity, Image, Text, View } from "react-native";

export const Track = ({ track }) => {
  return (
    <TouchableOpacity
      onPress={(e) => console.log(e.target)}
      style={styles.trackContainer}
      key={track.id}
    >
      <Image
        source={{ uri: track.album.images[1].url }}
        style={styles.trackImage}
      />
      <Text style={styles.trackName}>{track.name}</Text>
      <Text style={styles.trackArtist}>{track.artists[0].name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  trackContainer: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    borderRadius: 20,
    width: 350,
    alignItems: "center",
  },

  trackImage: {
    width: 250,
    height: 250,
  },

  trackName: {
    fontSize: 35,
    padding: 20,
  },

  trackArtist: {
    fontSize: 35,
    padding: 10,
  },
});
