import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokengerneratorService } from '../../../utils/tokengernerator.service';

import { SessionStorageService } from 'angular-web-storage';
import { EncreptionDecreptionService } from '../../../utils/encreption-decreption.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router,
    private formBuilder: FormBuilder, private token: TokengerneratorService,
    private enc: EncreptionDecreptionService, private session: SessionStorageService) { }

  createuserForm: FormGroup;
  submitted = false;
  resp: any;
  resp2: any;
  resp3: any;
  resp4: any;
  respdept: any;
  userrole: string;
  username: string;
  dept: string;
  userid: string;
  deptname = "";
  deptid: string;
  resp10: any;
  d2: string;
  loading = false;
  anyuse: string;
  status = true;
  error: any;

  ngOnInit() {

    if
      (this.session.get('loginid') != null) {
      this.getdept();
      this.CreatedUserList();
      this.createuserForm = this.formBuilder.group({
        userrole: ['', Validators.required],
        username: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
        mobileno: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(10), Validators.minLength(10)]],
        dept: ['', Validators.required]
      });

    } else {
      this.router.navigate(['/login'])
    }
  }

  get f() { return this.createuserForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.createuserForm.invalid) {
      this.loading = false;
      return;
    }
    //  alert(this.deptid);

    this.enc.GetServerTime().subscribe(Response => {
      this.resp10 = Response
      let encvaltm = this.resp10.txPcXvn;
      let actval = this.enc.dcrypt(encvaltm);
      this.d2 = this.enc.encryptAgain(actval + "@SEM");
      if (this.d2 != null) {

        let formData: FormData = new FormData();

        formData.append('userrole', this.enc.encrypt(this.createuserForm.value.userrole));
        formData.append('username', this.enc.encrypt(this.createuserForm.value.username));
        formData.append('userid', this.enc.encrypt(this.deptid));
        formData.append('department', this.enc.encrypt(this.createuserForm.value.dept));
        formData.append('mobileno', this.enc.encrypt(this.createuserForm.value.mobileno));

        formData.append('webx', this.d2);

        return this.http.post(environment.url + "web-site-admin/create-new-user", formData).subscribe(
          Response => {
            this.resp = Response

            if (this.resp.flag == true) {
              // alert(this.enc.dcrypt(this.resp.msg));
              alert(this.resp.msg);
              this.loading = false;
              this.CreatedUserList();
              this.onReset();
            } else {
              this.loading = false;
              alert(this.resp.msg);
              this.onReset();
            }
          }, error => {
            this.error = error
            this.loading = false;
            if (this.error.status == 500) {
              alert("Already User exist.")
              this.loading = false;
            }
          }
        );
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

  getdeptid(event) {

    this.deptid = event;
    // let data =this.anyuse.split('-');
    // this.deptid = data[0];
    // this.deptname=data[1];
  }


  getdept() {
    this.loading = true;
    this.enc.GetServerTime().subscribe(Response => {
      this.resp10 = Response
      let encvaltm = this.resp10.txPcXvn;
      let actval = this.enc.dcrypt(encvaltm);
      this.d2 = this.enc.encryptAgain(actval + "@SEM");
      if (this.d2 != null) {
        let formData: FormData = new FormData();

        formData.append('code', null);
        formData.append('webx', this.d2);

        return this.http.post(environment.url + "web-site-admin/get-dep-list", formData).subscribe(Response => {
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

  CreatedUserList() {
    this.loading = true;
    this.enc.GetServerTime().subscribe(Response => {
      this.resp10 = Response
      let encvaltm = this.resp10.txPcXvn;
      let actval = this.enc.dcrypt(encvaltm);
      this.d2 = this.enc.encryptAgain(actval + "@SEM");
      if (this.d2 != null) {

        let formData: FormData = new FormData();
        let resp2: any;
        // formData.append('code', null);
        formData.append('webx', this.d2);

        return this.http.post(environment.url + "web-site-admin/get-created-user", formData).subscribe(
          Response => {
            resp2 = Response

            if (resp2.resp != null) {
              this.resp2 = JSON.parse(this.enc.dcrypt(resp2.resp));
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

  onReset() {
    this.createuserForm.reset();
    this.submitted = false;
  }

}
