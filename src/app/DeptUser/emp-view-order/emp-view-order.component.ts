import { Component, OnInit } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { EncreptionDecreptionService } from '../../utils/encreption-decreption.service';
import { TokengerneratorService } from '../../utils/tokengernerator.service';
import { SessionStorageService } from 'angular-web-storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-emp-view-order',
  templateUrl: './emp-view-order.component.html',
  styleUrls: ['./emp-view-order.component.css']
})
export class EmpViewOrderComponent implements OnInit {

  constructor(private http: HttpClient, private route: Router, private session: SessionStorageService, private formBuilder: FormBuilder, 
    private token:TokengerneratorService,private enc:EncreptionDecreptionService) { }
  uploadDocForm: FormGroup;
  submitted = false;
  resp: any;
  doctype: string;
  title: string;
  desc : string;
  file: FileList;
  filepath:string;
  data:string;
  src:string;
  resp10:any;
  d2: string;
  loading=false;
  error:any;


  ngOnInit() {
    if
    (this.session.get('loginid')!=null){
      this.getOrder();

    }else{
this.route.navigate(['/login'])
    }


  }

  getOrder() {
    this.loading=true;
    this.enc.GetServerTime().subscribe(Response=>{
      this.resp10=Response
      let encvaltm=this.resp10.txPcXvn;
      let actval=this.enc.dcrypt(encvaltm);
      this.d2=this.enc.encryptAgain(actval+"@SEM");
    if(this.d2!=null)
    {
       
       
let formData: FormData = new FormData();

formData.append('doctype', this.enc.encrypt("Employee Order"));
formData.append('webx',this.d2);
return this.http.post(environment.url+"document-management/get-document", formData).subscribe(
  Response => {this.resp = Response

    if(this.resp.length>0){
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
}
else
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
getSrc(path, title, desc, filename) {
  this.title = title;
  this.desc = desc
  this.filepath = path;
  this.data = filename;
  // window.open('/view-pdf', path, filename, title, desc, "_blank")
  
  let url=this.route.serializeUrl(this.route.createUrlTree(['/view-pdf', path, filename, title, desc]));
  window.open(url,"_blank")
  // this.src = this.baseURL.baseUrl + "get-a-file/get-by-pt?pt="+path;

}

}
