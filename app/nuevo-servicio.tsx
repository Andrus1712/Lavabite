import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';

// Datos de ejemplo para los tipos de servicio
const TIPOS_SERVICIO = [
  'Lavado de moto básico',
  'Lavado de carro pequeño',
  'Lavado de carro grande',
  'Lavado de camión',
  'Lavado de moto completo',
  'Lavado de bici',
];

// Datos de ejemplo para los tipos de vehículo
const TIPOS_VEHICULO = [
  'Carro',
  'Moto',
  'Camión',
  'Bici',
  'Otro',
];

// Datos de ejemplo para los trabajadores
const TRABAJADORES = [
  { id: '1', nombre: 'Juan Pérez' },
  { id: '2', nombre: 'María López' },
  { id: '3', nombre: 'Carlos Rodríguez' },
  { id: '4', nombre: 'Ana Martínez' },
];

// Precios base por tipo de servicio
const PRECIOS_BASE = {
  'Lavado de moto básico': 15000,
  'Lavado de carro pequeño': 25000,
  'Lavado de carro grande': 35000,
  'Lavado de camión': 50000,
  'Lavado de moto completo': 20000,
  'Lavado de bici': 10000,
};

export default function NuevoServicioScreen() {
  const [tipoServicio, setTipoServicio] = useState('');
  const [tipoVehiculo, setTipoVehiculo] = useState('');
  const [trabajador, setTrabajador] = useState('');
  const [placa, setPlaca] = useState('');
  const [cliente, setCliente] = useState('');
  const [valorEstimado, setValorEstimado] = useState('');
  
  // Actualizar el valor estimado cuando cambia el tipo de servicio
  const handleTipoServicioChange = (value) => {
    setTipoServicio(value);
    setValorEstimado(PRECIOS_BASE[value]?.toString() || '');
  };
  
  // Función para guardar el servicio
  const handleGuardarServicio = () => {
    // Aquí iría la lógica para guardar el servicio en la base de datos
    console.log({
      tipoServicio,
      tipoVehiculo,
      trabajador,
      placa,
      cliente,
      valorEstimado: parseInt(valorEstimado, 10),
    });
    
    // Volver al dashboard
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <FontAwesome5 name="arrow-left" size={20} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nuevo Servicio</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView style={styles.formContainer} contentContainerStyle={styles.formContent}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Tipo de Servicio</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={tipoServicio}
              onValueChange={handleTipoServicioChange}
              style={styles.picker}
            >
              <Picker.Item label="Seleccione un tipo de servicio" value="" />
              {TIPOS_SERVICIO.map((tipo, index) => (
                <Picker.Item key={index} label={tipo} value={tipo} />
              ))}
            </Picker>
          </View>
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Tipo de Vehículo</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={tipoVehiculo}
              onValueChange={setTipoVehiculo}
              style={styles.picker}
            >
              <Picker.Item label="Seleccione un tipo de vehículo" value="" />
              {TIPOS_VEHICULO.map((tipo, index) => (
                <Picker.Item key={index} label={tipo} value={tipo} />
              ))}
            </Picker>
          </View>
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Trabajador Asignado</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={trabajador}
              onValueChange={setTrabajador}
              style={styles.picker}
            >
              <Picker.Item label="Seleccione un trabajador" value="" />
              {TRABAJADORES.map((worker) => (
                <Picker.Item key={worker.id} label={worker.nombre} value={worker.id} />
              ))}
            </Picker>
          </View>
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Placa / Identificación</Text>
          <TextInput
            style={styles.input}
            value={placa}
            onChangeText={setPlaca}
            placeholder="Ingrese la placa o identificación"
          />
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Cliente</Text>
          <TextInput
            style={styles.input}
            value={cliente}
            onChangeText={setCliente}
            placeholder="Nombre del cliente"
          />
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Valor Estimado (COP)</Text>
          <TextInput
            style={styles.input}
            value={valorEstimado}
            onChangeText={setValorEstimado}
            placeholder="0"
            keyboardType="numeric"
          />
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[
            styles.submitButton,
            (!tipoServicio || !tipoVehiculo || !trabajador) && styles.submitButtonDisabled
          ]}
          onPress={handleGuardarServicio}
          disabled={!tipoServicio || !tipoVehiculo || !trabajador}
        >
          <Text style={styles.submitButtonText}>Guardar Servicio</Text>
        </TouchableOpacity>
      </View>
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
  formContainer: {
    flex: 1,
  },
  formContent: {
    padding: 15,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
  },
  footer: {
    padding: 15,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  submitButton: {
    backgroundColor: '#2e78b7',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#b0bec5',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});