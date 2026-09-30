import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductosService {
  private productos = [
    { id: 1, nombre: 'Hamburguesa Clásica', precio: 8.5 },
    { id: 2, nombre: 'Pizza Cuatro Quesos', precio: 10.0 },
    { id: 3, nombre: 'Ensalada César', precio: 7.0 },
    { id: 4, nombre: 'Tarta de Queso', precio: 5.0 },
  ];

  findAll() {
    return this.productos;
  }
}
