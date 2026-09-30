# EJERCICIO 12 - Creature Lab

### Qué he aprendido
- Integrar la arquitectura Full Stack completa: GET de colección, GET por ID y PATCH de modificación.
- Combinar en React Native `useState`, `useEffect`, `FlatList` y formularios en una sola interfaz interactiva.

### Qué he modificado
- Backend: Creados los 3 endpoints de criaturas (`GET /criaturas`, `GET /criaturas/:id`, `PATCH /criaturas/:id/like`).
- Frontend: Creada la app con catálogo completo, buscador por ID y botones de like con actualización en tiempo real.

### Respuesta de comprensión
- El dato viaja: interacción en la app móvil → petición `fetch()` → Controller de NestJS → Service en memoria → respuesta JSON → actualización del estado en React Native.

### Resultado
- Aplicación completa y funcional con catálogo de criaturas elementales, buscador por ID y likes instantáneos.
