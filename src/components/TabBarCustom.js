import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts, radius, shadow, spacing } from '../theme';

const TABS = [
  { name: 'Home', label: 'Início', icon: '⌂' },
  { name: 'Lista', label: 'Tarefas', icon: '☰' },
  { name: 'Nova', label: 'Nova', icon: '⊕' },
  { name: 'Perfil', label: 'Perfil', icon: '○' },
];

export default function TabBarCustom({ state, navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrap, { paddingBottom: Math.max(insets.bottom, 10) }, shadow.card]}>
      {TABS.map((tab, index) => {
        const ativo = state.index === index;
        const onPress = () => {
          if (tab.name === 'Nova') {
            const pai = navigation.getParent();
            if (pai) pai.navigate('Formulario', { objectId: undefined });
            return;
          }
          navigation.navigate(tab.name);
        };
        return (
          <Pressable
            key={tab.name}
            onPress={onPress}
            style={[styles.item, ativo && styles.itemAtivo]}
            accessibilityRole="button"
            accessibilityState={{ selected: ativo }}
          >
            <Text style={[styles.icon, ativo && styles.iconAtivo]}>{tab.icon}</Text>
            <Text style={[styles.label, ativo && styles.labelAtivo]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    paddingTop: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderTopWidth: 1,
    borderColor: colors.border,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    gap: 4,
  },
  itemAtivo: {
    backgroundColor: colors.accentBlue,
  },
  icon: {
    fontSize: 18,
    color: colors.textSecondary,
  },
  iconAtivo: {
    color: colors.accentBlueIcon,
  },
  label: {
    fontFamily: fonts.sansMedium,
    fontSize: 11,
    color: colors.textSecondary,
  },
  labelAtivo: {
    color: colors.text,
    fontFamily: fonts.sansSemiBold,
  },
});
