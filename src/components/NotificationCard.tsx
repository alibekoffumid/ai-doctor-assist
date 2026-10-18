import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { NotificationItem } from '../constants/mockData';
import { COLORS, SHADOWS, RADIUS } from '../constants/theme';

interface NotificationCardProps {
  notification: NotificationItem;
  onPress: () => void;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onPress,
}) => {
  const getIconConfig = () => {
    switch (notification.type) {
      case 'analysis_done':
        return {
          icon: <Ionicons name="sparkles" size={20} color={COLORS.primary} />,
          bg: COLORS.primarySoft,
        };
      case 'appointment':
        return {
          icon: <Ionicons name="calendar-outline" size={20} color="#2980B9" />,
          bg: '#EAF2F8',
        };
      case 'welcome':
      default:
        return {
          icon: <Ionicons name="notifications-outline" size={20} color="#E67E22" />,
          bg: '#FEF5E7',
        };
    }
  };

  const { icon, bg } = getIconConfig();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
        notification.isUnread && styles.unreadCard,
      ]}
    >
      <View style={[styles.iconContainer, { backgroundColor: bg }]}>
        {icon}
      </View>

      <View style={styles.contentCol}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>
            {notification.title}
          </Text>
          <View style={styles.timeRow}>
            {notification.isUnread && <View style={styles.statusDot} />}
            <Text style={styles.timestamp}>{notification.timestamp}</Text>
          </View>
        </View>

        <Text style={styles.subtitle} numberOfLines={2}>
          {notification.subtitle}
        </Text>

        {notification.zoneTag && (
          <View style={styles.tagPill}>
            <Text style={styles.tagPillText}>Зона: {notification.zoneTag}</Text>
          </View>
        )}
      </View>

      <Feather name="chevron-right" size={16} color={COLORS.textMuted} style={styles.chevron} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.card,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    ...SHADOWS.card,
  },
  cardPressed: {
    transform: [{ scale: 0.99 }],
    backgroundColor: '#FAF9FF',
  },
  unreadCard: {
    borderColor: 'rgba(94, 74, 227, 0.18)',
  },
  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentCol: {
    flex: 1,
    marginLeft: 14,
    marginRight: 6,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
    flex: 1,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginRight: 6,
  },
  timestamp: {
    fontSize: 11,
    fontWeight: '500',
    color: COLORS.textMuted,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  tagPill: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primarySoft,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 6,
  },
  tagPillText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.primary,
  },
  chevron: {
    marginLeft: 4,
  },
});
