import { useContext, useState } from "react";
import { List } from "react-native-paper";
import { ScrollView, View } from "react-native";
import styled from "styled-components/native";
import { SafeArea } from "../../../components/safe-area/safe-area.component";
import { RestaurantInfo } from "../components/restaurant-info";
import { CartContext } from "../../../services/cart/cart.context";
import { Spacer } from "../../../components/spacer/spacer.component";
import { OrderButton } from "../components/restaurant-list.style";

export const RestaurantDetailScreen = ({ route }) => {
  const { restaurant } = route.params;

  const [breakfastExpanded, setBreakfastExpanded] = useState(false);
  const [lunchExpanded, setLunchExpanded] = useState(false);
  const [dinnerExpanded, setDinnerExpanded] = useState(false);
  const [drinksExpanded, setDrinksExpanded] = useState(false);

  const { addToCart, cart } = useContext(CartContext);

  const ScrollViewContainer = styled(View)`
    height: 40%;
  `;

  const isAddedToCard = cart.find(
    (item) => item.placeId === restaurant.placeId
  );

  return (
    <SafeArea style={{ flex: 1 }}>
      <RestaurantInfo restaurant={restaurant} style={{ flex: 0.5 }} />
      <ScrollViewContainer>
        <ScrollView fadingEdgeLength={2}>
          <List.Accordion
            title="Breakfast"
            left={(props) => <List.Icon {...props} icon="bread-slice" />}
            expanded={breakfastExpanded}
            onPress={() => setBreakfastExpanded(!breakfastExpanded)}
          >
            <List.Item title="Eggs Benedict" />
            <List.Item title="Classic Breakfast" />
          </List.Accordion>
          <List.Accordion
            title="Lunch"
            left={(props) => <List.Icon {...props} icon="hamburger" />}
            expanded={lunchExpanded}
            onPress={() => setLunchExpanded(!lunchExpanded)}
          >
            <List.Item title="Burger w/ Fries" />
            <List.Item title="Steak Sandwich" />
            <List.Item title="Mushroom Soup" />
          </List.Accordion>
          <List.Accordion
            title="Dinner"
            left={(props) => <List.Icon {...props} icon="food-variant" />}
            expanded={dinnerExpanded}
            onPress={() => setDinnerExpanded(!dinnerExpanded)}
          >
            <List.Item title="Spaghetti Bolognese" />
            <List.Item title="Veal Cutlet with Chicken Mushroom Rotini" />
            <List.Item title="Steak Frites" />
          </List.Accordion>
          <List.Accordion
            title="Drinks"
            left={(props) => <List.Icon {...props} icon="cup" />}
            expanded={drinksExpanded}
            onPress={() => setDrinksExpanded(!drinksExpanded)}
          >
            <List.Item title="Coffee" />
            <List.Item title="Tea" />
            <List.Item title="Modelo" />
            <List.Item title="Coke" />
            <List.Item title="Fanta" />
          </List.Accordion>
        </ScrollView>
      </ScrollViewContainer>
      <Spacer position="top" size="medium">
        {!isAddedToCard ? (
          <OrderButton
            icon="cash"
            mode="contained"
            onPress={() => addToCart(restaurant)}
          >
            Order Special Only 12.99!
          </OrderButton>
        ) : (
          <OrderButton mode="contained">Added To Cart</OrderButton>
        )}
      </Spacer>
    </SafeArea>
  );
};
