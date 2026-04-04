import { Pressable, Text, StyleSheet } from "react-native"
import { colors } from "../../theme/colors";


type ButtonProps = {
  label: string;
  onPress: () => void;
};


export const Button = ({ label, onPress }: ButtonProps) => (
  <Pressable style={({ pressed }) => [
    styles.button,
    pressed && styles.buttonPressed
  ]} onPress={onPress}>
    <Text style={styles.label}>{label}</Text>
  </Pressable>
);


const styles = StyleSheet.create({
  button: {
    width: '100%',
    height:32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    borderRadius: 8
  },

  buttonPressed: {
    backgroundColor: '#C06E52'
  },
  label: {
  color: '#FEFFFE'
}
})
