import theme from "@/shared/theme";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.cardBackground,
    padding: 15,
    gap: 8,
    borderRadius: 10,
    borderColor: theme.colors.borderGray,
    borderWidth: 1,
  },
  title: {
    fontSize: 18,
    color: theme.colors.textPrimary,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    opacity: 0.8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
    flexWrap: "wrap",
  },
  message: {
    fontFamily: theme.fonts.interLight_300,
    fontSize: 14,
    color: theme.colors.textPrimary,
    opacity: 0.6,
    flex: 1,
  },
  percentage: {
    fontFamily: theme.fonts.interRegular_400,
    fontSize: 18,
    color: theme.colors.gray[700],
  },
progressBackground: {
  width: "100%",
  height: 18,
  backgroundColor: theme.colors.borderGray,
  borderRadius: 20,
  overflow: "hidden",
},
progressFill: {
  height: "100%",
  backgroundColor: theme.colors.buttonPrimary,
  borderRadius: 20,
},
});
