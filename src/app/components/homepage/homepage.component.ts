import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
})
export class HomepageComponent implements OnInit {

  constructor(private api: ApiService, public domSanitizer: DomSanitizer) { }


  ngOnInit(): void 
  {


  }

}
