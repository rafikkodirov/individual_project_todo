 import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';
import { NativeModules, Platform } from 'react-native';

import en from './locales/en.json'; // Import your locale files
import ru from './locales/ru.json'; // Import your locale files
import es from './locales/es.json'; // Another locale (Spanish)
import vi from './locales/vi.json'; // Another locale Vietnam
 

const i18n = new I18n({
  en: en,
  ru: ru,
  es: es,
  vi: vi
});

 
i18n.locale = "ru" // getLocales()[0].languageCode ?? 'en';

// console.log(i18n.defaultLocale, "Start............................" + Platform.OS);
  

export default i18n;
