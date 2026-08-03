import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { RevealDirective } from '../../shared/reveal.directive';

interface CapacitacionModule {
  icon: string;
  title: string;
  desc: string;
  duration: string;
}

interface SurveyQuestion {
  q: string;
  modules: string[];
}

type Answer = 'si' | 'no';

@Component({
  selector: 'app-capacitacion-section',
  imports: [RevealDirective],
  templateUrl: './capacitacion-section.html',
  styleUrl: './capacitacion-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('250ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class CapacitacionSection {
  protected readonly modules: CapacitacionModule[] = [
    {
      icon: 'file-text',
      title: 'Ordenamiento Documental',
      desc: 'Clasificación, archivo y digitalización de documentación empresarial.',
      duration: '8 hs',
    },
    {
      icon: 'clock',
      title: 'Gestión del Tiempo',
      desc: 'Herramientas y métodos para optimizar la productividad del equipo.',
      duration: '6 hs',
    },
    {
      icon: 'zap',
      title: 'Herramientas Digitales',
      desc: 'Capacitación en software de gestión, planillas y automatizaciones.',
      duration: '10 hs',
    },
    {
      icon: 'users',
      title: 'Liderazgo y Delegación',
      desc: 'Desarrollo de competencias de liderazgo para mandos medios.',
      duration: '8 hs',
    },
    {
      icon: 'book-open',
      title: 'Lectura de Estados Financieros',
      desc: 'Interpretación de reportes contables para la toma de decisiones.',
      duration: '6 hs',
    },
  ];

  protected readonly surveyQuestions: SurveyQuestion[] = [
    { q: '¿Tu equipo maneja bien la documentación?', modules: ['Ordenamiento Documental'] },
    { q: '¿Hay problemas de productividad o plazos?', modules: ['Gestión del Tiempo'] },
    { q: '¿Usan herramientas digitales de gestión?', modules: ['Herramientas Digitales'] },
    { q: '¿Los mandos medios necesitan fortalecer su liderazgo?', modules: ['Liderazgo y Delegación'] },
    { q: '¿El equipo entiende los reportes financieros?', modules: ['Lectura de Estados Financieros'] },
  ];

  protected readonly answers = signal<Record<number, Answer>>({});
  protected readonly showResults = signal(false);

  protected readonly allAnswered = computed(
    () => Object.keys(this.answers()).length === this.surveyQuestions.length,
  );

  protected readonly recommended = computed(() =>
    this.showResults()
      ? this.surveyQuestions
          .filter((_, i) => this.answers()[i] === 'no')
          .flatMap((sq) => sq.modules)
      : [],
  );

  protected handleAnswer(index: number, value: Answer): void {
    this.answers.update((prev) => ({ ...prev, [index]: value }));
  }

  protected showRecommended(): void {
    this.showResults.set(true);
  }

  protected isRecommended(title: string): boolean {
    return this.recommended().includes(title);
  }
}
