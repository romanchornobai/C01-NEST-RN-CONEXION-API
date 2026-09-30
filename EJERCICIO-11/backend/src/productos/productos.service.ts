import { Injectable } from '@nestjs/common';

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
}

@Injectable()
export class ProductosService {
  private productos: Producto[] = [
    { id: 1, nombre: 'Teclado Mecánico', precio: 45.0 },
    { id: 2, nombre: 'Ratón Gaming', precio: 25.0 },
  ];

  findAll(): Producto[] {
    return this.productos;
  }

  create(nuevo: { nombre: string; precio: number }): Producto {
    const id =
      this.productos.length > 0
        ? Math.max(...this.productos.map((p) => p.id)) + 1
        : 1;
    const producto: Producto = {
      id,
      nombre: nuevo.nombre,
      precio: Number(nuevo.precio),
    };
    this.productos.push(producto);
    return producto;
  }
}
