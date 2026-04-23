import { useState } from 'react';

type EditProfileErrors = {
  name?: string;
  username?: string;
  email?: string;
  general?: string;
};

export function useEditProfile() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [errors, setErrors] = useState<EditProfileErrors>({});
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: EditProfileErrors = {};
    if (!name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!username.trim()) newErrors.username = 'El nombre de usuario es obligatorio';
    if (!email.trim()) newErrors.email = 'El correo es obligatorio';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      // TODO: llamada a Supabase para actualizar perfil + subir avatar
      await new Promise((resolve) => setTimeout(resolve, 1000)); // placeholder
    } catch {
      setErrors({ general: 'Error al guardar los cambios' });
    } finally {
      setLoading(false);
    }
  };

  return {
    name,
    setName,
    username,
    setUsername,
    email,
    setEmail,
    avatarUri,
    setAvatarUri,
    errors,
    loading,
    handleSave,
  };
}
