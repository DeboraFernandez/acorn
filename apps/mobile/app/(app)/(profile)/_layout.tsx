import { Stack } from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function ProfileLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="reset-password" />
      <Stack.Screen
        name="confirm-modal"
        options={{
          presentation: 'transparentModal',
          animation: 'fade',
          contentStyle: { backgroundColor: 'rgba(0,0,0,0.4)' },
        }}
      />
      <Stack.Screen name="edit-profile" options={{ headerShown: false }} />
    </Stack>
  );
}
