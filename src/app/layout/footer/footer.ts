import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly year = signal(new Date().getFullYear());

  protected readonly navLinks = [
    { label: 'Inicio', href: '#hero' },
    { label: 'Esencia', href: '#diferencia' },
    { label: 'Diagnóstico', href: '#termometro' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Metodología', href: '#metodologia' },
    { label: 'Sobre mí', href: '#esencia' },
    { label: 'Contacto', href: '#contacto' },
  ];

  protected scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
