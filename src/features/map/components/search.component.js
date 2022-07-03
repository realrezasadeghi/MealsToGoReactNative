import React, { useContext, useEffect, useState } from "react";

import styled from "styled-components";
import { Searchbar } from "react-native-paper";
import { View } from "react-native";
import { LocationContext } from "../../../services/location/location.context";

const SearchContainer = styled(View)`
  padding: ${(props) => props.theme.space[3]};
  z-index: 9999;
  position: absolute;
  width: 100%;
`;

export const SearchMap = () => {
  const { keyword, onSearch } = useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);

  return (
    <SearchContainer>
      <Searchbar
        placeholder="Search"
        value={searchKeyword}
        icon="map" 
        onSubmitEditing={() => {
          onSearch(searchKeyword);
        }}
        onChangeText={(text) => {
          setSearchKeyword(text);
        }}
      />
    </SearchContainer>
  );
};
