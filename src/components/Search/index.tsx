import theme from "@/theme";
import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { StyleSheet, TextInput, TextInputProps, View, ViewStyle } from "react-native";

interface SearchProps extends TextInputProps {
  icon?: React.ReactNode;
  containerStyle?: ViewStyle;
}

export function Search({ icon, containerStyle, style, ...rest }: SearchProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {icon ?? <Feather name="search" size={20} color={theme.colors.white} style={styles.icon} />}

      <TextInput
        {...rest}
        style={[styles.input, style]}
        placeholderTextColor={theme.colors.white}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.darkGray,
    borderRadius: 10,
    backgroundColor: theme.colors.darkGray,
    paddingHorizontal: 10,
    height: 52,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.white,
  },
});
