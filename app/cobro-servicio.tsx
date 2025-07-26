import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';

// Datos de ejemplo para servicios (simulando una base de datos)
const SERVICIOS_DB = [
  { 
    id: '1', 
    placa: 'ABC123', 
    cliente: 'Carlos Rodríguez',
    tipoServicio: 'Lavado de carro pequeño',
    tipoVehiculo: 'Carro',
    valorEstimado: 25000,
    trabajador: 'Juan Pérez',
    fecha: '2023-11-15',
    estado: 'pendiente'
  },
  { 
    id: '2', 
    placa: 'XYZ789', 
    cliente: 'María López',
    tipoServicio: 'Lavado de moto completo',
    tipoVehiculo: 'Moto',
    valorEstimado: 20000,
    trabajador: 'Ana Martínez',
    fecha: '2023-11-15',
    estado: 'pendiente'
  },
  { 
    id: '3', 
    placa: 'DEF456', 
    cliente: 'Juan Pérez',
    tipoServicio: 'Lavado de carro grande',
    tipoVehiculo: 'Carro',
    valorEstimado: 35000,
    trabajador: 'Carlos Rodríguez',
    fecha: '2023-11-15',
    estado: 'pendiente'
  },
];

export default function CobroServicioScreen() {
  const [placa, setPlaca] = useState('');
  const [servicio, setServicio] = useState(null);
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);
  
  // Función para buscar servicio por placa
  const buscarServicio = () => {
    if (!placa.trim()) {
      Alert.alert('Error', 'Por favor ingrese una placa');
      return;
    }
    
    const servicioEncontrado = SERVICIOS_DB.find(
      s => s.placa.toLowerCase() === placa.toLowerCase() && s.estado === 'pendiente'
    );
    
    setServicio(servicioEncontrado);
    setBusquedaRealizada(true);
  };
  
  // Función para generar factura
  const generarFactura = () => {
    Alert.alert(
      'Factura generada',
      `Se ha generado la factura para el servicio de ${servicio.tipoServicio} por un valor de $${servicio.valorEstimado.toLocaleString('es-CO')}`,
      [
        { 
          text: 'OK', 
          onPress: () => {
            // Aquí se podría marcar el servicio como pagado en la base de datos
            router.back();
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <FontAwesome5 name="arrow-left" size={20} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cobro de Servicio</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.searchContainer}>
          <Text style={styles.label}>Placa del Vehículo</Text>
          <View style={styles.searchInputContainer}>
            <TextInput
              style={styles.searchInput}
              value={placa}
              onChangeText={setPlaca}
              placeholder="Ingrese la placa"
              autoCapitalize="characters"
            />
            <TouchableOpacity style={styles.searchButton} onPress={buscarServicio}>
              <FontAwesome5 name="search" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        
        {busquedaRealizada && (
          <View style={styles.resultContainer}>
            {servicio ? (
              <View style={styles.facturaContainer}>
                <View style={styles.facturaHeader}>
                  <Text style={styles.facturaTitle}>Factura de Servicio</Text>
                  <Text style={styles.facturaId}>#{servicio.id}</Text>
                </View>
                
                <View style={styles.facturaInfo}>
                  <View style={styles.facturaRow}>
                    <Text style={styles.facturaLabel}>Cliente:</Text>
                    <Text style={styles.facturaValue}>{servicio.cliente}</Text>
                  </View>
                  
                  <View style={styles.facturaRow}>
                    <Text style={styles.facturaLabel}>Vehículo:</Text>
                    <Text style={styles.facturaValue}>{servicio.tipoVehiculo} - {servicio.placa}</Text>
                  </View>
                  
                  <View style={styles.facturaRow}>
                    <Text style={styles.facturaLabel}>Servicio:</Text>
                    <Text style={styles.facturaValue}>{servicio.tipoServicio}</Text>
                  </View>
                  
                  <View style={styles.facturaRow}>
                    <Text style={styles.facturaLabel}>Trabajador:</Text>
                    <Text style={styles.facturaValue}>{servicio.trabajador}</Text>
                  </View>
                  
                  <View style={styles.facturaRow}>
                    <Text style={styles.facturaLabel}>Fecha:</Text>
                    <Text style={styles.facturaValue}>{servicio.fecha}</Text>
                  </View>
                  
                  <View style={styles.divider} />
                  
                  <View style={styles.facturaTotal}>
                    <Text style={styles.facturaTotalLabel}>TOTAL:</Text>
                    <Text style={styles.facturaTotalValue}>
                      ${servicio.valorEstimado.toLocaleString('es-CO')}
                    </Text>
                  </View>
                </View>
                
                <TouchableOpacity style={styles.cobrarButton} onPress={generarFactura}>
                  <FontAwesome5 name="money-bill-wave" size={18} color="white" style={styles.cobrarIcon} />
                  <Text style={styles.cobrarButtonText}>Cobrar Servicio</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.noResultContainer}>
                <FontAwesome5 name="exclamation-circle" size={50} color="#f44336" />
                <Text style={styles.noResultText}>No se encontró ningún servicio pendiente para la placa {placa}</Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#2e78b7',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  placeholder: {
    width: 30,
  },
  content: {
    flex: 1,
    padding: 15,
  },
  searchContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  searchInputContainer: {
    flexDirection: 'row',
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    padding: 12,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#2e78b7',
    padding: 12,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultContainer: {
    marginTop: 10,
  },
  facturaContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  facturaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  facturaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  facturaId: {
    fontSize: 16,
    color: '#666',
  },
  facturaInfo: {
    marginBottom: 20,
  },
  facturaRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  facturaLabel: {
    width: '30%',
    fontSize: 16,
    color: '#666',
  },
  facturaValue: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 15,
  },
  facturaTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  facturaTotalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  facturaTotalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e78b7',
  },
  cobrarButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cobrarIcon: {
    marginRight: 10,
  },
  cobrarButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noResultContainer: {
    alignItems: 'center',
    padding: 30,
  },
  noResultText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 15,
  },
});