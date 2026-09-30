import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// En móvil físico usa tu IP local (192.168.1.225). En web o emulador local también funciona localhost
const API_URL = 'http://192.168.1.225:3000';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
}

export default function App() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [conectado, setConectado] = useState<boolean>(false);

  const cargarProductos = async () => {
    setCargando(true);
    try {
      const r = await fetch(`${API_URL}/productos`);
      const datos = await r.json();
      setProductos(datos);
      setConectado(true);
    } catch (error) {
      console.error('Error al obtener productos:', error);
      setConectado(false);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const getEmoji = (nombre: string) => {
    const n = nombre.toLowerCase();
    if (n.includes('hamburguesa')) return '🍔';
    if (n.includes('pizza')) return '🍕';
    if (n.includes('ensalada')) return '🥗';
    if (n.includes('tarta') || n.includes('postre')) return '🍰';
    return '🍽️';
  };

  const renderItem = ({ item }: { item: Producto }) => (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Text style={styles.iconEmoji}>{getEmoji(item.nombre)}</Text>
      </View>
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{item.nombre}</Text>
        <Text style={styles.cardId}>Código: #{item.id}</Text>
      </View>
      <View style={styles.priceBadge}>
        <Text style={styles.priceText}>{item.precio.toFixed(2)} €</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />

        <View style={styles.header}>
          <Text style={styles.tag}>C01 · NEST + RN</Text>
          <Text style={styles.title}>GET /productos → lista</Text>
        </View>

        <View style={styles.statusBar}>
          <Text style={styles.statusTitle}>📡 Menú del restaurante</Text>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Estado:</Text>
            <Text
              style={[
                styles.statusValue,
                conectado ? styles.statusConnected : styles.statusDisconnected,
              ]}
            >
              {conectado ? 'conectado ✓' : 'desconectado'}
            </Text>
          </View>
        </View>

        {cargando && productos.length === 0 ? (
          <View style={styles.centerBox}>
            <ActivityIndicator size="large" color="#6366F1" />
            <Text style={styles.loadingText}>Cargando productos desde NestJS…</Text>
          </View>
        ) : (
          <FlatList
            data={productos}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No se encontraron productos en el menú.</Text>
            }
          />
        )}

        <TouchableOpacity
          style={[styles.button, cargando && styles.buttonDisabled]}
          onPress={cargarProductos}
          disabled={cargando}
          activeOpacity={0.8}
        >
          {cargando ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Recargar Menú</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.footerIp}>Conectando a: {API_URL}/productos</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 20,
    paddingTop: 10,
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
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 14,
    color: '#64748B',
    marginRight: 6,
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
  listContent: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  iconEmoji: {
    fontSize: 24,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  cardId: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
  },
  priceBadge: {
    backgroundColor: '#ECFDF5',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  priceText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#059669',
  },
  centerBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 15,
    color: '#64748B',
  },
  emptyText: {
    textAlign: 'center',
    color: '#94A3B8',
    marginTop: 40,
    fontSize: 15,
  },
  button: {
    backgroundColor: '#6366F1',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 8,
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
    marginBottom: 10,
  },
});
