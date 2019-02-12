import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Validators } from '@angular/forms';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  //{ path: '', redirectTo: '' },
  //{ path: 'register', component: RegisterComponent },
  //{ path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}