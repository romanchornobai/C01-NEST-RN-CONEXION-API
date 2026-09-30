# EJERCICIO 10 - Likes

### Qué he aprendido
- Modificar datos en el backend mediante el método HTTP `PATCH` y `@Patch(':id/like')`.
- El concepto de persistencia simulada en memoria RAM del servidor.

### Qué he modificado
- Backend: Endpoint `PATCH /mascotas/:id/like` que incrementa los likes de la mascota en el array.
- Frontend: Botón "❤️ ME GUSTA" que envía `PATCH` y actualiza la cifra en tiempo real con la respuesta.

### Respuesta de comprensión
- Los likes vuelven al valor inicial al reiniciar NestJS porque residen en la memoria RAM del proceso y no en una base de datos persistente.

### Resultado
- Al pulsar "❤️ ME GUSTA", el contador de Toby sube de 14 a 15, 16... actualizándose inmediatamente en pantalla.
