import theme from "@/theme";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  container: {
    backgroundColor: "#181818",
    borderRadius: 8,
    padding: 15,
    gap: 8,
  },
  title: {
    fontSize: 18,
    color: theme.colors.white,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.white,
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
    color: theme.colors.white,
    opacity: 0.6,
    flex: 1,
  },
  percentage: {
    fontFamily: theme.fonts.interRegular_400,
    fontSize: 18,
    color: theme.colors.white,
  },

  // ===== Barra de progresso =====
  progressBackground: {
    width: "100%",
    height: 18,
    backgroundColor: "#BA83DE41",
    borderRadius: 20,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#BA83DE",
    borderRadius: 20,
  },
});
