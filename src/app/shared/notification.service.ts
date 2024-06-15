import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  sendNotificationToAdmin(message: any, adminFCMToken: string): void {
    const payload = {
      notification: message,
      token: adminFCMToken
    };
    fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'key=BMKhwG8SLqI2dWerok8Hvw9N6yZ9PE_wGOJMwsa8Cwus' 
      },
      body: JSON.stringify(payload)
    });
  }
}
