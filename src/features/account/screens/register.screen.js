import { useContext, useState } from "react";
import {
  AccountBackground,
  AccountContainer,
  AccountCover,
  AuthInput,
  AuthButton,
  ErrorContainer,
} from "../components/account.style";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";

export const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const { onRegister, error } = useContext(AuthenticationContext);
  return (
    <AccountBackground>
      <AccountCover />
      <Text variant="body">Meals To Go</Text>
      <AccountContainer>
        <AuthInput
          label="E-mail"
          value={email}
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(val) => setEmail(val)}
        />
        <Spacer size="large">
          <AuthInput
            label="Password"
            value={password}
            textContentType="password"
            autoCapitalize="none"
            secure
            secureTextEntry
            onChangeText={(val) => setPassword(val)}
          />
        </Spacer>
        <Spacer size="large">
          <AuthInput
            label="Repeat Password"
            value={repeatPassword}
            textContentType="password"
            autoCapitalize="none"
            secure
            secureTextEntry
            onChangeText={(val) => setRepeatPassword(val)}
          />
        </Spacer>
        {error && (
          <Spacer size="large">
            <ErrorContainer>
              <Text variant="error">{error}</Text>
            </ErrorContainer>
          </Spacer>
        )}
        <Spacer size="large">
          <AuthButton
            icon="lock-open-outline"
            mode="contained"
            onPress={() => onRegister(email, password, repeatPassword)}
          >
            Register
          </AuthButton>
        </Spacer>
      </AccountContainer>
      <Spacer size="large">
        <AuthButton
          mode="contained"
          onPress={() => navigation.navigate("Main")}
        >
          Back
        </AuthButton>
      </Spacer>
    </AccountBackground>
  );
};
