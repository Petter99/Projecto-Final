// src/app/features/api-tester/components/request-form/request-form.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpMethod } from '../../../../core/models/http-method.enum';
import { ApiRequest, HeaderItem } from '../../../../core/models/api-request.model';

@Component({
  selector: 'app-request-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css']
})
export class RequestFormComponent {
  @Output() requestSubmitted = new EventEmitter<ApiRequest>();

  url = '';
  selectedMethod: HttpMethod = HttpMethod.GET;
  headers: HeaderItem[] = [];
  bodyText = '';

  httpMethods = Object.values(HttpMethod);

  get methodsWithBody(): boolean {
    return [HttpMethod.POST, HttpMethod.PUT, HttpMethod.PATCH].includes(this.selectedMethod);
  }

  addHeader(): void {
    this.headers.push({ key: '', value: '' });
  }

  removeHeader(index: number): void {
    this.headers.splice(index, 1);
  }

  onSubmit(): void {
    if (!this.url.trim()) {
      alert('Por favor ingresa una URL válida');
      return;
    }

    const headersObj: { [key: string]: string } = {};
    this.headers.forEach(header => {
      if (header.key.trim() && header.value.trim()) {
        headersObj[header.key.trim()] = header.value.trim();
      }
    });

    let body = undefined;
    if (this.methodsWithBody && this.bodyText.trim()) {
      try {
        body = JSON.parse(this.bodyText);
      } catch (e) {
        alert('El body debe ser un JSON válido');
        return;
      }
    }

    const request: ApiRequest = {
      url: this.url,
      method: this.selectedMethod,
      headers: headersObj,
      body
    };

    this.requestSubmitted.emit(request);
  }

  formatJson(): void {
    if (this.bodyText.trim()) {
      try {
        const parsed = JSON.parse(this.bodyText);
        this.bodyText = JSON.stringify(parsed, null, 2);
      } catch (e) {
        alert('JSON inválido, no se puede formatear');
      }
    }
  }
}