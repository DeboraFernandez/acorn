import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from './src/components/Button/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function App() {
  return (
    <View style={styles.container}>
<Button label="Iniciar Sesión" onPress={() =>{}}></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
