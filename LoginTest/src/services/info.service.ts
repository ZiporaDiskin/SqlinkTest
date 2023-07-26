import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { Project } from 'src/models/project';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(private http: HttpClient,private authService:AuthService) { }
  token!:any
  public getInfo(): Observable<any> {

    var apiUrl="https://private-052d6-testapi4528.apiary-mock.com/info"
   // var apiUrl="https://localhost:44390/api/info/getProjects"
    this.token=this.authService.getToken()
 
   // const headers = new HttpHeaders({ 'Bearer': this.token });  
      return this.http.get<Project[]>(apiUrl).pipe(
     
      map((response:Project[]) => {
       
        console.log(response);
      
      }),
      catchError((err, caught) => {
        console.error(err);
        throw err;
      }
      )
    );
    
    
    }
}
