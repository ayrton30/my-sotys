import React from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Share,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../const/colors";
import { SongOfTheYear } from "../components/SongOfTheYear";
import { useDispatch, useSelector } from "react-redux";
import {
  moveDownTrack,
  moveUpTrack,
  removeTrack,
} from "../store/actions/TrackAction";
import { getPositionTrack } from "../utils/getPositionTrack";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

export const TrackListScreen = () => {
  //redux
  const sotyTracks = useSelector((state) => state.sotyTracks);
  const dispatch = useDispatch();

  const handlerShare = () => {
    let m = "Mi lista de SOTYs\n";
    sotyTracks.forEach((element) => {
      m =
        m +
        `${getPositionTrack(sotyTracks, element)}- ${element.name} Artista: ${
          element.artists[0].name
        }\n`;
    });

    const onShare = async () => {
      try {
        const result = await Share.share({
          message: m,
        });
      } catch (error) {
        alert(error.message);
      }
    };

    onShare();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Mis SOTYs</Text>
        <TouchableOpacity style={styles.button} onPress={handlerShare}>
          <Ionicons name="ios-share" size={24} color={colors.black} />
          <Text style={styles.textButton}>Compartir mi lista</Text>
        </TouchableOpacity>

        <FlatList
          data={sotyTracks}
          renderItem={(item) => (
            <SongOfTheYear
              track={item.item}
              position={getPositionTrack(sotyTracks, item.item)}
              length={sotyTracks.length}
              deleteTrack={() => dispatch(removeTrack(item.item))}
              moveUpTrack={() => dispatch(moveUpTrack(item.item))}
              moveDownTrack={() => dispatch(moveDownTrack(item.item))}
            />
          )}
          keyExtractor={(item) => item.id}
        />

        <StatusBar style="light" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: "center",
  },

  title: {
    fontSize: 50,
    lineHeight: 50,
    padding: 10,
    color: colors.white,
    textAlign: "center",
    fontFamily: "ReadexProBold",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  input: {
    fontSize: 20,
    borderWidth: 2,
    borderColor: colors.white,
    borderRadius: 10,
    padding: 10,
    width: "75%",
    color: colors.white,
    fontFamily: "ReadexProLight",
    marginRight: "2%",
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    height: 40,
    borderRadius: 10,
  },

  textButton: {
    color: colors.black,
    fontFamily: "ReadexProBold",
    fontSize: 18,
    padding: 10,
  },

  textNavigation: {
    color: colors.white,
    fontFamily: "ReadexProRegular",
    fontSize: 18,
    padding: 10,
  },

  navigationButton: {
    alignItems: "center",
    backgroundColor: colors.green,
    height: 40,
    borderRadius: 10,
  },

  trackSearchContainer: {
    flex: 1,
    alignItems: "center",
  },
});
