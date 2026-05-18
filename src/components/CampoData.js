import { createElement, useState } from 'react';
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors, fonts, radius, spacing, typography } from '../theme';
import { dataISOParaDate, dateParaISO, formatarDataBR } from '../utils/dateMask';

const DateTimePicker =
  Platform.OS !== 'web'
    ? require('@react-native-community/datetimepicker').default
    : null;

function EntradaDataWeb({ valor, onChange }) {
  const iso = dateParaISO(valor);
  return createElement('input', {
    type: 'date',
    value: iso,
    onChange: (e) => {
      const v = e.target.value;
      if (v) onChange(dataISOParaDate(v));
    },
    style: {
      flex: 1,
      fontSize: 16,
      fontFamily: 'DMSans_400Regular, system-ui, sans-serif',
      border: 'none',
      outline: 'none',
      color: colors.text,
      backgroundColor: 'transparent',
      cursor: 'pointer',
    },
    'aria-label': 'Data de vencimento',
  });
}

export default function CampoData({ label, valor, onChange, obrigatorio = false }) {
  const [aberto, setAberto] = useState(false);
  const [temp, setTemp] = useState(valor);

  const textoData = formatarDataBR(valor);

  if (Platform.OS === 'web') {
    return (
      <View style={styles.wrap}>
        <Text style={typography.label}>
          {label}
          {obrigatorio ? ' *' : ''}
        </Text>
        <View style={styles.campo}>
          <Text style={styles.iconeCal}>📅</Text>
          <EntradaDataWeb valor={valor} onChange={onChange} />
          <Text style={styles.iconeCal}>📅</Text>
        </View>
      </View>
    );
  }

  const abrir = () => {
    setTemp(valor);
    setAberto(true);
  };

  const confirmarIOS = () => {
    onChange(temp);
    setAberto(false);
  };

  const aoMudar = (event, selected) => {
    if (Platform.OS === 'android') {
      setAberto(false);
      if (event.type === 'dismissed') return;
      if (selected) onChange(selected);
      return;
    }
    if (selected) setTemp(selected);
  };

  const picker = (
    <DateTimePicker
      value={Platform.OS === 'ios' ? temp : valor}
      mode="date"
      display="spinner"
      onChange={aoMudar}
      locale="pt-BR"
    />
  );

  return (
    <View style={styles.wrap}>
      <Text style={typography.label}>
        {label}
        {obrigatorio ? ' *' : ''}
      </Text>
      <Pressable
        onPress={abrir}
        style={({ pressed }) => [styles.campo, pressed && styles.campoPressed]}
        accessibilityRole="button"
      >
        <Text style={styles.iconeCal}>📅</Text>
        <Text style={styles.valor}>{textoData}</Text>
        <Text style={styles.iconeCal}>📅</Text>
      </Pressable>

      {Platform.OS === 'ios' && (
        <Modal visible={aberto} transparent animationType="slide">
          <Pressable style={styles.overlay} onPress={() => setAberto(false)} />
          <View style={styles.sheet}>
            <View style={styles.sheetBar}>
              <Pressable onPress={() => setAberto(false)}>
                <Text style={styles.sheetBtn}>Cancelar</Text>
              </Pressable>
              <Pressable onPress={confirmarIOS}>
                <Text style={[styles.sheetBtn, styles.sheetBtnOk]}>Confirmar</Text>
              </Pressable>
            </View>
            {picker}
          </View>
        </Modal>
      )}

      {Platform.OS === 'android' && aberto && picker}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: spacing.md },
  campo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    minHeight: 50,
    gap: spacing.sm,
  },
  campoPressed: { backgroundColor: colors.surfaceMuted },
  valor: {
    flex: 1,
    fontSize: 16,
    fontFamily: fonts.sans,
    color: colors.text,
  },
  iconeCal: { fontSize: 16, opacity: 0.5 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    paddingBottom: spacing.lg,
  },
  sheetBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sheetBtn: { fontSize: 16, fontFamily: fonts.sans, color: colors.textMuted },
  sheetBtnOk: { color: colors.text, fontFamily: fonts.sansSemiBold },
});
