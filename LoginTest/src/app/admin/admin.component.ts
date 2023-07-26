import { Component, Input, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Person } from 'src/models/person';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
 person!:Person
  constructor(private authService:AuthService,private router:Router) {
  
    this.person=this.router.getCurrentNavigation()?.extras.state?.['person']
   }

  ngOnInit(): void {
  
   
  }
  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}
