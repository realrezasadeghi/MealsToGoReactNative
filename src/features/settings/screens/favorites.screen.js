import React, { useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import Lottie from "lottie-react-native";
import { FavoritesContext } from "../../../services/favorites/favorites.context";
import { SafeArea } from "../../../components/safe-area/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { RestaurantInfo } from "../../restaurant/components/restaurant-info";
import { RestaurantList } from "../../restaurant/components/restaurant-list.style";

const FavoritesArea = styled(SafeArea)`
  align-items: center;
  justify-content: center;
`;
const AnimationWrapperFavorites = styled(View)`
  position: absolute;
  top: 20%;
  width: 100%;
  height: 500px;
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
      <AnimationWrapperFavorites>
        <Lottie
          key="not-found"
          source={require("../../../../assets/data-not-found.json")}
          resizeMode="cover"
          autoPlay
          loop
        />
      </AnimationWrapperFavorites>
    </FavoritesArea>
  );
};
