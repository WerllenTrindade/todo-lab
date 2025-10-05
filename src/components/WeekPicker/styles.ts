import theme from '@/theme';
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: 'center',
  },
  headerText: {
    color: "#A78BFA",
    fontSize: 18,
    fontFamily: theme.fonts.interRegular_400,
  },
  dayContainer: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    // marginHorizontal: 5,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    gap: 3,
    marginTop: 10
  },
  dayText: {
    fontFamily: theme.fonts.interBold_700,
    fontSize: 14,
  },
  dateText: {
    fontFamily: theme.fonts.interBold_700,
    fontSize: 14,
  },
});
