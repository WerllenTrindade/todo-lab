import { useAuthService } from "@/domain/auth/useAuthService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { RecoverBottomSheetProps } from "./components/recover-bottom-sheet";
import { recoverEmailSchema } from "./schema";
import { recoverEmailType } from "./types";

export function useResetPassword() {
  const { resetPassword } = useAuthService();
  const bottomSheetRef = useRef<RecoverBottomSheetProps>(null);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm<recoverEmailType>({
    resolver: zodResolver(recoverEmailSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: recoverEmailType) => {
    try {
      const email = data.email.trim();

      await resetPassword(email);

      bottomSheetRef.current?.open(email);
    } catch (error: any) {
      console.error("Erro ao enviar e-mail de redefinição:", error);

    }
  };

  return {
    control,
    handleSubmit,
    isSubmitting,
    isValid,
    onSubmit,
    bottomSheetRef,
  };
}
