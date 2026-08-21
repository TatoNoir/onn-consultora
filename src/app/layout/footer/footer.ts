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
    { label: 'Esencia', href: '#esencia' },
    { label: 'Diagnóstico', href: '#diagnostico' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Metodología', href: '#metodologia' },
    { label: 'Sobre mí', href: '#sobre-mi' },
    { label: 'Contacto', href: '#contacto' },
  ];

  protected scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
