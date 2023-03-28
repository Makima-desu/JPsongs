// @ts-nocheck
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
  sortArtists: string = 'new'

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
    if (localStorage.getItem('artistCollection') === null) {localStorage.setItem('artistCollection', '')}
  
  }

  SaveToCollection(id: number)
  {
    // save id to localStorage
    let artistCollection: any[] = []
    // if there are no items in collection
    // assign the id to array and save it
    if (localStorage.getItem('artistCollection') === null || localStorage.getItem('artistCollection') === "")
    {
      artistCollection.push(id)
      this.api.UpdateArtistData({likes: 1, id: id})
      localStorage.setItem('artistCollection', artistCollection)
    }
    else if (localStorage.getItem('artistCollection') >= '')
    {
      // get the stored collection
      artistCollection.push(localStorage.getItem('artistCollection'))
      
      artistCollection.forEach(song =>
        {
          // split the string into indexes
          artistCollection = song.split(',')
          // if id exists, remove it from collection
          if (artistCollection.indexOf(id.toString()) > -1)
          {
            let index = artistCollection.indexOf(id.toString())
            artistCollection.splice(index, 1)
            this.api.UpdateArtistData({likes: -1, id: id})
            localStorage.setItem('artistCollection', artistCollection) // update the storage

          }
          // else if it doesnt exist add the id to storage
          else if (artistCollection.indexOf(id.toString() === -1))
          {
            artistCollection.push(id.toString())
            this.api.UpdateArtistData({likes: 1, id: id})
            localStorage.setItem('artistCollection', artistCollection)

          }
        })


    }

  }

  IsArtistInCollection(id: number): boolean
  {
    let artistCollection: any[] = []
    artistCollection.push(localStorage.getItem('artistCollection'))

    artistCollection.forEach(artist =>
      {
        artistCollection = artist.split(',')

      })

    if (artistCollection.indexOf(id.toString()) > -1)
    {
      return true

    }
    else return false

  }

  SortArtists(option: string)
  {
    // most likes at the top
    if (option === 'likesDESC') { this.artists.sort((b, a) => a.likes - b.likes); this.sortArtists = 'likesDESC'}
    // less likes at the top
    else if (option === 'likesASC') {this.artists.sort((a, b) => a.likes - b.likes); this.sortArtists = 'likesASC'}

  }

  ReloadPage()
  {
    location.reload()

  }

}
