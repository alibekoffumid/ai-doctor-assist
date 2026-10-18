import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BackgroundBlobs } from '../components/BackgroundBlobs';
import { BeforeAfterSlider, ViewMode } from '../components/BeforeAfterSlider';
import {
  RHINOPLASTY_PRESETS,
  runFalInference,
  PresetOption,
} from '../services/falInference';
import { COLORS, SHADOWS, RADIUS } from '../constants/theme';

export const RhinoplastyScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const initialPresetKey = route.params?.presetKey || 'remove_bump';
  const [selectedPresetKey, setSelectedPresetKey] = useState<string>(initialPresetKey);
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [isLoading, setIsLoading] = useState(false);
  const [progressStep, setProgressStep] = useState<number>(0);
  const [lastInferenceMs, setLastInferenceMs] = useState<number>(1420);

  const currentPreset: PresetOption =
    RHINOPLASTY_PRESETS[selectedPresetKey] || RHINOPLASTY_PRESETS.remove_bump;

  const [currentBefore, setCurrentBefore] = useState(currentPreset.sampleBefore);
  const [currentAfter, setCurrentAfter] = useState(currentPreset.sampleAfter);

  const handleSelectPreset = (key: string) => {
    setSelectedPresetKey(key);
    const p = RHINOPLASTY_PRESETS[key];
    if (p) {
      setCurrentBefore(p.sampleBefore);
      setCurrentAfter(p.sampleAfter);
    }
  };

  const handleRunInference = async () => {
    setIsLoading(true);
    setProgressStep(1);

    // Step simulation ticker
    const timer = setInterval(() => {
      setProgressStep((prev) => (prev < 14 ? prev + 1 : 14));
    }, 90);

    try {
      const result = await runFalInference({
        presetKey: selectedPresetKey,
        inputImageUri: currentBefore,
      });

      clearInterval(timer);
      setCurrentBefore(result.beforeUrl);
      setCurrentAfter(result.afterUrl);
      setLastInferenceMs(result.inferenceTimeMs);
    } catch (err) {
      Alert.alert('Ошибка симуляции', 'Не удалось связаться с сервером инференса.');
    } finally {
      clearInterval(timer);
      setIsLoading(false);
      setProgressStep(0);
    }
  };

  const handleSaveToHistory = () => {
    Alert.alert(
      'Сохранено в историю',
      `Моделирование «${currentPreset.title}» успешно сохранено в вашем профиле.`
    );
  };

  const handleBookConsultation = () => {
    navigation.navigate('Search');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <BackgroundBlobs variant="mannequin" />

      {/* Top Header */}
      <View style={styles.topBar}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={({ pressed }) => [styles.backButton, pressed && { opacity: 0.7 }]}
        >
          <Ionicons name="arrow-back" size={20} color="#16132A" />
        </Pressable>

        <Text style={styles.topTitle}>AI Ринопластика</Text>

        <Pressable
          onPress={() =>
            Alert.alert(
              'О моделировании',
              'Используется нейросеть fal-ai/flux-general/inpainting с шагами инференса 14, шкалой подсказки 8.5 и анатомической маской носа.'
            )
          }
          style={styles.infoButton}
        >
          <Ionicons name="information-circle-outline" size={22} color={COLORS.primary} />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Interactive Before/After Splitter */}
        <BeforeAfterSlider
          beforeImage={currentBefore}
          afterImage={currentAfter}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* Inference Status / Time badge */}
        <View style={styles.inferenceStatusRow}>
          <View style={styles.techTag}>
            <Ionicons name="hardware-chip-outline" size={13} color={COLORS.primary} style={{ marginRight: 4 }} />
            <Text style={styles.techTagText}>FLUX.1 Inpainting</Text>
          </View>

          <View style={styles.techTag}>
            <Ionicons name="speedometer-outline" size={13} color={COLORS.mintText} style={{ marginRight: 4 }} />
            <Text style={styles.techTagText}>{lastInferenceMs} ms</Text>
          </View>

          <View style={styles.techTag}>
            <Ionicons name="sparkles-outline" size={13} color="#E67E22" style={{ marginRight: 4 }} />
            <Text style={styles.techTagText}>14 steps / 8.5 cfg</Text>
          </View>
        </View>

        {/* Preset Shapes Section */}
        <Text style={styles.sectionTitle}>Пресеты формы носа</Text>

        <View style={styles.presetsContainer}>
          {Object.entries(RHINOPLASTY_PRESETS).map(([key, item]) => {
            const isSelected = selectedPresetKey === key;
            return (
              <Pressable
                key={key}
                onPress={() => handleSelectPreset(key)}
                style={({ pressed }) => [
                  styles.presetCard,
                  isSelected && styles.presetCardActive,
                  pressed && { opacity: 0.85 },
                ]}
              >
                <View style={styles.presetHeader}>
                  <Text
                    style={[
                      styles.presetTitle,
                      isSelected && styles.presetTitleActive,
                    ]}
                  >
                    {item.title}
                  </Text>
                  {isSelected && (
                    <Ionicons name="checkmark-circle" size={18} color={COLORS.primary} />
                  )}
                </View>

                <Text style={styles.presetDescription}>{item.description}</Text>
              </Pressable>
            );
          })}
        </View>

        {/* Run Simulation Button */}
        <Pressable
          onPress={handleRunInference}
          disabled={isLoading}
          style={({ pressed }) => [
            styles.runButton,
            isLoading && styles.runButtonDisabled,
            pressed && { opacity: 0.9 },
          ]}
        >
          {isLoading ? (
            <View style={styles.loadingRow}>
              <ActivityIndicator color="#FFFFFF" size="small" style={{ marginRight: 8 }} />
              <Text style={styles.runButtonText}>
                Инференс FLUX... ({progressStep}/14)
              </Text>
            </View>
          ) : (
            <View style={styles.loadingRow}>
              <Ionicons name="color-wand" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={styles.runButtonText}>Смоделировать заново</Text>
            </View>
          )}
        </Pressable>

        {/* Secondary Action Buttons */}
        <View style={styles.actionButtonsRow}>
          <Pressable
            onPress={handleSaveToHistory}
            style={({ pressed }) => [styles.secondaryBtn, pressed && { opacity: 0.8 }]}
          >
            <Ionicons name="bookmark-outline" size={17} color={COLORS.primary} style={{ marginRight: 6 }} />
            <Text style={styles.secondaryBtnText}>В историю</Text>
          </Pressable>

          <Pressable
            onPress={handleBookConsultation}
            style={({ pressed }) => [styles.primaryActionBtn, pressed && { opacity: 0.9 }]}
          >
            <Ionicons name="calendar-outline" size={17} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={styles.primaryActionBtnText}>Найти хирурга</Text>
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
  infoButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  inferenceStatusRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginVertical: 10,
  },
  techTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(94, 74, 227, 0.08)',
    ...SHADOWS.card,
    shadowOpacity: 0.04,
  },
  techTagText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: 16,
    marginBottom: 10,
  },
  presetsContainer: {
    gap: 8,
    marginBottom: 16,
  },
  presetCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.medium,
    padding: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(94, 74, 227, 0.08)',
    ...SHADOWS.card,
    shadowOpacity: 0.04,
  },
  presetCardActive: {
    borderColor: COLORS.primary,
    backgroundColor: '#FAF9FF',
  },
  presetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  presetTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  presetTitleActive: {
    fontWeight: '800',
    color: COLORS.primary,
  },
  presetDescription: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 16,
  },
  runButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    ...SHADOWS.button,
  },
  runButtonDisabled: {
    backgroundColor: '#A296EB',
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  runButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  secondaryBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 13,
    borderRadius: 18,
    borderWidth: 1.2,
    borderColor: 'rgba(94, 74, 227, 0.2)',
    ...SHADOWS.card,
    shadowOpacity: 0.04,
  },
  secondaryBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
  primaryActionBtn: {
    flex: 1.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primaryDark,
    paddingVertical: 13,
    borderRadius: 18,
    ...SHADOWS.card,
    shadowOpacity: 0.15,
  },
  primaryActionBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
