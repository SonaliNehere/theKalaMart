import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  email: string = '';
  password: string = '';
  name: string = '';
  contact: number = 0;

  constructor(private auth: AuthService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {}

  register() {
    if (this.email == '') {
      // alert('Please enter email');
      this.dialog.open(ErrorDialogComponent, {
        data: {
          message: 'Please enter email'
        }
      });
      return;
    }

    if (this.password == '') {
      // alert('Please enter password');
      this.dialog.open(ErrorDialogComponent, {
        data: {
          message: 'Please enter password'
        }
      });
      return;
    }

    if (this.name == '') {
      // alert('Please enter your name');
      this.dialog.open(ErrorDialogComponent, {
        data: {
          message: 'Please enter your name'
        }
      });
      return;
    }

    if (this.contact == 0) {
      // alert('Please enter contact number');
      this.dialog.open(ErrorDialogComponent, {
        data: {
          message: 'Please enter contact number'
        }
      });
      return;
    }

    this.auth.register(this.email, this.password, this.name, this.contact);

    this.email = '';
    this.password = '';
    this.name = '';
    this.contact = 0;
  }
}
