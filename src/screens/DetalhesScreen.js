import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BotaoPrincipal from '../components/BotaoPrincipal';
import Cartao from '../components/Cartao';
import { excluirRegistro, mensagemErroParse, obterRegistroPorId } from '../services/registroService';
import { mostrarAlerta } from '../utils/alerta';
import { dataISOparaBR } from '../utils/dateMask';
import { colors, fonts, radius, spacing, typography } from '../theme';

export default function DetalhesScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const { objectId } = route.params;
  const [item, setItem] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    let ativo = true;
    (async () => {
      try {
        const reg = await obterRegistroPorId(objectId);
        if (ativo) setItem(reg);
      } catch (e) {
        mostrarAlerta('Erro', mensagemErroParse(e), [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } finally {
        if (ativo) setCarregando(false);
      }
    })();
    return () => {
      ativo = false;
    };
  }, [objectId, navigation]);

  const confirmarExcluir = () => {
    mostrarAlerta('Excluir tarefa', 'Deseja realmente excluir este registro?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await excluirRegistro(objectId);
            navigation.navigate('MainTabs', { screen: 'Lista' });
          } catch (e) {
            mostrarAlerta('Erro', mensagemErroParse(e));
          }
        },
      },
    ]);
  };

  if (carregando || !item) {
    return (
      <View style={[styles.central, { paddingTop: insets.top }]}>
        <ActivityIndicator size="large" color={colors.text} />
      </View>
    );
  }

  return (
    <View style={[styles.flex, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.headerBtn}>
          <Text style={styles.headerIcon}>←</Text>
        </Pressable>
        <Text style={typography.brandApp}>Detalhes</Text>
        <View style={styles.headerBtn} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={typography.title}>{item.titulo}</Text>

        <Cartao>
          <Text style={styles.label}>Status</Text>
          <Text style={styles.valor}>{item.status}</Text>
          <View style={styles.divisor} />
          <Text style={styles.label}>Data</Text>
          <Text style={styles.valor}>{dataISOparaBR(item.data)}</Text>
          {item.prioridade ? (
            <>
              <View style={styles.divisor} />
              <Text style={styles.label}>Prioridade</Text>
              <Text style={styles.valor}>{item.prioridade}</Text>
            </>
          ) : null}
          {item.descricao ? (
            <>
              <View style={styles.divisor} />
              <Text style={styles.label}>Descrição</Text>
              <Text style={styles.valor}>{item.descricao}</Text>
            </>
          ) : null}
        </Cartao>

        <BotaoPrincipal
          titulo="Editar"
          onPress={() => navigation.navigate('Formulario', { objectId: item.objectId })}
        />
        <View style={styles.espaco} />
        <BotaoPrincipal titulo="Excluir" onPress={confirmarExcluir} variante="secundario" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.bg },
  central: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  headerBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerIcon: { fontSize: 22, color: colors.text },
  scroll: { padding: spacing.lg, paddingBottom: 48 },
  label: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: 4,
  },
  valor: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 16,
    color: colors.text,
  },
  divisor: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  espaco: { height: spacing.sm },
});
