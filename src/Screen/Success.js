import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

// Local
import Button from "../Components/Button";
import { colors } from "../assets/Colors";

export default function Error(props) {
  // Obtenemos Datos del Código
  const { navigation } = props;
  const { acc, sale, service } = props.route.params;
  console.log(props.route.params);
  const terminar = () => {
    navigation.navigate("Index");
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logo_pyc.png")}
        style={styles.logo}
      />
      <Text style={styles.titleError}>Muchas Gracias por tu Preferencia</Text>
      <Text style={styles.messageError}>
        A continuación encontraras tus claves de acceso:
      </Text>

      <View style={styles.labelContainer}>
        <Text style={styles.label}>Servicio:</Text>
        <Text style={styles.data}>{service.name}</Text>
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.data}>{acc.email}</Text>
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Password:</Text>
        <Text style={styles.data}>{acc.password}</Text>
      </View>

      <View style={styles.labelContainer}>
        <Text style={styles.label}>Perfil:</Text>
        <Text style={styles.data}>{acc.profile}</Text>
      </View>

      {acc.pin && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Pin:</Text>
          <Text style={styles.data}>1234</Text>
        </View>
      )}

      <View style={styles.labelContainer}>
        <Text style={styles.label}>Vencimiento:</Text>
        <Text style={styles.data}>{sale.expiration_date}</Text>
      </View>

      <Button title="Terminar" onPress={terminar} style={styles.button} />
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
    color: colors.primary,
    textAlign: "center",
  },
  messageError: {
    textAlign: "center",
    marginVertical: 20,
  },
  button: {
    backgroundColor: colors.primary,
    width: "100%",
    alignSelf: "center",
    marginTop: 10,
    color: "#fff",
    borderColor: "#000",
    borderWidth: 2,
  },
  labelContainer: {
    flexDirection: "row",
    marginBottom: 5,
    width: "80%",
    item: "center",
  },
  label: {
    fontWeight: "bold",
    marginEnd: 5,
  },
  data: {},
});
