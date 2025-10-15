import { mapFirebaseError } from "@/domain/auth/authErrorMapper";
import { useAuthService } from "@/domain/auth/useAuthService";
import { NO_INTERNET_MESSAGE } from "@/shared/constants/messages";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNetInfo } from "@react-native-community/netinfo";
import { FirebaseError } from 'firebase/app';
import { useForm } from "react-hook-form";
import { Alert } from "react-native";
import { loginSchema } from "./schemas";
import { loginType } from "./types";

export const useSignIn = () => {
  const { signIn } = useAuthService();
  const netInfo = useNetInfo();

  const form = useForm<loginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    },
    mode: "onChange",
  });

  const handleSignIn = async (data: loginType) => {
    if (netInfo.isConnected === false) {
      return Alert.alert("Ops!", NO_INTERNET_MESSAGE);
    }

    try {
      await signIn(data.email, data.password);

    } catch (error) {
      const err = error as FirebaseError
      const message = mapFirebaseError(err.code);
        Alert.alert("Atenção", message);
      
      if ((error as any).code) {
        Alert.alert("Erro de Login", "Verifique seu e-mail e senha e tente novamente.");
      } else {
        Alert.alert("Erro", "Ocorreu um erro inesperado. Tente novamente.");
      }
    }
  }

  return {
    form,
    handleSignIn,
    isConnected: netInfo.isConnected 
  };
};