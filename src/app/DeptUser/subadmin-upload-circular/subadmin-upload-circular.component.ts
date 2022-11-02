import { Component, OnInit } from '@angular/core';
import { TokengerneratorService } from '../../utils/tokengernerator.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { SessionStorageService } from 'angular-web-storage';
import { Binary } from 'selenium-webdriver/firefox';
// import { StringifyOptions } from 'querystring';
import { EncreptionDecreptionService } from '../../utils/encreption-decreption.service';
import { environment } from 'src/environments/environment';
// import { load } from '@angular/core/src/render3';
declare var $: any;

@Component({
  selector: 'app-subadmin-upload-circular',
  templateUrl: './subadmin-upload-circular.component.html',
  styleUrls: ['./subadmin-upload-circular.component.css']
})
export class SubadminUploadCircularComponent implements OnInit {

  constructor(private http: HttpClient, private route: Router, private session: SessionStorageService,
    private formBuilder: FormBuilder, private token: TokengerneratorService, private enc: EncreptionDecreptionService) { }
  uploadDocForm: FormGroup;
  // ViewuploadDocForm: FormGroup;
  removeForm: FormGroup;
  ViewuploadDocForm: FormGroup;
  submitted = false;
  submitted1 = false;
  submitted2 = false;
  submitted4 = false;

  resp: any;
  resp1: any;
  resp2: any;
  resp3: any;
  resp4: any;
  resp5: any;
  resp6: any;
  resp9: any;
  error: any;
  doctype: string;
  title: string;
  desc: string;
  file: FileList;
  docid: string;
  circularNo: string;
  circularSub: string;
  respdept: any;
  loginid: string;
  filepath: string;
  data: string;
  src: string;
  resp10: any;
  d2: string;
  otpform: FormGroup;
  submitted3 = false;
  loading = false;
  dataArray = Array<any>();;
  sysotp: string;
  msg: string;
  dataobj: any = {};
  showGallary = false;
  showMain = true;
  resp7: any;
  newid: string;
  type: string;

  newCreate = false;
  isExiest = true;
  date: string;
  startdate: string;
  enddate: string;

  pushDataArray = Array<any>();


