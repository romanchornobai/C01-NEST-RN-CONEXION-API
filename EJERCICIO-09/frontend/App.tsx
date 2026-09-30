import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// En móvil físico usa tu IP local (192.168.1.225). En web o emulador local también funciona localhost
const API_URL = 'http://192.168.1.225:3000';

interface Heroe {
  id: number;
  nombre: string;
  poder: string;
  universo: string;
}

export default function App() {
  const [id, setId] = useState<string>('1');
  const [heroe, setHeroe] = useState<Heroe | null>(null);
  const [cargando, setCargando] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [conectado, setConectado] = useState<boolean>(false);

  const buscarHeroe = async () => {
    if (!id.trim()) {
      setError('Por favor introduce un ID de superhéroe.');
      setHeroe(null);
      return;
    }

    Keyboard.dismiss();
    setCargando(true);
    setError('');

    try {
      const r = await fetch(`${API_URL}/heroes/${id.trim()}`);
      if (!r.ok) {
        throw new Error(`Héroe con ID ${id} no encontrado`);
      }
      const datos: Heroe = await r.json();
      setHeroe(datos);
      setConectado(true);
    } catch (err: any) {
      console.error('Error al buscar superhéroe:', err);
      setHeroe(null);
      setError(err.message || 'Error al conectar con NestJS');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    buscarHeroe();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />

        <View style={styles.header}>
          <Text style={styles.tag}>C01 · NEST + RN</Text>
          <Text style={styles.title}>GET /heroes/:id</Text>
        </View>

        <View style={styles.statusBar}>
          <Text style={styles.statusTitle}>🔍 Búsqueda de Superhéroes</Text>
          <Text style={[styles.statusValue, conectado ? styles.statusConnected : styles.statusDisconnected]}>
            {conectado ? 'conectado ✓' : 'desconectado'}
          </Text>
        </View>

        {/* Formulario de búsqueda con campo ID y botón BUSCAR */}
        <View style={styles.searchBox}>
          <Text style={styles.inputLabel}>Identificador del superhéroe:</Text>
          <View style={styles.searchRow}>
            <TextInput
              style={styles.input}
              value={id}
              onChangeText={setId}
              placeholder="Ej. 1, 2, 3, 4"
              keyboardType="numeric"
              returnKeyType="search"
              onSubmitEditing={buscarHeroe}
            />
            <TouchableOpacity
              style={[styles.searchButton, cargando && styles.buttonDisabled]}
              onPress={buscarHeroe}
              disabled={cargando}
              activeOpacity={0.8}
            >
              {cargando ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.searchButtonText}>BUSCAR</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Ficha del Superhéroe */}
        {error ? (
          <View style={styles.errorCard}>
            <Text style={styles.errorIcon}>⚠️</Text>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : heroe ? (
          <View style={styles.heroCard}>
            <View style={styles.heroCardHeader}>
              <View>
                <Text style={styles.heroId}>Ficha Nº {heroe.id}</Text>
                <Text style={styles.heroName}>{heroe.nombre}</Text>
              </View>
              <View
                style={[
                  styles.universeBadge,
                  heroe.universo === 'Marvel' ? styles.badgeMarvel : styles.badgeDC,
                ]}
              >
                <Text style={styles.universeText}>{heroe.universo}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.powerSection}>
              <Text style={styles.powerLabel}>⚡ Superpoder principal:</Text>
              <Text style={styles.powerText}>{heroe.poder}</Text>
            </View>
          </View>
        ) : null}

        <Text style={styles.footerIp}>Petición a: {API_URL}/heroes/{id || ':id'}</Text>
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
    marginBottom: 20,
  },
  tag: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6366F1',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
  },
  statusBar: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  statusTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#334155',
  },
  statusValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  statusConnected: {
    color: '#10B981',
  },
  statusDisconnected: {
    color: '#EF4444',
  },
  searchBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 8,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#0F172A',
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#6366F1',
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  heroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 22,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    marginBottom: 16,
  },
  heroCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  heroId: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6366F1',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 2,
  },
  heroName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
  },
  universeBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  badgeMarvel: {
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  badgeDC: {
    backgroundColor: '#DBEAFE',
    borderWidth: 1,
    borderColor: '#93C5FD',
  },
  universeText: {
    fontWeight: '800',
    fontSize: 12,
    color: '#1E293B',
    textTransform: 'uppercase',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 14,
  },
  powerSection: {
    marginTop: 2,
  },
  powerLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 4,
  },
  powerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    lineHeight: 22,
  },
  errorCard: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 14,
    padding: 18,
    alignItems: 'center',
    marginBottom: 16,
  },
  errorIcon: {
    fontSize: 28,
    marginBottom: 6,
  },
  errorText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#DC2626',
    textAlign: 'center',
  },
  footerIp: {
    textAlign: 'center',
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 10,
  },
});
