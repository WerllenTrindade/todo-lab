import { toastConfig } from '@/utils/toastConfig';
import {
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/inter";
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Slot, SplashScreen } from "expo-router";
import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import "react-native-reanimated";
import Toast from 'react-native-toast-message';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  // Esconde o splash assim que as fontes carregarem
  useEffect(() => {
    async function hideSplash() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }
    hideSplash();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{flex: 1, backgroundColor: '#020206'}}>
      <BottomSheetModalProvider>
        <StatusBar barStyle={'light-content'} />
        <Slot />
        <Toast config={toastConfig} visibilityTime={1500}/>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
