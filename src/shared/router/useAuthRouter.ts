import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

export function useAuthRouter(appReady: boolean, user: FirebaseAuthTypes.User | null) {
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (!appReady) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (user && inAuthGroup) {
      router.replace("/(stacks)/home");
    } else if (!user && !inAuthGroup) {
      router.replace("/(auth)/signIn");
    }
  }, [appReady, user, segments, router]);
}