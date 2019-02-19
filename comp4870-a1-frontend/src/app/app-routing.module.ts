import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { SignInGuard } from './guards/sign.in.guard'

const appRoutes: Routes = [
  { path: '', component: IndexComponent },
  // { path: '', component: IndexComponent, canActivate: [SignInGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/index', pathMatch: 'full' }
  //{ path: '**', redirectTo: '' }
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