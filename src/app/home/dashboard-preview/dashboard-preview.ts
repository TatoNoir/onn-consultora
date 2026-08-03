import { Component } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';

interface BarDatum {
  month: string;
  value: number;
  heightPct: number;
}

interface PieDatum {
  name: string;
  color: string;
  dashArray: string;
  dashOffset: string;
}

const PIE_RADIUS = 46.5;

@Component({
  selector: 'app-dashboard-preview',
  imports: [RevealDirective],
  templateUrl: './dashboard-preview.html',
  styleUrl: './dashboard-preview.scss',
})
export class DashboardPreview {
  protected readonly kpis = [
    { label: 'Rentabilidad', value: '+18.5%', className: 'dashboard__kpi-value--green' },
    { label: 'Costos/Ventas', value: '62.3%', className: 'dashboard__kpi-value--blue' },
    { label: 'Liquidez', value: '1.45', className: 'dashboard__kpi-value--amber' },
    { label: 'Procesos OK', value: '87%', className: 'dashboard__kpi-value--green' },
  ];

  protected readonly bars: BarDatum[] = (() => {
    const raw = [
      { month: 'Ene', value: 42 },
      { month: 'Feb', value: 58 },
      { month: 'Mar', value: 51 },
      { month: 'Abr', value: 70 },
      { month: 'May', value: 65 },
      { month: 'Jun', value: 85 },
    ];
    const max = Math.max(...raw.map((b) => b.value));
    return raw.map((b) => ({ ...b, heightPct: Math.round((b.value / max) * 78) }));
  })();

  protected readonly pie: PieDatum[] = (() => {
    const raw = [
      { name: 'Operativo', value: 35 },
      { name: 'Financiero', value: 25 },
      { name: 'Comercial', value: 25 },
      { name: 'RRHH', value: 15 },
    ];
    const colors = ['#005aee', '#eab308', '#94a3b8', '#cbd5e1'];
    const total = raw.reduce((sum, d) => sum + d.value, 0);
    const circumference = 2 * Math.PI * PIE_RADIUS;
    let accumulated = 0;
    return raw.map((d, i) => {
      const fraction = d.value / total;
      const segment: PieDatum = {
        name: d.name,
        color: colors[i],
        dashArray: `${fraction * circumference} ${circumference}`,
        dashOffset: `${-accumulated * circumference}`,
      };
      accumulated += fraction;
      return segment;
    });
  })();
}
