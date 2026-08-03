import { AfterViewInit, Component, OnDestroy, signal } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-floating-cta',
  imports: [],
  templateUrl: './floating-cta.html',
  styleUrl: './floating-cta.scss',
  animations: [
    trigger('popIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0)' }),
        animate('700ms cubic-bezier(0.34, 1.56, 0.64, 1)', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
    ]),
  ],
})
export class FloatingCta implements AfterViewInit, OnDestroy {
  protected readonly visible = signal(false);

  private timer: ReturnType<typeof setTimeout> | undefined;

  ngAfterViewInit(): void {
    this.timer = setTimeout(() => this.visible.set(true), 2000);
  }

  ngOnDestroy(): void {
    if (this.timer) clearTimeout(this.timer);
  }
}
