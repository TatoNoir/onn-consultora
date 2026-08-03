import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { RevealDirective } from '../../shared/reveal.directive';

interface QuizQuestion {
  area: string;
  q: string;
}

interface ChartPoint {
  area: string;
  value: number;
  fullMark: number;
}

const CHART_WIDTH = 380;
const CHART_HEIGHT = 260;
const CHART_CX = 190;
const CHART_CY = 130;
const CHART_RADIUS = 82;
const CHART_LABEL_RADIUS = 96;
const GRID_LEVELS = 5;

function polarPoint(angleIndex: number, total: number, radius: number): { x: number; y: number } {
  const angle = angleIndex * (360 / total) - 90;
  const rad = (angle * Math.PI) / 180;
  return { x: CHART_CX + radius * Math.cos(rad), y: CHART_CY + radius * Math.sin(rad) };
}

@Component({
  selector: 'app-thermometer-quiz',
  imports: [RevealDirective],
  templateUrl: './thermometer-quiz.html',
  styleUrl: './thermometer-quiz.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('viewEnter', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('350ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [animate('200ms ease-in', style({ opacity: 0 }))]),
    ]),
    trigger('slideIn', [
      transition('* => *', [
        style({ opacity: 0, transform: 'translateX(40px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
    ]),
    trigger('scaleIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.97)' }),
        animate('350ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [animate('200ms ease-in', style({ opacity: 0 }))]),
    ]),
  ],
})
export class ThermometerQuiz {
  protected readonly questions: QuizQuestion[] = [
    { area: 'Costos', q: '¿Qué tan claros tenés tus costos mensuales?' },
    { area: 'Documentación', q: '¿Tu documentación está organizada y digitalizada?' },
    { area: 'Procesos', q: '¿Tus procesos internos están definidos y funcionan?' },
    { area: 'Equipo', q: '¿Tu equipo trabaja con autonomía y eficiencia?' },
    { area: 'Finanzas', q: '¿Podés proyectar tus finanzas a 6 meses?' },
    { area: 'KPI', q: '¿Tenés indicadores claros para tomar decisiones?' },
    { area: 'Estrategia', q: '¿Tu empresa tiene un plan estratégico definido?' },
  ];

  protected readonly options = [
    { value: 1, label: 'Nada' },
    { value: 2, label: 'Poco' },
    { value: 3, label: 'Algo' },
    { value: 4, label: 'Bastante' },
    { value: 5, label: 'Totalmente' },
  ];

  protected readonly gridLevelsArray = Array.from({ length: GRID_LEVELS }, (_, i) => i + 1);

  protected readonly step = signal(-1);
  protected readonly answers = signal<Record<number, number>>({});
  protected readonly submitted = signal(false);

  protected readonly progressWidth = computed(
    () => `${((this.step() + 1) / this.questions.length) * 100}%`,
  );

  protected readonly chartData = computed<ChartPoint[]>(() =>
    this.submitted()
      ? this.questions.map((q, i) => ({ area: q.area, value: this.answers()[i] || 1, fullMark: 5 }))
      : [],
  );

  protected readonly avgScore = computed(() =>
    this.submitted()
      ? Object.values(this.answers()).reduce((a, b) => a + b, 0) / this.questions.length
      : 0,
  );

  protected readonly scoreLabel = computed(() => {
    const avg = this.avgScore();
    if (avg <= 2) return 'Necesita activación urgente';
    if (avg <= 3.5) return 'En camino, pero con potencial';
    return '¡Tu empresa está encendida!';
  });

  protected start(): void {
    this.step.set(0);
  }

  protected handleAnswer(value: number): void {
    this.answers.update((prev) => ({ ...prev, [this.step()]: value }));
    if (this.step() < this.questions.length - 1) {
      this.step.update((s) => s + 1);
    } else {
      this.submitted.set(true);
    }
  }

  protected goBack(): void {
    this.step.update((s) => s - 1);
  }

  protected reset(): void {
    this.step.set(-1);
    this.answers.set({});
    this.submitted.set(false);
  }

  protected gridLevels(level: number): string {
    const total = this.questions.length;
    return this.questions
      .map((_, i) => {
        const p = polarPoint(i, total, (CHART_RADIUS * level) / GRID_LEVELS);
        return `${p.x},${p.y}`;
      })
      .join(' ');
  }

  protected axisLines(): { x1: number; y1: number; x2: number; y2: number }[] {
    const total = this.questions.length;
    return this.questions.map((_, i) => {
      const p = polarPoint(i, total, CHART_RADIUS);
      return { x1: CHART_CX, y1: CHART_CY, x2: p.x, y2: p.y };
    });
  }

  protected radarPoints(): string {
    const data = this.chartData();
    return data
      .map((d, i) => {
        const p = polarPoint(i, data.length, (CHART_RADIUS * d.value) / 5);
        return `${p.x},${p.y}`;
      })
      .join(' ');
  }

  protected labels(): { x: number; y: number; anchor: string; text: string }[] {
    const total = this.questions.length;
    return this.questions.map((q, i) => {
      const p = polarPoint(i, total, CHART_LABEL_RADIUS);
      let anchor = 'middle';
      if (p.x < CHART_CX - 6) anchor = 'end';
      else if (p.x > CHART_CX + 6) anchor = 'start';
      return { x: p.x, y: p.y + 3, anchor, text: q.area };
    });
  }
}
