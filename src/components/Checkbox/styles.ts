import theme from "@/theme";
import { StyleSheet } from "react-native";

const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  text: {
    fontFamily: theme.fonts.interRegular_400,
    fontSize: 14,
    color: theme.colors.gray[800],
  },
  button: {
    height: 18,
    width: 18,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    borderColor: theme.colors.gray[800],
    borderWidth: 1,
    backgroundColor: "#FFF",
  },
});

export default s;
