import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EncreptionDecreptionService } from '../utils/encreption-decreption.service';

@Component({
  selector: 'app-eodb',
  templateUrl: './eodb.component.html',
  styleUrls: ['./eodb.component.css']
})
export class EodbComponent implements OnInit {

  constructor(private http: HttpClient, private enc: EncreptionDecreptionService) { }
  loading: boolean = false;
  ngOnInit(): void {
    this.LTcount = 0;
    this.HTcount = 0;
  }

  LTcount = 0;
  LTResp: any = [];
  getLT() {

    this.LTcount = this.LTcount + 1;
    if (this.LTcount == 1) {
    this.loading = true;

      return this.http.post(environment.url + "eodb-web-controller/get-applications-count-lt", null).subscribe(
        Response => {
          this.LTResp = Response;
          if(this.LTResp.length){
            this.loading = false;
          }

        },
        error => {
          this.loading = false;
          console.log(error)
          alert('Server not responding');
        }
      )
    }

  }



  HTcount = 0
  HTresp: any;
  getHT() {
    this.HTcount = this.HTcount + 1;
    if (this.HTcount == 1) {
    this.loading = true;

      return this.http.post(environment.url + "eodb-web-controller/get-applications-count", null).subscribe(
        Response => {
          this.HTresp = Response;
          if(this.HTresp.length){
            this.loading = false;
          }

        },
        error => {
          this.loading = false;
          console.log(error)
          alert('Server not responding');
        }
      )
    }

  }


}
