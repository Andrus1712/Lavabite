import React, { useState } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ClienteModal } from '@/components/ClienteModal';
import { useThemeColor } from '@/hooks/useThemeColor';

type Cliente = {
  id: string;
  nombre: string;
  telefono: string;
  vehiculo: string;
  placa: string;
  ultimoServicio: string;
};

const CLIENTES_MOCK: Cliente[] = [
  { id: '1', nombre: 'Juan Pérez', telefono: '555-0123', vehiculo: 'Toyota Corolla', placa: 'ABC-123', ultimoServicio: '2024-01-15' },
  { id: '2', nombre: 'María García', telefono: '555-0456', vehiculo: 'Honda Civic', placa: 'DEF-456', ultimoServicio: '2024-01-14' },
  { id: '3', nombre: 'Carlos López', telefono: '555-0789', vehiculo: 'Nissan Sentra', placa: 'GHI-789', ultimoServicio: '2024-01-13' },
];

export default function ClientesScreen() {
  const [clientes, setClientes] = useState<Cliente[]>(CLIENTES_MOCK);
  const [searchText, setSearchText] = useState('');
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  
  const backgroundColor = useThemeColor({ light: '#ffffff', dark: '#1c1c1e' }, 'background');
  const accentColor = useThemeColor({ light: '#2e78b7', dark: '#4e98d7' }, 'tint');

  const filteredClientes = clientes.filter(cliente =>
    cliente.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
    cliente.placa.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleClientePress = (cliente: Cliente) => {
    setSelectedCliente(cliente);
    setModalVisible(true);
  };

  const renderClienteItem = ({ item }: { item: Cliente }) => (
    <TouchableOpacity 
      style={[styles.clienteCard, { backgroundColor }]}
      onPress={() => handleClientePress(item)}
    >
      <View style={styles.clienteHeader}>
        <View style={styles.clienteInfo}>
          <ThemedText type="defaultSemiBold" style={styles.clienteNombre}>
            {item.nombre}
          </ThemedText>
          <ThemedText style={styles.clienteTelefono}>
            {item.telefono}
          </ThemedText>
        </View>
        <Ionicons name="chevron-forward" size={20} color={accentColor} />
      </View>
      
      <View style={styles.vehiculoInfo}>
        <View style={styles.vehiculoItem}>
          <Ionicons name="car-outline" size={16} color={accentColor} />
          <ThemedText style={styles.vehiculoText}>{item.vehiculo}</ThemedText>
        </View>
        <View style={styles.vehiculoItem}>
          <Ionicons name="document-text-outline" size={16} color={accentColor} />
          <ThemedText style={styles.vehiculoText}>{item.placa}</ThemedText>
        </View>
      </View>
      
      <ThemedText style={styles.ultimoServicio}>
        Último servicio: {item.ultimoServicio}
      </ThemedText>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          Registros de Clientes
        </ThemedText>
        
        <View style={[styles.searchContainer, { backgroundColor }]}>
          <Ionicons name="search-outline" size={20} color={accentColor} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por nombre o placa..."
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor }]}>
          <ThemedText type="defaultSemiBold" style={[styles.statValue, { color: accentColor }]}>
            {clientes.length}
          </ThemedText>
          <ThemedText style={styles.statLabel}>Total Clientes</ThemedText>
        </View>
        
        <View style={[styles.statCard, { backgroundColor }]}>
          <ThemedText type="defaultSemiBold" style={[styles.statValue, { color: accentColor }]}>
            {filteredClientes.length}
          </ThemedText>
          <ThemedText style={styles.statLabel}>Resultados</ThemedText>
        </View>
      </View>

      <FlatList
        data={filteredClientes}
        renderItem={renderClienteItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
      
      <ClienteModal
        visible={modalVisible}
        cliente={selectedCliente}
        onClose={() => setModalVisible(false)}
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
  title: {
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
  clienteCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  clienteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  clienteInfo: {
    flex: 1,
  },
  clienteNombre: {
    fontSize: 16,
    marginBottom: 4,
  },
  clienteTelefono: {
    fontSize: 14,
    opacity: 0.7,
  },
  vehiculoInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  vehiculoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  vehiculoText: {
    marginLeft: 8,
    fontSize: 14,
  },
  ultimoServicio: {
    fontSize: 12,
    opacity: 0.6,
    fontStyle: 'italic',
  },
});