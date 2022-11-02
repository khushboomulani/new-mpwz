import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Router } from '@angular/router';
import { SessionStorageService } from 'angular-web-storage';

import { EncreptionDecreptionService } from '../utils/encreption-decreption.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private http: HttpClient, private route: Router,private enc: EncreptionDecreptionService
  ) { }

  uploadDocForm: FormGroup;
  submitted = false;
  resp: any;
  resp1: any;
  error: any;
  doctype: string;
  title: string;
  desc: string;
  file: FileList;
  src: string;
  filepath: string;
  data: string;
  resp10: any;
  d2: string;
  loading = false;


  ngOnInit() {
    this.getOrder();
    // this.token.genrateToekn();
  }

  getOrder() {
    this.loading = true;
    this.enc.GetServerTime().subscribe(Response => {
      this.resp10 = Response
      let encvaltm = this.resp10.txPcXvn;
      let actval = this.enc.dcrypt(encvaltm);
      this.d2 = this.enc.encryptAgain(actval + "@SEM");
      if (this.d2 != null) {

        let formData: FormData = new FormData();

        formData.append('doctype', this.enc.encrypt("Public Order"));
        formData.append('webx', this.d2);

        return this.http.post(environment.url + "document-management/get-document", formData).subscribe(
          Response => {
            this.resp1 = Response

            if (this.resp1.resp != null) {
              this.resp = JSON.parse(this.enc.dcrypt(this.resp1.resp))
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

  getfile(filepath) {

    this.enc.GetServerTime().subscribe(Response => {
      this.resp10 = Response
      let encvaltm = this.resp10.txPcXvn;
      let actval = this.enc.dcrypt(encvaltm);
      this.d2 = this.enc.encryptAgain(actval + "@SEM");
      if (this.d2 != null) {
        // alert("get file");
        let formData: FormData = new FormData();

        formData.append('pt', this.enc.encrypt(this.resp.filepath));
        formData.append('webx', this.d2);
        this.src = environment.url + "get-a-file/get-by-pt?pt=" + filepath;
        this.loading = false;
        // this.src = this.baseURL.baseUrl+"get-a-file/get-by-pt?pt="+encodeURIComponent(this.enc.encrypt(filepath));
        // alert(this.src);
        //  window.open(this.src);
      }
      else {
        alert('Something went wrong.Try after sometime.');
        this.loading = false;
      }
    }
    )
  }
  getSrc(path, title, desc, filename) {
    this.title = title;
    this.desc = desc
    this.filepath = path;
    this.data = filename;
    // alert(path);
    // alert(encodeURIComponent(this.enc.encrypt(path)));
    this.route.navigate(['/view-pdf', path, filename, title, desc]);

    this.src = environment.url + "get-a-file/get-by-pt?pt=" + encodeURIComponent(this.enc.encrypt(path));
    // alert(this.src);

  }

}
