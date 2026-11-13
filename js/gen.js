/* Bộ sinh câu hỏi trắc nghiệm có số liệu ngẫu nhiên — hoàn toàn tĩnh, không dùng AI.
   Mỗi dạng: { ch: số chương hiển thị, sid: mục liên quan, make(R) → {q, opts[4], ans, why} }.
   R là bộ sinh số ngẫu nhiên có hạt giống (mã đề), nên cùng mã đề luôn ra cùng câu.
   Phương án nhiễu được dựng từ những lỗi sai hay gặp. */
(function () {
  const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
  /* phân số dạng LaTeX, đã rút gọn */
  const F = (p, q) => {
    if (q < 0) { p = -p; q = -q; }
    const g = gcd(Math.abs(p), q) || 1; p /= g; q /= g;
    if (q === 1) return String(p);
    return (p < 0 ? '-' : '') + '\\frac{' + Math.abs(p) + '}{' + q + '}';
  };
  const M = (s) => '$' + s + '$';
  const tools = (R) => {
    const ri = (a, b) => a + Math.floor(R() * (b - a + 1));
    const pick = (arr) => arr[Math.floor(R() * arr.length)];
    const nz = (a, b) => { let v = 0; while (v === 0) v = ri(a, b); return v; };
    return { ri, pick, nz };
  };
  /* gom 1 đáp án đúng + các phương án nhiễu khác nhau (lấy dư từ `more`) */
  function pack(q, right, wrong, why, more) {
    const opts = [right];
    wrong.concat(more || []).forEach((w) => { if (opts.length < 4 && !opts.includes(w)) opts.push(w); });
    /* thiếu thì lệch một con số trong đáp án đúng: trông hợp lý, nhưng sai */
    const nums = [...right.matchAll(/\d+/g)];
    for (const d of [1, -1, 2, 3, -2, 4, 5, -3, 6, 7]) {
      for (let j = nums.length - 1; j >= 0 && opts.length < 4; j--) {
        const m = nums[j], v = +m[0] + d; if (v < 0) continue;
        const cand = right.slice(0, m.index) + v + right.slice(m.index + m[0].length);
        if (!opts.includes(cand) && !/\\frac\{\d+\}\{0\}/.test(cand)) { opts.push(cand); break; }
      }
      if (opts.length >= 4) break;
    }
    let k = 2; while (opts.length < 4) { const f = M('\\text{không xác định}' + (k > 2 ? '\\ (' + k + ')' : '')); k++; if (!opts.includes(f)) opts.push(f); }
    return { q, opts, ans: 0, why };
  }
  const sgn = (v) => (v < 0 ? '-' + Math.abs(v) : '+' + v);
  const poly2 = (a, b, c) => `${a === 1 ? '' : a === -1 ? '-' : a}x^2${b ? (b === 1 ? '+x' : b === -1 ? '-x' : sgn(b) + 'x') : ''}${c ? sgn(c) : ''}`;

  const G = [];
  const def = (ch, sid, make) => G.push({ ch: String(ch), sid, make });

  /* ---------- Chương 1 ---------- */
  def(1, '1.1', (R) => { const { ri } = tools(R); const b = ri(-4, 2), a = b + ri(2, 6);
    return pack(`Miền xác định của ${M(`f(x)=\\dfrac{\\sqrt{${a}-x}}{x${b ? sgn(-b) : ''}}`)} là`, M(`(-\\infty,${b})\\cup(${b},${a}]`), [M(`(-\\infty,${a}]`), M(`(${b},${a}]`), M(`[${b},${a})`)], `Cần ${M(`${a}-x\\ge0`)} và ${M(`x\\ne${b}`)}.`); });
  def(1, '1.3', (R) => { const { ri, nz } = tools(R); const a = nz(-3, 4), b = ri(-5, 5), c = ri(-3, 4), k = ri(-3, 3);
    const g = k * k + c, fg = a * g + b, gf = (a * k + b) ** 2 + c;
    return pack(`Cho ${M(`f(x)=${a}x${b ? sgn(b) : ''}`)}, ${M(`g(x)=x^2${c ? sgn(c) : ''}`)}. Giá trị ${M(`(f\\circ g)(${k})`)} là`, M(fg), [M(gf), M((a * k + b) * g), M(a * k + b + g)], `${M(`g(${k})=${g}`)}, rồi ${M(`f(${g})=${fg}`)}. Phương án ${M(gf)} là ${M('(g\\circ f)')}.`); });
  def(1, '1.5', (R) => { const { ri, pick } = tools(R); const base = pick([2, 3, 5]), a = ri(1, 4), b = ri(-5, 5), c = ri(1, 6);
    return pack(`Nghiệm của ${M(`${base}^{${a}x${b ? sgn(b) : ''}}=${base}^{${c}}`)} là`, M(`x=${F(c - b, a)}`), [M(`x=${F(c + b, a)}`), M(`x=${F(c - b, 1)}`), M(`x=${F(c, a)}`)], `Hàm mũ đơn ánh nên ${M(`${a}x${b ? sgn(b) : ''}=${c}`)}.`); });

  /* ---------- Chương 2 ---------- */
  def(2, '2.3', (R) => { const { ri, nz } = tools(R); const a = nz(-4, 4), k = ri(-5, 5);
    return pack(`${M(`\\displaystyle\\lim_{x\\to${a}}\\frac{${poly2(1, k - a, -k * a)}}{x${sgn(-a)}}`)} bằng`, M(a + k), [M(0), M(k), M(a)], `Tử bằng ${M(`(x${sgn(-a)})(x${k ? sgn(k) : ''})`)}; rút gọn rồi thế ${M(`x=${a}`)}.`); });
  def(2, '2.6', (R) => { const { ri, nz } = tools(R); const p = nz(-6, 6), r = ri(1, 6), q = ri(1, 9), s = nz(-5, 5);
    return pack(`${M(`\\displaystyle\\lim_{x\\to\\infty}\\frac{${p}x^2+${q}}{${r}x^2${sgn(s)}x}`)} bằng`, M(F(p, r)), [M(F(q, s)), M(F(p, s)), M('\\infty')], 'Chia tử và mẫu cho $x^2$: chỉ còn tỉ số hệ số bậc cao nhất.'); });
  def(2, '2.7', (R) => { const { ri, nz } = tools(R); const a = nz(-4, 5), b = ri(-6, 6), c = ri(-3, 4);
    return pack(`Với ${M(`f(x)=${poly2(a, b, 0)}`)}, đạo hàm ${M(`f'(${c})`)} (tính theo định nghĩa) bằng`, M(2 * a * c + b), [M(a * c * c + b * c), M(2 * a * c), M(a * c + b)], `${M(`\\frac{f(${c}+h)-f(${c})}{h}=${2 * a * c + b}${sgn(a)}h`)}, cho ${M('h\\to0')}.`); });

  /* ---------- Chương 3 ---------- */
  def(3, '3.1', (R) => { const { ri, nz } = tools(R); const a = nz(-4, 5), n = ri(2, 6), c = nz(-2, 2);
    return pack(`Đạo hàm của ${M(`${a}x^{${n}}`)} tại ${M(`x=${c}`)} bằng`, M(a * n * c ** (n - 1)), [M(a * c ** n), M(a * n * c ** n), M(a * (n - 1) * c ** (n - 2))], `${M(`(ax^n)'=anx^{n-1}`)}.`); });
  def(3, '3.2', (R) => { const { ri, nz } = tools(R); const a = ri(-4, 4), b = ri(-4, 4), c = nz(-3, 3);
    const v = 2 * c * (c + b) + (c * c + a);
    return pack(`Với ${M(`f(x)=(x^2${a ? sgn(a) : ''})(x${b ? sgn(b) : ''})`)}, ${M(`f'(${c})`)} bằng`, M(v), [M(2 * c), M(2 * c * (c + b)), M(c * c + a)], `Quy tắc tích: ${M(`2x(x${b ? sgn(b) : ''})+(x^2${a ? sgn(a) : ''})`)}. Phương án ${M(2 * c)} là “tích các đạo hàm”, sai.`); });
  def(3, '3.4', (R) => { const { ri, nz } = tools(R); const a = nz(-3, 3), b = ri(-3, 3), n = ri(2, 5), c = ri(-1, 2);
    const u = a * c + b;
    return pack(`Đạo hàm của ${M(`(${a}x${b ? sgn(b) : ''})^{${n}}`)} tại ${M(`x=${c}`)} bằng`, M(n * a * u ** (n - 1)), [M(n * u ** (n - 1)), M(a * u ** n), M(n * a * u ** n)], `Quy tắc chuỗi: ${M(`n\\cdot a\\cdot(ax+b)^{n-1}`)}; quên nhân ${M(a)} là lỗi hay gặp.`); });
  def(3, '3.5', (R) => { const { pick } = tools(R); const [p, q, r] = pick([[3, 4, 5], [4, 3, 5], [5, 12, 13], [12, 5, 13], [6, 8, 10], [8, 15, 17]]); const sp = pick([1, -1]), sq = pick([1, -1]);
    const x = sp * p, y = sq * q;
    return pack(`Hệ số góc tiếp tuyến của đường tròn ${M(`x^2+y^2=${r * r}`)} tại ${M(`(${x},${y})`)} là`, M(F(-x, y)), [M(F(x, y)), M(F(-y, x)), M(F(y, x))], `Đạo hàm ẩn: ${M("2x+2yy'=0")}, nên ${M("y'=-\\frac xy")}.`); });
  def(3, '3.8', (R) => { const { ri, pick } = tools(R); const T = pick([2, 3, 5, 8, 10, 30]), k = ri(2, 5), m = pick([64, 80, 96, 128, 160]);
    return pack(`Chất phóng xạ có chu kỳ bán rã ${T} năm. Ban đầu có ${m} g, sau ${k * T} năm còn`, M(F(m, 2 ** k) + '\\text{ g}'), [M(F(m, 2 * k) + '\\text{ g}'), M(F(m, 2 ** (k - 1)) + '\\text{ g}'), M(F(m * (k - 1), k) + '\\text{ g}')], `Qua ${k} chu kỳ, lượng chất còn ${M(`\\frac{1}{2^{${k}}}`)}.`); });
  def(3, '3.10', (R) => { const { ri, pick } = tools(R); const n = ri(3, 12), d = pick([-2, -1, 1, 2, 3]);
    return pack(`Xấp xỉ tuyến tính của ${M(`\\sqrt{x}`)} tại ${M(`a=${n * n}`)} cho ${M(`\\sqrt{${n * n + d}}`)} gần bằng`, M(`${n}${d > 0 ? '+' : '-'}${F(Math.abs(d), 2 * n)}`), [M(`${n}${d > 0 ? '+' : '-'}${F(Math.abs(d), n)}`), M(`${n}${d > 0 ? '+' : '-'}${F(Math.abs(d), 2)}`), M(n)], `${M(`L(x)=\\sqrt a+\\frac{x-a}{2\\sqrt a}`)}.`); });

  /* ---------- Chương 4 ---------- */
  def(4, '4.1', (R) => { const { ri } = tools(R); const s = ri(1, 4);
    return pack(`Hàm ${M(`f(x)=x^3-${3 * s * s}x`)} đạt cực tiểu địa phương tại`, M(`x=${s}`), [M(`x=${-s}`), M(`x=0`), M(`x=${s * s}`)], `${M(`f'=3x^2-${3 * s * s}=0`)} tại ${M(`x=\\pm${s}`)}; ${M(`f''(${s})=${6 * s}>0`)}.`); });
  def(4, '4.2', (R) => { const { ri } = tools(R); const a = ri(-3, 3), b = a + ri(1, 6);
    return pack(`Định lý giá trị trung bình cho ${M('f(x)=x^2')} trên ${M(`[${a},${b}]`)} cho ${M('c')} bằng`, M(F(a + b, 2)), [M(F(b - a, 2)), M(a + b), M(F(a * a + b * b, 2))], `${M(`2c=\\frac{b^2-a^2}{b-a}=a+b`)}.`); });
  def(4, '4.4', (R) => { const { nz, ri } = tools(R); const a = nz(-5, 5), b = ri(1, 6);
    return pack(`${M(`\\displaystyle\\lim_{x\\to0}\\frac{e^{${a}x}-1}{${b}x}`)} bằng`, M(F(a, b)), [M(F(b, a)), M(a), M(1)], `Dạng ${M('\\frac00')}, L'Hôpital: ${M(`\\frac{${a}e^{${a}x}}{${b}}\\to${F(a, b)}`)}.`); });
  def(4, '4.7', (R) => { const { ri } = tools(R); const L = 4 * ri(5, 40);
    return pack(`Rào ba cạnh một mảnh đất chữ nhật sát bờ sông (cạnh sông không rào) bằng ${L} m lưới. Diện tích lớn nhất là`, M(L * L / 8 + '\\text{ m}^2'), [M(L * L / 16 + '\\text{ m}^2'), M(L * L / 9 + '\\text{ m}^2'), M(L * L / 4 + '\\text{ m}^2')], `${M(`A=x(${L}-2x)`)} lớn nhất khi ${M(`x=${L / 4}`)}.`); });
  def(4, '4.8', (R) => { const { ri } = tools(R); const N = ri(2, 30), x0 = ri(1, 6);
    return pack(`Phương pháp Newton cho ${M(`x^2-${N}=0`)} từ ${M(`x_1=${x0}`)} cho ${M('x_2')} bằng`, M(F(x0 * x0 + N, 2 * x0)), [M(F(x0 * x0 - N, 2 * x0)), M(F(x0 + N, 2)), M(F(N, x0))], `${M(`x_2=x_1-\\frac{x_1^2-${N}}{2x_1}=\\frac12\\left(x_1+\\frac{${N}}{x_1}\\right)`)}.`); });
  def(4, '4.9', (R) => { const { ri, nz } = tools(R); const a = nz(-4, 4), v0 = ri(-5, 5), s0 = ri(-5, 5), t = ri(1, 4);
    return pack(`Vật có gia tốc không đổi ${M(`a=${a}`)}, ${M(`v(0)=${v0}`)}, ${M(`s(0)=${s0}`)}. Vị trí tại ${M(`t=${t}`)} là`, M(F(2 * s0 + 2 * v0 * t + a * t * t, 2)), [M(F(2 * s0 + 2 * v0 * t + 2 * a * t * t, 2)), M(s0 + v0 * t), M(F(2 * v0 * t + a * t * t, 2))], `${M('s=s_0+v_0t+\\frac12at^2')}.`); });

  /* ---------- Chương 5–7 ---------- */
  def(5, '5.3', (R) => { const { ri, nz } = tools(R); const a = nz(-3, 4) * 3, b = ri(1, 3), c = ri(-4, 4);
    const v = (a * b ** 3) / 3 + c * b;
    return pack(`${M(`\\displaystyle\\int_0^{${b}}(${a}x^2${c ? sgn(c) : ''})\\,dx`)} bằng`, M(v), [M(a * b * b + c * b), M(2 * a * b + c), M((a * b ** 3) / 3)], `Nguyên hàm ${M(`${a / 3}x^3${c ? sgn(c) + 'x' : ''}`)}.`); });
  def(5, '5.3', (R) => { const { ri, nz } = tools(R); const k = ri(-5, 5), c = nz(-3, 3);
    return pack(`${M(`\\dfrac{d}{dx}\\displaystyle\\int_1^{x}(t^2${k ? sgn(k) : ''})\\,dt`)} tại ${M(`x=${c}`)} bằng`, M(c * c + k), [M(2 * c), M(F(c ** 3 + 3 * k * c, 3)), M(0)], 'Định lý cơ bản phần 1: đạo hàm của hàm tích luỹ là hàm dưới dấu tích phân.'); });
  def(5, '5.5', (R) => { const { ri } = tools(R); const n = ri(1, 5);
    return pack(`${M(`\\displaystyle\\int_0^1 x(x^2+1)^{${n}}\\,dx`)} bằng`, M(F(2 ** (n + 1) - 1, 2 * (n + 1))), [M(F(2 ** (n + 1) - 1, n + 1)), M(F(2 ** n, n + 1)), M(F(1, 2 * (n + 1)))], `Đặt ${M('u=x^2+1')}: ${M(`\\frac12\\int_1^2u^{${n}}du`)}.`); });
  def(6, '6.1', (R) => { const { ri } = tools(R); const n = ri(2, 7);
    return pack(`Diện tích giữa ${M('y=x')} và ${M(`y=x^{${n}}`)} trên ${M('[0,1]')} là`, M(F(n - 1, 2 * (n + 1))), [M(F(1, n + 1)), M(F(1, 2)), M(F(n, n + 1))], `${M(`\\int_0^1(x-x^{${n}})dx=\\frac12-\\frac1{${n + 1}}`)}.`); });
  def(6, '6.2', (R) => { const { ri } = tools(R); const b = ri(1, 6);
    return pack(`Quay miền dưới ${M('y=\\sqrt x')} trên ${M(`[0,${b}]`)} quanh trục ${M('x')}. Thể tích là`, M(F(b * b, 2) + '\\pi'), [M(b * b + '\\pi'), M(F(b * b, 3) + '\\pi'), M(F(b, 2) + '\\pi')], `${M(`\\pi\\int_0^{${b}}x\\,dx`)}.`); });
  def(6, '6.5', (R) => { const { ri } = tools(R); const b = ri(1, 9);
    return pack(`Giá trị trung bình của ${M('x^2')} trên ${M(`[0,${b}]`)} là`, M(F(b * b, 3)), [M(F(b * b, 2)), M(F(b ** 3, 3)), M(F(b, 2))], `${M(`\\frac1{${b}}\\int_0^{${b}}x^2dx`)}.`); });
  def(7, '7.1', (R) => { const { ri } = tools(R); const n = ri(1, 4);
    return pack(`${M(`\\displaystyle\\int_1^{e} x^{${n}}\\ln x\\,dx`)} bằng`, M(`\\dfrac{${n}e^{${n + 1}}+1}{${(n + 1) ** 2}}`), [M(`\\dfrac{e^{${n + 1}}}{${n + 1}}`), M(`\\dfrac{${n}e^{${n + 1}}-1}{${(n + 1) ** 2}}`), M(`\\dfrac{e^{${n + 1}}+1}{${n + 1}}`)], `Từng phần với ${M('u=\\ln x')}, ${M(`dv=x^{${n}}dx`)}.`); });
  def(7, '7.8', (R) => { const { ri } = tools(R); const p = ri(2, 7);
    return pack(`${M(`\\displaystyle\\int_1^{\\infty}\\frac{dx}{x^{${p}}}`)}`, M(F(1, p - 1)), [M(F(1, p)), M(p - 1), M('\\text{phân kỳ}')], `${M(`\\left[\\frac{x^{1-p}}{1-p}\\right]_1^\\infty=\\frac1{p-1}`)} khi ${M('p>1')}.`); });
  def(7, '7.4', (R) => { const { ri } = tools(R); const a = ri(1, 4), b = a + ri(1, 4);
    return pack(`Phân tích ${M(`\\dfrac{1}{(x-${a})(x-${b})}=\\dfrac{A}{x-${a}}+\\dfrac{B}{x-${b}}`)}. Khi đó ${M('A')} bằng`, M(F(1, a - b)), [M(F(1, b - a)), M(1), M(F(1, a + b))], `Thế ${M(`x=${a}`)}: ${M(`A=\\frac{1}{${a}-${b}}`)}.`); });

  /* ---------- Chương 9–11 ---------- */
  def(9, '9.3', (R) => { const { ri, nz } = tools(R); const k = nz(-3, 3), A = ri(1, 9);
    return pack(`Nghiệm của ${M(`y'=${k}y`)}, ${M(`y(0)=${A}`)} là`, M(`y=${A}e^{${k}t}`), [M(`y=${A}e^{t/${k}}`), M(`y=${A}${sgn(k)}t`), M(`y=${A * k}e^{t}`)], 'Tăng trưởng/suy giảm mũ.'); });
  def(10, '10.3', (R) => { const { pick, ri } = tools(R); const r = ri(2, 6);
    const T = pick([['\\frac\\pi6', '\\frac{\\sqrt3}{2}', '\\frac12'], ['\\frac\\pi3', '\\frac12', '\\frac{\\sqrt3}{2}'], ['\\frac\\pi4', '\\frac{\\sqrt2}{2}', '\\frac{\\sqrt2}{2}'], ['\\frac{2\\pi}3', '-\\frac12', '\\frac{\\sqrt3}{2}']]);
    const mul = (k, v) => (v.startsWith('-') ? '-' + k + '\\cdot' + v.slice(1) : k + '\\cdot' + v);
    return pack(`Điểm có toạ độ cực ${M(`(${r},${T[0]})`)} trong toạ độ Descartes là`, M(`(${mul(r, T[1])},\\ ${mul(r, T[2])})`), [M(`(${mul(r, T[2])},\\ ${mul(r, T[1])})`), M(`(${r},\\ ${T[0]})`), M(`(${mul(r, T[1])},\\ -${mul(r, T[2])})`)], `${M('x=r\\cos\\theta')}, ${M('y=r\\sin\\theta')}.`); });
  def(11, '11.2', (R) => { const { ri } = tools(R); const q = ri(2, 6), p = ri(1, q - 1), a = ri(1, 6);
    return pack(`${M(`\\displaystyle\\sum_{n=0}^{\\infty}${a}\\left(${F(p, q)}\\right)^n`)} bằng`, M(F(a * q, q - p)), [M(F(a * p, q - p)), M(F(a * q, q + p)), M('\\infty')], `Cấp số nhân: ${M('\\frac{a}{1-r}')}.`); });
  def(11, '11.8', (R) => { const { ri } = tools(R); const c = ri(2, 9);
    return pack(`Bán kính hội tụ của ${M(`\\displaystyle\\sum_{n\\ge1}\\frac{x^n}{n\\cdot${c}^n}`)} là`, M(c), [M(F(1, c)), M(1), M('\\infty')], `Tỉ số ${M(`\\frac{n}{n+1}\\cdot\\frac{|x|}{${c}}\\to\\frac{|x|}{${c}}`)}.`); });
  def(11, '11.10', (R) => { const { ri, nz } = tools(R); const a = nz(-3, 3), k = ri(2, 5);
    const fact = [1, 1, 2, 6, 24, 120][k];
    return pack(`Hệ số của ${M(`x^{${k}}`)} trong chuỗi Maclaurin của ${M(`e^{${a}x}`)} là`, M(F(a ** k, fact)), [M(F(a, fact)), M(F(a ** k, k)), M(a ** k)], `${M(`e^{u}=\\sum\\frac{u^n}{n!}`)} với ${M(`u=${a}x`)}.`); });
  def(11, '11.6', (R) => { const { ri } = tools(R); const c = ri(2, 9), k = ri(1, 3);
    return pack(`Với chuỗi ${M(`\\sum\\frac{n^{${k}}}{${c}^n}`)}, tiêu chuẩn tỉ số cho giới hạn`, M(F(1, c) + '\\text{, hội tụ}'), [M(c + '\\text{, phân kỳ}'), M('1\\text{, không kết luận}'), M('0\\text{, hội tụ}')], `${M(`\\left(\\frac{n+1}{n}\\right)^{${k}}\\frac1{${c}}\\to\\frac1{${c}}`)}.`); });

  /* ---------- Chương 12–17 ---------- */
  def(12, '12.3', (R) => { const { ri } = tools(R); const a = [ri(-4, 4), ri(-4, 4), ri(-4, 4)], b = [ri(-4, 4), ri(-4, 4), ri(-4, 4)];
    const d = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    return pack(`${M(`\\langle${a}\\rangle\\cdot\\langle${b}\\rangle`)} bằng`, M(d), [M(a[0] * b[0] + a[1] * b[1] - a[2] * b[2]), M(a[0] + b[0] + a[1] + b[1] + a[2] + b[2]), M(d + (d % 2 ? 1 : 2))], 'Nhân từng thành phần rồi cộng.'); });
  def(12, '12.4', (R) => { const { ri } = tools(R); const a = [ri(-3, 3), ri(-3, 3), ri(-3, 3)], b = [ri(-3, 3), ri(-3, 3), ri(-3, 3)];
    const c = [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
    return pack(`${M(`\\langle${a}\\rangle\\times\\langle${b}\\rangle`)} bằng`, M(`\\langle${c}\\rangle`), [M(`\\langle${c.map((v) => -v)}\\rangle`), M(`\\langle${c[0]},${-c[1]},${c[2]}\\rangle`), M(`\\langle${a.map((v, i) => v * b[i])}\\rangle`)], 'Định thức với hàng $\\vec i,\\vec j,\\vec k$; đổi thứ tự thì đổi dấu.'); });
  def(14, '14.3', (R) => { const { ri, nz } = tools(R); const a = nz(-4, 4), m = ri(1, 4), n = ri(1, 4), x = nz(-2, 2), y = nz(-2, 2);
    return pack(`Với ${M(`f(x,y)=${a}x^{${m}}y^{${n}}`)}, ${M(`f_x(${x},${y})`)} bằng`, M(a * m * x ** (m - 1) * y ** n), [M(a * n * x ** m * y ** (n - 1)), M(a * m * n * x ** (m - 1) * y ** (n - 1)), M(a * x ** m * y ** n)], `Coi ${M('y')} là hằng số.`); });
  def(14, '14.6', (R) => { const { pick } = tools(R); const [p, q, r] = pick([[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 6, 10], [4, 3, 5]]);
    return pack(`Với ${M('f(x,y)=x^2+y^2')}, độ lớn ${M(`|\\nabla f(${p},${q})|`)} bằng`, M(2 * r), [M(r), M(2 * (p + q)), M(r * r)], `${M(`\\nabla f=\\langle${2 * p},${2 * q}\\rangle`)}.`); });
  def(14, '14.7', (R) => { const { ri, nz } = tools(R); const a = ri(1, 3), b = ri(1, 3), h = nz(-3, 3), k = nz(-3, 3);
    return pack(`${M(`f(x,y)=${a}(x${sgn(-h)})^2+${b}(y${sgn(-k)})^2`)} đạt cực tiểu tại`, M(`(${h},${k})`), [M(`(${-h},${-k})`), M(`(${k},${h})`), M('(0,0)')], 'Tổng hai bình phương không âm, bằng 0 khi cả hai bằng 0.'); });
  def(15, '15.1', (R) => { const { ri } = tools(R); const a = ri(1, 5), b = ri(1, 5);
    return pack(`${M(`\\displaystyle\\int_0^{${a}}\\int_0^{${b}}xy\\,dy\\,dx`)} bằng`, M(F(a * a * b * b, 4)), [M(F(a * b, 4)), M(F(a * a * b * b, 2)), M(a * b)], `Tách biến: ${M(`\\frac{${a}^2}{2}\\cdot\\frac{${b}^2}{2}`)}.`); });
  def(15, '15.3', (R) => { const { ri } = tools(R); const a = ri(1, 4);
    return pack(`${M(`\\displaystyle\\iint_{x^2+y^2\\le${a * a}}(x^2+y^2)\\,dA`)} bằng`, M(F(a ** 4, 2) + '\\pi'), [M(F(a ** 4, 4) + '\\pi'), M(a ** 4 + '\\pi'), M(F(a ** 3, 3) + '\\cdot2\\pi')], `${M(`\\int_0^{2\\pi}\\int_0^{${a}}r^2\\cdot r\\,dr\\,d\\theta`)}; nhớ thừa số ${M('r')}.`); });
  def(16, '16.5', (R) => { const { nz } = tools(R); const a = nz(-4, 4), b = nz(-4, 4), c = nz(-4, 4);
    return pack(`Divergence của ${M(`\\vec F=\\langle${a}x,\\ ${b}y,\\ ${c}z\\rangle`)} là`, M(a + b + c), [M(a * b * c), M(`\\langle${a},${b},${c}\\rangle`), M(0)], `${M('P_x+Q_y+R_z')}.`); });
  def(17, '17.1', (R) => { const { ri } = tools(R); let r1 = ri(-4, 4), r2 = ri(-4, 4); if (r1 === r2) r2 = r1 + 1;
    const s = r1 + r2, p = r1 * r2, E = (r) => (r === 0 ? '' : `e^{${r}x}`);
    return pack(`Nghiệm tổng quát của ${M(`y''${s ? sgn(-s) + "y'" : ''}${p ? sgn(p) + 'y' : ''}=0`)} là`, M(`c_1${E(r1)}+c_2${E(r2)}`), [M(`c_1${E(-r1)}+c_2${E(-r2)}`), M(`(c_1+c_2x)${E(r1)}`), M(`c_1\\cos${Math.abs(r1) || 1}x+c_2\\sin${Math.abs(r1) || 1}x`)], `Phương trình đặc trưng ${M(`r^2${s ? sgn(-s) + 'r' : ''}${p ? sgn(p) : ''}=0`)} có nghiệm ${M(r1)}, ${M(r2)}.`); });

  /* ---------- Phần III–IV ---------- */
  def(20, '20.6', (R) => { const { ri } = tools(R); const m = ri(2, 4), n = ri(m, 5);
    let inj = 1; for (let i = 0; i < m; i++) inj *= n - i;
    return pack(`Có bao nhiêu **đơn ánh** từ tập ${m} phần tử vào tập ${n} phần tử?`, M(inj), [M(n ** m), M(m ** n), M(n * m)], `Chọn ảnh lần lượt: ${M(Array.from({ length: m }, (_, i) => n - i).join('\\cdot'))}. Phương án ${M(n ** m)} là số mọi hàm.`); });
  def(22, '22.5', (R) => { const { ri } = tools(R); const a = ri(1, 6), b = ri(1, 6);
    return pack(`${M(`\\sup\\left\\{\\dfrac{${a}n}{n+${b}}: n\\ge1\\right\\}`)} bằng`, M(a), [M(F(a, 1 + b)), M(F(a, b)), M('\\infty')], 'Dãy tăng, tiến về $a$ nhưng không đạt.'); });
  def(23, '23.1', (R) => { const { ri } = tools(R); const m = ri(5, 99);
    return pack(`Với ${M('a_n=\\frac1n')} và ${M(`\\varepsilon=\\frac1{${m}}`)}, ${M('N')} nhỏ nhất để ${M('|a_n|<\\varepsilon')} với mọi ${M('n\\ge N')} là`, M(m + 1), [M(m), M(m - 1), M(2 * m)], `Cần ${M(`n>${m}`)}.`); });
  def(28, '28.3', (R) => { const { ri } = tools(R); const n = ri(2, 12);
    return pack(`Tổng trên ${M('U(f,P)')} của ${M('f(x)=x')} trên ${M('[0,1]')} với ${n} khoảng đều là`, M(F(n + 1, 2 * n)), [M(F(n - 1, 2 * n)), M(F(1, 2)), M(F(n + 1, n))], `${M(`\\sum_{k=1}^{${n}}\\frac k{${n}}\\cdot\\frac1{${n}}`)}.`); });
  def(33, '33.3', (R) => { const { nz, ri } = tools(R); const a = nz(-5, 5), b = nz(-5, 5), m = ri(1, 3), n = m + ri(1, 3);
    return pack(`Với ${M(`f=${a}e_{${m}}${sgn(b)}e_{${n}}`)}, hệ số Fourier ${M(`\\hat f(${n})`)} bằng`, M(b), [M(a), M(0), M(a + b)], 'Tích vô hướng với $e_n$; các $e_k$ trực chuẩn.'); });
  def(34, '34.5', (R) => { const { nz } = tools(R); const a = nz(-3, 3), c = nz(-3, 3);
    const D = 4 * a * c, kind = D > 0 ? (a > 0 ? 'cực tiểu' : 'cực đại') : 'điểm yên ngựa';
    return pack(`Tại gốc, ${M(`f(x,y)=${a}x^2${sgn(c)}y^2`)} có`, M('\\text{' + kind + '}'), ['cực tiểu', 'cực đại', 'điểm yên ngựa', 'chưa kết luận được'].filter((k) => k !== kind).map((k) => M('\\text{' + k + '}')), `${M(`D=f_{xx}f_{yy}-f_{xy}^2=${D}`)}${D > 0 ? `, ${M(`f_{xx}=${2 * a}`)}` : ''}.`); });

  window.QGEN = G;
  window.QGEN_build = function (g, R) {
    const o = g.make(R);
    return { q: o.q.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>'), opts: o.opts, ans: o.ans, why: o.why, sid: g.sid, gen: true };
  };
})();
