/* Minh hoạ cho phần một (Chương 1–11, phụ lục). */
(function () {
  const C = (n) => col(n);
  const say = UI.say;

  /* ===== 1.2 Đổi thứ tự giới hạn ===== */
  defWidget('swapdemo', 'Đổi thứ tự hai giới hạn', 'Hàm $f(x,y)=\\dfrac{x^2}{x^2+y^2}$. Đường đỏ: cố định $y=\\varepsilon$, cho $x$ chạy. Đường xanh: cố định $x=\\varepsilon$, cho $y$ chạy.', (root) => {
    const p = new Plot(root, { xmin: -1, xmax: 1, ymin: -0.1, ymax: 1.15, h: 260 });
    const row = UI.row(root);
    const out = UI.readout(root);
    let e = 0.2;
    UI.slider(row, 'ε', 0.01, 0.6, 0.01, e, (v) => { e = v; draw(); });
    const f = (x, y) => (x * x) / (x * x + y * y);
    UI.legend(root, [[C('accent'), 'x ↦ f(x, ε)'], [C('data2'), 'y ↦ f(ε, y)']]);
    function draw() {
      p.clear();
      p.fn((t) => f(t, e), C('accent'), 2.2);
      p.fn((t) => f(e, t), C('data2'), 2.2);
      p.dot(0, f(0, e), 4, C('accent'));
      p.dot(0, f(e, 0), 4, C('data2'));
      say(out, 'Với mọi $\\varepsilon\\neq0$: $\\lim_{x\\to0}f(x,\\varepsilon)=0$ nên $\\lim_{y\\to0}\\lim_{x\\to0}f=0$. Còn $\\lim_{y\\to0}f(\\varepsilon,y)=1$ nên $\\lim_{x\\to0}\\lim_{y\\to0}f=1$. Thu nhỏ $\\varepsilon$, hai đường càng dựng đứng nhưng giá trị tại $0$ không đổi.');
    }
    return draw;
  });

  /* ===== 2.1 Domino quy nạp ===== */
  defWidget('peano', 'Hàng domino quy nạp', 'Bật hai điều kiện rồi bấm “Đổ”. Thiếu một trong hai, hàng domino không đổ hết.', (root) => {
    const p = new Plot(root, { xmin: 0, xmax: 14, ymin: 0, ymax: 3, h: 170, grid: false });
    const row = UI.row(root);
    let base = false, step = false, t = -1, raf;
    const N = 13;
    UI.check(row, 'Đúng với 0 (quân đầu bị đẩy)', base, (v) => { base = v; t = -1; draw(); });
    UI.check(row, 'P(n) ⇒ P(n++) (quân nào đổ cũng đẩy quân sau)', step, (v) => { step = v; t = -1; draw(); });
    UI.button(row, 'Đổ', () => { cancelAnimationFrame(raf); t = 0; const t0 = performance.now(); const go = (now) => { t = (now - t0) / 160; draw(); if (t < N + 3) raf = requestAnimationFrame(go); }; raf = requestAnimationFrame(go); }, true);
    const out = UI.readout(root);
    function angle(i) {
      if (t < 0 || !base) return 0;
      if (!step && i > 0) return 0;
      const k = Math.min(1, Math.max(0, t - i));
      return k * 1.15;
    }
    function draw() {
      p.clear();
      const c = p.ctx;
      p.line(0.3, 0.5, 13.7, 0.5, C('rule-strong'), 1.5);
      for (let i = 0; i < N; i++) {
        const a = angle(i), x = 0.8 + i * 1.0;
        c.save();
        c.translate(p.X(x + 0.18), p.Y(0.5));
        c.rotate(a);
        const w = (p.X(0.36) - p.X(0)), h = p.Y(0.5) - p.Y(2.2);
        c.fillStyle = a > 0 ? C('accent') : C('sunk');
        c.strokeStyle = a > 0 ? C('accent') : C('rule-strong');
        c.fillRect(-w, -h, w, h); c.strokeRect(-w + .5, -h + .5, w - 1, h - 1);
        c.restore();
        p.text(String(i), x, 0.22, C('muted'), 'center');
      }
      if (t < 0) say(out, 'Quân thứ $n$ là mệnh đề $P(n)$. Chọn điều kiện rồi bấm Đổ.');
      else if (base && step) say(out, 'Cả hàng đổ: $P(n)$ đúng với mọi $n$. Đó là Tiên đề quy nạp.', 'good');
      else if (!base) say(out, 'Không quân nào đổ: thiếu bước cơ sở $P(0)$.', 'bad');
      else say(out, 'Chỉ quân $0$ đổ: thiếu bước truyền $P(n)\\Rightarrow P(n{+}{+})$.', 'bad');
    }
    return draw;
  });

  /* ===== 3.1 Venn ===== */
  defWidget('venn', 'Phép toán trên tập hợp', 'Chọn phép toán, vùng tô là kết quả. $X$ là hình chữ nhật bao ngoài.', (root) => {
    const p = new Plot(root, { xmin: 0, xmax: 10, ymin: 0, ymax: 5, h: 230, grid: false });
    const row = UI.row(root);
    let op = 'union';
    UI.select(row, 'Phép toán', [['union', 'A ∪ B'], ['inter', 'A ∩ B'], ['diff', 'A \\ B'], ['sym', '(A \\ B) ∪ (B \\ A)'], ['comp', 'X \\ (A ∪ B)'], ['dm', '(X \\ A) ∩ (X \\ B)']], op, (v) => { op = v; draw(); });
    const out = UI.readout(root);
    const inA = (x, y) => (x - 4) ** 2 + (y - 2.5) ** 2 < 2.6 ** 2 * 0.9;
    const inB = (x, y) => (x - 6) ** 2 + (y - 2.5) ** 2 < 2.6 ** 2 * 0.9;
    const test = { union: (a, b) => a || b, inter: (a, b) => a && b, diff: (a, b) => a && !b, sym: (a, b) => a !== b, comp: (a, b) => !(a || b), dm: (a, b) => !a && !b };
    const note = { union: 'Thuộc ít nhất một tập.', inter: 'Thuộc cả hai tập.', diff: 'Thuộc $A$ nhưng không thuộc $B$.', sym: 'Thuộc đúng một trong hai tập.', comp: 'Phần bù của hợp…', dm: '…bằng giao của các phần bù (De Morgan). So sánh với lựa chọn trước: hai vùng tô giống hệt.' };
    function draw() {
      p.clear();
      const c = p.ctx, st = 3;
      c.fillStyle = C('band');
      for (let py = p.Y(4.6); py < p.Y(0.4); py += st) for (let px = p.X(0.4); px < p.X(9.6); px += st) {
        const x = p.ix(px), y = p.iy(py);
        if (test[op](inA(x, y), inB(x, y))) c.fillRect(px, py, st, st);
      }
      p.rect(0.4, 0.4, 9.6, 4.6, null, C('rule-strong'));
      [[4, C('accent'), 'A', 2.1], [6, C('data2'), 'B', 7.9]].forEach(([cx, cc, t, tx]) => {
        c.beginPath(); c.arc(p.X(cx), p.Y(2.5), (p.X(2.6 * Math.sqrt(0.9)) - p.X(0)), 0, 7); c.strokeStyle = cc; c.lineWidth = 2; c.stroke();
        p.text(t, tx, 4.1, cc, 'center', 'middle', '600 15px "Be Vietnam Pro"');
      });
      p.text('X', 9.3, 4.3, C('muted'), 'center');
      say(out, note[op]);
    }
    return draw;
  });

  /* ===== 3.3 / 3.4 Ánh xạ giữa hai tập ===== */
  defWidget('setmap', (o) => (o.mode === 'image' ? 'Ảnh và ảnh nghịch đảo' : 'Đơn ánh, toàn ánh, song ánh'), (o) => o.mode === 'image'
    ? 'Bấm các điểm bên trái để chọn $S\\subseteq X$, thấy $f(S)$ sáng lên bên phải. Bấm điểm bên phải để chọn $U$, thấy $f^{-1}(U)$ bên trái.'
    : 'Bấm một điểm của $X$ rồi bấm một điểm của $Y$ để nối mũi tên $x\\mapsto f(x)$. Mỗi điểm của $X$ phải có đúng một mũi tên.', (root, o) => {
    const p = new Plot(root, { xmin: 0, xmax: 1, ymin: 0, ymax: 1, h: 280, grid: false, pad: 10 });
    const row = UI.row(root);
    const out = UI.readout(root);
    let m = 4, n = 4, f = [], sel = -1, S = new Set(), U = new Set();
    const reset = (rand) => { f = Array.from({ length: m }, (_, i) => (rand ? Math.floor(Math.random() * n) : (o.mode === 'image' ? i % n : -1))); sel = -1; S.clear(); U.clear(); };
    reset(o.mode === 'image');
    UI.slider(row, '|X|', 1, 6, 1, m, (v) => { m = v; reset(o.mode === 'image'); draw(); }, (v) => String(v));
    UI.slider(row, '|Y|', 1, 6, 1, n, (v) => { n = v; reset(o.mode === 'image'); draw(); }, (v) => String(v));
    UI.button(row, 'Ngẫu nhiên', () => { reset(true); draw(); });
    if (o.mode !== 'image') UI.button(row, 'Xoá', () => { reset(false); draw(); });
    const PX = (i, k) => [k ? 0.78 : 0.22, 0.88 - (i + 0.5) * (0.76 / (k ? n : m)) - 0.0];
    p.onPointer((x, y, e) => {
      if (e.type !== 'pointerdown') return;
      for (let k = 0; k < 2; k++) for (let i = 0; i < (k ? n : m); i++) {
        const [cx, cy] = PX(i, k);
        if (Math.hypot(p.X(cx) - p.X(x), p.Y(cy) - p.Y(y)) < 18) {
          if (o.mode === 'image') { const T = k ? U : S; T.has(i) ? T.delete(i) : T.add(i); }
          else if (!k) sel = i; else if (sel >= 0) { f[sel] = i; sel = -1; }
          draw(); return;
        }
      }
    });
    function draw() {
      p.clear();
      const c = p.ctx;
      [[0.22, 'X', m], [0.78, 'Y', n]].forEach(([cx, t, cnt]) => {
        c.beginPath(); c.ellipse(p.X(cx), p.Y(0.5), p.X(0.13) - p.X(0), p.Y(0.06) - p.Y(0.48), 0, 0, 7);
        c.strokeStyle = C('rule-strong'); c.lineWidth = 1.2; c.stroke();
        p.text(t, cx, 0.95, C('muted'), 'center', 'middle', '600 14px "Be Vietnam Pro"');
      });
      const img = new Set([...S].map((i) => f[i]).filter((v) => v >= 0));
      const pre = new Set(f.map((v, i) => (U.has(v) ? i : -1)).filter((v) => v >= 0));
      f.forEach((j, i) => {
        if (j < 0) return;
        const [x1, y1] = PX(i, 0), [x2, y2] = PX(j, 1);
        const hot = o.mode === 'image' && (S.has(i) || U.has(j));
        const cc = hot ? C('accent') : C('faint');
        p.line(x1 + 0.025, y1, x2 - 0.03, y2, cc, hot ? 2 : 1.4);
        const a = Math.atan2(p.Y(y2) - p.Y(y1), p.X(x2) - p.X(x1)), ex = p.X(x2 - 0.03), ey = p.Y(y2);
        c.fillStyle = cc; c.beginPath(); c.moveTo(ex, ey); c.lineTo(ex - 9 * Math.cos(a - .4), ey - 9 * Math.sin(a - .4)); c.lineTo(ex - 9 * Math.cos(a + .4), ey - 9 * Math.sin(a + .4)); c.fill();
      });
      for (let k = 0; k < 2; k++) for (let i = 0; i < (k ? n : m); i++) {
        const [cx, cy] = PX(i, k);
        let on = false, ring = false;
        if (o.mode === 'image') { on = k ? U.has(i) : S.has(i); ring = k ? img.has(i) : pre.has(i); }
        else on = !k && sel === i;
        p.dot(cx, cy, 8, on ? C('accent') : ring ? C('data2') : C('sunk'));
        c.strokeStyle = C('rule-strong'); c.lineWidth = 1; c.beginPath(); c.arc(p.X(cx), p.Y(cy), 8, 0, 7); c.stroke();
        p.text(k ? String.fromCharCode(97 + i) : String(i + 1), cx + (k ? 0.04 : -0.04), cy, C('ink'), k ? 'left' : 'right');
      }
      if (o.mode === 'image') {
        const s1 = [...S].sort().map((i) => i + 1).join(', '), s2 = [...img].sort().map((j) => String.fromCharCode(97 + j)).join(', ');
        const u1 = [...U].sort().map((j) => String.fromCharCode(97 + j)).join(', '), u2 = [...pre].sort().map((i) => i + 1).join(', ');
        say(out, `$S=\\{${s1}\\}$ → $f(S)=\\{${s2}\\}$ <span style="color:var(--data2)">(xanh bên phải)</span>&emsp;|&emsp;$U=\\{${u1}\\}$ → $f^{-1}(U)=\\{${u2}\\}$ <span style="color:var(--data2)">(xanh bên trái)</span>`);
        return;
      }
      const total = f.every((v) => v >= 0);
      if (!total) { say(out, 'Chưa phải hàm: còn ' + f.filter((v) => v < 0).length + ' phần tử của $X$ chưa có ảnh.'); return; }
      const inj = new Set(f).size === f.length, sur = new Set(f).size === n;
      const t = inj && sur ? 'Song ánh: có hàm ngược $f^{-1}:Y\\to X$.' : inj ? 'Đơn ánh, nhưng không toàn ánh (có điểm của $Y$ không ai trỏ tới).' : sur ? 'Toàn ánh, nhưng không đơn ánh (có điểm của $Y$ nhận hai mũi tên).' : 'Không đơn ánh, không toàn ánh.';
      say(out, 'Là một hàm. ' + t + (m > n ? ' Vì $|X|>|Y|$ nên không thể đơn ánh (chuồng bồ câu).' : m < n ? ' Vì $|X|<|Y|$ nên không thể toàn ánh.' : ''), inj && sur ? 'good' : '');
    }
    return draw;
  });

  /* ===== 3.5 Tích Descartes ===== */
  defWidget('cartesian', 'Tích Descartes và đồ thị hàm', 'Bấm các điểm của lưới $X\\times Y$ để chọn một quan hệ $R$. $R$ là đồ thị của một hàm khi mỗi cột có đúng một điểm.', (root) => {
    const p = new Plot(root, { xmin: 0, xmax: 6, ymin: 0, ymax: 6, h: 300, grid: false });
    const row = UI.row(root);
    const out = UI.readout(root);
    let m = 4, n = 3, R = new Set();
    UI.slider(row, '|X|', 1, 5, 1, m, (v) => { m = v; R.clear(); draw(); }, String);
    UI.slider(row, '|Y|', 1, 5, 1, n, (v) => { n = v; R.clear(); draw(); }, String);
    UI.button(row, 'Một hàm ngẫu nhiên', () => { R.clear(); for (let i = 0; i < m; i++) R.add(i + ',' + Math.floor(Math.random() * n)); draw(); });
    UI.button(row, 'Xoá', () => { R.clear(); draw(); });
    p.onPointer((x, y, e) => {
      if (e.type !== 'pointerdown') return;
      const i = Math.round(x) - 1, j = Math.round(y) - 1;
      if (i >= 0 && i < m && j >= 0 && j < n && Math.abs(x - i - 1) < 0.35 && Math.abs(y - j - 1) < 0.35) { const k = i + ',' + j; R.has(k) ? R.delete(k) : R.add(k); draw(); }
    });
    function draw() {
      p.set({ xmax: m + 1, ymax: n + 1 });
      p.clear();
      for (let i = 0; i < m; i++) p.text('x' + (i + 1), i + 1, 0.35, C('muted'), 'center');
      for (let j = 0; j < n; j++) p.text('y' + (j + 1), 0.45, j + 1, C('muted'), 'center');
      for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) {
        const on = R.has(i + ',' + j);
        p.dot(i + 1, j + 1, on ? 7 : 5, on ? C('accent') : C('rule-strong'));
      }
      const cols = Array.from({ length: m }, (_, i) => [...R].filter((k) => +k.split(',')[0] === i).length);
      const isF = cols.every((v) => v === 1);
      say(out, `$|X\\times Y|=${m}\\cdot${n}=${m * n}$ điểm, đã chọn $${R.size}$. ` + (isF ? 'Đây là đồ thị của một hàm $X\\to Y$.' : 'Chưa là đồ thị hàm: ' + (cols.some((v) => v > 1) ? 'có cột chứa nhiều hơn một điểm.' : 'có cột chưa có điểm nào.')) + ` Số hàm $X\\to Y$ là $|Y|^{|X|}=${n ** m}$.`, isF ? 'good' : '');
    }
    return draw;
  });

  /* ===== 3.6 Chuồng bồ câu ===== */
  defWidget('pigeon', 'Nguyên lý chuồng bồ câu', 'Xếp ngẫu nhiên $n$ con bồ câu vào $m$ chuồng. Khi $n>m$, lần nào cũng có chuồng chứa từ hai con trở lên.', (root) => {
    const p = new Plot(root, { xmin: 0, xmax: 8, ymin: 0, ymax: 6, h: 220, grid: false });
    const row = UI.row(root);
    const out = UI.readout(root);
    let n = 6, m = 5, a = [];
    const shuffle = () => (a = Array.from({ length: n }, () => Math.floor(Math.random() * m)));
    shuffle();
    UI.slider(row, 'Bồ câu n', 1, 12, 1, n, (v) => { n = v; shuffle(); draw(); }, String);
    UI.slider(row, 'Chuồng m', 1, 8, 1, m, (v) => { m = v; shuffle(); draw(); }, String);
    UI.button(row, 'Xếp lại', () => { shuffle(); draw(); }, true);
    function draw() {
      p.set({ xmax: m, ymax: Math.max(5, n + 1) });
      p.clear();
      const cnt = Array(m).fill(0);
      a.forEach((h) => cnt[h]++);
      for (let h = 0; h < m; h++) {
        p.rect(h + 0.1, 0.2, h + 0.9, p.o.ymax - 0.3, null, C('rule-strong'));
        for (let k = 0; k < cnt[h]; k++) p.dot(h + 0.5, 0.75 + k * 0.85, 7, cnt[h] > 1 ? C('accent') : C('data2'));
      }
      const mx = Math.max(...cnt);
      say(out, `Chuồng đông nhất có $${mx}$ con.` + (n > m ? ` Vì $${n}>${m}$, không có đơn ánh từ bồ câu vào chuồng.` : ' Khi $n\\le m$ có thể (nhưng không chắc) mỗi chuồng một con.'), n > m ? 'bad' : '');
    }
    return draw;
  });

  /* ===== 4.1 / 4.2 Cặp số và lớp tương đương ===== */
  defWidget('pairs', (o) => (o.mode === 'rat' ? 'Số hữu tỉ là các đường qua gốc' : 'Số nguyên là các đường chéo'), (o) => (o.mode === 'rat'
    ? 'Mỗi điểm $(b,a)$ là thương hình thức $a//b$. Bấm một điểm: mọi điểm cùng biểu diễn một số hữu tỉ sẽ sáng lên.'
    : 'Mỗi điểm $(a,b)$ là hiệu hình thức $a{-}{-}b$. Bấm một điểm: mọi điểm cùng biểu diễn một số nguyên sáng lên.'), (root, o) => {
    const rat = o.mode === 'rat';
    const p = new Plot(root, rat ? { xmin: 0, xmax: 9, ymin: -6, ymax: 9, h: 330, xstep: 1, ystep: 1 } : { xmin: 0, xmax: 9, ymin: 0, ymax: 9, h: 330, xstep: 1, ystep: 1 });
    const out = UI.readout(root);
    let pick = rat ? [2, 4] : [5, 2];
    p.onPointer((x, y, e) => {
      if (e.type !== 'pointerdown') return;
      const X = Math.round(x), Y = Math.round(y);
      if (rat && X < 1) return;
      if (X >= 0 && X <= 8 && Y >= p.o.ymin && Y <= 8) { pick = [X, Y]; draw(); }
    });
    function draw() {
      p.clear();
      const [px, py] = pick;
      if (rat) p.line(0, 0, 9, 9 * py / px, C('band'), 6);
      else p.line(Math.max(0, px - py), Math.max(0, py - px), 9, 9 - (px - py), C('band'), 6);
      for (let a = rat ? 1 : 0; a <= 8; a++) for (let b = p.o.ymin; b <= 8; b++) {
        const eq = rat ? b * px === py * a : a - b === px - py;
        p.dot(a, b, eq ? 5.5 : 2.5, eq ? C('accent') : C('rule-strong'));
      }
      p.dot(px, py, 8, C('accent'), true);
      if (rat) {
        const g = MathX.gcd(py, px) || 1;
        say(out, `Điểm $(${px},${py})$ là $${py}//${px}$. Các điểm sáng $(b,a)$ thoả $a\\cdot${px}=${py}\\cdot b$, cùng biểu diễn số hữu tỉ $\\tfrac{${py / g}}{${px / g}}$.`);
      } else say(out, `Điểm $(${px},${py})$ là $${px}{-}{-}${py}$. Các điểm sáng thoả $a+${py}=${px}+b$, cùng biểu diễn số nguyên $${px - py}$.`);
    }
    return draw;
  });

  /* ===== 4.3 ε-gần ===== */
  defWidget('epsclose', 'ε-gần và bất đẳng thức tam giác', 'Kéo $x,y,z$. Dải đỏ là các số $\\varepsilon$-gần $y$, dải xanh là các số $\\delta$-gần $y$.', (root) => {
    const p = new Plot(root, { xmin: -2, xmax: 2, ymin: -1, ymax: 1, h: 140, grid: false });
    const row = UI.row(root);
    const out = UI.readout(root);
    let x = -0.4, y = 0.1, z = 0.6, e = 0.6, d = 0.6;
    UI.slider(row, 'x', -2, 2, 0.01, x, (v) => { x = v; draw(); });
    UI.slider(row, 'y', -2, 2, 0.01, y, (v) => { y = v; draw(); });
    UI.slider(row, 'z', -2, 2, 0.01, z, (v) => { z = v; draw(); });
    UI.slider(row, 'ε', 0.05, 1.5, 0.05, e, (v) => { e = v; draw(); });
    UI.slider(row, 'δ', 0.05, 1.5, 0.05, d, (v) => { d = v; draw(); });
    function draw() {
      p.clear();
      p.rect(y - e, 0.05, y + e, 0.35, C('band'));
      p.rect(y - d, -0.35, y + d, -0.05, C('band2'));
      p.line(-2, 0, 2, 0, C('axis'), 1);
      for (let t = -2; t <= 2; t++) p.text(String(t), t, -0.6, C('faint'), 'center');
      [[x, 'x', C('accent')], [y, 'y', C('ink')], [z, 'z', C('data2')]].forEach(([v, t, c]) => { p.dot(v, 0, 5, c); p.text(t, v, 0.6, c, 'center'); });
      const a = Math.abs(x - y) <= e, b = Math.abs(y - z) <= d, ok = Math.abs(x - z) <= e + d;
      say(out, `$|x-y|=${fmt(Math.abs(x - y))}$ ${a ? '≤' : '>'} $\\varepsilon$, $|y-z|=${fmt(Math.abs(y - z))}$ ${b ? '≤' : '>'} $\\delta$, $|x-z|=${fmt(Math.abs(x - z))}$ ${ok ? '≤' : '>'} $\\varepsilon+\\delta=${fmt(e + d)}$.` + (a && b ? ' Hai điều kiện đầu đúng thì điều thứ ba luôn đúng.' : ''), a && b ? 'good' : '');
    }
    return draw;
  });

  /* ===== 4.4 Kẹp √2 bằng số hữu tỉ ===== */
  defWidget('sqrt2', 'Kẹp $\\sqrt2$ bằng số hữu tỉ', 'Tăng số chữ số $k$: khoảng hữu tỉ $[a_k,\\,a_k+10^{-k}]$ thu hẹp quanh $\\sqrt2$, nhưng không đầu mút nào có bình phương bằng $2$.', (root) => {
    const p = new Plot(root, { xmin: 1, xmax: 2, ymin: -1, ymax: 1, h: 130, grid: false });
    const row = UI.row(root);
    const out = UI.readout(root);
    let k = 1;
    UI.slider(row, 'Số chữ số k', 0, 12, 1, k, (v) => { k = v; draw(); }, String);
    function draw() {
      const s = Math.pow(10, -k), a = Math.floor(Math.SQRT2 / s) * s, b = a + s;
      const w = s * 2.2;
      p.set({ xmin: a - w * 0.3, xmax: a + w });
      p.clear();
      p.line(p.o.xmin, 0, p.o.xmax, 0, C('axis'), 1);
      p.rect(a, -0.25, b, 0.25, C('band'));
      p.dot(a, 0, 5, C('accent')); p.dot(b, 0, 5, C('accent'));
      p.line(Math.SQRT2, -0.5, Math.SQRT2, 0.5, C('data2'), 1.5, [4, 3]);
      p.text('√2', Math.SQRT2, 0.72, C('data2'), 'center');
      p.text(a.toFixed(k).replace('.', ','), a, -0.6, C('ink'), 'center');
      p.text(b.toFixed(k).replace('.', ','), b, -0.6, C('ink'), 'center');
      say(out, `$a_k=${a.toFixed(k).replace('.', '{,}')}$, $a_k^2=${(a * a).toFixed(Math.min(2 * k, 14)).replace('.', '{,}')}<2$, $(a_k+10^{-k})^2=${(b * b).toFixed(Math.min(2 * k, 14)).replace('.', '{,}')}>2$. Độ rộng khoảng $10^{-${k}}$.`);
    }
    return draw;
  });

  /* ===== Dãy số: phòng thí nghiệm ===== */
  const SEQ = {
    inv: { t: '1/n', f: (n) => 1 / n, L: 0 },
    frac: { t: 'n/(n+1)', f: (n) => n / (n + 1), L: 1 },
    alt: { t: '(−1)ⁿ/n', f: (n) => (n % 2 ? -1 : 1) / n, L: 0 },
    e: { t: '(1+1/n)ⁿ', f: (n) => Math.pow(1 + 1 / n, n), L: Math.E },
    sinn: { t: 'sin(n)/√n', f: (n) => Math.sin(n) / Math.sqrt(n), L: 0 },
    sq2: { t: 'thập phân của √2', f: (n) => Math.floor(Math.SQRT2 * 10 ** Math.min(n, 15)) / 10 ** Math.min(n, 15), L: Math.SQRT2 },
    osc: { t: '(−1)ⁿ', f: (n) => (n % 2 ? -1 : 1), L: null },
    osc2: { t: '(−1)ⁿ(1+1/n)', f: (n) => (n % 2 ? -1 : 1) * (1 + 1 / n), L: null },
    sin: { t: 'sin n', f: (n) => Math.sin(n), L: null },
    harm: { t: '1+1/2+…+1/n', f: (n) => { let s = 0; for (let k = 1; k <= n; k++) s += 1 / k; return s; }, L: null },
    up: { t: '1 − 1/n', f: (n) => 1 - 1 / n, L: 1 },
  };
  const tailStats = (f, N, M) => { let hi = -Infinity, lo = Infinity; for (let n = N; n <= M; n++) { const v = f(n); if (v > hi) hi = v; if (v < lo) lo = v; } return [lo, hi]; };

  defWidget('seq', (o) => ({
    cauchy: 'Dãy Cauchy: đuôi dãy tụ lại', equiv: 'Hai dãy Cauchy tương đương', limit: 'Trò chơi ε–N', sup: 'Cận trên đúng và cận dưới đúng của dãy',
    limsup: 'Giới hạn trên và giới hạn dưới', standard: 'Các giới hạn tiêu chuẩn', subseq: 'Dãy con', complete: 'Không gian đầy đủ và không đầy đủ',
  })[o.mode || 'limit'], (o) => ({
    cauchy: 'Chọn $\\varepsilon$. Mốc $N$ là chỉ số nhỏ nhất mà mọi số hạng từ $N$ trở đi cách nhau không quá $\\varepsilon$ (dải đỏ).',
    equiv: 'Dãy đỏ tiến lên từ dưới, dãy xanh từ trên. Hiệu của chúng (cột xám) nhỏ dần về $0$.',
    limit: 'Máy đưa ra $\\varepsilon$ (dải đỏ quanh $L$). Bạn kéo $N$ để mọi số hạng từ $N$ trở đi nằm trong dải. Thắng rồi thì bấm “ε nhỏ hơn”.',
    sup: 'Đường đỏ là $\\sup_n a_n$, đường xanh là $\\inf_n a_n$. Để ý sup có thể không được dãy đạt tới.',
    limsup: 'Đường bậc đỏ là $a_N^+=\\sup_{n\\ge N}a_n$, đường xanh là $a_N^-=\\inf_{n\\ge N}a_n$. Chúng hội tụ về $\\limsup$ và $\\liminf$.',
    standard: 'Chọn họ dãy và kéo tham số để thấy khi nào dãy hội tụ.',
    subseq: 'Chọn quy tắc lấy chỉ số. Các số hạng của dãy con được tô đậm và nối lại.',
    complete: 'Dãy Cauchy trong một không gian có thể “rơi ra ngoài” nếu giới hạn không thuộc không gian đó.',
  })[o.mode || 'limit'], (root, o) => {
    const mode = o.mode || 'limit';
    const p = new Plot(root, { xmin: 0, xmax: 60, ymin: -1.5, ymax: 1.5, h: 300 });
    const row = UI.row(root);
    const out = UI.readout(root);
    const lists = {
      cauchy: ['inv', 'alt', 'sq2', 'e', 'osc', 'harm'], limit: ['frac', 'inv', 'alt', 'sinn', 'e', 'osc'], sup: ['up', 'alt', 'osc2', 'sin', 'frac'],
      limsup: ['osc2', 'sin', 'alt', 'osc'], subseq: ['osc', 'osc2', 'sin', 'alt'], complete: ['inv', 'sq2'],
    };
    let key = (lists[mode] || ['inv'])[0], eps = 0.2, N = 10, L = 0, sub = 'even', fam = 'pow', par = 0.8, space = 'open';
    const epsList = [0.5, 0.2, 0.1, 0.05, 0.02, 0.01, 0.005];
    let ei = 0;
    if (lists[mode]) UI.select(row, 'Dãy', lists[mode].map((k) => [k, 'aₙ = ' + SEQ[k].t]), key, (v) => { key = v; L = SEQ[v].L ?? 0; Ls && Ls.set(L); ei = 0; draw(); });
    if (mode === 'limit' || mode === 'cauchy' || mode === 'equiv' || mode === 'complete') { }
    let Ls = null, Ns = null;
    if (mode === 'cauchy' || mode === 'equiv' || mode === 'complete') UI.slider(row, 'ε', 0.002, 1, 0.002, eps, (v) => { eps = v; draw(); });
    if (mode === 'limit') {
      L = SEQ[key].L ?? 0;
      Ns = UI.slider(row, 'N', 1, 300, 1, N, (v) => { N = v; draw(); }, String);
      Ls = UI.slider(row, 'L', -1.5, 3, 0.01, L, (v) => { L = v; draw(); });
      UI.button(row, 'ε nhỏ hơn', () => { ei = Math.min(ei + 1, epsList.length - 1); draw(); }, true);
      UI.button(row, 'Chơi lại', () => { ei = 0; N = 10; Ns.set(10); draw(); });
    }
    if (mode === 'limsup') Ns = UI.slider(row, 'N', 1, 60, 1, N, (v) => { N = v; draw(); }, String);
    if (mode === 'subseq') UI.select(row, 'Chỉ số', [['even', 'n chẵn: 2, 4, 6, …'], ['odd', 'n lẻ: 1, 3, 5, …'], ['sq', 'n = k²'], ['three', 'n = 3k'], ['near', 'n gần 2πk + π/2']], sub, (v) => { sub = v; draw(); });
    if (mode === 'standard') {
      UI.select(row, 'Họ dãy', [['pow', 'xⁿ'], ['root', 'x^(1/n)'], ['kroot', '1 / n^(1/k)']], fam, (v) => { fam = v; par = v === 'kroot' ? 2 : 0.8; ps.set(par); draw(); });
      var ps = UI.slider(row, 'x hoặc k', -1.3, 4, 0.01, par, (v) => { par = v; draw(); });
    }
    if (mode === 'complete') UI.select(row, 'Không gian', [['open', 'X = (0, 1] hoặc ℚ'], ['closed', 'X = [0, 1] hoặc ℝ']], space, (v) => { space = v; draw(); });

    function seqF() {
      if (mode === 'standard') {
        if (fam === 'pow') return [(n) => Math.pow(par, n), Math.abs(par) < 1 ? 0 : par === 1 ? 1 : null];
        if (fam === 'root') return [(n) => Math.pow(Math.max(par, 0.001), 1 / n), 1];
        return [(n) => 1 / Math.pow(n, 1 / Math.max(1, Math.round(par))), 0];
      }
      return [SEQ[key].f, SEQ[key].L];
    }
    function range(f, n0, n1) { let lo = Infinity, hi = -Infinity; for (let n = n0; n <= n1; n++) { const v = f(n); if (isFinite(v)) { lo = Math.min(lo, v); hi = Math.max(hi, v); } } const pad = (hi - lo) * 0.12 + 0.05; return [lo - pad, hi + pad]; }

    function draw() {
      const [f, lim] = seqF();
      const NM = mode === 'limit' ? Math.max(60, Math.min(300, N + 40)) : 60;
      let [y0, y1] = range(f, 1, NM);
      if (mode === 'standard' && fam === 'pow' && Math.abs(par) > 1) { y0 = Math.max(y0, -6); y1 = Math.min(y1, 6); }
      if (mode === 'equiv') { y0 = 0.9; y1 = 1.6; }
      if (mode === 'complete') { y0 = key === 'inv' ? -0.15 : 1.38; y1 = key === 'inv' ? 1.05 : 1.52; }
      p.set({ xmin: 0, xmax: NM + 1, ymin: y0, ymax: y1 });
      p.clear();

      if (mode === 'cauchy' || mode === 'complete') {
        let NN = null;
        for (let n = 1; n <= 400; n++) { const [lo, hi] = tailStats(f, n, 2000); if (hi - lo <= eps) { NN = n; break; } }
        if (NN) { const [lo, hi] = tailStats(f, NN, 2000); const mid = (lo + hi) / 2; p.rect(NN, mid - eps / 2, NM + 1, mid + eps / 2, C('band')); p.line(NN, y0, NN, y1, C('accent'), 1, [4, 4]); p.text('N = ' + NN, NN + 0.5, y1 - (y1 - y0) * 0.06, C('accent')); }
        for (let n = 1; n <= NM; n++) p.dot(n, f(n), 3.2, NN && n >= NN ? C('accent') : C('faint'));
        if (mode === 'complete') {
          const lim2 = SEQ[key].L;
          p.line(0, lim2, NM + 1, lim2, C('data2'), 1, [3, 3]);
          p.dot(1.5, lim2, 6, C('data2'), space === 'open');
          const nm = key === 'inv' ? ['0', '(0, 1]', '[0, 1]'] : ['√2', 'ℚ', 'ℝ'];
          say(out, (NN ? `Dãy là Cauchy ($N=${NN}$ với $\\varepsilon=${fmt(eps)}$). ` : '') + `Giới hạn của nó là $${nm[0] === '√2' ? '\\sqrt2' : '0'}$. ` + (space === 'open' ? `Điểm này không thuộc $${nm[1]}$ (chấm rỗng), nên $${nm[1]}$ không đầy đủ.` : `Điểm này thuộc $${nm[2]}$, dãy hội tụ trong không gian.`), space === 'open' ? 'bad' : 'good');
        } else say(out, NN ? `Với $\\varepsilon=${fmt(eps)}$: từ $N=${NN}$ trở đi mọi cặp $a_j,a_k$ cách nhau $\\le\\varepsilon$ (kiểm tra tới $n=2000$).` : `Không tìm được $N\\le400$: mọi đuôi dãy đều dao động rộng hơn $\\varepsilon$. ` + (SEQ[key].L === null ? 'Dãy này không phải dãy Cauchy.' : 'Thử $\\varepsilon$ lớn hơn.'), NN ? 'good' : 'bad');
        return;
      }

      if (mode === 'equiv') {
        const a = (n) => 1 + 1 / n, b = (n) => 1 - 1 / (n * n) + 0.0 + 0.0;
        const A = (n) => Math.floor(Math.SQRT2 * 10 ** Math.min(n, 15)) / 10 ** Math.min(n, 15) - 0.0;
        const B = (n) => A(n) + 10 ** -Math.min(n, 15);
        p.set({ ymin: 1.0, ymax: 1.75, xmax: 20 }); p.clear();
        let NN = null; for (let n = 1; n < 200; n++) { if (Math.abs(B(n) - A(n)) <= eps) { NN = n; break; } }
        for (let n = 1; n <= 19; n++) { p.rect(n - 0.12, A(n), n + 0.12, B(n), NN && n >= NN ? C('band') : C('grid')); p.dot(n, A(n), 3.5, C('accent')); p.dot(n, B(n), 3.5, C('data2')); }
        p.line(0, Math.SQRT2, 20, Math.SQRT2, C('faint'), 1, [3, 3]);
        say(out, `$a_n$: $1;\\ 1{,}4;\\ 1{,}41;\\dots$ và $b_n=a_n+10^{-n}$: $2;\\ 1{,}5;\\ 1{,}42;\\dots$ Hiệu $|a_n-b_n|=10^{-n}\\le\\varepsilon$ khi $n\\ge${NN}$. Hai dãy tương đương, cùng là một số thực $\\sqrt2$.`);
        return;
      }

      if (mode === 'limit') {
        const e = epsList[ei];
        p.hband(L - e, L + e);
        p.line(0, L, NM + 1, L, C('accent'), 1, [4, 3]);
        p.line(N, y0, N, y1, C('ink'), 1.2, [4, 4]);
        let bad = null;
        for (let n = N; n <= 3000; n++) if (Math.abs(f(n) - L) > e) { bad = n; break; }
        for (let n = 1; n <= NM; n++) { const v = f(n); p.dot(n, v, 3.2, n < N ? C('faint') : Math.abs(v - L) > e ? C('bad') : C('accent')); }
        let best = null; for (let n = 1; n <= 3000; n++) { let ok = true; for (let m = n; m <= 3000; m++) if (Math.abs(f(m) - L) > e) { ok = false; n = m; break; } if (ok) { best = n; break; } }
        if (!bad) say(out, `Thắng với $\\varepsilon=${fmt(e)}$: mọi $a_n$ với $n\\ge${N}$ đều thoả $|a_n-L|\\le\\varepsilon$. ` + (ei < epsList.length - 1 ? 'Bấm “ε nhỏ hơn”.' : 'Bạn đã vượt mọi vòng.') + (best && best < N ? ` (N nhỏ nhất là ${best}.)` : ''), 'good');
        else say(out, `Chưa được: $a_{${bad}}=${fmt(f(bad))}$ nằm ngoài dải $|a_n-${fmt(L)}|\\le${fmt(e)}$.` + (SEQ[key].L === null ? ' Dãy này không hội tụ, nên với $\\varepsilon$ đủ nhỏ không có $L$ và $N$ nào thắng.' : best ? ` Cần $N\\ge${best}$.` : ''), 'bad');
        return;
      }

      if (mode === 'sup') {
        let hi = -Infinity, lo = Infinity, ah = 0, al = 0;
        for (let n = 1; n <= 5000; n++) { const v = f(n); if (v > hi) { hi = v; ah = n; } if (v < lo) { lo = v; al = n; } }
        const supTrue = key === 'up' || key === 'frac' ? 1 : key === 'sin' ? 1 : hi, infTrue = key === 'sin' ? -1 : lo;
        p.line(0, supTrue, NM + 1, supTrue, C('accent'), 1.5); p.line(0, infTrue, NM + 1, infTrue, C('data2'), 1.5);
        for (let n = 1; n <= NM; n++) p.dot(n, f(n), 3.2, C('ink'));
        const attained = Math.abs(hi - supTrue) < 1e-12;
        say(out, `$\\sup a_n=${fmt(supTrue)}$` + (attained ? ` đạt tại $n=${ah}$` : ' nhưng không số hạng nào bằng nó') + `; $\\inf a_n=${fmt(infTrue)}$` + (Math.abs(lo - infTrue) < 1e-12 ? ` đạt tại $n=${al}$.` : ', không đạt.') + (key === 'up' || key === 'frac' ? ' Dãy tăng bị chặn nên hội tụ về sup (hội tụ đơn điệu).' : ''));
        return;
      }

      if (mode === 'limsup') {
        const sup = [], inf = [];
        for (let n = 1; n <= NM; n++) { const [lo, hi] = tailStats(f, n, n + 3000); sup.push([n, hi]); inf.push([n, lo]); }
        const step = (arr) => { const pts = []; arr.forEach(([n, v]) => { pts.push([n - 0.5, v], [n + 0.5, v]); }); return pts; };
        p.path(step(sup), C('accent'), 2); p.path(step(inf), C('data2'), 2);
        p.line(N, y0, N, y1, C('ink'), 1, [4, 4]);
        for (let n = 1; n <= NM; n++) p.dot(n, f(n), 2.8, n >= N ? C('ink') : C('faint'));
        const ls = { osc2: 1, sin: 1, alt: 0, osc: 1 }[key], li = { osc2: -1, sin: -1, alt: 0, osc: -1 }[key];
        say(out, `$a_{${N}}^+=${fmt(sup[N - 1][1])}$, $a_{${N}}^-=${fmt(inf[N - 1][1])}$. Khi $N\\to\\infty$: $\\limsup=${ls}$, $\\liminf=${li}$. ` + (ls === li ? 'Hai số bằng nhau nên dãy hội tụ.' : 'Khác nhau nên dãy không hội tụ.'), ls === li ? 'good' : '');
        return;
      }

      if (mode === 'standard') {
        if (lim !== null && lim !== undefined) p.line(0, lim, NM + 1, lim, C('accent'), 1, [4, 3]);
        for (let n = 1; n <= NM; n++) { const v = f(n); if (v > y0 && v < y1) p.dot(n, v, 3.2, C('accent')); }
        const txt = fam === 'pow' ? (Math.abs(par) < 1 ? `$|x|<1$: $x^n\\to0$.` : par === 1 ? '$x=1$: dãy hằng.' : par > 1 ? '$x>1$: $x^n\\to+\\infty$, phân kỳ.' : '$x\\le-1$: dao động, phân kỳ.')
          : fam === 'root' ? `$x=${fmt(Math.max(par, 0.001))}>0$: $x^{1/n}\\to1$.` : `$k=${Math.max(1, Math.round(par))}$: $1/n^{1/k}\\to0$, chậm dần khi $k$ lớn.`;
        say(out, txt);
        return;
      }

      if (mode === 'subseq') {
        const idx = [];
        for (let k = 1; idx.length < 60; k++) {
          const n = sub === 'even' ? 2 * k : sub === 'odd' ? 2 * k - 1 : sub === 'sq' ? k * k : sub === 'three' ? 3 * k : Math.round(2 * Math.PI * k + Math.PI / 2);
          if (n > NM) break; idx.push(n);
        }
        for (let n = 1; n <= NM; n++) p.dot(n, f(n), 2.5, C('faint'));
        p.path(idx.map((n) => [n, f(n)]), C('band'), 2);
        idx.forEach((n) => p.dot(n, f(n), 4, C('accent')));
        let tail = []; for (let k = 1, c = 0; c < 400; k++) { const n = sub === 'even' ? 2 * k : sub === 'odd' ? 2 * k - 1 : sub === 'sq' ? k * k : sub === 'three' ? 3 * k : Math.round(2 * Math.PI * k + Math.PI / 2); if (n > 400) tail.push(f(n)); c++; }
        const lo = Math.min(...tail), hi = Math.max(...tail);
        say(out, hi - lo < 0.05 ? `Dãy con có vẻ hội tụ về $${fmt((lo + hi) / 2, 2)}$. Đây là một điểm giới hạn của $(a_n)$.` : 'Dãy con này vẫn dao động, chưa hội tụ.', hi - lo < 0.05 ? 'good' : '');
      }
    }
    return draw;
  });

  /* ===== 5.5 Cận trên đúng của tập ===== */
  defWidget('supset', 'Tìm cận trên nhỏ nhất', 'Kéo $M$. Nó là cận trên khi không điểm nào của tập vượt qua nó. Thử đẩy $M$ xuống thấp nhất có thể.', (root) => {
    const p = new Plot(root, { xmin: -0.2, xmax: 2.2, ymin: -1, ymax: 1, h: 140, grid: false });
    const row = UI.row(root);
    const out = UI.readout(root);
    const sets = {
      a: { t: '{1 − 1/n : n ≥ 1}', pts: Array.from({ length: 400 }, (_, i) => 1 - 1 / (i + 1)), sup: 1, inSet: false, lab: '1' },
      b: { t: '{x ∈ ℚ : x > 0, x² < 2}', pts: (() => { const r = []; for (let q = 1; q <= 60; q++) for (let pp = 1; pp <= 2 * q; pp++) if (pp * pp < 2 * q * q) r.push(pp / q); return r; })(), sup: Math.SQRT2, inSet: false, lab: '√2' },
      c: { t: '{(−1)ⁿ/n : n ≥ 1}', pts: Array.from({ length: 200 }, (_, i) => ((i + 1) % 2 ? -1 : 1) / (i + 1)), sup: 0.5, inSet: true, lab: '1/2' },
      d: { t: '[0, 1]', pts: MathX.lin(0, 1, 300), sup: 1, inSet: true, lab: '1' },
    };
    let k = 'a', M = 1.6;
    UI.select(row, 'Tập E', Object.entries(sets).map(([k2, v]) => [k2, v.t]), k, (v) => { k = v; draw(); });
    UI.slider(row, 'M', -0.2, 2.2, 0.001, M, (v) => { M = v; draw(); }, (v) => fmt(v, 3));
    function draw() {
      const S = sets[k];
      p.set({ xmin: Math.min(-0.2, Math.min(...S.pts) - 0.2) });
      p.clear();
      p.line(p.o.xmin, 0, p.o.xmax, 0, C('axis'), 1);
      S.pts.forEach((x) => p.line(x, -0.18, x, 0.18, x > M ? C('bad') : C('ink'), 1));
      p.line(S.sup, -0.5, S.sup, 0.5, C('data2'), 1.2, [3, 3]);
      p.text('sup = ' + S.lab, S.sup, -0.72, C('data2'), 'center');
      p.line(M, -0.6, M, 0.6, C('accent'), 2.2);
      p.text('M', M, 0.78, C('accent'), 'center');
      const over = S.pts.filter((x) => x > M + 1e-12).length;
      if (over) say(out, `$M=${fmt(M, 3)}$ không là cận trên: có phần tử của $E$ lớn hơn $M$ (vạch đỏ).`, 'bad');
      else if (M - S.sup < 0.002) say(out, `$M$ chạm tới $\\sup E=${S.lab}$. ` + (S.inSet ? 'Sup thuộc $E$: đó là phần tử lớn nhất.' : 'Sup **không** thuộc $E$, nhưng mọi số nhỏ hơn đều bị vượt qua.'), 'good');
      else say(out, `$M=${fmt(M, 3)}$ là cận trên, nhưng chưa nhỏ nhất: còn hạ được $${fmt(M - S.sup, 3)}$ nữa.`);
    }
    return draw;
  });

  /* ===== 6.7 Luỹ thừa số mũ thực ===== */
  defWidget('powers', 'Định nghĩa $2^{\\sqrt2}$ bằng giới hạn', 'Dãy hữu tỉ $q_k$ (thập phân của $\\sqrt2$) cho dãy $2^{q_k}$ hội tụ.', (root) => {
    const p = new Plot(root, { xmin: 0, xmax: 11, ymin: 1.9, ymax: 2.8, h: 240, xstep: 1 });
    const row = UI.row(root);
    const out = UI.readout(root);
    let K = 4;
    UI.slider(row, 'k', 1, 10, 1, K, (v) => { K = v; draw(); }, String);
    const tbl = el('table', { class: 'wtable' }); root.appendChild(tbl);
    function draw() {
      p.clear();
      const L = Math.pow(2, Math.SQRT2);
      p.line(0, L, 11, L, C('data2'), 1, [4, 3]);
      let rows = '<tr><th>k</th><th>q_k</th><th>2^(q_k)</th></tr>';
      for (let k = 0; k <= 10; k++) {
        const q = Math.floor(Math.SQRT2 * 10 ** k) / 10 ** k, v = Math.pow(2, q);
        p.dot(k, v, k <= K ? 4.5 : 2.5, k <= K ? C('accent') : C('rule-strong'));
        if (k <= K) rows += `<tr><td>${k}</td><td>${q.toFixed(k).replace('.', ',')}</td><td>${v.toFixed(10).replace('.', ',')}</td></tr>`;
      }
      tbl.innerHTML = rows;
      say(out, `$2^{\\sqrt2}=${fmt(L, 10).replace(',', '{,}')}\\ldots$ Sai số hiện tại $${fmt(Math.abs(Math.pow(2, Math.floor(Math.SQRT2 * 10 ** K) / 10 ** K) - L), 10)}$.`);
    }
    return draw;
  });

  /* ===== 7.x Chuỗi ===== */
  defWidget('series', (o) => (o.preset === 'ratio' ? 'Tiêu chuẩn tỉ số và căn' : o.preset === 'p' ? 'Chuỗi $p$' : 'Tổng riêng của chuỗi'), 'Chấm là tổng riêng $S_N$. Chuỗi hội tụ khi các chấm dồn về một mức.', (root, o) => {
    const p = new Plot(root, { xmin: 0, xmax: 100, ymin: 0, ymax: 3, h: 280 });
    const row = UI.row(root);
    const out = UI.readout(root);
    const S = {
      harm: { t: '∑ 1/n', a: (n) => 1 / n, L: null },
      p: { t: '∑ 1/nᵖ', a: (n, q) => 1 / Math.pow(n, q), L: 'p' },
      alt: { t: '∑ (−1)ⁿ⁺¹/n', a: (n) => (n % 2 ? 1 : -1) / n, L: Math.LN2 },
      geo: { t: '∑ rⁿ (n ≥ 0)', a: (n, q) => Math.pow(q, n - 1), L: 'geo' },
      n2n: { t: '∑ n/2ⁿ', a: (n) => n / 2 ** n, L: 2 },
      fact: { t: '∑ 1/n!', a: (n) => 1 / MathX.fact(n), L: Math.E - 1 },
      sqrt: { t: '∑ 1/√n', a: (n) => 1 / Math.sqrt(n), L: null },
      nn: { t: '∑ n!/nⁿ', a: (n) => MathX.fact(n) / n ** n, L: 1.879853862 },
    };
    let k = o.preset === 'p' ? 'p' : o.preset === 'ratio' ? 'n2n' : 'harm', q = o.preset === 'p' ? 2 : 0.6, N = 100;
    UI.select(row, 'Chuỗi', Object.entries(S).map(([k2, v]) => [k2, v.t]), k, (v) => { k = v; q = v === 'p' ? 2 : 0.6; qs.set(q); draw(); });
    const qs = UI.slider(row, 'p hoặc r', 0.2, 3, 0.01, q, (v) => { q = v; draw(); });
    UI.slider(row, 'N', 5, 400, 1, N, (v) => { N = v; draw(); }, String);
    function draw() {
      const s = S[k];
      const sums = []; let t = 0;
      for (let n = 1; n <= N; n++) { t += s.a(n, q); sums.push(t); }
      let L = s.L === 'p' ? (q > 1 ? (q === 2 ? Math.PI ** 2 / 6 : null) : null) : s.L === 'geo' ? (Math.abs(q) < 1 ? 1 / (1 - q) : null) : s.L;
      let lo = Math.min(0, ...sums), hi = Math.max(...sums, L || 0);
      if (!isFinite(hi) || hi > 1e6) hi = 50;
      p.set({ xmax: N + 1, ymin: lo - 0.05 * (hi - lo + 0.1), ymax: hi + 0.12 * (hi - lo + 0.1) });
      p.clear();
      if (L !== null) p.line(0, L, N + 1, L, C('data2'), 1.2, [4, 3]);
      sums.forEach((v, i) => p.dot(i + 1, v, N > 150 ? 1.8 : 2.8, C('accent')));
      const aN = s.a(N, q), aN1 = s.a(N + 1, q);
      const ratio = Math.abs(aN1 / aN), root = Math.pow(Math.abs(aN), 1 / N);
      let verdict = '';
      if (k === 'p') verdict = q > 1 ? `$p=${fmt(q)}>1$: hội tụ.` : `$p=${fmt(q)}\\le1$: phân kỳ (tổng riêng tăng mãi, dù rất chậm).`;
      else if (k === 'geo') verdict = Math.abs(q) < 1 ? `$|r|<1$: hội tụ về $\\frac1{1-r}=${fmt(1 / (1 - q))}$.` : '$|r|\\ge1$: phân kỳ.';
      else verdict = L !== null ? `Hội tụ về $${fmt(L, 4)}$ (đường xanh).` : 'Phân kỳ: tổng riêng tăng không bị chặn.';
      say(out, `$S_{${N}}=${fmt(sums[N - 1], 4)}$, $a_{${N}}=${fmt(aN, 5)}$. Tỉ số $|a_{N+1}/a_N|=${fmt(ratio, 4)}$, căn $|a_N|^{1/N}=${fmt(root, 4)}$. ` + verdict + (o.preset === 'ratio' ? ' Tỉ số hay căn tiến về số $<1$ thì hội tụ; tiến về $1$ thì tiêu chuẩn không kết luận.' : ''));
    }
    return draw;
  });

  /* ===== 7.4 Định lý Riemann về hoán vị ===== */
  defWidget('rearrange', 'Sắp xếp lại $1-\\frac12+\\frac13-\\frac14+\\cdots$', 'Chọn đích $T$. Thuật toán: lấy số dương tiếp theo khi tổng đang $\\le T$, lấy số âm tiếp theo khi tổng $>T$. Mỗi số hạng được dùng đúng một lần.', (root) => {
    const p = new Plot(root, { xmin: 0, xmax: 400, ymin: -2, ymax: 3, h: 280 });
    const row = UI.row(root);
    const out = UI.readout(root);
    let T = 1.5;
    UI.slider(row, 'Đích T', -2, 3, 0.01, T, (v) => { T = v; draw(); });
    function draw() {
      p.clear();
      let pos = 1, neg = 2, s = 0; const pts = [], used = [];
      for (let i = 1; i <= 400; i++) { if (s <= T) { s += 1 / pos; used.push('+1/' + pos); pos += 2; } else { s -= 1 / neg; used.push('−1/' + neg); neg += 2; } pts.push([i, s]); }
      p.line(0, Math.LN2, 400, Math.LN2, C('faint'), 1, [3, 3]);
      p.text('ln 2 (thứ tự gốc)', 300, Math.LN2 + 0.15, C('faint'));
      p.line(0, T, 400, T, C('data2'), 1.2);
      p.path(pts, C('accent'), 1.6);
      say(out, `Sau 400 số hạng: tổng $=${fmt(s, 4)}$. Thứ tự mới bắt đầu: ${used.slice(0, 9).join(' ')} … Cùng các số hạng, chỉ khác thứ tự, mà tổng tiến về $${fmt(T)}$ thay vì $\\ln2\\approx0{,}693$.`);
    }
    return draw;
  });

  /* ===== 8.1 Khách sạn Hilbert ===== */
  defWidget('hilbert', 'Khách sạn Hilbert', 'Mỗi phòng $1,2,3,\\dots$ đều có khách. Bấm để đón khách mới mà không đuổi ai.', (root) => {
    const p = new Plot(root, { xmin: 0, xmax: 14, ymin: 0, ymax: 4, h: 190, grid: false });
    const row = UI.row(root);
    const out = UI.readout(root);
    let room = Array.from({ length: 14 }, (_, i) => 'k' + (i + 1)), msg = 'Khách $k_n$ ở phòng $n$. Khách sạn kín phòng.', arrows = null;
    UI.button(row, 'Đón 1 khách mới', () => { arrows = 'shift'; room = ['MỚI', ...room.slice(0, 13)]; msg = 'Khách phòng $n$ chuyển sang phòng $n+1$. Phòng $1$ trống cho khách mới. Song ánh $n\\mapsto n+1$ từ $\\mathbb N$ lên $\\mathbb N\\setminus\\{1\\}$.'; draw(); }, true);
    UI.button(row, 'Đón vô hạn khách mới', () => { arrows = 'double'; const old = room; room = Array.from({ length: 14 }, (_, i) => ((i + 1) % 2 === 0 ? old[(i + 1) / 2 - 1] : 'M' + ((i + 2) / 2))); msg = 'Khách phòng $n$ chuyển sang phòng $2n$. Mọi phòng lẻ trống, đón các khách mới $M_1,M_2,\\dots$ Vậy $|\\mathbb N|=|\\text{số chẵn}|$.'; draw(); }, true);
    UI.button(row, 'Về ban đầu', () => { arrows = null; room = Array.from({ length: 14 }, (_, i) => 'k' + (i + 1)); msg = 'Khách $k_n$ ở phòng $n$. Khách sạn kín phòng.'; draw(); });
    function draw() {
      p.clear();
      for (let i = 0; i < 14; i++) {
        const x = i + 0.5, g = room[i], isNew = !g.startsWith('k');
        p.rect(i + 0.08, 0.6, i + 0.92, 2.2, isNew ? C('accent-soft') : C('sunk'), C('rule-strong'));
        p.text(String(i + 1), x, 0.32, C('muted'), 'center');
        p.text(isNew ? (g === 'MỚI' ? 'mới' : g) : g, x, 1.4, isNew ? C('accent') : C('ink'), 'center', 'middle', (isNew ? '600 ' : '') + '12px "Be Vietnam Pro"');
      }
      if (arrows) for (let i = 0; i < 6; i++) {
        const a = i + 0.5, b = arrows === 'shift' ? i + 1.5 : 2 * i + 1.5;
        if (b > 14) break;
        const c = p.ctx; c.strokeStyle = C('data2'); c.lineWidth = 1.3; c.beginPath();
        c.moveTo(p.X(a), p.Y(2.3)); c.quadraticCurveTo(p.X((a + b) / 2), p.Y(3.6 + (b - a) * 0.05), p.X(b), p.Y(2.3)); c.stroke();
      }
      p.text('…', 13.9, 1.4, C('muted'));
      say(out, msg);
    }
    return draw;
  });

  /* ===== 8.2 Liệt kê ℚ ===== */
  defWidget('qenum', 'Xếp mọi phân số dương thành một hàng', 'Đi theo các đường chéo của bảng $p/q$, bỏ qua phân số chưa tối giản (gạch chéo). Mỗi số hữu tỉ dương xuất hiện đúng một lần.', (root) => {
    const p = new Plot(root, { xmin: 0.3, xmax: 8.7, ymin: 0.3, ymax: 8.7, h: 340, grid: false });
    const row = UI.row(root);
    const out = UI.readout(root);
    let K = 12;
    UI.slider(row, 'Số bước', 1, 45, 1, K, (v) => { K = v; draw(); }, String);
    const order = [];
    for (let d = 2; d <= 16; d++) for (let i = 1; i < d; i++) { const pp = (d % 2) ? i : d - i, q = d - pp; if (pp <= 8 && q <= 8) order.push([pp, q]); }
    function draw() {
      p.clear();
      for (let a = 1; a <= 8; a++) for (let b = 1; b <= 8; b++) p.text(a + '/' + b, a, 9 - b, C('faint'), 'center');
      const seq = [], path = [];
      let cnt = 0;
      for (const [a, b] of order) {
        if (cnt >= K) break;
        path.push([a, 9 - b]);
        if (MathX.gcd(a, b) === 1) { seq.push(a + '/' + b); cnt++; p.dot(a, 9 - b, 13, C('accent-soft')); p.text(a + '/' + b, a, 9 - b, C('accent'), 'center', 'middle', '600 12px "Be Vietnam Pro"'); }
        else { p.line(a - 0.25, 9 - b - 0.25, a + 0.25, 9 - b + 0.25, C('bad'), 1.5); }
      }
      p.path(path, C('data2'), 1.2);
      say(out, 'Hàng: ' + seq.map((s, i) => `$x_{${i}}=${s.replace('/', '/')}$`).join(', ') + ' … Đây là song ánh $\\mathbb N\\to\\mathbb Q^+$.');
    }
    return draw;
  });

  /* ===== 8.3 Đường chéo Cantor ===== */
  defWidget('diagonal', 'Lập luận đường chéo', 'Mỗi dòng là một dãy 0/1 trong “danh sách đầy đủ”. Dãy mới được tạo bằng cách đảo ô đường chéo. Nó khác dòng thứ $k$ tại cột $k$.', (root) => {
    const box = el('div', { style: 'overflow-x:auto' }); root.appendChild(box);
    const row = UI.row(root);
    const out = UI.readout(root);
    let R = 8, bits;
    const gen = () => (bits = Array.from({ length: R }, () => Array.from({ length: 12 }, () => (Math.random() < 0.5 ? 0 : 1))));
    gen();
    UI.button(row, 'Danh sách khác', () => { gen(); draw(); }, true);
    function draw() {
      const cs = 'padding:4px 7px;text-align:center;border-bottom:1px solid var(--rule);font-variant-numeric:tabular-nums;';
      let h = '<table style="border-collapse:collapse;font-size:14px"><tr><td></td>' + Array.from({ length: 12 }, (_, j) => `<td style="${cs}color:var(--faint)">${j + 1}</td>`).join('') + '</tr>';
      bits.forEach((r, i) => { h += `<tr><td style="${cs}color:var(--muted);text-align:left">s${i + 1}</td>` + r.map((b, j) => `<td style="${cs}${i === j ? 'background:var(--accent-soft);color:var(--accent);font-weight:700' : ''}">${b}</td>`).join('') + '<td style="color:var(--faint)">…</td></tr>'; });
      h += `<tr><td style="${cs}text-align:left;color:var(--data2);font-weight:600">mới</td>` + Array.from({ length: 12 }, (_, j) => `<td style="${cs}color:var(--data2);font-weight:700">${j < R ? 1 - bits[j][j] : '·'}</td>`).join('') + '</tr></table>';
      box.innerHTML = h;
      say(out, 'Dãy mới khác $s_1$ ở vị trí 1, khác $s_2$ ở vị trí 2, … nên không nằm trong danh sách. Không danh sách đếm được nào chứa hết mọi dãy 0/1: $2^{\\mathbb N}$ không đếm được.');
    }
    return draw;
  });

  /* ===== 9.1 Điểm dính ===== */
  defWidget('adherent', 'Điểm dính, điểm trong, điểm cô lập', 'Tập $X=(0,1)\\cup\\{2\\}\\cup[3,4]$. Kéo $x$ và thu nhỏ bán kính $\\varepsilon$ để phân loại.', (root) => {
    const p = new Plot(root, { xmin: -0.5, xmax: 4.5, ymin: -1, ymax: 1, h: 140, grid: false });
    const row = UI.row(root);
    const out = UI.readout(root);
    let x = 1, e = 0.3;
    UI.slider(row, 'x', -0.5, 4.5, 0.01, x, (v) => { x = v; draw(); });
    UI.slider(row, 'ε', 0.01, 1, 0.01, e, (v) => { e = v; draw(); });
    const parts = [[0, 1, false, false], [2, 2, true, true], [3, 4, true, true]];
    const inX = (t) => (t > 0 && t < 1) || Math.abs(t - 2) < 1e-9 || (t >= 3 && t <= 4);
    const meets = (a, b, skip) => parts.some(([l, r, lc, rc]) => { const lo = Math.max(a, l), hi = Math.min(b, r); if (lo > hi || (lo === hi && !((lo > l || lc) && (hi < r || rc)))) return false; if (skip !== undefined && l === r && Math.abs(l - skip) < 1e-9) return false; return true; });
    function draw() {
      p.clear();
      p.line(-0.5, 0, 4.5, 0, C('axis'), 1);
      p.rect(0, -0.12, 1, 0.12, C('accent')); p.dot(0, 0, 5, C('accent'), true); p.dot(1, 0, 5, C('accent'), true);
      p.dot(2, 0, 5, C('accent'));
      p.rect(3, -0.12, 4, 0.12, C('accent')); p.dot(3, 0, 5, C('accent')); p.dot(4, 0, 5, C('accent'));
      for (let t = 0; t <= 4; t++) p.text(String(t), t, -0.55, C('faint'), 'center');
      p.rect(x - e, -0.35, x + e, 0.35, C('band2'));
      p.line(x, -0.5, x, 0.5, C('data2'), 2);
      const ball = meets(x - e, x + e), isIn = inX(x);
      const interior = isIn && [[0, 1], [3, 4]].some(([l, r]) => (l === 0 ? x - e > l : x - e >= l) && (r === 1 ? x + e < r : x + e <= r));
      const isolated = Math.abs(x - 2) < 0.005 && e < 1;
      const adherent = [[0, 1], [3, 4]].some(([l, r]) => x >= l && x <= r) || Math.abs(x - 2) < 0.005;
      let t = ball ? `Khoảng $[x-\\varepsilon,x+\\varepsilon]$ có chạm $X$.` : 'Khoảng không chạm $X$.';
      t += ' Phân loại $x=' + fmt(x) + '$: ' + (isolated ? 'điểm cô lập (thuộc $X$ nhưng xung quanh trống).' : adherent ? (isIn ? 'thuộc $X$' + (interior ? ', và với $\\varepsilon$ này khoảng nằm gọn trong $X$.' : '.') : 'không thuộc $X$ nhưng là **điểm dính** (mọi $\\varepsilon$ đều chạm).') : 'không dính vào $X$ (có $\\varepsilon$ đủ nhỏ không chạm).');
      say(out, t, adherent ? 'good' : '');
    }
    return draw;
  });

  /* ===== 9.3–9.5 ε–δ ===== */
  const FN = {
    hole: { t: '(x² − 1)/(x − 1), x₀ = 1', f: (x) => (Math.abs(x - 1) < 1e-12 ? NaN : (x * x - 1) / (x - 1)), x0: 1, L: 2, fx0: NaN, win: [-0.5, 2.5, -0.5, 4] },
    sinc: { t: 'sin x / x, x₀ = 0', f: (x) => (x === 0 ? NaN : Math.sin(x) / x), x0: 0, L: 1, fx0: NaN, win: [-6, 6, -0.4, 1.3] },
    xsin: { t: 'x·sin(1/x), x₀ = 0', f: (x) => (x === 0 ? 0 : x * Math.sin(1 / x)), x0: 0, L: 0, fx0: 0, win: [-0.6, 0.6, -0.6, 0.6] },
    sin1x: { t: 'sin(1/x), x₀ = 0', f: (x) => (x === 0 ? 0 : Math.sin(1 / x)), x0: 0, L: null, fx0: 0, win: [-0.5, 0.5, -1.4, 1.4] },
    step: { t: 'bậc thang 𝟙(x ≥ 0), x₀ = 0', f: (x) => (x >= 0 ? 1 : 0), x0: 0, L: null, fx0: 1, left: 0, right: 1, win: [-1.5, 1.5, -0.5, 1.5] },
    sq: { t: 'x², x₀ = 1', f: (x) => x * x, x0: 1, L: 1, fx0: 1, win: [-0.5, 2.2, -0.5, 4] },
    sqrt: { t: '√x, x₀ = 0 (miền x ≥ 0)', f: (x) => (x < 0 ? NaN : Math.sqrt(x)), x0: 0, L: 0, fx0: 0, win: [-0.3, 1.5, -0.3, 1.3], dom: (x) => x >= 0 },
    sgn: { t: 'sgn x, x₀ = 0', f: (x) => Math.sign(x), x0: 0, L: null, fx0: 0, left: -1, right: 1, win: [-1.5, 1.5, -1.5, 1.5] },
    floor: { t: '⌊x⌋, x₀ = 1', f: (x) => Math.floor(x), x0: 1, L: null, fx0: 1, left: 0, right: 1, win: [-0.5, 2.5, -0.8, 2.5] },
    remov: { t: 'x² nhưng f(1) = 3, x₀ = 1', f: (x) => (Math.abs(x - 1) < 1e-12 ? 3 : x * x), x0: 1, L: 1, fx0: 3, left: 1, right: 1, win: [-0.5, 2.2, -0.5, 4] },
  };
  defWidget('epsdelta', (o) => ({ limit: 'Giới hạn của hàm: trò chơi ε–δ', cont: 'Liên tục tại một điểm', sided: 'Giới hạn một phía' })[o.preset || 'limit'],
    (o) => (o.preset === 'sided' ? 'Chọn phía tiếp cận. Phần đồ thị trong dải dọc $\\delta$ (chỉ phía đã chọn) phải nằm trong dải ngang $\\varepsilon$ quanh $L$.'
      : 'Dải ngang: $|y-L|\\le\\varepsilon$. Dải dọc: $0<|x-x_0|<\\delta$. Đoạn đồ thị trong dải dọc tô đỏ đậm nếu thoát khỏi dải ngang. Hãy tìm $\\delta$ cho mỗi $\\varepsilon$.'), (root, o) => {
    const preset = o.preset || 'limit';
    const lists = { limit: ['hole', 'sinc', 'xsin', 'sin1x', 'step'], cont: ['sq', 'xsin', 'sqrt', 'step', 'remov'], sided: ['sgn', 'floor', 'remov', 'sin1x'] };
    let k = lists[preset][0], eps = 0.3, del = 0.3, side = 'both', L;
    const p = new Plot(root, { xmin: -1, xmax: 1, ymin: -1, ymax: 1, h: 320 });
    const row = UI.row(root);
    const out = UI.readout(root);
    const setL = () => { const F = FN[k]; L = preset === 'cont' ? F.fx0 : side === 'left' && F.left !== undefined ? F.left : side === 'right' && F.right !== undefined ? F.right : F.L ?? F.fx0 ?? 0; Ls && Ls.set(L); };
    UI.select(row, 'Hàm', lists[preset].map((x) => [x, FN[x].t]), k, (v) => { k = v; setL(); draw(); });
    if (preset === 'sided') UI.select(row, 'Phía', [['both', 'hai phía'], ['left', 'bên trái x < x₀'], ['right', 'bên phải x > x₀']], side, (v) => { side = v; setL(); draw(); });
    UI.slider(row, 'ε', 0.01, 1, 0.01, eps, (v) => { eps = v; draw(); });
    const Ds = UI.slider(row, 'δ', 0.001, 1, 0.001, del, (v) => { del = v; draw(); }, (v) => fmt(v, 3));
    var Ls = preset === 'cont' ? null : UI.slider(row, 'L', -1.5, 3, 0.01, 0, (v) => { L = v; draw(); });
    setL();
    UI.button(row, 'Máy tìm δ', () => {
      let best = null;
      for (let d = 1; d >= 0.0005; d *= 0.93) if (ok(d)) { best = d; break; }
      if (best) { del = best; Ds.set(best); }
      draw(best ? null : 'none');
    });
    function samples(d) {
      const F = FN[k], xs = [];
      for (let i = 1; i <= 1500; i++) { const t = d * i / 1500; if (side !== 'left') xs.push(F.x0 + t); if (side !== 'right') xs.push(F.x0 - t); }
      return xs.filter((x) => !F.dom || F.dom(x));
    }
    function ok(d) { const F = FN[k]; return samples(d).every((x) => { const y = F.f(x); return !isFinite(y) || Math.abs(y - L) <= eps + 1e-12; }) && (preset !== 'cont' || Math.abs(F.fx0 - L) <= eps); }
    function draw(flag) {
      const F = FN[k];
      p.set({ xmin: F.win[0], xmax: F.win[1], ymin: F.win[2], ymax: F.win[3] });
      p.clear();
      p.hband(L - eps, L + eps);
      const a = side === 'right' ? F.x0 : F.x0 - del, b = side === 'left' ? F.x0 : F.x0 + del;
      p.vband(a, b);
      p.fn(F.f, C('faint'), 1.6);
      const c = p.ctx;
      samples(del).sort((u, v) => u - v).forEach((x) => { const y = F.f(x); if (!isFinite(y)) return; c.fillStyle = Math.abs(y - L) <= eps ? C('accent') : C('bad'); c.fillRect(p.X(x) - 1, p.Y(y) - 1.5, 2.2, 3); });
      p.line(F.win[0], L, F.win[1], L, C('accent'), 1, [4, 3]);
      if (isFinite(F.fx0)) p.dot(F.x0, F.fx0, 5, C('ink'));
      if (F.L !== null && isFinite(F.L) && (!isFinite(F.fx0) || F.fx0 !== F.L)) p.dot(F.x0, F.L, 5, C('ink'), true);
      if (F.left !== undefined && F.left !== F.fx0) p.dot(F.x0, F.left, 5, C('ink'), true);
      const good = ok(del);
      let t = good ? `Với $\\varepsilon=${fmt(eps)}$, $\\delta=${fmt(del, 3)}$ dùng được.` : flag === 'none' ? `Không tìm được $\\delta$ nào cho $\\varepsilon=${fmt(eps)}$ với $L=${fmt(L)}$.` : `$\\delta=${fmt(del, 3)}$ chưa được: có điểm trong dải dọc mà $|f(x)-L|>\\varepsilon$.`;
      if (preset === 'cont') t += F.L === F.fx0 && F.L !== null ? ' Hàm liên tục tại $x_0$: mọi $\\varepsilon$ đều có $\\delta$.' : ' Hàm **không** liên tục tại $x_0$: với $\\varepsilon$ nhỏ, không $\\delta$ nào đủ.';
      else if (preset === 'sided') {
        const ln = F.left ?? (k === 'sin1x' ? null : F.L), rn = F.right ?? (k === 'sin1x' ? null : F.L);
        t += k === 'sin1x' ? ' Cả hai giới hạn một phía đều không tồn tại: gián đoạn loại hai.' : ` $f(x_0^-)=${ln}$, $f(x_0^+)=${rn}$, $f(x_0)=${F.fx0}$: ` + (ln !== rn ? 'gián đoạn nhảy.' : ln !== F.fx0 ? 'gián đoạn khử được.' : 'liên tục.');
      } else t += F.L === null ? ' Hàm này không có giới hạn tại $x_0$: thử mọi $L$, với $\\varepsilon$ nhỏ đều thua.' : ` Giới hạn là $L=${F.L}$` + (isFinite(F.fx0) ? '.' : ', dù $f$ không xác định tại $x_0$.');
      say(out, t, good ? 'good' : flag === 'none' ? 'bad' : '');
    }
    return draw;
  });

  /* ===== 9.6 Nguyên lý cực đại ===== */
  defWidget('extreme', 'Hàm liên tục trên đoạn đóng đạt max và min', 'Đổi hàm và hai đầu mút. Bỏ dấu “đóng”, hoặc chọn hàm không liên tục, để thấy max có thể không đạt.', (root) => {
    const p = new Plot(root, { xmin: -2, xmax: 3, ymin: -2, ymax: 4, h: 300 });
    const row = UI.row(root);
    const out = UI.readout(root);
    const F = {
      a: { t: 'sin(3x) + x/2', f: (x) => Math.sin(3 * x) + x / 2 },
      b: { t: 'x²', f: (x) => x * x },
      c: { t: '1/x', f: (x) => 1 / x },
      d: { t: 'x − ⌊x⌋ (không liên tục)', f: (x) => x - Math.floor(x) },
    };
    let k = 'a', a = -1.5, b = 2, closed = true;
    UI.select(row, 'f', Object.entries(F).map(([k2, v]) => [k2, v.t]), k, (v) => { k = v; draw(); });
    UI.slider(row, 'a', -2, 2.9, 0.01, a, (v) => { a = Math.min(v, b - 0.05); draw(); });
    UI.slider(row, 'b', -1.9, 3, 0.01, b, (v) => { b = Math.max(v, a + 0.05); draw(); });
    UI.check(row, 'Đoạn đóng [a, b]', closed, (v) => { closed = v; draw(); });
    function draw() {
      const f = F[k].f;
      p.clear();
      p.vband(a, b);
      p.fn(f, C('faint'), 1.4);
      p.fn(f, C('accent'), 2.4, a, b);
      const n = 3000; let mx = -Infinity, mn = Infinity, xm = a, xn = a, blow = false;
      for (let i = 0; i <= n; i++) { const x = a + (b - a) * i / n; if (!closed && (i === 0 || i === n)) continue; const y = f(x); if (!isFinite(y) || Math.abs(y) > 1e6) { blow = true; continue; } if (y > mx) { mx = y; xm = x; } if (y < mn) { mn = y; xn = x; } }
      if (k === 'c' && a <= 0 && b >= 0) blow = true;
      const eps = (b - a) / n * 2;
      const edgeMax = !closed && (xm - a < eps || b - xm < eps), edgeMin = !closed && (xn - a < eps || b - xn < eps);
      const jumpMax = k === 'd' && Math.abs(mx - 1) < 0.01 && Math.floor(b) !== b;
      p.dot(xm, mx, 6, C('accent'), edgeMax || jumpMax); p.dot(xn, mn, 6, C('data2'), edgeMin);
      p.dot(a, f(a), 4, C('ink'), !closed); p.dot(b, f(b), 4, C('ink'), !closed);
      if (blow) say(out, 'Đoạn chứa $0$, nơi $1/x$ không xác định và không bị chặn. Định lý cần $f$ liên tục trên **toàn** đoạn.', 'bad');
      else if (edgeMax || edgeMin || jumpMax) say(out, `Sup $\\approx${fmt(mx)}$, inf $\\approx${fmt(mn)}$, nhưng ${edgeMax || jumpMax ? 'sup' : 'inf'} chỉ bị tiến sát chứ không đạt (chấm rỗng). ` + (jumpMax ? 'Hàm có bước nhảy nên định lý không áp dụng.' : 'Khoảng mở làm mất điểm đầu mút.'), 'bad');
      else say(out, `Max $=${fmt(mx)}$ tại $x=${fmt(xm)}$, min $=${fmt(mn)}$ tại $x=${fmt(xn)}$. Cả hai đều đạt được.`, 'good');
    }
    return draw;
  });

  /* ===== 9.7 Giá trị trung gian ===== */
  defWidget('ivt', 'Định lý giá trị trung gian bằng chia đôi', 'Chọn mức $y$. Mỗi lần chia đôi giữ lại nửa khoảng mà $f-y$ đổi dấu. Khoảng co dần về điểm $c$ với $f(c)=y$.', (root) => {
    const p = new Plot(root, { xmin: 0, xmax: 2, ymin: -2, ymax: 6, h: 300 });
    const row = UI.row(root);
    const out = UI.readout(root);
    const F = {
      a: { t: 'x⁵ − x − 1 trên [1; 1,6]', f: (x) => x ** 5 - x - 1, a: 1, b: 1.6 },
      b: { t: 'cos x − x trên [0; 1,5]', f: (x) => Math.cos(x) - x, a: 0, b: 1.5 },
      c: { t: 'x³ − 3x + 1 trên [−2; 2]', f: (x) => x ** 3 - 3 * x + 1, a: -2, b: 2 },
    };
    let k = 'a', y = 0, steps = 0;
    UI.select(row, 'f', Object.entries(F).map(([k2, v]) => [k2, v.t]), k, (v) => { k = v; steps = 0; y = 0; ys.set(0); draw(); });
    const ys = UI.slider(row, 'y', -3, 6, 0.01, y, (v) => { y = v; steps = 0; draw(); });
    UI.button(row, 'Chia đôi', () => { steps = Math.min(steps + 1, 30); draw(); }, true);
    UI.button(row, 'Đặt lại', () => { steps = 0; draw(); });
    function draw() {
      const F0 = F[k], f = F0.f;
      const lo = MathX.infOn(f, F0.a, F0.b), hi = MathX.supOn(f, F0.a, F0.b);
      p.set({ xmin: F0.a - 0.1 * (F0.b - F0.a), xmax: F0.b + 0.1 * (F0.b - F0.a), ymin: lo - 0.15 * (hi - lo), ymax: hi + 0.15 * (hi - lo) });
      p.clear();
      p.hband(lo, hi, C('band2'));
      p.fn(f, C('accent'), 2.2, F0.a, F0.b);
      p.line(p.o.xmin, y, p.o.xmax, y, C('data2'), 1.5, [5, 3]);
      let a = F0.a, b = F0.b;
      const sa = Math.sign(f(a) - y), sb = Math.sign(f(b) - y);
      if (sa * sb > 0) { say(out, `$y=${fmt(y)}$ không nằm giữa $f(a)=${fmt(f(a))}$ và $f(b)=${fmt(f(b))}$. Định lý không đảm bảo gì (có thể vẫn có nghiệm). Dải xanh nhạt là tập giá trị $f([a,b])$.`); return; }
      for (let i = 0; i < steps; i++) { const m = (a + b) / 2; if (Math.sign(f(m) - y) === sa || f(m) === y) { if (f(m) === y) { a = b = m; break; } a = m; } else b = m; }
      p.vband(a, b, C('band'));
      p.dot(a, f(a), 4, C('ink')); p.dot(b, f(b), 4, C('ink'));
      say(out, `Sau ${steps} lần chia: $c\\in[${fmt(a, 6)};\\ ${fmt(b, 6)}]$, độ rộng $${fmt(b - a, 6)}$. Đầu trái có $f<y$, đầu phải có $f>y$ (hoặc ngược lại), nên giới hạn chung $c$ thoả $f(c)=y$ nhờ tính liên tục.`);
    }
    return draw;
  });

  /* ===== 9.8 / 10.4 Hàm ngược ===== */
  defWidget('inverse', (o) => (o.mode === 'deriv' ? 'Đạo hàm của hàm ngược' : 'Hàm ngược: đối xứng qua $y=x$'), (o) => (o.mode === 'deriv' ? 'Tiếp tuyến của $f$ tại $(x_0,f(x_0))$ có độ dốc $m$; tiếp tuyến đối xứng của $f^{-1}$ có độ dốc $1/m$.' : 'Đồ thị $f^{-1}$ (xanh) là ảnh gương của đồ thị $f$ (đỏ) qua đường $y=x$.'), (root, o) => {
    const p = new Plot(root, { xmin: -2.5, xmax: 2.5, ymin: -2.5, ymax: 2.5, h: 340 });
    const row = UI.row(root);
    const out = UI.readout(root);
    const F = {
      cube: { t: 'x³', f: (x) => x ** 3, d: (x) => 3 * x * x, a: -1.3, b: 1.3 },
      exp: { t: 'eˣ', f: Math.exp, d: Math.exp, a: -2.5, b: 0.9 },
      sq: { t: 'x² (x ≥ 0)', f: (x) => x * x, d: (x) => 2 * x, a: 0, b: 1.55 },
      mix: { t: 'x + sin(x)/2', f: (x) => x + Math.sin(x) / 2, d: (x) => 1 + Math.cos(x) / 2, a: -1.7, b: 1.7 },
    };
    let k = 'cube', x0 = 0.6;
    UI.select(row, 'f', Object.entries(F).map(([k2, v]) => [k2, v.t]), k, (v) => { k = v; x0 = Math.min(Math.max(x0, F[k].a), F[k].b); xs.set(x0); draw(); });
    const xs = UI.slider(row, 'x₀', -1.7, 1.7, 0.01, x0, (v) => { x0 = Math.min(Math.max(v, F[k].a), F[k].b); draw(); });
    function draw() {
      const G = F[k];
      p.clear();
      p.line(-2.5, -2.5, 2.5, 2.5, C('rule-strong'), 1, [4, 4]);
      p.fn(G.f, C('accent'), 2.2, G.a, G.b);
      const pts = MathX.lin(G.a, G.b, 300).map((x) => [G.f(x), x]);
      p.path(pts, C('data2'), 2.2);
      const y0 = G.f(x0), m = G.d(x0);
      p.line(x0, y0, y0, x0, C('faint'), 1, [2, 3]);
      p.dot(x0, y0, 5, C('accent')); p.dot(y0, x0, 5, C('data2'));
      if (o.mode === 'deriv') {
        p.line(x0 - 1, y0 - m, x0 + 1, y0 + m, C('accent'), 1.2);
        if (Math.abs(m) > 1e-6) p.line(y0 - 1, x0 - 1 / m, y0 + 1, x0 + 1 / m, C('data2'), 1.2);
        else p.line(y0, -2.5, y0, 2.5, C('data2'), 1.2);
        say(out, `$f'(x_0)=${fmt(m)}$, nên $(f^{-1})'(${fmt(y0)})=\\dfrac1{${fmt(m)}}=${Math.abs(m) > 1e-6 ? fmt(1 / m) : '\\text{không tồn tại (tiếp tuyến dựng đứng)}'}$.`, Math.abs(m) > 1e-6 ? '' : 'bad');
      } else say(out, `$f(${fmt(x0)})=${fmt(y0)}$, nên $f^{-1}(${fmt(y0)})=${fmt(x0)}$. Hàm tăng ngặt và liên tục nên hàm ngược cũng vậy.`);
    }
    return draw;
  });

  /* ===== 9.9 Liên tục đều ===== */
  defWidget('unifcont', 'δ phụ thuộc vào điểm', 'Với $\\varepsilon$ cố định, máy tìm $\\delta$ lớn nhất dùng được tại $x_0$. Đồ thị dưới vẽ $\\delta(x_0)$ trên cả miền. Liên tục đều khi $\\inf\\delta(x_0)>0$.', (root) => {
    const p = new Plot(root, { xmin: 0, xmax: 1, ymin: 0, ymax: 1, h: 250 });
    const q = new Plot(root, { xmin: 0, xmax: 1, ymin: 0, ymax: 0.5, h: 130 });
    const row = UI.row(root);
    const out = UI.readout(root);
    const F = {
      inv: { t: '1/x trên (0; 1]', f: (x) => 1 / x, a: 0.02, b: 1, win: [0, 1.02, 0, 12] },
      sq: { t: 'x² trên [0; 6]', f: (x) => x * x, a: 0, b: 6, win: [0, 6.1, 0, 37] },
      sqrt: { t: '√x trên [0; 1]', f: Math.sqrt, a: 0, b: 1, win: [0, 1.02, 0, 1.1] },
      sinv: { t: 'sin(1/x) trên (0; 1]', f: (x) => Math.sin(1 / x), a: 0.03, b: 1, win: [0, 1.02, -1.2, 1.2] },
      sin: { t: 'sin x trên [0; 6]', f: Math.sin, a: 0, b: 6, win: [0, 6.1, -1.2, 1.2] },
    };
    let k = 'inv', eps = 0.5, x0 = 0.5;
    UI.select(row, 'f', Object.entries(F).map(([k2, v]) => [k2, v.t]), k, (v) => { k = v; x0 = (F[v].a + F[v].b) / 2; xs.set(0.5); draw(); });
    UI.slider(row, 'ε', 0.05, 2, 0.01, eps, (v) => { eps = v; draw(); });
    const xs = UI.slider(row, 'x₀ (vị trí)', 0, 1, 0.001, 0.5, (v) => { x0 = F[k].a + (F[k].b - F[k].a) * v; draw(); }, (v) => fmt(F[k].a + (F[k].b - F[k].a) * v));
    function dAt(f, a, b, x) {
      let lo = 0, hi = b - a;
      const good = (d) => { for (let i = 1; i <= 120; i++) { const t = d * i / 120; for (const s of [x - t, x + t]) if (s >= a && s <= b && Math.abs(f(s) - f(x)) > eps) return false; } return true; };
      for (let it = 0; it < 30; it++) { const m = (lo + hi) / 2; good(m) ? (lo = m) : (hi = m); }
      return lo;
    }
    function draw() {
      const G = F[k];
      p.set({ xmin: G.win[0], xmax: G.win[1], ymin: G.win[2], ymax: G.win[3] });
      p.clear();
      const d = dAt(G.f, G.a, G.b, x0);
      p.hband(G.f(x0) - eps, G.f(x0) + eps);
      p.vband(Math.max(G.a, x0 - d), Math.min(G.b, x0 + d));
      p.fn(G.f, C('accent'), 2, G.a, G.b);
      p.dot(x0, G.f(x0), 5, C('ink'));
      const xsA = MathX.lin(G.a, G.b, 120), ds = xsA.map((x) => dAt(G.f, G.a, G.b, x));
      const mn = Math.min(...ds);
      q.set({ xmin: G.win[0], xmax: G.win[1], ymin: 0, ymax: Math.max(...ds) * 1.15 || 1 });
      q.clear();
      q.path(xsA.map((x, i) => [x, ds[i]]), C('data2'), 2);
      q.dot(x0, d, 4.5, C('data2'));
      q.ptext('δ(x₀)', 34, 12, C('data2'));
      const unif = { inv: false, sq: false, sqrt: true, sinv: false, sin: true }[k];
      say(out, `Tại $x_0=${fmt(x0)}$: $\\delta$ lớn nhất $\\approx${fmt(d, 4)}$. Nhỏ nhất trên miền (lấy mẫu) $\\approx${fmt(mn, 4)}$. ` + (unif ? 'Hàm liên tục đều: một $\\delta$ chung dùng được mọi nơi.' : 'Không liên tục đều: trên toàn miền (vô hạn hoặc tiến sát điểm xấu), $\\delta(x_0)\\to0$, không có $\\delta$ chung.'), unif ? 'good' : 'bad');
    }
    return draw;
  });

  /* ===== 9.10 Giới hạn tại vô cực ===== */
  defWidget('infty', 'Giới hạn tại vô cực', 'Chọn $\\varepsilon$, rồi kéo ngưỡng $M$ để phần đồ thị bên phải $M$ nằm gọn trong dải.', (root) => {
    const p = new Plot(root, { xmin: 0, xmax: 60, ymin: -1, ymax: 3, h: 280 });
    const row = UI.row(root);
    const out = UI.readout(root);
    const F = {
      a: { t: 'sin x / x', f: (x) => Math.sin(x) / x, L: 0, y: [-0.4, 1.1] },
      b: { t: '(2x + 1)/x', f: (x) => (2 * x + 1) / x, L: 2, y: [1.6, 3.2] },
      c: { t: 'x·sin(1/x)', f: (x) => x * Math.sin(1 / x), L: 1, y: [0.6, 1.1] },
      d: { t: 'sin x', f: Math.sin, L: null, y: [-1.3, 1.3] },
    };
    let k = 'a', eps = 0.1, M = 5;
    UI.select(row, 'f', Object.entries(F).map(([k2, v]) => [k2, v.t]), k, (v) => { k = v; draw(); });
    UI.slider(row, 'ε', 0.01, 0.5, 0.01, eps, (v) => { eps = v; draw(); });
    UI.slider(row, 'M', 0.5, 58, 0.5, M, (v) => { M = v; draw(); });
    function draw() {
      const G = F[k], L = G.L ?? 0;
      p.set({ ymin: G.y[0], ymax: G.y[1] });
      p.clear();
      p.hband(L - eps, L + eps);
      p.vband(M, 60);
      p.fn(G.f, C('accent'), 2, 0.05, 60);
      let worst = 0; for (let x = M; x < M + 400; x += 0.01) worst = Math.max(worst, Math.abs(G.f(x) - L));
      if (G.L === null) say(out, '$\\sin x$ dao động mãi, không có giới hạn tại vô cực.', 'bad');
      else say(out, `$\\sup_{x>M}|f(x)-${L}|\\approx${fmt(worst, 4)}$ ` + (worst <= eps ? `$\\le\\varepsilon$: ngưỡng $M=${fmt(M)}$ dùng được.` : `$>\\varepsilon$: cần $M$ lớn hơn.`), worst <= eps ? 'good' : '');
    }
    return draw;
  });

  /* ===== 10.x Cát tuyến và tiếp tuyến ===== */
  defWidget('secant', (o) => ({ crit: 'Điểm dừng và cực trị', sign: 'Dấu của đạo hàm và chiều biến thiên', concave: 'Đạo hàm cấp hai và độ lõm' })[o.mode] || 'Từ cát tuyến đến tiếp tuyến', (o) => (o.mode === 'concave' ? 'Đồ thị dưới là $f\'\'$. Phần lõm lên tô đỏ, lõm xuống tô xanh; chấm rỗng là điểm uốn, nơi $f\'\'$ đổi dấu.' : o.mode ? 'Đồ thị dưới là $f\'$. Chỗ $f\'=0$ đánh dấu bằng chấm; phần $f$ tăng tô đỏ, giảm tô xanh.' : 'Cho $h\\to0$: cát tuyến qua $x_0$ và $x_0+h$ quay về tiếp tuyến. Với $|x|$ tại $0$, hai phía cho hai độ dốc khác nhau.'), (root, o) => {
    const p = new Plot(root, { xmin: -2, xmax: 2, ymin: -2, ymax: 2, h: 280 });
    const q = o.mode ? new Plot(root, { xmin: -2, xmax: 2, ymin: -2, ymax: 2, h: 140 }) : null;
    const row = UI.row(root);
    const out = UI.readout(root);
    const F = {
      sq: { t: 'x²', f: (x) => x * x, w: [-2, 2, -0.5, 4] },
      cub: { t: 'x³ − x', f: (x) => x ** 3 - x, w: [-1.8, 1.8, -2, 2] },
      sin: { t: 'sin x', f: Math.sin, w: [-3.5, 3.5, -1.3, 1.3] },
      abs: { t: '|x|', f: Math.abs, w: [-2, 2, -0.5, 2] },
      x3: { t: 'x³', f: (x) => x ** 3, w: [-1.5, 1.5, -2, 2] },
      w: { t: 'x⁴ − 2x²', f: (x) => x ** 4 - 2 * x * x, w: [-1.8, 1.8, -1.3, 2] },
    };
    let k = o.mode === 'crit' ? 'w' : o.mode === 'sign' ? 'cub' : 'sq', x0 = 0.8, h = 0.8;
    UI.select(row, 'f', Object.entries(F).map(([k2, v]) => [k2, v.t]), k, (v) => { k = v; draw(); });
    UI.slider(row, 'x₀', -1.7, 1.7, 0.01, x0, (v) => { x0 = v; draw(); });
    if (!o.mode) UI.slider(row, 'h', -1, 1, 0.001, h, (v) => { h = Math.abs(v) < 0.001 ? 0.001 : v; draw(); }, (v) => fmt(v, 3));
    const der = (f, x) => { const e = 1e-5; const l = (f(x) - f(x - e)) / e, r = (f(x + e) - f(x)) / e; return Math.abs(l - r) > 1e-2 ? NaN : (l + r) / 2; };
    function draw() {
      const G = F[k], f = G.f;
      p.set({ xmin: G.w[0], xmax: G.w[1], ymin: G.w[2], ymax: G.w[3] });
      p.clear();
      const m = der(f, x0);
      if (o.mode === 'concave') {
        const d2 = (x) => (f(x + 1e-3) - 2 * f(x) + f(x - 1e-3)) / 1e-6;
        const xs = MathX.lin(G.w[0], G.w[1], 600);
        for (let i = 1; i < xs.length; i++) { const d = d2((xs[i] + xs[i - 1]) / 2); p.line(xs[i - 1], f(xs[i - 1]), xs[i], f(xs[i]), d > 1e-6 ? C('accent') : d < -1e-6 ? C('data2') : C('ink'), 2.6); }
        const ds = xs.map(d2), lo = Math.min(...ds), hi = Math.max(...ds);
        q.set({ xmin: G.w[0], xmax: G.w[1], ymin: Math.min(lo, -0.5) * 1.1, ymax: Math.max(hi, 0.5) * 1.1 }); q.clear();
        q.fn(d2, C('ink'), 1.8); q.ptext("f ''", 34, 12, C('muted'));
        const infl = [];
        for (let i = 1; i < xs.length; i++) if (Math.sign(ds[i]) !== Math.sign(ds[i - 1]) && Math.abs(ds[i] - ds[i - 1]) > 1e-9) { if (!infl.length || xs[i] - infl[infl.length - 1] > 0.05) infl.push(xs[i]); }
        infl.forEach((x) => { p.dot(x, f(x), 5, C('ink'), true); q.dot(x, 0, 4, C('ink')); });
        const m2 = d2(x0), ma = der(f, x0);
        const tg = (x) => f(x0) + ma * (x - x0);
        p.line(G.w[0], tg(G.w[0]), G.w[1], tg(G.w[1]), C('faint'), 1.2, [4, 3]); p.dot(x0, f(x0), 5, C('accent'));
        q.line(x0, q.o.ymin, x0, q.o.ymax, C('faint'), 1, [3, 3]);
        say(out, `$f''(${fmt(x0)})=${fmt(m2)}$: ` + (m2 > 1e-6 ? '**lõm lên** (đồ thị nằm trên tiếp tuyến đứt).' : m2 < -1e-6 ? '**lõm xuống** (đồ thị nằm dưới tiếp tuyến).' : 'độ lõm đang đổi.') + ' Đỏ: lõm lên, xanh: lõm xuống. Điểm uốn: ' + (infl.map((x) => `$x\\approx${fmt(x, 2)}$`).join(', ') || 'không có') + '.');
        return;
      }
      if (o.mode) {
        const xs = MathX.lin(G.w[0], G.w[1], 600);
        for (let i = 1; i < xs.length; i++) { const d = der(f, (xs[i] + xs[i - 1]) / 2); p.line(xs[i - 1], f(xs[i - 1]), xs[i], f(xs[i]), d > 0 ? C('accent') : C('data2'), 2.6); }
        const ds = xs.map((x) => der(f, x));
        const lo = Math.min(...ds.filter(isFinite)), hi = Math.max(...ds.filter(isFinite));
        q.set({ xmin: G.w[0], xmax: G.w[1], ymin: Math.min(lo, -0.5) * 1.1, ymax: Math.max(hi, 0.5) * 1.1 });
        q.clear();
        q.fn((x) => der(f, x), C('ink'), 1.8);
        q.ptext("f '", 34, 12, C('muted'));
        const crit = [];
        for (let i = 1; i < xs.length; i++) if (isFinite(ds[i]) && isFinite(ds[i - 1]) && (ds[i] === 0 || Math.sign(ds[i]) !== Math.sign(ds[i - 1]) || Math.abs(ds[i]) < 1e-4)) {
          const x = xs[i]; if (crit.length && Math.abs(crit[crit.length - 1][0] - x) < 0.05) continue;
          const kind = ds[i - 1] > 0 && ds[Math.min(i + 3, ds.length - 1)] < 0 ? 'cực đại' : ds[i - 1] < 0 && ds[Math.min(i + 3, ds.length - 1)] > 0 ? 'cực tiểu' : 'không cực trị';
          crit.push([x, kind]);
        }
        crit.forEach(([x, kd]) => { p.dot(x, f(x), 5, C('ink'), kd === 'không cực trị'); q.dot(x, 0, 4, C('ink')); });
        p.line(x0, G.w[2], x0, G.w[3], C('faint'), 1, [3, 3]);
        q.line(x0, q.o.ymin, x0, q.o.ymax, C('faint'), 1, [3, 3]);
        say(out, `$f'(${fmt(x0)})=${isFinite(m) ? fmt(m) : '\\text{không tồn tại}'}$: ` + (m > 0 ? 'đang tăng.' : m < 0 ? 'đang giảm.' : 'tiếp tuyến nằm ngang.') + ' Điểm dừng: ' + (crit.map(([x, kd]) => `$x\\approx${fmt(x, 2)}$ (${kd})`).join(', ') || 'không có') + '.' + (k === 'x3' ? ' $x^3$ tăng ngặt nhưng $f\'(0)=0$.' : ''));
        return;
      }
      p.fn(f, C('ink'), 2);
      const x1 = x0 + h, s = (f(x1) - f(x0)) / h;
      p.line(G.w[0], f(x0) + s * (G.w[0] - x0), G.w[1], f(x0) + s * (G.w[1] - x0), C('data2'), 1.6);
      if (isFinite(m)) p.line(G.w[0], f(x0) + m * (G.w[0] - x0), G.w[1], f(x0) + m * (G.w[1] - x0), C('accent'), 1.6, [5, 4]);
      p.dot(x0, f(x0), 5, C('accent')); p.dot(x1, f(x1), 5, C('data2'));
      UI.legend && null;
      say(out, `Độ dốc cát tuyến $\\dfrac{f(x_0+h)-f(x_0)}{h}=${fmt(s, 4)}$` + (isFinite(m) ? `, đạo hàm $f'(x_0)=${fmt(m, 4)}$ (đường đứt đỏ). Chênh lệch $${fmt(Math.abs(s - m), 4)}$.` : '. Tại đây hai phía cho độ dốc khác nhau, nên **không khả vi**.'), isFinite(m) ? '' : 'bad');
    }
    return draw;
  });

  /* ===== 10.5 L'Hôpital ===== */
  defWidget('lhopital', "Phóng to để thấy L'Hôpital", 'Thu nhỏ khung quanh $0$: $f$ và $g$ gần như hai đường thẳng qua gốc, nên tỉ số của chúng gần bằng tỉ số độ dốc.', (root) => {
    const p = new Plot(root, { xmin: -1, xmax: 1, ymin: -1, ymax: 1, h: 300 });
    const row = UI.row(root);
    const out = UI.readout(root);
    const F = {
      a: { t: 'sin x / x', f: Math.sin, g: (x) => x, df: Math.cos, dg: () => 1, L: 1 },
      b: { t: '(eˣ − 1)/ sin(2x)', f: (x) => Math.exp(x) - 1, g: (x) => Math.sin(2 * x), df: Math.exp, dg: (x) => 2 * Math.cos(2 * x), L: 0.5 },
      c: { t: '(1 − cos x)/x²', f: (x) => 1 - Math.cos(x), g: (x) => x * x, df: Math.sin, dg: (x) => 2 * x, L: 0.5 },
      d: { t: 'ln(1 + x)/x', f: (x) => Math.log(1 + x), g: (x) => x, df: (x) => 1 / (1 + x), dg: () => 1, L: 1 },
    };
    let k = 'a', z = 1.5;
    UI.select(row, 'f/g', Object.entries(F).map(([k2, v]) => [k2, v.t]), k, (v) => { k = v; draw(); });
    UI.slider(row, 'Khung ±', 0.01, 2, 0.01, z, (v) => { z = v; draw(); });
    UI.legend(root, [[C('accent'), 'f'], [C('data2'), 'g']]);
    function draw() {
      const G = F[k];
      const ys = MathX.lin(-z, z, 50).flatMap((x) => [G.f(x), G.g(x)]).filter(isFinite);
      const lo = Math.min(...ys), hi = Math.max(...ys), pad = (hi - lo) * 0.1 + 1e-9;
      p.set({ xmin: -z, xmax: z, ymin: lo - pad, ymax: hi + pad });
      p.clear();
      p.fn(G.f, C('accent'), 2.2); p.fn(G.g, C('data2'), 2.2);
      const x = z / 2;
      say(out, `Tại $x=${fmt(x, 4)}$: $\\dfrac{f}{g}=${fmt(G.f(x) / G.g(x), 5)}$, $\\dfrac{f'}{g'}=${fmt(G.df(x) / G.dg(x), 5)}$. Giới hạn khi $x\\to0$ là $${G.L}$.`);
    }
    return draw;
  });

  /* ===== 11.x Tổng Riemann ===== */
  const RF = {
    sq: { t: 'x² trên [0; 1]', f: (x) => x * x, a: 0, b: 1, I: 1 / 3 },
    sin: { t: 'sin x trên [0; π]', f: Math.sin, a: 0, b: Math.PI, I: 2 },
    wave: { t: '1 + sin(3x)/2 + x/3 trên [0; 3]', f: (x) => 1 + Math.sin(3 * x) / 2 + x / 3, a: 0, b: 3, I: null },
    step: { t: 'hằng từng đoạn trên [0; 3]', f: (x) => (x < 1 ? 2 : x < 2.2 ? 0.5 : 1.5), a: 0, b: 3, I: 2 + 0.6 + 1.2 },
    mono: { t: 'tăng, nhiều bước nhảy trên [0; 1]', f: (x) => Math.floor(5 * x) / 5 + x / 4, a: 0, b: 1, I: 0.4 + 0.125 },
    exp: { t: 'eˣ trên [0; 2]', f: Math.exp, a: 0, b: 2, I: Math.exp(2) - 1 },
    dir: { t: 'Dirichlet 𝟙_ℚ trên [0; 1]', f: null, a: 0, b: 1, I: null },
  };
  defWidget('riemann', (o) => (o.preset === 'dirichlet' ? 'Hàm Dirichlet không khả tích Riemann' : o.mode === 'step' ? 'Tích phân của hàm hằng từng đoạn' : 'Tổng trên và tổng dưới'), 'Ô đỏ nhạt: tổng trên $U(f,P)$ (lấy sup trên mỗi khoảng). Ô xanh: tổng dưới $L(f,P)$ (lấy inf). Chia mịn hơn để hai tổng kẹp lại.', (root, o) => {
    const p = new Plot(root, { xmin: 0, xmax: 1, ymin: 0, ymax: 1, h: 290 });
    const row = UI.row(root);
    const out = UI.readout(root);
    let k = o.preset === 'cont' ? 'wave' : o.preset === 'mono' ? 'mono' : o.preset === 'dirichlet' ? 'dir' : o.mode === 'step' ? 'step' : 'sq', n = 6, rnd = false, seed = 1;
    UI.select(row, 'f', Object.entries(RF).map(([k2, v]) => [k2, v.t]), k, (v) => { k = v; draw(); });
    UI.slider(row, 'Số khoảng', 1, 120, 1, n, (v) => { n = v; draw(); }, String);
    UI.check(row, 'Phân hoạch không đều', rnd, (v) => { rnd = v; seed++; draw(); });
    function parts(a, b) {
      if (!rnd) return MathX.lin(a, b, n + 1);
      let s = seed * 9301; const r = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
      const pts = [a, b]; for (let i = 0; i < n - 1; i++) pts.push(a + (b - a) * r());
      return pts.sort((x, y) => x - y);
    }
    function draw() {
      const G = RF[k], f = G.f;
      const top = k === 'dir' ? 1.2 : MathX.supOn(f, G.a, G.b) * 1.15 + 0.05;
      p.set({ xmin: G.a - (G.b - G.a) * 0.03, xmax: G.b + (G.b - G.a) * 0.03, ymin: -0.05 * top, ymax: top });
      p.clear();
      const P = parts(G.a, G.b);
      let U = 0, L = 0;
      for (let i = 0; i < P.length - 1; i++) {
        const x1 = P[i], x2 = P[i + 1];
        let sup, inf;
        if (k === 'dir') { sup = 1; inf = 0; }
        else if (k === 'step' || k === 'mono') { sup = -Infinity; inf = Infinity; for (let j = 0; j <= 200; j++) { const t = x1 + (x2 - x1) * j / 200; const y = f(Math.min(t, x2 - 1e-12)); sup = Math.max(sup, y); inf = Math.min(inf, y); } }
        else { sup = MathX.supOn(f, x1, x2, 60); inf = MathX.infOn(f, x1, x2, 60); }
        U += sup * (x2 - x1); L += inf * (x2 - x1);
        p.rect(x1, 0, x2, sup, C('band'), n <= 60 ? C('accent') : null);
        p.rect(x1, 0, x2, inf, C('band2'), n <= 60 ? C('data2') : null);
      }
      if (k === 'dir') { const c = p.ctx; c.fillStyle = C('ink'); for (let i = 0; i < 700; i++) { const x = Math.random(); c.fillRect(p.X(x), p.Y(i % 2 ? 1 : 0) - 1, 1.5, 2); } }
      else if (k === 'step' || k === 'mono') { p.fn(f, C('ink'), 2.2, G.a, G.b); }
      else p.fn(f, C('ink'), 2.2, G.a, G.b);
      const I = k === 'dir' ? NaN : G.I ?? MathX.integ(f, G.a, G.b);
      say(out, `$U(f,P)=${fmt(U, 4)}$, $L(f,P)=${fmt(L, 4)}$, $U-L=${fmt(U - L, 4)}$. ` + (k === 'dir' ? 'Mọi khoảng đều chứa cả số hữu tỉ và vô tỉ, nên $U=1$, $L=0$ với **mọi** phân hoạch: không khả tích Riemann.' : `Tích phân $\\int f=${fmt(I, 4)}$ nằm giữa hai tổng. ` + (k === 'mono' ? `Với hàm đơn điệu và chia đều, $U-L\\le\\frac{(f(b)-f(a))(b-a)}{n}$.` : '')), k === 'dir' ? 'bad' : '');
    }
    return draw;
  });

  /* ===== 11.8 Riemann–Stieltjes ===== */
  defWidget('stieltjes', 'Tích phân Riemann–Stieltjes', 'Thay độ dài $|J|$ bằng “khối lượng” $\\alpha(J)$. Cột xanh là $\\alpha$; khi $\\alpha$ nhảy, tích phân nhặt giá trị của $f$ tại điểm nhảy.', (root) => {
    const p = new Plot(root, { xmin: 0, xmax: 2, ymin: -0.2, ymax: 4.5, h: 270 });
    const row = UI.row(root);
    const out = UI.readout(root);
    const A = {
      x: { t: 'α(x) = x', a: (x) => x },
      sq: { t: 'α(x) = x²', a: (x) => x * x },
      j1: { t: 'α nhảy 1 tại x = 1', a: (x) => (x >= 1 ? 1 : 0) },
      j2: { t: 'α nhảy tại 0,5 và 1,5', a: (x) => (x >= 0.5 ? 1 : 0) + (x >= 1.5 ? 2 : 0) },
    };
    const Fs = { x: ['f(x) = x', (x) => x], c: ['f(x) = 1 + cos(3x)', (x) => 1 + Math.cos(3 * x)] };
    let ka = 'j1', kf = 'x', n = 20;
    UI.select(row, 'α', Object.entries(A).map(([k2, v]) => [k2, v.t]), ka, (v) => { ka = v; draw(); });
    UI.select(row, 'f', Object.entries(Fs).map(([k2, v]) => [k2, v[0]]), kf, (v) => { kf = v; draw(); });
    UI.slider(row, 'Số khoảng', 2, 200, 1, n, (v) => { n = v; draw(); }, String);
    UI.legend(root, [[C('accent'), 'f'], [C('data2'), 'α']]);
    function draw() {
      const a = A[ka].a, f = Fs[kf][1];
      p.clear();
      p.fn(a, C('data2'), 2.2, 0, 2, { join: false });
      p.fn(f, C('accent'), 2.2, 0, 2);
      let S = 0; const P = MathX.lin(0, 2, n + 1);
      for (let i = 0; i < n; i++) { const m = (P[i] + P[i + 1]) / 2, da = a(P[i + 1]) - a(P[i]); S += f(m) * da; if (Math.abs(da) > 1e-9 && n <= 60) p.rect(P[i], 0, P[i + 1], f(m), C('band')); }
      const exact = { x: MathX.integ(f, 0, 2), sq: MathX.integ((x) => f(x) * 2 * x, 0, 2), j1: f(1), j2: f(0.5) + 2 * f(1.5) }[ka];
      say(out, `Tổng $\\sum f(\\xi_J)\\,\\alpha(J)=${fmt(S, 4)}$, giá trị đúng $\\int f\\,d\\alpha=${fmt(exact, 4)}$. ` + (ka === 'j1' ? 'Chỉ khoảng chứa $x=1$ có khối lượng, nên tích phân $=f(1)$.' : ka === 'j2' ? 'Bằng $f(0{,}5)\\cdot1+f(1{,}5)\\cdot2$.' : ka === 'sq' ? 'Bằng $\\int f(x)\\,2x\\,dx$ vì $\\alpha\'=2x$.' : 'Đây là tích phân Riemann thường.'));
    }
    return draw;
  });

  /* ===== 11.9 Định lý cơ bản ===== */
  defWidget('ftc', 'Diện tích tích luỹ $F(x)=\\int_a^x f$', 'Kéo $x$. Đồ thị dưới là $F$; độ dốc của $F$ tại $x$ đúng bằng chiều cao $f(x)$.', (root) => {
    const p = new Plot(root, { xmin: 0, xmax: 6, ymin: -1.5, ymax: 2, h: 220 });
    const q = new Plot(root, { xmin: 0, xmax: 6, ymin: -1, ymax: 4, h: 200 });
    const row = UI.row(root);
    const out = UI.readout(root);
    const F = {
      a: { t: 'f(x) = sin x + 0,3', f: (x) => Math.sin(x) + 0.3 },
      b: { t: 'f(x) = x/3 − 0,5', f: (x) => x / 3 - 0.5 },
      c: { t: 'f(x) = cos(2x)·e^(−x/4)', f: (x) => Math.cos(2 * x) * Math.exp(-x / 4) },
    };
    let k = 'a', x = 2;
    UI.select(row, 'f', Object.entries(F).map(([k2, v]) => [k2, v.t]), k, (v) => { k = v; draw(); });
    UI.slider(row, 'x', 0, 6, 0.01, x, (v) => { x = v; draw(); });
    function draw() {
      const f = F[k].f;
      const Fx = (t) => MathX.integ(f, 0, t, 400);
      const xs = MathX.lin(0, 6, 160), Fs = xs.map(Fx);
      const lo = Math.min(...xs.map(f)), hi = Math.max(...xs.map(f));
      p.set({ ymin: Math.min(lo, 0) - 0.3, ymax: Math.max(hi, 0) + 0.3 });
      p.clear();
      const c = p.ctx;
      for (let i = 0; i < 300; i++) { const t0 = x * i / 300, t1 = x * (i + 1) / 300, y = f((t0 + t1) / 2); p.rect(t0, 0, t1, y, y >= 0 ? C('band') : C('band2')); }
      p.fn(f, C('accent'), 2.2);
      p.line(x, p.o.ymin, x, p.o.ymax, C('ink'), 1, [3, 3]);
      p.dot(x, f(x), 5, C('accent'));
      q.set({ ymin: Math.min(...Fs) - 0.3, ymax: Math.max(...Fs) + 0.3 });
      q.clear();
      q.path(xs.map((t, i) => [t, Fs[i]]), C('data2'), 2.2);
      const Fv = Fx(x), m = f(x);
      q.line(x - 0.8, Fv - 0.8 * m, x + 0.8, Fv + 0.8 * m, C('accent'), 1.6);
      q.dot(x, Fv, 5, C('data2'));
      q.ptext('F(x)', 34, 12, C('data2'));
      const h = 0.001;
      say(out, `$F(${fmt(x)})=${fmt(Fv, 4)}$ (diện tích có dấu: đỏ dương, xanh âm). $\\dfrac{F(x+h)-F(x)}{h}=${fmt((Fx(x + h) - Fv) / h, 4)}$ và $f(x)=${fmt(m, 4)}$.`);
    }
    return draw;
  });

  /* ===== A.1 Bảng chân trị ===== */
  defWidget('truth', 'Bảng chân trị', 'Chọn phép nối. Dòng tô đỏ là dòng mệnh đề sai.', (root) => {
    const row = UI.row(root);
    const box = el('div'); root.appendChild(box);
    const out = UI.readout(root);
    const OPS = {
      and: ['P ∧ Q', (a, b) => a && b, 'Chỉ đúng khi cả hai đúng.'],
      or: ['P ∨ Q', (a, b) => a || b, 'Sai chỉ khi cả hai sai. “Hoặc” trong toán là hoặc bao hàm.'],
      imp: ['P ⇒ Q', (a, b) => !a || b, 'Chỉ sai khi P đúng mà Q sai. Hai dòng P sai đều đúng (đúng một cách rỗng).'],
      con: ['¬Q ⇒ ¬P', (a, b) => b || !a, 'Phản đảo: cột kết quả giống hệt P ⇒ Q.'],
      conv: ['Q ⇒ P', (a, b) => !b || a, 'Mệnh đề đảo: khác P ⇒ Q ở dòng (S, Đ).'],
      iff: ['P ⇔ Q', (a, b) => a === b, 'Đúng khi P và Q cùng giá trị.'],
      dm: ['¬(P ∧ Q)  so với  ¬P ∨ ¬Q', (a, b) => !(a && b), 'De Morgan: hai cột luôn bằng nhau.'],
    };
    let k = 'imp';
    UI.select(row, 'Phép nối', Object.entries(OPS).map(([k2, v]) => [k2, v[0]]), k, (v) => { k = v; draw(); });
    function draw() {
      const [t, f, note] = OPS[k];
      const B = (v) => (v ? 'Đ' : 'S');
      let h = '<table class="wtable" style="max-width:420px"><tr><th>P</th><th>Q</th><th>' + t + '</th></tr>';
      [[true, true], [true, false], [false, true], [false, false]].forEach(([a, b]) => { const r = f(a, b); h += `<tr style="${r ? '' : 'background:var(--bad-soft);color:var(--bad)'}"><td>${B(a)}</td><td>${B(b)}</td><td><b>${B(r)}</b></td></tr>`; });
      box.innerHTML = h + '</table>';
      say(out, note);
    }
    return draw;
  });

  /* ===== B.2 0,999… = 1 ===== */
  defWidget('decimal', 'Vì sao $0{,}999\\ldots=1$', 'Tổng riêng $0{,}9\\ldots9$ ($n$ chữ số) cách $1$ đúng $10^{-n}$. Khung nhìn phóng to theo $n$: luôn còn khoảng hở, nhưng khoảng hở nhỏ hơn mọi số dương.', (root) => {
    const p = new Plot(root, { xmin: 0, xmax: 1.1, ymin: -1, ymax: 1, h: 120, grid: false });
    const row = UI.row(root);
    const out = UI.readout(root);
    let n = 2;
    UI.slider(row, 'n', 1, 15, 1, n, (v) => { n = v; draw(); }, String);
    function draw() {
      const s = 1 - 10 ** -n, w = 10 ** -n;
      p.set({ xmin: 1 - 3 * w, xmax: 1 + 1.2 * w });
      p.clear();
      p.line(p.o.xmin, 0, p.o.xmax, 0, C('axis'), 1);
      p.rect(s, -0.15, 1, 0.15, C('band'));
      p.dot(s, 0, 5, C('accent')); p.dot(1, 0, 5, C('data2'));
      p.text('0,' + '9'.repeat(n), s, 0.55, C('accent'), 'center');
      p.text('1', 1, 0.55, C('data2'), 'center');
      say(out, `$1-0{,}\\underbrace{9\\ldots9}_{${n}}=10^{-${n}}$. Nếu $0{,}999\\ldots$ nhỏ hơn $1$ một lượng $d>0$ thì $d\\le10^{-n}$ với mọi $n$, vô lý. Vậy hai cách viết chỉ cùng một số.`);
    }
    return draw;
  });
})();
