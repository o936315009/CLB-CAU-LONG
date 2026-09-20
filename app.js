/**
 * CLB CẦU LÔNG SMASH - QUẢN LÝ SÂN, VÍ & ĐIỂM DANH
 * File: app.js
 * Comprehensive client-side state management, automated court fee tiers,
 * wallet deduction, financial transactions, matchmaking, and data backup.
 */

const STORAGE_KEY = 'CLB_CAU_LONG_SMASH_DATA_V1';

// ==========================================
// 1. DỮ LIỆU MẪU BAN ĐẦU (DEFAULT DATA)
// ==========================================
const DEFAULT_INITIAL_DATA = {
  config: {
    clubName: 'CLB CẦU LÔNG SMASH',
    themeColor: 'emerald',
    defaultFine: 50000,
    bankInfo: 'MBBANK - 0987654321 - CLB CAU LONG SMASH',
    guestPrices: {
      GUEST_A: 90000,
      GUEST_B: 70000,
      GUEST_C: 50000
    },
    feeTiers: [
      { id: 1, name: 'Bậc 1 (0–4 buổi)', minSessions: 0, maxSessions: 4, price: 50000 },
      { id: 2, name: 'Bậc 2 (5–9 buổi)', minSessions: 5, maxSessions: 9, price: 100000 },
      { id: 3, name: 'Bậc 3 (10–15 buổi)', minSessions: 10, maxSessions: 15, price: 150000 },
      { id: 4, name: 'Bậc 4 (16–30+ buổi)', minSessions: 16, maxSessions: 999, price: 200000 }
    ]
  },
  funds: {
    clubFund: 5200000,    // 5.200.000 đ quỹ CLB
    advanceFund: 1800000  // 1.800.000 đ quỹ tạm ứng
  },
  members: [
    // --- THÀNH VIÊN CHÍNH THỨC (20 người) ---
    { id: 'M001', name: 'Trần Đức Chính', chipName: 'CHÍNH', phone: '0901000001', type: 'OFFICIAL', username: 'chinh', password: '123', balance: 500000, monthlySessions: 4 },
    { id: 'M002', name: 'Nguyễn Thành Công', chipName: 'CÔNG', phone: '0901000002', type: 'OFFICIAL', username: 'cong', password: '123', balance: 420000, monthlySessions: 3 },
    { id: 'M003', name: 'Lê Anh Dũng', chipName: 'DŨNG', phone: '0901000003', type: 'OFFICIAL', username: 'dung', password: '123', balance: 650000, monthlySessions: 6 },
    { id: 'M004', name: 'Vũ Văn Duy', chipName: 'DUY', phone: '0901000004', type: 'OFFICIAL', username: 'duy', password: '123', balance: 250000, monthlySessions: 2 },
    { id: 'M005', name: 'Đặng Thành Đạt (Đạt Tươi)', chipName: 'ĐẠT TƯƠI', phone: '0901000005', type: 'OFFICIAL', username: 'dat', password: '123', balance: 800000, monthlySessions: 8 },
    { id: 'M006', name: 'Phạm Văn Đê', chipName: 'ĐÊ', phone: '0901000006', type: 'OFFICIAL', username: 'de', password: '123', balance: 310000, monthlySessions: 5 },
    { id: 'M007', name: 'Hoàng Thanh Hải', chipName: 'HẢI', phone: '0901000007', type: 'OFFICIAL', username: 'hai', password: '123', balance: 450000, monthlySessions: 4 },
    { id: 'M008', name: 'Ngô Hồng Hạnh', chipName: 'HẠNH', phone: '0901000008', type: 'OFFICIAL', username: 'hanh', password: '123', balance: 200000, monthlySessions: 2 },
    { id: 'M009', name: 'Bùi Trung Hiếu', chipName: 'HIẾU', phone: '0901000009', type: 'OFFICIAL', username: 'hieu', password: '123', balance: 550000, monthlySessions: 5 },
    { id: 'M010', name: 'Đỗ Quang Hồng', chipName: 'HỒNG', phone: '0901000010', type: 'OFFICIAL', username: 'hong', password: '123', balance: 380000, monthlySessions: 3 },
    { id: 'M011', name: 'Lê Quốc Huy (Huy Dê)', chipName: 'HUY DÊ', phone: '0901000011', type: 'OFFICIAL', username: 'huy', password: '123', balance: 490000, monthlySessions: 5 },
    { id: 'M012', name: 'Nguyễn Duy Khương', chipName: 'KHƯƠNG', phone: '0901000012', type: 'OFFICIAL', username: 'khuong', password: '123', balance: 300000, monthlySessions: 4 },
    { id: 'M013', name: 'Phan Trung Kiên', chipName: 'KIÊN', phone: '0901000013', type: 'OFFICIAL', username: 'kien', password: '123', balance: 600000, monthlySessions: 7 },
    { id: 'M014', name: 'Đinh Văn Lượng', chipName: 'LƯỢNG', phone: '0901000014', type: 'OFFICIAL', username: 'luong', password: '123', balance: 220000, monthlySessions: 3 },
    { id: 'M015', name: 'Vũ Tiến Mạnh (Mạnh CT)', chipName: 'MẠNH CT', phone: '0901000015', type: 'OFFICIAL', username: 'manh', password: '123', balance: 710000, monthlySessions: 6 },
    { id: 'M016', name: 'Trần Nhật Minh', chipName: 'MINH', phone: '0901000016', type: 'OFFICIAL', username: 'minh', password: '123', balance: 400000, monthlySessions: 4 },
    { id: 'M017', name: 'Lương Thế Nguyên', chipName: 'NGUYÊN', phone: '0901000017', type: 'OFFICIAL', username: 'nguyen', password: '123', balance: 350000, monthlySessions: 3 },
    { id: 'M018', name: 'Dương Văn Pháp', chipName: 'PHÁP', phone: '0901000018', type: 'OFFICIAL', username: 'phap', password: '123', balance: 520000, monthlySessions: 5 },
    { id: 'M019', name: 'Chu Đình Quảng', chipName: 'QUẢNG', phone: '0901000019', type: 'OFFICIAL', username: 'quang', password: '123', balance: 290000, monthlySessions: 2 },
    { id: 'M020', name: 'Nguyễn Tuấn Anh (T.Anh)', chipName: 'T.ANH', phone: '0901000020', type: 'OFFICIAL', username: 'admin', password: 'admin123', balance: 750000, monthlySessions: 6 },

    // --- THÀNH VIÊN DANH DỰ (Chuyển từ Dự bị - 7 người) ---
    { id: 'M021', name: 'Đào Nhật Tân', chipName: 'TÂN', phone: '0902000021', type: 'HONORARY', username: 'tan', password: '123', balance: 300000, monthlySessions: 2 },
    { id: 'M022', name: 'Phạm Tiến Thành', chipName: 'THÀNH', phone: '0902000022', type: 'HONORARY', username: 'thanh', password: '123', balance: 350000, monthlySessions: 3 },
    { id: 'M023', name: 'Mai Đức Thắng', chipName: 'THẮNG', phone: '0902000023', type: 'HONORARY', username: 'thang', password: '123', balance: 250000, monthlySessions: 2 },
    { id: 'M024', name: 'Lưu Đức Thuộc', chipName: 'THUỘC', phone: '0902000024', type: 'HONORARY', username: 'thuoc', password: '123', balance: 400000, monthlySessions: 4 },
    { id: 'M025', name: 'Cao Văn Toàn', chipName: 'TOÀN', phone: '0902000025', type: 'HONORARY', username: 'toan', password: '123', balance: 320000, monthlySessions: 3 },
    { id: 'M026', name: 'Đỗ Xuân Trường', chipName: 'TRƯỜNG', phone: '0902000026', type: 'HONORARY', username: 'truong', password: '123', balance: 280000, monthlySessions: 2 },
    { id: 'M027', name: 'Nguyễn Văn Tươi', chipName: 'TƯƠI', phone: '0902000027', type: 'HONORARY', username: 'tuoi', password: '123', balance: 500000, monthlySessions: 5 },

    // --- KHÁCH (Phân loại Level A, B, C theo mẫu) ---
    { id: 'G006', name: 'THẾ ANH', chipName: 'THẾ ANH', phone: '', type: 'GUEST_A', level: 'A', fee: 90000, username: '', password: '', balance: 0, monthlySessions: 2 },
    { id: 'G007', name: 'PHONG', chipName: 'PHONG', phone: '', type: 'GUEST_A', level: 'A', fee: 90000, username: '', password: '', balance: 0, monthlySessions: 1 },
    { id: 'G005', name: 'QUANG-Q', chipName: 'QUANG-Q', phone: '', type: 'GUEST_A', level: 'A', fee: 90000, username: '', password: '', balance: 0, monthlySessions: 3 },
    { id: 'G004', name: 'CHA PHÓ', chipName: 'CHA PHÓ', phone: '', type: 'GUEST_B', level: 'B', fee: 70000, username: '', password: '', balance: 0, monthlySessions: 1 },
    { id: 'G003', name: 'KHOAI', chipName: 'KHOAI', phone: '', type: 'GUEST_C', level: 'C', fee: 50000, username: '', password: '', balance: 0, monthlySessions: 2 },
    { id: 'G001', name: 'Khách 1', chipName: 'Khách 1', phone: '', type: 'GUEST_C', level: 'C', fee: 50000, username: '', password: '', balance: 0, monthlySessions: 1 },
    { id: 'G002', name: 'Khách 2', chipName: 'Khách 2', phone: '', type: 'GUEST_C', level: 'C', fee: 50000, username: '', password: '', balance: 0, monthlySessions: 1 }
  ],
  attendanceRecords: [
    { id: 'ATT_101', date: '2026-09-15', memberId: 'M001', memberName: 'Nguyễn Văn Tuấn (Chủ nhiệm)', fee: 100000, sessionIndex: 6, timestamp: '15/09/2026 18:30' },
    { id: 'ATT_102', date: '2026-09-15', memberId: 'M002', memberName: 'Trần Minh Hoàng', fee: 50000, sessionIndex: 3, timestamp: '15/09/2026 18:30' },
    { id: 'ATT_103', date: '2026-09-15', memberId: 'M003', memberName: 'Lê Thu Hương', fee: 100000, sessionIndex: 5, timestamp: '15/09/2026 18:30' }
  ],
  transactions: [
    { id: 'TX_1001', date: '15/09/2026 18:35', type: 'COURT_FEE', amount: -100000, targetName: 'Nguyễn Văn Tuấn (Chủ nhiệm)', description: 'Trừ tiền sân ngày 15/09 (Buổi thứ 6 - Bậc 2)', operator: 'admin' },
    { id: 'TX_1002', date: '15/09/2026 18:35', type: 'COURT_FEE', amount: -50000, targetName: 'Trần Minh Hoàng', description: 'Trừ tiền sân ngày 15/09 (Buổi thứ 3 - Bậc 1)', operator: 'admin' },
    { id: 'TX_1003', date: '15/09/2026 18:35', type: 'COURT_FEE', amount: -100000, targetName: 'Lê Thu Hương', description: 'Trừ tiền sân ngày 15/09 (Buổi thứ 5 - Bậc 2)', operator: 'admin' },
    { id: 'TX_1004', date: '14/09/2026 09:30', type: 'TOPUP', amount: 500000, targetName: 'Nguyễn Văn Tuấn (Chủ nhiệm)', description: 'Nạp tiền ví thành viên (Chuyển khoản VietQR)', operator: 'admin' },
    { id: 'TX_1005', date: '13/09/2026 16:00', type: 'FUND_OUT', amount: -750000, targetName: 'Quỹ CLB', description: 'Mua 3 ống cầu Victor Champion No.1', operator: 'admin' },
    { id: 'TX_1006', date: '12/09/2026 10:15', type: 'FUND_IN', amount: 2000000, targetName: 'Quỹ CLB', description: 'Thu tiền tài trợ giải Cầu Lông Đôi Nam Nữ', operator: 'admin' },
    { id: 'TX_1007', date: '10/09/2026 19:20', type: 'FINE', amount: 50000, targetName: 'Phạm Đức Long', description: 'Phạt vắng không báo trước buổi sinh hoạt', operator: 'admin' },
    { id: 'TX_1008', date: '08/09/2026 14:00', type: 'ADVANCE', amount: 1000000, targetName: 'Quỹ Tạm Ứng', description: 'Anh Nam ứng tiền cọc thuê sân cầu lông tháng 9', operator: 'admin' }
  ],
  auth: {
    isLoggedIn: true,
    user: {
      username: 'admin',
      role: 'ADMIN',
      name: 'Nguyễn Văn Tuấn (Chủ nhiệm)'
    }
  }
};

// ==========================================
// 2. STATE MANAGEMENT & LOCAL STORAGE
// ==========================================
let AppState = {};

function loadData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      AppState = JSON.parse(saved);
      // Đảm bảo không bị thiếu cấu trúc khi cập nhật phiên bản
      if (!AppState.config) AppState.config = DEFAULT_INITIAL_DATA.config;
      if (!AppState.funds) AppState.funds = DEFAULT_INITIAL_DATA.funds;
      if (!AppState.members) AppState.members = DEFAULT_INITIAL_DATA.members;
      if (!AppState.transactions) AppState.transactions = DEFAULT_INITIAL_DATA.transactions;
      if (!AppState.attendanceRecords) AppState.attendanceRecords = DEFAULT_INITIAL_DATA.attendanceRecords;
      if (!AppState.auth) AppState.auth = DEFAULT_INITIAL_DATA.auth;

      // Nâng cấp dữ liệu lên danh sách 27 thành viên & khách theo mẫu thực tế
      if (!AppState.members || AppState.members.length < 20) {
        AppState.members = JSON.parse(JSON.stringify(DEFAULT_INITIAL_DATA.members));
      } else {
        // Chuyển đổi thành viên dự bị / UNOFFICIAL thành HONORARY (Danh dự)
        AppState.members.forEach(m => {
          if (m.type === 'UNOFFICIAL' || m.type === 'PROBATION') {
            m.type = 'HONORARY';
          }
          if (!m.chipName) {
            const parts = m.name.trim().split(' ');
            m.chipName = parts[parts.length - 1].toUpperCase();
          }
        });

        if (!AppState.members.some(m => m.id === 'G007' || m.chipName === 'PHONG')) {
          AppState.members.push({ id: 'G007', name: 'PHONG', chipName: 'PHONG', phone: '', type: 'GUEST_A', level: 'A', fee: 90000, username: '', password: '', balance: 0, monthlySessions: 1 });
        }
        const gQuang = AppState.members.find(m => m.id === 'G005' || m.name === 'QUANG - Q' || m.name === 'QUANG-Q');
        if (gQuang) { gQuang.name = 'QUANG-Q'; gQuang.chipName = 'QUANG-Q'; }
      }

      if (AppState.config) {
        AppState.config.guestPrices = DEFAULT_INITIAL_DATA.config.guestPrices;
      }
      saveData();
    } else {
      AppState = JSON.parse(JSON.stringify(DEFAULT_INITIAL_DATA));
      saveData();
    }
  } catch (err) {
    console.error('Error loading data, using defaults:', err);
    AppState = JSON.parse(JSON.stringify(DEFAULT_INITIAL_DATA));
    saveData();
  }
}

function saveData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(AppState));
  } catch (err) {
    console.error('Error saving state to localStorage:', err);
    showToast('Lỗi lưu trữ dữ liệu cục bộ!', 'error');
  }
}

// ==========================================
// 3. TIỆN ÍCH ĐỊNH DẠNG & THỜI GIAN
// ==========================================
function formatMoney(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) return '0 đ';
  const num = Number(amount);
  return num.toLocaleString('vi-VN') + ' đ';
}

function getFormattedCurrentDate() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  return `${day}/${month}/${year}`;
}

function getTodayInputFormat() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getNowTimestampString() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  const hour = String(now.getHours()).padStart(2, '0');
  const minute = String(now.getMinutes()).padStart(2, '0');
  return `${day}/${month}/${year} ${hour}:${minute}`;
}

// ==========================================
// 4. BẢNG MÀU GIAO DIỆN (THEMES)
// ==========================================
const THEMES = {
  emerald: {
    50: '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0',
    500: '#10b981', 600: '#059669', 700: '#047857'
  },
  cyan: {
    50: '#ecfeff', 100: '#cffafe', 200: '#a5f3fc',
    500: '#06b6d4', 600: '#0891b2', 700: '#0e7490'
  },
  ocean: {
    50: '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd',
    500: '#0284c7', 600: '#0369a1', 700: '#075985'
  },
  orange: {
    50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa',
    500: '#f97316', 600: '#ea580c', 700: '#c2410c'
  },
  red: {
    50: '#fef2f2', 100: '#fee2e2', 200: '#fecaca',
    500: '#ef4444', 600: '#dc2626', 700: '#b91c1c'
  },
  purple: {
    50: '#faf5ff', 100: '#f3e8ff', 200: '#e9d5ff',
    500: '#a855f7', 600: '#9333ea', 700: '#7e22ce'
  }
};

function applyThemeColor(themeName) {
  const palette = THEMES[themeName] || THEMES.emerald;
  const root = document.documentElement;
  root.style.setProperty('--brand-50', palette[50]);
  root.style.setProperty('--brand-100', palette[100]);
  root.style.setProperty('--brand-200', palette[200]);
  root.style.setProperty('--brand-500', palette[500]);
  root.style.setProperty('--brand-600', palette[600]);
  root.style.setProperty('--brand-700', palette[700]);
  if (AppState.config) {
    AppState.config.themeColor = themeName;
    saveData();
  }
}

