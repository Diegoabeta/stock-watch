const FINNHUB_BASE = "https://finnhub.io/api/v1";
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

interface IStockSymbolResponse {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
}

interface IQuoteResponse {
  c: number;
  h: number;
  l: number;
  o: number;
  pc: number;
  t: number;
}

// May use in the future for a search list feature
export const getAllSymbols = async (exchange: string) => {
  const res = await fetch(`${FINNHUB_BASE}/stock/symbol?exchange=${exchange}&token=${API_KEY}`);
  if (!res.ok) throw new Error("Failed to load symbols");
  return (await res.json()) as Array<IStockSymbolResponse>;
};

export const getQuote = async (symbol: string) => {
  const res = await fetch(`${FINNHUB_BASE}/quote?symbol=${encodeURIComponent(symbol)}&token=${API_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch quote");
  return (await res.json()) as IQuoteResponse;
};
