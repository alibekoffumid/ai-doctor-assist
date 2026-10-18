import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { COLORS, SHADOWS } from '../constants/theme';

export type Gender = 'male' | 'female';

interface GenderSelectorProps {
  selectedGender: Gender;
  onSelectGender: (gender: Gender) => void;
}

export const GenderSelector: React.FC<GenderSelectorProps> = ({
  selectedGender,
  onSelectGender,
}) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => onSelectGender('male')}
        style={[
          styles.segmentButton,
          selectedGender === 'male' && styles.segmentButtonActive,
        ]}
      >
        <Text
          style={[
            styles.segmentText,
            selectedGender === 'male' && styles.segmentTextActive,
          ]}
        >
          Мужчина
        </Text>
      </Pressable>

      <Pressable
        onPress={() => onSelectGender('female')}
        style={[
          styles.segmentButton,
          selectedGender === 'female' && styles.segmentButtonActive,
        ]}
      >
        <Text
          style={[
            styles.segmentText,
            selectedGender === 'female' && styles.segmentTextActive,
          ]}
        >
          Женщина
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(240, 238, 248, 0.7)',
    borderRadius: 30,
    padding: 4,
    width: 250,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.7)',
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentButtonActive: {
    backgroundColor: '#FFFFFF',
    ...SHADOWS.card,
    shadowOpacity: 0.08,
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#767090',
  },
  segmentTextActive: {
    fontWeight: '700',
    color: COLORS.primary,
  },
});
