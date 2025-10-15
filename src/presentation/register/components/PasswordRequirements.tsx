import React from "react";
import { Text, View } from "react-native";


const requisitosSenha = [
  { label: "Pelo menos uma letra minúscula", regex: /[a-z]/ },
  { label: "Pelo menos uma letra maiúscula", regex: /[A-Z]/ },
  { label: "Pelo menos um número", regex: /\d/ },
  { label: "Entre 8 e 20 caracteres", regex: /^.{8,20}$/ },
];

export const PasswordRequirements = () => {

  return (
    <View style={{ paddingBottom: 10, gap: 12 }}>
      {requisitosSenha.map(item => {
        const passed = false
        return (
          <View key={item.label} style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>

            <Text style={{ color: passed ? "green" : "#AAA", fontWeight: passed ? "bold" : "normal" }}>
              {item.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
};
