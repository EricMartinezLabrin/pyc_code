import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";

// Local
import { colors } from "../assets/Colors";
import Button from "../Components/Button";
import {
  getUsernameApi,
  createUserByEmailApi,
  saleApi,
  useCuponApi,
} from "../Api/BackEnd";

export default function UserSearch(props) {
  const [showPhone, setShowPhone] = React.useState(false);
  const [newEmail, setNewEmail] = React.useState(null);
  const [asignedAcc, setAsignedAcc] = React.useState(null);
  const { data, setIsLoading } = props;
  const { navigation } = props;

  asignedAcc && navigation.navigate("Success", asignedAcc);

  const changeEmail = () => {
    setNewEmail(null);
    setShowPhone(false);
  };

  const completeSale = (
    expiration_long,
    customer_email,
    service_id,
    amount,
    code
  ) => {
    saleApi(expiration_long, customer_email, service_id, amount, code)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        useCuponApi(code, response.sale.customer, response.sale.id).then(
          (cupon) => {
            if (cupon.status == 200) {
              const data = {
                sale: response.sale,
                acc: response.acc,
                service: response.service,
              };
              setAsignedAcc(data);
              setIsLoading(false);
            }
          }
        );
      });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      phone: "",
    },
    validateOnChange: false,
    validationSchema: yup.object({
      email: yup
        .string()
        .matches(
          /^[A-Za-z]+([A-Za-z0-9_\-\.])*@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,})$/,
          "Debe Ingresar un E-Mail válido"
        )
        .required("Debe Ingresar un E-Mail para continuar")
        .min(5, "El código debe tener almenos 5 caracteres"),
      phone: yup
        .string("Debes ingresar un número de téfono válido")
        .max(8, "Debes ingresar 8 digitos"),
    }),
    onSubmit: (formData) => {
      setIsLoading(true);
      if (!showPhone) {
        getUsernameApi(formData.email.toLowerCase())
          .then((response) => {
            if (response.status == 200) {
              return response.json();
            } else {
              setNewEmail(formData.email);
              setShowPhone(true);
              setIsLoading(false);
            }
          })
          .then((response) => {
            completeSale(
              data.long,
              response.data.email,
              data.serviceId,
              0,
              data.code
            );
          });
      } else {
        try {
          createUserByEmailApi(formData.email, formData.phone)
            .then((response) => {
              if (response.status == 201) {
                return response.json();
              } else {
                response.json().then((response) => console.error(response));
              }
            })
            .then((response) =>
              completeSale(
                data.long,
                formData.email,
                data.serviceId,
                0,
                data.code
              )
            );
        } catch (error) {
          console.error(error);
        }
      }
    },
  });

  return (
    <View>
      <Text style={styles.label}>E-Mail:</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Ingresa tu E-mail"
          keyboardType="email-address"
          value={formik.values.email}
          onChangeText={formik.handleChange("email")}
          style={styles.input}
          editable={!newEmail}
        />
        {formik.errors.email}
      </View>
      {showPhone && (
        <View>
          <Text style={styles.label}>Últimos 8 digitos del celular:</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.lada}>+569</Text>
            <TextInput
              placeholder="Ingresa tu Celular"
              keyboardType="number-pad"
              value={formik.values.phone}
              onChangeText={formik.handleChange("phone")}
              style={styles.input}
            />
            {formik.errors.phone}
          </View>
        </View>
      )}
      <Button
        title="Canjear"
        onPress={formik.handleSubmit}
        style={styles.button}
      />
      {showPhone && (
        <Button
          title="Cambiar E-Mail"
          onPress={changeEmail}
          style={styles.changeButton}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    width: "80%",
    alignSelf: "center",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
  },
  lada: {
    fontWeight: "bold",
    margin: 5,
  },
  inputContainer: {
    width: "80%",
    alignSelf: "center",
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 5,
    paddingHorizontal: 10,
    paddingVertical: 7,
    flexDirection: "row",
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
  changeButton: {
    backgroundColor: "red",
    width: "80%",
    alignSelf: "center",
    marginTop: 10,
    color: "#fff",
    borderColor: "#000",
    borderWidth: 2,
  },
});
