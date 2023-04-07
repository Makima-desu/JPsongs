import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http" 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MobileMenuComponent } from './components/mobile-menu/mobile-menu.component';
import { SongsComponent } from './components/songs/songs.component';
import { ArtistsComponent } from './components/artists/artists.component';
import { SongComponent } from './components/song/song.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { CollectionComponent } from './components/collection/collection.component';
import { ArtistComponent } from './components/artist/artist.component';
import { UploadArtistComponent } from './components/upload-artist/upload-artist.component';
import { SearchSongsPipe } from './pipes/search-songs.pipe';
import { SearchArtistsPipe } from './pipes/search-artists.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    MobileMenuComponent,
    SongsComponent,
    ArtistsComponent,
    SongComponent,
    DateAgoPipe,
    CollectionComponent,
    ArtistComponent,
    UploadArtistComponent,
    SearchSongsPipe,
    SearchArtistsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
