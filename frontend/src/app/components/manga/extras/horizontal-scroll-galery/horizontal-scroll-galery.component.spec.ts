import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalScrollGaleryComponent } from './horizontal-scroll-galery.component';

describe('HorizontalScrollGaleryComponent', () => {
  let component: HorizontalScrollGaleryComponent;
  let fixture: ComponentFixture<HorizontalScrollGaleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorizontalScrollGaleryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HorizontalScrollGaleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
