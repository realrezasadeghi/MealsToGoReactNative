import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import styled from "styled-components/native";
import RBSheet from "react-native-raw-bottom-sheet";
import { Spacer } from "../../../components/spacer/spacer.component";

const BottomSheetContainer = styled(ScrollView)`
  padding: ${(props) => props.theme.space[2]};
`;

export const BottomSheetCart = ({ setRef, removeCart, paymentCart }) => {
  const [total, setTotal] = useState(12.99);
  const [count, setCount] = useState("1");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (count >= 1) {
      setTotal(parseInt(count) * 12.99);
      setError(null);
    } else {
      setTotal(12.99);
      setError("The number cannot be less than one");
    }
  }, [count]);

  return (
    <RBSheet ref={setRef} height={200} animationType="slide">
      <BottomSheetContainer>
        <TextInput
          mode="outlined"
          label="Count"
          value={count}
          keyboardType="number-pad"
          onChangeText={(val) => setCount(val)}
        />
        {error && <HelperText type="error">{error}</HelperText>}
        <Spacer position="top" size="medium">
          <Button mode="contained" disabled={error} onPress={paymentCart}>
            Payment {total}$
          </Button>
        </Spacer>
        <Spacer position="top" size="medium">
          <Button mode="contained" color="red" onPress={removeCart}>
            Delete Restaurant
          </Button>
        </Spacer>
      </BottomSheetContainer>
    </RBSheet>
  );
};
