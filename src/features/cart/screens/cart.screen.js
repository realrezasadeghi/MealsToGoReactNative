import { useContext } from "react";
import { FlatList } from "react-native";
import { Button } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { SafeArea } from "../../../components/safe-area/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { CartContext } from "../../../services/cart/cart.context";
import { CartInfo } from "../components/cart-info.component";

const PaymentButton = styled(Button)`
  width: 80%;
  height: 50px;
`;

export const CartScreen = () => {
  const { cart, remove } = useContext(CartContext);
  return (
    <SafeArea>
      <FlatList
        data={cart}
        contentContainerStyle={{ padding: 10 }}
        renderItem={({ item }) => (
          <Spacer position="bottom" size="medium">
            <CartInfo restaurant={item} remove={remove} />
          </Spacer>
        )}
      />
      <Button mode="container" style={{ width: 200 }}>
        <MaterialIcons name="payment" size={24} color="black" />
        Payment
      </Button>
    </SafeArea>
  );
};
