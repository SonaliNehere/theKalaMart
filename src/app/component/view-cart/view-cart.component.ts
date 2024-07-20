import { Component } from '@angular/core';
import { DataService } from '../../shared/data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserFormComponent } from '../../home/user-form/user-form.component';
import { MediaQueryService } from '../../shared/media-query.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { LoaderService } from '../../shared/loader.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrl: './view-cart.component.css',
})
export class ViewCartComponent {
  cartProducts: any = [];
  displayedColumns: string[] = ['name', 'price', 'quantity', 'totalPrice'];
  totalPrice: number = 0;

  isMobile!: boolean;
  isLoading: boolean = false;

  errorMessage: any;

  constructor(
    private dataService: DataService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private mediaQueryService: MediaQueryService,
    private loaderService: LoaderService
  ) {
    this.isLoading = this.loaderService.show();
    this.dataService.getCartProducts().subscribe((res: any) => {
      console.log('res : ', res);
      if (res) {
        console.log('Products : ', res.products);
        this.cartProducts = res.products;
        this.getTotalPrice();
      }
      this.isLoading = this.loaderService.hide();
    });

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.mediaQueryService.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }

  openProduct(item: any): void {
    this.dataService.setData(item);
    this.router.navigate(['product']);
  }

  removeProductFromCart(productId: any) {
    // if (confirm('Are you sure you want to remove this product from cart?')) {
    const dialogConfig = new MatDialogConfig();

    // Set the position of the dialog
    dialogConfig.position = {
      top: '250px',
      // right: '20px',
    };

    dialogConfig.data = {
      message: 'Are you sure you want to remove this product from cart?',
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isLoading = this.loaderService.show();
        this.dataService
          .removeFromCart(productId)
          ?.then(() => {
            this.isLoading = this.loaderService.hide();
            console.log('Product removed from cart');
            // this.openSnackBar('Product removed from cart ', 'Close');
          })
          .catch((error: any) => {
            this.isLoading = this.loaderService.hide();
            console.error('Error while removing product from cart: ', error);
            this.openSnackBar(
              'Error while removing product from cart: ' + error,
              'Close'
            );
          });
        this.getTotalPrice();
      }
    });
    // }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000, // Specify the duration in milliseconds
    });
  }

  // emptyCart() {
  //   if (confirm('Are you sure you want to clear the cart ?')) {
  //     this.dataService
  //       .emptyCart()
  //       ?.then(() => {
  //         console.log('Cart cleared');
  //         this.openSnackBar('Cart cleared', 'Close');
  //       })
  //       .catch((error: any) => {
  //         console.error('Error while clearing the cart: ', error);
  //         this.openSnackBar('Error while clearing the cart: ' + error, 'Close');
  //       });
  //     this.getTotalPrice();
  //   }
  // }

  emptyCart(): void {
    const dialogConfig = new MatDialogConfig();

    // Set the position of the dialog
    dialogConfig.position = {
      top: '250px',
      // right: '20px',
    };

    dialogConfig.data = {
      message: 'Are you sure you want to clear the cart?',
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isLoading = this.loaderService.show();
        this.dataService
          .emptyCart()
          ?.then(() => {
            console.log('Cart cleared');
            this.isLoading = this.loaderService.hide();
            // this.openSnackBar('Cart cleared', 'Close');
            this.getTotalPrice();
          })
          .catch((error: any) => {
            console.error('Error while clearing the cart: ', error);
            this.isLoading = this.loaderService.hide();
            this.openSnackBar(
              'Error while clearing the cart: ' + error,
              'Close'
            );
          });
      }
    });
  }

  decreaseQuantity(quantity: any, productId: any, product: any): void {
    this.dataService
      .increaseDecreaseQuantity(productId, quantity - 1, product)
      ?.then(() => {
        console.log('Product quantity updated to cart');
        // this.openSnackBar('Product quantity updated to cart ', 'Close');
      })
      .catch((error: any) => {
        console.error(
          'Error while updating quantity of  product to cart: ',
          error
        );
        this.openSnackBar(
          'Error while updating quantity of  product to cart: ' + error,
          'Close'
        );
      });
    this.getTotalPrice();
  }

  increaseQuantity(quantity: any, productId: any, product: any): void {
    this.dataService
      .increaseDecreaseQuantity(productId, quantity + 1, product)
      ?.then(() => {
        console.log('Product quantity updated to cart');
        // this.openSnackBar('Product quantity updated to cart ', 'Close');
      })
      .catch((error: any) => {
        console.error(
          'Error while updating quantity of  product to cart: ',
          error
        );
        this.openSnackBar(
          'Error while updating quantity of  product to cart: ' + error,
          'Close'
        );
      });
    this.getTotalPrice();
  }

  getTotalPrice() {
    this.totalPrice = 0;
    for (const element of this.cartProducts) {
      this.totalPrice += element.product.price * element.quantity;
    }
    console.log('total price : ', this.totalPrice);
    return this.totalPrice;
  }

  openForm() {
    this.dataService.setIsMultipleProducts(true);
    this.dataService.setCartData(this.cartProducts);
    this.router.navigate(['user-form']);
  }

  routeToHome() {
    this.router.navigate(['dashboard']);
  }
}
