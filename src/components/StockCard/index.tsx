import { useQuote } from "@/src/hooks/useQuote";
import { View } from "react-native";
import { Change, Price, StyledCard, Symbol } from "./styles";

interface IProps {
  symbol: string;
}

export const StockCard: React.FC<IProps> = ({ symbol }) => {
  const { data: quote, isLoading } = useQuote(symbol);

  const changePercent = quote?.pc ? ((quote.c - quote.pc) / quote.pc) * 100 : 0;

  return (
    <StyledCard>
      <View>
        <Symbol>{symbol}</Symbol>
        <Price>{isLoading ? "..." : `$${quote?.c ?? "no price available"}`}</Price>
      </View>
      <Change up={changePercent >= 0}>{isLoading ? "..." : `${changePercent.toFixed(2)}%`}</Change>
    </StyledCard>
  );
};
