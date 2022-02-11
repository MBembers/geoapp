import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Text,
  FlatList,
  Alert,
  ScrollView,
  ActivityIndicator,
  Touchable,
} from "react-native";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ListItem from "./ListItem.js";

const Geosave = ({ navigation }) => {
  const [switchState, setSwitchState] = useState(false);
  const [locations, setLocations] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
      }
    })();
    getLocations();
  }, []);

  const clear = async () => {
    // console.log("LOKACJE: ", locations);

    await AsyncStorage.clear(async () => {
      await getLocations();
      setLocations([]);
    });
  };

  const switcher = (enabled) => {
    setSwitchState(enabled);
    setMarkers("all", enabled);
  };

  const setMarkers = (timestamp, value) => {
    console.log("setting markers", timestamp, value);
    setLocations(() => {
      let tmp = locations;
      for (let l of tmp) {
        if (timestamp === "all" || timestamp === l.timestamp) {
          l.marker = value;
        }
      }
      return tmp;
    });
  };

  const getLocations = async () => {
    const keys = await AsyncStorage.getAllKeys();
    let locs = await AsyncStorage.multiGet(keys);
    locs = locs.map((l) => JSON.parse(l[1]));
    locs = locs.map((l) => {
      l.marker = false;
      return l;
    });
    setLocations(locs);
  };

  const navig = () => {
    const temp = locations.filter((l) => l.marker);
    if (temp.length > 0) navigation.navigate("Map", temp);
  };

  const getPosition = async () => {
    setLoading(true);
    const location = await Location.getCurrentPositionAsync();
    setLoading(false);
    Alert.alert(
      "Pozycja",
      "Pozycja została pobrana - czy zapisać?",
      [
        {
          text: "NIE",
          style: "cancel",
        },
        {
          text: "TAK",
          onPress: async () => {
            await AsyncStorage.setItem(
              location.timestamp.toString(),
              JSON.stringify(location)
            );
            await getLocations();
          },
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          style={{ flex: 1 }}
          size="large"
          color="#0000ff"
          animating={isLoading}
        />
      ) : (
        <View style={{ flex: 1 }}>
          <View style={styles.uppperButtons}>
            <TouchableOpacity style={styles.button} onPress={getPosition}>
              <Text style={styles.buttonText}>POBIERZ I ZAPISZ POZYCJĘ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={clear}>
              <Text style={styles.buttonText}>USUŃ WSZYSTKIE DANE</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.switchView}>
            <TouchableOpacity style={styles.mapButton} onPress={navig}>
              <Text style={styles.switchText}>PRZEJDŹ DO MAPY</Text>
            </TouchableOpacity>
            <Switch
              style={styles.switch}
              trackColor={{ true: "#80c5ed", false: "lightgray" }}
              thumbColor={switchState ? "#0f68a3" : "white"}
              value={switchState}
              onValueChange={switcher}
            />
          </View>
          <View style={styles.listView}>
            <ScrollView style={{ flex: 1 }}>
              {locations
                ? locations.map((l) => (
                    <ListItem
                      item={l}
                      onSwitch={setMarkers}
                      key={l.timestamp}
                    />
                  ))
                : null}
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  uppperButtons: {
    flex: 1,
    flexDirection: "row",
  },
  button: {
    flex: 1,
    marginTop: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  switchView: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  switchText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    textAlignVertical: "center",
  },
  switch: {
    alignContent: "center",
  },
  mapButton: {
    justifyContent: "center",
  },
  listView: {
    flex: 10,
  },
});

export default Geosave;
