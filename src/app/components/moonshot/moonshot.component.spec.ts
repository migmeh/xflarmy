import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoonshotComponent } from './moonshot.component';

describe('MoonshotComponent', () => {
  let component: MoonshotComponent;
  let fixture: ComponentFixture<MoonshotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoonshotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoonshotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
