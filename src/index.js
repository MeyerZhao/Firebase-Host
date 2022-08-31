// src/index.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, onSnapshot } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
// TODO 01 Firestore Queries 官网文档：读取数据 > 对数据排序和限定数量
import { query, where, orderBy, serverTimestamp } from "firebase/firestore";



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

// TODO 02 queries
function queriesHandler(keyword){
  console.log('keyword', keyword)
  let orderWay = ['asc', 'desc'][0] // asc or desc

  // if (keyword) {
  //   return query(colRef, where("name", "==", keyword), orderBy('name', orderWay))
  // }

  // if(!keyword) {
  //   return query(colRef, where("name", "!=", false), orderBy('name', orderWay))
  // }

  return query(colRef, (
    keyword ? where("name", "==", keyword) : where("name", "!=", false)
  ) , orderBy('name', orderWay))

  // return query(colRef, orderBy('createdAt'))
}
// "Tiffany"


// get collection data
// getDocs(colRef)
//   .then((data)=> {
//     let users = [];
//     data.docs.forEach((doc) => {
//       console.log('doc.data()', {...doc.data(), id: doc.id})
//       // users.push(doc.data())
//       // users.push(Object.assign(doc.data(), {id: doc.id}))
//       users.push({...doc.data(), id: doc.id})
//     })
//     console.log('users', users);
//   })
//   .catch(err => {
//     console.log(err.message)
//   })

// Real time collection data

// Replace colref with Q

// onSnapshot(colRef, (snapshot) => {
function onSnapshotHandler(keyword) {
  onSnapshot(queriesHandler(keyword), (snapshot) => {
    let users = [];
    snapshot.docs.forEach(doc => {
      users.push({...doc.data(), id: doc.id})
    })
    console.log('users', users)
  })
};

onSnapshotHandler()


// get collection data 使用 await 语法
// const querySnapshot = await getDocs(collection(db, "users"));
// querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${doc.data()}`);
//   console.log(doc.data())
// });


//TODO 03 Adding User
const addUserForm = document.querySelector('.form-add')
addUserForm.addEventListener('submit', (e) => {
  console.log('submit .form-add')
  e.preventDefault()

  addDoc(colRef, {
    name: addUserForm.name.value,
    email: addUserForm.email.value,
    createdAt: serverTimestamp()
  })
  .then(() => {
    addUserForm.reset()
  })
})

// Deleting User
const deleteUserForm = document.querySelector('.form-delete')
deleteUserForm.addEventListener('submit', (e) => {
  console.log('submit .form-delete')
  e.preventDefault()

  const docRef = doc(db, 'users', deleteUserForm.id.value)

  deleteDoc(docRef)
    .then(() => {
      deleteUserForm.reset()
    })
})

const queriesUserInput = document.querySelector('.form-query-input')
queriesUserInput.addEventListener('change', (e) => {
  console.log(e.target.value)
  let keywords = (e.target.value).replace(/^\s+|\s+$/g,"");
  console.log('keywords', keywords)
  onSnapshotHandler(keywords)
})
