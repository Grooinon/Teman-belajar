/**
 * TemanBelajar Demo Data Store & LocalStorage Manager
 * Provides initial state for users, tutors, subjects, programs, sessions, reviews, notifications.
 */

const TB_STORAGE_KEY = 'tb_demo_database_v3';
const TB_CURRENT_ROLE_KEY = 'tb_demo_active_role';

const INITIAL_TB_DATA = {
    studyPrograms: [
        { id: 1, code: 'SI', name: 'Sistem Informasi', faculty: 'Fakultas Ilmu Komputer' },
        { id: 2, code: 'TI', name: 'Teknik Informatika', faculty: 'Fakultas Ilmu Komputer' },
        { id: 3, code: 'BD', name: 'Bisnis Digital', faculty: 'Fakultas Ekonomi dan Bisnis' },
        { id: 4, code: 'MI', name: 'Manajemen Informatika', faculty: 'Fakultas Ilmu Komputer' },
        { id: 5, code: 'SK', name: 'Sistem Komputer', faculty: 'Fakultas Teknik' }
    ],

    studySubjects: [
        { id: 1, program_id: 1, code: 'SI101', name: 'Algoritma & Pemrograman', semester: 1, desc: 'Konsep dasar algoritma, percabangan, fungsi, dan array.' },
        { id: 2, program_id: 1, code: 'SI201', name: 'Struktur Data & Algoritma', semester: 2, desc: 'Array dinamis, Linked List, Stack, Queue, Tree & Graph.' },
        { id: 3, program_id: 1, code: 'SI301', name: 'Basis Data & SQL', semester: 3, desc: 'Perancangan ERD, normalisasi relasi 1NF-3NF, DDL & SQL JOIN.' },
        { id: 4, program_id: 1, code: 'SI302', name: 'Pemrograman Web I', semester: 3, desc: 'Desain web front-end modern, HTML5, CSS3, JavaScript, dan Bootstrap.' },
        { id: 5, program_id: 1, code: 'SI401', name: 'Pemrograman Web Lanjut (PHP MVC)', semester: 4, desc: 'Arsitektur web MVC, sanitasi formulir, PDO prepared statements, dan REST API.' },
        { id: 6, program_id: 1, code: 'SI402', name: 'Analisis & Perancangan Sistem', semester: 4, desc: 'Pemodelan proses bisnis, UML Use Case, Sequence Diagram, dan SRS.' },
        { id: 7, program_id: 2, code: 'TI202', name: 'Matematika Diskrit', semester: 2, desc: 'Logika proposisi, teori himpunan, pembuktian induksi, dan graf.' },
        { id: 8, program_id: 2, code: 'TI303', name: 'Jaringan Komputer', semester: 3, desc: 'Topologi, protokol TCP/IP, subnetting VLSM, routing dan Cisco Packet Tracer.' },
        { id: 9, program_id: 2, code: 'TI403', name: 'Kecerdasan Buatan (AI)', semester: 4, desc: 'Machine Learning, klasifikasi Decision Tree, KNN, dan visualisasi data Python.' },
        { id: 10, program_id: 3, code: 'BD201', name: 'Statistika Bisnis', semester: 2, desc: 'Pengolahan data kuantitatif, analisis regresi linier, dan pengujian hipotesis.' }
    ],

    users: [
        {
            id: 1,
            role: 'admin',
            is_tutor: false,
            full_name: 'Admin Akademik TB',
            email: 'admin@temanbelajar.ac.id',
            nim: 'ADMIN001',
            program_id: 1,
            program_name: 'Sistem Informasi',
            graduation_year: 2020,
            phone: '081234567890',
            avatar: null,
            is_active: 1
        },
        {
            id: 2,
            role: 'student',
            is_tutor: true,
            tutor_profile_id: 1,
            full_name: 'Bintang Pratama',
            email: 'bintang@temanbelajar.ac.id',
            nim: '21051214001',
            program_id: 1,
            program_name: 'Sistem Informasi',
            graduation_year: 2021,
            phone: '081211112222',
            avatar: null,
            is_active: 1
        },
        {
            id: 3,
            role: 'student',
            is_tutor: true,
            tutor_profile_id: 2,
            full_name: 'Sihabudin',
            email: 'sihabudin@temanbelajar.ac.id',
            nim: '21051214002',
            program_id: 1,
            program_name: 'Sistem Informasi',
            graduation_year: 2021,
            phone: '081222223333',
            avatar: null,
            is_active: 1
        },
        {
            id: 4,
            role: 'student',
            is_tutor: true,
            tutor_profile_id: 3,
            full_name: 'Rian Hidayat',
            email: 'rian@temanbelajar.ac.id',
            nim: '20051214003',
            program_id: 2,
            program_name: 'Teknik Informatika',
            graduation_year: 2020,
            phone: '081233334444',
            avatar: null,
            is_active: 1
        },
        {
            id: 5,
            role: 'student',
            is_tutor: false,
            full_name: 'Ananda Putra Utama',
            email: 'ananda@temanbelajar.ac.id',
            nim: '20240050086',
            program_id: 1,
            program_name: 'Sistem Informasi',
            graduation_year: 2024,
            phone: '081244445555',
            avatar: null,
            is_active: 1
        },
        {
            id: 6,
            role: 'student',
            is_tutor: false,
            full_name: 'Fajar Nugroho',
            email: 'fajar@temanbelajar.ac.id',
            nim: '23051214011',
            program_id: 2,
            program_name: 'Teknik Informatika',
            graduation_year: 2023,
            phone: '081255556666',
            avatar: null,
            is_active: 1
        }
    ],

    tutors: [
        {
            id: 1,
            user_id: 2,
            full_name: 'Bintang Pratama',
            nim: '21051214001',
            program_id: 1,
            program_name: 'Sistem Informasi',
            graduation_year: 2021,
            headline: 'Tutor Pemrograman Web & Struktur Data (IPK 3.88)',
            bio: 'Halo! Saya Bintang. Saya suka membantu teman-teman yang merasa kesulitan memahami logika coding dan arsitektur web MVC. Pendekatan belajar saya santai, berbasis praktek langsung, dan studi kasus nyata.',
            academic_achievements: '• IPK 3.88\n• Asisten Dosen Praktikum Pemrograman Web 2023\n• Finalis Gemastik Divisi Software Development',
            teaching_experience: 'Pengalaman 2 tahun menjadi tutor sebaya dan mentor praktikum di laboratorium Fasilkom.',
            preferred_method: 'both', // 'online', 'offline', 'both'
            hourly_rate: 0,
            is_free: 1,
            is_available: 1,
            is_verified: 1,
            avg_rating: 4.9,
            review_count: 18,
            completed_sessions_count: 24,
            subjects: [
                { subject_id: 4, name: 'Pemrograman Web I', code: 'SI302', grade: 'A', notes: 'Slicing HTML5/CSS3 responsif, Javascript DOM, dan Bootstrap 5.' },
                { subject_id: 5, name: 'Pemrograman Web Lanjut (PHP MVC)', code: 'SI401', grade: 'A', notes: 'Arsitektur native MVC, session auth, dan database PDO.' },
                { subject_id: 1, name: 'Algoritma & Pemrograman', code: 'SI101', grade: 'A', notes: 'Logika percabangan, perulangan, array, dan fungsi modular.' },
                { subject_id: 2, name: 'Struktur Data & Algoritma', code: 'SI201', grade: 'A', notes: 'Linked list, stack, queue, dan algoritma rekursif.' }
            ],
            availability: [
                { day: 'Senin', start: '15:30', end: '18:00' },
                { day: 'Rabu', start: '16:00', end: '19:00' },
                { day: 'Jumat', start: '13:30', end: '17:00' },
                { day: 'Sabtu', start: '09:00', end: '15:00' }
            ]
        },
        {
            id: 2,
            user_id: 3,
            full_name: 'Sihabudin',
            nim: '21051214002',
            program_id: 1,
            program_name: 'Sistem Informasi',
            graduation_year: 2021,
            headline: 'Tutor Basis Data & Analisis Perancangan Sistem (IPK 3.92)',
            bio: 'Hai! Saya Sihabudin (Kak Ihab). Basis data dan perancangan sistem seringkali terlihat abstrak. Bersama saya, kita akan membedah ERD, normalisasi 1NF-3NF, dan kueri SQL langkah demi langkah sampai paham tuntas!',
            academic_achievements: '• IPK 3.92\n• Mahasiswa Berprestasi Jurusan Sistem Informasi 2023\n• Sertifikasi Associate Database Administrator',
            teaching_experience: '1.5 tahun mendampingi 30+ mahasiswa tingkat awal dalam penyusunan tugas besar basis data.',
            preferred_method: 'both',
            hourly_rate: 0,
            is_free: 1,
            is_available: 1,
            is_verified: 1,
            avg_rating: 5.0,
            review_count: 24,
            completed_sessions_count: 31,
            subjects: [
                { subject_id: 3, name: 'Basis Data & SQL', code: 'SI301', grade: 'A', notes: 'Spesialis pemodelan ERD, normalisasi relasi, JOIN dan Subquery kompleks.' },
                { subject_id: 6, name: 'Analisis & Perancangan Sistem', code: 'SI402', grade: 'A', notes: 'Penyusunan use case diagram, sequence diagram, activity diagram, dan dokumen SRS.' }
            ],
            availability: [
                { day: 'Selasa', start: '14:00', end: '17:30' },
                { day: 'Kamis', start: '15:00', end: '18:00' },
                { day: 'Sabtu', start: '10:00', end: '14:00' }
            ]
        },
        {
            id: 3,
            user_id: 4,
            full_name: 'Rian Hidayat',
            nim: '20051214003',
            program_id: 2,
            program_name: 'Teknik Informatika',
            graduation_year: 2020,
            headline: 'Tutor Jaringan Komputer, Matematika Diskrit & AI (IPK 3.79)',
            bio: 'Halo rekan-rekan! Saya Rian. Menghadapi subnetting, graf diskrit, atau implementasi model AI? Jangan ragu belajar bersama. Saya akan jelaskan konsep rumit menjadi analogi yang mudah dicerna.',
            academic_achievements: '• IPK 3.79\n• Juara 2 Networking Skills Competition Nasional 2023\n• Certified Network Associate',
            teaching_experience: 'Tutor privat sebaya sejak 2022 untuk mata kuliah komputasi dan jaringan.',
            preferred_method: 'online',
            hourly_rate: 25000,
            is_free: 0,
            is_available: 1,
            is_verified: 1,
            avg_rating: 4.8,
            review_count: 15,
            completed_sessions_count: 19,
            subjects: [
                { subject_id: 8, name: 'Jaringan Komputer', code: 'TI303', grade: 'A', notes: 'Subnetting VLSM, routing static/OSPF, dan simulasi topologi Cisco Packet Tracer.' },
                { subject_id: 7, name: 'Matematika Diskrit', code: 'TI202', grade: 'A', notes: 'Pembuktian matematis, relasi ekuivalen, aljabar boolean, dan teori graf.' },
                { subject_id: 9, name: 'Kecerdasan Buatan (AI)', code: 'TI403', grade: 'A', notes: 'Dasar machine learning, klasifikasi data, dan implementasi algoritma Python.' }
            ],
            availability: [
                { day: 'Senin', start: '19:00', end: '21:00' },
                { day: 'Rabu', start: '19:00', end: '21:30' },
                { day: 'Minggu', start: '09:00', end: '12:00' }
            ]
        }
    ],

    sessions: [
        {
            id: 1,
            session_code: 'SES-20261018-001',
            student_id: 5, // Ananda Putra Utama
            student_name: 'Ananda Putra Utama',
            tutor_id: 2, // Bintang Pratama
            tutor_name: 'Bintang Pratama',
            subject_id: 4,
            subject_name: 'Pemrograman Web I',
            subject_code: 'SI302',
            session_date: '2026-10-18',
            start_time: '16:00',
            end_time: '17:30',
            duration_minutes: 90,
            learning_method: 'online',
            location_or_link: 'https://meet.google.com/tb-web-study',
            notes: 'Membahas slicing form validasi dan manipulasi DOM JavaScript untuk tugas besar.',
            status: 'accepted', // pending, accepted, completed, rejected, cancelled
            rejection_reason: null,
            created_at: '2026-10-15 10:20:00'
        },
        {
            id: 2,
            session_code: 'SES-20261019-002',
            student_id: 6, // Fajar Nugroho
            student_name: 'Fajar Nugroho',
            tutor_id: 4, // Rian Hidayat
            tutor_name: 'Rian Hidayat',
            subject_id: 8,
            subject_name: 'Jaringan Komputer',
            subject_code: 'TI303',
            session_date: '2026-10-19',
            start_time: '19:00',
            end_time: '20:30',
            duration_minutes: 90,
            learning_method: 'online',
            location_or_link: 'Google Meet (Tautan akan dibagikan)',
            notes: 'Persiapan kuis subnetting VLSM dan konfigurasi routing OSPF di Packet Tracer.',
            status: 'pending',
            rejection_reason: null,
            created_at: '2026-10-16 09:15:00'
        },
        {
            id: 3,
            session_code: 'SES-20261014-003',
            student_id: 5, // Ananda Putra Utama
            student_name: 'Ananda Putra Utama',
            tutor_id: 3, // Sihabudin
            tutor_name: 'Sihabudin',
            subject_id: 3,
            subject_name: 'Basis Data & SQL',
            subject_code: 'SI301',
            session_date: '2026-10-14',
            start_time: '14:00',
            end_time: '15:30',
            duration_minutes: 90,
            learning_method: 'offline',
            location_or_link: 'Perpustakaan Lt. 2 Ruang Diskusi 4',
            notes: 'Bedah normalisasi tabel 1NF hingga 3NF dan perancangan relasi foreign key.',
            status: 'completed',
            rejection_reason: null,
            created_at: '2026-10-12 14:00:00',
            review: {
                rating: 5,
                comment: 'Penjelasan Kak Ihab sangat jelas dan sistematis! ERD yang tadinya rumit langsung mudah dipahami dalam 90 menit bimbingan.',
                created_at: '2026-10-14 16:10:00'
            }
        }
    ],

    reviews: [
        {
            id: 1,
            session_id: 3,
            student_id: 5,
            student_name: 'Ananda Putra Utama',
            tutor_id: 3,
            tutor_name: 'Sihabudin',
            subject_name: 'Basis Data & SQL',
            rating: 5,
            comment: 'Penjelasan Kak Ihab sangat jelas dan sistematis! ERD yang tadinya rumit langsung mudah dipahami dalam 90 menit bimbingan.',
            is_visible: 1,
            created_at: '2026-10-14 16:10:00'
        },
        {
            id: 2,
            session_id: 4,
            student_id: 6,
            student_name: 'Fajar Nugroho',
            tutor_id: 2,
            tutor_name: 'Bintang Pratama',
            subject_name: 'Pemrograman Web I',
            rating: 5,
            comment: 'Kak Bintang sangat sabar menjelaskan arsitektur grid CSS dan event listener Javascript. Tugas selesai tepat waktu!',
            is_visible: 1,
            created_at: '2026-10-10 18:30:00'
        },
        {
            id: 3,
            session_id: 5,
            student_id: 5,
            student_name: 'Ananda Putra Utama',
            tutor_id: 4,
            tutor_name: 'Rian Hidayat',
            subject_name: 'Jaringan Komputer',
            rating: 5,
            comment: 'Subnetting VLSM yang dulunya bikin pusing sekarang sudah paham polanya berkat analogi Kak Rian. Mantap!',
            is_visible: 1,
            created_at: '2026-10-08 21:00:00'
        }
    ],

    notifications: [
        {
            id: 1,
            user_id: 5, // Ananda Putra Utama
            title: 'Sesi Belajar Disetujui!',
            message: 'Kak Bintang Pratama telah menyetujui pengajuan sesi bimbingan Pemrograman Web I pada 18 Okt 2026.',
            link: 'student-dashboard.html',
            type: 'success',
            is_read: 0,
            created_at: '2026-10-15 11:30:00'
        },
        {
            id: 2,
            user_id: 2, // Bintang (Tutor)
            title: 'Permintaan Sesi Baru',
            message: 'Mahasiswa Ananda Putra Utama mengajukan bimbingan Pemrograman Web I untuk tanggal 18 Okt 2026.',
            link: 'tutor-dashboard.html',
            type: 'info',
            is_read: 1,
            created_at: '2026-10-15 10:20:00'
        },
        {
            id: 3,
            user_id: 4, // Rian (Tutor)
            title: 'Permintaan Sesi Baru Menunggu',
            message: 'Mahasiswa Fajar Nugroho mengajukan bimbingan Jaringan Komputer untuk tanggal 19 Okt 2026.',
            link: 'tutor-dashboard.html',
            type: 'warning',
            is_read: 0,
            created_at: '2026-10-16 09:15:00'
        }
    ],

    activityLogs: [
        { id: 1, user: 'Ananda Putra Utama', action: 'Membuat Pengajuan Sesi', details: 'Sesi Pemrograman Web I bersama Tutor Bintang Pratama', time: '15 Okt 2026 10:20' },
        { id: 2, user: 'Bintang Pratama', action: 'Menyetujui Sesi Belajar', details: 'Sesi SES-20261018-001 berstatus Diterima', time: '15 Okt 2026 11:30' },
        { id: 3, user: 'Fajar Nugroho', action: 'Membuat Pengajuan Sesi', details: 'Sesi Jaringan Komputer bersama Tutor Rian Hidayat', time: '16 Okt 2026 09:15' },
        { id: 4, user: 'Admin Akademik TB', action: 'Verifikasi Tutor', details: 'Memverifikasi status tutor aktif Rian Hidayat', time: '16 Okt 2026 10:00' }
    ]
};

