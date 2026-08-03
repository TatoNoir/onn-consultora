import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { RevealDirective } from '../../shared/reveal.directive';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface ToastMessage {
  type: 'success' | 'error';
  text: string;
}

@Component({
  selector: 'app-contact-section',
  imports: [RevealDirective],
  templateUrl: './contact-section.html',
  styleUrl: './contact-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('toastIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-8px)' }),
        animate('250ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [animate('200ms ease-in', style({ opacity: 0 }))]),
    ]),
  ],
})
export class ContactSection {
  protected readonly form = signal<ContactForm>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  protected readonly sending = signal(false);
  protected readonly toast = signal<ToastMessage | null>(null);

  private toastTimer: ReturnType<typeof setTimeout> | undefined;

  protected onInput(field: keyof ContactForm, value: string): void {
    this.form.update((f) => ({ ...f, [field]: value }));
  }

  protected async handleSubmit(event: Event): Promise<void> {
    event.preventDefault();
    const { name, email, message } = this.form();
    if (!name || !email || !message) {
      this.showToast('error', 'Por favor completá los campos obligatorios.');
      return;
    }
    this.sending.set(true);
    await new Promise((r) => setTimeout(r, 1200));
    this.showToast('success', '¡Mensaje enviado! Te contactaremos pronto.');
    this.form.set({ name: '', email: '', phone: '', message: '' });
    this.sending.set(false);
  }

  private showToast(type: ToastMessage['type'], text: string): void {
    this.toast.set({ type, text });
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.toast.set(null), 3200);
  }
}
