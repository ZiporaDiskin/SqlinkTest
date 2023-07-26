import { Injectable } from '@angular/core';
import { User } from 'src/models/user';
import { HttpClient } from '@angular/common/http';
import { Response } from 'src/models/response';
import { catchError, map, Observable } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  token!:string
  public login(userInfo: User): Observable<any> {

   // var apiUrl="https://private-052d6-testapi4528.apiary-mock.com/authenticate"
    var apiUrl="https://localhost:44390/api/authenticate/login"
  
    return this.http.post<Response>(apiUrl, userInfo).pipe(
     
      map((response:Response) => {
       
        console.log(response);
      
        localStorage.setItem("ACCESS_TOKEN", response.token);
        return response.personalDetails;
     
        
      }),
      catchError((err, caught) => {
        console.error(err);
        throw err;
      }
      )
    );
    
    
    }
    
    
    public isLoggedIn(){
    
    return localStorage.getItem("ACCESS_TOKEN") !== null;
    
    
    }
    public logout(){

      localStorage.removeItem("ACCESS_TOKEN");
      
      }
      public getToken(){
        return localStorage.getItem("ACCESS_TOKEN")
      }
}
