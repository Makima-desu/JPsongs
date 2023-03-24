import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from './api/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent 
{
  constructor(public api: ApiService) {}
  title = 'src';

  // @ts-ignore
  @ViewChild('topBar') topbar: ElementRef

  data: any
  mobileMenu: boolean = false;

  ngOnInit()
  {

  }

  update()
  {
    // this.api.InsertSongData({title: "desu", artist: "makima", iframe: "frame", link: "link"})
    this.api.UpdateSongData({title: "Crossing Field", artist: "LiSA", iframe: "KId6eunoiWk", link: "https://www.youtube.com/watch?v=7DSwyiuWTs4", id: 13})

  }

  add()
  {
    this.api.InsertSongData({title: "LEMONADE", artist: "Sawano Hiroyuki", iframe: "dGeaFc5oZqQ", link: "https://www.youtube.com/watch?v=dGeaFc5oZqQ", likes: 0})

  }

}
