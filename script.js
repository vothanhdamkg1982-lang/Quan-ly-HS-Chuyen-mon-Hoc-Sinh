/* ============================================================
   QUẢN LÝ DỮ LIỆU & GIAO DIỆN (CÓ UPLOAD / XÓA / JSON)
   TÍCH HỢP FAVICON, TÌM KIẾM, ĐĂNG NHẬP/ĐĂNG KÝ
   ============================================================ */

// ---------- DỮ LIỆU MẶC ĐỊNH ----------
const DEFAULT_DATA = {
    photos: [
        { id: 'p1', url: 'https://i.ibb.co/PZZfhZ7N/T-p-hu-n-SGK-Tin-h-c.jpg', title: 'Tập huấn Tin học', desc: 'Tập huấn tại Hội trường', category: 'hoatdong' },
        { id: 'p2', url: 'https://i.ibb.co/1cqx5g9/T-p-hu-n-m-n-C-ng-ngh.jpg', title: 'Tập huấn môn Công nghệ', desc: 'Tập huấn tại Hội trường', category: 'hoatdong' },
        { id: 'p3', url: 'https://i.ibb.co/rrvq3cz/IMG-0256.jpg', title: 'Họp mặt 20/11', desc: 'Ngày Nhà giáo Việt Nam', category: 'sukien' },
        { id: 'p4', url: 'https://i.ibb.co/M5yQtMMG/T-p-hu-n-SGK-TNXH.jpg', title: 'Tâp huấn SGK', desc: 'Tập hấn bộ sách thống nhất toàn quốc', category: 'hoatdong' },
        { id: 'p5', url: 'https://i.ibb.co/JRngLzcJ/T-p-hu-n-SGK-2.jpg', title: 'Tâp huấn SGK', desc: 'Tập hấn bộ sách thống nhất toàn quốc', category: 'hoatdong' },
        { id: 'p6', url: 'https://i.ibb.co/p6xX1Ljk/TH-SGK.jpg', title: 'Tâp huấn SGK', desc: 'Tập hấn bộ sách thống nhất toàn quốc', category: 'hoatdong' },
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
        { id: 'cm20', title: 'Đề thi học kỳ 1 - Tin học 3', desc: 'Năm học 2024-2025', url: '#', category: 'dethi', type: 'pdf' },
        { id: 'cm21', title: 'Đề thi học kỳ 2 - Tin học 4', desc: 'Năm học 2024-2025', url: '#', category: 'dethi', type: 'pdf' },
        { id: 'cm22', title: 'Sáng kiến kinh nghiệm: Ứng dụng CNTT trong dạy học', desc: 'Giải A cấp huyện', url: '#', category: 'sangkien', type: 'pdf' },
        { id: 'cm23', title: 'Sáng kiến: Học mà chơi - Trò chơi ô chữ Tin học', desc: 'Áp dụng cho lớp 3,4', url: '#', category: 'sangkien', type: 'pdf' },
        { id: 'cm24', title: 'Phân công chuyên môn', desc: 'Lịch tập huấn SGK', url: 'https://drive.google.com/file/d/1-gMag7o8Esq4gIFwAQAt9OjkzctNANK2/view?usp=sharing', category: 'phancongchuyenmon', type: 'pdf' },
        { id: 'cm25', title: 'Tài liệu chuyên môn', desc: 'Tài liệu tham khảo', url: '#', category: 'tailieu', type: 'pdf' },
    ],
    ungdung: [
        { id: 'ex1', title: 'Phần mềm Kế hoạch giáo dục - Lịch báo giảng tự động', desc: 'App web tự động tính lịch theo tuần', preview: 'https://vothanhdamkg1982-lang.github.io/Ke-Hoach-Giao-Duc-1.4-CTGDPT-2018-Tieu-hoc/', download: 'https://vothanhdamkg1982-lang.github.io/Ke-Hoach-Giao-Duc-1.4-CTGDPT-2018-Tieu-hoc/', category: 'ungdung', type: 'App web' },
        { id: 'ex2', title: 'Hệ thống lương HCSN', desc: 'Tổng hợp phiếu bầu tự động', preview: 'https://vothanhdamkg1982-lang.github.io/He-Thong-Luong-HCSN', download: 'https://vothanhdamkg1982-lang.github.io/He-Thong-Luong-HCSN', category: 'ungdung', type: 'App web' },
        { id: 'ex3', title: 'Phần mềm quản lý HS', desc: 'Tính lương, bảo hiểm, thuế', preview: 'https://vothanhdamkg1982-lang.github.io/Phan-Mem-Quan-Ly-HS/', download: 'https://vothanhdamkg1982-lang.github.io/Phan-Mem-Quan-Ly-HS/', category: 'ungdung', type: 'App web' },
        { id: 'ex4', title: 'Phần mềm Tính lương trực tuyến', desc: 'Tính lương, bảo hiểm, thuế', preview: 'https://vothanhdamkg1982-lang.github.io/BANG-TINH-LUONG-TRUC-TUYEN/', download: 'https://vothanhdamkg1982-lang.github.io/BANG-TINH-LUONG-TRUC-TUYEN/', category: 'ungdung', type: 'App web' },
        { id: 'ex5', title: 'Phần mềm Kiểm phiếu', desc: 'Kiểm phiếu nhanh,tự động, chính xác', preview: 'https://vothanhdamkg1982-lang.github.io/Phan-mem-kiem-phieu-nhanh/', download: 'https://vothanhdamkg1982-lang.github.io/Phan-mem-kiem-phieu-nhanh/', category: 'ungdung', type: 'App web' },
        { id: 'ex6', title: 'Phần mềm Tính tiền điện sinh hoạt', desc: 'Tính tiền điện sinh hoạt nhanh,tự động, chính xác', preview: 'https://vothanhdamkg1982-lang.github.io/T-nh-Nhanh-Tien-DIen-SH/', download: 'https://vothanhdamkg1982-lang.github.io/T-nh-Nhanh-Tien-DIen-SH/', category: 'ungdung', type: 'App web' },
        { id: 'ex7', title: 'Phần mềm Cập nhật ngày giáo án', desc: 'Tự động dịch chuyển toàn bộ ngày tháng trong file Word, giữ nguyên 100% định dạng', preview: 'https://vothanhdamkg1982-lang.github.io/Cap-Nhat-Ngay-Giao-An/', download: 'https://vothanhdamkg1982-lang.github.io/Cap-Nhat-Ngay-Giao-An/', category: 'ungdung', type: 'App web' },
        { id: 'ex8', title: 'Phần mềm Theo Dõi Tính Lãi Suất Ngân Hàng', desc: 'Tự động theo dõi lãi suất ngân hàng, tính toán lãi suất tiết kiệm, vay vốn', preview: 'https://vothanhdamkg1982-lang.github.io/Phan-Mem-THeo-Doi-Tinh-Lai-Suat-Ngan-Hang/', download: 'https://vothanhdamkg1982-lang.github.io/Phan-Mem-THeo-Doi-Tinh-Lai-Suat-Ngan-Hang/', category: 'ungdung', type: 'App web' }
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
    ]
};

