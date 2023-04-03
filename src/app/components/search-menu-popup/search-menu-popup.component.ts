import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-search-menu-popup',
  templateUrl: './search-menu-popup.component.html',
})
export class SearchMenuPopupComponent implements OnInit {

  constructor() { }

  @Input() songs: any
  @Input() artists: any

  searchArray: any[] = []

  @Input() searchCategory: boolean = true

  @Input() searchText: string = ''

  ngOnInit(): void 
  {


  }
  
  ngOnChanges(changes: SimpleChanges): void
  {
    this.songs = changes['songs'].currentValue // get project id on change
    this.artists = changes['artists'].currentValue // get project on change

  }

}
