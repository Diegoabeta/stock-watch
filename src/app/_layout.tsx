import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { AuthProvider, useAuthContext } from "../contexts/auth";
import { SplashScreenController } from "../screens/Splash";

export default function RootLayout() {
  return (
    <AuthProvider>
      <SplashScreenController />
      <InnerLayout />
    </AuthProvider>
  );
}

function InnerLayout() {
  const { accessToken, isLoading } = useAuthContext();

  if (isLoading) {
    return null;
  }

  return (
    <PaperProvider>
      <Stack>
        <Stack.Protected guard={!!accessToken}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={!accessToken}>
          <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
    </PaperProvider>
  );
}
