import { ActivityIndicator } from "react-native-paper";
import { LoadingScreenContainer } from "./styles";

export const LoadingScreen: React.FC = () => {
  return (
    <LoadingScreenContainer>
      <ActivityIndicator size="large" />
    </LoadingScreenContainer>
  );
};
