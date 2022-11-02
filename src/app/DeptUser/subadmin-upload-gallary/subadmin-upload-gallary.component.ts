import { Component, OnInit } from '@angular/core';
  import { FormGroup ,FormBuilder,Validators} from '@angular/forms';
  import { HttpClient,HttpHeaders } from '@angular/common/http';
  import { Router } from '@angular/router';
  import { SessionStorageService } from 'angular-web-storage';
  import { TokengerneratorService } from '../../utils/tokengernerator.service';
  import { EncreptionDecreptionService } from '../../utils/encreption-decreption.service';
  import Swal from 'sweetalert2'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-subadmin-upload-gallary',
  templateUrl: './subadmin-upload-gallary.component.html',
  styleUrls: ['./subadmin-upload-gallary.component.css']
})
export class SubadminUploadGallaryComponent implements OnInit {

  constructor(private http:HttpClient,private router:Router,private session:SessionStorageService,
    private formBuilder:FormBuilder,private token:TokengerneratorService,private enc:EncreptionDecreptionService) { }
    galleryForm:FormGroup;
    date1:string;
    date2:string;
    date:string;
    submitted = false;
    respgall: any;
    respgetgall : any;
    currentdate=new Date();
    //respdept: any;
    gallaryname: string;
    galldescription: string;
    loader=false;
    error:any;
    show=false;
    resp10:any;
    d2:string;
  loading=false;
    //location : string;
  
  
    ngOnInit() {
  
      if
      (this.session.get('loginid')!=null){
    
      //  this.date1 = $("#datepicker").val().toUpperCase();
  
        this.galleryForm = this.formBuilder.group({
          gallaryname: ['', Validators.required],
          galldescription: ['', Validators.required]
          // deptid: ['', Validators.required],
          // location: ['', Validators.required]
        });
       this.getgall();   
      }else{
  this.router.navigate(['/login'])
      }
      }
  
  
  getgall()
  {
    this.loading=true;;
    this.enc.GetServerTime().subscribe(Response => {
      this.resp10 = Response
      let encvaltm = this.resp10.txPcXvn;
      let actval = this.enc.dcrypt(encvaltm);
      this.d2 = this.enc.encryptAgain(actval + "@SEM");
      if (this.d2 != null) {
  
    let formdata: FormData = new FormData();
  
    //formdata.append("date1", this.enc.encrypt(this.start1));
    // formdata.append("date1", this.enc.encrypt("01-Jan-20"));
    formdata.append('webx',this.d2)
  
    // formdata.append("date2", this.enc.encrypt(this.datenew.transform(this.currentdate,'dd-MMM-yy')));
    return this.http.post(environment.url +"web-site-gallary/get-all-active-galary", formdata).subscribe(response => {
      this.respgall = response;
    if (this.respgall.resp!=null) 
    {
      this.respgetgall=JSON.parse(this.enc.dcrypt(this.respgall.resp));
        this.loading = false;
        this.show=true;
      } 
      else 
      {
        this.show=true;
        this.loading = false;
      }
    },
      error => {
        this.error = error
        this.loading = false;
        alert('Server not responding');
      }
    );  
  }else {
    alert('Something went wrong.Try after sometime.');
    this.loading = false;
  }
  },
  error => {
    this.error = error
    alert('Server not responding');
    this.loading=false;
  }
  )
  }
  
  
  get f() { return this.galleryForm.controls; }
  
  
  onSubmit()
  {
   // this.submitted=true;
    // if (this.galleryForm.invalid)
    // {
    //   return;
    //   alert("Invalid.");
    // }
    this.loading=false;
    this.enc.GetServerTime().subscribe(Response => {
      this.resp10 = Response
      let encvaltm = this.resp10.txPcXvn;
      let actval = this.enc.dcrypt(encvaltm);
      this.d2 = this.enc.encryptAgain(actval + "@SEM");
      if (this.d2 != null) {
  
  let formData:FormData =new FormData();
  
  formData.append('galaryname', this.enc.encrypt(this.galleryForm.value.gallaryname));
  formData.append('description', this.enc.encrypt(this.galleryForm.value.galldescription));
  formData.append('webx',this.d2)
  
  return this.http.post(environment.url+"web-site-gallary/create-gallary", formData).subscribe(Response =>
     {this.respgall = Response
  
      if (this.respgall!=null){
        alert(this.respgall.msg);
       // this.submitted=false;
       this.getgall();   
       this.loading=false;
         this.onReset();
        // this.getdept();
      
      }else{
        this.loading=false;
        alert(this.respgall.msg);
      }
  },
  error => {
    this.loading=false;
    this.error = error
    alert('Server not responding');
  }
  )
  }else {
    alert('Something went wrong.Try after sometime.');
    this.loading = false;
  }
  },
  error => {
    this.loading=false;
    this.error = error
    alert('Server not responding');
  }
  )
  }
  goback(){
    this.router.navigateByUrl('/dept-subadmin', {skipLocationChange: true}).then(() =>
    this.router.navigate(['/subadmin-upload-circular']));
  
  }
  RemoveGallary(gid)
  {
   
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.enc.GetServerTime().subscribe(Response => {
              this.resp10 = Response
              let encvaltm = this.resp10.txPcXvn;
              let actval = this.enc.dcrypt(encvaltm);
              this.d2 = this.enc.encryptAgain(actval + "@SEM");
              if (this.d2 != null) {
          
          let formData:FormData =new FormData();
          let data = this.session.get('loginid')+"||"+this.session.get('username')+"||"+gid
          formData.append('dtx', this.enc.encrypt(data));
          // formData.append('description', this.enc.encrypt(this.galleryForm.value.galldescription));
          formData.append('webx',this.d2)
          
          return this.http.post(environment.url+"web-site-gallary/remove-a-galary", formData).subscribe(Response =>
             {this.respgall = Response
          
              if (this.respgall!=null){
                swalWithBootstrapButtons.fire(
                  'Deleted!',
                  this.respgall.msg,
                  'success'
                )
               // this.submitted=false;
               
               this.getgall();   
                 this.onReset();
                // this.getdept();
              
              }else{
                swalWithBootstrapButtons.fire(
                  'info!',
                  this.respgall.msg,
                  'error'
                )
                // alert(this.respgall.msg);
              }
          },
          error => {
            this.loading=false;
            this.error = error
            alert('Server not responding');
          }
          )
          }else {
            alert('Something went wrong.Try after sometime.');
            this.loading = false;
          }
          },
          error => {
            this.error = error
            this.loading=false;
            alert('Server not responding');
          }
          )
      
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  // 
  }
  
  onReset(){
    this.galleryForm.reset();
   
  }

}
