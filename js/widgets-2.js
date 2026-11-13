/* Minh hoạ cho phần hai (Chương 12–19). */
(function () {
  const C = (n) => col(n);
  const say = UI.say;
  const sq = (w) => Math.min(Math.round(w * 0.72), 400);
  /* giữ tỉ lệ 1:1 cho hình phẳng */
  function square(p, cx, cy, r) {
    const ar = (p.W - 2 * p.o.pad) / (p.H - 2 * p.o.pad + 6);
    if (ar >= 1) p.set({ xmin: cx - r * ar, xmax: cx + r * ar, ymin: cy - r, ymax: cy + r });
    else p.set({ xmin: cx - r, xmax: cx + r, ymin: cy - r / ar, ymax: cy + r / ar });
  }

  /* ===== 12.1 Quả cầu trong các mêtric ===== */
  defWidget('balls', 'Quả cầu $B(0,r)$ trong các mêtric', 'Chọn mêtric và bán kính. Bấm hoặc kéo trên hình để đặt điểm $Q$ và xem khoảng cách từ gốc theo cả ba mêtric.', (root) => {
    const p = new Plot(root, { h: sq, xstep: 0.5, ystep: 0.5 });
    const row = UI.row(root);
    const out = UI.readout(root);
    let m = 'l2', r = 1, Q = [0.8, 0.5];
    UI.select(row, 'Mêtric', [['l1', 'ℓ¹: |x| + |y|'], ['l2', 'ℓ²: Euclid'], ['linf', 'ℓ∞: max(|x|, |y|)'], ['disc', 'rời rạc']], m, (v) => { m = v; draw(); });
    UI.slider(row, 'r', 0.1, 1.8, 0.01, r, (v) => { r = v; draw(); });
    p.onPointer((x, y) => { Q = [x, y]; draw(); });
    const shape = (k, rr) => k === 'l1' ? [[rr, 0], [0, rr], [-rr, 0], [0, -rr]] : k === 'linf' ? [[rr, rr], [-rr, rr], [-rr, -rr], [rr, -rr]] : MathX.lin(0, 2 * Math.PI, 120).map((t) => [rr * Math.cos(t), rr * Math.sin(t)]);
    function draw() {
      p.resize(); square(p, 0, 0, 2);
      p.clear();
      if (m === 'disc') { if (r >= 1) p.rect(p.o.xmin, p.o.ymin, p.o.xmax, p.o.ymax, C('band')); p.dot(0, 0, 6, C('accent')); }
      else {
        ['l1', 'l2', 'linf'].filter((k) => k !== m).forEach((k) => p.path(shape(k, r).concat([shape(k, r)[0]]), C('rule-strong'), 1));
        const s = shape(m, r); p.path(s.concat([s[0]]), C('accent'), 2.2, C('band'));
      }
      const [x, y] = Q;
      const d1 = Math.abs(x) + Math.abs(y), d2 = Math.hypot(x, y), di = Math.max(Math.abs(x), Math.abs(y)), dd = x === 0 && y === 0 ? 0 : 1;
      const d = { l1: d1, l2: d2, linf: di, disc: dd }[m];
      p.line(0, 0, x, y, C('data2'), 1.2, [3, 3]);
      p.dot(x, y, 5.5, d < r ? C('accent') : C('data2'));
      p.text('Q', x + 0.08, y + 0.1, C('data2'));
      say(out, `$d_{\\ell^1}=${fmt(d1)}$, $d_{\\ell^2}=${fmt(d2)}$, $d_{\\ell^\\infty}=${fmt(di)}$, rời rạc $=${dd}$. Luôn có $d_{\\ell^\\infty}\\le d_{\\ell^2}\\le d_{\\ell^1}\\le2d_{\\ell^\\infty}$. ` + (d < r ? '$Q$ nằm trong quả cầu.' : '$Q$ nằm ngoài quả cầu.') + (m === 'disc' ? (r < 1 ? ' Với $r\\le1$, quả cầu rời rạc chỉ là $\\{0\\}$.' : ' Với $r>1$, quả cầu là cả mặt phẳng.') : ''), d < r ? 'good' : '');
    }
    return draw;
  });

  /* ===== 12.2 Điểm trong, biên, ngoài ===== */
  defWidget('topo', 'Điểm trong, điểm biên, điểm ngoài', 'Tập $E$ là đĩa mở $x^2+y^2<1$ (không gồm đường tròn) cộng thêm một điểm lẻ $(1{,}6;\\,0)$. Bấm chọn điểm $P$ và thu nhỏ bán kính quả cầu.', (root) => {
    const p = new Plot(root, { h: sq, xstep: 0.5, ystep: 0.5 });
    const row = UI.row(root);
    const out = UI.readout(root);
    let P = [0.5, 0.3], r = 0.3;
    UI.slider(row, 'r', 0.01, 0.8, 0.01, r, (v) => { r = v; draw(); });
    UI.button(row, 'P trên biên', () => { P = [Math.cos(0.7), Math.sin(0.7)]; draw(); });
    UI.button(row, 'P là điểm lẻ', () => { P = [1.6, 0]; draw(); });
    p.onPointer((x, y) => { const rho = Math.hypot(x, y); P = Math.abs(rho - 1) < 0.04 ? [x / rho, y / rho] : Math.hypot(x - 1.6, y) < 0.06 ? [1.6, 0] : [x, y]; draw(); });
    function draw() {
      p.resize(); square(p, 0.3, 0, 1.6);
      p.clear();
      const c = p.ctx;
      c.beginPath(); c.arc(p.X(0), p.Y(0), p.X(1) - p.X(0), 0, 7); c.fillStyle = C('band'); c.fill();
      c.setLineDash([5, 4]); c.strokeStyle = C('accent'); c.lineWidth = 1.5; c.stroke(); c.setLineDash([]);
      p.dot(1.6, 0, 4.5, C('accent'));
      c.beginPath(); c.arc(p.X(P[0]), p.Y(P[1]), p.X(r) - p.X(0), 0, 7); c.fillStyle = C('band2'); c.fill(); c.strokeStyle = C('data2'); c.lineWidth = 1.5; c.stroke();
      p.dot(P[0], P[1], 4, C('data2'));
      const rho = Math.hypot(P[0], P[1]);
      const iso = Math.hypot(P[0] - 1.6, P[1]) < 1e-6;
      const inside = !iso && rho + r < 1;
      const meetsE = rho - r < 1 || Math.hypot(P[0] - 1.6, P[1]) < r;
      const now = inside ? 'Quả cầu nằm gọn trong $E$.' : meetsE ? 'Quả cầu chạm cả $E$ lẫn phần bù.' : 'Quả cầu nằm hoàn toàn ngoài $E$.';
      const kind = iso ? 'điểm biên và là điểm cô lập (thuộc $E$, nhưng mọi quả cầu đều chạm phần bù).' : Math.abs(rho - 1) < 1e-6 ? 'điểm biên, **không** thuộc $E$. Vậy $E$ không đóng.' : rho < 1 ? 'điểm trong của $E$.' : 'điểm ngoài của $E$.';
      say(out, now + ' Khi $r\\to0$: $P$ là ' + kind + (iso ? ' Vì có điểm thuộc $E$ mà không là điểm trong, $E$ không mở.' : ''), rho < 1 && !iso ? 'good' : '');
    }
    return draw;
  });

  /* ===== 12.5 Bolzano–Weierstrass ===== */
  defWidget('bolzano', 'Rút dãy con hội tụ bằng chia đôi', 'Dãy $a_n=\\{n\\sqrt2\\}$ (phần lẻ) nằm trong $[0,1]$. Mỗi bước giữ nửa khoảng chứa nhiều số hạng hơn và chọn một chỉ số mới lớn hơn chỉ số trước.', (root) => {
    const p = new Plot(root, { xmin: 0, xmax: 401, ymin: -0.05, ymax: 1.05, h: 280 });
    const row = UI.row(root);
    const out = UI.readout(root);
    const a = (n) => (n * Math.SQRT2) % 1;
    let steps = 0;
    UI.button(row, 'Chia đôi', () => { steps = Math.min(steps + 1, 10); draw(); }, true);
    UI.button(row, 'Đặt lại', () => { steps = 0; draw(); });
    function draw() {
      p.clear();
      let lo = 0, hi = 1, last = 0; const picked = [];
      for (let s = 0; s < steps; s++) {
        const mid = (lo + hi) / 2;
        let cl = 0, ch = 0; for (let n = last + 1; n <= 4000; n++) { const v = a(n); if (v >= lo && v < mid) cl++; else if (v >= mid && v < hi) ch++; }
        if (cl >= ch) hi = mid; else lo = mid;
        for (let n = last + 1; n <= 4000; n++) { const v = a(n); if (v >= lo && v < hi) { picked.push(n); last = n; break; } }
      }
      p.hband(lo, hi);
      for (let n = 1; n <= 400; n++) p.dot(n, a(n), 1.8, C('faint'));
      p.path(picked.filter((n) => n <= 400).map((n) => [n, a(n)]), C('accent'), 1.2);
      picked.forEach((n) => n <= 400 && p.dot(n, a(n), 4.5, C('accent')));
      say(out, steps ? `Khoảng còn lại $[${fmt(lo, 5)};\\ ${fmt(hi, 5)}]$, độ rộng $2^{-${steps}}$. Chỉ số đã chọn: ${picked.join(', ')}. Dãy con này là Cauchy, nên hội tụ (vì $[0,1]$ đóng, giới hạn thuộc $[0,1]$).` : 'Bấm “Chia đôi”. Luôn có một nửa chứa vô hạn số hạng.');
    }
    return draw;
  });

  /* ===== 13.2 / 17.x Mặt cong 3D ===== */
  const SURF = {
    bowl: { t: 'x² + y²', f: (x, y) => x * x + y * y },
    saddle: { t: 'x² − y² (yên ngựa)', f: (x, y) => x * x - y * y },
    wave: { t: 'sin x · cos y', f: (x, y) => Math.sin(x) * Math.cos(y) },
    peak: { t: 'e^(−(x² + y²))', f: (x, y) => Math.exp(-(x * x + y * y)) },
    discont: { t: 'xy/(x² + y²), f(0,0) = 0', f: (x, y) => (x === 0 && y === 0 ? 0 : (x * y) / (x * x + y * y)) },
  };
  defWidget('surface', (o) => (o.preset === 'discont' ? 'Liên tục theo từng biến nhưng không liên tục' : o.mode === 'dir' ? 'Đạo hàm theo hướng và gradient' : o.preset === 'saddle' ? 'Đạo hàm bậc hai: lồi, lõm, yên ngựa' : 'Mặt phẳng tiếp xúc'),
    (o) => 'Kéo trên hình để xoay. ' + (o.preset === 'discont' ? 'Đường đỏ là lát cắt dọc $y=x$, đường xanh là hai trục toạ độ.' : o.mode === 'dir' ? 'Mũi tên đỏ là hướng $v$, lát cắt đỏ là $t\\mapsto f(x_0+tv)$. Mũi tên xanh là gradient.' : 'Mảnh đỏ là mặt phẳng tiếp xúc tại điểm đang chọn.'), (root, o) => {
    const host = el('div'); root.appendChild(host);
    const p = new Plot(host, { h: (w) => Math.min(Math.round(w * 0.7), 420), grid: false });
    const row = UI.row(root);
    const out = UI.readout(root);
    let k = o.preset || 'bowl', x0 = 0.6, y0 = 0.4, th = 0.8, az = -0.7, elv = 0.55;
    UI.select(row, 'f(x, y)', Object.entries(SURF).map(([k2, v]) => [k2, v.t]), k, (v) => { k = v; draw(); });
    UI.slider(row, 'x₀', -1.8, 1.8, 0.01, x0, (v) => { x0 = v; draw(); });
    UI.slider(row, 'y₀', -1.8, 1.8, 0.01, y0, (v) => { y0 = v; draw(); });
    if (o.mode === 'dir') UI.slider(row, 'hướng θ', 0, 6.28, 0.01, th, (v) => { th = v; draw(); }, (v) => Math.round(v * 180 / Math.PI) + '°');
    let drag = null;
    p.c.addEventListener('pointerdown', (e) => { drag = [e.clientX, e.clientY, az, elv]; try { p.c.setPointerCapture(e.pointerId); } catch (x) {} });
    p.c.addEventListener('pointermove', (e) => { if (!drag) return; az = drag[2] + (e.clientX - drag[0]) * 0.01; elv = Math.max(-0.2, Math.min(1.45, drag[3] + (e.clientY - drag[1]) * 0.01)); draw(); });
    p.c.addEventListener('pointerup', () => (drag = null));
    function draw() {
      const f = SURF[k].f;
      let zmin = Infinity, zmax = -Infinity;
      for (let i = 0; i <= 20; i++) for (let j = 0; j <= 20; j++) { const z = f(-2 + i / 5, -2 + j / 5); if (isFinite(z)) { zmin = Math.min(zmin, z); zmax = Math.max(zmax, z); } }
      const zs = 2.2 / Math.max(zmax - zmin, 1e-6), zc = (zmax + zmin) / 2;
      const S = Math.min(p.W, p.H) / 6.2, cx = p.W / 2, cy = p.H / 2 + 6;
      const proj = (x, y, z) => { const X = x * Math.cos(az) - y * Math.sin(az), Y = x * Math.sin(az) + y * Math.cos(az), Z = (z - zc) * zs; return [cx + X * S, cy - (Z * Math.cos(elv) - Y * Math.sin(elv)) * S * 0.9]; };
      const c = p.ctx;
      p.clear();
      c.lineWidth = 1;
      const seg = (pts, color, w, dash) => { c.strokeStyle = color; c.lineWidth = w || 1; c.setLineDash(dash || []); c.beginPath(); let pen = false; pts.forEach(([x, y, z]) => { if (!isFinite(z)) { pen = false; return; } const [u, v] = proj(x, y, z); pen ? c.lineTo(u, v) : c.moveTo(u, v); pen = true; }); c.stroke(); c.setLineDash([]); };
      [[-2, 0, 0, 2, 0, 0], [0, -2, 0, 0, 2, 0]].forEach(([a, b, , d, e]) => seg([[a, b, zmin], [d, e, zmin]], C('rule-strong'), 1));
      for (let i = 0; i <= 20; i++) {
        const t = -2 + i / 5;
        seg(MathX.lin(-2, 2, 60).map((s) => [t, s, f(t, s)]), C('faint'), 0.8);
        seg(MathX.lin(-2, 2, 60).map((s) => [s, t, f(s, t)]), C('faint'), 0.8);
      }
      const h = 1e-4, fx = (f(x0 + h, y0) - f(x0 - h, y0)) / (2 * h), fy = (f(x0, y0 + h) - f(x0, y0 - h)) / (2 * h), z0 = f(x0, y0);
      if (k === 'discont') {
        seg(MathX.lin(-2, 2, 120).map((s) => [s, s, f(s, s)]), C('accent'), 2.4);
        seg(MathX.lin(-2, 2, 60).map((s) => [s, 0, f(s, 0)]), C('data2'), 2.4);
        seg(MathX.lin(-2, 2, 60).map((s) => [0, s, f(0, s)]), C('data2'), 2.4);
        const [u, v] = proj(0, 0, 0); c.fillStyle = C('ink'); c.beginPath(); c.arc(u, v, 4, 0, 7); c.fill();
        say(out, 'Dọc hai trục (xanh) $f=0$, nên $f$ liên tục theo từng biến tại gốc. Dọc $y=x$ (đỏ) $f=\\tfrac12$ ở mọi điểm khác gốc, nên tiến về gốc theo đường này giới hạn là $\\tfrac12\\neq f(0,0)$. Hàm **không** liên tục tại $(0,0)$, và cũng không khả vi dù có đủ đạo hàm riêng $\\partial_xf(0,0)=\\partial_yf(0,0)=0$.', 'bad');
        return;
      }
      const d = 0.6, corner = (a, b) => [x0 + a, y0 + b, z0 + fx * a + fy * b];
      const quad = [corner(-d, -d), corner(d, -d), corner(d, d), corner(-d, d)].map(([x, y, z]) => proj(x, y, z));
      if (o.mode !== 'dir') { c.beginPath(); quad.forEach(([u, v], i) => (i ? c.lineTo(u, v) : c.moveTo(u, v))); c.closePath(); c.fillStyle = C('band'); c.fill(); c.strokeStyle = C('accent'); c.lineWidth = 1.4; c.stroke(); }
      const arrow = (x1, y1, z1, x2, y2, z2, color) => { const [a, b] = proj(x1, y1, z1), [u, v] = proj(x2, y2, z2); c.strokeStyle = color; c.lineWidth = 2.2; c.beginPath(); c.moveTo(a, b); c.lineTo(u, v); c.stroke(); const ang = Math.atan2(v - b, u - a); c.fillStyle = color; c.beginPath(); c.moveTo(u, v); c.lineTo(u - 9 * Math.cos(ang - 0.4), v - 9 * Math.sin(ang - 0.4)); c.lineTo(u - 9 * Math.cos(ang + 0.4), v - 9 * Math.sin(ang + 0.4)); c.fill(); };
      const gn = Math.hypot(fx, fy);
      if (gn > 1e-6) { const s = 0.8 / Math.max(gn, 1); arrow(x0, y0, z0, x0 + fx * s, y0 + fy * s, z0 + (fx * fx + fy * fy) * s, C('data2')); }
      const v = [Math.cos(th), Math.sin(th)], Dv = fx * v[0] + fy * v[1];
      if (o.mode === 'dir') {
        seg(MathX.lin(-1.4, 1.4, 80).map((t) => [x0 + t * v[0], y0 + t * v[1], f(x0 + t * v[0], y0 + t * v[1])]), C('accent'), 2.4);
        arrow(x0, y0, z0, x0 + 0.7 * v[0], y0 + 0.7 * v[1], z0 + 0.7 * Dv, C('accent'));
      }
      const [u, w2] = proj(x0, y0, z0); c.fillStyle = C('ink'); c.beginPath(); c.arc(u, w2, 4.5, 0, 7); c.fill();
      const fxx = (f(x0 + 1e-3, y0) - 2 * z0 + f(x0 - 1e-3, y0)) / 1e-6, fyy = (f(x0, y0 + 1e-3) - 2 * z0 + f(x0, y0 - 1e-3)) / 1e-6, fxy = (f(x0 + 1e-3, y0 + 1e-3) - f(x0 + 1e-3, y0 - 1e-3) - f(x0 - 1e-3, y0 + 1e-3) + f(x0 - 1e-3, y0 - 1e-3)) / 4e-6;
      let t = `$f(${fmt(x0)},${fmt(y0)})=${fmt(z0)}$, $\\partial_xf=${fmt(fx)}$, $\\partial_yf=${fmt(fy)}$, $\\nabla f=(${fmt(fx)},${fmt(fy)})$. `;
      if (o.mode === 'dir') t += `$v=(\\cos\\theta,\\sin\\theta)$, $D_vf=\\nabla f\\cdot v=${fmt(Dv)}$. Lớn nhất khi $v$ cùng hướng gradient (bằng $|\\nabla f|=${fmt(gn)}$).`;
      else if (o.preset === 'saddle') { const det = fxx * fyy - fxy * fxy; t += `Hessian: $f_{xx}=${fmt(fxx, 2)}$, $f_{yy}=${fmt(fyy, 2)}$, $f_{xy}=f_{yx}=${fmt(fxy, 2)}$ (Clairaut). Định thức $${fmt(det, 2)}$: ` + (det < -1e-6 ? 'yên ngựa.' : det > 1e-6 ? (fxx > 0 ? 'lồi (như đáy bát).' : 'lõm (như đỉnh đồi).') : 'chưa kết luận.'); }
      else t += `Mặt phẳng tiếp xúc: $z=${fmt(z0)}+${fmt(fx)}(x-x_0)+${fmt(fy)}(y-y_0)$.`;
      say(out, t);
    }
    return draw;
  });

  /* ===== 14.x Hội tụ đều ===== */
  const UF = {
    xn: { t: 'xⁿ trên [0; 1]', fn: (n, x) => Math.pow(x, n), f: (x) => (x < 1 ? 0 : 1), a: 0, b: 1, y: [-0.1, 1.15], unif: false },
    xn9: { t: 'xⁿ trên [0; 0,9]', fn: (n, x) => Math.pow(x, n), f: () => 0, a: 0, b: 0.9, y: [-0.1, 1], unif: true },
    sinn: { t: 'sin(nx)/n trên [0; 2π]', fn: (n, x) => Math.sin(n * x) / n, f: () => 0, a: 0, b: 2 * Math.PI, y: [-1.1, 1.1], unif: true },
    bump: { t: 'nx·e^(−nx) trên [0; 3]', fn: (n, x) => n * x * Math.exp(-n * x), f: () => 0, a: 0, b: 3, y: [-0.05, 0.45], unif: false },
    mtest: { t: 'Tổng riêng ∑ₖ≤ₙ sin(kx)/k²', fn: (n, x) => { let s = 0; for (let k = 1; k <= n; k++) s += Math.sin(k * x) / (k * k); return s; }, f: null, a: 0, b: 2 * Math.PI, y: [-1.2, 1.2], unif: true },
  };
  defWidget('uniform', (o) => (o.preset === 'mtest' ? 'Tiêu chuẩn M của Weierstrass' : o.preset === 'xn' ? 'Giới hạn điểm của hàm liên tục có thể gián đoạn' : 'Hội tụ điểm và hội tụ đều'), 'Đường xanh là giới hạn $f$, dải đỏ là $|y-f(x)|\\le\\varepsilon$. Hội tụ đều nghĩa là từ một $n$ nào đó, **toàn bộ** đồ thị $f_n$ nằm trong dải.', (root, o) => {
    const p = new Plot(root, { xmin: 0, xmax: 1, ymin: 0, ymax: 1, h: 290 });
    const row = UI.row(root);
    const out = UI.readout(root);
    let k = o.preset || 'xn', n = 5, eps = 0.1;
    const fm = (() => { const K = 400; return (x) => UF.mtest.fn(K, x); })();
    UI.select(row, 'Dãy hàm', Object.entries(UF).map(([k2, v]) => [k2, 'fₙ(x) = ' + v.t]), k, (v) => { k = v; draw(); });
    UI.slider(row, 'n', 1, 80, 1, n, (v) => { n = v; draw(); }, String);
    UI.slider(row, 'ε', 0.01, 0.5, 0.01, eps, (v) => { eps = v; draw(); });
    function draw() {
      const G = UF[k], f = G.f || fm;
      p.set({ xmin: G.a, xmax: G.b + (G.b - G.a) * 0.02, ymin: G.y[0], ymax: G.y[1] });
      p.clear();
      const c = p.ctx; c.fillStyle = C('band');
      const xs = MathX.lin(G.a, G.b, 500);
      xs.forEach((x, i) => { if (!i) return; const x1 = xs[i - 1]; const y = f(x); c.fillRect(p.X(x1), p.Y(y + eps), p.X(x) - p.X(x1) + 0.5, p.Y(y - eps) - p.Y(y + eps)); });
      [Math.max(1, n - 3), Math.max(1, n - 2), Math.max(1, n - 1)].forEach((m) => m < n && p.fn((x) => G.fn(m, x), C('rule-strong'), 1, G.a, G.b));
      p.fn(f, C('data2'), 2, G.a, G.b, { join: false });
      if (k === 'xn') { p.dot(1, 1, 4.5, C('data2')); p.dot(1, 0, 4.5, C('data2'), true); }
      p.fn((x) => G.fn(n, x), C('accent'), 2.2, G.a, G.b);
      let sup = 0, at = G.a;
      for (let i = 0; i <= 3000; i++) { const x = G.a + (G.b - G.a) * i / 3000; const d = Math.abs(G.fn(n, x) - f(x)); if (d > sup) { sup = d; at = x; } }
      if (k === 'xn') { sup = Math.pow(1 - 1e-9, n) > 0.5 ? 1 : sup; at = 1; }
      p.line(at, G.fn(n, at), at, f(at), C('bad'), 1.5);
      const inBand = sup <= eps;
      let t = `$\\sup_x|f_{${n}}(x)-f(x)|${k === 'xn' ? '=1' : '\\approx' + fmt(sup, 4)}$ ` + (inBand ? '$\\le\\varepsilon$: đồ thị nằm trong dải.' : '$>\\varepsilon$ (vạch đỏ).') + ' ';
      t += G.unif ? 'Dãy hội tụ **đều**: $\\sup\\to0$.' : 'Dãy chỉ hội tụ **điểm**: $\\sup$ không tiến về $0$' + (k === 'xn' ? '; giới hạn nhảy tại $x=1$ dù mọi $f_n$ liên tục.' : ' (cái bướu chạy về $0$ nhưng không thấp đi).');
      if (k === 'mtest') t += ' Ở đây $|\\sin(kx)/k^2|\\le M_k=1/k^2$ và $\\sum M_k<\\infty$; phần đuôi $\\le\\sum_{k>n}1/k^2<1/n$.';
      say(out, t, G.unif ? 'good' : 'bad');
    }
    return draw;
  });

  /* ===== 14.8 Xấp xỉ Weierstrass (Bernstein) ===== */
  defWidget('weierstrass', 'Đa thức Bernstein xấp xỉ đều', 'Tăng bậc $n$: đa thức $B_nf$ bám sát $f$ trên toàn đoạn $[0,1]$, kể cả chỗ $f$ có góc nhọn.', (root) => {
    const p = new Plot(root, { xmin: 0, xmax: 1, ymin: -0.1, ymax: 1.1, h: 280 });
    const row = UI.row(root);
    const out = UI.readout(root);
    const F = {
      abs: { t: '|x − ½|·2', f: (x) => 2 * Math.abs(x - 0.5) },
      sin: { t: '(sin 2πx + 1)/2', f: (x) => (Math.sin(2 * Math.PI * x) + 1) / 2 },
      zig: { t: 'răng cưa liên tục', f: (x) => { const t = (x * 3) % 1; return x < 1 ? (Math.floor(x * 3) % 2 ? 1 - t : t) : 1; } },
      sqrt: { t: '√x', f: Math.sqrt },
    };
    let k = 'abs', n = 10;
    UI.select(row, 'f', Object.entries(F).map(([k2, v]) => [k2, v.t]), k, (v) => { k = v; draw(); });
    UI.slider(row, 'Bậc n', 1, 300, 1, n, (v) => { n = v; draw(); }, String);
    const B = (f, x) => { let s = 0; for (let j = 0; j <= n; j++) s += f(j / n) * Math.exp(lgC(n, j) + (j ? j * Math.log(x) : 0) + (n - j ? (n - j) * Math.log(1 - x) : 0)); return s; };
    const lg = []; const lgf = (m) => { if (lg[m] !== undefined) return lg[m]; let s = 0; for (let i = 2; i <= m; i++) s += Math.log(i); return (lg[m] = s); };
    const lgC = (m, j) => lgf(m) - lgf(j) - lgf(m - j);
    function draw() {
      const f = F[k].f;
      p.clear();
      p.fn(f, C('data2'), 2);
      const Bx = (x) => (x <= 0 ? f(0) : x >= 1 ? f(1) : B(f, x));
      p.fn(Bx, C('accent'), 2.2, 0, 1);
      let err = 0; for (let i = 0; i <= 300; i++) { const x = i / 300; err = Math.max(err, Math.abs(Bx(x) - f(x))); }
      say(out, `Sai số đều $\\sup|B_nf-f|\\approx${fmt(err, 4)}$ với $n=${n}$. Đa thức đỏ, hàm gốc xanh.`);
    }
    return draw;
  });

  /* ===== 15.x Chuỗi Taylor ===== */
  const TY = {
    exp: { t: 'eˣ', f: Math.exp, c: (k) => 1 / MathX.fact(k), R: Infinity, w: [-4, 3, -1, 12] },
    cos: { t: 'cos x', f: Math.cos, c: (k) => (k % 2 ? 0 : ((k / 2) % 2 ? -1 : 1) / MathX.fact(k)), R: Infinity, w: [-8, 8, -2, 2] },
    sqrt: { t: '√(1 + x) (nhị thức)', f: (x) => Math.sqrt(1 + x), c: (k) => { let r = 1; for (let i = 0; i < k; i++) r *= (0.5 - i) / (i + 1); return r; }, R: 1, w: [-1.3, 3, -0.6, 2.4] },
    sin: { t: 'sin x', f: Math.sin, c: (k) => (k % 2 ? ((k - 1) / 2 % 2 ? -1 : 1) / MathX.fact(k) : 0), R: Infinity, w: [-8, 8, -2, 2] },
    geom: { t: '1/(1 − x) = ∑ xⁿ', f: (x) => 1 / (1 - x), c: () => 1, R: 1, w: [-2, 1.6, -3, 8] },
    log: { t: 'ln(1 + x)', f: (x) => Math.log(1 + x), c: (k) => (k ? ((k + 1) % 2 ? -1 : 1) / k : 0), R: 1, w: [-1.2, 2, -3, 1.5] },
    atan: { t: '1/(1 + x²)', f: (x) => 1 / (1 + x * x), c: (k) => (k % 2 ? 0 : ((k / 2) % 2 ? -1 : 1)), R: 1, w: [-2, 2, -1, 2] },
  };
  defWidget('taylor', (o) => (o.preset === 'log' ? 'Định lý Abel: chuỗi tại biên' : o.preset === 'exp' ? 'Chuỗi của hàm mũ' : 'Chuỗi luỹ thừa và bán kính hội tụ'), 'Đường đỏ là tổng riêng bậc $N$, xanh là hàm. Hai vạch dọc là biên $|x|=R$: trong vùng này tổng riêng bám sát hàm khi $N$ tăng, ngoài vùng thì tách ra.', (root, o) => {
    const p = new Plot(root, { xmin: -3, xmax: 3, ymin: -2, ymax: 2, h: 290 });
    const row = UI.row(root);
    const out = UI.readout(root);
    let k = o.preset || 'sin', N = 5, x0 = o.preset === 'log' ? 0.9 : 0.5;
    UI.select(row, 'Hàm', Object.entries(TY).map(([k2, v]) => [k2, v.t]), k, (v) => { k = v; draw(); });
    UI.slider(row, 'Bậc N', 0, 60, 1, N, (v) => { N = v; draw(); }, String);
    UI.slider(row, 'x', -1.99, 2, 0.01, x0, (v) => { x0 = v; draw(); });
    function draw() {
      const G = TY[k];
      p.set({ xmin: G.w[0], xmax: G.w[1], ymin: G.w[2], ymax: G.w[3] });
      p.clear();
      if (isFinite(G.R)) { p.vband(-G.R, G.R, C('band2')); p.line(G.R, G.w[2], G.R, G.w[3], C('data2'), 1, [4, 3]); p.line(-G.R, G.w[2], -G.R, G.w[3], C('data2'), 1, [4, 3]); }
      p.fn(G.f, C('data2'), 2);
      const S = (x) => { let s = 0, xp = 1; for (let j = 0; j <= N; j++) { s += G.c(j) * xp; xp *= x; } return s; };
      p.fn(S, C('accent'), 2.2);
      const xv = Math.min(Math.max(x0, G.w[0]), G.w[1]);
      p.dot(xv, S(xv), 5, C('accent'));
      if (isFinite(G.f(xv))) p.dot(xv, G.f(xv), 4, C('data2'));
      let t = `$S_{${N}}(${fmt(xv)})=${fmt(S(xv), 5)}$, $f(${fmt(xv)})=${isFinite(G.f(xv)) ? fmt(G.f(xv), 5) : '\\text{không xác định}'}$. Bán kính hội tụ $R=${isFinite(G.R) ? G.R : '\\infty'}$. `;
      if (k === 'atan') t += 'Hàm trơn trên cả $\\mathbb R$ nhưng $R=1$: lý do nằm ở số phức ($1+z^2=0$ tại $z=\\pm i$).';
      else if (k === 'log') t += 'Tại $x=1$ chuỗi đan dấu hội tụ về $\\ln2$; Abel nói giá trị đó bằng giới hạn $\\lim_{x\\to1^-}\\ln(1+x)$. Tại $x=-1$ chuỗi phân kỳ.';
      else if (k === 'exp') t += 'Hội tụ với mọi $x$, nhưng $x$ càng xa $0$ càng cần nhiều số hạng.';
      else if (Math.abs(xv) > G.R) t += '$|x|>R$: tổng riêng phân kỳ.';
      say(out, t);
    }
    return draw;
  });

  /* ===== 15.6–15.7 Euler ===== */
  defWidget('euler', (o) => (o.mode === 'trig' ? 'cos và sin từ $e^{i\\theta}$' : '$e^{i\\theta}$ là tổng của một chuỗi'), (o) => (o.mode === 'trig' ? 'Hình chiếu của $e^{i\\theta}$ xuống trục thực là $\\cos\\theta$, lên trục ảo là $\\sin\\theta$.' : 'Mỗi số hạng $\\frac{(i\\theta)^k}{k!}$ quay $90^\\circ$ so với số hạng trước. Các mũi tên nối đuôi nhau xoắn về điểm $e^{i\\theta}$ trên đường tròn.'), (root, o) => {
    const p = new Plot(root, { h: sq, xstep: 0.5, ystep: 0.5 });
    const row = UI.row(root);
    const out = UI.readout(root);
    let th = 2, K = 6;
    UI.slider(row, 'θ', 0, 6.28, 0.01, th, (v) => { th = v; draw(); });
    if (o.mode !== 'trig') UI.slider(row, 'Số hạng', 1, 25, 1, K, (v) => { K = v; draw(); }, String);
    function draw() {
      p.resize(); square(p, o.mode === 'trig' ? 0 : -0.3, o.mode === 'trig' ? 0 : 0.5, o.mode === 'trig' ? 1.4 : 2.2);
      p.clear();
      const c = p.ctx;
      c.beginPath(); c.arc(p.X(0), p.Y(0), p.X(1) - p.X(0), 0, 7); c.strokeStyle = C('rule-strong'); c.lineWidth = 1.2; c.stroke();
      const ex = Math.cos(th), ey = Math.sin(th);
      if (o.mode === 'trig') {
        p.line(0, 0, ex, ey, C('ink'), 1.6);
        p.line(ex, ey, ex, 0, C('data2'), 1.6, [4, 3]); p.line(ex, ey, 0, ey, C('accent'), 1.6, [4, 3]);
        p.line(0, 0, ex, 0, C('data2'), 3); p.line(0, 0, 0, ey, C('accent'), 3);
        p.dot(ex, ey, 5, C('ink'));
        say(out, `$e^{i\\theta}=${fmt(ex)}+${fmt(ey)}i$: $\\cos\\theta=${fmt(ex)}$ (xanh), $\\sin\\theta=${fmt(ey)}$ (đỏ). $\\cos^2\\theta+\\sin^2\\theta=|e^{i\\theta}|^2=1$.`);
        return;
      }
      let re = 0, im = 0, tr = 1, ti = 0;
      for (let k = 0; k < K; k++) {
        const nr = re + tr, ni = im + ti;
        p.line(re, im, nr, ni, k % 2 ? C('data2') : C('accent'), 2);
        re = nr; im = ni;
        const a = -ti * th / (k + 1), b = tr * th / (k + 1); tr = a; ti = b;
      }
      p.dot(re, im, 4.5, C('ink'));
      p.dot(ex, ey, 5, C('accent'), true);
      say(out, `Tổng $${K}$ số hạng $=${fmt(re, 4)}+${fmt(im, 4)}i$, còn $e^{i\\theta}=${fmt(ex, 4)}+${fmt(ey, 4)}i$. Khoảng cách $${fmt(Math.hypot(re - ex, im - ey), 5)}$.` + (Math.abs(th - Math.PI) < 0.02 ? ' Với $\\theta=\\pi$: $e^{i\\pi}=-1$.' : ''));
    }
    return draw;
  });

  /* ===== 16.2 Tích vô hướng ===== */
  defWidget('inner', 'Tích vô hướng $\\langle f,g\\rangle=\\int_0^1 f g$', 'Vùng tô là tích $f\\cdot g$. Phần dương (đỏ) và âm (xanh) triệt tiêu nhau khi hai hàm trực giao.', (root) => {
    const p = new Plot(root, { xmin: 0, xmax: 1, ymin: -1.2, ymax: 1.2, h: 260, xstep: 0.25 });
    const row = UI.row(root);
    const out = UI.readout(root);
    const T = 2 * Math.PI;
    const PR = {
      a: ['sin 2πx và cos 2πx', (x) => Math.sin(T * x), (x) => Math.cos(T * x)],
      b: ['sin 2πx và sin 4πx', (x) => Math.sin(T * x), (x) => Math.sin(2 * T * x)],
      c: ['sin 2πx và sin 2πx', (x) => Math.sin(T * x), (x) => Math.sin(T * x)],
      d: ['cos 6πx và cos 6πx', (x) => Math.cos(3 * T * x), (x) => Math.cos(3 * T * x)],
      e: ['x và 1', (x) => x, () => 1],
    };
    let k = 'a';
    UI.select(row, 'f, g', Object.entries(PR).map(([k2, v]) => [k2, v[0]]), k, (v) => { k = v; draw(); });
    UI.legend(root, [[C('accent'), 'f'], [C('data2'), 'g'], [C('ink'), 'f·g']]);
    function draw() {
      const [, f, g] = PR[k];
      p.clear();
      for (let i = 0; i < 300; i++) { const x0 = i / 300, x1 = (i + 1) / 300, y = f((x0 + x1) / 2) * g((x0 + x1) / 2); p.rect(x0, 0, x1, y, y >= 0 ? C('band') : C('band2')); }
      p.fn(f, C('accent'), 1.8); p.fn(g, C('data2'), 1.8); p.fn((x) => f(x) * g(x), C('ink'), 1.4, 0, 1, { dash: [4, 3] });
      const v = MathX.integ((x) => f(x) * g(x), 0, 1);
      say(out, `$\\langle f,g\\rangle\\approx${fmt(v, 4)}$. ` + (Math.abs(v) < 1e-6 ? 'Hai hàm **trực giao**.' : k === 'c' || k === 'd' ? '$\\|f\\|_2^2=\\tfrac12$ với hàm sin, cos thực; với $e_n=e^{2\\pi inx}$ thì $\\|e_n\\|=1$.' : 'Không trực giao.'), Math.abs(v) < 1e-6 ? 'good' : '');
    }
    return draw;
  });

  /* ===== 16.4 Tích chập ===== */
  defWidget('convolve', 'Tích chập làm mượt', 'Nhân $K$ (xanh) là một “cái mũ” có diện tích $1$. $f*K$ (đỏ) là trung bình trượt của $f$ theo trọng số $K$. Thu hẹp nhân để $f*K$ gần $f$ hơn.', (root) => {
    const p = new Plot(root, { xmin: 0, xmax: 1, ymin: -0.3, ymax: 1.3, h: 270, xstep: 0.25 });
    const row = UI.row(root);
    const out = UI.readout(root);
    const F = { sqw: ['sóng vuông', (x) => (((x % 1) + 1) % 1 < 0.5 ? 1 : 0)], saw: ['răng cưa', (x) => ((x % 1) + 1) % 1], spike: ['xung hẹp', (x) => (Math.abs((((x % 1) + 1) % 1) - 0.5) < 0.03 ? 1 : 0)] };
    let k = 'sqw', w = 0.12, ker = 'tri';
    UI.select(row, 'f', Object.entries(F).map(([k2, v]) => [k2, v[0]]), k, (v) => { k = v; draw(); });
    UI.select(row, 'Nhân', [['tri', 'tam giác'], ['box', 'hộp']], ker, (v) => { ker = v; draw(); });
    UI.slider(row, 'Bề rộng', 0.01, 0.4, 0.005, w, (v) => { w = v; draw(); }, (v) => fmt(v, 3));
    function draw() {
      const f = F[k][1];
      const K = (t) => { const a = Math.abs(t); return ker === 'box' ? (a < w / 2 ? 1 / w : 0) : (a < w ? (1 - a / w) / w : 0); };
      const conv = (x) => { let s = 0; const M = 400, R = ker === 'box' ? w / 2 : w; for (let i = 0; i < M; i++) { const y = -R + 2 * R * (i + 0.5) / M; s += f(x - y) * K(y); } return s * 2 * R / M; };
      p.clear();
      p.fn(f, C('faint'), 1.6, 0, 1, { join: false });
      const kmax = ker === 'box' ? 1 / w : 1 / w, scale = 0.6 / kmax;
      p.fn((t) => K(t - 0.5) * scale, C('data2'), 1.6);
      p.fn(conv, C('accent'), 2.4);
      let err = 0; for (let i = 0; i <= 200; i++) { const x = i / 200; if (k !== 'sqw' || (Math.abs(x - 0.5) > 0.05 && x > 0.05 && x < 0.95)) err = Math.max(err, Math.abs(conv(x) - f(x))); }
      say(out, `Sai số lớn nhất (tránh xa chỗ nhảy) $\\approx${fmt(err, 4)}$. Nhân xanh vẽ thu nhỏ theo chiều cao để vừa khung. $f*K$ luôn liên tục dù $f$ có bước nhảy.`);
    }
    return draw;
  });

  /* ===== 16.5 Fourier ===== */
  defWidget('fourier', 'Tổng Fourier riêng', 'Tăng số hạng $N$. Với hàm có bước nhảy, đỉnh vọt lố gần chỗ nhảy hẹp lại nhưng không thấp đi (Gibbs). Bật trung bình Fejér để mất vọt lố.', (root) => {
    const p = new Plot(root, { xmin: 0, xmax: 2, ymin: -1.5, ymax: 1.5, h: 260, xstep: 0.25 });
    const q = new Plot(root, { xmin: 0, xmax: 31, ymin: 0, ymax: 1.4, h: 110, xstep: 5 });
    const row = UI.row(root);
    const out = UI.readout(root);
    const W = {
      sq: { t: 'sóng vuông', f: (x) => (((x % 1) + 1) % 1 < 0.5 ? 1 : -1), b: (n) => (n % 2 ? 4 / (Math.PI * n) : 0), a: () => 0 },
      saw: { t: 'răng cưa', f: (x) => 2 * (((x % 1) + 1) % 1) - 1, b: (n) => -2 / (Math.PI * n) * (n % 2 ? -1 : 1) * -1 * -1, a: () => 0 },
      tri: { t: 'tam giác (liên tục)', f: (x) => { const t = ((x % 1) + 1) % 1; return 1 - 4 * Math.abs(t - 0.5); }, b: () => 0, a: (n) => (n % 2 ? -8 / (Math.PI * Math.PI * n * n) * -1 : 0) },
    };
    W.saw.b = (n) => -2 / (Math.PI * n);
    W.tri.a = (n) => (n % 2 ? 8 / (Math.PI * Math.PI * n * n) : 0) * -1 * -1;
    let k = 'sq', N = 5, fej = false;
    UI.select(row, 'Sóng', Object.entries(W).map(([k2, v]) => [k2, v.t]), k, (v) => { k = v; draw(); });
    UI.slider(row, 'N', 1, 80, 1, N, (v) => { N = v; draw(); }, String);
    UI.check(row, 'Trung bình Fejér', fej, (v) => { fej = v; draw(); });
    function draw() {
      const G = W[k], T = 2 * Math.PI;
      const coef = (n) => (fej ? 1 - n / (N + 1) : 1);
      const S = (x) => { let s = 0; for (let n = 1; n <= N; n++) s += coef(n) * (G.b(n) * Math.sin(T * n * x) + G.a(n) * Math.cos(T * n * x)); return s; };
      const sign = k === 'tri' ? -1 : 1;
      const S2 = k === 'tri' ? (x) => -S(x) : S;
      p.clear();
      p.fn(G.f, C('data2'), 1.8, 0, 2);
      p.fn(S2, C('accent'), 2);
      let mx = -Infinity; for (let i = 0; i <= 2000; i++) mx = Math.max(mx, S2(i / 1000));
      let l2 = 0; for (let i = 0; i < 1000; i++) { const x = (i + 0.5) / 1000; l2 += (S2(x) - G.f(x)) ** 2; } l2 = Math.sqrt(l2 / 1000);
      q.set({ xmax: Math.max(31, N + 1) }); q.clear();
      for (let n = 1; n <= Math.max(30, N); n++) { const amp = Math.hypot(G.a(n), G.b(n)); q.rect(n - 0.35, 0, n + 0.35, amp, n <= N ? C('accent') : C('rule-strong')); }
      q.ptext('|hệ số thứ n|', 34, 12, C('muted'));
      void sign;
      say(out, `Sai số $L^2$: $\\|f-S_N\\|_2\\approx${fmt(l2, 4)}$. Giá trị lớn nhất của $S_N$: $${fmt(mx, 4)}$` + (k === 'sq' ? (fej ? ' (Fejér không vọt lố quá $1$).' : `, vọt lố khoảng $${fmt((mx - 1) / 2 * 100, 1)}\\%$ bước nhảy (Gibbs ≈ 9%).`) : '.') + ' Hệ số tam giác giảm như $1/n^2$ nên hội tụ đều; sóng vuông chỉ $1/n$.');
    }
    return draw;
  });

  /* ===== 17.1 / 17.7 Ánh xạ tuyến tính ===== */
  defWidget('linmap', (o) => (o.mode === 'local' ? 'Phóng to thì ánh xạ trơn trông như tuyến tính' : 'Ánh xạ tuyến tính biến lưới thành lưới'), (o) => (o.mode === 'local' ? 'Ánh xạ toạ độ cực $(r,\\theta)\\mapsto(r\\cos\\theta,r\\sin\\theta)$. Lưới đỏ là ảnh của một ô vuông nhỏ quanh $(r_0,\\theta_0)$, lưới xanh đứt là ảnh qua đạo hàm. Thu nhỏ ô để chúng trùng nhau.' : 'Kéo bốn hệ số của ma trận. Hình vuông đơn vị biến thành hình bình hành có diện tích $|\\det|$.'), (root, o) => {
    const p = new Plot(root, { h: sq, xstep: 1, ystep: 1 });
    const row = UI.row(root);
    const out = UI.readout(root);
    if (o.mode === 'local') {
      let r0 = 1.2, t0 = 0.7, s = 0.5;
      UI.slider(row, 'r₀', 0.05, 2, 0.01, r0, (v) => { r0 = v; draw(); });
      UI.slider(row, 'θ₀', 0, 6.28, 0.01, t0, (v) => { t0 = v; draw(); });
      UI.slider(row, 'Cỡ ô', 0.02, 1, 0.01, s, (v) => { s = v; draw(); });
      function draw() {
        const F = (r, t) => [r * Math.cos(t), r * Math.sin(t)];
        const [X0, Y0] = F(r0, t0), J = [[Math.cos(t0), -r0 * Math.sin(t0)], [Math.sin(t0), r0 * Math.cos(t0)]];
        const Lm = (dr, dt) => [X0 + J[0][0] * dr + J[0][1] * dt, Y0 + J[1][0] * dr + J[1][1] * dt];
        p.resize(); square(p, X0, Y0, Math.max(0.15, s * 1.6 * Math.max(1, r0)));
        p.clear();
        for (let i = 0; i <= 6; i++) {
          const u = -s + 2 * s * i / 6;
          p.path(MathX.lin(-s, s, 30).map((v) => F(r0 + u, t0 + v)), C('accent'), 1.6);
          p.path(MathX.lin(-s, s, 30).map((v) => F(r0 + v, t0 + u)), C('accent'), 1.6);
          p.path([Lm(u, -s), Lm(u, s)], C('data2'), 1.2); p.path([Lm(-s, u), Lm(s, u)], C('data2'), 1.2);
        }
        p.dot(X0, Y0, 4, C('ink'));
        const det = r0;
        say(out, `Ma trận Jacobian $\\begin{pmatrix}\\cos\\theta&-r\\sin\\theta\\\\\\sin\\theta&r\\cos\\theta\\end{pmatrix}$ có $\\det=r_0=${fmt(det)}$. ` + (det > 0.06 ? 'Khác $0$ nên địa phương khả nghịch.' : 'Gần $0$: tại gốc toạ độ ánh xạ không khả nghịch địa phương.') + ' Ánh xạ không đơn ánh toàn cục: $\\theta$ và $\\theta+2\\pi$ cho cùng điểm.', det > 0.06 ? '' : 'bad');
      }
      return draw;
    }
    let a = 1.2, b = 0.5, c2 = 0.3, d = 1;
    UI.slider(row, 'a', -2, 2, 0.05, a, (v) => { a = v; draw2(); });
    UI.slider(row, 'b', -2, 2, 0.05, b, (v) => { b = v; draw2(); });
    UI.slider(row, 'c', -2, 2, 0.05, c2, (v) => { c2 = v; draw2(); });
    UI.slider(row, 'd', -2, 2, 0.05, d, (v) => { d = v; draw2(); });
    function draw2() {
      p.resize(); square(p, 0, 0, 3);
      p.clear();
      const T = (x, y) => [a * x + b * y, c2 * x + d * y];
      for (let i = -4; i <= 4; i++) { p.path([T(i, -4), T(i, 4)], C('rule-strong'), 1); p.path([T(-4, i), T(4, i)], C('rule-strong'), 1); }
      p.path([T(0, 0), T(1, 0), T(1, 1), T(0, 1)], C('accent'), 1.5, C('band'));
      p.line(0, 0, ...T(1, 0), C('accent'), 2.6); p.line(0, 0, ...T(0, 1), C('data2'), 2.6);
      p.text('Te₁', ...T(1.08, 0), C('accent')); p.text('Te₂', ...T(0, 1.1), C('data2'));
      const det = a * d - b * c2;
      say(out, `Ma trận $\\begin{pmatrix}${fmt(a)}&${fmt(b)}\\\\${fmt(c2)}&${fmt(d)}\\end{pmatrix}$, cột 1 là $Te_1$, cột 2 là $Te_2$. $\\det=${fmt(det)}$: ` + (Math.abs(det) < 1e-9 ? 'mặt phẳng bị ép thành đường thẳng, không khả nghịch.' : det < 0 ? 'đảo chiều (lật gương), diện tích nhân $' + fmt(Math.abs(det)) + '$.' : 'giữ chiều, diện tích nhân $' + fmt(det) + '$.'), Math.abs(det) < 1e-9 ? 'bad' : '');
    }
    return draw2;
  });

  /* ===== 17.6 Ánh xạ co ===== */
  defWidget('contraction', 'Lặp ánh xạ co (biểu đồ mạng nhện)', 'Từ $x_0$ đi dọc lên đồ thị $g$, ngang sang đường $y=x$, lặp lại. Với ánh xạ co, mạng nhện xoắn vào điểm bất động.', (root) => {
    const p = new Plot(root, { xmin: 0, xmax: 1, ymin: 0, ymax: 1, h: sq });
    const row = UI.row(root);
    const out = UI.readout(root);
    const G = {
      cos: { t: 'cos x trên [0; 1,5] (co)', g: Math.cos, a: 0, b: 1.5, c: 'co, c = sin 1 ≈ 0,84' },
      half: { t: 'x/2 + 1 trên [0; 4] (co)', g: (x) => x / 2 + 1, a: 0, b: 4, c: 'co, c = 1/2' },
      log: { t: '2,8·x(1 − x) trên [0; 1]', g: (x) => 2.8 * x * (1 - x), a: 0, b: 1, c: 'không co trên cả đoạn, nhưng co gần điểm bất động' },
      chaos: { t: '3,9·x(1 − x) trên [0; 1] (không co)', g: (x) => 3.9 * x * (1 - x), a: 0, b: 1, c: 'không co: dãy lặp hỗn loạn' },
    };
    let k = 'cos', x0 = 0.1, K = 12;
    UI.select(row, 'g', Object.entries(G).map(([k2, v]) => [k2, v.t]), k, (v) => { k = v; x0 = G[v].a + 0.1 * (G[v].b - G[v].a); xs.set(0.1); draw(); });
    const xs = UI.slider(row, 'x₀ (vị trí)', 0, 1, 0.001, 0.1, (v) => { x0 = G[k].a + v * (G[k].b - G[k].a); draw(); }, (v) => fmt(G[k].a + v * (G[k].b - G[k].a)));
    UI.slider(row, 'Số bước', 1, 60, 1, K, (v) => { K = v; draw(); }, String);
    function draw() {
      const H = G[k];
      p.resize(); p.set({ xmin: H.a, xmax: H.b, ymin: H.a, ymax: H.b });
      p.clear();
      p.line(H.a, H.a, H.b, H.b, C('rule-strong'), 1.2);
      p.fn(H.g, C('data2'), 2.2, H.a, H.b);
      let x = x0; const pts = [[x, H.a]], it = [x];
      for (let i = 0; i < K; i++) { const y = H.g(x); pts.push([x, y], [y, y]); x = y; it.push(x); }
      p.path(pts, C('accent'), 1.4);
      p.dot(x0, H.a, 4, C('accent'));
      p.dot(x, x, 4.5, C('ink'));
      say(out, `Ánh xạ ${H.c}. Dãy lặp: ${it.slice(0, 7).map((v) => fmt(v, 4)).join(' → ')} … $x_{${K}}=${fmt(x, 6)}$, $|g(x)-x|=${fmt(Math.abs(H.g(x) - x), 6)}$.`, k === 'chaos' ? 'bad' : '');
    }
    return draw;
  });

  /* ===== 17.8 Hàm ẩn ===== */
  defWidget('implicit', 'Đường cong $F(x,y)=0$ là đồ thị cục bộ', 'Bấm gần đường cong để chọn điểm. Đường cong tô đỏ ở những chỗ $\\partial_yF=0$, nơi không viết được $y=g(x)$ quanh đó.', (root) => {
    const p = new Plot(root, { h: sq, xstep: 0.5, ystep: 0.5 });
    const row = UI.row(root);
    const out = UI.readout(root);
    const F = {
      circ: { t: 'x² + y² − 1', F: (x, y) => x * x + y * y - 1, Fx: (x) => 2 * x, Fy: (x, y) => 2 * y, c: [0, 0, 1.5], P: [0.6, 0.8] },
      fol: { t: 'x³ + y³ − 3xy (lá Descartes)', F: (x, y) => x ** 3 + y ** 3 - 3 * x * y, Fx: (x, y) => 3 * x * x - 3 * y, Fy: (x, y) => 3 * y * y - 3 * x, c: [0.4, 0.4, 2.2], P: [1.5, 1.5] },
      lem: { t: '(x² + y²)² − 2(x² − y²)', F: (x, y) => (x * x + y * y) ** 2 - 2 * (x * x - y * y), Fx: (x, y) => 4 * x * (x * x + y * y) - 4 * x, Fy: (x, y) => 4 * y * (x * x + y * y) + 4 * y, c: [0, 0, 1.7], P: [1.2, 0.4] },
    };
    let k = 'circ', P = F.circ.P.slice();
    UI.select(row, 'F', Object.entries(F).map(([k2, v]) => [k2, v.t]), k, (v) => { k = v; P = snap(F[v].P); draw(); });
    function snap([x, y]) { const G = F[k]; for (let i = 0; i < 30; i++) { const v = G.F(x, y), gx = G.Fx(x, y), gy = G.Fy(x, y), n2 = gx * gx + gy * gy; if (n2 < 1e-12) break; x -= v * gx / n2; y -= v * gy / n2; } return [x, y]; }
    p.onPointer((x, y, e) => { if (e.type === 'pointerdown' || e.buttons) { P = snap([x, y]); draw(); } });
    P = snap(P);
    function draw() {
      const G = F[k];
      p.resize(); square(p, G.c[0], G.c[1], G.c[2]);
      p.clear();
      const c = p.ctx, N = 220;
      const xs = MathX.lin(p.o.xmin, p.o.xmax, N), ys = MathX.lin(p.o.ymin, p.o.ymax, N);
      const v = ys.map((y) => xs.map((x) => G.F(x, y)));
      for (let j = 0; j < N - 1; j++) for (let i = 0; i < N - 1; i++) {
        const a = v[j][i], b = v[j][i + 1], cc = v[j + 1][i + 1], d = v[j + 1][i];
        const e = [];
        const it = (x1, y1, v1, x2, y2, v2) => { if ((v1 < 0) !== (v2 < 0)) { const t = v1 / (v1 - v2); e.push([x1 + (x2 - x1) * t, y1 + (y2 - y1) * t]); } };
        it(xs[i], ys[j], a, xs[i + 1], ys[j], b); it(xs[i + 1], ys[j], b, xs[i + 1], ys[j + 1], cc); it(xs[i + 1], ys[j + 1], cc, xs[i], ys[j + 1], d); it(xs[i], ys[j + 1], d, xs[i], ys[j], a);
        for (let m = 0; m + 1 < e.length; m += 2) {
          const mx = (e[m][0] + e[m + 1][0]) / 2, my = (e[m][1] + e[m + 1][1]) / 2;
          const gx = G.Fx(mx, my), gy = G.Fy(mx, my), bad = Math.abs(gy) < 0.12 * Math.hypot(gx, gy) + 1e-3;
          c.strokeStyle = bad ? C('bad') : C('data2'); c.lineWidth = bad ? 3.5 : 2;
          c.beginPath(); c.moveTo(p.X(e[m][0]), p.Y(e[m][1])); c.lineTo(p.X(e[m + 1][0]), p.Y(e[m + 1][1])); c.stroke();
        }
      }
      const [x0, y0] = P, fx = G.Fx(x0, y0), fy = G.Fy(x0, y0), gn = Math.hypot(fx, fy);
      if (gn > 1e-9) { p.line(x0 - fy / gn, y0 + fx / gn, x0 + fy / gn, y0 - fx / gn, C('ink'), 1.2, [4, 3]); p.line(x0, y0, x0 + 0.35 * fx / gn, y0 + 0.35 * fy / gn, C('accent'), 2.2); }
      p.dot(x0, y0, 5.5, C('accent'));
      const ok = Math.abs(fy) > 1e-3 * Math.max(1, gn) && gn > 1e-6;
      say(out, `Tại $(${fmt(x0)},${fmt(y0)})$: $\\partial_xF=${fmt(fx)}$, $\\partial_yF=${fmt(fy)}$. ` + (gn < 1e-6 ? 'Gradient bằng $0$: điểm kỳ dị (đường cong tự cắt), định lý không áp dụng.' : ok ? `Quanh đây đường cong là đồ thị $y=g(x)$ với $g'(x_0)=-\\dfrac{\\partial_xF}{\\partial_yF}=${fmt(-fx / fy)}$ (đường đứt).` : 'Tiếp tuyến thẳng đứng: không viết được $y=g(x)$ quanh đây, nhưng có thể viết $x=h(y)$.'), ok ? 'good' : 'bad');
    }
    return draw;
  });

  /* ===== 18.2 Độ đo ngoài của ℚ ===== */
  defWidget('cover', 'Phủ mọi số hữu tỉ bằng tổng độ dài tuỳ ý nhỏ', 'Đánh số các số hữu tỉ trong $[0,1]$: $q_1,q_2,\\dots$ Phủ $q_j$ bằng khoảng dài $\\varepsilon/2^j$. Tổng độ dài $\\le\\varepsilon$, nên $m^*(\\mathbb Q\\cap[0,1])=0$.', (root) => {
    const p = new Plot(root, { xmin: -0.05, xmax: 1.05, ymin: 0, ymax: 1, h: 220, grid: false });
    const row = UI.row(root);
    const out = UI.readout(root);
    let eps = 0.5, K = 20;
    const Q = []; const seen = new Set();
    for (let q = 1; Q.length < 400; q++) for (let pp = 0; pp <= q; pp++) { const v = pp / q, key = v.toFixed(10); if (!seen.has(key)) { seen.add(key); Q.push(v); } }
    UI.slider(row, 'ε', 0.01, 1, 0.01, eps, (v) => { eps = v; draw(); });
    UI.slider(row, 'Số khoảng', 1, 200, 1, K, (v) => { K = v; draw(); }, String);
    function draw() {
      p.clear();
      p.line(0, 0.08, 1, 0.08, C('axis'), 1);
      p.text('0', 0, 0.02, C('faint'), 'center'); p.text('1', 1, 0.02, C('faint'), 'center');
      let tot = 0;
      for (let j = 0; j < K; j++) {
        const L = eps / 2 ** (j + 1), q = Q[j]; tot += L;
        const yy = 0.16 + (j % 14) * 0.058;
        p.rect(q - L / 2, yy, q + L / 2, yy + 0.035, C('band'), C('accent'));
        p.line(q, 0.06, q, 0.1, C('accent'), 1.5);
      }
      say(out, `Đã phủ $${K}$ số hữu tỉ đầu tiên. Tổng độ dài $=\\varepsilon(1-2^{-${K}})=${fmt(tot, 5)}<\\varepsilon=${fmt(eps)}$. Khoảng thứ $j$ ngắn dần theo cấp số nhân, nên phủ cả vô hạn số hữu tỉ mà tổng vẫn $\\le\\varepsilon$.`);
    }
    return draw;
  });

  /* ===== 19.1 Hàm đơn giản ===== */
  defWidget('simplefn', 'Xấp xỉ từ dưới bằng hàm đơn giản', 'Chia trục **tung** thành bậc $2^{-n}$. $\\varphi_n(x)$ là bậc cao nhất không vượt $f(x)$. Mỗi giá trị của $\\varphi_n$ ứng với một tập $\\{x: f(x)\\in[k2^{-n},(k+1)2^{-n})\\}$.', (root) => {
    const p = new Plot(root, { xmin: 0, xmax: 1, ymin: -0.05, ymax: 1.1, h: 270, xstep: 0.25 });
    const row = UI.row(root);
    const out = UI.readout(root);
    const F = { a: ['sin²(3x) + x/4', (x) => Math.min(1, Math.sin(3 * x) ** 2 * 0.8 + x / 5)], b: ['x²', (x) => x * x], c: ['√x', Math.sqrt] };
    let k = 'a', n = 2;
    UI.select(row, 'f', Object.entries(F).map(([k2, v]) => [k2, v[0]]), k, (v) => { k = v; draw(); });
    UI.slider(row, 'n', 0, 8, 1, n, (v) => { n = v; draw(); }, String);
    function draw() {
      const f = F[k][1], h = 2 ** -n;
      const phi = (x) => Math.floor(f(x) / h) * h;
      p.clear();
      for (let y = 0; y <= 1.0001; y += h) p.line(0, y, 1, y, C('grid'), 1);
      for (let i = 0; i < 600; i++) { const x0 = i / 600, x1 = (i + 1) / 600; p.rect(x0, 0, x1, phi((x0 + x1) / 2), C('band')); }
      p.fn(phi, C('accent'), 2);
      p.fn(f, C('data2'), 2);
      const I = MathX.integ(phi, 0, 1, 4000), If = MathX.integ(f, 0, 1, 4000);
      say(out, `$\\int\\varphi_{${n}}=${fmt(I, 4)}$, $\\int f=${fmt(If, 4)}$, chênh $${fmt(If - I, 4)}\\le2^{-${n}}$. Dãy $\\varphi_n$ tăng dần về $f$: đây là cách định nghĩa $\\int f$ của Lebesgue.`);
    }
    return draw;
  });

  /* ===== 19.2 / 19.4 Lebesgue vs Riemann ===== */
  defWidget('lebesgue', (o) => (o.mode === 'compare' ? 'Riemann chia trục hoành, Lebesgue chia trục tung' : 'Tích phân Lebesgue qua các tập mức'), 'Chế độ Lebesgue: dải ngang ở mức $y_k$ có độ dài bằng độ đo của tập $\\{x: f(x)>y_k\\}$. Cộng các dải lại được tích phân.', (root, o) => {
    const p = new Plot(root, { xmin: 0, xmax: 1, ymin: -0.05, ymax: 1.1, h: 270, xstep: 0.25 });
    const row = UI.row(root);
    const out = UI.readout(root);
    const F = { a: ['dao động', (x) => 0.5 + 0.35 * Math.sin(9 * x) * Math.cos(2 * x)], b: ['x²', (x) => x * x], dir: ['Dirichlet 𝟙_ℚ', null] };
    let k = 'a', n = 8, mode = o.mode === 'compare' ? 'riem' : 'leb';
    UI.select(row, 'f', Object.entries(F).map(([k2, v]) => [k2, v[0]]), k, (v) => { k = v; draw(); });
    UI.select(row, 'Cách chia', [['leb', 'Lebesgue (trục tung)'], ['riem', 'Riemann (trục hoành)']], mode, (v) => { mode = v; draw(); });
    UI.slider(row, 'Số dải', 1, 60, 1, n, (v) => { n = v; draw(); }, String);
    function draw() {
      p.clear();
      if (k === 'dir') {
        const c = p.ctx; c.fillStyle = C('ink'); for (let i = 0; i < 700; i++) { const x = Math.random(); c.fillRect(p.X(x), p.Y(i % 2 ? 1 : 0) - 1, 1.5, 2); }
        say(out, mode === 'leb' ? 'Lebesgue: $f$ chỉ nhận hai giá trị. $\\int f=1\\cdot m(\\mathbb Q\\cap[0,1])+0\\cdot m(\\text{vô tỉ})=1\\cdot0+0=0$.' : 'Riemann: mọi khoảng có sup $=1$, inf $=0$, nên tổng trên $=1$, tổng dưới $=0$. Không khả tích Riemann.', mode === 'leb' ? 'good' : 'bad');
        return;
      }
      const f = F[k][1];
      let S = 0;
      if (mode === 'leb') {
        const top = MathX.supOn(f, 0, 1), h = top / n;
        for (let j = 0; j < n; j++) {
          const yk = j * h; let meas = 0;
          let inRun = false, start = 0;
          for (let i = 0; i <= 800; i++) { const x = i / 800, on = f(x) > yk && i < 800; if (on && !inRun) { inRun = true; start = x; } if (!on && inRun) { inRun = false; p.rect(start, yk, x, yk + h, j % 2 ? C('band') : C('band2'), C('accent')); meas += x - start; } }
          S += h * meas;
        }
      } else {
        for (let i = 0; i < n; i++) { const x0 = i / n, x1 = (i + 1) / n, y = f((x0 + x1) / 2); p.rect(x0, 0, x1, y, i % 2 ? C('band') : C('band2'), C('data2')); S += y / n; }
      }
      p.fn(f, C('ink'), 2.2, 0, 1);
      say(out, `Tổng xấp xỉ $=${fmt(S, 4)}$, tích phân $\\int_0^1f=${fmt(MathX.integ(f, 0, 1), 4)}$. ` + (mode === 'leb' ? 'Mỗi dải: chiều cao $\\times$ độ đo của tập $\\{f>y_k\\}$ (có thể là hợp của nhiều khoảng).' : 'Mỗi cột: độ rộng $\\times$ giá trị tại điểm giữa.'));
    }
    return draw;
  });

  /* ===== 19.5 Fubini ===== */
  defWidget('fubini', 'Đổi thứ tự lấy tổng hai lần', 'Bảng vô hạn $a_{n,m}$ (hiện $8\\times8$ góc trên). Chọn ví dụ để so tổng theo hàng với tổng theo cột.', (root) => {
    const row = UI.row(root);
    const box = el('div', { style: 'overflow-x:auto' }); root.appendChild(box);
    const out = UI.readout(root);
    let k = 'bad';
    UI.select(row, 'Bảng', [['bad', 'aₙ,ₙ = 1, aₙ,ₙ₊₁ = −1 (không tuyệt đối)'], ['good', 'aₙ,ₘ = 1/(2ⁿ·3ᵐ) (tuyệt đối)']], k, (v) => { k = v; draw(); });
    function draw() {
      const A = (n, m) => (k === 'bad' ? (n === m ? 1 : m === n + 1 ? -1 : 0) : 1 / (2 ** n * 3 ** m));
      const show = (v) => (k === 'bad' ? (v === 0 ? '·' : v > 0 ? '1' : '−1') : fmt(v, 4));
      const cs = 'padding:4px 8px;text-align:center;border-bottom:1px solid var(--rule);font-variant-numeric:tabular-nums;font-size:13px;';
      let h = '<table style="border-collapse:collapse"><tr><td></td>';
      for (let m = 1; m <= 8; m++) h += `<td style="${cs}color:var(--faint)">m=${m}</td>`;
      h += `<td style="${cs}color:var(--data2);font-weight:600">∑ hàng</td></tr>`;
      let rowTot = 0;
      for (let n = 1; n <= 8; n++) {
        let rs = 0; for (let m = 1; m <= 400; m++) rs += A(n, m);
        rowTot += rs;
        h += `<tr><td style="${cs}color:var(--faint)">n=${n}</td>`;
        for (let m = 1; m <= 8; m++) h += `<td style="${cs}">${show(A(n, m))}</td>`;
        h += `<td style="${cs}color:var(--data2);font-weight:600">${fmt(rs, 4)}</td></tr>`;
      }
      h += `<tr><td style="${cs}color:var(--accent);font-weight:600">∑ cột</td>`;
      let colTot = 0;
      for (let m = 1; m <= 8; m++) { let s = 0; for (let n = 1; n <= 400; n++) s += A(n, m); colTot += s; h += `<td style="${cs}color:var(--accent);font-weight:600">${fmt(s, 4)}</td>`; }
      box.innerHTML = h + '</tr></table>';
      if (k === 'bad') say(out, 'Mỗi hàng có tổng $0$, nên $\\sum_n\\sum_m a_{n,m}=0$. Cột $1$ có tổng $1$, các cột khác $0$, nên $\\sum_m\\sum_n a_{n,m}=1$. Khác nhau vì $\\sum|a_{n,m}|=\\infty$.', 'bad');
      else say(out, 'Hai thứ tự đều cho $\\sum_n 2^{-n}\\cdot\\sum_m3^{-m}=1\\cdot\\tfrac12=\\tfrac12$. Bảng hội tụ tuyệt đối nên Fubini áp dụng.', 'good');
    }
    return draw;
  });
})();
