import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Datos de ejemplo para el usuario
const USER_DATA = {
  name: 'Juan Pérez',
  email: 'juan.perez@example.com',
  avatar: require('../../assets/images/react-logo.png'), // Reemplazar con imagen real
  role: 'Administrador'
};

// Opciones de configuración
const SETTINGS_OPTIONS = [
  { id: '1', title: 'Información personal', icon: 'user-edit', color: '#4CAF50' },
  { id: '2', title: 'Notificaciones', icon: 'bell', color: '#2196F3' },
  { id: '3', title: 'Sincronización', icon: 'sync', color: '#FF9800' },
  { id: '4', title: 'Tema', icon: 'palette', color: '#9C27B0' },
  { id: '5', title: 'Privacidad', icon: 'shield-alt', color: '#F44336' },
  { id: '6', title: 'Cerrar sesión', icon: 'sign-out-alt', color: '#757575' },
];

export default function UserScreen() {
  const renderSettingItem = (item) => {
    return (
      <TouchableOpacity 
        key={item.id} 
        style={styles.settingItem} 
        onPress={() => console.log(`Opción ${item.title} presionada`)}
      >
        <View style={[styles.settingIconContainer, { backgroundColor: `${item.color}20` }]}>
          <FontAwesome5 name={item.icon} size={20} color={item.color} />
        </View>
        <View style={styles.settingTextContainer}>
          <Text style={styles.settingTitle}>{item.title}</Text>
        </View>
        <FontAwesome5 name="chevron-right" size={16} color="#999" />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mi Perfil</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileContainer}>
          <Image source={USER_DATA.avatar} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{USER_DATA.name}</Text>
            <Text style={styles.userEmail}>{USER_DATA.email}</Text>
            <View style={styles.roleBadge}>
              <Text style={styles.roleText}>{USER_DATA.role}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.settingsContainer}>
          <Text style={styles.sectionTitle}>Configuración</Text>
          {SETTINGS_OPTIONS.map(renderSettingItem)}
        </View>
        
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Versión 1.0.0</Text>
        </View>
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
  scrollContent: {
    paddingBottom: 30,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    marginTop: 15,
    marginHorizontal: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  roleBadge: {
    backgroundColor: '#2e78b720',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 15,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  roleText: {
    color: '#2e78b7',
    fontSize: 12,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 15,
    marginHorizontal: 15,
  },
  settingsContainer: {
    marginHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    paddingLeft: 5,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: '#333',
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  versionText: {
    color: '#999',
    fontSize: 12,
  },
});