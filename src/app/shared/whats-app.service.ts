import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WhatsAppService {

  constructor(private http: HttpClient) { }

  sendMessage(phoneNumber: string, message: string): Observable<any> {
    return this.http.post('/send-whatsapp', { phoneNumber, message });
  }
}
