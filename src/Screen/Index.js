import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Linking,
} from "react-native";
import React from "react";

// Local
import { colors } from "../assets/Colors";
import CodeSearch from "../Components/CodeSearch";
import { getBusinessPhoneApi } from "../Api/BackEnd";

export default function Index(props) {
  const { navigation } = props;
  const [isLoading, setIsLoading] = React.useState(false);

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
            `whatsapp://send?phone=${response.message}&text=Necesito ayuda para canjear mi codigo.`
          );
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("../assets/images/logo_pyc.png")}
        style={styles.logo}
      />
      <CodeSearch navigation={navigation} setIsLoading={setIsLoading} />
      {isLoading && (
        <View style={styles.loading}>
          <ActivityIndicator color={colors.primary} />
          <Text style={styles.loadingText}>Comprobando Código</Text>
        </View>
      )}
      <TouchableOpacity style={styles.helpContainer} onPress={contact}>
        <Text style={styles.help}>¿Necesitas ayuda?, haz click aquí.</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 40,
  },
  logo: {
    width: 400,
    height: 400,
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
  helpContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  help: {
    color: colors.primary,
  },
});
