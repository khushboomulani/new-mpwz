

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokengerneratorService } from '../utils/tokengernerator.service';

import { SessionStorageService } from 'angular-web-storage';
import { DownloadService } from '../utils/download.service';

import { EncreptionDecreptionService } from '../utils/encreption-decreption.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css']
})
export class CareersComponent implements OnInit {

  constructor(private http: HttpClient, private route: Router,
    private session: SessionStorageService,
    private token: TokengerneratorService, private enc: EncreptionDecreptionService,
    private download: DownloadService
  ) { }

  uploadDocForm: FormGroup;
  submitted = false;
  resp: any;
  doctype: string;
  title: string;
  resp5: any;
  resp6: any;
  desc: string;
  file: FileList;
  src: string;
  filepath: string;
  data: string;
  resp10: any;
  d2: string;
  loading = false;
  resp06: any;
  loader = false;



  ngOnInit() {
    this.getCircular();
    this.token.genrateToekn();
    this.CurrentOpening();
    this.latestResults();
  }

  getCircular() {

    this.enc.GetServerTime().subscribe(Response => {
      this.resp10 = Response
      let encvaltm = this.resp10.txPcXvn;
      let actval = this.enc.dcrypt(encvaltm);
      this.d2 = this.enc.encryptAgain(actval + "@SEM");
      if (this.d2 != null) {

        let formData: FormData = new FormData();

        formData.append('doctype', this.enc.encrypt("Latest Result"));
        formData.append('webx', this.d2);
        let resp1: any;
        return this.http.post(environment.url + "document-management/get-document", formData).subscribe(
          Response => {
            resp1 = Response

            if (resp1.resp != null) {
              this.resp = JSON.parse(this.enc.dcrypt(resp1.resp))


            } else {

            }
          });

      }
      else {
        alert('Something went wrong.Try after sometime.');
        this.loading = false;
      }
    }
    )
  }
  CurrentOpening() {
    this.loader = true;

    this.enc.GetServerTime().subscribe(Response => {
      this.resp10 = Response
      let encvaltm = this.resp10.txPcXvn;
      let actval = this.enc.dcrypt(encvaltm);
      this.d2 = this.enc.encryptAgain(actval + "@SEM");
      if (this.d2 != null) {

        let formData: FormData = new FormData();

        formData.append('doctype', this.enc.encrypt("Current Openings"));
        formData.append('webx', this.d2);
        let resp5: any;
        return this.http.post(environment.url + "document-management/get-document", formData).subscribe(
          Response => {
            resp5 = Response
            this.loader = false;


            if (resp5.resp != null) {
              this.resp5 = JSON.parse(this.enc.dcrypt(resp5.resp))


            } else {
              alert('Data Not Available')
            }
          });

      }
      else {
        alert('Something went wrong.Try after sometime.');
        this.loader = false;

      }
    }
    )
  }

  latestResults() {
    this.loading = true;
    this.enc.GetServerTime().subscribe(Response => {
      this.resp10 = Response
      let encvaltm = this.resp10.txPcXvn;
      let actval = this.enc.dcrypt(encvaltm);
      this.d2 = this.enc.encryptAgain(actval + "@SEM");
      if (this.d2 != null) {

        let formData: FormData = new FormData();

        formData.append('doctype', this.enc.encrypt("Latest Result"));
        formData.append('webx', this.d2);
        let resp6: any;
        return this.http.post(environment.url + "document-management/get-document", formData).subscribe(
          Response => {
            resp6 = Response
            this.loading = false;
            if (resp6.resp != null) {
              this.resp06 = JSON.parse(this.enc.dcrypt(resp6.resp))
            } else {
              alert('Data Not Availble')
            }
          });

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
