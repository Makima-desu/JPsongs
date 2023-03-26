import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { Buffer } from 'buffer'

@Component({
  selector: 'app-upload-artist',
  templateUrl: './upload-artist.component.html',
})
export class UploadArtistComponent implements OnInit {

  constructor(private api: ApiService) { }

  @ViewChild('input') input: any;

  ngOnInit(): void {
  }


  base64textString: String = "";
  
  handleFileSelect(event: any)
  {
    var files = event.target.files;
    var file = files[0];
    
    if (files && file) {
        var reader = new FileReader();

        // pass the event to reader function
        reader.onload = this.handleReaderLoaded.bind(this);

        reader.readAsBinaryString(file);
    }

  }
  
  // read the image to text encoding
  handleReaderLoaded(readerEvent: any) 
  {
    // get the event and encode it into a base64
    var binaryString = readerEvent.target.result
    this.base64textString = btoa(binaryString)

  }

  UpdateArtist(title?: string, website?: string, channel?: string, spotify?: string, likes: number = 0)
  {
    // send the updated data to 
    this.api.UpdateArtistData({image: this.base64textString, title: title, website: website, channel: channel, spotify: spotify, likes: likes, id: 2})

  }

  InsertArtist(title: string, website?: string, channel?: string, spotify?: string, likes: number = 0)
  {
    this.api.InsertArtistData({image: this.base64textString, title: title, website: website, channel: channel, spotify: spotify, likes: likes})

  }

}
