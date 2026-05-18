import { StyleSheet, Text, View } from 'react-native';
import { colors, radius } from '../theme';

export default function AppLogo({ size = 56 }) {
  const inner = size * 0.55;
  return (
    <View style={[styles.wrap, { width: size, height: size, borderRadius: radius.md }]}>
      <View style={[styles.circle, { width: inner, height: inner, borderRadius: inner / 2 }]}>
        <Text style={[styles.check, { fontSize: inner * 0.45 }]}>✓</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    backgroundColor: colors.textInverse,
    alignItems: 'center',
    justifyContent: 'center',
  },
  check: {
    color: colors.primary,
    fontWeight: '700',
  },
});
