import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, signal } from '@angular/core';

interface NavItem {
  label: string;
  href: string;
}

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  animations: [
    trigger('overlay', [
      transition(':enter', [style({ opacity: 0 }), animate('250ms ease-out', style({ opacity: 1 }))]),
      transition(':leave', [animate('200ms ease-in', style({ opacity: 0 }))]),
    ]),
    trigger('staggerLinks', [
      transition(':enter', [
        query('a', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(80, animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))),
        ]),
      ]),
    ]),
  ],
})
export class Navbar {
  protected readonly navItems: NavItem[] = [
    { label: 'Inicio', href: '#hero' },
    { label: 'Esencia', href: '#diferencia' },
    { label: 'Diagnóstico', href: '#termometro' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Metodología', href: '#metodologia' },
    { label: 'Sobre mí', href: '#esencia' },
    { label: 'Contacto', href: '#contacto' },
  ];

  protected readonly isOpen = signal(false);
}
