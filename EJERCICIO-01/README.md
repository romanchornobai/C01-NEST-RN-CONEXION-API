# EJERCICIO 01 - Hello Backend

### Qué he aprendido
- Crear un endpoint GET con `@Controller('hola')` y `@Get()` en NestJS.
- NestJS serializa automáticamente objetos de JavaScript a JSON.

### Qué he modificado
- Creado `src/hola/hola.controller.ts` con el endpoint GET `/hola`.
- Registrado el controlador en `src/app.module.ts`.

### Respuesta de comprensión
- `@Controller('hola')` define la ruta base y `@Get()` gestiona la petición devolviendo `{ mensaje: "..." }` en JSON.

### Resultado
- Petición `GET http://localhost:3000/hola` responde:
  ```json
  { "mensaje": "¡Hola desde DAM! 🐱‍👓" }
  ```
