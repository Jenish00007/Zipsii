import React, { useState, useEffect } from 'react'
import AppContainer from './src/routes/routes'
import * as Notifications from 'expo-notifications'
import { StatusBar, Platform } from 'react-native'
import { colors } from './src/utils/colors'
import * as Font from 'expo-font'
import FlashMessage from 'react-native-flash-message'
import { Spinner } from './src/components'
import { ScheduleProvider } from './src/context/ScheduleContext'

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false)


  useEffect(() => {
    loadAppData()
  }, [])

  async function loadAppData() {

 
    await Font.loadAsync({
      'Poppins-Regular': require('./src/assets/font/Poppins/Poppins-Regular.ttf'),
      'Poppins-Bold': require('./src/assets/font/Poppins/Poppins-Bold.ttf')
    })

    await permissionForPushNotificationsAsync()

    setFontLoaded(true)
  }

  async function permissionForPushNotificationsAsync() {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: colors.brownColor
      })
    }
  }

  if (fontLoaded) {
    return (
      <>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={colors.headerbackground}
        />
      
        
            <ScheduleProvider>
            <AppContainer />
            </ScheduleProvider>
         
       
        <FlashMessage position="top" />
        </>
    )
  } else return <Spinner spinnerColor={colors.spinnerColor} />
}
