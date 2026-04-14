import { useRouter } from 'expo-router';
import ForgotPasswordScreen from '../../src/screens/ForgotPassword';

export default function ForgotPasswordRoute() {
  const router = useRouter();

  return <ForgotPasswordScreen onGoToLogin={() => router.replace('/(auth)/login')} />;
}
