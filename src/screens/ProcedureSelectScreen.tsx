import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BackgroundBlobs } from '../components/BackgroundBlobs';
import { FACIAL_ZONES, FacialZone } from '../constants/mockData';
import { COLORS, SHADOWS, RADIUS } from '../constants/theme';

export type IntensityLevel = 'delicate' | 'optimal' | 'expressive';

export const ProcedureSelectScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const initialZone = route.params?.defaultZone || 'nose';
  const [selectedZone, setSelectedZone] = useState<string>(initialZone);
  const [selectedProcedure, setSelectedProcedure] = useState('rhino_bump');
  const [intensity, setIntensity] = useState<IntensityLevel>('optimal');

  const handleStartSimulation = () => {
    // Map selected procedure to preset for Rhinoplasty simulator
    let presetKey = 'remove_bump';
    if (selectedZone === 'nose') {
      presetKey = selectedProcedure === 'rhino_upturned' ? 'upturned_tip' : 'remove_bump';
    } else {
      presetKey = 'straight_bridge';
    }

    navigation.navigate('Rhinoplasty', {
      zoneId: selectedZone,
      procedureId: selectedProcedure,
      intensity,
      presetKey,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <BackgroundBlobs variant="procedure" />

      {/* Top Bar with Back button, Title & Avatar */}
      <View style={styles.topBar}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={({ pressed }) => [styles.backButton, pressed && { opacity: 0.7 }]}
        >
          <Ionicons name="arrow-back" size={20} color="#16132A" />
        </Pressable>

        <Text style={styles.topTitle}>Выбор процедуры</Text>

        <View style={styles.topAvatar}>
          <Text style={styles.topAvatarText}>U</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Subtitle Banner */}
        <Text style={styles.subtitle}>
          Нейросеть точечно изменит геометрию лица по выбранной процедуре
        </Text>

        {/* 8 Facial Zones Card */}
        <View style={styles.zonesCard}>
          <View style={styles.zonesGrid}>
            {FACIAL_ZONES.map((zone) => {
              const isSelected = selectedZone === zone.id;
              return (
                <Pressable
                  key={zone.id}
                  onPress={() => setSelectedZone(zone.id)}
                  style={styles.zoneItem}
                >
                  <View
                    style={[
                      styles.zoneIconCircle,
                      isSelected && styles.zoneIconCircleSelected,
                    ]}
                  >
                    <Ionicons
                      name={zone.iconName as any}
                      size={22}
                      color={isSelected ? COLORS.primary : '#554E77'}
                    />
                    {isSelected && (
                      <View style={styles.checkBadge}>
                        <Ionicons name="checkmark" size={10} color="#FFFFFF" />
                      </View>
                    )}
                  </View>
                  <Text
                    style={[
                      styles.zoneName,
                      isSelected && styles.zoneNameSelected,
                    ]}
                  >
                    {zone.name}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Section: Доступные процедуры */}
        <Text style={styles.sectionHeader}>Доступные процедуры (1)</Text>

        {/* Procedure Card */}
        <View style={styles.procedureCard}>
          <View style={styles.procIconBox}>
            <MaterialCommunityIcons name="ruler-square" size={24} color="#F39C12" />
          </View>

          <View style={styles.procInfoCol}>
            <View style={styles.procTitleRow}>
              <Text style={styles.procTitle}>Углы челюсти (Джоли)</Text>
              <View style={styles.hitBadge}>
                <Text style={styles.hitBadgeText}>Хит</Text>
              </View>
            </View>

            <Text style={styles.procDesc}>
              Чёткий рельеф и контуринг нижней челюсти
            </Text>

            <View style={styles.rehabPill}>
              <Ionicons name="time-outline" size={12} color="#7E7998" style={{ marginRight: 4 }} />
              <Text style={styles.rehabText}>Реабилитация: 1-3 дня</Text>
            </View>
          </View>

          <Pressable
            onPress={() => setSelectedProcedure('jaw_jolie')}
            style={styles.radioButton}
          >
            <View style={styles.radioInnerChecked} />
          </Pressable>
        </View>

        {/* Show all procedures link */}
        <Pressable
          onPress={() => {}}
          style={({ pressed }) => [styles.showAllButton, pressed && { opacity: 0.6 }]}
        >
          <Text style={styles.showAllText}>Показать все процедуры (10)</Text>
        </Pressable>

        {/* Section: Степень коррекции */}
        <View style={styles.correctionHeaderRow}>
          <Ionicons name="options-outline" size={18} color={COLORS.primary} style={{ marginRight: 6 }} />
          <Text style={styles.sectionHeader}>Степень коррекции</Text>
        </View>

        <View style={styles.intensityRow}>
          {/* Option 1: Деликатная */}
          <Pressable
            onPress={() => setIntensity('delicate')}
            style={[
              styles.intensityCard,
              intensity === 'delicate' && styles.intensityCardActive,
            ]}
          >
            <Text
              style={[
                styles.intensityTitle,
                intensity === 'delicate' && styles.intensityTitleActive,
              ]}
            >
              Деликатная
            </Text>
            <Text style={styles.intensityDesc}>Естественный минимальный эффект</Text>
          </Pressable>

          {/* Option 2: Оптимальная */}
          <Pressable
            onPress={() => setIntensity('optimal')}
            style={[
              styles.intensityCard,
              intensity === 'optimal' && styles.intensityCardActive,
            ]}
          >
            <Text
              style={[
                styles.intensityTitle,
                intensity === 'optimal' && styles.intensityTitleActive,
              ]}
            >
              Оптимальная
            </Text>
            <Text style={styles.intensityDesc}>Сбалансированное преображение</Text>
          </Pressable>

          {/* Option 3: Выразительная */}
          <Pressable
            onPress={() => setIntensity('expressive')}
            style={[
              styles.intensityCard,
              intensity === 'expressive' && styles.intensityCardActive,
            ]}
          >
            <Text
              style={[
                styles.intensityTitle,
                intensity === 'expressive' && styles.intensityTitleActive,
              ]}
            >
              Выразительная
            </Text>
            <Text style={styles.intensityDesc}>Максимально заметный результат</Text>
          </Pressable>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Floating Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.selectedRow}>
          <Text style={styles.selectedLabel}>
            Выбрано: <Text style={styles.selectedItemText}>👃 Ринопластика</Text>
          </Text>
        </View>

        <Pressable
          onPress={handleStartSimulation}
          style={({ pressed }) => [styles.startButton, pressed && { opacity: 0.9 }]}
        >
          <Ionicons name="sparkles" size={17} color="#FFFFFF" style={{ marginRight: 6 }} />
          <Text style={styles.startButtonText}>Начать моделирование</Text>
          <Feather name="chevron-right" size={17} color="#FFFFFF" style={{ marginLeft: 4 }} />
        </Pressable>
      </View>
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
  topAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#5E4AE3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topAvatarText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 16,
    lineHeight: 18,
  },
  zonesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.card,
    paddingVertical: 18,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    marginBottom: 20,
    ...SHADOWS.card,
  },
  zonesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    rowGap: 16,
  },
  zoneItem: {
    width: '22%',
    alignItems: 'center',
  },
  zoneIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#F3F2F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    position: 'relative',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  zoneIconCircleSelected: {
    borderColor: COLORS.primary,
    backgroundColor: '#FFFFFF',
    ...SHADOWS.card,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.2,
  },
  checkBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  zoneName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#554E77',
    textAlign: 'center',
  },
  zoneNameSelected: {
    fontWeight: '700',
    color: COLORS.primary,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 10,
  },
  procedureCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.card,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    marginBottom: 10,
    ...SHADOWS.card,
  },
  procIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFF8E7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  procInfoCol: {
    flex: 1,
  },
  procTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  procTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginRight: 6,
  },
  hitBadge: {
    backgroundColor: '#FFF1E0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  hitBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#E67E22',
  },
  procDesc: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 6,
  },
  rehabPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#F3F2F8',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  rehabText: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  radioButton: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  radioInnerChecked: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
  },
  showAllButton: {
    alignItems: 'center',
    paddingVertical: 8,
    marginBottom: 20,
  },
  showAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
  },
  correctionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  intensityRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  intensityCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.medium,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#EFEBF8',
    alignItems: 'center',
    ...SHADOWS.card,
    shadowOpacity: 0.04,
  },
  intensityCardActive: {
    borderColor: COLORS.primary,
    backgroundColor: '#FAF9FF',
  },
  intensityTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
    textAlign: 'center',
  },
  intensityTitleActive: {
    fontWeight: '800',
    color: COLORS.primary,
  },
  intensityDesc: {
    fontSize: 10,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 13,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 28,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
    ...SHADOWS.floatingBar,
  },
  selectedRow: {
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  selectedItemText: {
    fontWeight: '700',
    color: COLORS.primary,
  },
  startButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.button,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
