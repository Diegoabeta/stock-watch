import { createContext, PropsWithChildren, useContext, useEffect, useRef, useState } from "react";
import { getQuote } from "../api/finnhub";
import { useWatchlistContext } from "./watchlist";

interface IQuote {
  c: number;
  d?: number;
  dp?: number;
  h?: number;
  l?: number;
  o?: number;
  pc?: number;
  t: number;
  [key: string]: any;
}

interface ILiveQuotesContextValue {
  quotes: Record<string, IQuote>;
  isLoading: boolean;
}

const LiveQuotesContext = createContext<ILiveQuotesContextValue | null>(null);

export const useLiveQuotes = () => {
  const context = useContext(LiveQuotesContext);
  if (!context) throw new Error("useLiveQuotes must be used within LiveQuotesProvider");
  return context;
};

export const LiveQuotesProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { watchlist } = useWatchlistContext();
  const [quotes, setQuotes] = useState<Record<string, IQuote>>({});
  const [isLoading, setIsLoading] = useState(true);
  const ws = useRef<WebSocket | null>(null);
  const subscriptions = useRef<Set<string>>(new Set());

  console.log(quotes, "LIVE QUOTES");

  // Fetch initial quotes for all watchlist items
  useEffect(() => {
    const loadQuotes = async () => {
      if (!watchlist.length) {
        setIsLoading(false);
        return;
      }

      try {
        const results = await Promise.all(watchlist.map((s) => getQuote(s.symbol)));
        const initialQuotes: Record<string, IQuote> = {};
        watchlist.forEach((stock, idx) => {
          initialQuotes[stock.symbol] = results[idx];
        });

        setQuotes(initialQuotes);
      } catch (err) {
        console.error("Failed to load initial quotes", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadQuotes();
  }, [watchlist]);

  // WebSocket connection
  useEffect(() => {
    const socket = new WebSocket(`wss://ws.finnhub.io?token=${process.env.EXPO_PUBLIC_API_KEY}`);
    ws.current = socket;

    socket.onopen = () => {
      console.log("WS connected");
    };

    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === "trade" && msg.data) {
        setQuotes((prev) => {
          const updated = { ...prev };
          for (const trade of msg.data) {
            if (updated[trade.s]) {
              updated[trade.s] = { ...updated[trade.s], c: trade.p, t: trade.t };
            } else {
              updated[trade.s] = { c: trade.p, t: trade.t } as IQuote;
            }
          }
          return updated;
        });
      }
    };

    socket.onerror = (err) => console.error("WS error", err);
    socket.onclose = () => console.log("WS closed");

    return () => socket.close();
  }, []);

  // subscribe/unsubscribe when watchlist changes
  useEffect(() => {
    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) return;

    const currentSymbols = new Set(watchlist.map((s) => s.symbol));

    currentSymbols.forEach((symbol) => {
      if (!subscriptions.current.has(symbol)) {
        ws.current?.send(JSON.stringify({ type: "subscribe", symbol }));
        subscriptions.current.add(symbol);
      }
    });

    subscriptions.current.forEach((symbol) => {
      if (!currentSymbols.has(symbol)) {
        ws.current?.send(JSON.stringify({ type: "unsubscribe", symbol }));
        subscriptions.current.delete(symbol);
      }
    });
  }, [watchlist]);

  return <LiveQuotesContext value={{ quotes, isLoading }}>{children}</LiveQuotesContext>;
};
