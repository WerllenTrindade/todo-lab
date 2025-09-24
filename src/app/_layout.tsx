import theme from '@/theme';
import { toastConfig } from '@/utils/toastConfig';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Slot } from "expo-router";
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import "react-native-reanimated";
import Toast from 'react-native-toast-message';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{flex: 1, backgroundColor: theme.colors.primary}}>
      <BottomSheetModalProvider>
        <StatusBar barStyle={'light-content'}/>
        <Slot />
          <Toast config={toastConfig} visibilityTime={1500}/>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
