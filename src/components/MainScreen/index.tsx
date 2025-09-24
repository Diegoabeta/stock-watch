import React from "react";
import { SafeAreaViewProps } from "react-native-safe-area-context";
import { MainScreenContainer, Title } from "./styles";

interface IProps extends SafeAreaViewProps {
  title: string;
}

export const MainScreen: React.FC<IProps> = ({ children, title, ...rest }) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);
  return (
    <MainScreenContainer {...rest}>
      <Title accessibilityRole="header">{title}</Title>
      {children}
    </MainScreenContainer>
  );
};
