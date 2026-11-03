/**
 * TemanBelajar Demo Application Controller
 * Handles UI interactions, role switching, instant booking, live filtering, and notifications.
 */

document.addEventListener('DOMContentLoaded', function () {
    // 1. Initialize Demo Top Banner
    renderDemoBanner();

    // 2. Initialize Navigation based on Active User
    syncNavbarState();

    // 3. Initialize Shared Components
    initCommonListeners();
});

// Toast System
function showToast(title, message, type = 'success') {
    let container = document.getElementById('tbToastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'tbToastContainer';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'tb-toast';

    let iconClass = 'bi-check-circle-fill text-success';
    if (type === 'warning') iconClass = 'bi-exclamation-circle-fill text-warning';
    if (type === 'danger') iconClass = 'bi-x-circle-fill text-danger';
    if (type === 'info') iconClass = 'bi-info-circle-fill text-primary';

    toast.innerHTML = `
        <i class="bi ${iconClass} fs-4"></i>
        <div class="flex-grow-1">
            <div class="fw-bold text-dark small">${escapeHtml(title)}</div>
            <div class="text-secondary small mt-1">${escapeHtml(message)}</div>
        </div>
        <button type="button" class="btn-close shadow-none small" style="font-size: 0.75rem;" onclick="this.parentElement.remove()"></button>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        if (toast && toast.parentElement) {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(15px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }
    }, 5000);
}

// Render Demo Switcher Banner
function renderDemoBanner() {
    if (document.querySelector('.demo-banner-top')) return;

    const banner = document.createElement('div');
    banner.className = 'demo-banner-top';

    const currentRole = getActiveRole();
    const currentUser = getCurrentUser();

    let userLabel = 'Mode Tamu (Belum Login)';
    if (currentUser) {
        if (currentUser.role === 'admin') {
            userLabel = `🛡️ Admin: ${currentUser.full_name}`;
        } else if (currentRole === 'tutor') {
            userLabel = `⭐ Tutor: ${currentUser.full_name}`;
        } else {
            userLabel = `🎓 Mahasiswa: ${currentUser.full_name} (${currentUser.nim})`;
        }
    }

    banner.innerHTML = `
        <div class="d-flex align-items-center gap-2">
            <span class="badge bg-primary text-white py-1 px-2 fw-semibold">DEMO MODE</span>
            <span class="d-none d-md-inline text-white-50">|</span>
            <span class="fw-semibold text-truncate" style="max-width: 280px;">${userLabel}</span>
        </div>
        <div class="d-flex align-items-center gap-2">
            <span class="small text-white-50 d-none d-lg-inline">Ganti Akun:</span>
            <button class="role-pill-btn ${currentRole === 'student' ? 'active' : ''}" onclick="switchDemoRole('student')">
                <i class="bi bi-mortarboard"></i> Mahasiswa
            </button>
            <button class="role-pill-btn ${currentRole === 'tutor' ? 'active' : ''}" onclick="switchDemoRole('tutor')">
                <i class="bi bi-person-badge"></i> Tutor
            </button>
            <button class="role-pill-btn ${currentRole === 'admin' ? 'active' : ''}" onclick="switchDemoRole('admin')">
                <i class="bi bi-shield-lock"></i> Admin
            </button>
            <button class="role-pill-btn ${currentRole === 'guest' ? 'active' : ''}" onclick="switchDemoRole('guest')">
                <i class="bi bi-person"></i> Tamu
            </button>
            <button class="role-pill-btn border-0 text-white-50 hover-text-white ms-1" title="Reset Semua Data Demo ke Default" onclick="resetDemoDataPrompt()">
                <i class="bi bi-arrow-counterclockwise"></i>
            </button>
        </div>
    `;

    document.body.prepend(banner);
}

function switchDemoRole(roleKey) {
    setActiveRole(roleKey);
    showToast('Role Berubah', `Sekarang Anda aktif sebagai ${roleKey.toUpperCase()}`, 'info');
    setTimeout(() => {
        window.location.reload();
    }, 300);
}

function resetDemoDataPrompt() {
    if (confirm('Kembalikan semua data demo (sesi bimbingan, ulasan, notifikasi) ke data bawaan awal?')) {
        resetTBData();
        showToast('Data Direset', 'Semua data telah dikembalikan ke kondisi awal!', 'success');
        setTimeout(() => {
            window.location.reload();
        }, 500);
    }
}

// Sync Navbar State
function syncNavbarState() {
    const user = getCurrentUser();
    const role = getActiveRole();
    const data = getTBData();

    const authContainer = document.getElementById('navbarAuthArea');
    if (!authContainer) return;

    if (!user) {
        // Guest mode
        authContainer.innerHTML = `
            <a href="login.html" class="btn btn-tb-outline btn-sm px-3 fw-semibold">
                <i class="bi bi-box-arrow-in-right me-1"></i> Masuk
            </a>
            <a href="register.html" class="btn btn-tb-primary btn-sm px-3 fw-semibold">
                <i class="bi bi-person-plus me-1"></i> Daftar
            </a>
        `;
    } else {
        // Logged-in mode
        // Calculate unread notifications
        const unreadNotifs = data.notifications.filter(n => n.user_id === user.id && !n.is_read);

        let roleBadgeAction = '';
        if (user.role === 'admin') {
            roleBadgeAction = `
                <a href="admin-dashboard.html" class="btn btn-outline-danger btn-sm rounded-pill fw-semibold px-3">
                    <i class="bi bi-shield-lock-fill me-1"></i> Admin Panel
                </a>
            `;
        } else if (role === 'tutor' || user.is_tutor) {
            roleBadgeAction = `
                <a href="tutor-dashboard.html" class="btn btn-outline-primary btn-sm rounded-pill fw-semibold px-3">
                    <i class="bi bi-person-badge-fill me-1"></i> Mode Tutor
                </a>
                <a href="student-dashboard.html" class="btn btn-light btn-sm rounded-pill fw-semibold px-3 text-primary border">
                    <i class="bi bi-journal-bookmark-fill me-1"></i> Belajar
                </a>
            `;
        } else {
            roleBadgeAction = `
                <a href="student-dashboard.html" class="btn btn-light btn-sm rounded-pill fw-semibold px-3 text-primary border">
                    <i class="bi bi-journal-bookmark-fill me-1"></i> Dashboard Belajar
                </a>
                <button type="button" class="btn btn-outline-secondary btn-sm rounded-pill fw-semibold px-3" onclick="switchDemoRole('tutor')">
                    <i class="bi bi-plus-circle me-1"></i> Jadi Tutor
                </button>
            `;
        }

        authContainer.innerHTML = `
            <!-- Notifications Bell -->
            <div class="dropdown">
                <button class="btn btn-light position-relative rounded-circle p-2 text-secondary border shadow-none" type="button" data-bs-toggle="dropdown" aria-expanded="false" title="Notifikasi">
                    <i class="bi bi-bell fs-5"></i>
                    ${unreadNotifs.length > 0 ? `
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style="font-size: 0.65rem;">
                            ${unreadNotifs.length}
                        </span>
                    ` : ''}
                </button>
                <div class="dropdown-menu dropdown-menu-end shadow-lg border-0 p-3 mt-2" style="width: 320px; border-radius: 14px;">
                    <div class="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom">
                        <span class="fw-bold small text-dark">Notifikasi (${unreadNotifs.length} Baru)</span>
                        <button class="btn btn-link btn-sm p-0 text-decoration-none small" onclick="markAllNotificationsRead(${user.id})">Tandai Dibaca</button>
                    </div>
                    <div class="d-flex flex-column gap-2" style="max-height: 280px; overflow-y: auto;">
                        ${data.notifications.filter(n => n.user_id === user.id).length === 0 ? `
                            <div class="text-center text-muted small py-3">Tidak ada notifikasi</div>
                        ` : data.notifications.filter(n => n.user_id === user.id).slice(0, 5).map(n => `
                            <div class="p-2 rounded-3 ${n.is_read ? 'bg-light' : 'bg-primary-subtle'} small">
                                <div class="fw-bold text-dark">${escapeHtml(n.title)}</div>
                                <div class="text-secondary text-truncate-2" style="font-size: 0.8rem;">${escapeHtml(n.message)}</div>
                                <div class="text-muted text-end" style="font-size: 0.7rem;">${n.created_at.slice(5, 16)}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>

            <!-- Role Action Badges -->
            ${roleBadgeAction}

            <!-- User Avatar & Dropdown -->
            <div class="dropdown ms-1">
                <button class="btn btn-light rounded-pill p-1 d-flex align-items-center gap-2 border dropdown-toggle shadow-none" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <div class="avatar-placeholder ${user.role === 'admin' ? 'avatar-admin' : (user.is_tutor ? 'avatar-tutor' : '')}" style="width: 32px; height: 32px; font-size: 0.85rem;">
                        ${user.full_name.charAt(0).toUpperCase()}
                    </div>
                    <span class="small fw-semibold pe-1 d-none d-md-inline">${escapeHtml(user.full_name)}</span>
                </button>
                <ul class="dropdown-menu dropdown-menu-end shadow-sm border-0 py-2 mt-2" style="border-radius: 12px; min-width: 220px;">
                    <li class="px-3 py-2 border-bottom">
                        <div class="fw-bold text-dark text-truncate">${escapeHtml(user.full_name)}</div>
                        <div class="small text-muted text-truncate">${escapeHtml(user.email)}</div>
                        <span class="badge bg-light text-primary border mt-1">NIM: ${escapeHtml(user.nim)}</span>
                    </li>
                    <li><a class="dropdown-item py-2 small" href="student-dashboard.html"><i class="bi bi-journal-check me-2 text-primary"></i>Dashboard Belajar</a></li>
                    ${user.is_tutor ? `<li><a class="dropdown-item py-2 small" href="tutor-dashboard.html"><i class="bi bi-person-badge me-2 text-success"></i>Dashboard Tutor</a></li>` : ''}
                    ${user.role === 'admin' ? `<li><a class="dropdown-item py-2 small" href="admin-dashboard.html"><i class="bi bi-shield-lock me-2 text-danger"></i>Admin Dashboard</a></li>` : ''}
                    <li><hr class="dropdown-divider"></li>
                    <li><button class="dropdown-item py-2 small text-danger" onclick="switchDemoRole('guest')"><i class="bi bi-box-arrow-right me-2"></i>Keluar (Logout)</button></li>
                </ul>
            </div>
        `;
    }
}

function markAllNotificationsRead(userId) {
    const data = getTBData();
    data.notifications.forEach(n => {
        if (n.user_id === userId) n.is_read = 1;
    });
    saveTBData(data);
    syncNavbarState();
    showToast('Notifikasi', 'Semua notifikasi telah ditandai dibaca.', 'info');
}

// Booking Modal Logic
function openBookingModal(tutorId) {
    const user = getCurrentUser();
    if (!user) {
        showToast('Perlu Masuk', 'Silakan masuk dengan akun mahasiswa untuk mengajukan sesi bimbingan!', 'warning');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1200);
        return;
    }

    const data = getTBData();
    const tutor = data.tutors.find(t => t.id === parseInt(tutorId, 10));
    if (!tutor) return;

    let modalEl = document.getElementById('globalBookingModal');
    if (!modalEl) {
        modalEl = createGlobalBookingModal();
        document.body.appendChild(modalEl);
    }

    // Populate Fields
    document.getElementById('bookingTutorId').value = tutor.id;
    document.getElementById('bookingTutorNameDisplay').textContent = tutor.full_name;
    document.getElementById('bookingTutorRateDisplay').textContent = tutor.is_free ? 'Gratis (Sukarela)' : formatRupiah(tutor.hourly_rate);

    // Populate Subjects
    const subjectSelect = document.getElementById('bookingSubjectSelect');
    subjectSelect.innerHTML = '<option value="">-- Pilih Mata Kuliah --</option>';
    tutor.subjects.forEach(sub => {
        const opt = document.createElement('option');
        opt.value = sub.subject_id;
        opt.textContent = `${sub.name} (${sub.code}) - Nilai Ajar: ${sub.grade}`;
        subjectSelect.appendChild(opt);
    });

    // Populate Method
    const methodSelect = document.getElementById('bookingMethodSelect');
    methodSelect.innerHTML = '';
    if (tutor.preferred_method === 'both' || tutor.preferred_method === 'online') {
        methodSelect.innerHTML += '<option value="online">Online (Google Meet / Zoom)</option>';
    }
    if (tutor.preferred_method === 'both' || tutor.preferred_method === 'offline') {
        methodSelect.innerHTML += '<option value="offline">Tatap Muka (Kampus / Perpustakaan)</option>';
    }

    // Set Default Date to Tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateInput = document.getElementById('bookingDateInput');
    dateInput.min = new Date().toISOString().split('T')[0];
    dateInput.value = tomorrow.toISOString().split('T')[0];

    // Trigger end time calculation
    calculateBookingEndTime();

    // Show modal
    const bsModal = new bootstrap.Modal(modalEl);
    bsModal.show();
}

function createGlobalBookingModal() {
    const div = document.createElement('div');
    div.className = 'modal fade';
    div.id = 'globalBookingModal';
    div.tabIndex = -1;
    div.setAttribute('aria-hidden', 'true');

    div.innerHTML = `
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content border-0 shadow-lg">
                <div class="modal-header py-3">
                    <h5 class="modal-title fw-bold text-dark d-flex align-items-center gap-2">
                        <i class="bi bi-calendar-check text-primary"></i>
                        Ajukan Sesi Belajar bersama <span id="bookingTutorNameDisplay" class="text-primary">-</span>
                    </h5>
                    <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form id="globalBookingForm" onsubmit="submitBookingForm(event)">
                    <input type="hidden" id="bookingTutorId" value="">
                    <div class="modal-body p-4">
                        <div class="alert alert-info py-2 px-3 small d-flex align-items-center justify-content-between mb-4">
                            <span><i class="bi bi-info-circle me-1"></i> Biaya Sesi: <strong id="bookingTutorRateDisplay">-</strong></span>
                            <span class="text-success fw-semibold"><i class="bi bi-shield-check"></i> Jadwal terproteksi bentrok</span>
                        </div>
                        <div class="row g-3">
                            <div class="col-md-12">
                                <label class="form-label small fw-semibold text-secondary">Mata Kuliah Bimbingan <span class="text-danger">*</span></label>
                                <select class="form-select" id="bookingSubjectSelect" required>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label small fw-semibold text-secondary">Tanggal Belajar <span class="text-danger">*</span></label>
                                <input type="date" class="form-control" id="bookingDateInput" required>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label small fw-semibold text-secondary">Jam Mulai <span class="text-danger">*</span></label>
                                <input type="time" class="form-control" id="bookingStartTimeInput" value="16:00" required onchange="calculateBookingEndTime()">
                            </div>
                            <div class="col-md-6">
                                <label class="form-label small fw-semibold text-secondary">Durasi Bimbingan <span class="text-danger">*</span></label>
                                <select class="form-select" id="bookingDurationSelect" required onchange="calculateBookingEndTime()">
                                    <option value="60">60 Menit (1 Jam)</option>
                                    <option value="90" selected>90 Menit (1.5 Jam)</option>
                                    <option value="120">120 Menit (2 Jam)</option>
                                </select>
                                <div class="form-text small">Perkiraan selesai: <strong id="bookingEndTimeDisplay" class="text-primary">17:30 WIB</strong></div>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label small fw-semibold text-secondary">Metode Belajar <span class="text-danger">*</span></label>
                                <select class="form-select" id="bookingMethodSelect" required>
                                </select>
                            </div>
                            <div class="col-md-12">
                                <label class="form-label small fw-semibold text-secondary">Usulan Tempat / Tautan Meeting</label>
                                <input type="text" class="form-control" id="bookingLocationInput" placeholder="Misal: Gazebo Gedung B / Tautan Google Meet">
                            </div>
                            <div class="col-md-12">
                                <label class="form-label small fw-semibold text-secondary">Topik yang Ingin Dipelajari / Catatan Tambahan</label>
                                <textarea class="form-control" id="bookingNotesInput" rows="3" placeholder="Jelaskan bagian tugas, bab rumus, atau kode yang belum dipahami..."></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer border-top p-3">
                        <button type="button" class="btn btn-light border" data-bs-dismiss="modal">Batal</button>
                        <button type="submit" class="btn btn-tb-primary px-4 fw-semibold">
                            <i class="bi bi-send-check me-1"></i> Kirim Permintaan Sesi
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;

    return div;
}

function calculateBookingEndTime() {
    const startTimeInput = document.getElementById('bookingStartTimeInput');
    const durationSelect = document.getElementById('bookingDurationSelect');
    const display = document.getElementById('bookingEndTimeDisplay');

    if (!startTimeInput || !durationSelect || !display) return;

    const timeVal = startTimeInput.value;
    const duration = parseInt(durationSelect.value, 10);

    if (!timeVal) {
        display.textContent = '-';
        return;
    }

    const [hStr, mStr] = timeVal.split(':');
    let hours = parseInt(hStr, 10);
    let minutes = parseInt(mStr, 10) + duration;

    hours += Math.floor(minutes / 60);
    minutes = minutes % 60;
    hours = hours % 24;

    const formatted = String(hours).padStart(2, '0') + ':' + String(minutes).padStart(2, '0') + ' WIB';
    display.textContent = formatted;
}

function submitBookingForm(e) {
    e.preventDefault();
    const user = getCurrentUser();
    if (!user) return;

    const tutorId = parseInt(document.getElementById('bookingTutorId').value, 10);
    const subjectId = parseInt(document.getElementById('bookingSubjectSelect').value, 10);
    const dateVal = document.getElementById('bookingDateInput').value;
    const startTime = document.getElementById('bookingStartTimeInput').value;
    const duration = parseInt(document.getElementById('bookingDurationSelect').value, 10);
    const method = document.getElementById('bookingMethodSelect').value;
    const location = document.getElementById('bookingLocationInput').value || (method === 'online' ? 'Google Meet (Tautan akan dikirimkan)' : 'Ruang Belajar Kampus');
    const notes = document.getElementById('bookingNotesInput').value;

    if (!subjectId || !dateVal || !startTime) {
        alert('Mohon lengkapi semua bidang yang bertanda bintang!');
        return;
    }

    // Calculate end time
    const [h, m] = startTime.split(':').map(Number);
    let endH = h + Math.floor((m + duration) / 60);
    let endM = (m + duration) % 60;
    const endTime = String(endH).padStart(2, '0') + ':' + String(endM).padStart(2, '0');

    const data = getTBData();
    const tutor = data.tutors.find(t => t.id === tutorId);
    const subject = data.studySubjects.find(s => s.id === subjectId);

    const newSession = {
        id: Date.now(),
        session_code: 'SES-' + new Date().toISOString().slice(0, 10).replace(/-/g, '') + '-' + Math.floor(100 + Math.random() * 900),
        student_id: user.id,
        student_name: user.full_name,
        tutor_id: tutor.user_id,
        tutor_name: tutor.full_name,
        subject_id: subject.id,
        subject_name: subject.name,
        subject_code: subject.code,
        session_date: dateVal,
        start_time: startTime,
        end_time: endTime,
        duration_minutes: duration,
        learning_method: method,
        location_or_link: location,
        notes: notes,
        status: 'pending',
        rejection_reason: null,
        created_at: new Date().toISOString().replace('T', ' ').slice(0, 19)
    };

    data.sessions.unshift(newSession);

    // Add Notification for the Tutor
    data.notifications.unshift({
        id: Date.now() + 1,
        user_id: tutor.user_id,
        title: 'Permintaan Sesi Belajar Baru',
        message: `${user.full_name} mengajukan bimbingan mata kuliah ${subject.name} untuk ${dateVal}.`,
        link: 'tutor-dashboard.html',
        type: 'info',
        is_read: 0,
        created_at: new Date().toISOString().replace('T', ' ').slice(0, 19)
    });

    // Add Activity Log
    data.activityLogs.unshift({
        id: Date.now() + 2,
        user: user.full_name,
        action: 'Membuat Pengajuan Sesi',
        details: `Sesi ${subject.name} bersama Tutor ${tutor.full_name}`,
        time: 'Baru saja'
    });

    saveTBData(data);

    // Hide Modal
    const modalEl = document.getElementById('globalBookingModal');
    const bsModal = bootstrap.Modal.getInstance(modalEl);
    if (bsModal) bsModal.hide();

    showToast('Pengajuan Berhasil Dikirim!', `Permintaan bimbingan Anda dengan Tutor ${tutor.full_name} telah dikirim dan menunggu konfirmasi.`, 'success');

    // If currently on student dashboard, refresh view
    if (window.location.pathname.includes('student-dashboard.html')) {
        setTimeout(() => window.location.reload(), 1000);
    }
}

// Session Management Actions
function approveSession(sessionId) {
    const data = getTBData();
    const session = data.sessions.find(s => s.id === sessionId);
    if (!session) return;

    session.status = 'accepted';

    // Notify Student
    data.notifications.unshift({
        id: Date.now(),
        user_id: session.student_id,
        title: 'Sesi Belajar Disetujui!',
        message: `Kak ${session.tutor_name} telah menyetujui sesi ${session.subject_name} pada ${session.session_date} (${session.start_time} WIB).`,
        link: 'student-dashboard.html',
        type: 'success',
        is_read: 0,
        created_at: new Date().toISOString().replace('T', ' ').slice(0, 19)
    });

    saveTBData(data);
    showToast('Sesi Disetujui', `Sesi ${session.session_code} berhasil disetujui!`, 'success');
    setTimeout(() => window.location.reload(), 500);
}

function rejectSession(sessionId) {
    const reason = prompt('Masukkan alasan penolakan (misal: Ada jadwal praktikum bentrok / Sedang berhalangan):', 'Ada jadwal perkuliahan bentrok pada waktu yang diminta.');
    if (!reason) return;

    const data = getTBData();
    const session = data.sessions.find(s => s.id === sessionId);
    if (!session) return;

    session.status = 'rejected';
    session.rejection_reason = reason;

    // Notify Student
    data.notifications.unshift({
        id: Date.now(),
        user_id: session.student_id,
        title: 'Sesi Belajar Ditolak',
        message: `Sesi ${session.subject_name} pada ${session.session_date} ditolak oleh tutor. Alasan: "${reason}"`,
        link: 'student-dashboard.html',
        type: 'danger',
        is_read: 0,
        created_at: new Date().toISOString().replace('T', ' ').slice(0, 19)
    });

    saveTBData(data);
    showToast('Sesi Ditolak', `Permintaan sesi telah ditolak. Mahasiswa telah diberi notifikasi.`, 'warning');
    setTimeout(() => window.location.reload(), 500);
}

function completeSession(sessionId) {
    if (!confirm('Tandai sesi ini sebagai selesai? Mahasiswa akan dapat memberikan ulasan dan rating.')) return;

    const data = getTBData();
    const session = data.sessions.find(s => s.id === sessionId);
    if (!session) return;

    session.status = 'completed';

    // Notify Student to Review
    data.notifications.unshift({
        id: Date.now(),
        user_id: session.student_id,
        title: 'Sesi Telah Selesai - Beri Ulasan!',
        message: `Sesi ${session.subject_name} telah selesai. Berikan rating bintang dan ulasan untuk Kak ${session.tutor_name}!`,
        link: 'student-dashboard.html',
        type: 'info',
        is_read: 0,
        created_at: new Date().toISOString().replace('T', ' ').slice(0, 19)
    });

    saveTBData(data);
    showToast('Sesi Selesai', 'Sesi belajar berhasil ditandai selesai! Terima kasih sudah mengajar.', 'success');
    setTimeout(() => window.location.reload(), 500);
}

function openReviewModal(sessionId) {
    const data = getTBData();
    const session = data.sessions.find(s => s.id === sessionId);
    if (!session) return;

    const rating = prompt('Berikan nilai rating bintang untuk Kak ' + session.tutor_name + ' (1 sampai 5):', '5');
    if (!rating) return;
    const rInt = parseInt(rating, 10);
    if (isNaN(rInt) || rInt < 1 || rInt > 5) {
        alert('Rating harus berupa angka 1 sampai 5.');
        return;
    }

    const comment = prompt('Tulis ulasan Anda mengenai sesi bimbingan bersama Kak ' + session.tutor_name + ':', 'Penjelasan sangat ramah dan mudah dipahami. Materi tugas tuntas!');
    if (!comment) return;

    session.review = {
        rating: rInt,
        comment: comment,
        created_at: new Date().toISOString().replace('T', ' ').slice(0, 19)
    };

    data.reviews.unshift({
        id: Date.now(),
        session_id: session.id,
        student_id: session.student_id,
        student_name: session.student_name,
        tutor_id: session.tutor_id,
        tutor_name: session.tutor_name,
        subject_name: session.subject_name,
        rating: rInt,
        comment: comment,
        is_visible: 1,
        created_at: new Date().toISOString().replace('T', ' ').slice(0, 19)
    });

    // Update Tutor Average Rating
    const tutor = data.tutors.find(t => t.user_id === session.tutor_id);
    if (tutor) {
        const tutorReviews = data.reviews.filter(r => r.tutor_id === session.tutor_id);
        const sum = tutorReviews.reduce((acc, curr) => acc + curr.rating, 0);
        tutor.avg_rating = parseFloat((sum / tutorReviews.length).toFixed(1));
        tutor.review_count = tutorReviews.length;
    }

    saveTBData(data);
    showToast('Ulasan Terkirim!', 'Terima kasih telah memberikan ulasan objektif untuk tutor sebaya.', 'success');
    setTimeout(() => window.location.reload(), 600);
}

// Format Utilities
function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0
    }).format(number);
}

function escapeHtml(text) {
    if (!text) return '';
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function initCommonListeners() {
    // Dynamic tooltips if bootstrap available
    if (window.bootstrap && bootstrap.Tooltip) {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(el => new bootstrap.Tooltip(el));
    }
}
