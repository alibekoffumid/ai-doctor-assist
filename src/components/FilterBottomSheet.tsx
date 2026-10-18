import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS, RADIUS } from '../constants/theme';

export const SPECIALIZATIONS = [
  'Все',
  'Ринопластика',
  'Маммопластика',
  'Липосакция',
  'Блефаропластика',
  'Подтяжка лица',
];

interface FilterBottomSheetProps {
  visible: boolean;
  selected: string;
  onSelect: (spec: string) => void;
  onClose: () => void;
}

export const FilterBottomSheet: React.FC<FilterBottomSheetProps> = ({
  visible,
  selected,
  onSelect,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            <View style={styles.sheetContainer}>
              {/* Drag Indicator Handle */}
              <View style={styles.handleBar} />

              <View style={styles.header}>
                <Text style={styles.title}>Специализация</Text>
                <Pressable onPress={onClose} hitSlop={12}>
                  <Ionicons name="close" size={22} color={COLORS.textSecondary} />
                </Pressable>
              </View>

              <View style={styles.list}>
                {SPECIALIZATIONS.map((spec) => {
                  const isChosen = selected === spec;
                  return (
                    <Pressable
                      key={spec}
                      onPress={() => {
                        onSelect(spec);
                        onClose();
                      }}
                      style={({ pressed }) => [
                        styles.item,
                        isChosen && styles.itemActive,
                        pressed && { backgroundColor: '#F6F4FD' },
                      ]}
                    >
                      <Text
                        style={[
                          styles.itemText,
                          isChosen && styles.itemTextActive,
                        ]}
                      >
                        {spec}
                      </Text>
                      {isChosen && (
                        <View style={styles.checkCircle}>
                          <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                        </View>
                      )}
                    </Pressable>
                  );
                })}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(22, 19, 42, 0.45)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 12,
    paddingBottom: 36,
    paddingHorizontal: 20,
    ...SHADOWS.floatingBar,
  },
  handleBar: {
    width: 44,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#DDD9EC',
    alignSelf: 'center',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  list: {
    paddingTop: 4,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: RADIUS.medium,
    marginBottom: 4,
  },
  itemActive: {
    backgroundColor: COLORS.primarySoft,
  },
  itemText: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  itemTextActive: {
    fontWeight: '700',
    color: COLORS.primary,
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
