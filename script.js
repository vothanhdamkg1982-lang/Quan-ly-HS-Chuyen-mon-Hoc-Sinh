/* ============================================================
   WEBSITE GIÁO VIÊN VÕ THANH ĐẬM - TÍCH HỢP SUPABASE
   ============================================================ */

// ---------- CẤU HÌNH SUPABASE ----------
const SUPABASE_URL = 'https://whuyytjksrpyojmukftp.supabase.co';  // Thay bằng URL thực tế của bạn
const SUPABASE_ANON_KEY = 'sb_publishable_gpW8TcOIz4ocrrMIWUx3Qg_sZaeZqQ0'; // Thay bằng key anon của bạn

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const BUCKET_NAME = 'teacher-assets'; // Tên bucket đã tạo

// ---------- MAPPING DỮ LIỆU ----------
const DATA_KEYS = {
    photo: 'photos',
    video: 'videos',
    document: 'documents',
    chuyenmon: 'chuyenmon',
    ungdung: 'ungdung',
    link: 'links'
};

// ---------- TÀI KHOẢN ĐĂNG NHẬP ----------
const VALID_CREDENTIALS = {
    username: 'admin',
    passwordHash: 'QWRtaW5AMjAyNg==' // base64 của "Admin@2026"
};

function hashPassword(password) { return btoa(password); }
function checkLogin(username, password) {
    return username === VALID_CREDENTIALS.username && hashPassword(password) === VALID_CREDENTIALS.passwordHash;
}

// ---------- ĐĂNG NHẬP VỚI GOOGLE ----------
async function signInWithGoogle() {
    try {
        const { data, error } = await supabaseClient.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin + window.location.pathname
            }
        });
        if (error) throw error;
    } catch (error) {
        alert('Lỗi đăng nhập Google: ' + error.message);
    }
}

// Lắng nghe trạng thái đăng nhập từ Supabase Google Auth
supabaseClient.auth.onAuthStateChange((event, session) => {
    if (session && session.user) {
        isLoggedIn = true;
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', session.user.email);
        
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) {
            const userName = session.user.user_metadata.full_name || session.user.email.split('@')[0];
            loginBtn.innerHTML = `<i class="fas fa-user-check"></i> ${userName}`;
            loginBtn.style.borderColor = '#27ae60';
            loginBtn.style.color = '#27ae60';
        }
        
        const registerBtn = document.getElementById('registerBtn');
        if (registerBtn) registerBtn.style.display = 'none';

        const loginModal = document.getElementById('loginModal');
        if (loginModal) loginModal.style.display = 'none';

        document.querySelectorAll('.btn-add.hidden-if-not-loggedin').forEach(el => {
            el.classList.remove('hidden-if-not-loggedin');
        });

        renderSection('photos');
        renderSection('videos');
        renderSection('documents');
        renderSection('chuyenmon');
        renderUngDungAndLinks();
    }
});

