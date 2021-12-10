import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import colors from "../const/colors";
import { TracksContext } from "../context/TracksContext";

export const Track = ({ track }) => {
  const { addTrack } = useContext(TracksContext);

  const touchHandler = (track) => {
    console.log(track.name);
    addTrack(track);
  };

  return (
    <TouchableOpacity
      onPress={() => touchHandler(track)}
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
    backgroundColor: colors.green,
    padding: 20,
    marginVertical: 8,
    borderRadius: 20,
    width: 350,
    alignItems: "center",
  },

  trackImage: {
    width: 250,
    height: 250,
    borderRadius: 20,
  },

  trackName: {
    fontFamily: "ReadexProBold",
    color: colors.white,
    fontSize: 35,
    padding: 20,
  },

  trackArtist: {
    fontFamily: "ReadexProRegular",
    color: colors.black,
    fontSize: 35,
    padding: 10,
  },
});
