import React from "react";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import "react-native-gesture-handler";
import { RestaurantScreen } from "../../features/restaurant/screens/restaurant.screen";
import { RestaurantDetailScreen } from "../../features/restaurant/screens/restaurant-detail.screen";

const Stack = createStackNavigator();

export const RestaurantsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.FadeFromBottomAndroid,
      }}
    >
      <Stack.Screen name="Restaurants" component={RestaurantScreen} />
      <Stack.Screen
        name="RestaurantDetail"
        component={RestaurantDetailScreen}
      />
    </Stack.Navigator>
  );
};
