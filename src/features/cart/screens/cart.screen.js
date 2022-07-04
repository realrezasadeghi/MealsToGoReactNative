import { useContext, useRef, useState } from "react";
import { FlatList, ToastAndroid, TouchableOpacity, View } from "react-native";
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
  const [selectCart, setSelectCart] = useState({});
  const bottomSheetCartRef = useRef(null);

  const handleSelectCart = (item) => {
    setSelectCart(item);
    bottomSheetCartRef.current.open();
  };

  const setRefBottomSheetCart = (ref) => {
    bottomSheetCartRef.current = ref;
  };

  const handleRemoveCart = () => {
    remove(selectCart);
    bottomSheetCartRef.current.close();
  };

  const handlePaymentCart = () => {
    ToastAndroid.show(
      `${selectCart.name} successfully payment`,
      ToastAndroid.SHORT
    );
    handleRemoveCart();
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
                <TouchableOpacity onPress={() => handleSelectCart(item)}>
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
        paymentCart={handlePaymentCart}
      />
    </SafeArea>
  );
};
