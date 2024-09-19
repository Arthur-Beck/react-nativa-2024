import { router, Stack, useSegments } from "expo-router";
import { useEffect } from "react";
import { AppProvider } from "../hooks";
import { useAuth } from "../hooks/Auth";

const StackLayout = () => {
  const { user } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(protected)";

    if (!user?.autenticated && inAuthGroup) {
      // router.replace("/");
      if (router.canGoBack()) {
        router.back();
      }
    } else {
      if (user?.authenticated) {
        console.log("StackLayout user: ", user.user.id);
        router.push("(protected)");
      }
    }
  }, [user]);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(protected)" options={{ headerShown: false }} />
    </Stack>
  );
};
export default function Layout() {
  return (
    <AppProvider>
      <StackLayout />
    </AppProvider>
  );
}
