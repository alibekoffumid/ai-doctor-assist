import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BackgroundBlobs } from '../components/BackgroundBlobs';
import { AnatomicalTag } from '../components/AnatomicalTag';
import { GenderSelector, Gender } from '../components/GenderSelector';
import { COLORS } from '../constants/theme';

const { width, height } = Dimensions.get('window');

export const AIDoctorScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [selectedGender, setSelectedGender] = useState<Gender>('female');

  const femaleImage = require('../../assets/images/female_mannequin.jpg');
  const maleImage = require('../../assets/images/male_mannequin.jpg');

  const handleHeadPress = () => {
    // Navigate to procedure selection screen (or directly to rhinoplasty simulator)
    navigation.navigate('ProcedureSelect', { defaultZone: 'nose' });
  };

  const handleChestPress = () => {
    navigation.navigate('ProcedureSelect', { defaultZone: 'brows' });
  };

  const handleWaistPress = () => {
    navigation.navigate('ProcedureSelect', { defaultZone: 'jaw' });
  };

  const handleArmsPress = () => {
    navigation.navigate('ProcedureSelect', { defaultZone: 'volume' });
  };

  const handleLegsPress = () => {
    navigation.navigate('ProcedureSelect', { defaultZone: 'chin' });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <BackgroundBlobs variant="mannequin" />

      {/* Screen Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AI Doctor Assist</Text>
      </View>

      {/* Center Zone with 3D Mannequin & Anatomical Tags */}
      <View style={styles.mannequinContainer}>
        <Image
          source={selectedGender === 'female' ? femaleImage : maleImage}
          style={styles.mannequinImage}
          resizeMode="contain"
        />

        {/* Anatomical Tag 1: Голова > */}
        <View style={styles.tagHead}>
          <AnatomicalTag
            label="Голова"
            iconName="person-outline"
            onPress={handleHeadPress}
          />
        </View>

        {/* Anatomical Tag 2: Грудь > */}
        <View style={styles.tagChest}>
          <AnatomicalTag
            label="Грудь"
            iconName="heart-outline"
            onPress={handleChestPress}
          />
        </View>

        {/* Anatomical Tag 3: Талия > */}
        <View style={styles.tagWaist}>
          <AnatomicalTag
            label="Талия"
            iconName="body-outline"
            onPress={handleWaistPress}
          />
        </View>

        {/* Anatomical Tag 4: Руки > */}
        <View style={styles.tagArms}>
          <AnatomicalTag
            label="Руки"
            iconName="hand-right-outline"
            onPress={handleArmsPress}
          />
        </View>

        {/* Anatomical Tag 5: Ноги > */}
        <View style={styles.tagLegs}>
          <AnatomicalTag
            label="Ноги"
            iconName="footsteps-outline"
            onPress={handleLegsPress}
          />
        </View>
      </View>

      {/* Gender Segmented Control at Bottom */}
      <View style={styles.genderControlWrapper}>
        <GenderSelector
          selectedGender={selectedGender}
          onSelectGender={setSelectedGender}
        />
      </View>

      {/* Spacing for floating bottom bar */}
      <View style={styles.bottomSpacer} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF8FD',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 16,
    paddingBottom: 8,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#16132A',
    letterSpacing: -0.4,
  },
  mannequinContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginTop: 4,
  },
  mannequinImage: {
    width: width * 0.95,
    height: height * 0.68,
  },
  tagHead: {
    position: 'absolute',
    top: '18%',
    left: '6%',
    zIndex: 20,
  },
  tagChest: {
    position: 'absolute',
    top: '32%',
    right: '6%',
    zIndex: 20,
  },
  tagWaist: {
    position: 'absolute',
    top: '43%',
    left: '6%',
    zIndex: 20,
  },
  tagArms: {
    position: 'absolute',
    top: '48%',
    right: '5%',
    zIndex: 20,
  },
  tagLegs: {
    position: 'absolute',
    top: '59%',
    left: '8%',
    zIndex: 20,
  },
  genderControlWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 88, // sits right above floating bottom tab bar
    zIndex: 20,
  },
  bottomSpacer: {
    height: 10,
  },
});
