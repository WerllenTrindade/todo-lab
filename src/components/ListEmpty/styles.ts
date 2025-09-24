import theme from "@/theme";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "50%",
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.gray[100],
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.gray[300],
  },
});
