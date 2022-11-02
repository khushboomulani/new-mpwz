import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterContentChecked, AfterContentInit, AfterViewChecked, Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EncreptionDecreptionService } from '../utils/encreption-decreption.service';
import { TokengerneratorService } from '../utils/tokengernerator.service';
import { LocalStorageService, SessionStorageService } from 'angular-web-storage';
import { take } from 'rxjs/operators';

import { Router } from '@angular/router';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  constructor(private http: HttpClient, private route: Router, private session: SessionStorageService, private token: TokengerneratorService, private enc: EncreptionDecreptionService) { }

  resp1: any;
  resp2: any;
  resp3: any;

  resp4: any;
  resp5: any;
  resp6: any;
  error: any;
  resp10: any;
  doctype: string;
  title: string;
  desc: string;
  file: FileList;
  src: string;
  filepath: string;
  data: string;
  d2: string;
  loading = false;
  // error:any;
  setflag = false;

  ngOnInit() {

    this.getnoticeboard();
    setTimeout(() => {
      // this.onTimeOut();
      this.getpressrelease();
    }, 1000);


    //  setInterval(() => this.getpressrelease(),1000);
    //  setInterval(() => this.getgalleryimages(),2000);

    this.getgalleryimages();
  }
  getpressrelease() {
    this.loading = true;
    this.enc.GetServerTime().subscribe(Response => {
      this.resp10 = Response
      let encvaltm = this.resp10.txPcXvn;
      let actval = this.enc.dcrypt(encvaltm);
      this.d2 = this.enc.encryptAgain(actval + "@SEM");
      if (this.d2 != null) {
        let formData: FormData = new FormData();

        formData.append('doctype', this.enc.encrypt("Press Release"));
        formData.append('webx', this.d2);

        return this.http.post(environment.url + "document-management/get-document-for-front", formData).subscribe(
          Response => {
            this.resp4 = Response

            if (this.resp4.resp != null) {
              this.resp1 = JSON.parse(this.enc.dcrypt(this.resp4.resp))
              this.loading = false;
            } else {
              this.loading = false;
            }
          },
          error => {
            this.loading = false;
            this.error = error
            this.setflag = true;
            // this.alertflag.serverFag(this.setflag);
            // alert('Something went wrong.Try after sometime.');
          }
        )
      }
      else {
        // alert('Something went wrong.Try after sometime.');
        this.loading = false;
      }
    }
      ,
      error => {
        this.loading = false;
        this.error = error
        this.setflag = true;
        // this.alertflag.serverFag(this.setflag);
        // alert('Something went wrong.Try after sometime.');
      }
    )
  }

  docArray = [];
  getnoticeboard() {
    this.loading = true;
    this.enc.GetServerTime().subscribe(Response => {
      this.resp10 = Response
      let encvaltm = this.resp10.txPcXvn;
      let actval = this.enc.dcrypt(encvaltm);
      this.d2 = this.enc.encryptAgain(actval + "@SEM");
      if (this.d2 != null) {
        let formData: FormData = new FormData();
        formData.append('doctype', this.enc.encrypt("Notice Board"));
        formData.append('webx', this.d2);

        return this.http.post(environment.url + "document-management/get-document-for-front", formData).pipe(take(4)).subscribe(
          Response => {
            this.resp5 = Response
            this.loading = false;
            this.resp2 = JSON.parse(this.enc.dcrypt(this.resp5.resp))

            this.docArray = [];
            for(let i=0; i<4;i++){
              this.docArray.push(this.resp2[i])
            }

            if (this.resp2.length > 0) {
              this.loading = false;
            } else {
              this.loading = false;
            }
          },
          // error => {
          //   this.error = error
          //   alert('Server not responding');
          // }
        );
      }
      else {
        // alert('Something went wrong.Try after sometime.');
        this.loading = false;
      }
    })
  }

  getgalleryimages() {
    this.enc.GetServerTime().subscribe(Response => {
      this.resp10 = Response
      let encvaltm = this.resp10.txPcXvn;
      let actval = this.enc.dcrypt(encvaltm);
      this.d2 = this.enc.encryptAgain(actval + "@SEM");
      if (this.d2 != null) {
        let formData: FormData = new FormData();
        formData.append('doctype', this.enc.encrypt("gallary"));
        formData.append('webx', this.d2);

        return this.http.post(environment.url + "web-site-gallary/get-galary-to-show-on-front", formData).subscribe(
          Response => {
            this.resp6 = Response
            if (this.resp6.resp != null) {
              this.resp3 = JSON.parse(this.enc.dcrypt(this.resp6.resp))
              this.loading = false;
            } else {
              this.loading = false;
            }
          },

          error => {
            this.loading = false;
            this.error = error
            this.setflag = true;
            // this.alertflag.serverFag(this.setflag);
            // alert('Something went wrong.Try after sometime.');
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
        this.setflag = true;
        // this.alertflag.serverFag(this.setflag);
        // alert('Server not responding');
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
    // this.src = this.baseURL.baseUrl + "get-a-file/get-by-pt?pt="+path;

  }
  // serverFag(flag, flagcount)
  // {
  //   if(flag==true && this.count==0)
  //   {
  //     alert("Something Went Wrong. Please Refresh the page");
  //     this.count++;
  //   }
  // }

}
