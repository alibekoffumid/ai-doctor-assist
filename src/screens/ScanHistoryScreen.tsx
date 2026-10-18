import React from 'react';
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
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { BackgroundBlobs } from '../components/BackgroundBlobs';
import { SCAN_HISTORY_DATA, ScanRecord } from '../constants/mockData';
import { COLORS, SHADOWS, RADIUS } from '../constants/theme';

export const ScanHistoryScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const handleScanPress = (scan: ScanRecord) => {
    navigation.navigate('Rhinoplasty', {
      presetKey: scan.id === 'scan-1' ? 'straight_bridge' : 'remove_bump',
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <BackgroundBlobs variant="mannequin" />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={({ pressed }) => [styles.backButton, pressed && { opacity: 0.7 }]}
        >
          <Ionicons name="arrow-back" size={20} color="#16132A" />
        </Pressable>

        <Text style={styles.topTitle}>История сканирований</Text>

        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.subtitle}>
          Сохраненные результаты 3D моделирования и расчет совпадения с анатомией
        </Text>

        {SCAN_HISTORY_DATA.map((scan) => (
          <Pressable
            key={scan.id}
            onPress={() => handleScanPress(scan)}
            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
          >
            <View style={styles.iconCircle}>
              <Ionicons name={scan.iconName as any} size={22} color={COLORS.primary} />
            </View>

            <View style={styles.infoCol}>
              <Text style={styles.procedureName}>
                {scan.procedureName}{' '}
                <Text style={styles.subType}>({scan.subType})</Text>
              </Text>
              <Text style={styles.dateText}>{scan.date}</Text>
            </View>

            {/* Match Badge */}
            <View style={styles.matchBadge}>
              <Text style={styles.matchBadgeText}>✨ {scan.matchScore}%</Text>
            </View>

            <Feather name="chevron-right" size={16} color={COLORS.textMuted} style={styles.chevron} />
          </Pressable>
        ))}

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
  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 16,
    lineHeight: 18,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.card,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    ...SHADOWS.card,
  },
  cardPressed: {
    backgroundColor: '#FAF9FF',
    transform: [{ scale: 0.99 }],
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: COLORS.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  infoCol: {
    flex: 1,
  },
  procedureName: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  subType: {
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  dateText: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  matchBadge: {
    backgroundColor: '#EAF9F5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    marginRight: 8,
  },
  matchBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.mintText,
  },
  chevron: {
    marginLeft: 2,
  },
});
