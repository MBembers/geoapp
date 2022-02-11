import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const Map = ({ route, navigation }) => {
  const params = route.params;
  console.log("Params: ", params);
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: params[0].coords.latitude,
          longitude: params[0].coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {params.map((p) => (
          <Marker
            coordinate={{
              latitude: p.coords.latitude,
              longitude: p.coords.longitude,
            }}
            title={"pos"}
            description={"opis"}
            key={p.timestamp}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Map;
