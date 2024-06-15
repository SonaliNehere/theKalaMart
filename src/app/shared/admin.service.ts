import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) { }

  getAdminFCMToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.afAuth.currentUser.then((user) => {
        if (user) {
          this.firestore.collection('admins').doc(user.uid).get().subscribe((doc) => {
            if (doc.exists) {
              const adminData : any = doc.data();
              resolve(adminData.fcmToken); // Assuming 'fcmToken' is the field where you store the FCM token
            } else {
              reject(new Error('Admin document not found'));
            }
          }, (error) => {
            reject(error);
          });
        } else {
          reject(new Error('No authenticated user found'));
        }
      }).catch((error) => {
        reject(error);
      });
    });
  }
}
