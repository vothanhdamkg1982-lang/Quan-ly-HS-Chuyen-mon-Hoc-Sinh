/* ============================================================
   WEBSITE GIÁO VIÊN VÕ THANH ĐẬM - TÍCH HỢP SUPABASE
   ============================================================ */

// ---------- CẤU HÌNH SUPABASE ----------
const SUPABASE_URL = 'https://whuyytjksrpyojmukftp.supabase.co';  // Thay bằng URL thực tế của bạn
const SUPABASE_ANON_KEY = 'sb_publishable_gpW8TcOIz4ocrrMIWUx3Qg_sZaeZqQ0'; // Thay bằng key anon của bạn

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const BUCKET_NAME = 'teacher-assets'; // Tên bucket đã tạo

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
        // Lưu trạng thái đã đăng nhập
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', session.user.email);
        
        // Cập nhật giao diện khi đã đăng nhập
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) {
            const userName = session.user.user_metadata.full_name || session.user.email.split('@')[0];
            loginBtn.innerHTML = `<i class="fas fa-user-check"></i> ${userName}`;
            loginBtn.style.borderColor = '#27ae60';
            loginBtn.style.color = '#27ae60';
        }
        
        // Ẩn nút đăng ký nếu có
        const registerBtn = document.getElementById('registerBtn');
        if (registerBtn) registerBtn.style.display = 'none';

        // Đóng Modal đăng nhập
        const loginModal = document.getElementById('loginModal');
        if (loginModal) loginModal.style.display = 'none';
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
        { id: 'cm3', title: 'Giáo án Tin học - Công nghệ K3-5', desc: 'Tuần 3-4', url: 'https://drive.google.com/file/d/1H2GpJKNxnrIWsGDOPtlB69g1UTt1NmTJ/view?usp=sharing', category: 'giaoan', type: 'pdf' },
        { id: 'cm4', title: 'Giáo án Tin học - Công nghệ K3-5', desc: 'Tuần 5-6', url: 'https://drive.google.com/file/d/1XtxwAxmpZ-WrT5i3OcpOb51Kxq8MCnit/view?usp=sharing', category: 'giaoan', type: 'pdf' },
        { id: 'cm5', title: 'Giáo án Tin học - Công nghệ K3-5', desc: 'Tuần 7-8', url: 'https://drive.google.com/file/d/1jmvC7A_mAxfaKHUoNY7zKXZJQe8hmQN5/view?usp=sharing', category: 'giaoan', type: 'pdf' },
        { id: 'cm6', title: 'Giáo án Tin học - Công nghệ K3-5', desc: 'Tuần 9-10', url: 'https://drive.google.com/file/d/1YV88Lxdh00uEq57GlR1bP9zfRckV3VMK/view?usp=sharing', category: 'giaoan', type: 'pdf' },
        { id: 'cm7', title: 'Giáo án Tin học - Công nghệ K3-5', desc: 'Tuần 11-12', url: 'https://drive.google.com/file/d/1TE8QGMupYaJnh9f7VuDbPlBkChlHi9PU/view?usp=sharing', category: 'giaoan', type: 'pdf' },
        { id: 'cm8', title: 'Giáo án Tin học - Công nghệ K3-5', desc: 'Tuần 13-14', url: 'https://drive.google.com/file/d/1LtK9v4J17B5Bd8X-hPU_qitMgiWRBmqM/view?usp=sharing', category: 'giaoan', type: 'pdf' },
        { id: 'cm9', title: 'Giáo án Tin học - Công nghệ K3-5', desc: 'Tuần 15-16', url: 'https://drive.google.com/file/d/12UZI0dzasT3MLfMdB28CcIjroE28GfUl/view?usp=sharing', category: 'giaoan', type: 'pdf' },
        { id: 'cm10', title: 'Giáo án Tin học - Công nghệ K3-5', desc: 'Tuần 17-18', url: 'https://drive.google.com/file/d/1WpkSv_tVsu4Y1NuBfsGjLSiH_4LJXJve/view?usp=sharing', category: 'giaoan', type: 'pdf' },
        { id: 'cm11', title: 'Giáo án Tin học - Công nghệ K3-5', desc: 'Tuần 19-20', url: 'https://drive.google.com/file/d/1rVIda7a6qqsQ2IHeNrwT3qKpjn7730nK/view?usp=sharing', category: 'giaoan', type: 'pdf' },
        { id: 'cm12', title: 'Giáo án Tin học - Công nghệ K3-5', desc: 'Tuần 21-22', url: 'https://drive.google.com/file/d/1caHmB6OPgc5w5HsNhGYipkw472XCCT3E/view?usp=sharing', category: 'giaoan', type: 'pdf' },
        { id: 'cm13', title: 'Giáo án Tin học - Công nghệ K3-5', desc: 'Tuần 23-24', url: 'https://drive.google.com/file/d/1U2a02Vabxv2mcsknmtzALTz1VVbZeNaV/view?usp=sharing', category: 'giaoan', type: 'pdf' },
        { id: 'cm14', title: 'Giáo án Tin học - Công nghệ K3-5', desc: 'Tuần 25-26', url: 'https://drive.google.com/file/d/1QmSw1Io6Mvd3NH-tjg5lvSrVSlX4grpd/view?usp=sharing', category: 'giaoan', type: 'pdf' },
        { id: 'cm15', title: 'Giáo án Tin học - Công nghệ K3-5', desc: 'Tuần 27-28', url: 'https://drive.google.com/file/d/1noHBpIU0uU640os8niSJNXte4RYEa9LP/view?usp=sharing', category: 'giaoan', type: 'pdf' },
        { id: 'cm16', title: 'Giáo án Tin học - Công nghệ K3-5', desc: 'Tuần 29-30', url: 'https://drive.google.com/file/d/1JAZseO5X09WzUmTrKTAaqmb1_qvy16hW/view?usp=sharing', category: 'giaoan', type: 'pdf' },
        { id: 'cm17', title: 'Giáo án Tin học - Công nghệ K3-5', desc: 'Tuần 31-32', url: 'https://drive.google.com/file/d/1yxqoniKB45cFpA__BJcpL1EIfUu8DcM-/view?usp=sharing', category: 'giaoan', type: 'pdf' },
        { id: 'cm18', title: 'Giáo án Tin học - Công nghệ K3-5', desc: 'Tuần 33-34', url: 'https://drive.google.com/file/d/1Xvs7oaXT5eD4dhHLSp23ti8trVfohsNy/view?usp=sharing', category: 'giaoan', type: 'pdf' },
        { id: 'cm19', title: 'Giáo án Tin học - Công nghệ K3-5', desc: 'Tuần 35', url: 'https://drive.google.com/file/d/1gc1Vjxrm20vN4CmoFquJOdRfF_VzhUAu/view?usp=sharing', category: 'giaoan', type: 'pdf' },
        { id: 'cm20', title: 'Đề thi học kỳ 1 - Tin học - Công nghệ', desc: 'Năm học 2025-2026', url: 'https://drive.google.com/drive/folders/1yG2fRBdybO1QNff5W2GTxPRJuNW5DURe?usp=sharing', category: 'dethi', type: 'pdf' },
        { id: 'cm21', title: 'Đề thi học kỳ 2 - Tin học - Công nghệ', desc: 'Năm học 2025-2026', url: 'https://drive.google.com/drive/folders/1MlpTeSPnN3GXd6HuIxC4gQydgct8wgVo?usp=sharing', category: 'dethi', type: 'pdf' },
        { id: 'cm22', title: 'Sáng kiến kinh nghiệm: Ứng dụng CNTT trong dạy học', desc: 'Giải A cấp huyện', url: '#', category: 'sangkien', type: 'pdf' },
        { id: 'cm23', title: 'Sáng kiến: Học mà chơi - Trò chơi ô chữ Tin học', desc: 'Áp dụng cho lớp 3,4', url: '#', category: 'sangkien', type: 'pdf' },
        { id: 'cm24', title: 'Phân công chuyên môn', desc: 'Lịch tập huấn SGK', url: 'https://drive.google.com/file/d/1-gMag7o8Esq4gIFwAQAt9OjkzctNANK2/view?usp=sharing', category: 'phancongchuyenmon', type: 'pdf' },
        { id: 'cm25', title: 'Tài liệu chuyên môn', desc: 'Tài liệu tham khảo', url: '#', category: 'tailieu', type: 'pdf' },
        { id: 'cm25', title: 'Phân công chuyên môn', desc: 'Họp chi bộ tháng 8', url: 'https://docs.google.com/document/d/1FOPQSCK4zWxXNnciDUqpo59-77_AlmmFehODfDcyWcU/edit?usp=sharing', category: 'phancongchuyenmon', type: 'pdf' },
    ],
    ungdung: [
        { id: 'ex1', title: 'Phần mềm Kế hoạch giáo dục - Lịch báo giảng tự động', desc: 'App web tự động tính lịch theo tuần', preview: 'https://vothanhdamkg1982-lang.github.io/Ke-Hoach-GD-1.4/', download: 'https://vothanhdamkg1982-lang.github.io/Ke-Hoach-GD-1.4/', category: 'ungdung', type: 'App web' },
        { id: 'ex2', title: 'Hệ thống lương HCSN', desc: 'Quản lý lương cho HCSN', preview: 'https://vothanhdamkg1982-lang.github.io/He-Thong-Luong-HCSN', download: 'https://vothanhdamkg1982-lang.github.io/He-Thong-Luong-HCSN', category: 'ungdung', type: 'App web' },
        { id: 'ex3', title: 'Phần mềm quản lý HS', desc: 'Quản lý hồ sơ, chuyên cần, điểm số, năng lực và phẩm chất học sinh', preview: 'https://vothanhdamkg1982-lang.github.io/Phan-Mem-Quan-Ly-HS/', download: 'https://vothanhdamkg1982-lang.github.io/Phan-Mem-Quan-Ly-HS/', category: 'ungdung', type: 'App web' },
        { id: 'ex4', title: 'Phần mềm Tính lương trực tuyến', desc: 'Tính lương, bảo hiểm, thuế', preview: 'https://vothanhdamkg1982-lang.github.io/BANG-TINH-LUONG-TRUC-TUYEN/', download: 'https://vothanhdamkg1982-lang.github.io/BANG-TINH-LUONG-TRUC-TUYEN/', category: 'ungdung', type: 'App web' },
        { id: 'ex5', title: 'Phần mềm Kiểm phiếu', desc: 'Kiểm phiếu nhanh,tự động, chính xác', preview: 'https://vothanhdamkg1982-lang.github.io/Phan-mem-kiem-phieu-nhanh/', download: 'https://vothanhdamkg1982-lang.github.io/Phan-mem-kiem-phieu-nhanh/', category: 'ungdung', type: 'App web' },
        { id: 'ex6', title: 'Phần mềm Tính tiền điện sinh hoạt', desc: 'Tính tiền điện sinh hoạt nhanh,tự động, chính xác', preview: 'https://vothanhdamkg1982-lang.github.io/T-nh-Nhanh-Tien-DIen-SH/', download: 'https://vothanhdamkg1982-lang.github.io/T-nh-Nhanh-Tien-DIen-SH/', category: 'ungdung', type: 'App web' },
        { id: 'ex7', title: 'Phần mềm Cập nhật ngày giáo án', desc: 'Tự động dịch chuyển toàn bộ ngày tháng trong file Word, giữ nguyên 100% định dạng', preview: 'https://vothanhdamkg1982-lang.github.io/Cap-Nhat-Ngay-Giao-An/', download: 'https://vothanhdamkg1982-lang.github.io/Cap-Nhat-Ngay-Giao-An/', category: 'ungdung', type: 'App web' },
        { id: 'ex8', title: 'Phần mềm Theo Dõi Tính Lãi Suất Ngân Hàng', desc: 'Tự động theo dõi lãi suất ngân hàng, tính toán lãi suất tiết kiệm, vay vốn', preview: 'https://vothanhdamkg1982-lang.github.io/Phan-Mem-THeo-Doi-Tinh-Lai-Suat-Ngan-Hang/', download: 'https://vothanhdamkg1982-lang.github.io/Phan-Mem-THeo-Doi-Tinh-Lai-Suat-Ngan-Hang/', category: 'ungdung', type: 'App web' },
        { id: 'ex9', title: 'Phần mềm Theo Dõi Tài chính', desc: 'Tự động theo dõi Thu chi cá nhân', preview: 'https://vothanhdamkg1982-lang.github.io/MoneyMaster/', download: 'https://vothanhdamkg1982-lang.github.io/MoneyMaster/', category: 'ungdung', type: 'App web' },
        { id: 'ex10', title: 'Hồ sơ năng lực CĐS giáo viên', desc: 'Hồ sơ vị trí việc làm 232', preview: 'https://vothanhdamkg1982-lang.github.io/EduProfile-Pro/', download: 'https://vothanhdamkg1982-lang.github.io/EduProfile-Pro/', category: 'ungdung', type: 'App web' },
        { id: 'ex10', title: 'Phiếu khảo sát học sinh', desc: 'Phiếu khảo sát trực tuyến', preview: 'https://script.google.com/macros/s/AKfycbx7sDz95OvCuItNTyljPPP4EqPD07TKalHPXIjGa9376Ccqhy8uICWbxgD9rARnjzIZBQ/exec', download: 'https://script.google.com/macros/s/AKfycbx7sDz95OvCuItNTyljPPP4EqPD07TKalHPXIjGa9376Ccqhy8uICWbxgD9rARnjzIZBQ/exec', category: 'ungdung', type: 'App web' }
    ],
    links: [
        { id: 'l1', title: 'Bộ Giáo dục và Đào tạo', url: 'https://moet.gov.vn', desc: 'Trang chính của Bộ GD&ĐT' },
        { id: 'l2', title: 'VietnamNet - Giáo dục', url: 'https://vietnamnet.vn/giao-duc', desc: 'Tin tức giáo dục mới nhất' },
        { id: 'l3', title: 'Học mãi', url: 'https://hocmai.vn', desc: 'Nền tảng học trực tuyến hàng đầu' },
        { id: 'l4', title: 'Nhà xuất bản Giáo dục Việt Nam', url: 'https://taphuan.nxbgd.vn', desc: 'Bộ sách giáo khoa thống nhất' },
        { id: 'l5', title: 'Tin học trẻ', url: 'https://tinhoctre.vn', desc: 'Sân chơi Tin học cho học sinh' },
        { id: 'l6', title: 'Bồi dưỡng Giáo viên Phổ thông', url: 'https://taphuan.csdl.edu.vn', desc: 'Quản lý cơ sở giáo dục' },
        { id: 'l7', title: 'VNEDU Trần Quốc Toản', url: 'https://ucnnzccazsgdkiengiang.vnedu.vn', desc: 'Quản lý học sinh' },
        { id: 'l8', title: 'Đại học Trà Vinh', url: 'https://lms2tvu.onschool.edu.vn/', desc: 'Khóa học trực tuyến' },
        { id: 'l9', title: 'Bình dân học vụ số', url: 'https://binhdanhocvuso.gov.vn/dashboard', desc: 'Nền tảng Bình dân học vụ số' },
        { id: 'l10', title: 'Câu hỏi sau tập huấn, bồi dưỡng', url: 'https://th.nxbgd.vn/cauhoidanhgia', desc: 'Đánh giá sau tập huấn, bồi dưỡng' },
        { id: 'l11', title: 'Pháp luật', url: 'https://thuvienphapluat.vn/phap-luat', desc: 'Thông tin Văn bản pháp luật mới ban hành' },
    ]
};

