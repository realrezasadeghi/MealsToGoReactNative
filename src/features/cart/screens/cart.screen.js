import { useContext, useRef, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Card, RadioButton } from "react-native-paper";
import styled from "styled-components/native";
import { SafeArea } from "../../../components/safe-area/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { CartContext } from "../../../services/cart/cart.context";
import { BottomSheetCart } from "../components/bottom-sheet-cart.component";
import { CartInfo } from "../components/cart-info.component";

const ItemCartWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  margin: ${(props) => props.theme.space[2]};
  background-color: white;
  border-radius: 5px;
  max-width: 400px;
`;

const ContainerCartInfo = styled(View)`
  flex: 1;
`;

export const CartScreen = () => {
  const { cart, remove } = useContext(CartContext);
  const [selectCart, setSelectCart] = useState(null);
  const bottomSheetCartRef = useRef(null);

  const handleSelectCart = (item) => {
    bottomSheetCartRef.current.open();
    setSelectCart(item);
  };

  const setRefBottomSheetCart = (ref) => {
    bottomSheetCartRef.current = ref;
  };

  const handleRemoveCart = () => {
    remove(selectCart);
    bottomSheetCartRef.current.close();
  };

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
                <TouchableOpacity onPress={handleSelectCart}>
                  <ItemCartWrapper>
                    <RadioButton value={item} />
                    <ContainerCartInfo>
                      <CartInfo restaurant={item} />
                    </ContainerCartInfo>
                  </ItemCartWrapper>
                </TouchableOpacity>
              </Card>
            </RadioButton.Group>
          </Spacer>
        )}
      />
      <BottomSheetCart
        setRef={setRefBottomSheetCart}
        removeCart={handleRemoveCart}
      />
    </SafeArea>
  );
};
