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

interface Criatura {
  id: number;
  nombre: string;
  elemento: string;
  poder: string;
  likes: number;
}

export default function App() {
  const [criaturas, setCriaturas] = useState<Criatura[]>([]);
  const [criaturaDestacada, setCriaturaDestacada] = useState<Criatura | null>(null);
  const [buscarId, setBuscarId] = useState<string>('');
  const [cargando, setCargando] = useState<boolean>(true);
  const [buscando, setBuscando] = useState<boolean>(false);
  const [conectado, setConectado] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  // 1. GET /criaturas - Cargar la colección completa al montar
  const cargarCriaturas = async () => {
    setCargando(true);
    setErrorMsg('');
    try {
      const r = await fetch(`${API_URL}/criaturas`);
      if (!r.ok) throw new Error('Error al cargar criaturas');
      const datos: Criatura[] = await r.json();
      setCriaturas(datos);
      setConectado(true);
    } catch (err: any) {
      console.error('Error GET /criaturas:', err);
      setConectado(false);
      setErrorMsg('No se pudo conectar con NestJS');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarCriaturas();
  }, []);

  // 2. GET /criaturas/:id - Buscar por Path Param
  const buscarCriatura = async () => {
    if (!buscarId.trim()) {
      setErrorMsg('Introduce un ID para buscar.');
      return;
    }
    Keyboard.dismiss();
    setBuscando(true);
    setErrorMsg('');
    try {
      const r = await fetch(`${API_URL}/criaturas/${buscarId.trim()}`);
      if (!r.ok) {
        throw new Error(`Criatura con ID ${buscarId} no encontrada`);
      }
      const datos: Criatura = await r.json();
      setCriaturaDestacada(datos);
      setConectado(true);
    } catch (err: any) {
      setCriaturaDestacada(null);
      setErrorMsg(err.message || 'Error en la búsqueda');
    } finally {
      setBuscando(false);
    }
  };

  // 3. PATCH /criaturas/:id/like - Modificar likes en el servidor
  const darLike = async (id: number) => {
    try {
      const r = await fetch(`${API_URL}/criaturas/${id}/like`, {
        method: 'PATCH',
      });
      if (!r.ok) throw new Error('Error al enviar like');
      const actualizada: Criatura = await r.json();

      // Sincronizar en la lista general
      setCriaturas((prev) =>
        prev.map((c) => (c.id === id ? actualizada : c))
      );

      // Sincronizar en la ficha destacada si coincide
      if (criaturaDestacada && criaturaDestacada.id === id) {
        setCriaturaDestacada(actualizada);
      }
    } catch (err) {
      console.error('Error PATCH /criaturas/:id/like:', err);
    }
  };

  const getElementoEmoji = (elem: string) => {
    switch (elem.toLowerCase()) {
      case 'fuego':
        return '🔥';
      case 'agua':
        return '💧';
      case 'tierra':
        return '🪨';
      case 'aire':
        return '🌪️';
      default:
        return '✨';
    }
  };

  const renderItem = ({ item }: { item: Criatura }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.avatarBox}>
          <Text style={styles.avatarEmoji}>{getElementoEmoji(item.elemento)}</Text>
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>{item.nombre}</Text>
          <Text style={styles.cardElement}>{item.elemento} · #{item.id}</Text>
        </View>
        <TouchableOpacity
          style={styles.likeBadgeButton}
          onPress={() => darLike(item.id)}
          activeOpacity={0.7}
        >
          <Text style={styles.likeBadgeText}>❤️ {item.likes}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.cardPower}>⚡ {item.poder}</Text>
    </View>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />

        <View style={styles.header}>
          <Text style={styles.tag}>C01 · NEST + RN · FINAL</Text>
          <Text style={styles.title}>Creature Lab (APP ↔ API)</Text>
        </View>

        <View style={styles.statusBar}>
          <Text style={styles.statusTitle}>📡 Integración Full Stack</Text>
          <Text
            style={[
              styles.statusValue,
              conectado ? styles.statusConnected : styles.statusDisconnected,
            ]}
          >
            {conectado ? 'conectado ✓' : 'desconectado'}
          </Text>
        </View>

        {/* Buscador dinámico por ID */}
        <View style={styles.searchBox}>
          <View style={styles.searchRow}>
            <TextInput
              style={styles.input}
              value={buscarId}
              onChangeText={setBuscarId}
              placeholder="Buscar por ID (ej. 1, 2, 3, 4)"
              keyboardType="numeric"
              onSubmitEditing={buscarCriatura}
            />
            <TouchableOpacity
              style={styles.searchButton}
              onPress={buscarCriatura}
              disabled={buscando}
            >
              {buscando ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.buttonText}>BUSCAR</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {errorMsg ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>⚠️ {errorMsg}</Text>
          </View>
        ) : null}

        {/* Ficha de criatura destacada si se buscó */}
        {criaturaDestacada ? (
          <View style={styles.highlightCard}>
            <View style={styles.highlightHeader}>
              <Text style={styles.highlightTitle}>
                {getElementoEmoji(criaturaDestacada.elemento)} {criaturaDestacada.nombre}
              </Text>
              <TouchableOpacity
                onPress={() => setCriaturaDestacada(null)}
                style={styles.closeBtn}
              >
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.highlightPower}>Poder: {criaturaDestacada.poder}</Text>
            <TouchableOpacity
              style={styles.bigLikeButton}
              onPress={() => darLike(criaturaDestacada.id)}
            >
              <Text style={styles.bigLikeText}>
                ❤️ DAR LIKE ({criaturaDestacada.likes})
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {/* Listado con FlatList */}
        <Text style={styles.listHeader}>Catálogo de Criaturas ({criaturas.length}):</Text>

        {cargando ? (
          <View style={styles.centerBox}>
            <ActivityIndicator size="large" color="#6366F1" />
            <Text style={styles.loadingText}>Sincronizando con NestJS…</Text>
          </View>
        ) : (
          <FlatList
            data={criaturas}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
          />
        )}

        <Text style={styles.footerIp}>Servidor: {API_URL}/criaturas</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  header: {
    alignItems: 'center',
    marginBottom: 14,
  },
  tag: {
    fontSize: 12,
    fontWeight: '800',
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
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  statusTitle: {
    fontSize: 14,
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
    marginBottom: 12,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#0F172A',
    marginRight: 8,
  },
  searchButton: {
    backgroundColor: '#6366F1',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  errorBox: {
    backgroundColor: '#FEF2F2',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 13,
    fontWeight: '600',
  },
  highlightCard: {
    backgroundColor: '#EEF2FF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#C7D2FE',
    marginBottom: 12,
  },
  highlightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  highlightTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#312E81',
  },
  closeBtn: {
    padding: 4,
  },
  closeText: {
    fontSize: 16,
    color: '#6366F1',
    fontWeight: '700',
  },
  highlightPower: {
    fontSize: 13,
    color: '#4338CA',
    marginVertical: 8,
  },
  bigLikeButton: {
    backgroundColor: '#E11D48',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  bigLikeText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
  },
  listHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 8,
  },
  listContent: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarEmoji: {
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
  cardElement: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  likeBadgeButton: {
    backgroundColor: '#FFF1F2',
    borderWidth: 1,
    borderColor: '#FECDD3',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  likeBadgeText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#E11D48',
  },
  cardPower: {
    fontSize: 13,
    color: '#334155',
    lineHeight: 18,
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
  footerIp: {
    textAlign: 'center',
    color: '#94A3B8',
    fontSize: 12,
    marginVertical: 6,
  },
});
