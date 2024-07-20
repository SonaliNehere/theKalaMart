import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { VarifyEmailComponent } from './component/varify-email/varify-email.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './home/product/product.component';
import { ViewOrdersComponent } from './component/view-orders/view-orders.component';
import { ViewCartComponent } from './component/view-cart/view-cart.component';
import { OrderDetailsComponent } from './component/view-orders/order-details/order-details.component';
import { UserFormComponent } from './home/user-form/user-form.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { SendImagesOnEmailComponent } from './home/send-images-on-email/send-images-on-email.component';
import { SendImagesFirebaseComponent } from './home/send-images-firebase/send-images-firebase.component';
import { EditProfileComponent } from './home/edit-profile/edit-profile.component';

const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch:'full'},
  {path: 'login', component : LoginComponent},
  {path: 'dashboard', component : HomeComponent},
  {path: 'register', component : RegisterComponent},
  {path: 'varify-email', component : VarifyEmailComponent},
  {path: 'forgot-password', component : ForgotPasswordComponent},
  {path: 'product', component : ProductComponent},
  {path: 'orders', component : ViewOrdersComponent},
  {path: 'cart', component : ViewCartComponent},
  {path: 'order-details', component : OrderDetailsComponent},
  {path: 'user-form', component : UserFormComponent},
  {path: 'front-page', component : FrontPageComponent},
  {path: 'send-images', component : SendImagesOnEmailComponent},
  {path: 'send-images-firebase', component : SendImagesFirebaseComponent},
  {path: 'edit-profile', component : EditProfileComponent},
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
