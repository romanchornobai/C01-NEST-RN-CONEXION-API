# EJERCICIO 01 - Hello Backend

### Qué he aprendido
- A inicializar y configurar un proyecto backend desde cero con NestJS mediante su CLI.
- La estructura básica de un proyecto NestJS: archivo de entrada (`main.ts`), módulo raíz (`app.module.ts`) y controladores.
- El uso de los decoradores `@Controller('hola')` y `@Get()` para definir rutas y métodos HTTP.
- Que NestJS serializa automáticamente los objetos de JavaScript a formato JSON al devolverlos en un método del controlador.

### Qué he modificado
- Se creó el controlador `HolaController` en `src/hola/hola.controller.ts` con el endpoint GET `/hola` que devuelve un objeto con un mensaje de bienvenida.
- Se registró `HolaController` dentro del array `controllers` de `src/app.module.ts`.

### Respuesta de comprensión
- **¿Qué función cumplen los decoradores `@Controller` y `@Get`?**  
  `@Controller('hola')` asocia la clase a una ruta base en el servidor (`/hola`). El decorador `@Get()` indica que el método que tiene debajo gestionará las peticiones HTTP GET entrantes a dicha ruta.
- **¿Cómo se procesa la respuesta en NestJS?**  
  Al retornar un objeto literal `{ mensaje: '...' }`, NestJS establece automáticamente la cabecera `Content-Type: application/json` y transforma la respuesta a JSON sin requerir configuración manual.

### Resultado
Al ejecutar el servidor con `npm run start:dev` y hacer una petición GET a `http://localhost:3000/hola`:

```json
{
  "mensaje": "¡Hola desde DAM! 🐱‍👓"
}
```
