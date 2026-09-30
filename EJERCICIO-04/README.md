# EJERCICIO 04 - Filtra videojuegos

### Qué he aprendido
- Recibir parámetros opcionales de búsqueda con `@Query('genero')`.
- Diferencia entre `@Param` (obligatorio, en la ruta) y `@Query` (opcional, tras `?`).

### Qué he modificado
- Generados controlador y servicio `juegos`.
- En el servicio se implementó `findAll(genero?: string)` que devuelve todo o filtra según el parámetro recibido.

### Respuesta de comprensión
- `@Param` identifica un recurso único (ej. `/juegos/1`), mientras que `@Query` aplica filtros opcionales (ej. `/juegos?genero=RPG`).

### Resultado
- Petición `GET http://localhost:3000/juegos?genero=Aventura` devuelve:
  ```json
  [
    { "id": 1, "titulo": "The Legend of Zelda", "genero": "Aventura" },
    { "id": 5, "titulo": "God of War", "genero": "Aventura" }
  ]
  ```
