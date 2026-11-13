/* Minh hoạ cho Phần I–II (Ch.1–17) và kịch bản tự chạy của chúng. */
(function () {
  const C = (n) => col(n);
  const say = UI.say;
  const sqH = (w) => Math.min(Math.round(w * 0.72), 400);
  function square(p, cx, cy, r) {
    const ar = (p.W - 2 * p.o.pad) / (p.H - 2 * p.o.pad + 6);
    if (ar >= 1) p.set({ xmin: cx - r * ar, xmax: cx + r * ar, ymin: cy - r, ymax: cy + r });
    else p.set({ xmin: cx - r, xmax: cx + r, ymin: cy - r / ar, ymax: cy + r / ar });
  }
  const num = (f, x, h) => (f(x + (h || 1e-5)) - f(x - (h || 1e-5))) / (2 * (h || 1e-5));
  const num2 = (f, x) => (f(x + 1e-3) - 2 * f(x) + f(x - 1e-3)) / 1e-6;
  const sel = (row, label, obj, k, on) => UI.select(row, label, Object.entries(obj).map(([a, v]) => [a, v.t]), k, on);
  const arrow = (p, x1, y1, x2, y2, c, w) => {
    p.line(x1, y1, x2, y2, c, w || 2);
    const X2 = p.X(x2), Y2 = p.Y(y2), a = Math.atan2(Y2 - p.Y(y1), X2 - p.X(x1)), g = p.ctx;
    g.fillStyle = c; g.beginPath(); g.moveTo(X2, Y2); g.lineTo(X2 - 9 * Math.cos(a - 0.4), Y2 - 9 * Math.sin(a - 0.4)); g.lineTo(X2 - 9 * Math.cos(a + 0.4), Y2 - 9 * Math.sin(a + 0.4)); g.fill();
  };

  /* ===== 1.3 Biến đổi đồ thị ===== */
  const BASE = { sq: { t: 'x²', f: (x) => x * x }, abs: { t: '|x|', f: Math.abs }, sqrt: { t: '√x', f: (x) => (x < 0 ? NaN : Math.sqrt(x)) }, sin: { t: 'sin x', f: Math.sin }, exp: { t: 'eˣ', f: Math.exp }, inv: { t: '1/x', f: (x) => 1 / x } };
  defWidget('transform', 'Tịnh tiến, co giãn, lật: $y=a\\,f(b(x-c))+d$', 'Đồ thị mờ là $f$ gốc, đồ thị đỏ là hàm mới. Kéo từng thanh trượt để thấy mỗi tham số làm gì.', (root) => {
    const p = new Plot(root, { xmin: -6, xmax: 6, ymin: -5, ymax: 6, h: 320 });
    const row = UI.row(root), out = UI.readout(root);
    let k = 'sq', a = 1, b = 1, c = 0, d = 0;
    sel(row, 'f', BASE, k, (v) => { k = v; draw(); });
    UI.slider(row, 'a', -3, 3, 0.1, a, (v) => { a = v; draw(); });
    UI.slider(row, 'b', -3, 3, 0.1, b, (v) => { b = Math.abs(v) < 0.1 ? 0.1 : v; draw(); });
    UI.slider(row, 'c', -4, 4, 0.1, c, (v) => { c = v; draw(); });
    UI.slider(row, 'd', -4, 4, 0.1, d, (v) => { d = v; draw(); });
    function draw() {
      const f = BASE[k].f, g = (x) => a * f(b * (x - c)) + d;
      p.clear(); p.fn(f, C('faint'), 1.6); p.fn(g, C('accent'), 2.6);
      const parts = [];
      if (c) parts.push(`dời ${c > 0 ? 'phải' : 'trái'} $${fmt(Math.abs(c))}$`);
      if (d) parts.push(`dời ${d > 0 ? 'lên' : 'xuống'} $${fmt(Math.abs(d))}$`);
      if (Math.abs(a) !== 1) parts.push(`giãn dọc hệ số $${fmt(Math.abs(a))}$`);
      if (a < 0) parts.push('lật qua trục hoành');
      if (Math.abs(b) !== 1) parts.push(`co ngang hệ số $${fmt(Math.abs(b))}$`);
      if (b < 0) parts.push('lật qua trục tung');
      say(out, `$y=${fmt(a)}\\,f(${fmt(b)}(x${c >= 0 ? '-' : '+'}${fmt(Math.abs(c))}))${d >= 0 ? '+' : '-'}${fmt(Math.abs(d))}$ với $f(x)=${BASE[k].t.replace('√x', '\\sqrt x').replace('eˣ', 'e^x').replace('x²', 'x^2')}$: ` + (parts.join(', ') || 'chưa biến đổi gì') + '.');
    }
    return draw;
  });

  /* ===== 1.4 Hàm mũ ===== */
  defWidget('expfam', 'Họ hàm mũ $y=b^x$', 'Kéo cơ số $b$. Đường đứt là tiếp tuyến tại $x=0$, có hệ số góc $\\ln b$. Chỉ khi $b=e$ hệ số góc này đúng bằng $1$.', (root) => {
    const p = new Plot(root, { xmin: -3, xmax: 3, ymin: -0.5, ymax: 6, h: 300 });
    const row = UI.row(root), out = UI.readout(root);
    let b = 2;
    UI.slider(row, 'b', 0.2, 4, 0.01, b, (v) => { b = v; draw(); });
    function draw() {
      p.clear();
      p.fn(Math.exp, C('data2'), 1.4, -3, 3, { dash: [4, 3] });
      p.fn((x) => Math.pow(b, x), C('accent'), 2.6);
      const m = Math.log(b);
      p.line(-3, 1 - 3 * m, 3, 1 + 3 * m, C('ink'), 1.2, [5, 4]);
      p.dot(0, 1, 5, C('ink'));
      say(out, `$b=${fmt(b)}$: ` + (b > 1 ? 'tăng' : b < 1 ? 'giảm' : 'hằng') + `, hệ số góc tại $0$ là $\\ln b=${fmt(m)}$. ` + (Math.abs(b - Math.E) < 0.02 ? 'Đây là $b=e$: hệ số góc bằng $1$.' : 'Đường xanh đứt là $e^x$ để so sánh.'), Math.abs(b - Math.E) < 0.02 ? 'good' : '');
    }
    return draw;
  });

  /* ===== 3.7 Chuyển động thẳng ===== */
  defWidget('motion', 'Vị trí, vận tốc, gia tốc', 'Dải trên là đường thẳng vật chạy. Đồ thị: $s$ (đen), $v=s\'$ (đỏ), $a=s\'\'$ (xanh). Vật đổi chiều khi $v=0$; tăng tốc khi $v$ và $a$ cùng dấu.', (root) => {
    const track = new Plot(root, { xmin: -2, xmax: 22, ymin: -1, ymax: 1, h: 70, grid: false });
    const p = new Plot(root, { xmin: 0, xmax: 6, ymin: -15, ymax: 25, h: 260 });
    const row = UI.row(root), out = UI.readout(root);
    const P = { a: { t: 's = t³ − 6t² + 9t', s: (t) => t ** 3 - 6 * t * t + 9 * t, y: [-15, 25], tr: [-2, 22] }, b: { t: 's = 4 cos t', s: (t) => 4 * Math.cos(t), y: [-5, 5], tr: [-5, 5] }, c: { t: 's = t³ − 12t² + 36t', s: (t) => t ** 3 - 12 * t * t + 36 * t, y: [-40, 40], tr: [-2, 40] } };
    let k = 'a', t = 0.5;
    sel(row, 'Chuyển động', P, k, (v) => { k = v; draw(); });
    UI.slider(row, 't', 0, 6, 0.01, t, (v) => { t = v; draw(); });
    UI.legend(root, [[C('ink'), 's'], [C('accent'), 'v'], [C('data2'), 'a']]);
    function draw() {
      const G = P[k], s = G.s, v = (x) => num(s, x), a = (x) => num2(s, x);
      track.set({ xmin: G.tr[0], xmax: G.tr[1] }); track.clear();
      track.line(G.tr[0], 0, G.tr[1], 0, C('axis'), 1);
      const pts = MathX.lin(0, t, 80).map((x) => [s(x), 0.35 - x * 0.08]);
      track.path(pts, C('band'), 3);
      track.dot(s(t), 0, 8, C('accent'));
      const vv = v(t), aa = a(t);
      arrow(track, s(t), 0, s(t) + Math.sign(vv) * Math.min(Math.abs(vv), (G.tr[1] - G.tr[0]) / 5), 0, C('accent'), 2);
      p.set({ ymin: G.y[0], ymax: G.y[1] }); p.clear();
      p.fn(s, C('ink'), 2.2, 0, 6); p.fn(v, C('accent'), 2, 0, 6); p.fn(a, C('data2'), 1.6, 0, 6);
      p.line(t, G.y[0], t, G.y[1], C('faint'), 1, [3, 3]);
      say(out, `$t=${fmt(t)}$: $s=${fmt(s(t))}$, $v=${fmt(vv)}$, $a=${fmt(aa)}$. ` + (Math.abs(vv) < 0.05 ? 'Vật đang dừng (đổi chiều).' : (vv > 0 ? 'Đi về phía dương' : 'Đi lùi') + (vv * aa > 0 ? ', đang **tăng tốc**.' : ', đang **chậm lại**.')));
    }
    return draw;
  });

  /* ===== 3.8 / 9.x Trường hướng ===== */
  const ODE = {
    exp: { t: "y' = k·y", f: (x, y, k) => k * y, win: [-1, 4, -1, 8], k: [-1.5, 1.5, 0.5], kl: 'k', y0: 1 },
    euler: { t: "y' = x + y", f: (x, y) => x + y, win: [0, 2, 0, 8], exact: (x, x0, y0) => (y0 + x0 + 1) * Math.exp(x - x0) - x - 1, k: [0.05, 0.5, 0.25], kl: 'bước h', y0: 1, euler: true },
    sep: { t: "y' = −x·y", f: (x, y) => -x * y, win: [-3, 3, -3, 3], k: null, y0: 2 },
    logistic: { t: "y' = k·y(1 − y/10)", f: (x, y, k) => k * y * (1 - y / 10), win: [0, 15, -1, 14], k: [0.1, 1.5, 0.6], kl: 'k', y0: 1 },
    cool: { t: "y' = −0,3(y − 20)", f: (x, y) => -0.3 * (y - 20), win: [0, 15, 0, 100], k: null, y0: 90 },
  };
  defWidget('slopefield', (o) => (o.preset === 'euler' ? 'Phương pháp Euler trên trường hướng' : o.preset === 'logistic' ? 'Mô hình logistic' : 'Trường hướng của phương trình vi phân'), (o) => (o.preset === 'euler' ? 'Đường đỏ là nghiệm đúng, các bậc xanh là Euler với bước $h$. Thu nhỏ $h$ để thấy sai số giảm.' : 'Mỗi vạch là độ dốc $y\'$ tại điểm đó. Bấm vào hình để chọn điều kiện ban đầu; đường đỏ là nghiệm đi qua điểm đó.'), (root, o) => {
    const p = new Plot(root, { xmin: 0, xmax: 1, ymin: 0, ymax: 1, h: 310 });
    const row = UI.row(root), out = UI.readout(root);
    let key = o.preset || 'exp', par = ODE[key].k ? ODE[key].k[2] : 0, x0 = ODE[key].win[0], y0 = ODE[key].y0;
    sel(row, 'Phương trình', ODE, key, (v) => { key = v; const E = ODE[v]; x0 = E.win[0]; y0 = E.y0; if (E.k) { par = E.k[2]; ks.input.min = E.k[0]; ks.input.max = E.k[1]; ks.set(par); } draw(); });
    const ks = UI.slider(row, key === 'euler' ? 'bước h' : 'k / h', ODE[key].k ? ODE[key].k[0] : 0, ODE[key].k ? ODE[key].k[1] : 1, 0.01, par, (v) => { par = v; draw(); });
    UI.slider(row, 'y₀', -3, 100, 0.1, y0, (v) => { y0 = v; draw(); });
    p.onPointer((x, y, e) => { if (e.type === 'pointerdown') { x0 = x; y0 = y; draw(); } });
    function rk(f, x, y, h) { const k1 = f(x, y), k2 = f(x + h / 2, y + h * k1 / 2), k3 = f(x + h / 2, y + h * k2 / 2), k4 = f(x + h, y + h * k3); return y + h * (k1 + 2 * k2 + 2 * k3 + k4) / 6; }
    function draw() {
      const E = ODE[key], [a, b, c, d] = E.win, f = (x, y) => E.f(x, y, par);
      p.set({ xmin: a, xmax: b, ymin: c, ymax: d }); p.clear();
      const g = p.ctx; g.strokeStyle = C('faint'); g.lineWidth = 1.2;
      for (let i = 0; i <= 18; i++) for (let j = 0; j <= 14; j++) {
        const x = a + (b - a) * (i + 0.5) / 19, y = c + (d - c) * (j + 0.5) / 15, m = f(x, y);
        const dx = 1, dy = m, sx = p.X(x + dx) - p.X(x), sy = p.Y(y + dy) - p.Y(y), L = Math.hypot(sx, sy) || 1, s = 9 / L;
        g.beginPath(); g.moveTo(p.X(x) - sx * s, p.Y(y) - sy * s); g.lineTo(p.X(x) + sx * s, p.Y(y) + sy * s); g.stroke();
      }
      const path = (dir) => { const pts = [[x0, y0]]; let x = x0, y = y0; const h = (b - a) / 400 * dir; for (let i = 0; i < 400; i++) { y = rk(f, x, y, h); x += h; if (!isFinite(y) || Math.abs(y) > 1e4) break; pts.push([x, y]); } return pts; };
      p.path(path(1), C('accent'), 2.4); p.path(path(-1), C('accent'), 2.4);
      p.dot(x0, y0, 5, C('ink'));
      if (E.euler) {
        const h = par; let x = x0, y = y0; const pts = [[x, y]];
        while (x < b - 1e-9) { y = y + h * f(x, y); x += h; pts.push([x, y]); }
        p.path(pts, C('data2'), 2); pts.forEach(([u, v]) => p.dot(u, v, 3, C('data2')));
        const X = Math.min(b, x0 + 1), n = Math.round((X - x0) / h);
        let ye = y0, xe = x0; for (let i = 0; i < n; i++) { ye += h * f(xe, ye); xe += h; }
        const ex = E.exact(xe, x0, y0);
        say(out, `Tại $x=${fmt(xe)}$: Euler cho $${fmt(ye, 4)}$, nghiệm đúng $${fmt(ex, 4)}$, sai số $${fmt(Math.abs(ex - ye), 4)}$. Giảm $h$ một nửa thì sai số giảm khoảng một nửa.`);
      } else {
        const msg = { exp: par > 0 ? `$k=${fmt(par)}>0$: tăng trưởng mũ $y=y_0e^{kt}$.` : par < 0 ? `$k=${fmt(par)}<0$: suy giảm mũ về $0$.` : 'k = 0: hằng số.', sep: 'Nghiệm $y=Ce^{-x^2/2}$: hình chuông, mọi nghiệm tiến về $0$.', logistic: 'Mọi nghiệm dương tiến về sức chứa $M=10$; tăng nhanh nhất khi $y=5$.', cool: 'Nhiệt độ tiến về nhiệt độ phòng $20^\\circ$ theo hàm mũ.' }[key];
        say(out, `Điều kiện ban đầu $y(${fmt(x0)})=${fmt(y0)}$. ` + msg);
      }
    }
    return draw;
  });

  /* ===== 3.9 Thang trượt ===== */
  defWidget('ladder', 'Thang trượt: tốc độ liên quan', 'Thang dài $5$ m, chân trượt ra xa tường đều $1$ m/s. Đỉnh thang trượt xuống với tốc độ $\\frac{x}{y}$, ngày càng nhanh.', (root) => {
    const p = new Plot(root, { xmin: -0.5, xmax: 6, ymin: -0.5, ymax: 5.5, h: sqH, grid: false });
    const row = UI.row(root), out = UI.readout(root);
    let x = 1;
    UI.slider(row, 'x (m)', 0.1, 4.9, 0.01, x, (v) => { x = v; draw(); });
    function draw() {
      p.resize(); square(p, 2.6, 2.5, 3);
      p.clear();
      p.line(0, 0, 0, 5.5, C('ink'), 3); p.line(0, 0, 6, 0, C('ink'), 3);
      const y = Math.sqrt(25 - x * x);
      p.line(x, 0, 0, y, C('accent'), 4);
      p.dot(x, 0, 5, C('accent')); p.dot(0, y, 5, C('accent'));
      arrow(p, x, -0.25, x + 0.7, -0.25, C('data2'), 2);
      arrow(p, -0.25, y, -0.25, y - Math.min(3, 0.7 * x / y), C('data2'), 2);
      p.text('x = ' + fmt(x), x / 2, 0.25, C('muted'), 'center'); p.text('y = ' + fmt(y), 0.15, y / 2, C('muted'));
      say(out, `$x^2+y^2=25$ nên $x\\,x'+y\\,y'=0$. Với $x'=1$: $y'=-\\frac{x}{y}=-\\frac{${fmt(x)}}{${fmt(y)}}=${fmt(-x / y)}$ m/s.` + (y < 1 ? ' Gần chạm đất, tốc độ lớn bất thường: mô hình không còn đúng.' : ''));
    }
    return draw;
  });

  /* ===== 3.10 Xấp xỉ tuyến tính ===== */
  const LA = { sqrt: { t: '√x tại a = 4', f: Math.sqrt, a: 4 }, sin: { t: 'sin x tại a = 0', f: Math.sin, a: 0 }, exp: { t: 'eˣ tại a = 0', f: Math.exp, a: 0 }, cbrt: { t: '∛x tại a = 8', f: Math.cbrt, a: 8 } };
  defWidget('linapprox', 'Phóng to: đường cong thành tiếp tuyến', 'Thu nhỏ khung nhìn quanh $a$: đồ thị (đỏ) và tiếp tuyến (xanh) gần như không phân biệt được. Kéo $x$ để so $f(x)$ với $L(x)$.', (root) => {
    const p = new Plot(root, { xmin: 0, xmax: 1, ymin: 0, ymax: 1, h: 290 });
    const row = UI.row(root), out = UI.readout(root);
    let k = 'sqrt', z = 2, dx = 0.5;
    sel(row, 'f', LA, k, (v) => { k = v; draw(); });
    UI.slider(row, 'Khung ±', 0.01, 4, 0.01, z, (v) => { z = v; draw(); });
    UI.slider(row, 'x − a', -1, 1, 0.01, dx, (v) => { dx = v; draw(); });
    function draw() {
      const G = LA[k], f = G.f, a = G.a, m = num(f, a), L = (x) => f(a) + m * (x - a);
      p.set({ xmin: a - z, xmax: a + z, ymin: f(a) - z * Math.max(1, Math.abs(m)) * 0.8, ymax: f(a) + z * Math.max(1, Math.abs(m)) * 0.8 });
      p.clear(); p.fn(L, C('data2'), 1.8); p.fn(f, C('accent'), 2.4);
      const x = a + dx * z;
      p.dot(a, f(a), 5, C('ink')); p.dot(x, f(x), 4, C('accent')); p.dot(x, L(x), 4, C('data2'));
      say(out, `$L(x)=${fmt(f(a), 3)}+${fmt(m, 4)}(x-${a})$. Tại $x=${fmt(x, 4)}$: $f=${fmt(f(x), 6)}$, $L=${fmt(L(x), 6)}$, sai số $${fmt(Math.abs(f(x) - L(x)), 6)}$ (tỉ lệ $(x-a)^2$).`);
    }
    return draw;
  });

  /* ===== 3.11 Hàm hyperbolic ===== */
  defWidget('hyperbolic', '$(\\cosh t,\\sinh t)$ chạy trên hypebol', 'Như $(\\cos t,\\sin t)$ chạy trên đường tròn. Vùng tô có diện tích $\\frac t2$ trong cả hai trường hợp.', (root) => {
    const p = new Plot(root, { h: sqH, xstep: 1, ystep: 1 });
    const row = UI.row(root), out = UI.readout(root);
    let t = 1;
    UI.slider(row, 't', -2, 2, 0.01, t, (v) => { t = v; draw(); });
    function draw() {
      p.resize(); square(p, 1.5, 0, 3); p.clear();
      const g = p.ctx; g.beginPath(); g.arc(p.X(0), p.Y(0), p.X(1) - p.X(0), 0, 7); g.strokeStyle = C('rule-strong'); g.lineWidth = 1.4; g.stroke();
      p.path(MathX.lin(-2.2, 2.2, 200).map((u) => [Math.cosh(u), Math.sinh(u)]), C('data2'), 2);
      const pts = [[0, 0]].concat(MathX.lin(0, t, 60).map((u) => [Math.cosh(u), Math.sinh(u)]));
      p.path(pts.concat([[0, 0]]), null, 0, C('band'));
      const ct = Math.cosh(t), st = Math.sinh(t);
      p.line(0, 0, ct, st, C('accent'), 1.6); p.dot(ct, st, 5, C('accent'));
      p.line(ct, 0, ct, st, C('faint'), 1, [3, 3]);
      say(out, `$\\cosh t=${fmt(ct, 4)}$, $\\sinh t=${fmt(st, 4)}$, $\\cosh^2t-\\sinh^2t=${fmt(ct * ct - st * st, 4)}$. Diện tích vùng tô $=\\frac t2=${fmt(t / 2, 3)}$.`);
    }
    return draw;
  });

  /* ===== 4.2 Giá trị trung bình ===== */
  const MV = { cub: { t: 'x³ − x', f: (x) => x ** 3 - x, w: [-2, 2, -3, 3] }, sin: { t: 'sin x + x/3', f: (x) => Math.sin(x) + x / 3, w: [-1, 7, -1.5, 3.5] }, sq: { t: '√x', f: (x) => (x < 0 ? NaN : Math.sqrt(x)), w: [-0.2, 4, -0.3, 2.2] } };
  defWidget('mvt', 'Định lý giá trị trung bình', 'Cát tuyến (xanh) nối hai đầu đoạn $[a,b]$. Các tiếp tuyến đỏ là những điểm $c$ có $f\'(c)$ đúng bằng hệ số góc cát tuyến.', (root) => {
    const p = new Plot(root, { xmin: -2, xmax: 2, ymin: -3, ymax: 3, h: 300 });
    const row = UI.row(root), out = UI.readout(root);
    let k = 'cub', a = 0, b = 2;
    sel(row, 'f', MV, k, (v) => { k = v; a = MV[v].w[0] + 0.3; b = MV[v].w[1] - 0.3; as.set(a); bs.set(b); draw(); });
    const as = UI.slider(row, 'a', -2, 7, 0.01, a, (v) => { a = v; draw(); });
    const bs = UI.slider(row, 'b', -2, 7, 0.01, b, (v) => { b = v; draw(); });
    function draw() {
      const G = MV[k], f = G.f;
      p.set({ xmin: G.w[0], xmax: G.w[1], ymin: G.w[2], ymax: G.w[3] }); p.clear();
      const A = Math.max(G.w[0], Math.min(a, b - 0.05)), B = Math.min(G.w[1], Math.max(b, A + 0.05));
      p.fn(f, C('ink'), 2.2);
      const m = (f(B) - f(A)) / (B - A);
      p.line(A, f(A), B, f(B), C('data2'), 2); p.dot(A, f(A), 4, C('data2')); p.dot(B, f(B), 4, C('data2'));
      const cs = []; let prev = null;
      for (let i = 1; i < 800; i++) { const x = A + (B - A) * i / 800, v = num(f, x) - m; if (prev !== null && Math.sign(v) !== Math.sign(prev)) cs.push(x); prev = v; }
      cs.forEach((c) => { p.line(c - 1, f(c) - m, c + 1, f(c) + m, C('accent'), 1.6); p.dot(c, f(c), 5, C('accent')); });
      say(out, `Hệ số góc cát tuyến $\\frac{f(b)-f(a)}{b-a}=${fmt(m, 4)}$. ` + (cs.length ? 'Điểm $c$: ' + cs.map((c) => '$' + fmt(c, 3) + '$').join(', ') + '.' : 'Chưa tìm thấy (kiểm tra $f$ khả vi trên khoảng).'));
    }
    return draw;
  });

  /* ===== 4.6 Họ hàm số ===== */
  const FAM = { cub: { t: 'x³ + c·x', f: (x, c) => x ** 3 + c * x, w: [-2.5, 2.5, -6, 6] }, quart: { t: 'x⁴ + c·x²', f: (x, c) => x ** 4 + c * x * x, w: [-2.5, 2.5, -5, 6] }, xe: { t: 'x·e^(c·x)', f: (x, c) => x * Math.exp(c * x), w: [-4, 4, -3, 3] } };
  defWidget('family', 'Khảo sát một họ hàm số', 'Kéo tham số $c$. Các đường mờ là vài thành viên khác của họ. Chấm là điểm tới hạn của đường đang chọn.', (root) => {
    const p = new Plot(root, { xmin: -2, xmax: 2, ymin: -3, ymax: 3, h: 300 });
    const row = UI.row(root), out = UI.readout(root);
    let k = 'cub', c = -2;
    sel(row, 'Họ', FAM, k, (v) => { k = v; draw(); });
    UI.slider(row, 'c', -4, 4, 0.01, c, (v) => { c = v; draw(); });
    function draw() {
      const G = FAM[k]; p.set({ xmin: G.w[0], xmax: G.w[1], ymin: G.w[2], ymax: G.w[3] }); p.clear();
      [-3, -1.5, 0, 1.5, 3].forEach((cc) => p.fn((x) => G.f(x, cc), C('rule-strong'), 1));
      const f = (x) => G.f(x, c); p.fn(f, C('accent'), 2.6);
      const crit = []; let prev = null;
      for (let i = 0; i <= 1200; i++) { const x = G.w[0] + (G.w[1] - G.w[0]) * i / 1200, d = num(f, x); if (prev !== null && Math.sign(d) !== Math.sign(prev) && d !== 0) crit.push(x); prev = d; }
      crit.forEach((x) => p.dot(x, f(x), 5, C('ink')));
      say(out, `$c=${fmt(c)}$: ${crit.length} điểm tới hạn` + (crit.length ? ' tại ' + crit.map((x) => '$x\\approx' + fmt(x, 2) + '$').join(', ') : '') + '. ' + (k === 'cub' ? 'Với $x^3+cx$: $c<0$ có hai cực trị, $c\\ge0$ luôn tăng.' : k === 'quart' ? 'Với $x^4+cx^2$: $c<0$ có ba điểm tới hạn (dạng chữ W).' : 'Với $xe^{cx}$: $c\\ne0$ có đúng một cực trị tại $x=-\\frac1c$.'));
    }
    return draw;
  });

  /* ===== 4.7 Hộp không nắp ===== */
  defWidget('boxopt', 'Hộp không nắp lớn nhất', 'Cắt bốn hình vuông cạnh $x$ ở góc tấm bìa $12\\times12$ rồi gập lên. Thể tích $V(x)=x(12-2x)^2$ đạt lớn nhất ở đâu?', (root) => {
    const net = new Plot(root, { xmin: -1, xmax: 13, ymin: -1, ymax: 13, h: 220, grid: false });
    const p = new Plot(root, { xmin: 0, xmax: 6, ymin: 0, ymax: 140, h: 200 });
    const row = UI.row(root), out = UI.readout(root);
    let x = 1;
    UI.slider(row, 'x', 0, 6, 0.01, x, (v) => { x = v; draw(); });
    function draw() {
      net.resize(); square(net, 6, 6, 7); net.clear();
      net.rect(0, 0, 12, 12, C('sunk'), C('rule-strong'));
      [[0, 0], [12 - x, 0], [0, 12 - x], [12 - x, 12 - x]].forEach(([a, b]) => net.rect(a, b, a + x, b + x, C('surface'), C('bad')));
      net.rect(x, x, 12 - x, 12 - x, C('band'), C('accent'));
      p.clear(); p.fn((t) => t * (12 - 2 * t) ** 2, C('accent'), 2.4, 0, 6);
      const V = x * (12 - 2 * x) ** 2; p.dot(x, V, 6, C('ink')); p.dot(2, 128, 4, C('data2'));
      say(out, `$x=${fmt(x)}$: đáy $${fmt(12 - 2 * x)}\\times${fmt(12 - 2 * x)}$, $V=${fmt(V, 2)}$. $V'(x)=(12-2x)(12-6x)=0$ cho $x=2$, $V_{max}=128$ (chấm xanh).`, Math.abs(x - 2) < 0.03 ? 'good' : '');
    }
    return draw;
  });

  /* ===== 4.8 Newton ===== */
  const NW = { sq2: { t: 'x² − 2', f: (x) => x * x - 2, w: [0, 3, -3, 7], x1: 2.6 }, cub: { t: 'x³ − 2x − 5', f: (x) => x ** 3 - 2 * x - 5, w: [1, 3.2, -8, 25], x1: 3 }, cos: { t: 'cos x − x', f: (x) => Math.cos(x) - x, w: [-0.5, 2.5, -3, 1.5], x1: 2 }, bad: { t: '∛x (thất bại)', f: Math.cbrt, w: [-4, 4, -2, 2], x1: 0.5 } };
  defWidget('newton', 'Phương pháp Newton', 'Từ $x_1$, đi theo tiếp tuyến tới trục hoành được $x_2$, lặp lại. Tăng số bước để thấy các điểm dồn về nghiệm rất nhanh.', (root) => {
    const p = new Plot(root, { xmin: 0, xmax: 1, ymin: 0, ymax: 1, h: 300 });
    const row = UI.row(root), out = UI.readout(root);
    let k = 'sq2', x1 = NW.sq2.x1, n = 1;
    sel(row, 'f', NW, k, (v) => { k = v; x1 = NW[v].x1; xs.set(x1); draw(); });
    const xs = UI.slider(row, 'x₁', -4, 4, 0.01, x1, (v) => { x1 = v; draw(); });
    UI.slider(row, 'Số bước', 1, 6, 1, n, (v) => { n = v; draw(); }, String);
    function draw() {
      const G = NW[k], f = G.f; p.set({ xmin: G.w[0], xmax: G.w[1], ymin: G.w[2], ymax: G.w[3] }); p.clear();
      p.fn(f, C('ink'), 2.2);
      let x = x1; const seq = [x];
      for (let i = 0; i < n; i++) {
        const d = num(f, x), y = f(x); if (!isFinite(d) || Math.abs(d) < 1e-12) break;
        const xn = x - y / d;
        p.line(x, 0, x, y, C('faint'), 1, [3, 3]); p.line(x, y, xn, 0, C('accent'), 1.8); p.dot(x, y, 4, C('accent'));
        x = xn; seq.push(x);
      }
      p.dot(x, 0, 5, C('data2'));
      say(out, 'Dãy: ' + seq.map((v, i) => `$x_{${i + 1}}=${fmt(v, 8)}$`).join(', ') + `. $f(x_{${seq.length}})=${fmt(f(x), 8)}$.` + (k === 'bad' ? ' Với $\\sqrt[3]x$, mỗi bước nhân $-2$: dãy phân kỳ.' : ''), k === 'bad' ? 'bad' : '');
    }
    return draw;
  });

  /* ===== 4.9 Nguyên hàm ===== */
  const AD = { cos: { t: "F' = cos x", F: Math.sin, w: [-6, 6, -4, 4] }, lin: { t: "F' = 2x", F: (x) => x * x, w: [-3, 3, -4, 8] }, at: { t: "F' = 1/(1 + x²)", F: Math.atan, w: [-5, 5, -4, 4] } };
  defWidget('antideriv', 'Họ nguyên hàm $F(x)+C$', 'Mọi nguyên hàm là bản dời lên xuống của một nguyên hàm. Chúng song song: cùng hệ số góc tại cùng một $x$. Kéo $C$ để chọn đường đi qua điểm cho trước.', (root) => {
    const p = new Plot(root, { xmin: 0, xmax: 1, ymin: 0, ymax: 1, h: 290 });
    const row = UI.row(root), out = UI.readout(root);
    let k = 'cos', Cc = 0;
    sel(row, '', AD, k, (v) => { k = v; draw(); });
    UI.slider(row, 'C', -3, 3, 0.01, Cc, (v) => { Cc = v; draw(); });
    function draw() {
      const G = AD[k]; p.set({ xmin: G.w[0], xmax: G.w[1], ymin: G.w[2], ymax: G.w[3] }); p.clear();
      for (let c = -3; c <= 3; c += 1) p.fn((x) => G.F(x) + c, C('rule-strong'), 1);
      p.fn((x) => G.F(x) + Cc, C('accent'), 2.6);
      const x = 1; p.dot(x, G.F(x) + Cc, 5, C('ink'));
      say(out, `$F(x)+C$ với $C=${fmt(Cc)}$; đi qua $(1;\\ ${fmt(G.F(1) + Cc)})$. Điều kiện ban đầu xác định duy nhất $C$.`);
    }
    return draw;
  });

  /* ===== 6.1 Diện tích giữa hai đường ===== */
  const BT = { a: { t: 'x và x² trên [0, 1]', f: (x) => x, g: (x) => x * x, a: 0, b: 1 }, b: { t: '2x − x² và x² trên [0, 1]', f: (x) => 2 * x - x * x, g: (x) => x * x, a: 0, b: 1 }, c: { t: 'sin x và cos x trên [0, π/2]', f: Math.sin, g: Math.cos, a: 0, b: Math.PI / 2 }, d: { t: 'x³ và x trên [−1, 1]', f: (x) => x ** 3, g: (x) => x, a: -1, b: 1 } };
  defWidget('between', 'Diện tích giữa hai đường cong', 'Mỗi dải có chiều cao bằng hiệu hai đường. Chỗ hai đường đổi vị trí trên dưới, dải vẫn tính chiều cao dương.', (root) => {
    const p = new Plot(root, { xmin: 0, xmax: 1, ymin: 0, ymax: 1, h: 290 });
    const row = UI.row(root), out = UI.readout(root);
    let k = 'a', n = 12;
    sel(row, 'Hai đường', BT, k, (v) => { k = v; draw(); });
    UI.slider(row, 'Số dải', 4, 80, 1, n, (v) => { n = v; draw(); }, String);
    UI.legend(root, [[C('accent'), 'f'], [C('data2'), 'g']]);
    function draw() {
      const G = BT[k], lo = Math.min(MathX.infOn(G.f, G.a, G.b), MathX.infOn(G.g, G.a, G.b)), hi = Math.max(MathX.supOn(G.f, G.a, G.b), MathX.supOn(G.g, G.a, G.b));
      p.set({ xmin: G.a - 0.1 * (G.b - G.a), xmax: G.b + 0.1 * (G.b - G.a), ymin: lo - 0.15 * (hi - lo), ymax: hi + 0.15 * (hi - lo) }); p.clear();
      const dx = (G.b - G.a) / n;
      for (let i = 0; i < n; i++) { const x = G.a + (i + 0.5) * dx; p.rect(G.a + i * dx, G.f(x), G.a + (i + 1) * dx, G.g(x), G.f(x) >= G.g(x) ? C('band') : C('band2'), C('rule-strong')); }
      p.fn(G.f, C('accent'), 2.4, G.a, G.b); p.fn(G.g, C('data2'), 2.4, G.a, G.b);
      const A = MathX.integ((x) => Math.abs(G.f(x) - G.g(x)), G.a, G.b, 4000);
      say(out, `$A=\\int_a^b|f-g|\\,dx\\approx${fmt(A, 4)}$.`);
    }
    return draw;
  });

  /* ===== 6.2 / 6.3 Vật tròn xoay ===== */
  const SO = { sqrt: { t: 'y = √x trên [0, 4]', f: Math.sqrt, a: 0, b: 4 }, sq: { t: 'y = x² trên [0, 2]', f: (x) => x * x, a: 0, b: 2 }, sin: { t: 'y = sin x trên [0, π]', f: Math.sin, a: 0, b: Math.PI } };
  defWidget('solids', (o) => (o.mode === 'shell' ? 'Thể tích bằng vỏ trụ (quay quanh trục $y$)' : 'Thể tích bằng đĩa (quay quanh trục $x$)'), (o) => (o.mode === 'shell' ? 'Mỗi dải dọc ở vị trí $x$ quay quanh trục $y$ thành một vỏ trụ mỏng, thể tích $\\approx2\\pi x\\,f(x)\\,\\Delta x$.' : 'Mỗi lát dày $\\Delta x$ là một đĩa bán kính $f(x)$, thể tích $\\pi f(x)^2\\Delta x$. Tăng số lát để tổng tiến về thể tích thật.'), (root, o) => {
    const p = new Plot(root, { xmin: 0, xmax: 1, ymin: -1, ymax: 1, h: 300, grid: false });
    const row = UI.row(root), out = UI.readout(root);
    let k = 'sqrt', n = 8;
    sel(row, 'Đường', SO, k, (v) => { k = v; draw(); });
    UI.slider(row, 'Số lát', 2, 60, 1, n, (v) => { n = v; draw(); }, String);
    function draw() {
      const G = SO[k], f = G.f, top = MathX.supOn(f, G.a, G.b), g = p.ctx;
      const shell = o.mode === 'shell';
      if (shell) p.set({ xmin: -G.b * 1.15, xmax: G.b * 1.15, ymin: -top * 0.35, ymax: top * 1.25 });
      else p.set({ xmin: G.a - 0.1, xmax: G.b + 0.3, ymin: -top * 1.3, ymax: top * 1.3 });
      p.clear();
      const dx = (G.b - G.a) / n; let V = 0;
      for (let i = 0; i < n; i++) {
        const x = G.a + (i + 0.5) * dx, r = f(x);
        if (shell) {
          V += 2 * Math.PI * x * r * dx;
          [x, -x].forEach((xx) => p.rect(xx - dx / 2, 0, xx + dx / 2, r, C('band'), C('accent')));
          g.beginPath(); g.ellipse(p.X(0), p.Y(r), p.X(x) - p.X(0), Math.max(2, (p.X(x) - p.X(0)) * 0.18), 0, 0, 7); g.strokeStyle = C('accent'); g.globalAlpha = 0.35; g.stroke(); g.globalAlpha = 1;
        } else {
          V += Math.PI * r * r * dx;
          p.rect(G.a + i * dx, -r, G.a + (i + 1) * dx, r, C('band'), C('accent'));
          g.beginPath(); g.ellipse(p.X(G.a + (i + 1) * dx), p.Y(0), Math.max(2, Math.abs(p.Y(r) - p.Y(0)) * 0.22), Math.abs(p.Y(r) - p.Y(0)), 0, 0, 7); g.fillStyle = C('band2'); g.fill(); g.strokeStyle = C('data2'); g.stroke();
        }
      }
      if (shell) { p.fn(f, C('ink'), 2.2, G.a, G.b); p.fn((x) => f(-x), C('ink'), 2.2, -G.b, -G.a); p.line(0, -top * 0.3, 0, top * 1.2, C('axis'), 1, [5, 4]); }
      else { p.fn(f, C('ink'), 2.2, G.a, G.b); p.fn((x) => -f(x), C('ink'), 2.2, G.a, G.b); p.line(G.a - 0.1, 0, G.b + 0.3, 0, C('axis'), 1, [5, 4]); }
      const exact = shell ? MathX.integ((x) => 2 * Math.PI * x * f(x), G.a, G.b, 4000) : MathX.integ((x) => Math.PI * f(x) ** 2, G.a, G.b, 4000);
      say(out, `Tổng ${n} ${shell ? 'vỏ' : 'đĩa'}: $${fmt(V, 4)}$; thể tích đúng $${shell ? '2\\pi\\int xf(x)dx' : '\\pi\\int f(x)^2dx'}=${fmt(exact, 4)}$.`);
    }
    return draw;
  });

  /* ===== 6.5 Giá trị trung bình ===== */
  const AV = { a: { t: '1 + x² trên [−1, 2]', f: (x) => 1 + x * x, a: -1, b: 2 }, b: { t: 'sin x trên [0, π]', f: Math.sin, a: 0, b: Math.PI }, c: { t: '√x trên [0, 4]', f: Math.sqrt, a: 0, b: 4 } };
  defWidget('avgvalue', 'Giá trị trung bình của hàm số', 'Hình chữ nhật cao $f_{tb}$ (xanh) có cùng diện tích với miền dưới đồ thị (đỏ). Chấm là các điểm $c$ có $f(c)=f_{tb}$.', (root) => {
    const p = new Plot(root, { xmin: 0, xmax: 1, ymin: 0, ymax: 1, h: 280 });
    const row = UI.row(root), out = UI.readout(root);
    let k = 'a';
    sel(row, 'f', AV, k, (v) => { k = v; draw(); });
    function draw() {
      const G = AV[k], top = MathX.supOn(G.f, G.a, G.b);
      p.set({ xmin: G.a - 0.2, xmax: G.b + 0.2, ymin: -0.1 * top, ymax: top * 1.15 }); p.clear();
      const avg = MathX.integ(G.f, G.a, G.b) / (G.b - G.a);
      p.path([[G.a, 0]].concat(MathX.lin(G.a, G.b, 100).map((x) => [x, G.f(x)])).concat([[G.b, 0]]), null, 0, C('band'));
      p.rect(G.a, 0, G.b, avg, C('band2'), C('data2'));
      p.fn(G.f, C('accent'), 2.4, G.a, G.b);
      let prev = null; const cs = [];
      for (let i = 0; i <= 1000; i++) { const x = G.a + (G.b - G.a) * i / 1000, v = G.f(x) - avg; if (prev !== null && Math.sign(v) !== Math.sign(prev)) cs.push(x); prev = v; }
      cs.forEach((c) => p.dot(c, avg, 5, C('ink')));
      say(out, `$f_{tb}=\\frac{1}{b-a}\\int_a^bf=${fmt(avg, 4)}$, đạt tại $c\\approx$ ${cs.map((c) => '$' + fmt(c, 3) + '$').join(', ')}.`);
    }
    return draw;
  });

  /* ===== 7.7 Tích phân gần đúng ===== */
  const AI = { inv: { t: '1/x trên [1, 2]', f: (x) => 1 / x, a: 1, b: 2, I: Math.LN2 }, ex2: { t: 'e^(x²) trên [0, 1]', f: (x) => Math.exp(x * x), a: 0, b: 1, I: 1.4626517459 }, sin: { t: 'sin x trên [0, π]', f: Math.sin, a: 0, b: Math.PI, I: 2 } };
  defWidget('approxint', 'Quy tắc điểm giữa, hình thang, Simpson', 'Chọn quy tắc và số khoảng $n$. Simpson thay mỗi cặp khoảng bằng một cung parabol nên chính xác hơn hẳn.', (root) => {
    const p = new Plot(root, { xmin: 0, xmax: 1, ymin: 0, ymax: 1, h: 280 });
    const row = UI.row(root), out = UI.readout(root);
    let k = 'inv', m = 'T', n = 4;
    sel(row, 'f', AI, k, (v) => { k = v; draw(); });
    UI.select(row, 'Quy tắc', [['L', 'Đầu mút trái'], ['M', 'Điểm giữa'], ['T', 'Hình thang'], ['S', 'Simpson']], m, (v) => { m = v; draw(); });
    UI.slider(row, 'n', 2, 40, 2, n, (v) => { n = v; draw(); }, String);
    const tbl = el('table', { class: 'wtable' }); root.appendChild(tbl);
    const rule = (f, a, b, n, m) => { const h = (b - a) / n; let s = 0; if (m === 'L') { for (let i = 0; i < n; i++) s += f(a + i * h); return s * h; } if (m === 'M') { for (let i = 0; i < n; i++) s += f(a + (i + 0.5) * h); return s * h; } if (m === 'T') { s = (f(a) + f(b)) / 2; for (let i = 1; i < n; i++) s += f(a + i * h); return s * h; } s = f(a) + f(b); for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * f(a + i * h); return s * h / 3; };
    function draw() {
      const G = AI[k], f = G.f, top = MathX.supOn(f, G.a, G.b);
      p.set({ xmin: G.a - 0.05 * (G.b - G.a), xmax: G.b + 0.05 * (G.b - G.a), ymin: 0, ymax: top * 1.15 }); p.clear();
      const h = (G.b - G.a) / n;
      for (let i = 0; i < n; i++) {
        const x0 = G.a + i * h, x1 = x0 + h;
        if (m === 'L') p.rect(x0, 0, x1, f(x0), C('band'), C('accent'));
        else if (m === 'M') p.rect(x0, 0, x1, f((x0 + x1) / 2), C('band'), C('accent'));
        else if (m === 'T') p.path([[x0, 0], [x0, f(x0)], [x1, f(x1)], [x1, 0]], C('accent'), 1, C('band'));
        else if (i % 2 === 0) { const xm = x1, x2 = x0 + 2 * h, y0 = f(x0), ym = f(xm), y2 = f(x2); const q = (x) => { const t = (x - x0) / h; return y0 * (t - 1) * (t - 2) / 2 - ym * t * (t - 2) + y2 * t * (t - 1) / 2; }; p.path([[x0, 0]].concat(MathX.lin(x0, x2, 30).map((x) => [x, q(x)])).concat([[x2, 0]]), C('accent'), 1, C('band')); }
      }
      p.fn(f, C('ink'), 2.2, G.a, G.b);
      const v = rule(f, G.a, G.b, n, m);
      say(out, `Xấp xỉ $=${fmt(v, 6)}$, đúng $=${fmt(G.I, 6)}$, sai số $${fmt(Math.abs(v - G.I), 7)}$.`);
      tbl.innerHTML = '<tr><th>n = ' + n + '</th><th>Trái</th><th>Điểm giữa</th><th>Hình thang</th><th>Simpson</th></tr><tr><td>sai số</td>' + ['L', 'M', 'T', 'S'].map((r) => '<td>' + Math.abs(rule(f, G.a, G.b, n, r) - G.I).toExponential(2).replace('.', ',') + '</td>').join('') + '</tr>';
    }
    return draw;
  });

  /* ===== 7.8 Tích phân suy rộng ===== */
  const IM = { sq: { t: '1/x² trên [1, ∞)', f: (x) => 1 / (x * x), a: 1, up: true, I: 1, w: [0, 20, -0.1, 1.1] }, inv: { t: '1/x trên [1, ∞)', f: (x) => 1 / x, a: 1, up: true, I: Infinity, w: [0, 20, -0.1, 1.1] }, ex: { t: 'e^(−x) trên [0, ∞)', f: (x) => Math.exp(-x), a: 0, up: true, I: 1, w: [0, 10, -0.1, 1.1] }, rs: { t: '1/√x trên (0, 1]', f: (x) => 1 / Math.sqrt(x), a: 1, up: false, I: 2, w: [0, 1.1, -0.2, 8] } };
  defWidget('improper', 'Tích phân suy rộng là giới hạn', 'Kéo cận $t$ ra xa (hoặc sát điểm xấu). Nếu diện tích tô màu tiến về một số hữu hạn thì tích phân hội tụ.', (root) => {
    const p = new Plot(root, { xmin: 0, xmax: 1, ymin: 0, ymax: 1, h: 280 });
    const row = UI.row(root), out = UI.readout(root);
    let k = 'sq', s = 0.3;
    sel(row, 'f', IM, k, (v) => { k = v; draw(); });
    UI.slider(row, 't (vị trí)', 0, 1, 0.001, s, (v) => { s = v; draw(); }, (v) => fmt(v, 2));
    function draw() {
      const G = IM[k]; p.set({ xmin: G.w[0], xmax: G.w[1], ymin: G.w[2], ymax: G.w[3] }); p.clear();
      const t = G.up ? G.a + 1 + s * (Math.pow(10, 3) - 1) * Math.pow(s, 2) : Math.pow(10, -4 * s);
      const lo = G.up ? G.a : t, hi = G.up ? t : G.a;
      const vis = [Math.max(lo, G.w[0] + 1e-6), Math.min(hi, G.w[1])];
      p.path([[vis[0], 0]].concat(MathX.lin(vis[0], vis[1], 200).map((x) => [x, Math.min(G.f(x), G.w[3] * 2)])).concat([[vis[1], 0]]), null, 0, C('band'));
      p.fn(G.f, C('accent'), 2.4, Math.max(0.001, G.w[0]), G.w[1]);
      const val = MathX.integ(G.f, lo, hi, 20000);
      say(out, `$\\int$ trên $[${fmt(lo, 4)};\\ ${fmt(hi, 4)}]$ $\\approx${fmt(val, 4)}$. ` + (isFinite(G.I) ? `Giới hạn là $${G.I}$: hội tụ.` : 'Tăng như $\\ln t$, không bị chặn: phân kỳ.'), isFinite(G.I) ? '' : 'bad');
    }
    return draw;
  });

  /* ===== 8.1 Độ dài cung ===== */
  const AL = { sq: { t: 'y = x² trên [0, 2]', f: (x) => x * x, a: 0, b: 2 }, sin: { t: 'y = sin x trên [0, 2π]', f: Math.sin, a: 0, b: 2 * Math.PI }, p32: { t: 'y = x^(3/2) trên [1, 4]', f: (x) => Math.pow(x, 1.5), a: 1, b: 4 } };
  defWidget('arclength', 'Độ dài cung bằng đường gấp khúc', 'Nối $n$ điểm trên đồ thị bằng đoạn thẳng. Tổng độ dài các đoạn tăng dần về độ dài cung $\\int\\sqrt{1+f\'(x)^2}\\,dx$.', (root) => {
    const p = new Plot(root, { xmin: 0, xmax: 1, ymin: 0, ymax: 1, h: 280 });
    const row = UI.row(root), out = UI.readout(root);
    let k = 'sq', n = 3;
    sel(row, 'Đường', AL, k, (v) => { k = v; draw(); });
    UI.slider(row, 'Số đoạn', 1, 60, 1, n, (v) => { n = v; draw(); }, String);
    function draw() {
      const G = AL[k], lo = MathX.infOn(G.f, G.a, G.b), hi = MathX.supOn(G.f, G.a, G.b);
      p.set({ xmin: G.a - 0.1 * (G.b - G.a), xmax: G.b + 0.1 * (G.b - G.a), ymin: lo - 0.15 * (hi - lo), ymax: hi + 0.15 * (hi - lo) }); p.clear();
      p.fn(G.f, C('faint'), 3, G.a, G.b);
      const xs = MathX.lin(G.a, G.b, n + 1), pts = xs.map((x) => [x, G.f(x)]);
      p.path(pts, C('accent'), 2.2); pts.forEach(([x, y]) => p.dot(x, y, 3.5, C('accent')));
      let L = 0; for (let i = 1; i < pts.length; i++) L += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
      const ex = MathX.integ((x) => Math.sqrt(1 + num(G.f, x) ** 2), G.a, G.b, 4000);
      say(out, `Đường gấp khúc ${n} đoạn: $${fmt(L, 5)}$; độ dài cung $\\approx${fmt(ex, 5)}$.`);
    }
    return draw;
  });

  /* ===== 8.5 Mật độ xác suất ===== */
  defWidget('density', 'Xác suất là diện tích dưới mật độ', 'Chọn phân phối và khoảng $[a,b]$. Diện tích tô màu là xác suất biến ngẫu nhiên rơi vào khoảng đó; tổng diện tích luôn bằng $1$.', (root) => {
    const p = new Plot(root, { xmin: -4, xmax: 4, ymin: 0, ymax: 0.5, h: 260 });
    const row = UI.row(root), out = UI.readout(root);
    let k = 'norm', mu = 0, sg = 1, a = -1, b = 1;
    UI.select(row, 'Phân phối', [['norm', 'Chuẩn'], ['exp', 'Mũ (thời gian chờ)']], k, (v) => { k = v; draw(); });
    UI.slider(row, 'μ', -2, 3, 0.1, mu, (v) => { mu = v; draw(); });
    UI.slider(row, 'σ', 0.3, 2, 0.05, sg, (v) => { sg = v; draw(); });
    UI.slider(row, 'a', -4, 6, 0.05, a, (v) => { a = v; draw(); });
    UI.slider(row, 'b', -4, 6, 0.05, b, (v) => { b = v; draw(); });
    function draw() {
      const m = Math.max(0.3, mu), f = k === 'norm' ? (x) => Math.exp(-((x - mu) ** 2) / (2 * sg * sg)) / (sg * Math.sqrt(2 * Math.PI)) : (x) => (x < 0 ? 0 : Math.exp(-x / m) / m);
      const top = k === 'norm' ? 1 / (sg * Math.sqrt(2 * Math.PI)) : 1 / m;
      p.set({ xmin: k === 'norm' ? mu - 4 * sg : -0.5, xmax: k === 'norm' ? mu + 4 * sg : 6 * m, ymin: 0, ymax: top * 1.15 }); p.clear();
      const lo = Math.min(a, b), hi = Math.max(a, b);
      p.path([[lo, 0]].concat(MathX.lin(lo, hi, 150).map((x) => [x, f(x)])).concat([[hi, 0]]), null, 0, C('band'));
      p.fn(f, C('accent'), 2.4);
      const P = MathX.integ(f, lo, hi, 4000);
      say(out, `$P(${fmt(lo)}\\le X\\le${fmt(hi)})\\approx${fmt(P, 4)}$. ` + (k === 'norm' ? `Trung bình $\\mu=${fmt(mu)}$; khoảng $\\mu\\pm\\sigma$ chứa khoảng $68\\%$.` : `Trung bình $${fmt(m)}$; $P(X>t)=e^{-t/\\mu}$.`));
    }
    return draw;
  });

  /* ===== 9.6 Thú – mồi ===== */
  defWidget('predprey', 'Hệ thú – mồi Lotka–Volterra', 'Trên: số mồi (đỏ, đơn vị trăm) và số thú (xanh) theo thời gian. Dưới: mặt phẳng pha, quỹ đạo khép kín quanh điểm cân bằng.', (root) => {
    const p = new Plot(root, { xmin: 0, xmax: 200, ymin: 0, ymax: 200, h: 200 });
    const q = new Plot(root, { xmin: 0, xmax: 4000, ymin: 0, ymax: 200, h: 220 });
    const row = UI.row(root), out = UI.readout(root);
    let R0 = 1500, W0 = 60;
    UI.slider(row, 'Mồi ban đầu', 200, 3000, 10, R0, (v) => { R0 = v; draw(); }, String);
    UI.slider(row, 'Thú ban đầu', 10, 150, 1, W0, (v) => { W0 = v; draw(); }, String);
    const k = 0.08, a = 0.001, r = 0.02, b = 0.00002;
    function draw() {
      const F = (R, W) => [k * R - a * R * W, -r * W + b * R * W];
      let R = R0, W = W0; const h = 0.2, T = [], PH = [];
      for (let i = 0; i <= 2000; i++) {
        if (i % 4 === 0) { T.push([i * h, R / 100, W]); PH.push([R, W]); }
        const k1 = F(R, W), k2 = F(R + h * k1[0] / 2, W + h * k1[1] / 2), k3 = F(R + h * k2[0] / 2, W + h * k2[1] / 2), k4 = F(R + h * k3[0], W + h * k3[1]);
        R += h * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]) / 6; W += h * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]) / 6;
      }
      const ymax = Math.max(...T.map((t) => Math.max(t[1], t[2]))) * 1.1;
      p.set({ xmax: 400, ymax }); p.clear();
      p.path(T.map((t) => [t[0], t[1]]), C('accent'), 2); p.path(T.map((t) => [t[0], t[2]]), C('data2'), 2);
      q.set({ xmax: Math.max(...PH.map((x) => x[0])) * 1.1, ymax: Math.max(...PH.map((x) => x[1])) * 1.1 }); q.clear();
      q.path(PH, C('ink'), 1.8); q.dot(1000, 80, 5, C('accent')); q.dot(R0, W0, 4, C('data2'));
      say(out, 'Điểm cân bằng $(R,W)=(\\frac rb,\\frac ka)=(1000,80)$ (chấm đỏ). Đỉnh số thú luôn đến **sau** đỉnh số mồi.');
    }
    return draw;
  });

  /* ===== 10.1 / 10.2 Đường cong tham số ===== */
  const PC = {
    circ: { t: 'đường tròn (cos t, sin t)', x: Math.cos, y: Math.sin, T: 2 * Math.PI, c: [0, 0, 1.4] },
    cyc: { t: 'cycloid (t − sin t, 1 − cos t)', x: (t) => t - Math.sin(t), y: (t) => 1 - Math.cos(t), T: 4 * Math.PI, c: [6.3, 1, 7] },
    liss: { t: 'Lissajous (sin 3t, sin 2t)', x: (t) => Math.sin(3 * t), y: (t) => Math.sin(2 * t), T: 2 * Math.PI, c: [0, 0, 1.3] },
    loop: { t: '(t² − 3, t³ − 3t)', x: (t) => t * t - 3, y: (t) => t ** 3 - 3 * t, T: 2.2, T0: -2.2, c: [0, 0, 4] },
  };
  defWidget('param', (o) => (o.mode === 'tangent' ? 'Tiếp tuyến của đường cong tham số' : 'Đường cong tham số'), (o) => (o.mode === 'tangent' ? 'Mũi tên là vectơ vận tốc $(x\'(t),y\'(t))$; hệ số góc tiếp tuyến $\\frac{dy}{dx}=\\frac{y\'}{x\'}$.' : 'Kéo $t$: điểm $(x(t),y(t))$ vẽ ra đường cong theo một hướng xác định.'), (root, o) => {
    const p = new Plot(root, { h: sqH });
    const row = UI.row(root), out = UI.readout(root);
    let k = o.mode === 'tangent' ? 'loop' : 'cyc', s = 0.6;
    sel(row, 'Đường', PC, k, (v) => { k = v; draw(); });
    UI.slider(row, 't (vị trí)', 0, 1, 0.001, s, (v) => { s = v; draw(); }, (v) => fmt(v, 2));
    function draw() {
      const G = PC[k], t0 = G.T0 || 0, t = t0 + (G.T - t0) * s;
      p.resize(); square(p, G.c[0], G.c[1], G.c[2]); p.clear();
      p.path(MathX.lin(t0, G.T, 400).map((u) => [G.x(u), G.y(u)]), C('rule-strong'), 1.4);
      p.path(MathX.lin(t0, t, 300).map((u) => [G.x(u), G.y(u)]), C('accent'), 2.6);
      const x = G.x(t), y = G.y(t), dx = num(G.x, t), dy = num(G.y, t);
      p.dot(x, y, 6, C('accent'));
      if (o.mode === 'tangent') { const L = Math.hypot(dx, dy) || 1, s2 = G.c[2] * 0.35 / Math.max(1, L) * L; arrow(p, x, y, x + dx / L * s2, y + dy / L * s2, C('data2'), 2.2); p.line(x - dx * 10, y - dy * 10, x + dx * 10, y + dy * 10, C('faint'), 1, [4, 3]); }
      say(out, `$t=${fmt(t, 3)}$: $(x,y)=(${fmt(x)},${fmt(y)})$, $x'=${fmt(dx)}$, $y'=${fmt(dy)}$, $\\frac{dy}{dx}=${Math.abs(dx) < 1e-6 ? '\\infty' : fmt(dy / dx)}$.` + (Math.abs(dx) < 0.02 && Math.abs(dy) < 0.02 ? ' Vận tốc bằng $0$: có thể có điểm nhọn.' : ''));
    }
    return draw;
  });

  /* ===== 10.3 / 10.4 Toạ độ cực ===== */
  const PO = {
    card: { t: 'r = 1 + cos θ (hình tim)', r: (q) => 1 + Math.cos(q), T: 2 * Math.PI, R: 2.2 },
    rose2: { t: 'r = cos 2θ (4 cánh)', r: (q) => Math.cos(2 * q), T: 2 * Math.PI, R: 1.2 },
    rose3: { t: 'r = cos 3θ (3 cánh)', r: (q) => Math.cos(3 * q), T: Math.PI, R: 1.2 },
    lima: { t: 'r = 1 + 2 sin θ (vỏ ốc)', r: (q) => 1 + 2 * Math.sin(q), T: 2 * Math.PI, R: 3.2 },
    spir: { t: 'r = θ/4 (xoắn ốc)', r: (q) => q / 4, T: 6 * Math.PI, R: 5 },
  };
  defWidget('polar', (o) => (o.mode === 'area' ? 'Diện tích trong toạ độ cực' : 'Vẽ đường cong cực'), (o) => (o.mode === 'area' ? 'Vùng tô gồm các hình quạt mỏng diện tích $\\frac12r^2\\,d\\theta$ khi $\\theta$ chạy từ $0$.' : 'Tia quay theo góc $\\theta$, điểm nằm cách gốc $r(\\theta)$. Khi $r<0$, điểm nằm ở phía đối diện của tia.'), (root, o) => {
    const p = new Plot(root, { h: sqH, xstep: 0.5, ystep: 0.5 });
    const row = UI.row(root), out = UI.readout(root);
    let k = o.mode === 'area' ? 'card' : 'rose3', s = 0.4;
    sel(row, 'Đường', PO, k, (v) => { k = v; draw(); });
    UI.slider(row, 'θ (vị trí)', 0, 1, 0.001, s, (v) => { s = v; draw(); }, (v) => Math.round(v * PO[k].T * 180 / Math.PI) + '°');
    function draw() {
      const G = PO[k], th = G.T * s;
      p.resize(); square(p, 0, 0, G.R); p.clear();
      const pt = (q) => [G.r(q) * Math.cos(q), G.r(q) * Math.sin(q)];
      if (o.mode === 'area') p.path([[0, 0]].concat(MathX.lin(0, th, 200).map(pt)).concat([[0, 0]]), null, 0, C('band'));
      p.path(MathX.lin(0, G.T, 600).map(pt), C('rule-strong'), 1.4);
      p.path(MathX.lin(0, th, 400).map(pt), C('accent'), 2.6);
      p.line(0, 0, G.R * 1.5 * Math.cos(th), G.R * 1.5 * Math.sin(th), C('faint'), 1, [4, 4]);
      const [x, y] = pt(th); p.line(0, 0, x, y, C('data2'), 1.6); p.dot(x, y, 6, C('accent'));
      const A = MathX.integ((q) => G.r(q) ** 2 / 2, 0, th, 2000);
      say(out, `$\\theta=${fmt(th, 3)}$, $r=${fmt(G.r(th), 3)}$` + (G.r(th) < 0 ? ' (âm: điểm nằm đối diện tia)' : '') + (o.mode === 'area' ? `. Diện tích quét $\\frac12\\int_0^\\theta r^2d\\theta=${fmt(A, 4)}$` + (k === 'card' ? '; cả hình tim $\\frac{3\\pi}2\\approx4{,}712$.' : '.') : '.'));
    }
    return draw;
  });

  /* ===== 10.5 / 10.6 Conic ===== */
  defWidget('conic', 'Conic qua tâm sai $e$', 'Tiêu điểm $F$ ở gốc, đường chuẩn $x=d$. Mọi điểm $P$ trên đường cong có $\\frac{|PF|}{|Pl|}=e$. Kéo $e$ qua $1$ để elip mở thành parabol rồi hypebol.', (root) => {
    const p = new Plot(root, { h: sqH });
    const row = UI.row(root), out = UI.readout(root);
    let e = 0.6, s = 0.3; const d = 2;
    UI.slider(row, 'e', 0, 2, 0.01, e, (v) => { e = v; draw(); });
    UI.slider(row, 'P (vị trí)', 0, 1, 0.001, s, (v) => { s = v; draw(); }, (v) => fmt(v, 2));
    function draw() {
      p.resize(); square(p, -1.5, 0, 4.5); p.clear();
      const r = (q) => (e * d) / (1 + e * Math.cos(q));
      p.line(d, -20, d, 20, C('data2'), 1.6, [6, 4]);
      if (e < 0.001) { const g = p.ctx; g.beginPath(); g.arc(p.X(0), p.Y(0), 0, 0, 7); }
      let seg = [];
      for (let i = 0; i <= 1400; i++) { const q = -Math.PI + 2 * Math.PI * i / 1400, R = r(q); if (R > 0 && R < 60) seg.push([R * Math.cos(q), R * Math.sin(q)]); else { if (seg.length > 1) p.path(seg, C('accent'), 2.4); seg = []; } }
      if (seg.length > 1) p.path(seg, C('accent'), 2.4);
      p.dot(0, 0, 5, C('ink')); p.text('F', 0.15, -0.35, C('ink'));
      let q = -Math.PI + 2 * Math.PI * s; if (r(q) <= 0 || r(q) > 40) q = 0.3;
      const R = r(q), x = R * Math.cos(q), y = R * Math.sin(q);
      if (R > 0 && R < 40) { p.line(0, 0, x, y, C('accent'), 1.2, [3, 3]); p.line(x, y, d, y, C('data2'), 1.2, [3, 3]); p.dot(x, y, 5, C('accent')); }
      const type = e < 0.005 ? 'đường tròn (suy biến về điểm khi $d$ cố định)' : e < 1 ? 'elip' : Math.abs(e - 1) < 0.01 ? 'parabol' : 'hypebol';
      say(out, `$r=\\dfrac{ed}{1+e\\cos\\theta}$ với $e=${fmt(e)}$, $d=2$: **${type}**. Tại $P$: $|PF|=${fmt(R)}$, $|Pl|=${fmt(d - x)}$, tỉ số $${fmt(R / (d - x))}$.`);
    }
    return draw;
  });

  /* ===== 12.2 / 12.3 Vectơ ===== */
  defWidget('vectors', (o) => (o.mode === 'dot' ? 'Tích vô hướng và hình chiếu' : 'Cộng vectơ'), (o) => (o.mode === 'dot' ? 'Kéo đầu hai vectơ. Đoạn xanh là hình chiếu của $\\vec b$ lên $\\vec a$; tích vô hướng bằng $0$ khi hai vectơ vuông góc.' : 'Kéo đầu hai vectơ $\\vec a$ (đỏ), $\\vec b$ (xanh). Tổng là đường chéo hình bình hành.'), (root, o) => {
    const p = new Plot(root, { h: sqH, xstep: 1, ystep: 1 });
    const out = UI.readout(root);
    let A = [3, 1], B = [1, 2.5], drag = null;
    p.onPointer((x, y, e) => { if (e.type === 'pointerdown') drag = Math.hypot(x - A[0], y - A[1]) < Math.hypot(x - B[0], y - B[1]) ? A : B; if (drag) { drag[0] = Math.round(x * 4) / 4; drag[1] = Math.round(y * 4) / 4; draw(); } });
    function draw() {
      p.resize(); square(p, 1.2, 1.2, 4); p.clear();
      const [a1, a2] = A, [b1, b2] = B, dot = a1 * b1 + a2 * b2, la = Math.hypot(a1, a2), lb = Math.hypot(b1, b2);
      if (o.mode === 'dot') {
        const k = dot / (la * la), px = k * a1, py = k * a2;
        p.line(-10 * a1, -10 * a2, 10 * a1, 10 * a2, C('rule-strong'), 1, [4, 4]);
        p.line(b1, b2, px, py, C('faint'), 1, [3, 3]);
        p.line(0, 0, px, py, C('data2'), 5);
      } else {
        p.line(a1, a2, a1 + b1, a2 + b2, C('faint'), 1.2, [4, 3]); p.line(b1, b2, a1 + b1, a2 + b2, C('faint'), 1.2, [4, 3]);
        arrow(p, 0, 0, a1 + b1, a2 + b2, C('ink'), 2.4);
      }
      arrow(p, 0, 0, a1, a2, C('accent'), 2.6); arrow(p, 0, 0, b1, b2, C('data2'), 2.6);
      p.text('a', a1 + 0.15, a2 + 0.2, C('accent')); p.text('b', b1 + 0.15, b2 + 0.2, C('data2'));
      const ang = Math.acos(Math.max(-1, Math.min(1, dot / (la * lb || 1)))) * 180 / Math.PI;
      say(out, o.mode === 'dot' ? `$\\vec a\\cdot\\vec b=${fmt(dot)}$, $|\\vec a|=${fmt(la)}$, $|\\vec b|=${fmt(lb)}$, góc $\\approx${fmt(ang, 1)}^\\circ$. Hình chiếu vô hướng $\\frac{\\vec a\\cdot\\vec b}{|\\vec a|}=${fmt(dot / la)}$.` + (Math.abs(dot) < 0.01 ? ' **Vuông góc.**' : '') : `$\\vec a=\\langle${fmt(a1)},${fmt(a2)}\\rangle$, $\\vec b=\\langle${fmt(b1)},${fmt(b2)}\\rangle$, $\\vec a+\\vec b=\\langle${fmt(a1 + b1)},${fmt(a2 + b2)}\\rangle$, $|\\vec a+\\vec b|=${fmt(Math.hypot(a1 + b1, a2 + b2))}\\le|\\vec a|+|\\vec b|=${fmt(la + lb)}$.`, Math.abs(dot) < 0.01 && o.mode === 'dot' ? 'good' : '');
    }
    return draw;
  });

  /* ===== khung 3D dùng chung ===== */
  function view3d(root, drawFn) {
    const p = new Plot(root, { h: (w) => Math.min(Math.round(w * 0.68), 420), grid: false });
    const st = { az: -0.8, el: 0.45 };
    let dr = null;
    p.c.addEventListener('pointerdown', (e) => { dr = [e.clientX, e.clientY, st.az, st.el]; try { p.c.setPointerCapture(e.pointerId); } catch (x) {} });
    p.c.addEventListener('pointermove', (e) => { if (!dr) return; st.az = dr[2] + (e.clientX - dr[0]) * 0.01; st.el = Math.max(-0.3, Math.min(1.45, dr[3] + (e.clientY - dr[1]) * 0.01)); drawFn(); });
    p.c.addEventListener('pointerup', () => (dr = null));
    st.p = p;
    st.proj = (x, y, z, S) => { const X = x * Math.cos(st.az) - y * Math.sin(st.az), Y = x * Math.sin(st.az) + y * Math.cos(st.az); return [p.W / 2 + X * S, p.H / 2 + 10 - (z * Math.cos(st.el) - Y * Math.sin(st.el)) * S]; };
    st.seg = (pts, c, w, S, dash) => { const g = p.ctx; g.strokeStyle = c; g.lineWidth = w; g.setLineDash(dash || []); g.beginPath(); pts.forEach(([x, y, z], i) => { const [u, v] = st.proj(x, y, z, S); i ? g.lineTo(u, v) : g.moveTo(u, v); }); g.stroke(); g.setLineDash([]); };
    st.axes = (S, L) => { [[L, 0, 0, 'x'], [0, L, 0, 'y'], [0, 0, L, 'z']].forEach(([x, y, z, t]) => { st.seg([[0, 0, 0], [x, y, z]], C('rule-strong'), 1.2, S); const [u, v] = st.proj(x * 1.08, y * 1.08, z * 1.08, S); p.ptext(t, u, v, C('muted'), 'center'); }); };
    return st;
  }

  /* ===== 13.1 Đường cong không gian ===== */
  const SC = { helix: { t: 'đường xoắn (cos t, sin t, t/4)', r: (t) => [Math.cos(t), Math.sin(t), t / 4], T: [0, 4 * Math.PI] }, cubic: { t: 'bậc ba xoắn (t, t², t³)', r: (t) => [t, t * t, t ** 3], T: [-1.2, 1.2] }, ell: { t: 'trụ ∩ mặt phẳng (cos t, sin t, 2 − sin t)', r: (t) => [Math.cos(t), Math.sin(t), 2 - Math.sin(t)], T: [0, 2 * Math.PI] }, tref: { t: 'nút ba lá', r: (t) => [(Math.sin(t) + 2 * Math.sin(2 * t)) / 3, (Math.cos(t) - 2 * Math.cos(2 * t)) / 3, -Math.sin(3 * t) / 3], T: [0, 2 * Math.PI] } };
  defWidget('spacecurve', 'Đường cong trong không gian', 'Kéo trên hình để xoay. Điểm đỏ là $\\vec r(t)$, mũi tên xanh là vectơ tiếp tuyến $\\vec r\'(t)$.', (root) => {
    let k = 'helix', s = 0.3;
    const V = view3d(root, () => draw());
    const row = UI.row(root), out = UI.readout(root);
    sel(row, 'Đường', SC, k, (v) => { k = v; draw(); });
    UI.slider(row, 't (vị trí)', 0, 1, 0.001, s, (v) => { s = v; draw(); }, (v) => fmt(v, 2));
    function draw() {
      const G = SC[k], p = V.p, S = Math.min(p.W, p.H) / 5.2; p.clear(); V.axes(S, 1.8);
      const ts = MathX.lin(G.T[0], G.T[1], 500), t = G.T[0] + (G.T[1] - G.T[0]) * s;
      V.seg(ts.map(G.r).map(([x, y, z]) => [x, y, 0]), C('rule-strong'), 1, S, [3, 3]);
      V.seg(ts.map(G.r), C('accent'), 2.4, S);
      const P = G.r(t), d = [0, 1, 2].map((i) => (G.r(t + 1e-4)[i] - G.r(t - 1e-4)[i]) / 2e-4), L = Math.hypot(...d) || 1;
      V.seg([P, P.map((v, i) => v + d[i] / L * 0.7)], C('data2'), 2.4, S);
      const [u, w] = V.proj(...P, S); p.ctx.fillStyle = C('accent'); p.ctx.beginPath(); p.ctx.arc(u, w, 5, 0, 7); p.ctx.fill();
      say(out, `$\\vec r(${fmt(t)})=\\langle${P.map((v) => fmt(v)).join(',')}\\rangle$, $\\vec r'=\\langle${d.map((v) => fmt(v)).join(',')}\\rangle$, tốc độ $|\\vec r'|=${fmt(L)}$. Đường đứt là hình chiếu xuống mặt $xy$.`);
    }
    return draw;
  });

  /* ===== 13.3 Độ cong ===== */
  const CV = { sq: { t: 'y = x²', f: (x) => x * x, w: [-2.5, 2.5] }, sin: { t: 'y = sin x', f: Math.sin, w: [-4, 4] }, cub: { t: 'y = x³ − x', f: (x) => x ** 3 - x, w: [-2, 2] }, exp: { t: 'y = eˣ', f: Math.exp, w: [-3, 2] } };
  defWidget('curvature', 'Độ cong và đường tròn mật tiếp', 'Đường tròn xanh khớp nhất với đồ thị tại điểm đang chọn. Bán kính của nó là $\\frac1\\kappa$: cong nhiều thì đường tròn nhỏ.', (root) => {
    const p = new Plot(root, { h: sqH });
    const row = UI.row(root), out = UI.readout(root);
    let k = 'sq', x0 = 0.5;
    sel(row, 'f', CV, k, (v) => { k = v; draw(); });
    UI.slider(row, 'x', -3, 3, 0.01, x0, (v) => { x0 = v; draw(); });
    function draw() {
      const G = CV[k], f = G.f, x = Math.max(G.w[0], Math.min(G.w[1], x0));
      p.resize(); square(p, x, f(x), 2.5); p.clear();
      p.fn(f, C('ink'), 2.4);
      const d1 = num(f, x), d2 = num2(f, x), kap = Math.abs(d2) / Math.pow(1 + d1 * d1, 1.5);
      if (kap > 1e-4) {
        const R = 1 / kap, nx = -d1 / Math.hypot(1, d1), ny = 1 / Math.hypot(1, d1), sg = Math.sign(d2);
        const cx = x + sg * nx * R, cy = f(x) + sg * ny * R;
        const g = p.ctx; g.beginPath(); g.arc(p.X(cx), p.Y(cy), p.X(R) - p.X(0), 0, 7); g.strokeStyle = C('data2'); g.lineWidth = 1.8; g.stroke();
        p.line(x, f(x), cx, cy, C('faint'), 1, [3, 3]); p.dot(cx, cy, 3, C('data2'));
      }
      p.dot(x, f(x), 5, C('accent'));
      say(out, `$\\kappa=\\dfrac{|f''|}{(1+f'^2)^{3/2}}=${fmt(kap, 4)}$` + (kap > 1e-4 ? `, bán kính mật tiếp $${fmt(1 / kap, 3)}$.` : ': gần như thẳng (điểm uốn).'));
    }
    return draw;
  });

  /* ===== 13.4 Ném xiên ===== */
  defWidget('projectile', 'Chuyển động ném xiên', 'Bỏ qua sức cản, $g=9{,}8$. Mũi tên đỏ là vận tốc, mũi tên xanh là gia tốc (luôn hướng xuống). Thử các góc $30^\\circ$ và $60^\\circ$: cùng tầm xa.', (root) => {
    const p = new Plot(root, { xmin: 0, xmax: 50, ymin: 0, ymax: 25, h: 280 });
    const row = UI.row(root), out = UI.readout(root);
    let v0 = 20, ang = 45, s = 0.4; const g = 9.8;
    UI.slider(row, 'v₀ (m/s)', 5, 30, 0.5, v0, (v) => { v0 = v; draw(); });
    UI.slider(row, 'góc (°)', 5, 85, 1, ang, (v) => { ang = v; draw(); }, (v) => v + '°');
    UI.slider(row, 't (vị trí)', 0, 1, 0.001, s, (v) => { s = v; draw(); }, (v) => fmt(v, 2));
    function draw() {
      const a = ang * Math.PI / 180, T = 2 * v0 * Math.sin(a) / g, R = v0 * v0 * Math.sin(2 * a) / g, H = (v0 * Math.sin(a)) ** 2 / (2 * g);
      p.set({ xmax: Math.max(10, 30 * 30 / g * 1.05), ymax: Math.max(5, 30 * 30 / (2 * g) * 1.05) }); p.clear();
      const pos = (t) => [v0 * Math.cos(a) * t, v0 * Math.sin(a) * t - g * t * t / 2];
      p.path(MathX.lin(0, T, 200).map(pos), C('accent'), 2.4);
      const t = T * s, [x, y] = pos(t), vx = v0 * Math.cos(a), vy = v0 * Math.sin(a) - g * t;
      arrow(p, x, y, x + vx * 0.4, y + vy * 0.4, C('accent'), 2); arrow(p, x, y, x, y - g * 0.4, C('data2'), 2);
      p.dot(x, y, 6, C('ink'));
      say(out, `Thời gian bay $${fmt(T)}$ s, tầm xa $\\frac{v_0^2\\sin2\\alpha}g=${fmt(R)}$ m, độ cao cực đại $${fmt(H)}$ m. ` + (ang === 45 ? 'Góc $45^\\circ$ cho tầm xa lớn nhất.' : ''), ang === 45 ? 'good' : '');
    }
    return draw;
  });

  /* ===== 14.1 Đường mức ===== */
  const CT = { bowl: { t: 'x² + y²', f: (x, y) => x * x + y * y }, sad: { t: 'x² − y²', f: (x, y) => x * x - y * y }, wave: { t: 'sin x · cos y', f: (x, y) => Math.sin(x) * Math.cos(y) }, disc: { t: 'xy/(x² + y²), không có giới hạn tại gốc', f: (x, y) => (x === 0 && y === 0 ? 0 : (x * y) / (x * x + y * y)) }, peaks: { t: 'hai đỉnh', f: (x, y) => Math.exp(-((x - 1) ** 2 + y * y)) + 0.8 * Math.exp(-((x + 1.2) ** 2 + (y - 0.8) ** 2)) } };
  defWidget('contour', 'Bản đồ đường mức', 'Màu càng đậm giá trị càng cao; đường mảnh là đường mức $f=k$. Bấm vào bản đồ: mũi tên là gradient, luôn vuông góc với đường mức và chỉ lên dốc.', (root) => {
    const p = new Plot(root, { h: sqH, xstep: 1, ystep: 1 });
    const row = UI.row(root), out = UI.readout(root);
    let k = 'peaks', P = [0.4, 0.6];
    sel(row, 'f(x, y)', CT, k, (v) => { k = v; draw(); });
    p.onPointer((x, y) => { P = [x, y]; draw(); });
    function draw() {
      const f = CT[k].f; p.resize(); square(p, 0, 0, 2.5); p.clear();
      const g = p.ctx, N = 90, xs = MathX.lin(p.o.xmin, p.o.xmax, N), ys = MathX.lin(p.o.ymin, p.o.ymax, N);
      let lo = Infinity, hi = -Infinity; const V = ys.map((y) => xs.map((x) => { const v = f(x, y); lo = Math.min(lo, v); hi = Math.max(hi, v); return v; }));
      const cw = (p.X(xs[1]) - p.X(xs[0])) + 1, chh = (p.Y(ys[0]) - p.Y(ys[1])) + 1;
      for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) { const t = (V[j][i] - lo) / (hi - lo); g.globalAlpha = 0.08 + 0.55 * t; g.fillStyle = C('accent'); g.fillRect(p.X(xs[i]) - cw / 2, p.Y(ys[j]) - chh / 2, cw, chh); }
      g.globalAlpha = 1;
      const levels = 10; g.strokeStyle = C('ink'); g.lineWidth = 0.8;
      for (let L = 1; L < levels; L++) {
        const lv = lo + (hi - lo) * L / levels;
        for (let j = 0; j < N - 1; j++) for (let i = 0; i < N - 1; i++) {
          const a = V[j][i] - lv, b = V[j][i + 1] - lv, c = V[j + 1][i + 1] - lv, d = V[j + 1][i] - lv, e = [];
          const it = (x1, y1, v1, x2, y2, v2) => { if ((v1 < 0) !== (v2 < 0)) { const t = v1 / (v1 - v2); e.push([x1 + (x2 - x1) * t, y1 + (y2 - y1) * t]); } };
          it(xs[i], ys[j], a, xs[i + 1], ys[j], b); it(xs[i + 1], ys[j], b, xs[i + 1], ys[j + 1], c); it(xs[i + 1], ys[j + 1], c, xs[i], ys[j + 1], d); it(xs[i], ys[j + 1], d, xs[i], ys[j], a);
          for (let m = 0; m + 1 < e.length; m += 2) { g.beginPath(); g.moveTo(p.X(e[m][0]), p.Y(e[m][1])); g.lineTo(p.X(e[m + 1][0]), p.Y(e[m + 1][1])); g.stroke(); }
        }
      }
      const fx = (f(P[0] + 1e-4, P[1]) - f(P[0] - 1e-4, P[1])) / 2e-4, fy = (f(P[0], P[1] + 1e-4) - f(P[0], P[1] - 1e-4)) / 2e-4, gn = Math.hypot(fx, fy);
      if (gn > 1e-6) arrow(p, P[0], P[1], P[0] + fx / gn * 0.6, P[1] + fy / gn * 0.6, C('data2'), 2.4);
      p.dot(P[0], P[1], 5, C('ink'));
      say(out, `$f(${fmt(P[0])},${fmt(P[1])})=${fmt(f(P[0], P[1]))}$, $\\nabla f=\\langle${fmt(fx)},${fmt(fy)}\\rangle$, độ dốc lớn nhất $|\\nabla f|=${fmt(gn)}$. Đường mức dày đặc ở chỗ dốc.`);
    }
    return draw;
  });

  /* ===== 14.8 Lagrange ===== */
  const LG = { lin: { t: 'f = x + 2y', f: (x, y) => x + 2 * y, gx: () => 1, gy: () => 2 }, quad: { t: 'f = x² + 2y²', f: (x, y) => x * x + 2 * y * y, gx: (x) => 2 * x, gy: (x, y) => 4 * y }, xy: { t: 'f = xy', f: (x, y) => x * y, gx: (x, y) => y, gy: (x) => x } };
  defWidget('lagrange', 'Nhân tử Lagrange trên đường tròn $x^2+y^2=1$', 'Kéo điểm $P$ chạy trên đường tròn ràng buộc. Mũi tên đỏ là $\\nabla f$, xanh là $\\nabla g$. Ở điểm cực trị chúng song song và đường mức của $f$ tiếp xúc với đường tròn.', (root) => {
    const p = new Plot(root, { h: sqH, xstep: 0.5, ystep: 0.5 });
    const row = UI.row(root), out = UI.readout(root);
    let k = 'lin', th = 0.4;
    sel(row, 'f', LG, k, (v) => { k = v; draw(); });
    UI.slider(row, 'P (góc)', 0, 6.283, 0.001, th, (v) => { th = v; draw(); }, (v) => Math.round(v * 180 / Math.PI) + '°');
    function draw() {
      const G = LG[k]; p.resize(); square(p, 0, 0, 1.7); p.clear();
      const g = p.ctx, N = 120, xs = MathX.lin(p.o.xmin, p.o.xmax, N), ys = MathX.lin(p.o.ymin, p.o.ymax, N);
      const x = Math.cos(th), y = Math.sin(th), fv = G.f(x, y);
      const vals = MathX.lin(0, 6.283, 400).map((t) => G.f(Math.cos(t), Math.sin(t))), mx = Math.max(...vals), mn = Math.min(...vals);
      [mn, (mn + fv) / 2, fv, (mx + fv) / 2, mx, mx + (mx - mn) * 0.3, mn - (mx - mn) * 0.3].forEach((lv, li) => {
        g.strokeStyle = li === 2 ? C('accent') : C('rule-strong'); g.lineWidth = li === 2 ? 2 : 1;
        for (let j = 0; j < N - 1; j++) for (let i = 0; i < N - 1; i++) {
          const a = G.f(xs[i], ys[j]) - lv, b = G.f(xs[i + 1], ys[j]) - lv, c = G.f(xs[i + 1], ys[j + 1]) - lv, d = G.f(xs[i], ys[j + 1]) - lv, e = [];
          const it = (x1, y1, v1, x2, y2, v2) => { if ((v1 < 0) !== (v2 < 0)) { const t = v1 / (v1 - v2); e.push([x1 + (x2 - x1) * t, y1 + (y2 - y1) * t]); } };
          it(xs[i], ys[j], a, xs[i + 1], ys[j], b); it(xs[i + 1], ys[j], b, xs[i + 1], ys[j + 1], c); it(xs[i + 1], ys[j + 1], c, xs[i], ys[j + 1], d); it(xs[i], ys[j + 1], d, xs[i], ys[j], a);
          for (let m = 0; m + 1 < e.length; m += 2) { g.beginPath(); g.moveTo(p.X(e[m][0]), p.Y(e[m][1])); g.lineTo(p.X(e[m + 1][0]), p.Y(e[m + 1][1])); g.stroke(); }
        }
      });
      g.beginPath(); g.arc(p.X(0), p.Y(0), p.X(1) - p.X(0), 0, 7); g.strokeStyle = C('data2'); g.lineWidth = 2.4; g.stroke();
      const fx = G.gx(x, y), fy = G.gy(x, y), nf = Math.hypot(fx, fy) || 1;
      arrow(p, x, y, x + fx / nf * 0.5, y + fy / nf * 0.5, C('accent'), 2.4); arrow(p, x, y, x + x * 0.5, y + y * 0.5, C('data2'), 2.4);
      p.dot(x, y, 6, C('ink'));
      const cross = fx * y - fy * x, par = Math.abs(cross) / nf < 0.02;
      say(out, `$f(P)=${fmt(fv, 4)}$; trên đường tròn $\\max f\\approx${fmt(mx, 4)}$, $\\min f\\approx${fmt(mn, 4)}$. ` + (par ? '**$\\nabla f\\parallel\\nabla g$: đây là điểm dừng có ràng buộc.**' : 'Hai gradient chưa song song: còn tăng/giảm được $f$ khi trượt dọc đường tròn.'), par ? 'good' : '');
    }
    return draw;
  });

  /* ===== 15.1 / 15.3 Tích phân kép ===== */
  const DI = { xy: { t: 'f = x·y trên [0,1]²', f: (x, y) => x * y, I: 0.25 }, sq: { t: 'f = x² + y² trên [0,1]²', f: (x, y) => x * x + y * y, I: 2 / 3 }, sin: { t: 'f = sin(πx)·sin(πy)', f: (x, y) => Math.sin(Math.PI * x) * Math.sin(Math.PI * y), I: 4 / (Math.PI * Math.PI) } };
  defWidget('doubleint', (o) => (o.mode === 'polar' ? 'Ô lưới cực $r\\,\\Delta r\\,\\Delta\\theta$' : 'Tổng Riemann kép: cột trên ô vuông'), (o) => (o.mode === 'polar' ? 'Thể tích dưới $z=1-x^2-y^2$ trên đĩa đơn vị. Mỗi ô cực có diện tích $\\approx r\\,\\Delta r\\,\\Delta\\theta$: ô xa gốc rộng hơn.' : 'Mỗi ô dựng một cột cao $f$ tại tâm ô. Kéo trên hình để xoay; tăng $n$ để tổng thể tích tiến về tích phân kép.'), (root, o) => {
    let k = 'xy', n = 4;
    const V = view3d(root, () => draw());
    const row = UI.row(root), out = UI.readout(root);
    if (o.mode !== 'polar') sel(row, 'f', DI, k, (v) => { k = v; draw(); });
    UI.slider(row, 'n', 2, 20, 1, n, (v) => { n = v; draw(); }, String);
    function box(x0, y0, x1, y1, h, S) {
      const c = [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
      const g = V.p.ctx;
      const face = (pts, fill) => { g.beginPath(); pts.forEach((pt, i) => { const [u, v] = V.proj(...pt, S); i ? g.lineTo(u, v) : g.moveTo(u, v); }); g.closePath(); g.fillStyle = fill; g.fill(); g.strokeStyle = C('accent'); g.lineWidth = 0.6; g.stroke(); };
      for (let i = 0; i < 4; i++) { const a = c[i], b = c[(i + 1) % 4]; face([[a[0], a[1], 0], [b[0], b[1], 0], [b[0], b[1], h], [a[0], a[1], h]], C('accent-soft')); }
      face(c.map(([x, y]) => [x, y, h]), C('band'));
    }
    function draw() {
      const p = V.p, S = Math.min(p.W, p.H) / 2.2; p.clear();
      const g = p.ctx; g.save(); g.translate(0, 0);
      if (o.mode === 'polar') {
        const f = (x, y) => 1 - x * x - y * y; let sum = 0;
        const shift = (pt) => pt; void shift;
        const cells = [];
        for (let i = 0; i < n; i++) for (let j = 0; j < 2 * n; j++) { const r = (i + 0.5) / n, t = (j + 0.5) * Math.PI / n; sum += f(r * Math.cos(t), r * Math.sin(t)) * r * (1 / n) * (Math.PI / n); cells.push([i, j]); }
        cells.forEach(([i, j]) => { const r0 = i / n, r1 = (i + 1) / n, t0 = j * Math.PI / n, t1 = (j + 1) * Math.PI / n, h = 1 - ((r0 + r1) / 2) ** 2; V.seg([[r0 * Math.cos(t0), r0 * Math.sin(t0), h], [r1 * Math.cos(t0), r1 * Math.sin(t0), h], [r1 * Math.cos(t1), r1 * Math.sin(t1), h]], C('accent'), 0.8, S); });
        V.seg(MathX.lin(0, 2 * Math.PI, 100).map((t) => [Math.cos(t), Math.sin(t), 0]), C('data2'), 1.6, S);
        say(out, `Tổng trên ${n}×${2 * n} ô cực $=${fmt(sum, 4)}$; đúng $\\int_0^{2\\pi}\\int_0^1(1-r^2)r\\,dr\\,d\\theta=\\frac\\pi2\\approx1{,}5708$.`);
      } else {
        const G = DI[k], cells = []; let sum = 0;
        for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { const x = (i + 0.5) / n, y = (j + 0.5) / n, h = G.f(x, y); sum += h / (n * n); cells.push([i, j, h]); }
        const ca = Math.cos(V.az), sa = Math.sin(V.az);
        cells.sort((A, B) => { const da = (A[0] - n / 2) * sa + (A[1] - n / 2) * ca, db = (B[0] - n / 2) * sa + (B[1] - n / 2) * ca; return db - da; });
        cells.forEach(([i, j, h]) => box(i / n - 0.5, j / n - 0.5, (i + 1) / n - 0.5, (j + 1) / n - 0.5, h, S));
        say(out, `Tổng Riemann $n=${n}$: $${fmt(sum, 5)}$; tích phân kép $=${fmt(G.I, 5)}$.`);
      }
      g.restore();
    }
    return draw;
  });

  /* ===== 16.x Trường vectơ ===== */
  const VF = {
    rot: { t: '⟨−y, x⟩ (xoáy)', F: (x, y) => [-y, x], div: () => 0, curl: () => 2, cons: false },
    out: { t: '⟨x, y⟩ (toả ra)', F: (x, y) => [x, y], div: () => 2, curl: () => 0, cons: true, phi: (x, y) => (x * x + y * y) / 2 },
    grad: { t: '⟨y, x⟩ = ∇(xy)', F: (x, y) => [y, x], div: () => 0, curl: () => 0, cons: true, phi: (x, y) => x * y },
    shear: { t: '⟨y, 0⟩ (trượt)', F: (x, y) => [y, 0], div: () => 0, curl: () => -1, cons: false },
    sink: { t: '⟨−x, −y⟩ + xoáy', F: (x, y) => [-x - y, x - y], div: () => -2, curl: () => 2, cons: false },
  };
  defWidget('vfield', (o) => ({ line: 'Tích phân đường: công dọc một đường', conservative: 'Hai đường, cùng điểm đầu cuối', curl: 'Divergence và rota' })[o.mode] || 'Trường vectơ', (o) => ({
    line: 'Công $\\int_C\\vec F\\cdot d\\vec r$ dọc đường tròn bán kính $1$ (ngược kim đồng hồ). Phần đỏ là nơi lực cùng chiều đi, xanh là ngược chiều.',
    conservative: 'Hai đường từ $A$ tới $B$. Với trường bảo toàn công bằng nhau; với trường không bảo toàn thì khác.',
    curl: 'Bấm vào một điểm: bánh xe nhỏ quay theo rota, vòng tròn co/giãn theo divergence.',
  })[o.mode] || 'Mỗi mũi tên là $\\vec F(x,y)$ tại điểm đó (thu nhỏ cho dễ nhìn).', (root, o) => {
    const p = new Plot(root, { h: sqH, xstep: 1, ystep: 1 });
    const row = UI.row(root), out = UI.readout(root);
    let k = o.mode === 'conservative' ? 'grad' : o.mode === 'curl' ? 'sink' : 'rot', P = [0.8, 0.6], spin = 0, raf;
    sel(row, 'F', VF, k, (v) => { k = v; draw(); });
    p.onPointer((x, y) => { P = [x, y]; draw(); });
    function field(G) {
      for (let i = -5; i <= 5; i++) for (let j = -5; j <= 5; j++) { const x = i * 0.42, y = j * 0.42, [u, v] = G.F(x, y), L = Math.hypot(u, v); if (L < 1e-9) continue; const s = 0.3 * Math.min(1, L) / L; arrow(p, x - u * s / 2, y - v * s / 2, x + u * s / 2, y + v * s / 2, C('faint'), 1.2); }
    }
    const work = (G, path, n) => { let W = 0; for (let i = 0; i < n; i++) { const t0 = i / n, t1 = (i + 1) / n, [x0, y0] = path(t0), [x1, y1] = path(t1), [u, v] = G.F((x0 + x1) / 2, (y0 + y1) / 2); W += u * (x1 - x0) + v * (y1 - y0); } return W; };
    function draw() {
      cancelAnimationFrame(raf);
      const G = VF[k]; p.resize(); square(p, 0, 0, 2.3); p.clear(); field(G);
      if (o.mode === 'line') {
        const path = (t) => [Math.cos(2 * Math.PI * t), Math.sin(2 * Math.PI * t)];
        for (let i = 0; i < 120; i++) { const [x0, y0] = path(i / 120), [x1, y1] = path((i + 1) / 120), [u, v] = G.F((x0 + x1) / 2, (y0 + y1) / 2), d = u * (x1 - x0) + v * (y1 - y0); p.line(x0, y0, x1, y1, d > 1e-9 ? C('accent') : d < -1e-9 ? C('data2') : C('ink'), 3.2); }
        say(out, `$\\oint_C\\vec F\\cdot d\\vec r\\approx${fmt(work(G, path, 2000), 4)}$. ` + (G.cons ? 'Trường bảo toàn: công trên đường kín bằng $0$.' : `Theo Green bằng $\\iint(Q_x-P_y)dA=${fmt(G.curl() * Math.PI, 4)}$.`));
      } else if (o.mode === 'conservative') {
        const A = [-1.5, -1], B = [1.5, 1];
        const p1 = (t) => [A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t];
        const p2 = (t) => [A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t + 1.6 * Math.sin(Math.PI * t)];
        p.path(MathX.lin(0, 1, 100).map(p1), C('accent'), 2.6); p.path(MathX.lin(0, 1, 100).map(p2), C('data2'), 2.6);
        p.dot(...A, 5, C('ink')); p.dot(...B, 5, C('ink')); p.text('A', A[0] - 0.2, A[1] - 0.2, C('ink')); p.text('B', B[0] + 0.1, B[1] + 0.2, C('ink'));
        const w1 = work(G, p1, 2000), w2 = work(G, p2, 2000);
        say(out, `Công theo đường thẳng (đỏ) $${fmt(w1, 4)}$, theo đường cong (xanh) $${fmt(w2, 4)}$. ` + (G.cons ? `Bằng nhau, đúng bằng $\\varphi(B)-\\varphi(A)=${fmt(G.phi(...B) - G.phi(...A), 4)}$.` : 'Khác nhau: trường **không** bảo toàn.'), G.cons ? 'good' : 'bad');
      } else {
        const g = p.ctx, [x, y] = P, dv = G.div(x, y), cu = G.curl(x, y);
        const tick = () => {
          p.clear(); field(G);
          spin += cu * 0.03; const R = 0.3 * (1 + 0.15 * Math.sin(performance.now() / 300) * Math.sign(dv));
          g.beginPath(); g.arc(p.X(x), p.Y(y), p.X(R) - p.X(0), 0, 7); g.strokeStyle = C('data2'); g.lineWidth = 1.6; g.stroke();
          for (let i = 0; i < 4; i++) { const a = spin + i * Math.PI / 2; p.line(x, y, x + 0.28 * Math.cos(a), y + 0.28 * Math.sin(a), C('accent'), 2.6); }
          p.dot(x, y, 4, C('ink'));
          if (document.body.contains(p.c)) raf = requestAnimationFrame(tick);
        };
        tick();
        say(out, `Tại $(${fmt(x)},${fmt(y)})$: $\\operatorname{div}\\vec F=${fmt(dv)}$ (${dv > 0 ? 'nguồn: toả ra' : dv < 0 ? 'giếng: hút vào' : 'không nguồn'}), $\\operatorname{curl}\\vec F\\cdot\\vec k=${fmt(cu)}$ (${cu > 0 ? 'bánh xe quay ngược kim đồng hồ' : cu < 0 ? 'quay thuận kim đồng hồ' : 'không quay'}).`);
      }
    }
    return draw;
  });

  /* ===== 17.3 Dao động lò xo ===== */
  defWidget('oscillator', 'Dao động lò xo có lực cản', '$mx\'\'+cx\'+kx=0$, kéo lệch $1$ rồi thả. Tăng lực cản $c$ qua giá trị tới hạn $2\\sqrt{mk}$ để thấy vật thôi dao động.', (root) => {
    const sp = new Plot(root, { xmin: -1.6, xmax: 1.6, ymin: -1, ymax: 1, h: 90, grid: false });
    const p = new Plot(root, { xmin: 0, xmax: 20, ymin: -1.1, ymax: 1.1, h: 230 });
    const row = UI.row(root), out = UI.readout(root);
    let m = 1, c = 0.4, kk = 4, s = 0.2;
    UI.slider(row, 'm', 0.2, 4, 0.05, m, (v) => { m = v; draw(); });
    UI.slider(row, 'c', 0, 6, 0.05, c, (v) => { c = v; draw(); });
    UI.slider(row, 'k', 0.5, 10, 0.1, kk, (v) => { kk = v; draw(); });
    UI.slider(row, 't (vị trí)', 0, 1, 0.001, s, (v) => { s = v; draw(); }, (v) => fmt(v * 20, 1));
    function sol(t) {
      const D = c * c - 4 * m * kk, al = -c / (2 * m);
      if (D < -1e-9) { const w = Math.sqrt(-D) / (2 * m); return Math.exp(al * t) * (Math.cos(w * t) - al / w * Math.sin(w * t)); }
      if (Math.abs(D) <= 1e-9) return Math.exp(al * t) * (1 - al * t);
      const r1 = (-c + Math.sqrt(D)) / (2 * m), r2 = (-c - Math.sqrt(D)) / (2 * m), A = r2 / (r2 - r1), B = 1 - A; return A * Math.exp(r1 * t) + B * Math.exp(r2 * t);
    }
    function draw() {
      p.clear(); p.fn(sol, C('accent'), 2.4, 0, 20);
      const t = s * 20, x = sol(t); p.line(t, -1.1, t, 1.1, C('faint'), 1, [3, 3]); p.dot(t, x, 5, C('ink'));
      sp.clear(); const g = sp.ctx; sp.line(-1.55, -0.5, -1.55, 0.5, C('ink'), 3);
      const pts = [[-1.55, 0]]; for (let i = 1; i < 24; i++) pts.push([-1.55 + (x + 1.3) * i / 24, i % 2 ? 0.25 : -0.25]); pts.push([x - 0.25 + 0.0, 0]);
      sp.path(pts, C('data2'), 1.6); sp.rect(x - 0.25, -0.35, x + 0.25, 0.35, C('band'), C('accent')); void g;
      const crit = 2 * Math.sqrt(m * kk);
      say(out, `$c=${fmt(c)}$, giá trị tới hạn $2\\sqrt{mk}=${fmt(crit)}$: ` + (c < crit - 0.02 ? `**tắt dần**, tần số góc $\\approx${fmt(Math.sqrt(4 * m * kk - c * c) / (2 * m))}$.` : Math.abs(c - crit) <= 0.02 ? '**tắt tới hạn**: về cân bằng nhanh nhất mà không dao động.' : '**quá tắt**: trở về chậm, không dao động.'));
    }
    return draw;
  });

  /* ===== 2.1 Vận tốc trung bình → tức thời ===== */
  defWidget('avgvel', 'Từ vận tốc trung bình đến vận tốc tức thời', 'Vật rơi tự do $s(t)=4{,}9t^2$ (m). Vận tốc trung bình trên $[t,t+h]$ là hệ số góc cát tuyến. Thu nhỏ $h$: nó tiến về vận tốc tức thời $9{,}8t$.', (root) => {
    const p = new Plot(root, { xmin: 0, xmax: 6, ymin: 0, ymax: 180, h: 280 });
    const row = UI.row(root), out = UI.readout(root);
    const tbl = el('table', { class: 'wtable' }); root.appendChild(tbl);
    let t = 5, h = 1; const s = (x) => 4.9 * x * x;
    UI.slider(row, 't (s)', 1, 5, 0.1, t, (v) => { t = v; draw(); });
    UI.slider(row, 'h (s)', 0.001, 1, 0.001, h, (v) => { h = v; draw(); }, (v) => fmt(v, 3));
    function draw() {
      p.clear(); p.fn(s, C('ink'), 2.2, 0, 6);
      const m = (s(t + h) - s(t)) / h;
      p.line(0, s(t) - m * t, 6, s(t) + m * (6 - t), C('data2'), 1.8);
      p.line(0, s(t) - 9.8 * t * t, 6, s(t) + 9.8 * t * (6 - t), C('accent'), 1.4, [5, 4]);
      p.dot(t, s(t), 5, C('accent')); p.dot(t + h, s(t + h), 5, C('data2'));
      say(out, `Vận tốc trung bình trên $[${fmt(t)};\\ ${fmt(t + h, 3)}]$: $\\dfrac{s(t+h)-s(t)}{h}=${fmt(m, 4)}$ m/s. Vận tốc tức thời $9{,}8t=${fmt(9.8 * t, 4)}$ m/s (đường đứt đỏ).`);
      tbl.innerHTML = '<tr><th>h</th>' + [1, 0.1, 0.01, 0.001].map((x) => '<th>' + String(x).replace('.', ',') + '</th>').join('') + '</tr><tr><td>v trung bình</td>' + [1, 0.1, 0.01, 0.001].map((x) => '<td>' + fmt((s(t + x) - s(t)) / x, 4) + '</td>').join('') + '</tr>';
    }
    return draw;
  });

  /* ===== 2.2 Bảng giá trị và giới hạn ===== */
  const LT = {
    a: { t: '(x² − 1)/(x − 1), x → 1', f: (x) => (x * x - 1) / (x - 1), a: 1, L: '2', w: [-0.5, 2.5, -0.5, 4] },
    b: { t: 'sin x / x, x → 0', f: (x) => Math.sin(x) / x, a: 0, L: '1', w: [-8, 8, -0.4, 1.2] },
    c: { t: '(√(t² + 9) − 3)/t², t → 0', f: (x) => (Math.sqrt(x * x + 9) - 3) / (x * x), a: 0, L: '\\tfrac16', w: [-3, 3, 0, 0.25] },
    d: { t: 'sin(π/x), x → 0 (cái bẫy)', f: (x) => Math.sin(Math.PI / x), a: 0, L: null, w: [-1, 1, -1.3, 1.3] },
  };
  defWidget('limtable', 'Đoán giới hạn bằng bảng giá trị', 'Cho $x$ tiến về $a$ từ hai phía (mỗi dòng gần hơn 10 lần). Các chấm đỏ là các giá trị trong bảng. Lựa chọn cuối cho thấy bảng có thể đánh lừa.', (root) => {
    const p = new Plot(root, { xmin: 0, xmax: 1, ymin: 0, ymax: 1, h: 260 });
    const row = UI.row(root), out = UI.readout(root);
    const tbl = el('table', { class: 'wtable' }); root.appendChild(tbl);
    let k = 'a', n = 3;
    sel(row, 'Hàm', LT, k, (v) => { k = v; draw(); });
    UI.slider(row, 'Số dòng', 1, 6, 1, n, (v) => { n = v; draw(); }, String);
    function draw() {
      const G = LT[k]; p.set({ xmin: G.w[0], xmax: G.w[1], ymin: G.w[2], ymax: G.w[3] }); p.clear();
      p.fn(G.f, C('faint'), 1.8);
      let rows = '<tr><th>x</th><th>f(x)</th><th>x</th><th>f(x)</th></tr>';
      for (let j = 1; j <= n; j++) {
        const d = k === 'd' ? 1 / (j + 1) : Math.pow(10, -j), xl = G.a - d, xr = G.a + d;
        [xl, xr].forEach((x) => { const y = G.f(x); if (isFinite(y) && y > G.w[2] - 1 && y < G.w[3] + 1) p.dot(x, y, 4.5, C('accent')); });
        rows += `<tr><td>${fmt(xl, 6)}</td><td>${fmt(G.f(xl), 6)}</td><td>${fmt(xr, 6)}</td><td>${fmt(G.f(xr), 6)}</td></tr>`;
      }
      tbl.innerHTML = rows;
      say(out, G.L ? `Hai phía cùng tiến về $${G.L}$: $\\lim_{x\\to${G.a}}f(x)=${G.L}$, dù $f(${G.a})$ không xác định.` : 'Tại $x=\\pm\\frac12,\\pm\\frac13,\\dots$ bảng toàn số $0$, nhưng giữa các điểm đó hàm dao động giữa $-1$ và $1$: **không có giới hạn**. Bảng chỉ gợi ý, không chứng minh.', G.L ? '' : 'bad');
    }
    return draw;
  });

  /* ===== 3.3 Kẹp sin θ / θ ===== */
  defWidget('sinsqueeze', 'Vì sao $\\dfrac{\\sin\\theta}{\\theta}\\to1$', 'Trên đường tròn đơn vị: tam giác nhỏ (diện tích $\\frac{\\sin\\theta}2$) nằm trong hình quạt (diện tích $\\frac\\theta2$), hình quạt nằm trong tam giác lớn (diện tích $\\frac{\\tan\\theta}2$). Thu nhỏ $\\theta$: ba diện tích sát nhau.', (root) => {
    const p = new Plot(root, { h: sqH, xstep: 0.5, ystep: 0.5 });
    const row = UI.row(root), out = UI.readout(root);
    let th = 1;
    UI.slider(row, 'θ', 0.02, 1.3, 0.001, th, (v) => { th = v; draw(); }, (v) => fmt(v, 3));
    function draw() {
      p.resize(); square(p, 0.6, 0.55, 0.85); p.clear();
      const g = p.ctx; g.beginPath(); g.arc(p.X(0), p.Y(0), p.X(1) - p.X(0), 0, -Math.PI / 2, true); g.strokeStyle = C('rule-strong'); g.lineWidth = 1.4; g.stroke();
      const c = Math.cos(th), s = Math.sin(th), t = Math.tan(th);
      p.path([[0, 0], [1, 0], [1, Math.min(t, 3)]], C('data2'), 1.6, C('band2'));
      p.path([[0, 0]].concat(MathX.lin(0, th, 60).map((u) => [Math.cos(u), Math.sin(u)])).concat([[0, 0]]), C('accent'), 1.6, C('band'));
      p.path([[0, 0], [1, 0], [c, s]], C('ink'), 1.8);
      p.line(c, 0, c, s, C('faint'), 1, [3, 3]);
      say(out, `$\\sin\\theta=${fmt(s, 4)}\\le\\theta=${fmt(th, 4)}\\le\\tan\\theta=${fmt(t, 4)}$. Chia cho $\\sin\\theta$ rồi nghịch đảo: $\\cos\\theta=${fmt(c, 4)}\\le\\dfrac{\\sin\\theta}{\\theta}=${fmt(s / th, 4)}\\le1$. Cho $\\theta\\to0$, theo định lý kẹp được $1$.`);
    }
    return draw;
  });

  /* ---------- kịch bản tự chạy ---------- */
  Object.assign(window.ANIM_SCRIPTS || {}, {
    transform: async (A) => { await A.sweep('c', 'up', { from: 0, to: 2, dur: 1400 }); await A.sweep('d', 'up', { from: 0, to: 1.5, dur: 1200 }); await A.sweep('a', 'down', { from: 1, to: -1.5, dur: 1600 }); await A.sweep('b', 'up', { from: 1, to: 2.5, dur: 1400 }); },
    expfam: (A) => A.sweep('b', 'up', { from: 0.3, to: 3.5, dur: 5000 }),
    avgvel: (A) => A.sweep('h (s)', 'down', { from: 1, to: 0.001, log: true, dur: 4500 }),
    limtable: async (A) => { await A.sweep('Số dòng', 'up', { from: 1, to: 6, dur: 3000 }); await A.wait(800); await A.cycle('Hàm', 1800); },
    sinsqueeze: (A) => A.sweep('θ', 'down', { from: 1.3, to: 0.02, log: true, dur: 4500 }),
    motion: (A) => A.sweep('t', 'up', { from: 0, to: 5, dur: 6000 }),
    slopefield: async (A) => { if (A.box.querySelector('input[aria-label="bước h"]')) return A.sweep('bước h', 'down', { from: 0.5, to: 0.05, dur: 4500 }); if (A.has('k / h')) return A.sweep('k / h', 'up', { dur: 4500 }); return A.sweep('y₀', 'up', { from: 0.5, to: 3, dur: 4000 }); },
    ladder: (A) => A.sweep('x (m)', 'up', { from: 0.5, to: 4.8, dur: 5000 }),
    linapprox: (A) => A.sweep('Khung ±', 'down', { from: 4, to: 0.02, log: true, dur: 4500 }),
    hyperbolic: (A) => A.sweep('t', 'up', { from: -1.8, to: 1.8, dur: 5000 }),
    mvt: (A) => A.sweep('b', 'up', { from: 0.5, to: 2, dur: 4000 }),
    family: (A) => A.sweep('c', 'up', { from: -4, to: 4, dur: 5000 }),
    boxopt: async (A) => { await A.sweep('x', 'up', { from: 0.2, to: 5.5, dur: 3500 }); await A.sweep('x', 'down', { from: 5.5, to: 2, dur: 2000 }); },
    newton: (A) => A.sweep('Số bước', 'up', { from: 1, to: 6, dur: 4000 }),
    antideriv: (A) => A.sweep('C', 'up', { from: -3, to: 3, dur: 4000 }),
    between: (A) => A.sweep('Số dải', 'up', { from: 4, to: 80, dur: 4000 }),
    solids: (A) => A.sweep('Số lát', 'up', { from: 2, to: 50, dur: 4500 }),
    avgvalue: (A) => A.cycle(0, 1800),
    approxint: async (A) => { await A.cycle('Quy tắc', 1300); await A.sweep('n', 'up', { from: 2, to: 30, dur: 2500 }); },
    improper: (A) => A.sweep('t (vị trí)', 'up', { from: 0, to: 1, dur: 5000 }),
    arclength: (A) => A.sweep('Số đoạn', 'up', { from: 1, to: 40, dur: 4500 }),
    density: async (A) => { await A.sweep('b', 'up', { from: -1, to: 3, dur: 2500 }); await A.sweep('σ', 'up', { from: 0.5, to: 1.8, dur: 2000 }); },
    predprey: (A) => A.sweep('Mồi ban đầu', 'up', { from: 400, to: 2500, dur: 4500 }),
    param: (A) => A.sweep('t (vị trí)', 'up', { from: 0, to: 1, dur: 6000 }),
    polar: (A) => A.sweep('θ (vị trí)', 'up', { from: 0, to: 1, dur: 6000 }),
    conic: async (A) => { await A.sweep('e', 'up', { from: 0.2, to: 1.6, dur: 4500 }); await A.sweep('e', 'down', { from: 1.6, to: 0.6, dur: 2000 }); },
    vectors: async (A) => { for (const [x, y] of [[2, -1], [-2, 2], [0.5, 3], [3, 1.5]]) { A.tap(x, y); await A.wait(1100); } },
    spacecurve: async (A) => { A.sweep('t (vị trí)', 'up', { from: 0, to: 1, dur: 5000 }); await A.drag(1.4, 280); },
    curvature: (A) => A.sweep('x', 'up', { from: -2, to: 2, dur: 5500 }),
    projectile: async (A) => { await A.sweep('t (vị trí)', 'up', { from: 0, to: 1, dur: 2500 }); await A.sweep('góc (°)', 'up', { from: 15, to: 75, dur: 3500 }); },
    contour: async (A) => { for (const [x, y] of [[0.4, 0.6], [-1, 1.4], [1.5, -0.8], [-1.6, -1]]) { A.tap(x, y); await A.wait(1100); } },
    lagrange: (A) => A.sweep('P (góc)', 'up', { from: 0, to: 6.28, dur: 6000 }),
    doubleint: async (A) => { A.sweep('n', 'up', { from: 2, to: 14, dur: 4000 }); await A.drag(1.2, 240); },
    vfield: async (A) => { if (A.box.querySelector('select')) await A.cycle(0, 1700); },
    oscillator: async (A) => { await A.sweep('t (vị trí)', 'up', { from: 0, to: 1, dur: 2500 }); await A.sweep('c', 'up', { from: 0.2, to: 6, dur: 3500 }); },
  });
})();
