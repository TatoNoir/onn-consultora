import { animate, style, transition, trigger } from '@angular/animations';
import { Component, computed, signal } from '@angular/core';
import { CapacitacionSection } from '../capacitacion-section/capacitacion-section';
import { RevealDirective } from '../../shared/reveal.directive';

interface Challenge {
  id: number;
  pain: string;
  painDesc: string;
  solution: string;
  solutionDesc: string;
}

@Component({
  selector: 'app-diagnostic-matrix',
  imports: [RevealDirective, CapacitacionSection],
  templateUrl: './diagnostic-matrix.html',
  styleUrl: './diagnostic-matrix.scss',
  animations: [
    trigger('expandCollapse', [
      transition(':enter', [
        style({ opacity: 0, height: 0 }),
        animate('250ms ease-out', style({ opacity: 1, height: '*' })),
      ]),
      transition(':leave', [animate('200ms ease-in', style({ opacity: 0, height: 0 }))]),
    ]),
    trigger('cardSwitch', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px) scale(0.97)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0) scale(1)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-20px) scale(0.97)' })),
      ]),
    ]),
    trigger('fadeSwitch', [
      transition(':enter', [style({ opacity: 0 }), animate('250ms ease-out', style({ opacity: 1 }))]),
      transition(':leave', [animate('200ms ease-in', style({ opacity: 0 }))]),
    ]),
  ],
})
export class DiagnosticMatrix {
  protected readonly challenges: Challenge[] = [
    {
      id: 4,
      pain: 'Pierdo tiempo en tareas operativas',
      painDesc:
        'Tu día se va en apagar incendios. No hay tiempo para planificar ni pensar estratégicamente.',
      solution: 'Asesoramiento administrativo integral',
      solutionDesc:
        'Reorganización de procesos y delegación efectiva para que vuelvas a liderar tu empresa.',
    },
    {
      id: 2,
      pain: 'No sé si mi negocio es rentable',
      painDesc:
        'Facturás pero no sabés a dónde va la plata. Los números no cierran y las decisiones se toman a ciegas.',
      solution: 'Tableros de control y KPI',
      solutionDesc:
        'Indicadores claros que te muestran la salud real de tu empresa. Decisiones basadas en datos, no en intuición.',
    },
    {
      id: 5,
      pain: 'No puedo proyectar financieramente',
      painDesc:
        'Sin presupuestos, sin proyecciones, sin un mapa claro de hacia dónde va tu empresa.',
      solution: 'Asesoramiento financiero y decisiones estratégicas',
      solutionDesc:
        'Planificación financiera, presupuestos y análisis de escenarios que convierten la incertidumbre en rumbo claro.',
    },
    {
      id: 3,
      pain: 'Mi equipo no está capacitado',
      painDesc:
        'Errores recurrentes, falta de autonomía y procesos que dependen de una sola persona.',
      solution: 'Programas de capacitación a medida',
      solutionDesc:
        'Formación práctica que transforma equipos: desde ordenamiento documental hasta herramientas de gestión del tiempo.',
    },
    {
      id: 1,
      pain: 'Desorden en papeles y registros',
      painDesc:
        'Documentos perdidos, información duplicada, procesos manuales que consumen tiempo valioso.',
      solution: 'Digitalización y entornos de control',
      solutionDesc:
        'Sistemas ordenados, flujos digitalizados y control documental que libera tu tiempo para lo que importa.',
    },
  ];

  protected readonly activeId = signal<number | null>(null);

  protected readonly active = computed(
    () => this.challenges.find((c) => c.id === this.activeId()) ?? null,
  );

  protected toggleActive(id: number): void {
    this.activeId.update((current) => (current === id ? null : id));
  }

  protected readonly situations: string[] = [
    'La administración y las finanzas me quitan tiempo que preferiría dedicar a otras áreas de la empresa.',
    'La toma de decisiones diarias depende, en su mayoría, de mí.',
    'Siento que tomo decisiones importantes sin tener apoyo en información clave.',
    'Mi empresa creció, pero la organización no acompañó este crecimiento.',
    'Quiero profesionalizar la gestión sin incorporar una gerencia permanente por lo que implica.',
  ];

  protected readonly selected = signal<number[]>([]);

  protected readonly count = computed(() => this.selected().length);

  protected toggleSituation(index: number): void {
    this.selected.update((prev) =>
      prev.includes(index) ? prev.filter((x) => x !== index) : [...prev, index],
    );
  }
}
