import theme from "@/shared/theme";
import { Platform, StyleSheet } from "react-native";

export const s = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  flex: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    fontFamily: theme.fonts.interRegular_400,
    fontSize: Platform.OS === 'android' ? 18 : 22,
    letterSpacing: 0.5,
    color: theme.colors.textPrimary,
  },
  descriptionInput: {
    height: 180,
    color: theme.colors.white,
    textAlignVertical: "top"
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 11,
  },
  timeInput: {
    flex: 1,
  },
  priorityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 10,
    marginTop: 7,
  },
  alertRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 32,
    marginBottom: 20,
  },
  alertText: {
    color: theme.colors.textPrimary,
  },
  footer: {
    paddingBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: theme.colors.textPrimary,
  },
});
