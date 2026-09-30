# EJERCICIO 09 - Busca superhéroe

### Qué he aprendido
- Construir peticiones dinámicas por ID desde React Native (`fetch(API_URL + '/heroes/' + id)`).
- Conectar un campo de entrada móvil (`TextInput`) con el decorador `@Param('id')` en NestJS.

### Qué he modificado
- Backend: Endpoint `GET /heroes/:id` que busca en el array y lanza 404 si no existe.
- Frontend: Creados campo numérico, botón BUSCAR y ficha detallada con nombre, universo y poder.

### Respuesta de comprensión
- El ID se escribe en el `TextInput`, viaja en la ruta de la URL de `fetch()` y NestJS lo recupera mediante `@Param('id')`.

### Resultado
- Al buscar el ID `1` se muestra Spider-Man (Marvel); al buscar un ID inexistente se muestra un mensaje de error.
