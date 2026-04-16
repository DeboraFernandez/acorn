import { Slot, useRouter, useSegments } from 'expo-router';
import { View, Alert } from 'react-native';
import { NavBar } from '@components/NavBar/NavBar';

export default function AppLayout() {
  const router = useRouter();
  const segments = useSegments();

  const currentRoute = segments[segments.length - 1];
  const searchActive = currentRoute === 'search';
  const profileActive = segments.includes('(profile)');

  return (
    <View style={{ flex: 1 }}>
      <Slot />
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <NavBar
          onHomePress={() => router.replace('/(app)/')}
          onAddPress={() =>
            Alert.alert('Guardar recurso', 'Elige el tipo de contenido', [
              { text: 'Enlace', onPress: () => {} },
              { text: 'Archivo', onPress: () => {} },
              { text: 'Cancelar', style: 'cancel' },
            ])
          }
          onSearchPress={() => router.push('/(app)/search')}
          onTagsPress={() => {}}
          onProfilePress={() => router.push('/(app)/(profile)/')}
          searchActive={searchActive}
          profileActive={profileActive}
          tagsActive={false}
        />
      </View>
    </View>
  );
}
