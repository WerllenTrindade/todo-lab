import theme from "@/theme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { s } from "./styles";

interface TodoItemProps extends TouchableOpacityProps {
  title: string;
  removeItem: () => void;
}

export function TodoItem({ title, removeItem, ...rest }: TodoItemProps) {
  return (
    <TouchableOpacity activeOpacity={0.7} {...rest} style={s.container}>
      <View style={s.contain}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={s.title}>
          {title}
        </Text>
      </View>
      <TouchableOpacity testID="label-button" onPress={removeItem}>
        <FontAwesome name="trash-o" size={24} color={theme.colors.primary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
