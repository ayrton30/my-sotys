import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
} from "react-native";
import { Track } from "../components/Track";
import colors from "../const/colors";
import { getAccessToken } from "../utils/getAccessToken";
import { getTracks } from "../utils/getTracks";

export const TrackSearchScreen = () => {
  const actualYear = new Date().getFullYear();

  const [search, setSearch] = useState("");
  const [tracks, setTracks] = useState([]);
  const [token, setToken] = useState("");

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
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>Tús SOTYs del {actualYear}</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          value={search}
          placeholder="Buscar canción"
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

      {!!tracks && (
        //Lista optimizada
        <View style={styles.trackSearchContainer}>
          <FlatList
            data={tracks}
            renderItem={(item) => <Track track={item.item} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight,
    marginTop: 40,
  },

  title: {
    fontSize: 50,
    marginBottom: "5%",
    color: colors.white,
    textAlign: "center",
    fontFamily: "ReadexProBold",
  },

  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    fontSize: 20,
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 5,
    padding: 10,
    width: "75%",
    color: colors.white,
    fontFamily: "ReadexProLight",
  },

  button: {
    alignItems: "center",
    backgroundColor: colors.white,
    padding: 10,
    height: 40,
    borderRadius: 10,
  },

  textButton: {
    color: colors.black,
    fontFamily: "ReadexProBold",
    fontSize: 15,
  },

  trackSearchContainer: {
    flex: 8,
    alignItems: "center",
  },
});
