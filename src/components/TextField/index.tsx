import { theme } from "@/src/styles/theme";
import { TextInput, TextInputProps } from "react-native-paper";

export const TextField: React.FC<TextInputProps> = ({ label, error, value, ...rest }) => {
  return (
    <TextInput
      {...rest}
      value={value}
      label={label}
      style={{ fontSize: 14 }}
      textColor={theme.colors.textPrimary}
      mode="outlined"
      outlineStyle={{ borderWidth: 1 }}
      theme={{
        roundness: 12,
        colors: {
          background: theme.colors.background,
          primary: theme.colors.primary,
          outline: error ? theme.colors.error : theme.colors.primary,
        },
      }}
    />
  );
};
