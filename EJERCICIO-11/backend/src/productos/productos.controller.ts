import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProductosService } from './productos.service.js';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get()
  findAll() {
    return this.productosService.findAll();
  }

  @Post()
  create(@Body() body: { nombre: string; precio: number }) {
    return this.productosService.create(body);
  }
}
