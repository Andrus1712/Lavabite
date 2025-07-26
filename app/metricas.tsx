import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function MetricasScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('semana');
  
  const backgroundColor = useThemeColor({ light: '#ffffff', dark: '#1c1c1e' }, 'background');
  const accentColor = useThemeColor({ light: '#2e78b7', dark: '#4e98d7' }, 'tint');

  // Datos de la semana
  const weekData = [
    { day: 'Lun', vehicles: 45, income: 2250 },
    { day: 'Mar', vehicles: 52, income: 2600 },
    { day: 'Mié', vehicles: 38, income: 1900 },
    { day: 'Jue', vehicles: 67, income: 3350 },
    { day: 'Vie', vehicles: 89, income: 4450 },
    { day: 'Sáb', vehicles: 125, income: 6250 },
    { day: 'Dom', vehicles: 98, income: 4900 },
  ];

  const maxVehicles = Math.max(...weekData.map(d => d.vehicles));
  const maxIncome = Math.max(...weekData.map(d => d.income));

  // Datos de servicios
  const serviciosData = [
    { name: 'Lavado Simple', percentage: 45, color: '#2e78b7' },
    { name: 'Lavado Premium', percentage: 30, color: '#4CAF50' },
    { name: 'Encerado', percentage: 15, color: '#FF9800' },
    { name: 'Detallado', percentage: 10, color: '#9C27B0' },
  ];

  const renderPeriodButton = (period: string, label: string) => (
    <TouchableOpacity
      style={[
        styles.periodButton,
        selectedPeriod === period && { backgroundColor: accentColor },
      ]}
      onPress={() => setSelectedPeriod(period)}
    >
      <ThemedText
        style={[
          styles.periodButtonText,
          selectedPeriod === period && { color: 'white' },
        ]}
      >
        {label}
      </ThemedText>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={accentColor} />
        </TouchableOpacity>
        <ThemedText type="title">Métricas</ThemedText>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.periodSelector}>
        {renderPeriodButton('dia', 'Día')}
        {renderPeriodButton('semana', 'Semana')}
        {renderPeriodButton('mes', 'Mes')}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Resumen de métricas */}
        <View style={styles.summaryContainer}>
          <View style={[styles.summaryCard, { backgroundColor }]}>
            <Ionicons name="car-outline" size={24} color={accentColor} />
            <ThemedText type="defaultSemiBold" style={styles.summaryValue}>514</ThemedText>
            <ThemedText style={styles.summaryLabel}>Vehículos lavados</ThemedText>
          </View>
          
          <View style={[styles.summaryCard, { backgroundColor }]}>
            <Ionicons name="cash-outline" size={24} color="#4CAF50" />
            <ThemedText type="defaultSemiBold" style={[styles.summaryValue, { color: '#4CAF50' }]}>$25,750</ThemedText>
            <ThemedText style={styles.summaryLabel}>Ingresos totales</ThemedText>
          </View>
        </View>

        {/* Gráfico de vehículos lavados */}
        <View style={[styles.chartContainer, { backgroundColor }]}>
          <ThemedText type="subtitle" style={styles.chartTitle}>
            Vehículos Lavados - Esta Semana
          </ThemedText>
          <View style={styles.barChart}>
            {weekData.map((item, index) => (
              <View key={index} style={styles.barItem}>
                <View 
                  style={[
                    styles.bar, 
                    { 
                      height: (item.vehicles / maxVehicles) * 120,
                      backgroundColor: accentColor 
                    }
                  ]} 
                />
                <ThemedText style={styles.barLabel}>{item.day}</ThemedText>
                <ThemedText style={styles.barValue}>{item.vehicles}</ThemedText>
              </View>
            ))}
          </View>
        </View>

        {/* Gráfico de ingresos */}
        <View style={[styles.chartContainer, { backgroundColor }]}>
          <ThemedText type="subtitle" style={styles.chartTitle}>
            Ingresos Diarios
          </ThemedText>
          <View style={styles.barChart}>
            {weekData.map((item, index) => (
              <View key={index} style={styles.barItem}>
                <View 
                  style={[
                    styles.bar, 
                    { 
                      height: (item.income / maxIncome) * 120,
                      backgroundColor: '#4CAF50' 
                    }
                  ]} 
                />
                <ThemedText style={styles.barLabel}>{item.day}</ThemedText>
                <ThemedText style={styles.barValue}>${item.income}</ThemedText>
              </View>
            ))}
          </View>
        </View>

        {/* Distribución de servicios */}
        <View style={[styles.chartContainer, { backgroundColor }]}>
          <ThemedText type="subtitle" style={styles.chartTitle}>
            Distribución de Servicios
          </ThemedText>
          <View style={styles.servicesList}>
            {serviciosData.map((service, index) => (
              <View key={index} style={styles.serviceItem}>
                <View style={styles.serviceInfo}>
                  <View style={[styles.serviceColor, { backgroundColor: service.color }]} />
                  <ThemedText style={styles.serviceName}>{service.name}</ThemedText>
                </View>
                <View style={styles.servicePercentage}>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { 
                          width: `${service.percentage}%`,
                          backgroundColor: service.color 
                        }
                      ]} 
                    />
                  </View>
                  <ThemedText style={styles.percentageText}>{service.percentage}%</ThemedText>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Métricas adicionales */}
        <View style={styles.additionalMetrics}>
          <View style={[styles.metricRow, { backgroundColor }]}>
            <View style={styles.metricItem}>
              <Ionicons name="time-outline" size={20} color={accentColor} />
              <View style={styles.metricText}>
                <ThemedText type="defaultSemiBold">25 min</ThemedText>
                <ThemedText style={styles.metricLabel}>Tiempo promedio</ThemedText>
              </View>
            </View>
            
            <View style={styles.metricItem}>
              <Ionicons name="people-outline" size={20} color="#FF9800" />
              <View style={styles.metricText}>
                <ThemedText type="defaultSemiBold">89%</ThemedText>
                <ThemedText style={styles.metricLabel}>Satisfacción</ThemedText>
              </View>
            </View>
          </View>

          <View style={[styles.metricRow, { backgroundColor }]}>
            <View style={styles.metricItem}>
              <Ionicons name="trending-up-outline" size={20} color="#4CAF50" />
              <View style={styles.metricText}>
                <ThemedText type="defaultSemiBold">+15%</ThemedText>
                <ThemedText style={styles.metricLabel}>Crecimiento</ThemedText>
              </View>
            </View>
            
            <View style={styles.metricItem}>
              <Ionicons name="repeat-outline" size={20} color="#9C27B0" />
              <View style={styles.metricText}>
                <ThemedText type="defaultSemiBold">67%</ThemedText>
                <ThemedText style={styles.metricLabel}>Clientes recurrentes</ThemedText>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  periodSelector: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 8,
  },
  periodButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  summaryContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  summaryCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryValue: {
    fontSize: 24,
    marginVertical: 8,
  },
  summaryLabel: {
    fontSize: 12,
    opacity: 0.7,
    textAlign: 'center',
  },
  chartContainer: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartTitle: {
    marginBottom: 16,
    textAlign: 'center',
  },
  barChart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 160,
    paddingBottom: 20,
  },
  barItem: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 20,
    borderRadius: 4,
    marginBottom: 8,
  },
  barLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  barValue: {
    fontSize: 10,
    opacity: 0.7,
  },
  servicesList: {
    gap: 16,
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  serviceColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  serviceName: {
    fontSize: 14,
  },
  servicePercentage: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 20,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  percentageText: {
    fontSize: 12,
    fontWeight: '600',
    minWidth: 35,
  },
  additionalMetrics: {
    gap: 12,
    marginBottom: 20,
  },
  metricRow: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  metricItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  metricText: {
    flex: 1,
  },
  metricLabel: {
    fontSize: 12,
    opacity: 0.7,
  },
});