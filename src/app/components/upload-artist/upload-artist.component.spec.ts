import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadArtistComponent } from './upload-artist.component';

describe('UploadArtistComponent', () => {
  let component: UploadArtistComponent;
  let fixture: ComponentFixture<UploadArtistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadArtistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
