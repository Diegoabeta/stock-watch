import { ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MainScreenContainer, Title } from "./styles";

interface IProps extends ViewProps {
  title?: string;
}

export const MainScreen: React.FC<IProps> = ({ children, title, ...rest }) => {
  const insets = useSafeAreaInsets();

  return (
    <MainScreenContainer {...rest} style={{ paddingTop: insets.top + 10 }}>
      {title && <Title accessibilityRole="header">{title}</Title>}
      {children}
    </MainScreenContainer>
  );
};
