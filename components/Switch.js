import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Image,
  StyleSheet,
} from "react-native";
import BleManager from "react-native-ble-manager";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Switch = ({ icon, title, mapa, description }) => {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = async () => {
    setIsOn(!isOn);
    await updateStateInAsyncStorage(isOn ? 0 : 1);
    sendDataToBluetooth(!isOn);
  };

  const updateStateInAsyncStorage = async (state) => {
    try {
      const storedData = await AsyncStorage.getItem("bluetoothSettings");
      const bluetoothSettings = storedData ? JSON.parse(storedData) : {};
      const newState = state === 1 ? "b1" : "b0";
      bluetoothSettings[title] = newState;
      await AsyncStorage.setItem(
        "bluetoothSettings",
        JSON.stringify(bluetoothSettings)
      );
    } catch (error) {
      console.error("Error updating state in AsyncStorage:", error);
    }
  };

  const sendDataToBluetooth = async (data) => {
    const stateCode = data ? "1" : "0";
    const combinedData = `${mapa}${stateCode}`;
    const bytes = new Uint8Array(combinedData.length);

    for (let i = 0; i < combinedData.length; i++) {
      bytes[i] = combinedData.charCodeAt(i);
    }

    try {
      await BleManager.write(
        "D9:9E:4B:35:37:A5",
        "6E400001-B5A3-F393-E0A9-E50E24DCCA9E",
        "6E400002-B5A3-F393-E0A9-E50E24DCCA9E",
        bytes
      );
      console.log("Data sent successfully");
    } catch (error) {
      console.error("Write error:", error);
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: isOn ? "#FFDE59" : "#808080" },
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
    width: 100, // Adjust as needed
    height: 100, // Adjust as needed
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
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
    width: 50, // Adjust as needed
    height: 50, // Adjust as needed
  },
});

export default Switch;
