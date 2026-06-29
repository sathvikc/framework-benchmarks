import { ChangeDetectionStrategy, Component, ElementRef, afterNextRender, inject, input, signal } from '@angular/core';
import { WeatherData } from '../types/weather.types';
import { ForecastItemComponent } from './forecast-item.component';

@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [ForecastItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (weatherData(); as weatherData) {
      <section class="forecast-section">
      <h2 class="section-title">7-Day Forecast</h2>
      <div class="forecast">
        <div class="forecast__list" data-testid="forecast-list">
          @for (date of weatherData.daily.time; track date; let i = $index) {
          <app-forecast-item
            [daily]="weatherData.daily"
            [index]="i"
            [isActive]="activeForecastIndex() === i"
            (toggle)="onToggleForecast($event)"
          ></app-forecast-item>
          }
        </div>
      </div>
      </section>
    }
  `
})
export class ForecastComponent {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly weatherData = input<WeatherData | null>(null);
  readonly activeForecastIndex = signal<number | null>(null);

  onToggleForecast(index: number): void {
    if (this.activeForecastIndex() === index) {
      this.activeForecastIndex.set(null);
    } else {
      this.activeForecastIndex.set(index);
      afterNextRender(() => {
        const activeElement = (this.elementRef.nativeElement as HTMLElement).querySelector('.forecast-item.active');
        if (activeElement) {
          activeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    }
  }
}
