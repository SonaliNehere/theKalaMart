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
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  email: any;
  data: any;

  userData: any;

  products: any[] = [];
  orderTotal = 0;
  productIdsToRemove: any[] = [];

  uploadedFiles: { file: File; filePath: string; url: string }[] = [];
  isDeleteImage: boolean = false;

  orderId: string = '';

  isMultipleProducts: boolean = false;

  isLoading: boolean = false;

  constructor(
    private _snackBar: MatSnackBar,
    private dataService: DataService,
    private firestore: AngularFirestore,
    private router: Router,
    private storage: AngularFireStorage,
    private dialog: MatDialog,
    private loaderService: LoaderService,
  ) {
    this.data = this.dataService.getCartData();
    console.log('data : ', this.data);

    this.isMultipleProducts = this.dataService.getIsMultipleProducts();
    console.log('isMultipleProducts : ', this.isMultipleProducts);
    if (!this.isMultipleProducts) {
      this.orderId = this.firestore.createId();
    }

    this.getUser();
  }

  ngOnInit() {
    this.email = localStorage.getItem('email');
    // this.email = this.dataService.getEmail();
  }

  senderEmail: string = 'neherenirmala@gmail.com';

  formData = {
    // name: '',
    // address: '',
    // contact: '',

    name: '',
    contact: 0,
    address: '',
  };

  submitForm(form: NgForm) {
    if (!this.isDeleteImage) {
      if (form.valid) {
        // if (confirm('Are you sure you want to place order ?')) {
        const dialogConfig = new MatDialogConfig();

        // Set the position of the dialog
        dialogConfig.position = {
          top: '250px',
          // right: '20px',
        };

        dialogConfig.data = {
          message: 'Are you sure you want to place order?',
        };

        const dialogRef = this.dialog.open(
          ConfirmDialogComponent,
          dialogConfig
        );

        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.isLoading = this.loaderService.show();
            // Form is valid, handle submission
            console.log(this.formData); // For demonstration, you can replace this with your submission logic
            this.sendEmailDynamic();
          }
        });
        // }
      } else {
        // Form is invalid, display error messages or handle accordingly
        console.log('invalid form');
      }
    }
  }

  sendEmailDynamic() {
    // const orderId = this.firestore.createId();

    // console.log("length of cart : ", this.data.length);
    let msg: any =
      'This email is from ' +
      this.email +
      '\n' +
      'Name : ' +
      this.formData.name +
      '\n' +
      'Addess : ' +
      this.formData.address +
      '\n' +
      'Contact number : ' +
      this.formData.contact +
      '\n' +
      'uid of user : ' +
      localStorage.getItem('uid') +
      // this.dataService.getEmail() +
      '\n\n';

    if (this.isIterable(this.data)) {
      this.data.forEach((element: any, index: number) => {
        const orderId = this.firestore.createId();
        this.orderTotal += element.product.price * element.quantity;
        this.products.push({
          product: element.product,
          quantity: element.quantity,
          orderTotal: element.product.price * element.quantity,
          orderId: orderId,
        });
        msg +=
          `${index + 1}] product id: ${element.productId}\n` +
          `product name: ${element.product.name}\n` +
          `product price: ${element.product.price}\n` +
          `quantity: ${element.quantity}\n` +
          `product description: ${element.product.desc}\n` +
          `product total: ${element.product.price * element.quantity}\n` +
          `orderId: ${orderId}\n\n`;

        this.productIdsToRemove.push(element.productId);
      });
      msg += `orderTotal: ${this.orderTotal}\n\n`;
    } else {
      // const orderId = this.firestore.createId();
      // this.orderId = orderId;
      console.log('this.orderId : ', this.orderId);
      this.products.push({
        product: this.data,
        quantity: 1,
        orderTotal: this.data.price,
        orderId: this.orderId,
      });
      msg =
        msg +
        'product id : ' +
        this.data.id +
        '\n' +
        'product name : ' +
        this.data.name +
        '\n' +
        'product price : ' +
        this.data.price +
        '\n' +
        'product description : ' +
        this.data.desc +
        '\n' +
        'Order Total : ' +
        this.data.price +
        '\n' +
        'Order Id : ' +
        this.orderId;
    }
    console.log('msg : ', msg);
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
          this.isLoading = this.loaderService.hide();
          console.log('Email sent successfully:', response);
          this.openSnackBar(
            'Your order is placed. ',
            'Close'
          );
          this.router.navigate(['dashboard']);
          this.dataService.setIsMultipleProducts(false);
          if (this.isIterable(this.data)) {
            // this.dataService
            //   .removeProductsFromCart(this.productIdsToRemove)
            //   ?.then(() => {
            //     console.log('Product removed from cart');
            //     this.openSnackBar('Product removed from cart', 'Close');
            //   })
            //   .catch((error: any) => {
            //     console.error('Error while removing product from cart:', error);
            //     this.openSnackBar(
            //       'Error while removing product from cart: ' + error,
            //       'Close'
            //     );
            //   });

            //empty the cart
            this.dataService
              .emptyCart()
              ?.then(() => {
                console.log('Cart cleared');
                // this.openSnackBar('Cart cleared', 'Close');
              })
              .catch((error: any) => {
                console.error('Error while clearing the cart: ', error);
                this.openSnackBar(
                  'Error while clearing the cart: ' + error,
                  'Close'
                );
              });

            //save order
            this.dataService
              .addToOrders(
                this.products, // pass the array of products
                this.orderTotal,
                this.formData.address
              )
              ?.then(() => {
                console.log('Products added to orders');
                // this.openSnackBar('Products added to orders', 'Close');
                console.log('product array of multiple : ', this.products);
                this.products = [];
                this.orderTotal = 0;
              })
              .catch((error: any) => {
                console.error('Error adding products to orders:', error);
                this.openSnackBar(
                  'Error adding products to orders: ' + error,
                  'Close'
                );
              });
          } else {
            //save order
            this.dataService
              .addToOrders(
                this.products,
                this.data.price,
                this.formData.address
              )
              ?.then(() => {
                // this.openSnackBar('Product added to orders ', 'Close');
                console.log('product array of one : ', this.products);
                // this.placeOrder();

                this.products = [];
                this.orderTotal = 0;
              })
              .catch((error: any) => {
                console.error('Error adding product to orders:', error);
                this.openSnackBar(
                  'Error adding product to orders: ' + error,
                  'Close'
                );
              });
          }
        },
        (error) => {
          console.error('Email sending failed:', error);
          this.openSnackBar('Email sending failed ', 'Close');
          this.isLoading = this.loaderService.hide();
          this.router.navigate(['dashboard']);
        }
      );
    // this.dialogRef.close();
    // if (this.isIterable(this.data)) {
    //   this.router.navigate(['dashboard']);
    // } else {
    //   // this.openProduct(this.data);
    //   this.router.navigate(['dashboard']);
    // }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000, // Specify the duration in milliseconds
    });
  }

  isIterable(value: any): boolean {
    return Symbol.iterator in Object(value);
  }

  openProduct(item: any): void {
    this.dataService.setData(item);
    this.router.navigate(['product']);
  }

  routeToHome() {
    this.router.navigate(['dashboard']);
  }

  // placeOrder(): void {
  //   // Logic to place order
  //   const message = {
  //     title: 'New Order Received',
  //     body: 'A new order has been placed.',
  //   };
  //   this.adminService
  //     .getAdminFCMToken()
  //     .then((adminFCMToken) => {
  //       console.log('adminFCMToken : ', adminFCMToken);
  //       this.notificationService.sendNotificationToAdmin(
  //         message,
  //         adminFCMToken
  //       );
  //     })
  //     .catch((error) => {
  //       console.error('Error getting admin FCM token:', error);
  //     });
  // }

  onFileChange(event: any, fileInput: HTMLInputElement) {
    this.isLoading = this.loaderService.show();
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file) {
        this.uploadFile(file);
      }
    }
    fileInput.value = ''; // Reset the input field
  }

  uploadFile(file: File) {
    const filePath = `order_images/${this.orderId}/${new Date().getTime()}_${
      file.name
    }`;
    const fileRef = this.storage.ref(filePath);
    const task = fileRef.put(file);

    task
      .snapshotChanges()
      .toPromise()
      .then(() => {
        fileRef
          .getDownloadURL()
          .toPromise()
          .then((url) => {
            this.uploadedFiles.push({ file, filePath, url });
            this.isLoading = this.loaderService.hide();
            // this._snackBar.open('Image uploaded successfully', 'Close', {
            //   duration: 3000,
            // });
          });
      })
      .catch((error) => {
        this.isLoading = this.loaderService.hide();
        this._snackBar.open('Error uploading image: ' + error, 'Close', {
          duration: 3000,
        });
        console.error('Error uploading image:', error);
        
      });
  }

  deleteImage(
    fileToDelete: { file: File; filePath: string; url: string },
    event: Event
  ) {
    this.isDeleteImage = true;
    // if (confirm('Are you sure you want to delete this image ?')) {
    const dialogConfig = new MatDialogConfig();

    // Set the position of the dialog
    dialogConfig.position = {
      top: '250px',
      // right: '20px',
    };

    dialogConfig.data = {
      message: 'Are you sure you want to delete this image?',
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isLoading = this.loaderService.show();
        event.stopPropagation(); // Prevent form submission
        const fileRef = this.storage.ref(fileToDelete.filePath);
        fileRef
          .delete()
          .toPromise()
          .then(() => {
            this.uploadedFiles = this.uploadedFiles.filter(
              (file) => file.filePath !== fileToDelete.filePath
            );
            this.isLoading = this.loaderService.hide();
            // this._snackBar.open('Image deleted successfully', 'Close', {
            //   duration: 3000,
            // });
            
            this.isDeleteImage = false;
          })
          .catch((error) => {
            this.isLoading = this.loaderService.hide();
            this._snackBar.open('Error deleting image: ' + error, 'Close', {
              duration: 3000,
            });
            console.error('Error deleting image:', error);
          });
      }
    });
    // }
  }

  getUser() {
    this.isLoading = this.loaderService.show();
    this.dataService
      .getUserDetails(localStorage.getItem('uid'))
      .then((userDetails) => {
        if (userDetails) {
          console.log('User details:', userDetails);

          this.dataService.setUserData(userDetails.user);

          this.userData = this.dataService.getUserData();
          console.log('userData : ', this.userData);
          this.isLoading = this.loaderService.hide();
          this.formData = {
            name: this.userData.name,
            contact: this.userData.contact,
            address: this.userData.address,
          };
        } else {
          console.log('No user found');
          this.isLoading = this.loaderService.hide();
        }
      });
  }
}