// ---------- BIẾN TOÀN CỤC ----------
let PHOTOS = [], VIDEOS = [], DOCUMENTS = [], CHUYENMON = [], UNGDUNG = [], LINKS = [];
let isLoggedIn = false;
let currentSlide = 0;
let slideInterval;
let editingId = null; // <--- THÊM DÒNG NÀY

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
            // Nếu lỗi 404 (không có dữ liệu), tạo mới
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
            console.log('✅ Đã tải dữ liệu thành công:', {
                photos: PHOTOS.length,
                videos: VIDEOS.length,
                documents: DOCUMENTS.length
            });
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

    // Render giao diện
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

        if (error) {
            console.error('❌ Lỗi khi lưu dữ liệu:', error);
            throw error;
        }
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

    const { data, error } = await supabaseClient.storage
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
    switch(arrayKey) {
        case 'photos': PHOTOS.push(newItem); break;
        case 'videos': VIDEOS.push(newItem); break;
        case 'documents': DOCUMENTS.push(newItem); break;
        case 'chuyenmon': CHUYENMON.push(newItem); break;
        case 'ungdung': UNGDUNG.push(newItem); break;
        case 'links': LINKS.push(newItem); break;
        default: return;
    }
    saveData();
    if (arrayKey === 'ungdung' || arrayKey === 'links') renderUngDungAndLinks();
    else renderSection(arrayKey);
}