// ==========================================
// 5. TOAST THÔNG BÁO (DYNAMIC CONTAINER)
// ==========================================
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'flex items-center gap-2 px-4 py-3 rounded-2xl shadow-xl border text-xs font-bold transition-all duration-300 transform translate-y-2 opacity-0 pointer-events-auto';

  let iconName = 'check-circle-2';
  if (type === 'error') {
    toast.className += ' bg-rose-900/90 text-white border-rose-700 shadow-rose-950/20';
    iconName = 'alert-circle';
  } else if (type === 'warning') {
    toast.className += ' bg-amber-900/90 text-white border-amber-700 shadow-amber-950/20';
    iconName = 'alert-triangle';
  } else if (type === 'info') {
    toast.className += ' bg-slate-900/90 text-white border-slate-700 shadow-slate-950/20';
    iconName = 'info';
  } else {
    toast.className += ' bg-slate-900/95 text-white border-emerald-500/40 shadow-emerald-950/20';
    iconName = 'check-circle-2';
  }

  toast.innerHTML = `
    <i data-lucide="${iconName}" class="w-4 h-4 shrink-0 ${type === 'error' ? 'text-rose-400' : (type === 'warning' ? 'text-amber-400' : 'text-emerald-400')}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  lucide.createIcons();

  // Animation show
  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-2', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
  });

  // Auto hide & remove
  setTimeout(() => {
    toast.classList.add('translate-y-2', 'opacity-0');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, 3000);
}

// ==========================================
// 6. ĐIỀU HƯỚNG TABS
// ==========================================
let currentTab = 'dashboard';

function switchTab(tabId) {
  currentTab = tabId;
  document.querySelectorAll('.tab-pane').forEach(el => el.classList.add('hidden'));
  const activePane = document.getElementById(`tab-${tabId}`);
  if (activePane) activePane.classList.remove('hidden');

  // Cập nhật desktop sidebar navigation
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('text-brand-700', 'bg-brand-50');
    btn.classList.add('text-slate-600', 'hover:bg-slate-100');
  });
  const activeNav = document.getElementById(`nav-${tabId}`);
  if (activeNav) {
    activeNav.classList.remove('text-slate-600', 'hover:bg-slate-100');
    activeNav.classList.add('text-brand-700', 'bg-brand-50');
  }

  // Cập nhật mobile navigation bar
  ['dashboard', 'attendance', 'finance', 'members', 'settings'].forEach(id => {
    const mBtn = document.getElementById(`m-nav-${id}`);
    if (mBtn) {
      if (id === tabId) {
        mBtn.className = 'flex flex-col items-center py-1 text-[11px] font-semibold text-brand-700';
      } else {
        mBtn.className = 'flex flex-col items-center py-1 text-[11px] font-semibold text-slate-500';
      }
    }
  });

  // Re-render tab tương ứng
  if (tabId === 'dashboard') {
    renderDashboard();
  } else if (tabId === 'attendance') {
    renderAttendanceTab();
  } else if (tabId === 'finance') {
    renderFinanceTab();
  } else if (tabId === 'members') {
    renderMemberManagementList();
  } else if (tabId === 'matchmaker') {
    renderMatchmakerTab();
  } else if (tabId === 'settings') {
    renderSettingsTab();
  }

  lucide.createIcons();
}

// ==========================================
// 7. CƠ CHẾ TÍNH BẬC TIỀN SÂN CẦU LÔNG
// ==========================================
/**
 * Tính đơn giá tiền sân cho người chơi:
 * - Khách giao lưu A/B/C: Lấy theo cấu hình riêng (VD: 70k, 100k, 150k)
 * - Thành viên chính thức & thành viên danh dự: Tính lũy kế theo số buổi trong tháng
 *   Mặc định: 0–4: 50k, 5–9: 100k, 10–15: 150k, 16–30+: 200k
 */
function calculateMemberCourtFee(member, isSimulatingNext = true) {
  if (!member) return 50000;

  if (member.type === 'GUEST_A') return AppState.config.guestPrices.GUEST_A || 90000;
  if (member.type === 'GUEST_B') return AppState.config.guestPrices.GUEST_B || 70000;
  if (member.type === 'GUEST_C') return AppState.config.guestPrices.GUEST_C || 50000;

  const sessionCount = (member.monthlySessions || 0) + (isSimulatingNext ? 1 : 0);
  const tiers = AppState.config.feeTiers || [];

  for (const tier of tiers) {
    if (sessionCount >= tier.minSessions && sessionCount <= tier.maxSessions) {
      return tier.price;
    }
  }

  // Nếu vượt quá các bậc đã định nghĩa, lấy bậc cao nhất
  if (tiers.length > 0) {
    return tiers[tiers.length - 1].price;
  }
  return 200000;
}

function getTierNameForSession(sessionCount) {
  const tiers = AppState.config.feeTiers || [];
  for (const tier of tiers) {
    if (sessionCount >= tier.minSessions && sessionCount <= tier.maxSessions) {
      return tier.name;
    }
  }
  return 'Bậc cao nhất';
}

function getMemberRoleBadge(type) {
  switch (type) {
    case 'OFFICIAL':
      return `<span class="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">Chính thức</span>`;
    case 'HONORARY':
    case 'UNOFFICIAL':
      return `<span class="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">Danh dự</span>`;
    case 'GUEST_A':
      return `<span class="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">Level A · 90k</span>`;
    case 'GUEST_B':
      return `<span class="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">Level B · 70k</span>`;
    case 'GUEST_C':
      return `<span class="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">Level C · 50k</span>`;
    default:
      return `<span class="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700">Khác</span>`;
  }
}

function getMemberRoleTypeText(type) {
  if (type === 'OFFICIAL') return 'Chính thức';
  if (type === 'HONORARY' || type === 'UNOFFICIAL') return 'Danh dự';
  if (type === 'GUEST_A') return 'Level A (90k)';
  if (type === 'GUEST_B') return 'Level B (70k)';
  if (type === 'GUEST_C') return 'Level C (50k)';
  return 'Hội viên';
}

// ==========================================
// 8. TRANG CHỦ & KPI DASHBOARD
// ==========================================
function renderDashboard() {
  // 1. Tên CLB
  const clubNameEl = document.getElementById('headerClubName');
  if (clubNameEl) clubNameEl.textContent = AppState.config.clubName;

  // 2. Ngày hiện tại
  const dateEl = document.getElementById('currentDateDisplay');
  if (dateEl) dateEl.textContent = getFormattedCurrentDate();

  // 3. KPI 1: Quỹ CLB
  const clubFundEl = document.getElementById('kpiClubFund');
  if (clubFundEl) clubFundEl.textContent = formatMoney(AppState.funds.clubFund);

  // 4. KPI 2: Quỹ tạm ứng
  const advFundEl = document.getElementById('kpiAdvanceFund');
  if (advFundEl) advFundEl.textContent = formatMoney(AppState.funds.advanceFund);

  // 5. KPI 3: Tổng số dư ví thành viên
  const totalWallet = AppState.members.reduce((sum, m) => sum + (m.balance || 0), 0);
  const totalWalletEl = document.getElementById('kpiTotalWallet');
  if (totalWalletEl) totalWalletEl.textContent = formatMoney(totalWallet);

  // 6. Render danh sách ví thành viên
  renderDashboardWalletList();

  // 8. Render giao dịch gần đây
  renderRecentTransactions();

  // 9. Auth badge
  renderAuthBadge();
}

function renderDashboardWalletList() {
  const tbody = document.getElementById('dashboardWalletTableBody');
  const searchInput = document.getElementById('searchMemberWallet');
  const memberCountBadge = document.getElementById('memberCountBadge');
  if (!tbody) return;

  const query = searchInput ? searchInput.value.trim().toLowerCase() : '';

  let list = AppState.members;
  if (query) {
    list = list.filter(m => m.name.toLowerCase().includes(query) || (m.phone && m.phone.includes(query)));
  }

  if (memberCountBadge) memberCountBadge.textContent = `${list.length} TV`;

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="py-6 text-center text-slate-400">Không tìm thấy thành viên phù hợp</td></tr>`;
    return;
  }

  tbody.innerHTML = list.map(m => {
    const isNegative = (m.balance || 0) < 0;
    const balanceClass = isNegative ? 'text-rose-600 font-bold' : ((m.balance || 0) < 100000 ? 'text-amber-600 font-bold' : 'text-slate-800 font-bold');
    
    return `
      <tr class="hover:bg-slate-50 transition">
        <td class="py-2.5 px-3">
          <div class="flex items-center gap-1.5">
            <span class="font-bold text-slate-900">${m.name}</span>
            <button onclick="openQuickRenameModal('${m.id}')" class="text-slate-400 hover:text-brand-600 p-0.5 rounded transition" title="Đổi tên / SĐT thành viên">
              <i data-lucide="pencil" class="w-3.5 h-3.5"></i>
            </button>
          </div>
          <div class="text-[11px] text-slate-400 font-normal">${m.phone || 'Chưa có SĐT'}</div>
        </td>
        <td class="py-2.5 px-2">
          ${getMemberRoleBadge(m.type)}
        </td>
        <td class="py-2.5 px-2 text-center font-bold text-slate-700">
          ${m.monthlySessions || 0} buổi
        </td>
        <td class="py-2.5 px-3 text-right ${balanceClass}">
          ${formatMoney(m.balance || 0)}
        </td>
        <td class="py-2.5 px-2 text-center">
          <div class="flex items-center justify-center gap-1">
            <button onclick="quickCheckInSingleMember('${m.id}')" class="px-2 py-1 bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200 font-bold rounded-lg text-[11px] transition" title="⚡ Điểm danh 1-chạm (trừ ví ngay)">
              ⚡
            </button>
            <button onclick="openTopUpModalForMember('${m.id}')" class="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-bold rounded-lg text-[11px] transition" title="Nạp ví nhanh">
              + Nạp
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function renderRecentTransactions() {
  const container = document.getElementById('recentTransactionsList');
  if (!container) return;

  const recent = (AppState.transactions || []).slice().reverse().slice(0, 8);

  if (recent.length === 0) {
    container.innerHTML = `<div class="py-8 text-center text-slate-400 text-xs">Chưa có giao dịch nào được ghi nhận</div>`;
    return;
  }

  container.innerHTML = recent.map(tx => {
    let icon = 'arrow-right-left';
    let iconBg = 'bg-slate-100 text-slate-600';
    let amountColor = 'text-slate-900';
    let prefix = '';

    if (tx.type === 'TOPUP') {
      icon = 'plus-circle';
      iconBg = 'bg-emerald-50 text-emerald-600';
      amountColor = 'text-emerald-600';
      prefix = '+';
    } else if (tx.type === 'COURT_FEE') {
      icon = 'check-circle';
      iconBg = 'bg-blue-50 text-blue-600';
      amountColor = 'text-slate-800';
      prefix = '-';
    } else if (tx.type === 'FUND_IN') {
      icon = 'trending-up';
      iconBg = 'bg-emerald-50 text-emerald-600';
      amountColor = 'text-emerald-600';
      prefix = '+';
    } else if (tx.type === 'FUND_OUT') {
      icon = 'trending-down';
      iconBg = 'bg-rose-50 text-rose-600';
      amountColor = 'text-rose-600';
      prefix = '-';
    } else if (tx.type === 'FINE') {
      icon = 'alert-triangle';
      iconBg = 'bg-amber-50 text-amber-600';
      amountColor = 'text-amber-600';
      prefix = '+';
    } else if (tx.type === 'ADVANCE') {
      icon = 'hand-coins';
      iconBg = 'bg-purple-50 text-purple-600';
      amountColor = 'text-purple-600';
    }

    const cleanAmount = Math.abs(tx.amount);

    return `
      <div class="p-2.5 rounded-xl border border-slate-100 hover:bg-slate-50 transition flex items-start justify-between gap-2">
        <div class="flex items-start gap-2.5">
          <div class="w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center shrink-0 mt-0.5">
            <i data-lucide="${icon}" class="w-4 h-4"></i>
          </div>
          <div>
            <div class="font-bold text-xs text-slate-800">${tx.targetName || 'Giao dịch'}</div>
            <div class="text-[11px] text-slate-500 line-clamp-1">${tx.description}</div>
            <div class="text-[10px] text-slate-400 mt-0.5">${tx.date}</div>
          </div>
        </div>
        <div class="text-right shrink-0">
          <div class="font-black text-xs ${amountColor}">${prefix}${formatMoney(cleanAmount)}</div>
          <div class="text-[10px] text-slate-400">${tx.operator || 'admin'}</div>
        </div>
      </div>
    `;
  }).join('');

  lucide.createIcons();
}

// ==========================================
// 9. BUỔI HOẠT ĐỘNG, ĐIỂM DANH & CHIA TIỀN (THEO MẪU ẢNH MOBILE)
// ==========================================
let activityState = {
  initialized: false,
  date: '',
  type: 'Buổi cầu',
  lang: 'VI',
  selectedMemberIds: new Set(),
  selectedGuestIds: new Set(),
  saveGuestDebt: false,
  expenses: [
    { id: 1, title: 'ĐƠN GIÁ THEO NGÀY 12', qty: 1, unitPrice: 340000, amount: 340000, isCombo: false }
  ],
  frontPersonId: 'NONE',
  frontAmount: 0,
  isFrontAll: false,
  tipAmount: 0,
  matches: []
};

function initActivitySessionData() {
  activityState.date = getTodayInputFormat();
  activityState.type = 'Buổi cầu';
  activityState.lang = 'VI';
  activityState.selectedMemberIds = new Set();
  activityState.selectedGuestIds = new Set();
  activityState.saveGuestDebt = false;
  activityState.expenses = [
    { id: 1, title: 'ĐƠN GIÁ THEO NGÀY 12', qty: 1, unitPrice: 340000, amount: 340000, isCombo: false }
  ];
  activityState.frontPersonId = 'NONE';
  activityState.frontAmount = 0;
  activityState.isFrontAll = false;
  activityState.tipAmount = 0;

  // Khởi tạo các trận cầu mẫu theo yêu cầu người dùng:
  // Trận 1: A B đấu với C D
  // Trận 2: A C đấu với C E
  activityState.matches = [
    { id: 1, team1: ['M001', 'M002'], team2: ['M003', 'M004'], score1: 21, score2: 18, prize: '4 Bò húc' },
    { id: 2, team1: ['M001', 'M003'], team2: ['M003', 'M005'], score1: 21, score2: 19, prize: '1 Tháp bia' }
  ];

  // Mặc định CHƯA ĐIỂM DANH thành viên nào theo yêu cầu người dùng (luôn hiển thị chưa điểm danh: 0/27)
  activityState.selectedMemberIds = new Set();
  activityState.selectedGuestIds = new Set();
  activityState.temporaryAttendanceSaved = false;
  activityState.savedAttendanceTime = null;
  activityState.isEditingAttendance = false;

  activityState.initialized = true;
}

function renderAttendanceTab() {
  if (!activityState.initialized) {
    initActivitySessionData();
  }

  const dateInp = document.getElementById('actDateInput');
  if (dateInp) dateInp.value = activityState.date || getTodayInputFormat();

  const typeSel = document.getElementById('actTypeSelect');
  if (typeSel) typeSel.value = activityState.type;

  renderActivityMemberChips();
  renderActivityGuestChips();
  renderActivityExpenseRows();
  populateFrontPersonDropdown();
  recalculateActivitySplit();
  updateAttendanceSaveBarUI();
  renderActivityMatches();
  lucide.createIcons();
}

// --- 3. ĐIỂM DANH THÀNH VIÊN (CHIP NÚT 6 TRÊN CÙNG 1 HÀNG THU GỌN GÀNG) ---
function renderActivityMemberChips() {
  const officialGrid = document.getElementById('actOfficialMemberGrid');
  const honoraryGrid = document.getElementById('actHonoraryMemberGrid');
  const totalBadge = document.getElementById('actMemberCountBadge');
  const offBadge = document.getElementById('actOfficialCountBadge');
  const honBadge = document.getElementById('actHonoraryCountBadge');

  if (!officialGrid || !honoraryGrid) return;

  const officialMembers = AppState.members.filter(m => m.type === 'OFFICIAL');
  const honoraryMembers = AppState.members.filter(m => m.type === 'HONORARY' || m.type === 'UNOFFICIAL');

  let offSelectedCount = 0;
  let honSelectedCount = 0;

  // Render Thành viên chính thức (20 người - 6 trên 1 hàng)
  officialGrid.innerHTML = officialMembers.map(m => {
    const isSel = activityState.selectedMemberIds.has(m.id);
    if (isSel) offSelectedCount++;
    const label = m.chipName || m.name.split(' ').pop().toUpperCase();

    return `
      <button type="button" onclick="toggleActivityMember('${m.id}')"
        class="py-1 px-0.5 rounded-xl text-[10px] sm:text-[11px] font-bold transition shadow-2xs select-none min-h-[34px] flex items-center justify-center cursor-pointer leading-tight ${
          isSel 
            ? 'bg-emerald-700 hover:bg-emerald-800 text-white font-black shadow-emerald-900/15 ring-1 ring-emerald-600' 
            : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
        }" title="${m.name} (${formatMoney(m.balance || 0)})">
        <span class="truncate max-w-full">${isSel ? '✓ ' : ''}${label}</span>
      </button>
    `;
  }).join('');

  // Render Thành viên danh dự (7 người - 6 trên 1 hàng)
  honoraryGrid.innerHTML = honoraryMembers.map(m => {
    const isSel = activityState.selectedMemberIds.has(m.id);
    if (isSel) honSelectedCount++;
    const label = m.chipName || m.name.split(' ').pop().toUpperCase();

    return `
      <button type="button" onclick="toggleActivityMember('${m.id}')"
        class="py-1 px-0.5 rounded-xl text-[10px] sm:text-[11px] font-bold transition shadow-2xs select-none min-h-[34px] flex items-center justify-center cursor-pointer leading-tight ${
          isSel 
            ? 'bg-emerald-700 hover:bg-emerald-800 text-white font-black shadow-emerald-900/15 ring-1 ring-emerald-600' 
            : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
        }" title="${m.name} (${formatMoney(m.balance || 0)})">
        <span class="truncate max-w-full">${isSel ? '✓ ' : ''}${label}</span>
      </button>
    `;
  }).join('');

  if (totalBadge) totalBadge.textContent = activityState.selectedMemberIds.size;
  if (offBadge) offBadge.textContent = `${offSelectedCount}/${officialMembers.length}`;
  if (honBadge) honBadge.textContent = `${honSelectedCount}/${honoraryMembers.length}`;
}

function toggleActivityMember(memberId) {
  if (activityState.selectedMemberIds.has(memberId)) {
    activityState.selectedMemberIds.delete(memberId);
  } else {
    activityState.selectedMemberIds.add(memberId);
  }
  if (activityState.temporaryAttendanceSaved) {
    activityState.isEditingAttendance = true;
  }
  renderActivityMemberChips();
  recalculateActivitySplit();
  updateAttendanceSaveBarUI();
  renderActivityMatches();
}

function selectAllActivityMembers() {
  AppState.members.forEach(m => {
    if (m.type === 'OFFICIAL' || m.type === 'HONORARY' || m.type === 'UNOFFICIAL') {
      activityState.selectedMemberIds.add(m.id);
    }
  });
  if (activityState.temporaryAttendanceSaved) {
    activityState.isEditingAttendance = true;
  }
  renderActivityMemberChips();
  recalculateActivitySplit();
  updateAttendanceSaveBarUI();
  renderActivityMatches();
}

function deselectAllActivityMembers() {
  activityState.selectedMemberIds.clear();
  if (activityState.temporaryAttendanceSaved) {
    activityState.isEditingAttendance = true;
  }
  renderActivityMemberChips();
  recalculateActivitySplit();
  updateAttendanceSaveBarUI();
  renderActivityMatches();
}

// --- 4. KHÁCH (HIỂN THỊ MỖI LEVEL TRÊN 1 DÒNG: Level A : THẾ ANH , PHONG , QUANG-Q) ---
function renderActivityGuestChips() {
  const container = document.getElementById('actGuestLevelsContainer') || document.getElementById('actGuestMemberGrid');
  const countBadge = document.getElementById('actGuestCountBadge');
  if (!container) return;

  if (countBadge) countBadge.textContent = activityState.selectedGuestIds.size;

  const guests = AppState.members.filter(m => m.type && m.type.startsWith('GUEST'));

  if (guests.length === 0) {
    container.innerHTML = `<span class="text-slate-400 text-xs italic py-1">Chưa có khách nào trong danh sách.</span>`;
    return;
  }

  const levels = [
    { key: 'GUEST_A', label: 'Level A', price: 90000, color: 'text-emerald-800' },
    { key: 'GUEST_B', label: 'Level B', price: 70000, color: 'text-amber-800' },
    { key: 'GUEST_C', label: 'Level C', price: 50000, color: 'text-blue-800' }
  ];

  container.className = "space-y-2";

  container.innerHTML = levels.map(lvl => {
    const groupGuests = guests.filter(g => g.type === lvl.key || g.level === lvl.label.replace('Level ', ''));
    if (groupGuests.length === 0) return '';

    return `
      <div class="flex items-center gap-2 py-1 flex-nowrap overflow-x-auto mobile-scroll">
        <!-- Nhãn Level trên cùng 1 dòng -->
        <div class="shrink-0 flex items-center gap-1 font-black text-xs min-w-[68px]">
          <span class="${lvl.color} font-extrabold">${lvl.label}</span>
          <span class="text-slate-400 font-bold">:</span>
        </div>

        <!-- Danh sách khách hiển thị dạng chip nút bấm trên cùng 1 dòng -->
        <div class="flex items-center gap-1.5 flex-nowrap shrink-0">
          ${groupGuests.map((g, idx) => {
            const isSel = activityState.selectedGuestIds.has(g.id);
            const displayName = g.chipName || g.name;
            return `
              <button type="button" onclick="toggleActivityGuest('${g.id}')"
                class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow-2xs select-none whitespace-nowrap cursor-pointer flex items-center gap-1 shrink-0 ${
                  isSel 
                    ? 'bg-emerald-700 text-white shadow-emerald-900/15 ring-1 ring-emerald-600 font-black' 
                    : 'bg-white text-slate-800 border border-slate-200 hover:border-slate-300'
                }">
                <span>${isSel ? '✓ ' : ''}${displayName}</span>
              </button>
              ${idx < groupGuests.length - 1 ? '<span class="text-slate-300 font-bold text-xs select-none">,</span>' : ''}
            `;
          }).join('')}
        </div>
      </div>
    `;
  }).join('');
}

function toggleActivityGuest(guestId) {
  if (activityState.selectedGuestIds.has(guestId)) {
    activityState.selectedGuestIds.delete(guestId);
  } else {
    activityState.selectedGuestIds.add(guestId);
  }
  if (activityState.temporaryAttendanceSaved) {
    activityState.isEditingAttendance = true;
  }
  renderActivityGuestChips();
  recalculateActivitySplit();
  updateAttendanceSaveBarUI();
  renderActivityMatches();
}

function addNewGuestInline() {
  const nameInput = document.getElementById('newGuestNameInput');
  const levelSelect = document.getElementById('newGuestLevelSelect');
  if (!nameInput) return;

  const rawName = nameInput.value.trim();
  if (!rawName) {
    showToast('Vui lòng nhập tên khách mới!', 'warning');
    nameInput.focus();
    return;
  }

  let levelKey = levelSelect ? levelSelect.value : 'GUEST_C';
  if (levelKey === 'UNRANKED') levelKey = 'GUEST_C';

  const fee = levelKey === 'GUEST_A' ? 90000 : (levelKey === 'GUEST_B' ? 70000 : 50000);
  const levelLetter = levelKey.replace('GUEST_', '');

  const newGuest = {
    id: 'G_' + Date.now(),
    name: rawName,
    chipName: rawName.toUpperCase(),
    phone: '',
    type: levelKey,
    level: levelLetter,
    fee: fee,
    username: '',
    password: '',
    balance: 0,
    monthlySessions: 1
  };

  AppState.members.push(newGuest);
  activityState.selectedGuestIds.add(newGuest.id);
  if (activityState.temporaryAttendanceSaved) {
    activityState.isEditingAttendance = true;
  }
  saveData();

  nameInput.value = '';
  renderActivityGuestChips();
  recalculateActivitySplit();
  updateAttendanceSaveBarUI();
  renderActivityMatches();
  showToast(`Đã thêm khách "${rawName}" (${levelLetter} - ${formatMoney(fee)})!`, 'success');
}

function toggleSaveGuestDebt(checked) {
  activityState.saveGuestDebt = checked;
}

// --- 4C. DÒNG LƯU VÀ SỬA ĐIỂM DANH TẠM THỜI (ÁP DỤNG CHO THỐNG KÊ TRẬN CẦU) ---
function updateAttendanceSaveBarUI() {
  const bar = document.getElementById('actAttendanceSaveBar');
  const badge = document.getElementById('actSaveStatusBadge');
  const countText = document.getElementById('actSaveCountText');
  const noteText = document.getElementById('actSaveNoteText');
  const btnSave = document.getElementById('btnSaveTempAttendance');
  const btnLabel = document.getElementById('btnSaveTempAttendanceLabel');

  if (!bar) return;

  const memCount = activityState.selectedMemberIds ? activityState.selectedMemberIds.size : 0;
  const guestCount = activityState.selectedGuestIds ? activityState.selectedGuestIds.size : 0;
  const total = memCount + guestCount;

  if (activityState.temporaryAttendanceSaved) {
    if (activityState.isEditingAttendance) {
      // Đang ở chế độ chỉnh sửa / bổ sung
      bar.className = 'mt-3 p-3 rounded-2xl border border-amber-300 bg-amber-50/80 flex items-center justify-between gap-2.5 flex-wrap shadow-2xs transition-all';
      if (badge) {
        badge.className = 'px-2 py-1 rounded-lg text-[10px] font-black bg-amber-200 text-amber-900 tracking-tight shrink-0 transition-colors';
        badge.textContent = 'Đang bổ sung...';
      }
      if (countText) countText.textContent = `${total} người đang chọn (${memCount} TV, ${guestCount} Khách)`;
      if (noteText) noteText.textContent = 'Chạm thêm người vừa đến rồi bấm "Lưu bổ sung" để cập nhật trận cầu';
      if (btnLabel) btnLabel.textContent = 'Lưu bổ sung';
      if (btnSave) btnSave.className = 'px-3 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black text-xs shadow-xs flex items-center gap-1.5 transition active:scale-95 cursor-pointer';
    } else {
      // Đã lưu tạm thành công
      bar.className = 'mt-3 p-3 rounded-2xl border border-emerald-300 bg-emerald-50/80 flex items-center justify-between gap-2.5 flex-wrap shadow-2xs transition-all';
      if (badge) {
        badge.className = 'px-2 py-1 rounded-lg text-[10px] font-black bg-emerald-200 text-emerald-900 tracking-tight shrink-0 transition-colors';
        badge.textContent = '✓ Đã lưu tạm';
      }
      if (countText) countText.textContent = `${total} người đã lưu (${memCount} TV, ${guestCount} Khách)`;
      if (noteText) noteText.textContent = `Đã áp dụng cho các trận cầu • Lưu lúc ${activityState.savedAttendanceTime || ''}`;
      if (btnLabel) btnLabel.textContent = '✓ Đã lưu tạm';
      if (btnSave) btnSave.className = 'px-3 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs shadow-xs flex items-center gap-1.5 transition active:scale-95 cursor-pointer';
    }
  } else {
    // Chưa lưu lần nào
    bar.className = 'mt-3 p-3 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-2.5 flex-wrap shadow-2xs transition-all';
    if (badge) {
      badge.className = 'px-2 py-1 rounded-lg text-[10px] font-black bg-slate-200 text-slate-700 tracking-tight shrink-0 transition-colors';
      badge.textContent = 'Chưa lưu tạm';
    }
    if (countText) countText.textContent = `${total} người được chọn (${memCount} TV, ${guestCount} Khách)`;
    if (noteText) noteText.textContent = 'Bấm "Lưu điểm danh" để nạp vào thống kê các trận cầu';
    if (btnLabel) btnLabel.textContent = 'Lưu điểm danh';
    if (btnSave) btnSave.className = 'px-3 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs shadow-xs flex items-center gap-1.5 transition active:scale-95 cursor-pointer';
  }
}

function saveTemporaryAttendance() {
  const memCount = activityState.selectedMemberIds ? activityState.selectedMemberIds.size : 0;
  const guestCount = activityState.selectedGuestIds ? activityState.selectedGuestIds.size : 0;
  const total = memCount + guestCount;

  if (total === 0) {
    showToast('Vui lòng chọn ít nhất 1 thành viên hoặc khách trước khi lưu điểm danh!', 'warning');
    return;
  }

  activityState.temporaryAttendanceSaved = true;
  activityState.isEditingAttendance = false;
  activityState.savedAttendanceTime = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

  // Tự động gán người chơi cho các trận cầu mẫu nếu đang để trống
  const attendees = getCheckedInAttendees();
  if (activityState.matches && activityState.matches.length > 0 && attendees.length >= 4) {
    const m1 = activityState.matches[0];
    if (m1 && (!m1.team1[0] || m1.team1[0] === 'M001')) {
      m1.team1 = [attendees[0].id, attendees[1].id];
      m1.team2 = [attendees[2].id, attendees[3].id];
    }
  }

  updateAttendanceSaveBarUI();
  renderActivityMatches();

  showToast(`✓ Đã lưu tạm ${total} người điểm danh! Đã áp dụng cho thống kê các trận cầu.`, 'success');
}

function editAttendancePrompt() {
  activityState.isEditingAttendance = true;
  updateAttendanceSaveBarUI();

  // Cuộn mượt mà lên phần điểm danh thành viên
  const memSection = document.getElementById('actOfficialMemberGrid');
  if (memSection) {
    memSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    memSection.classList.add('ring-2', 'ring-amber-400', 'p-1', 'rounded-xl', 'transition-all');
    setTimeout(() => {
      memSection.classList.remove('ring-2', 'ring-amber-400', 'p-1', 'rounded-xl');
    }, 1200);
  }

  showToast('Chế độ sửa / bổ sung: Hãy chạm chọn thêm người vừa đến rồi bấm "Lưu bổ sung"!', 'info');
}

// --- 5. CHI PHÍ (THEO ẢNH 1) ---
function renderActivityExpenseRows() {
  const container = document.getElementById('actExpenseRowsContainer');
  if (!container) return;

  container.innerHTML = activityState.expenses.map((exp, idx) => {
    return `
      <div class="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm space-y-2.5 relative">
        <div class="flex items-center gap-2">
          <input type="text" value="${exp.title}" placeholder="Nội dung chi phí" oninput="updateExpenseTitle(${exp.id}, this.value)" class="flex-1 text-xs border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold text-slate-800" />
          <button type="button" onclick="removeActivityExpenseRow(${exp.id})" class="p-2 text-slate-400 hover:text-rose-600 rounded-lg transition" title="Xóa dòng này">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </div>

        <div class="grid grid-cols-3 gap-2">
          <div>
            <label class="block text-[10px] text-slate-400 font-bold mb-0.5">Số lượng</label>
            <input type="number" min="1" value="${exp.qty}" oninput="updateExpenseQty(${exp.id}, this.value)" class="w-full text-xs font-bold border border-slate-200 rounded-xl px-2.5 py-1.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-center" />
          </div>
          <div>
            <label class="block text-[10px] text-slate-400 font-bold mb-0.5">Đơn giá</label>
            <input type="number" min="0" step="5000" value="${exp.unitPrice}" oninput="updateExpenseUnitPrice(${exp.id}, this.value)" class="w-full text-xs font-bold border border-slate-200 rounded-xl px-2.5 py-1.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-right" />
          </div>
          <div>
            <label class="block text-[10px] text-slate-400 font-bold mb-0.5">Số tiền</label>
            <input type="number" min="0" step="5000" value="${exp.amount}" oninput="updateExpenseAmountDirect(${exp.id}, this.value)" class="w-full text-xs font-black text-emerald-800 border border-slate-200 rounded-xl px-2.5 py-1.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-right" />
          </div>
        </div>

        <div class="flex items-center gap-1.5 pt-0.5">
          <input type="checkbox" id="combo_${exp.id}" ${exp.isCombo ? 'checked' : ''} onchange="updateExpenseCombo(${exp.id}, this.checked)" class="w-3.5 h-3.5 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer" />
          <label for="combo_${exp.id}" class="text-xs font-semibold text-slate-600 cursor-pointer select-none">Mua combo</label>
        </div>
      </div>
    `;
  }).join('');

  lucide.createIcons();
}

function addActivityExpenseRow() {
  activityState.expenses.push({
    id: Date.now(),
    title: '',
    qty: 1,
    unitPrice: 0,
    amount: 0,
    isCombo: false
  });
  renderActivityExpenseRows();
  recalculateActivitySplit();
}

function removeActivityExpenseRow(id) {
  activityState.expenses = activityState.expenses.filter(e => e.id !== id);
  if (activityState.expenses.length === 0) {
    activityState.expenses.push({ id: Date.now(), title: '', qty: 1, unitPrice: 0, amount: 0, isCombo: false });
  }
  renderActivityExpenseRows();
  recalculateActivitySplit();
}

function updateExpenseTitle(id, val) {
  const exp = activityState.expenses.find(e => e.id === id);
  if (exp) exp.title = val;
}

function updateExpenseQty(id, val) {
  const exp = activityState.expenses.find(e => e.id === id);
  if (exp) {
    exp.qty = Math.max(1, Number(val) || 1);
    exp.amount = exp.qty * exp.unitPrice;
    renderActivityExpenseRows();
    recalculateActivitySplit();
  }
}

function updateExpenseUnitPrice(id, val) {
  const exp = activityState.expenses.find(e => e.id === id);
  if (exp) {
    exp.unitPrice = Math.max(0, Number(val) || 0);
    exp.amount = exp.qty * exp.unitPrice;
    renderActivityExpenseRows();
    recalculateActivitySplit();
  }
}

function updateExpenseAmountDirect(id, val) {
  const exp = activityState.expenses.find(e => e.id === id);
  if (exp) {
    exp.amount = Math.max(0, Number(val) || 0);
    exp.unitPrice = Math.round(exp.amount / exp.qty);
    recalculateActivitySplit();
  }
}

function updateExpenseCombo(id, checked) {
  const exp = activityState.expenses.find(e => e.id === id);
  if (exp) exp.isCombo = checked;
}

function applyDailyRatePreset(rate) {
  if (activityState.expenses.length > 0) {
    activityState.expenses[0].title = 'ĐƠN GIÁ THEO NGÀY 12';
    activityState.expenses[0].unitPrice = rate;
    activityState.expenses[0].amount = rate;
  } else {
    activityState.expenses.push({
      id: Date.now(),
      title: 'ĐƠN GIÁ THEO NGÀY 12',
      qty: 1,
      unitPrice: rate,
      amount: rate,
      isCombo: false
    });
  }
  renderActivityExpenseRows();
  recalculateActivitySplit();
  showToast(`Đã áp dụng đơn giá ngày: ${formatMoney(rate)}`, 'success');
}

// --- 6. KHOẢN ĐÓNG GÓP & NGƯỜI ỨNG TIỀN ---
function populateFrontPersonDropdown() {
  const select = document.getElementById('actFrontPersonSelect');
  if (!select) return;

  const eligible = AppState.members.filter(m => m.type === 'OFFICIAL' || m.type === 'HONORARY');

  let html = `<option value="NONE" ${activityState.frontPersonId === 'NONE' ? 'selected' : ''}>Không ai</option>`;
  eligible.forEach(m => {
    html += `<option value="${m.id}" ${activityState.frontPersonId === m.id ? 'selected' : ''}>${m.name}</option>`;
  });
  select.innerHTML = html;
}

function onFrontPersonChanged(val) {
  activityState.frontPersonId = val;
  recalculateActivitySplit();
}

function onFrontAllToggled(checked) {
  activityState.isFrontAll = checked;
  recalculateActivitySplit();
}

function onFrontAmountChanged(val) {
  activityState.frontAmount = Math.max(0, Number(val) || 0);
  const chk = document.getElementById('actFrontAllCheckbox');
  if (chk && activityState.isFrontAll) {
    chk.checked = false;
    activityState.isFrontAll = false;
  }
  recalculateActivitySplit();
}

function onTipAmountChanged(val) {
  activityState.tipAmount = Math.max(0, Number(val) || 0);
  recalculateActivitySplit();
}

function onActivityDateChanged(val) {
  activityState.date = val;
}

function onActivityTypeChanged(val) {
  activityState.type = val;
}

function setActivityLanguage(lang) {
  activityState.lang = lang;
  const btnVI = document.getElementById('actBtnLangVI');
  const btnEN = document.getElementById('actBtnLangEN');
  if (lang === 'VI') {
    if (btnVI) { btnVI.className = 'px-2.5 py-1 rounded-md bg-slate-900 text-white shadow-sm transition'; }
    if (btnEN) { btnEN.className = 'px-2.5 py-1 rounded-md text-slate-600 hover:text-slate-900 transition'; }
  } else {
    if (btnVI) { btnVI.className = 'px-2.5 py-1 rounded-md text-slate-600 hover:text-slate-900 transition'; }
    if (btnEN) { btnEN.className = 'px-2.5 py-1 rounded-md bg-slate-900 text-white shadow-sm transition'; }
  }
}

// --- 6B. THỐNG KÊ CÁC TRẬN CẦU & CHỌN NHANH NGƯỜI CHƠI (MATCH LOG) ---
function getCheckedInAttendees() {
  const list = [];
  // Thành viên có mặt (Chính thức + Danh dự)
  activityState.selectedMemberIds.forEach(id => {
    const m = AppState.members.find(x => x.id === id);
    if (m) {
      list.push({
        id: m.id,
        name: m.name,
        chipName: m.chipName || m.name.split(' ').pop().toUpperCase(),
        type: m.type
      });
    }
  });
  // Khách có mặt
  activityState.selectedGuestIds.forEach(id => {
    const g = AppState.members.find(x => x.id === id);
    if (g) {
      list.push({
        id: g.id,
        name: g.name,
        chipName: g.chipName || g.name,
        type: g.type
      });
    }
  });
  return list;
}

function buildAttendeeOptions(selectedId) {
  const attendees = getCheckedInAttendees();
  let html = `<option value="">-- Chọn người chơi --</option>`;
  attendees.forEach(a => {
    const isSel = a.id === selectedId ? 'selected' : '';
    html += `<option value="${a.id}" ${isSel}>${a.chipName} (${a.name})</option>`;
  });
  return html;
}

function getAttendeeDisplayName(id) {
  if (!id) return '...';
  const found = AppState.members.find(m => m.id === id);
  if (!found) return id;
  return found.chipName || found.name.split(' ').pop().toUpperCase();
}

/**
 * Format dòng kết quả trận đấu hiển thị tỉ số ngay theo từng cặp:
 * Ví dụ: Trận 1: CHÍNH CÔNG (21) 🏆 đấu với DŨNG DUY (18)
 */
function formatMatchResultInfo(idx, m) {
  const p1 = (m.team1 && m.team1[0]) || '';
  const p2 = (m.team1 && m.team1[1]) || '';
  const p3 = (m.team2 && m.team2[0]) || '';
  const p4 = (m.team2 && m.team2[1]) || '';

  const name1 = getAttendeeDisplayName(p1);
  const name2 = getAttendeeDisplayName(p2);
  const name3 = getAttendeeDisplayName(p3);
  const name4 = getAttendeeDisplayName(p4);

  const pair1 = `${name1} ${name2}`.trim() || 'Cặp 1';
  const pair2 = `${name3} ${name4}`.trim() || 'Cặp 2';

  const s1 = (m.score1 !== undefined && m.score1 !== null) ? Number(m.score1) : 0;
  const s2 = (m.score2 !== undefined && m.score2 !== null) ? Number(m.score2) : 0;
  const prize = (m.prize && m.prize.trim()) ? m.prize.trim() : '';

  let highlight1 = 'font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-lg';
  let highlight2 = 'font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-lg';
  let badge1 = '';
  let badge2 = '';
  let statusBadge = '<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">Đang đấu</span>';
  const prizePill = prize ? `<span class="inline-flex items-center gap-1 font-bold text-amber-800 bg-amber-100 border border-amber-300 px-1.5 py-0.5 rounded text-[10px] shadow-2xs">🎁 ${prize}</span>` : '';

  if (s1 > s2 && (s1 > 0 || s2 > 0)) {
    highlight1 = 'font-black text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-lg border border-emerald-300';
    badge1 = ' <span class="text-xs" title="Đội 1 Thắng">🏆</span>';
    statusBadge = `<span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300 inline-flex items-center gap-1.5">🏆 ${pair1} Thắng ${prizePill}</span>`;
  } else if (s2 > s1 && (s1 > 0 || s2 > 0)) {
    highlight2 = 'font-black text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-lg border border-emerald-300';
    badge2 = ' <span class="text-xs" title="Đội 2 Thắng">🏆</span>';
    statusBadge = `<span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300 inline-flex items-center gap-1.5">🏆 ${pair2} Thắng ${prizePill}</span>`;
  } else if (s1 === s2 && s1 > 0) {
    statusBadge = `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300 inline-flex items-center gap-1.5">Hòa ${prizePill}</span>`;
  } else if (prize) {
    statusBadge = `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 inline-flex items-center gap-1.5">Đang đấu ${prizePill}</span>`;
  }

  const prizeLineTag = prize ? ` <span class="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">🎁 ${prize}</span>` : '';
  const lineHtml = `Trận ${idx + 1}: <span class="${highlight1}"><b>${pair1}</b> (${s1})${badge1}</span> <span class="text-slate-400 font-bold px-1">đấu với</span> <span class="${highlight2}"><b>${pair2}</b> (${s2})${badge2}</span>${prizeLineTag}`;
  const headerPill = `🏸 ${pair1} (${s1}) - (${s2}) ${pair2}${prize ? ` • 🎁 ${prize}` : ''}`;

  return { s1, s2, pair1, pair2, prize, lineHtml, headerPill, statusBadge };
}

