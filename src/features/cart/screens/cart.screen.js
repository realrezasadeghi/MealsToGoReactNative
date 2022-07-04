import { useContext, useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Button, Card, RadioButton } from "react-native-paper";
import styled from "styled-components/native";
import { SafeArea } from "../../../components/safe-area/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { CartContext } from "../../../services/cart/cart.context";
import { CartInfo } from "../components/cart-info.component";

const ItemCartWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  margin: ${(props) => props.theme.space[2]};
  background-color: white;
  border-radius: 5px;
  max-width: 400px;
`;

export const CartScreen = () => {
  const { cart, remove } = useContext(CartContext);
  const [selectCart, setSelectCart] = useState(null);

  useEffect(() => {
    console.log(selectCart);
  }, []);
  return (
    <SafeArea>
      <FlatList
        data={cart}
        contentContainerStyle={{ padding: 10 }}
        renderItem={({ item }) => (
          <Spacer position="bottom" size="medium">
            <RadioButton.Group
              value={selectCart}
              onValueChange={(val) => setSelectCart(val)}
            >
              <Card>
                <TouchableOpacity onPress={() => setSelectCart(item)}>
                  <ItemCartWrapper>
                    <RadioButton value={item} />
                    <View style={{ flex: 1 }}>
                      <CartInfo restaurant={item} />
                    </View>
                  </ItemCartWrapper>
                </TouchableOpacity>
              </Card>
            </RadioButton.Group>
          </Spacer>
        )}
      />
      {selectCart && (
        <View style={{ flex: 1, padding: 10 }}>
          <Button color="blue" mode="contained">
            Payment
          </Button>
        </View>
      )}
    </SafeArea>
  );
};
