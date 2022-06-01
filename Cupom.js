import React from "react";
import { StyleSheet, View, Text } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    borderWidth: 2,
    borderRadius: 8,
    margin: 16,
    marginTop: 32,
    backgroundColor: "#e3d8ca",
  },

  text: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  container2: {
    alignItems: "center",
  },
  img: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Image source={require("../../assets/cupom.png")} style={styles.img} />
      </View>

      <View>
        <Text style={styles.text}>Você tem um cupom disponível!</Text>
      </View>
    </View>
  );
}
