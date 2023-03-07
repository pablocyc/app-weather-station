import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js"
import { FIREBASE } from "./config.js"
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  enableIndexedDbPersistence
} from "https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js"

const app = initializeApp(FIREBASE.firebaseConfig)
const db = getFirestore()

// Create
export const saveTask = (title, description) =>
  addDoc(collection(db, 'sensors'), { title, description })

// Read
export const getSensors = () => getDocs(collection(db, 'sensors'))
export const getSensor = id => getDoc(doc(db, 'sensors', id))
export const onGetSensors = callback => onSnapshot(collection(db, 'sensors'), callback)

// Update
export const updateTask = (id, title, description) => {
  updateDoc(doc(db, 'sensors', id), { title, description })
}

// Delete
export const deleteTask = id => deleteDoc(doc(db, 'sensors', id))

enableIndexedDbPersistence(db)
  .catch((err) => {
    if (err.code == 'failed-precondition') {
      console.log('Multiple tabs open, persistence can only be enabled in one tab at a a time.')
    } else if (err.code == 'unimplemented') {
      console.log('The current browser does not support all of the features required to enable persistence.')
    }
  });
