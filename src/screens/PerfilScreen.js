import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppHeader from '../components/AppHeader';
import BotaoPrincipal from '../components/BotaoPrincipal';
import Cartao from '../components/Cartao';
import { Parse } from '../services/back4appConfig';
import { nomeExibicaoUsuario } from '../services/registroService';
import { useAuth } from '../context/AuthContext';
import { colors, fonts, spacing, typography } from '../theme';

export default function PerfilScreen() {
  const insets = useSafeAreaInsets();
  const { signOut } = useAuth();
  const user = Parse.User.current();
  const nome = nomeExibicaoUsuario(user);
  const email = user?.get('email') || '';

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <AppHeader onMenuPress={() => {}} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={typography.title}>Perfil</Text>
        <Cartao>
          <Text style={styles.label}>Nome</Text>
          <Text style={styles.valor}>{nome}</Text>
          <View style={styles.divisor} />
          <Text style={styles.label}>E-mail de login</Text>
          <Text style={styles.valor}>{email}</Text>
        </Cartao>
        <BotaoPrincipal titulo="Sair da conta" onPress={signOut} variante="secundario" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  scroll: { padding: spacing.lg, paddingBottom: 120 },
  label: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: 4,
  },
  valor: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 17,
    color: colors.text,
  },
  divisor: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
});
