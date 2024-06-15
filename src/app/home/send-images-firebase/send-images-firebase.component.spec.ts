import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendImagesFirebaseComponent } from './send-images-firebase.component';

describe('SendImagesFirebaseComponent', () => {
  let component: SendImagesFirebaseComponent;
  let fixture: ComponentFixture<SendImagesFirebaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SendImagesFirebaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SendImagesFirebaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
