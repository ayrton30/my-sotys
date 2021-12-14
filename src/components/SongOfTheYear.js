import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import colors from "../const/colors";

export const SongOfTheYear = ({
  track,
  position,
  deleteTrack,
  moveUpTrack,
  moveDownTrack,
}) => {
  return (
    <View style={{ alignItems: "center" }}>
      <View style={styles.trackContainer} key={track.id}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity style={styles.actionButton} onPress={moveUpTrack}>
            <Text style={styles.textBorrar}>UP</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={moveDownTrack}>
            <Text style={styles.textBorrar}>DOWN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={deleteTrack}>
            <Text style={styles.textBorrar}>X</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.trackPosition}>{position}</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  trackContainer: {
    backgroundColor: colors.purple,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 40,
    width: "90%",
  },

  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    alignContent: "flex-start",

    paddingTop: "5%",
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
    flexWrap: "wrap",
    marginRight: "40%",
  },

  trackArtist: {
    fontFamily: "ReadexProBold",
    color: colors.black,
    fontSize: 17,
    marginBottom: "3%",
  },

  actionButton: {
    backgroundColor: colors.black,
    padding: 15,
    borderRadius: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    shadowOpacity: 0.6,
    elevation: 5,
    marginHorizontal: "1%",
  },

  textBorrar: {
    fontFamily: "ReadexProBold",
    color: colors.white,
    fontSize: 15,
  },
});
