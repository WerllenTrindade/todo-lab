import theme from "@/shared/theme";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
       header: {
    marginBottom: 32,
  },
    headerButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.colors.backgroundInput,
  },
})