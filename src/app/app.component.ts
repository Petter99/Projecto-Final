import { Component } from '@angular/core';
import { ApiTesterPageComponent } from './features/api-tester/pages/api-tester-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ApiTesterPageComponent],
  template: '<app-api-tester-page></app-api-tester-page>'
})
export class AppComponent {}