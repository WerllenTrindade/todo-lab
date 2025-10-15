import { IAuthService } from "@/domain/auth/IAuthService";
import { firebaseAuthService } from "@/infra/firebase/firebaseAuthService";
import { NO_INTERNET_MESSAGE } from "@/shared/constants/messages";
import NetInfo from "@react-native-community/netinfo";
import { Alert } from "react-native";

const provider: IAuthService = firebaseAuthService;

export function useAuthService() {
  const checkConnection = async (): Promise<boolean> => {
    const state = await NetInfo.fetch();
    if (!state.isConnected) {
      Alert.alert("Ops!", NO_INTERNET_MESSAGE);
      return false;
    }
    return true;
  };

  const signIn = async (...args: Parameters<IAuthService["signIn"]>) => {
    if (!(await checkConnection())) return;
    return provider.signIn(...args);
  };

  const register = async (...args: Parameters<IAuthService["register"]>) => {
    if (!(await checkConnection())) return;
    return provider.register(...args);
  };

  const logout = async (...args: Parameters<IAuthService["logout"]>) => {
    if (!(await checkConnection())) return;
    return provider.logout(...args);
  };

  const resetPassword = async (...args: Parameters<IAuthService["resetPassword"]>) => {
    if (!(await checkConnection())) return;
    return provider.resetPassword(...args);
  };

  return { signIn, register, logout, resetPassword };
}
