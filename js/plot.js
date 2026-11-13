/* Thư viện vẽ nhỏ: Plot (toạ độ thế giới → canvas), điều khiển, và sổ đăng ký minh hoạ. */
(function () {
  const W = (window.WIDGETS = {});
  const live = (window.LIVE_WIDGETS = []);

  function col(name) {
    return getComputedStyle(document.documentElement).getPropertyValue('--' + name).trim();
  }
  window.col = col;

  function el(tag, attrs, kids) {
    const e = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      if (k === 'class') e.className = attrs[k];
      else if (k === 'html') e.innerHTML = attrs[k];
      else if (k === 'text') e.textContent = attrs[k];
      else if (k.startsWith('on')) e.addEventListener(k.slice(2), attrs[k]);
      else e.setAttribute(k, attrs[k]);
    }
    (kids || []).forEach((c) => c && e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c));
    return e;
  }
  window.el = el;

  function niceStep(range, target) {
    const raw = range / (target || 6);
    const p = Math.pow(10, Math.floor(Math.log10(raw)));
    const m = raw / p;
    return (m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10) * p;
  }
  function fmt(v, d) {
    if (!isFinite(v)) return v > 0 ? '∞' : v < 0 ? '−∞' : '—';
    if (d === undefined) d = Math.abs(v) >= 100 ? 1 : Math.abs(v) >= 10 ? 2 : 3;
    let s = (+v.toFixed(d)).toString();
    return s.replace('-', '−').replace('.', ',');
  }
  window.fmt = fmt;

  class Plot {
    constructor(parent, o) {
      this.o = Object.assign({ xmin: -1, xmax: 10, ymin: -1, ymax: 2, h: 300, pad: 30, grid: true, xlabel: '', ylabel: '' }, o);
      this.c = el('canvas', { class: 'plot' });
      parent.appendChild(this.c);
      this.ctx = this.c.getContext('2d');
      this.resize();
    }
    set(o) { Object.assign(this.o, o); }
    resize() {
      const w = Math.max(260, this.c.parentElement.clientWidth || 600);
      const h = typeof this.o.h === 'function' ? this.o.h(w) : this.o.h;
      const dpr = window.devicePixelRatio || 1;
      this.W = w; this.H = h;
      this.c.width = Math.round(w * dpr); this.c.height = Math.round(h * dpr);
      this.c.style.height = h + 'px';
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    X(x) { const o = this.o; return o.pad + (x - o.xmin) / (o.xmax - o.xmin) * (this.W - 2 * o.pad); }
    Y(y) { const o = this.o; return this.H - o.pad + 6 - (y - o.ymin) / (o.ymax - o.ymin) * (this.H - 2 * o.pad + 6); }
    ix(px) { const o = this.o; return o.xmin + (px - o.pad) / (this.W - 2 * o.pad) * (o.xmax - o.xmin); }
    iy(py) { const o = this.o; return o.ymin + (this.H - o.pad + 6 - py) / (this.H - 2 * o.pad + 6) * (o.ymax - o.ymin); }
    clear() {
      const c = this.ctx; c.clearRect(0, 0, this.W, this.H);
      c.fillStyle = col('surface'); c.fillRect(0, 0, this.W, this.H);
      if (this.o.grid !== false) this.axes();
    }
    axes() {
      const c = this.ctx, o = this.o;
      const sx = o.xstep || niceStep(o.xmax - o.xmin, this.W > 500 ? 8 : 5);
      const sy = o.ystep || niceStep(o.ymax - o.ymin, 6);
      c.lineWidth = 1; c.strokeStyle = col('grid'); c.fillStyle = col('faint');
      c.font = '11px "Be Vietnam Pro", sans-serif';
      const y0 = Math.min(Math.max(0, o.ymin), o.ymax), x0 = Math.min(Math.max(0, o.xmin), o.xmax);
      c.textAlign = 'center'; c.textBaseline = 'top';
      for (let x = Math.ceil(o.xmin / sx) * sx; x <= o.xmax + 1e-9; x += sx) {
        const px = Math.round(this.X(x)) + 0.5;
        c.beginPath(); c.moveTo(px, this.Y(o.ymin)); c.lineTo(px, this.Y(o.ymax)); c.stroke();
        if (Math.abs(x) > 1e-9 || o.ymin >= 0) c.fillText(o.xfmt ? o.xfmt(x) : fmt(x, 2), px, Math.min(this.Y(y0) + 4, this.H - 14));
      }
      c.textAlign = 'right'; c.textBaseline = 'middle';
      for (let y = Math.ceil(o.ymin / sy) * sy; y <= o.ymax + 1e-9; y += sy) {
        const py = Math.round(this.Y(y)) + 0.5;
        c.beginPath(); c.moveTo(this.X(o.xmin), py); c.lineTo(this.X(o.xmax), py); c.stroke();
        if (Math.abs(y) > 1e-9) c.fillText(fmt(y, 2), Math.max(this.X(x0) - 4, 24), py);
      }
      c.strokeStyle = col('axis');
      c.beginPath(); c.moveTo(this.X(o.xmin), Math.round(this.Y(y0)) + 0.5); c.lineTo(this.X(o.xmax), Math.round(this.Y(y0)) + 0.5); c.stroke();
      c.beginPath(); c.moveTo(Math.round(this.X(x0)) + 0.5, this.Y(o.ymin)); c.lineTo(Math.round(this.X(x0)) + 0.5, this.Y(o.ymax)); c.stroke();
    }
    fn(f, color, w, a, b, opt) {
      const c = this.ctx, o = this.o; a = a === undefined ? o.xmin : a; b = b === undefined ? o.xmax : b;
      const n = Math.max(200, Math.round((this.X(b) - this.X(a)) * 1.5));
      c.strokeStyle = color || col('accent'); c.lineWidth = w || 2; c.setLineDash((opt && opt.dash) || []);
      c.beginPath(); let pen = false, py0 = null;
      for (let i = 0; i <= n; i++) {
        const x = a + (b - a) * i / n, y = f(x);
        if (!isFinite(y) || y > o.ymax + (o.ymax - o.ymin) * 3 || y < o.ymin - (o.ymax - o.ymin) * 3) { pen = false; continue; }
        const px = this.X(x), py = this.Y(y);
        if (pen && py0 !== null && Math.abs(py - py0) > this.H * 0.6 && !(opt && opt.join)) pen = false;
        pen ? c.lineTo(px, py) : c.moveTo(px, py); pen = true; py0 = py;
      }
      c.stroke(); c.setLineDash([]);
    }
    line(x1, y1, x2, y2, color, w, dash) {
      const c = this.ctx; c.strokeStyle = color || col('ink'); c.lineWidth = w || 1.5; c.setLineDash(dash || []);
      c.beginPath(); c.moveTo(this.X(x1), this.Y(y1)); c.lineTo(this.X(x2), this.Y(y2)); c.stroke(); c.setLineDash([]);
    }
    path(pts, color, w, fill) {
      const c = this.ctx; if (!pts.length) return; c.beginPath();
      pts.forEach((p, i) => (i ? c.lineTo(this.X(p[0]), this.Y(p[1])) : c.moveTo(this.X(p[0]), this.Y(p[1]))));
      if (fill) { c.closePath(); c.fillStyle = fill; c.fill(); }
      if (color) { c.strokeStyle = color; c.lineWidth = w || 1.5; c.stroke(); }
    }
    dot(x, y, r, color, hollow) {
      const c = this.ctx; c.beginPath(); c.arc(this.X(x), this.Y(y), r || 3.5, 0, 7);
      if (hollow) { c.fillStyle = col('surface'); c.fill(); c.strokeStyle = color || col('accent'); c.lineWidth = 1.6; c.stroke(); }
      else { c.fillStyle = color || col('accent'); c.fill(); }
    }
    rect(x1, y1, x2, y2, fill, stroke) {
      const c = this.ctx; const X1 = this.X(x1), X2 = this.X(x2), Y1 = this.Y(y1), Y2 = this.Y(y2);
      if (fill) { c.fillStyle = fill; c.fillRect(Math.min(X1, X2), Math.min(Y1, Y2), Math.abs(X2 - X1), Math.abs(Y2 - Y1)); }
      if (stroke) { c.strokeStyle = stroke; c.lineWidth = 1; c.strokeRect(Math.min(X1, X2) + .5, Math.min(Y1, Y2) + .5, Math.abs(X2 - X1), Math.abs(Y2 - Y1)); }
    }
    hband(y1, y2, fill) { this.rect(this.o.xmin, y1, this.o.xmax, y2, fill || col('band')); }
    vband(x1, x2, fill) { this.rect(x1, this.o.ymin, x2, this.o.ymax, fill || col('band2')); }
    text(s, x, y, color, align, base, font) {
      const c = this.ctx; c.fillStyle = color || col('ink'); c.font = font || '12px "Be Vietnam Pro", sans-serif';
      c.textAlign = align || 'left'; c.textBaseline = base || 'middle'; c.fillText(s, this.X(x), this.Y(y));
    }
    ptext(s, px, py, color, align, base, font) {
      const c = this.ctx; c.fillStyle = color || col('ink'); c.font = font || '12px "Be Vietnam Pro", sans-serif';
      c.textAlign = align || 'left'; c.textBaseline = base || 'middle'; c.fillText(s, px, py);
    }
    onPointer(cb) {
      const h = (e) => {
        const r = this.c.getBoundingClientRect();
        cb(this.ix(e.clientX - r.left), this.iy(e.clientY - r.top), e, e.clientX - r.left, e.clientY - r.top);
      };
      this.c.addEventListener('pointerdown', (e) => { try { this.c.setPointerCapture(e.pointerId); } catch (x) {} this._drag = e.isTrusted; h(e); });
      this.c.addEventListener('pointermove', (e) => { if (this._drag) h(e); });
      this.c.addEventListener('pointerup', () => (this._drag = false));
    }
  }
  window.Plot = Plot;

  /* ---------- điều khiển ---------- */
  const UI = (window.UI = {
    row(root) { const r = el('div', { class: 'ctrls' }); root.appendChild(r); return r; },
    slider(row, label, min, max, step, val, on, show) {
      const b = el('b');
      const i = el('input', { type: 'range', min, max, step, value: val, 'aria-label': label });
      const upd = () => { b.textContent = show ? show(+i.value) : fmt(+i.value); };
      i.addEventListener('input', () => { upd(); on(+i.value); });
      upd();
      row.appendChild(el('label', { class: 'ctrl' }, [label, i, b]));
      return { get v() { return +i.value; }, set(v) { i.value = v; upd(); }, input: i };
    },
    select(row, label, opts, val, on) {
      const s = el('select', { 'aria-label': label });
      opts.forEach(([v, t]) => { const o = el('option', { value: v, text: t }); if (v == val) o.selected = true; s.appendChild(o); });
      s.addEventListener('change', () => on(s.value));
      row.appendChild(el('label', { class: 'ctrl' }, label ? [label, s] : [s]));
      return s;
    },
    button(row, text, on, primary) {
      const b = el('button', { class: 'btn small' + (primary ? ' primary' : ''), text, onclick: on });
      row.appendChild(b); return b;
    },
    check(row, label, val, on) {
      const i = el('input', { type: 'checkbox' }); i.checked = !!val;
      i.addEventListener('change', () => on(i.checked));
      row.appendChild(el('label', { class: 'ctrl' }, [i, label])); return i;
    },
    readout(root) { const d = el('div', { class: 'readout' }); root.appendChild(d); return d; },
    say(d, html, kind) {
      /* dấu phẩy thập phân kiểu Việt trong công thức: 25,13 → 25{,}13 để KaTeX không chèn khoảng trắng */
      html = html.replace(/\$([^$]+)\$/g, (m) => m.replace(/(\d),(\d)/g, '$1{,}$2'));
      d.className = 'readout' + (kind ? ' ' + kind : ''); d.innerHTML = html; if (window.renderMath) window.renderMath(d); },
    legend(root, items) {
      const d = el('div', { class: 'legend' });
      items.forEach(([c, t]) => { const s = el('span', { text: t }); s.style.setProperty('--c', c); d.appendChild(s); });
      root.appendChild(d); return d;
    },
  });

  /* Đăng ký minh hoạ: def(name, title, desc, build(root, opts) → draw) */
  window.defWidget = function (name, title, desc, build) { W[name] = { title, desc, build }; };

  window.mountWidget = function (container, name, opts) {
    const w = W[name];
    if (!w) return;
    const box = el('div', { class: 'widget' });
    const t = typeof w.title === 'function' ? w.title(opts) : w.title;
    const d = typeof w.desc === 'function' ? w.desc(opts) : w.desc;
    box.appendChild(el('div', { class: 'wt', html: t }));
    if (d) box.appendChild(el('div', { class: 'wd', html: d }));
    container.appendChild(box);
    const draw = w.build(box, opts || {});
    if (typeof draw === 'function') {
      const entry = { box, draw };
      live.push(entry);
      try { draw(); } catch (e) { console.error(name, e); }
      /* k=… chọn ví dụ khởi đầu ở ô chọn đầu tiên, để cùng một minh hoạ ở hai mục dùng hai ví dụ khác nhau */
      if (opts && opts.k) {
        const s = box.querySelector('select');
        if (s && [...s.options].some((o) => o.value === opts.k)) { s.value = opts.k; s.dispatchEvent(new Event('change')); }
      }
      if (window.attachAnim) window.attachAnim(box, name);
    }
  };

  let rt;
  window.addEventListener('resize', () => {
    clearTimeout(rt);
    rt = setTimeout(() => live.forEach((e) => { e.box.querySelectorAll('canvas.plot').forEach((c) => c._plot && c._plot.resize()); e.draw(); }), 120);
  });
  /* đánh dấu canvas để resize */
  const origResize = Plot.prototype.resize;
  Plot.prototype.resize = function () { this.c._plot = this; return origResize.call(this); };

  /* tiện ích số học */
  window.MathX = {
    lin: (a, b, n) => Array.from({ length: n }, (_, i) => a + (b - a) * i / (n - 1)),
    gcd: (a, b) => (b ? MathX.gcd(b, a % b) : Math.abs(a)),
    fact: (n) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r; },
    binom: (n, k) => { let r = 1; for (let i = 1; i <= k; i++) r = r * (n - k + i) / i; return r; },
    supOn: (f, a, b, n) => { let m = -Infinity; n = n || 400; for (let i = 0; i <= n; i++) m = Math.max(m, f(a + (b - a) * i / n)); return m; },
    infOn: (f, a, b, n) => { let m = Infinity; n = n || 400; for (let i = 0; i <= n; i++) m = Math.min(m, f(a + (b - a) * i / n)); return m; },
    integ: (f, a, b, n) => { n = n || 2000; const h = (b - a) / n; let s = 0; for (let i = 0; i < n; i++) s += f(a + (i + 0.5) * h); return s * h; },
  };
})();
