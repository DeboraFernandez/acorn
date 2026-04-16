import { useLocalSearchParams, useRouter } from 'expo-router';
import { ConfirmModal } from '@screens/profile/components/ConfirmModal/ConfirmModal';
import { supabase } from '@lib/supabase';

export default function ConfirmModalRoute() {
  const router = useRouter();
  const { title, subtitle, confirmLabel, action, danger } = useLocalSearchParams<{
    title: string;
    subtitle?: string;
    confirmLabel: string;
    action: string;
    danger?: string;
  }>();

  const handleConfirm = async () => {
    router.back();
    if (action === 'signOut') {
      await supabase.auth.signOut();
    } else if (action === 'deleteAccount') {
      // TODO: implementar
    }
  };

  return (
    <ConfirmModal
      visible
      title={title}
      subtitle={subtitle}
      confirmLabel={confirmLabel}
      danger={danger === 'true'}
      onConfirm={handleConfirm}
      onCancel={() => router.back()}
    />
  );
}
