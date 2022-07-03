import { useContext } from "react";
import { FavoritesContext } from "../../services/favorites/favorites.context";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const FavoriteButton = styled(TouchableOpacity)`
  background-color: transparent;
  border-color: #20232a;
  position: absolute;
  top: 20px;
  right: -10px;
  width: 64px;
  z-index: 9;
`;

export const Favorite = ({ restaurant }) => {
  const { favorites, add, remove } = useContext(FavoritesContext);

  const isFavorite = favorites.find((item) => item.placeId === restaurant.placeId);
  return (
    <FavoriteButton
      onPress={() => (!isFavorite ? add(restaurant) : remove(restaurant))}
    >
      <AntDesign
        name={isFavorite ? "heart" : "hearto"}
        color={isFavorite ? "red" : "white"}
        size={24}
      />
    </FavoriteButton>
  );
};
