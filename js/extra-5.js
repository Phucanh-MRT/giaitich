/* Bổ sung Chương 12–15. */
(window.EXTRA = window.EXTRA || []).push(String.raw`
## 12.1
~ Khoảng cách giữa $(1,2)$ và $(4,6)$: $d_{\ell^1}=7$, $d_{\ell^2}=5$, $d_{\ell^\infty}=4$.
~ Mêtric trên chuỗi ký tự: số vị trí khác nhau (khoảng cách Hamming), ví dụ $d(\text{toán},\text{tuấn})$ đếm từng ký tự lệch.
~ $d(x,y)=|x-y|^2$ trên $\mathbb R$ **không** là mêtric: $d(0,2)=4>d(0,1)+d(1,2)=2$.
? $d(x,y)=\frac{|x-y|}{1+|x-y|}$ trên $\mathbb R$
+ là mêtric, và mọi khoảng cách đều $<1$
- không thoả bất đẳng thức tam giác
- không đối xứng
= Hàm $t\mapsto\frac t{1+t}$ tăng và dưới cộng tính.
? Trong $(\mathbb R^2,d_{\ell^\infty})$, dãy $(\frac1n,1)$ hội tụ về
+ $(0,1)$
- $(0,0)$
- không hội tụ
= Hội tụ theo từng toạ độ.
? Dãy $x^{(n)}=(\frac1n,n)$ trong $\mathbb R^2$
+ không hội tụ
- hội tụ về $(0,\infty)$
= Toạ độ thứ hai không hội tụ.
? Giới hạn của dãy trong không gian mêtric
+ là duy nhất (nếu có)
- có thể có nhiều
= Bất đẳng thức tam giác.
& Chứng minh $d_{\ell^\infty}$ là mêtric trên $\mathbb R^n$.
&> Không âm, bằng $0$ khi mọi toạ độ bằng nhau, đối xứng: hiển nhiên.
&> Tam giác: với mỗi $i$, $|x_i-z_i|\le|x_i-y_i|+|y_i-z_i|\le d(x,y)+d(y,z)$. Lấy max theo $i$.
& Chứng minh $d_{\ell^2}\le d_{\ell^1}\le\sqrt n\,d_{\ell^2}$ trên $\mathbb R^n$.
&> $\left(\sum|a_i|\right)^2=\sum a_i^2+2\sum_{i<j}|a_i||a_j|\ge\sum a_i^2$.
&> Cauchy–Schwarz: $\sum|a_i|\cdot1\le\sqrt{\sum a_i^2}\sqrt n$.

## 12.2
~ $(0,1)$ mở trong $\mathbb R$; $[0,1]$ đóng; $\mathbb Q$ không mở cũng không đóng; $\mathbb R$ và $\emptyset$ vừa mở vừa đóng.
~ Quả cầu mở $B(x,r)$ là tập mở; quả cầu đóng $\{y: d(x,y)\le r\}$ là tập đóng.
~ Giao vô hạn tập mở có thể không mở: $\bigcap_n(-\frac1n,\frac1n)=\{0\}$.
? Biên của $\mathbb Q$ trong $\mathbb R$ là
+ $\mathbb R$
- $\mathbb Q$
- $\emptyset$
= Mọi khoảng đều chứa cả số hữu tỉ và vô tỉ.
? Phần trong của $[0,1]$ là
+ $(0,1)$
- $[0,1]$
- $\emptyset$
= $0$ và $1$ là điểm biên.
? Trong mêtric rời rạc, mọi tập con
+ vừa mở vừa đóng
- chỉ mở
- chỉ đóng
= $B(x,\frac12)=\{x\}$ nên mọi điểm đều là điểm trong.
? Tập $\{(x,y): y>x^2\}$ trong $\mathbb R^2$ là
+ mở
- đóng
- không mở không đóng
= Ảnh ngược của $(0,\infty)$ qua hàm liên tục $y-x^2$.
& Chứng minh quả cầu mở $B(x_0,r)$ là tập mở.
&> Lấy $x\in B(x_0,r)$, đặt $s=r-d(x,x_0)>0$. Với $y\in B(x,s)$: $d(y,x_0)\le d(y,x)+d(x,x_0)<s+d(x,x_0)=r$.
&> Vậy $B(x,s)\subseteq B(x_0,r)$: $x$ là điểm trong.
& Chứng minh: $E$ mở khi và chỉ khi $X\setminus E$ đóng.
&> Giả sử $E$ mở, $x$ là điểm dính của $X\setminus E$. Nếu $x\in E$ thì có quả cầu quanh $x$ nằm trong $E$, không chạm $X\setminus E$, mâu thuẫn. Vậy $x\in X\setminus E$.
&> Chiều ngược lại tương tự.

## 12.3
~ Trong $Y=[0,1]$, tập $(\frac12,1]$ mở (là $(\frac12,2)\cap Y$).
~ Trong $Y=\mathbb Q$, tập $\{q\in\mathbb Q: q^2<2\}$ vừa mở vừa đóng.
? Tập $[0,1)$ trong không gian $Y=[0,1)$ là
+ vừa mở vừa đóng
- chỉ đóng
- chỉ mở
= Mọi không gian là tập vừa mở vừa đóng trong chính nó.
? $E$ đóng trong $Y$ khi và chỉ khi
+ $E=F\cap Y$ với $F$ đóng trong $X$
- $E$ đóng trong $X$
= Bản đóng của Mệnh đề tôpô tương đối.
? Tập $\{1\}$ trong $Y=\{1\}\cup[2,3]$ là
+ mở trong $Y$
- không mở trong $Y$
= $B_Y(1,\frac12)=\{1\}$.
& Chứng minh $\{q\in\mathbb Q: q^2<2\}$ đóng trong $\mathbb Q$.
&> Nó bằng $[-\sqrt2,\sqrt2]\cap\mathbb Q$ (vì $\pm\sqrt2\notin\mathbb Q$), giao của tập đóng trong $\mathbb R$ với $\mathbb Q$.
&> Nó cũng bằng $(-\sqrt2,\sqrt2)\cap\mathbb Q$, nên cũng mở trong $\mathbb Q$.

## 12.4
~ $\mathbb R^n$ với $d_{\ell^2}$ là đầy đủ: dãy Cauchy là Cauchy theo từng toạ độ.
~ $(0,\infty)$ với $|x-y|$ không đầy đủ, nhưng với mêtric $|\ln x-\ln y|$ thì đầy đủ: tính đầy đủ phụ thuộc mêtric.
? Mọi không gian mêtric với mêtric rời rạc
+ đầy đủ
- không đầy đủ
= Dãy Cauchy rời rạc phải hằng từ một chỉ số.
? Tập con đóng của không gian đầy đủ là
+ đầy đủ
- không đầy đủ
= Giới hạn của dãy Cauchy nằm trong tập đóng.
? $[0,1]\cap\mathbb Q$ với mêtric thông thường
+ không đầy đủ
- đầy đủ
= Dãy hữu tỉ tiến về $\frac1{\sqrt2}$.
& Chứng minh: dãy Cauchy có một dãy con hội tụ về $x$ thì cả dãy hội tụ về $x$.
&> Cho $\varepsilon$, chọn $N$ để $d(x_j,x_k)\le\varepsilon/2$ khi $j,k\ge N$, và $n_k\ge N$ với $d(x_{n_k},x)\le\varepsilon/2$.
&> Với $n\ge N$: $d(x_n,x)\le d(x_n,x_{n_k})+d(x_{n_k},x)\le\varepsilon$.

## 12.5
~ $[0,1]^2$ compact trong $\mathbb R^2$; đường tròn đơn vị compact; $\mathbb R$ không compact.
~ $\{\frac1n\}\cup\{0\}$ compact; $\{\frac1n\}$ không compact (thiếu điểm giới hạn $0$).
~ Phủ mở $\{(\frac1n,1): n\ge2\}$ của $(0,1)$ không có phủ con hữu hạn: $(0,1)$ không compact.
? Hợp hữu hạn tập compact là
+ compact
- có thể không compact
= Dãy trong hợp có vô hạn số hạng trong một tập.
? Tập compact trong không gian mêtric luôn
+ đóng và bị chặn
- mở
- hữu hạn
= Chiều ngược chỉ đúng trong $\mathbb R^n$.
? Giao của dãy giảm các tập compact khác rỗng
+ khác rỗng
- có thể rỗng
= Tính chất giao hữu hạn; ví dụ $\bigcap[0,\frac1n]=\{0\}$.
? Trong $\ell^\infty$ (dãy bị chặn), quả cầu đóng đơn vị
+ không compact
- compact
= Các dãy $e_n$ (1 ở vị trí $n$) cách nhau $1$, không dãy con nào hội tụ.
& Chứng minh tập compact $K$ là đóng.
&> Lấy $x$ dính vào $K$: có dãy $x_n\in K$, $x_n\to x$. Compact cho dãy con hội tụ về $y\in K$; nhưng dãy con cũng $\to x$.
&> Giới hạn duy nhất nên $x=y\in K$.
& Chứng minh $(0,1]$ không compact bằng định nghĩa dãy.
&> Dãy $\frac1n$ nằm trong $(0,1]$; mọi dãy con đều $\to0\notin(0,1]$, nên không có dãy con hội tụ **trong** $(0,1]$.

## 13.1
~ $f(x,y)=x^2+y^2$ liên tục từ $\mathbb R^2$ vào $\mathbb R$; tập $\{f<1\}$ (đĩa mở) là ảnh ngược của $(-\infty,1)$ nên mở.
~ Phép chiếu $\pi(x,y)=x$ liên tục (thậm chí $|\pi(p)-\pi(q)|\le d(p,q)$).
? Hàm hằng giữa hai không gian mêtric
+ luôn liên tục
- chỉ liên tục khi miền compact
= Ảnh ngược của mọi tập là $\emptyset$ hoặc cả miền.
? Mọi hàm từ không gian rời rạc vào không gian mêtric bất kỳ
+ đều liên tục
- không liên tục
= Mọi tập con của miền đều mở.
? $f$ liên tục và $f(x_0)\ne0$ thì
+ $f\ne0$ trên một lân cận của $x_0$
- $f\ne0$ khắp nơi
= Tập $\{f\ne0\}$ mở.
& Chứng minh: $f$ liên tục (theo $\varepsilon$–$\delta$) thì $f^{-1}(V)$ mở với $V$ mở.
&> Lấy $x\in f^{-1}(V)$. Vì $V$ mở có $\varepsilon$ với $B(f(x),\varepsilon)\subseteq V$.
&> Liên tục cho $\delta$: $f(B(x,\delta))\subseteq B(f(x),\varepsilon)\subseteq V$, tức $B(x,\delta)\subseteq f^{-1}(V)$.

## 13.2
~ $(x,y)\mapsto xy$ và $(x,y)\mapsto x+y$ liên tục trên $\mathbb R^2$, nên mọi đa thức hai biến liên tục.
~ $f(x,y)=\frac{x^2y}{x^4+y^2}$: dọc mọi đường thẳng qua gốc $\to0$, nhưng dọc $y=x^2$ bằng $\frac12$. Không liên tục tại gốc.
? Kiểm tra liên tục tại gốc chỉ dọc các đường thẳng
+ là không đủ
- là đủ
= Ví dụ $\frac{x^2y}{x^4+y^2}$.
? $f(x,y)=\frac{x^2y^2}{x^2+y^2}$, $f(0,0)=0$ có liên tục tại gốc?
+ Có, vì $|f|\le x^2+y^2\to0$
- Không
= $x^2y^2\le(x^2+y^2)^2$.
? Hàm $F(x)=(f(x),g(x))$ vào $\mathbb R^2$ liên tục khi và chỉ khi
+ $f$ và $g$ liên tục
- chỉ cần $f$
= Mệnh đề về không gian tích.
& Chứng minh $f(x,y)=\frac{x^3}{x^2+y^2}$, $f(0,0)=0$ liên tục tại gốc.
&> $|f(x,y)|=|x|\cdot\frac{x^2}{x^2+y^2}\le|x|\le\sqrt{x^2+y^2}$.
&> Chọn $\delta=\varepsilon$.

## 13.3
~ $f(x,y)=x+y$ trên hình vuông $[0,1]^2$ đạt max $2$ tại $(1,1)$.
~ Hàm liên tục trên tập compact thì ảnh bị chặn; nên $\frac1x$ trên $[1,2]$ bị chặn, còn trên $(0,1]$ thì có thể không.
? Ảnh của tập compact qua hàm liên tục là
+ compact
- đóng nhưng có thể không bị chặn
= Định lý 2.3.1.
? Ảnh của tập đóng qua hàm liên tục
+ có thể không đóng, ví dụ $\arctan(\mathbb R)=(-\frac\pi2,\frac\pi2)$
- luôn đóng
= Cần compact, không chỉ đóng.
? Song ánh liên tục từ không gian compact lên không gian mêtric thì
+ có hàm ngược liên tục
- hàm ngược có thể gián đoạn
= Ảnh của tập đóng (compact) là compact, do đó đóng.
& Chứng minh: $f$ liên tục trên $K$ compact thì đạt max.
&> $f(K)$ compact trong $\mathbb R$, nên đóng và bị chặn; $M=\sup f(K)$ là điểm dính của $f(K)$, nên $M\in f(K)$.

## 13.4
~ $[0,1]$, $\mathbb R$, mọi khoảng đều liên thông; $\mathbb Q$ không liên thông: $\mathbb Q=(\mathbb Q\cap(-\infty,\sqrt2))\cup(\mathbb Q\cap(\sqrt2,\infty))$.
~ Đường tròn liên thông (ảnh liên tục của $[0,2\pi]$).
? Ảnh liên tục của tập liên thông trong $\mathbb R$ là
+ một khoảng
- tập rời rạc
= Đó là định lý giá trị trung gian tổng quát.
? Có hàm liên tục $f:[0,1]\to\mathbb R$ với $f([0,1])=\{0,1\}$ không?
+ Không
- Có
= Ảnh phải liên thông.
? Tập $\{(x,y): xy=1\}$ trong $\mathbb R^2$
+ không liên thông (hai nhánh hypebol)
- liên thông
= Hàm $(x,y)\mapsto\mathrm{sgn}\,x$ liên tục, nhận hai giá trị.
& Chứng minh $\mathbb Q$ không liên thông.
&> $V=\{q\in\mathbb Q: q<\sqrt2\}$ và $W=\{q\in\mathbb Q: q>\sqrt2\}$ mở trong $\mathbb Q$, rời nhau, khác rỗng, hợp bằng $\mathbb Q$.

## 13.5
~ Tôpô rời rạc (mọi tập đều mở) và tôpô thô ($\emptyset, X$) là hai thái cực.
~ Tôpô Zariski, tôpô của trục số mở rộng $[-\infty,+\infty]$ là những không gian tôpô hay gặp.
? Mọi không gian mêtric là
+ Hausdorff
- không Hausdorff
= Hai điểm cách nhau $d$ có hai quả cầu bán kính $d/2$ rời nhau.
? Trong không gian tôpô, "liên tục" định nghĩa bằng
+ ảnh ngược của tập mở là mở
- $\varepsilon$–$\delta$
= Không có khoảng cách để nói $\varepsilon$.
? Compact trong không gian tôpô thường được định nghĩa bằng
+ phủ mở có phủ con hữu hạn
- dãy có dãy con hội tụ
= Hai định nghĩa trùng nhau trong không gian mêtric.
& Chứng minh: trong không gian Hausdorff, giới hạn của dãy (nếu có) là duy nhất.
&> Nếu $x_n\to x$ và $x_n\to y\ne x$, lấy lân cận rời nhau $U\ni x$, $V\ni y$. Từ chỉ số nào đó $x_n\in U$ và $x_n\in V$, mâu thuẫn.

## 14.1
~ $\lim_{(x,y)\to(0,0)}\frac{\sin(x^2+y^2)}{x^2+y^2}=1$ (đặt $t=x^2+y^2$).
? Nếu $f(x)\to L$ khi $x\to x_0$ thì với mọi dãy $x_n\to x_0$ ($x_n\ne x_0$)
+ $f(x_n)\to L$
- $f(x_n)$ có thể không hội tụ
= Đặc trưng dãy.
? Giới hạn của hàm phụ thuộc vào $f(x_0)$?
+ Không
- Có
= Chỉ các giá trị gần $x_0$.
? Đẳng thức $\lim_{x\to x_0}\lim_n f_n(x)=\lim_n\lim_{x\to x_0}f_n(x)$
+ không phải lúc nào cũng đúng
- luôn đúng
= Đúng khi hội tụ đều (mục 14.3).
& Chứng minh $\lim_{(x,y)\to(0,0)}\frac{xy}{\sqrt{x^2+y^2}}=0$.
&> $|xy|\le\frac{x^2+y^2}{2}$, nên $\left|\frac{xy}{\sqrt{x^2+y^2}}\right|\le\frac{\sqrt{x^2+y^2}}2\to0$.

## 14.2
~ $f_n(x)=\frac{x}{n}$ trên $\mathbb R$ hội tụ điểm về $0$ nhưng không đều ($\sup=\infty$); trên $[0,1]$ thì đều.
~ $f_n(x)=\frac{1}{1+nx}$ trên $(0,1]$ hội tụ điểm về $0$ nhưng không đều (gần $0$ luôn có giá trị gần $1$).
? $f_n(x)=\frac{nx}{1+n^2x^2}$ trên $[0,1]$
+ hội tụ điểm về $0$ nhưng không đều (tại $x=\frac1n$ giá trị $\frac12$)
- hội tụ đều
= Một "cái bướu" chạy về $0$.
? Hội tụ đều kéo theo
+ hội tụ điểm
- hội tụ đều của đạo hàm
= Chiều ngược lại sai.
? $f_n(x)=x^n(1-x)$ trên $[0,1]$
+ hội tụ đều về $0$
- chỉ hội tụ điểm
= Max tại $x=\frac n{n+1}$, bằng $\le\frac1{n+1}\to0$.
& Chứng minh $f_n(x)=\frac{\sin(nx)}{n}$ hội tụ đều về $0$ trên $\mathbb R$.
&> $\sup_x|f_n(x)|=\frac1n\to0$. Cho $\varepsilon$, chọn $N>\frac1\varepsilon$; với $n\ge N$ và mọi $x$: $|f_n(x)|\le\frac1n<\varepsilon$.
& Chứng minh $f_n(x)=x^n$ không hội tụ đều trên $[0,1)$ dù giới hạn điểm là $0$ (liên tục).
&> $\sup_{x\in[0,1)}x^n=1$ với mọi $n$ (cho $x\to1^-$), không $\to0$.

## 14.3
~ Chuỗi $\sum\frac{\cos(nx)}{n^2}$ hội tụ đều nên tổng là hàm liên tục.
~ Định lý Dini: trên tập compact, dãy hàm liên tục **đơn điệu** hội tụ điểm về hàm liên tục thì hội tụ đều.
? Giới hạn điểm của dãy hàm liên tục
+ có thể gián đoạn
- luôn liên tục
= $x^n$ trên $[0,1]$.
? Dãy $f_n$ liên tục, $f_n\to f$ đều, $x_n\to x$. Khi đó $f_n(x_n)\to$
+ $f(x)$
- không xác định
= $|f_n(x_n)-f(x)|\le\sup|f_n-f|+|f(x_n)-f(x)|$.
? Giới hạn đều của hàm liên tục đều là
+ liên tục đều
- chỉ liên tục
= Lập luận $\varepsilon/3$ tương tự.
& Chứng minh giới hạn đều của hàm liên tục là hàm liên tục (lập luận $\varepsilon/3$).
&> Cho $\varepsilon$, chọn $n$ với $\sup|f_n-f|\le\varepsilon/3$; chọn $\delta$ để $|f_n(x)-f_n(x_0)|\le\varepsilon/3$ khi $d(x,x_0)<\delta$.
&> $|f(x)-f(x_0)|\le|f(x)-f_n(x)|+|f_n(x)-f_n(x_0)|+|f_n(x_0)-f(x_0)|\le\varepsilon$.

## 14.4
~ $d_\infty(\sin,\cos)$ trên $[0,2\pi]$ bằng $\max|\sin x-\cos x|=\sqrt2$.
~ $C([0,1])$ với mêtric $d_{L^1}(f,g)=\int|f-g|$ **không** đầy đủ: có dãy Cauchy hội tụ về hàm bậc thang.
? $d_\infty(f_n,0)\to0$ nghĩa là
+ $f_n\to0$ đều
- $f_n\to0$ điểm
= Định nghĩa mêtric đều.
? $d_\infty(x^2,x^3)$ trên $[0,1]$ đạt tại
+ $x=\frac23$, giá trị $\frac4{27}$
- $x=1$
- $x=\frac12$
= Đạo hàm của $x^2-x^3$ bằng $0$ tại $x=\frac23$.
? Không gian $C([a,b])$ với $d_\infty$ là
+ đầy đủ
- không đầy đủ
= Giới hạn đều của hàm liên tục là liên tục.
& Tính $d_\infty(f,g)$ với $f(x)=x$, $g(x)=\sin x$ trên $[0,\pi]$.
&> $h(x)=x-\sin x\ge0$, tăng ($h'=1-\cos x\ge0$), max tại $x=\pi$: $h(\pi)=\pi$.

## 14.5
~ $\sum_{n\ge1}\frac{x^n}{n^2}$ hội tụ đều trên $[-1,1]$: $M_n=\frac1{n^2}$.
~ Hàm Weierstrass $\sum a^n\cos(b^n\pi x)$ (với $0<a<1$) liên tục nhờ tiêu chuẩn M, nhưng không khả vi ở đâu (khi $ab$ đủ lớn).
? $\sum\frac{1}{n^2+x^2}$ trên $\mathbb R$
+ hội tụ đều ($M_n=\frac1{n^2}$)
- không hội tụ đều
= $\frac1{n^2+x^2}\le\frac1{n^2}$.
? $\sum\frac{x^n}{n}$ trên $[0,1)$
+ không hội tụ đều (tiêu chuẩn M không áp dụng vì $\sum\frac1n=\infty$)
- hội tụ đều
= Gần $x=1$ tổng $\to\infty$.
? Tiêu chuẩn M cho
+ hội tụ đều và hội tụ tuyệt đối
- chỉ hội tụ điểm
= Chuỗi bị trội bởi chuỗi số hội tụ.
& Chứng minh tiêu chuẩn M.
&> Tổng riêng $S_N(x)$. Với $N>K$: $|S_N(x)-S_K(x)|\le\sum_{n=K+1}^N M_n$, nhỏ tuỳ ý khi $K$ lớn, đều theo $x$.
&> Vậy $(S_N)$ là dãy Cauchy trong $d_\infty$, hội tụ đều (vì $C(X)$ đầy đủ, hoặc theo điểm rồi qua giới hạn).

## 14.6
~ $\int_0^1\sum_{n\ge0}\frac{x^n}{2^n}dx=\sum\frac{1}{2^n(n+1)}$: đổi được vì hội tụ đều trên $[0,1]$.
~ $\ln2=\int_0^1\frac{dx}{1+x}$; nhưng khai triển $\frac1{1+x}=\sum(-x)^n$ không hội tụ đều trên $[0,1]$ (tại $1$ phân kỳ), cần định lý Abel.
? $f_n(x)=nxe^{-nx^2}$ trên $[0,1]$: $\int_0^1f_n\to$
+ $\frac12$, dù $f_n\to0$ điểm
- $0$
= $\int_0^1nxe^{-nx^2}dx=\frac{1-e^{-n}}2$.
? Hội tụ đều trên **khoảng vô hạn** có đủ để đổi tích phân?
+ Không, ví dụ $f_n=\frac1n\mathbb 1_{[0,n]}$
- Có
= $\sup|f_n|=\frac1n\to0$ nhưng $\int f_n=1$.
& Tính $\int_0^{1/2}\sum_{n\ge0}x^n\,dx$ hai cách.
&> Trực tiếp: $\int_0^{1/2}\frac{dx}{1-x}=\ln2$.
&> Từng số hạng (hợp lệ vì hội tụ đều trên $[0,\frac12]$): $\sum\frac{(1/2)^{n+1}}{n+1}=\ln2$.

## 14.7
~ $\sum\frac{x^n}{n!}$ hội tụ đều trên mọi đoạn, chuỗi đạo hàm cũng vậy, nên $(e^x)'=e^x$.
~ $f_n(x)=\frac{x}{1+nx^2}\to0$ đều, $f_n'(0)=1$ nhưng giới hạn có đạo hàm $0$: đạo hàm giới hạn khác giới hạn đạo hàm.
? Định lý 3.7.1 cần hội tụ đều của
+ dãy đạo hàm $f_n'$
- dãy $f_n$
= Cùng với hội tụ tại một điểm.
? Hàm Weierstrass cho thấy
+ giới hạn đều của hàm trơn có thể không khả vi ở đâu
- hàm liên tục luôn khả vi hầu khắp
= Tổng riêng là đa thức lượng giác (trơn).
& Chứng minh $\left(\sum_{n\ge1}\frac{\sin(nx)}{n^3}\right)'=\sum\frac{\cos(nx)}{n^2}$.
&> Chuỗi đạo hàm $\sum\frac{\cos nx}{n^2}$ hội tụ đều (M-test, $M_n=\frac1{n^2}$); chuỗi gốc hội tụ tại $x=0$.
&> Theo định lý 3.7.1, đạo hàm từng số hạng được.

## 14.8
~ Đa thức Bernstein bậc $1$ của $f$ là đường thẳng nối $(0,f(0))$ và $(1,f(1))$.
~ $|x|$ trên $[-1,1]$: hàm $\sqrt{x^2+\frac1n}$ xấp xỉ đều nó với sai số $\le\frac1{\sqrt n}$, nhưng chưa phải đa thức. Định lý Weierstrass đảm bảo có cả đa thức làm được việc đó (ví dụ Bernstein).
? $B_n f$ với $f(x)=x$ bằng
+ $x$ với mọi $n$
- $x^n$
= $\sum\frac kn\binom nk x^k(1-x)^{n-k}=x$ (kỳ vọng nhị thức).
? Định lý Weierstrass có đúng trên $\mathbb R$ (không bị chặn)?
+ Không, ví dụ $e^x$ không xấp xỉ đều được trên $\mathbb R$ bởi đa thức
- Có
= Hiệu $e^x-P(x)$ không bị chặn.
? Định lý Stone–Weierstrass tổng quát hoá cho
+ đại số hàm trên không gian compact
- hàm khả vi
= Ví dụ đa thức lượng giác trên đường tròn.
& Tính $B_2 f$ với $f(x)=x^2$ và so sánh với $f$.
&> $B_2f(x)=0\cdot(1-x)^2+\frac14\cdot2x(1-x)+1\cdot x^2=\frac{x}{2}+\frac{x^2}2$.
&> Sai số $B_2f-f=\frac{x(1-x)}{2}$, lớn nhất $\frac18$ tại $x=\frac12$. Tổng quát $B_nf-f=\frac{x(1-x)}{n}$.

## 15.1
~ $\sum n!\,x^n$ có $R=0$: chỉ hội tụ tại $x=0$.
~ $\sum\frac{x^n}{2^n}$ có $R=2$; $\sum\frac{x^n}{n}$ có $R=1$, hội tụ tại $x=-1$, phân kỳ tại $x=1$.
? Bán kính hội tụ của $\sum\frac{x^n}{n^2}$ là
+ $1$, hội tụ tại cả hai biên
- $\infty$
- $0$
= $|c_n|^{1/n}\to1$; tại $\pm1$ hội tụ tuyệt đối.
? Bán kính hội tụ của $\sum 3^nx^{2n}$ là
+ $\frac1{\sqrt3}$
- $\frac13$
- $3$
= $3x^2<1$.
? Trong khoảng $|x-a|<R$, chuỗi luỹ thừa
+ hội tụ tuyệt đối, và hội tụ đều trên mọi đoạn con đóng
- hội tụ đều trên cả khoảng
= Có thể không đều trên cả khoảng mở.
& Tìm bán kính và miền hội tụ của $\sum_{n\ge1}\frac{(x-2)^n}{n\,3^n}$.
&> $|c_n|^{1/n}=\frac{1}{3n^{1/n}}\to\frac13$, nên $R=3$; khoảng $(-1,5)$.
&> Tại $x=5$: $\sum\frac1n$ phân kỳ. Tại $x=-1$: $\sum\frac{(-1)^n}{n}$ hội tụ. Miền hội tụ $[-1,5)$.

## 15.2
~ $\frac1{1-x}$ giải tích tại mọi $a\ne1$: quanh $a$ là $\sum\frac{(x-a)^n}{(1-a)^{n+1}}$, bán kính $|1-a|$.
~ Hàm $e^{-1/x^2}$ (bằng $0$ tại $0$) trơn nhưng không giải tích tại $0$.
? Đạo hàm của $\sum c_nx^n$ là
+ $\sum nc_nx^{n-1}$, cùng bán kính
- bán kính nhỏ hơn
= $(n)^{1/n}\to1$ nên bán kính không đổi.
? Hàm giải tích trên một khoảng mà bằng $0$ trên một đoạn con thì
+ bằng $0$ trên cả khoảng
- có thể khác $0$ ở chỗ khác
= Tính duy nhất của hàm giải tích; khác hẳn hàm trơn.
? Hệ số $c_n$ của chuỗi Taylor tại $a$ là
+ $\frac{f^{(n)}(a)}{n!}$
- $f^{(n)}(a)$
- $\frac{f(a)}{n}$
= Đạo hàm $n$ lần rồi thế $x=a$.
& Chứng minh: nếu $f(x)=\sum c_nx^n$ với $|x|<R$ thì $c_n=\frac{f^{(n)}(0)}{n!}$.
&> Đạo hàm từng số hạng $n$ lần: $f^{(n)}(x)=\sum_{k\ge n}k(k-1)\cdots(k-n+1)c_kx^{k-n}$.
&> Thế $x=0$, chỉ còn số hạng $k=n$: $f^{(n)}(0)=n!\,c_n$.

## 15.3
~ $\arctan x=\sum\frac{(-1)^nx^{2n+1}}{2n+1}$ với $|x|<1$; Abel cho $x\to1^-$: $\frac\pi4=1-\frac13+\frac15-\cdots$ (Leibniz).
? Chiều ngược của Abel có đúng: nếu $\lim_{x\to1^-}\sum c_nx^n$ tồn tại thì $\sum c_n$ hội tụ?
+ Không, ví dụ $c_n=(-1)^n$: giới hạn $\frac12$ nhưng $\sum(-1)^n$ phân kỳ
- Có
= Cần thêm điều kiện (định lý Tauber).
? Abel áp dụng được cho $\sum\frac{(-1)^nx^n}{n+1}$ tại $x=1$ vì
+ $\sum\frac{(-1)^n}{n+1}$ hội tụ
- chuỗi hội tụ tuyệt đối tại $1$
= Hội tụ tại biên là điều kiện.
& Dùng Abel tính $1-\frac13+\frac15-\frac17+\cdots$.
&> Với $|x|<1$: $\arctan x=\int_0^x\frac{dt}{1+t^2}=\sum_n\frac{(-1)^nx^{2n+1}}{2n+1}$.
&> Tại $x=1$ chuỗi hội tụ (đan dấu). Abel: tổng $=\lim_{x\to1^-}\arctan x=\frac\pi4$.

## 15.4
~ $e^xe^x=\sum_n\left(\sum_k\frac1{k!(n-k)!}\right)x^n=\sum_n\frac{2^n}{n!}x^n=e^{2x}$.
~ $\frac{1}{(1-x)^2}=\sum(n+1)x^n$.
? Hệ số $x^3$ của $(1+x+x^2+\cdots)(1-x+x^2-\cdots)$ là
+ $0$
- $1$
- $4$
= Tích bằng $\frac{1}{1-x^2}=\sum x^{2n}$, không có $x^3$.
? Tích Cauchy của hai chuỗi hội tụ tuyệt đối
+ hội tụ tuyệt đối về tích hai tổng
- có thể phân kỳ
= Định lý Mertens/Cauchy.
? Tích Cauchy của $\sum\frac{(-1)^n}{\sqrt{n+1}}$ với chính nó
+ phân kỳ
- hội tụ
= Hai chuỗi chỉ hội tụ có điều kiện; số hạng tích không $\to0$.
& Chứng minh $e^xe^y=e^{x+y}$ bằng tích chuỗi.
&> $c_n=\sum_{k=0}^n\frac{x^k}{k!}\frac{y^{n-k}}{(n-k)!}=\frac1{n!}\sum_k\binom nkx^ky^{n-k}=\frac{(x+y)^n}{n!}$.
&> Hai chuỗi hội tụ tuyệt đối nên tích bằng $\sum c_n=e^{x+y}$.

## 15.5
~ $e=\sum\frac1{n!}=2{,}71828\ldots$; $e$ vô tỉ.
~ $\ln$ có khai triển $\ln(1+x)=x-\frac{x^2}2+\frac{x^3}3-\cdots$ với $|x|<1$.
? $\exp(-x)$ bằng
+ $\frac1{\exp(x)}$
- $-\exp(x)$
= Từ $\exp(x)\exp(-x)=\exp(0)=1$.
? $\lim_{x\to\infty}\frac{x^{100}}{e^x}$ bằng
+ $0$
- $\infty$
= $e^x>\frac{x^{101}}{101!}$.
? $\ln(e^x)$ bằng
+ $x$
- $e^{\ln x}$
= Hàm ngược.
? $a^x$ với $a>0$ được định nghĩa lại là
+ $\exp(x\ln a)$
- $\exp(x)\cdot a$
= Trùng với định nghĩa luỹ thừa thực ở Chương 6.
& Chứng minh $e$ vô tỉ.
&> Giả sử $e=\frac pq$. Đặt $x=q!\left(e-\sum_{n=0}^q\frac1{n!}\right)$, là số nguyên.
&> Nhưng $0<x=\sum_{n>q}\frac{q!}{n!}<\sum_{k\ge1}\frac1{(q+1)^k}=\frac1q\le1$. Không có số nguyên nào trong $(0,1)$.

## 15.6
~ $(1+i)(1-i)=2$; $\frac{1}{i}=-i$; $|3+4i|=5$.
~ $e^{i\pi/2}=i$, $e^{2\pi i}=1$.
~ Nhân hai số phức: nhân mô-đun, cộng góc. $(\cos a+i\sin a)(\cos b+i\sin b)=\cos(a+b)+i\sin(a+b)$.
? $i^{2026}$ bằng
+ $-1$
- $1$
- $i$
= $2026=4\cdot506+2$, $i^2=-1$.
? $|e^{i\theta}|$ bằng
+ $1$
- $\theta$
- $e$
= $\cos^2\theta+\sin^2\theta=1$.
? $\overline{zw}$ bằng
+ $\bar z\,\bar w$
- $\bar z+\bar w$
= Liên hợp giữ phép nhân.
& Tính $(1+i)^8$.
&> $1+i=\sqrt2e^{i\pi/4}$, nên $(1+i)^8=16e^{2\pi i}=16$.
& Chứng minh $|zw|=|z||w|$.
&> $|zw|^2=zw\overline{zw}=z\bar zw\bar w=|z|^2|w|^2$.

## 15.7
~ $\sin(2x)=2\sin x\cos x$: phần ảo của $e^{2ix}=(e^{ix})^2=(\cos x+i\sin x)^2$.
~ $\pi$ là nghiệm dương nhỏ nhất của $\sin$; từ chuỗi chứng minh được $\cos2<0$ nên có nghiệm của $\cos$ trong $(0,2)$, tức $\frac\pi2<2$.
? $\cos(3x)$ bằng
+ $4\cos^3x-3\cos x$
- $3\cos x$
- $\cos^3 x$
= Phần thực của $(\cos x+i\sin x)^3$.
? $\sin$ và $\cos$ thoả phương trình vi phân
+ $y''=-y$
- $y'=y$
- $y''=y$
= $\sin''=-\sin$.
? $\tan$ có chu kỳ
+ $\pi$
- $2\pi$
= $\tan(x+\pi)=\frac{-\sin x}{-\cos x}$.
& Chứng minh $\cos^2x+\sin^2x=1$ từ định nghĩa bằng $e^{ix}$.
&> $\cos x=\frac{e^{ix}+e^{-ix}}2$, $\sin x=\frac{e^{ix}-e^{-ix}}{2i}$.
&> $\cos^2x+\sin^2x=\frac{e^{2ix}+2+e^{-2ix}}{4}-\frac{e^{2ix}-2+e^{-2ix}}{4}=1$.
& Tìm khai triển chuỗi của $\cos x$ từ $e^{ix}$.
&> $e^{ix}=\sum\frac{(ix)^n}{n!}$. Phần thực gồm các $n$ chẵn: $(i)^{2k}=(-1)^k$.
&> $\cos x=\sum_k\frac{(-1)^kx^{2k}}{(2k)!}=1-\frac{x^2}2+\frac{x^4}{24}-\cdots$.
`);
