import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarCustom from '../components/TabBarCustom';
import HomeScreen from '../screens/HomeScreen';
import ListaScreen from '../screens/ListaScreen';
import PerfilScreen from '../screens/PerfilScreen';

const Tab = createBottomTabNavigator();

/** Aba "Nova" não tem tela — o TabBar navega para Formulario no stack pai. */
function TelaNovaPlaceholder() {
  return null;
}

export default function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBarCustom {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Lista" component={ListaScreen} />
      <Tab.Screen name="Nova" component={TelaNovaPlaceholder} options={{ title: 'Nova' }} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}
