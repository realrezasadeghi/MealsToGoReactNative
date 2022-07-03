import { ImageBackground, View } from "react-native";
import styled from "styled-components/native";
import { Button, TextInput } from "react-native-paper";

import { colors } from "../../../infrastructure/theme/colors";

export const AccountBackground = styled(ImageBackground).attrs({
  source: require("../../../../assets/home.jpg"),
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #ddd;
`;

export const AccountCover = styled(View)`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.1);
`;

export const AccountContainer = styled(View)`
  background-color: rgba(255, 255, 255, 0.8);
  padding: ${(props) => props.theme.space[4]};
  margin-top: ${(props) => props.theme.space[2]};
  border-radius: 3px;
`;

export const AuthButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
  padding: ${(props) => props.theme.space[2]};
`;

export const AuthInput = styled(TextInput)`
  width: 300px;
`;
export const AnimationWrapper = styled(View)`
  width: 100%;
  height: 200px;
  position: absolute;
  top: 15%;
  padding: ${(props) => props.theme.space[2]};
`;

export const ErrorContainer = styled.View`
  max-width: 300px;
  align-items: center;
  align-self: center;
  margin-top: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[2]};
`;
