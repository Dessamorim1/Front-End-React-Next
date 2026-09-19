import { Image, StyleSheet, View } from "react-native";

const imagensDados = {
  1: require("../assets/dados/dado-1.png"),
  2: require("../assets/dados/dado-2.png"),
  3: require("../assets/dados/dado-3.png"),
  4: require("../assets/dados/dado-4.png"),
  5: require("../assets/dados/dado-5.png"),
  6: require("../assets/dados/dado-6.png"),
};

export function Dado({ valor }) {
  return (
    <View style={styles.container}>
      <Image source={imagensDados[valor]} style={styles.imagem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    margin: 4,
  },
  imagem: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
});
