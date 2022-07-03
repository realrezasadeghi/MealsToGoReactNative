import styled from "styled-components/native";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Spacer } from "../spacer/spacer.component";
import { CompactRestaurantInfo } from "../restaurant/compact-restaurant-info.component";
import { Text } from "../typography/text.component";

const FavoriteWrapped = styled(View)`
  padding: 10px;
  background-color: white
`;

export const FavoriteBar = ({ favorites = [], onNavigate }) => {
  if (!favorites.length) return null;
  return (
    <FavoriteWrapped>
      <Spacer position="left" size="large">
        <Text variant="caption">Favorites</Text>
      </Spacer>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {favorites.map((restaurant) => (
          <Spacer key={restaurant.name} position="left" size="large">
            <TouchableOpacity
              onPress={() =>
                onNavigate.navigate("RestaurantDetail", { restaurant })
              }
            >
              <CompactRestaurantInfo restaurant={restaurant} />
            </TouchableOpacity>
          </Spacer>
        ))}
      </ScrollView>
    </FavoriteWrapped>
  );
};
