import { SafeAreaView } from "react-native";
import styled from "styled-components";

const Safe = styled(SafeAreaView)`
  flex: 1;
`;

export const SafeArea = ({ children }) => <Safe>{children}</Safe>;
