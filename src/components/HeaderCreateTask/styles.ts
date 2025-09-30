import theme from '@/theme';
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  icon: {
    position: 'absolute',
    left: 0,
  },
  title: {
    fontFamily: theme.fonts.interRegular_400,
    fontSize: 18,
    color: theme.colors.white,
    textAlign: 'center',
  },
});
