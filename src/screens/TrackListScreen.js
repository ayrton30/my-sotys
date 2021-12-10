import React, { useContext } from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Track } from "../components/Track";
import colors from "../const/colors";
import { TracksContext } from "../context/TracksContext";
import { useNavigation } from "@react-navigation/native";
import { SongOfTheYear } from "../components/SongOfTheYear";

export const TrackListScreen = () => {
  const { sotyTracks } = useContext(TracksContext);

  const nav = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={styles.navegationButton}
            onPress={() => nav.goBack()}
          >
            <Text style={styles.textNavegation}>Volver</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Mi lista de canciones</Text>
        <FlatList
          data={sotyTracks}
          renderItem={(item) => <SongOfTheYear track={item.item} />}
          keyExtractor={(item) => item.id}
        />
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
    marginBottom: "5%",
    paddingHorizontal: 30,
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
    alignItems: "center",
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

  textNavegation: {
    color: colors.white,
    fontFamily: "ReadexProRegular",
    fontSize: 18,
    padding: 10,
  },

  navegationButton: {
    alignItems: "center",
    backgroundColor: colors.green,
    height: 40,
    borderRadius: 10,
    width: "100%",
  },

  trackSearchContainer: {
    flex: 1,
    alignItems: "center",
  },
});
