import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {  takeUntil } from 'rxjs/operators';

import { Router,NavigationExtras  } from  "@angular/router";
import { Subject } from 'rxjs';
import { AuthService } from 'src/services/auth.service';
import { Person } from 'src/models/person';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder ) { }

  loginForm!: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  loadData!:boolean;
  isSubmitted  =  false;
  isError!:boolean
  ngOnInit(): void {
    this.loginForm  =  this.formBuilder.group({

      email: ['',[Validators.required, Validators.email]],
      
      password: ['',[Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].)(?=.*[a-z]).{8}$'
)]]
      
      });
     
  }
  get formControls() { 
   return this.loginForm.controls;;
   }
  login(){

    console.log(this.loginForm.value);
    
    this.isSubmitted = true;
    
    if(this.loginForm.invalid){
    
    return;
    
    }
    
    this.authService.login(this.loginForm.value).pipe(takeUntil(this.destroy$))
    .subscribe(
      (response:Person) => {
        // Handle success response
      
         this.loadData=true
         console.log(response);
         
        this.router.navigate(['info'], { state: { person: response } });

      },
      error => {
        // Handle error response

        // this.errorMessage=error.error
         this.isError=true
      }
    );
    
   
    
    }
    
}
