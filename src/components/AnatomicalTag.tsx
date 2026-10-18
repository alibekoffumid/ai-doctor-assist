import React from 'react';
import { StyleSheet, Text, Pressable, View } from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { SHADOWS } from '../constants/theme';

export interface AnatomicalTagProps {
  label: string;
  iconName: string;
  iconFamily?: 'Ionicons' | 'Feather' | 'MaterialCommunityIcons';
  onPress: () => void;
  style?: any;
  showPointerDot?: boolean;
  pointerSide?: 'left' | 'right';
}

export const AnatomicalTag: React.FC<AnatomicalTagProps> = ({
  label,
  iconName,
  iconFamily = 'Ionicons',
  onPress,
  style,
  showPointerDot = false,
  pointerSide = 'right',
}) => {
  const renderIcon = () => {
    const color = '#3A3459';
    const size = 15;
    if (iconFamily === 'Feather') {
      return <Feather name={iconName as any} size={size} color={color} />;
    }
    if (iconFamily === 'MaterialCommunityIcons') {
      return <MaterialCommunityIcons name={iconName as any} size={size} color={color} />;
    }
    return <Ionicons name={iconName as any} size={size} color={color} />;
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
        style,
      ]}
    >
      <View style={styles.content}>
        <View style={styles.iconWrapper}>{renderIcon()}</View>
        <Text style={styles.label}>{label}</Text>
        <Feather name="chevron-right" size={14} color="#554E77" style={styles.chevron} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.72)',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 22,
    borderWidth: 1.2,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    ...SHADOWS.tag,
  },
  pressed: {
    transform: [{ scale: 0.96 }],
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    marginRight: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#282342',
    letterSpacing: -0.2,
  },
  chevron: {
    marginLeft: 4,
  },
});
