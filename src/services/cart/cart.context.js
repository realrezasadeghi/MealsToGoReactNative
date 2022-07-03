import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthenticationContext } from "../authentication/authentication.context";

export const CartContext = createContext({
  cart: [],
  sum: 0,
  addToCart: (item, rst) => {},
  subCart: (item) => {},
  remove: (item) => {},
});

export const CartContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const [cart, setCart] = useState([]);
  const [sum, setSum] = useState(0);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const saveCart = async (crt, uid) => {
    try {
      const jsonValue = JSON.stringify(crt);
      await AsyncStorage.setItem(`cart-${uid}`, jsonValue);
    } catch (e) {
      console.log("error storing", e);
    }
  };

  const loadCart = async (uid) => {
    try {
      const value = await AsyncStorage.getItem(`cart-${uid}`);
      if (value !== null) {
        const result = JSON.parse(value);
        setCart(result);
      }
    } catch (e) {
      console.log("error storing", e);
    }
  };

  const subCart = (item) => {};

  const remove = (item) => {
    const newCart = cart.filter(
      (restaurant) => restaurant.placeId !== item.placeId
    );
    setCart([...newCart]);
  };

  useEffect(() => {
    if (!cart.length) {
      setSum(0);
      return;
    }
    const newSum = cart.reduce((acc, { price }) => {
      return (acc += price);
    }, 0);
    setSum(newSum);
  }, [cart]);

  useEffect(() => {
    if (user && user.uid) {
      loadCart(user.uid);
    }
    console.log(cart);
  }, [user]);

  useEffect(() => {
    if (user && user.uid) {
      saveCart(cart, user.uid);
    }
    console.log(cart);
  }, [cart, user]);

  return (
    <CartContext.Provider value={{ cart, sum, addToCart, subCart, remove }}>
      {children}
    </CartContext.Provider>
  );
};
