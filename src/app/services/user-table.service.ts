import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserTableService {
  private apiUrl ='http://localhost:5000/api/usercompletos'

  constructor(private http: HttpClient) { }

  getUsers(params?: any): Observable<{items: any[], hasNext: boolean}>{
    let httpParams = new HttpParams();

    if(params){
      Object.keys(params).forEach(key => {httpParams = httpParams.set(key, params[key]);
      });
    }
    return this.http.get<any[]>(this.apiUrl, {params: httpParams}).pipe(map (response => {
      return {
        items: response,
        hasNext: false
      };
    })
  );}
}
