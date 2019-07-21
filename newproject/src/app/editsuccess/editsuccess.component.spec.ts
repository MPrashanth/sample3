import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsuccessComponent } from './editsuccess.component';

describe('EditsuccessComponent', () => {
  let component: EditsuccessComponent;
  let fixture: ComponentFixture<EditsuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditsuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditsuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
