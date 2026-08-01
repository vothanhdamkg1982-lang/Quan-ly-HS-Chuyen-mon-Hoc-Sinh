// firebase.js
import { initializeApp } from "[https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js](https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js)";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from "[https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js](https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js)";
import { 
    getFirestore, 
    collection, 
    getDocs, 
    addDoc, 
    deleteDoc, 
    doc 
} from "[https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js](https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js)";

const firebaseConfig = {
    apiKey: "AIzaSyBzco2qb23_kmyXT_rCmH6u_LZNVtMdCpg", 
    authDomain: "cong-thong-tin-giao-vien.firebaseapp.com", 
    projectId: "cong-thong-tin-giao-vien", 
    storageBucket: "cong-thong-tin-giao-vien.firebasestorage.app", 
    messagingSenderId: "357104374827", 
    appId: "1:357104374827:web:7086ec1581084f0e24466e", 
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export let isLoggedIn = false;

// Đăng nhập Firebase Auth
export async function handleFirebaseLogin(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return { success: true, user: userCredential.user };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// Đăng xuất
export async function handleFirebaseLogout() {
    try {
        await signOut(auth);
        return { success: true };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// Trạng thái đăng nhập thời gian thực
export function initAuthStateListener(callback) {
    onAuthStateChanged(auth, (user) => {
        isLoggedIn = !!user;
        callback(isLoggedIn, user);
    });
}

// Lấy dữ liệu từ Firestore Collection tương ứng
export async function fetchFirestoreData(collectionName) {
    try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        let dataList = [];
        querySnapshot.forEach((document) => {
            dataList.push({ id: document.id, ...document.data() });
        });
        return dataList;
    } catch (error) {
        console.error("Lỗi lấy dữ liệu Firestore từ " + collectionName + ": ", error);
        return [];
    }
}

// Thêm dữ liệu lên Firestore
export async function addFirestoreData(collectionName, itemData) {
    try {
        const docRef = await addDoc(collection(db, collectionName), itemData);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Lỗi thêm dữ liệu lên Firestore: ", error);
        return { success: false, message: error.message };
    }
}

// Xóa dữ liệu trên Firestore theo ID
export async function deleteFirestoreData(collectionName, docId) {
    try {
        await deleteDoc(doc(db, collectionName, docId));
        return { success: true };
    } catch (error) {
        console.error("Lỗi xóa dữ liệu trên Firestore: ", error);
        return { success: false, message: error.message };
    }
}
