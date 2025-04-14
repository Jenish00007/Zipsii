import React, { useState, useEffect, useRef } from 'react';
import { StatusBar, Platform } from 'react-native';
import * as Font from 'expo-font';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import FlashMessage from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContainer from './src/routes/routes';
import { colors } from './src/utils/colors';
import { Spinner } from './src/components';
import { ScheduleProvider } from './src/context/ScheduleContext';
import { AuthProvider } from './src/components/Auth/AuthContext';

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
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    loadAppData();
    
    // Set up notification listeners
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      // Handle notification received while app is in foreground
      console.log('Notification received:', notification);
      // You can show a custom alert or update UI here
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      // Handle user tapping on a notification
      console.log('Notification response:', response);
      // You can navigate to specific screens based on notification data
      const data = response.notification.request.content.data;
      if (data) {
        // Handle navigation based on notification data
        console.log('Notification data:', data);
      }
    });

    return () => {
      // Clean up listeners on unmount
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function loadAppData() {
    // Load custom fonts
    await Font.loadAsync({
      'Poppins-Regular': require('./src/assets/font/Poppins/Poppins-Regular.ttf'),
      'Poppins-Bold': require('./src/assets/font/Poppins/Poppins-Bold.ttf'),
    });

    // Request permissions and get push token
    await registerForPushNotificationsAsync().then(token => {
      setExpoPushToken(token);
      console.log('Expo push token:', token);
      // You might want to send this token to your backend server here
    });

    setFontLoaded(true);
  }

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
    return <Spinner spinnerColor={colors.spinnerColor} />;
  }

  return (
    <>
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
    </>
  );
}