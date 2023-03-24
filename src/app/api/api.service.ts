import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService 
{
  constructor(private http: HttpClient) { }

  GetSongs()
  {
    return this.http.get("http://localhost:3000/songs")

  }

  GetArtists()
  {
    return this.http.get("http://localhost:3000/artists")

  }

  InsertSongData(song: {title: string, artist: string, iframe: string, link: string, likes: number})
  {
    // not sure why, but having a subscribe sends the data to the api
    this.http.put("http://localhost:3000/songs", song).subscribe(res =>
    {
      console.log(res)

    })

  }
  // for updating song data i.e title, band likes links
  UpdateSongData(song: {title?: string, artist?: string, iframe?: string, link?: string, likes?: number, id: number})
  {
    this.http.post("http://localhost:3000/songs", song).subscribe(res =>
    {
      console.log(res)

    })

  }

}
