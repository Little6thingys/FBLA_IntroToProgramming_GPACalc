import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpaAutoComponent } from './gpa-auto.component';

describe('GpaAutoComponent', () => {
  let component: GpaAutoComponent;
  let fixture: ComponentFixture<GpaAutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GpaAutoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GpaAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
