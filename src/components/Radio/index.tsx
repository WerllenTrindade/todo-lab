import theme from "@/theme";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

interface RadioProps {
  selected: boolean;
  onPress: () => void;
  size?: number;
}

export function Radio({ selected, onPress, size = 26 }: RadioProps) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, 
    {backgroundColor: selected ? theme.colors.radio : theme.colors.darCard},
    { width: size, height: size }]}>
      {selected && (
        <MaterialIcons name="check" size={size * 0.7} color={theme.colors.darCard}/>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: theme.colors.radio,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