function removeItem(arrayKey, id) {
    if (!isLoggedIn) { alert('Vui lòng đăng nhập!'); return; }
    let arr, item;
    switch(arrayKey) {
        case 'photos': arr = PHOTOS; break;
        case 'videos': arr = VIDEOS; break;
        case 'documents': arr = DOCUMENTS; break;
        case 'chuyenmon': arr = CHUYENMON; break;
        case 'ungdung': arr = UNGDUNG; break;
        case 'links': arr = LINKS; break;
        default: return;
    }
    const index = arr.findIndex(it => it.id === id);
    if (index !== -1) {
        item = arr[index];
        arr.splice(index, 1);
        const fileUrl = item.url || item.preview || null;
        if (fileUrl) deleteFileFromSupabase(fileUrl);
        saveData();
        if (arrayKey === 'ungdung' || arrayKey === 'links') renderUngDungAndLinks();
        else renderSection(arrayKey);
    }
}
// ---------- CRUD (UPDATE) ----------
function updateItem(arrayKey, id, newData) {
    if (!isLoggedIn) { alert('Vui lòng đăng nhập!'); return; }
    let arr;
    switch(arrayKey) {
        case 'photos': arr = PHOTOS; break;
        case 'videos': arr = VIDEOS; break;
        case 'documents': arr = DOCUMENTS; break;
        case 'chuyenmon': arr = CHUYENMON; break;
        case 'ungdung': arr = UNGDUNG; break;
        case 'links': arr = LINKS; break;
        default: return;
    }
    
    // Tìm item cũ và cập nhật dữ liệu (giữ lại id cũ)
    const index = arr.findIndex(it => it.id === id);
    if (index !== -1) {
        arr[index] = { ...arr[index], ...newData };
        saveData(); // Lưu lên Supabase
        // Render lại giao diện
        if (arrayKey === 'ungdung' || arrayKey === 'links') renderUngDungAndLinks();
        else renderSection(arrayKey);
    }
}
// ---------- RENDER CÁC SECTION ----------
function renderSection(key) {
    let barId;
    switch(key) {
        case 'photos': barId = 'photoFilterBar'; break;
        case 'videos': barId = 'videoFilterBar'; break;
        case 'documents': barId = 'docFilterBar'; break;
        case 'chuyenmon': barId = 'chuyenmonFilterBar'; break;
        case 'ungdung': renderUngDungAndLinks(); return;
        default: barId = null;
    }
    const filter = barId ? getActiveFilter(barId) : 'all';
    switch(key) {
        case 'photos': renderPhotos(filter); break;
        case 'videos': renderVideos(filter); break;
        case 'documents': renderDocuments(filter); break;
        case 'chuyenmon': renderChuyenMon(filter); break;
    }
}

