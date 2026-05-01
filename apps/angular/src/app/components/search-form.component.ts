import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="search-section">
      <form class="search-form" data-testid="search-form" (ngSubmit)="onSubmit()">
        <div class="search-form__group">
          <label for="location-input" class="sr-only">Enter city name</label>
          <input
            #locationInput
            type="text"
            id="location-input"
            class="search-input"
            placeholder="Enter city name..."
            data-testid="search-input"
            autocomplete="off"
            [ngModel]="city()"
            (ngModelChange)="city.set($event)"
            name="city"
          />
          <button
            type="submit"
            class="search-button"
            data-testid="search-button"
            [disabled]="isLoading()"
          >
            <span class="search-button__text">
              {{ isLoading() ? 'Loading...' : 'Get Weather' }}
            </span>
            <span class="search-button__icon">🌦️</span>
          </button>
        </div>
      </form>
    </section>
  `
})
export class SearchFormComponent {
  readonly isLoading = input(false);
  readonly search = output<string>();
  readonly city = signal(this.getSavedLocation() ?? 'London');

  onSubmit(): void {
    const city = this.city().trim();

    if (!city) {
      return;
    }

    this.city.set(city);
    this.search.emit(city);
  }

  private getSavedLocation(): string | null {
    try {
      return localStorage.getItem('weather-app-location');
    } catch (error) {
      console.warn('Could not load saved location:', error);
      return null;
    }
  }
}