// Data Store Helpers
function getTBData() {
    try {
        let stored = localStorage.getItem(TB_STORAGE_KEY);
        // Fallback or migrate from older versions
        if (!stored) {
            stored = localStorage.getItem('tb_demo_database_v2') || localStorage.getItem('tb_demo_database_v1');
        }
        if (stored) {
            const parsed = JSON.parse(stored);
            let updated = false;

            // Ensure demo student account is updated to Ananda Putra Utama (20240050086)
            if (parsed.users) {
                parsed.users.forEach(u => {
                    if (u.id === 5 || u.email === 'dina@temanbelajar.ac.id' || u.full_name === 'Dina Wahyuni' || u.nim === '23051214010') {
                        u.full_name = 'Ananda Putra Utama';
                        u.nim = '20240050086';
                        u.email = 'ananda@temanbelajar.ac.id';
                        updated = true;
                    }
                    if (u.id === 3 || u.full_name === 'Nadia Salsabila' || u.email === 'nadia@temanbelajar.ac.id') {
                        u.full_name = 'Sihabudin';
                        u.email = 'sihabudin@temanbelajar.ac.id';
                        updated = true;
                    }
                });
            }
            if (parsed.tutors) {
                parsed.tutors.forEach(t => {
                    if (t.user_id === 3 || t.full_name === 'Nadia Salsabila') {
                        t.full_name = 'Sihabudin';
                        if (t.bio) {
                            t.bio = t.bio.replace(/Saya Nadia/g, 'Saya Sihabudin (Kak Ihab)').replace(/Nadia/g, 'Sihabudin');
                        }
                        updated = true;
                    }
                });
            }
            if (parsed.sessions) {
                parsed.sessions.forEach(s => {
                    if (s.student_id === 5 || s.student_name === 'Dina Wahyuni') {
                        s.student_name = 'Ananda Putra Utama';
                        updated = true;
                    }
                    if (s.tutor_id === 3 || s.tutor_name === 'Nadia Salsabila') {
                        s.tutor_name = 'Sihabudin';
                        updated = true;
                    }
                    if (s.review && s.review.comment && s.review.comment.includes('Kak Nadia')) {
                        s.review.comment = s.review.comment.replace(/Kak Nadia/g, 'Kak Ihab');
                        updated = true;
                    }
                });
            }
            if (parsed.reviews) {
                parsed.reviews.forEach(r => {
                    if (r.student_id === 5 || r.student_name === 'Dina Wahyuni') {
                        r.student_name = 'Ananda Putra Utama';
                        updated = true;
                    }
                    if (r.tutor_id === 3 || r.tutor_name === 'Nadia Salsabila') {
                        r.tutor_name = 'Sihabudin';
                        updated = true;
                    }
                    if (r.comment && r.comment.includes('Kak Nadia')) {
                        r.comment = r.comment.replace(/Kak Nadia/g, 'Kak Ihab');
                        updated = true;
                    }
                });
            }
            if (parsed.notifications) {
                parsed.notifications.forEach(n => {
                    if (n.message && n.message.includes('Dina Wahyuni')) {
                        n.message = n.message.replace(/Dina Wahyuni/g, 'Ananda Putra Utama');
                        updated = true;
                    }
                });
            }
            if (parsed.activityLogs) {
                parsed.activityLogs.forEach(a => {
                    if (a.user === 'Dina Wahyuni') {
                        a.user = 'Ananda Putra Utama';
                        updated = true;
                    }
                });
            }

            saveTBData(parsed);
            return parsed;
        }
    } catch (e) {
        console.error('Failed reading localStorage, using defaults', e);
    }
    saveTBData(INITIAL_TB_DATA);
    return JSON.parse(JSON.stringify(INITIAL_TB_DATA));
}

function saveTBData(data) {
    try {
        localStorage.setItem(TB_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        console.error('Failed writing to localStorage', e);
    }
}

function resetTBData() {
    localStorage.removeItem(TB_STORAGE_KEY);
    localStorage.removeItem('tb_demo_database_v2');
    localStorage.removeItem('tb_demo_database_v1');
    return getTBData();
}

// Current User & Role Management
// Roles: 'student' (Ananda), 'tutor' (Bintang), 'admin' (Admin TB), 'guest' (Tamu)
function getActiveRole() {
    return localStorage.getItem(TB_CURRENT_ROLE_KEY) || 'student';
}

function setActiveRole(roleKey) {
    localStorage.setItem(TB_CURRENT_ROLE_KEY, roleKey);
}

function getCurrentUser() {
    const role = getActiveRole();
    const data = getTBData();

    if (role === 'guest') {
        return null;
    } else if (role === 'tutor') {
        // User ID 2 is Bintang Pratama (Tutor)
        return data.users.find(u => u.id === 2);
    } else if (role === 'admin') {
        // User ID 1 is Admin
        return data.users.find(u => u.id === 1);
    } else {
        // Default: Student Ananda Putra Utama (User ID 5)
        return data.users.find(u => u.id === 5);
    }
}
