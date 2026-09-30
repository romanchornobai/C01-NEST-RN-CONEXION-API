# EJERCICIO 05 - Mi primera conexión

### Qué he aprendido
- Conectar React Native con NestJS mediante peticiones `fetch()` asíncronas.
- Habilitar CORS (`app.enableCors()`) y usar la IP local (`http://192.168.1.225:3000`) para comunicarse desde el móvil físico.

### Qué he modificado
- Backend: Habilitado CORS en `main.ts` y creado `GET /mensaje`.
- Frontend: Creada la app con Expo y `App.tsx` que llama al backend al pulsar un botón.

### Respuesta de comprensión
- El móvil necesita la IP local del ordenador porque `localhost` dentro del móvil apunta al propio teléfono y no al servidor NestJS.

### Resultado
- Al pulsar el botón en la app móvil, se conecta a NestJS y muestra:
  `¡Conexión conseguida! 🚀`
