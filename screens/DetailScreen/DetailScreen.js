import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { bluetoothSettings } from "./bluetoothSettings";

const DetailScreen = ({ route }) => {
  const { title, image, name } = route.params.item;
  const items = bluetoothSettings[name];
  console.log(items);
  console.log("da");
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
      </View>
      <Text>{title}</Text>
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
    marginBottom: 10, // Adjust as needed
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: "cover",
  },
});

export default DetailScreen;
