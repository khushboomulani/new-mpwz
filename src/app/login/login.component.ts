import { TokengerneratorService } from './../utils/tokengernerator.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { SessionStorageService } from 'angular-web-storage';
import { EncreptionDecreptionService } from '../utils/encreption-decreption.service';
import { environment } from 'src/environments/environment';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private router: Router,
    private enc: EncreptionDecreptionService, private session: SessionStorageService, private token: TokengerneratorService) { }

  loginForm: FormGroup;
  submitted = false;
  otpform: FormGroup;
  submitted1 = false;
  resp: any;
  resp2: any;
  resp3: any;
  resp4: any;
  resp10: any;
  username: string;
  password: string;
  sysotp: string;
  d2: string;
  loading = false;
  showlogin = true;
  showotp = false;
  msg: string;
  error: any;
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      UserName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.otpform = this.formBuilder.group({
      uotp: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      // password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.token.genrateToekn();
  }

  get f() { return this.loginForm.controls; }
  get f1() { return this.otpform.controls; }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
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
        this.username = this.loginForm.value.UserName;
        this.password = this.loginForm.value.password;
        formData.append('loginid', this.enc.encrypt(this.loginForm.value.UserName));
        formData.append('password', this.enc.encrypt(this.loginForm.value.password));
        formData.append('webx', this.d2);

        return this.http.post(environment.url + "web-site-user-management/login-otp", formData).subscribe(Response => {
          this.resp = Response

          if (this.resp.resp != null) {
            this.resp2 = this.enc.dcrypt(this.resp.resp);
            // alert(this.resp2)
            let dt = JSON.parse(this.resp2);
            // alert(dt.flag);
            if (dt.flag == true) {
              // alert(this.resp2.msg);
              this.msg = dt.msg;
              this.loading = false;
              this.sysotp = this.enc.dcrypt(dt.encotp);
              // alert(this.sysotp);
              this.showlogin = false;
              this.showotp = true;
            } else {

              alert(dt.msg);
              this.loading = false;
              this.showotp = false;
              this.showlogin = true;
            }
          }
        },
          error => {
            this.loading = false;
            this.error = error
            alert('Server not responding');
          }
        );
      }
      else {
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

  otpSubmit() {
    this.submitted1 = true;
    this.loading = true;
    // stop here if form is invalid
    if (this.otpform.invalid) {
      this.loading = false;
      //  alert('yes');
      return;
    }
    //  alert(this.otpform.value.uotp);
    if (this.otpform.value.uotp == this.sysotp) {
      this.enc.GetServerTime().subscribe(Response => {
        this.resp10 = Response
        let encvaltm = this.resp10.txPcXvn;
        let actval = this.enc.dcrypt(encvaltm);
        this.d2 = this.enc.encryptAgain(actval + "@SEM");
        if (this.d2 != null) {

          let formData: FormData = new FormData();

          formData.append('loginid', this.enc.encrypt(this.username));
          formData.append('password', this.enc.encrypt(this.password));
          formData.append('sysotp', this.enc.encrypt(this.sysotp));
          formData.append('userotp', this.enc.encryptAgain(this.otpform.value.uotp));
          formData.append('webx', this.d2);
          // login-otp
          return this.http.post(environment.url + "web-site-user-management/userlogin", formData).subscribe(Response => {
            this.resp3 = Response

            if (this.resp3.resp != null) {
              this.resp4 = this.enc.dcrypt(this.resp3.resp);
              this.loading = false;
              let data = JSON.parse(this.resp4)
              // alert(data)
              if (data.flag == true) {
                this.session.set('loginid', data.loginid);
                this.session.set('userrole', data.userrole);
                this.session.set('username', data.username);
                this.session.set('department', data.department);
                if (data.userrole == "ADMIN") {
                  this.router.navigate(['/dept-home']);
                }
                else if (data.userrole == "EMPLOYEE") {
                  this.router.navigate(['/emp-home']);
                }
                else if (data.userrole == "DEPT") {
                  this.router.navigate(['/dept-subadmin']);
                }
                else {
                  // alert(data.msg);
                  this.router.navigate(['/login']);
                  this.loading = false;
                }
              }
              else {
                this.loading = false;
                alert(data.msg);
                this.router.navigate(['/login']);
              }
            }
            else {
              // alert(data.msg);
              this.router.navigate(['/login']);

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
      },
        error => {
          this.loading = false;
          this.error = error
          alert('Server not responding');
        }
      )
    } else {
      alert('OTP is invalid.')
      this.loading = false;
    }

  }
  genratetoken() {
    return this.http.post(environment.url + "get-general-user-bill-record/get-ngb-list", FormData).subscribe(response => { });
  }

}
