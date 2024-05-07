import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DetailScreen from "./screens/DetailScreen/DetailScreen";
import BottomNavBar from "./components/BottomNavbar";
import { SecurityScreen } from "./screens/DetailScreen/SecurityScreen";
import { HomeScreen, HomeScreenStack } from "./screens/DetailScreen/HomeScreen";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialBluetoothSettings = {
  wc: [],
  dnevniboravak: [],
  kuhinja: [],
  djecija: [],
  spavaca: [],
  security: [],
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    const initializeAsyncStorage = async () => {
      try {
        const storedData = await AsyncStorage.getItem("bluetoothSettings");
        if (!storedData) {
          await AsyncStorage.setItem(
            "bluetoothSettings",
            JSON.stringify(initialBluetoothSettings)
          );
          console.log("AsyncStorage initialized with main rooms.");
        }
      } catch (error) {
        console.error("Error initializing AsyncStorage: ", error);
      }
    };

    initializeAsyncStorage();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={(props) => <BottomNavBar {...props} />}>
        <Tab.Screen
          name="Kuća"
          component={HomeScreenStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="Sigurnost" component={SecurityScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
