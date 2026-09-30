# EJERCICIO 03 - Busca mascota

### Qué he aprendido
- Capturar parámetros dinámicos de ruta con `@Param('id')`.
- Convertir tipos de datos (`Number(id)`) en el controlador antes de consultar al servicio.

### Qué he modificado
- Generados controlador y servicio `mascotas`.
- Creado el endpoint `GET /mascotas/:id` que busca en el array con `.find()`.

### Respuesta de comprensión
- Los parámetros de ruta llegan siempre como `string` por HTTP; el controlador los convierte a número para operar con el modelo.

### Resultado
- Petición `GET http://localhost:3000/mascotas/1` devuelve:
  ```json
  { "id": 1, "nombre": "Luna", "especie": "Perro", "edad": 3 }
  ```
