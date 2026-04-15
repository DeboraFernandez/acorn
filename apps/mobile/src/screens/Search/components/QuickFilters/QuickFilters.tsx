import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './QuickFilters.styles';

const QUICK_FILTERS = [
  { id: 'all', label: 'Todos' },
  { id: 'unread', label: 'Sin ver' },
  { id: 'new', label: 'Nuevos' },
];

interface QuickFiltersProps {
  activeQuickFilter: string;
  hasActiveFilters: boolean;
  showFilterPanel: boolean;
  onQuickFilter: (id: string) => void;
  onToggleFilterPanel: () => void;
  onLayout: (y: number, height: number) => void;
}

export function QuickFilters({
  activeQuickFilter,
  hasActiveFilters,
  showFilterPanel,
  onQuickFilter,
  onToggleFilterPanel,
  onLayout,
}: QuickFiltersProps) {
  return (
    <View
      style={{ height: 40, marginTop: 8 }}
      onLayout={(e) => {
        const { y, height } = e.nativeEvent.layout;
        onLayout(y, height);
      }}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.pillsRow}
      >
        <TouchableOpacity
          style={[
            styles.pillFilter,
            (hasActiveFilters || showFilterPanel) && styles.pillFilterActive,
          ]}
          onPress={onToggleFilterPanel}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.pillFilterLabel,
              (hasActiveFilters || showFilterPanel) && styles.pillFilterLabelActive,
            ]}
          >
            ⚙ Filtros
          </Text>
        </TouchableOpacity>

        {QUICK_FILTERS.map((f) => (
          <TouchableOpacity
            key={f.id}
            style={[styles.pill, activeQuickFilter === f.id && styles.pillActive]}
            onPress={() => onQuickFilter(f.id)}
            activeOpacity={0.8}
          >
            <Text style={[styles.pillLabel, activeQuickFilter === f.id && styles.pillLabelActive]}>
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
