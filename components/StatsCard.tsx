import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

type StatsCardProps = {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
};

export function StatsCard({ title, value, icon }: StatsCardProps) {
  const backgroundColor = useThemeColor({ light: '#ffffff', dark: '#1c1c1e' }, 'background');
  const accentColor = useThemeColor({ light: '#2e78b7', dark: '#4e98d7' }, 'tint');
  
  return (
    <ThemedView style={[styles.card, { backgroundColor }]}>
      <View style={styles.contentContainer}>
        <ThemedText type="defaultSemiBold" style={styles.title}>
          {title}
        </ThemedText>
        <ThemedText type="title" style={[styles.value, { color: accentColor }]}>
          {value}
        </ThemedText>
      </View>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    marginBottom: 4,
  },
  value: {
    fontSize: 24,
  },
  iconContainer: {
    marginLeft: 12,
  },
});