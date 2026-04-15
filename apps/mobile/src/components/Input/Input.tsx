import React, { useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, TextInputProps, Animated } from 'react-native';
import { styles } from './Input.styles';

export interface InputProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  showClear?: boolean;
}

export const Input = React.memo(function Input({
  label,
  value,
  onChangeText,
  error,
  showClear = true,
  secureTextEntry,
  placeholder,
  ...rest
}: InputProps) {
  const focused = useRef(false);
  const hasError = !!error;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={[styles.inputWrapper, hasError && styles.inputWrapperError]}>
        <TextInput
          style={[styles.input, hasError && styles.inputError]}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => {
            focused.current = true;
          }}
          onBlur={() => {
            focused.current = false;
          }}
          returnKeyType="next"
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          {...rest}
        />

        {showClear && (
          <View pointerEvents={value.length > 0 ? 'auto' : 'none'}>
            <TouchableOpacity
              style={[styles.clearButton, { opacity: value.length > 0 ? 1 : 0 }]}
              onPress={() => onChangeText('')}
              activeOpacity={0.7}
            >
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {hasError && <Text style={styles.errorText}>* {error}</Text>}
    </View>
  );
});
