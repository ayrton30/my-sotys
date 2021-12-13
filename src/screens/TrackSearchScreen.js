import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Track } from "../components/Track";
import colors from "../const/colors";
import { getAccessToken } from "../utils/getAccessToken";
import { getTracks } from "../utils/getTracks";

export const TrackSearchScreen = () => {
  const actualYear = new Date().getFullYear();

  const [search, setSearch] = useState("");
  const [tracks, setTracks] = useState([]);
  const [token, setToken] = useState("");

  const nav = useNavigation();

  useEffect(() => {
    async function fetchData() {
      await getAccessToken()
        .then((response) => response.json())
        .then((data) => {
          //console.log("Success:", data);
          setToken(data.access_token);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    fetchData();
  }, []);

  const handlerSearch = (search) => {
    //para esconder el teclado
    Keyboard.dismiss();

    async function fetchData() {
      await getTracks(token, search)
        .then((response) => response.json())
        .then((data) => {
          //solo muestro las canciones lanzados en el año actual
          setTracks(
            data.tracks.items.filter(
              (item) => item.album.release_date.slice(0, 4) == actualYear
            )
          );
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    search && fetchData();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <Text style={styles.title}>Tús SOTYs del {actualYear}</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            value={search}
            placeholder="Buscar canción"
            placeholderTextColor={colors.white}
            onChangeText={setSearch}
            style={styles.input}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => handlerSearch(search)}
          >
            <Text style={styles.textButton}>Buscar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.trackSearchContainer}>
          <FlatList
            data={tracks}
            renderItem={(item) => <Track track={item.item} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: "center",
    marginBottom: "10%",
  },

  title: {
    fontSize: 50,
    lineHeight: 50,
    padding: 10,
    marginBottom: "5%",
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
    backgroundColor: colors.purple,
    height: 40,
    borderRadius: 10,
    width: "100%",
  },

  trackSearchContainer: {
    flex: 1,
    alignItems: "center",
  },
});
