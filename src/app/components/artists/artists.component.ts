import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';
import { ApiService } from 'src/app/api/api.service';
import { Buffer } from 'buffer';
import { buffer } from 'rxjs';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
})
export class ArtistsComponent implements OnInit {

  artists: any[] = []
  test: any

  constructor(private api: ApiService, private title: Title, public domSanitizer: DomSanitizer) 
  {
    this.api.GetArtists().subscribe((res: any) =>
    {
        this.artists = res
        
      })

  }


  ngOnInit(): void 
  {
    this.title.setTitle("Japanese Artists")
  
  }

}
