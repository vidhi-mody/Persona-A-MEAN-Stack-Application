import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private  _http:HttpClient) { }

  register(body:any){
    return this._http.post('http://localhost:3000/users/register',body,{
      observe:'body',
      headers: new HttpHeaders().append('Content-Type','application/json')
    })
  }
  login(body:any){
    return this._http.post('http://localhost:3000/users/login',body,{
      observe:'body',
      withCredentials:true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    })
  }
  logingoogle(){
    return this._http.get('https://localhost:3000/users/google/login',{
      observe:'body',
      withCredentials:true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    })
  }
  update(body:any){
    return this._http.put('http://localhost:3000/users/settings',body,{
      observe:'body',
      withCredentials:true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    })
  }
  user(){
    return this._http.get('http://localhost:3000/users/user',{
      observe:'body',
      withCredentials:true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    })
  }
  settings(){
    return this._http.get('http://localhost:3000/users/settings',{
      observe:'body',
      withCredentials:true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    })
  }

  logout(){
    return this._http.get('http://localhost:3000/users/logout',{
      observe:'body',
      withCredentials:true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    })
  }
}
