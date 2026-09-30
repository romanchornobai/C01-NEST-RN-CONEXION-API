import { Injectable } from '@nestjs/common';

@Injectable()
export class HeroesService {
  private heroes = [
    { id: 1, nombre: 'Spider-Man', poder: 'Sentido arácnido y trepar muros', universo: 'Marvel' },
    { id: 2, nombre: 'Batman', poder: 'Intelecto nivel genio y artes marciales', universo: 'DC' },
    { id: 3, nombre: 'Iron Man', poder: 'Armadura tecnológica avanzada', universo: 'Marvel' },
    { id: 4, nombre: 'Wonder Woman', poder: 'Fuerza sobrehumana y lazo de la verdad', universo: 'DC' },
  ];

  findAll() {
    return this.heroes;
  }

  findOne(id: number) {
    return this.heroes.find((h) => h.id === id);
  }
}
