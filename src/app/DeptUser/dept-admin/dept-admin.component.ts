import { EncreptionDecreptionService } from '../../utils/encreption-decreption.service';
import { TokengerneratorService } from '../../utils/tokengernerator.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { SessionStorageService } from 'angular-web-storage';
import { environment } from 'src/environments/environment';
declare var $:any;

@Component({
  selector: 'app-dept-admin',
  templateUrl: './dept-admin.component.html',
  styleUrls: ['./dept-admin.component.css']
})
export class DeptAdminComponent implements OnInit {

  constructor(private http: HttpClient, private route: Router, private session: SessionStorageService,
    private formBuilder: FormBuilder, private token: TokengerneratorService, private enc: EncreptionDecreptionService) { }
  uploadDocForm: FormGroup;
  ViewuploadDocForm: FormGroup;
  removeForm: FormGroup;
  submitted = false;
  submitted1 = false;
  submitted2 = false;

  resp: any;
  resp1: any;
  resp4: any;
  resp3: any;
  error: any;
  doctype: string;
  type: string;
  title: string;
  desc: string;
  file: FileList;
  docid: string;
  circularNo: string;
  circularSub: string;
  filepath: string;
  data: string;
  src: string;
  resp10: any;
  d2: string;
  loading = false;
  statusZeroArray = Array<any>();
  date: string;
  resp6: any;
  resp7: any;
  newCreate = false;
  isExiest = false;
  newid: string;
  startdate: string;
  enddate: string;
  arrayData = Array<any>();
  resp9: any;


