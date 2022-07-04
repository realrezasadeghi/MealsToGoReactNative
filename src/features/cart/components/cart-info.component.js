import React from "react";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { CardViewContainer, CardImage, CardViewInfo } from "./cart-info.styles";

export const CartInfo = ({ restaurant }) => {
  return (
    <CardViewContainer>
      <CardImage source={{uri: restaurant.photos[0]}}/>
      <Spacer position="left" size="medium">
        <CardViewInfo>
          <Text variant="label">{restaurant.name}</Text>
          <Text variant="caption">12.99$</Text>
        </CardViewInfo>
      </Spacer>
    </CardViewContainer>
  );
};
