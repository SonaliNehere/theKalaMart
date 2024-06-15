import { Injectable } from '@angular/core';
import * as emailjs from 'emailjs-com';

@Injectable({
  providedIn: 'root',
})
export class SendEmailService {
  email: any;
  constructor() {
    this.email = localStorage.getItem('email');
  }

  sendEmailDynamic(msg: any) {
    emailjs
      .send(
        'service_g6he87p',
        'template_4cr5o15',
        {
          from_email: this.email,
          to_name: 'The Kala Mart',
          message: msg,
        },
        'iIFTxXkO9DQP7kcGH'
      )
      .then(
        (response) => {
          console.log('Email sent successfully:', response);
        },
        (error) => {
          console.error('Email sending failed:', error);
        }
      );
  }
}
