import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { 
    getFirestore, 
    collection, 
    getDocs, 
    addDoc, 
    deleteDoc, 
    doc 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// === THAY THẾ CONFIG BẰNG THÔNG TIN DỰ ÁN CỦA BẠN TRÊN FIREBASE ===
const firebaseConfig = {
    apiKey : "AIzaSyBzco2qb23_kmyXT_rCmH6u_LZNVtMdCpg" , 
  authDomain : "cong-thong-tin-giao-vien.firebaseapp.com" , 
  projectId : "cong-thong-tin-giao-vien" , 
  storageBucket : "cong-thong-tin-giao-vien.firebasestorage.app" , 
  messagingSenderId : "357104374827" , 
  appId : "1:357104374827:web:7086ec1581084f0e24466e" , 
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Trạng thái đăng nhập nhanh
export let isLoggedIn = false;

// 1. Đăng nhập
export async function handleFirebaseLogin(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return { success: true, user: userCredential.user };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// 2. Đăng ký
export async function handleFirebaseRegister(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return { success: true, user: userCredential.user };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// 3. Đăng xuất
export async function handleFirebaseLogout() {
    try {
        await signOut(auth);
        return { success: true };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// 4. Lắng nghe trạng thái Auth thay đổi thời gian thực
export function initAuthStateListener(callback) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            isLoggedIn = true;
            callback(true, user);
        } else {
            isLoggedIn = false;
            callback(false, null);
        }
    });
}

// 5. Lấy dữ liệu Firestore (ví dụ collection 'photos')
export async function fetchFirestoreData(collectionName) {
    try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        let dataList = [];
        querySnapshot.forEach((doc) => {
            dataList.push({ id: doc.id, ...doc.data() });
        });
        return dataList;
    } catch (error) {
        console.error("Lỗi lấy dữ liệu Firestore: ", error);
        return [];
    }
}

