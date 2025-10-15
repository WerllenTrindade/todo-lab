import {
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/inter";
import { getApp } from "@react-native-firebase/app";
import {
  FirebaseAuthTypes,
  getAuth,
  onAuthStateChanged
} from "@react-native-firebase/auth";
import { useEffect, useMemo, useState } from "react";


export function useAppInitialization() {
  const app = useMemo(() => getApp(), []);
  const auth = useMemo(() => getAuth(app), [app]);

  const [appReady, setAppReady] = useState(false);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

 const [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

useEffect(() => {
    if (!fontsLoaded) return;

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    

    setAppReady(true); 
    
    return unsubscribe;
}, [fontsLoaded, auth]);

  return { appReady, user };
}
