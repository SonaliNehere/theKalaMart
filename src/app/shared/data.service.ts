import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';

import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    private fireStorage: AngularFireStorage,
    private firestore: AngularFirestore,
    private afMessaging: AngularFireMessaging
  ) {}

  data: any;
  orderData: any;
  cartData: any;
  editableData: any;
  userDetails: any;

  isMultipleProducts: boolean = false;

  uid: string = '';
  email: any;
  password: any;

  setUid(data: any) {
    this.uid = data;
  }

  getUid() {
    return this.uid;
  }

  setEmail(data: any) {
    this.email = data;
  }

  getEmail() {
    return this.email;
  }

  setPassword(data: any) {
    this.password = data;
  }

  getPassword() {
    return this.password;
  }

  setData(data: any) {
    this.data = data;
  }

  getData() {
    return this.data;
  }

  setOrderData(data: any) {
    this.orderData = data;
  }

  getOrderData() {
    return this.orderData;
  }

  setCartData(data: any) {
    this.cartData = data;
  }

  getCartData() {
    return this.cartData;
  }

  setEditableData(data: any) {
    this.editableData = data;
  }

  getEditableData() {
    return this.editableData;
  }

  setIsMultipleProducts(data: any) {
    this.isMultipleProducts = data;
  }

  getIsMultipleProducts() {
    return this.isMultipleProducts;
  }

  setUserData(data: any) {
    this.userDetails = data;
  }

  getUserData() {
    return this.userDetails;
  }

  addToCart(productId: string, quantity: number, product: any) {
    const uid = localStorage.getItem('uid');

    if (!uid) {
      console.error('User is not authenticated');
      return;
    }

    const cartDocRef = this.firestore.collection('carts').doc(uid);

    return cartDocRef
      .get()
      .toPromise()
      .then((doc: any) => {
        if (doc.exists) {
          // If the cart document exists, check if the product already exists in the cart
          const cartData = doc.data();
          const products = cartData.products || []; // Initialize products array if it doesn't exist

          const existingProductIndex = products.findIndex(
            (p: any) => p.productId === productId
          );
          if (existingProductIndex !== -1) {
            // Product already exists in the cart, update the quantity
            products[existingProductIndex].quantity += quantity;
          } else {
            // Product doesn't exist in the cart, add it to the products array
            products.push({ productId, quantity, product });
          }

          // Update the cart document with the updated products array
          return cartDocRef.set({ products }, { merge: true });
        } else {
          // If the cart document doesn't exist, create it with the new product data
          return cartDocRef.set({
            products: [{ productId, quantity, product }],
          });
        }
      })
      .catch((error) => {
        console.error('Error adding product to cart:', error);
      });
  }

  getCartProducts() {
    const userId = localStorage.getItem('uid');

    if (!userId) {
      // User is not authenticated, return an empty observable or handle the error
      return new Observable<any[]>((observer) => {
        observer.next([]);
        observer.complete();
      });
    }

    // Query the cart collection based on the user ID
    return this.firestore.collection('carts').doc(userId).valueChanges();
  }

  removeFromCart(productId: string) {
    const uid = localStorage.getItem('uid');

    if (!uid) {
      console.error('User is not authenticated');
      return;
    }

    const cartDocRef = this.firestore.collection('carts').doc(uid);

    return cartDocRef
      .get()
      .toPromise()
      .then((doc: any) => {
        if (doc.exists) {
          // If the cart document exists, check if the product exists in the cart
          const cartData = doc.data();
          const products = cartData.products || []; // Initialize products array if it doesn't exist

          const updatedProducts = products.filter(
            (p: any) => p.productId !== productId
          );

          // Update the cart document with the updated products array
          return cartDocRef.set({ products: updatedProducts });
        } else {
          console.error('Cart document does not exist');
          return;
        }
      })
      .catch((error) => {
        console.error('Error removing product from cart:', error);
      });
  }

  removeProductsFromCart(productIds: string[]) {
    const uid = localStorage.getItem('uid');

    if (!uid) {
      console.error('User is not authenticated');
      return;
    }

    const cartDocRef = this.firestore.collection('carts').doc(uid);

    return cartDocRef
      .get()
      .toPromise()
      .then((doc: any) => {
        if (doc.exists) {
          // If the cart document exists, check if the products exist in the cart
          const cartData = doc.data();
          const products = cartData.products || []; // Initialize products array if it doesn't exist

          // Filter out products whose IDs are in the productIds array
          const updatedProducts = products.filter(
            (p: any) => !productIds.includes(p.productId)
          );

          // Update the cart document with the updated products array
          return cartDocRef.set({ products: updatedProducts });
        } else {
          console.error('Cart document does not exist');
          return;
        }
      })
      .catch((error) => {
        console.error('Error removing products from cart:', error);
      });
  }

  emptyCart() {
    const uid = localStorage.getItem('uid');

    if (!uid) {
      console.error('User is not authenticated');
      return;
    }

    const cartDocRef = this.firestore.collection('carts').doc(uid);

    return cartDocRef
      .get()
      .toPromise()
      .then((doc: any) => {
        if (doc.exists) {
          // If the cart document exists, remove all products from the cart
          return cartDocRef.set({ products: [] }); // Set products array to empty
        } else {
          return;
        }
      })
      .catch((error) => {
        console.error('Error adding product to cart:', error);
      });
  }

  increaseDecreaseQuantity(productId: string, quantity: number, product: any) {
    const uid = localStorage.getItem('uid');

    if (!uid) {
      console.error('User is not authenticated');
      return;
    }

    const cartDocRef = this.firestore.collection('carts').doc(uid);

    return cartDocRef
      .get()
      .toPromise()
      .then((doc: any) => {
        if (doc.exists) {
          // If the cart document exists, check if the product already exists in the cart
          const cartData = doc.data();
          const products = cartData.products || []; // Initialize products array if it doesn't exist

          const existingProductIndex = products.findIndex(
            (p: any) => p.productId === productId
          );
          if (existingProductIndex !== -1) {
            // Product already exists in the cart, update the quantity
            products[existingProductIndex].quantity = quantity;
          } else {
            // Product doesn't exist in the cart, add it to the products array
            console.log("Product doesn't exist in the cart");
            // products.push({ productId, quantity, product });
          }

          // Update the cart document with the updated products array
          return cartDocRef.set({ products }, { merge: true });
        } else {
          // If the cart document doesn't exist, create it with the new product data
          console.log("cart document doesn't exist");
          // return cartDocRef.set({
          //   products: [{ productId, quantity, product }],
          // });
          return null;
        }
      })
      .catch((error) => {
        console.error('Error adding product to cart:', error);
      });
  }

  addToOrders(
    products: any[], // array of products
    orderTotal: any,
    shippingAddress: any
  ) {
    console.log('addToOrders');
    const uid = localStorage.getItem('uid');
    console.log('products : ', products);

    const dateOfOrdered: string = new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });

    if (!uid) {
      console.error('User is not authenticated');
      return;
    }

    const cartDocRef = this.firestore.collection('orders').doc(uid);
    console.log('cartDocRef : ', cartDocRef);
    return cartDocRef
      .get()
      .toPromise()
      .then((doc: any) => {
        console.log('doc : ', doc);
        if (doc.exists) {
          console.log('doc exist');
          const cartData = doc.data();
          const orders = cartData.orders || [];

          for (const product of products) {
            const orderId = product.orderId;
            delete product.orderId;
            console.log('product after remove orderId : ', product);
            orders.push({
              orderId,
              shippingAddress,
              dateOfOrdered,
              product,
            });
          }

          return cartDocRef.set({ orders }, { merge: true });
        } else {
          console.log('doc does not exist');
          let orders: any[] = [];
          for (const product of products) {
            const orderId = product.orderId;
            delete product.orderId;
            console.log('product after remove orderId : ', product);
            orders.push({
              orderId,
              shippingAddress,
              dateOfOrdered,
              product,
            });
          }
          return cartDocRef.set({ orders: orders }, { merge: true });
        }
      })
      .catch((error) => {
        console.error('Error adding product to cart:', error);
      });
  }

  // getAllOrders() {
  //   const uid = localStorage.getItem('uid');

  //   if (!uid) {
  //     console.error('User is not authenticated');
  //     return Promise.reject('User is not authenticated');
  //   }

  //   const cartDocRef = this.firestore.collection('orders').doc(uid);

  //   return cartDocRef
  //     .get()
  //     .toPromise()
  //     .then((doc: any) => {
  //       if (doc.exists) {
  //         console.log('doc exists');
  //         return doc.data().orders || [];
  //       } else {
  //         console.log('No orders found for this user');
  //         return [];
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching orders:', error);
  //       return Promise.reject(error);
  //     });
  // }

  getAllOrders(): Observable<any[]> {
    const uid = localStorage.getItem('uid');

    if (!uid) {
      console.error('User is not authenticated');
      throw new Error('User is not authenticated');
    }

    return this.firestore
      .collection('orders')
      .doc(uid)
      .snapshotChanges()
      .pipe(
        map((doc: any) => {
          if (doc.payload.exists) {
            console.log('doc exists');
            const data = doc.payload.data();
            return data.orders || [];
          } else {
            console.log('No orders found for this user');
            return [];
          }
        })
      );
  }

  cancelOrder(orderId: any) {
    console.log('orderId : ', orderId);
    const uid = localStorage.getItem('uid');

    const dateOfCancelled: string = new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });

    if (!uid) {
      console.error('User is not authenticated');
      return;
    }

    const cartDocRef = this.firestore.collection('orders').doc(uid);
    console.log('cartDocRef : ', cartDocRef);
    return cartDocRef
      .get()
      .toPromise()
      .then((doc: any) => {
        console.log('doc : ', doc);
        if (doc.exists) {
          console.log('doc exist');
          const cartData = doc.data();
          const orders = cartData.orders || [];

          // Find the order index in the orders array
          const orderIndex = orders.findIndex(
            (order: any) => order.orderId === orderId
          );

          if (orderIndex !== -1) {
            // Update the cancellation status of the order
            orders[orderIndex].product.product.isOrderCancled = true;
            // orders[orderIndex].isOrderCancled = true;
            orders[orderIndex].product.product.dateOfOrderCancled =
              dateOfCancelled;
            console.log('orders[orderIndex] : ', orders[orderIndex]);
            console.log('Order cancelled:', orderId);
          } else {
            console.log('Order not found:', orderId);
          }

          return cartDocRef.set({ orders }, { merge: true });
        } else {
          console.log('doc does not exist');
          return null;
        }
      })
      .catch((error) => {
        console.error('Error adding product to cart:', error);
      });
  }

  addUserDetails( email: string, password: string, name: string, contact: number, uid: any) {

    const cartDocRef = this.firestore.collection('users').doc(uid);

    return cartDocRef
      .get()
      .toPromise()
      .then((doc: any) => {
          return cartDocRef.set({
            user: { email, password, name, contact },
          });
        // }
      })
      .catch((error) => {
        console.error('Error adding user :', error);
      });
  }

   // Function to get user details
   getUserDetails(uid: any) {
    const userDocRef = this.firestore.collection('users').doc(uid);

    return userDocRef
      .get()
      .toPromise()
      .then((doc: any) => {
        if (doc.exists) {
          return doc.data();
        } else {
          console.log('No such document!');
          return null;
        }
      })
      .catch((error) => {
        console.error('Error getting user details:', error);
        return null;
      });
  }

  // Function to update user details
  updateUserDetails(uid: any,  name: string, contact: number, address: string) {
    const userDocRef = this.firestore.collection('users').doc(uid);

    const updateData: any = {};
    // if (email) updateData['user.email'] = email;
    // if (password) updateData['user.password'] = password;
    if (name) updateData['user.name'] = name;
    if (contact) updateData['user.contact'] = contact;
    if (address) updateData['user.address'] = address;

    return userDocRef
      .update(updateData)
      .then(() => {
        console.log('User updated successfully');
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
  }

  // Function to delete user details
  deleteUserDetails(uid: any) {
    const userDocRef = this.firestore.collection('users').doc(uid);

    return userDocRef
      .delete()
      .then(() => {
        console.log('User deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  }

  // sendNotificationToAdmin(message: any): void {
  //   this.afMessaging.requestToken.subscribe((token) => {
  //     const payload = {
  //       notification: message,
  //       token: ADMIN_FCM_TOKEN // Replace ADMIN_FCM_TOKEN with the FCM token of the admin
  //     };
  //     fetch('https://fcm.googleapis.com/fcm/send', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': 'key=YOUR_SERVER_KEY' // Replace YOUR_SERVER_KEY with your Firebase server key
  //       },
  //       body: JSON.stringify(payload)
  //     });
  //   });
  // }
}
