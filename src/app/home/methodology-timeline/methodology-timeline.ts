import { Component } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';

interface Step {
  num: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-methodology-timeline',
  imports: [RevealDirective],
  templateUrl: './methodology-timeline.html',
  styleUrl: './methodology-timeline.scss',
})
export class MethodologyTimeline {
  protected readonly steps: Step[] = [
    {
      num: '01',
      title: 'Diagnóstico',
      description:
        'Escuchamos, observamos y medimos. Entendemos tu realidad empresarial en profundidad antes de proponer cualquier cambio.',
    },
    {
      num: '02',
      title: 'Diseño',
      description:
        'Co-creamos soluciones a medida. Cada plan está diseñado para tu empresa, no para una empresa genérica.',
    },
    {
      num: '03',
      title: 'Implementación',
      description:
        'Acompañamos cada paso de la ejecución. Estamos al lado de tu equipo mientras la transformación ocurre.',
    },
    {
      num: '04',
      title: 'Evaluación',
      description:
        'Medimos resultados con indicadores claros. Verificamos que cada acción produce el impacto esperado.',
    },
    {
      num: '05',
      title: 'Seguimiento',
      description:
        'No desaparecemos después de la entrega. Mantenemos un pulso constante para asegurar la mejora continua.',
    },
  ];
}
