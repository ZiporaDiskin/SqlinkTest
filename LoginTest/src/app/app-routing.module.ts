import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from 'src/guards/auth.guard';

const routes: Routes = [

  { path: '', pathMatch: "full", redirectTo: "login"},
  
  { path: 'login', component: LoginComponent },
  
  { path: 'info', component: AdminComponent, canActivate: [AuthGuard] }
  
  ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
