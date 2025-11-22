import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiResponse } from '../../../../core/models/api-response.model';

@Component({
  selector: 'app-response-viewer',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './response-viewer.component.html',
  styleUrls: ['./response-viewer.component.css']
})
export class ResponseViewerComponent {
  @Input() response: ApiResponse | null = null;
  @Input() loading = false;

  get formattedBody(): string {
    if (!this.response?.body) return '';
    try {
      return JSON.stringify(this.response.body, null, 2);
    } catch {
      return String(this.response.body);
    }
  }

  get statusClass(): string {
    if (!this.response) return '';
    const status = this.response.statusCode;
    if (status >= 200 && status < 300) return 'status-success';
    if (status >= 300 && status < 400) return 'status-redirect';
    if (status >= 400 && status < 500) return 'status-client-error';
    if (status >= 500) return 'status-server-error';
    return 'status-unknown';
  }

  copyToClipboard(): void {
    if (this.formattedBody) {
      navigator.clipboard.writeText(this.formattedBody).then(() => {
        alert('Respuesta copiada al portapapeles');
      });
    }
  }
}