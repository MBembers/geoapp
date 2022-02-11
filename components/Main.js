import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

const Main = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Geosave")}>
        <Text style={styles.mainText}> Geo App </Text>
      </TouchableOpacity>

      <Text style={styles.subText}> find and save your position </Text>
      <Text style={styles.subText}> use map </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6666ff",
    justifyContent: "center",
    alignItems: "center",
  },
  mainText: {
    color: "#fff",
    fontSize: 80,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  subText: {
    color: "#fff",
    fontSize: 30,
  },
});

export default Main;
