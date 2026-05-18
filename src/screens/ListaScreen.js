import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppHeader from '../components/AppHeader';
import BotaoPrincipal from '../components/BotaoPrincipal';
import CardRegistro from '../components/CardRegistro';
import {
  ehErroSessaoInvalida,
  listarRegistros,
  mensagemErroParse,
} from '../services/registroService';
import { useAuth } from '../context/AuthContext';
import { mostrarAlerta } from '../utils/alerta';
import { colors, fonts, spacing, typography } from '../theme';

export default function ListaScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { signOut } = useAuth();
  const [itens, setItens] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const irFormulario = () =>
    navigation.getParent()?.navigate('Formulario', { objectId: undefined });

  const carregar = useCallback(async () => {
    try {
      const data = await listarRegistros();
      setItens(data);
    } catch (e) {
      if (ehErroSessaoInvalida(e)) {
        await signOut();
        mostrarAlerta('Sessão expirada', 'Faça login novamente.');
        return;
      }
      mostrarAlerta('Erro', mensagemErroParse(e));
    }
  }, [signOut]);

  useEffect(() => {
    const sub = navigation.addListener('focus', async () => {
      setCarregando(true);
      try {
        await carregar();
      } finally {
        setCarregando(false);
      }
    });
    return sub;
  }, [navigation, carregar]);

  const onRefresh = async () => {
    setRefreshing(true);
    await carregar();
    setRefreshing(false);
  };

  const abrirDetalhes = (item) => navigation.getParent()?.navigate('Detalhes', item);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <AppHeader onMenuPress={() => {}} />
      <View style={styles.cabecalho}>
        <Text style={typography.title}>Suas tarefas</Text>
        <Text style={typography.subtitle}>Ordenadas pela data, da mais recente.</Text>
      </View>

      {carregando ? (
        <View style={styles.central}>
          <ActivityIndicator size="large" color={colors.text} />
        </View>
      ) : (
        <FlatList
          data={itens}
          keyExtractor={(item) => item.objectId}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.text} />
          }
          renderItem={({ item }) => (
            <CardRegistro item={item} onPress={() => abrirDetalhes(item)} />
          )}
          ListEmptyComponent={
            <View style={styles.vazioWrap}>
              <View style={styles.vazioCirculo}>
                <Text style={styles.vazioEmoji}>📝</Text>
              </View>
              <Text style={styles.vazioTitulo}>Nenhuma tarefa ainda.</Text>
              <Text style={styles.vazioSub}>Cadastre a primeira tarefa para começar.</Text>
            </View>
          }
          contentContainerStyle={[
            styles.lista,
            itens.length === 0 && styles.listaVazia,
          ]}
          showsVerticalScrollIndicator={false}
        />
      )}

      <View style={styles.rodape}>
        <BotaoPrincipal titulo="+ Nova tarefa" onPress={irFormulario} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  cabecalho: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  central: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  lista: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  listaVazia: { flexGrow: 1 },
  vazioWrap: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  vazioCirculo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  vazioEmoji: { fontSize: 48 },
  vazioTitulo: {
    fontFamily: fonts.sansBold,
    fontSize: 17,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  vazioSub: {
    fontFamily: fonts.sans,
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  rodape: {
    padding: spacing.lg,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.bg,
  },
});
