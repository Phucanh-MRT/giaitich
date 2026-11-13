/* Trang #/about — giới thiệu Sổ Giải Tích, tác giả, liên hệ, ủng hộ.
   Đổi link/ảnh ở khối AUTHOR bên dưới là đủ. */
(function () {
  const AUTHOR = {
    name: 'Phúc Anh MRT',
    role: 'AI Creator · Educator · Builder',
    bio: '10 năm làm Social Marketing. Mình ứng dụng AI để giúp bạn và doanh nghiệp làm việc nhanh gấp 10, gấp 100 lần.',
    photo: 'img/tac-gia.webp',
    qr: 'img/momo-qr.jpg',
    payee: 'PHAM PHUC ANH',
    phone: '086.7777.543',
    links: [
      { k: 'yt', label: 'YouTube', sub: '@PhucAnhMRT', href: 'https://www.youtube.com/@PhucAnhMRT' },
      { k: 'tt', label: 'TikTok', sub: '@phuc.anh.mrt', href: 'https://www.tiktok.com/@phuc.anh.mrt' },
      { k: 'fb', label: 'Facebook', sub: 'phucanh.mrt', href: 'https://www.facebook.com/phucanh.mrt/' },
      { k: 'ms', label: 'Messenger', sub: 'Nhắn tin trực tiếp', href: 'https://m.me/phucanh.mrt' },
      { k: 'zl', label: 'Nhóm Zalo', sub: 'Cộng đồng trao đổi', href: 'https://zalo.me/g/wtbjis232' },
      { k: 'ph', label: 'Hotline', sub: '086.7777.543', href: 'tel:0867777543' },
    ],
  };

  const ICON = {
    yt: '<path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8z"/><path d="M10 15l5-3-5-3z" class="fill"/>',
    tt: '<path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 3c.5 2.6 2.2 4.2 5 4.5"/>',
    fb: '<path d="M14 8h2.5V4.5H14A3.5 3.5 0 0 0 10.5 8v2.5H8V14h2.5v7H14v-7h2.5l.5-3.5h-3V8.6c0-.4.2-.6.6-.6z"/>',
    ms: '<path d="M12 3C7 3 3 6.7 3 11.4c0 2.6 1.3 5 3.3 6.5V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.3S17 3 12 3z"/><path d="M7.5 13.5l3-3.2 2 2 3.5-2.8-3 3.2-2-2z" class="fill"/>',
    zl: '<rect x="3" y="4" width="18" height="14" rx="4"/><path d="M8 9h4l-4 5h4M15 9v5M17.5 11.5a1.5 1.5 0 1 0 0 .01"/>',
    ph: '<path d="M5 4h3.5l1.5 4-2 1.5a11 11 0 0 0 6.5 6.5L16 14l4 1.5V19a1.5 1.5 0 0 1-1.5 1.5A15.5 15.5 0 0 1 3.5 5.5 1.5 1.5 0 0 1 5 4z"/>',
    heart: '<path d="M12 20s-7-4.4-9-8.7C1.6 8.2 3.5 4.5 7 4.5c2 0 3.3 1 4.1 2.3h1.8c.8-1.3 2.1-2.3 4.1-2.3 3.5 0 5.4 3.7 4 6.8C19 15.6 12 20 12 20z"/>',
  };
  const svg = (k) => '<svg viewBox="0 0 24 24" aria-hidden="true">' + ICON[k] + '</svg>';
  const ext = (h) => /^https?:/.test(h) ? ' target="_blank" rel="noopener"' : '';

  /* ---------- hộp thoại ủng hộ (mở từ thanh bên, trang chủ, trang giới thiệu) ---------- */
  let dlg;
  function donate() {
    if (!dlg) {
      dlg = document.createElement('div');
      dlg.className = 'donate-back';
      dlg.hidden = true;
      dlg.innerHTML =
        '<div class="donate-box" role="dialog" aria-modal="true" aria-labelledby="donate-t">' +
        '<button type="button" class="donate-x" aria-label="Đóng">×</button>' +
        '<h2 id="donate-t">Mời mình ly cà phê ☕</h2>' +
        '<p>Sổ Giải Tích miễn phí cho tất cả mọi người. Nếu thấy có ích, bạn ủng hộ một chút để mình duy trì web và viết thêm bài mới nhé!</p>' +
        '<img src="' + AUTHOR.qr + '" width="640" height="700" alt="Mã QR MoMo / VietQR của ' + AUTHOR.payee + '" loading="lazy">' +
        '<p class="small">Quét bằng <b>MoMo</b> hoặc <b>app ngân hàng bất kỳ</b> (VietQR · Napas 247)<br>Người nhận: <b>' + AUTHOR.payee + '</b> · Nội dung gợi ý: <i>Ung ho So Giai Tich</i></p>' +
        '<div class="donate-row"><a class="btn" href="' + AUTHOR.qr + '" download="ung-ho-so-giai-tich.jpg">Lưu ảnh QR</a>' +
        '<button type="button" class="btn primary donate-ok">Cảm ơn bạn!</button></div>' +
        '<p class="small">Đang dùng điện thoại? Lưu ảnh QR, mở app ngân hàng → Quét mã → chọn ảnh từ thư viện.</p>' +
        '</div>';
      document.body.appendChild(dlg);
      const close = () => { dlg.hidden = true; document.body.classList.remove('modal-open'); };
      dlg.querySelector('.donate-x').onclick = close;
      dlg.querySelector('.donate-ok').onclick = close;
      dlg.addEventListener('click', (e) => { if (e.target === dlg) close(); });
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !dlg.hidden) close(); });
    }
    dlg.hidden = false;
    document.body.classList.add('modal-open');
    dlg.querySelector('.donate-x').focus();
  }

  /* ---------- trang giới thiệu ---------- */
  function about(view) {
    const G = window.SGT || {};
    const nCh = G.CH ? G.CH.filter((c) => /^\d+$/.test(c.num) && c.num !== '0').length : 36;
    const nSec = G.SEC ? G.SEC.length : 236;
    const feats = [
      ['Mở đầu + ' + nCh + ' chương, ' + nSec + ' mục', 'Từ hàm số, giới hạn, đạo hàm, tích phân, chuỗi, giải tích nhiều biến đến giải tích thực chặt chẽ — sắp theo thứ tự học hợp lý, không trùng lặp.'],
      ['Minh hoạ chuyển động', 'Bấm ▶ để xem cát tuyến thành tiếp tuyến, tổng Riemann lấp đầy diện tích, chuỗi Taylor ôm sát đồ thị. Tự kéo thanh trượt để thử.'],
      ['Ví dụ và bài tập có lời giải', 'Mỗi mục có ví dụ mẫu và bài tập kèm lời giải từng bước để tự đối chiếu.'],
      ['Tự kiểm tra và ôn thẻ', 'Câu trắc nghiệm có giải thích ngay; thẻ ôn nhắc lại đúng lúc theo lịch giãn cách.'],
      ['Đề thi ngẫu nhiên', 'Mỗi lần bấm là một đề mới, có giờ, chấm điểm, chỉ ra chương còn yếu; in ra giấy A4 kèm đáp án.'],
      ['Ghi chú và bản đồ', 'Ghi chú riêng cho từng mục, bản đồ toàn bộ chương mục để thấy mình đã đi được bao xa, sao lưu ra tệp khi cần.'],
    ];
    const steps = [
      ['Đọc ý tưởng', 'mỗi mục mở đầu bằng câu hỏi “tại sao”.'],
      ['Kéo thả minh hoạ', 'thay số, xem hình thay đổi, tự rút ra quy luật.'],
      ['Làm ví dụ, bài tập', 'tự giải trước, rồi so lời giải.'],
      ['Tự kiểm tra, thi thử', 'đánh dấu mục đã học, ôn thẻ, làm đề ngẫu nhiên.'],
    ];
    view.innerHTML =
      '<section class="about-hero">' +
      '<p class="kicker">Giới thiệu</p>' +
      '<h1>Sổ Giải Tích</h1>' +
      '<p class="lead">Sổ tay học giải tích trực quan, miễn phí, chạy ngay trên trình duyệt. Mục tiêu là để bạn <b>nhìn thấy</b> khái niệm chuyển động trước khi gặp công thức — học hiểu bản chất thay vì học thuộc.</p>' +
      '<div class="continue"><a class="btn primary" href="#/home">Bắt đầu học</a><a class="btn" href="#/exam">Làm đề thi thử</a><button type="button" class="btn" data-donate>' + svg('heart') + ' Ủng hộ</button></div>' +
      '</section>' +

      '<h2>Trong sổ có gì</h2><div class="about-feats">' +
      feats.map((f) => '<div><b>' + f[0] + '</b><p>' + f[1] + '</p></div>').join('') + '</div>' +

      '<h2>Cách học gợi ý</h2><ol class="about-steps">' +
      steps.map((s) => '<li><b>' + s[0] + '</b> — ' + s[1] + '</li>').join('') + '</ol>' +
      '<p class="meta about-note">Tiến độ, câu trả lời và ghi chú lưu ngay trong trình duyệt của bạn, không cần tài khoản. Muốn chuyển sang máy khác thì vào <a href="#/notes">Ghi chú</a> → sao lưu. Nội dung được biên soạn riêng, dựa theo cấu trúc mục lục của các giáo trình giải tích kinh điển.</p>' +

      '<h2>Người tạo</h2>' +
      '<div class="author">' +
      '<img src="' + AUTHOR.photo + '" width="900" height="1125" alt="Ảnh ' + AUTHOR.name + '" loading="lazy">' +
      '<div><h3>' + AUTHOR.name + '</h3><p class="role">' + AUTHOR.role + '</p><p>' + AUTHOR.bio + '</p>' +
      '<p class="meta">Thấy lỗi nội dung hay muốn góp ý? Nhắn Messenger kèm số mục (ví dụ “mục 3.2”), mình sửa ngay.</p></div>' +
      '</div>' +

      '<h2>Liên hệ</h2><div class="about-links">' +
      AUTHOR.links.map((l) => '<a class="about-link ' + l.k + '" href="' + l.href + '"' + ext(l.href) + '>' + svg(l.k) + '<span><b>' + l.label + '</b><small>' + l.sub + '</small></span></a>').join('') +
      '</div>' +

      '<h2>Ủng hộ</h2>' +
      '<div class="about-donate">' +
      '<img src="' + AUTHOR.qr + '" width="640" height="700" alt="Mã QR MoMo / VietQR của ' + AUTHOR.payee + '" loading="lazy">' +
      '<div><h3>Mời mình ly cà phê ☕</h3><p>Sổ Giải Tích miễn phí 100%. Mỗi khoản ủng hộ giúp mình duy trì web và viết thêm bài học, minh hoạ, đề thi mới.</p>' +
      '<ul><li>Quét bằng <b>MoMo</b> hoặc <b>app ngân hàng bất kỳ</b> (VietQR · Napas 247).</li><li>Người nhận: <b>' + AUTHOR.payee + '</b></li><li>Nội dung gợi ý: <i>Ung ho So Giai Tich</i></li></ul>' +
      '<div class="continue"><a class="btn" href="' + AUTHOR.qr + '" download="ung-ho-so-giai-tich.jpg">Lưu ảnh QR</a></div></div>' +
      '</div>' +
      '<p class="about-foot">© 2026 ' + AUTHOR.name + ' · Mindset · Resource · Technology</p>';
    view.querySelectorAll('[data-donate]').forEach((b) => (b.onclick = donate));
  }

  window.SGT_ABOUT = about;
  window.SGT_DONATE = donate;
  window.SGT_AUTHOR = AUTHOR;
})();
