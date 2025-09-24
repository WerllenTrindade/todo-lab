import theme from "@/theme";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10, 
  },
  input: {
    flex: 1,
    borderRadius: 8,
    color: theme.colors.primary,
    paddingHorizontal: 16,
    height: 45,
    backgroundColor: theme.colors.white,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 8,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    width: 45,
  },
});
