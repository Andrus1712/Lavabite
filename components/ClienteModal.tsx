import React from 'react';
import { StyleSheet, View, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

type Cliente = {
  id: string;
  nombre: string;
  telefono: string;
  vehiculo: string;
  placa: string;
  ultimoServicio: string;
};

type ClienteModalProps = {
  visible: boolean;
  cliente: Cliente | null;
  onClose: () => void;
};

export function ClienteModal({ visible, cliente, onClose }: ClienteModalProps) {
  const backgroundColor = useThemeColor({ light: '#ffffff', dark: '#1c1c1e' }, 'background');
  const accentColor = useThemeColor({ light: '#2e78b7', dark: '#4e98d7' }, 'tint');

  if (!cliente) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <ThemedText type="title">Información del Cliente</ThemedText>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={accentColor} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          <View style={[styles.infoCard, { backgroundColor }]}>
            <View style={styles.infoRow}>
              <Ionicons name="person-outline" size={20} color={accentColor} />
              <View style={styles.infoText}>
                <ThemedText style={styles.infoLabel}>Nombre</ThemedText>
                <ThemedText type="defaultSemiBold">{cliente.nombre}</ThemedText>
              </View>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="call-outline" size={20} color={accentColor} />
              <View style={styles.infoText}>
                <ThemedText style={styles.infoLabel}>Teléfono</ThemedText>
                <ThemedText type="defaultSemiBold">{cliente.telefono}</ThemedText>
              </View>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="car-outline" size={20} color={accentColor} />
              <View style={styles.infoText}>
                <ThemedText style={styles.infoLabel}>Vehículo</ThemedText>
                <ThemedText type="defaultSemiBold">{cliente.vehiculo}</ThemedText>
              </View>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="document-text-outline" size={20} color={accentColor} />
              <View style={styles.infoText}>
                <ThemedText style={styles.infoLabel}>Placa</ThemedText>
                <ThemedText type="defaultSemiBold">{cliente.placa}</ThemedText>
              </View>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="calendar-outline" size={20} color={accentColor} />
              <View style={styles.infoText}>
                <ThemedText style={styles.infoLabel}>Último Servicio</ThemedText>
                <ThemedText type="defaultSemiBold">{cliente.ultimoServicio}</ThemedText>
              </View>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: accentColor }]}>
              <Ionicons name="call" size={20} color="white" />
              <ThemedText style={styles.actionButtonText}>Llamar</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: accentColor }]}>
              <Ionicons name="add-circle" size={20} color="white" />
              <ThemedText style={styles.actionButtonText}>Nuevo Servicio</ThemedText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ThemedView>
    </Modal>
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
    paddingBottom: 20,
  },
  closeButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  infoCard: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoText: {
    marginLeft: 16,
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 2,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});