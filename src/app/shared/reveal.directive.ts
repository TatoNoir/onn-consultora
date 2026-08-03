import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  HostBinding,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly cdr = inject(ChangeDetectorRef);
  private observer?: IntersectionObserver;

  @HostBinding('class.is-revealed')
  protected revealed = false;

  ngOnInit(): void {
    if (typeof IntersectionObserver === 'undefined') {
      this.revealed = true;
      return;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.revealed = true;
          this.observer?.disconnect();
          this.cdr.markForCheck();
        }
      },
      { threshold: 0.15 },
    );
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
