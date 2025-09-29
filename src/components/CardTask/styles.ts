import theme from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderLeftWidth: 15,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: theme.colors.darCard,
    height: 80,
    alignItems: "center",
    paddingHorizontal: 11,
  },
  content: {
    flex: 1,
    gap: 5,
  },
  title: {
    color: theme.colors.white,
    fontFamily: theme.fonts.interRegular_400,
    fontSize: 16,
  },
  dateWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  date: {
    color: theme.colors.white + 80,
    fontFamily: theme.fonts.interRegular_400,
    fontSize: 14,
  },
});
