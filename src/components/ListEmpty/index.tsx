import React from "react";
import { Text, View } from "react-native";
import { s } from "./styles";

interface ListEmptyProps {
  emptySearch?: boolean;
}

export function ListEmpty({ emptySearch = false }: ListEmptyProps) {
  const title = "Nada por aqui...";
  const description = emptySearch
    ? "Nenhum resultado encontrado para sua busca."
    : "Comece criando sua primeira tarefa!";

  return (
    <View style={s.container}>
      <Text style={s.title}>{title}</Text>
      <Text style={s.subtitle}>{description}</Text>
    </View>
  );
}