function getActiveFilter(barId) {
    const bar = document.getElementById(barId);
    if (!bar) return 'all';
    const activeBtn = bar.querySelector('.filter-btn.active');
    return activeBtn ? activeBtn.dataset.filter : 'all';
}

function updateBadges() {
    document.getElementById('photoCount').textContent = PHOTOS.length;
    document.getElementById('videoCount').textContent = VIDEOS.length;
    document.getElementById('docCount').textContent = DOCUMENTS.length;
    document.getElementById('chuyenmonCount').textContent = CHUYENMON.length;
    document.getElementById('ungdungCount').textContent = UNGDUNG.length;
    document.getElementById('homePhotoCount').textContent = PHOTOS.length;
    document.getElementById('homeVideoCount').textContent = VIDEOS.length;
    document.getElementById('homeDocCount').textContent = DOCUMENTS.length;
}

// ---------- RENDER PHOTOS ----------
function renderPhotos(filter = 'all') {
    const grid = document.getElementById('photoGrid');
    let items = PHOTOS;
    if (filter !== 'all') items = items.filter(p => p.category === filter);
    if (!items.length) { grid.innerHTML = `<div class="empty-state"><i class="fas fa-images"></i><p>Không có ảnh nào trong danh mục này.</p></div>`; return; }
    // Trong function renderPhotos(filter = 'all') { ... }
grid.innerHTML = items.map(p => `
    <div class="gallery-item" data-id="${p.id}">
        <img src="${p.url}" alt="${p.title || 'Ảnh'}" loading="lazy" />
        <div class="gallery-body">
            <h4>${p.title || 'Không có tiêu đề'}</h4>
            <p>${p.desc || ''}</p>
            <div class="actions">
                <a href="${p.url}" target="_blank" rel="noopener"><i class="fas fa-eye"></i> Xem</a>
                <a href="${p.url}" download="${p.title || 'anh'}.jpg"><i class="fas fa-download"></i> Tải</a>
                <!-- SỬA Ở ĐÂY: Thêm nút Sửa -->
                ${isLoggedIn ? `<button class="btn-edit" data-key="photos" data-id="${p.id}"><i class="fas fa-edit"></i> Sửa</button>` : ''}
                ${isLoggedIn ? `<button class="btn-delete" data-key="photos" data-id="${p.id}"><i class="fas fa-trash"></i> Xóa</button>` : ''}
            </div>
        </div>
    </div>
`).join('');
   // Xử lý sự kiện click cho nút Sửa (Thêm đoạn này vào)
document.querySelectorAll('#photoGrid .btn-edit').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const key = this.dataset.key; // 'photos'
        const id = this.dataset.id;
        const item = PHOTOS.find(p => p.id === id);
        if (item) {
            // Dùng lại hàm mở modal, truyền vào item cũ để lấy dữ liệu
            openUploadModal('photo', item); 
        }
    });
});
    document.querySelectorAll('#photoGrid .btn-delete').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const key = this.dataset.key;
            const id = this.dataset.id;
            if (confirm('Bạn có chắc muốn xóa ảnh này?')) {
                removeItem(key, id);
            }
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
                        ${isLoggedIn ? `<button class="btn-edit" data-key="videos" data-id="${v.id}"><i class="fas fa-edit"></i> Sửa</button>` : ''}
                        ${isLoggedIn ? `<button class="btn-delete" data-key="videos" data-id="${v.id}"><i class="fas fa-trash"></i> Xóa</button>` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');
    document.querySelectorAll('#videoGrid .btn-delete').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const key = this.dataset.key;
            const id = this.dataset.id;
            if (confirm('Bạn có chắc muốn xóa video này?')) {
                removeItem(key, id);
            }
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
                <a href="${d.url}" download="${d.title || 'tailieu'}.pdf"><i class="fas fa-download"></i> Tải xuống</a>
                ${isLoggedIn ? `<button class="btn-delete" data-key="documents" data-id="${d.id}"><i class="fas fa-trash"></i> Xóa</button>` : ''}
            </div>
        </div>
    `).join('');
    document.querySelectorAll('#docList .btn-delete').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const key = this.dataset.key;
            const id = this.dataset.id;
            if (confirm('Bạn có chắc muốn xóa tài liệu này?')) {
                removeItem(key, id);
            }
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
        if (c.type === 'xlsx') icon = 'fa-file-excel';
        else if (c.type === 'docx') icon = 'fa-file-word';
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
                    <a href="${c.url}" download="${c.title || 'chuyenmon'}.${c.type || 'pdf'}"><i class="fas fa-download"></i> Tải xuống</a>
                    ${isLoggedIn ? `<button class="btn-delete" data-key="chuyenmon" data-id="${c.id}"><i class="fas fa-trash"></i> Xóa</button>` : ''}
                </div>
            </div>
        `;
    }).join('');
    document.querySelectorAll('#chuyenmonList .btn-delete').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const key = this.dataset.key;
            const id = this.dataset.id;
            if (confirm('Bạn có chắc muốn xóa mục này?')) {
                removeItem(key, id);
            }
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
                    <a href="${u.download}" download="${u.title || 'ungdung'}.xlsx"><i class="fas fa-download"></i> Tải xuống</a>
                    ${isLoggedIn ? `<button class="btn-delete" data-key="ungdung" data-id="${u.id}"><i class="fas fa-trash"></i> Xóa</button>` : ''}
                </div>
            </div>
        `;
    }).join('');
    document.querySelectorAll('#ungdungList .btn-delete').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const key = this.dataset.key;
            const id = this.dataset.id;
            if (confirm('Bạn có chắc muốn xóa ứng dụng này?')) {
                removeItem(key, id);
            }
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
                    ${isLoggedIn ? `<button class="btn-delete" data-key="links" data-id="${link.id}"><i class="fas fa-trash"></i> Xóa</button>` : ''}
                </div>
            </div>
        `;
    }).join('');
    document.querySelectorAll('#linksGridInUngdung .btn-delete').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const key = this.dataset.key;
            const id = this.dataset.id;
            if (confirm('Bạn có chắc muốn xóa liên kết này?')) {
                removeItem(key, id);
            }
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
    if (!isLoggedIn) { alert('Vui lòng đăng nhập để thêm mới!'); return; }
    
    const isEdit = existingItem !== null;
    
    uploadType.value = type;
    editingId = isEdit ? existingItem.id : null;
    modalTitle.innerHTML = isEdit ? `<i class="fas fa-edit"></i> Cập nhật ${getTypeLabel(type)}` : `<i class="fas fa-upload"></i> Thêm mới ${getTypeLabel(type)}`;

    // Cập nhật danh sách Category
    const categories = getCategories(type);
    uploadCategory.innerHTML = '<option value="all">Tất cả</option>';
    categories.forEach(cat => { uploadCategory.innerHTML += `<option value="${cat}">${cat}</option>`; });

    // Set lại accept/placeholder
    if (type === 'photo') { uploadFile.accept = 'image/*'; fileAcceptHint.textContent = 'Hỗ trợ: ảnh (jpg, png, gif, svg...)'; uploadUrl.placeholder = 'https://example.com/hinh-anh.jpg'; }
    else if (type === 'video') { uploadFile.accept = 'video/*'; fileAcceptHint.textContent = 'Hỗ trợ: video (mp4, webm...) hoặc nhập URL YouTube/Vimeo'; uploadUrl.placeholder = 'https://www.youtube.com/watch?v=...'; }
    else if (type === 'document' || type === 'chuyenmon') { uploadFile.accept = '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx'; fileAcceptHint.textContent = 'Hỗ trợ: PDF, Word, Excel, PowerPoint'; uploadUrl.placeholder = 'https://drive.google.com/file/d/...'; }
    else if (type === 'ungdung') { uploadFile.accept = '.xls,.xlsx'; fileAcceptHint.textContent = 'Hỗ trợ: file Excel (.xls, .xlsx)'; uploadUrl.placeholder = 'https://docs.google.com/spreadsheets/...'; }
    else if (type === 'link') { uploadFile.accept = ''; fileAcceptHint.textContent = 'Nhập URL và tiêu đề'; uploadUrl.placeholder = 'https://example.com'; }
    else { uploadFile.accept = '*/*'; fileAcceptHint.textContent = 'Chọn file hoặc nhập URL'; uploadUrl.placeholder = 'https://...'; }

    uploadForm.reset();
    uploadUrl.value = '';
    uploadFile.value = '';

    // Nếu là Sửa, điền dữ liệu cũ vào form
    if (isEdit) {
        document.getElementById('uploadTitle').value = existingItem.title || '';
        document.getElementById('uploadDesc').value = existingItem.desc || '';
        if (existingItem.category) uploadCategory.value = existingItem.category;
        if (existingItem.url || existingItem.preview) {
            uploadUrl.value = existingItem.url || existingItem.preview || '';
        }
        // Ẩn chọn file khi sửa (để tránh upload lại ảnh nếu không cần thiết)
        uploadFile.style.display = 'none';
        document.querySelector('#urlGroup .or-divider') ? document.querySelector('#urlGroup .or-divider').style.display = 'none' : null;
        document.querySelector('#urlGroup small').style.display = 'none';
    } else {
        uploadFile.style.display = 'block';
        document.querySelector('#urlGroup small').style.display = 'block';
    }

    modal.classList.add('active');
}

