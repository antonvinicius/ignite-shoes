import { useTheme } from 'native-base';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import OneSignal, { NotificationReceivedEvent, OSNotification } from 'react-native-onesignal';
import * as Linking from 'expo-linking'

import { AppRoutes } from './app.routes';

import { Notification } from '../components/Notification';
import { useEffect, useState } from 'react';

const linking = {
  prefixes: ['igniteshoesapp://', 'com.antonvinicius.igniteshoes://'],
  config: {
    screens: {
      details: {
        path: 'details/:productId',
        parse: {
          productId: (productId: string) => productId
        }
      },
      cart: {
        path: 'cart/'
      }
    }
  }
}

export function Routes() {
  const [notification, setNotification] = useState<OSNotification | null>(null)

  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  useEffect(() => {
    const unsubscribe = OneSignal
      .setNotificationWillShowInForegroundHandler((notificationReceivedEvent: NotificationReceivedEvent) => {
        const response = notificationReceivedEvent.getNotification()
        setNotification(response)
      })

    return () => unsubscribe
  }, [])

  return (
    <NavigationContainer theme={theme} linking={linking}>
      <AppRoutes />

      {notification && <Notification
        data={notification}
        onClose={() => setNotification(null)}
      />}
    </NavigationContainer>
  );
}