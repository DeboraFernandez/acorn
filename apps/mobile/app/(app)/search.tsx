import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { SearchScreen } from '../../src/screens/Search/Search';

export default function SearchRoute() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <SearchScreen onOpenDetail={(itemId) => router.push(`/(app)/item/${itemId}`)} />
    </View>
  );
}
