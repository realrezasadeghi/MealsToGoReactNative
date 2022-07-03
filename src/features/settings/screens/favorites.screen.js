import React, { useContext } from "react";
import { Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { FavoritesContext } from "../../../services/favorites/favorites.context";
import { SafeArea } from "../../../components/safe-area/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { RestaurantInfo } from "../../restaurant/components/restaurant-info";
import { RestaurantList } from "../../restaurant/components/restaurant-list.style";

const FavoritesArea = styled(SafeArea)`
  align-items: center;
  justify-content: center;
`;
export const FavoritesScreen = ({ navigation }) => {
  const { favorites } = useContext(FavoritesContext);
  return favorites.length ? (
    <RestaurantList
      data={favorites}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("RestaurantDetail", { restaurant: item })
          }
        >
          <Spacer position="bottom" size="large">
            <RestaurantInfo restaurant={item} />
          </Spacer>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.name}
    />
  ) : (
    <FavoritesArea>
      <Text>No Favorites</Text>
    </FavoritesArea>
  );
};
