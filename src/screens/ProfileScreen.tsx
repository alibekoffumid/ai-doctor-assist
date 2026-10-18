import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  SafeAreaView,
  StatusBar,
  Alert,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { BackgroundBlobs } from '../components/BackgroundBlobs';
import { USER_PROFILE_DATA } from '../constants/mockData';
import { COLORS, SHADOWS, RADIUS } from '../constants/theme';

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const handleLogout = () => {
    Alert.alert(
      'Выход из аккаунта',
      'Вы действительно хотите выйти из своего профиля?',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Выйти',
          style: 'destructive',
          onPress: () => Alert.alert('Вы вышли из аккаунта'),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <BackgroundBlobs variant="profile" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Title */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Профиль</Text>
        </View>

        {/* User Info Card */}
        <View style={styles.userCard}>
          <View style={styles.avatarRow}>
            {/* User Avatar Circle UW!D */}
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarInitials}>UW!D</Text>
            </View>

            <View style={styles.userMeta}>
              <View style={styles.nameRow}>
                <Text style={styles.userName}>{USER_PROFILE_DATA.name}</Text>
                <Pressable
                  onPress={handleEditProfile}
                  hitSlop={10}
                  style={({ pressed }) => [
                    styles.editIconBtn,
                    pressed && { opacity: 0.7 },
                  ]}
                >
                  <Feather name="edit-2" size={16} color={COLORS.primary} />
                </Pressable>
              </View>

              <Text style={styles.userEmail}>{USER_PROFILE_DATA.email}</Text>

              {/* Google Account Badge */}
              <View style={styles.googleBadge}>
                <Ionicons name="logo-google" size={12} color="#4285F4" style={{ marginRight: 5 }} />
                <Text style={styles.googleBadgeText}>{USER_PROFILE_DATA.badge}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* PRO ACCESS Subscription Banner */}
        <LinearGradient
          colors={COLORS.primaryPurpleBanner}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.proBanner}
        >
          <View style={styles.proContentCol}>
            <View style={styles.proPill}>
              <Ionicons name="sparkles" size={12} color="#F1C40F" style={{ marginRight: 4 }} />
              <Text style={styles.proPillText}>PRO ACCESS</Text>
            </View>

            <Text style={styles.proTitle}>Premium доступ</Text>
            <Text style={styles.proDesc}>
              Открывает все функции ИИ анализа и 3D симуляции
            </Text>
          </View>

          <Pressable
            onPress={() => Alert.alert('Подписка PRO', 'У вас уже активирован пробный PRO доступ!')}
            style={({ pressed }) => [styles.proButton, pressed && { opacity: 0.9 }]}
          >
            <Text style={styles.proButtonText}>Улучшить</Text>
          </Pressable>
        </LinearGradient>

        {/* Navigation Menu Card */}
        <View style={styles.menuCard}>
          {/* Item 1: История сканирований */}
          <Pressable
            onPress={() => navigation.navigate('ScanHistory')}
            style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}
          >
            <View style={[styles.menuIconContainer, { backgroundColor: '#F0EEFD' }]}>
              <Ionicons name="scan-outline" size={20} color={COLORS.primary} />
            </View>
            <Text style={styles.menuItemTitle}>История сканирований</Text>
            <Feather name="chevron-right" size={18} color="#9F99B8" />
          </Pressable>

          <View style={styles.menuDivider} />

          {/* Item 2: Мои консультации */}
          <Pressable
            onPress={() => navigation.navigate('Consultations')}
            style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}
          >
            <View style={[styles.menuIconContainer, { backgroundColor: '#E8F6FD' }]}>
              <Ionicons name="calendar-outline" size={20} color="#0984E3" />
            </View>
            <Text style={styles.menuItemTitle}>Мои консультации</Text>
            <Feather name="chevron-right" size={18} color="#9F99B8" />
          </Pressable>

          <View style={styles.menuDivider} />

          {/* Item 3: Настройки */}
          <Pressable
            onPress={() => navigation.navigate('Settings')}
            style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}
          >
            <View style={[styles.menuIconContainer, { backgroundColor: '#F3F2F8' }]}>
              <Feather name="settings" size={20} color="#554E77" />
            </View>
            <Text style={styles.menuItemTitle}>Настройки</Text>
            <Feather name="chevron-right" size={18} color="#9F99B8" />
          </Pressable>

          <View style={styles.menuDivider} />

          {/* Item 4: Помощь и поддержка */}
          <Pressable
            onPress={() => navigation.navigate('Support')}
            style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}
          >
            <View style={[styles.menuIconContainer, { backgroundColor: '#EAF9F5' }]}>
              <Ionicons name="headset-outline" size={20} color={COLORS.mintText} />
            </View>
            <Text style={styles.menuItemTitle}>Помощь и поддержка</Text>
            <Feather name="chevron-right" size={18} color="#9F99B8" />
          </Pressable>
        </View>

        {/* Logout Button */}
        <Pressable
          onPress={handleLogout}
          style={({ pressed }) => [styles.logoutButton, pressed && { opacity: 0.7 }]}
        >
          <Feather name="log-out" size={18} color={COLORS.red} style={{ marginRight: 8 }} />
          <Text style={styles.logoutText}>Выйти из аккаунта</Text>
        </Pressable>

        {/* Bottom space for tab bar */}
        <View style={{ height: 110 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF8FD',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  header: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  userCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.card,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    marginBottom: 16,
    ...SHADOWS.card,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#16132A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    ...SHADOWS.card,
  },
  avatarInitials: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  userMeta: {
    flex: 1,
    marginLeft: 16,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    letterSpacing: -0.3,
  },
  editIconBtn: {
    padding: 4,
  },
  userEmail: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
    marginBottom: 6,
  },
  googleBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F2F8',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  googleBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  proBanner: {
    borderRadius: RADIUS.card,
    padding: 18,
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...SHADOWS.cardHover,
    shadowColor: COLORS.primary,
  },
  proContentCol: {
    flex: 1,
    marginRight: 10,
  },
  proPill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginBottom: 6,
  },
  proPillText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  proTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  proDesc: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 16,
  },
  proButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 16,
    ...SHADOWS.card,
    shadowOpacity: 0.1,
  },
  proButtonText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  menuCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.card,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    marginBottom: 18,
    ...SHADOWS.card,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  menuItemPressed: {
    backgroundColor: '#FAF9FF',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  menuItemTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  menuDivider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginHorizontal: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 71, 87, 0.15)',
    ...SHADOWS.card,
    shadowOpacity: 0.03,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.red,
  },
});
