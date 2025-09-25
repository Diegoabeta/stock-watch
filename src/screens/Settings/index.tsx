import { MainScreen } from "@/src/components/MainScreen";
import { useAuthContext } from "@/src/contexts/auth";
import { theme } from "@/src/styles/theme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Button } from "react-native-paper";
import { IconContainer, LogoutText } from "./styles";

export const SettingsScreen: React.FC = () => {
  const { user, logout } = useAuthContext();

  return (
    <MainScreen title={"Settings"}>
      <IconContainer>
        <FontAwesome name="gears" size={90} color={theme.colors.primary} />
      </IconContainer>
      {!!user && <LogoutText>{`Logged in as ${user.name}`}</LogoutText>}
      <Button mode="contained" buttonColor={theme.colors.primary} onPress={logout}>
        Logout
      </Button>
    </MainScreen>
  );
};