function closeModal() { modal.classList.remove('active'); }
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

    try {
        let finalUrl = url;
        if (file) {
            let folder = 'photos';
            if (type === 'video') folder = 'videos';
            else if (type === 'document' || type === 'chuyenmon') folder = 'documents';
            else if (type === 'ungdung') folder = 'excel';
            else if (type === 'link') folder = 'links';
            finalUrl = await uploadFileToSupabase(file, folder);
        } else if (!url) {
            alert('Vui lòng nhập URL hoặc chọn file.');
            return;
        }

        // ... Giữ nguyên phần upload file/get URL như cũ ...
        // Đặt đoạn này thay cho đoạn let newItem cũ:
        let newItem;
        if (type === 'photo') {
            newItem = { url: finalUrl, title, desc, category };
        } else if (type === 'video') {
            newItem = { url: finalUrl, title, desc, category };
        } else if (type === 'document') {
            newItem = { url: finalUrl, title, desc, category, type: 'pdf' };
        } else if (type === 'chuyenmon') {
            let t = 'pdf';
            if (finalUrl.startsWith('data:application/vnd.openxmlformats-officedocument.wordprocessingml.document')) t = 'docx';
            else if (finalUrl.startsWith('data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) t = 'xlsx';
            newItem = { url: finalUrl, title, desc, category, type: t };
        } else if (type === 'ungdung') {
            newItem = { preview: finalUrl, download: finalUrl, title, desc, category, type: 'xlsx' };
        } else if (type === 'link') {
            newItem = { title, desc, url: finalUrl };
        }

        let key = type + 's';
        if (type === 'ungdung') key = 'ungdung';

        // QUAN TRỌNG: Phân biệt Thêm mới và Cập nhật
        if (editingId) {
            // Nếu có editingId -> Gọi hàm cập nhật
            updateItem(key, editingId, newItem);
        } else {
            // Nếu không có -> Gọi hàm thêm mới
            addItem(key, newItem);
        }
        
        closeModal();
        if (key === 'ungdung' || key === 'links') renderUngDungAndLinks();
        else renderSection(key);
    } catch (error) {
        alert('Lỗi upload: ' + error.message);
    }
});

