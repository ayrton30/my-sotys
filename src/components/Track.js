import React from "react";
import { StyleSheet, TouchableOpacity, Image, Text, View } from "react-native";
import colors from "../const/colors";

export const Track = ({ track, onPress }) => {
  const touchHandler = () => {
    onPress(track);
  };

  return (
    <View style={{ alignItems: "center" }}>
      <TouchableOpacity
        onPress={touchHandler}
        style={styles.trackContainer}
        key={track.id}
      >
        <Image
          source={{ uri: track.album.images[0].url }}
          style={styles.trackImage}
        />
        <Text style={styles.trackName}>{track.name}</Text>
        <Text style={styles.trackArtist}>{track.artists[0].name}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  trackContainer: {
    backgroundColor: colors.green,
    marginVertical: 10,
    borderRadius: 40,
    alignItems: "center",
    shadowColor: colors.green,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    shadowOpacity: 0.6,
    elevation: 5,
    width: "90%",
  },

  trackImage: {
    width: 150,
    height: 150,
    borderRadius: 20,
    marginTop: "3%",
  },

  trackName: {
    fontFamily: "ReadexProBold",
    color: colors.white,
    fontSize: 25,
    marginTop: "5%",
  },

  trackArtist: {
    fontFamily: "ReadexProBold",
    color: colors.black,
    fontSize: 25,
    marginBottom: "3%",
  },
});
