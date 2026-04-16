import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './ProfileScreen.styles';
import { ConfirmModal } from '../components/ConfirmModal/ConfirmModal';

type ProfileMenuItemProps = {
  label: string;
  icon: string;
  onPress: () => void;
  danger?: boolean;
};

type ProfileScreenProps = {
  userName?: string;
  userEmail?: string;
  avatarUrl?: string | null;
  onEditProfile?: () => void;
  onChangePassword?: () => void;
  onSignOut?: () => void;
  onDeleteAccount?: () => void;
};

function ProfileMenuItem({ label, icon, onPress, danger }: ProfileMenuItemProps) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.menuIcon, danger && styles.menuIconDanger]}>
        <Text style={styles.menuIconText}>{icon}</Text>
      </View>
      <Text style={[styles.menuLabel, danger && styles.menuLabelDanger]}>{label}</Text>
      <Text style={styles.menuChevron}>›</Text>
    </TouchableOpacity>
  );
}

export default function ProfileScreen({
  userName = 'Usuario',
  userEmail = '',
  avatarUrl,
  onEditProfile = () => {},
  onChangePassword = () => {},
  onSignOut = () => {},
  onDeleteAccount = () => {},
}: ProfileScreenProps) {
  const [signOutModalOpen, setSignOutModalOpen] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            {avatarUrl ? (
              <Image source={{ uri: avatarUrl }} style={styles.avatar} />
            ) : (
              <Image source={require('@assets/acorn-empty-state.png')} style={styles.avatar} />
            )}
          </View>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userEmail}>{userEmail}</Text>
        </View>

        {/* Secciones */}
        <View style={styles.sections}>
          {/* Cuenta */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cuenta</Text>
            <View style={styles.sectionCard}>
              <ProfileMenuItem label="Mi perfil" icon="👤" onPress={onEditProfile} />
              <View style={styles.separator} />
              <ProfileMenuItem label="Cambiar contraseña" icon="🔒" onPress={onChangePassword} />
            </View>
          </View>

          {/* Sesión */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sesión</Text>
            <View style={styles.sectionCard}>
              <ProfileMenuItem
                label="Cerrar sesión"
                icon="↩"
                onPress={() => setSignOutModalOpen(true)}
              />
            </View>
          </View>

          {/* Eliminar cuenta */}
          <View style={styles.sectionCard}>
            <ProfileMenuItem
              label="Eliminar cuenta"
              icon="⚠️"
              onPress={() => setDeleteModalOpen(true)}
              danger
            />
          </View>
        </View>
      </ScrollView>

      <ConfirmModal
        visible={signOutModalOpen}
        title="¿Quieres cerrar sesión?"
        subtitle="¿Estás seguro de querer cerrar tu sesión activa?"
        confirmLabel="Cerrar sesión"
        onConfirm={() => {
          setSignOutModalOpen(false);
          onSignOut();
        }}
        onCancel={() => setSignOutModalOpen(false)}
      />

      <ConfirmModal
        visible={deleteModalOpen}
        title="¿Eliminar cuenta?"
        subtitle="Esta acción es irreversible y perderás todos tus datos."
        confirmLabel="Eliminar cuenta"
        onConfirm={() => {
          setDeleteModalOpen(false);
          onDeleteAccount();
        }}
        onCancel={() => setDeleteModalOpen(false)}
        danger
      />
    </SafeAreaView>
  );
}
