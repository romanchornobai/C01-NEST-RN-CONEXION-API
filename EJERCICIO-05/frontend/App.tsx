import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// En móvil físico usa tu IP local (192.168.1.225). En web o emulador local también funciona localhost
const API_URL = 'http://192.168.1.225:3000';

export default function App() {
  const [mensaje, setMensaje] = useState<string>('');
  const [conectado, setConectado] = useState<boolean>(false);
  const [cargando, setCargando] = useState<boolean>(false);

  const cargarMensaje = async () => {
    setCargando(true);
    try {
      const respuesta = await fetch(`${API_URL}/mensaje`);
      const datos = await respuesta.json();
      setMensaje(datos.texto);
      setConectado(true);
    } catch (error) {
      console.error('Error al conectar:', error);
      setMensaje('Error al conectar con NestJS. Comprueba que el backend esté arrancado.');
      setConectado(false);
    } finally {
      setCargando(false);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />

        <View style={styles.header}>
          <Text style={styles.tag}>C01 · NEST + RN</Text>
          <Text style={styles.title}>RN → GET /mensaje</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>📡 Datos recibidos desde NestJS</Text>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Estado:</Text>
            <Text style={[styles.statusValue, conectado ? styles.statusConnected : styles.statusDisconnected]}>
              {conectado ? 'conectado ✓' : 'no conectado'}
            </Text>
          </View>

          {mensaje ? (
            <View style={styles.responseBox}>
              <Text style={styles.responseText}>{mensaje}</Text>
            </View>
          ) : (
            <Text style={styles.placeholderText}>Pulsa el botón para solicitar el mensaje al backend.</Text>
          )}
        </View>

        <TouchableOpacity
          style={[styles.button, cargando && styles.buttonDisabled]}
          onPress={cargarMensaje}
          disabled={cargando}
          activeOpacity={0.8}
        >
          {cargando ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>ACCIÓN PRINCIPAL</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.footerIp}>Conectando a: {API_URL}</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  tag: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6366F1',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 12,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusLabel: {
    fontSize: 15,
    color: '#64748B',
    marginRight: 6,
  },
  statusValue: {
    fontSize: 15,
    fontWeight: '700',
  },
  statusConnected: {
    color: '#10B981',
  },
  statusDisconnected: {
    color: '#94A3B8',
  },
  responseBox: {
    backgroundColor: '#EEF2FF',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#6366F1',
  },
  responseText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E1B4B',
  },
  placeholderText: {
    fontSize: 14,
    color: '#94A3B8',
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: '#6366F1',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  footerIp: {
    textAlign: 'center',
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 20,
  },
});
