import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { SignInGuard } from './guards/sign.in.guard'
import { BoatsComponent } from './boat/boats/boats.component';
import { BoatAddComponent } from './boat/boat-add/boat-add.component';
import { BoatDetailComponent } from './boat/boat-detail/boat-detail.component';
import { BoatEditComponent } from './boat/boat-edit/boat-edit.component';

const appRoutes: Routes = [
  { path: '', component: IndexComponent },
  //{ path: '', component: IndexComponent, canActivate: [SignInGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'boats', component: BoatsComponent },
  { path: 'boat-details/:id', component: BoatDetailComponent },
  { path: 'boat-add', component: BoatAddComponent },
  { path: 'boat-edit/:id', component: BoatEditComponent },
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