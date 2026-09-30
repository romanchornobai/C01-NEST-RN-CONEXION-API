import { Injectable } from '@nestjs/common';

export interface Criatura {
  id: number;
  nombre: string;
  elemento: string;
  poder: string;
  likes: number;
}

@Injectable()
export class CriaturasService {
  private criaturas: Criatura[] = [
    {
      id: 1,
      nombre: 'Fénix Ígneo',
      elemento: 'Fuego',
      poder: 'Renacer de las cenizas y llamas purificadoras',
      likes: 25,
    },
    {
      id: 2,
      nombre: 'Leviatán Marino',
      elemento: 'Agua',
      poder: 'Control de mareas y tormentas abisales',
      likes: 18,
    },
    {
      id: 3,
      nombre: 'Gólem de Roca',
      elemento: 'Tierra',
      poder: 'Armadura impenetrable y terremotos tectónicos',
      likes: 12,
    },
    {
      id: 4,
      nombre: 'Grifo Tempestuoso',
      elemento: 'Aire',
      poder: 'Vuelo supersónico y ráfagas cortantes',
      likes: 30,
    },
  ];

  findAll(): Criatura[] {
    return this.criaturas;
  }

  findOne(id: number): Criatura | undefined {
    return this.criaturas.find((c) => c.id === id);
  }

  darLike(id: number): Criatura | null {
    const criatura = this.findOne(id);
    if (!criatura) return null;
    criatura.likes += 1;
    return criatura;
  }
}
