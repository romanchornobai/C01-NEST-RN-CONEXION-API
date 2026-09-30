import { Injectable } from '@nestjs/common';

@Injectable()
export class MascotasService {
  private mascotas = [
    { id: 1, nombre: 'Toby', especie: 'Perro', likes: 14 },
    { id: 2, nombre: 'Luna', especie: 'Gato', likes: 8 },
    { id: 3, nombre: 'Kiko', especie: 'Loro', likes: 5 },
  ];

  findAll() {
    return this.mascotas;
  }

  findOne(id: number) {
    return this.mascotas.find((m) => m.id === id);
  }

  darLike(id: number) {
    const mascota = this.findOne(id);
    if (!mascota) return null;
    mascota.likes += 1;
    return mascota;
  }
}
