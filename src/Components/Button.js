import { Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function Button(props) {
  const { style, title, onPress, icon, disabled } = props;

  const showIcon = !!icon ? <Icon name={icon} /> : null;

  const styleButton = { ...styles.button, ...style };

  if (!disabled) {
    const disabled = false;
  }
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styleButton}>
        {showIcon} {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  button: {
    fontWeight: "bold",
    textAlign: "center",
    padding: 8,
    width: "100%",
    borderRadius: 5,
  },
});
