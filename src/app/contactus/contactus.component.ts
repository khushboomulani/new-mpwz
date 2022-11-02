import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { EncreptionDecreptionService } from '../utils/encreption-decreption.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  constructor(private http: HttpClient, private enc: EncreptionDecreptionService, private router: Router) { }


  resp10: any;
  d2: string;
  resp: any;
  error: any;
  loading = false;
  title: string;
  desc: string
  filepath: string;
  data: string;



  ngOnInit() {
    this.GetContactList();
  }

  GetContactList() {
    this.loading = true;
    this.enc.GetServerTime().subscribe(Response => {
      this.resp10 = Response
      let encvaltm = this.resp10.txPcXvn;
      let actval = this.enc.dcrypt(encvaltm);
      this.d2 = this.enc.encryptAgain(actval + "@SEM");
      if (this.d2 != null) {
        let formData: FormData = new FormData();

        formData.append('doctype', this.enc.encrypt("Contact List"));
        formData.append('webx', this.d2);
        let resp: any;
        return this.http.post(environment.url + "document-management/get-document-for-front", formData).subscribe(
          Response => {
            resp = Response

            if (resp.resp != null) {
              this.resp = JSON.parse(this.enc.dcrypt(resp.resp))
              this.loading = false;
            } else {
              this.loading = false;
            }
          },
          error => {
            this.error = error;
            this.loading = false;

            alert('Server not responding');
          }
        )
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
    // window.open('/view-pdf', path, filename, title, desc, "_blank")

    let url = this.router.serializeUrl(this.router.createUrlTree(['/view-pdf', path, filename, title, desc]));
    window.open(url, "_blank")
    // this.src = this.baseURL.baseUrl + "get-a-file/get-by-pt?pt="+path;

  }

}
