import { Inject, Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { DOCUMENT } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  constructor(@Inject(DOCUMENT) private document: any) { }


  downloadFile(filepath)
  {

  this.document.location.href = environment.url+"get-a-file/get-by-pt?pt="+filepath;
  }
}
