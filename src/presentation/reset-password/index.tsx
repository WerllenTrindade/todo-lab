import { Button } from "@/shared/components/Button";
import { Header } from "@/shared/components/Header";
import { InputForm } from "@/shared/components/Inputs/InputForm";
import theme from "@/shared/theme";
import { useRouter } from "expo-router";
import { StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RecoverBottomSheet } from "./components/recover-bottom-sheet";
import { s } from "./styles";
import { useResetPassword } from "./useResetPassword";

export function ResetPassword() {
  const { control, handleSubmit, bottomSheetRef, isSubmitting, onSubmit } = useResetPassword();
  const router = useRouter();

  return (
    <SafeAreaView style={[s.container]}>
      <StatusBar backgroundColor={theme.colors.backgroundPrimary} barStyle={"dark-content"} />

      <Header
      onBack={() => router.back()}
      title="Redefinir senha"
      />

      <View style={s.form}>
        <InputForm control={control} name="email" title="E-mail" />
      </View>

      <View>
        <Button
          disabled={isSubmitting}
          onPress={() => handleSubmit(onSubmit)()}
          isLoading={isSubmitting}
          description="Enviar código"
        />
      </View>

      <RecoverBottomSheet ref={bottomSheetRef} />
    </SafeAreaView>
  );
}
