import { MainScreen } from "@/src/components/MainScreen";
import { StockCard } from "@/src/components/StockCard";
import { useWatchlistContext } from "@/src/contexts/watchlist";
import { theme } from "@/src/styles/theme";
import { FlatList } from "react-native";
import { Button } from "react-native-paper";
import { NoStocksText } from "./styles";

export const WatchlistScreen = () => {
  const { watchlist, clearWatchlist } = useWatchlistContext();

  return (
    <MainScreen title="My Watchlist">
      <FlatList
        data={watchlist}
        keyExtractor={(item) => item.symbol}
        renderItem={({ item }) => <StockCard symbol={item.symbol} />}
        contentContainerStyle={{ gap: 8, paddingBottom: 20 }}
        ListEmptyComponent={() => <NoStocksText>No stocks being watched</NoStocksText>}
      />
      {watchlist.length > 0 && (
        <Button
          mode="contained"
          buttonColor={theme.colors.surface}
          textColor={theme.colors.primary}
          onPress={clearWatchlist}
        >
          Clear Watchlist
        </Button>
      )}
    </MainScreen>
  );
};