// ---------- DỮ LIỆU MẶC ĐỊNH ----------
const DEFAULT_DATA = {
    photos: [
        { id: 'p1', url: 'https://i.ibb.co/PZZfhZ7N/T-p-hu-n-SGK-Tin-h-c.jpg', title: 'Tập huấn Tin học', desc: 'Tập huấn tại Hội trường', category: 'hoatdong' },
        { id: 'p2', url: 'https://i.ibb.co/1cqx5g9/T-p-hu-n-m-n-C-ng-ngh.jpg', title: 'Tập huấn môn Công nghệ', desc: 'Tập huấn tại Hội trường', category: 'hoatdong' },
        { id: 'p3', url: 'https://i.ibb.co/rrvq3cz/IMG-0256.jpg', title: 'Họp mặt 20/11', desc: 'Ngày Nhà giáo Việt Nam', category: 'sukien' },
        { id: 'p4', url: 'https://i.ibb.co/M5yQtMMG/T-p-hu-n-SGK-TNXH.jpg', title: 'Tập huấn SGK', desc: 'Tập huấn bộ sách thống nhất toàn quốc', category: 'hoatdong' },
        { id: 'p5', url: 'https://i.ibb.co/JRngLzcJ/T-p-hu-n-SGK-2.jpg', title: 'Tập huấn SGK', desc: 'Tập huấn bộ sách thống nhất toàn quốc', category: 'hoatdong' },
        { id: 'p6', url: 'https://i.ibb.co/p6xX1Ljk/TH-SGK.jpg', title: 'Tập huấn SGK', desc: 'Tập huấn bộ sách thống nhất toàn quốc', category: 'hoatdong' },
    ],
    videos: [
        { id: 'v1', url: 'https://www.youtube.com/watch?v=Z_ZohjfYVyc&t=2976s', title: 'Tập huấn SGK Tin học 3', desc: 'Tập huấn trực tuyến', category: 'hoatdong' },
        { id: 'v2', url: 'https://www.youtube.com/watch?v=ZyA_CFS7Rb8&t=2085s', title: 'Tập huấn SGK môn Công nghệ', desc: 'Tập huấn trực tuyến', category: 'hoatdong' },
    ],
    documents: [
        { id: 'd1', url: 'https://drive.google.com/file/d/1Wp_pWeOQuE5WUtKADi0VLK05qKqUhFfm/view?usp=sharing', title: 'Danh hiệu', desc: 'Chiến sĩ thi đua cơ sở 2013', category: 'khenthuong' },
        { id: 'd2', url: 'https://drive.google.com/file/d/1JgOg-gRh2f4GEBYIGdkTuKJ6-4fzjqCp/view?usp=sharing', title: 'Danh hiệu', desc: 'Chiến sĩ thi đua cơ sở 2017', category: 'khenthuong' },
        { id: 'd3', url: 'https://drive.google.com/file/d/1Kyrl-SAbPM_y8W5PpJFQKE-I1TUgDXc-/view?usp=sharing', title: 'Giấy chứng nhận', desc: 'Giáo viên dạy giỏi cấp huyện 2014', category: 'chungnhan' },
        { id: 'd4', url: 'https://drive.google.com/file/d/1ub6dPVJCRVeIPnZw5j5Ae8VuyPQ6P3P3/view?usp=sharing', title: 'Giấy chứng nhận', desc: 'Giải nhì Hội thi Thiết kế bài giảng E-learning', category: 'chungnhan' },
        { id: 'd5', url: 'https://drive.google.com/file/d/1xi2uSEK3NDU7ceL2GW7GFIAjs8vqF-bD/view?usp=sharing', title: 'Giấy khen', desc: 'Hoàn thành tốt nhiệm vụ năm học 2023-2024', category: 'khenthuong' },
        { id: 'd6', url: 'https://drive.google.com/file/d/1jpt2OwwLUY41FBs0G8yy7qeWxkCp7JTB/view?usp=sharing', title: 'Giấy khen', desc: 'Hoàn thành tốt nhiệm vụ năm học 2024-2025', category: 'khenthuong' },
        { id: 'd7', url: 'https://drive.google.com/file/d/1kXxbxXwnkiXXyFYgg9KKPV4eFUwoEYx-/view?usp=sharing', title: 'Giấy khen', desc: 'Hoàn thành tốt nhiệm vụ năm học 2013-2014', category: 'khenthuong' },
        { id: 'd8', url: 'https://drive.google.com/file/d/1vxR9nSswrzNFBcpjrR0kdvsWmGLdetRS/view?usp=sharing', title: 'Quyết định', desc: 'Tuyển dụng công chức Ngạch Giáo viên Tiểu học 15.114_2003', category: 'quyetdinh' },
        { id: 'd9', url: 'https://drive.google.com/file/d/1DDKkPpNzY6G2fwrlu_lHwS6QH8YHsrH0/view?usp=sharing', title: 'Quyết định', desc: 'Chuyển xếp lương Bậc 2(1,74) sang Bậc 2(2,06) 15.114_2005', category: 'quyetdinh' },
        { id: 'd10', url: 'https://drive.google.com/file/d/1iHtEE0KQyKBY3KmxAgpVYkXjcp61UoSA/view?usp=sharing', title: 'Quyết định', desc: 'Chuyển loại viên chức Bậc 5(2,66_15.114) lên Bậc 3(2,72_15a.204)_2011', category: 'quyetdinh' },
        { id: 'd11', url: 'https://drive.google.com/file/d/1ZjxyInf1pk0zffXRbWv-4keCXpoUUJH2/view?usp=sharing', title: 'Quyết định', desc: 'Điều động phân công Cán bộ _Giáo viên_2002', category: 'quyetdinh' },
        { id: 'd12', url: 'https://drive.google.com/file/d/1beJiCZIECZaYNELoSw_tB7FaPrCaxRpa/view?usp=sharing', title: 'Quyết định', desc: 'Bổ nhiệm chức danh nghề nghiệp GVTH Hạng III(V.07.03.08) Bậc 4_Hs:3,03_2016', category: 'quyetdinh' },
        { id: 'd13', url: 'https://drive.google.com/file/d/1vxR9nSswrzNFBcpjrR0kdvsWmGLdetRS/view?usp=sharing', title: 'Quyết định', desc: 'Bổ nhiệm chức danh nghề nghiệp GVTH Hạng III(V.07.03.29) Bậc 6_Hs:3,99_2023', category: 'quyetdinh' },
        { id: 'd14', url: 'https://drive.google.com/file/d/1zIYCYVQr6WL5FFusLic983DkV2H-t6Z_/view?usp=sharing', title: 'Quyết định', desc: 'Nâng lương trước thời hạn GVTH Hạng III(V.07.03.08_Bậc 5_HS:3,34 lên Bậc 6 HS: 3,65) 2018', category: 'quyetdinh' },
        { id: 'd15', url: 'https://drive.google.com/file/d/1LnmQhKsNwOCca8roA60qtXiYFUmB8tmn/view?usp=sharing', title: 'Quyết định', desc: 'Nâng lương theo thời hạn GVTH Hạng III(V.07.03.08) Bậc 6_Hs:3,65 lên Bậc 7_Hs:3,96_2021', category: 'quyetdinh' },
        { id: 'd16', url: 'https://drive.google.com/file/d/1H-3HJIvQJkdKFys3-xC9Co16O-EtBkTl/view?usp=sharing', title: 'Quyết định', desc: 'Nâng lương theo thời hạn GVTH Hạng III(V.07.03.29) Bậc 6_Hs:3,99 lên Bậc 7_Hs:4,32_2024', category: 'quyetdinh' },
        { id: 'd17', url: 'https://drive.google.com/file/d/1ZRLaI8SEXsr1-fqiQ7Jy-MMmHPiy3FQo/view?usp=sharing', title: 'Quyết định', desc: 'Nâng phụ cấp thâm niên Ngạch GVTH Hạng III(V.07.03.29) từ 21% lên 22% từ 01/06/2025', category: 'quyetdinh' },
        { id: 'd18', url: 'https://drive.google.com/file/d/1Kdokp0rLlaus4Tnu0bXsU0Mp2SVtYfPu/view?usp=sharing', title: 'Văn bằng, chứng chỉ', desc: 'Bằng Tốt nghiệp Đại học', category: 'Văn bằng, chứng chỉ' },
        { id: 'd19', url: 'https://drive.google.com/file/d/1QAdCVkuuWsK9RqmQRx_c1a_xgZcFgBgs/view?usp=sharing', title: 'Văn bằng, chứng chỉ', desc: 'Bằng Tốt nghiệp Trung học Chuyên nghiệp', category: 'Văn bằng, chứng chỉ' },
        { id: 'd20', url: 'https://drive.google.com/file/d/1nDrXR9VokcsDHc921rVMefxb5Vs6jeoA/view?usp=sharing', title: 'Văn bằng, chứng chỉ', desc: 'Bằng SCLL Chính trị', category: 'Văn bằng, chứng chỉ' },
        { id: 'd21', url: 'https://drive.google.com/file/d/1prEXT4MXVuJvRfxpi7oh9LgoJOq8KrPa/view?usp=sharing', title: 'Văn bằng, chứng chỉ', desc: 'Bồi dưỡng chức danh nghề nghiệp Hạng II', category: 'Văn bằng, chứng chỉ' },
        { id: 'd22', url: 'https://drive.google.com/file/d/1JNV6gac_9nFHNu9cSI8_leit60jOftbY/view?usp=sharing', title: 'Văn bằng, chứng chỉ', desc: 'Bồi dưỡng chức danh nghề nghiệp Hạng III', category: 'Văn bằng, chứng chỉ' },
        { id: 'd23', url: 'https://drive.google.com/file/d/1Zr75snz9F8ztmFxGANBfsy3V8UpV2ThX/view?usp=sharing', title: 'Văn bằng, chứng chỉ', desc: 'Chứng chỉ Tiếng Anh Trình độ B', category: 'Văn bằng, chứng chỉ' },
        { id: 'd24', url: 'https://drive.google.com/file/d/16KJ-mPNmYkVaWShFMxf6ujqwMh038CZZ/view?usp=sharing', title: 'Văn bằng, chứng chỉ', desc: 'Chứng chỉ Tin học Ứng dụng Trình độ A', category: 'Văn bằng, chứng chỉ' },
    ],
    chuyenmon: [
        { id: 'cm1', title: 'Giáo án Tin học - Công nghệ K3-5', desc: 'Tuần 1-35(Năm học 2026 - 2027)', url: 'https://drive.google.com/file/d/1s3Fg-lo7fYhQgazJw2L_s4YOWYuLzmzG/view?usp=sharing', category: 'giaoan', type: 'pdf' },
        { id: 'cm2', title: 'Giáo án Tin học - Công nghệ K3-5', desc: 'Tuần 1-2', url: 'https://drive.google.com/file/d/1s9noCA7NJsQecKH0M0VCzo2KcIg9GMdk/view?usp=sharing', category: 'giaoan', type: 'pdf' },
        { id: 'cm20', title: 'Đề thi học kỳ 1 - Tin học - Công nghệ', desc: 'Năm học 2025-2026', url: 'https://drive.google.com/drive/folders/1yG2fRBdybO1QNff5W2GTxPRJuNW5DURe?usp=sharing', category: 'dethi', type: 'pdf' },
        { id: 'cm22', title: 'Sáng kiến kinh nghiệm: Ứng dụng CNTT trong dạy học', desc: 'Giải A cấp huyện', url: '#', category: 'sangkien', type: 'pdf' },
        { id: 'cm24', title: 'Phân công chuyên môn', desc: 'Lịch tập huấn SGK', url: 'https://drive.google.com/file/d/1-gMag7o8Esq4gIFwAQAt9OjkzctNANK2/view?usp=sharing', category: 'phancongchuyenmon', type: 'pdf' },
        { id: 'cm25', title: 'Tài liệu chuyên môn', desc: 'Tài liệu tham khảo', url: '#', category: 'tailieu', type: 'pdf' },
    ],
    ungdung: [
        { id: 'ex1', title: 'Phần mềm Kế hoạch giáo dục - Lịch báo giảng tự động', desc: 'App web tự động tính lịch theo tuần', preview: 'https://vothanhdamkg1982-lang.github.io/Ke-Hoach-GD-1.4/', download: 'https://vothanhdamkg1982-lang.github.io/Ke-Hoach-GD-1.4/', category: 'ungdung', type: 'App web' },
        { id: 'ex2', title: 'Hệ thống lương HCSN', desc: 'Quản lý lương cho HCSN', preview: 'https://vothanhdamkg1982-lang.github.io/He-Thong-Luong-HCSN', download: 'https://vothanhdamkg1982-lang.github.io/He-Thong-Luong-HCSN', category: 'ungdung', type: 'App web' },
    ],
    links: [
        { id: 'l1', title: 'Bộ Giáo dục và Đào tạo', url: 'https://moet.gov.vn', desc: 'Trang chính của Bộ GD&ĐT' },
        { id: 'l2', title: 'VietnamNet - Giáo dục', url: 'https://vietnamnet.vn/giao-duc', desc: 'Tin tức giáo dục mới nhất' },
    ]
};

