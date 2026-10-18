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
  Alert,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { BackgroundBlobs } from '../components/BackgroundBlobs';
import { CONSULTATIONS_DATA, ConsultationItem } from '../constants/mockData';
import { COLORS, SHADOWS, RADIUS } from '../constants/theme';

export const ConsultationsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [consultations, setConsultations] = useState<ConsultationItem[]>(CONSULTATIONS_DATA);

  const handleCancelConsultation = (item: ConsultationItem) => {
    Alert.alert(
      'Отмена консультации',
      `Вы действительно хотите отменить запись к ${item.doctor.name}?`,
      [
        { text: 'Оставить', style: 'cancel' },
        {
          text: 'Отменить запись',
          style: 'destructive',
          onPress: () => {
            setConsultations((prev) =>
              prev.map((c) =>
                c.id === item.id ? { ...c, status: 'cancelled' } : c
              )
            );
          },
        },
      ]
    );
  };

  const handleDetails = (item: ConsultationItem) => {
    Alert.alert(
      item.doctor.name,
      `Формат: ${item.format === 'online' ? 'Онлайн-консультация' : 'Очный прием в клинике'}\nДата: ${item.dateTime}\nКлиника: ${item.doctor.clinic}\nЗаметка: ${item.notes || 'Нет'}`
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <BackgroundBlobs variant="search" />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={({ pressed }) => [styles.backButton, pressed && { opacity: 0.7 }]}
        >
          <Ionicons name="arrow-back" size={20} color="#16132A" />
        </Pressable>

        <Text style={styles.topTitle}>Мои консультации</Text>

        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.subtitle}>
          Запланированные встречи со специалистами и история приемов
        </Text>

        {consultations.map((item) => {
          const isOnline = item.format === 'online';
          const isUpcoming = item.status === 'upcoming';
          const isPending = item.status === 'pending';
          const isCancelled = item.status === 'cancelled';

          return (
            <View key={item.id} style={styles.card}>
              {/* Doctor Row */}
              <View style={styles.doctorRow}>
                <Image source={{ uri: item.doctor.avatarUrl }} style={styles.avatar} />
                <View style={styles.doctorInfo}>
                  <Text style={styles.doctorName}>{item.doctor.name}</Text>
                  <Text style={styles.doctorSpec}>{item.doctor.specialization}</Text>

                  {/* Format Badge: Онлайн (Blue) or Очная (Green) */}
                  <View style={styles.badgeRow}>
                    <View
                      style={[
                        styles.formatBadge,
                        isOnline ? styles.onlineBadge : styles.inPersonBadge,
                      ]}
                    >
                      <Ionicons
                        name={isOnline ? 'videocam-outline' : 'business-outline'}
                        size={12}
                        color={isOnline ? '#0984E3' : COLORS.mintText}
                        style={{ marginRight: 4 }}
                      />
                      <Text
                        style={[
                          styles.formatBadgeText,
                          isOnline ? styles.onlineBadgeText : styles.inPersonBadgeText,
                        ]}
                      >
                        {isOnline ? 'Онлайн' : 'Очная'}
                      </Text>
                    </View>

                    {/* Status Badge */}
                    <View
                      style={[
                        styles.statusBadge,
                        isUpcoming && styles.statusUpcoming,
                        isPending && styles.statusPending,
                        isCancelled && styles.statusCancelled,
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusBadgeText,
                          isUpcoming && styles.statusUpcomingText,
                          isPending && styles.statusPendingText,
                          isCancelled && styles.statusCancelledText,
                        ]}
                      >
                        {isUpcoming
                          ? 'Предстоящая'
                          : isPending
                          ? 'Ожидает подтверждения'
                          : isCancelled
                          ? 'Отменена'
                          : 'Завершена'}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Date & Location block */}
              <View style={styles.metaBlock}>
                <View style={styles.metaRow}>
                  <Ionicons name="time-outline" size={14} color="#7E7998" style={{ marginRight: 6 }} />
                  <Text style={styles.metaText}>{item.dateTime}</Text>
                </View>

                <View style={[styles.metaRow, { marginTop: 4 }]}>
                  <Ionicons name="location-outline" size={14} color="#7E7998" style={{ marginRight: 6 }} />
                  <Text style={styles.metaText} numberOfLines={1}>
                    {item.doctor.clinic}
                  </Text>
                </View>
              </View>

              {/* Action Buttons: Отменить & Детали */}
              {!isCancelled && (
                <View style={styles.actionsRow}>
                  <Pressable
                    onPress={() => handleCancelConsultation(item)}
                    style={({ pressed }) => [styles.cancelBtn, pressed && { opacity: 0.8 }]}
                  >
                    <Text style={styles.cancelBtnText}>Отменить</Text>
                  </Pressable>

                  <Pressable
                    onPress={() => handleDetails(item)}
                    style={({ pressed }) => [styles.detailsBtn, pressed && { opacity: 0.9 }]}
                  >
                    <Text style={styles.detailsBtnText}>Детали</Text>
                  </Pressable>
                </View>
              )}
            </View>
          );
        })}

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
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    ...SHADOWS.card,
  },
  doctorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: '#EBE7F5',
  },
  doctorInfo: {
    flex: 1,
    marginLeft: 14,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  doctorSpec: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 1,
    marginBottom: 6,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  formatBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  onlineBadge: {
    backgroundColor: '#EBF4FE',
  },
  onlineBadgeText: {
    color: '#0984E3',
    fontWeight: '700',
    fontSize: 11,
  },
  inPersonBadge: {
    backgroundColor: '#E6F9F5',
  },
  inPersonBadgeText: {
    color: COLORS.mintText,
    fontWeight: '700',
    fontSize: 11,
  },
  formatBadgeText: {
    fontSize: 11,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  statusUpcoming: {
    backgroundColor: COLORS.primarySoft,
  },
  statusUpcomingText: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: '600',
  },
  statusPending: {
    backgroundColor: '#FFF4E8',
  },
  statusPendingText: {
    color: '#E67E22',
    fontSize: 11,
    fontWeight: '600',
  },
  statusCancelled: {
    backgroundColor: '#FFEAEB',
  },
  statusCancelledText: {
    color: COLORS.red,
    fontSize: 11,
    fontWeight: '600',
  },
  statusBadgeText: {
    fontSize: 11,
  },
  metaBlock: {
    backgroundColor: '#F9F8FD',
    borderRadius: 14,
    padding: 12,
    marginVertical: 12,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: '#F3F2F8',
    paddingVertical: 10,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#767090',
  },
  detailsBtn: {
    flex: 1.2,
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
