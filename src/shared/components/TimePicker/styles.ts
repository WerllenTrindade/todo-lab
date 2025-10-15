import theme from "@/shared/theme";
import { Platform, StyleSheet } from "react-native";

export const s = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    paddingBottom: 7,
    fontFamily: theme.fonts.interRegular_400,
    fontSize: Platform.OS === 'android' ? 18 : 22,
    letterSpacing: 0.5,
    color: theme.colors.textPrimary,

  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: theme.colors.borderGray,
    backgroundColor: theme.colors.cardBackground,
    borderRadius: 8,
  },
  text: {
    marginLeft: 10,
    fontSize: 18,
    fontFamily: theme.fonts.interRegular_400,
    color: theme.colors.white + "80",
  },
});
