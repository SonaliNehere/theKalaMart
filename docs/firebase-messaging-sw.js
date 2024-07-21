importScripts(
  "https://www.gstatic.com/firebasejs/10.10.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.10.0/firebase-messaging-compat.js"
);
firebase.initializeApp({
  apiKey: "AIzaSyBc7dCqC2t-HJB5PTcbyFxph50CyEb36LA",
  authDomain: "thekalamart-7d5f6.firebaseapp.com",
  databaseURL:
    "https://thekalamart-7d5f6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "thekalamart-7d5f6",
  storageBucket: "thekalamart-7d5f6.appspot.com",
  messagingSenderId: "372317958729",
  appId: "1:372317958729:web:648ce8673e9ccdb4ed4598",
});
const messaging = firebase.messaging();
