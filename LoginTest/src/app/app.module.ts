import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { RouterModule } from '@angular/router';
import { InfoComponent } from './info/info.component';
import { JwtModule } from "@auth0/angular-jwt";
import { AgGridModule } from 'ag-grid-angular';
import {MatTableModule} from '@angular/material';

export function tokenGetter() { 
  return localStorage.getItem("ACCESS_TOKEN"); 
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    PersonalDetailsComponent,
    InfoComponent,
    
  ],
  imports: [
    MatTableModule,
    AgGridModule,
    RouterModule,
  HttpClientModule,
  FormsModule,
  ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:44390"],
        disallowedRoutes: []
      }
    })
  ],
  

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
