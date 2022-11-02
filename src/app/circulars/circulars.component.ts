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
  selector: 'app-circulars',
  templateUrl: './circulars.component.html',
  styleUrls: ['./circulars.component.css']
})
export class CircularsComponent implements OnInit {

  constructor(private http: HttpClient,
    private enc: EncreptionDecreptionService
  ) { }

  uploadDocForm: FormGroup;
  submitted = false;
  resp: any;
  resp1: any;
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
  error: any;


  ngOnInit() {
    this.getCircular();
    // this.token.genrateToekn();
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

        formData.append('doctype', this.enc.encrypt("Public Circular"));
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
  getSrc(path, title, desc, filename) {
    this.title = title;
    this.desc = desc
    this.filepath = path;
    this.data = filename;
    // window.open('/view-pdf', path, filename, title, desc, "_blank")

    // let url=this.route.serializeUrl(this.route.createUrlTree(['/view-pdf', path, filename, title, desc]));
    // window.open(url,"_blank")
    window.location.origin + '/view-pdf/' + path + "/" + filename + "/" + title + "/" + desc;
    // this.src = this.baseURL.baseUrl + "get-a-file/get-by-pt?pt="+path;

  }

}
