import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule, MatSnackBarModule,
  MatToolbarModule, MatMenuModule, MatIconModule, MatProgressSpinnerModule, MatSortModule, MatRippleModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './services/authentication.service';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { BoatsComponent } from './boat/boats/boats.component';
import { BoatDetailComponent } from './boat/boat-detail/boat-detail.component';
import { BoatAddComponent } from './boat/boat-add/boat-add.component';
import { BoatEditComponent } from './boat/boat-edit/boat-edit.component';
import { BoatService } from './services/boat.service';
import { NotificationsService } from './services/notifications.service';
import { ErrorHandler } from './services/error.handler';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    BoatsComponent,
    BoatDetailComponent,
    BoatAddComponent,
    BoatEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    MatToolbarModule,
    MatButtonModule, 
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatRippleModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    AuthenticationService,
    BoatService,
    NotificationsService,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandler, multi: true }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
