import { mapFirebaseError } from "@/domain/auth/authErrorMapper";
import { useAuthService } from "@/domain/auth/useAuthService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";
import { schema } from "./schemas";
import { types } from "./types";

export function useRegister() {
  const { register } = useAuthService();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<types>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const handleRegister = handleSubmit(async (data: types) => {
    setLoading(true);

    try {
      const response = await register(data.email, data.password);

      if (response) {
        Toast.show({
          type: "success",
          text1: "Usuário registrado com sucesso!",
          position: "bottom",
        });
      }
    } catch (err: any) {
      const message = mapFirebaseError(err.code);
      Alert.alert("Atenção", message);
      console.log("Erro de registro:", message);
    } finally {
      setLoading(false);
    }
  });

  const isLoading = isSubmitting || loading;

  return {
    control,
    handleRegister,
    isLoading,
  };
}
