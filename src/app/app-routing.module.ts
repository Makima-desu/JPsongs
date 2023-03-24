import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistsComponent } from './components/artists/artists.component';
import { CollectionComponent } from './components/collection/collection.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { SongComponent } from './components/song/song.component';
import { SongsComponent } from './components/songs/songs.component';

const routes: Routes = 
[
  {path: "", component: HomepageComponent},
  {path: "songs", component: SongsComponent},
  {path: "songs/:song", component: SongComponent},
  {path: "artists", component: ArtistsComponent},
  // {path: "/artists/:artist", component: ArtistComponent},
  {path: "collection", component: CollectionComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
