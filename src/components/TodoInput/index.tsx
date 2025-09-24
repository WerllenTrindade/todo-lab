import theme from "@/theme";
import Feather from "@expo/vector-icons/Feather";
import { TextInput, TouchableOpacity, View } from "react-native";
import { s } from "./styles";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  onAdd: () => void;
};

export function TodoInput({ value, onChangeText, onAdd }: Props) {
  return (
    <View style={s.container}>
      <TextInput
        placeholder="Busca por tasks"
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={theme.colors.gray[400]}
        style={s.input}
      />
      <TouchableOpacity onPress={onAdd} style={s.button}>
        <Feather name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
