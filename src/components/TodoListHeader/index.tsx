// src/components/TodoListHeader/TodoListHeader.tsx
import theme from "@/theme";
import { Text, View } from "react-native";

type Props = {
  itemCount: number;
};

export function TodoListHeader({ itemCount }: Props) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 25,
      }}
    >
      <Text
        style={{
          fontFamily: theme.fonts.interBold_700,
          color: theme.colors.white,
          fontSize: 18,
        }}
      >
        Lista
      </Text>
      <Text
        style={{
          fontFamily: theme.fonts.interRegular_400,
          color: theme.colors.gray[500],
          fontSize: 16,
        }}
      >
        {itemCount} Items
      </Text>
    </View>
  );
}
