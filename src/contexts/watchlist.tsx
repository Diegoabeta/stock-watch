import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

export interface IStock {
  symbol: string;
  name: string;
  price: number;
}

interface IWatchlistContext {
  watchlist: IStock[];
  isLoading: boolean;
  addStock: (stock: IStock) => Promise<void>;
  removeStock: (symbol: string) => Promise<void>;
  clearWatchlist: () => Promise<void>;
}

const WATCHLIST_KEY = "watchlist";

const WatchlistContext = createContext<IWatchlistContext | null>(null);

export const useWatchlistContext = () => {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error("useWatchlistContext must be used within a WatchlistProvider");
  }
  return context;
};

export const WatchlistProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [watchlist, setWatchlist] = useState<IStock[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load watchlist on mount from AsyncStorage
  useEffect(() => {
    const loadWatchlist = async () => {
      try {
        const stored = await AsyncStorage.getItem(WATCHLIST_KEY);
        if (stored) setWatchlist(JSON.parse(stored));
      } catch (error) {
        console.log("Failed to load watchlist", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadWatchlist();
  }, []);

  // Save watchlist to AsyncStorage
  const saveWatchlist = async (list: IStock[]) => {
    try {
      await AsyncStorage.setItem(WATCHLIST_KEY, JSON.stringify(list));
    } catch (error) {
      console.log("Failed to save watchlist", error);
    }
  };

  const addStock = async (stock: IStock) => {
    setWatchlist((prev) => {
      if (prev.find((s) => s.symbol === stock.symbol)) return prev;
      const updated = [...prev, stock];
      saveWatchlist(updated);
      return updated;
    });
  };

  const removeStock = async (symbol: string) => {
    setWatchlist((prev) => {
      const updated = prev.filter((s) => s.symbol !== symbol);
      saveWatchlist(updated);
      return updated;
    });
  };

  const clearWatchlist = async () => {
    setWatchlist([]);
    try {
      await AsyncStorage.removeItem(WATCHLIST_KEY);
    } catch (error) {
      console.log("Failed to clear watchlist", error);
    }
  };

  return (
    <WatchlistContext value={{ watchlist, isLoading, addStock, removeStock, clearWatchlist }}>
      {children}
    </WatchlistContext>
  );
};
