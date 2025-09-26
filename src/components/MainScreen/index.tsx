import { StyleSheet, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MainScreenContainer, Title } from "./styles";

interface IProps extends ViewProps {
  title?: string;
}

export const MainScreen: React.FC<IProps> = ({ children, title, style, ...rest }) => {
  const insets = useSafeAreaInsets();
  const styleWithPadding = StyleSheet.flatten([{ paddingTop: insets.top + 16 }, style]);

  return (
    <MainScreenContainer {...rest} style={styleWithPadding}>
      {title && <Title accessibilityRole="header">{title}</Title>}
      {children}
    </MainScreenContainer>
  );
};
