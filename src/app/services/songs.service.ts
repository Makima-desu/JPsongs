import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  constructor() { }

  public songData: any
  
  public GetSongData(song: any)
  {
    this.songData = song

    console.log(this.songData)

  }
}
