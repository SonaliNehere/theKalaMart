import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-send-images-firebase',
  templateUrl: './send-images-firebase.component.html',
  styleUrl: './send-images-firebase.component.css'
})
export class SendImagesFirebaseComponent {
  selectedFiles: FileList | null = null;
  numbers: number[] = Array.from({length: 3}, (_, index) => index + 1);

  constructor(private storage: AngularFireStorage) { }

  onFileChange(event: any) {
    this.selectedFiles = event.target.files;
    this.onSubmit();
  }

  onSubmit() {
    if (this.selectedFiles) {
      const fileUploadPromises: Promise<any>[] = [];

      for (let i = 0; i < this.selectedFiles.length; i++) {
        const file = this.selectedFiles.item(i);
        if (file) {
          const filePath = `order_images/${new Date().getTime()}_${file.name}`;
          const fileRef = this.storage.ref(filePath);
          const task = fileRef.put(file);
          fileUploadPromises.push(task.snapshotChanges().toPromise());
        }
      }

      Promise.all(fileUploadPromises).then(() => {
        console.log('Images uploaded successfully');
        // Handle form submission (e.g., send order details to database)
      }).catch(error => {
        console.error('Error uploading images:', error);
      });
    }
  }

  
}