  ngOnInit() {
    this.getAllData();
    this.getdept();
    $("#datepicker").datepicker({
      dateFormat: 'dd-M-y'
    });
    $("#startdate").datepicker({
      dateFormat: 'dd-M-y'
    });
    $("#enddate").datepicker({
      dateFormat: 'dd-M-y'
    });
    // this.getCircular();

    this.uploadDocForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 -_\/.,()]*$')]],
      desc: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 -_\/.,():]*$')]],
      doctype: ['', Validators.required],
      filter: ['', Validators.required],
      docsrno: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9\/ -.,()]*$')]],
      groupid: ['',],
      dept: ['', Validators.required],

    });
    this.getMasterData();
    this.ViewuploadDocForm = this.formBuilder.group({
      viewdoctype: ['', Validators.required],
    });
    this.removeForm = this.formBuilder.group({
      remark: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.uploadDocForm.controls; }
  get f1() { return this.ViewuploadDocForm.controls; }
  get f2() { return this.removeForm.controls; }
  public onFilesChanged(event: any): void {
    if (event.target.files[0].type == "application/pdf" || event.target.files[0].type == "application/zip" || event.target.files[0].type == "application/x-zip-compressed") {

      this.file = event.target.files;
    }
    else {
      event.srcElement.value = null;

      alert("only pdf and zip file is allowed.");
    }
  }

  uploadDoc() {
    this.submitted = true;
    this.loading = true;
    if (this.uploadDocForm.invalid) {
      this.loading = false;
      return;
    }
    this.date = $('#datepicker').val().toUpperCase();
    this.startdate = $('#startdate').val().toUpperCase();
    this.enddate = $('#enddate').val().toUpperCase();
    if (this.startdate == '') {
      this.startdate = "NA";
    }
    if (this.enddate == '') {
      this.enddate = "NA";
    }
    if (this.date == '') {
      this.loading = false;
      alert("please select Date.")
    } else {
      this.enc.GetServerTime().subscribe(Response => {
        this.resp10 = Response
        let encvaltm = this.resp10.txPcXvn;
        let actval = this.enc.dcrypt(encvaltm);
        this.d2 = this.enc.encryptAgain(actval + "@SEM");
        if (this.d2 != null) {

          let formData: FormData = new FormData();

          formData.append('docsrno', this.enc.encrypt(this.uploadDocForm.value.docsrno));
          formData.append('doctype', this.enc.encrypt(this.uploadDocForm.value.doctype));
          formData.append('docdescription', this.enc.encrypt(this.uploadDocForm.value.desc));
          formData.append('subject', this.enc.encrypt(this.uploadDocForm.value.title));
          formData.append('uploadby', this.enc.encrypt(this.session.get('loginid')));
          formData.append('doc', this.file.item(0), this.file.item(0).name);
          formData.append('dateoforder', this.enc.encrypt(this.date));
          formData.append('startdate', this.enc.encrypt(this.startdate));
          formData.append('enddate', this.enc.encrypt(this.enddate));
          formData.append('dept', this.enc.encrypt(this.uploadDocForm.value.dept));
          formData.append('userotp', this.d2);
          formData.append('sysotp', encvaltm);
          if (this.type == "0") {
            if (this.newid != null && this.newid != '') {
              formData.append('groupid', this.enc.encrypt(this.newid));
            } else {
              this.loading = false;
              alert('Please Select Group Id.');
              return;
            }
          } else {
            if (this.uploadDocForm.value.groupid != null && this.uploadDocForm.value.groupid != '') {
              formData.append('groupid', this.enc.encrypt(this.uploadDocForm.value.groupid));
            } else {
              this.loading = false;
              alert('Please Select Group Id.');
              return;
            }

          }

          formData.append('webx', this.d2);
          return this.http.post(environment.url + "document-management/upload-document", formData).subscribe(Response => {
            this.resp = Response

            if (this.resp != null) {
              this.doctype = this.uploadDocForm.value.doctype;
              this.getAllData();
              this.uploadDocForm.reset();
              this.loading = false;
              this.submitted = false;
              $('#enddate').val('');
              $('#startdate').val('');
              $('#datepicker').val('');
              alert(this.resp.msg);
            } else {
              this.loading = false;
              this.uploadDocForm.reset();
              this.submitted = false;
              $('#enddate').val('');
              $('#startdate').val('');
              $('#datepicker').val('');

              alert(this.resp.msg);
            }
          }
            ,
            error => {
              this.loading = false;
              this.error = error
              alert('Server not responding');
            }
          )

        } else {
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

  }

  getAllData() {
    this.loading = true;
    this.enc.GetServerTime().subscribe(Response => {
      this.resp10 = Response
      let encvaltm = this.resp10.txPcXvn;
      let actval = this.enc.dcrypt(encvaltm);
      this.d2 = this.enc.encryptAgain(actval + "@SEM");
      if (this.d2 != null) {

        let formData: FormData = new FormData();


        formData.append('deptid', this.enc.encrypt(this.session.get('loginid')));
        formData.append('webx', this.d2);
        let resp: any;
        return this.http.post(environment.url + "document-management/get-document-uploaded-by-me-active", formData).subscribe(Response => {
          resp = Response

          if (resp.resp != null) {
            this.resp = JSON.parse(this.enc.dcrypt(resp.resp));
            // alert(this.resp.msg);
            this.loading = false;
          }
          else {
            this.loading = false;
            // alert(this.resp.msg);
          }
        },
          error => {
            this.loading = false;
            this.error = error
            alert('Server not responding');
          }
        )

      } else {
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

  getMasterData() {
    this.loading = true;
    this.enc.GetServerTime().subscribe(Response => {
      this.resp10 = Response
      let encvaltm = this.resp10.txPcXvn;
      let actval = this.enc.dcrypt(encvaltm);
      this.d2 = this.enc.encryptAgain(actval + "@SEM");
      if (this.d2 != null) {
        let formData: FormData = new FormData();
        formData.append('userid', this.enc.encrypt(this.session.get('loginid')));
        formData.append('webx', this.d2);
        let resp: any;
        return this.http.post(environment.url + "web-site-admin/get-document-type-master", formData).subscribe(
          Response => {
            resp = Response

            if (resp.resp != null) {
              this.loading = false;
              this.resp9 = JSON.parse(this.enc.dcrypt(resp.resp));
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
      } else {
        alert('Something went wrong.Try after sometime.');
        this.loading = false;
      }
    }, error => {
      this.error = error
      this.loading = false;
      alert('server not responding');
    }
    )
  }

  getdept() {
    this.loading = true;
    this.enc.GetServerTime().subscribe(Response => {
      this.resp10 = Response
      let encvaltm = this.resp10.txPcXvn;
      let actval = this.enc.dcrypt(encvaltm);
      this.d2 = this.enc.encryptAgain(actval + "@SEM");
      if (this.d2 != null) {
        let formData: FormData = new FormData();
        formData.append('code', null);
        formData.append('webx', this.d2);

        return this.http.post(environment.url + "web-site-admin/get-dep-list", formData).subscribe(
          Response => {
            this.resp3 = Response

            if (this.resp3.length > 0) {
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
      } else {
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

  filter(type) {

    this.type = type;
    if (type == 0) {
      this.newCreate = true;
      this.isExiest = false;
    } else if (type == 1) {
      this.newCreate = false;
      this.isExiest = true;
    } else {
      this.newCreate = false;
      this.isExiest = false;
    }
  }
  CreateNewGroupId(doctype) {
    this.loading = true;
    this.enc.GetServerTime().subscribe(Response => {
      this.resp10 = Response
      let encvaltm = this.resp10.txPcXvn;
      let actval = this.enc.dcrypt(encvaltm);
      this.d2 = this.enc.encryptAgain(actval + "@SEM");
      if (this.d2 != null) {

        let formData: FormData = new FormData();

        //groupid,dateoforder
        formData.append('doctype', this.enc.encrypt(doctype));
        formData.append('webx', this.d2);
        let resp: any;
        return this.http.post(environment.url + "document-management/get-new-group-id", formData).subscribe(Response => {
          resp = Response

          if (resp.resp != null) {
            this.resp7 = JSON.parse(this.enc.dcrypt(resp.resp));
            this.newid = this.resp7.newid;
            this.loading = false;
            this.AlredayAddedGroupId(doctype);
            // alert(this.resp.msg);
          }
          else {
            this.loading = false;
            // alert(this.resp.msg);
          }
        },
          error => {
            this.loading = false;
            this.error = error
            alert('Server not responding');
          }
        )

      } else {
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

  AlredayAddedGroupId(doctype) {
    this.loading = true;
    this.arrayData = new Array<any>();
    this.enc.GetServerTime().subscribe(Response => {
      this.resp10 = Response
      let encvaltm = this.resp10.txPcXvn;
      let actval = this.enc.dcrypt(encvaltm);
      this.d2 = this.enc.encryptAgain(actval + "@SEM");
      if (this.d2 != null) {

        let formData: FormData = new FormData();

        //groupid,dateoforder
        formData.append('doctype', this.enc.encrypt(doctype));
        formData.append('webx', this.d2);
        let resp: any;
        return this.http.post(environment.url + "document-management/get-group-id-for-the-old-notice-no", formData).subscribe(
          Response => {
            resp = Response

            if (resp.resp != null) {
              this.resp6 = JSON.parse(this.enc.dcrypt(resp.resp));
              this.loading = false;
              for (let data of this.resp6) {
                this.arrayData.push(data);
              }
            }
            else {
              this.loading = false;
              // alert(this.resp.msg);
            }
          },
          error => {
            this.loading = false;
            this.error = error
            alert('Server not responding');
          }
        )

      } else {
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
  getCircular() {
    this.submitted1 = true;
    this.loading = true;
    if (this.ViewuploadDocForm.invalid) {
      this.loading = false;
      return;
    }
    this.doctype = this.ViewuploadDocForm.value.viewdoctype;
    this.statusZeroArray = new Array<any>();
    this.enc.GetServerTime().subscribe(Response => {
      this.resp10 = Response
      let encvaltm = this.resp10.txPcXvn;
      let actval = this.enc.dcrypt(encvaltm);
      this.d2 = this.enc.encryptAgain(actval + "@SEM");
      if (this.d2 != null) {
        let formData: FormData = new FormData();

        formData.append('doctype', this.enc.encrypt(this.doctype));
        formData.append('webx', this.d2);
        return this.http.post(environment.url + "document-management/get-document", formData).subscribe(
          Response => {
            this.resp = Response

            if (this.resp.resp != null) {
              let arrayData = JSON.parse(this.enc.dcrypt(this.resp.resp));
              this.loading = false;
              for (let data of arrayData) {

                this.statusZeroArray.push(data);

              }

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

      } else {
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

  getDocData(docid, sub, no) {

    this.docid = docid;
    this.circularNo = no;
    this.circularSub = sub;
  }

  OnRemove() {
    this.loading = true;
    this.submitted2 = true;
    if (this.removeForm.invalid) {
      this.loading = false;
      return;
    }
    this.enc.GetServerTime().subscribe(Response => {
      this.resp10 = Response
      let encvaltm = this.resp10.txPcXvn;
      let actval = this.enc.dcrypt(encvaltm);
      this.d2 = this.enc.encryptAgain(actval + "@SEM");
      if (this.d2 != null) {
        let formData: FormData = new FormData();

        formData.append('docid', this.enc.encrypt(this.docid));
        formData.append('userid', this.enc.encrypt(this.session.get('loginid')));
        formData.append('reasonremoved', this.enc.encrypt(this.removeForm.value.remark));
        formData.append('webx', this.d2);
        return this.http.post(environment.url + "document-management/remove-a-document-for-admin", formData).subscribe(
          Response => {
            this.resp1 = Response
            this.onReset()
            if (this.resp1.flag == true) {
              $('#removeModel').modal('hide');
              this.loading = false;
              this.getCircular();
              alert(this.resp1.msg);
              this.onReset();
            } else {
              this.loading = false;
              $('#removeModel').modal('hide');
              this.getCircular();
              alert(this.resp1.msg);
            }

          },
          error => {
            this.loading = false;
            this.error = error
            alert('Server not responding');
          }
        )
      } else {
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

  onReset() {
    this.removeForm.reset();
    this.submitted = false;
  }
  getSrc(path, title, desc, filename) {
    this.title = title;
    this.desc = desc
    this.filepath = path;
    this.data = filename;
    // window.open('/view-pdf', path, filename, title, desc, "_blank")

    let url = this.route.serializeUrl(this.route.createUrlTree(['/view-pdf', path, filename, title, desc]));
    window.open(url, "_blank")
    // this.src = this.baseURL.baseUrl + "get-a-file/get-by-pt?pt="+path;

  }

}
