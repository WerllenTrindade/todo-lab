import theme from "@/shared/theme";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: '#F5F7FA'
  },
  titleHeader: {
    color: theme.colors.textPrimary,
    fontFamily: theme.fonts.interSemiBold_600, 
    fontSize: 25, 
    letterSpacing: 0.5
  },
  title: {
    fontFamily: theme.fonts.interSemiBold_600,
    fontSize: 22,
    letterSpacing: 0.5,
    color: theme.colors.textPrimary,
    marginBottom: 10,
    marginTop: 20
  }
});
