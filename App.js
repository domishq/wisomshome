import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DetailScreen from "./screens/DetailScreen/DetailScreen";
import BottomNavBar from "./components/BottomNavbar";
import { SecurityScreen } from "./screens/DetailScreen/SecurityScreen";
import { HomeScreen, HomeScreenStack } from "./screens/DetailScreen/HomeScreen";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BleManager from "react-native-ble-manager";

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
        console.log("Starting BleManager...");

        BleManager.enableBluetooth()
          .then(() => {
            console.log("Bluetooth is already enabled");
          })
          .catch((error) => {
            Alert.alert(
              "Enable bluetooth",
              "You need to enable bluetooth to use this app."
            );
          });

        BleManager.start({ showAlert: false }).then(() => {
          console.log("Module initialized");
        });
        console.log("BleManager started successfully.");
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
