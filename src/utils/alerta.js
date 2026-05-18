import { Alert, Platform } from 'react-native';

/**
 * Alerta compatível com web (window.alert/confirm) e nativo (Alert.alert).
 */
export function mostrarAlerta(titulo, mensagem, botoes) {
  if (Platform.OS === 'web') {
    if (!botoes?.length) {
      window.alert(`${titulo}\n\n${mensagem}`);
      return;
    }
    if (botoes.length === 1) {
      window.alert(`${titulo}\n\n${mensagem}`);
      botoes[0].onPress?.();
      return;
    }
    const confirmar = botoes.find((b) => b.style !== 'cancel');
    const cancelar = botoes.find((b) => b.style === 'cancel');
    const ok = window.confirm(`${titulo}\n\n${mensagem}`);
    if (ok) confirmar?.onPress?.();
    else cancelar?.onPress?.();
    return;
  }
  Alert.alert(titulo, mensagem, botoes);
}