// ---------- BIẾN TOÀN CỤC ----------
let PHOTOS = [], VIDEOS = [], DOCUMENTS = [], CHUYENMON = [], UNGDUNG = [], LINKS = [];
let isLoggedIn = false;
let currentSlide = 0;
let slideInterval;
let editingId = null; 

// ---------- LOAD DATA ----------
async function loadData() {
    try {
        console.log('🔄 Đang tải dữ liệu từ Supabase...');
        const { data, error } = await supabaseClient
            .from('portal')
            .select('data')
            .eq('id', 'teacherData')
            .single();

        if (error) {
            console.error('❌ Lỗi tải dữ liệu:', error);
            if (error.code === 'PGRST116') {
                console.warn('⚠️ Chưa có dữ liệu, tạo mới...');
                PHOTOS = DEFAULT_DATA.photos;
                VIDEOS = DEFAULT_DATA.videos;
                DOCUMENTS = DEFAULT_DATA.documents;
                CHUYENMON = DEFAULT_DATA.chuyenmon;
                UNGDUNG = DEFAULT_DATA.ungdung;
                LINKS = DEFAULT_DATA.links;
                await saveData();
            } else {
                throw error;
            }
        } else if (data && data.data) {
            const d = data.data;
            PHOTOS = d.photos || DEFAULT_DATA.photos;
            VIDEOS = d.videos || DEFAULT_DATA.videos;
            DOCUMENTS = d.documents || DEFAULT_DATA.documents;
            CHUYENMON = d.chuyenmon || DEFAULT_DATA.chuyenmon;
            UNGDUNG = d.ungdung || DEFAULT_DATA.ungdung;
            LINKS = d.links || DEFAULT_DATA.links;
        } else {
            console.warn('⚠️ Dữ liệu rỗng, sử dụng mặc định');
            PHOTOS = DEFAULT_DATA.photos;
            VIDEOS = DEFAULT_DATA.videos;
            DOCUMENTS = DEFAULT_DATA.documents;
            CHUYENMON = DEFAULT_DATA.chuyenmon;
            UNGDUNG = DEFAULT_DATA.ungdung;
            LINKS = DEFAULT_DATA.links;
            await saveData();
        }
    } catch (error) {
        console.error('❌ Lỗi nghiêm trọng khi tải dữ liệu:', error);
        PHOTOS = DEFAULT_DATA.photos;
        VIDEOS = DEFAULT_DATA.videos;
        DOCUMENTS = DEFAULT_DATA.documents;
        CHUYENMON = DEFAULT_DATA.chuyenmon;
        UNGDUNG = DEFAULT_DATA.ungdung;
        LINKS = DEFAULT_DATA.links;
    }

    renderPhotos('all');
    renderVideos('all');
    renderDocuments('all');
    renderChuyenMon('all');
    renderUngDungAndLinks();
    updateBadges();
    switchSection('home');
    initSalaryCalculator();
    console.log('✅ Website đã sẵn sàng với Supabase!');
}

// ---------- SAVE DATA ----------
async function saveData() {
    const dataToSave = {
        photos: PHOTOS,
        videos: VIDEOS,
        documents: DOCUMENTS,
        chuyenmon: CHUYENMON,
        ungdung: UNGDUNG,
        links: LINKS
    };

    try {
        console.log('💾 Đang lưu dữ liệu lên Supabase...');
        const { error } = await supabaseClient
            .from('portal')
            .upsert({ id: 'teacherData', data: dataToSave, updated_at: new Date().toISOString() })
            .eq('id', 'teacherData');

        if (error) throw error;
        console.log('✅ Dữ liệu đã được lưu thành công');
    } catch (error) {
        console.error('❌ Lỗi lưu dữ liệu:', error);
        alert('❌ Lỗi lưu dữ liệu lên Supabase. Kiểm tra Console để biết chi tiết.');
    }
}

