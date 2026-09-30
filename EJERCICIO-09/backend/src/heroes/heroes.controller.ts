import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { HeroesService } from './heroes.service.js';

@Controller('heroes')
export class HeroesController {
  constructor(private readonly heroesService: HeroesService) {}

  @Get()
  findAll() {
    return this.heroesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const heroe = this.heroesService.findOne(Number(id));
    if (!heroe) {
      throw new NotFoundException(`Héroe con ID ${id} no encontrado`);
    }
    return heroe;
  }
}