function getTypeLabel(type) {
    const map = { 'photo': 'Ảnh', 'video': 'Video', 'document': 'Tài liệu', 'chuyenmon': 'Chuyên môn', 'ungdung': 'Ứng dụng', 'link': 'Liên kết' };
    return map[type] || type;
}
function getCategories(type) {
    const map = {
        'photo': ['giangday', 'hoatdong', 'sukien', 'ca'],
        'video': ['giangday', 'hoatdong', 'sukien', 'cá nhân'],
        'document': ['quyetdinh', 'khenthuong', 'chungnhan', 'Văn bằng, chứng chỉ'],
        'chuyenmon': ['giaoan', 'dethi', 'sangkien', 'tailieu', 'phancongchuyenmon'],
        'ungdung': ['ungdung'],
        'link': []
    };
    return map[type] || [];
}

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
        return title.includes(query) || desc.includes(query);
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
                    else if (item.type === 'xlsx') icon = 'fa-file-excel';
                    else if (item.type === 'docx') icon = 'fa-file-word';
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
    if (modal) modal.classList.add('active'); 
}

function closeLoginModal() { 
    const modal = document.getElementById('loginModal');
    if (modal) modal.classList.remove('active'); 
}

function openRegisterModal() { 
    const modal = document.getElementById('registerModal');
    if (modal) modal.classList.add('active'); 
}

