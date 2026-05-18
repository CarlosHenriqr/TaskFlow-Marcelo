import { StyleSheet, View } from 'react-native';
import { colors, radius, shadow, spacing } from '../theme';

export default function Cartao({ children, style }) {
  return <View style={[styles.card, shadow.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
});
