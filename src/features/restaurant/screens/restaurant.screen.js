import { View, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import { RestaurantInfo } from "../components/restaurant-info";
import { Spacer } from "../../../components/spacer/spacer.component";
import { useContext, useState } from "react";
import { RestaurantContext } from "../../../services/restaurant/restaurant.context";
import { ActivityIndicator, Colors } from "react-native-paper";
import { Search } from "../components/search.component";
import { SafeArea } from "../../../components/safe-area/safe-area.component";
import { FavoriteBar } from "../../../components/favorites/favorite-bar.component";
import { FavoritesContext } from "../../../services/favorites/favorites.context";
import { RestaurantList } from "../components/restaurant-list.style";
import { FadeInView } from "../../../components/animations/fade.animation";

//${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`}

const LoadingContainer = styled(View)`
  position: absolute;
  top: 50%;
  left: 45%;
`;

const RestaurantListContainer = styled(View)`
  flex: 1;
  padding: ${(props) => props.theme.space[2]};
`;

export const RestaurantScreen = ({ navigation }) => {
  const { restaurants, loading } = useContext(RestaurantContext);
  const { favorites } = useContext(FavoritesContext);
  const [favoriteToggled, setFavoriteToggled] = useState(false);

  return (
    <SafeArea>
      {loading && (
        <LoadingContainer>
          <ActivityIndicator
            animating={true}
            color={Colors.blue500}
            size={50}
          />
        </LoadingContainer>
      )}
      <Search
        isFavoriteToggled={favoriteToggled}
        onPressToggled={() => setFavoriteToggled(!favoriteToggled)}
      />
      {favoriteToggled && (
        <FavoriteBar favorites={favorites} onNavigate={navigation} />
      )}
      <RestaurantListContainer>
        <RestaurantList
          data={restaurants}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("RestaurantDetail", { restaurant: item })
              }
            >
              <Spacer position="bottom" size="large">
                <FadeInView>
                  <RestaurantInfo restaurant={item} />
                </FadeInView>
              </Spacer>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.name}
        />
      </RestaurantListContainer>
    </SafeArea>
  );
};
