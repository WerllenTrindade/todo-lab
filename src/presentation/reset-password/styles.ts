import theme from "@/shared/theme";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.white
  },
  form: {
    gap: 10,
    flex: 1,
  },
   header: {
    marginBottom: 32,
  },
    headerButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.colors.backgroundPrimary,
  },

  input: {
    borderColor: theme.colors.gray[100],
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    height: 45,
  },
});
