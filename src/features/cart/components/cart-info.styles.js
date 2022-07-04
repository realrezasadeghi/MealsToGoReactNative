import { Image, View } from "react-native";
import { IconButton } from "react-native-paper";
import styled from "styled-components/native";

export const CardViewContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  padding: ${(props) => props.theme.space[3]};
`;

export const CardImage = styled(Image)`
  width: 80px;
  height: 80px;
  border-radius: 50px;
`;

export const CardViewInfo = styled(View)`
  justify-content: space-evenly;
  flex: 1;
  padding: ${(props) => props.theme.space[1]};
`;
