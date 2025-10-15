import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  container: {
    padding: 4,
  },
  track: {
    width: 54,
    height: 27,
    borderRadius: 20,
    justifyContent: "center",
    padding: 2,
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
});
