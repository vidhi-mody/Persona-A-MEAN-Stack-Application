import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username:String='';
  name:String='';
  website:String='';
  summary:String='';
  degree:String='';
  specialization:String='';
  planning:String='';


  addName(data){
    this.username = data.username;
    this.name = data.name;
    this.website = data.website;
    this.summary = data.summary;
    this.degree = data.degree;
    this.specialization = data.specialization;
    this.planning = data.planning;
  }

  constructor(private _router: Router,private _userService: UserService) {
    this._userService.user()
    .subscribe(
      data=>this.addName(data),
      error=>this._router.navigate(['/login'])
    )
  }

  ngOnInit(): void {
  }
  logout(){
    this._userService.logout()
    .subscribe(
      data=>{console.log(data);
        this._router.navigate(['/login'])
      },
      error=>console.log(error)
    )
  }
}
