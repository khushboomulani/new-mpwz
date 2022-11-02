import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionStorageService } from 'angular-web-storage';
import { environment } from '../../environments/environment';
import { EncreptionDecreptionService } from './encreption-decreption.service';

@Injectable({
  providedIn: 'root'
})
export class TokengerneratorService {

  constructor(private encreption: EncreptionDecreptionService, private http: HttpClient, private session: SessionStorageService) { }
  resp: any;

  dynamic = ["tbr", "lmn", "tstr", "blj", "vndv", "matji"];
  randomItem = this.dynamic[Math.floor(Math.random() * this.dynamic.length)];
  username: string = "MPEB";
  password: string = "123";
  error: any;
  setflag = false;

  genrateToekn() {
    let formdata: FormData = new FormData();
    let data = this.username + "|" + this.password;
    formdata.append("dtx", this.encreption.encrypt(data));
    // formdata.append("password",this.encreption.encrypt(this.password));


    return this.http.post(environment.url + "token/generate-token", formdata).subscribe(response => {
      this.resp = response;
      if (this.resp.resp != null) {
        let data = JSON.parse(this.encreption.dcrypt(this.resp.resp));
        this.session.set("token", "Urjas " + data.token);

      } else {

      }
    }, error => {
      this.error = error
      this.setflag = true;
      // this.loading=false;
      alert('Server not responding');
    });
  }
  getAuthToken(): string {
    return this.session.get('token');
  }
}
