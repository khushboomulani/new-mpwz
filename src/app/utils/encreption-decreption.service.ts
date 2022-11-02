import { Injectable, Inject } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2'
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EncreptionDecreptionService {
  constructor(private http: HttpClient) { }
  d2: string;
  encrypt(data: string) {

    var key = CryptoJS.enc.Utf8.parse('WINPAY@#10@MPEBV');
    var iv = CryptoJS.enc.Utf8.parse('JAIBALAJIVIBHORM');
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), key,
      {
        keySize: 16,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7


      });
    var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
      keySize: 16,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return encrypted;

  }

  dcrypt(data: string) {
    var key = CryptoJS.enc.Utf8.parse('WINPAY@#10@MPEBV');
    var iv = CryptoJS.enc.Utf8.parse('JAIBALAJIVIBHORM');
    var decrypted = CryptoJS.AES.decrypt(data, key, {
      keySize: 16,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);

  }

  encryptAgain(data: string) {

    var key = CryptoJS.enc.Utf8.parse('XYBLJSHRMJM_M7GN');
    var iv = CryptoJS.enc.Utf8.parse('THISISDSCMVLDURJ');
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), key,
      {
        keySize: 16,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7


      });
    //alert('Encrypted :' + encrypted);
    var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
      keySize: 16,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

  
    return encrypted;

  }
  dcryptAgain(data: string) {

    //alert(data);
    var key = CryptoJS.enc.Utf8.parse('XYBLJSHRMJM_M7GN');
    var iv = CryptoJS.enc.Utf8.parse('THISISDSCMVLDURJ');
   
    var decrypted = CryptoJS.AES.decrypt(data, key, {
      keySize: 16,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);

  }

  GetServerTime() {

    let formdata: FormData = new FormData();
  
    return this.http.post(environment.url + "UPLX/SH_BL_RM_M_D", null);
  }

}
