import React from "react";
import { TouchableOpacity } from "react-native";
import { Card, IconButton } from "react-native-paper";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import {
  CardViewContainer,
  CardImage,
  CardViewInfo,
  CardViewWrapper,
} from "./cart-info.styles";

export const CartInfo = ({ restaurant, remove }) => {
  return (
    <Card>
      <CardViewContainer>
        <CardViewWrapper>
          <TouchableOpacity activeOpacity={0.6}>
            <CardImage
              source={{
                uri: restaurant.photos[0],
              }}
            />
          </TouchableOpacity>
          <Spacer position="left" size="medium">
            <CardViewInfo>
              <Text variant="label">{restaurant.name}</Text>
              <Text variant="caption">12.99$</Text>
            </CardViewInfo>
          </Spacer>
        </CardViewWrapper>
        <IconButton
          icon="delete"
          color="red"
          onPress={() => remove(restaurant)}
        />
      </CardViewContainer>
    </Card>
  );
};
