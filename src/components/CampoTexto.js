import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, fonts, radius, spacing, typography } from '../theme';

export default function CampoTexto({
  label,
  value,
  onChangeText,
  obrigatorio = false,
  multiline = false,
  placeholder,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  autoComplete,
  editable = true,
  returnKeyType,
  onSubmitEditing,
  mostrarOpcional = false,
  labelExtra,
}) {
  return (
    <View style={styles.wrap}>
      {label ? (
        <View style={styles.labelRow}>
          <Text style={typography.label}>
            {label}
            {obrigatorio ? '' : mostrarOpcional ? ' (opcional)' : ''}
          </Text>
          {labelExtra}
        </View>
      ) : null}
      <TextInput
        style={[styles.input, multiline && styles.area]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        multiline={multiline}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoComplete={autoComplete}
        editable={editable}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: spacing.md },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    fontSize: 16,
    fontFamily: fonts.sans,
    color: colors.text,
    minHeight: 50,
  },
  area: {
    minHeight: 108,
    textAlignVertical: 'top',
    paddingTop: 14,
  },
});
