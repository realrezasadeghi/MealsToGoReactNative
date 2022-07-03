import styled from "styled-components";
import { Card } from "react-native-paper";
import { View, Text, Image } from "react-native";

const RestaurantCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.ui.quaternary};
`;

const RestaurantCardCover = styled(Card.Cover)`
  background-color: white;
  padding: ${(props) => props.theme.space[3]};
`;

const Info = styled(View)`
  padding: ${(props) => props.theme.space[3]};
`;

const Title = styled(View)`
  text-transform: capitalize;
  font-family: ${(props) => props.theme.fonts.heading};
`;

const Section = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const SectionEnd = styled(View)`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;

const Rating = styled(View)`
  padding: ${(props) => props.theme.space[2]} 0px;
  flex-direction: row;
`;

const Icon = styled(Image)`
  width: 15px;
  height: 15px;
`;

const Address = styled(Text)`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.caption};
`;

export {
  RestaurantCard,
  RestaurantCardCover,
  Address,
  Icon,
  Info,
  Rating,
  Section,
  SectionEnd,
  Title,
};
