import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DetailScreen from "./screens/DetailScreen/DetailScreen";
import BottomNavBar from "./components/BottomNavbar";
import { SecurityScreen } from "./screens/DetailScreen/SecurityScreen";
import { HomeScreen, HomeScreenStack } from "./screens/DetailScreen/HomeScreen";
import { createStackNavigator } from "@react-navigation/stack";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
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
