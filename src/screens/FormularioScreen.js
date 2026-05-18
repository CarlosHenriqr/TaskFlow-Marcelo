import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BotaoPrincipal from '../components/BotaoPrincipal';
import CampoData from '../components/CampoData';
import CampoTexto from '../components/CampoTexto';
import Cartao from '../components/Cartao';
import SeletorOpcoes from '../components/SeletorOpcoes';
import {
  atualizarRegistro,
  criarRegistro,
  mensagemErroParse,
  obterRegistroPorId,
} from '../services/registroService';
import { dataISOParaDate, dateParaISO } from '../utils/dateMask';
import { mostrarAlerta } from '../utils/alerta';
import { colors, fonts, spacing, typography } from '../theme';

const STATUS_OPCOES = [
  { id: 'Pendente', rotulo: 'Pendente', icone: '◉' },
  { id: 'Em andamento', rotulo: 'Em andamento', icone: '↻' },
  { id: 'Concluída', rotulo: 'Concluída', icone: '✓' },
];

const PRIORIDADE_OPCOES = [
  { id: 'Baixa', rotulo: 'Baixa', icone: '↓' },
  { id: 'Média', rotulo: 'Média', icone: '=' },
  { id: 'Alta', rotulo: 'Alta', icone: '↑' },
];

export default function FormularioScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const objectId = route.params?.objectId;
  const modoEdicao = Boolean(objectId);

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataTarefa, setDataTarefa] = useState(new Date());
  const [status, setStatus] = useState('Pendente');
  const [prioridade, setPrioridade] = useState('');
  const [carregando, setCarregando] = useState(modoEdicao);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (!modoEdicao) return;
    let ativo = true;
    (async () => {
      try {
        const reg = await obterRegistroPorId(objectId);
        if (!ativo) return;
        setTitulo(reg.titulo);
        setDescricao(reg.descricao || '');
        setDataTarefa(dataISOParaDate(reg.data));
        setStatus(reg.status || 'Pendente');
        setPrioridade(reg.prioridade || '');
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
  }, [modoEdicao, objectId, navigation]);

  const validar = () => {
    if (!titulo.trim()) {
      mostrarAlerta('Validação', 'O título é obrigatório.');
      return false;
    }
    return true;
  };

  const salvar = async () => {
    if (salvando) return;
    if (!validar()) return;
    const iso = dateParaISO(dataTarefa);
    if (!iso) {
      mostrarAlerta('Validação', 'Selecione uma data válida.');
      return;
    }
    setSalvando(true);
    try {
      const payload = { titulo, descricao, data: iso, status, prioridade };
      if (modoEdicao) {
        await atualizarRegistro(objectId, payload);
      } else {
        await criarRegistro(payload);
      }
      navigation.goBack();
    } catch (e) {
      mostrarAlerta('Erro', mensagemErroParse(e));
    } finally {
      setSalvando(false);
    }
  };

  if (carregando) {
    return (
      <View style={[styles.central, { paddingTop: insets.top }]}>
        <ActivityIndicator size="large" color={colors.text} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { paddingTop: insets.top }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.headerBtn}>
          <Text style={styles.headerIcon}>✕</Text>
        </Pressable>
        <Text style={styles.headerTitulo}>{modoEdicao ? 'Editar Tarefa' : 'Nova Tarefa'}</Text>
        <Pressable style={styles.headerBtn}>
          <Text style={styles.headerIcon}>⋮</Text>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Cartao>
          <CampoTexto
            label="Título da Tarefa"
            value={titulo}
            onChangeText={setTitulo}
            obrigatorio
            placeholder="Ex: Revisar relatório financeiro"
          />
          <CampoTexto
            label="Descrição"
            value={descricao}
            onChangeText={setDescricao}
            multiline
            mostrarOpcional
            placeholder="Adicione detalhes sobre a tarefa..."
          />
          <CampoData
            label="Data de Vencimento"
            valor={dataTarefa}
            onChange={setDataTarefa}
            obrigatorio
          />
        </Cartao>

        <Cartao>
          <SeletorOpcoes
            label="Status"
            opcoes={STATUS_OPCOES}
            valor={status}
            onChange={setStatus}
            obrigatorio
            estiloStatus
          />
          <View style={styles.divisor} />
          <SeletorOpcoes
            label="Prioridade"
            opcoes={PRIORIDADE_OPCOES}
            valor={prioridade}
            onChange={setPrioridade}
            permitirNenhum
            rotuloNenhum="Sem prioridade"
          />
        </Cartao>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        <View style={styles.footerRow}>
          <View style={styles.footerBtn}>
            <BotaoPrincipal
              titulo="Cancelar"
              onPress={() => navigation.goBack()}
              variante="secundario"
            />
          </View>
          <View style={styles.footerBtn}>
            <BotaoPrincipal
              titulo="Salvar Tarefa"
              onPress={salvar}
              carregando={salvando}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
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
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.bg,
  },
  headerBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: { fontSize: 22, color: colors.text },
  headerTitulo: {
    fontFamily: fonts.serif,
    fontSize: 20,
    color: colors.text,
  },
  scroll: {
    padding: spacing.lg,
    paddingBottom: spacing.md,
  },
  divisor: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.bg,
  },
  footerRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  footerBtn: { flex: 1 },
});
