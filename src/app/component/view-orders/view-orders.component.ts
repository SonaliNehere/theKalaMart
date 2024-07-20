import { Component } from '@angular/core';
import { DataService } from '../../shared/data.service';
import { Router } from '@angular/router';
import { SendEmailService } from '../../shared/send-email.service';
import { MediaQueryService } from '../../shared/media-query.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoaderService } from '../../shared/loader.service';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrl: './view-orders.component.css',
})
export class ViewOrdersComponent {
  orders: any[] = [];
  sortedOrders: any[] = [];
  // private intervalId: any;

  isMobile!: boolean;

  isLoading: boolean = false;

  private unsubscribe: any;

  constructor(
    private dataService: DataService,
    private router: Router,
    private sendEmailService: SendEmailService,
    private mediaQueryService: MediaQueryService,
    private dialog: MatDialog,
    private loaderService: LoaderService
  ) {
    // this.startInterval();
  }

  // startInterval(): void {
  //   // Start the interval
  //   this.intervalId = setInterval(() => {
  //     this.fetchOrders();
  //   }, 5000); // 300000 milliseconds = 5 minutes
  // }

  // ngOnDestroy(): void {
  //   // Clear the interval when the service is destroyed to avoid memory leaks
  //   if (this.intervalId) {
  //     clearInterval(this.intervalId);
  //   }
  // }

  ngOnInit() {
    this.fetchOrders();

    this.mediaQueryService.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }

  // fetchOrders() {
  //   this.isLoading = this.loaderService.show();
  //   this.dataService
  //     .getAllOrders()
  //     .then((orders) => {
  //       this.orders = orders;
  //       console.log('Orders fetched:', orders);
  //       this.isLoading = this.loaderService.hide();
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching orders:', error);
  //       this.isLoading = this.loaderService.hide();
  //     });
  // }

  fetchOrders(): void {
    this.isLoading = this.loaderService.show();
    this.dataService.getAllOrders().subscribe(
      (orders: any[]) => {
        this.orders = orders;
        console.log('Orders fetched:', orders);

        this.sortedOrders = this.sortOrdersByDate(orders);
        console.log('sortedOrders : ', this.sortedOrders);
        this.isLoading = this.loaderService.hide();
      },
      (error: any) => {
        console.error('Error fetching orders:', error);
        this.isLoading = this.loaderService.hide();
      }
    );
  }

  // Function to sort the array
  sortOrdersByDate(
    orders: { id: number; dateOfOrdered: string }[]
  ): { id: number; dateOfOrdered: string }[] {
    return orders.sort((a, b) => {
      const dateA = new Date(a.dateOfOrdered);
      const dateB = new Date(b.dateOfOrdered);
      return dateB.getTime() - dateA.getTime(); // For descending order
    });
  }

  cancelOrder(orderId: any) {
    // if (confirm('Are you sure you want to cancel this order?')) {
    const dialogConfig = new MatDialogConfig();

    // Set the position of the dialog
    dialogConfig.position = {
      top: '250px',
      // right: '20px',
    };

    dialogConfig.data = {
      message: 'Are you sure you want to cancel this order?',
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataService
          .cancelOrder(orderId)
          ?.then((res: any) => {
            this.fetchOrders();
            this.sendEmailService.sendEmailDynamic(
              'Order cancelled with orderId : ' +
                orderId +
                '\n' +
                ' by user : ' +
                localStorage.getItem('uid')
              // this.dataService.getUid()
            );
          })
          .catch((error) => {
            console.error('Error canceling orders:', error);
          });
      }
    });
    // }
  }

  viewOrder(order: any) {
    this.dataService.setOrderData(order);
    this.router.navigate(['order-details']);
  }

  routeToHome() {
    this.router.navigate(['dashboard']);
  }
}