// ---------- BIẾN TOÀN CỤC ----------
let data = {};
const STORAGE_KEY = 'teacherData';
let PHOTOS = [], VIDEOS = [], DOCUMENTS = [], CHUYENMON = [], UNGDUNG = [], LINKS = [];

// ---------- HÀM LƯU / TẢI DỮ LIỆU ----------
function loadData() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            data = JSON.parse(stored);
            for (let key in DEFAULT_DATA) {
                if (!data[key]) data[key] = DEFAULT_DATA[key];
            }
        } catch(e) {
            data = JSON.parse(JSON.stringify(DEFAULT_DATA));
        }
    } else {
        data = JSON.parse(JSON.stringify(DEFAULT_DATA));
    }
    PHOTOS = data.photos;
    VIDEOS = data.videos;
    DOCUMENTS = data.documents;
    CHUYENMON = data.chuyenmon;
    UNGDUNG = data.ungdung;
    LINKS = data.links;
}

function saveData() {
    data.photos = PHOTOS;
    data.videos = VIDEOS;
    data.documents = DOCUMENTS;
    data.chuyenmon = CHUYENMON;
    data.ungdung = UNGDUNG;
    data.links = LINKS;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    updateBadges();
}

// ---------- CÁC HÀM QUẢN LÝ ITEM ----------
function addItem(arrayKey, newItem) {
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
    if (arrayKey === 'ungdung' || arrayKey === 'links') {
        renderUngDungAndLinks();
    } else {
        renderSection(arrayKey);
    }
}

