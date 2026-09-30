# EJERCICIO 11 - Mini tienda

### Qué he aprendido
- Crear recursos en el servidor mediante el método HTTP `POST` y el decorador `@Body()`.
- Enviar datos serializados con `JSON.stringify()` y cabecera `Content-Type: application/json`.

### Qué he modificado
- Backend: Endpoint `POST /productos` que calcula el nuevo ID y añade el producto al array.
- Frontend: Formulario con nombre y precio que envía la petición POST y agrega el producto a la lista visible.

### Respuesta de comprensión
- El objeto en React Native se convierte a texto JSON con `JSON.stringify()`, viaja por HTTP POST, NestJS lo parsea y `@Body()` lo inyecta en el método.

### Resultado
- Al introducir un nuevo producto (ej. "Monitor 4K", 299 €) y pulsar "AÑADIR PRODUCTO", se añade al catálogo en vivo.
