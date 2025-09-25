import { useQuery } from "@tanstack/react-query";
import { getQuote } from "../api/finnhub";

export const useQuote = (symbol: string) => {
  return useQuery({
    queryKey: ["quote", symbol],
    queryFn: () => getQuote(symbol),
    enabled: !!symbol,
    refetchInterval: 10_000,
  });
};
