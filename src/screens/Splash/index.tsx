import { useAuthContext } from "@/src/contexts/auth";
import { SplashScreen } from "expo-router";

export function SplashScreenController() {
  const { isLoading } = useAuthContext();

  if (!isLoading) {
    SplashScreen.hideAsync();
  }

  return null;
}
