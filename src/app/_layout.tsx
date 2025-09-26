import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SplashScreen, Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { AuthProvider, useAuthContext } from "../contexts/auth";
import { LiveQuotesProvider } from "../contexts/liveQuotes";
import { WatchlistProvider } from "../contexts/watchlist";
import { LoadingScreen } from "../screens/Loading";
import { SplashScreenController } from "../screens/Splash";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <AuthProvider>
      <SplashScreenController />
      <QueryClientProvider client={queryClient}>
        <WatchlistProvider>
          <LiveQuotesProvider>
            <PaperProvider>
              <InnerLayout />
            </PaperProvider>
          </LiveQuotesProvider>
        </WatchlistProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

function InnerLayout() {
  const { accessToken, isLoading } = useAuthContext();

  if (isLoading) return <LoadingScreen />;

  return (
    <Stack>
      <Stack.Protected guard={!!accessToken}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={!accessToken}>
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}
