import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';

const appRoutes: Routes = [
  //{ path: '', component: AppComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}