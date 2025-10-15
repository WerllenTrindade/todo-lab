import theme from "@/shared/theme";
import { Dimensions, StyleSheet } from "react-native";

const { height } = Dimensions.get("window");

export const s = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
  },
  contain: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  indicator: {
    width: 80,
    height: 4,
    backgroundColor: "#C4D0DB",
  },
  img: {
    width: "100%",
    height: height / 5,
    objectFit: "contain",
    marginVertical: 15
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    color:'#AAA',
    fontWeight: "bold",
  },
  price: {
    fontSize: 25,
    color:'#AAA',
    fontWeight: "500",
  },
  price_old: {
    fontSize: 12,
    color: 'red',
    textDecorationLine: "line-through",
    fontWeight: "500",
  },
  quantity: {
    fontSize: 20,
    color:'#AAA',
    fontWeight: "500",
  },
});
