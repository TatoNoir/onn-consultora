import { Component } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';

interface Pillar {
  n: string;
  icon: 'layers' | 'handshake' | 'rocket' | 'eye' | 'lock';
  title: string;
  desc: string;
}

@Component({
  selector: 'app-why-onn-section',
  imports: [RevealDirective],
  templateUrl: './why-onn-section.html',
  styleUrl: './why-onn-section.scss',
})
export class WhyOnnSection {
  protected readonly pillars: Pillar[] = [
    {
      n: '01',
      icon: 'layers',
      title: 'Me involucro',
      desc: 'Conozco la empresa “desde adentro” antes de proponer cambios, con una mirada integral de gestión y finanzas, combinando análisis técnico con comprensión del negocio real.',
    },
    {
      n: '02',
      icon: 'handshake',
      title: 'Trabajo conjunto',
      desc: 'De forma complementaria a los equipos existentes y/o como apoyo estratégico para la dirección, aportando claridad, criterio y seguimiento.',
    },
    {
      n: '03',
      icon: 'rocket',
      title: 'Implemento',
      desc: 'Las mejoras no quedan en un informe. Se llevan a la práctica.',
    },
    {
      n: '04',
      icon: 'eye',
      title: 'Acompaño',
      desc: 'Estoy presente observando la evolución hasta que los cambios formen parte de la gestión cotidiana.',
    },
    {
      n: '05',
      icon: 'lock',
      title: 'Confianza y confidencialidad',
      desc: 'El acceso a información estratégica requiere un compromiso absoluto. Toda la información compartida es tratada como de estricta confidencialidad.',
    },
  ];
}
