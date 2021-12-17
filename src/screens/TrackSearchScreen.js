import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Track } from "../components/Track";
import colors from "../const/colors";
import { getAccessToken } from "../utils/getAccessToken";
import { getTracks } from "../utils/getTracks";
import { useDispatch, useSelector } from "react-redux";
import { addTrack } from "../store/actions/TrackAction";
import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../firebase/config";
import { Feather, Ionicons } from "@expo/vector-icons";

export const TrackSearchScreen = () => {
  const actualYear = new Date().getFullYear();

  const [search, setSearch] = useState("");
  const [tracks, setTracks] = useState([]);
  const [token, setToken] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
    }, 800);
  };

  //redux
  const dispatch = useDispatch();
  const sotyTracks = useSelector((state) => state.sotyTracks);

  useEffect(() => {
    async function fetchData() {
      //consumiendo de base de datos firebase
      const idInfoRef = collection(db, "info");
      const docs = await getDocs(idInfoRef);

      //objeto con la informacion spotify id y secret
      //para uso de la API
      const spotifyData = docs.docs[0].data();

      await getAccessToken(spotifyData)
        .then((response) => response.json())
        .then((data) => {
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
      await getTracks(token, search, actualYear)
        .then((response) => response.json())
        .then((data) => {
          setTracks(data.tracks.items);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    search && fetchData();
  };

  const handlerPress = (track) => {
    dispatch(addTrack(track));
    /*if (!sotyTracks.some((fig) => fig.id === track.id)) {
      showModal();
    }*/
  };

  const handlerPopular = () => {
    console.log("canciones populares");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <Text style={styles.title}>Mis SOTYs del {actualYear}</Text>
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
        <TouchableOpacity style={styles.button} onPress={handlerPopular}>
          <Ionicons name="ios-location-sharp" size={24} color={colors.black} />
          <Text style={styles.textButton}>Canciones populares</Text>
        </TouchableOpacity>

        <FlatList
          data={tracks}
          renderItem={(item) => (
            <Track track={item.item} onPress={() => handlerPress(item.item)} />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        transparent={true}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colors.purple,
            justifyContent: "center",
            padding: 50,
            borderRadius: 50,
          }}
        >
          <Feather name="check-circle" size={20} color={colors.white} />
          <Text
            style={{
              fontFamily: "ReadexProRegular",
              fontSize: 16,
              color: colors.white,
              marginHorizontal: 10,
            }}
          >
            Añadido a la lista de canciones favoritas!
          </Text>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: "center",
    marginBottom: "11%",
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

  textNavegation: {
    color: colors.white,
    fontFamily: "ReadexProRegular",
    fontSize: 18,
    padding: 10,
  },

  trackSearchContainer: {
    flex: 1,
    alignItems: "center",
  },
});
