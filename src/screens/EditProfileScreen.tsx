import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  SafeAreaView,
  StatusBar,
  Alert,
  ScrollView,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { BackgroundBlobs } from '../components/BackgroundBlobs';
import { USER_PROFILE_DATA } from '../constants/mockData';
import { COLORS, SHADOWS, RADIUS } from '../constants/theme';

export const EditProfileScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const [name, setName] = useState(USER_PROFILE_DATA.name);
  const [email, setEmail] = useState(USER_PROFILE_DATA.email);
  const [phone, setPhone] = useState(USER_PROFILE_DATA.phone);

  const handleSave = () => {
    Alert.alert('Успешно', 'Изменения профиля сохранены.', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  const handlePickAvatar = () => {
    Alert.alert('Сменить фото', 'Выберите источник:', [
      { text: 'Сделать фото' },
      { text: 'Выбрать из галереи' },
      { text: 'Отмена', style: 'cancel' },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <BackgroundBlobs variant="profile" />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={({ pressed }) => [styles.backButton, pressed && { opacity: 0.7 }]}
        >
          <Ionicons name="arrow-back" size={20} color="#16132A" />
        </Pressable>

        <Text style={styles.topTitle}>Редактирование</Text>

        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* User Avatar Circle with Camera Badge */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>UW!D</Text>
          </View>

          <Pressable
            onPress={handlePickAvatar}
            style={({ pressed }) => [styles.cameraBadge, pressed && { opacity: 0.85 }]}
          >
            <Ionicons name="camera" size={15} color="#FFFFFF" />
          </Pressable>
        </View>

        {/* Form Card matching screenshot pixel-perfect */}
        <View style={styles.formCard}>
          {/* Field 1: Имя и фамилия */}
          <View style={styles.fieldBlock}>
            <Text style={styles.fieldLabel}>Имя и фамилия</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              style={styles.fieldInput}
              placeholder="Введите имя"
              placeholderTextColor="#B0A9C6"
            />
          </View>

          <View style={styles.divider} />

          {/* Field 2: Электронная почта */}
          <View style={styles.fieldBlock}>
            <Text style={styles.fieldLabel}>Электронная почта</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={styles.fieldInput}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="example@gmail.com"
              placeholderTextColor="#B0A9C6"
            />
          </View>

          <View style={styles.divider} />

          {/* Field 3: Номер телефона */}
          <View style={styles.fieldBlock}>
            <Text style={styles.fieldLabel}>Номер телефона</Text>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              style={styles.fieldInput}
              keyboardType="phone-pad"
              placeholder="+7 (999) 000-00-00"
              placeholderTextColor="#B0A9C6"
            />
          </View>
        </View>

        {/* Save Button: ✓ Сохранить изменения */}
        <Pressable
          onPress={handleSave}
          style={({ pressed }) => [styles.saveButton, pressed && { opacity: 0.9 }]}
        >
          <Ionicons name="checkmark" size={19} color="#FFFFFF" style={{ marginRight: 6 }} />
          <Text style={styles.saveButtonText}>Сохранить изменения</Text>
        </Pressable>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF8FD',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.card,
    shadowOpacity: 0.06,
  },
  topTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#16132A',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginVertical: 18,
  },
  avatarCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#0F0C1B',
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.card,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    ...SHADOWS.card,
  },
  formCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.card,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    marginVertical: 20,
    ...SHADOWS.card,
  },
  fieldBlock: {
    paddingVertical: 10,
  },
  fieldLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  fieldInput: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
    padding: 0,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
  },
  saveButton: {
    width: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.button,
  },
  saveButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
