import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from 'parse/react-native';

const PARSE_APP_ID = process.env.EXPO_PUBLIC_BACK4APP_APP_ID ?? '';
const PARSE_JS_KEY = process.env.EXPO_PUBLIC_BACK4APP_JS_KEY ?? '';
const PARSE_SERVER_URL =
  process.env.EXPO_PUBLIC_BACK4APP_SERVER_URL ?? 'https://parseapi.back4app.com';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize(PARSE_APP_ID, PARSE_JS_KEY);
Parse.serverURL = PARSE_SERVER_URL;

export function back4appConfigurado() {
  return Boolean(PARSE_APP_ID.trim() && PARSE_JS_KEY.trim());
}

export { Parse, PARSE_APP_ID, PARSE_JS_KEY, PARSE_SERVER_URL };
