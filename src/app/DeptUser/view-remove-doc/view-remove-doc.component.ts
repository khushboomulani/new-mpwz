import { Component, OnInit } from '@angular/core';
import { TokengerneratorService } from '../../utils/tokengernerator.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { SessionStorageService } from 'angular-web-storage';
import { EncreptionDecreptionService } from '../../utils/encreption-decreption.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-remove-doc',
  templateUrl: './view-remove-doc.component.html',
  styleUrls: ['./view-remove-doc.component.css']
})
export class ViewRemoveDocComponent implements OnInit {

  constructor(private http: HttpClient, private route: Router, private session: SessionStorageService,
     private token: TokengerneratorService, private enc: EncreptionDecreptionService) { }

  submitted = false;
  submitted1 = false;
  submitted2 = false;

  resp: any;
  resp1: any;
  resp4: any;
  resp5: any;
  error: any;
  doctype: string;
  title: string;
  desc: string;
  file: FileList;
  docid: string;
  circularNo: string;
  circularSub: string;
  filepath: string;
  data: string;
  src: string;
  resp10: any;
  d2: string;
  loading = false;

  ngOnInit() {
    this.getRemovedocs();
    // this.token.genrateToekn();
  }

  getRemovedocs() {
    this.enc.GetServerTime().subscribe(Response => {
      this.resp10 = Response
      let encvaltm = this.resp10.txPcXvn;
      let actval = this.enc.dcrypt(encvaltm);
      this.d2 = this.enc.encryptAgain(actval + "@SEM");
      if (this.d2 != null) {
        let formData: FormData = new FormData();

        formData.append('deptid', this.enc.encrypt(this.session.get('loginid')));
        formData.append('webx', this.d2);
        return this.http.post(environment.url + "document-management/get-document-uploaded-by-de-active", formData).subscribe(
          Response => {
            this.resp5 = Response
            if (this.resp5.resp != null) {
              this.loading = false;
              this.resp1 = JSON.parse(this.enc.dcrypt(this.resp5.resp));
            }
            else {
              this.loading = false;
            }
          },
          error => {
            this.error = error
            this.loading = false;
            alert('Server not responding');
          }
        );
      } else {
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
    // window.open('/view-pdf', path, filename, title, desc, "_blank")

    let url = this.route.serializeUrl(this.route.createUrlTree(['/view-pdf', path, filename, title, desc]));
    window.open(url, "_blank")
    // this.src = environment.url + "get-a-file/get-by-pt?pt="+path;

  }

}
