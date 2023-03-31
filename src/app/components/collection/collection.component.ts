// @ts-nocheck
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
})
export class CollectionComponent implements OnInit {

  constructor(private api: ApiService, public domSanitizer: DomSanitizer, private title: Title) { }

  songs: any
  collectionSongs: any[] = []
  artists: any
  collectionArtists: any[] = []

  songOptions: boolean = false
  sortSongs: boolean = false
  
  currentCollection: boolean = false

  ngOnInit(): void 
  {
    this.title.setTitle('Collection')
    this.api.GetSongs().subscribe(res =>
      {
        this.songs = res

        let songCollection: any[] = []
        songCollection.push(localStorage.getItem('songCollection'))

        songCollection.forEach(id =>
          {
            songCollection = id.split(',')


          })
        
        this.songs.forEach(song =>
          {
            songCollection.forEach(id =>
              {
                if (song.id.toString() === id.toString())
                {
                  this.collectionSongs.push(song)

                }

              })

          })

      })
    this.api.GetArtists().subscribe(res =>
      {
        this.artists = res
        
        let artistCollection: any[] = []

        artistCollection.push(localStorage.getItem('artistCollection'))

        artistCollection.forEach(artist =>
          {
            artistCollection = artist.split(',')

          })

        this.artists.forEach(artist =>
          {
            artistCollection.forEach(id =>
              {
                if (artist.id.toString() === id.toString())
                {
                  this.collectionArtists.push(artist)

                }

              })

          })

      })
  
  }

  SaveSongToCollection(id: number)
  {
    // save id to localStorage
    let songCollection: any[] = []
    // if there are no items in collection
    // assign the id to array and save it
    if (localStorage.getItem('songCollection') === null || localStorage.getItem('songCollection') === "")
    {
      songCollection.push(id)
      this.api.UpdateSongData({likes: 1, id: id})
      localStorage.setItem('songCollection', songCollection)
    }
    else if (localStorage.getItem('songCollection') >= '')
    {
      // get the stored collection
      songCollection.push(localStorage.getItem('songCollection'))
      
      songCollection.forEach(song =>
        {
          // split the string into indexes
          songCollection = song.split(',')
          // if id exists, remove it from collection
          if (songCollection.indexOf(id.toString()) > -1)
          {
            let index = songCollection.indexOf(id.toString())
            songCollection.splice(index, 1)
            this.api.UpdateSongData({likes: -1, id: id})
            localStorage.setItem('songCollection', songCollection) // update the storage

          }
          // else if it doesnt exist add the id to storage
          else if (songCollection.indexOf(id.toString() === -1))
          {
            songCollection.push(id.toString())
            this.api.UpdateSongData({likes: 1, id: id})
            localStorage.setItem('songCollection', songCollection)

          }
        })

      // ++likes in database
      // check to see if value is already saved

    }

  }

  IsSongInCollection(id: string): boolean
  {
    let songCollection: any[] = []
    songCollection.push(localStorage.getItem('songCollection'))

    songCollection.forEach(song =>
      {
        songCollection = song.split(',')

      })

    if (songCollection.indexOf(id.toString()) > -1)
    {
      return true

    }
    else return false

  }

  SaveArtistToCollection(id: number)
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

}
