import { Component } from '@angular/core';
import { loadavg } from 'os';
import { AuthService } from '../../shared/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from '../../shared/data.service';
// import { LoaderService } from '../../shared/loader.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  constructor(
    private auth: AuthService,
    private dialogRef: MatDialogRef<ProfileComponent>,
    private router: Router,
    private dataService: DataService,
    // private loaderService: LoaderService,
  ) {
    this.email = localStorage.getItem('email');

    this.getUser();
  }

  ngOnInit(): void {
  }

  email: any;
  userDetails: any = '';
  name: any = '';

  // isLoading: boolean = false;

  logout() {
    this.dialogRef.close();
    this.auth.logout();
  }

  myOrders() {
    this.router.navigate(['orders']);
    this.dialogRef.close();
  }
  
  getUser() {

    // this.isLoading = this.loaderService.show();
    this.dataService.getUserDetails(localStorage.getItem("uid")).then((userDetails) => {
      if (userDetails) {
        console.log('User details:', userDetails);
        this.userDetails = userDetails;
        this.name = this.userDetails.user.name;

        // this.isLoading = this.loaderService.hide();
        this.dataService.setUserData(this.userDetails.user);
      } else {
        console.log('No user found');
        // this.isLoading = this.loaderService.hide();
      }
    });
  }

  showUserDetails(){
    this.router.navigate(['edit-profile']);
    this.dialogRef.close();
  }
}
