import { useRouter } from 'expo-router';
import RegisterScreen from '@screens/Register';

export default function RegisterRoute() {
  const router = useRouter();

  return (
    <RegisterScreen
      onRegisterSuccess={() => undefined}
      onGoToLogin={() => router.replace('/(auth)/login')}
    />
  );
}
