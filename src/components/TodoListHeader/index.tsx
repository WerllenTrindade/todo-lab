import { Text, View } from "react-native";
import { s } from "./styles";

type Props = {
  itemCount: number;
};

export function TodoListHeader({ itemCount }: Props) {
  return (
    <View style={s.container}>
      <Text style={s.title}>Lista</Text>
      <Text style={s.itemCount}>{itemCount} Items</Text>
    </View>
  );
}
