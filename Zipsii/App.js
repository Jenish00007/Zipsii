import React, { useState, useEffect, useRef } from 'react';
import { StatusBar, Platform, View } from 'react-native';
import * as Font from 'expo-font';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import FlashMessage from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContainer from './src/routes/routes';
import { colors } from './src/utils/colors';
import { ScheduleProvider } from './src/context/ScheduleContext';
import { AuthProvider } from './src/components/Auth/AuthContext';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

// Configure how notifications are handled when app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState('');

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          // Add your custom fonts here if needed
        });
        setFontLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
        setFontLoaded(true); // Set to true even if font loading fails
      }
    }

    loadFonts();
    registerForPushNotificationsAsync();
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;
    
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
      
      // Store the token in AsyncStorage
      await AsyncStorage.setItem('expoPushToken', token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: colors.brownColor,
      });
    }

    return token;
  }

  if (!fontLoaded) {
    return <View style={{ flex: 1, backgroundColor: colors.headerbackground }} />;
  }

  return (
    <Provider store={store}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.headerbackground}
      />

      <AuthProvider>
        <ScheduleProvider>
          <AppContainer expoPushToken={expoPushToken} />
        </ScheduleProvider>
      </AuthProvider>

      <FlashMessage position="top" />
    </Provider>
  );
}