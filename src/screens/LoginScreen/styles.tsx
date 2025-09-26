import { MainScreen } from "@/src/components/MainScreen";
import { theme } from "@/src/styles/theme";
import styled from "styled-components/native";

export const ContentContainer = styled(MainScreen)`
  align-items: center;
`;
export const LogoImage = styled.Image`
  width: 500px;
  height: 500px;
  margin-bottom: -90px;
`;

export const WelcomeText = styled.Text`
  font-size: 20px;
  margin-bottom: 22px;
  color: ${theme.colors.textPrimary};
`;
