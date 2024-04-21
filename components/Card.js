import React from "react";
import { View, ImageBackground, Text, StyleSheet } from "react-native";

const Card = ({ imageSource, title, description }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={imageSource} style={styles.imageBackground}>
        <View style={styles.overlay}>
          {title && <Text style={styles.title}>{title}</Text>}
          {description && <Text style={styles.description}>{description}</Text>}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 10,
  },
  imageBackground: {
    width: "100%",
    aspectRatio: 21 / 9,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default Card;