// ---------- UPLOAD FILE ----------
async function uploadFileToSupabase(file, folder = 'photos') {
    const ext = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${ext}`;
    const filePath = `${folder}/${fileName}`;

    const { error } = await supabaseClient.storage
        .from(BUCKET_NAME)
        .upload(filePath, file, { upsert: false });

    if (error) throw error;

    const { data: urlData } = supabaseClient.storage
        .from(BUCKET_NAME)
        .getPublicUrl(filePath);

    return urlData.publicUrl;
}

// ---------- DELETE FILE ----------
async function deleteFileFromSupabase(fileUrl) {
    try {
        if (!fileUrl) return;
        const url = new URL(fileUrl);
        const pathParts = url.pathname.split('/');
        const bucketIndex = pathParts.indexOf(BUCKET_NAME);
        if (bucketIndex === -1) return;
        const filePath = pathParts.slice(bucketIndex + 1).join('/');
        if (!filePath) return;
        const { error } = await supabaseClient.storage.from(BUCKET_NAME).remove([filePath]);
        if (error) console.error('Lỗi xóa file:', error);
    } catch (e) {
        console.warn('Không thể xóa file:', e);
    }
}

// ---------- CRUD ----------
function addItem(arrayKey, newItem) {
    if (!isLoggedIn) { alert('Vui lòng đăng nhập!'); return; }
    newItem.id = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    
    if (arrayKey === 'photos') PHOTOS.push(newItem);
    else if (arrayKey === 'videos') VIDEOS.push(newItem);
    else if (arrayKey === 'documents') DOCUMENTS.push(newItem);
    else if (arrayKey === 'chuyenmon') CHUYENMON.push(newItem);
    else if (arrayKey === 'ungdung') UNGDUNG.push(newItem);
    else if (arrayKey === 'links') LINKS.push(newItem);
    
    saveData();
    if (arrayKey === 'ungdung' || arrayKey === 'links') renderUngDungAndLinks();
    else renderSection(arrayKey);
}

function updateItem(arrayKey, id, newData) {
    if (!isLoggedIn) { alert('Vui lòng đăng nhập!'); return; }
    let arr;
    if (arrayKey === 'photos') arr = PHOTOS;
    else if (arrayKey === 'videos') arr = VIDEOS;
    else if (arrayKey === 'documents') arr = DOCUMENTS;
    else if (arrayKey === 'chuyenmon') arr = CHUYENMON;
    else if (arrayKey === 'ungdung') arr = UNGDUNG;
    else if (arrayKey === 'links') arr = LINKS;
    
    if (!arr) return;
    
    const index = arr.findIndex(it => it.id === id);
    if (index !== -1) {
        arr[index] = { ...arr[index], ...newData };
        saveData();
        if (arrayKey === 'ungdung' || arrayKey === 'links') renderUngDungAndLinks();
        else renderSection(arrayKey);
    }
}

function removeItem(arrayKey, id) {
    if (!isLoggedIn) { alert('Vui lòng đăng nhập!'); return; }
    let arr, item;
    
    if (arrayKey === 'photos') arr = PHOTOS;
    else if (arrayKey === 'videos') arr = VIDEOS;
    else if (arrayKey === 'documents') arr = DOCUMENTS;
    else if (arrayKey === 'chuyenmon') arr = CHUYENMON;
    else if (arrayKey === 'ungdung') arr = UNGDUNG;
    else if (arrayKey === 'links') arr = LINKS;
    else return;

    const index = arr.findIndex(it => it.id === id);
    if (index !== -1) {
        item = arr[index];
        arr.splice(index, 1);
        const fileUrl = item.url || item.preview || null;
        if (fileUrl && fileUrl.includes(BUCKET_NAME)) deleteFileFromSupabase(fileUrl);
        saveData();
        if (arrayKey === 'ungdung' || arrayKey === 'links') renderUngDungAndLinks();
        else renderSection(arrayKey);
    }
}

// ---------- RENDER CÁC SECTION ----------
function renderSection(key) {
    let barId;
    if (key === 'photos') barId = 'photoFilterBar';
    else if (key === 'videos') barId = 'videoFilterBar';
    else if (key === 'documents') barId = 'docFilterBar';
    else if (key === 'chuyenmon') barId = 'chuyenmonFilterBar';
    else if (key === 'ungdung') { renderUngDungAndLinks(); return; }
    
    const filter = barId ? getActiveFilter(barId) : 'all';
    if (key === 'photos') renderPhotos(filter);
    else if (key === 'videos') renderVideos(filter);
    else if (key === 'documents') renderDocuments(filter);
    else if (key === 'chuyenmon') renderChuyenMon(filter);
    
    updateBadges();
}

function getActiveFilter(barId) {
    const bar = document.getElementById(barId);
    if (!bar) return 'all';
    const activeBtn = bar.querySelector('.filter-btn.active');
    return activeBtn ? activeBtn.dataset.filter : 'all';
}

function updateBadges() {
    if(document.getElementById('photoCount')) document.getElementById('photoCount').textContent = PHOTOS.length;
    if(document.getElementById('videoCount')) document.getElementById('videoCount').textContent = VIDEOS.length;
    if(document.getElementById('docCount')) document.getElementById('docCount').textContent = DOCUMENTS.length;
    if(document.getElementById('chuyenmonCount')) document.getElementById('chuyenmonCount').textContent = CHUYENMON.length;
    if(document.getElementById('ungdungCount')) document.getElementById('ungdungCount').textContent = UNGDUNG.length;
    if(document.getElementById('homePhotoCount')) document.getElementById('homePhotoCount').textContent = PHOTOS.length;
    if(document.getElementById('homeVideoCount')) document.getElementById('homeVideoCount').textContent = VIDEOS.length;
    if(document.getElementById('homeDocCount')) document.getElementById('homeDocCount').textContent = DOCUMENTS.length;
}

// ---------- RENDER PHOTOS ----------
function renderPhotos(filter = 'all') {
    const grid = document.getElementById('photoGrid');
    let items = PHOTOS;
    if (filter !== 'all') items = items.filter(p => p.category === filter);
    if (!items.length) { grid.innerHTML = `<div class="empty-state"><i class="fas fa-images"></i><p>Không có ảnh nào trong danh mục này.</p></div>`; return; }
    
    grid.innerHTML = items.map(p => `
        <div class="gallery-item" data-id="${p.id}">
            <img src="${p.url}" alt="${p.title || 'Ảnh'}" loading="lazy" onclick="openLightbox('${p.url}', '${p.title}')" style="cursor:pointer;" />
            <div class="gallery-body">
                <h4>${p.title || 'Không có tiêu đề'}</h4>
                <p>${p.desc || ''}</p>
                <div class="actions">
                    <a href="${p.url}" target="_blank" rel="noopener"><i class="fas fa-eye"></i> Xem</a>
                    <a href="${p.url}" download><i class="fas fa-download"></i> Tải</a>
                    ${isLoggedIn ? `<button class="btn-edit" data-key="photo" data-id="${p.id}"><i class="fas fa-edit"></i> Sửa</button>` : ''}
                    ${isLoggedIn ? `<button class="btn-delete" data-key="photo" data-id="${p.id}"><i class="fas fa-trash"></i> Xóa</button>` : ''}
                </div>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('#photoGrid .btn-edit').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const id = this.dataset.id;
            const item = PHOTOS.find(p => p.id === id);
            if (item) openUploadModal('photo', item); 
        });
    });

    document.querySelectorAll('#photoGrid .btn-delete').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const id = this.dataset.id;
            if (confirm('Bạn có chắc muốn xóa ảnh này?')) removeItem('photos', id);
        });
    });
}

