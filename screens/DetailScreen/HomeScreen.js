import React from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Card from "../../components/Card";
import DetailScreen from "./DetailScreen";

const Stack = createStackNavigator();

export const items = [
  {
    image: require("../../assets/livingroom.jpg"),
    title: "Dnevni boravak",
    name: "dnevniboravak",
  },
  {
    image: require("../../assets/kitchen.jpg"),
    title: "Kuhinja",
    name: "kuhinja",
  },
  {
    image: require("../../assets/bedroom.jpg"),
    title: "Spavaća soba",
    name: "spavaca",
  },
  {
    image: require("../../assets/kidsbedroom.jpg"),
    title: "Dječija soba",
    name: "djecija",
  },
  {
    image: require("../../assets/bathroom.jpg"),
    title: "WC",
    name: "wc",
  },
];

export const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {items.map((item, key) => (
          <TouchableOpacity
            key={key}
            onPress={() => navigation.navigate(item.title, { item })}
          >
            <Card imageSource={item.image} title={item.title} description="" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
});

export const HomeScreenStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      {items.map((item, key) => (
        <Stack.Screen key={key} name={item.title} component={DetailScreen} />
      ))}
    </Stack.Navigator>
  );
};
