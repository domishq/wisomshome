import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { Switch } from "../../components/Switch";
import { bluetoothSettings } from "./bluetoothSettings";

export const SecurityScreen = () => {
  const items = bluetoothSettings.security || { switch: [] };

  return (
    <View style={styles.container}>
      <View style={styles.contain}>
        <ScrollView
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
    flexWrap: "wrap",
    justifyContent: "space-between",
    //gap: 20,
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  contain: {
    flex: 1,
    width: "100%",
  },
});
