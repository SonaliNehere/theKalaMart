import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  
  email: string = '';
  password: string = '';
  name: string = '';
  contact: number | '' = ''; // Ensure this is either a number or an empty string

  passwordFieldType: string = 'password';

  constructor(
    private auth: AuthService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  togglePasswordVisibility() {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  // register() {
  //   if (this.email == '') {
  //     // alert('Please enter email');
  //     this.dialog.open(ErrorDialogComponent, {
  //       data: {
  //         message: 'Please enter email'
  //       }
  //     });
  //     return;
  //   }

  //   if (this.password == '') {
  //     // alert('Please enter password');
  //     this.dialog.open(ErrorDialogComponent, {
  //       data: {
  //         message: 'Please enter password'
  //       }
  //     });
  //     return;
  //   }

  //   if (this.name == '') {
  //     // alert('Please enter your name');
  //     this.dialog.open(ErrorDialogComponent, {
  //       data: {
  //         message: 'Please enter your name'
  //       }
  //     });
  //     return;
  //   }

  //   if (this.contact == 0) {
  //     // alert('Please enter contact number');
  //     this.dialog.open(ErrorDialogComponent, {
  //       data: {
  //         message: 'Please enter contact number'
  //       }
  //     });
  //     return;
  //   }

  //   this.auth.register(this.email, this.password, this.name, this.contact);

  //   this.email = '';
  //   this.password = '';
  //   this.name = '';
  //   this.contact = 0;
  // }

  register() {
    if (this.email === '' || this.password === '' || this.name === '' || this.contact === '') {
      this.dialog.open(ErrorDialogComponent, {
        data: { message: 'All fields are required' }
      });
      return;
    }

    this.auth.register(this.email, this.password, this.name, this.contact);

    this.email = '';
    this.password = '';
    this.name = '';
    this.contact = '';
  }
}
