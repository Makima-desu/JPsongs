// @ts-nocheck
import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from './api/api.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent 
{
  constructor(public api: ApiService, public domSanitizer: DomSanitizer) 
  {

  }
  title = 'src';
  @ViewChild('menu') menu: any
  @ViewChild('menuButton') menuButton: any
  @ViewChild('searchbar') searchbar: any
  @ViewChild('search') search: any
  @ViewChild('searchInput') searchInput: any


  data: any
  mobileMenu: boolean = false
  searchMenu: boolean = false
  artists: any[] = []
  songs: any[] = []

  searchText: string = ''
  searchCategory: boolean = true

  ngOnInit()
  {
    this.api.GetArtists().subscribe(res =>
      {
        // @ts-ignore
        this.artists = res


      })
    this.api.GetSongs().subscribe(res =>
      {
        // @ts-ignore
        this.songs = res

      })

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
    if (!(this.search.nativeElement.contains(targetElement)) && !(this.searchbar.nativeElement.contains(targetElement)))
    {
      this.searchMenu = false

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

  }

  SearchInput(text: string)
  {
    this.searchText = text

  }

  SaveToCollection(id: string, likes: number)
  {
    // save id to localStorage
    let collection: any[] = []
    // if there are no items in collection
    // assign the id to array and save it
    if (localStorage.getItem('collection') === null || localStorage.getItem('collection') === "")
    {
      collection.push(id)
      this.api.UpdateSongData({likes: 1, id: id})
      localStorage.setItem('collection', collection)
    }
    else if (localStorage.getItem('collection') >= '')
    {
      // get the stored collection
      collection.push(localStorage.getItem('collection'))
      
      collection.forEach(song =>
        {
          // split the string into indexes
          collection = song.split(',')
          // if id exists, remove it from collection
          if (collection.indexOf(id.toString()) > -1)
          {
            let index = collection.indexOf(id.toString())
            collection.splice(index, 1)
            this.api.UpdateSongData({likes: -1, id: id})
            localStorage.setItem('collection', collection) // update the storage

          }
          // else if it doesnt exist add the id to storage
          else if (collection.indexOf(id.toString() === -1))
          {
            collection.push(id.toString())
            this.api.UpdateSongData({likes: 1, id: id})
            localStorage.setItem('collection', collection)

          }
        })

      // ++likes in database
      // check to see if value is already saved

    }

  }

  IsSongInCollection(id: string): boolean
  {
    let collection: any[] = []
    collection.push(localStorage.getItem('songCollection'))

    collection.forEach(song =>
      {
        collection = song.split(',')

      })

    if (collection.indexOf(id.toString()) > -1)
    {
      return true

    }
    else return false

  }

}
