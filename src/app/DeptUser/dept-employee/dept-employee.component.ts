import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokengerneratorService } from '../../utils/tokengernerator.service';
import { EncreptionDecreptionService } from '../../utils/encreption-decreption.service';
import { SessionStorageService } from 'angular-web-storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dept-employee',
  templateUrl: './dept-employee.component.html',
  styleUrls: ['./dept-employee.component.css']
})
export class DeptEmployeeComponent implements OnInit {

  src = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";

  constructor(private http: HttpClient, private route: Router, 
    private session: SessionStorageService, private formBuilder: FormBuilder, 
    private token: TokengerneratorService, private enc: EncreptionDecreptionService) { }
  uploadDocForm: FormGroup;
  submitted = false;
  resp: any;
  doctype: string;
  title: string;
  desc: string;
  file: FileList;
  resp10: any;
  error: any;
  d2: string;
  loading = false;

  ngOnInit() {

    if
      (this.session.get('loginid') != null) {
      this.getCircular();

    } else {
      this.route.navigate(['/login'])
    }

  }

  getCircular() {
    this.loading = true;
    this.enc.GetServerTime().subscribe(Response => {
      this.resp10 = Response
      let encvaltm = this.resp10.txPcXvn;
      let actval = this.enc.dcrypt(encvaltm);
      this.d2 = this.enc.encryptAgain(actval + "@SEM");
      if (this.d2 != null) {

        let formData: FormData = new FormData();

        formData.append('doctype', this.enc.encrypt("Employee Circular"));
        formData.append('webx', this.d2);

        return this.http.post(environment.url + "document-management/get-document", formData).subscribe(
          Response => {
            this.resp = Response

            if (this.resp.length > 0) {
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

}
