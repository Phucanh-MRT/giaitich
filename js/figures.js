/* Hình minh hoạ động (SVG + SMIL) cho các mục chưa có minh hoạ tương tác.
   Mỗi hình chạy vòng lặp; màu lấy từ biến CSS qua class (xem .fig trong app.css). */
(function () {
  const F = (window.FIGS = {});
  /* hiện dần (a→b) rồi giữ tới cuối vòng */
  const op = (a, b, d) => `<animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;${a};${b};0.95;1" dur="${d}s" repeatCount="indefinite"/>`;
  /* chỉ hiện trong khoảng [a, c] */
  const win = (a, c, d) => `<animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;${a};${a + 0.03};${c};${c + 0.03};1" dur="${d}s" repeatCount="indefinite"/>`;
  const dr = (a, b, d) => `<animate attributeName="stroke-dashoffset" values="1;1;0;0;1" keyTimes="0;${a};${b};0.95;1" dur="${d}s" repeatCount="indefinite"/>`;
  const P = (d, cls, w, anim) => `<path d="${d}" class="k ${cls}" stroke-width="${w || 2}"${anim && anim.includes('dashoffset') ? ' pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"' : ''}>${anim || ''}</path>`;
  const T = (x, y, s, cls, anc, anim) => `<text x="${x}" y="${y}" class="${cls || ''}" text-anchor="${anc || 'start'}">${s}${anim || ''}</text>`;
  const R = (x, y, w, h, cls, rx, anim) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx === undefined ? 8 : rx}" class="${cls}">${anim || ''}</rect>`;
  const Cc = (x, y, r, cls, anim) => `<circle cx="${x}" cy="${y}" r="${r}" class="${cls}">${anim || ''}</circle>`;
  const G = (inner, anim, attrs) => `<g ${attrs || ''}>${anim || ''}${inner}</g>`;
  const L = (x1, y1, x2, y2, cls, w, extra) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="k ${cls}" stroke-width="${w || 1.5}" ${extra || ''}/>`;
  const curve = (f, a, b, X, Y, n) => { n = n || 160; let s = ''; for (let i = 0; i <= n; i++) { const t = a + (b - a) * i / n; s += (i ? 'L' : 'M') + X(t).toFixed(1) + ' ' + Y(f(t)).toFixed(1); } return s; };
  const arrowHead = (x, y, ang, cls) => { const a = ang, s = 8; return `<path d="M${x} ${y}L${x - s * Math.cos(a - 0.45)} ${y - s * Math.sin(a - 0.45)}L${x - s * Math.cos(a + 0.45)} ${y - s * Math.sin(a + 0.45)}Z" class="${cls}"/>`; };
  const arrow = (x1, y1, x2, y2, cls, fcls, anim) => G(L(x1, y1, x2, y2, cls, 1.8) + arrowHead(x2, y2, Math.atan2(y2 - y1, x2 - x1), fcls), anim);
  const intervals = (f, inSet, a, b, n) => { const out = []; let st = null; for (let i = 0; i <= n; i++) { const t = a + (b - a) * i / n; const on = inSet(f(t)) && i < n; if (on && st === null) st = t; if (!on && st !== null) { out.push([st, t]); st = null; } } return out; };
  const def = (id, cap, h, body) => (F[id] = { cap, h, body });

  /* ---------- 1.1 ---------- */
  def('1.1', 'Mỗi kết quả dựa trên những kết quả trước nó. Một giả thiết bị bỏ qua là đủ làm kết luận sai.', 220, () => {
    const D = 9, names = ['Định nghĩa', 'Bổ đề', 'Định lý', 'Hệ quả'];
    let s = '';
    names.forEach((n, i) => {
      const x = 20 + i * 155;
      s += G(R(x, 40, 125, 52, i === 2 ? 'fA sa' : 'fW sr', 10) + T(x + 62, 72, n, 't-b', 'middle'), op(0.04 + i * 0.1, 0.1 + i * 0.1, D));
      if (i) s += arrow(x - 28, 66, x - 4, 66, 'si', 'fi', op(0.06 + i * 0.1, 0.1 + i * 0.1, D));
    });
    const chk = [['Giả thiết 1', true], ['Giả thiết 2', true], ['Giả thiết 3', false]];
    chk.forEach(([t, ok], i) => {
      s += G(R(340 + i * 98, 140, 88, 30, ok ? 'fW sg' : 'fW sb', 15) + T(384 + i * 98, 160, t + (ok ? ' ✓' : ' ✗'), ok ? 't-g t-s' : 't-r t-s', 'middle'), op(0.5 + i * 0.08, 0.55 + i * 0.08, D));
    });
    s += P('M372 92 C 372 115, 384 125, 384 138', 'sr', 1.4, dr(0.45, 0.5, D));
    s += G(T(330, 198, 'Thiếu một giả thiết → định lý không dùng được', 't-r t-b', 'middle'), op(0.8, 0.85, D));
    s += G(R(310, 36, 125, 60, 'fN sb', 12) , op(0.8, 0.84, D));
    return s;
  });

  /* ---------- 2.2 ---------- */
  def('2.2', 'Cộng $2+3$ chỉ bằng định nghĩa đệ quy: mỗi dòng dùng $(n{+}{+})+m=(n+m){+}{+}$ hoặc $0+m=m$. Bên phải: mỗi “++” thêm một chấm.', 230, () => {
    const D = 10, rows = ['2 + 3 = (1++) + 3', '= (1 + 3)++', '= ((0++) + 3)++', '= ((0 + 3)++)++', '= (3++)++ = 4++ = 5'];
    let s = '';
    rows.forEach((r, i) => (s += G(T(i ? 66 : 30, 40 + i * 38, r, i === 4 ? 't-l t-a' : 't-l'), op(0.05 + i * 0.13, 0.1 + i * 0.13, D))));
    for (let k = 0; k < 5; k++) s += Cc(430 + k * 34, 120, 12, k < 3 ? 'fd' : 'fa', k < 3 ? op(0.05, 0.1, D) : op(0.6 + (k - 3) * 0.13, 0.66 + (k - 3) * 0.13, D));
    s += T(481, 160, '3', 't-d t-b', 'middle', op(0.05, 0.1, D)) + T(549, 160, '++  ++', 't-a t-b', 'middle', op(0.62, 0.7, D));
    return s;
  });

  /* ---------- 2.3 ---------- */
  def('2.3', 'Nhân là cộng lặp lại: $(n{+}{+})\\times m = n\\times m + m$. Mỗi hàng mới thêm $m=4$ chấm.', 210, () => {
    const D = 7; let s = '';
    const labels = ['0 × 4 = 0', '1 × 4 = 0 + 4 = 4', '2 × 4 = 4 + 4 = 8', '3 × 4 = 8 + 4 = 12'];
    s += T(40, 40, labels[0], 't-m', 'start', op(0.02, 0.06, D));
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 4; c++) s += Cc(60 + c * 40, 80 + r * 40, 13, r === 2 ? 'fa' : 'fd', op(0.12 + r * 0.22, 0.17 + r * 0.22, D));
      s += T(260, 85 + r * 40, labels[r + 1], r === 2 ? 't-a t-b' : '', 'start', op(0.12 + r * 0.22, 0.17 + r * 0.22, D));
    }
    return s;
  });

  /* ---------- 3.2 ---------- */
  def('3.2', 'Câu hỏi “$\\Omega\\in\\Omega$?” chạy mãi trong vòng lặp: mỗi câu trả lời kéo theo câu trả lời ngược lại. Không có lối ra, nên $\\Omega$ không thể là một tập hợp.', 220, () => {
    const D = 4; let s = '';
    s += R(70, 70, 170, 60, 'fA sa', 30) + T(155, 106, 'Ω ∈ Ω', 't-l', 'middle');
    s += R(400, 70, 170, 60, 'fD sd', 30) + T(485, 106, 'Ω ∉ Ω', 't-l', 'middle');
    const top = 'M240 88 C 300 30, 340 30, 400 88', bot = 'M400 112 C 340 170, 300 170, 240 112';
    s += P(top, 'si', 1.6) + P(bot, 'si', 1.6);
    s += arrowHead(400, 88, 0.75, 'fi') + arrowHead(240, 112, Math.PI + 0.75, 'fi');
    s += T(320, 34, 'thì Ω thoả “x ∉ x”… nên Ω ∉ Ω', 't-m t-s', 'middle') + T(320, 182, 'thì Ω thoả điều kiện… nên Ω ∈ Ω', 't-m t-s', 'middle');
    s += `<circle r="7" class="fa"><animateMotion dur="${D}s" repeatCount="indefinite" path="${top} L400 112 ${bot.slice(bot.indexOf('C'))} Z"/></circle>`.replace(bot.slice(bot.indexOf('C')), 'C 340 170, 300 170, 240 112');
    return s;
  });

  /* ---------- 5.3 ---------- */
  def('5.3', 'Ba dãy Cauchy hữu tỉ khác nhau cùng dồn về một chỗ. Chúng tương đương, nên cùng là **một** số thực: $\\sqrt2=\\mathrm{LIM}\\,a_n$.', 230, () => {
    const D = 8; let s = '';
    const tx = 540, ty = 115;
    const seqs = [(n) => 115 - 70 / (n + 1), (n) => 115 + 80 / (n + 1) ** 1.3, (n) => 115 + (n % 2 ? 1 : -1) * 60 / (n + 1)];
    const cls = ['fa', 'fd', 'fi'], scl = ['sa', 'sd', 'si'];
    seqs.forEach((f, j) => {
      let d = '';
      for (let n = 0; n < 12; n++) { const x = 40 + n * 42, y = f(n); d += (n ? 'L' : 'M') + x + ' ' + y.toFixed(1); s += Cc(x, y.toFixed(1), 4.5, cls[j], op(0.05 + j * 0.15 + n * 0.012, 0.08 + j * 0.15 + n * 0.012, D)); }
      s += P(d, scl[j], 1, op(0.05 + j * 0.15, 0.2 + j * 0.15, D).replace('opacity', 'stroke-opacity'));
    });
    s += G(`<ellipse cx="${tx}" cy="${ty}" rx="62" ry="44" class="fB sa" stroke-dasharray="5 4" stroke-width="1.5"/>` + Cc(tx, ty, 7, 'fa') + T(tx, ty + 70, '√2 = LIM aₙ', 't-l t-a', 'middle'), op(0.6, 0.68, D));
    return s;
  });

  /* ---------- 5.4 ---------- */
  def('5.4', 'Mọi số hạng $1/n$ đều dương, nhưng giới hạn của chúng là $0$. Qua giới hạn, “$>0$” chỉ còn giữ được “$\\ge 0$”.', 170, () => {
    const D = 7; let s = '';
    const X = (v) => 60 + v * 500;
    s += L(40, 90, 600, 90, 'sr', 1.5) + T(X(0), 125, '0', 't-b', 'middle') + T(X(1), 125, '1', '', 'middle');
    for (let n = 1; n <= 14; n++) s += Cc(X(1 / n), 90, 6, 'fa', op(0.03 + n * 0.035, 0.06 + n * 0.035, D)) + (n <= 5 ? T(X(1 / n), 70, '1/' + n, 't-s t-m', 'middle', op(0.03 + n * 0.035, 0.06 + n * 0.035, D)) : '');
    s += G(Cc(X(0), 90, 9, 'fN sd') + T(X(0) + 16, 150, 'LIM 1/n = 0 — không dương', 't-d t-b', 'start'), op(0.65, 0.72, D));
    s += `<circle cx="${X(0)}" cy="90" r="9" class="fN sd" stroke-width="2"><animate attributeName="r" values="9;16;9" dur="1.4s" repeatCount="indefinite"/>${op(0.65, 0.72, D)}</circle>`;
    return s;
  });

  /* ---------- 5.6 ---------- */
  def('5.6', 'Căn bậc hai của $2$ là sup của $\\{y\\ge0: y^2\\le2\\}$. Cạnh $y$ tăng, diện tích hình vuông $y^2$ tăng theo, và dừng ở $y=\\sqrt2$ khi diện tích chạm $2$.', 230, () => {
    const D = 6; let s = '';
    const X = (v) => 300 + v * 180;
    s += L(280, 190, 640, 190, 'sr') + T(X(0), 212, '0', '', 'middle') + T(X(1), 212, '1', '', 'middle') + T(X(Math.SQRT2), 212, '√2', 't-a t-b', 'middle') + T(X(1.9), 212, 'y', 't-m', 'middle');
    const w = Math.SQRT2 * 180;
    s += `<rect x="${X(0)}" y="183" height="14" rx="3" class="fB"><animate attributeName="width" values="0;${w};${w};0" keyTimes="0;0.6;0.95;1" dur="${D}s" repeatCount="indefinite"/></rect>`;
    s += `<line y1="170" y2="200" class="k sa" stroke-width="2.5"><animate attributeName="x1" values="${X(0)};${X(Math.SQRT2)};${X(Math.SQRT2)};${X(0)}" keyTimes="0;0.6;0.95;1" dur="${D}s" repeatCount="indefinite"/><animate attributeName="x2" values="${X(0)};${X(Math.SQRT2)};${X(Math.SQRT2)};${X(0)}" keyTimes="0;0.6;0.95;1" dur="${D}s" repeatCount="indefinite"/></line>`;
    const S = 70;
    s += `<rect x="40" class="fA sa" stroke-width="1.5" rx="2"><animate attributeName="width" values="0;${S * Math.SQRT2};${S * Math.SQRT2};0" keyTimes="0;0.6;0.95;1" dur="${D}s" repeatCount="indefinite"/><animate attributeName="height" values="0;${S * Math.SQRT2};${S * Math.SQRT2};0" keyTimes="0;0.6;0.95;1" dur="${D}s" repeatCount="indefinite"/><animate attributeName="y" values="190;${190 - S * Math.SQRT2};${190 - S * Math.SQRT2};190" keyTimes="0;0.6;0.95;1" dur="${D}s" repeatCount="indefinite"/></rect>`;
    s += R(40, 190 - 2 * S, 2 * S, 2 * S, 'fN sr', 2) ;
    s += T(40 + S, 190 - 2 * S - 8, 'diện tích 2 (khung)', 't-s t-m', 'middle');
    s += G(T(40 + S, 120, 'y² = 2', 't-a t-b', 'middle'), op(0.58, 0.62, D));
    return s;
  });

  /* ---------- 6.2 ---------- */
  def('6.2', 'Ép cả trục số vào một đoạn có hai đầu mút $-\\infty$ và $+\\infty$. Dãy tăng không bị chặn giờ “có giới hạn” là $+\\infty$, và mọi tập đều có sup.', 200, () => {
    const D = 5; let s = '';
    s += L(40, 60, 600, 60, 'sr') + arrowHead(600, 60, 0, 'fi') + arrowHead(40, 60, Math.PI, 'fi') + T(320, 36, 'ℝ: không có điểm cuối', 't-m t-s', 'middle');
    s += L(80, 150, 560, 150, 'si', 2) + Cc(80, 150, 6, 'fd') + Cc(560, 150, 6, 'fa') + T(80, 180, '−∞', 't-d t-b', 'middle') + T(560, 180, '+∞', 't-a t-b', 'middle') + T(320, 180, 'ℝ* = ℝ ∪ {−∞, +∞}', 't-b', 'middle');
    const xs = [1, 2, 4, 8, 16, 32];
    xs.forEach((v, i) => {
      const t = Math.tanh(v / 12), x = 320 + t * 240;
      s += Cc(320 + (v / 40) * 280, 60, 5, 'fa', op(0.05 + i * 0.08, 0.08 + i * 0.08, D));
      s += Cc(x, 150, 5, 'fa', op(0.05 + i * 0.08, 0.08 + i * 0.08, D));
      s += L(320 + (v / 40) * 280, 66, x, 144, 'sf', 1, `stroke-dasharray="3 3"`).replace('/>', `>${op(0.05 + i * 0.08, 0.08 + i * 0.08, D)}</line>`);
    });
    return s;
  });

  /* ---------- 7.1 ---------- */
  def('7.1', 'Tổng hữu hạn trên một bảng: cộng theo hàng rồi cộng các tổng hàng, hay cộng theo cột rồi cộng các tổng cột, đều ra cùng một số.', 230, () => {
    const D = 9; let s = '';
    const M = [[2, 1, 3, 0], [1, 4, 2, 2], [3, 0, 1, 5]];
    const x0 = 120, y0 = 40, cw = 56, ch = 40;
    M.forEach((r, i) => r.forEach((v, j) => (s += R(x0 + j * cw, y0 + i * ch, cw - 6, ch - 6, 'fW sr', 6) + T(x0 + j * cw + 25, y0 + i * ch + 23, v, 't-b', 'middle'))));
    M.forEach((r, i) => {
      s += R(x0 - 4, y0 + i * ch - 3, 4 * cw + 2, ch, 'fB sa', 8, win(0.05 + i * 0.1, 0.12 + i * 0.1, D));
      s += T(x0 + 4 * cw + 20, y0 + i * ch + 23, '= ' + r.reduce((a, b) => a + b), 't-a t-b', 'start', op(0.08 + i * 0.1, 0.12 + i * 0.1, D));
    });
    s += T(x0 + 4 * cw + 20, y0 + 3 * ch + 26, 'tổng 24', 't-a t-b', 'start', op(0.38, 0.42, D));
    for (let j = 0; j < 4; j++) {
      s += R(x0 + j * cw - 3, y0 - 4, cw, 3 * ch + 2, 'fB2 sd', 8, win(0.5 + j * 0.08, 0.56 + j * 0.08, D));
      s += T(x0 + j * cw + 25, y0 + 3 * ch + 26, M.reduce((a, r) => a + r[j], 0), 't-d t-b', 'middle', op(0.52 + j * 0.08, 0.56 + j * 0.08, D));
    }
    s += T(x0 - 20, y0 + 3 * ch + 26, 'cột:', 't-d t-s', 'end', op(0.5, 0.55, D)) + T(40, y0 + 3 * ch + 56, '6 + 9 + 4 + 7 = 24 — cùng tổng', 't-d t-b', 'start', op(0.84, 0.88, D));
    return s;
  });

  /* ---------- 8.4 ---------- */
  def('8.4', 'Mỗi hộp là một tập khác rỗng. Tiên đề lựa chọn cho phép chọn **cùng lúc** một phần tử trong mỗi hộp, kể cả khi có vô hạn hộp và không có quy tắc chọn nào.', 200, () => {
    const D = 6; let s = '';
    for (let i = 0; i < 7; i++) {
      const x = 30 + i * 84;
      s += R(x, 50, 66, 90, 'fS sr', 10) + T(x + 33, 40, 'X' + '₁₂₃₄₅₆₇'[i], 't-m t-s', 'middle');
      const pts = [[x + 20, 75], [x + 46, 90], [x + 26, 118]];
      pts.forEach(([a, b]) => (s += Cc(a, b, 6, 'fi')));
      const [a, b] = pts[(i * 2) % 3];
      s += Cc(a, b, 11, 'fN sa', op(0.05 + i * 0.1, 0.09 + i * 0.1, D)).replace('class="fN sa"', 'class="fN sa" stroke-width="2.5"');
    }
    s += T(620, 100, '…', 't-l', 'middle');
    s += T(320, 178, 'f(Xᵢ) ∈ Xᵢ với mọi i — một “hàm lựa chọn”', 't-a t-b', 'middle', op(0.75, 0.8, D));
    return s;
  });

  /* ---------- 8.5 ---------- */
  def('8.5', 'Các tập con của $\\{a,b,c\\}$ sắp theo quan hệ $\\subseteq$ (thứ tự bộ phận: $\\{a\\}$ và $\\{b\\}$ không so sánh được). Một **xích** được tô đỏ, nó có cận trên, và $\\{a,b,c\\}$ là phần tử tối đại.', 250, () => {
    const D = 8; let s = '';
    const pos = { e: [320, 220], a: [200, 160], b: [320, 160], c: [440, 160], ab: [200, 90], ac: [320, 90], bc: [440, 90], abc: [320, 30] };
    const lab = { e: '∅', a: '{a}', b: '{b}', c: '{c}', ab: '{a,b}', ac: '{a,c}', bc: '{b,c}', abc: '{a,b,c}' };
    const edges = [['e', 'a'], ['e', 'b'], ['e', 'c'], ['a', 'ab'], ['a', 'ac'], ['b', 'ab'], ['b', 'bc'], ['c', 'ac'], ['c', 'bc'], ['ab', 'abc'], ['ac', 'abc'], ['bc', 'abc']];
    const chain = ['e', 'a', 'ab', 'abc'];
    edges.forEach(([u, v]) => (s += L(pos[u][0], pos[u][1] - 12, pos[v][0], pos[v][1] + 12, 'sr', 1.4)));
    for (let i = 0; i < 3; i++) { const [u, v] = [chain[i], chain[i + 1]]; s += P(`M${pos[u][0]} ${pos[u][1] - 12}L${pos[v][0]} ${pos[v][1] + 12}`, 'sa', 3, dr(0.1 + i * 0.18, 0.25 + i * 0.18, D)); }
    Object.keys(pos).forEach((k) => {
      const [x, y] = pos[k], inC = chain.includes(k);
      s += R(x - 34, y - 13, 68, 26, 'fW sr', 13) + T(x, y + 5, lab[k], 't-s', 'middle');
      if (inC) s += R(x - 34, y - 13, 68, 26, 'fA sa', 13, op(0.08 + chain.indexOf(k) * 0.18, 0.12 + chain.indexOf(k) * 0.18, D)) + T(x, y + 5, lab[k], 't-s t-a t-b', 'middle', op(0.08 + chain.indexOf(k) * 0.18, 0.12 + chain.indexOf(k) * 0.18, D));
    });
    s += T(500, 30, '← phần tử tối đại', 't-a t-s', 'start', op(0.7, 0.75, D));
    return s;
  });

  /* ---------- 9.2 ---------- */
  def('9.2', 'Hàm $f+g$ được tạo bằng cách cộng giá trị **tại từng điểm**: dựng đoạn $g(x)$ lên trên đồ thị $f$.', 230, () => {
    const D = 7; let s = '';
    const X = (t) => 50 + t * 90, Y = (v) => 170 - v * 40;
    const f = (t) => Math.sin(t) + 0.3, g = (t) => 0.25 * t + 0.2;
    s += L(40, Y(0), 620, Y(0), 'sr') + L(50, 20, 50, 210, 'sr');
    s += P(curve(f, 0, 6, X, Y), 'sa', 2.2) + P(curve(g, 0, 6, X, Y), 'sd', 2.2);
    [0.8, 1.9, 3, 4.1, 5.2].forEach((t, i) => (s += L(X(t), Y(f(t)), X(t), Y(f(t) + g(t)), 'sd', 3).replace('/>', `>${op(0.1 + i * 0.08, 0.14 + i * 0.08, D)}</line>`)));
    s += P(curve((t) => f(t) + g(t), 0, 6, X, Y), 'si', 2.6, dr(0.5, 0.8, D));
    s += T(X(6) + 6, Y(f(6)), 'f', 't-a t-b') + T(X(6) + 6, Y(g(6)) + 4, 'g', 't-d t-b') + T(X(6) + 6, Y(f(6) + g(6)), 'f + g', 't-b', 'start', op(0.75, 0.8, D));
    return s;
  });

  /* ---------- 11.1 ---------- */
  def('11.1', 'Hai phân hoạch $P$ (đỏ) và $P\'$ (xanh) của cùng một đoạn. Gộp mọi điểm chia lại được $P\\#P\'$, mịn hơn cả hai.', 210, () => {
    const D = 7; let s = '';
    const X = (v) => 60 + v * 520;
    const P1 = [0, 0.3, 0.55, 1], P2 = [0, 0.15, 0.45, 0.8, 1], P3 = [...new Set([...P1, ...P2])].sort((a, b) => a - b);
    const rowF = (pts, y, cls, fcls, a, lab) => {
      let r = L(X(0), y, X(1), y, 'sr', 2);
      pts.forEach((v) => (r += L(X(v), y - 10, X(v), y + 10, cls, 2.5)));
      for (let i = 0; i < pts.length - 1; i++) r += R(X(pts[i]) + 2, y - 6, X(pts[i + 1]) - X(pts[i]) - 4, 12, fcls, 3);
      return G(r + T(30, y + 5, lab, 't-b', 'end'), op(a, a + 0.06, D));
    };
    s += rowF(P1, 50, 'sa', 'fB', 0.03, 'P');
    s += rowF(P2, 105, 'sd', 'fB2', 0.25, "P'");
    s += rowF(P3, 160, 'si', 'fS', 0.5, "P#P'");
    P3.forEach((v, i) => (s += L(X(v), 116, X(v), 150, 'sf', 1, 'stroke-dasharray="3 3"').replace('/>', `>${op(0.45 + i * 0.02, 0.5 + i * 0.02, D)}</line>`)));
    s += T(X(1) + 8, 165, '6 khoảng', 't-m t-s', 'start', op(0.55, 0.6, D));
    return s;
  });

  /* ---------- 11.4 ---------- */
  def('11.4', 'Cộng tính theo khoảng: chia $[a,b]$ tại $c$, diện tích chia thành hai phần và $\\int_a^b f=\\int_a^c f+\\int_c^b f$.', 230, () => {
    const D = 7; let s = '';
    const X = (t) => 60 + t * 100, Y = (v) => 190 - v * 50;
    const f = (t) => 1.3 + 0.8 * Math.sin(t * 1.2) + 0.15 * t;
    const area = (a, b) => curve(f, a, b, X, Y) + `L${X(b)} ${Y(0)}L${X(a)} ${Y(0)}Z`;
    s += L(40, Y(0), 620, Y(0), 'sr');
    s += `<path d="${area(0.5, 5)}" class="fB">${win(0.02, 0.3, D)}</path>`;
    s += `<path d="${area(0.5, 2.6)}" class="fB">${op(0.35, 0.42, D)}</path><path d="${area(2.6, 5)}" class="fB2">${op(0.35, 0.42, D)}</path>`;
    s += P(curve(f, 0.2, 5.4, X, Y), 'si', 2.2);
    s += L(X(2.6), Y(0), X(2.6), Y(f(2.6)), 'sd', 2).replace('/>', `>${op(0.3, 0.35, D)}</line>`);
    [['a', 0.5], ['c', 2.6], ['b', 5]].forEach(([t, v]) => (s += T(X(v), Y(0) + 20, t, 't-b', 'middle')));
    s += T(X(1.5), Y(0.7), '∫ₐᶜ f', 't-a t-b', 'middle', op(0.45, 0.5, D)) + T(X(3.8), Y(0.7), '∫꜀ᵇ f', 't-d t-b', 'middle', op(0.45, 0.5, D));
    return s;
  });

  /* ---------- 11.10 ---------- */
  def('11.10', 'Tích phân từng phần bằng hình: đường cong $(F(x),G(x))$ chia hình chữ nhật lớn thành vùng $\\int G\\,dF$ (đỏ) và $\\int F\\,dG$ (xanh). Cộng lại bằng $F(b)G(b)-F(a)G(a)$.', 250, () => {
    const D = 9; let s = '';
    const O = [70, 220], p1 = [180, 160], p2 = [460, 50];
    const cv = `M${p1[0]} ${p1[1]} C 300 150, 360 120, ${p2[0]} ${p2[1]}`;
    s += L(O[0], O[1], 560, O[1], 'si', 1.4) + L(O[0], O[1], O[0], 20, 'si', 1.4) + T(560, O[1] + 18, 'F', 't-b', 'end') + T(O[0] - 10, 28, 'G', 't-b', 'end');
    s += `<path d="${cv} L${p2[0]} ${O[1]} L${p1[0]} ${O[1]} Z" class="fB">${op(0.15, 0.22, D)}</path>`;
    s += `<path d="${cv} L${O[0]} ${p2[1]} L${O[0]} ${p1[1]} Z" class="fB2">${op(0.38, 0.45, D)}</path>`;
    s += R(O[0], p1[1], p1[0] - O[0], O[1] - p1[1], 'fS sr', 0, op(0.6, 0.66, D));
    s += P(cv, 'si', 2.6, dr(0.02, 0.14, D));
    s += T(330, 195, '∫ G dF', 't-a t-b', 'middle', op(0.2, 0.25, D)) + T(150, 100, '∫ F dG', 't-d t-b', 'middle', op(0.42, 0.47, D)) + T(125, 196, 'F(a)G(a)', 't-m t-s', 'middle', op(0.62, 0.66, D));
    s += L(p2[0], p2[1], p2[0], O[1], 'sf', 1, 'stroke-dasharray="4 3"') + L(O[0], p2[1], p2[0], p2[1], 'sf', 1, 'stroke-dasharray="4 3"');
    s += T(590, 110, 'Đỏ + xanh', 't-b', 'middle', op(0.72, 0.77, D)) + T(590, 132, '= F(b)G(b)', 't-s', 'middle', op(0.72, 0.77, D)) + T(590, 152, '− F(a)G(a)', 't-s', 'middle', op(0.72, 0.77, D));
    return s;
  });

  /* ---------- A.2 ---------- */
  def('A.2', 'Thứ tự lượng từ đổi nghĩa câu. Bên trái: mỗi $x$ có một $y$ **của riêng nó**. Bên phải: **một** $y$ dùng chung cho mọi $x$, mạnh hơn hẳn.', 230, () => {
    const D = 8; let s = '';
    const panel = (ox, title, targets, a) => {
      let r = T(ox + 130, 24, title, 't-l', 'middle');
      for (let i = 0; i < 4; i++) {
        const y = 55 + i * 40; r += Cc(ox + 40, y, 9, 'fd') + T(ox + 20, y + 5, 'x' + '₁₂₃₄'[i], 't-s t-d', 'end');
        const ty = 55 + targets[i] * 40;
        r += P(`M${ox + 50} ${y}L${ox + 205} ${ty}`, 'sa', 1.8, dr(a + i * 0.08, a + 0.06 + i * 0.08, D));
      }
      for (let k = 0; k < 4; k++) r += Cc(ox + 215, 55 + k * 40, 9, targets.includes(k) ? 'fa' : 'fS') + T(ox + 236, 60 + k * 40, 'y' + '₁₂₃₄'[k], 't-s', 'start');
      return r;
    };
    s += panel(20, '∀x ∃y', [1, 3, 0, 2], 0.05);
    s += panel(340, '∃y ∀x', [2, 2, 2, 2], 0.5);
    s += L(320, 20, 320, 220, 'sr', 1);
    return s;
  });

  /* ---------- A.3 ---------- */
  def('A.3', 'Chứng minh phản chứng: giả sử điều cần chứng minh sai, đi từng bước hợp lệ, gặp mâu thuẫn, nên giả sử ban đầu phải bỏ.', 170, () => {
    const D = 8; let s = '';
    const box = [['Giả sử ¬P', 'fS sr', ''], ['Suy luận 1', 'fW sr', ''], ['Suy luận 2', 'fW sr', ''], ['Mâu thuẫn ⊥', 'fA sb', 't-r'], ['Vậy P đúng', 'fW sg', 't-g']];
    box.forEach(([t, c, tc], i) => {
      const x = 12 + i * 126;
      s += G(R(x, 60, 108, 48, c, 10) + T(x + 54, 89, t, 't-b ' + tc, 'middle'), op(0.04 + i * 0.15, 0.1 + i * 0.15, D));
      if (i) s += arrow(x - 16, 84, x - 2, 84, 'si', 'fi', op(0.04 + i * 0.15, 0.1 + i * 0.15, D));
    });
    s += T(320, 150, 'Mỗi mũi tên phải dựa trên định nghĩa, giả thiết hoặc định lý đã có', 't-m t-s', 'middle', op(0.3, 0.35, D));
    return s;
  });

  /* ---------- B.1 ---------- */
  def('B.1', '$365 = 3\\cdot10^2+6\\cdot10^1+5\\cdot10^0$. Mỗi chữ số đếm số khối của một cỡ: trăm, chục, đơn vị.', 220, () => {
    const D = 7; let s = '';
    for (let h = 0; h < 3; h++) {
      let blk = R(30 + h * 100, 40, 90, 90, 'fA sa', 2);
      for (let k = 1; k < 10; k++) blk += L(30 + h * 100 + k * 9, 40, 30 + h * 100 + k * 9, 130, 'sa', 0.4) + L(30 + h * 100, 40 + k * 9, 120 + h * 100, 40 + k * 9, 'sa', 0.4);
      s += G(blk, op(0.04 + h * 0.08, 0.08 + h * 0.08, D));
    }
    for (let t = 0; t < 6; t++) s += R(340 + t * 16, 40, 10, 90, 'fD sd', 2, op(0.32 + t * 0.04, 0.35 + t * 0.04, D));
    for (let u = 0; u < 5; u++) s += R(460 + u * 16, 121, 10, 9, 'fS si', 1, op(0.6 + u * 0.04, 0.63 + u * 0.04, D));
    s += T(165, 160, '3 trăm', 't-a t-b', 'middle', op(0.04, 0.3, D)) + T(388, 160, '6 chục', 't-d t-b', 'middle', op(0.32, 0.55, D)) + T(492, 160, '5 đơn vị', 't-b', 'middle', op(0.6, 0.8, D));
    s += T(320, 200, '3·10² + 6·10¹ + 5·10⁰ = 365', 't-l', 'middle', op(0.82, 0.86, D));
    return s;
  });

  /* ---------- 12.3 ---------- */
  def('12.3', 'Không gian là $X=[0,2]$ (đoạn đậm). Quả cầu bán kính $r$ quanh $0$ **trong $X$** chỉ là $[0,r)$, phần âm (mờ) không thuộc $X$. Vì thế $[0,1)$ mở trong $X$ dù không mở trong $\\mathbb R$.', 190, () => {
    const D = 5; let s = '';
    const X = (v) => 230 + v * 160;
    s += L(20, 100, 620, 100, 'sr', 1.5) + L(X(0), 100, X(2), 100, 'si', 5);
    s += T(X(0), 135, '0', 't-b', 'middle') + T(X(2), 135, '2', 't-b', 'middle') + T(X(-1), 135, '−1', 't-m', 'middle') + T(X(1), 135, '1', 't-m', 'middle');
    const kt = 'keyTimes="0;0.45;0.9;1"', vals = (a, b) => `values="${a};${b};${b};${a}"`;
    s += `<rect y="90" height="20" class="fB2" rx="4"><animate attributeName="x" ${vals(X(-0.1), X(-1.2))} ${kt} dur="${D}s" repeatCount="indefinite"/><animate attributeName="width" ${vals(X(0) - X(-0.1), X(0) - X(-1.2))} ${kt} dur="${D}s" repeatCount="indefinite"/></rect>`;
    s += `<rect x="${X(0)}" y="88" height="24" class="fB sa" rx="4"><animate attributeName="width" ${vals(16, 192)} ${kt} dur="${D}s" repeatCount="indefinite"/></rect>`;
    s += T(X(-0.6), 70, 'không thuộc X', 't-d t-s', 'middle') + T(X(0.6), 70, 'B_X(0, r) = [0, r)', 't-a t-b', 'middle');
    return s;
  });

  /* ---------- 13.1 ---------- */
  def('13.1', 'Liên tục theo ngôn ngữ tập mở: lấy một khoảng mở $V$ trên trục tung (dải xanh). Tập các $x$ có $f(x)\\in V$ (đỏ, trên trục hoành) là hợp các khoảng mở.', 240, () => {
    const D = 9; let s = '';
    const f = (t) => Math.sin(t) + 0.35 * Math.sin(3 * t);
    const X = (t) => 50 + t * 44, Y = (v) => 120 - v * 70;
    const levels = [[0.3, 0.8], [-0.4, 0.1], [0.9, 1.3]];
    s += L(40, Y(0), 620, Y(0), 'sr') + L(50, 20, 50, 220, 'sr');
    levels.forEach(([lo, hi], j) => {
      const a = 0.04 + j * 0.31, c = a + 0.28;
      let g = R(50, Y(hi), 570, Y(lo) - Y(hi), 'fB2', 0);
      intervals(f, (v) => v > lo && v < hi, 0, 12.6, 1200).forEach(([u, v]) => (g += R(X(u), Y(0) - 5, X(v) - X(u), 10, 'fa', 3) + L(X(u), Y(0), X(u), Y(f(u)), 'sf', 1, 'stroke-dasharray="2 3"') + L(X(v), Y(0), X(v), Y(f(v)), 'sf', 1, 'stroke-dasharray="2 3"')));
      g += T(44, Y((lo + hi) / 2) + 4, 'V', 't-d t-b', 'end');
      s += G(g, win(a, c, D));
    });
    s += P(curve(f, 0, 12.6, X, Y, 300), 'si', 2.2);
    return s;
  });

  /* ---------- 13.5 ---------- */
  def('13.5', 'Hausdorff: hai điểm khác nhau luôn có hai lân cận rời nhau (trái). Trong tôpô thô, lân cận duy nhất là cả không gian, nên không tách được (phải).', 210, () => {
    const D = 5; let s = '';
    s += Cc(100, 105, 6, 'fi') + Cc(220, 105, 6, 'fi') + T(100, 130, 'x', 't-b', 'middle') + T(220, 130, 'y', 't-b', 'middle');
    const grow = (cx, cls) => `<circle cx="${cx}" cy="105" class="${cls}" stroke-width="2"><animate attributeName="r" values="8;52;52;8" keyTimes="0;0.5;0.9;1" dur="${D}s" repeatCount="indefinite"/></circle>`;
    s += grow(100, 'fB sa') + grow(220, 'fB2 sd') + Cc(100, 105, 6, 'fi') + Cc(220, 105, 6, 'fi');
    s += T(160, 190, 'Hausdorff: U ∩ V = ∅', 't-b', 'middle');
    s += R(370, 30, 240, 150, 'fB sa', 30) + Cc(440, 105, 6, 'fi') + Cc(540, 105, 6, 'fi') + T(440, 130, 'x', 't-b', 'middle') + T(540, 130, 'y', 't-b', 'middle');
    s += T(490, 200, 'Tôpô thô: lân cận duy nhất là X', 't-b', 'middle');
    return s;
  });

  /* ---------- 14.1 ---------- */
  def('14.1', 'Trong không gian mêtric, $x$ có thể tiến tới $x_0$ theo vô số đường: thẳng, xoắn, gấp khúc. $f(x)\\to L$ đòi hỏi mọi cách tiến đều cho cùng giới hạn.', 230, () => {
    const D = 5; let s = '';
    const x0 = [320, 115];
    const paths = [
      `M60 40 L${x0[0]} ${x0[1]}`,
      (() => { let d = ''; for (let i = 0; i <= 80; i++) { const t = i / 80, r = 110 * (1 - t), a = 6 * t * Math.PI; d += (i ? 'L' : 'M') + (x0[0] + r * Math.cos(a)).toFixed(1) + ' ' + (x0[1] + r * Math.sin(a) * 0.8).toFixed(1); } return d; })(),
      `M590 200 L520 140 L480 190 L420 130 L390 160 L350 120 L${x0[0]} ${x0[1]}`,
    ];
    const cls = ['sa', 'sd', 'si'], fc = ['fa', 'fd', 'fi'];
    paths.forEach((d, i) => { s += P(d, cls[i], 1.2) ; s += `<circle r="6" class="${fc[i]}"><animateMotion dur="${D}s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;0.85;1" calcMode="linear" path="${d}"/></circle>`; });
    s += Cc(x0[0], x0[1], 8, 'fN si').replace('class="fN si"', 'class="fN si" stroke-width="2"') + T(x0[0] + 14, x0[1] + 26, 'x₀', 't-b');
    return s;
  });

  /* ---------- 14.4 ---------- */
  def('14.4', 'Khoảng cách đều giữa $f(x)=x$ và $g(x)=x^2$ trên $[0,1]$ là khoảng hở **lớn nhất** theo chiều dọc: $d_\\infty(f,g)=\\tfrac14$, đạt tại $x=\\tfrac12$.', 240, () => {
    const D = 6; let s = '';
    const X = (t) => 80 + t * 460, Y = (v) => 210 - v * 180;
    s += L(70, Y(0), 570, Y(0), 'sr') + L(X(0), 20, X(0), 220, 'sr');
    s += P(curve((t) => t, 0, 1, X, Y), 'sa', 2.2) + P(curve((t) => t * t, 0, 1, X, Y), 'sd', 2.2);
    for (let i = 1; i < 10; i++) { const t = i / 10; s += L(X(t), Y(t), X(t), Y(t * t), t === 0.5 ? 'si' : 'sf', t === 0.5 ? 3 : 1.4).replace('/>', `>${op(0.05 + i * 0.05, 0.08 + i * 0.05, D)}</line>`); }
    s += G(T(X(0.5) + 10, Y(0.375) + 4, 'sup |f − g| = 1/4', 't-b'), op(0.6, 0.65, D));
    s += T(X(1) + 8, Y(1), 'f = x', 't-a t-b') + T(X(1) + 8, Y(1) + 22, 'g = x²', 't-d t-b');
    return s;
  });

  /* ---------- 14.6 ---------- */
  def('14.6', 'Dãy $f_n=n\\cdot\\mathbb 1_{(0,1/n)}$: cột càng hẹp càng cao, diện tích luôn bằng $1$. Tại mỗi điểm $f_n(x)\\to0$, nhưng $\\int f_n\\not\\to0$.', 240, () => {
    const D = 8; let s = '';
    const X = (t) => 80 + t * 480, Y = (v) => 210 - v * 22;
    s += L(70, Y(0), 580, Y(0), 'sr') + L(X(0), 15, X(0), 220, 'sr') + T(X(1), Y(0) + 20, '1', '', 'middle');
    [1, 2, 4, 8].forEach((n, i) => {
      const a = 0.04 + i * 0.22, c = a + 0.2;
      s += G(R(X(0), Y(n), X(1 / n) - X(0), Y(0) - Y(n), 'fB sa', 0) + T(X(1 / n) + 8, Y(n) + 14, `n = ${n}: cao ${n}, rộng 1/${n}`, 't-b') + T(X(1 / n) + 8, Y(n) + 34, 'diện tích = 1', 't-a'), win(a, c, D));
    });
    s += L(X(0), Y(0), X(1), Y(0), 'sd', 3) + T(X(0.6), Y(0) - 10, 'giới hạn điểm: 0', 't-d t-b', 'middle');
    return s;
  });

  /* ---------- 14.7 ---------- */
  def('14.7', '$f_n(x)=\\sin(nx)/\\sqrt n$ dẹt dần về $0$ (hội tụ đều), nhưng độ dốc lớn nhất là $\\sqrt n$ và tăng mãi. Đạo hàm không hội tụ.', 230, () => {
    const D = 9; let s = '';
    const X = (t) => 40 + t * 90, Y = (v) => 115 - v * 80;
    s += L(30, Y(0), 620, Y(0), 'sr');
    [1, 4, 16].forEach((n, i) => {
      const a = 0.04 + i * 0.31, c = a + 0.28;
      const f = (t) => Math.sin(n * t) / Math.sqrt(n);
      let g = P(curve(f, 0, 6.4, X, Y, 600), 'sa', 2.2);
      const sl = Math.sqrt(n) * 80 / 90, h = 28;
      g += L(X(0) - h, Y(0) + sl * h, X(0) + h, Y(0) - sl * h, 'sd', 2.4);
      g += T(400, 30, `n = ${n}: biên độ ${(1 / Math.sqrt(n)).toFixed(2).replace('.', ',')}, độ dốc tại 0 = ${Math.sqrt(n)}`, 't-b', 'middle');
      s += G(g, win(a, c, D));
    });
    return s;
  });

  /* ---------- 15.4 ---------- */
  def('15.4', 'Hệ số của tích hai chuỗi luỹ thừa: $c_n$ là tổng các ô $a_k b_j$ trên đường chéo $k+j=n$.', 260, () => {
    const D = 9; let s = '';
    const N = 5, x0 = 140, y0 = 40, w = 44;
    for (let k = 0; k < N; k++) { s += T(x0 - 14, y0 + k * w + 27, 'a' + '₀₁₂₃₄'[k], 't-d t-b', 'end'); s += T(x0 + k * w + 20, y0 - 10, 'b' + '₀₁₂₃₄'[k], 't-a t-b', 'middle'); }
    for (let k = 0; k < N; k++) for (let j = 0; j < N; j++) s += R(x0 + j * w, y0 + k * w, w - 4, w - 4, 'fW sr', 5);
    for (let n = 0; n < N; n++) {
      const a = 0.04 + n * 0.17, c = a + 0.15;
      let g = '';
      for (let k = 0; k <= n; k++) g += R(x0 + (n - k) * w, y0 + k * w, w - 4, w - 4, 'fA sa', 5);
      g += T(420, 120, `c${'₀₁₂₃₄'[n]} = ` + Array.from({ length: n + 1 }, (_, k) => 'a' + '₀₁₂₃₄'[k] + 'b' + '₀₁₂₃₄'[n - k]).join(' + '), 't-b', 'start');
      s += G(g, win(a, c, D));
    }
    return s;
  });

  /* ---------- 16.1 ---------- */
  def('16.1', 'Hàm tuần hoàn chu kỳ $1$: cửa sổ dài $1$ trượt dọc trục, hình dạng bên trong lặp lại y hệt. $f(x+1)=f(x)$.', 210, () => {
    const D = 6; let s = '';
    const f = (t) => { const u = ((t % 1) + 1) % 1; return Math.sin(2 * Math.PI * u) * 0.6 + (u < 0.5 ? 0.3 : -0.1) + 0.2 * Math.cos(4 * Math.PI * u); };
    const X = (t) => 40 + t * 160, Y = (v) => 110 - v * 60;
    s += L(30, Y(0), 620, Y(0), 'sr');
    for (let k = 0; k <= 3; k++) s += L(X(k), Y(0) - 5, X(k), Y(0) + 5, 'sr') + T(X(k), Y(0) + 22, k, 't-m', 'middle');
    s += `<g><animateTransform attributeName="transform" type="translate" values="0 0;160 0;320 0;320 0;0 0" keyTimes="0;0.35;0.7;0.9;1" dur="${D}s" repeatCount="indefinite"/>${R(X(0), 25, 160, 170, 'fB sa', 6)}</g>`;
    s += P(curve(f, 0, 3.6, X, Y, 500), 'si', 2.2);
    return s;
  });

  /* ---------- 16.3 ---------- */
  def('16.3', 'Một đa thức lượng giác là tổng hữu hạn các sóng. Bên trái là từng thành phần và hệ số; bên phải tổng được ráp dần từng sóng một.', 250, () => {
    const D = 9; let s = '';
    const T2 = 2 * Math.PI;
    const comps = [[1, (t) => Math.sin(T2 * t)], [0.5, (t) => Math.sin(2 * T2 * t)], [0.3, (t) => Math.cos(3 * T2 * t)]];
    const lab = ['1 · sin 2πx', '0,5 · sin 4πx', '0,3 · cos 6πx'];
    comps.forEach(([c, g], i) => {
      const Y = (v) => 45 + i * 75 - v * 25, X = (t) => 20 + t * 200;
      s += G(P(curve((t) => c * g(t), 0, 1, X, Y), i ? 'sd' : 'sa', 1.8) + T(20, 24 + i * 75, lab[i], 't-s t-m') + R(232, 45 + i * 75 - c * 30, 14, c * 30, 'fd', 2), op(0.05 + i * 0.25, 0.1 + i * 0.25, D));
    });
    const X = (t) => 300 + t * 320, Y = (v) => 125 - v * 50;
    s += L(300, Y(0), 620, Y(0), 'sr');
    for (let k = 1; k <= 3; k++) {
      const f = (t) => comps.slice(0, k).reduce((a, [c, g]) => a + c * g(t), 0);
      s += P(curve(f, 0, 1, X, Y), k === 3 ? 'sa' : 'sf', k === 3 ? 2.6 : 1.4, k === 3 ? op(0.6, 0.66, D).replace('opacity', 'stroke-opacity') : win(0.08 + (k - 1) * 0.25, 0.08 + (k - 1) * 0.25 + 0.27, D).replace('opacity', 'stroke-opacity'));
    }
    s += T(460, 230, 'cₙ = ⟨f, eₙ⟩ lấy lại từng hệ số', 't-b', 'middle', op(0.7, 0.75, D));
    return s;
  });

  /* ---------- 17.4 ---------- */
  def('17.4', 'Quy tắc chuỗi như nhân tốc độ: $x$ chạy với tốc độ $1$, $y=f(x)=2x$ chạy nhanh gấp $2$, $z=g(y)=3y$ nhanh gấp $3$ nữa. Tổng cộng $(g\\circ f)\'=g\'(f(x))\\cdot f\'(x)=6$.', 230, () => {
    const D = 5; let s = '';
    const rows = [['x', 1, 'tốc độ 1', 'fd'], ['y = f(x)', 2, '× f′ = 2', 'fi'], ['z = g(y)', 6, '× g′ = 3 → 6', 'fa']];
    rows.forEach(([lab, k, sp, fc], i) => {
      const y = 50 + i * 70;
      s += L(110, y, 610, y, 'sr', 1.5) + T(100, y + 5, lab, 't-b', 'end') + T(610, y - 12, sp, fc === 'fa' ? 't-a t-b' : 't-b', 'end');
      for (let u = 0; u <= 6; u++) s += L(110 + u * 80, y - 4, 110 + u * 80, y + 4, 'sr', 1);
      s += `<circle cy="${y}" r="9" class="${fc}"><animate attributeName="cx" values="110;${110 + k * 80};${110 + k * 80};110" keyTimes="0;0.7;0.9;1" dur="${D}s" repeatCount="indefinite"/></circle>`;
    });
    return s;
  });

  /* ---------- 18.1 ---------- */
  def('18.1', 'Ba điều ta muốn ở “thể tích”: hộp có thể tích bằng tích các cạnh; dời hình không đổi thể tích; hai mảnh rời nhau thì thể tích cộng lại.', 220, () => {
    const D = 7; let s = '';
    s += R(40, 70, 120, 80, 'fA sa', 2) + T(100, 115, '3 × 2 = 6', 't-b', 'middle') + T(100, 190, 'm(hộp) = tích các cạnh', 't-s', 'middle');
    const blob = 'M0 20 C 10 -10, 50 -10, 60 15 C 75 45, 30 70, 10 55 C -5 45, -5 35, 0 20Z';
    s += `<g><animateTransform attributeName="transform" type="translate" values="230 70;330 100;330 100;230 70" keyTimes="0;0.5;0.9;1" dur="${D}s" repeatCount="indefinite"/><path d="${blob}" class="fB2 sd" stroke-width="2"/></g>`;
    s += `<g transform="translate(230 70)"><path d="${blob}" class="fN sf" stroke-width="1" stroke-dasharray="3 3"/></g>`;
    s += T(320, 190, 'm(x + A) = m(A)', 't-s', 'middle');
    s += `<g><animateTransform attributeName="transform" type="translate" values="0 0;22 0;22 0;0 0" keyTimes="0;0.5;0.9;1" dur="${D}s" repeatCount="indefinite"/>${R(450, 70, 60, 80, 'fA sa', 4)}</g>` + `<g><animateTransform attributeName="transform" type="translate" values="0 0;-12 0;-12 0;0 0" keyTimes="0;0.5;0.9;1" dur="${D}s" repeatCount="indefinite"/>${R(540, 90, 50, 60, 'fB2 sd', 4)}</g>`;
    s += T(530, 190, 'm(A ∪ B) = m(A) + m(B)', 't-s', 'middle');
    return s;
  });

  /* ---------- 18.3 ---------- */
  def('18.3', 'Vòng tròn là $[0,1)$ cuộn lại. Tập Vitali $V$ (vạch đỏ) và các bản xoay hữu tỉ $V+q$ của nó rời nhau và phủ kín vòng. Nếu $V$ có độ đo, tổng vô hạn các độ đo bằng nhau không thể nằm giữa $1$ và $3$.', 260, () => {
    const D = 8; let s = '';
    const cx = 200, cy = 130, r = 100;
    s += Cc(cx, cy, r, 'fN sr').replace('class="fN sr"', 'class="fN sr" stroke-width="1.5"');
    const base = [0.03, 0.11, 0.19, 0.29, 0.37, 0.52, 0.61, 0.78, 0.86];
    const tick = (u, cls) => { const a = u * 2 * Math.PI; return L(cx + (r - 10) * Math.cos(a), cy + (r - 10) * Math.sin(a), cx + (r + 10) * Math.cos(a), cy + (r + 10) * Math.sin(a), cls, 2.4); };
    base.forEach((u) => (s += tick(u, 'sa')));
    for (let q = 1; q <= 6; q++) {
      let g = ''; base.forEach((u) => (g += tick((u + q * 0.013) % 1, q % 2 ? 'sd' : 'si')));
      s += G(g, op(0.05 + q * 0.12, 0.09 + q * 0.12, D));
    }
    s += T(420, 80, 'V: một điểm từ mỗi lớp x + ℚ', 't-a t-b') + T(420, 108, 'V + q₁, V + q₂, … rời nhau', 't-d t-b', 'start', op(0.17, 0.22, D)) + T(420, 136, 'và phủ kín [0, 1)', 't-b', 'start', op(0.5, 0.55, D)) + T(420, 176, '⇒ V không đo được', 't-r t-b', 'start', op(0.82, 0.86, D));
    return s;
  });

  /* ---------- 18.4 ---------- */
  def('18.4', 'Tiêu chuẩn Carathéodory: tập $E$ (vùng sau đường đứt) phải cắt **mọi** tập thử $A$ thành hai phần có độ đo ngoài cộng lại đúng bằng $m^*(A)$.', 230, () => {
    const D = 7; let s = '';
    s += `<defs><clipPath id="clipE"><rect x="300" y="0" width="340" height="230"/></clipPath><clipPath id="clipNE"><rect x="0" y="0" width="300" height="230"/></clipPath></defs>`;
    const blob = 'M140 110 C 150 30, 330 20, 420 70 C 500 115, 430 200, 300 195 C 190 190, 132 170, 140 110Z';
    s += `<path d="${blob}" class="fS sr" stroke-width="1.5"/>`;
    s += `<g clip-path="url(#clipE)"><path d="${blob}" class="fB">${op(0.2, 0.28, D)}</path></g><g clip-path="url(#clipNE)"><path d="${blob}" class="fB2">${op(0.4, 0.48, D)}</path></g>`;
    s += L(300, 10, 300, 220, 'si', 1.6, 'stroke-dasharray="6 4"') + T(560, 30, 'E', 't-l', 'middle') + T(220, 60, 'A', 't-l', 'middle');
    s += T(380, 125, 'A ∩ E', 't-a t-b', 'middle', op(0.22, 0.28, D)) + T(220, 140, 'A \\ E', 't-d t-b', 'middle', op(0.42, 0.48, D));
    s += T(320, 222, 'm*(A) = m*(A ∩ E) + m*(A \\ E)', 't-b', 'middle', op(0.65, 0.7, D));
    return s;
  });

  /* ---------- 18.5 ---------- */
  def('18.5', 'Hàm đo được: với mỗi mức $a$ (đường xanh), tập $\\{x: f(x)>a\\}$ (đỏ trên trục hoành) phải đo được. Ở đây nó luôn là hợp vài khoảng.', 240, () => {
    const D = 9; let s = '';
    const f = (t) => 0.9 + 0.6 * Math.sin(t * 1.3) + 0.3 * Math.sin(t * 3.1);
    const X = (t) => 40 + t * 58, Y = (v) => 200 - v * 85;
    s += L(30, Y(0), 620, Y(0), 'sr');
    [0.6, 1.1, 1.5].forEach((a, j) => {
      const st = 0.04 + j * 0.31, en = st + 0.28;
      let g = L(30, Y(a), 620, Y(a), 'sd', 1.8, 'stroke-dasharray="6 4"') + T(622, Y(a) + 4, 'a', 't-d t-b', 'end');
      intervals(f, (v) => v > a, 0, 10, 1000).forEach(([u, v]) => (g += R(X(u), Y(0) - 5, X(v) - X(u), 10, 'fa', 3)));
      s += G(g, win(st, en, D));
    });
    s += P(curve(f, 0, 10, X, Y, 300), 'si', 2.2);
    return s;
  });

  /* ---------- 19.3 ---------- */
  def('19.3', 'Hội tụ bị chặn: mọi $f_n$ (đỏ) nằm dưới một hàm khả tích $F$ (đường đứt). Khi đó $f_n\\to f$ kéo theo $\\int f_n\\to\\int f$, khối lượng không thể “trốn” lên cao hay ra xa.', 240, () => {
    const D = 9; let s = '';
    const F2 = (t) => 1.6 / (1 + 0.35 * (t - 2) * (t - 2));
    const X = (t) => 40 + t * 70, Y = (v) => 210 - v * 105;
    s += L(30, Y(0), 620, Y(0), 'sr');
    s += P(curve(F2, 0, 8, X, Y), 'sd', 2, '').replace('class="k sd"', 'class="k sd" stroke-dasharray="6 4"') + T(X(2), Y(F2(2)) - 10, 'F', 't-d t-b', 'middle');
    [1, 2, 4, 8, 30].forEach((n, i) => {
      const fn = (t) => 0.85 * F2(t) * (Math.pow(t / 3, n) / (1 + Math.pow(t / 3, n)));
      s += P(curve(fn, 0, 8, X, Y, 300), i === 4 ? 'sa' : 'sf', i === 4 ? 2.6 : 1.4, i === 4 ? op(0.7, 0.76, D).replace('opacity', 'stroke-opacity') : win(0.04 + i * 0.15, 0.04 + i * 0.15 + 0.14, D).replace('opacity', 'stroke-opacity'));
    });
    s += T(X(6), Y(1.25), 'fₙ → f, luôn ≤ F', 't-a t-b', 'middle', op(0.72, 0.76, D));
    return s;
  });

  /* ---------- Hình cho các mục đã có minh hoạ tương tác: chỉ thêm ở vài khái niệm then chốt ---------- */
  def('6.1', 'Định nghĩa hội tụ dưới dạng đối thoại: người thách đố đưa ra $\\varepsilon$, người chứng minh trả lời bằng $N$. Dải càng hẹp, $N$ càng phải lớn.', 230, () => {
    const D = 9; let s = '';
    const X = (n) => 40 + n * 13, Y = (v) => 120 - v * 70;
    const a = (n) => 1 + Math.cos(n * 0.9) * 1.1 / (n * 0.3 + 1);
    [[0.6, 4], [0.3, 10], [0.12, 24]].forEach(([e, N], i) => {
      const st = 0.04 + i * 0.31, en = st + 0.28;
      s += G(R(30, Y(1 + e), 590, Y(1 - e) - Y(1 + e), 'fB', 0) + L(X(N), 20, X(N), 215, 'si', 1.6, 'stroke-dasharray="5 4"') + T(X(N) + 6, 30, `ε = ${String(e).replace('.', ',')} → N = ${N}`, 't-b'), win(st, en, D));
    });
    s += L(30, Y(1), 620, Y(1), 'sa', 1, 'stroke-dasharray="4 3"') + T(625, Y(1) + 4, 'L', 't-a t-b', 'end');
    for (let n = 1; n <= 44; n++) s += Cc(X(n), Y(a(n)).toFixed(1), 3.5, 'fi');
    return s;
  });

  def('9.9', 'Liên tục đều: một ô chữ nhật cỡ $2\\delta\\times2\\varepsilon$ trượt dọc đồ thị, và đồ thị không bao giờ thoát ra trên/dưới ô. Với $\\sqrt x$ trên $[0,1]$ điều đó đúng; với $1/x$ thì ô phải co lại khi tới gần $0$.', 230, () => {
    const D = 6; let s = '';
    const X = (t) => 60 + t * 520, Y = (v) => 200 - v * 160;
    const f = Math.sqrt;
    s += L(50, Y(0), 600, Y(0), 'sr') + L(X(0), 15, X(0), 215, 'sr');
    s += P(curve(f, 0, 1, X, Y, 300), 'sa', 2.4);
    const pts = []; for (let i = 0; i <= 20; i++) { const t = 0.02 + i * 0.045; pts.push([X(t) - 26, Y(f(t)) - 26]); }
    const vals = pts.concat(pts.slice().reverse()).map((p) => p.join(' ')).join(';');
    s += `<rect width="52" height="52" class="fB2 sd" stroke-width="1.8" rx="3"><animateTransform attributeName="transform" type="translate" values="${vals}" dur="${D}s" repeatCount="indefinite"/></rect>`;
    s += T(440, 60, 'cùng một δ cho mọi điểm', 't-d t-b', 'middle');
    return s;
  });

  def('11.9', 'Định lý cơ bản: tăng $x$ thêm một chút $\\Delta x$, diện tích tăng thêm một dải mỏng cao $f(x)$. Vậy $F(x+\\Delta x)-F(x)\\approx f(x)\\Delta x$, tức $F\'=f$.', 230, () => {
    const D = 6; let s = '';
    const f = (t) => 1 + 0.5 * Math.sin(t) + 0.12 * t;
    const X = (t) => 60 + t * 85, Y = (v) => 205 - v * 80;
    s += L(50, Y(0), 620, Y(0), 'sr');
    const kt = 'keyTimes="0;0.8;0.95;1"';
    const xs = [0.5, 5.2];
    let d0 = curve(f, 0.3, xs[0], X, Y, 60) + `L${X(xs[0])} ${Y(0)}L${X(0.3)} ${Y(0)}Z`;
    let d1 = curve(f, 0.3, xs[1], X, Y, 60) + `L${X(xs[1])} ${Y(0)}L${X(0.3)} ${Y(0)}Z`;
    s += `<path class="fB" d="${d0}"><animate attributeName="d" values="${d0};${d1};${d1};${d0}" ${kt} dur="${D}s" repeatCount="indefinite"/></path>`;
    s += `<rect y="0" width="14" class="fa" opacity=".8"><animate attributeName="x" values="${X(xs[0])};${X(xs[1])};${X(xs[1])};${X(xs[0])}" ${kt} dur="${D}s" repeatCount="indefinite"/><animate attributeName="y" values="${Y(f(xs[0]))};${Y(f(xs[1]))};${Y(f(xs[1]))};${Y(f(xs[0]))}" ${kt} dur="${D}s" repeatCount="indefinite"/><animate attributeName="height" values="${Y(0) - Y(f(xs[0]))};${Y(0) - Y(f(xs[1]))};${Y(0) - Y(f(xs[1]))};${Y(0) - Y(f(xs[0]))}" ${kt} dur="${D}s" repeatCount="indefinite"/></rect>`;
    s += P(curve(f, 0, 6.5, X, Y, 300), 'si', 2.2);
    s += T(70, 30, 'Dải đỏ: rộng Δx, cao f(x) → phần diện tích tăng thêm', 't-a t-b');
    return s;
  });
})();
