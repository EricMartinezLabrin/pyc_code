import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

// Local
import Button from "../Components/Button";
import { colors } from "../assets/Colors";

export default function Error(props) {
  // Obtenemos Datos del Código
  const { message, code } = props.route.params;
  const { navigation } = props;

  const retry = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logo_pyc.png")}
        style={styles.logo}
      />
      <Text style={styles.titleError}>Hubo un error al canjear el código</Text>
      <Text style={styles.messageError}>{message}</Text>
      <Text style={styles.titleError}>{code}</Text>
      <Button title="Reintentar" onPress={retry} style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  logo: {
    width: 130,
    height: 130,
    alignSelf: "center",
  },
  titleError: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FF0000",
    textAlign: "center",
  },
  messageError: {
    textAlign: "center",
    marginVertical: 20,
  },
  button: {
    backgroundColor: colors.primary,
    width: "80%",
    alignSelf: "center",
    marginTop: 10,
    color: "#fff",
    borderColor: "#000",
    borderWidth: 2,
  },
});
