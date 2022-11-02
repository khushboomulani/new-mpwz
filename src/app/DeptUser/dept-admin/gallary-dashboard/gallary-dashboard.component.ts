import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { SessionStorageService } from 'angular-web-storage';
import { TokengerneratorService } from '../../../utils/tokengernerator.service';
import { EncreptionDecreptionService } from '../../../utils/encreption-decreption.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gallary-dashboard',
  templateUrl: './gallary-dashboard.component.html',
  styleUrls: ['./gallary-dashboard.component.css']
})
export class GallaryDashboardComponent implements OnInit {

  constructor(private http: HttpClient, private route: Router, private session: SessionStorageService, 
    private formBuilder: FormBuilder, private token:TokengerneratorService,private enc:EncreptionDecreptionService) { }

  loginForm: FormGroup;
  submitted = false;
  resp: any;
title: string;
desc: string;
file : string;
event:any;
resp10:any;
d2: string;
loading=false;
error:any;

  ngOnInit() {
    if
    (this.session.get('loginid')!=null){

      this.loginForm = this.formBuilder.group({
        title: ['', Validators.required],
          desc: ['', Validators.required]
      },);
    }else{
this.route.navigate(['/login'])
    }


  }
  get f() { return this.loginForm.controls; }

  public onFilesChanged(event: any, type): void {
// (.tif,.png.jpg,gif)
    if (event.target.files[0].type == "any") {
      if (type == "photograph") {
     
        this.file=event.target.files;
       } else {
      event.srcElement.value = null;

      alert("Photo  Uploaded");
    }

  }
}
onsubmit(){
  this.submitted=true;
  this.loading=true;
  if (this.loginForm.invalid){
    this.loading=false;
    return;
  }

  this.enc.GetServerTime().subscribe(Response=>{
    this.resp10=Response
    let encvaltm=this.resp10.txPcXvn;
    let actval=this.enc.dcrypt(encvaltm);
    this.d2=this.enc.encryptAgain(actval+"@SEM");
  if(this.d2!=null)
  {

let formData:FormData =new FormData();
let header: HttpHeaders = new HttpHeaders();
header.append('Content-Type', 'multipart/formdata')
header.append('Authorization', this.session.get('token'))


formData.append('', this.enc.encrypt(this.loginForm.value.title));
formData.append('', this.enc.encrypt(this.loginForm.value.desc));
formData.append('',this.file[0]);
formData.append('webx',this.d2);

return this.http.post(environment.url+"/", formData).subscribe(Response => {this.resp = Response
  if(this.resp!=null){
this.loading=false;
  }else{
this.loading=false;
  }
},
error => {
  this.loading=false;
  this.error = error
  alert('Server not responding');
}
)
}else
{
 alert('Something went wrong.Try after sometime.');
 this.loading=false;
} }
,
error => {
  this.loading=false;
  this.error = error
  alert('Server not responding');
}
)
}
}
