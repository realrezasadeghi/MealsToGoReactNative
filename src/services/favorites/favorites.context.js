import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationContext } from "../authentication/authentication.context";

export const FavoritesContext = createContext({
  favorites: [],
  add: (restaurant) => {},
  remove: (restaurant) => {},
});

export const FavoritesContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const { user } = useContext(AuthenticationContext);

  const add = (restaurant) => {
    console.log(restaurant);
    setFavorites([...favorites, restaurant]);
  };

  const remove = (restaurant) => {
    const newFavorites = favorites.filter(
      (item) => item.placeId !== restaurant.placeId
    );

    setFavorites(newFavorites);
  };

  const saveFavorites = async (value, uid) => {
    try {
      const result = JSON.stringify(value);
      AsyncStorage.setItem(`@favorites-${uid}`, result);
    } catch (error) {
      console.log(error);
    }
  };

  const loadFavorites = async (uid) => {
    try {
      const result = await AsyncStorage.getItem(`@favorites-${uid}`);
      if (result !== null) setFavorites(JSON.parse(result));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user && user.uid && favorites) saveFavorites(favorites, user.uid);
  }, [favorites, user]);

  useEffect(() => {
    if (user && user.uid) loadFavorites(user.uid);
  }, [user]);

  return (
    <FavoritesContext.Provider value={{ favorites, add, remove }}>
      {children}
    </FavoritesContext.Provider>
  );
};
