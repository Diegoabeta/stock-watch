import { SafeAreaViewProps } from "react-native-safe-area-context";
import { MainScreenContainer, Title } from "./styles";

interface IProps extends SafeAreaViewProps {
  title: string;
}

export const MainScreen: React.FC<IProps> = ({ children, title, ...rest }) => {
  return (
    <MainScreenContainer {...rest}>
      <Title accessibilityRole="header">{title}</Title>
      {children}
    </MainScreenContainer>
  );
};
