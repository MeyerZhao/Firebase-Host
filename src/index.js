import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCwgZQMePDKWDeYWm887wbOxtT9cIw8kh0",
  authDomain: "webteaching-96da1.firebaseapp.com",
  projectId: "webteaching-96da1",
  storageBucket: "webteaching-96da1.appspot.com",
  messagingSenderId: "306707827337",
  appId: "1:306707827337:web:7cb94f11ad7ebc9b71d458"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// collection
const colRef = collection(db, 'books')

// get collection data
getDocs(colRef)
  .then((snapshot) => {
    console.log(snapshot.docs)
  })