function updateMatchResultRealtime() {
  const matches = activityState.matches || [];
  
  // Cập nhật bảng tổng hợp dòng trận đấu ở trên
  const summaryCard = document.getElementById('actMatchLinesSummaryCard');
  const summaryContainer = document.getElementById('actMatchLinesSummary');
  if (summaryCard && summaryContainer) {
    if (matches.length === 0) {
      summaryCard.classList.add('hidden');
    } else {
      summaryCard.classList.remove('hidden');
      summaryContainer.innerHTML = matches.map((m, idx) => {
        const info = formatMatchResultInfo(idx, m);
        return `
          <div class="p-2 bg-white rounded-xl border border-emerald-200/90 shadow-2xs flex items-center justify-between flex-wrap gap-2">
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="w-5 h-5 rounded-md bg-emerald-700 text-white font-black text-[10px] flex items-center justify-center">${idx + 1}</span>
              <span class="text-xs text-slate-800">${info.lineHtml}</span>
            </div>
            <div>${info.statusBadge}</div>
          </div>
        `;
      }).join('');
    }
  }

  // Cập nhật từng card trận đấu
  matches.forEach((m, idx) => {
    const info = formatMatchResultInfo(idx, m);
    const lineEl = document.getElementById(`matchCardResultLine-${m.id}`);
    const badgeEl = document.getElementById(`matchHeaderResult-${m.id}`);
    if (lineEl) {
      lineEl.innerHTML = `
        <div class="flex items-center gap-1.5 flex-wrap">
          <span class="text-xs">🏸</span>
          <span class="text-xs">${info.lineHtml}</span>
        </div>
        <div>${info.statusBadge}</div>
      `;
    }
    if (badgeEl) {
      badgeEl.textContent = info.headerPill;
    }
  });
}

