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
  selector: 'app-tenders',
  templateUrl: './tenders.component.html',
  styleUrls: ['./tenders.component.css']
})
export class TendersComponent implements OnInit {

  constructor(private http: HttpClient, private route: Router, private session: SessionStorageService,
    private token: TokengerneratorService, private enc: EncreptionDecreptionService, private download: DownloadService
  ) { }

  uploadDocForm: FormGroup;
  submitted = false;
  resp: any = null;
  error1: any;
  error: any;
  resp1: any = null;
  resp2: any;
  resp3: any;
  resp4: any;
  doctype: string;
  title: string;
  desc: string;
  file: FileList;
  src: string;
  filepath: string;
  data: string;
  title2: string;
  desc2: string;
  filepath2: string;
  data2: string;
  resp10: any;
  d2: string;
  loader = false;


  ngOnInit() {
    this.getTender();
    // this.getVender();
    // this.token.genrateToekn();
  }

  getTender() {
    this.loader = true;
    this.enc.GetServerTime().subscribe(Response => {
      this.resp10 = Response
      let encvaltm = this.resp10.txPcXvn;
      let actval = this.enc.dcrypt(encvaltm);
      // alert(actval)
      this.d2 = this.enc.encryptAgain(actval + "@SEM");
      if (this.d2 != null) {
        // alert(this.d2);
        let formData: FormData = new FormData();
        formData.append('doctype', this.enc.encrypt("Tender"));
        formData.append('webx', this.d2);

        return this.http.post(environment.url + "document-management/get-document", formData).subscribe(
          Response => {
            this.resp2 = Response
            if (this.resp2.resp != null) {
              this.resp = JSON.parse(this.enc.dcrypt(this.resp2.resp))
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
      }
      else {
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

  // getVender() {
  //   this.loader = true;
  //   this.enc.GetServerTime().subscribe(Response => {
  //     this.resp10 = Response
  //     let encvaltm = this.resp10.txPcXvn;
  //     let actval = this.enc.dcrypt(encvaltm);
  //     this.d2 = this.enc.encryptAgain(actval + "@SEM");
  //     if (this.d2 != null) {

  //       let formData: FormData = new FormData();

  //       formData.append('doctype', this.enc.encrypt("Vendor"));
  //       formData.append('webx', this.d2);

  //       return this.http.post(environment.url + "document-management/get-document", formData).subscribe(
  //         Response => {
  //           this.resp3 = Response


  //           if (this.resp3.resp != null) {
  //             this.loader = false;
  //             this.resp1 = JSON.parse(this.enc.dcrypt(this.resp3.resp));
  //           } else {
  //             this.loader = false;
  //           }
  //         },
  //         error => {
  //           this.loader = false;
  //           this.error = error
  //           alert('Server not responding');
  //         }
  //       )
  //     }
  //     else {
  //       alert('Something went wrong.Try after sometime.');
  //       this.loader = false;
  //     }
  //   }
  //     ,
  //     error => {
  //       this.loader = false;
  //       this.error = error
  //       alert('Server not responding');
  //     }
  //   )
  // }

  getSrc(path, title, desc, filename) {
    this.title = title;
    this.desc = desc
    this.filepath = path;
    this.data = filename;
    // alert(path);
    // alert(encodeURIComponent(this.enc.encrypt(path)));
    this.route.navigate(['/view-pdf', path, filename, title, desc]);

    this.src = environment.url + "get-a-file/get-by-pt?pt=" + path;
    // alert(this.src);

  }
  getSrc2(path, title, desc, filename) {
    this.title2 = title;
    this.desc2 = desc
    this.filepath2 = path;
    this.data2 = filename;
    // alert(path);
    // alert(encodeURIComponent(this.enc.encrypt(path)));
    this.route.navigate(['/view-pdf', path, filename, title, desc]);

    this.src = environment.url + "get-a-file/get-by-pt?pt=" + path;
    // alert(this.src);

  }

}