  ngOnInit() {

    if (this.session.get('loginid') != null) {
      this.getassigneddocs();
      this.getCircular2();


      this.uploadDocForm = this.formBuilder.group({
        title: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9\/ -.,()]*$')]],
        desc: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9\/ -.,()]*$')]],
        doctype: ['', Validators.required],
        filter: ['', Validators.required],
        docsrno: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9\/ -.,()]*$')]],
        groupid: ['',],
        dept: ['', Validators.required],

      });
      this.otpform = this.formBuilder.group({
        uotp: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
        // password: ['', [Validators.required, Validators.minLength(6)]],
      });
      this.removeForm = this.formBuilder.group({

        remark: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]]

        // http://10.98.4.75:8020/web-site-admin/     
      });
      this.ViewuploadDocForm = this.formBuilder.group({
        viewdoctype: ['', Validators.required],
      });
    } else {
      this.route.navigate(['/login'])
    }


  }

  // convenience getter for easy access to form fields
  get f() { return this.uploadDocForm.controls; }

  // get f1() { return this.ViewuploadDocForm.controls; }
  get f2() { return this.removeForm.controls; }
  get f1() { return this.otpform.controls; }
  get f3() { return this.ViewuploadDocForm.controls; }
  getDate() {
    $("#datepicker").datepicker({
      dateFormat: 'dd-M-y'
    });
    $("#startdate").datepicker({
      dateFormat: 'dd-M-y'
    });
    $("#enddate").datepicker({
      dateFormat: 'dd-M-y'
    });
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
            this.resp9 = Response

            if (this.resp9.length > 0) {
              this.loading = false;;
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
    },
      error => {
        this.loading = false;
        this.error = error
        alert('Server not responding');
      }
    )
  }
  public onFilesChanged(event: any): void {
    // (.tif,.png.jpg,gif)
    if (event.target.files[0].type == "application/pdf") {

      this.file = event.target.files;
    }
    else {
      event.srcElement.value = null;

      alert("File Uploaded.");
    }

  }

  getType(type) {
    if (type == "gallary") {
      this.showGallary = true;
      this.showMain = false;
    } else {
      this.showGallary = false;
      this.showMain = true;
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
      alert("please select Date.")
      this.loading = false;
    } else {
      this.dataArray = new Array<any>();
      this.doctype = this.uploadDocForm.value.doctype;
      this.enc.GetServerTime().subscribe(Response => {
        this.resp10 = Response
        let encvaltm = this.resp10.txPcXvn;
        let actval = this.enc.dcrypt(encvaltm);
        this.d2 = this.enc.encryptAgain(actval + "@SEM");
        if (this.d2 != null) {
          let gid: string;

          if (this.type == "0") {

            if (this.newid != null && this.newid != '') {
              gid = this.enc.encrypt(this.newid);
            } else {
              alert('Please Select Group Id.');
              this.loading = false;
              return;
            }
          } else {
            if (this.uploadDocForm.value.groupid != null && this.uploadDocForm.value.groupid != '') {
              gid = this.enc.encrypt(this.uploadDocForm.value.groupid);
            } else {
              this.loading = false;
              alert('Please Select Group Id.');
              return;
            }

          }

          this.dataobj = {
            "docsrno": this.enc.encrypt(this.uploadDocForm.value.docsrno),
            "doctype": this.enc.encrypt(this.doctype),
            "docdescription": this.enc.encrypt(this.uploadDocForm.value.desc),
            "subject": this.enc.encrypt(this.uploadDocForm.value.title),
            "date": this.enc.encrypt(this.date),
            "gid": gid,
            "dept": this.enc.encrypt(this.uploadDocForm.value.dept),
            //  gid"file":this.file.item(0),this.file.item(0).name,
          }

          let formData1: FormData = new FormData();

          formData1.append('uploadby', this.enc.encrypt(this.session.get('loginid')));

          formData1.append('webx', this.d2);

          return this.http.post(environment.url + "document-management/upload-doc-otp", formData1).subscribe(
            Response => {
              this.resp1 = Response

              if (this.resp1.resp != null) {
                $('#exampleModal').modal('show');
                this.resp3 = this.enc.dcrypt(this.resp1.resp);

                let data1 = JSON.parse(this.resp3);
                // alert(data1.flag)
                if (data1.flag == true) {
                  this.sysotp = this.enc.dcrypt(data1.encotp);
                  this.loading = false;
                  // alert(this.sysotp);
                  // this.onReset();
                  this.msg = data1.msg;
                } else {
                  this.loading = false;
                  alert(data1.msg);

                  // this.onReset();
                }
                // this.onReset()
                // this.getCircular2();
              } else {

                // this.onReset();
                alert("null");
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
      },
        error => {
          this.loading = false;
          this.error = error
          alert('Server not responding');
        }
      )
    }
  }

  hidden() {

    this.loading = true;
    this.submitted3 = true;
    if (this.otpform.invalid) {
      this.loading = false;
      return;
    }
    if (this.sysotp == this.otpform.value.uotp) {

      this.enc.GetServerTime().subscribe(Response => {
        this.resp10 = Response
        let encvaltm = this.resp10.txPcXvn;
        let actval = this.enc.dcrypt(encvaltm);
        this.d2 = this.enc.encryptAgain(actval + "@SEM");
        if (this.d2 != null) {

          let formData: FormData = new FormData();
          formData.append('docsrno', this.dataobj.docsrno);
          formData.append('doctype', this.dataobj.doctype);
          formData.append('docdescription', this.dataobj.docdescription);
          formData.append('subject', this.dataobj.subject);
          formData.append('dateoforder', this.dataobj.date);
          formData.append('groupid', this.dataobj.gid);
          formData.append('uploadby', this.enc.encrypt(this.session.get('loginid')));
          formData.append('doc', this.file.item(0), this.file.item(0).name);
          formData.append('sysotp', this.enc.encrypt(this.sysotp));
          formData.append('startdate', this.enc.encrypt(this.startdate));
          formData.append('enddate', this.enc.encrypt(this.enddate));
          formData.append('dept', this.enc.encrypt(this.dataobj.dept))
          formData.append('userotp', this.enc.encryptAgain(this.otpform.value.uotp));

          formData.append('webx', this.d2);



          return this.http.post(environment.url + "document-management/upload-document", formData).subscribe(
            Response => {
              this.resp1 = Response

              if (this.resp1.flag = true) {
                alert(this.resp1.msg);
                this.loading = false;
                this.getCircular2();
                this.otpform.reset();
                this.submitted3 = false;
                this.newid = "";
                this.isExiest = false;
                this.newCreate = false;
                $('#enddate').val('');
                $('#startdate').val('');
                $('#datepicker').val('');

                this.onReset();
                $('#exampleModal').modal('hide')
              } else {
                alert(this.resp1.msg);
                $('#exampleModal').modal('hide')
                this.onReset();
                this.otpform.reset();
                this.loading = false;
                $('#enddate').val('');
                $('#startdate').val('');
                $('#datepicker').val('');
                this.newid = "";
                this.isExiest = false;
                this.newCreate = false;
                this.submitted3 = false;
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
      },
        error => {
          this.loading = false;
          this.error = error
          alert('Server not responding');
        }
      )
    } else {
      alert('OTP is invalid.')
      this.loading = false;
    }

  }
  getCircular2() {
    this.loading = true;

    this.enc.GetServerTime().subscribe(Response => {
      this.resp10 = Response
      let encvaltm = this.resp10.txPcXvn;
      let actval = this.enc.dcrypt(encvaltm);
      this.d2 = this.enc.encryptAgain(actval + "@SEM");
      if (this.d2 != null) {

        this.pushDataArray = new Array<any>();
        let formData: FormData = new FormData();

        formData.append('deptid', this.enc.encrypt(this.session.get('loginid')));
        formData.append('webx', this.d2);
        return this.http.post(environment.url + "document-management/get-document-uploaded-by-me-active", formData).subscribe(
          Response => {
            this.resp2 = Response

            if (this.resp2.resp != null) {
              let data: any;

              this.resp5 = JSON.parse(this.enc.dcrypt(this.resp2.resp));
              for (let data of this.resp5) {
                this.pushDataArray.push(data);

              }

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

  getCircularData() {
    this.submitted4 = true;
    this.loading = false;
    if (this.ViewuploadDocForm.invalid) {
      this.loading = false;
      return;
    }
    this.doctype = this.ViewuploadDocForm.value.viewdoctype;
    this.pushDataArray = new Array<any>();
    if (this.doctype == "All") {
      this.getCircular2();
    } else {
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
              this.resp6 = Response

              if (this.resp6.resp != null) {
                let arrayData = JSON.parse(this.enc.dcrypt(this.resp6.resp));
                this.loading = false;
                for (let data of arrayData) {

                  this.pushDataArray.push(data);

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
      },
        error => {
          this.loading = false;
          this.error = error
          alert('Server not responding');
        }
      )
    }

  }
  getDocData(docid, sub, no) {

    this.docid = docid;
    this.circularNo = no;
    this.circularSub = sub;
  }

  RemoveOtp() {
    this.submitted2 = true;
    this.loading = false;
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
        this.dataobj = {
          "reasonremoved": this.enc.encrypt(this.removeForm.value.remark),
          "docid": this.enc.encrypt(this.docid)

        }

        let formData: FormData = new FormData();

        formData.append('uploadby', this.enc.encrypt(this.session.get('loginid')));

        formData.append('webx', this.d2);

        return this.http.post(environment.url + "document-management/upload-doc-otp", formData).subscribe(
          Response => {
            this.resp3 = Response

            if (this.resp3.resp != null) {
              $('#removeDocOTPModel').modal('show');
              $('#removeModel').modal('hide');
              this.resp4 = this.enc.dcrypt(this.resp3.resp);
              let data1 = JSON.parse(this.resp4);
              // alert(data1.flag)
              if (data1.flag == true) {
                this.sysotp = this.enc.dcrypt(data1.encotp);
                // alert(this.sysotp);
                // this.onReset();
                this.loading = false;
                this.msg = data1.msg;
              } else {
                this.loading = false;
                alert(data1.msg);

                // this.onReset();
              }
              // this.onReset()
              // this.getCircular2();
            } else {
              this.loading = false;
              // this.onReset();
              alert("null");
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
  OnRemove() {
    this.submitted3 = true;
    this.loading = false;
    if (this.otpform.invalid) {
      this.loading = false;
      return;
    }

    if (this.sysotp == this.otpform.value.uotp) {
      this.enc.GetServerTime().subscribe(Response => {
        this.resp10 = Response
        let encvaltm = this.resp10.txPcXvn;
        let actval = this.enc.dcrypt(encvaltm);
        this.d2 = this.enc.encryptAgain(actval + "@SEM");
        if (this.d2 != null) {

          let formData: FormData = new FormData();

          formData.append('docid', this.dataobj.docid);
          formData.append('userid', this.enc.encrypt(this.session.get('loginid')));
          formData.append('reasonremoved', this.dataobj.reasonremoved);
          formData.append('sysotp', this.enc.encrypt(this.sysotp));
          formData.append('userotp', this.enc.encryptAgain(this.otpform.value.uotp));
          formData.append('webx', this.d2);

          return this.http.post(environment.url + "document-management/remove-a-document-for-admin", formData).subscribe(
            Response => {
              this.resp1 = Response

              if (this.resp1.flag == true) {
                this.loading = false;
                $('#removeDocOTPModel').modal('hide');
                this.getCircular2();
                alert(this.resp1.msg);
                this.otpform.reset();
                this.submitted3 = false;

              } else {
                this.loading = false;
                this.getCircular2();
                $('#removeDocOTPModel').modal('hide');
                alert(this.resp1.msg);
                this.otpform.reset();
                this.submitted3 = false;
              }

            }, error => {
              this.error = error
              this.loading = false;
              alert('Server not responding');
            }
          );
        } else {
          alert('Something went wrong.Try after sometime.');
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
      alert('OTP is invalid.')
      this.loading = false;
    }
  }

  getassigneddocs() {
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

        return this.http.post(environment.url + "web-site-admin/get-dept-roles", formData).subscribe(Response => {
          this.respdept = Response
          if (this.respdept.length > 0) {
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


  onReset() {
    this.uploadDocForm.reset();
    this.submitted = false;
  }
  onReset2() {
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
    // this.src = environment.url + "get-a-file/get-by-pt?pt="+path;

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
            this.loading = false;
            this.resp7 = JSON.parse(this.enc.dcrypt(resp.resp));
            this.newid = this.resp7.newid;
            // this.uploadDocForm.setValue({
            //   groupid:this.newid
            // })
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
              this.loading = false;
              this.resp6 = JSON.parse(this.enc.dcrypt(resp.resp));
            }
            else {
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

}
