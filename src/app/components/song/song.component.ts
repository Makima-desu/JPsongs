import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
})
export class SongComponent implements OnInit {

  constructor(private title: Title) { }

  location = history

  ngOnInit(): void 
  {
    this.title.setTitle("Japanese Songs - song name here")
  
  }

}
