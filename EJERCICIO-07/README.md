# EJERCICIO 07 - Carga automática

### Qué he aprendido
- Ejecutar peticiones automáticas al montar el componente usando `useEffect` con array de dependencias vacío `[]`.
- Gestionar estados de carga (`⏳ Cargando…`) y combinar la carga automática con un botón de recarga manual.

### Qué he modificado
- Frontend: Añadido `useEffect(() => { cargarMensaje(); }, [])` en `App.tsx` y un botón para volver a recargar.

### Respuesta de comprensión
- `useEffect` inicia la petición automáticamente al aparecer la pantalla; el botón requiere una acción física del usuario.

### Resultado
- Al abrir la app aparece `⏳ Cargando…` y en segundos cambia a `🟢 ¡Conexión conseguida! 🚀` sin tocar la pantalla.
