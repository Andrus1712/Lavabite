import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Datos de ejemplo para los servicios
const SERVICES_DATA = [
  { 
    id: '1', 
    tipoServicio: 'Lavado de moto básico', 
    tipoVehiculo: 'Moto', 
    valorEstimado: 15000,
    fecha: '2023-11-15',
    cliente: 'Carlos Rodríguez',
    estado: 'completado'
  },
  { 
    id: '2', 
    tipoServicio: 'Lavado de carro pequeño', 
    tipoVehiculo: 'Carro', 
    valorEstimado: 25000,
    fecha: '2023-11-14',
    cliente: 'María López',
    estado: 'completado'
  },
  { 
    id: '3', 
    tipoServicio: 'Lavado de carro grande', 
    tipoVehiculo: 'Carro', 
    valorEstimado: 35000,
    fecha: '2023-11-14',
    cliente: 'Juan Pérez',
    estado: 'completado'
  },
  { 
    id: '4', 
    tipoServicio: 'Lavado de camión', 
    tipoVehiculo: 'Camión', 
    valorEstimado: 50000,
    fecha: '2023-11-13',
    cliente: 'Empresa Transportes S.A.',
    estado: 'completado'
  },
  { 
    id: '5', 
    tipoServicio: 'Lavado de moto completo', 
    tipoVehiculo: 'Moto', 
    valorEstimado: 20000,
    fecha: '2023-11-12',
    cliente: 'Ana Martínez',
    estado: 'completado'
  },
  { 
    id: '6', 
    tipoServicio: 'Lavado de carro pequeño', 
    tipoVehiculo: 'Carro', 
    valorEstimado: 25000,
    fecha: '2023-11-12',
    cliente: 'Pedro Gómez',
    estado: 'completado'
  },
  { 
    id: '7', 
    tipoServicio: 'Lavado de bici', 
    tipoVehiculo: 'Bici', 
    valorEstimado: 10000,
    fecha: '2023-11-11',
    cliente: 'Laura Sánchez',
    estado: 'completado'
  },
];

// Función para obtener el icono según el tipo de vehículo
const getVehicleIcon = (tipoVehiculo) => {
  switch (tipoVehiculo.toLowerCase()) {
    case 'carro':
      return 'car';
    case 'moto':
      return 'motorcycle';
    case 'camión':
    case 'camion':
      return 'truck';
    case 'bici':
      return 'bicycle';
    default:
      return 'car-side';
  }
};

// Función para formatear el valor en pesos colombianos
const formatCurrency = (value) => {
  return `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
};

export default function ListServicesScreen() {
  const [filter, setFilter] = useState('todos');
  
  const filteredServices = filter === 'todos' 
    ? SERVICES_DATA 
    : SERVICES_DATA.filter(service => service.tipoVehiculo.toLowerCase() === filter);

  const renderServiceItem = ({ item }) => {
    const vehicleIcon = getVehicleIcon(item.tipoVehiculo);
    
    return (
      <TouchableOpacity 
        style={styles.serviceItem} 
        onPress={() => console.log(`Servicio ${item.id} seleccionado`)}
      >
        <View style={[styles.serviceIconContainer, getServiceColor(item.tipoVehiculo)]}>
          <FontAwesome5 name={vehicleIcon} size={20} color="white" />
        </View>
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceType}>{item.tipoServicio}</Text>
          <Text style={styles.serviceClient}>{item.cliente}</Text>
          <Text style={styles.serviceDate}>{item.fecha}</Text>
        </View>
        <View style={styles.servicePriceContainer}>
          <Text style={styles.servicePrice}>{formatCurrency(item.valorEstimado)}</Text>
          <FontAwesome5 name="chevron-right" size={14} color="#999" />
        </View>
      </TouchableOpacity>
    );
  };

  // Función para obtener el color según el tipo de vehículo
  const getServiceColor = (tipoVehiculo) => {
    switch (tipoVehiculo.toLowerCase()) {
      case 'carro':
        return { backgroundColor: '#2196F3' };
      case 'moto':
        return { backgroundColor: '#FF9800' };
      case 'camión':
      case 'camion':
        return { backgroundColor: '#4CAF50' };
      case 'bici':
        return { backgroundColor: '#9C27B0' };
      default:
        return { backgroundColor: '#757575' };
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Historial de Servicios</Text>
      </View>
      
      <View style={styles.filterContainer}>
        <ScrollableFilter 
          currentFilter={filter} 
          onFilterChange={setFilter} 
        />
      </View>
      
      <FlatList
        data={filteredServices}
        renderItem={renderServiceItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <FontAwesome5 name="clipboard-list" size={50} color="#ccc" />
            <Text style={styles.emptyText}>No hay servicios disponibles</Text>
          </View>
        }
      />
      
      <View style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total servicios:</Text>
          <Text style={styles.summaryValue}>{filteredServices.length}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Valor total:</Text>
          <Text style={styles.summaryValue}>
            {formatCurrency(filteredServices.reduce((sum, item) => sum + item.valorEstimado, 0))}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

// Componente para los filtros horizontales
function ScrollableFilter({ currentFilter, onFilterChange }) {
  const filters = [
    { id: 'todos', label: 'Todos', icon: 'list' },
    { id: 'carro', label: 'Carros', icon: 'car' },
    { id: 'moto', label: 'Motos', icon: 'motorcycle' },
    { id: 'camion', label: 'Camiones', icon: 'truck' },
    { id: 'bici', label: 'Bicis', icon: 'bicycle' },
  ];

  return (
    <View style={styles.filtersRow}>
      {filters.map(filter => (
        <TouchableOpacity
          key={filter.id}
          style={[
            styles.filterButton,
            currentFilter === filter.id && styles.filterButtonActive
          ]}
          onPress={() => onFilterChange(filter.id)}
        >
          <FontAwesome5 
            name={filter.icon} 
            size={14} 
            color={currentFilter === filter.id ? 'white' : '#666'} 
          />
          <Text 
            style={[
              styles.filterText,
              currentFilter === filter.id && styles.filterTextActive
            ]}
          >
            {filter.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 15,
    backgroundColor: '#2e78b7',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  filterContainer: {
    paddingVertical: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    zIndex: 1,
  },
  filtersRow: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  filterButtonActive: {
    backgroundColor: '#2e78b7',
  },
  filterText: {
    fontSize: 14,
    marginLeft: 5,
    color: '#666',
  },
  filterTextActive: {
    color: 'white',
    fontWeight: '500',
  },
  listContent: {
    padding: 15,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  serviceIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceType: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  serviceClient: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  serviceDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  servicePriceContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e78b7',
    marginBottom: 5,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: '#999',
  },
  summaryContainer: {
    backgroundColor: 'white',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e78b7',
    marginTop: 5,
  },
});