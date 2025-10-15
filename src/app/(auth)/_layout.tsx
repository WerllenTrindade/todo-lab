
import { useSession } from "@/shared/hooks/use-session";
import { ROUTES_PRIVATE } from "@/shared/utils/router";
import { Redirect, Slot } from "expo-router";

export default function AuthStackLayout() {
  const { session } = useSession();
 
  if (!!session?.bearerToken) {
    return <Redirect href={ROUTES_PRIVATE.HOME} withAnchor />;
  }

  return <Slot />
}
