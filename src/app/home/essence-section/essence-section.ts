import { Component } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-essence-section',
  imports: [RevealDirective],
  templateUrl: './essence-section.html',
  styleUrl: './essence-section.scss',
})
export class EssenceSection {
  protected readonly imageSrc = '/lorena-thumb.svg';
}
