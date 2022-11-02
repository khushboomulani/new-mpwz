import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SessionStorageService } from 'angular-web-storage';
import { EncreptionDecreptionService } from '../utils/encreption-decreption.service';
declare var $: any;

import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from '@ngx-gallery/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  constructor(public gallery: Gallery, private http: HttpClient, private router: Router, private session: SessionStorageService, private enc: EncreptionDecreptionService) { }
  date1: string;
  date2: string;
  date: string;
  dataArray = new Array<any>();
  submitted = false;
  respgall: any;
  slideIndex = 1;
  respgetgall: any;
  currentdate = new Date();
  //respdept: any;
  gallaryname: string;
  galldescription: string;
  resp: any;
  src: string;
  loader = false;
  error: any;
  show = false;
  resp10: any;
  d2: string;
  loading = false;
  showGallary = false;
  //location : string;
  items: GalleryItem[];


  ngOnInit() {
    $(document).ready(function () {
      $(this).scrollTop(0);
    });
    this.getgall();
    // lightgallery

    $(document).ready(function () {
      $('.lightgallery').lightGallery({
        pager: true
      });
    });
    this.items = this.dataArray.map(item =>
      new ImageItem({ src: item, thumb: item })
    );

    // Load items into the lightbox
    this.basicLightboxExample();
  }
  basicLightboxExample() {
    this.gallery.ref().load(this.items);
  }

  /**
   * Use custom gallery config with the lightbox
   */
  withCustomGalleryConfig() {

    // 2. Get a lightbox gallery ref
    const lightboxGalleryRef = this.gallery.ref('anotherLightbox');

    // (Optional) Set custom gallery config to this lightbox
    lightboxGalleryRef.setConfig({
      imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Top
    });

    // 3. Load the items into the lightbox
    lightboxGalleryRef.load(this.items);
  }

  getgall() {
    this.loader = true;

    this.enc.GetServerTime().subscribe(Response => {
      this.resp10 = Response
      let encvaltm = this.resp10.txPcXvn;
      let actval = this.enc.dcrypt(encvaltm);
      this.d2 = this.enc.encryptAgain(actval + "@SEM");
      if (this.d2 != null) {

        let formdata: FormData = new FormData();

        //formdata.append("date1", this.enc.encrypt(this.start1));
        // formdata.append("date1", this.enc.encrypt("01-Jan-20"));
        formdata.append('webx', this.d2)

        // formdata.append("date2", this.enc.encrypt(this.datenew.transform(this.currentdate,'dd-MMM-yy')));
        return this.http.post(environment.url + "web-site-gallary/get-all-active-galary", formdata).subscribe(response => {
          this.respgall = response;
          if (this.respgall.resp != null) {
            this.respgetgall = JSON.parse(this.enc.dcrypt(this.respgall.resp));
            this.loader = false;
            this.show = true;
          }
          else {
            this.show = true;
            this.loader = false;
          }
        },
          error => {
            this.error = error
            this.loader = false;
            alert('Server not responding');
          }
        );
      } else {
        alert('Something went wrong.Try after sometime.');
        this.loader = false;

      }
    },
      error => {
        this.error = error
        alert('Server not responding');
      }
    )
  }

  GetImagePath(gid) {
    this.loader = true;

    this.dataArray = new Array<any>();
    this.enc.GetServerTime().subscribe(Response => {
      this.resp10 = Response
      let encvaltm = this.resp10.txPcXvn;
      let actval = this.enc.dcrypt(encvaltm);
      this.d2 = this.enc.encryptAgain(actval + "@SEM");
      if (this.d2 != null) {

        let formData: FormData = new FormData();

        formData.append('galaryid', this.enc.encrypt(gid));
        formData.append('webx', this.d2)


        return this.http.post(environment.url + "web-site-gallary/get-list-of-gallary", formData).subscribe(
          Response => {
            this.resp = Response

            if (this.resp.resp != null) {
              this.showGallary = true;
              let data = JSON.parse(this.enc.dcrypt(this.resp.resp));
              for (let dt of data) {

                this.src = environment.url + "get-a-file/get-by-pt?pt=" + dt.imagepath;

                this.dataArray.push(this.src);
              }
            this.loader = false;
            } else {
              this.showGallary = false;
            }

          }, error => {
            this.error = error
            this.loader = false;
            alert('Server not responding');
          }
        );
      } else {
        alert('Something went wrong.Try after sometime.');
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
}
