import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokengerneratorService } from '../../../utils/tokengernerator.service';

import { SessionStorageService } from 'angular-web-storage';
import { EncreptionDecreptionService } from '../../../utils/encreption-decreption.service';
import Swal from 'sweetalert2'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.css']
})
export class CreateDepartmentComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router,
    private formBuilder: FormBuilder, private token: TokengerneratorService,
    private enc: EncreptionDecreptionService, private session: SessionStorageService) { }
  createForm: FormGroup;
  submitted = false;
  resp: any;
  resp1: any;
  respdept: any;
  dept: string;
  error: any;
  deptid: string;
  location: string;
  resp10: any;
  d2: string;
  loading = false;

  ngOnInit() {
    if
      (this.session.get('loginid') != null) {
      this.createForm = this.formBuilder.group({
        dept: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
        deptid: ['', [Validators.required, Validators.pattern('^[0-9a-zA-Z-]*$')]],
        location: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]]
      });
      this.getdept();
    } else {
      this.router.navigate(['/login'])
    }
  }
  get f() { return this.createForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.createForm.invalid) {
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

        formData.append('depname', this.enc.encrypt(this.createForm.value.dept));
        formData.append('location', this.enc.encrypt(this.createForm.value.location));
        formData.append('depid', this.enc.encrypt(this.createForm.value.deptid));
        formData.append('webx', this.d2);

        return this.http.post(environment.url + "web-site-admin/create-dep", formData).subscribe(Response => {
          this.resp = Response

          if (this.resp != null) {
            alert(this.resp.msg);
            this.loading = false;
            this.onReset();
            this.getdept();
          } else {
            alert(this.resp.msg);
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
    },
      error => {
        this.loading = false;
        this.error = error
        alert('Server not responding');
      }
    )
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

        return this.http.post(environment.url + "web-site-admin/get-dep-list", formData).subscribe(
          Response => {
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

  RemoveDept(deptid, deptname) {
    //  alert('y')
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.enc.GetServerTime().subscribe(Response => {
          this.resp10 = Response
          let encvaltm = this.resp10.txPcXvn;
          let actval = this.enc.dcrypt(encvaltm);
          this.d2 = this.enc.encryptAgain(actval + "@SEM");
          if (this.d2 != null) {

            let formData: FormData = new FormData();
            // let data = this.session.get('loginid')+"||"+this.session.get('username')+"||"+gid
            formData.append('userid', this.enc.encrypt(this.session.get('loginid')));

            formData.append('username', this.enc.encrypt(this.session.get('username')));
            formData.append('deptid', this.enc.encrypt(deptid));
            formData.append('deptname', this.enc.encrypt(deptname));
            formData.append('webx', this.d2)

            return this.http.post(environment.url + "web-site-admin/remove-a-deparment", formData).subscribe(Response => {
              this.resp1 = Response

              if (this.resp1.flag == true) {
                this.getdept();
                swalWithBootstrapButtons.fire(
                  'Deleted!',
                  this.resp1.msg,
                  'success'
                )
                // this.submitted=false;

                //  this.getdept();   
                this.onReset();
                // this.getdept();

              } else {
                this.getdept();
                swalWithBootstrapButtons.fire(
                  'info!',
                  this.resp1.msg,
                  'error'
                )
                // alert(this.respgall.msg);
              }
            }, error => {
              this.error = error;
              this.loading = false;
              alert('server not responding.')
            });
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

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
    // 
  }


  onReset() {
    this.createForm.reset();
    this.submitted = false;
  }

}
