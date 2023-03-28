// @ts-nocheck
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';
import { SongsService } from 'src/app/services/songs.service';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
})
export class SongComponent implements OnInit {

  songs: any[]
  song: any

  constructor(private title: Title, public api: ApiService, private ActivatedRoute: ActivatedRoute, public domSanitizer: DomSanitizer, private router: Router, private location: Location) 
  {
    this.api.GetSongs().subscribe(res =>
      {
        this.songs = res
        
        this.songs.forEach(song =>
          {
            this.ActivatedRoute.queryParams.forEach(param =>
              {
                if (song.title === param.title)
                {
                  this.song = song
                  this.title.setTitle(this.song.title)

                }

              })

          })

      })

  }


  ngOnInit(): void 
  {

    
  }

  Back()
  {
    this.location.back()

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

  Reload()
  {
    location.reload()

  }

}
