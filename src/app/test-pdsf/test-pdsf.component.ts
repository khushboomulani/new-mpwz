import { Component, OnInit, Input, Inject } from '@angular/core';
// import {  } from 'pdfjs-dist';
import { PDFSource } from 'pdfjs-dist';
import { EncreptionDecreptionService } from '../utils/encreption-decreption.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';
import { TokengerneratorService } from '../utils/tokengernerator.service';
// import { FileSaver } from 'file-saver';
import * as FileSaver from 'file-saver';



@Component({
  selector: 'app-test-pdsf',
  templateUrl: './test-pdsf.component.html',
  styleUrls: ['./test-pdsf.component.css']
})
export class TestPdsfComponent implements OnInit {

  path: string;
  data: string;
  filepath: string;
  filename: string;
  desc: string;
  title: string;
  resp: any;
  show = false
  showMsg = false;
  loader = false;


  constructor(private enc: EncreptionDecreptionService, private token: TokengerneratorService, private activeRoute: ActivatedRoute, private http: HttpClient, @Inject(DOCUMENT) private document: any) {

  }
  // @Input()
  src: string | Uint8Array | PDFSource;
  loading = false;
  ngOnInit() {
    this.token.genrateToekn();

    this.path = this.activeRoute.snapshot.params.path;
    this.filename = this.activeRoute.snapshot.params.filename;
    this.title = this.activeRoute.snapshot.params.title;

    this.desc = this.activeRoute.snapshot.params.desc;
    let data = this.desc.split('.');
    let type = data[1]
    if (type == "PDF") {
      this.showMsg = false;
      this.show = true;
    } else if (type == "pdf") {
      this.showMsg = false;
      this.show = true;
    } else if (type == "zip") {
      this.show = false;
      this.showMsg = true;
      this.downloadFile(this.path);
      setTimeout(() => {
        // this.onTimeOut();
        window.close();
      }, 10000);



    }
    this.src = environment.url + "get-a-file/get-by-pt?pt=" + this.path;
  }
  downloadFile(filepath) {
    this.document.location.href = environment.url + "get-a-file/get-by-pt?pt=" + filepath;
  }

  // onDownload() {
  //   this.loader = true;

  //   let filename = this.filename;
  //   return this.http.get(environment.url + "get-a-file/get-by-pt?pt=" + this.path, { responseType: 'blob' }).subscribe(response => {
  //     this.resp = response;

  //     var newBlob = new Blob([this.resp], { type: "application/pdf" });
  //     let newVariable: any = window.navigator;
  //     if (newVariable && newVariable.msSaveOrOpenBlob) {

  //       newVariable.msSaveBlob(newBlob);
  //       this.loader = false;
  //       return;
  //     }
  //     // if (window.navigator && window.navigator.msSaveOrOpenBlob) {
  //     //    window.navigator.msSaveBlob(newBlob);
  //     //    return;
  //     //  }
  //     // For other browsers: 
  //     // Create a link pointing to the ObjectURL containing the blob.
  //     const data = window.URL.createObjectURL(newBlob);
  //     var link = document.createElement('a');
  //     link.href = data;
  //     link.download = filename + ".pdf";
  //     // this is necessary as link.click() does not work on the latest firefox
  //     link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
  //     this.loader = false;
  //     setTimeout(function () {
  //       // For Firefox it is necessary to delay revoking the ObjectURL
  //       window.URL.revokeObjectURL(data);
  //     }, 100);
  //   }, error => {
  //     this.loader = false;
  //     alert('Server Not Responding')
  //   })
  // }

  onDownload() {
    this.loader = true;
    return this.http.get(environment.url + "get-a-file/get-by-pt?pt=" + this.path, { responseType: 'blob' }).subscribe
      (response => {
        let blob: any = new Blob([response], { type: 'application/pdf' });
        this.loader = false;
        console.log(this.filename)
        FileSaver.saveAs(blob, this.filename + '.pdf');
      }), (error: any) => {
        this.loader = false;
        alert('Server Not Responding')

      },
      () => { this.loader = false, console.info('File downloaded successfully') };

  }

}
