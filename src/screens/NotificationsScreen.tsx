import React, { useState } from 'react';
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
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { BackgroundBlobs } from '../components/BackgroundBlobs';
import { NotificationCard } from '../components/NotificationCard';
import { NOTIFICATIONS_DATA, NotificationItem } from '../constants/mockData';
import { COLORS, SHADOWS } from '../constants/theme';

export const NotificationsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [notifications, setNotifications] = useState<NotificationItem[]>(NOTIFICATIONS_DATA);

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((item) => ({ ...item, isUnread: false }))
    );
  };

  const handleNotificationPress = (item: NotificationItem) => {
    // Mark this single item as read
    setNotifications((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, isUnread: false } : n))
    );

    if (item.type === 'analysis_done') {
      navigation.navigate('Rhinoplasty', { presetKey: 'straight_bridge' });
    } else if (item.type === 'appointment') {
      navigation.navigate('Consultations');
    } else {
      Alert.alert(item.title, item.subtitle);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <BackgroundBlobs variant="mannequin" />

      {/* Screen Header */}
      <View style={styles.header}>
        <View style={styles.titleCol}>
          <Text style={styles.title}>Уведомления</Text>
          <Text style={styles.subtitle}>Статусы, записи и результаты</Text>
        </View>

        {/* Action Button: ✓ Прочитано */}
        <Pressable
          onPress={markAllAsRead}
          style={({ pressed }) => [styles.markReadButton, pressed && { opacity: 0.8 }]}
        >
          <Ionicons name="checkmark" size={15} color={COLORS.primary} style={{ marginRight: 3 }} />
          <Text style={styles.markReadText}>Прочитано</Text>
        </Pressable>
      </View>

      {/* Notifications Cards List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {notifications.map((item) => (
          <NotificationCard
            key={item.id}
            notification={item}
            onPress={() => handleNotificationPress(item)}
          />
        ))}

        {/* Bottom padding for floating tab bar */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF8FD',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 14,
  },
  titleCol: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  markReadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(94, 74, 227, 0.12)',
    ...SHADOWS.card,
    shadowOpacity: 0.04,
  },
  markReadText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
});
