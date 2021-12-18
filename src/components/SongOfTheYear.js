import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import colors from "../const/colors";

export const SongOfTheYear = ({
  track,
  position,
  length,
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
          {position != 1 && (
            <TouchableOpacity style={styles.actionButton} onPress={moveUpTrack}>
              <AntDesign name="upcircleo" size={24} color={colors.white} />
            </TouchableOpacity>
          )}
          {position != length && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={moveDownTrack}
            >
              <AntDesign name="downcircleo" size={24} color={colors.white} />
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.actionButton} onPress={deleteTrack}>
            <Feather name="trash" size={24} color={colors.white} />
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
    padding: 10,
    borderRadius: 100,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    shadowOpacity: 0.6,
    elevation: 5,
    marginHorizontal: "1%",
  },
});