function removeItem(arrayKey, id) {
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
    const index = arr.findIndex(item => item.id === id);
    if (index !== -1) {
        arr.splice(index, 1);
        saveData();
        if (arrayKey === 'ungdung' || arrayKey === 'links') {
            renderUngDungAndLinks();
        } else {
            renderSection(arrayKey);
        }
    }
}

// ---------- RENDER THEO SECTION ----------
function renderSection(key) {
    let barId;
    switch(key) {
        case 'photos': barId = 'photoFilterBar'; break;
        case 'videos': barId = 'videoFilterBar'; break;
        case 'documents': barId = 'docFilterBar'; break;
        case 'chuyenmon': barId = 'chuyenmonFilterBar'; break;
        case 'ungdung': 
            renderUngDungAndLinks();
            return;
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

// ---------- BANNER SLIDER ----------
let currentSlide = 0;
let slideInterval;

function renderBanner() {
    const wrapper = document.getElementById('bannerSlidesWrapper');
    const dotsContainer = document.getElementById('bannerDots');
    const SLIDES = [
        {
            title: 'Võ Thanh Đậm',
            desc: 'Giáo viên Tin học • Trường Tiểu học Trần Quốc Toản',
            btnText: 'Tìm hiểu thêm',
            btnLink: '#section-teacher',
            bg: 'https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=1600&q=80',
            avatar: 'https://i.ibb.co/GQywpxZS/IMG-0030.jpg'
        },
        {
            title: 'Công nghệ trong giáo dục',
            desc: 'Ứng dụng CNTT để nâng cao chất lượng dạy và học',
            btnText: 'Xem kho ảnh',
            btnLink: '#section-photos',
            bg: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1600&q=80',
            avatar: null
        },
        {
            title: 'Phần mềm hỗ trợ giảng dạy',
            desc: 'Các công cụ giúp giáo viên quản lý và soạn bài hiệu quả',
            btnText: 'Khám phá',
            btnLink: '#section-ungdung',
            bg: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&q=80',
            avatar: null
        },
        {
            title: 'Liên kết hữu ích',
            desc: 'Kết nối với các nền tảng giáo dục và tài nguyên trực tuyến',
            btnText: 'Xem ngay',
            btnLink: '#section-ungdung',
            bg: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&q=80',
            avatar: null
        }
    ];
    wrapper.innerHTML = SLIDES.map((slide, index) => {
        let avatarHtml = '';
        if (slide.avatar) {
            avatarHtml = `<div class="banner-avatar"><img src="${slide.avatar}" alt="Võ Thanh Đậm" /></div>`;
        }
        return `
            <div class="banner-slide ${index === 0 ? 'active' : ''}" 
                 style="background-image: url('${slide.bg}');" 
                 data-index="${index}">
                <div class="banner-content">
                    ${avatarHtml}
                    <h1>${slide.title}</h1>
                    <p>${slide.desc}</p>
                    <a href="${slide.btnLink}" class="btn-banner" onclick="switchSection('${slide.btnLink.replace('#section-', '')}')">${slide.btnText}</a>
                </div>
            </div>
        `;
    }).join('');
    dotsContainer.innerHTML = SLIDES.map((_, index) => `
        <span class="banner-dot ${index === 0 ? 'active' : ''}" data-index="${index}"></span>
    `).join('');
    document.querySelectorAll('.banner-dot').forEach(dot => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            goToSlide(index);
        });
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
    slideInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
    }, 5000);
}
function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
}

