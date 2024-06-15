import { Component, ViewChild, ElementRef } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-send-images-on-email',
  templateUrl: './send-images-on-email.component.html',
  styleUrl: './send-images-on-email.component.css',
})
export class SendImagesOnEmailComponent {
  projectForm!: FormGroup;
  @ViewChild('myForm') myForm!: ElementRef<HTMLFormElement>;
  selectedFiles: File[] = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.projectForm = this.formBuilder.group({
      // Define your form controls here
    });
  }

  onFileChange(event: any) {
    if (event.target.files) {
      this.selectedFiles = Array.from(event.target.files);
    }
  }

  onSubmit() {
    const formData = new FormData(this.myForm.nativeElement);

    this.selectedFiles.forEach((file, index) => {
      formData.append(`file${index}`, file, file.name);
    });

    emailjs
      .sendForm(
        'service_g6he87p',
        'template_4cr5o15',
        this.myForm.nativeElement,
        'iIFTxXkO9DQP7kcGH'
      )
      .then(
        (result: EmailJSResponseStatus) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  }
}
