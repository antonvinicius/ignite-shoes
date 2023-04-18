import OneSignal from 'react-native-onesignal'

export function tagUserInfoCreate() {
  OneSignal.sendTags({
    'user_name': 'Antônio Vinícius',
    'user_email': 'antoniovrdacosta@gmail.com'
  })
}

export function tagCarUpdate(itemsCount: string) {
  OneSignal.sendTag('cart_items_count', itemsCount)
}