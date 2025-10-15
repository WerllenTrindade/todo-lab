import { Button } from '@/shared/components/Button';
import { Header } from '@/shared/components/Header';
import { InputForm } from '@/shared/components/Inputs/InputForm';
import theme from '@/shared/theme';
import { router } from 'expo-router';
import React from "react";
import { StatusBar, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { PasswordRequirements } from './components/PasswordRequirements';
import { useRegister } from './useRegister';

export default function Register() {
  const { isLoading, control, handleRegister  } = useRegister();


  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <StatusBar barStyle="dark-content" />

      <Header title="Cadastro" onBack={() => router.back()} />

      <View style={{ flex: 1, gap: 15}}>
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
        <View style={{ flexDirection: "row", alignItems: "center",  justifyContent: 'space-between', marginVertical: 4 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: theme.colors.gray[50] }} />
        
        <View>
          <Text
            style={{
              marginHorizontal: 10,
              color: theme.colors.gray[200],
              fontFamily: theme.fonts.interSemiBold_600,
              marginBottom: 3
            }}
            numberOfLines={1}
          >
            Informações de senha
          </Text>
        </View>

          <View style={{  flex: 1, height: 1, backgroundColor: theme.colors.gray[50] }} />
        </View>
        <InputForm
          control={control}
          placeholder="Digite sua senha"
          name="password"
          title="Senha Atual"
          autoCapitalize="none"
          clearable
                secureTextEntry
                returnKeyType="send"
        />

        <InputForm
          control={control}
          placeholder="Repetir nova senha"
          name="confirm_password"
          title="Repetir senha"
          autoCapitalize="none"
          clearable
          secureTextEntry
          returnKeyType="send"
        />

        <PasswordRequirements />
      </View>

      <Button disabled={isLoading} isLoading={isLoading} description="Salvar" onPress={handleRegister} />
    </SafeAreaView>
  );
}
