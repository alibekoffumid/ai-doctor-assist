import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { BackgroundBlobs } from '../components/BackgroundBlobs';
import { DoctorCard } from '../components/DoctorCard';
import { FilterBottomSheet } from '../components/FilterBottomSheet';
import { DOCTORS_DATA, Doctor } from '../constants/mockData';
import { COLORS, SHADOWS, RADIUS } from '../constants/theme';

export const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('Все');
  const [selectedCity, setSelectedCity] = useState<'Все' | 'Москва' | 'Санкт-Петербург' | 'Казань'>('Все');
  const [minRatingOnly, setMinRatingOnly] = useState(false);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const filteredDoctors = useMemo(() => {
    return DOCTORS_DATA.filter((doctor) => {
      // Search text filter
      const matchesSearch =
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.clinic.toLowerCase().includes(searchQuery.toLowerCase());

      // Specialization filter
      const matchesSpec =
        selectedSpecialization === 'Все' ||
        doctor.specialization.toLowerCase() === selectedSpecialization.toLowerCase();

      // City filter
      const matchesCity =
        selectedCity === 'Все' || doctor.city === selectedCity;

      // Rating filter (min 4.9)
      const matchesRating = !minRatingOnly || doctor.rating >= 4.9;

      return matchesSearch && matchesSpec && matchesCity && matchesRating;
    });
  }, [searchQuery, selectedSpecialization, selectedCity, minRatingOnly]);

  const handleCityToggle = () => {
    const cities: ('Все' | 'Москва' | 'Санкт-Петербург' | 'Казань')[] = [
      'Все',
      'Москва',
      'Санкт-Петербург',
      'Казань',
    ];
    const currentIndex = cities.indexOf(selectedCity);
    const nextCity = cities[(currentIndex + 1) % cities.length];
    setSelectedCity(nextCity);
  };

  const handleDoctorPress = (doctor: Doctor) => {
    Alert.alert(
      doctor.name,
      `${doctor.clinic}\nСтаж: ${doctor.experienceYears} лет\nРейтинг: ★ ${doctor.rating}\nСтоимость: ${doctor.price} ₽`,
      [
        { text: 'Закрыть', style: 'cancel' },
        {
          text: 'Записаться на прием',
          onPress: () =>
            Alert.alert(
              'Заявка отправлена',
              `Консультант клиники свяжется с вами для подтверждения времени: ${doctor.availableSlot}`
            ),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <BackgroundBlobs variant="search" />

      {/* Screen Title & Subtitle */}
      <View style={styles.header}>
        <Text style={styles.title}>Поиск хирургов</Text>
        <Text style={styles.subtitle}>Лучшие сертифицированные специалисты</Text>
      </View>

      {/* Search Input Bar */}
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
          <Feather name="search" size={19} color="#7E7998" style={styles.searchIcon} />
          <TextInput
            placeholder="Имя, специализация или клиника"
            placeholderTextColor="#9C96B5"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.input}
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')} hitSlop={10}>
              <Ionicons name="close-circle" size={18} color="#AFA9C5" />
            </Pressable>
          )}
        </View>
      </View>

      {/* Filter Chips Bar */}
      <View style={styles.filterChipsRow}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsScroll}
        >
          {/* Chip 1: Specialization (opens BottomSheet) */}
          <Pressable
            onPress={() => setIsBottomSheetVisible(true)}
            style={[
              styles.chip,
              selectedSpecialization !== 'Все' && styles.chipActive,
            ]}
          >
            <Text
              style={[
                styles.chipText,
                selectedSpecialization !== 'Все' && styles.chipTextActive,
              ]}
            >
              {selectedSpecialization === 'Все'
                ? 'Специализация'
                : selectedSpecialization}
            </Text>
            <Ionicons
              name="chevron-down"
              size={14}
              color={selectedSpecialization !== 'Все' ? COLORS.primary : '#7E7998'}
              style={{ marginLeft: 4 }}
            />
          </Pressable>

          {/* Chip 2: City Toggle */}
          <Pressable
            onPress={handleCityToggle}
            style={[styles.chip, selectedCity !== 'Все' && styles.chipActive]}
          >
            <Ionicons
              name="location-outline"
              size={13}
              color={selectedCity !== 'Все' ? COLORS.primary : '#7E7998'}
              style={{ marginRight: 3 }}
            />
            <Text
              style={[
                styles.chipText,
                selectedCity !== 'Все' && styles.chipTextActive,
              ]}
            >
              {selectedCity === 'Все' ? 'Город' : selectedCity}
            </Text>
          </Pressable>

          {/* Chip 3: High Rating Filter */}
          <Pressable
            onPress={() => setMinRatingOnly(!minRatingOnly)}
            style={[styles.chip, minRatingOnly && styles.chipActive]}
          >
            <Ionicons
              name="star"
              size={13}
              color={minRatingOnly ? COLORS.primary : '#F39C12'}
              style={{ marginRight: 3 }}
            />
            <Text style={[styles.chipText, minRatingOnly && styles.chipTextActive]}>
              Рейтинг 4.9+
            </Text>
          </Pressable>
        </ScrollView>
      </View>

      {/* Doctor Cards List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        <Text style={styles.resultsCount}>
          Найдено специалистов: {filteredDoctors.length}
        </Text>

        {filteredDoctors.map((doc) => (
          <DoctorCard
            key={doc.id}
            doctor={doc}
            onPress={() => handleDoctorPress(doc)}
            onBook={() => handleDoctorPress(doc)}
          />
        ))}

        {/* Bottom padding for floating tab bar */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Specialization BottomSheet Modal */}
      <FilterBottomSheet
        visible={isBottomSheetVisible}
        selected={selectedSpecialization}
        onSelect={setSelectedSpecialization}
        onClose={() => setIsBottomSheetVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF8FD',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 10,
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
  searchBarContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(94, 74, 227, 0.08)',
    ...SHADOWS.card,
    shadowOpacity: 0.05,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textPrimary,
    padding: 0,
  },
  filterChipsRow: {
    marginBottom: 10,
  },
  chipsScroll: {
    paddingHorizontal: 20,
    paddingVertical: 4,
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(94, 74, 227, 0.08)',
    ...SHADOWS.card,
    shadowOpacity: 0.04,
  },
  chipActive: {
    backgroundColor: COLORS.primarySoft,
    borderColor: 'rgba(94, 74, 227, 0.25)',
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#554E77',
  },
  chipTextActive: {
    color: COLORS.primary,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 6,
  },
  resultsCount: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textMuted,
    marginBottom: 12,
    letterSpacing: 0.2,
  },
});