function closeRegisterModal() { 
    const modal = document.getElementById('registerModal');
    if (modal) modal.classList.remove('active'); 
}
// --------- LOGIN / REGISTER ---------
// ... các hàm openLoginModal, openRegisterModal ...

document.getElementById('loginBtn')?.addEventListener('click', openLoginModal);
document.getElementById('registerBtn')?.addEventListener('click', openRegisterModal);
document.getElementById('loginModalClose')?.addEventListener('click', closeLoginModal);
document.getElementById('registerModalClose')?.addEventListener('click', closeRegisterModal);


// ➕ DÁN ĐOẠN MÃ ĐĂNG XUẤT NÀY VÀO NGAY BÊN DƯỚI:

async function handleLogout() {
    try {
        if (typeof supabaseClient !== 'undefined' && supabaseClient.auth) {
            await supabaseClient.auth.signOut();
        }
        localStorage.removeItem('currentUser');
        localStorage.removeItem('supabase.auth.token');
        sessionStorage.clear();

        alert('Đã đăng xuất thành công!');
        window.location.reload();
    } catch (error) {
        console.error('Lỗi khi đăng xuất:', error);
        window.location.reload();
    }
}

// Bắt sự kiện click cho nút Đăng xuất
document.getElementById('btnLogout')?.addEventListener('click', handleLogout);
// Bắt sự kiện click cho nút Đăng nhập Google
document.getElementById('btnGoogleLogin')?.addEventListener('click', signInWithGoogle);
// Bắt sự kiện an toàn (không lo bị rớt lỗi Uncaught TypeError)
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

