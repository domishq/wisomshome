import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddComponentButton = ({ room, updateItems }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [key, setKey] = useState("");

  const handleSave = async () => {
    try {
      // Convert key to lowercase and keep only the first character
      const formattedKey = key.toLowerCase().charAt(0);

      // Retrieve existing data from AsyncStorage
      const storedData = await AsyncStorage.getItem("bluetoothSettings");
      const bluetoothSettings = storedData ? JSON.parse(storedData) : {};

      // Add the new component to the specified room
      bluetoothSettings[room] = bluetoothSettings[room] || [];
      bluetoothSettings[room].push({ name, key: formattedKey });

      // Save the updated data back to AsyncStorage
      await AsyncStorage.setItem(
        "bluetoothSettings",
        JSON.stringify(bluetoothSettings)
      );

      // Reset input values
      setName("");
      setKey("");
      // Close modal
      setModalVisible(false);

      // Call updateItems to trigger re-fetching data in the parent component
      updateItems();
    } catch (error) {
      console.error("Error saving data to AsyncStorage:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.addButton}
      >
        <Text style={styles.addButtonLabel}>+</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Dodaj komponentu</Text>
            <TextInput
              style={styles.input}
              placeholder="Ime"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Kljuc"
              value={key}
              onChangeText={setKey}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={handleSave}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    width: "60%", // Set the width to 60%
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    width: "48%", // Adjusted width to accommodate the gap
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "white",
  },
  cancelButton: {
    backgroundColor: "#ffaa80",
  },
  saveButton: {
    backgroundColor: "#007AFF", // Adjust color as needed
  },
  addButton: {
    width: "100%",
    backgroundColor: "#e0e0e0", // Light gray background color
    borderRadius: 10, // Make it round
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15, // Adjust padding
    elevation: 0, // Remove shadow
  },
  addButtonLabel: {
    fontSize: 40, // Increase font size
  },
});

export default AddComponentButton;
