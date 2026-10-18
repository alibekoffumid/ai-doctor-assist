import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  PanResponder,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS, RADIUS } from '../constants/theme';

const { width } = Dimensions.get('window');
const SLIDER_WIDTH = width - 40;
const SLIDER_HEIGHT = SLIDER_WIDTH * 1.22;

export type ViewMode = 'after_only' | 'split' | 'before_only';

interface BeforeAfterSliderProps {
  beforeImage: string | { uri: string };
  afterImage: string | { uri: string };
  viewMode?: ViewMode;
  onViewModeChange?: (mode: ViewMode) => void;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  viewMode: controlledMode,
  onViewModeChange,
}) => {
  const [internalMode, setInternalMode] = useState<ViewMode>('split');
  const mode = controlledMode !== undefined ? controlledMode : internalMode;

  const setMode = (newMode: ViewMode) => {
    if (onViewModeChange) {
      onViewModeChange(newMode);
    } else {
      setInternalMode(newMode);
    }
  };

  const [splitRatio, setSplitRatio] = useState(0.5); // 0.0 to 1.0
  const containerWidthRef = useRef(SLIDER_WIDTH);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => mode === 'split',
      onMoveShouldSetPanResponder: () => mode === 'split',
      onPanResponderGrant: () => {},
      onPanResponderMove: (_, gestureState) => {
        if (mode !== 'split') return;
        const currentW = containerWidthRef.current || SLIDER_WIDTH;
        const newX = gestureState.moveX - 20; // 20px screen margin
        const ratio = Math.max(0.02, Math.min(0.98, newX / currentW));
        setSplitRatio(ratio);
      },
      onPanResponderRelease: () => {},
    })
  ).current;

  const beforeSource = typeof beforeImage === 'string' ? { uri: beforeImage } : beforeImage;
  const afterSource = typeof afterImage === 'string' ? { uri: afterImage } : afterImage;

  const splitPos = splitRatio * SLIDER_WIDTH;

  return (
    <View style={styles.wrapper}>
      {/* View Mode Selector Tabs */}
      <View style={styles.modeTabsContainer}>
        <Pressable
          onPress={() => setMode('after_only')}
          style={[styles.modeTab, mode === 'after_only' && styles.modeTabActive]}
        >
          <Text style={[styles.modeTabText, mode === 'after_only' && styles.modeTabTextActive]}>
            Только ПОСЛЕ
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setMode('split')}
          style={[styles.modeTab, mode === 'split' && styles.modeTabActive]}
        >
          <Text style={[styles.modeTabText, mode === 'split' && styles.modeTabTextActive]}>
            Слайдер До/После
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setMode('before_only')}
          style={[styles.modeTab, mode === 'before_only' && styles.modeTabActive]}
        >
          <Text style={[styles.modeTabText, mode === 'before_only' && styles.modeTabTextActive]}>
            Только ДО
          </Text>
        </Pressable>
      </View>

      {/* Main Image Slider Viewport */}
      <View
        style={styles.imageContainer}
        onLayout={(e) => {
          containerWidthRef.current = e.nativeEvent.layout.width;
        }}
        {...panResponder.panHandlers}
      >
        {mode === 'before_only' && (
          <Image source={beforeSource} style={styles.fullImage} resizeMode="cover" />
        )}

        {mode === 'after_only' && (
          <Image source={afterSource} style={styles.fullImage} resizeMode="cover" />
        )}

        {mode === 'split' && (
          <>
            {/* Base: Before Image */}
            <Image source={beforeSource} style={styles.fullImage} resizeMode="cover" />

            {/* Overlay: After Image Clipped to split position */}
            <View
              style={[
                styles.afterOverlay,
                {
                  left: splitPos,
                  width: SLIDER_WIDTH - splitPos,
                },
              ]}
            >
              <Image
                source={afterSource}
                style={[
                  styles.fullImage,
                  {
                    transform: [{ translateX: -splitPos }],
                    width: SLIDER_WIDTH,
                  },
                ]}
                resizeMode="cover"
              />
            </View>

            {/* Vertical Split Line */}
            <View style={[styles.splitLine, { left: splitPos - 1.5 }]} />

            {/* Circular Drag Handle */}
            <View style={[styles.handle, { left: splitPos - 19 }]}>
              <Ionicons name="chevron-back" size={12} color={COLORS.primary} />
              <Ionicons name="chevron-forward" size={12} color={COLORS.primary} />
            </View>
          </>
        )}

        {/* Labels Floating on corners */}
        <View style={styles.badgeContainer}>
          {(mode === 'split' || mode === 'before_only') && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>ДО</Text>
            </View>
          )}
          <View style={{ flex: 1 }} />
          {(mode === 'split' || mode === 'after_only') && (
            <View style={[styles.badge, styles.badgeAfter]}>
              <Text style={[styles.badgeText, styles.badgeTextAfter]}>ПОСЛЕ (ИИ)</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginVertical: 12,
  },
  modeTabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#EEEDF7',
    borderRadius: 24,
    padding: 3,
    marginBottom: 14,
    width: SLIDER_WIDTH,
  },
  modeTab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
  },
  modeTabActive: {
    backgroundColor: '#FFFFFF',
    ...SHADOWS.card,
    shadowOpacity: 0.08,
  },
  modeTabText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#767090',
  },
  modeTabTextActive: {
    fontWeight: '700',
    color: COLORS.primary,
  },
  imageContainer: {
    width: SLIDER_WIDTH,
    height: SLIDER_HEIGHT,
    borderRadius: RADIUS.card,
    overflow: 'hidden',
    backgroundColor: '#EBE7F5',
    ...SHADOWS.card,
  },
  fullImage: {
    width: SLIDER_WIDTH,
    height: SLIDER_HEIGHT,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  afterOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    overflow: 'hidden',
  },
  splitLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 4,
  },
  handle: {
    position: 'absolute',
    top: '50%',
    marginTop: -19,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.cardHover,
    shadowOpacity: 0.25,
    borderWidth: 2,
    borderColor: '#F0EEFD',
  },
  badgeContainer: {
    position: 'absolute',
    top: 14,
    left: 14,
    right: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    pointerEvents: 'none',
  },
  badge: {
    backgroundColor: 'rgba(26, 21, 46, 0.65)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  badgeAfter: {
    backgroundColor: 'rgba(94, 74, 227, 0.85)',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  badgeTextAfter: {
    color: '#FFFFFF',
  },
});
