import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { WeatherStateService } from './services/weather-state.service';

import { SearchFormComponent } from './components/search-form.component';
import { LoadingStateComponent } from './components/loading-state.component';
import { ErrorStateComponent } from './components/error-state.component';
import { WeatherContentComponent } from './components/weather-content.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SearchFormComponent,
    LoadingStateComponent,
    ErrorStateComponent,
    WeatherContentComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="header">
      <div class="container">
        <h1 class="header__title">Weather Front</h1>
      </div>
    </header>

    <main class="main">
      <div class="container">
        @let currentState = state();

        <app-search-form
          [isLoading]="currentState.isLoading"
          (search)="onSearch($event)"
        ></app-search-form>

        <div class="weather-container" data-testid="weather-container">
          <app-loading-state [isVisible]="currentState.isLoading"></app-loading-state>

          <app-error-state
            [isVisible]="!!currentState.error && !currentState.isLoading"
            [message]="currentState.error"
          ></app-error-state>

          <app-weather-content
            [isVisible]="!!currentState.weatherData && !currentState.isLoading && !currentState.error"
            [weatherData]="currentState.weatherData"
          ></app-weather-content>
        </div>
      </div>
    </main>

    <footer class="footer">
      <div class="container">
        <p class="footer__text">
          Built with Angular • MIT License •
          <a href="https://github.com/Lissy93" class="footer__link" target="_blank" rel="noopener">
            Alicia Sykes
          </a>
        </p>
      </div>
    </footer>
  `
})
export class AppComponent {
  private readonly weatherStateService = inject(WeatherStateService);

  protected readonly state = this.weatherStateService.state;

  onSearch(city: string): void {
    this.weatherStateService.loadWeather(city);
  }
}
