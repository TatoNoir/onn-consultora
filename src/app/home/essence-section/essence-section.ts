import { Component } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';

interface Value {
  icon: string;
  label: string;
  desc: string;
}

@Component({
  selector: 'app-essence-section',
  imports: [RevealDirective],
  templateUrl: './essence-section.html',
  styleUrl: './essence-section.scss',
})
export class EssenceSection {
  protected readonly imageSrc = '/lorena-thumb.svg';

  protected readonly values: Value[] = [
    { icon: 'heart', label: 'Empatía', desc: 'Entendemos tu realidad antes de opinar.' },
    { icon: 'eye', label: 'Escucha activa', desc: 'Tu historia es el punto de partida.' },
    { icon: 'handshake', label: 'Cercanía', desc: 'Caminamos a la par del empresario.' },
    { icon: 'lightbulb', label: 'Claridad', desc: 'Traducimos complejidad en acción.' },
  ];
}
