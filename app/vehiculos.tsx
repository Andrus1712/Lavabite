import React, { useState } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

type Vehiculo = {
  id: string;
  placa: string;
  marca: string;
  modelo: string;
  año: string;
  color: string;
  propietario: string;
  telefono: string;
};

const VEHICULOS_MOCK: Vehiculo[] = [
  { id: '1', placa: 'ABC-123', marca: 'Toyota', modelo: 'Corolla', año: '2020', color: 'Blanco', propietario: 'Juan Pérez', telefono: '555-0123' },
  { id: '2', placa: 'DEF-456', marca: 'Honda', modelo: 'Civic', año: '2019', color: 'Negro', propietario: 'María García', telefono: '555-0456' },
  { id: '3', placa: 'GHI-789', marca: 'Nissan', modelo: 'Sentra', año: '2021', color: 'Gris', propietario: 'Carlos López', telefono: '555-0789' },
];

export default function VehiculosScreen() {
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>(VEHICULOS_MOCK);
  const [searchText, setSearchText] = useState('');
  
  const backgroundColor = useThemeColor({ light: '#ffffff', dark: '#1c1c1e' }, 'background');
  const accentColor = useThemeColor({ light: '#2e78b7', dark: '#4e98d7' }, 'tint');

  const filteredVehiculos = vehiculos.filter(vehiculo =>
    vehiculo.placa.toLowerCase().includes(searchText.toLowerCase()) ||
    vehiculo.marca.toLowerCase().includes(searchText.toLowerCase()) ||
    vehiculo.propietario.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleDelete = (id: string) => {
    Alert.alert(
      'Eliminar Vehículo',
      '¿Estás seguro de que deseas eliminar este vehículo?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => {
          setVehiculos(vehiculos.filter(v => v.id !== id));
        }}
      ]
    );
  };

  const renderVehiculoItem = ({ item }: { item: Vehiculo }) => (
    <View style={[styles.vehiculoCard, { backgroundColor }]}>
      <View style={styles.vehiculoHeader}>
        <View style={styles.placaContainer}>
          <ThemedText type="title" style={[styles.placa, { color: accentColor }]}>
            {item.placa}
          </ThemedText>
        </View>
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push(`/vehiculo-form?id=${item.id}&mode=edit`)}
          >
            <Ionicons name="pencil" size={20} color={accentColor} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleDelete(item.id)}
          >
            <Ionicons name="trash" size={20} color="#ff4444" />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.vehiculoInfo}>
        <View style={styles.infoRow}>
          <Ionicons name="car-outline" size={16} color={accentColor} />
          <ThemedText style={styles.infoText}>{item.marca} {item.modelo} ({item.año})</ThemedText>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="color-palette-outline" size={16} color={accentColor} />
          <ThemedText style={styles.infoText}>{item.color}</ThemedText>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="person-outline" size={16} color={accentColor} />
          <ThemedText style={styles.infoText}>{item.propietario}</ThemedText>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="call-outline" size={16} color={accentColor} />
          <ThemedText style={styles.infoText}>{item.telefono}</ThemedText>
        </View>
      </View>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={accentColor} />
          </TouchableOpacity>
          <ThemedText type="title">Vehículos</ThemedText>
          <TouchableOpacity onPress={() => router.push('/vehiculo-form?mode=create')}>
            <Ionicons name="add" size={24} color={accentColor} />
          </TouchableOpacity>
        </View>
        
        <View style={[styles.searchContainer, { backgroundColor }]}>
          <Ionicons name="search-outline" size={20} color={accentColor} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por placa, marca o propietario..."
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor }]}>
          <ThemedText type="defaultSemiBold" style={[styles.statValue, { color: accentColor }]}>
            {vehiculos.length}
          </ThemedText>
          <ThemedText style={styles.statLabel}>Total Vehículos</ThemedText>
        </View>
        
        <View style={[styles.statCard, { backgroundColor }]}>
          <ThemedText type="defaultSemiBold" style={[styles.statValue, { color: accentColor }]}>
            {filteredVehiculos.length}
          </ThemedText>
          <ThemedText style={styles.statLabel}>Resultados</ThemedText>
        </View>
      </View>

      <FlatList
        data={filteredVehiculos}
        renderItem={renderVehiculoItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  statCard: {
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
  statValue: {
    fontSize: 24,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.7,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  vehiculoCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  vehiculoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  placaContainer: {
    flex: 1,
  },
  placa: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
  vehiculoInfo: {
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    marginLeft: 12,
    fontSize: 14,
  },
});