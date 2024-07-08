import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { initializeApp } from 'firebase/app';
initializeApp(environment.firebase);

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './home/home.component';
import { ProductComponent } from './home/product/product.component';
import { UserFormComponent } from './home/user-form/user-form.component';
import { environment } from '../environments/environment';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { VarifyEmailComponent } from './component/varify-email/varify-email.component';
import { ProfileComponent } from './component/profile/profile.component';
import { ViewCartComponent } from './component/view-cart/view-cart.component';
import { ViewOrdersComponent } from './component/view-orders/view-orders.component';
import { OrderDetailsComponent } from './component/view-orders/order-details/order-details.component';
import { LoaderComponent } from './loader/loader.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FrontPageComponent } from './front-page/front-page.component';
import { MessagingService } from './shared/messaging.service';
import { SendImagesOnEmailComponent } from './home/send-images-on-email/send-images-on-email.component';
import { SendImagesFirebaseComponent } from './home/send-images-firebase/send-images-firebase.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { EditProfileComponent } from './home/edit-profile/edit-profile.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { NewlineToBrPipe } from './pipes/newline-to-br.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    UserFormComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    VarifyEmailComponent,
    ProfileComponent,
    ViewCartComponent,
    ViewOrdersComponent,
    OrderDetailsComponent,
    LoaderComponent,
    FrontPageComponent,
    SendImagesOnEmailComponent,
    SendImagesFirebaseComponent,
    ConfirmDialogComponent,
    EditProfileComponent,
    ErrorDialogComponent,
    NewlineToBrPipe,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatListModule,
    MatTableModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    HttpClientModule
  ],
  providers: [provideAnimationsAsync(), MessagingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
