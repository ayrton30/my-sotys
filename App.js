import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TextInput,
  Button,
  ViewComponent,
} from "react-native";

export default function App() {
  const [search, onSearch] = useState();

  return (
    <>
      <View style={styles.container}>
        <Text style={{ fontSize: 50, marginBottom: "5%" }}>Hola, Coder!</Text>
        <View style={styles.input}>
          <TextInput
            value={search}
            placeholder="Buscar canción"
            onChangeText={onSearch}
            style={{ backgroundColor: "#f034", fontSize: 30 }}
          />
          <Button title="BUSCAR" />
        </View>
        <Text style={{ fontSize: 50, marginBottom: "5%" }}>{search}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20%",
  },

  input: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});
