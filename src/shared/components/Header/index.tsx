import theme from "@/shared/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { s } from "./styles";

type HeaderProps = {
  title: string;
  onBack: () => void;
};

export const Header: React.FC<HeaderProps> = ({ title, onBack }) => {
  return (
    <View style={s.header}>
      <TouchableOpacity onPress={onBack} style={s.headerButton}>
        <Ionicons
          name="arrow-back"
          size={22}
          color={theme.colors.backgroundInput}
        />
        <Text style={s.headerTitle}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};
