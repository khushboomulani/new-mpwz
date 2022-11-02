import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokengerneratorService } from '../../../utils/tokengernerator.service';

import { SessionStorageService } from 'angular-web-storage';
import { fail } from 'assert';

import { EncreptionDecreptionService } from '../../../utils/encreption-decreption.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-assign-role',
  templateUrl: './admin-assign-role.component.html',
  styleUrls: ['./admin-assign-role.component.css']
})
export class AdminAssignRoleComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute, 
    private http: HttpClient, private router: Router, private formBuilder: FormBuilder,
     private token: TokengerneratorService, private enc: EncreptionDecreptionService, private session: SessionStorageService) { }
  createuserForm: FormGroup;
  submitted = false;
  roleData = new Array<any>();
  // submitted = false;
  resp: any;
  resp9: any;
  respdept: any;
  userrole: string;
  username: string;
  // roletype: string;
  userid: string;
  resp10: any;
  d2: string;
  error: any;
  loading = false;
  AllRoles = [
    "Employee Circular",
    "Public Circular",
    "Tender",
    "Vendor",
    "HR Notification",
    "HR Result",
    "Employee Order",
    "Public Order",
    "Latest News, Updates and Events",
    "Latest Result",
    "Career",
    "Press Release",
    "Notice Board",
    "gallary"
  ]

  ngOnInit() {
    this.getMasterData();
    this.userid = this.activeRoute.snapshot.params.id;
    this.username = this.activeRoute.snapshot.params.name;

    this.createuserForm = this.formBuilder.group({
      // userrole: ['', Validators.required],
      username: ['',],
      roletype1: ['', Validators.required],
      // userid: ['', Validators.required]
    });

    this.getdept();
  }


  get f() { return this.createuserForm.controls; }
  getMasterData() {
    this.loading = true;
    this.enc.GetServerTime().subscribe(Response => {
      this.resp10 = Response
      let encvaltm = this.resp10.txPcXvn;
      let actval = this.enc.dcrypt(encvaltm);
      this.d2 = this.enc.encryptAgain(actval + "@SEM");
      if (this.d2 != null) {
        let formData: FormData = new FormData();
        formData.append('userid', this.enc.encrypt(this.session.get('loginid')));
        formData.append('webx', this.d2);
        let resp: any;
        return this.http.post(environment.url + "web-site-admin/get-document-type-master", formData).subscribe(
          Response => {
            resp = Response

            if (resp.resp != null) {
              this.loading = false;
              this.resp9 = JSON.parse(this.enc.dcrypt(resp.resp));
            } else {
              this.loading = false;
            }
          },
          error => {
            this.loading = false;
            this.error = error
            alert('Server not responding');
          }
        )
      } else {
        alert('Something went wrong.Try after sometime.');
        this.loading = false;
      }
    },
      error => {
        this.loading = false;
        this.error = error
        alert('Server not responding');
      }
    )
  }
  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.createuserForm.invalid) {
      this.loading = false;
      return;
    }
    this.enc.GetServerTime().subscribe(Response => {
      this.resp10 = Response
      let encvaltm = this.resp10.txPcXvn;
      let actval = this.enc.dcrypt(encvaltm);
      this.d2 = this.enc.encryptAgain(actval + "@SEM");
      if (this.d2 != null) {

        let formData: FormData = new FormData();
        formData.append('userid', this.enc.encrypt(this.userid));
        formData.append('username', this.enc.encrypt(this.username));
        formData.append('userrole', this.enc.encrypt(this.createuserForm.value.roletype1));
        formData.append('roletype', this.enc.encrypt(this.createuserForm.value.roletype1));
        formData.append('webx', this.d2);

        return this.http.post(environment.url + "web-site-admin/add-user-role", formData).subscribe(Response => {
          this.resp = Response

          if (this.resp != null) {
            this.loading = false;
            alert(this.resp.msg);
            this.getdept();
            this.Onreset();
          } else {
            this.loading = false;
            this.Onreset();
            alert(this.resp.msg);
          }
        }
          ,
          error => {
            this.loading = false;
            this.error = error
            alert('Server not responding');
          }
        )
      } else {
        alert('Something went wrong.Try after sometime.');
        this.loading = false;
      }
    }
      ,
      error => {
        this.loading = false;
        this.error = error
        alert('Server not responding');
      }
    )
  }

  Onreset() {
    this.createuserForm.reset();
    this.submitted = false;
  }

  getdept() {
    this.loading = true;
    this.roleData = new Array<any>();
    this.enc.GetServerTime().subscribe(Response => {
      this.resp10 = Response
      let encvaltm = this.resp10.txPcXvn;
      let actval = this.enc.dcrypt(encvaltm);
      this.d2 = this.enc.encryptAgain(actval + "@SEM");

      if (this.d2 != null) {
        let formData: FormData = new FormData();
        formData.append('deptid', this.enc.encrypt(this.userid));
        formData.append('webx', this.d2);
        return this.http.post(environment.url + "web-site-admin/get-dept-roles", formData).subscribe(Response => {
          this.respdept = Response
          if (this.respdept.length > 0) {
            this.loading = false;
          } else {
            this.loading = false;
          }
        },
          error => {
            this.loading = false;
            this.error = error
            alert('Server not responding');
          }
        )
      }
      else {
        alert('Something went wrong.Try after sometime.');
        this.loading = false;
      }
    }
      ,
      error => {
        this.loading = false;
        this.error = error
        alert('Server not responding');
      }
    )
  }

}
