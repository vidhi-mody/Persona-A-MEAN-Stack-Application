import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import {FormGroup,FormControl,Validators} from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settingsForm:FormGroup = new FormGroup({
    _id:new FormControl(null,Validators.required),
    name:new FormControl(null,Validators.required),
    summary:new FormControl(null,Validators.required),
    website:new FormControl(null,Validators.required),
    degree:new FormControl(null,Validators.required),
    specialization:new FormControl(null,Validators.required),
    planning:new FormControl(null,Validators.required)
  })
  _id:String=""
  username:String='';
  name:String='';
  website:String='';
  summary:String='';
  degree:String='';
  specialization:String='';
  planning:String='';
  constructor(private _user:UserService, private _router:Router) {
    this._user.settings()
    .subscribe(
      data=>this.addName(data),
      error=>this._router.navigate(['/login'])
    )
  }

  addName(data){
    this._id=data._id
    this.username = data.username;
    this.name = data.name;
    this.website = data.website;
    this.summary = data.summary;
    this.degree = data.degree;
    this.specialization = data.specialization;
    this.planning = data.planning;
  }
  ngOnInit() {
  }

  logout(){
    this._user.logout()
    .subscribe(
      data=>{console.log(data);this._router.navigate(['/login'])},
      error=>console.error(error)
    )
  }

  settings(){
    if(!this.settingsForm.valid){
      console.log('Invalid Form'); return;
    }

    this._user.update(JSON.stringify(this.settingsForm.value))
    .subscribe(
      data=> {console.log(data); this._router.navigate(['/profile']);},
      error=>console.error(error)
    )
    // console.log(JSON.stringify(this.registerForm.value));
  }
}
