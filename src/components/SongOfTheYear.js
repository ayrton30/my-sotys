import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
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
      <Text style={styles.trackPosition}>{trackPosition(track)}</Text>

      <View style={styles.columnContainer}>
        <Image
          source={{ uri: track.album.images[0].url }}
          style={styles.trackImage}
        />
        <View>
          <Text style={styles.trackName}>{track.name}</Text>
          <Text style={styles.trackArtist}>{track.artists[0].name}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  columnContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  },

  trackContainer: {
    backgroundColor: colors.purple,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: "4%",
    borderRadius: 40,
    alignItems: "center",
  },

  trackPosition: {
    fontSize: 50,
    fontFamily: "ReadexProBold",
    color: colors.white,
  },

  trackImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },

  trackName: {
    fontFamily: "ReadexProBold",
    color: colors.white,
    fontSize: 15,
    marginTop: "5%",
  },

  trackArtist: {
    fontFamily: "ReadexProBold",
    color: colors.black,
    fontSize: 15,
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
  },

  textBorrar: {
    fontFamily: "ReadexProBold",
    color: colors.white,
    fontSize: 15,
  },
});
