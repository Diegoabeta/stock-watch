import { useLiveQuotes } from "@/src/contexts/liveQuotes";
import { useWatchlistContext } from "@/src/contexts/watchlist";
import { theme } from "@/src/styles/theme";
import Entypo from "@expo/vector-icons/Entypo";
import { Dimensions } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { ChartContainer, EmptyStateText, IconContainer } from "./styles";

const screenWidth = Dimensions.get("window").width;

export const WatchlistChart: React.FC = () => {
  const { watchlist } = useWatchlistContext();
  const { quotes, isLoading } = useLiveQuotes();

  const chartData = watchlist.map((stock) => {
    const quote = quotes[stock.symbol];
    const percentChange = quote?.pc ? Math.round(((quote.c - quote.pc) / quote.pc) * 100) : 0;
    return {
      value: percentChange,
      label: stock.symbol,
      frontColor: percentChange >= 0 ? theme.colors.success : theme.colors.error,
    };
  });

  if (!watchlist.length) {
    return (
      <>
        <IconContainer>
          <Entypo name="bar-graph" size={90} color={theme.colors.primary} />
        </IconContainer>
        <EmptyStateText>Add stocks to watchlist to compare their performance</EmptyStateText>
      </>
    );
  }

  return (
    <ChartContainer>
      {isLoading && <EmptyStateText>Loading...</EmptyStateText>}
      <BarChart
        data={chartData}
        barWidth={30}
        isAnimated
        spacing={18}
        yAxisLabelSuffix="%"
        yAxisTextStyle={{ color: theme.colors.textSecondary, fontSize: 12 }}
        xAxisLabelTextStyle={{ color: theme.colors.textPrimary, fontSize: 10, marginTop: 0 }}
        mostNegativeValue={-10}
        noOfSections={10}
        maxValue={10}
        yAxisColor={theme.colors.textSecondary}
        xAxisColor={theme.colors.textSecondary}
        barBorderTopLeftRadius={4}
        barBorderTopRightRadius={4}
        rulesThickness={1}
        dashGap={10}
        width={screenWidth - 80}
        rulesColor={theme.colors.textSecondary}
        showFractionalValues={false}
      />
    </ChartContainer>
  );
};
