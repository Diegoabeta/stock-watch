import { CustomDropdownInput } from "@/src/components/CustomDropdownInput";
import { MainScreen } from "@/src/components/MainScreen";
import { TextField } from "@/src/components/TextField";
import { TopSymbols } from "@/src/constants/topSymbols";
import { IStock, useWatchlistContext } from "@/src/contexts/watchlist";
import { useQuote } from "@/src/hooks/useQuote";
import { theme } from "@/src/styles/theme";
import { validatePriceAlert } from "@/src/utils/validation";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Text } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";
import { ContentContainer, FormContainer, IconContainer } from "./styles";

export const AddAlertScreen: React.FC = () => {
  const [selectedStock, setSelectedStock] = useState<string>();
  const { data: quote, isLoading: quoteLoading } = useQuote(selectedStock || "");
  const [price, setPrice] = useState("");
  const [priceError, setPriceError] = useState<string | null>(null);
  const { addStock } = useWatchlistContext();

  // TODO: add push notification logic
  const handleSubmit = async () => {
    if (!selectedStock || !quote) return;

    const stock: IStock = {
      symbol: selectedStock,
      name: selectedStock,
      price: quote.c,
    };
    await addStock(stock);
    setPrice("");
    setSelectedStock(undefined);
  };

  const handlePriceChange = (value: string) => {
    setPrice(value);
    const error = validatePriceAlert(value, quote?.c ?? 0);
    setPriceError(error);
  };

  return (
    <MainScreen title="Add Alert">
      <ContentContainer>
        <IconContainer>
          <Ionicons name="alert-circle-outline" size={90} color={theme.colors.primary} />
        </IconContainer>
        <FormContainer>
          <Dropdown
            label="Select Stock"
            options={TopSymbols}
            value={selectedStock}
            onSelect={setSelectedStock}
            mode="outlined"
            CustomDropdownInput={CustomDropdownInput}
          />
          <TextField
            label="Current Price"
            value={quoteLoading ? "Loading..." : quote ? `${quote.c}` : "-"}
            editable={false}
            right={
              <TextInput.Icon icon={() => <FontAwesome name="dollar" size={16} color={theme.colors.textSecondary} />} />
            }
          />
          <TextField
            label="Price Alert"
            keyboardType="numeric"
            value={price}
            editable={!quoteLoading && !!selectedStock}
            onChangeText={handlePriceChange}
            right={
              <TextInput.Icon
                icon={() => <FontAwesome6 name="comment-dollar" size={16} color={theme.colors.textSecondary} />}
              />
            }
          />
          {priceError && <Text style={{ color: theme.colors.error }}>{priceError}</Text>}
          <Button
            mode="contained"
            buttonColor={theme.colors.primary}
            onPress={handleSubmit}
            textColor={theme.colors.textPrimary}
            disabled={!selectedStock || !price || !!priceError}
            style={{ borderRadius: 12, padding: 6 }}
          >
            Add Alert
          </Button>
        </FormContainer>
      </ContentContainer>
    </MainScreen>
  );
};
