import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Components.MainComponent } from './components.main.component';

describe('Components.MainComponent', () => {
  let component: Components.MainComponent;
  let fixture: ComponentFixture<Components.MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Components.MainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Components.MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
