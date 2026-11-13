/* Bộ máy tự chạy cho minh hoạ: mỗi minh hoạ có kịch bản chuyển động riêng,
   tự chạy một lượt khi cuộn tới và có nút ▶ để xem lại. Không sửa mã minh hoạ:
   kịch bản điều khiển thanh trượt, nút, ô chọn và canvas như người dùng thật. */
(function () {
  const reduce = () => window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  function api(box, token) {
    const wait = (ms) => new Promise((res, rej) => setTimeout(() => (token.stop ? rej('stop') : res()), ms));
    const frame = () => new Promise((res, rej) => requestAnimationFrame(() => (token.stop ? rej('stop') : res())));
    const range = (label) => [...box.querySelectorAll('input[type=range]')].find((i) => i.getAttribute('aria-label') === label);
    const set = (inp, v) => { inp.value = v; inp.dispatchEvent(new Event('input', { bubbles: true })); };
    const A = {
      wait, box,
      has: (label) => !!range(label),
      button: (text) => [...box.querySelectorAll('button')].find((b) => b.textContent.trim().startsWith(text) && !b.classList.contains('playbtn')),
      click(text) { const b = A.button(text); if (b) b.click(); return !!b; },
      check(i, v) { const c = box.querySelectorAll('input[type=checkbox]')[i]; if (c && c.checked !== v) { c.checked = v; c.dispatchEvent(new Event('change')); } },
      set(label, v) { const r = range(label); if (r) set(r, v); },
      get(label) { const r = range(label); return r ? +r.value : NaN; },
      async sweep(label, dir, o) {
        const r = typeof label === 'string' ? range(label) : label; if (!r) return;
        o = o || {};
        const lo = +r.min, hi = +r.max;
        const a = o.from !== undefined ? o.from : dir === 'down' ? hi : lo;
        const b = o.to !== undefined ? o.to : dir === 'down' ? lo : hi;
        const dur = o.dur || 4200, t0 = performance.now();
        const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
        const geo = o.log && a > 0 && b > 0;
        for (;;) {
          await frame();
          const t = Math.min(1, (performance.now() - t0) / dur), e = ease(t);
          set(r, geo ? a * Math.pow(b / a, e) : a + (b - a) * e);
          if (t >= 1) break;
        }
      },
      async cycle(sel, ms) {
        const s = typeof sel === 'number' ? box.querySelectorAll('select')[sel] : [...box.querySelectorAll('select')].find((x) => x.getAttribute('aria-label') === sel);
        if (!s) return;
        const start = s.selectedIndex;
        for (let i = 1; i <= s.options.length; i++) { s.selectedIndex = (start + i) % s.options.length; s.dispatchEvent(new Event('change')); await wait(ms || 1700); }
      },
      async press(text, times, ms) { for (let i = 0; i < times; i++) { if (!A.click(text)) return; await wait(ms || 650); } },
      canvas: () => box.querySelector('canvas.plot'),
      tap(x, y, type) {
        const c = A.canvas(); if (!c || !c._plot) return;
        const p = c._plot, r = c.getBoundingClientRect();
        const ev = new PointerEvent(type || 'pointerdown', { clientX: r.left + p.X(x), clientY: r.top + p.Y(y), bubbles: true, pointerId: 77, buttons: 1 });
        try { c.dispatchEvent(ev); } catch (e) {}
        if (!type) c.dispatchEvent(new PointerEvent('pointerup', { pointerId: 77 }));
      },
      async drag(dx, steps) {
        const c = A.canvas(); if (!c) return; const r = c.getBoundingClientRect();
        const x0 = r.left + r.width / 2, y0 = r.top + r.height / 2;
        c.dispatchEvent(new PointerEvent('pointerdown', { clientX: x0, clientY: y0, pointerId: 78 }));
        for (let i = 1; i <= steps; i++) { c.dispatchEvent(new PointerEvent('pointermove', { clientX: x0 + dx * i, clientY: y0 + Math.sin(i / 18) * 6, pointerId: 78 })); await frame(); }
        c.dispatchEvent(new PointerEvent('pointerup', { pointerId: 78 }));
      },
      good: () => !!box.querySelector('.readout.good'),
    };
    return A;
  }

  /* ---------- kịch bản cho từng minh hoạ ---------- */
  const S = {
    swapdemo: (A) => A.sweep('ε', 'down', { to: 0.02, log: true }),
    peano: async (A) => { A.check(0, true); A.check(1, false); A.click('Đổ'); await A.wait(2400); A.check(1, true); A.click('Đổ'); await A.wait(3200); },
    venn: (A) => A.cycle('Phép toán', 1500),
    setmap: async (A) => { await A.press('Ngẫu nhiên', 5, 1100); },
    cartesian: (A) => A.press('Một hàm ngẫu nhiên', 5, 1000),
    pigeon: async (A) => { A.set('Bồ câu n', 6); A.set('Chuồng m', 5); await A.press('Xếp lại', 5, 900); },
    pairs: async (A) => { for (const [x, y] of [[5, 2], [2, 4], [6, 3], [3, 6], [4, 1], [6, 6]]) { A.tap(x, y); await A.wait(1100); } },
    epsclose: async (A) => { await A.sweep('x', 'up', { from: -1.8, to: 1.2, dur: 3000 }); await A.sweep('z', 'down', { from: 1.8, to: -0.4, dur: 3000 }); },
    sqrt2: (A) => A.sweep('Số chữ số k', 'up', { dur: 5000 }),
    seq: async (A) => {
      if (A.button('ε nhỏ hơn')) {
        A.click('Chơi lại');
        for (let round = 0; round < 6; round++) {
          let n = A.get('N');
          while (!A.good() && n < 300) { n = Math.min(300, n + Math.max(1, Math.round(n * 0.08))); A.set('N', n); await A.wait(45); }
          await A.wait(900);
          A.click('ε nhỏ hơn');
          await A.wait(500);
        }
        return;
      }
      if (A.has('ε')) return A.sweep('ε', 'down', { from: 1, to: 0.004, log: true, dur: 5000 });
      if (A.has('N')) return A.sweep('N', 'up', { dur: 5000 });
      if (A.has('x hoặc k')) return A.sweep('x hoặc k', 'up', { from: -1.25, to: 1.4, dur: 5000 });
      if (A.box.querySelector('select[aria-label="Chỉ số"]')) return A.cycle('Chỉ số', 1700);
      return A.cycle('Dãy', 1800);
    },
    supset: (A) => A.sweep('M', 'down', { from: 2.2, to: 1.0, dur: 4200 }),
    powers: (A) => A.sweep('k', 'up', { dur: 4000 }),
    series: (A) => A.sweep('N', 'up', { from: 5, dur: 5000 }),
    rearrange: async (A) => { await A.sweep('Đích T', 'up', { from: -2, to: 3, dur: 3500 }); await A.sweep('Đích T', 'down', { from: 3, to: 1.5, dur: 1800 }); },
    hilbert: async (A) => { A.click('Về ban đầu'); await A.wait(900); A.click('Đón 1 khách mới'); await A.wait(2200); A.click('Về ban đầu'); await A.wait(900); A.click('Đón vô hạn khách mới'); await A.wait(2600); },
    qenum: (A) => A.sweep('Số bước', 'up', { dur: 6000 }),
    diagonal: (A) => A.press('Danh sách khác', 4, 1600),
    adherent: async (A) => { for (const x of [0.5, 0, 1, 2, 3.5]) { A.set('x', x); await A.sweep('ε', 'down', { from: 0.8, to: 0.02, dur: 1500 }); await A.wait(500); } },
    epsdelta: async (A) => { for (const e of [0.6, 0.35, 0.2, 0.1, 0.05]) { A.set('ε', e); await A.wait(500); A.click('Máy tìm δ'); await A.wait(1300); } },
    extreme: async (A) => { await A.sweep('b', 'down', { from: 3, to: 0.4, dur: 2600 }); await A.sweep('b', 'up', { from: 0.4, to: 2, dur: 2000 }); },
    ivt: async (A) => { A.click('Đặt lại'); await A.wait(600); await A.press('Chia đôi', 10, 600); },
    inverse: (A) => A.sweep('x₀', 'up', { from: -1.3, to: 1.3, dur: 4500 }),
    unifcont: (A) => A.sweep('x₀ (vị trí)', 'down', { from: 1, to: 0, dur: 5000 }),
    infty: (A) => A.sweep('M', 'up', { from: 0.5, to: 40, dur: 4500 }),
    secant: async (A) => { if (A.has('h')) { await A.sweep('h', 'down', { from: 1, to: 0.001, log: true, dur: 4500 }); } else await A.sweep('x₀', 'up', { from: -1.7, to: 1.7, dur: 5000 }); },
    lhopital: (A) => A.sweep('Khung ±', 'down', { from: 2, to: 0.01, log: true, dur: 4500 }),
    riemann: (A) => A.sweep('Số khoảng', 'up', { from: 1, to: 120, log: true, dur: 5000 }),
    stieltjes: (A) => A.sweep('Số khoảng', 'up', { from: 2, to: 200, log: true, dur: 4500 }),
    ftc: (A) => A.sweep('x', 'up', { from: 0, to: 6, dur: 5500 }),
    truth: (A) => A.cycle('Phép nối', 1700),
    decimal: (A) => A.sweep('n', 'up', { from: 1, to: 12, dur: 4500 }),
    balls: async (A) => { for (const m of ['l1', 'l2', 'linf']) { const s = A.box.querySelector('select'); s.value = m; s.dispatchEvent(new Event('change')); await A.sweep('r', 'up', { from: 0.2, to: 1.5, dur: 1600 }); } },
    topo: async (A) => { A.click('P trên biên'); await A.sweep('r', 'down', { from: 0.6, to: 0.02, dur: 2000 }); A.click('P là điểm lẻ'); await A.sweep('r', 'down', { from: 0.6, to: 0.02, dur: 2000 }); },
    bolzano: async (A) => { A.click('Đặt lại'); await A.wait(500); await A.press('Chia đôi', 8, 750); },
    surface: async (A) => { if (A.has('hướng θ')) A.sweep('hướng θ', 'up', { dur: 5000 }); else if (A.has('x₀')) A.sweep('x₀', 'down', { from: 1.2, to: -0.8, dur: 5000 }); await A.drag(1.6, 260); },
    uniform: (A) => A.sweep('n', 'up', { from: 1, to: 60, dur: 5000 }),
    weierstrass: (A) => A.sweep('Bậc n', 'up', { from: 1, to: 300, log: true, dur: 5000 }),
    taylor: (A) => A.sweep('Bậc N', 'up', { from: 0, to: 30, dur: 5500 }),
    euler: async (A) => { if (A.has('Số hạng')) { A.set('θ', 3.14); await A.sweep('Số hạng', 'up', { from: 1, to: 18, dur: 4500 }); } else await A.sweep('θ', 'up', { dur: 5000 }); },
    inner: (A) => A.cycle(0, 1800),
    convolve: (A) => A.sweep('Bề rộng', 'down', { from: 0.4, to: 0.01, log: true, dur: 4500 }),
    fourier: (A) => A.sweep('N', 'up', { from: 1, to: 60, dur: 5500 }),
    linmap: async (A) => { if (A.has('Cỡ ô')) return A.sweep('Cỡ ô', 'down', { from: 1, to: 0.04, log: true, dur: 4500 }); await A.sweep('b', 'down', { from: 1.5, to: -1.5, dur: 2500 }); await A.sweep('d', 'down', { from: 2, to: -0.5, dur: 2500 }); },
    contraction: (A) => A.sweep('Số bước', 'up', { from: 1, to: 30, dur: 4500 }),
    implicit: async (A) => { const c = A.canvas()._plot; for (let i = 0; i <= 24; i++) { const t = i / 24 * 2 * Math.PI; const cx = (c.o.xmin + c.o.xmax) / 2, cy = (c.o.ymin + c.o.ymax) / 2, R = (c.o.ymax - c.o.ymin) * 0.3; A.tap(cx + R * Math.cos(t), cy + R * Math.sin(t)); await A.wait(260); } },
    cover: (A) => A.sweep('Số khoảng', 'up', { from: 1, to: 120, dur: 4500 }),
    simplefn: (A) => A.sweep('n', 'up', { from: 0, to: 8, dur: 4500 }),
    lebesgue: (A) => A.sweep('Số dải', 'up', { from: 1, to: 40, dur: 4500 }),
    fubini: (A) => A.cycle(0, 2400),
  };

  window.ANIM_SCRIPTS = S;

  /* ---------- gắn nút và tự chạy ---------- */
  const PLAY = '<svg viewBox="0 0 20 20"><path d="M6 4l10 6-10 6z"/></svg>';
  const STOP = '<svg viewBox="0 0 20 20"><path d="M6 5h3v10H6zM11 5h3v10h-3z"/></svg>';
  const io = 'IntersectionObserver' in window ? new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting && e.intersectionRatio > 0.55 && !e.target._autoplayed) { e.target._autoplayed = true; if (!reduce()) setTimeout(() => e.target._play && e.target._play(), 350); }
  }), { threshold: [0.55] }) : null;

  window.attachAnim = function (box, name) {
    const script = S[name];
    if (!script) return;
    let token = null;
    let row = box.querySelector('.ctrls');
    if (!row) { row = el('div', { class: 'ctrls' }); box.querySelector('canvas, table, div:not(.wt):not(.wd)') ? box.insertBefore(row, box.querySelector('.readout')) : box.appendChild(row); }
    const btn = el('button', { class: 'btn small playbtn', type: 'button' });
    const paint = () => { btn.innerHTML = token ? STOP + ' Dừng' : PLAY + ' Xem chạy'; btn.classList.toggle('running', !!token); box.classList.toggle('playing', !!token); };
    paint();
    row.insertBefore(btn, row.firstChild);
    const stop = () => { if (token) { token.stop = true; token = null; paint(); } };
    box._play = async () => {
      stop();
      const t = (token = { stop: false });
      paint();
      try { await script(api(box, t)); } catch (e) { if (e !== 'stop') console.error(name, e); }
      if (token === t) { token = null; paint(); }
    };
    btn.addEventListener('click', () => (token ? stop() : box._play()));
    /* người dùng tự chạm vào thì dừng kịch bản */
    box.addEventListener('pointerdown', (e) => { if (e.isTrusted && token && !btn.contains(e.target)) stop(); }, true);
    box.addEventListener('keydown', (e) => { if (e.isTrusted && token) stop(); }, true);
    if (io) io.observe(box);
  };
})();