document.getElementById('loginForm').addEventListener('submit', function(e) {
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
    
    const email = document.getElementById('registerEmail')?.value; // Điều chỉnh ID ô nhập email cho đúng với HTML
    const password = document.getElementById('registerPassword')?.value; // Điều chỉnh ID ô nhập password

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
    if (!isLoggedIn) { alert('Vui lòng đăng nhập để nhập dữ liệu!'); return; }
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(ev) {
            try {
                const imported = JSON.parse(ev.target.result);
                if (imported.photos) PHOTOS = imported.photos;
                if (imported.videos) VIDEOS = imported.videos;
                if (imported.documents) DOCUMENTS = imported.documents;
                if (imported.chuyenmon) CHUYENMON = imported.chuyenmon;
                if (imported.ungdung) UNGDUNG = imported.ungdung;
                if (imported.links) LINKS = imported.links;
                saveData();
                renderSection('photos');
                renderSection('videos');
                renderSection('documents');
                renderSection('chuyenmon');
                renderUngDungAndLinks();
                updateBadges();
                alert('Nhập dữ liệu thành công!');
            } catch(err) {
                alert('Lỗi: File JSON không hợp lệ.');
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

// ---------- TÍNH LƯƠNG ----------
function calculateSalary() {
    const hsLuong = document.getElementById('hsLuong');
    if (!hsLuong) return;
    const D = parseFloat(hsLuong.value) || 0;
    const E = parseFloat(document.getElementById('hsPCCV').value) || 0;
    const F = parseFloat(document.getElementById('hsPCKV').value) || 0;
    const H = parseFloat(document.getElementById('hsPCTN').value) || 0;
    const N = parseFloat(document.getElementById('pctn').value) || 0;
    const J = parseFloat(document.getElementById('hsYTe').value) || 0;
    const uuDaiPct = parseFloat(document.getElementById('hsUuDaiPct').value) || 0;
    const dacBietPct = parseFloat(document.getElementById('hsDacBietPct').value) || 0;
    const LCS = parseFloat(document.getElementById('luongCoSo').value) || 0;

    const round4 = (v) => Math.round(v * 10000) / 10000;
    const round0 = (v) => Math.round(v);
    const uuDai = round4((D + E) * (uuDaiPct / 100));
    const thamNien = round4((D + H) * N / 100);
    const dacBiet = round4((D + E) * (dacBietPct / 100));
    const tongHeSo = round4(D + E + F + uuDai + H + thamNien + J + dacBiet);
    const luongThang = round0(tongHeSo * LCS);
    const baseBH = D + E + thamNien;
    const bhxh = round0(baseBH * LCS * 0.08);
    const bhyt = round0(baseBH * LCS * 0.015);
    const bhtn = round0(baseBH * LCS * 0.01);
    const tongTru = bhxh + bhyt + bhtn;
    const thucLanh = luongThang - tongTru;

    const formatNum = (v) => Number(v).toFixed(4);
    const formatCurrency = (v) => Math.round(v).toLocaleString('vi-VN');

    document.getElementById('kqUuDai').textContent = formatNum(uuDai);
    document.getElementById('kqThamNien').textContent = formatNum(thamNien);
    document.getElementById('kqDacBiet').textContent = formatNum(dacBiet);
    document.getElementById('kqTongHeSo').textContent = formatNum(tongHeSo);
    document.getElementById('kqLuongThang').textContent = formatCurrency(luongThang) + ' ₫';
    document.getElementById('kqBHXH').textContent = formatCurrency(bhxh) + ' ₫';
    document.getElementById('kqBHYT').textContent = formatCurrency(bhyt) + ' ₫';
    document.getElementById('kqBHTN').textContent = formatCurrency(bhtn) + ' ₫';
    document.getElementById('kqTongTru').textContent = formatCurrency(tongTru) + ' ₫';
    document.getElementById('kqThucLanh').textContent = formatCurrency(thucLanh) + ' ₫';
    document.getElementById('sumHeSo').textContent = formatNum(tongHeSo);
    document.getElementById('sumLuong').textContent = formatCurrency(luongThang) + ' ₫';
    document.getElementById('sumThucLanh').textContent = formatCurrency(thucLanh) + ' ₫';
}

function initSalaryCalculator() {
    const inputs = ['hsLuong', 'hsPCCV', 'hsPCKV', 'hsPCTN', 'pctn', 'hsYTe', 'hsUuDaiPct', 'hsDacBietPct', 'luongCoSo'];
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', calculateSalary);
            el.addEventListener('change', calculateSalary);
        }
    });
    calculateSalary();
}

// ---------- KHỞI TẠO ----------
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    renderBanner();
    // Các sự kiện khác đã được gán trong HTML
    console.log('✅ Website đã sẵn sàng với Supabase!');
    console.log('🔐 Tài khoản: admin | Mật khẩu: Admin@2026');
    const btnGoogle = document.getElementById('btnGoogleLogin');
if (btnGoogle) {
    btnGoogle.addEventListener('click', signInWithGoogle);
}
});