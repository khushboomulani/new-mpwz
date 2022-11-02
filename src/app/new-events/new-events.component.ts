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
  selector: 'app-new-events',
  templateUrl: './new-events.component.html',
  styleUrls: ['./new-events.component.css']
})
export class NewEventsComponent implements OnInit {

  constructor(private http: HttpClient, private route: Router, 
    private session: SessionStorageService, private token: TokengerneratorService, 
    private enc: EncreptionDecreptionService, private download: DownloadService
  ) { }

  uploadDocForm: FormGroup;
  submitted = false;
  resp: any;
  doctype: string;
  title: string;
  desc: string;
  file: FileList;
  src: string;
  filepath: string;
  data: string;
  resp10: any;
  d2: string;
  loader = false;

  error: any;
  ngOnInit() {
    this.getCircular();
    // this.token.genrateToekn();
  }

  getCircular() {
    this.loader = true;

    this.enc.GetServerTime().subscribe(Response => {
      this.resp10 = Response
      let encvaltm = this.resp10.txPcXvn;
      let actval = this.enc.dcrypt(encvaltm);
      this.d2 = this.enc.encryptAgain(actval + "@SEM");
      if (this.d2 != null) {

        let formData: FormData = new FormData();

        formData.append('doctype', this.enc.encrypt("Latest News, Updates & Events"));
        formData.append('webx', this.d2);
        let resp1: any;
        return this.http.post(environment.url + "document-management/get-document", formData).subscribe(
          Response => {
            resp1 = Response
            if (resp1.resp != null) {
              this.resp = JSON.parse(this.enc.dcrypt(resp1.resp))
              // if(this.resp.length>0){
              this.loader = false;
            } else {
              this.loader = false;
            }
          },
          error => {
            this.loader = false;
            this.error = error
            alert('Server not responding');
          }
        )

      } else {
        alert('Something went wrong.Try after sometime.');
        this.loader = false;
      }
    }
      ,
      error => {
        this.loader = false;
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
    // alert(path);
    // alert(encodeURIComponent(this.enc.encrypt(path)));
    this.route.navigate(['/view-pdf', path, filename, title, desc]);

    this.src = environment.url + "get-a-file/get-by-pt?pt=" + encodeURIComponent(this.enc.encrypt(path));
    // alert(this.src);

  }

}
