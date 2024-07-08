import { Component } from '@angular/core';
import { DataService } from '../../../shared/data.service';
import { Router } from '@angular/router';
import { LoaderService } from '../../../shared/loader.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent {
  data: any ;
  displayedColumns: string[] = ['name', 'price', 'quantity', 'totalPrice'];
  priceData: any = []

  isLoading: boolean = false;

  constructor(
    private dataService: DataService,
    private router: Router,
    private loaderService: LoaderService,
  ) {
    this.isLoading = this.loaderService.show();
    this.data = this.dataService.getOrderData();
    this.isLoading = this.loaderService.hide();
    console.log("data : ", this.data);
    this.priceData.push(this.data.product.product);
    console.log("priceData : ", this.priceData);
  }

  // cancelOrder(orderId: any) {
  //   this.dataService.cancelOrder(orderId)
  //   ?.then((res : any) => {
  //     console.log("order cancelled");
  //   })
  //   .catch(error => {
  //     console.error('Error canceling orders:', error);
  //   });
  // }
  
  openProduct(item: any): void {
    this.dataService.setData(item);
    this.router.navigate(['product']);
  }

  routeToHome(){
    this.router.navigate(['dashboard']);
  }













}
