import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { FavoritesScreen } from "../../features/settings/screens/favorites.screen";
import { SettingsScreen } from "../../features/settings/screens/settings.screen";
import { CameraScreen } from "../../features/settings/screens/camera.screen";

const Stack = createStackNavigator();

export const SettingsNavigator = ({ route, navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator:
          CardStyleInterpolators.forRevealFromBottomAndroid,
        headerShown: false,
      }}
    >
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
    </Stack.Navigator>
  );
};
