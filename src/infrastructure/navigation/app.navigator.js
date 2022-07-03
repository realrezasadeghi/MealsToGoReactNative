import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { RestaurantsNavigator } from "./restaurants.navigator";
import { MapScreen } from "../../features/map/screens/map.screen";
import { FavoritesContextProvider } from "../../services/favorites/favorites.context";
import { LocationContextProvider } from "../../services/location/location.context";
import { RestaurantContextProvider } from "../../services/restaurant/restaurant.context";
import { SettingsNavigator } from "./settings.navigator";
import { CartContextProvider } from "../../services/cart/cart.context";
import { CartScreen } from "../../features/cart/screens/cart.screen";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Restaurant: "md-restaurant",
  Cart: "md-cart",
  Map: "md-map",
  Settings: "md-settings",
};

const tabBarIcon =
  (iconName) =>
  ({ size, color }) =>
    <Ionicons name={iconName} size={size} color={color} />;

const screenOptions = ({ route }) => {
  const icon = TAB_ICON[route.name];
  return {
    tabBarIcon: tabBarIcon(icon),
    tabBarStyle: { position: "absolute" },
  };
};

export const AppNavigator = () => {
  return (
    <CartContextProvider>
      <FavoritesContextProvider>
        <LocationContextProvider>
          <RestaurantContextProvider>
            <Tab.Navigator screenOptions={screenOptions}>
              <Tab.Screen name="Restaurant" component={RestaurantsNavigator} />
              <Tab.Screen name="Cart" component={CartScreen} />
              <Tab.Screen name="Map" component={MapScreen} />
              <Tab.Screen name="Settings" component={SettingsNavigator} />
            </Tab.Navigator>
          </RestaurantContextProvider>
        </LocationContextProvider>
      </FavoritesContextProvider>
    </CartContextProvider>
  );
};
