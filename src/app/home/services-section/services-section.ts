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
      ],
    },
    {
      id: 'financiero',
      title: 'Asesoramiento Financiero',
      tags: ['future'],
      items: [
        'Armado de flujo de fondos (Free CashFlow)',
        'Presupuestos y proyecciones',
        'Estrategias sobre cobros y pagos',
      ],
    },
    {
      id: 'finanzas',
      title: 'Gestión Financiera',
      tags: ['future'],
      items: [
        'Herramientas financieras a la medida de tu Pyme',
        'Activación de financiamiento en Bancos',
        'Activación de financiamiento en Mercado de Capitales',
        'Armado de legajos para Bancos y SGR´s',
      ],
    },
    {
      id: 'estrategia',
      title: 'Decisiones Estratégicas',
      tags: ['future'],
      items: [
        'Alineación operativa con objetivos',
        'Tableros de control y KPI´s',
        'Análisis de rentabilidad',
        'Análisis de escenarios',
      ],
    },
    {
      id: 'soporte',
      title: 'Formación y capacitación',
      tags: ['team', 'order'],
      items: [
        'Capacitación en gestión para equipos',
        'Diseño de planes de acción',
        'Programas de mejora continua',
        'Soporte profesional permanente',
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
