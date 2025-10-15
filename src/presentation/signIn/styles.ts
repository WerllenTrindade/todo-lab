import theme from "@/shared/theme";
import { Dimensions, StyleSheet } from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundLogo,
  },
  imageContainer: {
    backgroundColor: theme.colors.primary,
    height: SCREEN_HEIGHT * 0.5,
    width: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  formWrapper: {
    flexGrow: 1,
    justifyContent: "flex-start",
  },
  formContainer: {
    flex: 1,
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    gap: 40,
    shadowColor: theme.colors.white,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  inputs: {
    gap: 12,
  },
  buttons: {
    gap: 12,
  },
  forgotPasswordText: {
    color: theme.colors.gray[600],
    textAlign: "right",
    fontFamily: theme.fonts.interRegular_400,
  },
  registerText: {
    color: theme.colors.gray[600],
    textAlign: "center",
    fontFamily: theme.fonts.interRegular_400,
  },
  registerHighlight: {
    color: theme.colors.backgroundLogo + 100,
    fontFamily: theme.fonts.interSemiBold_600,
  },
});
