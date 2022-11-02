import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SessionStorageService } from 'angular-web-storage';
import { EncreptionDecreptionService } from '../utils/encreption-decreption.service';
import { environment } from 'src/environments/environment';
// import { load } from '@angular/core/src/render3';

@Component({
  selector: 'app-employee-corner',
  templateUrl: './employee-corner.component.html',
  styleUrls: ['./employee-corner.component.css']
})
export class EmployeeCornerComponent implements OnInit {
  constructor(private http: HttpClient,
    private route: Router,
    private enc: EncreptionDecreptionService
  ) { }

  uploadDocForm: FormGroup;
  submitted = false;
  resp: any;
  error1: any;
  error: any;
  resp1: any;
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
  loading = false;
  loader = false;
  modifiedGradationList: any = []


  ngOnInit() {
    this.achalSamptilist();
    this.empGrationslist();

  }

  achalSamptilist() {
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
        formData.append('doctype', this.enc.encrypt("Achal Sampatti"));
        formData.append('webx', this.d2);

        return this.http.post(environment.url + "document-management/get-document", formData).subscribe(
          Response => {
            this.resp2 = Response

            this.resp = JSON.parse(this.enc.dcrypt(this.resp2.resp))
            if (this.resp.length > 0) {
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

  empGrationslist() {
    this.loading = true;
    this.enc.GetServerTime().subscribe(Response => {
      this.resp10 = Response
      let encvaltm = this.resp10.txPcXvn;
      let actval = this.enc.dcrypt(encvaltm);
      this.d2 = this.enc.encryptAgain(actval + "@SEM");
      if (this.d2 != null) {

        let formData: FormData = new FormData();

        formData.append('doctype', this.enc.encrypt("Gradation List"));
        formData.append('webx', this.d2);

        return this.http.post(environment.url + "document-management/get-document", formData).subscribe(
          Response => {
            this.resp3 = Response
            this.loading = false;
            this.resp1 = JSON.parse(this.enc.dcrypt(this.resp3.resp));

            this.modifiedGradationList = [];

            for (let i of this.resp1) {
              if (i.groupid === "558") {
                this.modifiedGradationList.push(i)
              }
            }
            for (let i of this.resp1) {
              if (i.groupid === "583") {
                this.modifiedGradationList.push(i)
              }
            }
            for (let i of this.resp1) {
              if (i.groupid === "576") {
                this.modifiedGradationList.push(i)
              }
            }
            for (let i of this.resp1) {
              if (i.groupid === "563") {
                this.modifiedGradationList.push(i)
              }
            }
            for (let i of this.resp1) {
              if (i.groupid === "559") {
                this.modifiedGradationList.push(i)
              }
            }
            for (let i of this.resp1) {
              if (i.groupid === "562") {
                this.modifiedGradationList.push(i)
              }
            }
            for (let i of this.resp1) {
              if (i.groupid === "561") {
                this.modifiedGradationList.push(i)
              }
            }
            for (let i of this.resp1) {
              if (i.groupid === "564") {
                this.modifiedGradationList.push(i)
              }
            }
            for (let i of this.resp1) {
              if (i.groupid === "560") {
                this.modifiedGradationList.push(i)
              }
            }
            for (let i of this.resp1) {
              if (i.groupid === "566") {
                this.modifiedGradationList.push(i)
              }
            }
            for (let i of this.resp1) {
              if (i.groupid === "4188") {
                this.modifiedGradationList.push(i)
              }
            }
            for (let i of this.resp1) {
              if (i.groupid === "569") {
                this.modifiedGradationList.push(i)
              }
            }
            for (let i of this.resp1) {
              if (i.groupid === "568") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "567") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "608") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "603") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "616") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "611") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "635") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "634") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "715") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "716") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "598") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "601") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "586") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "591") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "631") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "629") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "595") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "10641") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "637") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "636") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "639") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "3233") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "717") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "719") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){

              if (i.groupid === "718") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "733") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "732") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "625") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "9740") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "735") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "11657") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "727") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "2840") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "623") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "5272") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "9742") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "9750") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "9747") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "736") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "734") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "720") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "9749") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "10507") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "730") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "3475") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "728") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "8854") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "3007") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "9741") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "721") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "3006") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "724") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "9941") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "11659") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "737") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "738") {
                this.modifiedGradationList.push(i)
              }
            }
            for(let i of this.resp1){
              if (i.groupid === "739") {
                this.modifiedGradationList.push(i)
              }
            }


            if (this.resp1.length > 0) {
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
