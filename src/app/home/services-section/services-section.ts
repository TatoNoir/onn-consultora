import { animate, style, transition, trigger } from '@angular/animations';
import { Component, computed, signal } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';

interface PainFilter {
  id: string;
  label: string;
}

interface Service {
  id: string;
  title: string;
  tags: string[];
  items: string[];
}

@Component({
  selector: 'app-services-section',
  imports: [RevealDirective],
  templateUrl: './services-section.html',
  styleUrl: './services-section.scss',
  animations: [
    trigger('cardReveal', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('{{duration}}ms {{delay}}ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' })),
      ]),
    ]),
  ],
})
export class ServicesSection {
  protected readonly painFilters: PainFilter[] = [
    { id: 'all', label: 'Todos' },
    { id: 'order', label: '¿Necesitás ordenar la casa?' },
    { id: 'future', label: '¿Necesitás proyectar el futuro?' },
    { id: 'team', label: '¿Necesitás preparar a tu equipo?' },
  ];

  protected readonly services: Service[] = [
    {
      id: 'organization',
      title: 'Organización y Asesoramiento Administrativo',
      tags: ['order'],
      items: [
        'Digitalización documental',
        'Diseño de procesos internos',
        'Entornos de control operativo',
        'Reestructuración organizacional',
      ],
    },
    {
      id: 'contable',
      title: 'Asesoramiento Contable',
      tags: ['order'],
      items: [
        'Auditorías internas y externas',
        'Registración y control contable',
        'Cumplimiento fiscal y normativo',
        'Reporting financiero periódico',
      ],
    },
    {
      id: 'financiero',
      title: 'Asesoramiento Financiero',
      tags: ['future'],
      items: [
        'Presupuestos y proyecciones',
        'Análisis de rentabilidad',
        'Planificación de flujo de fondos',
        'Evaluación de inversiones',
      ],
    },
    {
      id: 'estrategia',
      title: 'Decisiones Estratégicas',
      tags: ['future'],
      items: [
        'Tableros de control y KPI',
        'Análisis de escenarios',
        'Estrategia de crecimiento',
        'Alineación operativa con objetivos',
      ],
    },
    {
      id: 'soporte',
      title: 'Soporte y Capacitación',
      tags: ['team', 'order'],
      items: [
        'Capacitación en gestión para equipos',
        'Entrenamiento en herramientas digitales',
        'Programas de mejora continua',
        'Soporte técnico permanente',
      ],
    },
  ];

  protected readonly filter = signal('all');

  protected readonly filtered = computed(() =>
    this.filter() === 'all'
      ? this.services
      : this.services.filter((service) => service.tags.includes(this.filter())),
  );

  protected setFilter(id: string): void {
    this.filter.set(id);
  }
}
