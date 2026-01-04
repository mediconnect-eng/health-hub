import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoSearch } from './video-search';

describe('VideoSearch', () => {
  let component: VideoSearch;
  let fixture: ComponentFixture<VideoSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
