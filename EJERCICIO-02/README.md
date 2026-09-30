# EJERCICIO 02 - API de Pizzas

### Qué he aprendido
- Separar responsabilidades con la arquitectura Controller-Service en NestJS.
- Inyección de dependencias mediante `@Injectable()` y constructor.

### Qué he modificado
- Generados `pizzas.controller.ts` y `pizzas.service.ts`.
- El servicio almacena el array de pizzas y el controlador expone `GET /pizzas`.

### Respuesta de comprensión
- El controlador recibe la petición HTTP y delega la gestión de datos al servicio, manteniendo el código modular.

### Resultado
- Petición `GET http://localhost:3000/pizzas` responde:
  ```json
  [
    { "id": 1, "nombre": "Margarita", "precio": 9 },
    { "id": 2, "nombre": "Pepperoni", "precio": 11 }
  ]
  ```
