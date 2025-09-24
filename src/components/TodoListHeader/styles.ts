import theme from "@/theme";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 25,
  },
  title: {
    fontFamily: theme.fonts.interBold_700,
    color: theme.colors.white,
    fontSize: 18,
  },
  itemCount: {
    fontFamily: theme.fonts.interRegular_400,
    color: theme.colors.gray[500],
    fontSize: 16,
  },
});
