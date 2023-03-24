import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMenuPopupComponent } from './search-menu-popup.component';

describe('SearchMenuPopupComponent', () => {
  let component: SearchMenuPopupComponent;
  let fixture: ComponentFixture<SearchMenuPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchMenuPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchMenuPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
