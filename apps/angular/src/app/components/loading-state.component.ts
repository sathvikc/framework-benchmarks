import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-loading-state',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="loading"
      data-testid="loading"
      [hidden]="!isVisible()"
    >
      <div class="loading__spinner"></div>
      <p>Loading weather data...</p>
    </div>
  `
})
export class LoadingStateComponent {
  readonly isVisible = input(false);
}
