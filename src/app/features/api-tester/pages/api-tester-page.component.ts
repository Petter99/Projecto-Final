import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestFormComponent } from '../components/request-form/request-form.component';
import { ResponseViewerComponent } from '../components/response-viewer/response-viewer.component';
import { ApiTesterService } from '../../../../core/services/api-tester.service';
import { ApiRequest } from '../../../core/models/api-request.model';
import { ApiResponse } from '../../../core/models/api-response.model';

@Component({
  selector: 'app-api-tester-page',
  standalone: true,
  imports: [CommonModule, RequestFormComponent, ResponseViewerComponent],
  template: `
    <div class="container">
      <header class="header">
        <h1 class="title">API Tester</h1>
        <p class="subtitle">Prueba tus APIs de forma rápida y sencilla</p>
      </header>

      <div class="content">
        <div class="form-column">
          <app-request-form 
            (requestSubmitted)="onRequestSubmitted($event)">
          </app-request-form>
        </div>

        <div class="response-column">
          <app-response-viewer 
            [response]="response" 
            [loading]="loading">
          </app-response-viewer>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 40px 20px;
    }

    .header {
      text-align: center;
      margin-bottom: 48px;
    }

    .title {
      font-size: 48px;
      font-weight: 700;
      color: white;
      margin: 0 0 12px 0;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .subtitle {
      font-size: 18px;
      color: rgba(255, 255, 255, 0.9);
      margin: 0;
    }

    .content {
      max-width: 1400px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }

    .form-column,
    .response-column {
      min-width: 0;
    }

    @media (max-width: 1024px) {
      .content {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 768px) {
      .container {
        padding: 24px 16px;
      }

      .header {
        margin-bottom: 32px;
      }

      .title {
        font-size: 36px;
      }

      .subtitle {
        font-size: 16px;
      }

      .content {
        gap: 16px;
      }
    }
  `]
})
export class ApiTesterPageComponent {
  response: ApiResponse | null = null;
  loading = false;

  constructor(private apiTesterService: ApiTesterService) {}

  onRequestSubmitted(request: ApiRequest): void {
    this.loading = true;
    this.response = null;

    this.apiTesterService.executeRequest(request).subscribe({
      next: (response: ApiResponse) => {
        this.response = response;
        this.loading = false;
      },
      error: (error: ApiResponse) => {
        this.response = error;
        this.loading = false;
      }
    });
  }
}