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
      GUEST_A: 70000,
      GUEST_B: 100000,
      GUEST_C: 150000
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
    { id: 'M001', name: 'Nguyễn Văn Tuấn (Chủ nhiệm)', phone: '0901234567', type: 'OFFICIAL', username: 'admin', password: 'admin123', balance: 750000, monthlySessions: 6 },
    { id: 'M002', name: 'Trần Minh Hoàng', phone: '0912345678', type: 'OFFICIAL', username: 'hoangtm', password: '123', balance: 350000, monthlySessions: 3 },
    { id: 'M003', name: 'Lê Thu Hương', phone: '0983456789', type: 'OFFICIAL', username: 'huonglt', password: '123', balance: 220000, monthlySessions: 5 },
    { id: 'M004', name: 'Phạm Đức Long', phone: '0978901234', type: 'OFFICIAL', username: 'longpd', password: '123', balance: -50000, monthlySessions: 11 },
    { id: 'M005', name: 'Đỗ Hải Đăng', phone: '0934567890', type: 'UNOFFICIAL', username: 'dangdh', password: '123', balance: 180000, monthlySessions: 2 },
    { id: 'M006', name: 'Vũ Anh Quân', phone: '0945678901', type: 'UNOFFICIAL', username: 'quanva', password: '123', balance: 60000, monthlySessions: 4 },
    { id: 'M007', name: 'Khách Dũng (CLB Hàng Không)', phone: '0961234567', type: 'GUEST_A', username: '', password: '', balance: 0, monthlySessions: 1 },
    { id: 'M008', name: 'Khách Phương (Giao lưu)', phone: '0971234567', type: 'GUEST_B', username: '', password: '', balance: 0, monthlySessions: 1 },
    { id: 'M009', name: 'Khách VIP Bác Sơn', phone: '0981234567', type: 'GUEST_C', username: '', password: '', balance: 0, monthlySessions: 2 }
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
 * - Thành viên chính thức & không chính thức: Tính lũy kế theo số buổi trong tháng
 *   Mặc định: 0–4: 50k, 5–9: 100k, 10–15: 150k, 16–30+: 200k
 */
function calculateMemberCourtFee(member, isSimulatingNext = true) {
  if (!member) return 50000;

  if (member.type === 'GUEST_A') return AppState.config.guestPrices.GUEST_A || 70000;
  if (member.type === 'GUEST_B') return AppState.config.guestPrices.GUEST_B || 100000;
  if (member.type === 'GUEST_C') return AppState.config.guestPrices.GUEST_C || 150000;

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
    case 'UNOFFICIAL':
      return `<span class="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">Tập sự</span>`;
    case 'GUEST_A':
      return `<span class="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">Khách A</span>`;
    case 'GUEST_B':
      return `<span class="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">Khách B</span>`;
    case 'GUEST_C':
      return `<span class="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">Khách C</span>`;
    default:
      return `<span class="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700">Khác</span>`;
  }
}

