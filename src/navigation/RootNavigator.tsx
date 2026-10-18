import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabNavigator } from './TabNavigator';
import { ProcedureSelectScreen } from '../screens/ProcedureSelectScreen';
import { RhinoplastyScreen } from '../screens/RhinoplastyScreen';
import { ScanHistoryScreen } from '../screens/ScanHistoryScreen';
import { ConsultationsScreen } from '../screens/ConsultationsScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { SupportScreen } from '../screens/SupportScreen';
import { EditProfileScreen } from '../screens/EditProfileScreen';

export type RootStackParamList = {
  MainTabs: undefined;
  ProcedureSelect: { defaultZone?: string };
  Rhinoplasty: {
    zoneId?: string;
    procedureId?: string;
    intensity?: string;
    presetKey?: string;
  };
  ScanHistory: undefined;
  Consultations: undefined;
  Settings: undefined;
  Support: undefined;
  EditProfile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="ProcedureSelect" component={ProcedureSelectScreen} />
      <Stack.Screen name="Rhinoplasty" component={RhinoplastyScreen} />
      <Stack.Screen name="ScanHistory" component={ScanHistoryScreen} />
      <Stack.Screen name="Consultations" component={ConsultationsScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Support" component={SupportScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
};
