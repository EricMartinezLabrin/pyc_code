import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React from "react";

// Local
import UserSearch from "../Components/UserSearch";
import { colors } from "../assets/Colors";

export default function Login(props) {
  const { params } = props.route;
  const { navigation } = props;
  const [isLoading, setIsLoading] = React.useState(false);

  const pluralizeMonth = (number) => (number == 1 ? "Mes" : "Meses");

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loading}>
          <ActivityIndicator color={colors.primary} />
          <Text style={styles.loadingText}>Comprobando Código</Text>
        </View>
      )}
      <Text style={styles.title}>¡Excelente Elección!</Text>
      <View style={styles.subtitleContainer}>
        <Text style={styles.star}>⭑</Text>
        <Text style={styles.subtitle}>
          {params.long} {pluralizeMonth(params.long)} de {params.name}
        </Text>
        <Text style={styles.star}>⭑</Text>
      </View>
      <Text style={styles.text}>
        Una ultima cosa antes de entregarte tu cuenta:
      </Text>
      <UserSearch
        data={params}
        setIsLoading={setIsLoading}
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
  text: {
    margin: 20,
    width: "80%",
    alignSelf: "center",
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    height: 200,
    width: 200,
    borderRadius: 10,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  loadingText: {
    color: "white",
    marginTop: 10,
  },
});
