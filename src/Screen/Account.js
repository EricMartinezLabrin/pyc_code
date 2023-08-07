import { View, Text, StyleSheet } from "react-native";
import React from "react";

// Local
import Services from "../Components/Services";

export default function Account(props) {
  const pluralizeMonth = (number) => (number == 1 ? "Mes" : "Meses");
  const [selected, setSelected] = React.useState({});

  // Obtenemos Datos del Código
  const { long, code } = props.route.params;
  const { navigation } = props;

  // Agregamos informacion a State
  React.useEffect(() => {
    const data = {
      code: code,
      long: long,
    };
    setSelected(data);
  }, [code]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Excelente Compra!</Text>
      <View style={styles.subtitleContainer}>
        <Text style={styles.star}>⭑</Text>
        <Text style={styles.subtitle}>
          {long} {pluralizeMonth(long)}
        </Text>
        <Text style={styles.star}>⭑</Text>
      </View>
      <Text style={styles.servicesTitle}>Elige tu servicio favorito:</Text>
      <Services
        long={long}
        selected={selected}
        setSelected={setSelected}
        navigation={navigation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 80,
  },
  title: {
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 30,
  },
  subtitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  subtitle: {
    fontSize: 20,
  },
  star: {
    fontSize: 40,
    color: "gold",
    fontWeight: "bold",
  },
  servicesTitle: {
    marginHorizontal: 20,
    marginTop: 10,
  },
});