function renderActivityMatches() {
  const container = document.getElementById('actMatchesContainer');
  const countBadge = document.getElementById('actMatchCountBadge');
  const statsBar = document.getElementById('actMemberMatchStatsBar');

  if (!container) return;

  const matches = activityState.matches || [];
  if (countBadge) countBadge.textContent = `${matches.length} trận`;

  // Thống kê số lần ra sân của từng thành viên có mặt
  const matchCounts = {};
  const attendees = getCheckedInAttendees();
  attendees.forEach(a => matchCounts[a.id] = 0);

  matches.forEach(m => {
    (m.team1 || []).forEach(pId => { if (matchCounts[pId] !== undefined) matchCounts[pId]++; });
    (m.team2 || []).forEach(pId => { if (matchCounts[pId] !== undefined) matchCounts[pId]++; });
  });

  // Render thanh tần suất
  if (statsBar) {
    if (attendees.length === 0) {
      statsBar.innerHTML = `<span class="text-slate-400 text-[11px] italic">Chưa có ai được điểm danh có mặt trong buổi này</span>`;
    } else {
      statsBar.innerHTML = attendees.map(a => {
        const c = matchCounts[a.id] || 0;
        const color = c === 0 ? 'bg-slate-100 text-slate-500 border-slate-200' : (c >= 2 ? 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold' : 'bg-white text-slate-800 border-slate-200');
        return `
          <span class="px-2 py-1 rounded-lg text-[11px] border ${color} flex items-center gap-1 shadow-xs">
            <span>${a.chipName}:</span>
            <b class="text-xs">${c} trận</b>
          </span>
        `;
      }).join('');
    }
  }

  // Render từng trận đấu
  if (matches.length === 0) {
    container.innerHTML = `
      <div class="py-6 text-center text-slate-400 text-xs bg-slate-50 rounded-2xl border border-dashed border-slate-200">
        Chưa có trận đấu nào được ghi nhận. Bấm <b>+ Thêm trận</b> hoặc <b>🎲 Bốc ngẫu nhiên</b> để bắt đầu!
      </div>
    `;
    updateMatchResultRealtime();
    return;
  }

  container.innerHTML = matches.map((m, idx) => {
    const p1 = (m.team1 && m.team1[0]) || '';
    const p2 = (m.team1 && m.team1[1]) || '';
    const p3 = (m.team2 && m.team2[0]) || '';
    const p4 = (m.team2 && m.team2[1]) || '';

    const info = formatMatchResultInfo(idx, m);

    return `
      <div class="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm space-y-2.5">
        <!-- Match Header: Tiêu đề + Huy hiệu kết quả theo cặp + Xóa -->
        <div class="flex items-center justify-between flex-wrap gap-2">
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-lg bg-emerald-700 text-white font-black text-xs flex items-center justify-center">${idx + 1}</span>
            <b class="text-xs text-slate-900 font-black uppercase tracking-tight">Trận cầu #${idx + 1}</b>
            <span id="matchHeaderResult-${m.id}" class="text-[11px] font-bold text-emerald-900 bg-emerald-100/90 px-2 py-0.5 rounded-lg border border-emerald-300 shadow-2xs">
              ${info.headerPill}
            </span>
          </div>
          <button type="button" onclick="removeActivityMatch(${m.id})" class="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition" title="Xóa trận này">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
          </button>
        </div>

        <!-- Match Teams & Scores Pickers (Tỉ số đi liền theo từng cặp) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
          
          <!-- Đội 1 (Cặp 1) + Ô nhập tỉ số của Đội 1 -->
          <div class="space-y-1.5 bg-emerald-50/50 p-2 rounded-xl border border-emerald-200/80">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-1.5 text-[10px] font-black text-emerald-900 uppercase tracking-tight">
                <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Đội 1 (Cặp 1)</span>
              </div>
              <div class="flex items-center gap-1 bg-white px-2 py-0.5 rounded-lg border border-emerald-300 shadow-2xs">
                <span class="text-[10px] font-bold text-slate-500">Tỉ số:</span>
                <input type="number" min="0" max="30" value="${info.s1}" 
                       oninput="updateMatchScore(${m.id}, this.value, null)" 
                       class="w-10 text-center font-black text-xs text-emerald-900 bg-transparent focus:outline-none" 
                       title="Nhập tỉ số của Đội 1" />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-1.5">
              <select onchange="updateMatchPlayer(${m.id}, 0, 0, this.value)" class="w-full text-xs font-semibold border border-slate-200 rounded-lg p-1.5 bg-white focus:ring-1 focus:ring-emerald-500">
                ${buildAttendeeOptions(p1)}
              </select>
              <select onchange="updateMatchPlayer(${m.id}, 0, 1, this.value)" class="w-full text-xs font-semibold border border-slate-200 rounded-lg p-1.5 bg-white focus:ring-1 focus:ring-emerald-500">
                ${buildAttendeeOptions(p2)}
              </select>
            </div>
          </div>

          <!-- Đội 2 (Cặp 2) + Ô nhập tỉ số của Đội 2 -->
          <div class="space-y-1.5 bg-amber-50/50 p-2 rounded-xl border border-amber-200/80">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-1.5 text-[10px] font-black text-amber-900 uppercase tracking-tight">
                <span class="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>Đội 2 (Cặp 2)</span>
              </div>
              <div class="flex items-center gap-1 bg-white px-2 py-0.5 rounded-lg border border-amber-300 shadow-2xs">
                <span class="text-[10px] font-bold text-slate-500">Tỉ số:</span>
                <input type="number" min="0" max="30" value="${info.s2}" 
                       oninput="updateMatchScore(${m.id}, null, this.value)" 
                       class="w-10 text-center font-black text-xs text-amber-900 bg-transparent focus:outline-none" 
                       title="Nhập tỉ số của Đội 2" />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-1.5">
              <select onchange="updateMatchPlayer(${m.id}, 1, 0, this.value)" class="w-full text-xs font-semibold border border-slate-200 rounded-lg p-1.5 bg-white focus:ring-1 focus:ring-emerald-500">
                ${buildAttendeeOptions(p3)}
              </select>
              <select onchange="updateMatchPlayer(${m.id}, 1, 1, this.value)" class="w-full text-xs font-semibold border border-slate-200 rounded-lg p-1.5 bg-white focus:ring-1 focus:ring-emerald-500">
                ${buildAttendeeOptions(p4)}
              </select>
            </div>
          </div>

        </div>

        <!-- Giải thưởng cho đội chiến thắng (2 lốc, 4 bò húc, 1 tháp bia...) -->
        <div class="bg-amber-50/70 p-2.5 rounded-xl border border-amber-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div class="flex items-center gap-1.5 text-xs">
            <span class="text-base leading-none">🎁</span>
            <b class="text-amber-950 text-[11px] uppercase tracking-tight">Thưởng đội thắng:</b>
            <span class="text-[10px] text-amber-700 italic hidden sm:inline">(bò húc, lốc, bia...)</span>
          </div>
          <div class="flex items-center gap-1.5 flex-wrap">
            <button type="button" onclick="setQuickMatchPrize(${m.id}, '4 Bò húc')" 
                    class="px-2 py-1 bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-lg text-[10px] font-bold transition shadow-2xs flex items-center gap-1">
              <span>🥤</span> 4 Bò húc
            </button>
            <button type="button" onclick="setQuickMatchPrize(${m.id}, '2 Lốc')" 
                    class="px-2 py-1 bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-lg text-[10px] font-bold transition shadow-2xs flex items-center gap-1">
              <span>🥫</span> 2 Lốc
            </button>
            <button type="button" onclick="setQuickMatchPrize(${m.id}, '1 Tháp bia')" 
                    class="px-2 py-1 bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-lg text-[10px] font-bold transition shadow-2xs flex items-center gap-1">
              <span>🍺</span> 1 Tháp bia
            </button>
            <div class="flex items-center gap-1 bg-white px-2 py-0.5 rounded-lg border border-amber-300 shadow-2xs">
              <span class="text-[10px] text-slate-400">Khác:</span>
              <input type="text" id="matchPrizeInput-${m.id}" value="${m.prize || ''}" 
                     placeholder="Tự nhập..." 
                     oninput="updateMatchPrize(${m.id}, this.value)" 
                     class="w-28 sm:w-36 text-xs font-bold text-amber-900 bg-transparent focus:outline-none placeholder:text-slate-300" />
            </div>
          </div>
        </div>

        <!-- Dòng kết quả trận đấu hiển thị tỉ số theo cặp (kèm cúp thắng 🏆 và giải thưởng 🎁) -->
        <div id="matchCardResultLine-${m.id}" class="text-xs font-semibold text-slate-800 bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center justify-between flex-wrap gap-2">
          <div class="flex items-center gap-1.5 flex-wrap">
            <span class="text-xs">🏸</span>
            <span class="text-xs">${info.lineHtml}</span>
          </div>
          <div>${info.statusBadge}</div>
        </div>

      </div>
    `;
  }).join('');

  updateMatchResultRealtime();
  lucide.createIcons();
}

function addActivityMatch() {
  const attendees = getCheckedInAttendees();
  const nextP1 = attendees.length > 0 ? attendees[0].id : '';
  const nextP2 = attendees.length > 1 ? attendees[1].id : '';
  const nextP3 = attendees.length > 2 ? attendees[2].id : '';
  const nextP4 = attendees.length > 3 ? attendees[3].id : '';

  activityState.matches.push({
    id: Date.now(),
    team1: [nextP1, nextP2],
    team2: [nextP3, nextP4],
    score1: 21,
    score2: 19,
    prize: '4 Bò húc'
  });
  renderActivityMatches();
}

function removeActivityMatch(id) {
  activityState.matches = activityState.matches.filter(m => m.id !== id);
  renderActivityMatches();
}

function updateMatchPlayer(matchId, teamIdx, playerIdx, val) {
  const m = activityState.matches.find(x => x.id === matchId);
  if (m) {
    if (teamIdx === 0) {
      if (!m.team1) m.team1 = ['', ''];
      m.team1[playerIdx] = val;
    } else {
      if (!m.team2) m.team2 = ['', ''];
      m.team2[playerIdx] = val;
    }
    renderActivityMatches();
  }
}

function updateMatchScore(matchId, s1, s2) {
  const m = activityState.matches.find(x => x.id === matchId);
  if (m) {
    if (s1 !== null && s1 !== undefined) m.score1 = Number(s1) || 0;
    if (s2 !== null && s2 !== undefined) m.score2 = Number(s2) || 0;
    updateMatchResultRealtime();
  }
}

function updateMatchPrize(matchId, val) {
  const m = activityState.matches.find(x => x.id === matchId);
  if (m) {
    m.prize = val;
    updateMatchResultRealtime();
  }
}

function setQuickMatchPrize(matchId, val) {
  const m = activityState.matches.find(x => x.id === matchId);
  if (m) {
    m.prize = val;
    const inp = document.getElementById(`matchPrizeInput-${matchId}`);
    if (inp) inp.value = val;
    updateMatchResultRealtime();
  }
}

function randomActivityMatch() {
  const attendees = getCheckedInAttendees();
  if (attendees.length < 4) {
    showToast('Cần ít nhất 4 người có mặt để bốc thăm trận đấu!', 'warning');
    return;
  }

  // Sắp xếp người chơi theo số trận đã đấu ít nhất để ưu tiên vào sân
  const matchCounts = {};
  attendees.forEach(a => matchCounts[a.id] = 0);
  activityState.matches.forEach(m => {
    (m.team1 || []).forEach(pId => { if (matchCounts[pId] !== undefined) matchCounts[pId]++; });
    (m.team2 || []).forEach(pId => { if (matchCounts[pId] !== undefined) matchCounts[pId]++; });
  });

  // Shuffle nhẹ và sort theo match count
  const shuffled = attendees.slice().sort(() => 0.5 - Math.random());
  shuffled.sort((a, b) => (matchCounts[a.id] || 0) - (matchCounts[b.id] || 0));

  const p1 = shuffled[0].id;
  const p2 = shuffled[1].id;
  const p3 = shuffled[2].id;
  const p4 = shuffled[3].id;

  const newMatch = {
    id: Date.now(),
    team1: [p1, p2],
    team2: [p3, p4],
    score1: 21,
    score2: 19,
    prize: '4 Bò húc'
  };

  activityState.matches.push(newMatch);
  renderActivityMatches();

  showToast(`🎲 Đã ghép Trận #${activityState.matches.length}: ${shuffled[0].chipName} ${shuffled[1].chipName} đấu với ${shuffled[2].chipName} ${shuffled[3].chipName}!`, 'success');
}

// --- 7. BỘ TÍNH TOÁN & CHIA TIỀN REAL-TIME ---
function recalculateActivitySplit() {
  // 1. Tổng chi phí (TC)
  let totalCost = 0;
  activityState.expenses.forEach(e => {
    totalCost += (e.amount || 0);
  });

  // Nếu chọn Tất cả cho ứng trước
  if (activityState.isFrontAll) {
    activityState.frontAmount = totalCost;
    const frontInp = document.getElementById('actFrontAmountInput');
    if (frontInp) frontInp.value = totalCost;
  }

  // 2. Khách đóng (TG)
  let guestPaid = 0;
  activityState.selectedGuestIds.forEach(id => {
    const guest = AppState.members.find(m => m.id === id);
    if (guest) {
      if (guest.fee) guestPaid += guest.fee;
      else if (guest.type === 'GUEST_A') guestPaid += 90000;
      else if (guest.type === 'GUEST_B') guestPaid += 70000;
      else if (guest.type === 'GUEST_C') guestPaid += 50000;
      else guestPaid += 50000;
    }
  });

  // 3. Cần chia = Tổng chi phí - Khách đóng
  const needSplit = Math.max(0, totalCost - guestPaid);

  // 4. Số thành viên chia tiền
  const memberCount = activityState.selectedMemberIds.size;

  // 5. Mỗi người = Cần chia / số thành viên (làm tròn lên 1000đ)
  const perPerson = memberCount > 0 ? Math.ceil((needSplit / memberCount) / 1000) * 1000 : 0;

  // Cập nhật giao diện Sticky bottom summary
  const totalCostEl = document.getElementById('actSummaryTotalCost');
  const guestPaidEl = document.getElementById('actSummaryGuestPaid');
  const needSplitEl = document.getElementById('actSummaryNeedSplit');
  const perPersonBadge = document.getElementById('actSummaryPerPersonBadge');

  if (totalCostEl) totalCostEl.textContent = formatMoney(totalCost);
  if (guestPaidEl) guestPaidEl.textContent = formatMoney(guestPaid);
  if (needSplitEl) needSplitEl.textContent = formatMoney(needSplit);
  if (perPersonBadge) perPersonBadge.textContent = `${formatMoney(perPerson)} / mỗi người`;
}

// --- 8. LƯU VÀ CHIA TIỀN (EXECUTION) ---
function saveAndSplitActivitySession() {
  const memberCount = activityState.selectedMemberIds.size;
  const guestCount = activityState.selectedGuestIds.size;

  if (memberCount === 0 && guestCount === 0) {
    showToast('Vui lòng chọn ít nhất 1 người tham gia buổi cầu!', 'warning');
    return;
  }

  let totalCost = 0;
  activityState.expenses.forEach(e => totalCost += (e.amount || 0));

  let guestPaid = 0;
  activityState.selectedGuestIds.forEach(id => {
    const guest = AppState.members.find(m => m.id === id);
    if (guest) {
      if (guest.fee) guestPaid += guest.fee;
      else if (guest.type === 'GUEST_A') guestPaid += 90000;
      else if (guest.type === 'GUEST_B') guestPaid += 70000;
      else guestPaid += 50000;
    }
  });

  const needSplit = Math.max(0, totalCost - guestPaid);
  const perPerson = memberCount > 0 ? Math.ceil((needSplit / memberCount) / 1000) * 1000 : 0;

  const dateStr = activityState.date || getTodayInputFormat();
  const dateFormatted = dateStr.split('-').reverse().join('/');
  const nowTime = getNowTimestampString();

  const confirmMsg = `Xác nhận lưu buổi hoạt động ngày ${dateFormatted}?\n` +
    `• Tổng chi phí: ${formatMoney(totalCost)}\n` +
    `• Khách đóng: ${formatMoney(guestPaid)} (${guestCount} khách)\n` +
    `• Cần chia: ${formatMoney(needSplit)}\n` +
    `• Trừ ví thành viên: ${formatMoney(perPerson)} / người (${memberCount} người)`;

  if (!confirm(confirmMsg)) return;

  // 1. Trừ tiền ví và tăng số buổi tháng cho từng thành viên tham gia
  let negativeCount = 0;
  activityState.selectedMemberIds.forEach(id => {
    const member = AppState.members.find(m => m.id === id);
    if (member) {
      if (perPerson > 0) {
        member.balance = (member.balance || 0) - perPerson;
        if (member.balance < 0) negativeCount++;

        // Ghi lịch sử giao dịch trừ ví
        AppState.transactions.push({
          id: 'TX_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
          date: nowTime,
          type: 'COURT_FEE',
          amount: -perPerson,
          targetName: member.name,
          description: `Chia tiền sân ngày ${dateFormatted} (${formatMoney(perPerson)}/người)`,
          operator: (AppState.auth && AppState.auth.user) ? AppState.auth.user.username : 'admin'
        });
      }

      member.monthlySessions = (member.monthlySessions || 0) + 1;

      // Nhật ký điểm danh
      AppState.attendanceRecords.push({
        id: 'ATT_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
        date: dateStr,
        memberId: member.id,
        memberName: member.name,
        fee: perPerson,
        sessionIndex: member.monthlySessions,
        timestamp: nowTime
      });
    }
  });

  // 2. Ghi nhận giao dịch khách tham gia
  activityState.selectedGuestIds.forEach(id => {
    const guest = AppState.members.find(m => m.id === id);
    if (guest) {
      const gFee = guest.fee || (guest.type === 'GUEST_A' ? 90000 : (guest.type === 'GUEST_B' ? 70000 : 50000));
      guest.monthlySessions = (guest.monthlySessions || 0) + 1;

      AppState.transactions.push({
        id: 'TX_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
        date: nowTime,
        type: 'COURT_FEE',
        amount: gFee,
        targetName: guest.name,
        description: `Thu tiền sân khách ngày ${dateFormatted} (${formatMoney(gFee)})`,
        operator: (AppState.auth && AppState.auth.user) ? AppState.auth.user.username : 'admin'
      });
    }
  });

  // 3. Cập nhật Sổ Quỹ CLB
  // Chi phí sân & cầu
  if (totalCost > 0) {
    AppState.funds.clubFund = (AppState.funds.clubFund || 0) - totalCost;
    AppState.transactions.push({
      id: 'TX_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      date: nowTime,
      type: 'FUND_OUT',
      amount: -totalCost,
      targetName: 'Quỹ CLB',
      description: `Chi phí buổi cầu ngày ${dateFormatted} (Sân/Cầu/Nước)`,
      operator: (AppState.auth && AppState.auth.user) ? AppState.auth.user.username : 'admin'
    });
  }

  // Thu tiền chia sân từ thành viên + khách
  const totalCollected = (perPerson * memberCount) + guestPaid;
  if (totalCollected > 0) {
    AppState.funds.clubFund = (AppState.funds.clubFund || 0) + totalCollected;
    AppState.transactions.push({
      id: 'TX_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      date: nowTime,
      type: 'FUND_IN',
      amount: totalCollected,
      targetName: 'Quỹ CLB',
      description: `Thu tiền buổi cầu ngày ${dateFormatted} (Thành viên + Khách)`,
      operator: (AppState.auth && AppState.auth.user) ? AppState.auth.user.username : 'admin'
    });
  }

  // 4. Nếu có người ứng tiền
  if (activityState.frontPersonId !== 'NONE' && activityState.frontAmount > 0) {
    const frontPerson = AppState.members.find(m => m.id === activityState.frontPersonId);
    const frontName = frontPerson ? frontPerson.name : 'Người ứng tiền';
    AppState.funds.advanceFund = (AppState.funds.advanceFund || 0) + activityState.frontAmount;
    AppState.transactions.push({
      id: 'TX_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      date: nowTime,
      type: 'ADVANCE',
      amount: activityState.frontAmount,
      targetName: 'Quỹ Tạm Ứng',
      description: `${frontName} ứng tiền buổi cầu ngày ${dateFormatted}`,
      operator: (AppState.auth && AppState.auth.user) ? AppState.auth.user.username : 'admin'
    });
  }

  saveData();

  let successMsg = `Đã lưu và chia tiền thành công! Trừ ví ${memberCount} thành viên (${formatMoney(perPerson)}/người).`;
  if (negativeCount > 0) successMsg += ` Có ${negativeCount} thành viên bị âm ví.`;
  showToast(successMsg, 'success');

  renderDashboard();
  recalculateActivitySplit();
}

// ==========================================
// 10. THANH TOÁN & QUỸ CLB
// ==========================================
function renderFinanceTab() {
  populateTopUpMemberSelect();
  renderFullTransactionTable();
}

function renderFullTransactionTable() {
  const tbody = document.getElementById('fullTransactionTableBody');
  const typeFilter = document.getElementById('filterTxType');
  const searchInput = document.getElementById('searchTx');
  if (!tbody) return;

  const selectedType = typeFilter ? typeFilter.value : 'ALL';
  const query = searchInput ? searchInput.value.trim().toLowerCase() : '';

  let list = (AppState.transactions || []).slice().reverse();

  if (selectedType !== 'ALL') {
    list = list.filter(tx => tx.type === selectedType);
  }

  if (query) {
    list = list.filter(tx => 
      (tx.targetName && tx.targetName.toLowerCase().includes(query)) ||
      (tx.description && tx.description.toLowerCase().includes(query)) ||
      (tx.date && tx.date.includes(query))
    );
  }

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="py-8 text-center text-slate-400">Không tìm thấy giao dịch nào</td></tr>`;
    return;
  }

  tbody.innerHTML = list.map(tx => {
    let typeBadge = '';
    let amountColor = 'text-slate-900';
    let prefix = '';

    switch (tx.type) {
      case 'TOPUP':
        typeBadge = `<span class="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">Nạp ví</span>`;
        amountColor = 'text-emerald-600';
        prefix = '+';
        break;
      case 'COURT_FEE':
        typeBadge = `<span class="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold border border-blue-200">Tiền sân</span>`;
        amountColor = 'text-slate-800';
        prefix = '-';
        break;
      case 'FUND_IN':
        typeBadge = `<span class="px-2 py-0.5 rounded bg-teal-50 text-teal-700 font-bold border border-teal-200">Thu quỹ CLB</span>`;
        amountColor = 'text-emerald-600';
        prefix = '+';
        break;
      case 'FUND_OUT':
        typeBadge = `<span class="px-2 py-0.5 rounded bg-rose-50 text-rose-700 font-bold border border-rose-200">Chi quỹ CLB</span>`;
        amountColor = 'text-rose-600';
        prefix = '-';
        break;
      case 'FINE':
        typeBadge = `<span class="px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-bold border border-amber-200">Tiền phạt</span>`;
        amountColor = 'text-amber-600';
        prefix = '+';
        break;
      case 'ADVANCE':
        typeBadge = `<span class="px-2 py-0.5 rounded bg-purple-50 text-purple-700 font-bold border border-purple-200">Tạm ứng</span>`;
        amountColor = 'text-purple-600';
        break;
      default:
        typeBadge = `<span class="px-2 py-0.5 rounded bg-slate-100 text-slate-700">Khác</span>`;
    }

    const cleanAmount = Math.abs(tx.amount);

    return `
      <tr class="hover:bg-slate-50 transition">
        <td class="py-2.5 px-3 text-slate-500 whitespace-nowrap">${tx.date}</td>
        <td class="py-2.5 px-2">${typeBadge}</td>
        <td class="py-2.5 px-3">
          <div class="font-bold text-slate-900">${tx.targetName || 'Giao dịch'}</div>
          <div class="text-[11px] text-slate-500">${tx.description}</div>
        </td>
        <td class="py-2.5 px-3 text-right font-black ${amountColor} whitespace-nowrap">
          ${prefix}${formatMoney(cleanAmount)}
        </td>
        <td class="py-2.5 px-3 text-slate-500 font-medium">${tx.operator || 'admin'}</td>
      </tr>
    `;
  }).join('');
}

// ==========================================
// 11. NẠP TIỀN VÀO VÍ THÀNH VIÊN
// ==========================================
function populateTopUpMemberSelect(preselectId = null) {
  const select = document.getElementById('topUpMemberSelect');
  if (!select) return;

  select.innerHTML = AppState.members.map(m => `
    <option value="${m.id}" ${m.id === preselectId ? 'selected' : ''}>
      ${m.name} (${getMemberRoleTypeText(m.type)}) - Ví: ${formatMoney(m.balance || 0)}
    </option>
  `).join('');
}

function openTopUpModal() {
  populateTopUpMemberSelect();
  openModal('topUpModal');
}

function openTopUpModalForMember(memberId) {
  populateTopUpMemberSelect(memberId);
  openModal('topUpModal');
}

function setTopUpAmount(amount) {
  const input = document.getElementById('topUpAmount');
  if (input) input.value = amount;
}

function handleTopUpSubmit(e) {
  e.preventDefault();
  const memberId = document.getElementById('topUpMemberSelect').value;
  const amount = Number(document.getElementById('topUpAmount').value);
  const method = document.querySelector('input[name="topUpMethod"]:checked').value;
  const note = document.getElementById('topUpNote').value.trim();

  const member = AppState.members.find(m => m.id === memberId);
  if (!member || amount <= 0) {
    showToast('Dữ liệu nạp ví không hợp lệ!', 'error');
    return;
  }

  // Cộng tiền vào ví
  member.balance = (member.balance || 0) + amount;

  const methodDesc = method === 'TRANSFER' ? 'Chuyển khoản VietQR' : 'Tiền mặt';
  const desc = note ? `${note} (${methodDesc})` : `Nạp tiền vào ví (${methodDesc})`;

  // Ghi nhật ký giao dịch
  AppState.transactions.push({
    id: 'TX_' + Date.now(),
    date: getNowTimestampString(),
    type: 'TOPUP',
    amount: amount,
    targetName: member.name,
    description: desc,
    operator: (AppState.auth && AppState.auth.user) ? AppState.auth.user.username : 'admin'
  });

  saveData();
  closeModal('topUpModal');
  renderDashboard();
  renderFinanceTab();
  showToast(`Đã nạp thành công ${formatMoney(amount)} cho ${member.name}!`, 'success');
}

// ==========================================
// 12. THU / CHI QUỸ CLB
// ==========================================
function openFundTransactionModal(type = 'expense') {
  const typeInput = document.getElementById('fundTransactionType');
  const titleEl = document.getElementById('fundModalTitle');
  const submitBtn = document.getElementById('fundSubmitBtn');

  if (typeInput) typeInput.value = type;

  if (type === 'income') {
    titleEl.innerHTML = `<i data-lucide="trending-up" class="w-5 h-5 text-emerald-600"></i> Ghi nhận Thu Quỹ CLB`;
    submitBtn.className = 'flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition';
    submitBtn.textContent = 'Xác nhận Thu Quỹ';
  } else {
    titleEl.innerHTML = `<i data-lucide="trending-down" class="w-5 h-5 text-rose-600"></i> Ghi nhận Chi Quỹ CLB / Tiền Sân`;
    submitBtn.className = 'flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition';
    submitBtn.textContent = 'Xác nhận Chi Quỹ';
  }
  lucide.createIcons();
  openModal('fundTransactionModal');
}

function setFundCategoryQuick(val) {
  const input = document.getElementById('fundCategory');
  if (input) input.value = val;
}

function handleFundTransactionSubmit(e) {
  e.preventDefault();
  const type = document.getElementById('fundTransactionType').value;
  const amount = Number(document.getElementById('fundAmount').value);
  const category = document.getElementById('fundCategory').value.trim();
  const party = document.getElementById('fundParty').value.trim() || 'Thủ quỹ / Ban chủ nhiệm';

  if (amount <= 0 || !category) {
    showToast('Vui lòng nhập đầy đủ thông tin số tiền và hạng mục!', 'warning');
    return;
  }

  if (type === 'income') {
    AppState.funds.clubFund = (AppState.funds.clubFund || 0) + amount;
    AppState.transactions.push({
      id: 'TX_' + Date.now(),
      date: getNowTimestampString(),
      type: 'FUND_IN',
      amount: amount,
      targetName: 'Quỹ CLB',
      description: `Thu: ${category} (Từ: ${party})`,
      operator: (AppState.auth && AppState.auth.user) ? AppState.auth.user.username : 'admin'
    });
    showToast(`Đã thu ${formatMoney(amount)} vào Quỹ CLB!`, 'success');
  } else {
    AppState.funds.clubFund = (AppState.funds.clubFund || 0) - amount;
    AppState.transactions.push({
      id: 'TX_' + Date.now(),
      date: getNowTimestampString(),
      type: 'FUND_OUT',
      amount: -amount,
      targetName: 'Quỹ CLB',
      description: `Chi: ${category} (Phụ trách: ${party})`,
      operator: (AppState.auth && AppState.auth.user) ? AppState.auth.user.username : 'admin'
    });
    showToast(`Đã chi ${formatMoney(amount)} từ Quỹ CLB!`, 'info');
  }

  saveData();
  closeModal('fundTransactionModal');
  renderDashboard();
  renderFinanceTab();
}

// ==========================================
// 13. QUỸ THÀNH VIÊN TẠM ỨNG
// ==========================================
function openAdvanceFundModal() {
  openModal('advanceFundModal');
}

function handleAdvanceFundSubmit(e) {
  e.preventDefault();
  const type = document.getElementById('advanceType').value;
  const amount = Number(document.getElementById('advanceAmount').value);
  const description = document.getElementById('advanceDescription').value.trim();

  if (amount <= 0 || !description) {
    showToast('Vui lòng nhập số tiền và nội dung tạm ứng!', 'warning');
    return;
  }

  if (type === 'IN') {
    AppState.funds.advanceFund = (AppState.funds.advanceFund || 0) + amount;
    AppState.transactions.push({
      id: 'TX_' + Date.now(),
      date: getNowTimestampString(),
      type: 'ADVANCE',
      amount: amount,
      targetName: 'Quỹ Tạm Ứng',
      description: `[Đóng ứng trước] ${description}`,
      operator: (AppState.auth && AppState.auth.user) ? AppState.auth.user.username : 'admin'
    });
    showToast(`Đã ghi nhận +${formatMoney(amount)} vào Quỹ tạm ứng!`, 'success');
  } else {
    AppState.funds.advanceFund = (AppState.funds.advanceFund || 0) - amount;
    AppState.transactions.push({
      id: 'TX_' + Date.now(),
      date: getNowTimestampString(),
      type: 'ADVANCE',
      amount: -amount,
      targetName: 'Quỹ Tạm Ứng',
      description: `[Hoàn trả / Chi ứng trước] ${description}`,
      operator: (AppState.auth && AppState.auth.user) ? AppState.auth.user.username : 'admin'
    });
    showToast(`Đã chi trả -${formatMoney(amount)} từ Quỹ tạm ứng!`, 'info');
  }

  saveData();
  closeModal('advanceFundModal');
  renderDashboard();
  renderFinanceTab();
}

// ==========================================
// 14. XỬ PHẠT VI PHẠM
// ==========================================
function populateFineMemberSelect() {
  const select = document.getElementById('fineMemberSelect');
  if (!select) return;

  select.innerHTML = AppState.members.map(m => `
    <option value="${m.id}">${m.name} (${getMemberRoleTypeText(m.type)})</option>
  `).join('');
}

function openFineModal() {
  populateFineMemberSelect();
  const defaultFine = AppState.config.defaultFine || 50000;
  const amountInput = document.getElementById('fineAmount');
  if (amountInput) amountInput.value = defaultFine;
  openModal('fineModal');
}

function handleFineSubmit(e) {
  e.preventDefault();
  const memberId = document.getElementById('fineMemberSelect').value;
  const amount = Number(document.getElementById('fineAmount').value);
  const reason = document.getElementById('fineReason').value.trim();
  const method = document.querySelector('input[name="fineMethod"]:checked').value;

  const member = AppState.members.find(m => m.id === memberId);
  if (!member || amount <= 0 || !reason) {
    showToast('Thông tin xử phạt không hợp lệ!', 'warning');
    return;
  }

  if (method === 'WALLET') {
    member.balance = (member.balance || 0) - amount;
    AppState.funds.clubFund = (AppState.funds.clubFund || 0) + amount; // Tiền phạt nộp về Quỹ CLB
    AppState.transactions.push({
      id: 'TX_' + Date.now(),
      date: getNowTimestampString(),
      type: 'FINE',
      amount: amount,
      targetName: member.name,
      description: `Phạt vi phạm (Trừ ví): ${reason}`,
      operator: (AppState.auth && AppState.auth.user) ? AppState.auth.user.username : 'admin'
    });
    showToast(`Đã trừ ${formatMoney(amount)} tiền phạt từ ví của ${member.name}!`, 'success');
  } else {
    AppState.funds.clubFund = (AppState.funds.clubFund || 0) + amount;
    AppState.transactions.push({
      id: 'TX_' + Date.now(),
      date: getNowTimestampString(),
      type: 'FINE',
      amount: amount,
      targetName: member.name,
      description: `Phạt vi phạm (Tiền mặt vào Quỹ): ${reason}`,
      operator: (AppState.auth && AppState.auth.user) ? AppState.auth.user.username : 'admin'
    });
    showToast(`Đã ghi nhận ${formatMoney(amount)} tiền phạt nộp Quỹ từ ${member.name}!`, 'success');
  }

  saveData();
  closeModal('fineModal');
  renderDashboard();
  renderFinanceTab();
}

// ==========================================
// 15. QUẢN LÝ THÀNH VIÊN
// ==========================================
let memberListFilter = 'ALL';

function setMemberListFilter(filter) {
  memberListFilter = filter;
  document.querySelectorAll('.mem-filter-btn').forEach(btn => {
    btn.classList.remove('bg-white', 'shadow-sm', 'text-slate-800');
    btn.classList.add('text-slate-600');
  });
  const activeBtn = document.getElementById(`filter-mem-${filter.toLowerCase()}`);
  if (activeBtn) {
    activeBtn.classList.remove('text-slate-600');
    activeBtn.classList.add('bg-white', 'shadow-sm', 'text-slate-800');
  }
  renderMemberManagementList();
}

function renderMemberManagementList() {
  const tbody = document.getElementById('memberManagementTableBody');
  const searchInput = document.getElementById('searchMemberList');
  if (!tbody) return;

  const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
  let list = AppState.members;

  if (memberListFilter === 'OFFICIAL') {
    list = list.filter(m => m.type === 'OFFICIAL');
  } else if (memberListFilter === 'HONORARY' || memberListFilter === 'UNOFFICIAL') {
    list = list.filter(m => m.type === 'HONORARY' || m.type === 'UNOFFICIAL');
  } else if (memberListFilter === 'GUEST') {
    list = list.filter(m => m.type.startsWith('GUEST'));
  }

  if (query) {
    list = list.filter(m => 
      m.name.toLowerCase().includes(query) || 
      (m.phone && m.phone.includes(query)) ||
      (m.username && m.username.toLowerCase().includes(query))
    );
  }

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="py-8 text-center text-slate-400">Không tìm thấy thành viên nào</td></tr>`;
    return;
  }

  tbody.innerHTML = list.map(m => {
    const isNegative = (m.balance || 0) < 0;
    const balanceClass = isNegative ? 'text-rose-600 font-bold' : 'text-slate-900 font-bold';
    const accountInfo = m.username ? `<span class="font-mono text-slate-800 font-semibold">${m.username}</span>` : `<span class="text-slate-400 italic">Chưa có</span>`;

    return `
      <tr class="hover:bg-slate-50 transition">
        <td class="py-3 px-4">
          <div class="flex items-center gap-1.5">
            <span class="font-bold text-slate-900 text-xs">${m.name}</span>
            <button onclick="openQuickRenameModal('${m.id}')" class="text-slate-400 hover:text-brand-600 p-0.5 rounded transition" title="Đổi tên / SĐT thành viên">
              <i data-lucide="pencil" class="w-3.5 h-3.5"></i>
            </button>
          </div>
          <div class="text-[11px] text-slate-400">${m.phone || 'Chưa có SĐT'}</div>
        </td>
        <td class="py-3 px-2">
          ${getMemberRoleBadge(m.type)}
        </td>
        <td class="py-3 px-3">
          ${accountInfo}
        </td>
        <td class="py-3 px-3 text-right ${balanceClass} text-xs">
          ${formatMoney(m.balance || 0)}
        </td>
        <td class="py-3 px-2 text-center font-bold text-slate-700 text-xs">
          ${m.monthlySessions || 0} buổi
        </td>
        <td class="py-3 px-4 text-center">
          <div class="flex items-center justify-center gap-1.5">
            <button onclick="quickCheckInSingleMember('${m.id}')" class="px-2 py-1 bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200 rounded text-[11px] font-bold" title="Điểm danh 1-chạm (trừ ví ngay)">
              ⚡ Điểm danh
            </button>
            <button onclick="openTopUpModalForMember('${m.id}')" class="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded text-[11px] font-bold" title="Nạp ví">
              Nạp ví
            </button>
            ${m.username ? `
              <button onclick="openResetPasswordModal('${m.id}')" class="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded text-[11px] font-bold" title="Cấp lại mật khẩu">
                Đổi MK
              </button>
            ` : ''}
            <button onclick="openMemberModal('edit', '${m.id}')" class="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded" title="Sửa thông tin đầy đủ">
              <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
            </button>
            <button onclick="deleteMember('${m.id}')" class="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded" title="Xóa">
              <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  lucide.createIcons();
}

function openMemberModal(mode = 'official', memberId = null) {
  const modalTitle = document.getElementById('memberModalTitle');
  const editIdInput = document.getElementById('memberEditId');
  const nameInput = document.getElementById('memberFullName');
  const phoneInput = document.getElementById('memberPhone');
  const typeSelect = document.getElementById('memberTypeSelect');
  const usernameInput = document.getElementById('memberUsername');
  const passwordInput = document.getElementById('memberPassword');
  const initBalanceInput = document.getElementById('memberInitialBalance');

  if (mode === 'edit' && memberId) {
    const member = AppState.members.find(m => m.id === memberId);
    if (!member) return;
    modalTitle.innerHTML = `<i data-lucide="edit-3" class="w-5 h-5 text-brand-600"></i> Sửa Thông Tin Thành Viên`;
    editIdInput.value = member.id;
    nameInput.value = member.name;
    phoneInput.value = member.phone || '';
    typeSelect.value = member.type;
    usernameInput.value = member.username || '';
    passwordInput.value = member.password || '';
    initBalanceInput.value = member.balance || 0;
    initBalanceInput.disabled = true; // Không sửa balance tại đây, qua nạp ví
  } else {
    modalTitle.innerHTML = `<i data-lucide="user-plus" class="w-5 h-5 text-brand-600"></i> Thêm Thành Viên Mới`;
    editIdInput.value = '';
    nameInput.value = '';
    phoneInput.value = '';
    typeSelect.value = (mode === 'honorary' || mode === 'unofficial') ? 'HONORARY' : 'OFFICIAL';
    usernameInput.value = '';
    passwordInput.value = '123';
    initBalanceInput.value = 0;
    initBalanceInput.disabled = false;
  }

  lucide.createIcons();
  openModal('memberModal');
}

function handleMemberSubmit(e) {
  e.preventDefault();
  const editId = document.getElementById('memberEditId').value;
  const name = document.getElementById('memberFullName').value.trim();
  const phone = document.getElementById('memberPhone').value.trim();
  const type = document.getElementById('memberTypeSelect').value;
  const username = document.getElementById('memberUsername').value.trim();
  const password = document.getElementById('memberPassword').value.trim();
  const initBalance = Number(document.getElementById('memberInitialBalance').value || 0);

  if (!name) {
    showToast('Vui lòng nhập họ và tên thành viên!', 'warning');
    return;
  }

  if (editId) {
    // Sửa thông tin thành viên hiện có
    const member = AppState.members.find(m => m.id === editId);
    if (member) {
      member.name = name;
      member.phone = phone;
      member.type = type;
      member.username = username;
      if (password) member.password = password;
    }
  } else {
    // Thêm thành viên mới
    const newId = 'M' + String(Date.now()).slice(-4);
    const newMember = {
      id: newId,
      name: name,
      phone: phone,
      type: type,
      username: username,
      password: password || '123',
      balance: initBalance,
      monthlySessions: 0
    };
    AppState.members.push(newMember);

    if (initBalance > 0) {
      AppState.transactions.push({
        id: 'TX_' + Date.now(),
        date: getNowTimestampString(),
        type: 'TOPUP',
        amount: initBalance,
        targetName: name,
        description: 'Số dư ví ban đầu khi tạo thành viên',
        operator: (AppState.auth && AppState.auth.user) ? AppState.auth.user.username : 'admin'
      });
    }
  }

  saveData();
  closeModal('memberModal');
  renderDashboard();
  renderMemberManagementList();
  showToast('Đã lưu thông tin thành viên thành công!', 'success');
}

function deleteMember(memberId) {
  const member = AppState.members.find(m => m.id === memberId);
  if (!member) return;

  const confirmed = confirm(`Bạn có chắc chắn muốn xóa thành viên "${member.name}" khỏi danh sách?`);
  if (!confirmed) return;

  AppState.members = AppState.members.filter(m => m.id !== memberId);
  saveData();
  renderDashboard();
  renderMemberManagementList();
  showToast(`Đã xóa thành viên ${member.name}!`, 'info');
}

// Khách giao lưu nhanh
function openAddGuestModal() {
  document.getElementById('guestName').value = '';
  document.getElementById('guestPhone').value = '';
  document.getElementById('guestTypeSelect').value = 'GUEST_B';
  updateGuestPricePreview();
  openModal('addGuestModal');
}

function updateGuestPricePreview() {
  const type = document.getElementById('guestTypeSelect').value;
  const price = (AppState.config && AppState.config.guestPrices && AppState.config.guestPrices[type]) || 100000;
  const preview = document.getElementById('guestPricePreview');
  if (preview) preview.textContent = formatMoney(price);
}

function handleAddGuestSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('guestName').value.trim();
  const phone = document.getElementById('guestPhone').value.trim();
  const type = document.getElementById('guestTypeSelect').value;

  if (!name) {
    showToast('Vui lòng nhập tên khách giao lưu!', 'warning');
    return;
  }

  const newGuest = {
    id: 'GUEST_' + Date.now(),
    name: name,
    phone: phone,
    type: type,
    username: '',
    password: '',
    balance: 0,
    monthlySessions: 0
  };

  AppState.members.push(newGuest);
  saveData();
  closeModal('addGuestModal');
  renderDashboard();
  renderAttendanceChecklist();
  renderMemberManagementList();
  showToast(`Đã thêm khách giao lưu ${name} thành công!`, 'success');
}

// Cấp lại mật khẩu
function openResetPasswordModal(memberId) {
  const member = AppState.members.find(m => m.id === memberId);
  if (!member) return;

  document.getElementById('resetPasswordMemberId').value = member.id;
  document.getElementById('resetPasswordMemberName').value = member.name;
  document.getElementById('newResetPassword').value = '123456';
  openModal('resetPasswordModal');
}

function handleResetPasswordSubmit(e) {
  e.preventDefault();
  const memberId = document.getElementById('resetPasswordMemberId').value;
  const newPass = document.getElementById('newResetPassword').value.trim();

  const member = AppState.members.find(m => m.id === memberId);
  if (!member || !newPass) {
    showToast('Vui lòng nhập mật khẩu mới!', 'warning');
    return;
  }

  member.password = newPass;
  saveData();
  closeModal('resetPasswordModal');
  showToast(`Đã cập nhật mật khẩu mới cho ${member.name}!`, 'success');
}

// ==========================================
// ==========================================
// 16. BỐC THĂM CHIA SÂN & LỊCH ĐẤU TRANH GIẢI CLB (MATCHMAKER & TOURNAMENT)
// ==========================================
const matchmakerState = {
  mode: 'TOURNAMENT',
  drawMethod: 'RANDOM',
  manualTeamsA: [],
  manualTeamsB: [],
  tournament: null
};

function renderMatchmakerTab() {
  const container = document.getElementById('matchmakerPlayersList');
  if (!container) return;

  container.innerHTML = AppState.members.map(m => `
    <label class="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 cursor-pointer hover:bg-purple-50 transition">
      <div class="flex items-center gap-2">
        <input type="checkbox" name="matchmakerPlayer" value="${m.id}" class="w-4 h-4 rounded text-purple-600 focus:ring-purple-500" />
        <span class="font-bold text-slate-800 text-xs">${m.name}</span>
      </div>
      <div>${getMemberRoleBadge(m.type)}</div>
    </label>
  `).join('');

  switchMatchmakerMode(matchmakerState.mode);
}

function switchMatchmakerMode(mode) {
  matchmakerState.mode = mode;
  const btnRegular = document.getElementById('btnMatchmakerModeRegular');
  const btnTour = document.getElementById('btnMatchmakerModeTournament');
  const regControls = document.getElementById('matchmakerRegularControls');
  const tourControls = document.getElementById('matchmakerTournamentControls');
  const rightTitle = document.getElementById('matchmakerRightTitle');
  const actionToolbar = document.getElementById('tournamentActionToolbar');

  if (mode === 'REGULAR') {
    if (btnRegular) {
      btnRegular.className = 'px-3 py-1.5 rounded-lg bg-white text-slate-900 shadow-xs font-black transition cursor-pointer';
    }
    if (btnTour) {
      btnTour.className = 'px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 transition cursor-pointer flex items-center gap-1.5 font-semibold';
    }
    if (regControls) regControls.classList.remove('hidden');
    if (tourControls) tourControls.classList.add('hidden');
    if (rightTitle) rightTitle.textContent = 'Lượt Thi Đấu Trên Sân (Giao Lưu)';
    if (actionToolbar) actionToolbar.classList.add('hidden');
  } else {
    if (btnTour) {
      btnTour.className = 'px-3 py-1.5 rounded-lg bg-white text-purple-900 shadow-xs border border-purple-200 transition cursor-pointer flex items-center gap-1.5 font-black';
    }
    if (btnRegular) {
      btnRegular.className = 'px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 transition cursor-pointer font-semibold';
    }
    if (regControls) regControls.classList.add('hidden');
    if (tourControls) tourControls.classList.remove('hidden');
    if (rightTitle) rightTitle.textContent = 'Lịch Thi Đấu Tranh Giải CLB (Nhánh A & B)';
    if (actionToolbar && matchmakerState.tournament) actionToolbar.classList.remove('hidden');
  }
}

function selectAllForMatchmaking() {
  const checkboxes = document.querySelectorAll('input[name="matchmakerPlayer"]');
  checkboxes.forEach(cb => cb.checked = true);
}

function deselectAllForMatchmaking() {
  const checkboxes = document.querySelectorAll('input[name="matchmakerPlayer"]');
  checkboxes.forEach(cb => cb.checked = false);
}

function selectAttendedPlayersForMatchmaking() {
  const checkboxes = document.querySelectorAll('input[name="matchmakerPlayer"]');
  const attendedIds = new Set();
  
  (activityState.selectedMemberIds || []).forEach(id => attendedIds.add(id));
  (activityState.selectedGuestIds || []).forEach(id => attendedIds.add(id));

  if (attendedIds.size === 0) {
    showToast('Chưa có ai được điểm danh trong tab Hoạt động. Đã chọn 16 thành viên đầu tiên!', 'info');
    checkboxes.forEach((cb, idx) => cb.checked = idx < 16);
    return;
  }

  checkboxes.forEach(cb => {
    cb.checked = attendedIds.has(cb.value);
  });
  showToast(`Đã chọn ${attendedIds.size} người đã điểm danh hôm nay!`, 'success');
}

// ----------------------------------------------------
// PHƯƠNG THỨC BỐC THĂM / PHÂN NHÁNH: NGẪU NHIÊN VS THỦ CÔNG
// ----------------------------------------------------
function switchTournamentDrawMethod(method) {
  matchmakerState.drawMethod = method;
  const btnRandom = document.getElementById('btnTourMethodRandom');
  const btnManual = document.getElementById('btnTourMethodManual');
  const blockRandom = document.getElementById('tourMethodRandomBlock');
  const blockManual = document.getElementById('tourMethodManualBlock');

  if (method === 'RANDOM') {
    if (btnRandom) {
      btnRandom.className = 'py-2 px-2.5 rounded-lg bg-white text-purple-900 shadow-xs border border-purple-200 flex items-center justify-center gap-1.5 transition cursor-pointer font-black';
    }
    if (btnManual) {
      btnManual.className = 'py-2 px-2.5 rounded-lg text-slate-600 hover:text-slate-900 flex items-center justify-center gap-1.5 transition cursor-pointer font-semibold';
    }
    if (blockRandom) blockRandom.classList.remove('hidden');
    if (blockManual) blockManual.classList.add('hidden');
  } else {
    if (btnManual) {
      btnManual.className = 'py-2 px-2.5 rounded-lg bg-white text-purple-900 shadow-xs border border-purple-200 flex items-center justify-center gap-1.5 transition cursor-pointer font-black';
    }
    if (btnRandom) {
      btnRandom.className = 'py-2 px-2.5 rounded-lg text-slate-600 hover:text-slate-900 flex items-center justify-center gap-1.5 transition cursor-pointer font-semibold';
    }
    if (blockRandom) blockRandom.classList.add('hidden');
    if (blockManual) blockManual.classList.remove('hidden');

    if (matchmakerState.manualTeamsA.length === 0 && matchmakerState.manualTeamsB.length === 0) {
      initManualTournamentTeams();
    } else {
      renderManualTournamentBuilder();
    }
  }
}

function buildManualMemberSelectOptions(selectedId) {
  let html = `<option value="">-- Chọn thành viên --</option>`;
  AppState.members.forEach(m => {
    const isSel = m.id === selectedId ? 'selected' : '';
    const typeLabel = m.type === 'HONORARY' ? ' (Danh dự)' : (m.type === 'GUEST' ? ' (Khách)' : '');
    html += `<option value="${m.id}" ${isSel}>${m.name}${typeLabel}</option>`;
  });
  return html;
}

function updateManualPairMember(teamId, slot, memberId) {
  let team = matchmakerState.manualTeamsA.find(t => t.id === teamId);
  if (!team) team = matchmakerState.manualTeamsB.find(t => t.id === teamId);
  if (!team) return;

  const member = AppState.members.find(m => m.id === memberId);
  if (!team.members) team.members = [];
  if (!team.memberIds) team.memberIds = [];

  team.members[slot] = member || { id: '', name: 'Chưa chọn', chipName: 'Chưa chọn' };
  team.memberIds[slot] = memberId;

  const m1 = team.members[0];
  const m2 = team.members[1];
  if (m2 && m2.id) {
    team.displayName = `${m1 && m1.id ? (m1.chipName || m1.name) : '?'} & ${m2.chipName || m2.name}`;
    team.fullName = `${m1 && m1.id ? m1.name : '?'} & ${m2.name}`;
  } else if (m1 && m1.id) {
    team.displayName = m1.chipName || m1.name;
    team.fullName = m1.name;
  } else {
    team.displayName = 'Cặp mới';
    team.fullName = 'Cặp mới';
  }

  renderManualTournamentBuilder();
}

function addManualPair(branch) {
  const formatSelect = document.getElementById('tournamentFormatSelect');
  const format = (formatSelect && formatSelect.value) || 'DOUBLES';

  const usedIds = new Set();
  [...matchmakerState.manualTeamsA, ...matchmakerState.manualTeamsB].forEach(t => {
    (t.memberIds || []).forEach(id => { if (id) usedIds.add(id); });
  });

  const available = AppState.members.filter(m => !usedIds.has(m.id));
  const m1 = available[0] || AppState.members[0] || { id: '', name: 'Chưa chọn', chipName: 'Chưa chọn' };
  const m2 = available[1] || AppState.members[1] || { id: '', name: 'Chưa chọn', chipName: 'Chưa chọn' };

  const newTeam = {
    id: `MT_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    branch,
    members: format === 'DOUBLES' ? [m1, m2] : [m1],
    memberIds: format === 'DOUBLES' ? [m1.id, m2.id] : [m1.id],
    displayName: format === 'DOUBLES' ? `${m1.chipName || m1.name} & ${m2.chipName || m2.name}` : (m1.chipName || m1.name),
    fullName: format === 'DOUBLES' ? `${m1.name} & ${m2.name}` : m1.name
  };

  if (branch === 'A') {
    matchmakerState.manualTeamsA.push(newTeam);
  } else {
    matchmakerState.manualTeamsB.push(newTeam);
  }

  renderManualTournamentBuilder();
  showToast(`Đã thêm 1 cặp đấu mới vào Nhánh ${branch}!`, 'success');
}

function initManualTournamentTeams() {
  const checked = Array.from(document.querySelectorAll('input[name="matchmakerPlayer"]:checked')).map(cb => {
    return AppState.members.find(m => m.id === cb.value);
  }).filter(Boolean);

  let players = [...checked];
  if (players.length < 4) {
    const checkboxes = document.querySelectorAll('input[name="matchmakerPlayer"]');
    checkboxes.forEach((cb, i) => { if (i < 8) cb.checked = true; });
    players = AppState.members.slice(0, 8);
    showToast('Đã tự động lấy 8 thành viên để ghép các cặp ban đầu!', 'info');
  }

  const formatSelect = document.getElementById('tournamentFormatSelect');
  const format = (formatSelect && formatSelect.value) || 'DOUBLES';

  const teams = [];
  if (format === 'DOUBLES') {
    let pIdx = 1;
    for (let i = 0; i < players.length; i += 2) {
      if (i + 1 < players.length) {
        const m1 = players[i];
        const m2 = players[i + 1];
        teams.push({
          id: `MT_${Date.now()}_${pIdx}`,
          displayName: `${m1.chipName || m1.name} & ${m2.chipName || m2.name}`,
          fullName: `${m1.name} & ${m2.name}`,
          members: [m1, m2],
          memberIds: [m1.id, m2.id]
        });
        pIdx++;
      } else {
        const m1 = players[i];
        teams.push({
          id: `MT_${Date.now()}_${pIdx}`,
          displayName: m1.chipName || m1.name,
          fullName: m1.name,
          members: [m1],
          memberIds: [m1.id]
        });
        pIdx++;
      }
    }
  } else {
    players.forEach((m, idx) => {
      teams.push({
        id: `MT_${Date.now()}_${idx + 1}`,
        displayName: m.chipName || m.name,
        fullName: m.name,
        members: [m],
        memberIds: [m.id]
      });
    });
  }

  matchmakerState.manualTeamsA = [];
  matchmakerState.manualTeamsB = [];
  teams.forEach((t, i) => {
    if (i % 2 === 0) {
      t.branch = 'A';
      matchmakerState.manualTeamsA.push(t);
    } else {
      t.branch = 'B';
      matchmakerState.manualTeamsB.push(t);
    }
  });

  renderManualTournamentBuilder();
  showToast(`Đã thiết lập ${teams.length} cặp đấu. Bạn có thể chọn lại thành viên từng cặp hoặc chuyển nhánh!`, 'success');
}

function renderManualTournamentBuilder() {
  const container = document.getElementById('manualTeamsListContainer');
  if (!container) return;

  const teamsA = matchmakerState.manualTeamsA;
  const teamsB = matchmakerState.manualTeamsB;
  const formatSelect = document.getElementById('tournamentFormatSelect');
  const format = (formatSelect && formatSelect.value) || 'DOUBLES';
  const isDoubles = format === 'DOUBLES';

  container.innerHTML = `
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
      <!-- Cột Nhánh A -->
      <div class="bg-blue-50/80 p-3 rounded-2xl border border-blue-200 space-y-2">
        <div class="flex items-center justify-between pb-1.5 border-b border-blue-200">
          <span class="font-black text-blue-900 text-xs flex items-center gap-1.5">
            <span class="w-5 h-5 rounded bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">A</span>
            <span>NHÁNH A (${teamsA.length} cặp)</span>
          </span>
          <button type="button" onclick="addManualPair('A')" class="px-2 py-0.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-black text-[11px] transition shadow-2xs cursor-pointer">
            + Thêm Cặp A
          </button>
        </div>
        
        <div class="space-y-2 max-h-80 overflow-y-auto pr-0.5">
          ${teamsA.length === 0 ? `<div class="p-4 text-center text-slate-400 italic text-xs">Chưa có cặp nào ở Nhánh A. Bấm "+ Thêm Cặp A"!</div>` : ''}
          ${teamsA.map((t, idx) => `
            <div class="p-2 bg-white rounded-xl border border-blue-100 shadow-2xs space-y-1.5">
              <div class="flex items-center justify-between">
                <span class="font-black text-blue-950 text-xs">Cặp A${idx + 1}: ${t.displayName}</span>
                <div class="flex items-center gap-1">
                  <button type="button" onclick="moveManualTeam('${t.id}', 'B')" class="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 hover:bg-purple-200 text-purple-900 border border-purple-300 transition cursor-pointer" title="Chuyển cặp này sang Nhánh B">
                    ⇄ Sang B
                  </button>
                  <button type="button" onclick="deleteManualTeam('${t.id}', 'A')" class="text-slate-400 hover:text-rose-600 px-1 text-xs cursor-pointer" title="Xóa cặp này">
                    ✕
                  </button>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-1.5">
                <div>
                  <label class="text-[9px] text-slate-400 font-bold block mb-0.5">Người 1:</label>
                  <select onchange="updateManualPairMember('${t.id}', 0, this.value)" class="w-full text-xs font-bold border border-slate-200 rounded-lg p-1.5 bg-slate-50 text-slate-800 focus:outline-none">
                    ${buildManualMemberSelectOptions(t.memberIds ? t.memberIds[0] : (t.members && t.members[0] ? t.members[0].id : ''))}
                  </select>
                </div>
                ${isDoubles ? `
                <div>
                  <label class="text-[9px] text-slate-400 font-bold block mb-0.5">Người 2:</label>
                  <select onchange="updateManualPairMember('${t.id}', 1, this.value)" class="w-full text-xs font-bold border border-slate-200 rounded-lg p-1.5 bg-slate-50 text-slate-800 focus:outline-none">
                    ${buildManualMemberSelectOptions(t.memberIds ? t.memberIds[1] : (t.members && t.members[1] ? t.members[1].id : ''))}
                  </select>
                </div>
                ` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Cột Nhánh B -->
      <div class="bg-purple-50/80 p-3 rounded-2xl border border-purple-200 space-y-2">
        <div class="flex items-center justify-between pb-1.5 border-b border-purple-200">
          <span class="font-black text-purple-900 text-xs flex items-center gap-1.5">
            <span class="w-5 h-5 rounded bg-purple-600 text-white flex items-center justify-center text-[10px] font-bold">B</span>
            <span>NHÁNH B (${teamsB.length} cặp)</span>
          </span>
          <button type="button" onclick="addManualPair('B')" class="px-2 py-0.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-black text-[11px] transition shadow-2xs cursor-pointer">
            + Thêm Cặp B
          </button>
        </div>
        
        <div class="space-y-2 max-h-80 overflow-y-auto pr-0.5">
          ${teamsB.length === 0 ? `<div class="p-4 text-center text-slate-400 italic text-xs">Chưa có cặp nào ở Nhánh B. Bấm "+ Thêm Cặp B"!</div>` : ''}
          ${teamsB.map((t, idx) => `
            <div class="p-2 bg-white rounded-xl border border-purple-100 shadow-2xs space-y-1.5">
              <div class="flex items-center justify-between">
                <span class="font-black text-purple-950 text-xs">Cặp B${idx + 1}: ${t.displayName}</span>
                <div class="flex items-center gap-1">
                  <button type="button" onclick="moveManualTeam('${t.id}', 'A')" class="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 hover:bg-blue-200 text-blue-900 border border-blue-300 transition cursor-pointer" title="Chuyển cặp này sang Nhánh A">
                    ⇄ Sang A
                  </button>
                  <button type="button" onclick="deleteManualTeam('${t.id}', 'B')" class="text-slate-400 hover:text-rose-600 px-1 text-xs cursor-pointer" title="Xóa cặp này">
                    ✕
                  </button>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-1.5">
                <div>
                  <label class="text-[9px] text-slate-400 font-bold block mb-0.5">Người 1:</label>
                  <select onchange="updateManualPairMember('${t.id}', 0, this.value)" class="w-full text-xs font-bold border border-slate-200 rounded-lg p-1.5 bg-slate-50 text-slate-800 focus:outline-none">
                    ${buildManualMemberSelectOptions(t.memberIds ? t.memberIds[0] : (t.members && t.members[0] ? t.members[0].id : ''))}
                  </select>
                </div>
                ${isDoubles ? `
                <div>
                  <label class="text-[9px] text-slate-400 font-bold block mb-0.5">Người 2:</label>
                  <select onchange="updateManualPairMember('${t.id}', 1, this.value)" class="w-full text-xs font-bold border border-slate-200 rounded-lg p-1.5 bg-slate-50 text-slate-800 focus:outline-none">
                    ${buildManualMemberSelectOptions(t.memberIds ? t.memberIds[1] : (t.members && t.members[1] ? t.members[1].id : ''))}
                  </select>
                </div>
                ` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function moveManualTeam(teamId, targetBranch) {
  let team = null;
  if (targetBranch === 'B') {
    const idx = matchmakerState.manualTeamsA.findIndex(t => t.id === teamId);
    if (idx !== -1) {
      team = matchmakerState.manualTeamsA.splice(idx, 1)[0];
      team.branch = 'B';
      matchmakerState.manualTeamsB.push(team);
    }
  } else {
    const idx = matchmakerState.manualTeamsB.findIndex(t => t.id === teamId);
    if (idx !== -1) {
      team = matchmakerState.manualTeamsB.splice(idx, 1)[0];
      team.branch = 'A';
      matchmakerState.manualTeamsA.push(team);
    }
  }
  renderManualTournamentBuilder();
}

function deleteManualTeam(teamId, branch) {
  if (branch === 'A') {
    matchmakerState.manualTeamsA = matchmakerState.manualTeamsA.filter(t => t.id !== teamId);
  } else {
    matchmakerState.manualTeamsB = matchmakerState.manualTeamsB.filter(t => t.id !== teamId);
  }
  renderManualTournamentBuilder();
}

function buildKnockoutBranchMatches(branch, teams) {
  const matches = [];
  if (teams.length < 2) return matches;

  if (teams.length === 2) {
    matches.push({
      id: `match_${branch}_CK`,
      code: `${branch}-CK`,
      stage: `Chung Kết Nhánh ${branch}`,
      round: 'FINAL',
      team1: teams[0],
      team2: teams[1],
      score1: 0,
      score2: 0,
      winner: null,
      loser: null,
      prize: 'Thắng vào Chung Kết CLB'
    });
  } else if (teams.length === 3) {
    matches.push({
      id: `match_${branch}_BK`,
      code: `${branch}-BK`,
      stage: `Bán Kết Nhánh ${branch}`,
      round: 'SEMI',
      team1: teams[1],
      team2: teams[2],
      score1: 0,
      score2: 0,
      winner: null,
      loser: null,
      prize: 'Thắng vào CK Nhánh'
    });
    matches.push({
      id: `match_${branch}_CK`,
      code: `${branch}-CK`,
      stage: `Chung Kết Nhánh ${branch}`,
      round: 'FINAL',
      team1: teams[0],
      team2: null,
      placeholder2: `Thắng ${branch}-BK`,
      score1: 0,
      score2: 0,
      winner: null,
      loser: null,
      prize: 'Thắng vào Chung Kết CLB'
    });
  } else if (teams.length === 4) {
    matches.push({
      id: `match_${branch}_BK1`,
      code: `${branch}-BK1`,
      stage: `Bán Kết 1 Nhánh ${branch}`,
      round: 'SEMI',
      team1: teams[0],
      team2: teams[1],
      score1: 0,
      score2: 0,
      winner: null,
      loser: null,
      prize: 'Thắng vào CK Nhánh'
    });
    matches.push({
      id: `match_${branch}_BK2`,
      code: `${branch}-BK2`,
      stage: `Bán Kết 2 Nhánh ${branch}`,
      round: 'SEMI',
      team1: teams[2],
      team2: teams[3],
      score1: 0,
      score2: 0,
      winner: null,
      loser: null,
      prize: 'Thắng vào CK Nhánh'
    });
    matches.push({
      id: `match_${branch}_CK`,
      code: `${branch}-CK`,
      stage: `Chung Kết Nhánh ${branch}`,
      round: 'FINAL',
      team1: null,
      team2: null,
      placeholder1: `Thắng ${branch}-BK1`,
      placeholder2: `Thắng ${branch}-BK2`,
      score1: 0,
      score2: 0,
      winner: null,
      loser: null,
      prize: 'Thắng vào Chung Kết CLB'
    });
  } else if (teams.length === 5) {
    matches.push({
      id: `match_${branch}_TK1`,
      code: `${branch}-TK1`,
      stage: `Tứ Kết Nhánh ${branch}`,
      round: 'QUARTER',
      team1: teams[3],
      team2: teams[4],
      score1: 0,
      score2: 0,
      winner: null,
      loser: null,
      prize: 'Thắng vào Bán Kết'
    });
    matches.push({
      id: `match_${branch}_BK1`,
      code: `${branch}-BK1`,
      stage: `Bán Kết 1 Nhánh ${branch}`,
      round: 'SEMI',
      team1: teams[0],
      team2: teams[1],
      score1: 0,
      score2: 0,
      winner: null,
      loser: null,
      prize: 'Thắng vào CK Nhánh'
    });
    matches.push({
      id: `match_${branch}_BK2`,
      code: `${branch}-BK2`,
      stage: `Bán Kết 2 Nhánh ${branch}`,
      round: 'SEMI',
      team1: teams[2],
      team2: null,
      placeholder2: `Thắng ${branch}-TK1`,
      score1: 0,
      score2: 0,
      winner: null,
      loser: null,
      prize: 'Thắng vào CK Nhánh'
    });
    matches.push({
      id: `match_${branch}_CK`,
      code: `${branch}-CK`,
      stage: `Chung Kết Nhánh ${branch}`,
      round: 'FINAL',
      team1: null,
      team2: null,
      placeholder1: `Thắng ${branch}-BK1`,
      placeholder2: `Thắng ${branch}-BK2`,
      score1: 0,
      score2: 0,
      winner: null,
      loser: null,
      prize: 'Thắng vào Chung Kết CLB'
    });
  } else {
    // 6 teams or more
    matches.push({
      id: `match_${branch}_TK1`,
      code: `${branch}-TK1`,
      stage: `Tứ Kết 1 Nhánh ${branch}`,
      round: 'QUARTER',
      team1: teams[2],
      team2: teams[3],
      score1: 0,
      score2: 0,
      winner: null,
      loser: null,
      prize: 'Thắng vào Bán Kết'
    });
    matches.push({
      id: `match_${branch}_TK2`,
      code: `${branch}-TK2`,
      stage: `Tứ Kết 2 Nhánh ${branch}`,
      round: 'QUARTER',
      team1: teams[4],
      team2: teams[5] || teams[teams.length - 1],
      score1: 0,
      score2: 0,
      winner: null,
      loser: null,
      prize: 'Thắng vào Bán Kết'
    });
    matches.push({
      id: `match_${branch}_BK1`,
      code: `${branch}-BK1`,
      stage: `Bán Kết 1 Nhánh ${branch}`,
      round: 'SEMI',
      team1: teams[0],
      team2: null,
      placeholder2: `Thắng ${branch}-TK1`,
      score1: 0,
      score2: 0,
      winner: null,
      loser: null,
      prize: 'Thắng vào CK Nhánh'
    });
    matches.push({
      id: `match_${branch}_BK2`,
      code: `${branch}-BK2`,
      stage: `Bán Kết 2 Nhánh ${branch}`,
      round: 'SEMI',
      team1: teams[1],
      team2: null,
      placeholder2: `Thắng ${branch}-TK2`,
      score1: 0,
      score2: 0,
      winner: null,
      loser: null,
      prize: 'Thắng vào CK Nhánh'
    });
    matches.push({
      id: `match_${branch}_CK`,
      code: `${branch}-CK`,
      stage: `Chung Kết Nhánh ${branch}`,
      round: 'FINAL',
      team1: null,
      team2: null,
      placeholder1: `Thắng ${branch}-BK1`,
      placeholder2: `Thắng ${branch}-BK2`,
      score1: 0,
      score2: 0,
      winner: null,
      loser: null,
      prize: 'Thắng vào Chung Kết CLB'
    });
  }
  return matches;
}

function propagateKnockoutWinners() {
  const tour = matchmakerState.tournament;
  if (!tour || tour.system !== 'KNOCKOUT') return;

  const updateBranch = (branch, matches) => {
    const tk1 = matches.find(m => m.id === `match_${branch}_TK1`);
    const tk2 = matches.find(m => m.id === `match_${branch}_TK2`);
    const bk = matches.find(m => m.id === `match_${branch}_BK`);
    const bk1 = matches.find(m => m.id === `match_${branch}_BK1`);
    const bk2 = matches.find(m => m.id === `match_${branch}_BK2`);
    const ck = matches.find(m => m.id === `match_${branch}_CK`);

    if (tk1 && bk1 && bk1.placeholder2) {
      bk1.team2 = tk1.winner;
    }
    if (tk1 && bk2 && bk2.placeholder2 && !tk2) {
      bk2.team2 = tk1.winner;
    }
    if (tk2 && bk2 && bk2.placeholder2) {
      bk2.team2 = tk2.winner;
    }

    if (bk && ck) {
      ck.team2 = bk.winner;
    }
    if (bk1 && ck) {
      ck.team1 = bk1.winner;
    }
    if (bk2 && ck) {
      ck.team2 = bk2.winner;
    }

    // Branch CK winner & loser propagate to Club finals!
    if (ck) {
      if (branch === 'A') {
        if (tour.finals && tour.finals.final) tour.finals.final.team1 = ck.winner;
        if (tour.finals && tour.finals.third) tour.finals.third.team1 = ck.loser;
      } else {
        if (tour.finals && tour.finals.final) tour.finals.final.team2 = ck.winner;
        if (tour.finals && tour.finals.third) tour.finals.third.team2 = ck.loser;
      }
    }
  };

  updateBranch('A', tour.matchesA);
  updateBranch('B', tour.matchesB);
}


function generateManualClubTournamentBracket() {
  const teamsA = matchmakerState.manualTeamsA;
  const teamsB = matchmakerState.manualTeamsB;

  if (teamsA.length < 2 || teamsB.length < 2) {
    showToast('Cần ít nhất 2 đội ở mỗi nhánh (A và B) để lập lịch thi đấu giải!', 'warning');
    return;
  }

  const titleInput = document.getElementById('tournamentTitleInput');
  const formatSelect = document.getElementById('tournamentFormatSelect');
  const systemSelect = document.getElementById('tournamentSystemSelect');
  const p1Input = document.getElementById('tournamentPrize1');
  const p2Input = document.getElementById('tournamentPrize2');
  const p3Input = document.getElementById('tournamentPrize3');
  const actionToolbar = document.getElementById('tournamentActionToolbar');
  const statsBadge = document.getElementById('matchStatsBadge');

  const title = (titleInput && titleInput.value.trim()) || 'Giải Cầu Lông Tranh Cúp Nội Bộ CLB';
  const format = (formatSelect && formatSelect.value) || 'DOUBLES';
  const system = (systemSelect && systemSelect.value) || 'KNOCKOUT';
  const prize1 = (p1Input && p1Input.value.trim()) || '🏆 Cúp Vô Địch + 1 Tháp bia + 4 Bò húc';
  const prize2 = (p2Input && p2Input.value.trim()) || '🥈 2 Lốc bò húc / nước ngọt';
  const prize3 = (p3Input && p3Input.value.trim()) || '🥉 1 Ống cầu lông thi đấu';

  // Đánh số thứ tự trong nhánh
  teamsA.forEach((t, i) => {
    t.branch = 'A';
    t.branchIndex = i + 1;
    t.id = `TA_${i + 1}`;
  });
  teamsB.forEach((t, i) => {
    t.branch = 'B';
    t.branchIndex = i + 1;
    t.id = `TB_${i + 1}`;
  });

  let matchesA, matchesB, finals;

  if (system === 'KNOCKOUT') {
    matchesA = buildKnockoutBranchMatches('A', teamsA);
    matchesB = buildKnockoutBranchMatches('B', teamsB);

    finals = {
      final: {
        id: 'final',
        title: 'CHUNG KẾT TRANH CÚP CLB',
        label1: 'Vô Địch Nhánh A',
        label2: 'Vô Địch Nhánh B',
        team1: null,
        team2: null,
        score1: 0,
        score2: 0,
        winner: null,
        runnerUp: null,
        prize: prize1
      },
      third: {
        id: 'third',
        title: 'TRANH HẠNG 3 (GIẢI BA)',
        label1: 'Á Quân Nhánh A',
        label2: 'Á Quân Nhánh B',
        team1: null,
        team2: null,
        score1: 0,
        score2: 0,
        winner: null,
        prize: prize3
      }
    };
  } else {
    // ROUND_ROBIN
    matchesA = createTournamentBranchMatches('A', teamsA);
    matchesB = createTournamentBranchMatches('B', teamsB);
    finals = {
      semi1: {
        id: 'semi1',
        title: 'Bán Kết 1',
        label1: 'Nhất Nhánh A',
        label2: 'Nhì Nhánh B',
        team1: teamsA[0] || null,
        team2: teamsB[1] || teamsB[0] || null,
        score1: 0,
        score2: 0,
        winner: null,
        loser: null
      },
      semi2: {
        id: 'semi2',
        title: 'Bán Kết 2',
        label1: 'Nhất Nhánh B',
        label2: 'Nhì Nhánh A',
        team1: teamsB[0] || null,
        team2: teamsA[1] || teamsA[0] || null,
        score1: 0,
        score2: 0,
        winner: null,
        loser: null
      },
      third: {
        id: 'third',
        title: 'Tranh Hạng 3',
        label1: 'Thua Bán Kết 1',
        label2: 'Thua Bán Kết 2',
        team1: null,
        team2: null,
        score1: 0,
        score2: 0,
        winner: null,
        prize: prize3
      },
      final: {
        id: 'final',
        title: 'Chung Kết Cúp CLB',
        label1: 'Thắng Bán Kết 1',
        label2: 'Thắng Bán Kết 2',
        team1: null,
        team2: null,
        score1: 0,
        score2: 0,
        winner: null,
        runnerUp: null,
        prize: prize1
      }
    };
  }

  matchmakerState.tournament = {
    title,
    format,
    system,
    prizes: { prize1, prize2, prize3 },
    teamsA: [...teamsA],
    teamsB: [...teamsB],
    matchesA,
    matchesB,
    finals,
    restingPlayer: null,
    totalPlayers: teamsA.reduce((sum, t) => sum + (t.members ? t.members.length : 0), 0) + teamsB.reduce((sum, t) => sum + (t.members ? t.members.length : 0), 0),
    createdAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
  };

  if (actionToolbar) actionToolbar.classList.remove('hidden');
  if (statsBadge) statsBadge.textContent = `${teamsA.length + teamsB.length} đội (${teamsA.length} Nhánh A • ${teamsB.length} Nhánh B - ${system === 'KNOCKOUT' ? 'Đấu Loại Trực Tiếp' : 'Vòng Tròn Bảng'})`;

  renderTournamentSchedule();
  showToast(`🏆 Đã tạo lịch thi đấu ${system === 'KNOCKOUT' ? 'Đấu loại trực tiếp (Knockout)' : 'Vòng bảng'}: ${teamsA.length} đội Nhánh A & ${teamsB.length} đội Nhánh B!`, 'success');
}

function swapLiveTournamentTeamBranch(teamId) {
  const tour = matchmakerState.tournament;
  if (!tour) return;

  const idxA = tour.teamsA.findIndex(t => t.id === teamId);
  const idxB = tour.teamsB.findIndex(t => t.id === teamId);

  if (idxA !== -1) {
    if (tour.teamsA.length <= 2) {
      showToast('Nhánh A cần có ít nhất 2 đội thi đấu!', 'warning');
      return;
    }
    const team = tour.teamsA.splice(idxA, 1)[0];
    team.branch = 'B';
    tour.teamsB.push(team);
  } else if (idxB !== -1) {
    if (tour.teamsB.length <= 2) {
      showToast('Nhánh B cần có ít nhất 2 đội thi đấu!', 'warning');
      return;
    }
    const team = tour.teamsB.splice(idxB, 1)[0];
    team.branch = 'A';
    tour.teamsA.push(team);
  } else {
    return;
  }

  // Re-index
  tour.teamsA.forEach((t, i) => {
    t.branchIndex = i + 1;
    t.id = `TA_${i + 1}`;
  });
  tour.teamsB.forEach((t, i) => {
    t.branchIndex = i + 1;
    t.id = `TB_${i + 1}`;
  });

  // Regenerate matches based on system
  if (tour.system === 'KNOCKOUT') {
    tour.matchesA = buildKnockoutBranchMatches('A', tour.teamsA);
    tour.matchesB = buildKnockoutBranchMatches('B', tour.teamsB);
  } else {
    tour.matchesA = createTournamentBranchMatches('A', tour.teamsA);
    tour.matchesB = createTournamentBranchMatches('B', tour.teamsB);
  }

  renderTournamentSchedule();
  showToast('Đã hoán đổi nhánh và tự động cập nhật lại lịch thi đấu!', 'success');
}

// ----------------------------------------------------
// BỐC THĂM PHÂN NHÁNH A & B VÀ TẠO LỊCH THI ĐẤU TRANH GIẢI CLB
// ----------------------------------------------------
function generateClubTournamentBracket() {
  const checked = Array.from(document.querySelectorAll('input[name="matchmakerPlayer"]:checked')).map(cb => {
    return AppState.members.find(m => m.id === cb.value);
  }).filter(Boolean);

  const titleInput = document.getElementById('tournamentTitleInput');
  const formatSelect = document.getElementById('tournamentFormatSelect');
  const systemSelect = document.getElementById('tournamentSystemSelect');
  const p1Input = document.getElementById('tournamentPrize1');
  const p2Input = document.getElementById('tournamentPrize2');
  const p3Input = document.getElementById('tournamentPrize3');
  const actionToolbar = document.getElementById('tournamentActionToolbar');
  const statsBadge = document.getElementById('matchStatsBadge');

  const title = (titleInput && titleInput.value.trim()) || 'Giải Cầu Lông Tranh Cúp Nội Bộ CLB';
  const format = (formatSelect && formatSelect.value) || 'DOUBLES';
  const system = (systemSelect && systemSelect.value) || 'KNOCKOUT';
  const prize1 = (p1Input && p1Input.value.trim()) || '🏆 Cúp Vô Địch + 1 Tháp bia + 4 Bò húc';
  const prize2 = (p2Input && p2Input.value.trim()) || '🥈 2 Lốc bò húc / nước ngọt';
  const prize3 = (p3Input && p3Input.value.trim()) || '🥉 1 Ống cầu lông thi đấu';

  if (checked.length < 4) {
    showToast('Cần chọn ít nhất 4 người chơi để bốc thăm chia nhánh A & B!', 'warning');
    return;
  }

  // Xáo trộn ngẫu nhiên
  const shuffled = [...checked].sort(() => Math.random() - 0.5);

  let teams = [];
  let restingPlayer = null;

  if (format === 'DOUBLES') {
    if (shuffled.length % 2 !== 0) {
      restingPlayer = shuffled.pop();
    }
    let pairIdx = 1;
    while (shuffled.length >= 2) {
      const m1 = shuffled.pop();
      const m2 = shuffled.pop();
      teams.push({
        id: `T${pairIdx}`,
        index: pairIdx,
        displayName: `${m1.chipName || m1.name} & ${m2.chipName || m2.name}`,
        fullName: `${m1.name} & ${m2.name}`,
        members: [m1, m2],
        memberIds: [m1.id, m2.id]
      });
      pairIdx++;
    }
  } else {
    // SINGLES
    teams = shuffled.map((m, idx) => ({
      id: `T${idx + 1}`,
      index: idx + 1,
      displayName: m.chipName || m.name,
      fullName: m.name,
      members: [m],
      memberIds: [m.id]
    }));
  }

  // Chia đều vào Nhánh A và Nhánh B (Ziczac)
  const teamsA = [];
  const teamsB = [];

  teams.forEach((t, i) => {
    if (i % 2 === 0) {
      t.branch = 'A';
      t.branchIndex = teamsA.length + 1;
      teamsA.push(t);
    } else {
      t.branch = 'B';
      t.branchIndex = teamsB.length + 1;
      teamsB.push(t);
    }
  });

  let matchesA, matchesB, finals;

  if (system === 'KNOCKOUT') {
    matchesA = buildKnockoutBranchMatches('A', teamsA);
    matchesB = buildKnockoutBranchMatches('B', teamsB);
    finals = {
      final: {
        id: 'final',
        title: 'CHUNG KẾT TRANH CÚP CLB',
        label1: 'Vô Địch Nhánh A',
        label2: 'Vô Địch Nhánh B',
        team1: null,
        team2: null,
        score1: 0,
        score2: 0,
        winner: null,
        runnerUp: null,
        prize: prize1
      },
      third: {
        id: 'third',
        title: 'TRANH HẠNG 3 (GIẢI BA)',
        label1: 'Á Quân Nhánh A',
        label2: 'Á Quân Nhánh B',
        team1: null,
        team2: null,
        score1: 0,
        score2: 0,
        winner: null,
        prize: prize3
      }
    };
  } else {
    matchesA = createTournamentBranchMatches('A', teamsA);
    matchesB = createTournamentBranchMatches('B', teamsB);
    finals = {
      semi1: {
        id: 'semi1',
        title: 'Bán Kết 1',
        label1: 'Nhất Nhánh A',
        label2: 'Nhì Nhánh B',
        team1: teamsA[0] || null,
        team2: teamsB[1] || teamsB[0] || null,
        score1: 0,
        score2: 0,
        winner: null,
        loser: null
      },
      semi2: {
        id: 'semi2',
        title: 'Bán Kết 2',
        label1: 'Nhất Nhánh B',
        label2: 'Nhì Nhánh A',
        team1: teamsB[0] || null,
        team2: teamsA[1] || teamsA[0] || null,
        score1: 0,
        score2: 0,
        winner: null,
        loser: null
      },
      third: {
        id: 'third',
        title: 'Tranh Hạng 3',
        label1: 'Thua Bán Kết 1',
        label2: 'Thua Bán Kết 2',
        team1: null,
        team2: null,
        score1: 0,
        score2: 0,
        winner: null,
        prize: prize3
      },
      final: {
        id: 'final',
        title: 'Chung Kết Cúp CLB',
        label1: 'Thắng Bán Kết 1',
        label2: 'Thắng Bán Kết 2',
        team1: null,
        team2: null,
        score1: 0,
        score2: 0,
        winner: null,
        runnerUp: null,
        prize: prize1
      }
    };
  }

  matchmakerState.tournament = {
    title,
    format,
    system,
    prizes: { prize1, prize2, prize3 },
    teamsA,
    teamsB,
    matchesA,
    matchesB,
    finals,
    restingPlayer,
    totalPlayers: checked.length,
    createdAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
  };

  if (actionToolbar) actionToolbar.classList.remove('hidden');
  if (statsBadge) statsBadge.textContent = `${teams.length} đội (${teamsA.length} Nhánh A • ${teamsB.length} Nhánh B - ${system === 'KNOCKOUT' ? 'Đấu Loại Trực Tiếp' : 'Vòng Tròn Bảng'})`;

  renderTournamentSchedule();
  showToast(`🏆 Đã bốc thăm thành công (${system === 'KNOCKOUT' ? 'Knockout Trực Tiếp' : 'Vòng Tròn Bảng'}): ${teamsA.length} đội Nhánh A & ${teamsB.length} đội Nhánh B!`, 'success');
}

function createTournamentBranchMatches(branch, teams) {
  const matches = [];
  if (teams.length <= 1) return matches;

  if (teams.length === 2) {
    matches.push({
      id: `match_${branch}_1`,
      code: `Trận ${branch}1`,
      team1: teams[0],
      team2: teams[1],
      score1: 0,
      score2: 0,
      winner: null
    });
  } else if (teams.length === 3) {
    matches.push({ id: `match_${branch}_1`, code: `Trận ${branch}1`, team1: teams[0], team2: teams[1], score1: 0, score2: 0, winner: null });
    matches.push({ id: `match_${branch}_2`, code: `Trận ${branch}2`, team1: teams[1], team2: teams[2], score1: 0, score2: 0, winner: null });
    matches.push({ id: `match_${branch}_3`, code: `Trận ${branch}3`, team1: teams[0], team2: teams[2], score1: 0, score2: 0, winner: null });
  } else {
    // 4 teams or more
    for (let i = 0; i < teams.length; i += 2) {
      if (i + 1 < teams.length) {
        matches.push({
          id: `match_${branch}_${matches.length + 1}`,
          code: `Trận ${branch}${matches.length + 1}`,
          team1: teams[i],
          team2: teams[i + 1],
          score1: 0,
          score2: 0,
          winner: null
        });
      }
    }
    if (teams.length >= 4) {
      matches.push({
        id: `match_${branch}_${matches.length + 1}`,
        code: `Trận ${branch}${matches.length + 1} (Tranh Nhất/Nhì)`,
        team1: teams[0],
        team2: teams[2] || teams[1],
        score1: 0,
        score2: 0,
        winner: null
      });
    }
  }
  return matches;
}

function renderTournamentSchedule() {
  const output = document.getElementById('matchesOutputArea');
  const tour = matchmakerState.tournament;
  if (!output || !tour) return;

  const restingHtml = tour.restingPlayer ? `
    <div class="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center justify-between">
      <span>Nghỉ ngơi lượt này (Chờ thay ca / dự bị): <b>${tour.restingPlayer.name}</b></span>
      <i data-lucide="coffee" class="w-4 h-4"></i>
    </div>
  ` : '';

  // Kiểm tra nhà vô địch, giải nhì & giải ba
  const champion = tour.finals && tour.finals.final ? tour.finals.final.winner : null;
  const runnerUp = tour.finals && tour.finals.final ? tour.finals.final.runnerUp : null;
  const thirdPlace = tour.finals && tour.finals.third ? tour.finals.third.winner : null;

  const championHtml = champion ? `
    <div class="p-4 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-400 rounded-2xl border-2 border-amber-500 shadow-md text-center space-y-2 text-amber-950 animate-pulse">
      <div class="text-xs uppercase font-black tracking-wider flex items-center justify-center gap-1.5">
        <span>🏆🏆🏆</span>
        <span>NHÀ VÔ ĐỊCH TRANH CÚP CLB</span>
        <span>🏆🏆🏆</span>
      </div>
      <div class="text-lg font-black text-amber-950">${champion.fullName} (${champion.displayName})</div>
      <div class="text-xs font-bold text-amber-900 bg-white/70 py-1 px-3 rounded-full inline-block border border-amber-300">
        Phần thưởng: ${tour.prizes.prize1}
      </div>
      ${(runnerUp || thirdPlace) ? `
      <div class="flex items-center justify-center flex-wrap gap-4 text-xs font-bold pt-1.5 border-t border-amber-500/30">
        ${runnerUp ? `<span class="text-slate-800">🥈 Giải Nhì: <b>${runnerUp.displayName}</b> (${tour.prizes.prize2})</span>` : ''}
        ${thirdPlace ? `<span class="text-amber-950">🥉 Giải Ba: <b>${thirdPlace.displayName}</b> (${tour.prizes.prize3})</span>` : ''}
      </div>` : ''}
    </div>
  ` : '';

  // Render thẻ trận đấu vòng nhánh
  const renderBranchMatchRow = (m, branch) => {
    const s1 = m.score1 || 0;
    const s2 = m.score2 || 0;
    const t1Name = m.team1 ? m.team1.displayName : (m.placeholder1 || 'Chờ đấu');
    const t1Full = m.team1 ? m.team1.fullName : '';
    const t2Name = m.team2 ? m.team2.displayName : (m.placeholder2 || 'Chờ đấu');
    const t2Full = m.team2 ? m.team2.fullName : '';
    const isDisabled = (!m.team1 || !m.team2);

    let badge = '<span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-500">Chưa đấu</span>';
    if (isDisabled) {
      badge = '<span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-400">Chờ cặp thắng trước</span>';
    } else if (s1 > s2 && (s1 > 0 || s2 > 0)) {
      badge = `<span class="px-2 py-0.5 rounded-md text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300">🏆 ${m.team1 ? m.team1.displayName : t1Name} Thắng</span>`;
    } else if (s2 > s1 && (s1 > 0 || s2 > 0)) {
      badge = `<span class="px-2 py-0.5 rounded-md text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300">🏆 ${m.team2 ? m.team2.displayName : t2Name} Thắng</span>`;
    }

    const prizeBadge = m.prize ? `<span class="text-[9px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">🎁 ${m.prize}</span>` : '';

    return `
      <div class="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2">
        <div class="flex items-center justify-between text-xs flex-wrap gap-1">
          <div class="flex items-center gap-1.5">
            <span class="font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">${m.code}</span>
            <span class="text-[10px] text-slate-500 font-bold">${m.stage || ''}</span>
            ${prizeBadge}
          </div>
          <div>${badge}</div>
        </div>
        <div class="grid grid-cols-11 gap-1 items-center">
          <div class="col-span-4 text-right pr-2">
            <b class="text-xs ${m.winner === m.team1 && m.team1 ? 'text-emerald-800 font-black' : 'text-slate-800'} block truncate" title="${t1Full}">${t1Name}</b>
          </div>
          <div class="col-span-3 flex items-center justify-center gap-1">
            <input type="number" min="0" max="35" value="${s1}" ${isDisabled ? 'disabled' : ''} oninput="updateTournamentMatchScore('${branch}', '${m.id}', this.value, null)" 
                   class="w-8 text-center text-xs font-black border border-slate-200 rounded p-1 bg-slate-50 focus:bg-white disabled:opacity-30 disabled:cursor-not-allowed" />
            <span class="text-xs font-bold text-slate-300">-</span>
            <input type="number" min="0" max="35" value="${s2}" ${isDisabled ? 'disabled' : ''} oninput="updateTournamentMatchScore('${branch}', '${m.id}', null, this.value)" 
                   class="w-8 text-center text-xs font-black border border-slate-200 rounded p-1 bg-slate-50 focus:bg-white disabled:opacity-30 disabled:cursor-not-allowed" />
          </div>
          <div class="col-span-4 text-left pl-2">
            <b class="text-xs ${m.winner === m.team2 && m.team2 ? 'text-emerald-800 font-black' : 'text-slate-800'} block truncate" title="${t2Full}">${t2Name}</b>
          </div>
        </div>
      </div>
    `;
  };

  // Render thẻ trận đấu vòng chung kết (Knockout)
  const renderKnockoutMatchRow = (f) => {
    if (!f) return '';
    const s1 = f.score1 || 0;
    const s2 = f.score2 || 0;
    const t1Name = f.team1 ? f.team1.displayName : (f.label1 || 'Chờ xác định');
    const t2Name = f.team2 ? f.team2.displayName : (f.label2 || 'Chờ xác định');
    const prizeBadge = f.prize ? `<span class="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">🎁 ${f.prize}</span>` : '';
    const isDisabled = (!f.team1 || !f.team2);

    let status = '<span class="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded">Chờ kết quả</span>';
    if (isDisabled) {
      status = '<span class="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded">Chờ xác định 2 đội</span>';
    } else if (f.winner) {
      status = `<span class="text-[10px] font-black text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">🏆 ${f.winner.displayName} Thắng</span>`;
    }

    const cardBg = f.id === 'final' ? 'bg-gradient-to-br from-amber-50/80 to-purple-50/80 border-amber-300 ring-2 ring-amber-300/50' : 'bg-white border-slate-200';

    return `
      <div class="p-3.5 rounded-2xl border ${cardBg} shadow-xs space-y-2.5">
        <div class="flex items-center justify-between flex-wrap gap-1">
          <div class="flex items-center gap-1.5">
            <span class="w-5 h-5 rounded-md ${f.id === 'final' ? 'bg-amber-500' : 'bg-purple-600'} text-white font-black text-[10px] flex items-center justify-center">⚔️</span>
            <b class="text-xs ${f.id === 'final' ? 'text-amber-950 font-black uppercase' : 'text-slate-900 font-bold'}">${f.title}</b>
            ${prizeBadge}
          </div>
          <div>${status}</div>
        </div>

        <div class="grid grid-cols-11 gap-1 items-center bg-white/90 p-2 rounded-xl border border-slate-200/80">
          <div class="col-span-4 text-right pr-2">
            <span class="text-[10px] text-slate-400 block">${f.label1 || ''}</span>
            <b class="text-xs ${f.winner === f.team1 && f.team1 ? 'text-emerald-800 font-black' : 'text-slate-800'} block truncate">${t1Name}</b>
          </div>
          <div class="col-span-3 flex items-center justify-center gap-1">
            <input type="number" min="0" max="35" value="${s1}" ${isDisabled ? 'disabled' : ''} oninput="updateTournamentKnockoutScore('${f.id}', this.value, null)" 
                   class="w-9 text-center text-xs font-black border border-slate-300 rounded-lg p-1 bg-white focus:ring-1 focus:ring-purple-500 disabled:opacity-30 disabled:cursor-not-allowed" />
            <span class="text-xs font-bold text-slate-400">:</span>
            <input type="number" min="0" max="35" value="${s2}" ${isDisabled ? 'disabled' : ''} oninput="updateTournamentKnockoutScore('${f.id}', null, this.value)" 
                   class="w-9 text-center text-xs font-black border border-slate-300 rounded-lg p-1 bg-white focus:ring-1 focus:ring-purple-500 disabled:opacity-30 disabled:cursor-not-allowed" />
          </div>
          <div class="col-span-4 text-left pl-2">
            <span class="text-[10px] text-slate-400 block">${f.label2 || ''}</span>
            <b class="text-xs ${f.winner === f.team2 && f.team2 ? 'text-emerald-800 font-black' : 'text-slate-800'} block truncate">${t2Name}</b>
          </div>
        </div>
      </div>
    `;
  };

  output.innerHTML = `
    <!-- 1. Banner Tiêu Đề Giải Đấu & Cơ Cấu Giải Thưởng -->
    <div class="bg-gradient-to-r from-purple-800 via-indigo-900 to-purple-900 p-4 rounded-2xl text-white shadow-md space-y-2.5">
      <div class="flex items-center justify-between flex-wrap gap-2">
        <div class="flex items-center gap-2">
          <span class="text-xl">🏆</span>
          <div>
            <h3 class="text-sm font-black uppercase tracking-tight">${tour.title}</h3>
            <span class="text-[11px] text-purple-200">${tour.format === 'DOUBLES' ? 'Thể thức Đánh Đôi' : 'Thể thức Đánh Đơn'} • ${tour.system === 'KNOCKOUT' ? '⚡ Đấu Loại Trực Tiếp (Knockout)' : '🔄 Vòng Tròn Chia Bảng'} • Lúc ${tour.createdAt}</span>
          </div>
        </div>
        <span class="px-2.5 py-1 bg-white/20 backdrop-blur rounded-lg text-xs font-black border border-white/30">
          Tổng ${tour.totalPlayers} VĐV (${tour.teamsA.length + tour.teamsB.length} đội)
        </span>
      </div>

      <!-- Cơ cấu giải thưởng -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-purple-700/60 text-xs">
        <div class="bg-white/10 p-2 rounded-xl backdrop-blur">
          <span class="text-[10px] text-amber-300 font-bold block">🥇 GIẢI NHẤT (VÔ ĐỊCH)</span>
          <b class="text-[11px]">${tour.prizes.prize1}</b>
        </div>
        <div class="bg-white/10 p-2 rounded-xl backdrop-blur">
          <span class="text-[10px] text-slate-300 font-bold block">🥈 GIẢI NHÌ</span>
          <b class="text-[11px]">${tour.prizes.prize2}</b>
        </div>
        <div class="bg-white/10 p-2 rounded-xl backdrop-blur">
          <span class="text-[10px] text-amber-200 font-bold block">🥉 GIẢI BA</span>
          <b class="text-[11px]">${tour.prizes.prize3}</b>
        </div>
      </div>
    </div>

    ${championHtml}
    ${restingHtml}

    <!-- 2. BẢNG PHÂN BỔ 2 NHÁNH A VÀ NHÁNH B -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <!-- NHÁNH A -->
      <div class="bg-blue-50/70 p-3 rounded-2xl border border-blue-200 space-y-2">
        <div class="flex items-center justify-between pb-1.5 border-b border-blue-200/80">
          <span class="text-xs font-black text-blue-900 uppercase flex items-center gap-1.5">
            <span class="w-5 h-5 rounded-md bg-blue-600 text-white font-black text-[10px] flex items-center justify-center">A</span>
            <span>NHÁNH A (${tour.teamsA.length} cặp)</span>
          </span>
          <span class="text-[10px] font-bold text-blue-700 bg-white px-2 py-0.5 rounded-full border border-blue-200">${tour.teamsA.length} đội</span>
        </div>
        <div class="space-y-1 text-xs">
          ${tour.teamsA.map((t, i) => `
            <div class="p-1.5 bg-white rounded-lg border border-blue-100 flex items-center justify-between gap-1 shadow-2xs">
              <div class="truncate">
                <span class="font-bold text-slate-800">A${i + 1}. ${t.displayName}</span>
                <span class="text-[10px] text-slate-400 hidden sm:inline ml-1">(${t.fullName})</span>
              </div>
              <button type="button" onclick="swapLiveTournamentTeamBranch('${t.id}')" class="px-1.5 py-0.5 rounded text-[9px] font-black bg-purple-100 hover:bg-purple-200 text-purple-900 border border-purple-300 transition shrink-0 cursor-pointer" title="Chuyển đội này sang Nhánh B và tính lại lịch đấu">
                ⇄ Sang B
              </button>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- NHÁNH B -->
      <div class="bg-purple-50/70 p-3 rounded-2xl border border-purple-200 space-y-2">
        <div class="flex items-center justify-between pb-1.5 border-b border-purple-200/80">
          <span class="text-xs font-black text-purple-900 uppercase flex items-center gap-1.5">
            <span class="w-5 h-5 rounded-md bg-purple-600 text-white font-black text-[10px] flex items-center justify-center">B</span>
            <span>NHÁNH B (${tour.teamsB.length} cặp)</span>
          </span>
          <span class="text-[10px] font-bold text-purple-700 bg-white px-2 py-0.5 rounded-full border border-purple-200">${tour.teamsB.length} đội</span>
        </div>
        <div class="space-y-1 text-xs">
          ${tour.teamsB.map((t, i) => `
            <div class="p-1.5 bg-white rounded-lg border border-purple-100 flex items-center justify-between gap-1 shadow-2xs">
              <div class="truncate">
                <span class="font-bold text-slate-800">B${i + 1}. ${t.displayName}</span>
                <span class="text-[10px] text-slate-400 hidden sm:inline ml-1">(${t.fullName})</span>
              </div>
              <button type="button" onclick="swapLiveTournamentTeamBranch('${t.id}')" class="px-1.5 py-0.5 rounded text-[9px] font-black bg-blue-100 hover:bg-blue-200 text-blue-900 border border-blue-300 transition shrink-0 cursor-pointer" title="Chuyển đội này sang Nhánh A và tính lại lịch đấu">
                ⇄ Sang A
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- 3. LỊCH THI ĐẤU VÒNG NHÁNH (NHÁNH A & NHÁNH B) -->
    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <b class="text-xs text-slate-900 font-black uppercase flex items-center gap-1.5">
          <span>⚡</span>
          <span>${tour.system === 'KNOCKOUT' ? 'Lịch Đấu Loại Trực Tiếp Vòng Nhánh A & B' : 'Lịch Thi Đấu Vòng Nhánh (Nhập điểm trực tiếp)'}</span>
        </b>
        <span class="text-[10px] text-slate-400 italic">Nhập điểm để tự động xác định đội thắng tiến vào vòng sau</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <!-- Lịch Nhánh A -->
        <div class="space-y-2">
          <div class="text-[11px] font-bold text-blue-900 bg-blue-100/70 px-2 py-1 rounded-lg">CÁC TRẬN ĐẤU NHÁNH A</div>
          ${tour.matchesA.map(m => renderBranchMatchRow(m, 'A')).join('')}
        </div>

        <!-- Lịch Nhánh B -->
        <div class="space-y-2">
          <div class="text-[11px] font-bold text-purple-900 bg-purple-100/70 px-2 py-1 rounded-lg">CÁC TRẬN ĐẤU NHÁNH B</div>
          ${tour.matchesB.map(m => renderBranchMatchRow(m, 'B')).join('')}
        </div>
      </div>
    </div>

    <!-- 4. VÒNG CHUNG KẾT TRANH GIẢI CLB -->
    <div class="space-y-3 pt-2 border-t border-slate-200">
      <div class="flex items-center justify-between">
        <b class="text-xs text-purple-950 font-black uppercase flex items-center gap-1.5">
          <span>🏆</span>
          <span>${tour.system === 'KNOCKOUT' ? 'Vòng Tranh Cúp Vô Địch & Phân Hạng CLB' : 'Vòng Chung Kết Tranh Giải CLB (Bán Kết, Tranh Ba & Chung Kết)'}</span>
        </b>
        <span class="text-[10px] text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full font-bold">
          ${tour.system === 'KNOCKOUT' ? 'Đấu Loại Trực Tiếp (Knockout)' : 'Vòng Tròn Bảng Vào Bán Kết'}
        </span>
      </div>

      ${tour.system === 'KNOCKOUT' ? `
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${renderKnockoutMatchRow(tour.finals.final)}
          ${renderKnockoutMatchRow(tour.finals.third)}
        </div>
      ` : `
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${renderKnockoutMatchRow(tour.finals.semi1)}
          ${renderKnockoutMatchRow(tour.finals.semi2)}
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${renderKnockoutMatchRow(tour.finals.third)}
          ${renderKnockoutMatchRow(tour.finals.final)}
        </div>
      `}
    </div>
  `;

  lucide.createIcons();
}

function updateTournamentMatchScore(branch, matchId, s1, s2) {
  const tour = matchmakerState.tournament;
  if (!tour) return;

  const matches = branch === 'A' ? tour.matchesA : tour.matchesB;
  const m = matches.find(x => x.id === matchId);
  if (!m) return;

  if (s1 !== null && s1 !== undefined) m.score1 = Number(s1) || 0;
  if (s2 !== null && s2 !== undefined) m.score2 = Number(s2) || 0;

  if (m.score1 > m.score2 && (m.score1 > 0 || m.score2 > 0)) {
    m.winner = m.team1;
    m.loser = m.team2;
  } else if (m.score2 > m.score1 && (m.score1 > 0 || m.score2 > 0)) {
    m.winner = m.team2;
    m.loser = m.team1;
  } else {
    m.winner = null;
    m.loser = null;
  }

  // Tự động phân bổ vào vòng tiếp theo
  if (tour.system === 'KNOCKOUT') {
    propagateKnockoutWinners();
  } else {
    updateTournamentStandingsToKnockout();
  }

  renderTournamentSchedule();
}

function updateTournamentKnockoutScore(matchKey, s1, s2) {
  const tour = matchmakerState.tournament;
  if (!tour || !tour.finals) return;

  const f = tour.finals[matchKey];
  if (!f) return;

  if (s1 !== null && s1 !== undefined) f.score1 = Number(s1) || 0;
  if (s2 !== null && s2 !== undefined) f.score2 = Number(s2) || 0;

  if (f.score1 > f.score2 && (f.score1 > 0 || f.score2 > 0)) {
    f.winner = f.team1;
    f.loser = f.team2;
    if (matchKey === 'final') f.runnerUp = f.team2;
  } else if (f.score2 > f.score1 && (f.score1 > 0 || f.score2 > 0)) {
    f.winner = f.team2;
    f.loser = f.team1;
    if (matchKey === 'final') f.runnerUp = f.team1;
  } else {
    f.winner = null;
    f.loser = null;
    if (matchKey === 'final') f.runnerUp = null;
  }

  // Cập nhật kết quả Bán kết lên Chung kết & Tranh ba (chế độ ROUND_ROBIN)
  if (matchKey === 'semi1') {
    if (tour.finals.final) tour.finals.final.team1 = f.winner;
    if (tour.finals.third) tour.finals.third.team1 = f.loser;
  } else if (matchKey === 'semi2') {
    if (tour.finals.final) tour.finals.final.team2 = f.winner;
    if (tour.finals.third) tour.finals.third.team2 = f.loser;
  }

  renderTournamentSchedule();
}

function updateTournamentStandingsToKnockout() {
  const tour = matchmakerState.tournament;
  if (!tour) return;

  const rankA = getBranchRankings('A');
  const rankB = getBranchRankings('B');

  if (rankA.first && tour.finals.semi1) tour.finals.semi1.team1 = rankA.first;
  if (rankB.second && tour.finals.semi1) tour.finals.semi1.team2 = rankB.second;

  if (rankB.first && tour.finals.semi2) tour.finals.semi2.team1 = rankB.first;
  if (rankA.second && tour.finals.semi2) tour.finals.semi2.team2 = rankA.second;
}

function getBranchRankings(branch) {
  const tour = matchmakerState.tournament;
  if (!tour) return { first: null, second: null };

  const teams = branch === 'A' ? tour.teamsA : tour.teamsB;
  const matches = branch === 'A' ? tour.matchesA : tour.matchesB;

  const scores = {};
  teams.forEach(t => scores[t.id] = { team: t, wins: 0, diff: 0 });

  matches.forEach(m => {
    if (m.score1 > 0 || m.score2 > 0) {
      if (m.score1 > m.score2) {
        if (scores[m.team1.id]) scores[m.team1.id].wins++;
      } else if (m.score2 > m.score1) {
        if (scores[m.team2.id]) scores[m.team2.id].wins++;
      }
      if (scores[m.team1.id]) scores[m.team1.id].diff += (m.score1 - m.score2);
      if (scores[m.team2.id]) scores[m.team2.id].diff -= (m.score1 - m.score2);
    }
  });

  const sorted = Object.values(scores).sort((a, b) => {
    if (b.wins !== a.wins) return b.wins - a.wins;
    return b.diff - a.diff;
  });

  return {
    first: sorted[0] ? sorted[0].team : null,
    second: sorted[1] ? sorted[1].team : null
  };
}

// Đồng bộ toàn bộ lịch đấu giải vào Buổi hoạt động
function syncTournamentToActivity() {
  const tour = matchmakerState.tournament;
  if (!tour) return;

  const confirmed = confirm(`Xác nhận nạp lịch thi đấu giải "${tour.title}" vào Buổi hoạt động để theo dõi và tính tiền?`);
  if (!confirmed) return;

  activityState.matches = [];
  let seq = 1;

  // Nạp Nhánh A
  tour.matchesA.forEach(m => {
    if (m.team1 && m.team2) {
      activityState.matches.push({
        id: Date.now() + seq,
        team1: m.team1.memberIds || [],
        team2: m.team2.memberIds || [],
        score1: m.score1 || 0,
        score2: m.score2 || 0,
        prize: `Nhánh A (${m.code}: ${m.stage || ''})`
      });
      seq++;
    }
  });

  // Nạp Nhánh B
  tour.matchesB.forEach(m => {
    if (m.team1 && m.team2) {
      activityState.matches.push({
        id: Date.now() + seq,
        team1: m.team1.memberIds || [],
        team2: m.team2.memberIds || [],
        score1: m.score1 || 0,
        score2: m.score2 || 0,
        prize: `Nhánh B (${m.code}: ${m.stage || ''})`
      });
      seq++;
    }
  });

  // Nạp Bán kết (nếu có)
  if (tour.finals && tour.finals.semi1 && tour.finals.semi1.team1 && tour.finals.semi1.team2) {
    activityState.matches.push({
      id: Date.now() + seq++,
      team1: tour.finals.semi1.team1.memberIds || [],
      team2: tour.finals.semi1.team2.memberIds || [],
      score1: tour.finals.semi1.score1 || 0,
      score2: tour.finals.semi1.score2 || 0,
      prize: 'Bán Kết 1'
    });
  }

  if (tour.finals && tour.finals.semi2 && tour.finals.semi2.team1 && tour.finals.semi2.team2) {
    activityState.matches.push({
      id: Date.now() + seq++,
      team1: tour.finals.semi2.team1.memberIds || [],
      team2: tour.finals.semi2.team2.memberIds || [],
      score1: tour.finals.semi2.score1 || 0,
      score2: tour.finals.semi2.score2 || 0,
      prize: 'Bán Kết 2'
    });
  }

  // Nạp Tranh Hạng 3
  if (tour.finals && tour.finals.third && tour.finals.third.team1 && tour.finals.third.team2) {
    activityState.matches.push({
      id: Date.now() + seq++,
      team1: tour.finals.third.team1.memberIds || [],
      team2: tour.finals.third.team2.memberIds || [],
      score1: tour.finals.third.score1 || 0,
      score2: tour.finals.third.score2 || 0,
      prize: `Tranh Hạng 3 (${tour.prizes.prize3})`
    });
  }

  // Nạp Chung Kết
  if (tour.finals && tour.finals.final && tour.finals.final.team1 && tour.finals.final.team2) {
    activityState.matches.push({
      id: Date.now() + seq++,
      team1: tour.finals.final.team1.memberIds || [],
      team2: tour.finals.final.team2.memberIds || [],
      score1: tour.finals.final.score1 || 0,
      score2: tour.finals.final.score2 || 0,
      prize: `Chung Kết Cúp CLB (${tour.prizes.prize1})`
    });
  }

  renderActivityMatches();
  switchTab('activity');
  showToast(`✓ Đã nạp thành công ${activityState.matches.length} trận đấu giải vào Buổi hoạt động!`, 'success');
}

// Xuất lịch thi đấu gửi Zalo
function copyTournamentToClipboard() {
  const tour = matchmakerState.tournament;
  if (!tour) return;

  let text = `🏸 ${tour.title.toUpperCase()} 🏆\n`;
  text += `====================================\n`;
  text += `⚡ THỂ THỨC: ${tour.system === 'KNOCKOUT' ? 'ĐẤU LOẠI TRỰC TIẾP (KNOCKOUT)' : 'VÒNG TRÒN CHIA BẢNG'}\n`;
  text += `🎁 CƠ CẤU GIẢI THƯỞNG:\n`;
  text += `🥇 Giải Nhất (Vô Địch): ${tour.prizes.prize1}\n`;
  text += `🥈 Giải Nhì: ${tour.prizes.prize2}\n`;
  text += `🥉 Giải Ba: ${tour.prizes.prize3}\n\n`;

  text += `🔵 NHÁNH A (${tour.teamsA.length} cặp):\n`;
  tour.teamsA.forEach((t, i) => {
    text += `  • A${i + 1}: ${t.displayName} (${t.fullName})\n`;
  });

  text += `\n🟣 NHÁNH B (${tour.teamsB.length} cặp):\n`;
  tour.teamsB.forEach((t, i) => {
    text += `  • B${i + 1}: ${t.displayName} (${t.fullName})\n`;
  });

  if (tour.system === 'KNOCKOUT') {
    text += `\n⚔️ LỊCH ĐẤU LOẠI TRỰC TIẾP NHÁNH A:\n`;
    tour.matchesA.forEach(m => {
      const t1 = m.team1 ? m.team1.displayName : (m.placeholder1 || 'Chờ xác định');
      const t2 = m.team2 ? m.team2.displayName : (m.placeholder2 || 'Chờ xác định');
      text += `  - ${m.code} (${m.stage}): ${t1} vs ${t2}\n`;
    });

    text += `\n⚔️ LỊCH ĐẤU LOẠI TRỰC TIẾP NHÁNH B:\n`;
    tour.matchesB.forEach(m => {
      const t1 = m.team1 ? m.team1.displayName : (m.placeholder1 || 'Chờ xác định');
      const t2 = m.team2 ? m.team2.displayName : (m.placeholder2 || 'Chờ xác định');
      text += `  - ${m.code} (${m.stage}): ${t1} vs ${t2}\n`;
    });

    text += `\n🏆 VÒNG TRANH CÚP VÀ PHÂN HẠNG CLB:\n`;
    const f1 = tour.finals.final;
    const f3 = tour.finals.third;
    text += `  - TRANH HẠNG 3: ${f3.team1 ? f3.team1.displayName : f3.label1} vs ${f3.team2 ? f3.team2.displayName : f3.label2} (Thưởng: ${tour.prizes.prize3})\n`;
    text += `  - CHUNG KẾT TRANH CÚP: ${f1.team1 ? f1.team1.displayName : f1.label1} vs ${f1.team2 ? f1.team2.displayName : f1.label2} (Thưởng: ${tour.prizes.prize1})\n`;
  } else {
    text += `\n⚡ LỊCH THI ĐẤU VÒNG BẢNG:\n`;
    tour.matchesA.forEach(m => {
      text += `  - ${m.code}: ${m.team1.displayName} vs ${m.team2.displayName}\n`;
    });
    tour.matchesB.forEach(m => {
      text += `  - ${m.code}: ${m.team1.displayName} vs ${m.team2.displayName}\n`;
    });

    text += `\n🏆 VÒNG CHUNG KẾT TRANH GIẢI:\n`;
    text += `  - Bán Kết 1: Nhất Nhánh A vs Nhì Nhánh B\n`;
    text += `  - Bán Kết 2: Nhất Nhánh B vs Nhì Nhánh A\n`;
    text += `  - Tranh Hạng 3: Thua BK1 vs Thua BK2 (Thưởng: ${tour.prizes.prize3})\n`;
    text += `  - Chung Kết: Thắng BK1 vs Thắng BK2 (Thưởng: ${tour.prizes.prize1})\n`;
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('📋 Đã sao chép lịch thi đấu giải! Bạn có thể dán ngay vào Zalo.', 'success');
    }).catch(() => {
      prompt('Hãy copy toàn bộ nội dung lịch thi đấu bên dưới:', text);
    });
  } else {
    prompt('Hãy copy toàn bộ nội dung lịch thi đấu bên dưới:', text);
  }
}

// ----------------------------------------------------
// CHẾ ĐỘ GIAO LƯU NGÀY THƯỜNG (GHÉP SÂN NGẪU NHIÊN HOẶC THỦ CÔNG)
// ----------------------------------------------------
function generateBadmintonMatches(method = 'RANDOM') {
  const checked = Array.from(document.querySelectorAll('input[name="matchmakerPlayer"]:checked')).map(cb => {
    return AppState.members.find(m => m.id === cb.value);
  }).filter(Boolean);

  const output = document.getElementById('matchesOutputArea');
  const statsBadge = document.getElementById('matchStatsBadge');
  const formatSelect = document.getElementById('matchFormatSelect');
  const format = formatSelect ? formatSelect.value : 'DOUBLES';

  if (!output) return;

  if (checked.length < 2) {
    output.innerHTML = `<div class="p-6 text-center text-rose-500 bg-rose-50 rounded-2xl border border-rose-200 text-xs font-bold">Cần ít nhất 2 người để ghép trận đấu!</div>`;
    return;
  }

  if (statsBadge) {
    statsBadge.textContent = `Đã chọn ${checked.length} người chơi (${method === 'MANUAL' ? 'Xếp thủ công' : 'Bốc ngẫu nhiên'})`;
  }

  if (method === 'MANUAL') {
    // XẾP SÂN THỦ CÔNG
    let courtHtml = `
      <div class="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs flex items-center justify-between mb-3">
        <span>✍️ <b>Xếp sân thủ công:</b> Chọn người chơi cho từng cặp đấu trên các sân bên dưới:</span>
        <button type="button" onclick="generateBadmintonMatches('RANDOM')" class="px-2 py-1 bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-lg font-bold text-[10px] cursor-pointer">
          🎲 Đổi sang Ngẫu nhiên
        </button>
      </div>
    `;

    const neededPerCourt = format === 'DOUBLES' ? 4 : 2;
    const numCourts = Math.max(1, Math.floor(checked.length / neededPerCourt));

    function buildOptions(selectedId) {
      return checked.map(m => `
        <option value="${m.id}" ${m.id === selectedId ? 'selected' : ''}>${m.name}</option>
      `).join('');
    }

    for (let c = 1; c <= numCourts; c++) {
      const offset = (c - 1) * neededPerCourt;
      const p1 = checked[offset] || checked[0];
      const p2 = checked[offset + 1] || checked[1] || checked[0];
      const p3 = checked[offset + 2] || checked[2] || checked[0];
      const p4 = checked[offset + 3] || checked[3] || checked[0];

      if (format === 'DOUBLES') {
        courtHtml += `
          <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-black text-brand-700 bg-brand-50 px-2.5 py-1 rounded-lg border border-brand-200">SÂN CẦU ${c} (ĐÁNH ĐÔI - THỦ CÔNG)</span>
              <span class="text-[11px] text-slate-400 font-semibold">Tự chọn cặp đấu</span>
            </div>
            <div class="grid grid-cols-2 gap-3 text-center">
              <div class="p-3 bg-blue-50/60 rounded-xl border border-blue-200 space-y-1.5">
                <div class="text-[10px] uppercase font-bold text-blue-700">CẶP ĐÔI A (ÁO XANH)</div>
                <select class="w-full text-xs font-bold border border-blue-200 rounded-lg p-1.5 bg-white text-slate-800">${buildOptions(p1.id)}</select>
                <select class="w-full text-xs font-bold border border-blue-200 rounded-lg p-1.5 bg-white text-slate-800">${buildOptions(p2.id)}</select>
              </div>
              <div class="p-3 bg-rose-50/60 rounded-xl border border-rose-200 space-y-1.5">
                <div class="text-[10px] uppercase font-bold text-rose-700">CẶP ĐÔI B (ÁO ĐỎ)</div>
                <select class="w-full text-xs font-bold border border-rose-200 rounded-lg p-1.5 bg-white text-slate-800">${buildOptions(p3.id)}</select>
                <select class="w-full text-xs font-bold border border-rose-200 rounded-lg p-1.5 bg-white text-slate-800">${buildOptions(p4.id)}</select>
              </div>
            </div>
          </div>
        `;
      } else {
        courtHtml += `
          <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-black text-brand-700 bg-brand-50 px-2.5 py-1 rounded-lg border border-brand-200">SÂN CẦU ${c} (ĐÁNH ĐƠN - THỦ CÔNG)</span>
              <span class="text-[11px] text-slate-400 font-semibold">Tự chọn người đấu</span>
            </div>
            <div class="grid grid-cols-2 gap-3 text-center">
              <div class="p-3 bg-blue-50/60 rounded-xl border border-blue-200 space-y-1.5">
                <div class="text-[10px] uppercase font-bold text-blue-700">TAY VỢT 1</div>
                <select class="w-full text-xs font-bold border border-blue-200 rounded-lg p-1.5 bg-white text-slate-800">${buildOptions(p1.id)}</select>
              </div>
              <div class="p-3 bg-rose-50/60 rounded-xl border border-rose-200 space-y-1.5">
                <div class="text-[10px] uppercase font-bold text-rose-700">TAY VỢT 2</div>
                <select class="w-full text-xs font-bold border border-rose-200 rounded-lg p-1.5 bg-white text-slate-800">${buildOptions(p2.id)}</select>
              </div>
            </div>
          </div>
        `;
      }
    }

    output.innerHTML = courtHtml;
    lucide.createIcons();
    showToast(`Đã mở giao diện xếp sân thủ công cho ${numCourts} sân!`, 'info');
    return;
  }

  // BỐC THĂM NGẪU NHIÊN TRÊN SÂN
  const shuffled = [...checked].sort(() => Math.random() - 0.5);

  let html = '';
  let courtIndex = 1;

  if (format === 'DOUBLES') {
    while (shuffled.length >= 4) {
      const p1 = shuffled.pop();
      const p2 = shuffled.pop();
      const p3 = shuffled.pop();
      const p4 = shuffled.pop();

      html += `
        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-black text-brand-700 bg-brand-50 px-2.5 py-1 rounded-lg border border-brand-200">SÂN CẦU ${courtIndex} (ĐÔI NAM / ĐÔI NỮ / ĐÔI NAM NỮ)</span>
            <span class="text-[11px] text-slate-400 font-semibold">Trận 21 hoặc 31 điểm</span>
          </div>
          <div class="grid grid-cols-2 gap-3 mt-3 items-center text-center">
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div class="text-[10px] uppercase font-bold text-blue-600">CẶP ĐÔI A (ÁO XANH)</div>
              <div class="font-bold text-slate-900 mt-1 text-xs">${p1.name}</div>
              <div class="font-bold text-slate-900 text-xs">&amp; ${p2.name}</div>
            </div>
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div class="text-[10px] uppercase font-bold text-rose-600">CẶP ĐÔI B (ÁO ĐỎ)</div>
              <div class="font-bold text-slate-900 mt-1 text-xs">${p3.name}</div>
              <div class="font-bold text-slate-900 text-xs">&amp; ${p4.name}</div>
            </div>
          </div>
        </div>
      `;
      courtIndex++;
    }

    if (shuffled.length >= 2) {
      const p1 = shuffled.pop();
      const p2 = shuffled.pop();
      html += `
        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-black text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">SÂN CẦU ${courtIndex} (ĐƠN 1 VS 1)</span>
            <span class="text-[11px] text-slate-400 font-semibold">Trận Solo</span>
          </div>
          <div class="grid grid-cols-2 gap-3 mt-3 items-center text-center">
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div class="text-[10px] uppercase font-bold text-blue-600">TAY VỢT 1</div>
              <div class="font-bold text-slate-900 mt-1 text-xs">${p1.name}</div>
            </div>
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div class="text-[10px] uppercase font-bold text-rose-600">TAY VỢT 2</div>
              <div class="font-bold text-slate-900 mt-1 text-xs">${p2.name}</div>
            </div>
          </div>
        </div>
      `;
    }
  } else {
    while (shuffled.length >= 2) {
      const p1 = shuffled.pop();
      const p2 = shuffled.pop();

      html += `
        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-black text-brand-700 bg-brand-50 px-2.5 py-1 rounded-lg border border-brand-200">SÂN CẦU ${courtIndex} (ĐÁNH ĐƠN 1 VS 1)</span>
            <span class="text-[11px] text-slate-400 font-semibold">Trận 21 điểm</span>
          </div>
          <div class="grid grid-cols-2 gap-3 mt-3 items-center text-center">
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div class="text-[10px] uppercase font-bold text-blue-600">TAY VỢT 1</div>
              <div class="font-bold text-slate-900 mt-1 text-xs">${p1.name}</div>
            </div>
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div class="text-[10px] uppercase font-bold text-rose-600">TAY VỢT 2</div>
              <div class="font-bold text-slate-900 mt-1 text-xs">${p2.name}</div>
            </div>
          </div>
        </div>
      `;
      courtIndex++;
    }
  }

  if (shuffled.length === 1) {
    const resting = shuffled.pop();
    html += `
      <div class="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center justify-between">
        <span>Nghỉ ngơi lượt này (Chờ đổi sân): <b>${resting.name}</b></span>
        <i data-lucide="coffee" class="w-4 h-4"></i>
      </div>
    `;
  }

  output.innerHTML = html;
  lucide.createIcons();
  showToast(`Đã bốc thăm ngẫu nhiên ${courtIndex - 1} sân thi đấu!`, 'success');
}

// ==========================================
// 17. CẤU HÌNH & SAO LƯU DỮ LIỆU
// ==========================================
function renderSettingsTab() {
  const config = AppState.config;
  document.getElementById('configClubName').value = config.clubName || 'CLB CẦU LÔNG SMASH';
  document.getElementById('configThemeColor').value = config.themeColor || 'emerald';
  document.getElementById('configDefaultFine').value = config.defaultFine || 50000;
  document.getElementById('configBankInfo').value = config.bankInfo || '';

  document.getElementById('guestPriceA').value = config.guestPrices.GUEST_A || 70000;
  document.getElementById('guestPriceB').value = config.guestPrices.GUEST_B || 100000;
  document.getElementById('guestPriceC').value = config.guestPrices.GUEST_C || 150000;

  renderFeeTiersConfigTable();
}

function renderFeeTiersConfigTable() {
  const tbody = document.getElementById('tierFeeConfigTableBody');
  if (!tbody) return;

  const tiers = AppState.config.feeTiers || [];
  tbody.innerHTML = tiers.map((tier, idx) => `
    <tr>
      <td class="py-2.5 px-3">
        <input type="text" value="${tier.name}" onchange="updateTierField(${idx}, 'name', this.value)" class="w-full px-2 py-1 border border-slate-200 rounded text-xs font-semibold" />
      </td>
      <td class="py-2.5 px-3">
        <input type="number" value="${tier.minSessions}" onchange="updateTierField(${idx}, 'minSessions', Number(this.value))" class="w-20 px-2 py-1 border border-slate-200 rounded text-xs" />
      </td>
      <td class="py-2.5 px-3">
        <input type="number" value="${tier.maxSessions}" onchange="updateTierField(${idx}, 'maxSessions', Number(this.value))" class="w-20 px-2 py-1 border border-slate-200 rounded text-xs" />
      </td>
      <td class="py-2.5 px-3">
        <input type="number" step="5000" value="${tier.price}" onchange="updateTierField(${idx}, 'price', Number(this.value))" class="w-28 px-2 py-1 border border-slate-200 rounded text-xs font-bold text-brand-700" />
      </td>
      <td class="py-2.5 px-3 text-center">
        <button onclick="deleteFeeTier(${idx})" class="p-1 text-rose-500 hover:bg-rose-50 rounded" title="Xóa bậc"><i data-lucide="trash-2" class="w-4 h-4 inline"></i></button>
      </td>
    </tr>
  `).join('');

  lucide.createIcons();
}

function updateTierField(index, field, value) {
  if (AppState.config.feeTiers[index]) {
    AppState.config.feeTiers[index][field] = value;
  }
}

function addNewFeeTier() {
  const last = AppState.config.feeTiers[AppState.config.feeTiers.length - 1];
  const newMin = last ? last.maxSessions + 1 : 0;
  AppState.config.feeTiers.push({
    id: Date.now(),
    name: `Bậc ${AppState.config.feeTiers.length + 1}`,
    minSessions: newMin,
    maxSessions: newMin + 5,
    price: last ? last.price + 50000 : 50000
  });
  renderFeeTiersConfigTable();
}

function deleteFeeTier(index) {
  AppState.config.feeTiers.splice(index, 1);
  renderFeeTiersConfigTable();
}

function saveFeeTiersConfig() {
  saveData();
  renderAttendanceTiersBadgeList();
  showToast('Đã lưu cấu hình bậc tiền sân thành công!', 'success');
}

function saveGeneralConfig() {
  AppState.config.clubName = document.getElementById('configClubName').value.trim() || 'CLB CẦU LÔNG SMASH';
  AppState.config.themeColor = document.getElementById('configThemeColor').value;
  AppState.config.defaultFine = Number(document.getElementById('configDefaultFine').value || 50000);
  AppState.config.bankInfo = document.getElementById('configBankInfo').value.trim();

  applyThemeColor(AppState.config.themeColor);
  saveData();
  renderDashboard();
  showToast('Đã lưu thông tin CLB thành công!', 'success');
}

function saveGuestPricingConfig() {
  AppState.config.guestPrices.GUEST_A = Number(document.getElementById('guestPriceA').value || 70000);
  AppState.config.guestPrices.GUEST_B = Number(document.getElementById('guestPriceB').value || 100000);
  AppState.config.guestPrices.GUEST_C = Number(document.getElementById('guestPriceC').value || 150000);
  saveData();
  showToast('Đã lưu đơn giá khách giao lưu!', 'success');
}

// Sao lưu và khôi phục
function exportDataBackup() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(AppState, null, 2));
  const downloadAnchor = document.createElement('a');
  const now = new Date();
  const dateTag = `${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}`;
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `clb_cau_long_smash_${dateTag}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast('Đã tải xuống tệp sao lưu dữ liệu!', 'success');
}

function importDataBackup(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const parsed = JSON.parse(e.target.result);
      if (parsed.members && parsed.funds && parsed.config) {
        AppState = parsed;
        saveData();
        applyThemeColor(AppState.config.themeColor || 'emerald');
        renderDashboard();
        showToast('Khôi phục dữ liệu từ tệp thành công!', 'success');
      } else {
        showToast('Tệp sao lưu không đúng định dạng dữ liệu CLB!', 'error');
      }
    } catch (err) {
      showToast('Lỗi đọc tệp sao lưu JSON!', 'error');
    }
  };
  reader.readAsText(file);
}

function resetDefaultDemoData() {
  const confirmed = confirm('CẢNH BÁO: Thao tác này sẽ đưa toàn bộ dữ liệu về trạng thái mẫu ban đầu.\nBạn có chắc chắn muốn đặt lại?');
  if (!confirmed) return;

  AppState = JSON.parse(JSON.stringify(DEFAULT_INITIAL_DATA));
  saveData();
  applyThemeColor(AppState.config.themeColor || 'emerald');
  renderDashboard();
  showToast('Đã đặt lại dữ liệu mẫu ban đầu thành công!', 'success');
}

// ==========================================
// 18. XÁC THỰC & ĐĂNG NHẬP (AUTH)
// ==========================================
function renderAuthBadge() {
  const badgeContainer = document.getElementById('userAuthBadge');
  if (!badgeContainer) return;

  if (AppState.auth && AppState.auth.isLoggedIn && AppState.auth.user) {
    const user = AppState.auth.user;
    badgeContainer.innerHTML = `
      <div class="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full border border-slate-200 text-xs transition">
        <div class="w-6 h-6 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-[10px]">
          ${user.name.charAt(0).toUpperCase()}
        </div>
        <span class="font-bold text-slate-800 hidden sm:inline">${user.name}</span>
        <button onclick="handleLogout()" class="text-slate-400 hover:text-rose-600 ml-1" title="Đăng xuất">
          <i data-lucide="log-out" class="w-3.5 h-3.5"></i>
        </button>
      </div>
    `;
  } else {
    badgeContainer.innerHTML = `
      <button onclick="openLoginModal()" class="inline-flex items-center px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-full transition shadow-sm">
        <i data-lucide="lock" class="w-3.5 h-3.5 mr-1.5"></i>
        Đăng nhập
      </button>
    `;
  }

  lucide.createIcons();
}

function openLoginModal() {
  openModal('loginModal');
}

function handleLogin(e) {
  e.preventDefault();
  const u = document.getElementById('loginUsername').value.trim();
  const p = document.getElementById('loginPassword').value.trim();

  if (u === 'admin' && p === 'admin123') {
    AppState.auth = {
      isLoggedIn: true,
      user: { username: 'admin', role: 'ADMIN', name: 'Quản trị viên CLB' }
    };
    saveData();
    closeModal('loginModal');
    renderAuthBadge();
    showToast('Đăng nhập thành công với quyền Quản trị viên!', 'success');
    return;
  }

  const member = AppState.members.find(m => m.username && m.username.toLowerCase() === u.toLowerCase() && m.password === p);
  if (member) {
    AppState.auth = {
      isLoggedIn: true,
      user: { username: member.username, role: 'MEMBER', name: member.name }
    };
    saveData();
    closeModal('loginModal');
    renderAuthBadge();
    showToast(`Chào mừng thành viên ${member.name}!`, 'success');
    return;
  }

  showToast('Tài khoản hoặc mật khẩu không chính xác! (Mẫu: admin / admin123)', 'error');
}

function handleLogout() {
  AppState.auth = { isLoggedIn: false, user: null };
  saveData();
  renderAuthBadge();
  showToast('Đã đăng xuất tài khoản.', 'info');
}

// ==========================================
// 19. TRỢ GIÚP MODAL
// ==========================================
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('hidden');
    lucide.createIcons();
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('hidden');
}

window.addEventListener('click', (e) => {
  if (e.target.classList.contains('backdrop-blur-sm')) {
    e.target.classList.add('hidden');
  }
});

// ==========================================
// 21. CHỈNH SỬA TÊN & THÔNG TIN THÀNH VIÊN (CHO ADMIN)
// ==========================================
function openQuickRenameModal(memberId) {
  const member = AppState.members.find(m => m.id === memberId);
  if (!member) {
    showToast('Không tìm thấy thông tin thành viên!', 'error');
    return;
  }

  document.getElementById('quickRenameMemberId').value = member.id;
  document.getElementById('quickRenameName').value = member.name;
  document.getElementById('quickRenamePhone').value = member.phone || '';
  document.getElementById('quickRenameType').value = member.type || 'OFFICIAL';

  openModal('quickRenameModal');
}

function handleQuickRenameSubmit(e) {
  e.preventDefault();
  const memberId = document.getElementById('quickRenameMemberId').value;
  const newName = document.getElementById('quickRenameName').value.trim();
  const newPhone = document.getElementById('quickRenamePhone').value.trim();
  const newType = document.getElementById('quickRenameType').value;

  if (!newName) {
    showToast('Họ và tên thành viên không được để trống!', 'warning');
    return;
  }

  const member = AppState.members.find(m => m.id === memberId);
  if (!member) {
    showToast('Không tìm thấy thành viên!', 'error');
    return;
  }

  const oldName = member.name;
  member.name = newName;
  member.phone = newPhone;
  member.type = newType;

  // Đồng bộ cập nhật tên mới vào lịch sử giao dịch và điểm danh
  (AppState.transactions || []).forEach(tx => {
    if (tx.targetName === oldName) {
      tx.targetName = newName;
    }
  });

  (AppState.attendanceRecords || []).forEach(att => {
    if (att.memberId === member.id || att.memberName === oldName) {
      att.memberName = newName;
    }
  });

  saveData();
  closeModal('quickRenameModal');

  renderDashboard();
  renderAttendanceChecklist();
  renderMemberManagementList();
  renderFinanceTab();
  if (currentActiveTab === 'matchmaker') renderMatchmakerList();

  showToast(`Đã đổi tên thành công: "${oldName}" ➔ "${newName}"!`, 'success');
}

// ==========================================
// 22. TẠO ĐIỂM DANH NHANH (QUICK ATTENDANCE)
// ==========================================
let qaSessionLogs = [];
let qaMatchedZaloMembers = [];

function openQuickAttendanceModal() {
  populateQaMemberSelect();
  updateQaSinglePreview();
  renderQaSessionLogs();
  switchQuickAttendanceSubTab('single');
  openModal('quickAttendanceModal');
}

function switchQuickAttendanceSubTab(subTab) {
  document.querySelectorAll('.qa-tab-btn').forEach(btn => {
    btn.classList.remove('bg-white', 'shadow-sm', 'text-slate-800');
    btn.classList.add('text-slate-600');
  });
  const activeBtn = document.getElementById(`qa-subtab-${subTab}`);
  if (activeBtn) {
    activeBtn.classList.remove('text-slate-600');
    activeBtn.classList.add('bg-white', 'shadow-sm', 'text-slate-800');
  }

  document.querySelectorAll('.qa-mode-pane').forEach(p => p.classList.add('hidden'));
  const targetPane = document.getElementById(`qa-mode-${subTab}`);
  if (targetPane) targetPane.classList.remove('hidden');

  lucide.createIcons();
}

function populateQaMemberSelect() {
  const select = document.getElementById('qaSingleMemberSelect');
  if (!select) return;

  select.innerHTML = AppState.members.map(m => {
    const nextSession = (m.monthlySessions || 0) + 1;
    const fee = calculateMemberCourtFee(m, true);
    return `<option value="${m.id}">${escapeHtml(m.name)} (${getMemberRoleTypeText(m.type)}) - Buổi #${nextSession}: ${formatMoney(fee)} (Ví: ${formatMoney(m.balance || 0)})</option>`;
  }).join('');
}

function updateQaSinglePreview() {
  const select = document.getElementById('qaSingleMemberSelect');
  const card = document.getElementById('qaSinglePreviewCard');
  if (!select || !card) return;

  const memberId = select.value;
  const member = AppState.members.find(m => m.id === memberId);
  if (!member) {
    card.innerHTML = `<div class="text-xs text-slate-400">Vui lòng chọn thành viên</div>`;
    return;
  }

  const nextSession = (member.monthlySessions || 0) + 1;
  const fee = calculateMemberCourtFee(member, true);
  const tierName = member.type.startsWith('GUEST') ? 'Khách' : getTierNameForSession(nextSession);
  const currentBalance = member.balance || 0;
  const newBalance = currentBalance - fee;

  card.innerHTML = `
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
      <div>
        <span class="text-slate-500 block text-[11px]">Hội viên:</span>
        <b class="text-slate-900 font-bold">${escapeHtml(member.name)}</b>
      </div>
      <div>
        <span class="text-slate-500 block text-[11px]">Lũy kế tháng:</span>
        <b class="text-brand-700 font-bold">Buổi #${nextSession} (${tierName})</b>
      </div>
      <div>
        <span class="text-slate-500 block text-[11px]">Tiền sân trừ ví:</span>
        <b class="text-rose-600 font-black text-sm">${formatMoney(fee)}</b>
      </div>
      <div>
        <span class="text-slate-500 block text-[11px]">Số dư sau trừ:</span>
        <b class="${newBalance < 0 ? 'text-rose-600' : 'text-emerald-700'} font-black text-sm">${formatMoney(newBalance)}</b>
      </div>
    </div>
  `;
}

function executeQaSingle() {
  const select = document.getElementById('qaSingleMemberSelect');
  if (!select || !select.value) {
    showToast('Vui lòng chọn thành viên cần điểm danh!', 'warning');
    return;
  }

  processSingleAttendance(select.value);
  populateQaMemberSelect();
  updateQaSinglePreview();
}

// Hàm cốt lõi thực hiện điểm danh và trừ ví cho 1 thành viên
function processSingleAttendance(memberId) {
  const member = AppState.members.find(m => m.id === memberId);
  if (!member) return false;

  const fee = calculateMemberCourtFee(member, true);
  const nextSession = (member.monthlySessions || 0) + 1;
  const tierName = member.type.startsWith('GUEST') ? 'Khách' : getTierNameForSession(nextSession);
  const nowTime = getNowTimestampString();
  const attDate = getTodayInputFormat();
  const dateFormatted = attDate.split('-').reverse().join('/');
  const operator = (AppState.auth && AppState.auth.user) ? AppState.auth.user.username : 'admin';

  // 1. Trừ ví
  member.balance = (member.balance || 0) - fee;

  // 2. Tăng số buổi
  member.monthlySessions = nextSession;

  // 3. Quỹ CLB ghi nhận tiền sân
  AppState.funds.clubFund = (AppState.funds.clubFund || 0) + fee;

  // 4. Ghi nhận giao dịch
  AppState.transactions.push({
    id: 'TX_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
    date: nowTime,
    type: 'COURT_FEE',
    amount: -fee,
    targetName: member.name,
    description: `[Điểm danh nhanh] Trừ tiền sân ngày ${dateFormatted} (Buổi #${nextSession} - ${tierName})`,
    operator: operator
  });

  // 5. Ghi nhận lịch sử điểm danh
  AppState.attendanceRecords.push({
    id: 'ATT_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
    date: attDate,
    memberId: member.id,
    memberName: member.name,
    fee: fee,
    sessionIndex: nextSession,
    timestamp: nowTime
  });

  // 6. Ghi vào nhật ký phiên
  qaSessionLogs.unshift({
    time: nowTime.split(' ')[1] || nowTime,
    name: member.name,
    fee: fee,
    session: nextSession,
    balance: member.balance
  });

  saveData();
  renderDashboard();
  renderAttendanceChecklist();
  renderFinanceTab();
  renderQaSessionLogs();

  showToast(`⚡ Đã điểm danh nhanh cho ${member.name}! Trừ ${formatMoney(fee)} (Buổi #${nextSession})`, 'success');
  return true;
}

// Điểm danh 1-chạm trực tiếp từ bảng Dashboard hoặc Quản lý thành viên
function quickCheckInSingleMember(memberId) {
  const member = AppState.members.find(m => m.id === memberId);
  if (!member) return;

  const nextSession = (member.monthlySessions || 0) + 1;
  const fee = calculateMemberCourtFee(member, true);
  const tierName = member.type.startsWith('GUEST') ? 'Khách' : getTierNameForSession(nextSession);
  const willBeNegative = (member.balance || 0) - fee < 0;

  const confirmMsg = `⚡ Xác nhận Điểm Danh Nhanh cho:\n👤 ${member.name}\n🏸 Buổi thứ: #${nextSession} (${tierName})\n💰 Tiền sân: ${formatMoney(fee)}\n💳 Số dư ví: ${formatMoney(member.balance || 0)}${willBeNegative ? '\n⚠️ Chú ý: Ví sẽ bị âm tiền sau khi trừ!' : ''}\n\nBạn có muốn trừ ví và ghi nhận ngay không?`;

  if (confirm(confirmMsg)) {
    processSingleAttendance(memberId);
  }
}

// Dán danh sách Zalo và nhận diện
function parseAndMatchZaloList() {
  const textarea = document.getElementById('qaZaloTextarea');
  const resultsArea = document.getElementById('qaZaloResultsArea');
  const listContainer = document.getElementById('qaZaloMatchedList');
  const countEl = document.getElementById('qaZaloMatchedCount');
  if (!textarea || !resultsArea || !listContainer) return;

  const text = textarea.value.trim();
  if (!text) {
    showToast('Vui lòng dán nội dung danh sách người chơi từ Zalo!', 'warning');
    return;
  }

  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  qaMatchedZaloMembers = [];
  const matchedIds = new Set();

  lines.forEach(rawLine => {
    const cleanName = rawLine
      .replace(/^[\d\s\.\/\-\+\:\)]+/, '')
      .replace(/[\(\[].*?[\)\]]/g, '')
      .trim()
      .toLowerCase();

    if (!cleanName || cleanName.length < 2) return;

    const found = AppState.members.find(m => {
      const mNameLower = m.name.toLowerCase();
      return mNameLower.includes(cleanName) || cleanName.includes(mNameLower);
    });

    if (found && !matchedIds.has(found.id)) {
      matchedIds.add(found.id);
      qaMatchedZaloMembers.push({
        rawLine: rawLine,
        member: found
      });
    }
  });

  resultsArea.classList.remove('hidden');
  if (countEl) countEl.textContent = `${qaMatchedZaloMembers.length} người khớp`;

  if (qaMatchedZaloMembers.length === 0) {
    listContainer.innerHTML = `<div class="p-3 text-center text-rose-500 font-medium text-xs">Không tìm thấy thành viên nào khớp với danh sách dán vào. Vui lòng kiểm tra lại tên!</div>`;
    return;
  }

  listContainer.innerHTML = qaMatchedZaloMembers.map(item => {
    const m = item.member;
    const nextSession = (m.monthlySessions || 0) + 1;
    const fee = calculateMemberCourtFee(m, true);
    return `
      <label class="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 hover:border-brand-500 cursor-pointer text-xs">
        <div class="flex items-center gap-2">
          <input type="checkbox" checked data-zalo-member-id="${m.id}" class="qa-zalo-cb w-4 h-4 rounded text-brand-600 focus:ring-brand-500 cursor-pointer" />
          <div>
            <span class="font-bold text-slate-900">${escapeHtml(m.name)}</span>
            <span class="text-[10px] text-slate-400 block">Dòng gốc: "${escapeHtml(item.rawLine)}"</span>
          </div>
        </div>
        <div class="text-right">
          <b class="text-rose-600 font-bold">${formatMoney(fee)}</b>
          <span class="text-[10px] text-slate-400 block">Buổi #${nextSession} (Ví: ${formatMoney(m.balance || 0)})</span>
        </div>
      </label>
    `;
  }).join('');

  lucide.createIcons();
}

function executeQaZaloBatch() {
  const cbs = document.querySelectorAll('.qa-zalo-cb:checked');
  if (cbs.length === 0) {
    showToast('Vui lòng chọn ít nhất 1 thành viên trong danh sách để điểm danh!', 'warning');
    return;
  }

  let count = 0;
  let totalFee = 0;
  cbs.forEach(cb => {
    const mId = cb.getAttribute('data-zalo-member-id');
    const member = AppState.members.find(m => m.id === mId);
    if (member) {
      const fee = calculateMemberCourtFee(member, true);
      totalFee += fee;
      processSingleAttendance(mId);
      count++;
    }
  });

  document.getElementById('qaZaloResultsArea').classList.add('hidden');
  document.getElementById('qaZaloTextarea').value = '';

  showToast(`⚡ Đã điểm danh thành công ${count} người từ danh sách Zalo (Tổng: ${formatMoney(totalFee)})!`, 'success');
}

// Điểm danh theo nhóm (Toàn bộ chính thức / Danh dự)
function executeQaGroup(groupType) {
  const targetMembers = AppState.members.filter(m => {
    if (groupType === 'OFFICIAL') return m.type === 'OFFICIAL';
    if (groupType === 'HONORARY' || groupType === 'UNOFFICIAL') return m.type === 'HONORARY' || m.type === 'UNOFFICIAL';
    return m.type === groupType;
  });
  if (targetMembers.length === 0) {
    showToast('Không có thành viên nào thuộc nhóm này!', 'warning');
    return;
  }

  const typeName = groupType === 'OFFICIAL' ? 'Chính thức' : 'Danh dự';
  if (!confirm(`⚡ Xác nhận điểm danh nhanh cho TẤT CẢ ${targetMembers.length} thành viên ${typeName}?\nHệ thống sẽ tự động trừ ví và tăng buổi cho từng người!`)) {
    return;
  }

  let totalFee = 0;
  targetMembers.forEach(m => {
    const fee = calculateMemberCourtFee(m, true);
    totalFee += fee;
    processSingleAttendance(m.id);
  });

  showToast(`⚡ Đã điểm danh xong cho toàn bộ ${targetMembers.length} thành viên ${typeName} (Tổng trừ: ${formatMoney(totalFee)})!`, 'success');
}

function renderQaSessionLogs() {
  const container = document.getElementById('qaSessionLogList');
  const countBadge = document.getElementById('qaSessionCount');
  if (!container) return;

  if (countBadge) countBadge.textContent = `${qaSessionLogs.length} lượt`;

  if (qaSessionLogs.length === 0) {
    container.innerHTML = `<div class="text-[11px] text-slate-400 italic py-1">Chưa có lượt điểm danh nhanh nào trong phiên này</div>`;
    return;
  }

  container.innerHTML = qaSessionLogs.map(log => `
    <div class="flex items-center justify-between p-1.5 bg-slate-50 rounded-lg border border-slate-100 text-xs">
      <div class="flex items-center gap-2">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
        <span class="font-bold text-slate-800">${escapeHtml(log.name)}</span>
        <span class="text-[10px] text-slate-400">Buổi #${log.session}</span>
      </div>
      <div class="flex items-center gap-3">
        <b class="text-rose-600 font-bold">-${formatMoney(log.fee)}</b>
        <span class="text-[10px] text-slate-400">${log.time}</span>
      </div>
    </div>
  `).join('');
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ==========================================
// 20. KHỞI TẠO ỨNG DỤNG KHI TẢI TRANG
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  applyThemeColor(AppState.config.themeColor || 'emerald');
  renderDashboard();
  lucide.createIcons();
});
