import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

interface Props {
  variant?: 'mannequin' | 'search' | 'profile' | 'support' | 'procedure';
}

export const BackgroundBlobs: React.FC<Props> = ({ variant = 'mannequin' }) => {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {/* Base warm neutral light canvas */}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: '#FAF8FD' }]} />

      {/* Top Left Peach / Soft Pink Blob */}
      <LinearGradient
        colors={['rgba(255, 192, 184, 0.45)', 'rgba(255, 222, 215, 0.05)']}
        start={{ x: 0.2, y: 0.2 }}
        end={{ x: 0.9, y: 0.9 }}
        style={[
          styles.blob,
          {
            width: width * 0.75,
            height: width * 0.75,
            top: -height * 0.04,
            left: -width * 0.22,
            borderRadius: (width * 0.75) / 2,
          },
        ]}
      />

      {/* Mid Right Lavender / Violet Blob */}
      <LinearGradient
        colors={['rgba(195, 177, 255, 0.35)', 'rgba(230, 222, 255, 0.05)']}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 0.9, y: 0.9 }}
        style={[
          styles.blob,
          {
            width: width * 0.85,
            height: width * 0.85,
            top: height * 0.32,
            right: -width * 0.32,
            borderRadius: (width * 0.85) / 2,
          },
        ]}
      />

      {/* Bottom Left Soft Yellow / Mint Blob */}
      <LinearGradient
        colors={['rgba(255, 238, 198, 0.45)', 'rgba(255, 250, 235, 0.05)']}
        start={{ x: 0.2, y: 0.2 }}
        end={{ x: 0.9, y: 0.9 }}
        style={[
          styles.blob,
          {
            width: width * 0.7,
            height: width * 0.7,
            top: height * 0.54,
            left: -width * 0.18,
            borderRadius: (width * 0.7) / 2,
          },
        ]}
      />

      {/* Lower Right Soft Pink Glow */}
      <LinearGradient
        colors={['rgba(255, 209, 220, 0.3)', 'rgba(255, 235, 240, 0.02)']}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 0.9, y: 0.9 }}
        style={[
          styles.blob,
          {
            width: width * 0.75,
            height: width * 0.75,
            bottom: -height * 0.06,
            right: -width * 0.15,
            borderRadius: (width * 0.75) / 2,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  blob: {
    position: 'absolute',
  },
});
