import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radius } from '../theme';

export default function BotaoPrincipal({
  titulo,
  onPress,
  disabled,
  carregando,
  variante = 'primario',
  accessibilityLabel,
  icone,
  seta = false,
}) {
  const ehSecundario = variante === 'secundario';
  const ehPerigo = variante === 'perigo';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? titulo}
      accessibilityState={{ disabled: Boolean(disabled || carregando), busy: Boolean(carregando) }}
      onPress={onPress}
      disabled={disabled || carregando}
      style={({ pressed }) => [
        styles.base,
        ehPerigo ? styles.perigo : ehSecundario ? styles.secundario : styles.primario,
        (disabled || carregando) && styles.desabilitado,
        pressed && styles.pressionado,
      ]}
    >
      {carregando ? (
        <ActivityIndicator color={ehSecundario || ehPerigo ? colors.text : colors.textInverse} />
      ) : (
        <View style={styles.conteudo}>
          {icone ? <Text style={[styles.icone, ehSecundario && styles.iconeSec]}>{icone}</Text> : null}
          <Text
            style={[
              styles.texto,
              ehSecundario && styles.textoSecundario,
              ehPerigo && styles.textoPerigo,
            ]}
          >
            {titulo}
            {seta ? ' →' : ''}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 54,
  },
  primario: { backgroundColor: colors.primary },
  secundario: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  perigo: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  conteudo: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  icone: { fontSize: 16, color: colors.textInverse },
  iconeSec: { color: colors.text },
  texto: {
    color: colors.textInverse,
    fontSize: 16,
    fontFamily: fonts.sansBold,
  },
  textoSecundario: {
    color: colors.text,
    fontFamily: fonts.sansSemiBold,
  },
  textoPerigo: { color: colors.danger },
  desabilitado: { opacity: 0.5 },
  pressionado: { opacity: 0.9 },
});
