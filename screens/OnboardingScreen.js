// screens/OnboardingScreen.js
import React, { useEffect } from 'react';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Onboarding from 'react-native-onboarding-swiper';

const OnboardingScreen = ({ navigation }) => {
  const finish = async () => {
    await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    navigation.replace('Login'); // langsung ke Login setelah selesai onboarding
  };

  // Cek dulu kalau perlu reset (hanya untuk tes ulang onboarding, bisa dihapus nanti)
  useEffect(() => {
    // Hanya untuk development/testing: Reset onboarding agar muncul lagi
    // await AsyncStorage.removeItem('hasSeenOnboarding');
  }, []);

  return (
    <Onboarding
      onSkip={finish}
      onDone={finish}
      pages={[
        {
          backgroundColor: '#fff',
          image: (
            <Image
              source={require('../assets/rajaampat.jpg')}
              style={{ width: 250, height: 250, borderRadius: 12 }}
            />
          ),
          title: 'Selamat Datang!',
          subtitle: 'Jelajahi kekayaan Papua Barat.',
        },
        {
          backgroundColor: '#f0f0f0',
          image: (
            <Image
              source={require('../assets/budaya1.jpg')}
              style={{ width: 250, height: 250, borderRadius: 12 }}
            />
          ),
          title: 'Konten Informatif',
          subtitle: 'Budaya, wisata, sejarah dalam genggaman.',
        },
        {
          backgroundColor: '#e0f7fa',
          image: (
            <Image
              source={require('../assets/infrastruktur1.jpg')}
              style={{ width: 250, height: 250, borderRadius: 12 }}
            />
          ),
          title: 'Fitur Modern',
          subtitle: 'Dark mode, galeri, bookmark & offline.',
        },
      ]}
    />
  );
};

export default OnboardingScreen;
