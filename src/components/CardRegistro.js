import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radius, shadow, spacing } from '../theme';
import { dataISOparaBR } from '../utils/dateMask';

export default function CardRegistro({ item, onPress }) {
  const dataExibicao = dataISOparaBR(item.data) || '—';

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, shadow.card, pressed && styles.pressed]}
      accessibilityRole="button"
    >
      <View style={styles.linhaSuperior}>
        <Text style={styles.titulo} numberOfLines={1}>
          {item.titulo || 'Sem título'}
        </Text>
        <View style={[styles.pill, pillEstilo(item.status)]}>
          <Text style={[styles.pillTexto, pillTextoEstilo(item.status)]}>
            {item.status || '—'}
          </Text>
        </View>
      </View>
      {item.descricao ? (
        <Text style={styles.descricao} numberOfLines={2}>
          {item.descricao}
        </Text>
      ) : null}
      <Text style={styles.meta}>Data {dataExibicao}</Text>
    </Pressable>
  );
}

function pillEstilo(status) {
  const s = (status || '').toLowerCase();
  if (s.includes('conclu')) return { backgroundColor: '#ECFDF5' };
  if (s.includes('andamento')) return { backgroundColor: colors.statusPendingBg };
  return { backgroundColor: colors.surfaceMuted };
}

function pillTextoEstilo(status) {
  const s = (status || '').toLowerCase();
  if (s.includes('conclu')) return { color: '#047857' };
  if (s.includes('andamento')) return { color: colors.accentBlueIcon };
  return { color: colors.textSecondary };
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pressed: { opacity: 0.94 },
  linhaSuperior: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  titulo: {
    flex: 1,
    fontFamily: fonts.serif,
    fontSize: 18,
    color: colors.text,
  },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  pillTexto: {
    fontSize: 11,
    fontFamily: fonts.sansSemiBold,
  },
  descricao: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    lineHeight: 20,
  },
  meta: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.textMuted,
  },
});
