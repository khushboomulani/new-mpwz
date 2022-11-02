import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from 'angular-web-storage';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';

@Component({
  selector: 'app-dept-header',
  templateUrl: './dept-header.component.html',
  styleUrls: ['./dept-header.component.css']
})
export class DeptHeaderComponent implements OnInit {

  constructor(private session: SessionStorageService, private router: Router, private bnIdle: BnNgIdleService) { }
  username: string;
  userrole: string;
  loginid: string;
  ngOnInit() {
    if (this.session.get('loginid') != null) {
      this.loginid = this.session.get('loginid');
      this.userrole = this.session.get('userrole');
      this.username = this.session.get('username');

    } else {
      this.router.navigate(['/login'])
    }
  }

  logout() {

    if (this.session.get("loginid") != null && this.session.get('userrole') == 'ADMIN') {

      this.session.remove("userrole");
      this.session.remove("username");
      this.session.remove("department");
      this.session.remove("loginid");

      alert("You are Logged Out Successfully !!!");
      this.router.navigate(['/login']);

    } else {
      this.session.remove("userrole");
      this.session.remove("username");
      this.session.remove("department");
      this.session.remove("loginid");


      //  alert("You are Logged Out Successfully !!!");
      this.router.navigate(['/login']);

    }


  }

}
