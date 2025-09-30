import theme from "@/theme";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { s } from "./styles";

interface RadioProps extends TouchableOpacityProps {
  selected: boolean;
  onPress: () => void;
  size?: number;
}

export function Radio({ selected, onPress, size = 26, ...rest }: RadioProps) {
  return (
    <TouchableOpacity
      {...rest}
      testID='radio-button'
      onPress={onPress}
      style={[
        s.container,
        { backgroundColor: selected ? theme.colors.radio : theme.colors.darCard },
        { width: size, height: size },
      ]}
    >
      {selected && (
        <MaterialIcons
          testID="radio-check-icon"
          name="check"
          size={size * 0.7}
          color={theme.colors.darCard}
        />
      )}
    </TouchableOpacity>
  );
}
