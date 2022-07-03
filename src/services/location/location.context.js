import React, { createContext, useEffect, useState } from "react";

import { locationRequest, locationTransform } from "./location.service";

export const LocationContext = createContext({
  keyword: "",
  loading: false,
  error: null,
  location: "",
  onSearch: (searchKeyword) => {},
});

export const LocationContextProvider = ({ children }) => {
  const [keyword, setKeyword] = useState("San Francisco");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState();

  const onSearch = async (search = "San Francisco") => {
    setLoading(true);
    setKeyword(search);
    if (!search.length) return;
    try {
      const result = await locationRequest(search.toLowerCase());
      setLocation(locationTransform(result));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    onSearch();
  }, []);

  return (
    <LocationContext.Provider
      value={{ keyword, loading, error, location, onSearch }}
    >
      {children}
    </LocationContext.Provider>
  );
};
