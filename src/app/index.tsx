import { useSession } from "@/shared/hooks/use-session";
import { Redirect } from "expo-router";

export default function Index() {
  const { session } = useSession();

  if (session?.bearerToken) {
    return <Redirect href="/(stacks)/home" />;
  }

  return <Redirect href="/(auth)/signIn" />;
}
