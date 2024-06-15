import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMangasComponent } from './list-mangas.component';

describe('ListMangasComponent', () => {
  let component: ListMangasComponent;
  let fixture: ComponentFixture<ListMangasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListMangasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListMangasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
