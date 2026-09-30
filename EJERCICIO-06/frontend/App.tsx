import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// En móvil físico usa tu IP local (192.168.1.225). En web o emulador local también funciona localhost
const API_URL = 'http://192.168.1.225:3000';

export default function App() {
  const [mensaje, setMensaje] = useState<string>('🔴 Sin conectar');
  const [cargando, setCargando] = useState<boolean>(false);

  const cargarMensaje = async () => {
    setCargando(true);
    try {
      const r = await fetch(`${API_URL}/mensaje`);
      const datos = await r.json();
      setMensaje(`🟢 ${datos.texto}`);
    } catch (error) {
      console.error('Error al conectar:', error);
      setMensaje('🔴 Error de conexión con el backend');
    } finally {
      setCargando(false);
    }
  };

  const conectado = mensaje.startsWith('🟢');

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />

        <View style={styles.header}>
          <Text style={styles.tag}>C01 · NEST + RN</Text>
          <Text style={styles.title}>JSON → pantalla</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>📡 Datos recibidos desde NestJS</Text>

          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Estado:</Text>
            <Text style={[styles.statusValue, conectado ? styles.statusConnected : styles.statusDisconnected]}>
              {conectado ? 'conectado ✓' : 'no conectado'}
            </Text>
          </View>

          <View style={[styles.responseBox, conectado ? styles.responseBoxConnected : styles.responseBoxDisconnected]}>
            <Text style={styles.responseText}>{mensaje}</Text>
          </View>
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
    color: '#EF4444',
  },
  responseBox: {
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
  },
  responseBoxConnected: {
    backgroundColor: '#ECFDF5',
    borderLeftColor: '#10B981',
  },
  responseBoxDisconnected: {
    backgroundColor: '#FEF2F2',
    borderLeftColor: '#EF4444',
  },
  responseText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
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
