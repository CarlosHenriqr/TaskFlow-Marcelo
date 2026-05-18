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
import { fazerLogin, mensagemErroParse } from '../services/registroService';
import { useAuth } from '../context/AuthContext';
import { back4appConfigurado } from '../services/back4appConfig';
import { mostrarAlerta } from '../utils/alerta';
import { emailValido } from '../utils/validacao';
import { colors, fonts, spacing, typography } from '../theme';

export default function LoginScreen({ navigation }) {
  const { refreshSession } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  const validar = () => {
    if (!email.trim()) {
      mostrarAlerta('Validação', 'Informe o e-mail.');
      return false;
    }
    if (!emailValido(email)) {
      mostrarAlerta('Validação', 'Informe um e-mail válido.');
      return false;
    }
    if (!senha) {
      mostrarAlerta('Validação', 'Informe a senha.');
      return false;
    }
    if (!back4appConfigurado()) {
      mostrarAlerta('Configuração', 'Configure o arquivo .env e reinicie o Expo.');
      return false;
    }
    return true;
  };

  const entrar = async () => {
    if (carregando) return;
    if (!validar()) return;
    setCarregando(true);
    try {
      const user = await fazerLogin(email, senha);
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
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topo}>
          <AppLogo size={64} />
          <Text style={typography.brandLogin}>TaskFlow</Text>
          <Text style={[typography.subtitle, styles.subLogin]}>
            Entre para gerenciar suas tarefas.
          </Text>
        </View>

        <Cartao style={styles.cartao}>
          <CampoTexto
            label="E-mail"
            value={email}
            onChangeText={setEmail}
            placeholder="voce@email.com"
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!carregando}
          />
          <CampoTexto
            label="Senha"
            value={senha}
            onChangeText={setSenha}
            placeholder="••••••••"
            secureTextEntry
            editable={!carregando}
            labelExtra={
              <Pressable onPress={() => mostrarAlerta('Senha', 'Use o e-mail cadastrado para recuperar acesso.')}>
                <Text style={styles.esqueci}>Esqueceu a senha?</Text>
              </Pressable>
            }
          />
          <BotaoPrincipal titulo="Entrar" onPress={entrar} carregando={carregando} seta />
        </Cartao>

        <Text style={styles.rodape}>
          Não tem uma conta?{' '}
          <Text
            style={styles.rodapeLink}
            onPress={() => navigation.navigate('CadastroUsuario')}
          >
            Criar uma conta
          </Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.bg },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.lg,
    paddingVertical: 48,
    maxWidth: 420,
    width: '100%',
    alignSelf: 'center',
  },
  topo: { alignItems: 'center', marginBottom: spacing.xl },
  subLogin: { textAlign: 'center', marginTop: spacing.sm },
  cartao: { marginBottom: spacing.lg },
  esqueci: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.text,
  },
  rodape: {
    textAlign: 'center',
    fontFamily: fonts.sans,
    fontSize: 15,
    color: colors.textSecondary,
  },
  rodapeLink: {
    fontFamily: fonts.sansBold,
    color: colors.text,
  },
});
