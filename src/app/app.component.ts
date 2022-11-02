import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from 'angular-web-storage';
import { environment } from 'src/environments/environment';
import { EncreptionDecreptionService } from './utils/encreption-decreption.service';
import { TokengerneratorService } from './utils/tokengernerator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'mpwzweb';
  constructor(private tokenService:TokengerneratorService, private session:SessionStorageService,private http:HttpClient,private encreption:EncreptionDecreptionService){
    document.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      alert('Not Allowed')
    });
  }

  ngOnInit(): void {
    // this.getAuthorizeToken();

  }


 
}
