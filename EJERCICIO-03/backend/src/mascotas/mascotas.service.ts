import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class MascotasService {
  private mascotas = [
    { id: 1, nombre: 'Luna', especie: 'Perro', edad: 3 },
    { id: 2, nombre: 'Mishi', especie: 'Gato', edad: 2 },
    { id: 3, nombre: 'Kiko', especie: 'Loro', edad: 5 },
  ];

  findAll() {
    return this.mascotas;
  }

  findOne(id: number) {
    const mascota = this.mascotas.find((m) => m.id === id);
    if (!mascota) {
      throw new NotFoundException(`Mascota con id ${id} no encontrada`);
    }
    return mascota;
  }
}
