import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

type VehiculoForm = {
  placa: string;
  marca: string;
  modelo: string;
  año: string;
  color: string;
  propietario: string;
  telefono: string;
};

const INITIAL_FORM: VehiculoForm = {
  placa: '',
  marca: '',
  modelo: '',
  año: '',
  color: '',
  propietario: '',
  telefono: '',
};

export default function VehiculoFormScreen() {
  const { id, mode } = useLocalSearchParams();
  const [form, setForm] = useState<VehiculoForm>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<VehiculoForm>>({});
  
  const backgroundColor = useThemeColor({ light: '#ffffff', dark: '#1c1c1e' }, 'background');
  const accentColor = useThemeColor({ light: '#2e78b7', dark: '#4e98d7' }, 'tint');
  
  const isEdit = mode === 'edit';
  const title = isEdit ? 'Editar Vehículo' : 'Nuevo Vehículo';

  useEffect(() => {
    if (isEdit && id) {
      // Aquí cargarías los datos del vehículo desde tu API/storage
      // Por ahora, simulamos datos
      setForm({
        placa: 'ABC-123',
        marca: 'Toyota',
        modelo: 'Corolla',
        año: '2020',
        color: 'Blanco',
        propietario: 'Juan Pérez',
        telefono: '555-0123',
      });
    }
  }, [isEdit, id]);

  const validateForm = (): boolean => {
    const newErrors: Partial<VehiculoForm> = {};
    
    if (!form.placa.trim()) newErrors.placa = 'La placa es requerida';
    if (!form.marca.trim()) newErrors.marca = 'La marca es requerida';
    if (!form.modelo.trim()) newErrors.modelo = 'El modelo es requerido';
    if (!form.año.trim()) newErrors.año = 'El año es requerido';
    if (!form.color.trim()) newErrors.color = 'El color es requerido';
    if (!form.propietario.trim()) newErrors.propietario = 'El propietario es requerido';
    if (!form.telefono.trim()) newErrors.telefono = 'El teléfono es requerido';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    
    // Aquí guardarías en tu API/storage
    Alert.alert(
      'Éxito',
      `Vehículo ${isEdit ? 'actualizado' : 'creado'} correctamente`,
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  const updateForm = (field: keyof VehiculoForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const renderInput = (
    field: keyof VehiculoForm,
    label: string,
    placeholder: string,
    icon: string,
    keyboardType: 'default' | 'numeric' | 'phone-pad' = 'default'
  ) => (
    <View style={styles.inputContainer}>
      <ThemedText style={styles.inputLabel}>{label}</ThemedText>
      <View style={[styles.inputWrapper, { backgroundColor }, errors[field] && styles.inputError]}>
        <Ionicons name={icon as any} size={20} color={accentColor} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={form[field]}
          onChangeText={(value) => updateForm(field, value)}
          keyboardType={keyboardType}
          placeholderTextColor="#999"
        />
      </View>
      {errors[field] && (
        <ThemedText style={styles.errorText}>{errors[field]}</ThemedText>
      )}
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={accentColor} />
        </TouchableOpacity>
        <ThemedText type="title">{title}</ThemedText>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderInput('placa', 'Placa', 'Ej: ABC-123', 'document-text-outline')}
        {renderInput('marca', 'Marca', 'Ej: Toyota', 'car-outline')}
        {renderInput('modelo', 'Modelo', 'Ej: Corolla', 'car-sport-outline')}
        {renderInput('año', 'Año', 'Ej: 2020', 'calendar-outline', 'numeric')}
        {renderInput('color', 'Color', 'Ej: Blanco', 'color-palette-outline')}
        {renderInput('propietario', 'Propietario', 'Nombre del propietario', 'person-outline')}
        {renderInput('telefono', 'Teléfono', 'Número de contacto', 'call-outline', 'phone-pad')}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.button, styles.cancelButton]}
          onPress={() => router.back()}
        >
          <ThemedText style={styles.cancelButtonText}>Cancelar</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.saveButton, { backgroundColor: accentColor }]}
          onPress={handleSave}
        >
          <ThemedText style={styles.saveButtonText}>
            {isEdit ? 'Actualizar' : 'Guardar'}
          </ThemedText>
        </TouchableOpacity>
      </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  inputWrapper: {
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
  inputError: {
    borderWidth: 1,
    borderColor: '#ff4444',
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  errorText: {
    color: '#ff4444',
    fontSize: 12,
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,
  },
  button: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  saveButton: {
    // backgroundColor set dynamically
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});