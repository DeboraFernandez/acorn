import { useEffect, useState } from 'react';
import { supabase } from '../../../../lib/supabase';
import { formatDisplayName, sanitizeDisplayName } from '../../../utils/formatDisplayName';

type EditProfileErrors = {
  name?: string;
  email?: string;
  general?: string;
};

export function useEditProfile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [errors, setErrors] = useState<EditProfileErrors>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setEmail(user.email ?? '');

      const { data } = await supabase
        .from('profiles')
        .select('display_name')
        .eq('id', user.id)
        .single();

      if (data?.display_name) setName(data.display_name);
    };

    loadProfile();
  }, []);

  const validate = (): boolean => {
    const newErrors: EditProfileErrors = {};
    if (!name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!email.trim()) newErrors.email = 'El correo es obligatorio';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user');

      const { error } = await supabase
        .from('profiles')
        .update({ display_name: name.trim() })
        .eq('id', user.id);

      if (error) throw error;
    } catch {
      setErrors({ general: 'Error al guardar los cambios' });
    } finally {
      setLoading(false);
    }
  };

  const handleNameChange = (text: string) => setName(sanitizeDisplayName(text));
  const handleNameBlur = () => setName(formatDisplayName(name));

  return {
    name,
    handleNameChange,
    handleNameBlur,
    email,
    setEmail,
    avatarUri,
    setAvatarUri,
    errors,
    loading,
    handleSave,
  };
}
