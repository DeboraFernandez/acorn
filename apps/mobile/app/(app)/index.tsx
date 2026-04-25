import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import type { Session } from '@supabase/supabase-js';
import HomeScreen from '@screens/Home/Home';
import { supabase } from '@lib/supabase';
import { View } from 'react-native';

export default function HomeRoute() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [sharedUrl, setSharedUrl] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const bootstrap = async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      setSession(data.session ?? null);
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!mounted) return;
      setSession(nextSession);
    });

    void bootstrap();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <HomeScreen
        userName={session?.user.email ?? 'Usuario'}
        sharedUrl={sharedUrl}
        onSharedUrlHandled={() => setSharedUrl(null)}
        onSearchPress={() => router.push('/(app)/search')}
      />
    </View>
  );
}
