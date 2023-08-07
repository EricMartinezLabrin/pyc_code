import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity,
} from "react-native";
import React from "react";

// Local
import { getServicesApi, checkStockApi } from "../Api/BackEnd";

// Obtener las medidas de la pantalla
const { width, height } = Dimensions.get("window");
const currentImageWidth = width / 2 - 50;

const imageWidth = () => {
  if (currentImageWidth <= 200) {
    return currentImageWidth;
  } else {
    return 200;
  }
};
const columnsTotal = () => {
  if (Platform.OS == "web") {
    return Math.floor(width / 240);
  } else {
    return "2";
  }
};

export default function Services(props) {
  const [services, setServices] = React.useState([]);
  const { selected, setSelected, navigation } = props;

  const selectService = (serviceId, serviceName) => {
    const data = {
      ...selected,
      serviceId: serviceId,
      name: serviceName,
    };
    setSelected(data);

    checkStockApi(serviceId)
      .then((request) => {
        if (request.status == 200) {
          return request.json();
        } else {
          navigation.navigate("Error");
        }
      })
      .then((request) => {
        console.log(request);
        if (request.data >= 1) {
          navigation.navigate("Login", data);
        } else {
          navigation.navigate("Contacto", data);
        }
      });
  };

  React.useEffect(() => {
    getServicesApi()
      .then((data) => {
        const response = data.json();
        return response;
      })
      .then((response) => setServices(response.detail));
  }, []);

  return (
    <View style={styles.container}>
      {services.length > 0 && (
        <FlatList
          data={services}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => selectService(item.id, item.name)}>
              <Image
                source={{
                  uri: item.image,
                }}
                style={styles.flatListImage}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={columnsTotal()}
          style={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  flatListImage: {
    width: imageWidth(),
    height: imageWidth(),
    margin: 10,
  },
  listContainer: {
    display: "flex",
    flexDirection: "row",
  },
});
