import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  SafeAreaView,
  StatusBar,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { BackgroundBlobs } from '../components/BackgroundBlobs';
import { COLORS, SHADOWS, RADIUS } from '../constants/theme';

export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkThemeEnabled, setDarkThemeEnabled] = useState(false);
  const [hiddenProfileEnabled, setHiddenProfileEnabled] = useState(false);

  const handleClearCache = () => {
    Alert.alert(
      'Управление данными',
      'Очистить локальный кэш симуляций (128 МБ)?',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Очистить кэш',
          style: 'destructive',
          onPress: () => Alert.alert('Успешно', 'Локальный кэш очищен.'),
        },
      ]
    );
  };

  const handleExportData = () => {
    Alert.alert(
      'Экспорт данных',
      'Архив с 3D снимками и историей консультаций подготовлен для отправки на ваш email: umidbabayeff@gmail.com'
    );
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

        <Text style={styles.topTitle}>Настройки</Text>

        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Section 1: Общие переключатели */}
        <Text style={styles.sectionTitle}>Основные параметры</Text>
        <View style={styles.card}>
          {/* Switch 1: Уведомления */}
          <View style={styles.switchRow}>
            <View style={styles.switchLabelCol}>
              <Text style={styles.labelTitle}>Уведомления</Text>
              <Text style={styles.labelDesc}>
                Статусы готовности ИИ и напоминания о консультациях
              </Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#DDD9EC', true: COLORS.primary }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.divider} />

          {/* Switch 2: Темная тема */}
          <View style={styles.switchRow}>
            <View style={styles.switchLabelCol}>
              <Text style={styles.labelTitle}>Темная тема</Text>
              <Text style={styles.labelDesc}>
                Комфортный интерфейс для ночного времени суток
              </Text>
            </View>
            <Switch
              value={darkThemeEnabled}
              onValueChange={setDarkThemeEnabled}
              trackColor={{ false: '#DDD9EC', true: COLORS.primary }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.divider} />

          {/* Switch 3: Скрытый профиль */}
          <View style={styles.switchRow}>
            <View style={styles.switchLabelCol}>
              <Text style={styles.labelTitle}>Скрытый профиль</Text>
              <Text style={styles.labelDesc}>
                Анонимный режим при поиске врачей и клиник
              </Text>
            </View>
            <Switch
              value={hiddenProfileEnabled}
              onValueChange={setHiddenProfileEnabled}
              trackColor={{ false: '#DDD9EC', true: COLORS.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Section 2: Управление данными */}
        <Text style={styles.sectionTitle}>Управление данными</Text>
        <View style={styles.card}>
          <Pressable
            onPress={handleExportData}
            style={({ pressed }) => [styles.actionRow, pressed && styles.actionRowPressed]}
          >
            <View style={[styles.iconBox, { backgroundColor: '#EAF4FE' }]}>
              <Ionicons name="cloud-download-outline" size={20} color="#0984E3" />
            </View>
            <View style={styles.switchLabelCol}>
              <Text style={styles.labelTitle}>Экспорт данных</Text>
              <Text style={styles.labelDesc}>
                Выгрузить все 3D снимки и историю приемов
              </Text>
            </View>
            <Feather name="chevron-right" size={18} color="#9F99B8" />
          </Pressable>

          <View style={styles.divider} />

          <Pressable
            onPress={handleClearCache}
            style={({ pressed }) => [styles.actionRow, pressed && styles.actionRowPressed]}
          >
            <View style={[styles.iconBox, { backgroundColor: '#FFEAEB' }]}>
              <Ionicons name="trash-outline" size={20} color={COLORS.red} />
            </View>
            <View style={styles.switchLabelCol}>
              <Text style={[styles.labelTitle, { color: COLORS.red }]}>
                Очистить локальный кэш
              </Text>
              <Text style={styles.labelDesc}>
                Освободить 128 МБ временных файлов
              </Text>
            </View>
            <Feather name="chevron-right" size={18} color="#9F99B8" />
          </Pressable>
        </View>

        {/* App Version Info */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>AI Doctor Assist v1.0.0 (Expo SDK 58)</Text>
          <Text style={styles.buildText}>Powered by Fal.ai Flux-General Inpainting</Text>
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
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 8,
    marginTop: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.card,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    ...SHADOWS.card,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  actionRowPressed: {
    opacity: 0.7,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  switchLabelCol: {
    flex: 1,
    marginRight: 12,
  },
  labelTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  labelDesc: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
    lineHeight: 16,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  versionText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  buildText: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
  },
});
