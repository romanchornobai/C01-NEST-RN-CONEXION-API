import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Keyboard,
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
  const [nombre, setNombre] = useState<string>('');
  const [precio, setPrecio] = useState<string>('');
  const [cargando, setCargando] = useState<boolean>(true);
  const [guardando, setGuardando] = useState<boolean>(false);
  const [conectado, setConectado] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const cargarProductos = async () => {
    setCargando(true);
    try {
      const r = await fetch(`${API_URL}/productos`);
      const datos: Producto[] = await r.json();
      setProductos(datos);
      setConectado(true);
      setErrorMsg('');
    } catch (error) {
      console.error('Error al cargar productos:', error);
      setConectado(false);
      setErrorMsg('No se pudo conectar con NestJS');
    } finally {
      setCargando(false);
    }
  };

  const agregarProducto = async () => {
    if (!nombre.trim() || !precio.trim()) {
      setErrorMsg('Por favor completa el nombre y el precio.');
      return;
    }

    const precioNum = Number(precio);
    if (isNaN(precioNum) || precioNum <= 0) {
      setErrorMsg('El precio debe ser un número válido mayor que 0.');
      return;
    }

    Keyboard.dismiss();
    setGuardando(true);
    setErrorMsg('');

    try {
      const r = await fetch(`${API_URL}/productos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: nombre.trim(),
          precio: precioNum,
        }),
      });

      if (!r.ok) {
        throw new Error('Error en el servidor al crear producto');
      }

      const nuevo: Producto = await r.json();
      setProductos((prev) => [...prev, nuevo]);
      setNombre('');
      setPrecio('');
      setConectado(true);
    } catch (err: any) {
      console.error('Error al añadir producto:', err);
      setErrorMsg(err.message || 'Error al guardar');
    } finally {
      setGuardando(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const renderItem = ({ item }: { item: Producto }) => (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <Text style={styles.iconText}>📦</Text>
      </View>
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{item.nombre}</Text>
        <Text style={styles.cardSub}>ID: #{item.id}</Text>
      </View>
      <View style={styles.priceTag}>
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
          <Text style={styles.title}>POST /productos</Text>
        </View>

        <View style={styles.statusBar}>
          <Text style={styles.statusTitle}>🛒 Mini Tienda</Text>
          <Text
            style={[
              styles.statusValue,
              conectado ? styles.statusConnected : styles.statusDisconnected,
            ]}
          >
            {conectado ? 'conectado ✓' : 'desconectado'}
          </Text>
        </View>

        {/* Formulario para añadir producto */}
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Añadir nuevo producto</Text>

          <TextInput
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
            placeholder="Nombre del producto (ej. Auriculares)"
          />

          <TextInput
            style={styles.input}
            value={precio}
            onChangeText={setPrecio}
            placeholder="Precio en € (ej. 29.99)"
            keyboardType="decimal-pad"
          />

          {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

          <TouchableOpacity
            style={[styles.addButton, guardando && styles.buttonDisabled]}
            onPress={agregarProducto}
            disabled={guardando}
            activeOpacity={0.8}
          >
            {guardando ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.addButtonText}>AÑADIR PRODUCTO</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Listado de productos */}
        <Text style={styles.sectionTitle}>Catálogo de productos ({productos.length}):</Text>

        {cargando ? (
          <View style={styles.centerBox}>
            <ActivityIndicator size="large" color="#6366F1" />
            <Text style={styles.loadingText}>Cargando catálogo…</Text>
          </View>
        ) : (
          <FlatList
            data={productos}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No hay productos en la tienda aún.</Text>
            }
          />
        )}

        <Text style={styles.footerIp}>Servidor NestJS: {API_URL}/productos</Text>
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
    marginBottom: 16,
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
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 14,
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
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: '#0F172A',
    marginBottom: 10,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: '#6366F1',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 10,
  },
  listContent: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 20,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  cardSub: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  priceTag: {
    backgroundColor: '#ECFDF5',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
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
    marginTop: 10,
    fontSize: 14,
    color: '#64748B',
  },
  emptyText: {
    textAlign: 'center',
    color: '#94A3B8',
    marginTop: 30,
    fontSize: 14,
  },
  footerIp: {
    textAlign: 'center',
    color: '#94A3B8',
    fontSize: 12,
    marginVertical: 8,
  },
});
