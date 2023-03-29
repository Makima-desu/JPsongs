// @ts-nocheck
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
})
export class ArtistComponent implements OnInit {

  artists: any[] = []
  artist: any

  constructor(private title: Title, public api: ApiService, private ActivatedRoute: ActivatedRoute, public domSanitizer: DomSanitizer, private router: Router, private location: Location) 
  {
    this.api.GetArtists().subscribe(res =>
      {
        // @ts-ignore
        this.artists = res

        this.artists.forEach(artist =>
          {
            this.ActivatedRoute.queryParams.forEach(param =>
              {
                // @ts-ignore
                if (artist.title === param.title)
                {
                  this.artist = artist
                  this.title.setTitle(this.artist.title)

                }

              })

          })

      })

  }

  ngOnInit(): void 
  {
  
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

  Reload()
  {
    location.reload()

  }

}
