import { theme } from "@/src/styles/theme";
import styled from "styled-components/native";

export const StyledCard = styled.View`
  padding: 12px;
  flex-direction: row;
  margin-bottom: 12px;
  border-radius: 12px;
  background-color: ${theme.colors.surface};
  height: 80px;
  justify-content: space-between;
  align-items: center;
`;

export const Symbol = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: ${theme.colors.textPrimary};
`;

export const Price = styled.Text`
  font-size: 16px;
  color: ${theme.colors.textSecondary};
`;

export const Change = styled.Text<{ up: boolean }>`
  font-size: 14px;
  color: ${(props) => (props.up ? theme.colors.textGreen : theme.colors.textRed)};
  background-color: ${(props) => (props.up ? "#22c55e33" : "#ef444433")};
  padding: 4px 10px;
  border-radius: 16px;
  font-weight: bold;
  min-width: 20%;
  text-align: center;
`;
