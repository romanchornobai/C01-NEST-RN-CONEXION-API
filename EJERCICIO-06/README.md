# EJERCICIO 06 - Estado de conexión

### Qué he aprendido
- Almacenar datos dinámicos en el componente con el Hook `useState`.
- React re-renderiza la interfaz automáticamente cada vez que se llama a la función actualizadora del estado.

### Qué he modificado
- Frontend: Creado el estado `useState('🔴 Sin conectar')` que se actualiza a `🟢 ¡Conexión conseguida!` al recibir la respuesta de la API.

### Respuesta de comprensión
- `useState` notifica a React para volver a pintar la pantalla cuando el valor cambia, mientras que una variable normal no actualiza la vista.

### Resultado
- La app muestra `🔴 Sin conectar` al inicio y pasa a `🟢 ¡Conexión conseguida! 🚀` tras pulsar el botón.
