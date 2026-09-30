import { Injectable } from '@nestjs/common';

@Injectable()
export class JuegosService {
  private juegos = [
    { id: 1, titulo: 'The Legend of Zelda', genero: 'Aventura' },
    { id: 2, titulo: 'Super Mario Odyssey', genero: 'Plataformas' },
    { id: 3, titulo: 'Elden Ring', genero: 'RPG' },
    { id: 4, titulo: 'Hollow Knight', genero: 'Metroidvania' },
    { id: 5, titulo: 'God of War', genero: 'Aventura' },
  ];

  findAll(genero?: string) {
    if (!genero) return this.juegos;
    return this.juegos.filter(
      (j) => j.genero.toLowerCase() === genero.toLowerCase(),
    );
  }
}
