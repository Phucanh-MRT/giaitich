/* Trang quản trị #/admin — xem lượt truy cập Sổ Giải Tích.
   Đăng nhập bằng tài khoản Supabase (dự án review-da-nang); chỉ người đã đăng nhập mới đọc được số liệu. */
(function () {
  const C = window.SGT_CONFIG || {};
  const KEY = 'sgt-admin';
  let days = 30;

  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const num = (n) => Number(n || 0).toLocaleString('vi-VN');
  const getS = () => { try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { return null; } };
  const setS = (s) => { try { s ? localStorage.setItem(KEY, JSON.stringify(s)) : localStorage.removeItem(KEY); } catch (e) {} };

  async function auth(grant, body) {
    const r = await fetch(C.url + '/auth/v1/token?grant_type=' + grant, { method: 'POST', headers: { apikey: C.anon, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(j.error_description || j.msg || j.message || 'Đăng nhập không được (' + r.status + ')');
    const s = { access: j.access_token, refresh: j.refresh_token, exp: Date.now() + (j.expires_in || 3600) * 1000, email: (j.user && j.user.email) || '' };
    setS(s); return s;
  }

  async function stats() {
    let s = getS();
    if (!s) throw Object.assign(new Error('login'), { login: true });
    if (Date.now() > s.exp - 60000) { try { s = await auth('refresh_token', { refresh_token: s.refresh }); } catch (e) { setS(null); throw Object.assign(new Error('login'), { login: true }); } }
    const call = (tok) => fetch(C.url + '/rest/v1/rpc/giaitich_stats', { method: 'POST', headers: { apikey: C.anon, Authorization: 'Bearer ' + tok, 'Content-Type': 'application/json' }, body: JSON.stringify({ days }) });
    let r = await call(s.access);
    if (r.status === 401) {
      try { s = await auth('refresh_token', { refresh_token: s.refresh }); } catch (e) { setS(null); throw Object.assign(new Error('login'), { login: true }); }
      r = await call(s.access);
    }
    if (!r.ok) { const t = await r.text(); throw new Error('Lỗi đọc số liệu (' + r.status + '): ' + t.slice(0, 200)); }
    return r.json();
  }

  function loginForm(view, msg) {
    view.innerHTML = '<h1>Quản trị</h1><p class="meta">Đăng nhập bằng tài khoản quản trị (tài khoản Supabase của dự án review-da-nang) để xem lượt truy cập.</p>' +
      '<form class="adm-login"><label>Email<input type="email" name="email" autocomplete="username" required></label>' +
      '<label>Mật khẩu<input type="password" name="pw" autocomplete="current-password" required></label>' +
      '<button class="btn primary" type="submit">Đăng nhập</button><p class="adm-err" role="alert"></p></form>';
    const f = view.querySelector('form'), err = f.querySelector('.adm-err');
    if (msg) err.textContent = msg;
    f.onsubmit = async (e) => {
      e.preventDefault(); err.textContent = 'Đang đăng nhập…';
      try { await auth('password', { email: f.email.value.trim(), password: f.pw.value }); render(view); }
      catch (x) { err.textContent = /invalid/i.test(x.message) ? 'Sai email hoặc mật khẩu.' : x.message; }
    };
  }

  function barList(rows, label, fmt) {
    const max = Math.max(1, ...rows.map((r) => r.n));
    if (!rows.length) return '<p class="meta">Chưa có dữ liệu.</p>';
    return '<table class="wtable adm-list">' + rows.map((r) => '<tr><td>' + fmt(r[label]) + '</td><td class="n">' + num(r.n) + '</td><td class="b"><div class="bar"><i style="width:' + Math.round(r.n / max * 100) + '%"></i></div></td></tr>').join('') + '</table>';
  }

  function dailyChart(daily) {
    const map = {}; daily.forEach((d) => (map[d.day] = d));
    const pts = [];
    const today = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }));
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(today); d.setDate(d.getDate() - i);
      const k = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
      pts.push({ k, v: (map[k] && map[k].views) || 0, u: (map[k] && map[k].visitors) || 0, lbl: d.getDate() + '/' + (d.getMonth() + 1) });
    }
    const W = 720, H = 220, L = 34, B = 24, T = 10, max = Math.max(4, ...pts.map((p) => p.v));
    const bw = (W - L - 6) / pts.length, y = (v) => T + (H - T - B) * (1 - v / max);
    let s = '<svg viewBox="0 0 ' + W + ' ' + H + '" class="adm-svg" role="img" aria-label="Lượt xem theo ngày">';
    [0, 0.5, 1].forEach((f) => { const v = Math.round(max * f), yy = y(v); s += '<line x1="' + L + '" x2="' + W + '" y1="' + yy + '" y2="' + yy + '" class="g"/><text x="' + (L - 6) + '" y="' + (yy + 4) + '" text-anchor="end">' + v + '</text>'; });
    const step = Math.ceil(pts.length / 10);
    pts.forEach((p, i) => {
      const x = L + i * bw;
      s += '<rect x="' + (x + bw * 0.15) + '" y="' + y(p.v) + '" width="' + bw * 0.7 + '" height="' + (H - B - y(p.v)) + '" class="v"><title>' + p.lbl + ': ' + p.v + ' lượt xem, ' + p.u + ' người</title></rect>';
      if (i % step === 0 || i === pts.length - 1) s += '<text x="' + (x + bw / 2) + '" y="' + (H - 6) + '" text-anchor="middle">' + p.lbl + '</text>';
    });
    s += '<polyline class="u" points="' + pts.map((p, i) => (L + i * bw + bw / 2) + ',' + y(p.u)).join(' ') + '"/></svg>';
    return s + '<p class="adm-legend"><span class="sw v"></span>Lượt xem <span class="sw u"></span>Người xem</p>';
  }

  function hoursChart(hours) {
    const a = Array(24).fill(0); hours.forEach((h) => (a[h.h] = h.n));
    const W = 720, H = 120, B = 18, max = Math.max(1, ...a), bw = W / 24;
    let s = '<svg viewBox="0 0 ' + W + ' ' + H + '" class="adm-svg" role="img" aria-label="Lượt xem theo giờ">';
    a.forEach((n, h) => { const hh = (H - B - 4) * n / max; s += '<rect x="' + (h * bw + 2) + '" y="' + (H - B - hh) + '" width="' + (bw - 4) + '" height="' + hh + '" class="v"><title>' + h + 'h: ' + n + '</title></rect>'; if (h % 3 === 0) s += '<text x="' + (h * bw + bw / 2) + '" y="' + (H - 4) + '" text-anchor="middle">' + h + 'h</text>'; });
    return s + '</svg>';
  }

  function pathName(p) {
    const G = window.SGT || {};
    if (p && p.indexOf('s/') === 0) { const s = G.BY && G.BY[p.slice(2)]; return s ? esc(s.num + ' ' + s.title) : esc(p); }
    const names = { home: 'Trang chủ', review: 'Ôn thẻ', map: 'Bản đồ', notes: 'Ghi chú', exam: 'Đề thi', 'exam/r': 'Kết quả đề thi', 'exam/take': 'Đang làm đề', 'exam/print': 'In đề' };
    return esc(names[p] || p);
  }
  const devName = { mobile: 'Điện thoại', tablet: 'Máy tính bảng', desktop: 'Máy tính' };

  async function render(view) {
    if (!C.url || !C.anon) { view.innerHTML = '<h1>Quản trị</h1><p class="meta">Chưa cấu hình js/config.js.</p>'; return; }
    if (!getS()) return loginForm(view);
    view.innerHTML = '<h1>Quản trị</h1><p class="meta">Đang tải số liệu…</p>';
    let d;
    try { d = await stats(); }
    catch (e) { if (e.login) return loginForm(view, 'Phiên đăng nhập đã hết, mời đăng nhập lại.'); view.innerHTML = '<h1>Quản trị</h1><p class="adm-err">' + esc(e.message) + '</p>'; return; }
    if (location.hash.indexOf('#/admin') !== 0) return;
    const s = getS() || {};
    const kpi = (v, t) => '<div><b>' + v + '</b><span>' + t + '</span></div>';
    view.innerHTML =
      '<div class="adm-head"><h1>Lượt truy cập</h1><div class="adm-tools">' +
      [7, 30, 90].map((n) => '<button type="button" class="btn' + (n === days ? ' primary' : '') + '" data-d="' + n + '">' + n + ' ngày</button>').join('') +
      '<button type="button" class="btn" data-act="reload">Làm mới</button><button type="button" class="btn" data-act="out">Đăng xuất</button></div></div>' +
      '<p class="meta">' + esc(s.email) + ' · giờ Việt Nam · cập nhật ' + new Date().toLocaleTimeString('vi-VN') + '</p>' +
      '<div class="adm-kpis">' +
      kpi(num(d.live), 'đang xem (5 phút)') + kpi(num(d.today), 'lượt xem hôm nay') + kpi(num(d.todayVisitors), 'người xem hôm nay') +
      kpi(num(d.views), 'lượt xem ' + days + ' ngày') + kpi(num(d.visitors), 'người xem ' + days + ' ngày') +
      kpi(num(d.exams), 'bài thi đã nộp') + kpi(d.avgScore == null ? '–' : String(d.avgScore).replace('.', ','), 'điểm thi trung bình') +
      '</div>' +
      '<h2>Theo ngày</h2>' + dailyChart(d.daily || []) +
      '<h2>Mục được xem nhiều</h2>' + barList(d.top || [], 'path', pathName) +
      '<div class="adm-cols"><div><h2>Thiết bị</h2>' + barList(d.devices || [], 'device', (x) => esc(devName[x] || x)) + '</div>' +
      '<div><h2>Đến từ</h2>' + barList(d.refs || [], 'ref', esc) + '</div></div>' +
      '<div class="adm-cols"><div><h2>Tên miền</h2>' + barList(d.hosts || [], 'host', esc) + '</div>' +
      '<div><h2>Theo giờ trong ngày</h2>' + hoursChart(d.hours || []) + '</div></div>' +
      '<p class="meta adm-note">Không lưu tên, email hay IP người xem; mỗi trình duyệt có một mã ngẫu nhiên. Dữ liệu cũ hơn 180 ngày tự xoá.</p>';
    view.querySelectorAll('[data-d]').forEach((b) => (b.onclick = () => { days = +b.dataset.d; render(view); }));
    view.querySelector('[data-act="reload"]').onclick = () => render(view);
    view.querySelector('[data-act="out"]').onclick = () => { setS(null); loginForm(view); };
  }

  window.SGT_ADMIN = render;
})();