// ---------- RENDER VIDEOS ----------
function renderVideos(filter = 'all') {
    const grid = document.getElementById('videoGrid');
    let items = VIDEOS;
    if (filter !== 'all') items = items.filter(v => v.category === filter);
    if (!items.length) { grid.innerHTML = `<div class="empty-state"><i class="fas fa-video"></i><p>Không có video nào trong danh mục này.</p></div>`; return; }
    
    grid.innerHTML = items.map(v => {
        const embedUrl = getEmbedUrl(v.url);
        return `
            <div class="gallery-item" data-id="${v.id}">
                <div class="video-wrapper">
                    <iframe src="${embedUrl}" allowfullscreen loading="lazy"></iframe>
                </div>
                <div class="gallery-body">
                    <h4>${v.title || 'Không có tiêu đề'}</h4>
                    <p>${v.desc || ''}</p>
                    <div class="actions">
                        <a href="${v.url}" target="_blank" rel="noopener"><i class="fas fa-external-link-alt"></i> Mở gốc</a>
                        ${isLoggedIn ? `<button class="btn-edit" data-key="video" data-id="${v.id}"><i class="fas fa-edit"></i> Sửa</button>` : ''}
                        ${isLoggedIn ? `<button class="btn-delete" data-key="video" data-id="${v.id}"><i class="fas fa-trash"></i> Xóa</button>` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');

    document.querySelectorAll('#videoGrid .btn-edit').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const id = this.dataset.id;
            const item = VIDEOS.find(v => v.id === id);
            if (item) openUploadModal('video', item);
        });
    });

    document.querySelectorAll('#videoGrid .btn-delete').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const id = this.dataset.id;
            if (confirm('Bạn có chắc muốn xóa video này?')) removeItem('videos', id);
        });
    });
}

// ---------- RENDER DOCUMENTS ----------
function renderDocuments(filter = 'all') {
    const list = document.getElementById('docList');
    let items = DOCUMENTS;
    if (filter !== 'all') items = items.filter(d => d.category === filter);
    if (!items.length) { list.innerHTML = `<div class="empty-state"><i class="fas fa-folder-open"></i><p>Không có tài liệu nào trong danh mục này.</p></div>`; return; }
    
    list.innerHTML = items.map(d => `
        <div class="doc-item" data-id="${d.id}">
            <div class="doc-info">
                <i class="fas fa-file-pdf"></i>
                <div>
                    <div class="doc-title">${d.title || 'Tài liệu'}</div>
                    <div class="doc-desc">${d.desc || ''}</div>
                </div>
            </div>
            <div class="doc-actions">
                <a href="${d.url}" target="_blank" rel="noopener"><i class="fas fa-eye"></i> Xem</a>
                <a href="${d.url}" download><i class="fas fa-download"></i> Tải xuống</a>
                ${isLoggedIn ? `<button class="btn-edit" data-key="document" data-id="${d.id}"><i class="fas fa-edit"></i> Sửa</button>` : ''}
                ${isLoggedIn ? `<button class="btn-delete" data-key="document" data-id="${d.id}"><i class="fas fa-trash"></i> Xóa</button>` : ''}
            </div>
        </div>
    `).join('');

    document.querySelectorAll('#docList .btn-edit').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const id = this.dataset.id;
            const item = DOCUMENTS.find(d => d.id === id);
            if (item) openUploadModal('document', item);
        });
    });    

    document.querySelectorAll('#docList .btn-delete').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const id = this.dataset.id;
            if (confirm('Bạn có chắc muốn xóa tài liệu này?')) removeItem('documents', id);
        });
    });
}

// ---------- RENDER CHUYENMON ----------
function renderChuyenMon(filter = 'all') {
    const list = document.getElementById('chuyenmonList');
    let items = CHUYENMON;
    if (filter !== 'all') items = items.filter(c => c.category === filter);
    if (!items.length) { list.innerHTML = `<div class="empty-state"><i class="fas fa-folder"></i><p>Không có tài liệu chuyên môn nào trong danh mục này.</p></div>`; return; }
    
    list.innerHTML = items.map(c => {
        let icon = 'fa-file-pdf';
        if (c.type === 'xlsx' || c.type === 'xls') icon = 'fa-file-excel';
        else if (c.type === 'docx' || c.type === 'doc') icon = 'fa-file-word';
        else if (c.type === 'pptx' || c.type === 'ppt') icon = 'fa-file-powerpoint';
        
        return `
            <div class="doc-item" data-id="${c.id}">
                <div class="doc-info">
                    <i class="fas ${icon}"></i>
                    <div>
                        <div class="doc-title">${c.title || 'Tài liệu chuyên môn'}</div>
                        <div class="doc-desc">${c.desc || ''}</div>
                    </div>
                </div>
                <div class="doc-actions">
                    <a href="${c.url}" target="_blank" rel="noopener"><i class="fas fa-eye"></i> Xem</a>
                    <a href="${c.url}" download><i class="fas fa-download"></i> Tải xuống</a>
                    ${isLoggedIn ? `<button class="btn-edit" data-key="chuyenmon" data-id="${c.id}"><i class="fas fa-edit"></i> Sửa</button>` : ''}
                    ${isLoggedIn ? `<button class="btn-delete" data-key="chuyenmon" data-id="${c.id}"><i class="fas fa-trash"></i> Xóa</button>` : ''}
                </div>
            </div>
        `;
    }).join('');

    document.querySelectorAll('#chuyenmonList .btn-edit').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const id = this.dataset.id;
            const item = CHUYENMON.find(c => c.id === id);
            if (item) openUploadModal('chuyenmon', item);
        });
    });   

    document.querySelectorAll('#chuyenmonList .btn-delete').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const id = this.dataset.id;
            if (confirm('Bạn có chắc muốn xóa mục này?')) removeItem('chuyenmon', id);
        });
    });
}

// ---------- RENDER UNGDUNG & LINKS ----------
function renderUngDungApp(filter = 'all') {
    const list = document.getElementById('ungdungList');
    let items = UNGDUNG;
    if (filter !== 'all') items = items.filter(u => u.category === filter);
    if (!items.length) { list.innerHTML = `<div class="empty-state"><i class="fas fa-file-excel"></i><p>Không có ứng dụng nào.</p></div>`; return; }
    
    list.innerHTML = items.map(u => {
        let iconClass = 'fa-file-excel';
        const title = u.title || '';
        if (title.includes('Kế hoạch giáo dục') || title.includes('Lịch báo giảng')) iconClass = 'fa-calendar-alt';
        else if (title.includes('lương HCSN')) iconClass = 'fa-money-bill-wave';
        else if (title.includes('quản lý HS')) iconClass = 'fa-users-cog';
        else if (title.includes('Tính lương')) iconClass = 'fa-calculator';
        else if (title.includes('Tín dụng')) iconClass = 'fa-hand-holding-usd';
        else if (title.includes('Kiểm phiếu')) iconClass = 'fa-vote-yea';
        else if (title.includes('tiền điện')) iconClass = 'fa-bolt';
        else if (title.includes('Cập nhật ngày giáo án')) iconClass = 'fa-calendar-check';
        else if (title.includes('Lãi Suất Ngân Hàng')) iconClass = 'fa-chart-line';
        return `
            <div class="doc-item" data-id="${u.id}">
                <div class="doc-info">
                    <i class="fas ${iconClass}" style="color: #217346;"></i>
                    <div>
                        <div class="doc-title">${u.title || 'Ứng dụng Excel'}</div>
                        <div class="doc-desc">${u.desc || ''}</div>
                    </div>
                </div>
                <div class="doc-actions">
                    <a href="${u.preview}" target="_blank" rel="noopener"><i class="fas fa-eye"></i> Xem trước</a>
                    <a href="${u.download}" download><i class="fas fa-download"></i> Tải xuống</a>
                    ${isLoggedIn ? `<button class="btn-edit" data-key="ungdung" data-id="${u.id}"><i class="fas fa-edit"></i> Sửa</button>` : ''}
                    ${isLoggedIn ? `<button class="btn-delete" data-key="ungdung" data-id="${u.id}"><i class="fas fa-trash"></i> Xóa</button>` : ''}
                </div>
            </div>
        `;
    }).join('');

    document.querySelectorAll('#ungdungList .btn-edit').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const id = this.dataset.id;
            const item = UNGDUNG.find(u => u.id === id);
            if (item) openUploadModal('ungdung', item);
        });
    });

    document.querySelectorAll('#ungdungList .btn-delete').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const id = this.dataset.id;
            if (confirm('Bạn có chắc muốn xóa ứng dụng này?')) removeItem('ungdung', id);
        });
    });
}

function renderLinksInUngdung() {
    const grid = document.getElementById('linksGridInUngdung');
    if (!grid) return;
    if (!LINKS || !LINKS.length) { grid.innerHTML = `<div class="empty-state"><i class="fas fa-link"></i><p>Chưa có liên kết nào.</p></div>`; return; }
    
    grid.innerHTML = LINKS.map(link => {
        const favicon = getFaviconUrl(link);
        const iconHtml = favicon ? `<img src="${favicon}" alt="favicon" class="favicon-icon" onerror="this.style.display='none'" />` : `<i class="fas fa-link" style="color: var(--accent);"></i>`;
        return `
            <div class="doc-item" data-id="${link.id}">
                <div class="doc-info">
                    ${iconHtml}
                    <div>
                        <div class="doc-title">${link.title || 'Liên kết'}</div>
                        <div class="doc-desc">${link.desc || ''} <span style="font-size:0.8rem; color:var(--primary-light); display:block; word-break:break-all;">${link.url}</span></div>
                    </div>
                </div>
                <div class="doc-actions">
                    <a href="${link.url}" target="_blank" rel="noopener"><i class="fas fa-external-link-alt"></i> Mở</a>
                    ${isLoggedIn ? `<button class="btn-edit" data-key="link" data-id="${link.id}"><i class="fas fa-edit"></i> Sửa</button>` : ''}
                    ${isLoggedIn ? `<button class="btn-delete" data-key="link" data-id="${link.id}"><i class="fas fa-trash"></i> Xóa</button>` : ''}
                </div>
            </div>
        `;
    }).join('');

    document.querySelectorAll('#linksGridInUngdung .btn-edit').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const id = this.dataset.id;
            const item = LINKS.find(l => l.id === id);
            if (item) openUploadModal('link', item);
        });
    });

    document.querySelectorAll('#linksGridInUngdung .btn-delete').forEach(btn => {
            btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const id = this.dataset.id;
            if (confirm('Bạn có chắc muốn xóa liên kết này?')) removeItem('links', id);
        });
    });
}

function renderUngDungAndLinks() {
    const filter = getActiveFilter('ungdungFilterBar') || 'all';
    renderUngDungApp(filter);
    renderLinksInUngdung();
}

// ---------- HELPER ----------
function getEmbedUrl(url) {
    if (!url) return 'about:blank';
    let match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
    if (match) return `https://www.youtube.com/embed/${match[1]}`;
    match = url.match(/vimeo\.com\/(\d+)/);
    if (match) return `https://player.vimeo.com/video/${match[1]}`;
    if (url.includes('embed')) return url;
    return url;
}

function getFaviconUrl(link) {
    const url = link.url || '';
    try {
        const domain = new URL(url).hostname;
        return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
    } catch { return ''; }
}

// ---------- DANH MỤC PHÂN LOẠI ----------
function getCategories(type) {
    switch (type) {
        case 'chuyenmon':
            return [
                { val: 'giaoan', text: 'Giáo án' },
                { val: 'dethi', text: 'Đề thi' },
                { val: 'sangkien', text: 'Sáng kiến' },
                { val: 'tailieu', text: 'Tài liệu' },
                { val: 'phancongchuyenmon', text: 'Phân công' }
            ];
        case 'document':
            return [
                { val: 'quyetdinh', text: 'Quyết định' },
                { val: 'khenthuong', text: 'Khen thưởng' },
                { val: 'chungnhan', text: 'Chứng nhận' },
                { val: 'Văn bằng, chứng chỉ', text: 'Văn bằng, chứng chỉ' }
            ];
        case 'photo':
            return [
                { val: 'giangday', text: 'Giảng dạy' },
                { val: 'hoatdong', text: 'Hoạt động' },
                { val: 'sukien', text: 'Sự kiện' },
                { val: 'ca', text: 'Cá nhân' }
            ];
        case 'video':
            return [
                { val: 'giangday', text: 'Giảng dạy' },
                { val: 'hoatdong', text: 'Hoạt động' },
                { val: 'sukien', text: 'Sự kiện' },
                { val: 'cá nhân', text: 'Cá nhân' }
            ];
        case 'ungdung':
            return [
                { val: 'ungdung', text: 'Ứng dụng' }
            ];
        default:
            return [];
    }
}

// ---------- LIGHTBOX ----------
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(src, title) {
    lightboxImg.src = src;
    lightboxCaption.textContent = title || 'Ảnh';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', function(e) { if (e.target === this) closeLightbox(); });
document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeLightbox(); });

// ---------- BANNER SLIDER ----------
function renderBanner() {
    const wrapper = document.getElementById('bannerSlidesWrapper');
    const dotsContainer = document.getElementById('bannerDots');
    if(!wrapper || !dotsContainer) return;
    const SLIDES = [
        { title: 'Cổng thông tin giáo viên', desc: 'Cập nhật hồ sơ cá nhân - Thông tin học sinh - Chia sẻ tài nguyên giáo dục', btnText: 'Tìm hiểu thêm', btnLink: '#section-teacher', bg: 'https://i.pinimg.com/736x/5c/9b/92/5c9b92b5ca26978d3862d582954a1acd.jpg' },
        { title: 'Công nghệ trong giáo dục', desc: 'Ứng dụng CNTT để nâng cao chất lượng dạy và học', btnText: 'Xem kho ảnh', btnLink: '#section-photos', bg: 'https://i.pinimg.com/1200x/88/b4/d8/88b4d8e6e0527096a18ecf9ca38471ab.jpg' },
        { title: 'Phần mềm hỗ trợ giảng dạy', desc: 'Các công cụ giúp giáo viên quản lý và soạn bài hiệu quả', btnText: 'Khám phá', btnLink: '#section-ungdung', bg: 'https://i.pinimg.com/1200x/91/6b/4b/916b4bd44f429ba9d69e3976d778ae2d.jpg' },
        { title: 'Liên kết hữu ích', desc: 'Kết nối với các nền tảng giáo dục và tài nguyên trực tuyến', btnText: 'Xem ngay', btnLink: '#section-ungdung', bg: 'https://i.pinimg.com/1200x/3b/14/0a/3b140a880f7fa17e74b468accb38d018.jpg' }
    ];
    wrapper.innerHTML = SLIDES.map((slide, index) => `
        <div class="banner-slide ${index === 0 ? 'active' : ''}" style="background-image: url('${slide.bg}');" data-index="${index}">
            <div class="banner-content">
                <h1>${slide.title}</h1>
                <p>${slide.desc}</p>
                <a href="${slide.btnLink}" class="btn-banner" onclick="switchSection('${slide.btnLink.replace('#section-', '')}')">${slide.btnText}</a>
            </div>
        </div>
    `).join('');
    dotsContainer.innerHTML = SLIDES.map((_, index) => `<span class="banner-dot ${index === 0 ? 'active' : ''}" data-index="${index}"></span>`).join('');
    document.querySelectorAll('.banner-dot').forEach(dot => {
        dot.addEventListener('click', function() { goToSlide(parseInt(this.dataset.index)); });
    });
    document.getElementById('bannerPrev').addEventListener('click', () => goToSlide(currentSlide - 1));
    document.getElementById('bannerNext').addEventListener('click', () => goToSlide(currentSlide + 1));
    startAutoSlide();
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.banner-dot');
    const total = slides.length;
    if(total === 0) return;
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
    resetAutoSlide();
}

function startAutoSlide() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
}
function resetAutoSlide() { clearInterval(slideInterval); startAutoSlide(); }

