import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage, // guarda la sesión
    autoRefreshToken: true, // renueva el token
    persistSession: true, // mantiene la sesión al cerrar
    detectSessionInUrl: false, // en móvil no hay URLs
  },
});
