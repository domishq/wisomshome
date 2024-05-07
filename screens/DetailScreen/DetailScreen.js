import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { bluetoothSettings } from "./bluetoothSettings";
import { Switch } from "../../components/Switch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddComponentButton from "../../components/AddComponentButton";

const DetailScreen = ({ route }) => {
  const { title, image, name } = route.params.item;

  const [items, setItems] = useState([]);

  const fetchData = async () => {
    try {
      const storedData = await AsyncStorage.getItem("bluetoothSettings");
      const bluetoothSettings = storedData ? JSON.parse(storedData) : {};
      const roomItems = bluetoothSettings[name] || [];
      setItems(roomItems);
    } catch (error) {
      console.error("Error fetching data from AsyncStorage:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [name]);

  const updateItems = () => {
    fetchData();
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
      </View>
      <ScrollView style={styles.contain}>
        <ScrollView
          horizontal
          style={{ width: "100%" }}
          contentContainerStyle={styles.scrollContainer}
        >
          {items.length > 0 &&
            items.map((item, key) => (
              <Switch key={key} title={item.name} icon={item.icon}></Switch>
            ))}
        </ScrollView>
        <AddComponentButton room={name} updateItems={updateItems} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: "cover",
  },
  scrollContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 20,
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  contain: {
    flex: 1,
    width: "100%",
  },
});

export default DetailScreen;
