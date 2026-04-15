import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import type { Session } from '@supabase/supabase-js';
import HomeScreen from '@screens/Home/Home';
import { supabase } from '@lib/supabase/client';
import { View } from 'react-native';
import SignOutButton from 'components/SignOut';

export default function HomeRoute() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [sharedUrl, setSharedUrl] = useState<string | null>(null);

  useEffect(() => {
    supabase?.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <SignOutButton />
      {/* <HomeScreen
          userName={session?.user.email ?? 'Usuario'}
          sharedUrl={sharedUrl}
          onSharedUrlHandled={() => setSharedUrl(null)}
          onSearchPress={() => router.push('/(app)/search')}
        />*/}
    </View>
  );
}
