import { DropdownInputProps } from "react-native-paper-dropdown";
import { TextField } from "../TextField";

export const CustomDropdownInput: React.FC<DropdownInputProps> = ({
  placeholder,
  selectedLabel,
  rightIcon,
  error,
  ...rest
}) => {
  return <TextField label={placeholder} value={selectedLabel} right={rightIcon} error={error} {...rest} />;
};
