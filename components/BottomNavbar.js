import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

const BottomNavBar = ({ navigation, state }) => {
  const { routes } = state;

  const navigateToScreen = (routeName) => {
    navigation.navigate(routeName);
  };

  return (
    <View style={styles.container}>
      {routes.map((route, index) => (
        <TouchableOpacity
          key={index}
          style={styles.tab}
          onPress={() => navigateToScreen(route.name)}
        >
          <Text style={styles.tabText}>{route.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  tab: {
    alignItems: "center",
  },
  tabText: {
    fontSize: 16,
    color: "#555",
  },
});

export default BottomNavBar;
