import { Component } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';

interface Step {
  num: string;
  title: string;
  description: string;
  quote: string;
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
      title: 'CONOCIMIENTO',
      description:
        'Conocer antes de proponer. Me involucro en el día a día de la empresa para entender cómo funciona realmente. Escucho a quienes realizan las tareas, observo los procesos y analizo la información más relevante.',
      quote: 'No se puede mejorar una empresa sin conocer primero su realidad.',
    },
    {
      num: '02',
      title: 'DISEÑO DE ESTRATEGIAS',
      description:
        'Luego, con una visión integral, identifico oportunidades de mejora, priorizo temas que generen mayor impacto en las finanzas y construyo un plan de trabajo alineado con los objetivos de la empresa.',
      quote: 'Definir por dónde empezar también es una decisión estratégica.',
    },
    {
      num: '03',
      title: 'IMPLEMENTACIÓN',
      description:
        'De la propuesta a la acción. Las propuestas son puestas en práctica, en diálogo constante con quienes trabajan en la dinámica cotidiana de la empresa, acompañando cada decisión y cada cambio hasta que comience a dar resultados. El conocimiento y el diseño se llevan a la práctica.',
      quote: 'No hay cambios reales sin acciones concretas.',
    },
    {
      num: '04',
      title: 'MEDICIÓN',
      description:
        'Evaluar lo que realmente cambia. La implementación de nuevas acciones genera nuevos datos. A partir de allí, defino indicadores de gestión, reviso resultados y ajusto el rumbo cuando es necesario para que las decisiones sigan apoyándose en datos concretos.',
      quote: 'No se puede mejorar lo que no se puede medir.',
    },
    {
      num: '05',
      title: 'CONSOLIDACIÓN',
      description:
        'Que las mejoras permanezcan. El objetivo no es la resolución de un problema puntual, es que la Empresa incorpore nuevas formas de trabajar, gane autonomía y cuente con una gestión más sólida para seguir creciendo y proyectándose en el tiempo.',
      quote: 'Las mejoras se consolidan cuando se vuelven parte de la gestión diaria.',
    },
  ];
}
