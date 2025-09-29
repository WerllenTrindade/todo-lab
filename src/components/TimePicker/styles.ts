import theme from "@/theme";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    paddingBottom: 7,
    color: theme.colors.white + "80",
    fontSize: 20,
    fontFamily: theme.fonts.interRegular_400,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: theme.colors.backgroundInput,
    borderRadius: 8,
  },
  text: {
    marginLeft: 10,
    fontSize: 18,
    fontFamily: theme.fonts.interRegular_400,
    color: theme.colors.white + "80",
  },
});
