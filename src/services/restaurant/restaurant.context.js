import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { LocationContext } from "../location/location.context";
import { restaurantRequest, restaurantTransform } from "./restaurant.service";

export const RestaurantContext = createContext({
  restaurants: [],
  error: null,
  loading: false,
});

export const RestaurantContextProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const { location } = useContext(LocationContext);

  const retrieveRestaurants = (loc) => {
    setIsLoading(true);
    setRestaurants([]);
    setTimeout(async () => {
      try {
        const results = await restaurantRequest(loc);
        setRestaurants(restaurantTransform(results));
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };
  useEffect(() => {
    if (location) {
      const locationString = `${location.lat},${location.lng}`;
      retrieveRestaurants(locationString);
    }
  }, [location]);

  return (
    <RestaurantContext.Provider value={{ restaurants, loading, error }}>
      {children}
    </RestaurantContext.Provider>
  );
};
