import {
  Component,
  Inject,
  AfterViewInit,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

import { UserFormComponent } from '../user-form/user-form.component';
import { DataService } from '../../shared/data.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoaderService } from '../../shared/loader.service';
import { Location } from '@angular/common';

declare var Razorpay: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  data: any;

  isLoading: boolean = false;

  private savedScrollPosition: number = 0;

  constructor(
    private dataService: DataService,
    private fireStorage: AngularFireStorage,
    private firestore: AngularFirestore,
    private _snackBar: MatSnackBar,
    private router: Router,
    private loaderService: LoaderService,
    private el: ElementRef,
    private renderer: Renderer2,
    private location: Location
  ) {
    this.data = this.dataService.getData();
  }

  ngAfterViewInit() {
    const button = this.el.nativeElement.querySelector('.buy');
    this.renderer.setStyle(button, 'background-color', 'purple');
    this.renderer.setStyle(button, 'color', 'white');
  }

  openForm(data: any) {
    console.log('data : ', data);
    data.isOrderCancled = false;
    console.log('data : ', data);
    this.dataService.setCartData(data);
    this.dataService.setIsMultipleProducts(false);
    this.router.navigate(['user-form']);
  }

  addToCart(quantity: any): void {
    // this.isLoading = this.loaderService.show();
    const productId = this.data.id; // Replace with actual product ID
    this.data.isOrderCancled = false;
    console.log('data : ', this.data);

    this.dataService
      .addToCart(productId, quantity, this.data)
      ?.then(() => {
        console.log('Product added to cart');
        this.openSnackBar('Product added to cart ', 'Close');
        // this.isLoading = this.loaderService.hide();
      })
      .catch((error: any) => {
        console.error('Error adding product to cart:', error);
        this.openSnackBar('Error adding product to cart: ' + error, 'Close');
        // this.isLoading = this.loaderService.hide();
      });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000, // Specify the duration in milliseconds
    });
  }

  routeToHome() {
    this.router.navigate(['dashboard']);
  }

  routeBack() {
    this.location.back(); // Navigate back to the previous page
  }

  payNow() {
    const RozarpayOptions = {
      description: 'Sample Razorpay demo',
      currency: 'INR',
      amount: 100,
      name: 'Sai',
      key: 'rzp_test_erITWzQfolL9Hj',
      image: 'https://i.imgur.com/FApqk3D.jpeg',
      prefill: {
        name: 'sai kumar',
        email: 'sai@gmail.com',
        phone: '9898989898',
      },
      theme: {
        color: '#6466e3',
      },
      modal: {
        ondismiss: () => {
          console.log('dismissed');
        },
      },
    };

    const successCallback = (paymentid: any) => {
      console.log(paymentid);
    };

    const failureCallback = (e: any) => {
      console.log(e);
    };

    Razorpay.open(RozarpayOptions, successCallback, failureCallback);
  }
}
