import { useState } from 'react';
import { supabase } from '../lib/supabase';

// Errores de validación
type FormErrors = {
  email?: string;
  password?: string;
  general?: string;
};

export function useRegister() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false); // control para mostrar pantalla de confirmación

  // Valida el formulario antes de enviar
  function validate(): boolean {
    const newErrors: FormErrors = {};

    if (!email) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // true si no hay errores
  }

  // Llama a Supabase para registrar al usuario
  async function handleRegister() {
    if (!validate()) return; // Comprobación de errores

    setLoading(true);
    setErrors({});

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrors({ general: error.message });
      return;
    }

    // Si todo va bien muestra la pantalla de confirmación
    setRegistered(true);
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    errors,
    loading,
    registered,
    handleRegister,
  };
}
