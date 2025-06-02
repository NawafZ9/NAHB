import { getToken } from "@/api/storage";
import AuthContext from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StatusBar, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const queryClient = new QueryClient();
export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [ready, setReady] = useState(false);
  const checkToken = async () => {
    const token = await getToken();
    if (token) {
      setIsAuthenticated(true);
    }
    setReady(true);
  };
  useEffect(() => {
    checkToken();
  }, []);
  if (!ready) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <StatusBar
          barStyle="dark-content"
          translucent
          backgroundColor="transparent"
        />
        <QueryClientProvider client={queryClient}>
          <ThemeProvider initialTheme="light">
            <AuthContext.Provider
              value={{ isAuthenticated, setIsAuthenticated }}
            >
              <Stack screenOptions={{ headerShown: false }}>
                {isAuthenticated ? (
                  <Stack.Screen name="(protected)" />
                ) : (
                  <>
                    <Stack.Screen name="(theme)" />
                    <Stack.Screen name="(auth)" />
                  </>
                )}
              </Stack>
            </AuthContext.Provider>
          </ThemeProvider>
        </QueryClientProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
