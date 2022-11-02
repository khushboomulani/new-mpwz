import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionStorageService } from 'angular-web-storage';
import {TokengerneratorService} from '../utils/tokengernerator.service';
import {EncreptionDecreptionService} from '../utils/encreption-decreption.service';
import {DownloadService} from '../utils/download.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-press-releases',
  templateUrl: './press-releases.component.html',
  styleUrls: ['./press-releases.component.css']
})
export class PressReleasesComponent implements OnInit {

  constructor(private http: HttpClient, private route: Router, 
    private session: SessionStorageService, private token: TokengerneratorService, 
    private enc: EncreptionDecreptionService, private download: DownloadService
  ) { }

  uploadDocForm: FormGroup;
  submitted = false;
  error: any;
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

  ngOnInit() {
    this.getCircular();
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

        formData.append('doctype', this.enc.encrypt("Press Release"));
        formData.append('webx', this.d2);
        let resp1: any;
        return this.http.post(environment.url + "document-management/get-document", formData).subscribe(
          Response => {
            resp1 = Response
            if (resp1.resp != null) {
              this.resp = JSON.parse(this.enc.dcrypt(resp1.resp))
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


  getSrc(path, title, desc, filename) {
    this.title = title;
    this.desc = desc
    this.filepath = path;
    this.data = filename;
    this.route.navigate(['/view-pdf', path, filename, title, desc]);

    this.src = environment.url + "get-a-file/get-by-pt?pt=" + encodeURIComponent(this.enc.encrypt(path));

  }

}
