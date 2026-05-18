import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, spacing, typography } from '../theme';

export default function AppHeader({ onMenuPress }) {
  return (
    <View style={styles.wrap}>
      <Pressable
        onPress={onMenuPress}
        style={styles.menuBtn}
        accessibilityRole="button"
        accessibilityLabel="Menu"
      >
        <View style={styles.menuLine} />
        <View style={[styles.menuLine, styles.menuLineMid]} />
        <View style={styles.menuLine} />
      </Pressable>
      <Text style={typography.brandApp}>TaskFlow</Text>
      <View style={styles.menuBtn} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.bg,
  },
  menuBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    gap: 5,
  },
  menuLine: {
    width: 22,
    height: 2,
    backgroundColor: colors.text,
    borderRadius: 1,
  },
  menuLineMid: {
    width: 16,
  },
});
