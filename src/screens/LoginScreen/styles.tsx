import { theme } from "@/src/styles/theme";
import styled from "styled-components/native";

export const ContentContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.background};
`;

export const WelcomeText = styled.Text`
  font-size: 24px;
  margin-bottom: 24px;
  color: ${theme.colors.textPrimary};
`;
