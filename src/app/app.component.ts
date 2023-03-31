import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from './api/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent 
{
  constructor(public api: ApiService) 
  {

  }
  title = 'src';
  @ViewChild('menu') menu: any
  @ViewChild('menuButton') menuButton: any

  // @ts-ignore

  data: any
  mobileMenu: boolean = true;

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


  @HostListener('document:click', ['$event', "$event.target "])
  click(event: any, targetElement: HTMLElement)
  {
    if (!(this.menuButton.nativeElement.contains(targetElement)))
    {
      this.mobileMenu = false

    }

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) 
  {
    // depending on the screen size, show or hide the sidebar
    if (window.innerWidth > 620)
    {
      this.mobileMenu = false

    }
    else this.mobileMenu = true


  }

}