// Initialize Banner
renderBanner();

// ---------- SWITCH SECTION ----------
function switchSection(sectionId) {
    document.querySelectorAll('.section').forEach(el => el.classList.remove('active'));
    const target = document.getElementById('section-' + sectionId);
    if (target) target.classList.add('active');
    document.querySelectorAll('.sidebar-nav button').forEach(btn => btn.classList.remove('active'));
    const btn = document.querySelector(`.sidebar-nav button[data-section="${sectionId}"]`);
    if (btn) btn.classList.add('active');
    renderSection(sectionId);
}

// ---------- FILTER EVENTS ----------
document.querySelectorAll('.filter-bar').forEach(bar => {
    bar.addEventListener('click', function(e) {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;
        this.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const section = this.closest('.section');
        if (!section) return;
        const sectionId = section.id.replace('section-', '');
        if (sectionId === 'ungdung') renderUngDungAndLinks();
        else renderSection(sectionId);
    });
});

// ---------- NAVIGATION ----------
document.querySelectorAll('.sidebar-nav button').forEach(btn => {
    btn.addEventListener('click', function() {
        const section = this.dataset.section;
        if (section) switchSection(section);
    });
});

// ---------- MODAL UPLOAD ----------
const modal = document.getElementById('uploadModal');
const modalClose = document.getElementById('modalClose');
const uploadForm = document.getElementById('uploadForm');
const uploadType = document.getElementById('uploadType');
const modalTitle = document.getElementById('modalTitle');
const uploadCategory = document.getElementById('uploadCategory');
const uploadFile = document.getElementById('uploadFile');
const uploadUrl = document.getElementById('uploadUrl');
const fileAcceptHint = document.getElementById('fileAcceptHint');

