import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radius, shadow, spacing, typography } from '../theme';

export default function AcaoCard({ titulo, subtitulo, onPress, variante = 'clara' }) {
  const iconeBg = variante === 'escura' ? colors.navy : colors.accentBlue;
  const iconeCor = variante === 'escura' ? colors.textInverse : colors.accentBlueIcon;
  const iconeChar = variante === 'escura' ? '✓' : '☰';

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, shadow.card, pressed && styles.pressed]}
      accessibilityRole="button"
    >
      <View style={[styles.iconeWrap, { backgroundColor: iconeBg }]}>
        <Text style={[styles.icone, { color: iconeCor }]}>{iconeChar}</Text>
      </View>
      <View style={styles.textos}>
        <Text style={typography.titleCard}>{titulo}</Text>
        <Text style={styles.sub}>{subtitulo}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  pressed: { opacity: 0.92 },
  iconeWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icone: { fontSize: 22, fontWeight: '700' },
  textos: { flex: 1 },
  sub: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
    lineHeight: 20,
  },
});
