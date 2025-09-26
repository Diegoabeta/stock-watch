import { theme } from "@/src/styles/theme";
import styled from "styled-components/native";

export const MainScreenContainer = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
  padding: 10px;
`;

export const Title = styled.Text`
  font-size: ${theme.fontSize.xl};
  font-weight: bold;
  color: ${theme.colors.textPrimary};
  align-self: center;
`;
