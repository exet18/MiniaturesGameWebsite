import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideBarMenuComponent } from './slide-bar-menu.component';

describe('SlideBarMenuComponent', () => {
  let component: SlideBarMenuComponent;
  let fixture: ComponentFixture<SlideBarMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlideBarMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideBarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
