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
      activeOpacity={0.7}
      style={[
        s.container,
        {
          backgroundColor: "#C59ADF",
          width: 60,
          height: 60,
          borderRadius: 60 / 2,
        },
        style,
      ]}
      {...rest}
    >
      <AntDesign name="plus" size={24} color={"#292D32"} />
    </TouchableOpacity>
  );
}
