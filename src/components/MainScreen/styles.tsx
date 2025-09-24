import { theme } from "@/src/styles/theme";
import { SafeAreaView, SafeAreaViewProps } from "react-native-safe-area-context";
import styled from "styled-components/native";

export const MainScreenContainer: React.FC<SafeAreaViewProps> = styled(SafeAreaView)`
  flex: 1;
  background-color: ${theme.colors.background};
  padding: ${theme.spacing.sm};
`;

export const Title = styled.Text`
  font-size: ${theme.fontSize.xl};
  font-weight: bold;
  color: ${theme.colors.textPrimary};
  margin: 10px auto;
`;
