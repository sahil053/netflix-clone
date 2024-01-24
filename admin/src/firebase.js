import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCeAnnwJsmyDpmi5We-ru-jeyPo6XOKxQY",
  authDomain: "netflix-8ef74.firebaseapp.com",
  projectId: "netflix-8ef74",
  storageBucket: "netflix-8ef74.appspot.com",
  messagingSenderId: "862418046415",
  appId: "1:862418046415:web:b081276d381e6ad74fd6ba",
  measurementId: "G-3V8BLJXY8M",
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

export { storage, ref, uploadBytesResumable };
