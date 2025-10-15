import theme from "@/shared/theme";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginBottom: 32,
    backgroundColor: theme.colors.darkGray
  },
  title: {
    paddingTop: 16,
    paddingBottom: 12,
    fontFamily: theme.fonts.interSemiBold_600,
    color: theme.colors.gray[900],
    fontSize: 18,
  },
  listContent: {
    gap: 12,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.white,
    borderRadius: 8,
    margin: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  itemTextContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  itemParcelas: {
    fontFamily: theme.fonts.interMedium_500,
    fontSize: 14,
    textTransform: "capitalize",
    color: theme.colors.black,
  },
  itemValor: {
    fontFamily: theme.fonts.interRegular_400,
    fontSize: 12,
    color: theme.colors.gray[600],
  },
});
