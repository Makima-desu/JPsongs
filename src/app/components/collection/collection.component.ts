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
  collectionArtists: any

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
  
  }

  SaveToCollection(id: string, likes: number)
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

}
