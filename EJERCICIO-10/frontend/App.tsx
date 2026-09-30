import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// En móvil físico usa tu IP local (192.168.1.225). En web o emulador local también funciona localhost
const API_URL = 'http://192.168.1.225:3000';

interface Mascota {
  id: number;
  nombre: string;
  especie: string;
  likes: number;
}

export default function App() {
  const [mascota, setMascota] = useState<Mascota | null>(null);
  const [cargando, setCargando] = useState<boolean>(true);
  const [dandoLike, setDandoLike] = useState<boolean>(false);
  const [conectado, setConectado] = useState<boolean>(false);

  // Carga inicial de la mascota mediante GET
  const cargarMascota = async () => {
    setCargando(true);
    try {
      const r = await fetch(`${API_URL}/mascotas/1`);
      const datos: Mascota = await r.json();
      setMascota(datos);
      setConectado(true);
    } catch (error) {
      console.error('Error al cargar mascota:', error);
      setConectado(false);
    } finally {
      setCargando(false);
    }
  };

  // Modificación mediante método HTTP PATCH
  const darLike = async () => {
    setDandoLike(true);
    try {
      const r = await fetch(`${API_URL}/mascotas/1/like`, {
        method: 'PATCH',
      });
      const datosActualizados: Mascota = await r.json();
      setMascota(datosActualizados);
      setConectado(true);
    } catch (error) {
      console.error('Error al dar like:', error);
    } finally {
      setDandoLike(false);
    }
  };

  useEffect(() => {
    cargarMascota();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />

        <View style={styles.header}>
          <Text style={styles.tag}>C01 · NEST + RN</Text>
          <Text style={styles.title}>PATCH /mascotas/:id/like</Text>
        </View>

        <View style={styles.statusBar}>
          <Text style={styles.statusTitle}>🐾 Modificación en tiempo real</Text>
          <Text
            style={[
              styles.statusValue,
              conectado ? styles.statusConnected : styles.statusDisconnected,
            ]}
          >
            {conectado ? 'conectado ✓' : 'desconectado'}
          </Text>
        </View>

        {cargando ? (
          <View style={styles.cardLoading}>
            <ActivityIndicator size="large" color="#6366F1" />
            <Text style={styles.loadingText}>Conectando con NestJS…</Text>
          </View>
        ) : mascota ? (
          <View style={styles.petCard}>
            <View style={styles.avatarBox}>
              <Text style={styles.avatarEmoji}>🐶</Text>
            </View>

            <Text style={styles.petName}>{mascota.nombre}</Text>
            <Text style={styles.petSpecies}>{mascota.especie}</Text>

            <View style={styles.likesContainer}>
              <Text style={styles.likesEmoji}>❤️</Text>
              <Text style={styles.likesCount}>{mascota.likes}</Text>
              <Text style={styles.likesLabel}>Likes recibidos</Text>
            </View>

            <TouchableOpacity
              style={[styles.likeButton, dandoLike && styles.buttonDisabled]}
              onPress={darLike}
              disabled={dandoLike}
              activeOpacity={0.8}
            >
              {dandoLike ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.likeButtonText}>❤️ ME GUSTA</Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>
              No se pudo conectar con el servidor NestJS.
            </Text>
            <TouchableOpacity style={styles.retryButton} onPress={cargarMascota}>
              <Text style={styles.retryButtonText}>Reintentar</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.footerIp}>Petición PATCH a: {API_URL}/mascotas/1/like</Text>
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
    marginBottom: 20,
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
  cardLoading: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  loadingText: {
    marginTop: 14,
    fontSize: 15,
    color: '#64748B',
  },
  petCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    marginBottom: 16,
  },
  avatarBox: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  avatarEmoji: {
    fontSize: 48,
  },
  petName: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  petSpecies: {
    fontSize: 15,
    color: '#64748B',
    fontWeight: '600',
    marginBottom: 18,
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF1F2',
    borderWidth: 1,
    borderColor: '#FECDD3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 14,
    marginBottom: 24,
  },
  likesEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  likesCount: {
    fontSize: 22,
    fontWeight: '800',
    color: '#E11D48',
    marginRight: 8,
  },
  likesLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9F1239',
  },
  likeButton: {
    backgroundColor: '#E11D48',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#E11D48',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 4,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  likeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  errorBox: {
    backgroundColor: '#FEF2F2',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 15,
    marginBottom: 12,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#DC2626',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  footerIp: {
    textAlign: 'center',
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 10,
  },
});
