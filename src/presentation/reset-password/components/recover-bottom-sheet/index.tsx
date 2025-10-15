import { Button } from "@/shared/components/Button";
import { CustomBottomSheetModal } from "@/shared/components/CustomBottomSheetModal";
import theme from "@/shared/theme";
import { ROUTES_PUBLIC } from "@/shared/utils/router";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export interface RecoverBottomSheetProps {
  open: (email: string) => void;
  close: () => void;
}

export const RecoverBottomSheet = forwardRef<RecoverBottomSheetProps>((_, ref) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [email, setEmail] = useState("");

  useImperativeHandle(ref, () => ({
    open: (email: string) => {
      setEmail(email);
      bottomSheetRef.current?.present();
    },
    close: () => {
      bottomSheetRef.current?.dismiss();
    },
  }));

  const navigate = () => {
    bottomSheetRef.current?.dismiss();
    router.replace(ROUTES_PUBLIC.SIGNIN);
  };

  return (
    <CustomBottomSheetModal ref={bottomSheetRef}>
      <SafeAreaView style={{ marginHorizontal: 16, gap: 30 }}>
        <Text
          style={{
            fontFamily: theme.fonts.interBold_700,
            fontSize: 16,
            color: theme.colors.gray[900],
          }}
        >
          Solicitação enviada
        </Text>

        <Text
          style={{
            fontFamily: theme.fonts.interRegular_400,
            fontSize: 14,
            color: theme.colors.gray[800],
          }}
        >
          Se o e-mail <Text style={{ fontFamily: theme.fonts.interMedium_500 }}>{email}</Text> estiver
          cadastrado em nosso sistema, você receberá um link para redefinir sua senha.
          Verifique sua caixa de entrada e também a pasta de spam.
        </Text>

        <Button
          onPress={navigate}
          style={{
            backgroundColor: theme.colors.primary,
            marginBottom: 32,
          }}
          description="Ok"
        />
      </SafeAreaView>
    </CustomBottomSheetModal>
  );
});

RecoverBottomSheet.displayName = "RecoverBottomSheet";