function openUploadModal(type, existingItem = null) {
    document.getElementById('uploadType').value = type;
    uploadForm.reset();
    
    // Tái tạo danh mục
    const categories = getCategories(type);
    const catGroup = document.getElementById('uploadCategory');
    if (catGroup) {
        if (categories.length > 0) {
            catGroup.innerHTML = '<option value="all">Tất cả</option>';
            categories.forEach(cat => {
                const option = document.createElement('option');
                option.value = cat.val;
                option.textContent = cat.text;
                catGroup.appendChild(option);
            });
            catGroup.closest('.form-group').style.display = 'block';
        } else {
            catGroup.innerHTML = '<option value="all">Tất cả</option>';
            catGroup.closest('.form-group').style.display = 'none';
        }
    }

    const submitBtn = uploadForm.querySelector('button[type="submit"]');

    if (existingItem) {
        editingId = existingItem.id;
        modalTitle.innerHTML = `<i class="fas fa-edit"></i> Cập nhật`;
        submitBtn.innerHTML = `<i class="fas fa-save"></i> Cập nhật`;

        document.getElementById('uploadTitle').value = existingItem.title || '';
        document.getElementById('uploadDesc').value = existingItem.desc || '';
        
        if (catGroup && existingItem.category) {
            catGroup.value = existingItem.category;
        }

        document.getElementById('uploadUrl').value = existingItem.url || existingItem.preview || '';
    } else {
        editingId = null;
        modalTitle.innerHTML = `<i class="fas fa-upload"></i> Thêm mới`;
        submitBtn.innerHTML = `<i class="fas fa-save"></i> Lưu`;
    }

    modal.style.display = 'flex';
}

function closeModal() { 
    modal.style.display = 'none';
    uploadForm.reset();
    editingId = null;
}
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', function(e) { if (e.target === this) closeModal(); });

uploadForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const type = uploadType.value;
    const title = document.getElementById('uploadTitle').value.trim();
    const desc = document.getElementById('uploadDesc').value.trim();
    const category = uploadCategory.value === 'all' ? '' : uploadCategory.value;
    const url = uploadUrl.value.trim();
    const file = uploadFile.files[0];

    if (!title) { alert('Vui lòng nhập tiêu đề.'); return; }

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';
    submitBtn.disabled = true;

    try {
        let finalUrl = url;
        let fileTypeExt = null;
        
        if (file) {
            let folder = 'photos';
            if (type === 'video') folder = 'videos';
            else if (type === 'document' || type === 'chuyenmon') folder = 'documents';
            else if (type === 'ungdung') folder = 'excel';
            else if (type === 'link') folder = 'links';
            
            finalUrl = await uploadFileToSupabase(file, folder);
            fileTypeExt = file.name.split('.').pop().toLowerCase();
        }

        let newData = { title, desc, category };
        
        if (finalUrl) {
            if (type === 'ungdung') {
                newData.preview = finalUrl;
                newData.download = finalUrl;
            } else if (type === 'chuyenmon') {
                newData.url = finalUrl;
                if (fileTypeExt) {
                    newData.type = fileTypeExt;
                } else if (editingId) {
                    const existing = CHUYENMON.find(c => c.id === editingId);
                    if(existing) newData.type = existing.type;
                } else {
                    newData.type = 'pdf'; 
                }
            } else if (type === 'document') {
                newData.url = finalUrl;
                newData.type = 'pdf';
            } else {
                newData.url = finalUrl;
            }
        }

        const arrayKey = DATA_KEYS[type];

        if (editingId !== null) {
            updateItem(arrayKey, editingId, newData);
            alert('Cập nhật thành công!');
        } else {
            if (!finalUrl) {
                alert('Vui lòng nhập URL hoặc chọn file.');
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                return;
            }
            addItem(arrayKey, newData);
            alert('Thêm mới thành công!');
        }

        closeModal();

    } catch (error) {
        console.error('Lỗi:', error);
        alert('Có lỗi xảy ra: ' + error.message);
    } finally {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    }
});

document.querySelectorAll('.btn-add').forEach(btn => {
    btn.addEventListener('click', function() { openUploadModal(this.dataset.type); });
});

// ---------- SEARCH ----------
function performSearch() {
    const input = document.getElementById('searchInput');
    const query = input.value.trim().toLowerCase();
    if (!query) { alert('Vui lòng nhập từ khóa tìm kiếm.'); return; }

    const allItems = [
        ...PHOTOS.map(item => ({ ...item, type: 'photo' })),
        ...VIDEOS.map(item => ({ ...item, type: 'video' })),
        ...DOCUMENTS.map(item => ({ ...item, type: 'document' })),
        ...CHUYENMON.map(item => ({ ...item, type: 'chuyenmon' })),
        ...UNGDUNG.map(item => ({ ...item, type: 'ungdung' })),
        ...LINKS.map(item => ({ ...item, type: 'link' }))
    ];

    const results = allItems.filter(item => {
        const title = (item.title || '').toLowerCase();
        const desc = (item.desc || '').toLowerCase();
        const cat = (item.category || '').toLowerCase();
        return title.includes(query) || desc.includes(query) || cat.includes(query);
    });

    const container = document.getElementById('searchResultsContainer');
    const info = document.getElementById('searchQueryInfo');
    info.textContent = `Tìm thấy ${results.length} kết quả cho từ khóa "${input.value}"`;

    if (results.length === 0) {
        container.innerHTML = `<div class="empty-state"><i class="fas fa-search"></i><p>Không tìm thấy kết quả nào.</p></div>`;
    } else {
        const grouped = results.reduce((acc, item) => {
            if (!acc[item.type]) acc[item.type] = [];
            acc[item.type].push(item);
            return acc;
        }, {});

        let html = '';
        for (const [type, items] of Object.entries(grouped)) {
            const typeLabel = { photo: 'Ảnh', video: 'Video', document: 'Tài liệu', chuyenmon: 'Chuyên môn', ungdung: 'Ứng dụng', link: 'Liên kết' }[type] || type;
            html += `<h4 style="margin: 16px 0 8px; color: var(--primary);"><i class="fas fa-folder-open"></i> ${typeLabel} (${items.length})</h4>`;
            if (type === 'photo' || type === 'video') {
                html += `<div class="gallery-grid">`;
                items.forEach(item => {
                    if (type === 'photo') {
                        html += `
                            <div class="gallery-item" onclick="openLightbox('${item.url}', '${item.title || ''}')">
                                <img src="${item.url}" alt="${item.title}" loading="lazy" />
                                <div class="gallery-body">
                                    <h4>${item.title || 'Không tiêu đề'}</h4>
                                    <p>${item.desc || ''}</p>
                                </div>
                            </div>
                        `;
                    } else {
                        const embedUrl = getEmbedUrl(item.url);
                        html += `
                            <div class="gallery-item">
                                <div class="video-wrapper">
                                    <iframe src="${embedUrl}" allowfullscreen loading="lazy"></iframe>
                                </div>
                                <div class="gallery-body">
                                    <h4>${item.title || 'Không tiêu đề'}</h4>
                                    <p>${item.desc || ''}</p>
                                </div>
                            </div>
                        `;
                    }
                });
                html += `</div>`;
            } else {
                html += `<div class="doc-list">`;
                items.forEach(item => {
                    let icon = 'fa-file';
                    if (type === 'link') icon = 'fa-link';
                    else if (item.type === 'pdf') icon = 'fa-file-pdf';
                    else if (item.type === 'xlsx' || item.type === 'xls') icon = 'fa-file-excel';
                    else if (item.type === 'docx' || item.type === 'doc') icon = 'fa-file-word';
                    else if (item.type === 'pptx' || item.type === 'ppt') icon = 'fa-file-powerpoint';
                    else if (type === 'ungdung') icon = 'fa-file-excel';
                    const url = item.url || item.preview || '#';
                    html += `
                        <div class="doc-item">
                            <div class="doc-info">
                                <i class="fas ${icon}"></i>
                                <div>
                                    <div class="doc-title">${item.title || 'Không tiêu đề'}</div>
                                    <div class="doc-desc">${item.desc || ''}</div>
                                </div>
                            </div>
                            <div class="doc-actions">
                                <a href="${url}" target="_blank" rel="noopener"><i class="fas fa-eye"></i> Xem</a>
                                ${type !== 'link' ? `<a href="${url}" download><i class="fas fa-download"></i> Tải</a>` : ''}
                            </div>
                        </div>
                    `;
                });
                html += `</div>`;
            }
        }
        container.innerHTML = html;
    }
    switchSection('search');
}

