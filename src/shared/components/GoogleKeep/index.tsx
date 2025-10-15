import theme from "@/shared/theme";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  TouchableOpacity,
  TouchableOpacityProps
} from "react-native";
import { s } from "./styles";

type GoogleKeepProps = TouchableOpacityProps & {};

export function GoogleKeep({ style, ...rest }: GoogleKeepProps) {
  return (
 <TouchableOpacity
  testID="google-keep-button"
  activeOpacity={0.7}
  style={[
    s.container,
    {
      backgroundColor: theme.colors.buttonPrimary,
      width: 60,
      height: 60,
      borderRadius: 60 / 2,
    },
    style,
  ]}
  {...rest}
>
  <AntDesign testID="google-keep-icon" name="plus" size={24} color={theme.colors.white} />
</TouchableOpacity>

  );
}