// ---------- CHUYỂN SECTION ----------
function switchSection(sectionId) {
    document.querySelectorAll('.section').forEach(el => el.classList.remove('active'));
    const target = document.getElementById('section-' + sectionId);
    if (target) target.classList.add('active');
    document.querySelectorAll('.sidebar-nav button').forEach(btn => btn.classList.remove('active'));
    const btn = document.querySelector(`.sidebar-nav button[data-section="${sectionId}"]`);
    if (btn) btn.classList.add('active');
    renderSection(sectionId);
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

// ---------- LẤY FAVICON ----------
function getFaviconUrl(link) {
    const url = link.url || '';
    try {
        const domain = new URL(url).hostname;
        return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
    } catch {
        return '';
    }
}

// ---------- RENDER ẢNH ----------
function renderPhotos(filter = 'all') {
    const grid = document.getElementById('photoGrid');
    let items = PHOTOS;
    if (filter !== 'all') items = items.filter(p => p.category === filter);
    if (!items.length) {
        grid.innerHTML = `<div class="empty-state"><i class="fas fa-images"></i><p>Không có ảnh nào trong danh mục này.</p></div>`;
        return;
    }
    grid.innerHTML = items.map(p => `
        <div class="gallery-item" data-id="${p.id}">
            <img src="${p.url}" alt="${p.title || 'Ảnh'}" loading="lazy" />
            <div class="gallery-body">
                <h4>${p.title || 'Không có tiêu đề'}</h4>
                <p>${p.desc || ''}</p>
                <div class="actions">
                    <a href="${p.url}" target="_blank" rel="noopener"><i class="fas fa-eye"></i> Xem</a>
                    <a href="${p.url}" download="${p.title || 'anh'}.jpg"><i class="fas fa-download"></i> Tải</a>
                    <button class="btn-delete" data-key="photos" data-id="${p.id}"><i class="fas fa-trash"></i> Xóa</button>
                </div>
            </div>
        </div>
    `).join('');
    document.querySelectorAll('#photoGrid .gallery-item img').forEach(img => {
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            const item = this.closest('.gallery-item');
            const id = item.dataset.id;
            const photo = PHOTOS.find(p => p.id === id);
            if (photo) openLightbox(photo.url, photo.title || '');
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

// ---------- RENDER VIDEO ----------
function renderVideos(filter = 'all') {
    const grid = document.getElementById('videoGrid');
    let items = VIDEOS;
    if (filter !== 'all') items = items.filter(v => v.category === filter);
    if (!items.length) {
        grid.innerHTML = `<div class="empty-state"><i class="fas fa-video"></i><p>Không có video nào trong danh mục này.</p></div>`;
        return;
    }
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
                        <button class="btn-delete" data-key="videos" data-id="${v.id}"><i class="fas fa-trash"></i> Xóa</button>
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

// ---------- RENDER TÀI LIỆU ----------
function renderDocuments(filter = 'all') {
    const list = document.getElementById('docList');
    let items = DOCUMENTS;
    if (filter !== 'all') items = items.filter(d => d.category === filter);
    if (!items.length) {
        list.innerHTML = `<div class="empty-state"><i class="fas fa-folder-open"></i><p>Không có tài liệu nào trong danh mục này.</p></div>`;
        return;
    }
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
                <button class="btn-delete" data-key="documents" data-id="${d.id}"><i class="fas fa-trash"></i> Xóa</button>
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

// ---------- RENDER CHUYÊN MÔN ----------
function renderChuyenMon(filter = 'all') {
    const list = document.getElementById('chuyenmonList');
    let items = CHUYENMON;
    if (filter !== 'all') items = items.filter(c => c.category === filter);
    if (!items.length) {
        list.innerHTML = `<div class="empty-state"><i class="fas fa-folder"></i><p>Không có tài liệu chuyên môn nào trong danh mục này.</p></div>`;
        return;
    }
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
                    <button class="btn-delete" data-key="chuyenmon" data-id="${c.id}"><i class="fas fa-trash"></i> Xóa</button>
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

// ---------- RENDER ỨNG DỤNG ----------
function renderUngDungApp(filter = 'all') {
    const list = document.getElementById('ungdungList');
    let items = UNGDUNG;
    if (filter !== 'all') items = items.filter(u => u.category === filter);
    if (!items.length) {
        list.innerHTML = `<div class="empty-state"><i class="fas fa-file-excel"></i><p>Không có ứng dụng nào.</p></div>`;
        return;
    }
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
                    <button class="btn-delete" data-key="ungdung" data-id="${u.id}"><i class="fas fa-trash"></i> Xóa</button>
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

// ---------- RENDER LIÊN KẾT ----------
function renderLinksInUngdung() {
    const grid = document.getElementById('linksGridInUngdung');
    if (!grid) return;
    if (!LINKS || !LINKS.length) {
        grid.innerHTML = `<div class="empty-state"><i class="fas fa-link"></i><p>Chưa có liên kết nào.</p></div>`;
        return;
    }
    grid.innerHTML = LINKS.map(link => {
        const favicon = getFaviconUrl(link);
        const iconHtml = favicon 
            ? `<img src="${favicon}" alt="favicon" class="favicon-icon" onerror="this.style.display='none'" />`
            : `<i class="fas fa-link" style="color: var(--accent);"></i>`;
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
                    <button class="btn-delete" data-key="links" data-id="${link.id}"><i class="fas fa-trash"></i> Xóa</button>
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

// ---------- RENDER GỘP ----------
function renderUngDungAndLinks() {
    const filter = getActiveFilter('ungdungFilterBar') || 'all';
    renderUngDungApp(filter);
    renderLinksInUngdung();
}

// ---------- HELPER: embed URL ----------
function getEmbedUrl(url) {
    if (!url) return 'about:blank';
    let match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
    if (match) return `https://www.youtube.com/embed/${match[1]}`;
    match = url.match(/vimeo\.com\/(\d+)/);
    if (match) return `https://player.vimeo.com/video/${match[1]}`;
    if (url.includes('embed')) return url;
    return url;
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
lightbox.addEventListener('click', function(e) {
    if (e.target === this) closeLightbox();
});
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeLightbox();
});

// ---------- FILTER BUTTONS ----------
document.querySelectorAll('.filter-bar').forEach(bar => {
    bar.addEventListener('click', function(e) {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;
        this.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const section = this.closest('.section');
        if (!section) return;
        const sectionId = section.id.replace('section-', '');
        if (sectionId === 'ungdung') {
            renderUngDungAndLinks();
        } else {
            renderSection(sectionId);
        }
    });
});

// ---------- NAVIGATION EVENTS ----------
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

function openUploadModal(type) {
    uploadType.value = type;
    modalTitle.innerHTML = `<i class="fas fa-upload"></i> Thêm mới ${getTypeLabel(type)}`;
    const categories = getCategories(type);
    uploadCategory.innerHTML = '<option value="all">Tất cả</option>';
    categories.forEach(cat => {
        uploadCategory.innerHTML += `<option value="${cat}">${cat}</option>`;
    });
    if (type === 'photo') {
        uploadFile.accept = 'image/*';
        fileAcceptHint.textContent = 'Hỗ trợ: ảnh (jpg, png, gif, svg...)';
        uploadUrl.placeholder = 'https://example.com/hinh-anh.jpg';
    } else if (type === 'video') {
        uploadFile.accept = 'video/*';
        fileAcceptHint.textContent = 'Hỗ trợ: video (mp4, webm...) hoặc nhập URL YouTube/Vimeo';
        uploadUrl.placeholder = 'https://www.youtube.com/watch?v=...';
    } else if (type === 'document' || type === 'chuyenmon') {
        uploadFile.accept = '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx';
        fileAcceptHint.textContent = 'Hỗ trợ: PDF, Word, Excel, PowerPoint';
        uploadUrl.placeholder = 'https://drive.google.com/file/d/...';
    } else if (type === 'ungdung') {
        uploadFile.accept = '.xls,.xlsx';
        fileAcceptHint.textContent = 'Hỗ trợ: file Excel (.xls, .xlsx)';
        uploadUrl.placeholder = 'https://docs.google.com/spreadsheets/...';
    } else if (type === 'link') {
        uploadFile.accept = '';
        fileAcceptHint.textContent = 'Nhập URL và tiêu đề';
        uploadUrl.placeholder = 'https://example.com';
    } else {
        uploadFile.accept = '*/*';
        fileAcceptHint.textContent = 'Chọn file hoặc nhập URL';
        uploadUrl.placeholder = 'https://...';
    }
    uploadForm.reset();
    uploadUrl.value = '';
    uploadFile.value = '';
    modal.classList.add('active');
}

function closeModal() {
    modal.classList.remove('active');
}
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});

uploadForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const type = uploadType.value;
    const title = document.getElementById('uploadTitle').value.trim();
    const desc = document.getElementById('uploadDesc').value.trim();
    const category = uploadCategory.value === 'all' ? '' : uploadCategory.value;
    const url = uploadUrl.value.trim();
    const file = uploadFile.files[0];

    if (!title) {
        alert('Vui lòng nhập tiêu đề.');
        return;
    }

    const processItem = (urlOrBase64) => {
        let newItem;
        if (type === 'photo') {
            newItem = { url: urlOrBase64, title, desc, category };
        } else if (type === 'video') {
            newItem = { url: urlOrBase64, title, desc, category };
        } else if (type === 'document') {
            newItem = { url: urlOrBase64, title, desc, category, type: 'pdf' };
        } else if (type === 'chuyenmon') {
            let t = 'pdf';
            if (urlOrBase64.startsWith('data:application/vnd.openxmlformats-officedocument.wordprocessingml.document')) t = 'docx';
            else if (urlOrBase64.startsWith('data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) t = 'xlsx';
            newItem = { url: urlOrBase64, title, desc, category, type: t };
        } else if (type === 'ungdung') {
            newItem = { preview: urlOrBase64, download: urlOrBase64, title, desc, category, type: 'xlsx' };
        } else if (type === 'link') {
            newItem = { title, desc, url: urlOrBase64 };
        }
        let key = type + 's';
        if (type === 'ungdung') key = 'ungdung';
        addItem(key, newItem);
        closeModal();
        if (key === 'ungdung' || key === 'links') {
            renderUngDungAndLinks();
        } else {
            renderSection(key);
        }
    };

    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            processItem(event.target.result);
        };
        reader.readAsDataURL(file);
    } else if (url) {
        processItem(url);
    } else {
        alert('Vui lòng nhập URL hoặc chọn file.');
    }
});

function getTypeLabel(type) {
    const map = {
        'photo': 'Ảnh',
        'video': 'Video',
        'document': 'Tài liệu',
        'chuyenmon': 'Chuyên môn',
        'ungdung': 'Ứng dụng',
        'link': 'Liên kết'
    };
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
    btn.addEventListener('click', function() {
        const type = this.dataset.type;
        openUploadModal(type);
    });
});

// ---------- XUẤT / NHẬP JSON ----------
function exportJSON() {
    const json = JSON.stringify(data, null, 2);
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
                for (let key in DEFAULT_DATA) {
                    if (imported[key]) {
                        data[key] = imported[key];
                    }
                }
                PHOTOS = data.photos;
                VIDEOS = data.videos;
                DOCUMENTS = data.documents;
                CHUYENMON = data.chuyenmon;
                UNGDUNG = data.ungdung;
                LINKS = data.links;
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

// ============================================================
// TÌM KIẾM
// ============================================================
function performSearch() {
    const input = document.getElementById('searchInput');
    const query = input.value.trim().toLowerCase();
    if (!query) {
        alert('Vui lòng nhập từ khóa tìm kiếm.');
        return;
    }

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
            const typeLabel = {
                photo: 'Ảnh',
                video: 'Video',
                document: 'Tài liệu',
                chuyenmon: 'Chuyên môn',
                ungdung: 'Ứng dụng',
                link: 'Liên kết'
            }[type] || type;

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

// ============================================================
// MODAL ĐĂNG NHẬP / ĐĂNG KÝ
// ============================================================
function openLoginModal() {
    document.getElementById('loginModal').classList.add('active');
}
function closeLoginModal() {
    document.getElementById('loginModal').classList.remove('active');
}
function openRegisterModal() {
    document.getElementById('registerModal').classList.add('active');
}
function closeRegisterModal() {
    document.getElementById('registerModal').classList.remove('active');
}

document.getElementById('loginBtn').addEventListener('click', openLoginModal);
document.getElementById('registerBtn').addEventListener('click', openRegisterModal);
document.getElementById('loginModalClose').addEventListener('click', closeLoginModal);
document.getElementById('registerModalClose').addEventListener('click', closeRegisterModal);
document.getElementById('loginModal').addEventListener('click', function(e) {
    if (e.target === this) closeLoginModal();
});
document.getElementById('registerModal').addEventListener('click', function(e) {
    if (e.target === this) closeRegisterModal();
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Chức năng đăng nhập đang được phát triển.\nTài khoản demo: admin / 123456');
    closeLoginModal();
});
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Đăng ký thành công! (chức năng demo)');
    closeRegisterModal();
});

// ============================================================
// SỰ KIỆN TÌM KIẾM
// ============================================================
document.getElementById('searchBtn').addEventListener('click', performSearch);
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') performSearch();
});

// ============================================================
// TÍNH LƯƠNG
// ============================================================
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

    const formatNum = (v, d = 4) => Number(v).toFixed(d);
    const formatCurrency = (v) => Math.round(v).toLocaleString('vi-VN');

    document.getElementById('kqUuDai').textContent = formatNum(uuDai);
    document.getElementById('kqThamNien').textContent = formatNum(thamNien);
    document.getElementById('kqDacBiet').textContent = formatNum(dacBiet);
    document.getElementById('kqTongHeSo').textContent = formatNum(tongHeSo, 4);
    document.getElementById('kqLuongThang').textContent = formatCurrency(luongThang) + ' ₫';
    document.getElementById('kqBHXH').textContent = formatCurrency(bhxh) + ' ₫';
    document.getElementById('kqBHYT').textContent = formatCurrency(bhyt) + ' ₫';
    document.getElementById('kqBHTN').textContent = formatCurrency(bhtn) + ' ₫';
    document.getElementById('kqTongTru').textContent = formatCurrency(tongTru) + ' ₫';
    document.getElementById('kqThucLanh').textContent = formatCurrency(thucLanh) + ' ₫';

    document.getElementById('sumHeSo').textContent = formatNum(tongHeSo, 4);
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
    renderPhotos('all');
    renderVideos('all');
    renderDocuments('all');
    renderChuyenMon('all');
    renderUngDungAndLinks();
    updateBadges();
    switchSection('home');
    initSalaryCalculator();
    console.log('✅ Website đã sẵn sàng với đầy đủ tính năng!');
});