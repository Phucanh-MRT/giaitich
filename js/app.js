/* Sổ Giải Tích — lõi ứng dụng: đọc nội dung, điều hướng, tiến độ, ghi chú, ôn thẻ, bản đồ. */
(function () {
  const $ = (s, r) => (r || document).querySelector(s);
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const inline = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
  const fold = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();

  /* ---------- đọc nội dung ----------
     Hai nguồn: 'S' (Phần I–II, theo mục lục Stewart, số chương giữ nguyên 1–17)
     và 'T' (Phần III–IV, theo Tao, số chương dời thêm 17: 1→18 … 19→36).
     Mỗi mục có oid (mã gốc trong nguồn: Tao '6.1', Stewart 'S2.3') dùng cho
     @pre, @see, nội dung bổ sung và hình; id/num là số hiển thị mới. */
  const OFFSET = { S: 0, T: 17 };
  /* Ngoại lệ của nguồn Tao: chương 1 (Giới thiệu) thành Chương 0 "Mở đầu" ở đầu sổ;
     Phụ lục A (logic) thành Chương 18, mở đầu Phần III. */
  const TMAP = { '1': '0', A: '18' }, TBACK = { '0': '1', '18': 'A' };
  const shift = (num, tag) => {
    const m = /^([0-9A-Z]+)(\.\d+)?$/.exec(num); if (!m) return num;
    if (tag === 'T' && TMAP[m[1]] !== undefined) return TMAP[m[1]] + (m[2] || '');
    return /^\d+$/.test(m[1]) ? +m[1] + OFFSET[tag] + (m[2] || '') : num;
  };
  /* Trong nội dung Stewart, "T26.3" là số hiển thị của phần Tao (0, 18–36), đổi về mã gốc 9.3;
     "2.3" là mục Stewart; trong nội dung Tao, "6.3" là mã gốc Tao. */
  const toOid = (ref, tag) => {
    if (ref.startsWith('T')) { const m = /^T(\d+)(\.\d+)?$/.exec(ref); if (!m) return ref.slice(1); return (TBACK[m[1]] || String(+m[1] - OFFSET.T)) + (m[2] || ''); }
    if (ref.startsWith('S')) return ref;
    return tag === 'S' ? 'S' + ref : ref;
  };
  function parse(src, tag) {
    const chapters = [];
    let ch = null, s = null, q = null, w = null;
    src.split(/\r?\n/).forEach((raw) => {
      const line = raw.trimEnd();
      if (!line.trim()) return;
      if (line.startsWith('## ')) {
        const [num, title, page] = line.slice(3).split('|').map((x) => x.trim());
        const id = String(shift(num, tag));
        s = { id, num: id, onum: num, oid: tag === 'S' ? 'S' + num : num, src: tag, title, page: +page || 0, ch, idea: [], keys: [], ex: [], quiz: [], pre: [], see: [], widgets: [], work: [] };
        ch.sections.push(s); q = w = null;
      } else if (line.startsWith('# ')) {
        const [num, title, page, book] = line.slice(2).split('|').map((x) => x.trim());
        ch = { num: String(shift(num, tag)), onum: num, title, page: +page || 0, book: tag === 'S' ? 'S' : book || 'I', summary: '', sections: [] };
        chapters.push(ch); s = null;
      } else if (line.startsWith('> ') && ch && !s) ch.summary = line.slice(2);
      else if (!s) return;
      else if (line.startsWith('@pre ')) s.pre = line.slice(5).trim().split(/\s+/).map((r) => toOid(r, tag));
      else if (line.startsWith('@see ')) s.see = line.slice(5).trim().split(/\s+/).map((r) => toOid(r, tag));
      else if (line.startsWith('&> ') && w) w.a.push(inline(line.slice(3)));
      else if (line.startsWith('& ')) { w = { q: inline(line.slice(2)), a: [] }; s.work.push(w); q = null; }
      else if (line.startsWith('@w ')) {
        const parts = line.slice(3).trim().split(/\s+/);
        const opts = {};
        parts.slice(1).forEach((p) => { const [k, v] = p.split('='); opts[k] = v; });
        s.widgets.push({ name: parts[0], opts });
      } else if (line.startsWith('| ')) s.idea.push({ t: 'p', h: inline(line.slice(2)) });
      else if (line.startsWith('* ')) s.idea.push({ t: 'li', h: inline(line.slice(2)) });
      else if (line.startsWith('! ')) {
        const i = line.indexOf(' :: ');
        s.keys.push([line.slice(2, i).trim(), inline(line.slice(i + 4))]);
      } else if (line.startsWith('~ ')) s.ex.push(inline(line.slice(2)));
      else if (line.startsWith('? ')) { q = { q: inline(line.slice(2)), opts: [], ans: -1, why: '' }; s.quiz.push(q); w = null; }
      else if (q && (line.startsWith('- ') || line.startsWith('+ '))) {
        if (line[0] === '+') q.ans = q.opts.length;
        q.opts.push(inline(line.slice(2)));
      } else if (q && line.startsWith('= ')) q.why = inline(line.slice(2));
    });
    return chapters;
  }

  const raw = [];
  (window.STEWART || []).forEach((src) => raw.push(...parse(src, 'S')));
  raw.push(...parse(window.PART_1 || '', 'T'), ...parse(window.PART_2 || '', 'T'));
  const numeric = raw.filter((c) => /^\d+$/.test(c.num)).sort((a, b) => a.num - b.num);
  const appx = raw.filter((c) => !/^\d+$/.test(c.num));
  const CH = numeric.concat(appx);
  const SEC = [];
  CH.forEach((c) => c.sections.forEach((s) => SEC.push(s)));
  const BY = {}, OID = {};
  SEC.forEach((s, i) => { s.i = i; BY[s.id] = s; OID[s.oid] = s; });
  /* nội dung bổ sung (js/extra-*.js): "## mã gốc" rồi các dòng ~ ? - + = ! | và
     "& đề bài", "&> một đoạn lời giải" */
  (window.EXTRA || []).forEach((src) => {
    let s = null, q = null, w = null;
    src.split(/\r?\n/).forEach((raw) => {
      const line = raw.trimEnd();
      if (!line.trim()) return;
      if (line.startsWith('## ')) { s = OID[line.slice(3).trim()] || null; q = w = null; if (!s) console.warn('extra: không có mục', line); return; }
      if (!s) return;
      if (line.startsWith('&> ') && w) w.a.push(inline(line.slice(3)));
      else if (line.startsWith('& ')) { w = { q: inline(line.slice(2)), a: [] }; s.work.push(w); q = null; }
      else if (line.startsWith('~ ')) s.ex.push(inline(line.slice(2)));
      else if (line.startsWith('| ')) s.idea.push({ t: 'p', h: inline(line.slice(2)) });
      else if (line.startsWith('! ')) { const i = line.indexOf(' :: '); s.keys.push([line.slice(2, i).trim(), inline(line.slice(i + 4))]); }
      else if (line.startsWith('? ')) { q = { q: inline(line.slice(2)), opts: [], ans: -1, why: '' }; s.quiz.push(q); w = null; }
      else if (q && (line.startsWith('- ') || line.startsWith('+ '))) { if (line[0] === '+') q.ans = q.opts.length; q.opts.push(inline(line.slice(2))); }
      else if (q && line.startsWith('= ')) q.why = inline(line.slice(2));
    });
  });
  /* đổi oid trong @pre/@see sang id hiển thị; nối hai chiều */
  SEC.forEach((s) => { s.next = []; s.seeBy = []; });
  SEC.forEach((s) => {
    s.pre = s.pre.map((o) => OID[o] && OID[o].id).filter(Boolean);
    s.see = s.see.map((o) => OID[o] && OID[o].id).filter(Boolean);
  });
  SEC.forEach((s) => { s.pre.forEach((p) => BY[p].next.push(s.id)); s.see.forEach((p) => BY[p].seeBy.push(s.id)); });
  const bookName = (c) => (c.book === 'S' ? 'Calculus (Stewart) §' : c.book === 'II' ? 'Giải tích II, tr. ' : 'Giải tích I, tr. ');
  const pageLabel = (s) => bookName(s.ch) + (s.ch.book === 'S' ? s.onum : s.page);
  const chLabel = (c) => (c.num === '0' ? 'Mở đầu' : /^\d+$/.test(c.num) ? 'Chương ' + c.num : 'Phụ lục ' + c.num);
  const inRange = (a, b) => (c) => /^\d+$/.test(c.num) && +c.num >= a && +c.num <= b;
  const PARTS = [
    { title: 'Mở đầu', note: 'Giải tích là gì và vì sao cần chặt chẽ', test: inRange(0, 0) },
    { title: 'Phần I · Giải tích tính toán một biến', note: 'Theo mục lục Calculus (Stewart), Ch.1–11', test: inRange(1, 11) },
    { title: 'Phần II · Nhiều biến và giải tích vectơ', note: 'Theo mục lục Calculus (Stewart), Ch.12–17', test: inRange(12, 17) },
    { title: 'Phần III · Giải tích chặt chẽ', note: 'Mở đầu bằng logic và cách viết chứng minh, rồi theo mục lục Giải tích I', test: inRange(18, 28) },
    { title: 'Phần IV · Giải tích nâng cao', note: 'Theo mục lục Giải tích II', test: inRange(29, 99) },
    { title: 'Phụ lục', note: 'Hệ thập phân', test: (c) => !/^\d+$/.test(c.num) },
  ];

  /* ---------- lưu trữ ---------- */
  const KEY = 'so-giai-tich.v1';
  let ST = { done: {}, notes: {}, quiz: {}, cards: {}, last: null };
  try { Object.assign(ST, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) {}
  let saveT;
  const save = () => { clearTimeout(saveT); saveT = setTimeout(() => { try { localStorage.setItem(KEY, JSON.stringify(ST)); } catch (e) {} }, 150); };
  /* chuyển dữ liệu cũ (trước khi có Phần I–II, mọi mã số là mã gốc của Tao) sang số mới */
  /* v1 → mã gốc Tao; v2 → số hiển thị có "18.x = Giới thiệu", "A.x = Logic"; v3 → "0.x = Mở đầu", "18.x = Logic" */
  function migrate(d) {
    if (!d || d.v >= 3) return d;
    const m = !d.v || d.v < 2
      ? (k) => (OID[k] && OID[k].src === 'T' ? OID[k].id : k)
      : (k) => { const x = /^(18|A)\.(\d+)$/.exec(k); return x ? (x[1] === '18' ? '0.' : '18.') + x[2] : k; };
    const mc = (c) => (c === '18' ? '0' : c === 'A' ? '18' : c);
    ['done', 'notes', 'quiz'].forEach((f) => { const o = {}; Object.keys(d[f] || {}).forEach((k) => (o[m(k)] = d[f][k])); d[f] = o; });
    const c = {}; Object.keys(d.cards || {}).forEach((k) => { const [a, b] = k.split('#'); c[m(a) + '#' + b] = d.cards[k]; }); d.cards = c;
    if (d.last) d.last = m(d.last);
    if (d.v === 2) {
      (d.exams || []).concat(d.exam ? [d.exam] : []).forEach((e) => { (e.items || []).forEach((it) => (it.sid = m(it.sid))); if (e.cfg) e.cfg.chapters = e.cfg.chapters.map(mc); });
      ['examCfg', 'examPrint'].forEach((f) => { if (d[f] && d[f].chapters) d[f].chapters = d[f].chapters.map(mc); });
    }
    d.v = 3;
    return d;
  }
  if (!ST.v || ST.v < 3) { ST = migrate(ST); save(); }

  /* ---------- toán ---------- */
  window.renderMath = function (node) {
    if (!window.renderMathInElement) return;
    try {
      renderMathInElement(node, {
        delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }],
        throwOnError: false, strict: false,
      });
    } catch (e) {}
  };

  /* ---------- mục lục bên ---------- */
  const toc = $('#toc');
  let curId = null;
  function buildToc(filter) {
    toc.innerHTML = '';
    const f = filter ? fold(filter) : '';
    PARTS.forEach((P) => {
      const chs = CH.filter(P.test);
      let any = false;
      const group = el('div');
      group.appendChild(el('div', { class: 'partlabel', text: P.title }));
      chs.forEach((c) => {
        const secs = f ? c.sections.filter((s) => fold(s.num + ' ' + s.title + ' ' + s.keys.map((k) => k[0] + ' ' + k[1]).join(' ') + ' ' + s.idea.map((x) => x.h).join(' ')).includes(f)) : c.sections;
        if (!secs.length && !(f && fold(c.title).includes(f))) return;
        any = true;
        const open = f || (curId && BY[curId] && BY[curId].ch === c) || c._open;
        const box = el('div', { class: 'ch' + (open ? ' open' : '') });
        const done = c.sections.filter((s) => ST.done[s.id]).length;
        const btn = el('button', { 'aria-expanded': open ? 'true' : 'false' }, [
          el('span', { class: 'cht', html: '<i>' + c.num + '</i>' + esc(c.title) }),
          el('span', { class: 'chp', text: done + '/' + c.sections.length }),
        ]);
        btn.onclick = () => { c._open = !box.classList.contains('open'); box.classList.toggle('open'); btn.setAttribute('aria-expanded', box.classList.contains('open')); };
        box.appendChild(btn);
        const ul = el('ul');
        (f ? secs : c.sections).forEach((s) => {
          const a = el('a', { href: '#/s/' + s.id, class: s.id === curId ? 'cur' : '' }, [
            el('span', { class: 'dotst' + (ST.done[s.id] ? ' on' : '') }),
            el('span', { class: 'n', text: s.num }),
            el('span', { text: s.title }),
          ]);
          ul.appendChild(el('li', null, [a]));
        });
        box.appendChild(ul);
        group.appendChild(box);
      });
      if (any) toc.appendChild(group);
    });
    renderMath(toc);
    if (!toc.children.length) toc.appendChild(el('div', { class: 'tocempty', text: 'Không có mục nào khớp “' + filter + '”.' }));
  }
  $('#q').addEventListener('input', (e) => buildToc(e.target.value.trim()));

  /* ---------- khung ---------- */
  const view = $('#view');
  const crumb = $('#crumb');
  function closeDrawer() { $('#side').classList.remove('open'); $('#scrim').classList.remove('open'); }
  $('#menu').onclick = () => { $('#side').classList.add('open'); $('#scrim').classList.add('open'); };
  $('#scrim').onclick = closeDrawer;
  const bn = document.getElementById('bnToc'); if (bn) bn.onclick = () => { $('#side').classList.add('open'); $('#scrim').classList.add('open'); const c = toc.querySelector('a.cur'); if (c) c.scrollIntoView({ block: 'center' }); };

  function setTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem('sgt-theme', t); } catch (e) {}
    (window.LIVE_WIDGETS || []).forEach((w) => w.draw());
  }
  try { const t = localStorage.getItem('sgt-theme'); document.documentElement.setAttribute('data-theme', t || 'light'); } catch (e) { document.documentElement.setAttribute('data-theme', 'light'); }
  $('#theme').onclick = () => {
    const dark = getComputedStyle(document.documentElement).getPropertyValue('color-scheme').trim() === 'dark';
    setTheme(dark ? 'light' : 'dark');
  };

  const icon = {
    check: '<svg viewBox="0 0 20 20"><path d="M4 10.5l4 4 8-9"/></svg>',
    arrow: '<svg viewBox="0 0 20 20"><path d="M4 10h12M11 5l5 5-5 5"/></svg>',
  };

  /* ---------- trang tổng quan ---------- */
  function cardsAll() {
    const out = [];
    SEC.forEach((s) => s.keys.forEach((k, j) => out.push({ id: s.id + '#' + j, s, k })));
    return out;
  }
  function dueCards() {
    const now = Date.now();
    return cardsAll().filter((c) => ST.done[c.s.id] && (!ST.cards[c.id] || ST.cards[c.id].due <= now));
  }

  function home() {
    crumb.textContent = 'Tổng quan';
    const total = SEC.length, done = SEC.filter((s) => ST.done[s.id]).length;
    let qAll = 0, qRight = 0;
    SEC.forEach((s) => s.quiz.forEach((q, j) => { const a = ST.quiz[s.id] && ST.quiz[s.id][j]; if (a !== undefined) { qAll++; if (a === q.ans) qRight++; } }));
    const nNotes = Object.values(ST.notes).filter((x) => x && x.trim()).length;
    const due = dueCards().length;
    const nextS = (ST.last && BY[ST.last] && !ST.done[ST.last]) ? BY[ST.last] : SEC.find((s) => !ST.done[s.id]) || SEC[0];

    view.innerHTML = '';
    view.appendChild(el('h1', { text: 'Sổ Giải Tích' }));
    view.appendChild(el('p', { class: 'lead', text: 'Từ hàm số, đạo hàm, tích phân đến giải tích vectơ, rồi xây lại tất cả một cách chặt chẽ từ tiên đề Peano tới tích phân Lebesgue: ' + numeric.filter((c) => c.num !== '0').length + ' chương, ' + SEC.length + ' mục. Mỗi mục có ý tưởng, minh hoạ để tự kéo thả, định nghĩa, câu tự kiểm tra và chỗ ghi chú riêng.' }));
    const cont = el('div', { class: 'continue' });
    cont.appendChild(el('a', { class: 'btn primary', href: '#/s/' + nextS.id, html: (done ? 'Học tiếp ' : 'Bắt đầu ') + esc(nextS.num + ' ' + nextS.title) + ' ' + icon.arrow }));
    if (due) cont.appendChild(el('a', { class: 'btn', href: '#/review', text: 'Ôn ' + due + ' thẻ' }));
    cont.appendChild(el('a', { class: 'btn', href: '#/exam', text: ST.exam && !ST.exam.submitted ? 'Làm tiếp đề thi' : 'Làm đề thi' }));
    view.appendChild(cont);
    renderMath(cont);

    const stats = el('div', { class: 'stats' });
    [[done + '/' + total, 'mục đã học'], [qAll ? qRight + '/' + qAll : '0', 'câu trả lời đúng'], [String(nNotes), 'mục có ghi chú'], [String(due), 'thẻ đến hạn ôn']]
      .forEach(([b, t]) => stats.appendChild(el('div', null, [el('b', { text: b }), el('span', { text: t })])));
    view.appendChild(stats);

    PARTS.forEach((P) => {
      const wrap = el('section', { class: 'bookrow' });
      wrap.appendChild(el('h2', { text: P.title }));
      wrap.appendChild(el('div', { class: 'meta', text: P.note + ' · mỗi ô là một mục, ô đỏ là mục đã học' }));
      const units = el('div', { class: 'units' });
      CH.filter(P.test).forEach((c) => {
        const d = c.sections.filter((s) => ST.done[s.id]).length;
        const sq = el('div', { class: 'sq' });
        c.sections.forEach((s) => sq.appendChild(el('a', { href: '#/s/' + s.id, class: ST.done[s.id] ? 'on' : '', title: s.num + ' ' + s.title, 'aria-label': s.num + ' ' + s.title, style: '--i:' + s.i })));
        units.appendChild(el('div', { class: 'unitrow' }, [
          el('a', { href: '#/s/' + c.sections[0].id, text: c.num + '. ' + c.title, title: c.title }),
          sq,
          el('span', { class: 'pct', text: d + '/' + c.sections.length }),
        ]));
      });
      wrap.appendChild(units);
      view.appendChild(wrap);
    });
    renderMath(view);
  }

  /* ---------- trang một mục ---------- */
  function sectionView(id) {
    const s = BY[id];
    if (!s) return home();
    ST.last = id; save();
    const c = s.ch;
    crumb.textContent = chLabel(c) + ' · ' + s.num;
    view.innerHTML = '';

    const head = el('div', { class: 'sechead' });
    const left = el('div');
    left.appendChild(el('div', { class: 'meta' }, [
      el('a', { href: '#/s/' + c.sections[0].id, text: chLabel(c) + ': ' + c.title }),
      el('span', { class: 'pg', text: pageLabel(s) }),
    ]));
    left.appendChild(el('h1', { html: esc(s.num) + '&ensp;' + esc(s.title) }));
    head.appendChild(left);
    const doneBtn = el('button', { class: 'btn' + (ST.done[id] ? ' on' : '') });
    const paintDone = () => { doneBtn.className = 'btn' + (ST.done[id] ? ' on' : ''); doneBtn.innerHTML = ST.done[id] ? icon.check + ' Đã học' : 'Đánh dấu đã học'; };
    doneBtn.onclick = () => { if (ST.done[id]) delete ST.done[id]; else ST.done[id] = Date.now(); save(); paintDone(); buildToc($('#q').value.trim()); };
    paintDone();
    head.appendChild(doneBtn);
    view.appendChild(head);

    if (s.pre.length) {
      const chips = el('div', { class: 'chips' });
      s.pre.filter((p) => BY[p]).forEach((p) => chips.appendChild(el('a', { class: 'chip' + (ST.done[p] ? ' done' : ''), href: '#/s/' + p, text: p + ' ' + BY[p].title })));
      view.appendChild(el('div', { class: 'meta', style: 'margin-top:4px' }, [el('span', { text: 'Học trước:' }), chips]));
    }
    const link = (ids, label) => {
      if (!ids.length) return;
      const chips = el('div', { class: 'chips' });
      ids.forEach((p) => chips.appendChild(el('a', { class: 'chip alt' + (ST.done[p] ? ' done' : ''), href: '#/s/' + p, text: p + ' ' + BY[p].title })));
      view.appendChild(el('div', { class: 'meta', style: 'margin-top:6px' }, [el('span', { text: label }), chips]));
    };
    link(s.see, 'Bản chặt chẽ:');
    link(s.seeBy, 'Bản tính toán:');

    const idea = el('div', { class: 'idea' });
    let ul = null;
    s.idea.forEach((b) => {
      if (b.t === 'li') { if (!ul) { ul = el('ul'); idea.appendChild(ul); } ul.appendChild(el('li', { html: b.h })); }
      else { ul = null; idea.appendChild(el('p', { html: b.h })); }
    });
    view.appendChild(el('h2', { text: 'Ý tưởng' }));
    view.appendChild(idea);

    const fig = window.FIGS && window.FIGS[s.oid];
    if (fig) {
      view.appendChild(el('h2', { text: 'Hình minh hoạ' }));
      const box = el('figure', { class: 'fig' });
      box.innerHTML = '<svg viewBox="0 0 640 ' + fig.h + '" role="img" aria-label="Hình minh hoạ động cho mục ' + esc(s.num) + '">' + fig.body() + '</svg>';
      const cap = el('figcaption', { html: inline(fig.cap) });
      const svg = box.querySelector('svg');
      const pb = el('button', { class: 'btn small figbtn', type: 'button' });
      let paused = false;
      const paintPb = () => { pb.innerHTML = paused ? '<svg viewBox="0 0 20 20"><path d="M6 4l10 6-10 6z"/></svg> Chạy tiếp' : '<svg viewBox="0 0 20 20"><path d="M6 5h3v10H6zM11 5h3v10h-3z"/></svg> Tạm dừng'; };
      pb.onclick = () => { paused = !paused; paused ? svg.pauseAnimations() : svg.unpauseAnimations(); paintPb(); };
      const rp = el('button', { class: 'btn small figbtn', type: 'button', html: '<svg viewBox="0 0 20 20"><path d="M4 10a6 6 0 1 0 2-4.5M4 3v3.5h3.5"/></svg> Xem lại từ đầu' });
      rp.onclick = () => { svg.setCurrentTime(0); if (paused) { paused = false; svg.unpauseAnimations(); paintPb(); } };
      if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) { paused = true; requestAnimationFrame(() => { svg.setCurrentTime(5.5); svg.pauseAnimations(); }); }
      paintPb();
      box.appendChild(cap);
      box.appendChild(el('div', { class: 'figctrl' }, [pb, rp]));
      view.appendChild(box);
    }

    if (s.widgets.length) {
      view.appendChild(el('h2', { text: 'Thử tay' }));
      const wbox = el('div');
      view.appendChild(wbox);
      s.widgets.forEach((w) => { try { window.mountWidget(wbox, w.name, w.opts); } catch (e) { console.error(w.name, e); } });
    }

    if (s.keys.length) {
      view.appendChild(el('h2', { text: 'Định nghĩa và định lý' }));
      const box = el('div');
      s.keys.forEach(([k, v]) => box.appendChild(el('div', { class: 'stmt' }, [el('div', { class: 'k', text: k }), el('div', { class: 'v', html: v })])));
      view.appendChild(box);
    }
    if (s.ex.length) {
      view.appendChild(el('h2', { text: 'Ví dụ' }));
      s.ex.forEach((x) => view.appendChild(el('div', { class: 'example' }, [el('p', { html: x })])));
    }

    if (s.work.length) {
      view.appendChild(el('h2', { text: 'Bài tập có lời giải' }));
      view.appendChild(el('p', { class: 'meta', text: 'Tự làm ra giấy trước, rồi mới mở lời giải để so.' }));
      s.work.forEach((w, j) => {
        const box = el('div', { class: 'work' });
        box.appendChild(el('div', { class: 'wq' }, [el('span', { class: 'wn', text: 'Bài ' + (j + 1) }), el('div', { html: w.q })]));
        const sol = el('div', { class: 'wa' });
        w.a.forEach((p) => sol.appendChild(el('p', { html: p })));
        sol.hidden = true;
        const b = el('button', { class: 'btn small', text: 'Xem lời giải' });
        b.onclick = () => { sol.hidden = !sol.hidden; b.textContent = sol.hidden ? 'Xem lời giải' : 'Ẩn lời giải'; if (!sol.hidden) sol.classList.add('reveal'); };
        box.appendChild(b); box.appendChild(sol);
        view.appendChild(box);
      });
    }

    if (s.quiz.length) {
      const score = el('span', { class: 'qscore' });
      const paintScore = () => {
        const a = ST.quiz[id] || {}, done = Object.keys(a).length, right = s.quiz.filter((q, j) => a[j] === q.ans).length;
        score.textContent = done ? 'Đúng ' + right + '/' + done + ' · còn ' + (s.quiz.length - done) + ' câu' : s.quiz.length + ' câu';
        score.className = 'qscore' + (done === s.quiz.length ? (right === done ? ' good' : ' part') : '');
      };
      view.appendChild(el('h2', { class: 'qhead' }, [el('span', { text: 'Tự kiểm tra' }), score]));
      paintScore();
      s.quiz.forEach((q, j) => {
        const box = el('div', { class: 'quiz' });
        box.appendChild(el('div', { class: 'qq', html: '<span class="qn">' + (j + 1) + '.</span> ' + q.q }));
        box.addEventListener('click', () => setTimeout(paintScore, 0));
        const opts = el('div', { class: 'opts' });
        const why = el('div', { class: 'why' });
        const paint = () => {
          const a = ST.quiz[id] && ST.quiz[id][j];
          [...opts.children].forEach((b, k) => {
            b.className = a === undefined ? '' : k === q.ans ? 'right' : k === a ? 'wrong' : '';
            b.disabled = a !== undefined;
          });
          why.innerHTML = a === undefined ? '' : (a === q.ans ? '<b>Đúng.</b> ' : '<b>Chưa đúng.</b> ') + q.why;
          renderMath(why);
        };
        q.opts.forEach((o, k) => {
          const b = el('button', { html: o });
          b.onclick = () => { ST.quiz[id] = ST.quiz[id] || {}; ST.quiz[id][j] = k; save(); paint(); b.classList.add('just'); opts.children[q.ans].classList.add('just'); why.classList.add('just'); };
          opts.appendChild(b);
        });
        box.appendChild(opts); box.appendChild(why);
        paint();
        view.appendChild(box);
      });
      const reset = el('button', { class: 'btn small', text: 'Làm lại các câu hỏi' });
      reset.onclick = () => { delete ST.quiz[id]; save(); sectionView(id); };
      view.appendChild(reset);
    }

    view.appendChild(el('h2', { text: 'Ghi chú của tôi' }));
    const notes = el('div', { class: 'notes' });
    const ta = el('textarea', { placeholder: 'Viết lại bằng lời của bạn, chép chứng minh, ghi chỗ còn thắc mắc… Gõ công thức giữa hai dấu $, ví dụ $\\varepsilon > 0$.' });
    ta.value = ST.notes[id] || '';
    const pv = el('div', { class: 'preview' });
    const paintPv = () => { pv.style.display = ta.value.trim() ? '' : 'none'; pv.innerHTML = inline(ta.value); renderMath(pv); };
    let nt;
    ta.addEventListener('input', () => { ST.notes[id] = ta.value; save(); clearTimeout(nt); nt = setTimeout(paintPv, 300); });
    notes.appendChild(ta);
    notes.appendChild(el('div', { class: 'hint', text: 'Tự lưu trên trình duyệt này. Sao lưu ở trang Ghi chú.' }));
    notes.appendChild(pv);
    paintPv();
    view.appendChild(notes);

    if (s.next.length) {
      view.appendChild(el('h3', { text: 'Mục này mở đường cho' }));
      const chips = el('div', { class: 'chips' });
      s.next.forEach((p) => chips.appendChild(el('a', { class: 'chip' + (ST.done[p] ? ' done' : ''), href: '#/s/' + p, text: p + ' ' + BY[p].title })));
      view.appendChild(chips);
    }

    const pager = el('div', { class: 'pager' });
    const pv2 = SEC[s.i - 1], nx = SEC[s.i + 1];
    if (pv2) pager.appendChild(el('a', { href: '#/s/' + pv2.id }, [el('small', { text: '← Mục trước' }), pv2.num + ' ' + pv2.title]));
    if (nx) pager.appendChild(el('a', { href: '#/s/' + nx.id }, [el('small', { text: 'Mục sau →' }), nx.num + ' ' + nx.title]));
    view.appendChild(pager);
    renderMath(view);
  }

  /* ---------- ôn thẻ ---------- */
  const BOX_DAYS = [0, 1, 3, 7, 16, 35];
  function review() {
    crumb.textContent = 'Ôn thẻ';
    view.innerHTML = '';
    view.appendChild(el('h1', { text: 'Ôn thẻ' }));
    view.appendChild(el('p', { text: 'Mỗi định nghĩa và định lý của các mục bạn đã đánh dấu “Đã học” là một thẻ. Nhớ thì thẻ giãn lịch ôn (1, 3, 7, 16, 35 ngày), quên thì quay lại từ đầu.' }));
    const q = dueCards();
    if (!q.length) {
      const learned = SEC.filter((s) => ST.done[s.id]).length;
      view.appendChild(el('div', { class: 'empty', html: learned ? 'Hôm nay đã ôn hết. Quay lại vào ngày mai.' : 'Chưa có thẻ nào. Hãy học một mục rồi bấm <b>Đánh dấu đã học</b>.' }));
      return;
    }
    q.sort(() => Math.random() - 0.5);
    let i = 0;
    const host = el('div');
    view.appendChild(host);
    const show = () => {
      host.innerHTML = '';
      if (i >= q.length) { host.appendChild(el('div', { class: 'empty', text: 'Xong ' + q.length + ' thẻ cho hôm nay.' })); return; }
      const c = q[i];
      host.appendChild(el('div', { class: 'meta', text: 'Thẻ ' + (i + 1) + '/' + q.length }));
      const card = el('div', { class: 'card' });
      card.appendChild(el('div', { class: 'from', html: '<a href="#/s/' + c.s.id + '">' + esc(c.s.num + ' ' + c.s.title) + '</a>' }));
      card.appendChild(el('div', { class: 'front', text: c.k[0] }));
      card.appendChild(el('div', { class: 'meta', text: 'Tự phát biểu lại trong đầu, rồi lật thẻ.' }));
      const back = el('div', { class: 'back', html: c.k[1] });
      back.style.display = 'none';
      card.appendChild(back);
      const btns = el('div', { class: 'cardbtns' });
      const flip = el('button', { class: 'btn primary', text: 'Lật thẻ' });
      const mark = (ok) => {
        const prev = ST.cards[c.id] || { box: 0 };
        const box = ok ? Math.min(prev.box + 1, BOX_DAYS.length - 1) : 0;
        ST.cards[c.id] = { box, due: Date.now() + (ok ? BOX_DAYS[box] : 0) * 864e5 + (ok ? 0 : 6e5) };
        save(); i++; show();
      };
      flip.onclick = () => {
        back.style.display = ''; back.classList.add('reveal'); card.classList.add('flipped'); flip.remove();
        btns.appendChild(el('button', { class: 'btn', text: 'Chưa nhớ', onclick: () => mark(false) }));
        btns.appendChild(el('button', { class: 'btn primary', text: 'Nhớ rồi', onclick: () => mark(true) }));
      };
      btns.appendChild(flip);
      card.appendChild(btns);
      host.appendChild(card);
      renderMath(host);
    };
    show();
  }

  /* ---------- bản đồ chương ---------- */
  function mapView() {
    crumb.textContent = 'Bản đồ';
    view.innerHTML = '';
    view.appendChild(el('h1', { text: 'Bản đồ kiến thức' }));
    view.appendChild(el('p', { text: 'Mỗi nút là một chương, mũi tên nghĩa là chương sau dùng kiến thức của chương trước. Phần tô đỏ trong nút là tỉ lệ mục đã học. Bấm vào nút để mở chương.' }));
    const nodes = CH.map((c) => ({ c, deps: new Set() }));
    const byNum = {}; nodes.forEach((n) => (byNum[n.c.num] = n));
    CH.forEach((c) => c.sections.forEach((s) => s.pre.forEach((p) => {
      const t = BY[p]; if (t && t.ch !== c) byNum[c.num].deps.add(t.ch.num);
    })));
    const level = {};
    const lv = (n) => { if (level[n.c.num] !== undefined) return level[n.c.num]; level[n.c.num] = 0; let m = 0; n.deps.forEach((d) => (m = Math.max(m, lv(byNum[d]) + 1))); return (level[n.c.num] = m); };
    nodes.forEach(lv);
    const cols = {};
    nodes.forEach((n) => (cols[level[n.c.num]] = cols[level[n.c.num]] || []).push(n));
    const NW = 168, NH = 52, GX = 64, GY = 18;
    const ncol = Math.max(...Object.keys(cols).map(Number)) + 1;
    const maxRows = Math.max(...Object.values(cols).map((a) => a.length));
    const Wd = ncol * (NW + GX) + 20, Hd = maxRows * (NH + GY) + 20;
    Object.entries(cols).forEach(([k, arr]) => arr.forEach((n, r) => { n.x = 10 + k * (NW + GX); n.y = 10 + r * (NH + GY) + (maxRows - arr.length) * (NH + GY) / 2; }));
    let svg = '<svg width="' + Wd + '" height="' + Hd + '" viewBox="0 0 ' + Wd + ' ' + Hd + '" role="img" aria-label="Sơ đồ phụ thuộc giữa các chương">';
    svg += '<defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--faint)"/></marker></defs>';
    nodes.forEach((n) => n.deps.forEach((d) => {
      const a = byNum[d];
      const x1 = a.x + NW, y1 = a.y + NH / 2, x2 = n.x - 2, y2 = n.y + NH / 2, mx = (x1 + x2) / 2;
      svg += '<path class="medge" style="--d:' + (level[n.c.num] * 0.18 + 0.1).toFixed(2) + 's" pathLength="1" d="M' + x1 + ' ' + y1 + 'C' + mx + ' ' + y1 + ' ' + mx + ' ' + y2 + ' ' + x2 + ' ' + y2 + '" fill="none" stroke="var(--rule-strong)" stroke-width="1.3" marker-end="url(#ah)"/>';
    }));
    nodes.forEach((n) => {
      const c = n.c, d = c.sections.filter((s) => ST.done[s.id]).length, frac = d / c.sections.length;
      const t = c.title.length > 24 ? c.title.slice(0, 23) + '…' : c.title;
      svg += '<a href="#/s/' + c.sections[0].id + '"><g class="mnode" style="--d:' + (level[c.num] * 0.18).toFixed(2) + 's">';
      svg += '<rect x="' + n.x + '" y="' + n.y + '" width="' + NW + '" height="' + NH + '" rx="8" fill="var(--surface)" stroke="var(--rule-strong)"/>';
      svg += '<rect x="' + (n.x + 1) + '" y="' + (n.y + NH - 5) + '" width="' + Math.max(0, (NW - 2) * frac) + '" height="4" rx="2" fill="var(--accent)"/>';
      svg += '<text x="' + (n.x + 10) + '" y="' + (n.y + 19) + '" font-size="11" fill="var(--muted)">' + esc(chLabel(c)) + ' · ' + d + '/' + c.sections.length + '</text>';
      svg += '<text x="' + (n.x + 10) + '" y="' + (n.y + 37) + '" font-size="12.5" font-weight="600" fill="var(--ink)">' + esc(t) + '<title>' + esc(c.title) + '</title></text>';
      svg += '</g></a>';
    });
    svg += '</svg>';
    view.appendChild(el('div', { class: 'mapwrap', html: svg }));
  }

  /* ---------- ghi chú ---------- */
  function notesView() {
    crumb.textContent = 'Ghi chú';
    view.innerHTML = '';
    view.appendChild(el('h1', { text: 'Ghi chú và sao lưu' }));
    view.appendChild(el('p', { text: 'Tiến độ và ghi chú lưu trong trình duyệt này. Tải file sao lưu định kỳ, hoặc để chuyển sang máy khác.' }));
    const row = el('div', { class: 'continue' });
    row.appendChild(el('button', {
      class: 'btn', text: 'Tải file sao lưu', onclick: () => {
        const blob = new Blob([JSON.stringify(ST, null, 1)], { type: 'application/json' });
        const a = el('a', { href: URL.createObjectURL(blob), download: 'so-giai-tich-' + new Date().toISOString().slice(0, 10) + '.json' });
        document.body.appendChild(a); a.click(); a.remove();
      },
    }));
    const file = el('input', { type: 'file', accept: '.json,application/json', style: 'display:none' });
    file.onchange = () => {
      const f = file.files[0]; if (!f) return;
      f.text().then((t) => {
        try { const d = JSON.parse(t); if (!d || typeof d !== 'object' || !d.done) throw 0; ST = migrate(Object.assign({ done: {}, notes: {}, quiz: {}, cards: {}, last: null }, d)); save(); buildToc(); notesView(); }
        catch (e) { alert('File này không phải bản sao lưu của Sổ Giải Tích.'); }
      });
    };
    row.appendChild(el('button', { class: 'btn', text: 'Khôi phục từ file', onclick: () => file.click() }));
    row.appendChild(file);
    view.appendChild(row);
    const list = el('div', { class: 'notelist' });
    const ids = SEC.filter((s) => ST.notes[s.id] && ST.notes[s.id].trim());
    if (!ids.length) list.appendChild(el('div', { class: 'empty', style: 'margin-top:20px', text: 'Chưa có ghi chú nào. Mỗi mục học đều có ô “Ghi chú của tôi” ở cuối trang.' }));
    ids.forEach((s) => list.appendChild(el('div', { class: 'item' }, [el('a', { href: '#/s/' + s.id, text: s.num + ' ' + s.title }), el('div', { html: inline(ST.notes[s.id]) })])));
    view.appendChild(el('h2', { text: ids.length + ' mục có ghi chú' }));
    view.appendChild(list);
    renderMath(view);
  }

  /* ---------- đề thi: tạo ngẫu nhiên từ ngân hàng câu hỏi, làm có giờ, chấm tự động ----------
     Hoàn toàn tĩnh: đề được bốc từ các câu "Tự kiểm tra" của mọi mục bằng bộ sinh số ngẫu nhiên
     có hạt giống (mã đề), nên cùng mã đề và cùng phạm vi luôn ra đúng một đề. */
  const LET = 'ABCDEFGH';
  let examTimer = null;
  const rng = (seed) => { let a = seed >>> 0; return () => { a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };
  const shuffle = (arr, r) => { for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; } return arr; };
  const fmtTime = (s) => { s = Math.max(0, Math.round(s)); const m = Math.floor(s / 60); return m + ':' + String(s % 60).padStart(2, '0'); };
  /* câu sinh tự động (js/gen.js) lưu nguyên nội dung trong it.g; câu ngân hàng tra theo mục */
  const qOf = (it) => it.g || (BY[it.sid] && BY[it.sid].quiz[it.qi]);
  const GENS = () => (window.QGEN || []).filter((g) => BY[g.sid]);
  const newSeed = () => 1 + Math.floor(Math.random() * 999999);
  function poolSize(chs, onlyDone) { let n = 0; CH.filter((c) => chs.includes(c.num)).forEach((c) => c.sections.forEach((s) => { if (!onlyDone || ST.done[s.id]) n += s.quiz.length; })); return n; }
  const genCount = (chs) => GENS().filter((g) => chs.includes(g.ch)).length;
  function recentKeys() { const s = new Set(); (ST.exams || []).slice(0, 6).forEach((e) => e.items.forEach((it) => { if (!it.g) s.add(it.sid + '#' + it.qi); })); return s; }
  function buildExam(cfg) {
    const r = rng(cfg.seed);
    const src = cfg.source || 'mix';
    const gens = shuffle(GENS().filter((g) => cfg.chapters.includes(g.ch)), r);
    let nGen = !gens.length ? 0 : src === 'gen' ? cfg.n : src === 'bank' ? 0 : Math.round(cfg.n * 0.5);
    const recent = cfg.avoidRecent === false ? new Set() : recentKeys();
    const pools = CH.filter((c) => cfg.chapters.includes(c.num)).map((c) => {
      const items = [];
      c.sections.forEach((s) => { if (cfg.onlyDone && !ST.done[s.id]) return; s.quiz.forEach((q, j) => { if (q.ans >= 0) items.push({ sid: s.id, qi: j }); }); });
      shuffle(items, r);
      /* câu đã gặp ở các đề gần đây xếp lên đầu, câu mới ở cuối để được bốc trước */
      return items.sort((a, b) => (recent.has(b.sid + '#' + b.qi) ? 1 : 0) - (recent.has(a.sid + '#' + a.qi) ? 1 : 0));
    }).filter((p) => p.length);
    const out = []; let k = 0;
    const nBank = src === 'gen' && gens.length ? 0 : cfg.n - nGen;
    shuffle(pools, r);
    while (out.length < nBank && pools.some((p) => p.length)) { const p = pools[k % pools.length]; if (p.length) out.push(p.pop()); k++; }
    if (gens.length) nGen = cfg.n - out.length;
    for (let i = 0; i < nGen; i++) { const g = gens[i % gens.length]; out.push({ sid: g.sid, qi: -1, g: window.QGEN_build(g, r) }); }
    out.sort((a, b) => BY[a.sid].i - BY[b.sid].i || a.qi - b.qi);
    out.forEach((it) => { const q = qOf(it); it.perm = q.opts.map((_, i) => i); if (cfg.shuffleOpts || it.g) shuffle(it.perm, r); });
    return out;
  }
  const defaultCfg = () => ({ chapters: CH.filter((c) => /^\d+$/.test(c.num) && +c.num >= 1 && +c.num <= 11).map((c) => c.num), n: 20, minutes: 30, onlyDone: false, shuffleOpts: true, source: 'mix', avoidRecent: true, seed: 0 });
  const chs = (a, b) => CH.filter((c) => /^\d+$/.test(c.num) && +c.num >= a && +c.num <= b).map((c) => c.num);
  /* đề mẫu: mỗi lần bấm là một mã đề mới, nên ra một đề khác */
  const PRESETS = [
    { t: 'Kiểm tra 15 phút', d: 'Giới hạn và liên tục', ch: ['2'], n: 10, m: 15 },
    { t: 'Kiểm tra 15 phút', d: 'Quy tắc đạo hàm', ch: ['3'], n: 10, m: 15 },
    { t: 'Kiểm tra 15 phút', d: 'Ứng dụng đạo hàm', ch: ['4'], n: 10, m: 15 },
    { t: 'Kiểm tra 15 phút', d: 'Tích phân và kỹ thuật', ch: ['5', '7'], n: 10, m: 15 },
    { t: 'Kiểm tra 45 phút', d: 'Ứng dụng tích phân, PTVP', ch: ['6', '8', '9'], n: 20, m: 45 },
    { t: 'Kiểm tra 45 phút', d: 'Dãy và chuỗi', ch: ['11', '23', '24'], n: 20, m: 45 },
    { t: 'Giữa kỳ Giải tích 1', d: 'Chương 1–4', ch: chs(1, 4), n: 25, m: 60 },
    { t: 'Cuối kỳ Giải tích 1', d: 'Chương 1–11', ch: chs(1, 11), n: 40, m: 90 },
    { t: 'Giữa kỳ Giải tích 2', d: 'Chương 12–14', ch: chs(12, 14), n: 25, m: 60 },
    { t: 'Cuối kỳ Giải tích 2', d: 'Chương 12–17', ch: chs(12, 17), n: 40, m: 90 },
    { t: 'Giải tích thực 1', d: 'Chương 18–24: logic, số, giới hạn', ch: chs(18, 24), n: 30, m: 60 },
    { t: 'Giải tích thực 2', d: 'Chương 25–28: liên tục, đạo hàm, tích phân', ch: chs(25, 28), n: 30, m: 60 },
    { t: 'Giải tích nâng cao', d: 'Chương 29–36', ch: chs(29, 36), n: 30, m: 60 },
    { t: 'Tổng hợp toàn bộ', d: 'Cả 36 chương', ch: chs(0, 99), n: 50, m: 90 },
    { t: 'Đề bất ngờ', d: 'Chương và số câu ngẫu nhiên', ch: null, n: 0, m: 30 },
  ];
  function presetCfg(P) {
    let c = P.ch, n = P.n;
    if (!c) { const all = chs(1, 36); c = shuffle(all.slice(), rng(newSeed())).slice(0, 3 + Math.floor(Math.random() * 4)); n = 10 + 5 * Math.floor(Math.random() * 4); }
    return { title: P.t + ' · ' + (P.ch ? P.d : 'Ch.' + c.slice().sort((a, b) => a - b).join(', ')), chapters: c, n, minutes: P.m, onlyDone: false, shuffleOpts: true, source: 'mix', avoidRecent: true, seed: newSeed() };
  }

  function examView(arg, arg2) {
    clearInterval(examTimer);
    crumb.textContent = 'Đề thi';
    if (arg === 'r') return examResult(+arg2 || 0);
    if (arg === 'print') return examPrint();
    if (ST.exam && !ST.exam.submitted) return examTake();
    examSetup();
  }

  function examSetup() {
    const cfg = Object.assign(defaultCfg(), ST.examCfg || {});
    const total = SEC.reduce((a, s) => a + s.quiz.length, 0);
    view.innerHTML = '';
    view.appendChild(el('h1', { text: 'Đề thi' }));
    view.appendChild(el('p', { class: 'lead', text: 'Mỗi lần bấm là một đề mới: câu hỏi bốc ngẫu nhiên từ ngân hàng ' + total + ' câu, trộn với ' + GENS().length + ' dạng toán tự sinh số liệu mới mỗi lần. Làm bài có giờ, nộp là chấm ngay, xem lại từng câu kèm lời giải thích. Mọi thứ chạy trong trình duyệt, không cần mạng.' }));
    view.appendChild(el('h2', { text: 'Đề mẫu · bấm là ra đề mới' }));
    const pg = el('div', { class: 'presets' });
    PRESETS.forEach((P) => {
      const n = P.ch ? P.n : '10–25', m = P.m;
      pg.appendChild(el('button', { type: 'button', class: 'preset', onclick: () => startExam(presetCfg(P)) }, [
        el('b', { text: P.t }), el('span', { text: P.d }), el('small', { text: n + ' câu · ' + m + ' phút' }),
      ]));
    });
    view.appendChild(pg);
    view.appendChild(el('h2', { text: 'Tự chọn phạm vi' }));
    const box = el('div', { class: 'exam-setup' });
    const fs1 = el('fieldset', null, [el('legend', { text: 'Phạm vi' })]);
    const pb = el('div', { class: 'partbtns' });
    const list = el('div');
    const checks = {};
    const count = el('p', { class: 'meta' });
    const recount = () => { const cs = Object.keys(checks).filter((k) => checks[k].checked); count.textContent = 'Đã chọn ' + cs.length + ' chương · ' + poolSize(cs, onlyDone.checked) + ' câu trong ngân hàng · ' + genCount(cs) + ' dạng toán sinh số ngẫu nhiên.'; };
    PARTS.forEach((P) => {
      const chs = CH.filter(P.test);
      pb.appendChild(el('button', { class: 'btn small', type: 'button', text: P.title.split('·')[0].trim(), onclick: () => { const all = chs.every((c) => checks[c.num].checked); chs.forEach((c) => (checks[c.num].checked = !all)); recount(); } }));
      list.appendChild(el('div', { class: 'meta', style: 'margin-top:10px;font-weight:600', text: P.title }));
      const grid = el('div', { class: 'chlist' });
      chs.forEach((c) => {
        const i = el('input', { type: 'checkbox' }); i.checked = cfg.chapters.includes(c.num); i.onchange = recount; checks[c.num] = i;
        grid.appendChild(el('label', { class: 'ck' }, [i, el('span', { text: c.num + '. ' + c.title }), el('small', { text: c.sections.reduce((a, s) => a + s.quiz.length, 0) + ' câu' })]));
      });
      list.appendChild(grid);
    });
    pb.appendChild(el('button', { class: 'btn small', type: 'button', text: 'Bỏ chọn hết', onclick: () => { Object.values(checks).forEach((i) => (i.checked = false)); recount(); } }));
    fs1.appendChild(pb); fs1.appendChild(list); fs1.appendChild(count);
    const fs2 = el('fieldset', null, [el('legend', { text: 'Tuỳ chọn' })]);
    const nSel = el('select'); [10, 15, 20, 30, 40, 50].forEach((v) => nSel.appendChild(el('option', { value: v, text: v + ' câu' }))); nSel.value = cfg.n;
    const tSel = el('select'); [[0, 'Không giới hạn'], [10, '10 phút'], [15, '15 phút'], [30, '30 phút'], [45, '45 phút'], [60, '60 phút'], [90, '90 phút']].forEach(([v, t]) => tSel.appendChild(el('option', { value: v, text: t }))); tSel.value = cfg.minutes;
    const onlyDone = el('input', { type: 'checkbox' }); onlyDone.checked = cfg.onlyDone; onlyDone.onchange = recount;
    const shuf = el('input', { type: 'checkbox' }); shuf.checked = cfg.shuffleOpts;
    const seedIn = el('input', { type: 'number', min: 0, placeholder: 'để trống = ngẫu nhiên', style: 'width:170px;border:1px solid var(--rule-strong);border-radius:6px;padding:4px 8px;background:var(--surface)' });
    const srcSel = el('select'); [['mix', 'Trộn: ngân hàng + sinh số ngẫu nhiên'], ['bank', 'Chỉ ngân hàng câu hỏi'], ['gen', 'Chỉ câu sinh số ngẫu nhiên']].forEach(([v, t]) => srcSel.appendChild(el('option', { value: v, text: t }))); srcSel.value = cfg.source || 'mix';
    const avoid = el('input', { type: 'checkbox' }); avoid.checked = cfg.avoidRecent !== false;
    fs2.appendChild(el('div', { class: 'opts-row' }, [
      el('label', { class: 'ctrl' }, ['Số câu', nSel]), el('label', { class: 'ctrl' }, ['Thời gian', tSel]), el('label', { class: 'ctrl' }, ['Nguồn câu hỏi', srcSel]),
      el('label', { class: 'ck' }, [avoid, 'Tránh câu đã gặp ở 6 đề gần nhất']),
      el('label', { class: 'ck' }, [onlyDone, 'Chỉ các mục đã học']), el('label', { class: 'ck' }, [shuf, 'Đảo thứ tự đáp án']),
      el('label', { class: 'ctrl' }, ['Mã đề', seedIn]),
    ]));
    box.appendChild(fs1); box.appendChild(fs2);
    const msg = el('p', { class: 'meta' });
    const readCfg = () => {
      const chs = Object.keys(checks).filter((k) => checks[k].checked);
      const c = { chapters: chs, n: +nSel.value, minutes: +tSel.value, onlyDone: onlyDone.checked, shuffleOpts: shuf.checked, source: srcSel.value, avoidRecent: avoid.checked, seed: seedIn.value ? Math.abs(parseInt(seedIn.value, 10)) % 1e9 : newSeed() };
      ST.examCfg = Object.assign({}, c, { seed: 0 }); save();
      if (!chs.length) { msg.textContent = 'Chọn ít nhất một chương.'; return null; }
      if (!poolSize(chs, c.onlyDone) && !genCount(chs)) { msg.textContent = 'Phạm vi này chưa có câu hỏi nào (bỏ tuỳ chọn “Chỉ các mục đã học” nếu chưa đánh dấu mục nào).'; return null; }
      return c;
    };
    const go = el('div', { class: 'continue' }, [
      el('button', { class: 'btn primary', type: 'button', text: 'Tạo đề và bắt đầu', onclick: () => { const c = readCfg(); if (!c) return; startExam(c); } }),
      el('button', { class: 'btn', type: 'button', text: 'In đề ra giấy (kèm đáp án)', onclick: () => { const c = readCfg(); if (!c) return; ST.examPrint = c; save(); location.hash = '#/exam/print'; } }),
    ]);
    box.appendChild(go); box.appendChild(msg);
    view.appendChild(box);
    recount();

    const H = ST.exams || [];
    view.appendChild(el('h2', { text: 'Bài đã làm' }));
    if (!H.length) view.appendChild(el('div', { class: 'empty', text: 'Chưa có bài nào. Kết quả mỗi lần nộp bài sẽ lưu ở đây.' }));
    else {
      const t = el('table', { class: 'wtable hist' });
      t.innerHTML = '<tr><th>Ngày</th><th>Phạm vi</th><th>Đúng</th><th>Điểm</th><th>Thời gian</th><th></th></tr>';
      H.forEach((h, i) => t.appendChild(el('tr', { html: '<td>' + new Date(h.at).toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' }) + '</td><td>' + esc(h.cfg.title || h.cfg.chapters.length + ' chương') + '</td><td>' + h.right + '/' + h.items.length + '</td><td><b>' + h.score.toFixed(2).replace('.', ',') + '</b></td><td>' + fmtTime(h.secs) + '</td><td><a href="#/exam/r/' + i + '">Xem lại</a></td>' })));
      view.appendChild(t);
    }
  }

  function startExam(cfg, reuse) {
    const items = reuse ? reuse.map((it) => Object.assign({}, it)) : buildExam(cfg);
    ST.exam = { cfg, items, ans: {}, start: Date.now(), submitted: false };
    save();
    if (location.hash === '#/exam') examView(); else location.hash = '#/exam';
  }

  function renderQuestion(it, i, mode, chosen) {
    const q = qOf(it), s = BY[it.sid];
    const box = el('div', { class: 'exq', id: 'q-' + i });
    box.appendChild(el('div', { class: 'qhd' }, [el('span', { class: 'qno', text: 'Câu ' + (i + 1) }), it.g ? el('span', { class: 'qtag noprint', text: 'số ngẫu nhiên' }) : null, el('a', { class: 'qsrc noprint', href: '#/s/' + s.id, text: '§' + s.num + ' ' + s.title })]));
    box.appendChild(el('div', { class: 'qtx', html: q.q }));
    const opts = el('div', { class: 'opts' });
    it.perm.forEach((oi, k) => {
      const b = el('button', { type: 'button', html: '<b>' + LET[k] + '.</b><span>' + q.opts[oi] + '</span>' });
      if (mode === 'review') { b.disabled = true; if (oi === q.ans) b.classList.add('right'); else if (chosen === k) b.classList.add('wrong'); }
      else if (mode === 'take') { if (chosen === k) b.classList.add('sel'); b.dataset.k = k; }
      else b.disabled = true;
      opts.appendChild(b);
    });
    box.appendChild(opts);
    if (mode === 'review') box.appendChild(el('div', { class: 'why', html: (chosen === undefined ? '<b>Bỏ trống.</b> ' : '') + 'Đáp án: <b>' + LET[it.perm.indexOf(q.ans)] + '</b>. ' + q.why }));
    return box;
  }

  function examTake() {
    const E = ST.exam, n = E.items.length, limit = E.cfg.minutes * 60;
    view.innerHTML = '';
    const timer = el('span', { class: 'timer' }), prog = el('span', { class: 'prog' });
    const dots = el('div', { class: 'exam-dots' });
    const submitBtn = el('button', { class: 'btn primary', type: 'button', text: 'Nộp bài' });
    const quitBtn = el('button', { class: 'btn small', type: 'button', text: 'Huỷ đề' });
    view.appendChild(el('div', { class: 'exam-bar' }, [timer, prog, el('span', { class: 'spacer' }), quitBtn, submitBtn]));
    view.appendChild(el('h1', { text: (E.cfg.title || 'Đề thi') + ' · ' + n + ' câu' }));
    view.appendChild(el('p', { class: 'meta', text: 'Mã đề ' + E.cfg.seed + ' · ' + E.cfg.chapters.length + ' chương · ' + E.items.filter((x) => x.g).length + ' câu sinh số ngẫu nhiên · ' + (limit ? E.cfg.minutes + ' phút' : 'không giới hạn thời gian') + '. Bài làm tự lưu; tải lại trang vẫn tiếp tục được.' }));
    view.appendChild(dots);
    const paintDots = () => {
      dots.innerHTML = '';
      E.items.forEach((_, i) => dots.appendChild(el('a', { href: '#q-' + i, class: E.ans[i] !== undefined ? 'on' : '', text: String(i + 1), onclick: (e) => { e.preventDefault(); document.getElementById('q-' + i).scrollIntoView({ behavior: 'smooth', block: 'start' }); } })));
      prog.textContent = 'Đã làm ' + Object.keys(E.ans).length + '/' + n;
    };
    E.items.forEach((it, i) => {
      const box = renderQuestion(it, i, 'take', E.ans[i]);
      box.querySelectorAll('.opts button').forEach((b) => (b.onclick = () => {
        const k = +b.dataset.k;
        if (E.ans[i] === k) delete E.ans[i]; else E.ans[i] = k;
        box.querySelectorAll('.opts button').forEach((x) => x.classList.toggle('sel', E.ans[i] === +x.dataset.k));
        save(); paintDots();
      }));
      view.appendChild(box);
    });
    view.appendChild(el('div', { class: 'continue', style: 'margin-top:20px' }, [el('button', { class: 'btn primary', type: 'button', text: 'Nộp bài', onclick: () => submitBtn.click() })]));
    paintDots();
    renderMath(view);
    const tick = () => {
      const used = (Date.now() - E.start) / 1000;
      if (limit) { const left = limit - used; timer.textContent = '⏱ ' + fmtTime(left); timer.classList.toggle('low', left < 60); if (left <= 0) { clearInterval(examTimer); submitExam(true); } }
      else timer.textContent = '⏱ ' + fmtTime(used);
    };
    tick(); examTimer = setInterval(tick, 1000);
    submitBtn.onclick = () => {
      const blank = n - Object.keys(E.ans).length;
      if (blank && !confirm('Còn ' + blank + ' câu chưa làm. Nộp bài luôn?')) return;
      submitExam(false);
    };
    quitBtn.onclick = () => { if (confirm('Huỷ đề này? Bài đang làm sẽ không được lưu.')) { delete ST.exam; save(); examView(); } };
  }

  function submitExam(auto) {
    clearInterval(examTimer);
    const E = ST.exam; if (!E) return;
    const right = E.items.filter((it, i) => E.ans[i] !== undefined && it.perm[E.ans[i]] === qOf(it).ans).length;
    const n = E.items.length;
    const rec = { at: Date.now(), cfg: E.cfg, items: E.items, ans: E.ans, right, score: Math.round(right / n * 10 * 100) / 100, secs: Math.min((Date.now() - E.start) / 1000, E.cfg.minutes ? E.cfg.minutes * 60 : Infinity), auto };
    ST.exams = [rec].concat(ST.exams || []).slice(0, 40);
    delete ST.exam; save();
    track('exam', 'exam/submit', rec.score);
    location.hash = '#/exam/r/0';
  }

  function examResult(i) {
    const R = (ST.exams || [])[i];
    view.innerHTML = '';
    if (!R) { view.appendChild(el('div', { class: 'empty', text: 'Không tìm thấy bài này.' })); return; }
    const n = R.items.length;
    view.appendChild(el('h1', { text: 'Kết quả' }));
    view.appendChild(el('p', { class: 'meta', text: new Date(R.at).toLocaleString('vi-VN') + ' · mã đề ' + R.cfg.seed + (R.auto ? ' · tự nộp khi hết giờ' : '') }));
    view.appendChild(el('div', { class: 'score' }, [
      el('div', { class: 'big', html: R.score.toFixed(2).replace('.', ',') + '<small> / 10</small>' }),
      el('div', null, [el('b', { text: R.right + '/' + n }), el('span', { text: 'câu đúng' })]),
      el('div', null, [el('b', { text: String(n - Object.keys(R.ans).length) }), el('span', { text: 'câu bỏ trống' })]),
      el('div', null, [el('b', { text: fmtTime(R.secs) }), el('span', { text: 'thời gian làm' })]),
    ]));
    const dots = el('div', { class: 'exam-dots' });
    R.items.forEach((it, k) => { const ok = R.ans[k] !== undefined && it.perm[R.ans[k]] === qOf(it).ans; dots.appendChild(el('a', { href: '#q-' + k, class: ok ? 'right' : 'wrong', text: String(k + 1), onclick: (e) => { e.preventDefault(); document.getElementById('q-' + k).scrollIntoView({ behavior: 'smooth' }); } })); });
    view.appendChild(dots);
    const byCh = {};
    R.items.forEach((it, k) => { const c = BY[it.sid].ch.num; byCh[c] = byCh[c] || { r: 0, n: 0 }; byCh[c].n++; if (R.ans[k] !== undefined && it.perm[R.ans[k]] === qOf(it).ans) byCh[c].r++; });
    view.appendChild(el('h2', { text: 'Theo chương' }));
    const t = el('table', { class: 'wtable' });
    t.innerHTML = '<tr><th>Chương</th><th>Đúng</th><th style="width:40%"></th></tr>';
    CH.filter((c) => byCh[c.num]).forEach((c) => { const b = byCh[c.num]; t.appendChild(el('tr', { html: '<td>' + esc(c.num + '. ' + c.title) + '</td><td>' + b.r + '/' + b.n + '</td><td><div class="bar"><i style="width:' + Math.round(b.r / b.n * 100) + '%"></i></div></td>' })); });
    view.appendChild(t);
    const weak = [...new Set(R.items.filter((it, k) => !(R.ans[k] !== undefined && it.perm[R.ans[k]] === qOf(it).ans)).map((it) => it.sid))];
    if (weak.length) {
      view.appendChild(el('h3', { text: 'Nên ôn lại' }));
      const chips = el('div', { class: 'chips' });
      weak.forEach((sid) => chips.appendChild(el('a', { class: 'chip', href: '#/s/' + sid, text: sid + ' ' + BY[sid].title })));
      view.appendChild(chips);
    }
    view.appendChild(el('div', { class: 'continue noprint', style: 'margin-top:18px' }, [
      el('button', { class: 'btn primary', type: 'button', text: 'Tạo đề mới cùng phạm vi', onclick: () => startExam(Object.assign({}, R.cfg, { seed: newSeed() })) }),
      el('button', { class: 'btn', type: 'button', text: 'Làm lại đúng đề này', onclick: () => startExam(R.cfg, R.items) }),
      el('a', { class: 'btn', href: '#/exam', text: 'Tạo đề mới' }),
      el('button', { class: 'btn', type: 'button', text: 'In kết quả', onclick: () => window.print() }),
    ]));
    view.appendChild(el('h2', { text: 'Xem lại từng câu' }));
    R.items.forEach((it, k) => { if (qOf(it)) view.appendChild(renderQuestion(it, k, 'review', R.ans[k])); });
    renderMath(view);
  }

  function examPrint() {
    const cfg = ST.examPrint || defaultCfg();
    const items = buildExam(cfg);
    view.innerHTML = '';
    view.appendChild(el('div', { class: 'continue noprint' }, [el('button', { class: 'btn primary', type: 'button', text: 'In ngay', onclick: () => window.print() }), el('a', { class: 'btn', href: '#/exam', text: 'Quay lại' })]));
    view.appendChild(el('div', { class: 'examhead' }, [
      el('div', null, [
        el('h1', { text: 'Đề kiểm tra giải tích' }),
        el('p', { class: 'meta', text: 'Mã đề ' + cfg.seed + ' · ' + items.length + ' câu trắc nghiệm · ' + (cfg.minutes ? 'thời gian ' + cfg.minutes + ' phút' : 'không giới hạn thời gian') }),
      ]),
      el('div', { class: 'score-box', html: 'Điểm<div></div>' }),
      el('div', { class: 'fill', html: 'Họ và tên: ........................................................ Lớp: ..................<br>Ngày làm bài: ........ / ........ / ..............' }),
    ]));
    items.forEach((it, i) => view.appendChild(renderQuestion(it, i, 'print')));
    const key = el('div', { class: 'answerkey' });
    key.appendChild(el('h2', { text: 'Đáp án · mã đề ' + cfg.seed }));
    const t = el('table', { class: 'wtable' });
    let rowH = '';
    items.forEach((it, i) => { rowH += '<td><b>' + (i + 1) + '</b>. ' + LET[it.perm.indexOf(qOf(it).ans)] + '</td>'; if (i % 10 === 9 || i === items.length - 1) { t.appendChild(el('tr', { html: rowH })); rowH = ''; } });
    key.appendChild(t);
    view.appendChild(key);
    renderMath(view);
  }

  /* ---------- đếm lượt truy cập (Supabase, chỉ ghi; lỗi thì bỏ qua) ---------- */
  let firstHit = true;
  function track(kind, path, score) {
    try {
      const C = window.SGT_CONFIG;
      if (!C || !C.url || !C.anon || !window.fetch) return;
      if (/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname) || location.protocol === 'file:') return;
      let vid = localStorage.getItem('sgt-vid');
      if (!vid) { vid = Math.random().toString(36).slice(2, 12) + Date.now().toString(36); localStorage.setItem('sgt-vid', vid); }
      const w = Math.min(screen.width || innerWidth, innerWidth);
      let ref = null;
      if (firstHit) { ref = ''; try { const r = document.referrer && new URL(document.referrer).hostname; if (r && r !== location.hostname) ref = r.replace(/^www\./, '').slice(0, 120); } catch (e) {} }
      firstHit = false;
      const body = { vid, path: String(path).slice(0, 120), kind, device: w < 768 ? 'mobile' : w <= 1180 ? 'tablet' : 'desktop', ref, host: location.hostname.slice(0, 80) };
      if (score != null) body.score = score;
      fetch(C.url + '/rest/v1/giaitich_events', { method: 'POST', keepalive: true, headers: { apikey: C.anon, 'Content-Type': 'application/json', Prefer: 'return=minimal' }, body: JSON.stringify(body) }).catch(() => {});
    } catch (e) {}
  }

  /* ---------- định tuyến ---------- */
  function route() {
    (window.LIVE_WIDGETS || []).length = 0;
    clearInterval(examTimer);
    const h = location.hash.replace(/^#\/?/, '');
    if (/^q-\d+$/.test(h)) return;
    const [kind, arg, arg2] = h.split('/');
    curId = kind === 's' ? decodeURIComponent(arg || '') : null;
    document.querySelectorAll('.sidefoot a, .bottomnav a').forEach((a) => a.classList.toggle('cur', a.dataset.nav === (kind || 'home')));
    if (kind === 's') sectionView(curId);
    else if (kind === 'review') review();
    else if (kind === 'map') mapView();
    else if (kind === 'notes') notesView();
    else if (kind === 'exam') examView(arg, arg2);
    else if (kind === 'admin' && window.SGT_ADMIN) { window.SGT_ADMIN(view); closeDrawer(); window.scrollTo(0, 0); document.title = 'Quản trị · Sổ Giải Tích'; return; }
    else home();
    track('view', kind === 's' ? 's/' + curId : kind === 'exam' ? 'exam' + (arg ? '/' + arg : '') : (kind || 'home'));
    buildToc($('#q').value.trim());
    const cur = toc.querySelector('a.cur');
    if (cur) cur.scrollIntoView({ block: 'nearest' });
    closeDrawer();
    window.scrollTo(0, 0);
    document.title = (curId && BY[curId] ? BY[curId].num + ' ' + BY[curId].title + ' · ' : '') + 'Sổ Giải Tích';
  }
  window.addEventListener('hashchange', route);
  window.SGT = { CH, SEC, BY, OID };
  const sm = document.querySelector('.brand small'); if (sm) sm.textContent = 'Mở đầu + ' + numeric.filter((c) => c.num !== '0').length + ' chương · ' + SEC.length + ' mục';
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => (window.LIVE_WIDGETS || []).forEach((w) => w.draw()));
  route();
})();
