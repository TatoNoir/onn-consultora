import { Component } from '@angular/core';
import { CapacitacionSection } from '../../home/capacitacion-section/capacitacion-section';
import { ContactSection } from '../../home/contact-section/contact-section';
import { DashboardPreview } from '../../home/dashboard-preview/dashboard-preview';
import { DiagnosticMatrix } from '../../home/diagnostic-matrix/diagnostic-matrix';
import { EssenceSection } from '../../home/essence-section/essence-section';
import { FloatingCta } from '../../layout/floating-cta/floating-cta';
import { Footer } from '../../layout/footer/footer';
import { HeroSection } from '../../home/hero-section/hero-section';
import { MethodologyTimeline } from '../../home/methodology-timeline/methodology-timeline';
import { ThermometerQuiz } from '../../home/thermometer-quiz/thermometer-quiz';
import { ServicesSection } from '../../home/services-section/services-section';
import { Navbar } from '../../layout/navbar/navbar';

@Component({
  selector: 'app-home',
  imports: [
    Navbar,
    HeroSection,
    DiagnosticMatrix,
    ServicesSection,
    DashboardPreview,
    MethodologyTimeline,
    EssenceSection,
    CapacitacionSection,
    ThermometerQuiz,
    ContactSection,
    Footer,
    FloatingCta,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
