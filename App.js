import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Keyboard,
} from "react-native";
import { TracksProvider } from "./src/components/context/TracksContext";
import { Track } from "./src/components/Track/Track";
import { TrackSoty } from "./src/components/TracksSoty/TrackSoty";
import { getAccessToken } from "./src/utils/getAccessToken";
import { getTracks } from "./src/utils/getTracks";

export default function App() {
  const [search, onSearch] = useState("");
  const [tracks, setTracks] = useState([]);
  const [token, setToken] = useState("");

  //const { sotyTracks } = useContext(TracksContext);

  const actualYear = new Date().getFullYear();

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

  const handleSearch = (search) => {
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
      <TracksProvider>
        <Text style={{ fontSize: 50, marginBottom: "5%" }}>
          Tus SOTYs del {actualYear}
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={search}
            placeholder="Buscar canción"
            onChangeText={onSearch}
            style={styles.input}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSearch(search)}
          >
            <Text>Buscar</Text>
          </TouchableOpacity>
        </View>

        {!!tracks && (
          //Lista optimizada
          <FlatList
            data={tracks}
            renderItem={(item) => <Track track={item.item} />}
            keyExtractor={(item) => item.id}
          />
        )}

        {!!token && (
          <Text style={{ fontSize: 10, marginBottom: "5%" }}>{token}</Text>
        )}

        <Text style={{ fontSize: 20, padding: 10 }}>Canciones guardadas:</Text>
        <TrackSoty />
      </TracksProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    fontSize: 20,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "75%",
    borderRadius: 5,
  },

  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    borderRadius: 10,
  },
});
