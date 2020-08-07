import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    
    email: new FormControl(null,[Validators.email,Validators.required]),
    password: new FormControl(null,[Validators.required]),
   
  })
  constructor(private _router: Router,private _userService: UserService) { }
  login(){
    if(!this.loginForm.valid ){
      console.log('Invalid Details');
      return;
    }
    this._userService.login(JSON.stringify(this.loginForm.value))
    .subscribe(data=> {console.log(data); this._router.navigate(['/user'])},
    error=> {console.log(error);})
    
  }
  logingoogle(){
    
    this._userService.logingoogle()
    .subscribe(data=> {console.log(data); this._router.navigate(['/user'])},
    error=> {console.log(error);})
    
  }
  ngOnInit(): void {
  }

}
