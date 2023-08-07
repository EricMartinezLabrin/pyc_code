import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";

// Local
import { colors } from "../assets/Colors";
import Button from "../Components/Button";
import { getBusinessPhoneApi } from "../Api/BackEnd";

export default function Contacto(props) {
  const { navigation } = props;
  const { code } = props.route.params;
  const contact = () => {
    try {
      getBusinessPhoneApi()
        .then((response) => {
          if (response.status == 200) {
            return response.json();
          }
        })
        .then((response) => {
          Linking.openURL(
            `whatsapp://send?phone=${response.message}&text=Tengo problemas para canjear mi codigo ${code}`
          );
        });
    } catch (error) {
      console.error(error);
    }
  };

  const backToStart = () => {
    navigation.navigate("Index");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logo_pyc.png")}
        style={styles.logo}
      />

      <Text style={styles.titleError}>Hubo un error al canjear el código</Text>
      <Text style={styles.messageError}>
        Contacta al equipo de soporte para continuar
      </Text>
      <TouchableOpacity onPress={contact} style={styles.whatsImg}>
        <Image
          source={require("../assets/images/whats.png")}
          style={styles.logo}
        />
      </TouchableOpacity>

      <Button title="Contactar" onPress={contact} style={styles.button} />
      <Button
        title="Terminar"
        onPress={backToStart}
        style={styles.buttonCancel}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 40,
  },
  logo: {
    width: 130,
    height: 130,
    alignSelf: "center",
  },
  whatsImg: {
    width: 130,
    height: 130,
    alignSelf: "center",
    margin: 40,
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
  buttonCancel: {
    backgroundColor: "#FF0000",
    width: "80%",
    alignSelf: "center",
    marginTop: 10,
    color: "#fff",
    borderColor: "#000",
    borderWidth: 2,
  },
});
