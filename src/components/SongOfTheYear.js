import React, { useContext } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import colors from "../const/colors";
import { TracksContext } from "../context/TracksContext";

export const SongOfTheYear = ({ track }) => {
  const { trackPosition, removeTrack } = useContext(TracksContext);

  return (
    <View style={styles.trackContainer} key={track.id}>
      <TouchableOpacity
        style={styles.borrarButton}
        onPress={() => removeTrack(track)}
      >
        <Text style={styles.textBorrar}>X</Text>
      </TouchableOpacity>

      <View style={styles.infoContainer}>
        <Text style={styles.trackPosition}>{trackPosition(track)}</Text>
        <Image
          source={{ uri: track.album.images[0].url }}
          style={styles.trackImage}
        />
        <View>
          <Text numberOfLines={5} style={styles.trackName}>
            {track.name}
          </Text>
          <Text numberOfLines={3} style={styles.trackArtist}>
            {track.artists[0].name}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  trackContainer: {
    backgroundColor: colors.purple,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: "4%",
    borderRadius: 40,
  },

  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    alignContent: "flex-start",
  },

  trackPosition: {
    fontSize: 60,
    fontFamily: "ReadexProBold",
    color: colors.white,
    marginRight: "5%",
  },

  trackImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginRight: "3%",
  },

  trackName: {
    fontFamily: "ReadexProBold",
    color: colors.white,
    fontSize: 20,
    marginTop: "5%",
    flexWrap: "wrap",
    marginRight: "40%",
  },

  trackArtist: {
    fontFamily: "ReadexProBold",
    color: colors.black,
    fontSize: 17,
    marginBottom: "3%",
  },

  borrarButton: {
    backgroundColor: colors.black,
    padding: 15,
    borderRadius: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    shadowOpacity: 0.6,
    elevation: 5,
    marginBottom: "3%",
  },

  textBorrar: {
    fontFamily: "ReadexProBold",
    color: colors.white,
    fontSize: 15,
  },
});
