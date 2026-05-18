import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthContext } from '../context/AuthContext';
import '../services/back4appConfig';
import { fazerLogout, restaurarSessaoValida } from '../services/registroService';
import { colors } from '../theme';
import LoginScreen from '../screens/LoginScreen';
import CadastroUsuarioScreen from '../screens/CadastroUsuarioScreen';
import MainTabs from './MainTabs';
import FormularioScreen from '../screens/FormularioScreen';
import DetalhesScreen from '../screens/DetalhesScreen';

const AuthStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bg } }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="CadastroUsuario" component={CadastroUsuarioScreen} />
    </AuthStack.Navigator>
  );
}

function AppNavigatorLogado() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bg } }}>
      <AppStack.Screen name="MainTabs" component={MainTabs} />
      <AppStack.Screen
        name="Formulario"
        component={FormularioScreen}
        options={{ presentation: 'card', animation: 'slide_from_right' }}
      />
      <AppStack.Screen name="Detalhes" component={DetalhesScreen} />
    </AppStack.Navigator>
  );
}

export default function AppNavigator() {
  const [sessionUser, setSessionUser] = useState(undefined);

  useEffect(() => {
    let ativo = true;
    (async () => {
      const u = await restaurarSessaoValida();
      if (ativo) setSessionUser(u ?? null);
    })();
    return () => {
      ativo = false;
    };
  }, []);

  const refreshSession = useCallback(async (usuario) => {
    try {
      if (usuario) {
        await usuario.fetch();
        setSessionUser(usuario);
        return;
      }
      const u = await restaurarSessaoValida();
      setSessionUser(u ?? null);
    } catch {
      await fazerLogout();
      setSessionUser(null);
    }
  }, []);

  const signOut = useCallback(async () => {
    await fazerLogout();
    setSessionUser(null);
  }, []);

  const authValue = useMemo(() => ({ refreshSession, signOut }), [refreshSession, signOut]);

  if (sessionUser === undefined) {
    return (
      <SafeAreaProvider>
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={colors.text} />
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <AuthContext.Provider value={authValue}>
        <NavigationContainer>
          {sessionUser ? <AppNavigatorLogado /> : <AuthNavigator />}
        </NavigationContainer>
      </AuthContext.Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bg,
  },
});
