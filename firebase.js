// firebase.js - Cấu hình Firebase mới
const firebaseConfig = {
  apiKey: "AIzaSyDyQwhUj2sHgz_ShNJjkePs-6CJeey0IpU",
  authDomain: "watchful-scope-458105-u1.firebaseapp.com",
  databaseURL: "https://watchful-scope-458105-u1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "watchful-scope-458105-u1",
  storageBucket: "watchful-scope-458105-u1.firebasestorage.app",
  messagingSenderId: "87169120468",
  appId: "1:87169120468:web:c1f601cefddf3f51e0a341",
  measurementId: "G-G07G9THRYW"
};

// Khởi tạo Firebase (compat)
firebase.initializeApp(firebaseConfig);

// Khởi tạo Firestore và Auth (có thể dùng sau)
const db = firebase.firestore();
const auth = firebase.auth();

// Gán ra toàn cục để script.js có thể dùng
window.db = db;
window.auth = auth;

// ---------- Wrapper để giữ nguyên cú pháp modular trong script.js ----------
// Các hàm doc, getDoc, setDoc được sử dụng trong script.js.
// Chúng ta sẽ ánh xạ sang API compat.

window.doc = function(dbInstance, collectionPath, ...segments) {
  // Tạo một document reference từ collection và các segment
  let ref = dbInstance.collection(collectionPath);
  for (const seg of segments) {
    ref = ref.doc(seg);
  }
  return ref;
};

window.getDoc = function(docRef) {
  // docRef.get() trả về Promise<DocumentSnapshot> (giống modular)
  return docRef.get();
};

window.setDoc = function(docRef, data) {
  // docRef.set(data) trả về Promise<void>
  return docRef.set(data);
};

// Nếu script.js có sử dụng các hàm khác như `collection`, `addDoc`, `updateDoc`, v.v.
// bạn có thể bổ sung tương tự.
// Ví dụ:
// window.collection = (db, path) => db.collection(path);
// window.addDoc = (colRef, data) => colRef.add(data);

console.log('✅ Firebase đã được khởi tạo với dự án mới');