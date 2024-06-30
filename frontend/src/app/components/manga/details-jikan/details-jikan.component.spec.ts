import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsJikanComponent } from './details-jikan.component';

describe('DetailsJikanComponent', () => {
  let component: DetailsJikanComponent;
  let fixture: ComponentFixture<DetailsJikanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsJikanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsJikanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
