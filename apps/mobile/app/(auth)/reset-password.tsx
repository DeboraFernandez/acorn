import { useRouter } from 'expo-router';
import ResetPasswordScreen from '@screens/ResetPassword';

export default function ResetPasswordRoute() {
  const router = useRouter();

  return <ResetPasswordScreen onSuccess={() => router.replace('/(auth)/login')} />;
}
