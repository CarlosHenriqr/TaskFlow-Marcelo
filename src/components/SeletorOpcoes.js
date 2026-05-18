import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radius, spacing, typography } from '../theme';

/**
 * opcoes: string[] ou { id, rotulo, icone? }[]
 */
export default function SeletorOpcoes({
  label,
  opcoes,
  valor,
  onChange,
  obrigatorio = false,
  permitirNenhum = false,
  rotuloNenhum = 'Sem prioridade',
  estiloStatus = false,
}) {
  const extras = permitirNenhum ? [{ id: '', rotulo: rotuloNenhum, icone: '—' }] : [];
  const lista = [
    ...extras,
    ...opcoes.map((op) =>
      typeof op === 'string' ? { id: op, rotulo: op, icone: null } : op,
    ),
  ];

  return (
    <View style={styles.wrap}>
      {label ? (
        <Text style={typography.label}>
          {label}
          {obrigatorio ? ' *' : ''}
        </Text>
      ) : null}
      <View style={styles.linha}>
        {lista.map((op) => {
          const ativo = valor === op.id;
          return (
            <Pressable
              key={op.id || '__nenhum__'}
              onPress={() => onChange(op.id)}
              style={({ pressed }) => [
                styles.opcao,
                ativo && (estiloStatus ? styles.opcaoStatusAtiva : styles.opcaoAtiva),
                pressed && !ativo && styles.opcaoPressed,
              ]}
              accessibilityRole="button"
              accessibilityState={{ selected: ativo }}
            >
              {op.icone ? (
                <Text style={[styles.icone, ativo && styles.iconeAtivo]}>{op.icone}</Text>
              ) : null}
              <Text style={[styles.opcaoTexto, ativo && styles.opcaoTextoAtivo]}>{op.rotulo}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: spacing.md },
  linha: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  opcao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  opcaoAtiva: {
    backgroundColor: colors.priorityActiveBg,
    borderColor: colors.border,
  },
  opcaoStatusAtiva: {
    backgroundColor: colors.statusPendingBg,
    borderColor: colors.statusPendingBg,
  },
  opcaoPressed: { backgroundColor: colors.surfaceMuted },
  icone: { fontSize: 14, color: colors.textSecondary },
  iconeAtivo: { color: colors.text },
  opcaoTexto: {
    fontSize: 14,
    fontFamily: fonts.sansMedium,
    color: colors.text,
  },
  opcaoTextoAtivo: {
    fontFamily: fonts.sansSemiBold,
  },
});
