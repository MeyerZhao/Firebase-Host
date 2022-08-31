// src/index.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCwgZQMePDKWDeYWm887wbOxtT9cIw8kh0",
  authDomain: "webteaching-96da1.firebaseapp.com",
  projectId: "webteaching-96da1",
  storageBucket: "webteaching-96da1.appspot.com",
  messagingSenderId: "306707827337",
  appId: "1:306707827337:web:7cb94f11ad7ebc9b71d458"
}

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore();

// collection ref
const colRef = collection(db, 'users');

// get collection data
getDocs(colRef)
  .then((data)=> {
    console.log('data.docs', data.docs)
    let users = [];
    data.docs.forEach((doc) => {
      users.push({...doc.data(), id: doc.id})
    })
    console.log('users', users);
  })
  .catch(err => {
    console.log(err.message)
  })

// get collection data 使用 await 语法
// const querySnapshot = await getDocs(collection(db, "users"));
// querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${doc.data()}`);
//   console.log(doc.data())
// });