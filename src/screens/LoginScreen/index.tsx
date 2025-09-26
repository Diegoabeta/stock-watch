import { useAuthContext } from "@/src/contexts/auth";
import { theme } from "@/src/styles/theme";
import { Button } from "react-native-paper";
import { ContentContainer, LogoImage, WelcomeText } from "./styles";

export const LoginScreen: React.FC = () => {
  const { login } = useAuthContext();

  return (
    <ContentContainer>
      <LogoImage source={require("../../../assets/images/adaptive-icon.png")} />
      <WelcomeText>Welcome to Stock Watch</WelcomeText>
      <Button mode="contained" buttonColor={theme.colors.primary} onPress={login}>
        Log In
      </Button>
    </ContentContainer>
  );
};
