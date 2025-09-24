import theme from "@/theme";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    backgroundColor: theme.colors.gray[50],
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: theme.colors.secondary,
  },
  contain: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    color: theme.colors.gray[700],
    flexShrink: 1,
  },
});
