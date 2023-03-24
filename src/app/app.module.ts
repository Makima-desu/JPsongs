import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http" 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MobileMenuComponent } from './components/mobile-menu/mobile-menu.component';
import { SearchMenuPopupComponent } from './components/search-menu-popup/search-menu-popup.component';
import { SongsComponent } from './components/songs/songs.component';
import { ArtistsComponent } from './components/artists/artists.component';
import { SongComponent } from './components/song/song.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { CollectionComponent } from './components/collection/collection.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    MobileMenuComponent,
    SearchMenuPopupComponent,
    SongsComponent,
    ArtistsComponent,
    SongComponent,
    DateAgoPipe,
    CollectionComponent
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
