import { db } from "@/infra/database/database";
import { useAppInitialization } from "@/shared/router/useAppInitialization";
import { useAuthRouter } from "@/shared/router/useAuthRouter";
import theme from "@/shared/theme";
import { toastConfig } from "@/shared/utils/toastConfig";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Slot, SplashScreen } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { Suspense, useEffect } from "react";
import { ActivityIndicator, StatusBar, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { appReady, user } = useAppInitialization();
  useAuthRouter(appReady, user);

  useEffect(() => {
    if (appReady) SplashScreen.hideAsync();
  }, [appReady]);


  if (!appReady) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.backgroundPrimary,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: theme.colors.backgroundPrimary }}>
      <BottomSheetModalProvider>
        <Suspense fallback={<ActivityIndicator size="large" color={theme.colors.primary} />}>
          <StatusBar barStyle="light-content" />
          <SQLiteProvider databaseName="tasks.db" onInit={db}>
            <Slot />
            <Toast config={toastConfig} visibilityTime={1500} />
          </SQLiteProvider>
        </Suspense>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
