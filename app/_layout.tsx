import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Aquí podrías verificar si el usuario ya está autenticado
  // Por ejemplo, comprobando un token almacenado
  useEffect(() => {
    // Simulación: el usuario no está autenticado al inicio
    setIsAuthenticated(false);
  }, []);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="auth/login" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="nuevo-servicio" />
        <Stack.Screen name="cobro-servicio" />
        <Stack.Screen name="vehiculos" />
        <Stack.Screen name="vehiculo-form" />
        <Stack.Screen name="metricas" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
