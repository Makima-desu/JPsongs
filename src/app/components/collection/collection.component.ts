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

        let collection: any[] = []
        collection.push(localStorage.getItem('collection'))

        collection.forEach(id =>
          {
            collection = id.split(',')


          })
        
        this.songs.forEach(song =>
          {
            collection.forEach(id =>
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
    collection.push(localStorage.getItem('collection'))

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
