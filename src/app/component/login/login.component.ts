import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private auth: AuthService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {}

  login() {
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

    this.auth.login(this.email, this.password);

    this.email = '';
    this.password = '';
  }

  signInWithGoogle() {
    this.auth.googleSignIn();
  }
}
