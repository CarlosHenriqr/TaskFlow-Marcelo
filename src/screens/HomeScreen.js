import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AcaoCard from '../components/AcaoCard';
import AppHeader from '../components/AppHeader';
import { nomeExibicaoUsuario } from '../services/registroService';
import { Parse } from '../services/back4appConfig';
import { useAuth } from '../context/AuthContext';
import { colors, fonts, spacing, typography } from '../theme';

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { signOut } = useAuth();
  const user = Parse.User.current();
  const nome = nomeExibicaoUsuario(user);

  const irFormulario = () =>
    navigation.getParent()?.navigate('Formulario', { objectId: undefined });

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <AppHeader onMenuPress={() => {}} />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={typography.display}>OLÁ</Text>
        <Text style={styles.nome} numberOfLines={1}>
          {nome}
        </Text>
        <Text style={[typography.subtitle, styles.intro]}>
          Organize suas tarefas com calma. Escolha uma ação para continuar.
        </Text>

        <AcaoCard
          titulo="Ver minhas tarefas"
          subtitulo="Acesse sua lista atual de prioridades"
          onPress={() => navigation.navigate('Lista')}
          variante="clara"
        />
        <AcaoCard
          titulo="Nova tarefa"
          subtitulo="Capture uma nova ideia ou obrigação"
          onPress={irFormulario}
          variante="escura"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  scroll: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  nome: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 18,
    color: colors.textSecondary,
    marginTop: 4,
    marginBottom: spacing.md,
  },
  intro: { marginBottom: spacing.lg },
  sair: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
    marginTop: spacing.sm,
  },
  sairTexto: {
    fontFamily: fonts.sansMedium,
    fontSize: 15,
    color: colors.link,
  },
});
