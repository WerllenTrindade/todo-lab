import { Button } from "@/shared/components/Button";
import { InputForm } from "@/shared/components/Inputs/InputForm";
import { router } from "expo-router";
import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "./styles";
import { useSignIn } from "./useSignIn";

export function SignIn() {
  const {
    handleSignIn,
    form: {
      control,
      handleSubmit,
      formState: { isSubmitting },
    },
  } = useSignIn();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.formWrapper}
        extraScrollHeight={50}
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.imageContainer}>
          <Image
            source={require('@/shared/assets/logo1.png')}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputs}>
            <InputForm
              title="E-mail"
              control={control}
              placeholder="Digite seu e-mail"
              name="email"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              returnKeyType="next"
            />

            <View style={{ gap: 8 }}>
              <InputForm
                title="Senha"
                control={control}
                clearable
                placeholder="Digite sua senha"
                name="password"
                secureTextEntry
                editable={!isSubmitting}
                autoCapitalize="none"
                returnKeyType="send"
              />
              <TouchableOpacity onPress={() => router.navigate('/(auth)/reset-password')}>
                <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.buttons}>
            <Button
              onPress={handleSubmit(handleSignIn)}
              description="Acessar"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            />
          </View>

          <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 8 }}>
            <TouchableOpacity onPress={() => router.navigate('/(auth)/register')}>
              <Text style={styles.registerText}>
                Não tem uma conta?{" "}
                <Text style={styles.registerHighlight}>Cadastre-se</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
