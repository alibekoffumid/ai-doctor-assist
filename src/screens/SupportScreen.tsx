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
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { BackgroundBlobs } from '../components/BackgroundBlobs';
import { COLORS, SHADOWS, RADIUS } from '../constants/theme';

export const SupportScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const handleChat = () => {
    Alert.alert('Чат поддержки', 'Специалист AI Doctor подключится через 2 минуты...');
  };

  const handleCall = () => {
    Alert.alert(
      'Заказ звонка',
      'Оставить заявку на обратный звонок на номер +7 (999) 123-45-67?',
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Заказать', onPress: () => Alert.alert('Заявка принята', 'Ожидайте звонка в течение 10 минут.') },
      ]
    );
  };

  const handleFAQ = () => {
    Alert.alert(
      'Частые вопросы (FAQ)',
      '1. Насколько точна 3D симуляция? — Точность совпадения до 96% на базе FLUX.1.\n2. Как записаться на операцию? — Через вкладку «Поиск» выберите сертифицированного хирурга.'
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <BackgroundBlobs variant="support" />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={({ pressed }) => [styles.backButton, pressed && { opacity: 0.7 }]}
        >
          <Ionicons name="arrow-back" size={20} color="#16132A" />
        </Pressable>

        <Text style={styles.topTitle}>Помощь и поддержка</Text>

        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Top Purple Banner matching screenshot pixel-perfect */}
        <LinearGradient
          colors={COLORS.primaryPurpleBanner}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.bannerCard}
        >
          <View style={styles.headsetIconBox}>
            <Ionicons name="headset-outline" size={26} color="#FFFFFF" />
          </View>

          <Text style={styles.bannerTitle}>Чем мы можем помочь?</Text>
          <Text style={styles.bannerSubtitle}>
            Команда специалистов и экспертов AI Doctor на связи круглосуточно 24/7.
          </Text>
        </LinearGradient>

        {/* Options Card matching screenshot pixel-perfect */}
        <View style={styles.menuCard}>
          {/* Option 1: Чат со специалистом */}
          <Pressable
            onPress={handleChat}
            style={({ pressed }) => [styles.optionRow, pressed && styles.optionRowPressed]}
          >
            <View style={styles.optionIconContainer}>
              <Ionicons name="chatbubble-outline" size={20} color={COLORS.primary} />
            </View>

            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>Чат со специалистом</Text>
              <Text style={styles.optionDesc}>Среднее время ответа — 3 минуты</Text>
            </View>

            <Feather name="chevron-right" size={18} color="#9F99B8" />
          </Pressable>

          <View style={styles.divider} />

          {/* Option 2: Заказать звонок */}
          <Pressable
            onPress={handleCall}
            style={({ pressed }) => [styles.optionRow, pressed && styles.optionRowPressed]}
          >
            <View style={styles.optionIconContainer}>
              <Ionicons name="call-outline" size={20} color={COLORS.primary} />
            </View>

            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>Заказать звонок</Text>
              <Text style={styles.optionDesc}>Консультант свяжется с вами</Text>
            </View>

            <Feather name="chevron-right" size={18} color="#9F99B8" />
          </Pressable>

          <View style={styles.divider} />

          {/* Option 3: Частые вопросы (FAQ) */}
          <Pressable
            onPress={handleFAQ}
            style={({ pressed }) => [styles.optionRow, pressed && styles.optionRowPressed]}
          >
            <View style={styles.optionIconContainer}>
              <Ionicons name="document-text-outline" size={20} color={COLORS.primary} />
            </View>

            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>Частые вопросы (FAQ)</Text>
              <Text style={styles.optionDesc}>
                Ответы о процедурах и ИИ симуляциях
              </Text>
            </View>

            <Feather name="chevron-right" size={18} color="#9F99B8" />
          </Pressable>
        </View>

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
    paddingTop: 10,
  },
  bannerCard: {
    borderRadius: RADIUS.card,
    padding: 22,
    marginBottom: 18,
    ...SHADOWS.cardHover,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.25,
  },
  headsetIconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  bannerSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.88)',
    lineHeight: 18,
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.card,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    ...SHADOWS.card,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  optionRowPressed: {
    backgroundColor: '#FAF9FF',
  },
  optionIconContainer: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#F3F1FD',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  optionContent: {
    flex: 1,
    marginRight: 8,
  },
  optionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  optionDesc: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginHorizontal: 16,
  },
});