function getMemberRoleTypeText(type) {
  if (type === 'OFFICIAL') return 'Chính thức';
  if (type === 'UNOFFICIAL') return 'Tập sự';
  if (type === 'GUEST_A') return 'Khách A';
  if (type === 'GUEST_B') return 'Khách B';
  if (type === 'GUEST_C') return 'Khách C';
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

  // 6. KPI 4: Số lượng thành viên
  const totalMembers = AppState.members.length;
  const officialCount = AppState.members.filter(m => m.type === 'OFFICIAL').length;
  const totalMembersEl = document.getElementById('kpiTotalMembers');
  const memberBreakdownEl = document.getElementById('kpiMemberBreakdown');
  if (totalMembersEl) totalMembersEl.textContent = totalMembers;
  if (memberBreakdownEl) memberBreakdownEl.textContent = `(${officialCount} chính thức)`;

  // 7. Render danh sách ví thành viên
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
// 9. ĐIỂM DANH & TỰ TRỪ VÍ THÀNH VIÊN
// ==========================================
let attendanceFilter = 'all';
let selectedAttendanceIds = new Set();

function setAttendanceFilter(filter) {
  attendanceFilter = filter;
  document.querySelectorAll('.att-filter-btn').forEach(btn => {
    btn.classList.remove('bg-white', 'shadow-sm', 'text-slate-800');
    btn.classList.add('text-slate-600');
  });
  const activeBtn = document.getElementById(`filter-att-${filter}`);
  if (activeBtn) {
    activeBtn.classList.remove('text-slate-600');
    activeBtn.classList.add('bg-white', 'shadow-sm', 'text-slate-800');
  }
  renderAttendanceChecklist();
}

function renderAttendanceTab() {
  const dateInput = document.getElementById('attendanceDate');
  if (dateInput && !dateInput.value) {
    dateInput.value = getTodayInputFormat();
  }
  renderAttendanceTiersBadgeList();
  renderAttendanceChecklist();
}

function renderAttendanceTiersBadgeList() {
  const container = document.getElementById('attendanceTiersBadgeList');
  if (!container) return;

  const tiers = AppState.config.feeTiers || [];
  container.innerHTML = tiers.map(t => {
    const rangeStr = t.maxSessions >= 900 ? `${t.minSessions}+ buổi` : `${t.minSessions}–${t.maxSessions} buổi`;
    return `<span class="bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-xs">${rangeStr}: <b class="text-emerald-600">${formatMoney(t.price)}</b></span>`;
  }).join('');
}

function onAttendanceDateChange() {
  renderAttendanceChecklist();
}

function renderAttendanceChecklist() {
  const tbody = document.getElementById('attendanceChecklistBody');
  if (!tbody) return;

  let list = AppState.members;
  if (attendanceFilter === 'official') {
    list = list.filter(m => m.type === 'OFFICIAL');
  } else if (attendanceFilter === 'unofficial') {
    list = list.filter(m => m.type === 'UNOFFICIAL');
  } else if (attendanceFilter === 'guest') {
    list = list.filter(m => m.type.startsWith('GUEST'));
  }

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="py-8 text-center text-slate-400">Không có thành viên trong nhóm này</td></tr>`;
    updateAttendanceSummary();
    return;
  }

  tbody.innerHTML = list.map(m => {
    const isChecked = selectedAttendanceIds.has(m.id);
    const appliedFee = calculateMemberCourtFee(m, true);
    const nextSessionCount = (m.monthlySessions || 0) + 1;
    const tierLabel = m.type.startsWith('GUEST') ? 'Giá cố định' : getTierNameForSession(nextSessionCount);
    const balance = m.balance || 0;
    const willBeNegative = (balance - appliedFee) < 0;

    return `
      <tr class="hover:bg-slate-50 transition cursor-pointer" onclick="toggleMemberAttendanceRow('${m.id}', event)">
        <td class="py-3 px-4 text-center">
          <input type="checkbox" data-member-id="${m.id}" ${isChecked ? 'checked' : ''} onclick="event.stopPropagation(); toggleMemberAttendance('${m.id}')" class="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 cursor-pointer" />
        </td>
        <td class="py-3 px-3">
          <div class="flex items-center gap-1.5">
            <span class="font-bold text-slate-900">${m.name}</span>
            <button onclick="event.stopPropagation(); openQuickRenameModal('${m.id}')" class="text-slate-400 hover:text-brand-600 p-0.5 rounded transition" title="Đổi tên / SĐT thành viên">
              <i data-lucide="pencil" class="w-3.5 h-3.5"></i>
            </button>
          </div>
          <div class="text-[11px] text-slate-400">${m.phone || 'Chưa có SĐT'}</div>
        </td>
        <td class="py-3 px-2">
          ${getMemberRoleBadge(m.type)}
        </td>
        <td class="py-3 px-2 text-center">
          <span class="font-bold text-slate-700">${m.monthlySessions || 0} buổi</span>
          <div class="text-[10px] text-brand-700 font-semibold">(Buổi tiếp: #${nextSessionCount})</div>
        </td>
        <td class="py-3 px-3 text-right font-black text-brand-700">
          ${formatMoney(appliedFee)}
          <div class="text-[10px] text-slate-400 font-normal">${tierLabel}</div>
        </td>
        <td class="py-3 px-3 text-right font-bold ${balance < 0 ? 'text-rose-600' : 'text-slate-800'}">
          ${formatMoney(balance)}
        </td>
        <td class="py-3 px-3 text-center">
          ${willBeNegative ? 
            `<span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-600 border border-rose-200">Sẽ âm ví</span>` : 
            `<span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">Đủ số dư</span>`
          }
        </td>
      </tr>
    `;
  }).join('');

  updateAttendanceSummary();
}

function toggleMemberAttendanceRow(memberId, event) {
  if (event.target.tagName === 'INPUT') return;
  toggleMemberAttendance(memberId);
}

function toggleMemberAttendance(memberId) {
  if (selectedAttendanceIds.has(memberId)) {
    selectedAttendanceIds.delete(memberId);
  } else {
    selectedAttendanceIds.add(memberId);
  }
  renderAttendanceChecklist();
}

function toggleSelectAllAttendance(masterCheckbox) {
  let list = AppState.members;
  if (attendanceFilter === 'official') list = list.filter(m => m.type === 'OFFICIAL');
  else if (attendanceFilter === 'unofficial') list = list.filter(m => m.type === 'UNOFFICIAL');
  else if (attendanceFilter === 'guest') list = list.filter(m => m.type.startsWith('GUEST'));

  if (masterCheckbox.checked) {
    list.forEach(m => selectedAttendanceIds.add(m.id));
  } else {
    list.forEach(m => selectedAttendanceIds.delete(m.id));
  }
  renderAttendanceChecklist();
}

function updateAttendanceSummary() {
  const countEl = document.getElementById('selectedAttendanceCount');
  const totalAmountEl = document.getElementById('selectedAttendanceTotalAmount');
  if (!countEl || !totalAmountEl) return;

  let totalAmount = 0;
  selectedAttendanceIds.forEach(id => {
    const member = AppState.members.find(m => m.id === id);
    if (member) {
      totalAmount += calculateMemberCourtFee(member, true);
    }
  });

  countEl.textContent = `${selectedAttendanceIds.size} người`;
  totalAmountEl.textContent = formatMoney(totalAmount);
}

function confirmAttendanceAndDeduct() {
  if (selectedAttendanceIds.size === 0) {
    showToast('Vui lòng chọn ít nhất 1 thành viên để điểm danh!', 'warning');
    return;
  }

  const dateInput = document.getElementById('attendanceDate');
  const attDate = dateInput ? dateInput.value : getTodayInputFormat();
  const dateFormatted = attDate.split('-').reverse().join('/');

  const confirmed = confirm(`Xác nhận điểm danh cho ${selectedAttendanceIds.size} người vào ngày ${dateFormatted}?\nHệ thống sẽ tự động trừ tiền sân vào ví và tăng số buổi trong tháng!`);
  if (!confirmed) return;

  const nowTime = getNowTimestampString();
  let totalDeducted = 0;
  let negativeCount = 0;

  selectedAttendanceIds.forEach(id => {
    const member = AppState.members.find(m => m.id === id);
    if (member) {
      const fee = calculateMemberCourtFee(member, true);
      const nextSession = (member.monthlySessions || 0) + 1;
      const tierName = member.type.startsWith('GUEST') ? 'Khách' : getTierNameForSession(nextSession);

      // 1. Trừ tiền ví
      member.balance = (member.balance || 0) - fee;
      if (member.balance < 0) negativeCount++;

      // 2. Tăng số buổi tháng
      member.monthlySessions = nextSession;

      // 3. Ghi nhận nhật ký điểm danh
      AppState.attendanceRecords.push({
        id: 'ATT_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
        date: attDate,
        memberId: member.id,
        memberName: member.name,
        fee: fee,
        sessionIndex: nextSession,
        timestamp: nowTime
      });

      // 4. Ghi nhận lịch sử giao dịch
      AppState.transactions.push({
        id: 'TX_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
        date: nowTime,
        type: 'COURT_FEE',
        amount: -fee,
        targetName: member.name,
        description: `Trừ tiền sân ngày ${dateFormatted} (Buổi #${nextSession} - ${tierName})`,
        operator: (AppState.auth && AppState.auth.user) ? AppState.auth.user.username : 'admin'
      });

      totalDeducted += fee;
    }
  });

  // Tự động ghi nhận tiền sân vào Quỹ CLB (doanh thu tiền sân của CLB)
  AppState.funds.clubFund = (AppState.funds.clubFund || 0) + totalDeducted;

  // Xóa danh sách chọn
  selectedAttendanceIds.clear();
  saveData();

  renderDashboard();
  renderAttendanceChecklist();

  let msg = `Điểm danh thành công! Đã tự trừ ${formatMoney(totalDeducted)} từ ví các thành viên.`;
  if (negativeCount > 0) {
    msg += ` (Có ${negativeCount} thành viên bị âm ví)`;
  }
  showToast(msg, 'success');
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
  } else if (memberListFilter === 'UNOFFICIAL') {
    list = list.filter(m => m.type === 'UNOFFICIAL');
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
    typeSelect.value = mode === 'unofficial' ? 'UNOFFICIAL' : 'OFFICIAL';
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
// 16. BỐC THĂM CHIA SÂN CẦU LÔNG (MATCHMAKER)
// ==========================================
function renderMatchmakerTab() {
  const container = document.getElementById('matchmakerPlayersList');
  if (!container) return;

  container.innerHTML = AppState.members.map(m => `
    <label class="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 cursor-pointer hover:bg-emerald-50 transition">
      <div class="flex items-center gap-2">
        <input type="checkbox" name="matchmakerPlayer" value="${m.id}" class="w-4 h-4 rounded text-brand-600 focus:ring-brand-500" />
        <span class="font-bold text-slate-800">${m.name}</span>
      </div>
      <div>${getMemberRoleBadge(m.type)}</div>
    </label>
  `).join('');
}

function selectAllForMatchmaking() {
  const checkboxes = document.querySelectorAll('input[name="matchmakerPlayer"]');
  checkboxes.forEach(cb => cb.checked = true);
}

function generateBadmintonMatches() {
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
    statsBadge.textContent = `Đã chọn ${checked.length} người chơi`;
  }

  // Xáo trộn ngẫu nhiên danh sách người chơi
  const shuffled = [...checked].sort(() => Math.random() - 0.5);

  let html = '';
  let courtIndex = 1;

  if (format === 'DOUBLES') {
    // Ghép Đánh Đôi (4 người / sân)
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

    // Nếu còn 2 hoặc 3 người
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
    // Ghép Đánh Đơn (2 người / sân)
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

  // Người lẻ nghỉ ngơi lượt này
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

// Điểm danh theo nhóm (Toàn bộ chính thức / Tập sự)
function executeQaGroup(groupType) {
  const targetMembers = AppState.members.filter(m => m.type === groupType);
  if (targetMembers.length === 0) {
    showToast('Không có thành viên nào thuộc nhóm này!', 'warning');
    return;
  }

  const typeName = groupType === 'OFFICIAL' ? 'Chính thức' : 'Tập sự';
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
