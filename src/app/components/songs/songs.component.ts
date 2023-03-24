//@ts-nocheck
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { stringify } from 'postcss';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
})
export class SongsComponent implements OnInit {

  constructor(private api: ApiService, public domSanitizer: DomSanitizer) { }

  songs: any[] = []
  randomSongs: boolean = false
  sortSongs: string = 'new'
  newSongArray: any[] = []

  ngOnInit(): void
  {
    // get the data from api
    this.api.GetSongs().subscribe(res =>
      {
        // assing the data
        this.songs = res

      })
    this.api.GetSongs().subscribe(res =>
      {
        // assing the data
        this.newSongArray = res

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

  ShuffleSongs(songs: any[])
  {
    this.randomSongs = true
    for (var i = songs.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = songs[i];
      songs[i] = songs[j];
      songs[j] = temp;
    }

  }

  ReloadPage()
  {
    location.reload()

  }

  SortSongs(option: string)
  {
    // most likes at the top
    if (option === 'likesDESC') { this.songs.sort((b, a) => a.likes - b.likes); this.sortSongs = 'likesDESC'}
    // less likes at the top
    else if (option === 'likesASC') {this.songs.sort((a, b) => a.likes - b.likes); this.sortSongs = 'likesASC'}
    // // sort by letters
    // else if (option === 'nameASC') {this.songs.sort((a, b) => a.title.toUpperCase() - b.title.toUpperCase())}

  }

}
