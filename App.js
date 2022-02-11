import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./components/Main.js";
import Geosave from "./components/Geosave.js";
import Map from "./components/Map.js";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Geosave"
          component={Geosave}
          options={{
            title: "Zapis pozycji",
            headerStyle: {
              backgroundColor: "#6666ff",
            },
            headerTintColor: "#ffffff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="Map"
          component={Map}
          options={{
            title: "Lokalizacja na mapie",
            headerStyle: {
              backgroundColor: "#6666ff",
            },
            headerTintColor: "#ffffff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
