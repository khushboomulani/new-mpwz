import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TokengerneratorService } from '../utils/tokengernerator.service';
import { SessionStorageService } from 'angular-web-storage'
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {EncreptionDecreptionService} from '../utils/encreption-decreption.service';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient, private route: Router, private session: SessionStorageService, private token: TokengerneratorService, private enc: EncreptionDecreptionService) { }
  uploadDocForm: FormGroup;
  submitted = false;
  resp: any;
  resp2: any;
  resp3: any;
  resp4: any;
  doctype: string;
  title: string;
  desc: string;
  file: FileList;
  filepath: string;
  data: string;
  src: string;
  resp1: any;
  error: any;
  resp10: any;
  d2: string;
  loading = false;
  setflag = false;
  // count:number=0;
  ngOnInit() {

    this.token.genrateToekn();

    $(function () {
      $('.carousel').carousel({
        interval: 2000
      });
    });

    setTimeout(() => {
      // this.onTimeOut();
      // alert('api call');
      this.getresult();
    }, 1000);


    /* basic - default settings */
    $('.str1').liMarquee();
    $('.str4').liMarquee({
      direction: 'up',
      loop: -1,
      scrolldelay: 0,
      scrollamount: 30,
      circular: true,
      drag: true
    });

    this.getCircular();

    // this.getresult();

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

        formData.append('doctype', this.enc.encrypt("Latest News, Updates & Events"));
        formData.append('webx', this.d2);

        return this.http.post(environment.url + "document-management/get-document", formData).subscribe(
          Response => {
            this.resp2 = Response

            this.resp = JSON.parse(this.enc.dcrypt(this.resp2.resp));
            if (this.resp.length > 0) {
              this.loading = false;
            } else {
              this.loading = false;
            }
          },
          error => {
            this.loading = false;
            this.error = error
            this.setflag = true;
            // alert('Something went wrong.Try after sometime.');
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
        this.setflag = true;
        // alert('Something went wrong.Try after sometime.');
      }
    )


  }

  getresult() {
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

        return this.http.post(environment.url + "document-management/get-document", formData).subscribe(
          Response => {
            this.resp3 = Response
            this.resp1 = JSON.parse(this.enc.dcrypt(this.resp3.resp));
            if (this.resp1.length > 0) {
              this.loading = false;
            } else {
              this.loading = false;
            }
            // },
            // error => {
            //   this.error = error
            //   alert('Server not responding');
          }
          ,
          error => {
            this.loading = false;
            this.error = error
            alert('Something went wrong.Try after sometime.');
            this.setflag = true;
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
        this.setflag = true;
        alert('Something went wrong.Try after sometime.');
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
