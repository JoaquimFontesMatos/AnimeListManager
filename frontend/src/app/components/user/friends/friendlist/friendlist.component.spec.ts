import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendlistComponent } from './friendlist.component';

describe('FriendlistComponent', () => {
  let component: FriendlistComponent;
  let fixture: ComponentFixture<FriendlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FriendlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FriendlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
