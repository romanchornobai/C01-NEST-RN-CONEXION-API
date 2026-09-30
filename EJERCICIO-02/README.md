# EJERCICIO 02 - API de Pizzas

### Qué he aprendido
- La arquitectura Controller-Service en NestJS para separar la recepción de peticiones de la lógica de negocio.
- El concepto de inyección de dependencias mediante el decorador `@Injectable()` y su inyección a través del constructor.
- Cómo generar automáticamente controladores y servicios con la CLI de NestJS (`nest g controller` y `nest g service`).
- Cómo estructurar colecciones de datos en memoria dentro de un servicio y exponerlas a través de un endpoint GET.

### Qué he modificado
- Se generaron el controlador y el servicio con `nest g controller pizzas` y `nest g service pizzas`.
- En `src/pizzas/pizzas.service.ts`: se definió un array privado con datos de pizzas (`id`, `nombre`, `precio`) y el método `findAll()` para devolverlo.
- En `src/pizzas/pizzas.controller.ts`: se inyectó `PizzasService` en el constructor y se creó el método `findAll()` con `@Get()` que llama al servicio.
- En `src/app.module.ts`: quedaron registrados `PizzasController` en `controllers` y `PizzasService` en `providers`.

### Respuesta de comprensión
- **¿Por qué se separa el controlador del servicio?**  
  Para cumplir con el principio de responsabilidad única. El controlador solo debe preocuparse de recibir las peticiones HTTP y devolver la respuesta, mientras que el servicio se encarga de gestionar los datos y la lógica. Esto hace el código más limpio, mantenible y testeable.
- **¿Cómo funciona la inyección de dependencias en este caso?**  
  El decorador `@Injectable()` marca `PizzasService` como un proveedor gestionado por el contenedor de NestJS. Al declararlo en el constructor del controlador (`constructor(private readonly pizzasService: PizzasService)`), NestJS crea e inyecta la instancia automáticamente sin necesidad de usar `new`.

### Resultado
Al ejecutar `npm run start:dev` y acceder a `http://localhost:3000/pizzas`:

```json
[
  { "id": 1, "nombre": "Margarita", "precio": 9 },
  { "id": 2, "nombre": "Pepperoni", "precio": 11 }
]
```
