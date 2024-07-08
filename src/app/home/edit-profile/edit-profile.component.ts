
import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import * as emailjs from 'emailjs-com';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../../shared/data.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AdminService } from '../../shared/admin.service';
import { NotificationService } from '../../shared/notification.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { LoaderService } from '../../shared/loader.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  data: any;
  disableForm: boolean = true;

  formData = {
    name: '',
    email: '',
    contact: 0,
    address: '',
  };
  
  isLoading: boolean = false;
  isCancle: boolean = false;
  displayHome: boolean = true;

  constructor(
    private _snackBar: MatSnackBar,
    private dataService: DataService,
    private router: Router,
    private dialog: MatDialog,
    private loaderService: LoaderService,
  ) {
    this.data = this.dataService.getUserData();
    console.log("data : ", this.data);
    this.formData = {
      name: this.data.name,
      email: this.data.email,
      contact: this.data.contact,
      address: this.data.address,
     
    };
  }

  ngOnInit() {
  }

  submitForm(form: NgForm) {
    this.isCancle = false;
    this.isLoading = this.loaderService.show();
    this.dataService
    .updateUserDetails(localStorage.getItem("uid"), this.formData.name, this.formData.contact, this.formData.address)
    .then(() => {
      console.log('User updated');
      this.disableForm = true;
      this.displayHome = true;
      this.isLoading = this.loaderService.hide();
    });
  }

  editProfile(){
    this.disableForm = false;
    this.displayHome = false;
  }

  routeToHome() {
    this.router.navigate(['dashboard']);
  }

  OnCancle(){
    this.isCancle = true;
    this.displayHome = true;
  }

 

 
  
}

