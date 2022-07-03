import Lottie from "lottie-react-native";

import {
  AccountBackground,
  AccountContainer,
  AccountCover,
  AnimationWrapper,
  AuthButton,
} from "../components/account.style";

import { Spacer } from "../../../components/spacer/spacer.component";

export const AccountScreen = ({ navigation }) => {
  return (
    <AccountBackground>
      <AccountCover />
      <AnimationWrapper>
        <Lottie
          key="watermelon"
          source={require("../../../../assets/watermelon.json")}
          resizeMode="cover"
          autoPlay
          loop
        />
      </AnimationWrapper>
      <AccountContainer>
        <AuthButton
          mode="contained"
          icon="lock-open-outline"
          onPress={() => navigation.navigate("Login")}
        >
          Login
        </AuthButton>
        <Spacer size="large">
          <AuthButton
            mode="contained"
            icon="lock-open-outline"
            onPress={() => navigation.navigate("Register")}
          >
            Register
          </AuthButton>
        </Spacer>
      </AccountContainer>
    </AccountBackground>
  );
};
