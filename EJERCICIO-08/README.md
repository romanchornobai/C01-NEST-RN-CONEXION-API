# EJERCICIO 08 - Menú del restaurante

### Qué he aprendido
- Representar colecciones de datos recibidas del backend con el componente `FlatList`.
- Configurar las propiedades clave: `data`, `keyExtractor` y `renderItem`.

### Qué he modificado
- Backend: Creados controlador y servicio `productos` con 4 elementos (incluyendo Tarta de Queso).
- Frontend: Diseñado `FlatList` que renderiza cada producto en formato de tarjeta con su precio.

### Respuesta de comprensión
- El array del Service es la fuente de datos en NestJS y `data={productos}` es la colección en memoria que `FlatList` dibuja en la app móvil.

### Resultado
- La app descarga y muestra las 4 tarjetas de productos con sus nombres, emojis y precios en euros.
