import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AppLogo from '../components/AppLogo';
import BotaoPrincipal from '../components/BotaoPrincipal';
import CampoTexto from '../components/CampoTexto';
import Cartao from '../components/Cartao';
import { cadastrarUsuario, mensagemErroParse } from '../services/registroService';
import { useAuth } from '../context/AuthContext';
import { back4appConfigurado } from '../services/back4appConfig';
import { mostrarAlerta } from '../utils/alerta';
import { emailValido } from '../utils/validacao';
import { colors, fonts, spacing, typography } from '../theme';

export default function CadastroUsuarioScreen({ navigation }) {
  const { refreshSession } = useAuth();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [carregando, setCarregando] = useState(false);

  const validar = () => {
    if (!nome.trim() || nome.trim().length < 2) {
      mostrarAlerta('Validação', 'Informe um nome de usuário com pelo menos 2 caracteres.');
      return false;
    }
    if (!email.trim() || !emailValido(email)) {
      mostrarAlerta('Validação', 'Informe um e-mail válido.');
      return false;
    }
    if (senha.length < 6) {
      mostrarAlerta('Validação', 'A senha deve ter pelo menos 6 caracteres.');
      return false;
    }
    if (senha !== confirmar) {
      mostrarAlerta('Validação', 'As senhas não conferem.');
      return false;
    }
    if (!back4appConfigurado()) {
      mostrarAlerta('Configuração', 'Configure o arquivo .env e reinicie o Expo.');
      return false;
    }
    return true;
  };

  const salvar = async () => {
    if (carregando) return;
    if (!validar()) return;
    setCarregando(true);
    try {
      const user = await cadastrarUsuario(email, senha, nome);
      await refreshSession(user);
    } catch (e) {
      mostrarAlerta('Erro', mensagemErroParse(e));
    } finally {
      setCarregando(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="always">
        <Pressable onPress={() => navigation.goBack()} style={styles.voltar}>
          <Text style={styles.voltarTexto}>← Voltar</Text>
        </Pressable>

        <View style={styles.topo}>
          <AppLogo size={56} />
          <Text style={typography.brandLogin}>Criar conta</Text>
          <Text style={[typography.subtitle, styles.sub]}>Cadastre-se no TaskFlow.</Text>
        </View>

        <Cartao>
          <CampoTexto label="Nome de usuário" value={nome} onChangeText={setNome} obrigatorio placeholder="Como quer ser chamado" autoCapitalize="words" editable={!carregando} />
          <CampoTexto label="E-mail" value={email} onChangeText={setEmail} obrigatorio placeholder="voce@email.com" autoCapitalize="none" keyboardType="email-address" editable={!carregando} />
          <CampoTexto label="Senha" value={senha} onChangeText={setSenha} obrigatorio placeholder="Mínimo 6 caracteres" secureTextEntry editable={!carregando} />
          <CampoTexto label="Confirmar senha" value={confirmar} onChangeText={setConfirmar} obrigatorio secureTextEntry editable={!carregando} onSubmitEditing={salvar} />
          <BotaoPrincipal titulo="Cadastrar" onPress={salvar} carregando={carregando} seta />
        </Cartao>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.bg },
  scroll: {
    padding: spacing.lg,
    paddingTop: 48,
    maxWidth: 420,
    width: '100%',
    alignSelf: 'center',
  },
  voltar: { marginBottom: spacing.md },
  voltarTexto: { fontFamily: fonts.sansMedium, fontSize: 15, color: colors.text },
  topo: { alignItems: 'center', marginBottom: spacing.lg },
  sub: { textAlign: 'center', marginTop: spacing.sm },
});
