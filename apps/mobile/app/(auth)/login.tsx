import { useRouter } from 'expo-router';
import LoginScreen from '@screens/Login/Login';

export default function LoginRoute() {
  const router = useRouter();

  return (
    <LoginScreen
      onLoginSuccess={() => undefined}
      onGoToRegister={() => router.push('/(auth)/register')}
      onGoToForgotPassword={() => router.push('/(auth)/forgot-password')}
    />
  );
}
