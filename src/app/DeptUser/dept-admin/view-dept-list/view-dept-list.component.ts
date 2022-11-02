import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokengerneratorService } from '../../../utils/tokengernerator.service';
import { EncreptionDecreptionService } from '../../../utils/encreption-decreption.service';
import { SessionStorageService } from 'angular-web-storage';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-view-dept-list',
  templateUrl: './view-dept-list.component.html',
  styleUrls: ['./view-dept-list.component.css']
})
export class ViewDeptListComponent implements OnInit {

  constructor(private http: HttpClient, private route: Router, private session: SessionStorageService,
    private formBuilder: FormBuilder, private token: TokengerneratorService, private enc: EncreptionDecreptionService) { }

  uploadDocForm: FormGroup;
  submitted = false;
  resp: any;
  error1: any;
  error: any;
  resp1: any;
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
  loading = false;


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
            this.resp = Response

            if (this.resp.length > 0) {
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
    this.route.navigate(['/view-pdf', path, filename, title, desc]);

    this.src = environment.url + "get-a-file/get-by-pt?pt=" + encodeURIComponent(this.enc.encrypt(path));

  }

}
