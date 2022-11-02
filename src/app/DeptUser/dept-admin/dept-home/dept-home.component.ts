import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from 'angular-web-storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dept-home',
  templateUrl: './dept-home.component.html',
  styleUrls: ['./dept-home.component.css']
})
export class DeptHomeComponent implements OnInit {

  constructor(private session:SessionStorageService,private router:Router) { }

  ngOnInit(): void {
    if
    (this.session.get('loginid')!=null){

    }else{
       this.router.navigate(['/login'])
    }
  }

}
