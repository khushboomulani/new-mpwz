import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionStorageService } from 'angular-web-storage';
import { TokengerneratorService } from '../../../utils/tokengernerator.service';
import { EncreptionDecreptionService } from '../../../utils/encreption-decreption.service';
import { Observable } from 'rxjs';
import { FileQueueObject, FileUploadService } from '../../../utils/file-upload.service';
import { environment } from 'src/environments/environment';

declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-view-gallary',
  templateUrl: './view-gallary.component.html',
  styleUrls: ['./view-gallary.component.css']
})
export class ViewGallaryComponent implements OnInit {

  constructor(private activeroute: ActivatedRoute, private http: HttpClient, private router: Router,
    private session: SessionStorageService, private formBuilder: FormBuilder,
    private token: TokengerneratorService, private enc: EncreptionDecreptionService, public uploader: FileUploadService) { }

  gid: string;
  resp: any;
  loader = true;
  show = false;
  error: any;
  file1: any;
  d2: string;
  resp10: any;
  resp2: any;
  resp3: any;
  loading = false;
  dataArray = new Array<any>();

  src: string;;

  @Output() onCompleteItem = new EventEmitter();

  @ViewChild('fileInput') fileInput;
  queue: Observable<FileQueueObject[]>;


  ngOnInit() {

    this.gid = this.activeroute.snapshot.params.gid;
    this.GetImagePath();
    this.queue = this.uploader.queue;
    this.uploader.onCompleteItem = this.completeItem;
  }

  completeItem = (item: FileQueueObject, response: any) => {
    this.onCompleteItem.emit({ item, response });
  }

  addToQueue1(event) {
    this.enc.GetServerTime().subscribe(Response => {
      this.resp10 = Response
      let encvaltm = this.resp10.txPcXvn;
      let actval = this.enc.dcrypt(encvaltm);
      this.d2 = this.enc.encryptAgain(actval + "@SEM");
      if (this.d2 != null) {

        if (event.target.files[0].type == "image/jpeg") {
          let fileBrowser = this.fileInput.nativeElement;
          this.uploader.addToQueue(fileBrowser.files, this.gid, this.d2);
          //  this.uploader.clearQueue();
          //  event.srcElement.value = null;

        } else {
          event.srcElement.value = null;
          alert("File Type must be Jpeg only");
        }
      } else {
        alert('Something went wrong.Try after sometime.');
        this.loading = false;
      }
    },
      error => {
        this.error = error
        alert('Server not responding');
      }
    )
  }
  GetImagePath() {

    this.dataArray = new Array<any>();
    this.enc.GetServerTime().subscribe(Response => {
      this.resp10 = Response
      let encvaltm = this.resp10.txPcXvn;
      let actval = this.enc.dcrypt(encvaltm);
      this.d2 = this.enc.encryptAgain(actval + "@SEM");
      if (this.d2 != null) {

        let formData: FormData = new FormData();

        formData.append('galaryid', this.enc.encrypt(this.gid));
        formData.append('webx', this.d2)


        return this.http.post(environment.url + "web-site-gallary/get-list-of-gallary", formData).subscribe(
          Response => {
            this.resp = Response

            if (this.resp.resp != null) {

              let data = JSON.parse(this.enc.dcrypt(this.resp.resp));
              for (let dt of data) {

                this.src = environment.url + "get-a-file/get-by-pt?pt=" + dt.imagepath;

                this.dataArray.push(this.src);
              }


            } else {
            }

          }, error => {
            this.error = error
            // this.loader = false;
            alert('Server not responding');
          }
        );
      } else {
        alert('Something went wrong.Try after sometime.');
        this.loading = false;
      }
    },
      error => {
        this.error = error
        alert('Server not responding');
      }
    )
  }

}
