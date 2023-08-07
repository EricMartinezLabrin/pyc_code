import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";

// Local
import Button from "../Components/Button";
import { colors } from "../assets/Colors";
import { StatusCodeApi } from "../Api/BackEnd";

export default function CodeSearch(props) {
  const { navigation, setIsLoading } = props;
  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validateOnChange: false,
    validationSchema: yup.object({
      code: yup
        .string()
        .required("Debe Ingresar un código para continuar")
        .min(5, "El código debe tener almenos 5 caracteres"),
    }),
    onSubmit: (formData) => {
      setIsLoading(true);
      StatusCodeApi(formData.code).then((response) => {
        if (response.status === 200) {
          setIsLoading(false);
          response.json().then((data) => {
            if (data.status_code === "Disponible") {
              if (data.shop_status === "False") {
                const error = {
                  status_code: data.status_code,
                  long: data.long,
                  message:
                    "Los codigos del local donde compró tienen problemas, porfavor contactarnos en wwww.premiumycodigos.cl/app",
                  code: data.code,
                  shop_status: data.shop_status,
                };
                navigation.navigate("Error", (data = error));
              } else {
                navigation.navigate("Account", (data = data));
              }
            } else {
              navigation.navigate("Error", (data = data));
            }
          });
        } else {
          setIsLoading(false);
          response
            .json()
            .then((data) => navigation.navigate("Error", (data = data)));
        }
      });
    },
  });

  return (
    <View>
      <TextInput
        placeholder="Ingresa el Código"
        style={styles.input}
        value={formik.values.code}
        onChangeText={formik.handleChange("code")}
      />
      <Button
        title="Canjear"
        onPress={formik.handleSubmit}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: colors.primary,
    borderRadius: 8,
    borderWidth: 2,
    alignSelf: "center",
    width: "80%",
    height: 40,
    textAlign: "center",
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
