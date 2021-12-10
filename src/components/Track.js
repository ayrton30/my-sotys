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
        source={{ uri: track.album.images[0].url }}
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
    padding: 15,
    marginVertical: 10,
    marginHorizontal: "4%",
    borderRadius: 40,
    alignItems: "center",
    shadowColor: colors.green,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    shadowOpacity: 0.6,
    elevation: 5,
  },

  trackImage: {
    width: 200,
    height: 200,
    borderRadius: 20,
    marginTop: "3%",
  },

  trackName: {
    fontFamily: "ReadexProBold",
    color: colors.white,
    fontSize: 35,
    marginTop: "5%",
  },

  trackArtist: {
    fontFamily: "ReadexProBold",
    color: colors.black,
    fontSize: 30,
    marginBottom: "3%",
  },
});
