import theme from "@/theme";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  titleHeader: {
    color: theme.colors.white, 
    fontFamily: theme.fonts.interSemiBold_600, 
    fontSize: 25, 
    letterSpacing: 0.5
  },
  title: {
    fontFamily: theme.fonts. interRegular_400,
    fontSize: 22,
    letterSpacing: 0.5  ,
    color: theme.colors.white,
    marginBottom: 20,
    marginTop: 30
  }
});
