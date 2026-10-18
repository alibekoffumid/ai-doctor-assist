import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons, Feather } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../constants/theme';

export const FloatingTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View style={styles.floatingContainer}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const renderIcon = () => {
            const color = isFocused ? COLORS.primary : '#7A7593';
            const size = 22;

            switch (route.name) {
              case 'AIDoctor':
                return <Ionicons name="pulse" size={size + 2} color={color} />;
              case 'Search':
                return <Feather name="search" size={size} color={color} />;
              case 'Notifications':
                return <Ionicons name="notifications-outline" size={size} color={color} />;
              case 'Profile':
                return <Feather name="user" size={size} color={color} />;
              default:
                return <Ionicons name="ellipse" size={size} color={color} />;
            }
          };

          const getLabel = () => {
            switch (route.name) {
              case 'AIDoctor':
                return 'AI Doctor';
              case 'Search':
                return 'Поиск';
              case 'Notifications':
                return 'Уведомления';
              case 'Profile':
                return 'Профиль';
              default:
                return route.name;
            }
          };

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[
                styles.tabItem,
                isFocused && styles.tabItemActive,
              ]}
            >
              <View style={styles.iconContainer}>{renderIcon()}</View>
              <Text
                style={[
                  styles.tabLabel,
                  isFocused && styles.tabLabelActive,
                ]}
                numberOfLines={1}
              >
                {getLabel()}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingContainer: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 36,
    paddingVertical: 6,
    paddingHorizontal: 8,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1.2,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    ...SHADOWS.floatingBar,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderRadius: 22,
  },
  tabItemActive: {
    backgroundColor: 'rgba(94, 74, 227, 0.08)',
  },
  iconContainer: {
    marginBottom: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: '#7A7593',
  },
  tabLabelActive: {
    fontWeight: '700',
    color: COLORS.primary,
  },
});
