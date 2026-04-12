import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './FilterPanel.styles';

export type DateFilterValue = 'all' | '7d' | '30d' | '365d';
export type ReadFilterValue = 'all' | 'unread' | 'read';

type FilterPanelProps = {
  domains: string[];
  tags: string[];
  selectedDomain: string | null;
  selectedTag: string | null;
  selectedDate: DateFilterValue;
  selectedRead: ReadFilterValue;
  onSelectDomain: (domain: string | null) => void;
  onSelectTag: (tag: string | null) => void;
  onSelectDate: (date: DateFilterValue) => void;
  onSelectRead: (status: ReadFilterValue) => void;
  onClear: () => void;
};

type ChipProps = {
  label: string;
  active: boolean;
  onPress: () => void;
};

function Chip({ label, active, onPress }: ChipProps) {
  return (
    <TouchableOpacity style={[styles.chip, active ? styles.chipActive : null]} onPress={onPress} activeOpacity={0.8}>
      <Text style={[styles.chipText, active ? styles.chipTextActive : null]}>{label}</Text>
    </TouchableOpacity>
  );
}

export function FilterPanel({
  domains,
  tags,
  selectedDomain,
  selectedTag,
  selectedDate,
  selectedRead,
  onSelectDomain,
  onSelectTag,
  onSelectDate,
  onSelectRead,
  onClear,
}: FilterPanelProps) {
  return (
    <View style={styles.panel}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Filtros</Text>
        <TouchableOpacity onPress={onClear} activeOpacity={0.8}>
          <Text style={styles.clearText}>Limpiar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Dominio</Text>
        <View style={styles.chipsWrap}>
          <Chip label='Todos' active={selectedDomain === null} onPress={() => onSelectDomain(null)} />
          {domains.map((domain) => (
            <Chip
              key={domain}
              label={domain}
              active={selectedDomain === domain}
              onPress={() => onSelectDomain(selectedDomain === domain ? null : domain)}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Etiqueta</Text>
        <View style={styles.chipsWrap}>
          <Chip label='Todas' active={selectedTag === null} onPress={() => onSelectTag(null)} />
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={`#${tag}`}
              active={selectedTag === tag}
              onPress={() => onSelectTag(selectedTag === tag ? null : tag)}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Fecha</Text>
        <View style={styles.chipsWrap}>
          <Chip label='Todas' active={selectedDate === 'all'} onPress={() => onSelectDate('all')} />
          <Chip label='7 dias' active={selectedDate === '7d'} onPress={() => onSelectDate('7d')} />
          <Chip label='30 dias' active={selectedDate === '30d'} onPress={() => onSelectDate('30d')} />
          <Chip label='12 meses' active={selectedDate === '365d'} onPress={() => onSelectDate('365d')} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Estado</Text>
        <View style={styles.chipsWrap}>
          <Chip label='Todos' active={selectedRead === 'all'} onPress={() => onSelectRead('all')} />
          <Chip label='No visto' active={selectedRead === 'unread'} onPress={() => onSelectRead('unread')} />
          <Chip label='Visto' active={selectedRead === 'read'} onPress={() => onSelectRead('read')} />
        </View>
      </View>
    </View>
  );
}
