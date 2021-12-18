import React, { useEffect, useState } from "react";
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
import { getDoc, doc } from "firebase/firestore/lite";
import { db } from "../firebase/config";
import { Feather, Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { getTopCountryTracks } from "../utils/getTopCountryTracks";

export const TrackSearchScreen = () => {
  const actualYear = new Date().getFullYear();

  //string con la busqueda de cancion a realizar
  const [search, setSearch] = useState("");
  //resultado de canciones obtenidas de la
  //API de spotify Search for Items
  const [tracks, setTracks] = useState([]);
  //token para uso de la API
  const [token, setToken] = useState("");
  //estado del modal
  const [modalVisible, setModalVisible] = useState(false);

  //para localizacion
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [country, setCountry] = useState(null);

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
    //obtencion del token spotify api
    (async () => {
      //consumiendo de base de datos firebase
      const docRef = doc(db, "info", "spotifyAPI");
      const docSnap = await getDoc(docRef);

      //objeto con la informacion spotify id y secret
      //para uso de la API
      const spotifyData = docSnap.data();

      await getAccessToken(spotifyData)
        .then((response) => response.json())
        .then((data) => {
          setToken(data.access_token);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    })();

    //permiso de localizacion para busqueda de canciones populares del pais
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const handlerSearch = (search) => {
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

    //para esconder el teclado
    Keyboard.dismiss();
    setCountry(null);
    setTracks([]);

    search && fetchData();
  };

  const handlerPress = (track) => {
    dispatch(addTrack(track));
    if (!sotyTracks.some((fig) => fig.id === track.id)) {
      showModal();
    }
  };

  const handlerLocation = () => {
    if (errorMsg) {
      console.log(errorMsg);
    } else if (location) {
      //Google Geocoding API
      (async () => {
        //consumiendo de base de datos firebase
        const docRef = doc(db, "info", "googleAPI");
        const docSnap = await getDoc(docRef);

        //objeto con la informacion spotify id y secret
        //para uso de la API
        const KEY_API = docSnap.data().KEY_API;

        await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}
      &result_type=country&key=${KEY_API}`)
          .then((response) => response.json())
          //obtenemos el nombre del pais donde se encuentra el usuario
          .then((data) => {
            let responseCountry = data.results[0].formatted_address;

            (async () => {
              await getTopCountryTracks(token, responseCountry)
                .then((response) => response.json())
                .then((data) => {
                  const map = data.items.map((element) => element.track);

                  //solo muestro las canciones lanzados en el año actual
                  setTracks(
                    map.filter(
                      (item) =>
                        item.album.release_date.slice(0, 4) == actualYear
                    )
                  );
                  setCountry(responseCountry);
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
            })();
          });
      })();
    }
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
        <TouchableOpacity style={styles.button} onPress={handlerLocation}>
          <Ionicons name="ios-location-sharp" size={24} color={colors.black} />
          <Text style={styles.textButton}>Mostrar canciones populares</Text>
        </TouchableOpacity>

        {country && (
          <View>
            <Text style={styles.subtitle}>Top canciones de {country}</Text>
          </View>
        )}

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
        <View style={styles.modalContainer}>
          <Feather name="check-circle" size={20} color={colors.white} />
          <Text style={styles.modalText}>
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

  subtitle: {
    fontSize: 30,
    lineHeight: 30,
    padding: 10,
    marginTop: "5%",
    color: colors.white,
    textAlign: "center",
    fontFamily: "ReadexProRegular",
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

  modalContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.purple,
    justifyContent: "center",
    padding: 50,
    borderRadius: 50,
  },

  modalText: {
    fontFamily: "ReadexProRegular",
    fontSize: 16,
    color: colors.white,
    marginHorizontal: 10,
  },
});
