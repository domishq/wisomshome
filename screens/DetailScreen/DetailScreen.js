import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { bluetoothSettings } from "./bluetoothSettings";
import { Switch } from "../../components/Switch";

const DetailScreen = ({ route }) => {
  const { title, image, name } = route.params.item;
  const items = bluetoothSettings[name] || { switch: [] };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
      </View>
      <View style={styles.contain}>
        <ScrollView
          horizontal
          style={{ width: "100%" }}
          contentContainerStyle={styles.scrollContainer}
        >
          {items.switch.map((item, key) => (
            <Switch key={key} title={item.name} icon={item.icon}></Switch>
          ))}
        </ScrollView>
      </View>
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
