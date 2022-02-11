import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Switch,
  Image,
  TouchableOpacity,
} from "react-native";
import earth from "../assets/earth.png";

const ListItem = ({ item, onSwitch }) => {
  // console.log("a"); kurwa mac nwm o co chodzi
  const [KLUCZXD, setKLUCZ] = useState(0);
  const change = (enabled) => {
    // console.log("sus: ", onSwitch, "ITEM: ", item);
    onSwitch(item.timestamp, enabled);
    setKLUCZ(KLUCZXD + 1);
  };
  return (
    <View style={styles.container}>
      <View style={styles.map}>
        <TouchableOpacity style={{ flex: 1 }}>
          <Image
            source={earth}
            style={{ width: "90%", height: "90%", resizeMode: "contain" }}
          ></Image>
        </TouchableOpacity>
      </View>
      <View style={styles.texts}>
        <Text style={styles.bigText}>- timestamp: {item.timestamp}</Text>
        <Text style={styles.subText}>- latitude: {item.coords.latitude}</Text>
        <Text style={styles.subText}>- longitude: {item.coords.longitude}</Text>
      </View>
      <View style={styles.switchView}>
        <Switch
          key={KLUCZXD}
          trackColor={{ true: "#80c5ed", false: "lightgray" }}
          thumbColor={item.marker ? "#0f68a3" : "white"}
          value={item.marker}
          onValueChange={change}
        />
      </View>
      <View style={styles.XD}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    height: 100,
  },
  map: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center",
  },
  texts: {
    flex: 5,
  },
  bigText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3344dd",
  },
  switchView: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  XD: {
    flex: 1,
  },
});

export default ListItem;
