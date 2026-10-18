import React from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Doctor } from '../constants/mockData';
import { COLORS, SHADOWS, RADIUS } from '../constants/theme';

interface DoctorCardProps {
  doctor: Doctor;
  onPress: () => void;
  onBook?: () => void;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onPress, onBook }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.topRow}>
        <Image source={{ uri: doctor.avatarUrl }} style={styles.avatar} />
        <View style={styles.infoCol}>
          <Text style={styles.name} numberOfLines={1}>
            {doctor.name}
          </Text>

          {/* Badges: Specialization & Experience */}
          <View style={styles.badgesRow}>
            <View style={styles.specBadge}>
              <Text style={styles.specBadgeText}>{doctor.specialization}</Text>
            </View>
            <View style={styles.expBadge}>
              <Text style={styles.expBadgeText}>{doctor.experienceYears} лет стажа</Text>
            </View>
          </View>

          {/* Rating and City */}
          <View style={styles.metaRow}>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={13} color="#F39C12" style={styles.starIcon} />
              <Text style={styles.ratingText}>
                {doctor.rating.toFixed(1)}{' '}
                <Text style={styles.reviewsText}>({doctor.reviewsCount})</Text>
              </Text>
            </View>

            <View style={styles.dotSeparator} />

            <View style={styles.cityBadge}>
              <Ionicons name="location-outline" size={13} color={COLORS.textSecondary} />
              <Text style={styles.cityText}>{doctor.city}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Clinic Name and Price / Booking */}
      <View style={styles.bottomRow}>
        <View style={styles.clinicCol}>
          <Text style={styles.clinicName} numberOfLines={1}>
            {doctor.clinic}
          </Text>
          <Text style={styles.slotText}>Ближайший слот: {doctor.availableSlot}</Text>
        </View>

        <Pressable
          onPress={onBook || onPress}
          style={({ pressed }) => [styles.bookButton, pressed && { opacity: 0.85 }]}
        >
          <Text style={styles.bookButtonText}>Запись</Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.card,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    ...SHADOWS.card,
  },
  cardPressed: {
    transform: [{ scale: 0.99 }],
    backgroundColor: '#FAF9FF',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: '#EBE7F5',
  },
  infoCol: {
    flex: 1,
    marginLeft: 14,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 6,
  },
  specBadge: {
    backgroundColor: COLORS.primarySoft,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  specBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.primary,
  },
  expBadge: {
    backgroundColor: '#F3F2F8',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  expBadgeText: {
    fontSize: 11,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    marginRight: 3,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  reviewsText: {
    fontWeight: '400',
    color: COLORS.textMuted,
  },
  dotSeparator: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#CBC6DC',
    marginHorizontal: 8,
  },
  cityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cityText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginLeft: 2,
  },
  bottomRow: {
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  clinicCol: {
    flex: 1,
    marginRight: 10,
  },
  clinicName: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  slotText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.mintText,
    marginTop: 2,
  },
  bookButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