document.getElementById('searchBtn').addEventListener('click', performSearch);
document.getElementById('searchInput').addEventListener('keypress', function(e) { if (e.key === 'Enter') performSearch(); });

// --------- LOGIN / REGISTER ---------
function openLoginModal() { 
    const modal = document.getElementById('loginModal');
    if (modal) modal.style.display = 'flex'; 
}

function closeLoginModal() { 
    const modal = document.getElementById('loginModal');
    if (modal) modal.style.display = 'none'; 
}

function openRegisterModal() { 
    const modal = document.getElementById('registerModal');
    if (modal) modal.style.display = 'flex'; 
}

function closeRegisterModal() { 
    const modal = document.getElementById('registerModal');
    if (modal) modal.style.display = 'none'; 
}

async function handleLogout() {
    try {
        if (typeof supabaseClient !== 'undefined' && supabaseClient.auth) {
            await supabaseClient.auth.signOut();
        }
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        sessionStorage.clear();

        alert('Đã đăng xuất thành công!');
        window.location.reload();
    } catch (error) {
        console.error('Lỗi khi đăng xuất:', error);
        window.location.reload();
    }
}

document.getElementById('btnLogout')?.addEventListener('click', handleLogout);
document.getElementById('btnGoogleLogin')?.addEventListener('click', signInWithGoogle);
document.getElementById('loginBtn')?.addEventListener('click', openLoginModal);
document.getElementById('registerBtn')?.addEventListener('click', openRegisterModal);
document.getElementById('loginModalClose')?.addEventListener('click', closeLoginModal);
document.getElementById('registerModalClose')?.addEventListener('click', closeRegisterModal);

document.getElementById('loginModal')?.addEventListener('click', function(e) { 
    if (e.target === this) closeLoginModal(); 
});

document.getElementById('registerModal')?.addEventListener('click', function(e) { 
    if (e.target === this) closeRegisterModal(); 
});

document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    if (checkLogin(username, password)) {
        isLoggedIn = true;
        alert('Đăng nhập thành công! Chào mừng ' + username);
        closeLoginModal();
        document.getElementById('loginBtn').innerHTML = '<i class="fas fa-user-check"></i> ' + username;
        document.getElementById('loginBtn').style.borderColor = '#27ae60';
        document.getElementById('loginBtn').style.color = '#27ae60';
        document.getElementById('registerBtn').style.display = 'none';
        document.querySelectorAll('.btn-add.hidden-if-not-loggedin').forEach(el => el.classList.remove('hidden-if-not-loggedin'));
        renderSection('photos');
        renderSection('videos');
        renderSection('documents');
        renderSection('chuyenmon');
        renderUngDungAndLinks();
    } else {
        alert('Sai tên đăng nhập hoặc mật khẩu!');
        document.getElementById('loginPassword').value = '';
        document.getElementById('loginPassword').focus();
    }
});

document.getElementById('registerForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = document.getElementById('registerEmail')?.value;
    const password = document.getElementById('registerPassword')?.value;

    try {
        const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password,
        });
        if (error) throw error;
        alert('Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản (nếu có).');
        closeRegisterModal();
    } catch (error) {
        alert('Lỗi đăng ký: ' + error.message);
    }
});

// ---------- SALARY CALCULATOR ----------
function initSalaryCalculator() {
    const inputs = ['hsLuong', 'hsPCCV', 'hsPCKV', 'hsPCTN', 'pctn', 'hsYTe', 'hsUuDaiPct', 'hsDacBietPct', 'luongCoSo'];
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', calculateSalary);
    });
    calculateSalary();
}

function calculateSalary() {
    try {
        const D = parseFloat(document.getElementById('hsLuong')?.value || 0);
        const E = parseFloat(document.getElementById('hsPCCV')?.value || 0);
        const F = parseFloat(document.getElementById('hsPCKV')?.value || 0);
        const H = parseFloat(document.getElementById('hsPCTN')?.value || 0);
        const N = parseFloat(document.getElementById('pctn')?.value || 0);
        const J = parseFloat(document.getElementById('hsYTe')?.value || 0);
        const uuDaiPct = parseFloat(document.getElementById('hsUuDaiPct')?.value || 0);
        const dacBietPct = parseFloat(document.getElementById('hsDacBietPct')?.value || 0);
        const LCS = parseFloat(document.getElementById('luongCoSo')?.value || 0);

        const thamNien = (D + H) * (N / 100);
        const uuDai = (D + E) * (uuDaiPct / 100);
        const dacBiet = (D + E) * (dacBietPct / 100);
        
        const tongHeSo = D + E + F + H + thamNien + J + uuDai + dacBiet;
        const luongThang = tongHeSo * LCS;

        const bhxh = (D + E + thamNien) * LCS * 0.08;
        const bhyt = (D + E + thamNien) * LCS * 0.015;
        const bhtn = (D + E + thamNien) * LCS * 0.01;
        
        const tongTru = bhxh + bhyt + bhtn;
        const thucLanh = luongThang - tongTru;

        const formatMoney = val => Math.round(val).toLocaleString('vi-VN');
        const formatHeSo = val => val.toFixed(2);

        if(document.getElementById('kqUuDai')) document.getElementById('kqUuDai').textContent = formatHeSo(uuDai);
        if(document.getElementById('kqThamNien')) document.getElementById('kqThamNien').textContent = formatHeSo(thamNien);
        if(document.getElementById('kqDacBiet')) document.getElementById('kqDacBiet').textContent = formatHeSo(dacBiet);
        if(document.getElementById('kqTongHeSo')) document.getElementById('kqTongHeSo').textContent = formatHeSo(tongHeSo);
        if(document.getElementById('sumHeSo')) document.getElementById('sumHeSo').textContent = formatHeSo(tongHeSo);

        if(document.getElementById('kqLuongThang')) document.getElementById('kqLuongThang').textContent = formatMoney(luongThang);
        if(document.getElementById('sumLuong')) document.getElementById('sumLuong').textContent = formatMoney(luongThang);

        if(document.getElementById('kqBHXH')) document.getElementById('kqBHXH').textContent = formatMoney(bhxh);
        if(document.getElementById('kqBHYT')) document.getElementById('kqBHYT').textContent = formatMoney(bhyt);
        if(document.getElementById('kqBHTN')) document.getElementById('kqBHTN').textContent = formatMoney(bhtn);
        if(document.getElementById('kqTongTru')) document.getElementById('kqTongTru').textContent = formatMoney(tongTru);
        
        if(document.getElementById('kqThucLanh')) document.getElementById('kqThucLanh').textContent = formatMoney(thucLanh);
        if(document.getElementById('sumThucLanh')) document.getElementById('sumThucLanh').textContent = formatMoney(thucLanh);
    } catch (err) {
        console.warn("Lỗi tính lương: ", err);
    }
}

// ---------- EXPORT / IMPORT JSON ----------
function exportJSON() {
    if (!isLoggedIn) { alert('Vui lòng đăng nhập để xuất dữ liệu!'); return; }
    const json = JSON.stringify({ photos: PHOTOS, videos: VIDEOS, documents: DOCUMENTS, chuyenmon: CHUYENMON, ungdung: UNGDUNG, links: LINKS }, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `teacher_data_${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function importJSON() {
    if (!isLoggedIn) { alert('Vui lòng đăng nhập!'); return; }
    alert('Chức năng đang được cập nhật...');
}

// KHỞI CHẠY APP
window.addEventListener('DOMContentLoaded', loadData);