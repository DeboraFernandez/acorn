import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Asset } from 'expo-asset';

export default function RootLayout() {
  useEffect(() => {
    void Asset.loadAsync([
      require('./assets/noise-home-bg.webp'),
      require('./assets/bottom-home-noise-gradient.png'),
    ]);
  }, []);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="dark" />
    </>
  );
}
