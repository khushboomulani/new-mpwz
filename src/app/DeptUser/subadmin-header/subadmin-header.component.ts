import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from 'angular-web-storage';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';

@Component({
  selector: 'app-subadmin-header',
  templateUrl: './subadmin-header.component.html',
  styleUrls: ['./subadmin-header.component.css']
})
export class SubadminHeaderComponent implements OnInit {

  constructor(private session:SessionStorageService,private router:Router,private bnIdle: BnNgIdleService) { }
username:string;
userrole:string;
loginid:string;
  ngOnInit() {
        if(this.session.get('loginid')!=null){
  this.loginid=this.session.get('loginid');
     this.userrole=this.session.get('userrole');
   this.username= this.session.get('username');
   this.bnIdle.startWatching(300).subscribe((isTimedOut: boolean) => {
    if (isTimedOut) {
      this.session.remove("userrole");
      this.session.remove("username");
      this.session.remove("department");
      this.session.remove("loginid");

      this.bnIdle.resetTimer();
    }
    this.session.remove("userrole");
    this.session.remove("username");
    this.session.remove("department");
    this.session.remove("loginid");

    alert("Your session is expired. Please login again");
    this.router.navigate(['/login']);
  });
    // this.session.set('department', this.resp.department);
    }else{
this.router.navigate(['/login'])
    }
  }

  logout(){

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
