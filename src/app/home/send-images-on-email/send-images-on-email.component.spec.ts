import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendImagesOnEmailComponent } from './send-images-on-email.component';

describe('SendImagesOnEmailComponent', () => {
  let component: SendImagesOnEmailComponent;
  let fixture: ComponentFixture<SendImagesOnEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SendImagesOnEmailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SendImagesOnEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
