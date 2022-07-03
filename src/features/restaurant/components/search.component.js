import React, { useContext, useEffect, useState } from "react";

import styled from "styled-components";
import { Searchbar } from "react-native-paper";
import { View } from "react-native";
import { LocationContext } from "../../../services/location/location.context";

const SearchContainer = styled(View)`
  padding: ${(props) => props.theme.space[3]};
`;

export const Search = ({ isFavoriteToggled, onPressToggled }) => {
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
        icon={isFavoriteToggled ? "heart" : "heart-outline"}
        onIconPress={onPressToggled}
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
