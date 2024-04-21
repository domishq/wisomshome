import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";

export const Switch = ({ icon, title, description }) => {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: isOn ? "#FFDE59" : "#808080" }, // Green when on, gray when off
        Platform.OS === "ios" ? styles.shadowIOS : styles.shadowAndroid,
      ]}
      onPress={toggleSwitch}
    >
      {icon && <Image source={icon} style={styles.icon} />}
      {title && <Text style={styles.title}>{title}</Text>}
      {description && <Text style={styles.description}>{description}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    //width: "30%",
    width: 500,
    maxWidth: "45%",
    aspectRatio: 1 / 1.4,
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "",
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  description: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },
  shadowIOS: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  shadowAndroid: {
    elevation: 12,
  },
  icon: {
    width: "10px",
    height: "10px",
  },
});

export default Switch;
