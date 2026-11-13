/* Nội dung phần 2 (theo mục lục Giải tích II, Chương 1–8 → Chương 12–19). Cú pháp như content-1.js.
   Trường thứ 4 của dòng chương ("II") cho biết số trang lấy theo cuốn Giải tích II. */
window.PART_2 = String.raw`
# 12 | Không gian mêtric | 15 | II
> Trừu tượng hoá "khoảng cách" để mọi khái niệm giới hạn dùng được cho vectơ, hàm số, chuỗi ký tự…

## 12.1 | Định nghĩa và ví dụ | 15
@pre 6.1
@w balls
| Một **mêtric** là cách đo khoảng cách $d(x,y)$ thoả 4 điều: không âm, bằng $0$ chỉ khi $x=y$, đối xứng, và bất đẳng thức tam giác. Cùng một tập $\mathbb R^2$ có thể có nhiều mêtric, và "quả cầu" của mỗi mêtric có hình dạng khác nhau.
! Định nghĩa 1.1.2 :: $(X,d)$ là không gian mêtric nếu $d(x,x)=0$; $d(x,y)>0$ khi $x\ne y$; $d(x,y)=d(y,x)$; $d(x,z)\le d(x,y)+d(y,z)$.
! Ví dụ :: $d_{\ell^1}=\sum|x_i-y_i|$, $d_{\ell^2}=\sqrt{\sum(x_i-y_i)^2}$, $d_{\ell^\infty}=\max|x_i-y_i|$, mêtric rời rạc $d(x,y)=1$ khi $x\ne y$.
! Hội tụ :: $x^{(n)}\to x$ trong $(X,d)$ khi $d(x^{(n)},x)\to0$.
! Tương đương :: Trên $\mathbb R^n$: $d_{\ell^\infty}\le d_{\ell^2}\le d_{\ell^1}\le n\,d_{\ell^\infty}$, nên ba mêtric cho cùng khái niệm hội tụ.
? Quả cầu đơn vị của $d_{\ell^1}$ trong $\mathbb R^2$ có hình
+ hình thoi
- hình tròn
- hình vuông song song trục
= $|x|+|y|\le1$.
? Trong mêtric rời rạc, dãy hội tụ khi
+ nó hằng từ một chỉ số nào đó
- nó bị chặn
- luôn luôn
= $d<1$ nghĩa là bằng nhau.

## 12.2 | Một số tôpô tập điểm của các không gian mêtric | 24
@pre 12.1 9.1
@w topo
| Mỗi điểm $x$ so với tập $E$ thuộc đúng một trong ba loại: **điểm trong** (có quả cầu nằm gọn trong $E$), **điểm ngoài** (có quả cầu nằm gọn ngoài $E$), **điểm biên** (mọi quả cầu đều chạm cả trong lẫn ngoài).
! Định nghĩa :: Tập mở: mọi điểm đều là điểm trong. Tập đóng: chứa mọi điểm biên (tương đương: chứa mọi giới hạn của dãy trong nó).
! Mệnh đề :: $E$ mở khi và chỉ khi $X\setminus E$ đóng. Hợp tuỳ ý tập mở là mở; giao hữu hạn tập mở là mở.
! Bao đóng, phần trong :: $\overline E$ = điểm trong ∪ điểm biên; $\mathrm{int}(E)$ = các điểm trong.
? Tập $[0,1)$ trong $\mathbb R$ là
+ không mở cũng không đóng
- mở
- đóng
= $0$ là điểm biên thuộc tập (không mở), $1$ là điểm biên không thuộc tập (không đóng).

## 12.3 | Tôpô tương đối (Relative Topology) | 28
@pre 12.2
| Tính mở/đóng phụ thuộc vào không gian **chứa** tập. $[0,1)$ không mở trong $\mathbb R$, nhưng mở trong không gian $[0,2]$, vì quả cầu quanh $0$ trong $[0,2]$ là $[0,r)$.
! Mệnh đề :: $E\subseteq Y\subseteq X$; $E$ mở trong $Y$ khi và chỉ khi $E=V\cap Y$ với $V$ mở trong $X$.
? $(0,1]$ trong không gian $Y=(0,1]$ là
+ vừa mở vừa đóng
- chỉ mở
- chỉ đóng
= Mọi không gian là tập vừa mở vừa đóng trong chính nó.

## 12.4 | Dãy Cauchy và các không gian mêtric đầy đủ | 30
@pre 12.2 5.1
@w seq mode=complete
| Không gian **đầy đủ** khi mọi dãy Cauchy đều hội tụ trong nó. $\mathbb R$ đầy đủ, $\mathbb Q$ không. $(0,1]$ cũng không: dãy $1/n$ là Cauchy nhưng "rơi ra ngoài" tại $0$.
! Định nghĩa :: $(X,d)$ đầy đủ nếu mọi dãy Cauchy trong $X$ hội tụ về một điểm của $X$.
! Mệnh đề :: Tập con $E$ của không gian đầy đủ là đầy đủ khi và chỉ khi $E$ đóng.
? $\mathbb Q$ với mêtric $|x-y|$ có đầy đủ không?
- Có
+ Không, dãy thập phân của $\sqrt2$ là Cauchy nhưng không hội tụ trong $\mathbb Q$
= Đây là lý do xây dựng $\mathbb R$.

## 12.5 | Tập compact trong các không gian mêtric | 33
@pre 12.4 6.6
@w bolzano
| Tập **compact** (theo dãy): mọi dãy trong nó có dãy con hội tụ về một điểm của nó. Trong $\mathbb R^n$, compact chính là **đóng và bị chặn** (Heine–Borel). Tương đương: mọi phủ mở có phủ con hữu hạn.
! Định nghĩa :: $K$ compact nếu mọi dãy trong $K$ có dãy con hội tụ trong $K$.
! Heine–Borel :: $K\subseteq\mathbb R^n$ compact khi và chỉ khi đóng và bị chặn.
! Phủ mở :: $K$ compact khi và chỉ khi mọi họ tập mở phủ $K$ có họ con hữu hạn phủ $K$.
! Lưu ý :: Trong không gian tổng quát, đóng và bị chặn không đủ (ví dụ mêtric rời rạc trên $\mathbb N$).
? $[0,1]\cap\mathbb Q$ có compact trong $\mathbb R$?
- Có, vì bị chặn
+ Không, vì không đóng
= Dãy hữu tỉ tiến về $1/\sqrt2$ không có dãy con hội tụ trong tập.

# 13 | Các hàm liên tục trên không gian mêtric | 43 | II
> Liên tục giữa hai không gian mêtric bất kỳ, và nó tương tác với compact, liên thông thế nào.

## 13.1 | Các hàm liên tục | 43
@pre 12.2 9.4
| $f:(X,d_X)\to(Y,d_Y)$ liên tục tại $x_0$: với mọi $\varepsilon$ có $\delta$ để $d_X(x,x_0)<\delta\Rightarrow d_Y(f(x),f(x_0))<\varepsilon$. Định nghĩa đẹp nhất: **ảnh ngược của tập mở là tập mở**.
! Định lý 2.1.4 :: Tương đương: (a) $f$ liên tục; (b) $x_n\to x$ kéo theo $f(x_n)\to f(x)$; (c) $f^{-1}(V)$ mở với mọi $V$ mở; (d) $f^{-1}(F)$ đóng với mọi $F$ đóng.
? Ảnh **xuôi** của tập mở qua hàm liên tục
+ có thể không mở, ví dụ $f(x)=x^2$, $f((-1,1))=[0,1)$
- luôn mở
= Định lý nói về ảnh ngược.

## 13.2 | Tính liên tục và không gian tích (Product Spaces) | 45
@pre 13.1
@w surface preset=discont
| Hàm $f:\mathbb R^2\to\mathbb R$ có thể liên tục theo **từng biến riêng** mà vẫn không liên tục. Ví dụ $\frac{xy}{x^2+y^2}$: dọc hai trục bằng $0$, nhưng dọc đường $y=x$ bằng $\frac12$.
! Mệnh đề :: $f=(f_1,\dots,f_m):X\to\mathbb R^m$ liên tục khi và chỉ khi mỗi $f_i$ liên tục.
! Phép toán :: $+$, $\times$, $\max$, $\min$ là liên tục từ $\mathbb R^2$; nên tổng, tích của hàm liên tục là liên tục.
? $f(x,y)=\frac{xy}{x^2+y^2}$, $f(0,0)=0$ có liên tục tại gốc?
- Có, vì liên tục theo từng biến
+ Không, dọc $y=x$ hàm luôn bằng $\frac12$
= Liên tục từng biến yếu hơn liên tục.

## 13.3 | Tính liên tục và tính compact | 48
@pre 13.1 12.5
@w extreme k=b
| Hàm liên tục biến tập compact thành tập compact. Từ đó: hàm thực liên tục trên tập compact đạt max/min, và liên tục đều.
! Định lý 2.3.1 :: $f$ liên tục, $K$ compact thì $f(K)$ compact.
! Hệ quả :: $f:K\to\mathbb R$ liên tục thì đạt max và min (nguyên lý cực đại tổng quát).
! Định lý 2.3.5 :: $f$ liên tục trên không gian compact thì liên tục đều.
? Hàm liên tục trên $\{(x,y): x^2+y^2\le1\}$
+ luôn đạt giá trị lớn nhất
- có thể không bị chặn
= Đĩa đóng là đóng và bị chặn trong $\mathbb R^2$, nên compact.

## 13.4 | Tính liên tục và tính liên thông | 51
@pre 13.1
@w ivt k=c
| Không gian **liên thông**: không tách được thành hai tập mở rời nhau, khác rỗng. Trong $\mathbb R$, tập liên thông chính là các khoảng. Hàm liên tục giữ liên thông, đó là bản tổng quát của định lý giá trị trung gian.
! Định nghĩa :: $X$ không liên thông nếu $X=V\cup W$ với $V,W$ mở, rời nhau, khác rỗng.
! Định lý 2.4.6 :: $f$ liên tục, $X$ liên thông thì $f(X)$ liên thông.
! Liên thông đường :: Mọi hai điểm nối được bằng đường liên tục thì liên thông.
? $\mathbb R\setminus\{0\}$ có liên thông?
+ Không, tách thành $(-\infty,0)$ và $(0,\infty)$
- Có
= Hai nửa mở rời nhau.

## 13.5 | Không gian tôpô (Tùy chọn) | 54
@pre 13.4
| Bỏ hẳn khoảng cách, chỉ giữ lại họ các **tập mở**. Hội tụ, liên tục, compact, liên thông đều phát biểu được bằng tập mở.
! Định nghĩa :: Tôpô trên $X$ là họ $\mathcal F$ các tập con chứa $\emptyset, X$, đóng với hợp tuỳ ý và giao hữu hạn.
! Hausdorff :: Hai điểm khác nhau có lân cận rời nhau; khi đó giới hạn là duy nhất.
? Trong tôpô thô $\{\emptyset, X\}$, một dãy hội tụ về
+ mọi điểm
- không điểm nào
- đúng một điểm
= Lân cận duy nhất của mọi điểm là $X$.

# 14 | Hội tụ đều (Uniform Convergence) | 60 | II
> Khi nào giới hạn của dãy hàm còn giữ tính liên tục, khả tích, khả vi.

## 14.1 | Giá trị giới hạn của hàm số | 61
@pre 13.1
| Định nghĩa $\lim_{x\to x_0}f(x)$ cho hàm giữa không gian mêtric, giống trường hợp số thực. Chú ý: phải đổi chỗ được giới hạn mới dùng tiện; chương này nghiên cứu khi nào đổi chỗ được.
! Định nghĩa :: $\lim_{x\to x_0;x\in E}f(x)=L$ nếu $\forall\varepsilon\ \exists\delta$: $x\in E$, $0<d(x,x_0)<\delta\Rightarrow d(f(x),L)<\varepsilon$.
? Giới hạn tại $x_0$ chỉ có nghĩa khi $x_0$
+ là điểm dính của $E$
- thuộc $E$
- là điểm trong
= Phải có điểm của $E$ gần $x_0$ tuỳ ý.

## 14.2 | Hội tụ điểm và hội tụ đều | 64
@pre 14.1
@w uniform
| **Hội tụ điểm**: tại mỗi $x$, dãy số $f_n(x)\to f(x)$; tốc độ được phép khác nhau theo $x$. **Hội tụ đều**: một $N$ dùng chung cho mọi $x$, nghĩa là cuối cùng toàn bộ đồ thị $f_n$ nằm trong dải $\varepsilon$ quanh $f$.
! Hội tụ điểm :: $\forall x\ \forall\varepsilon\ \exists N$: $n\ge N\Rightarrow|f_n(x)-f(x)|<\varepsilon$.
! Hội tụ đều :: $\forall\varepsilon\ \exists N\ \forall x$: $n\ge N\Rightarrow|f_n(x)-f(x)|<\varepsilon$, tức $\sup_x|f_n-f|\to0$.
~ $f_n(x)=x^n$ trên $[0,1]$ hội tụ điểm về hàm bằng $0$ trên $[0,1)$ và $1$ tại $x=1$, nhưng không đều: $\sup|f_n-f|=1$ với mọi $n$.
? $f_n(x)=\frac{\sin(nx)}{n}$ trên $\mathbb R$
+ hội tụ đều về $0$
- chỉ hội tụ điểm
- không hội tụ
= $\sup|f_n|=\frac1n\to0$.

## 14.3 | Hội tụ đều và tính liên tục | 69
@pre 14.2
@w uniform preset=xn
| Giới hạn đều của hàm liên tục là liên tục. Giới hạn điểm thì không: $x^n$ liên tục nhưng giới hạn của nó nhảy tại $1$.
! Định lý 3.3.1 :: $f_n$ liên tục và $f_n\to f$ đều thì $f$ liên tục.
! Hệ quả :: Đổi được giới hạn: $\lim_{x\to x_0}\lim_n f_n(x)=\lim_n\lim_{x\to x_0}f_n(x)$.
? Nếu $f_n$ liên tục hội tụ điểm về hàm không liên tục thì
+ hội tụ đó không đều
- $f_n$ không liên tục
= Phản đảo của định lý.

## 14.4 | Mêtric của hội tụ đều | 72
@pre 14.3 12.4
| Trên tập $C(X\to\mathbb R)$ các hàm liên tục bị chặn, đặt $d_\infty(f,g)=\sup_x|f(x)-g(x)|$. Hội tụ đều chính là hội tụ theo mêtric này, và không gian này **đầy đủ**.
! Định nghĩa :: $d_\infty(f,g)=\sup_{x\in X}|f(x)-g(x)|$.
! Định lý 3.4.5 :: $(C(X),d_\infty)$ là không gian mêtric đầy đủ (với $X$ compact).
? $d_\infty(x, x^2)$ trên $[0,1]$ bằng
+ $\frac14$
- $0$
- $1$
= $\max(x-x^2)$ đạt tại $x=\frac12$.

## 14.5 | Dãy vô hạn của các hàm; Tiêu chuẩn M của Weierstrass | 74
@pre 14.4 7.3
@w uniform preset=mtest
| Chuỗi hàm $\sum f_n$ hội tụ đều khi mỗi $|f_n|$ bị chặn bởi một số $M_n$ và $\sum M_n<\infty$. Đây là cách nhanh nhất kiểm tra hội tụ đều.
! Tiêu chuẩn M :: $\sup_x|f_n(x)|\le M_n$, $\sum M_n<\infty$ thì $\sum f_n$ hội tụ đều.
~ $\sum\frac{\sin(nx)}{n^2}$ hội tụ đều trên $\mathbb R$ với $M_n=\frac1{n^2}$, nên tổng là hàm liên tục.
? Chuỗi $\sum x^n$ trên $[0;0{,}9]$
+ hội tụ đều, với $M_n=0{,}9^n$
- không hội tụ đều
= $\sum 0{,}9^n<\infty$.

## 14.6 | Hội tụ đều và phép tích phân | 81
@pre 14.3 11.4
| Đổi giới hạn với tích phân được khi hội tụ đều trên đoạn bị chặn: $|\int f_n-\int f|\le(b-a)\sup|f_n-f|\to0$. Hội tụ điểm thì không đủ.
! Định lý 3.6.1 :: $f_n$ khả tích Riemann trên $[a,b]$, hội tụ đều về $f$ thì $f$ khả tích và $\int f_n\to\int f$.
~ $f_n=n\,\mathbb 1_{(0,1/n)}$ hội tụ điểm về $0$ nhưng $\int f_n=1$ với mọi $n$.
? Ví dụ $f_n=n\mathbb 1_{(0,1/n)}$ cho thấy
+ hội tụ điểm không đủ để đổi giới hạn và tích phân
- tích phân không tuyến tính
= Khối lượng "dồn" về một điểm.

## 14.7 | Hội tụ đều và đạo hàm | 84
@pre 14.6 10.1
| Hội tụ đều của $f_n$ **không** đảm bảo $f_n'\to f'$: $\frac{\sin(nx)}{\sqrt n}\to0$ đều nhưng đạo hàm $\sqrt n\cos(nx)$ bùng nổ. Cần hội tụ đều của **đạo hàm**.
! Định lý 3.7.1 :: $f_n'$ liên tục, hội tụ đều về $g$, và $f_n(x_0)$ hội tụ tại một điểm thì $f_n$ hội tụ đều về $f$ khả vi với $f'=g$.
! Hệ quả :: Tồn tại hàm liên tục mọi nơi nhưng không khả vi ở đâu (Weierstrass).
? Để đạo hàm từng số hạng của chuỗi hàm, cần
+ chuỗi đạo hàm hội tụ đều
- chuỗi hội tụ điểm
- chuỗi ban đầu hội tụ đều
= Đó là điều kiện của định lý 3.7.1.

## 14.8 | Xấp xỉ đều bằng đa thức | 87
@pre 14.4
@w weierstrass
| Mọi hàm liên tục trên $[a,b]$ đều xấp xỉ được bằng đa thức với sai số đều nhỏ tuỳ ý. Một cách xây dựng cụ thể là đa thức Bernstein; cách trong sách dùng tích chập với đa thức xấp xỉ đồng nhất.
! Định lý xấp xỉ Weierstrass :: $f$ liên tục trên $[a,b]$, $\varepsilon>0$ thì có đa thức $P$ với $\sup|f-P|\le\varepsilon$.
! Đa thức Bernstein :: $B_nf(x)=\sum_{k=0}^n f(\tfrac kn)\binom nk x^k(1-x)^{n-k}$ hội tụ đều về $f$ trên $[0,1]$.
? Hàm $|x-\frac12|$ không khả vi tại $\frac12$. Nó có xấp xỉ đều được bằng đa thức?
+ Có, vì nó liên tục
- Không
= Định lý chỉ cần liên tục.

# 15 | Chuỗi lũy thừa | 95 | II
> Hàm cho bởi chuỗi $\sum c_n(x-a)^n$; hàm mũ, logarit, lượng giác, và số phức.

## 15.1 | Chuỗi lũy thừa hình thức | 95
@pre 14.5 7.5
@w taylor preset=geom k=atan
| Chuỗi $\sum c_n(x-a)^n$ hội tụ trong một khoảng quanh $a$ có **bán kính hội tụ** $R=1/\limsup|c_n|^{1/n}$. Trong $|x-a|<R$ hội tụ tuyệt đối, ngoài thì phân kỳ, trên biên thì phải xét riêng.
! Định nghĩa :: $R=\frac1{\limsup|c_n|^{1/n}}$ (Cauchy–Hadamard).
! Định lý 4.1.6 :: Hội tụ tuyệt đối khi $|x-a|<R$, phân kỳ khi $|x-a|>R$; hội tụ đều trên mọi $[a-r,a+r]$ với $r<R$.
? Bán kính hội tụ của $\sum x^n$ là
+ $1$
- $\infty$
- $0$
= $|c_n|^{1/n}=1$.

## 15.2 | Hàm giải tích thực (Real Analytic Functions) | 98
@pre 15.1
@w taylor k=sqrt
| Hàm **giải tích thực** khi quanh mỗi điểm nó bằng một chuỗi luỹ thừa. Khi đó nó khả vi vô hạn lần và chuỗi chính là chuỗi Taylor $\sum\frac{f^{(n)}(a)}{n!}(x-a)^n$.
! Định lý 4.2.3 :: Chuỗi luỹ thừa khả vi vô hạn lần trong khoảng hội tụ; đạo hàm từng số hạng được.
! Lưu ý :: Khả vi vô hạn lần không kéo theo giải tích: $e^{-1/x^2}$ (bằng $0$ tại $0$) có mọi đạo hàm tại $0$ bằng $0$.
? Chuỗi Taylor của $e^{-1/x^2}$ tại $0$ hội tụ về
+ hàm $0$, khác hàm ban đầu
- chính hàm đó
= Ví dụ hàm trơn nhưng không giải tích.

## 15.3 | Định lý Abel | 104
@pre 15.2
@w taylor preset=log
| Nếu chuỗi luỹ thừa hội tụ tại **biên** $x=a+R$, thì giá trị tại biên bằng giới hạn từ bên trong. Nhờ vậy $1-\frac12+\frac13-\dots=\ln 2$.
! Định lý Abel :: $\sum c_n R^n$ hội tụ thì $\lim_{x\to R^-}\sum c_nx^n=\sum c_nR^n$.
~ $\ln(1+x)=\sum\frac{(-1)^{n+1}x^n}{n}$ với $|x|<1$; cho $x\to1^-$ được $\ln 2=1-\frac12+\frac13-\cdots$.
? Định lý Abel nói về hành vi của chuỗi luỹ thừa ở đâu?
+ tại biên của khoảng hội tụ
- tại tâm
- ngoài khoảng hội tụ
= Liên tục một phía tới biên.

## 15.4 | Nhân các chuỗi lũy thừa (Multiplication of Power Series) | 107
@pre 15.2 8.2
| Tích hai chuỗi luỹ thừa là chuỗi luỹ thừa với hệ số **tích chập**: $c_n=\sum_{k=0}^n a_kb_{n-k}$. Chứng minh dùng Fubini cho chuỗi hội tụ tuyệt đối.
! Định lý 4.4.1 :: $(\sum a_nx^n)(\sum b_nx^n)=\sum c_nx^n$ với $c_n=\sum_{k=0}^na_kb_{n-k}$, trong khoảng hội tụ chung.
~ $\frac1{(1-x)^2}=(\sum x^n)^2=\sum(n+1)x^n$.
? Hệ số $x^2$ của $(1+x+x^2+\dots)^2$ là
+ $3$
- $1$
- $2$
= $c_2=a_0b_2+a_1b_1+a_2b_0$.

## 15.5 | Hàm mũ và hàm logarit | 110
@pre 15.4
@w taylor preset=exp
| Định nghĩa $\exp(x)=\sum\frac{x^n}{n!}$, hội tụ với mọi $x$. Từ chuỗi suy ra $\exp(x+y)=\exp x\exp y$, $\exp'=\exp$. $\ln$ là hàm ngược của $\exp$.
! Định nghĩa :: $\exp(x)=\sum_{n=0}^\infty\frac{x^n}{n!}$, $e=\exp(1)$.
! Tính chất :: $\exp'=\exp$; $\exp(x+y)=\exp(x)\exp(y)$; $\exp(x)=e^x$ theo nghĩa luỹ thừa thực.
! Logarit :: $\ln:(0,\infty)\to\mathbb R$ ngược của $\exp$, $\ln'(x)=1/x$, $\ln(xy)=\ln x+\ln y$.
? Bán kính hội tụ của $\sum\frac{x^n}{n!}$ là
+ $\infty$
- $1$
- $e$
= Tiêu chuẩn tỉ số: $\frac{|x|}{n+1}\to0$.

## 15.6 | Ngoài lề về số phức | 114
@pre 15.5
@w euler
| Số phức $z=a+bi$ là điểm trên mặt phẳng; phép nhân là **quay và co giãn**. Chuỗi $\exp$ dùng được cho số phức, và $e^{i\theta}=\cos\theta+i\sin\theta$ là điểm trên đường tròn đơn vị.
! Định nghĩa :: $\mathbb C=\{a+bi\}$, $i^2=-1$, $|z|=\sqrt{a^2+b^2}$, $\bar z=a-bi$.
! Mệnh đề :: $\mathbb C$ là trường đầy đủ với mêtric $|z-w|$; chuỗi $\exp(z)$ hội tụ tuyệt đối với mọi $z$.
! Euler :: $e^{i\theta}=\cos\theta+i\sin\theta$; $e^{i\pi}+1=0$.
? Nhân với $i$ tương ứng với
+ quay $90^\circ$ ngược chiều kim đồng hồ
- đối xứng qua trục thực
- co về $0$
= $i(a+bi)=-b+ai$.

## 15.7 | Các hàm lượng giác | 122
@pre 15.6
@w euler mode=trig
| Định nghĩa $\cos x=\frac{e^{ix}+e^{-ix}}2$, $\sin x=\frac{e^{ix}-e^{-ix}}{2i}$. Mọi công thức lượng giác suy ra từ $e^{i(x+y)}=e^{ix}e^{iy}$. Số $\pi$ được định nghĩa là nghiệm dương nhỏ nhất của $\sin$.
! Định nghĩa :: $\cos x=\sum\frac{(-1)^nx^{2n}}{(2n)!}$, $\sin x=\sum\frac{(-1)^nx^{2n+1}}{(2n+1)!}$.
! Tính chất :: $\sin^2+\cos^2=1$; $\sin'=\cos$, $\cos'=-\sin$; tuần hoàn chu kỳ $2\pi$.
? Công thức $\cos(x+y)=\cos x\cos y-\sin x\sin y$ suy ra từ
+ phần thực của $e^{i(x+y)}=e^{ix}e^{iy}$
- định lý Pythagoras
= Khai triển tích hai số phức.

# 16 | Chuỗi Fourier | 129 | II
> Phân tích hàm tuần hoàn thành tổng các sóng $e^{2\pi inx}$, như phân tích âm thanh thành các nốt.

## 16.1 | Các hàm tuần hoàn (Periodic Functions) | 130
@pre 15.7
| Xét hàm tuần hoàn chu kỳ $1$: $f(x+1)=f(x)$. Không gian $C(\mathbb R/\mathbb Z;\mathbb C)$ gồm các hàm như vậy, liên tục, giá trị phức. Ví dụ cơ bản: $e_n(x)=e^{2\pi inx}$.
! Định nghĩa :: $f$ chu kỳ $L$ nếu $f(x+L)=f(x)$ với mọi $x$.
! Ví dụ :: $e_n(x)=e^{2\pi i n x}$, $n\in\mathbb Z$; hàm răng cưa $x-\lfloor x\rfloor$ (không liên tục).
? $\sin(2\pi x)$ có chu kỳ
+ $1$
- $2\pi$
- $\pi$
= $\sin(2\pi(x+1))=\sin(2\pi x+2\pi)$.

## 16.2 | Tích vô hướng (Inner Products) trên các hàm tuần hoàn | 132
@pre 16.1
@w inner
| Định nghĩa $\langle f,g\rangle=\int_0^1f\bar g$. Hàm $f,g$ **trực giao** khi $\langle f,g\rangle=0$, như hai vectơ vuông góc. Các sóng $e_n$ đôi một trực giao và có độ dài $1$.
! Định nghĩa :: $\langle f,g\rangle=\int_{[0,1]}f(x)\overline{g(x)}\,dx$, $\|f\|_2=\sqrt{\langle f,f\rangle}$.
! Trực chuẩn :: $\langle e_n,e_m\rangle=1$ nếu $n=m$, $0$ nếu $n\ne m$.
! Cauchy–Schwarz :: $|\langle f,g\rangle|\le\|f\|_2\|g\|_2$; Pythagoras: $f\perp g\Rightarrow\|f+g\|^2=\|f\|^2+\|g\|^2$.
? $\int_0^1\sin(2\pi x)\cos(2\pi x)\,dx$ bằng
+ $0$
- $\frac12$
- $1$
= Hai hàm trực giao.

## 16.3 | Đa thức lượng giác (Trigonometric Polynomials) | 135
@pre 16.2
| Đa thức lượng giác là tổng hữu hạn $\sum_{n=-N}^N c_ne_n$. Hệ số tìm lại được bằng tích vô hướng: $c_n=\langle f,e_n\rangle$, như toạ độ của vectơ theo cơ sở trực chuẩn.
! Định nghĩa :: $\hat f(n)=\langle f,e_n\rangle=\int_0^1f(x)e^{-2\pi inx}dx$ là hệ số Fourier.
! Mệnh đề :: Với $f=\sum c_ne_n$ hữu hạn: $c_n=\hat f(n)$ và $\|f\|_2^2=\sum|c_n|^2$.
? Hệ số Fourier $\hat f(3)$ của $f=2e_1+5e_3$ là
+ $5$
- $2$
- $0$
= Lấy tích vô hướng với $e_3$.

## 16.4 | Tích chập tuần hoàn (Periodic Convolutions) | 138
@pre 16.3
@w convolve
| Tích chập $f*g(x)=\int_0^1f(y)g(x-y)dy$ là **trung bình trượt** của $f$ với trọng số $g$. Nhân chập với một "nhân" nhọn, cao, diện tích $1$ (xấp xỉ đồng nhất) làm mượt $f$ mà vẫn gần $f$.
! Định nghĩa :: $(f*g)(x)=\int_{[0,1]}f(y)g(x-y)\,dy$.
! Tính chất :: $f*g=g*f$; $\widehat{f*g}(n)=\hat f(n)\hat g(n)$; $f*e_n=\hat f(n)e_n$.
! Xấp xỉ đồng nhất :: Nếu $K_N$ không âm, tích phân $1$, dồn về $0$ thì $f*K_N\to f$ đều với $f$ liên tục.
? Tích chập với nhân càng hẹp thì $f*K$
+ càng gần $f$
- càng mượt và xa $f$
= Trung bình trên vùng nhỏ hơn.

## 16.5 | Các định lý Fourier và Plancherel (The Fourier and Plancherel Theorems) | 143
@pre 16.4
@w fourier
| Hàm liên tục tuần hoàn được xấp xỉ bởi tổng Fourier riêng theo chuẩn $L^2$, và năng lượng bảo toàn: $\|f\|_2^2=\sum|\hat f(n)|^2$. Với hàm có bước nhảy, tổng riêng luôn vọt lố khoảng 9% gần chỗ nhảy (hiện tượng Gibbs).
! Định lý Fourier :: $f$ liên tục, tuần hoàn thì $\|f-\sum_{|n|\le N}\hat f(n)e_n\|_2\to0$.
! Plancherel :: $\|f\|_2^2=\sum_{n\in\mathbb Z}|\hat f(n)|^2$.
! Fejér :: Trung bình Cesàro của tổng riêng hội tụ đều về $f$ liên tục.
? Thêm nhiều số hạng vào tổng Fourier của sóng vuông thì đỉnh vọt lố gần chỗ nhảy
+ hẹp lại nhưng không thấp đi (~9%)
- biến mất
- cao lên mãi
= Hiện tượng Gibbs: hội tụ theo $L^2$ nhưng không đều.

# 17 | Giải tích vi phân nhiều biến | 149 | II
> Đạo hàm của $f:\mathbb R^n\to\mathbb R^m$ là một ánh xạ tuyến tính; định lý hàm ngược và hàm ẩn.

## 17.1 | Các phép biến đổi tuyến tính | 149
@w linmap
| Ánh xạ tuyến tính $T:\mathbb R^n\to\mathbb R^m$ giữ phép cộng và nhân vô hướng; nó tương ứng với một ma trận $m\times n$. Nó biến lưới vuông thành lưới hình bình hành, và định thức là hệ số co giãn diện tích (có dấu).
! Định nghĩa :: $T(x+y)=Tx+Ty$, $T(cx)=cTx$.
! Ma trận :: Cột thứ $j$ của ma trận là $T(e_j)$; hợp thành tương ứng với nhân ma trận.
! Định thức :: $|\det T|$ là tỉ lệ diện tích; $T$ khả nghịch khi và chỉ khi $\det T\ne0$.
? Ma trận $\begin{pmatrix}2&0\\0&3\end{pmatrix}$ biến hình vuông đơn vị thành hình có diện tích
+ $6$
- $5$
- $1$
= $\det=6$.

## 17.2 | Đạo hàm trong Giải tích nhiều biến | 155
@pre 17.1 10.1
@w surface k=wave
| $f$ khả vi tại $x_0$ khi gần $x_0$ nó xấp xỉ được bởi một ánh xạ tuyến tính: $f(x)\approx f(x_0)+f'(x_0)(x-x_0)$ với sai số $o(\|x-x_0\|)$. Hình học: mặt cong có **mặt phẳng tiếp xúc**.
! Định nghĩa :: $f'(x_0)$ là ánh xạ tuyến tính $L$ với $\lim_{x\to x_0}\frac{\|f(x)-f(x_0)-L(x-x_0)\|}{\|x-x_0\|}=0$.
! Mệnh đề :: Đạo hàm (nếu có) là duy nhất; khả vi kéo theo liên tục.
? Đạo hàm của $f:\mathbb R^2\to\mathbb R$ tại một điểm là
+ một ánh xạ tuyến tính $\mathbb R^2\to\mathbb R$ (một vectơ hàng)
- một số
- một ma trận $2\times2$
= Ma trận Jacobian cỡ $1\times2$.

## 17.3 | Đạo hàm riêng và đạo hàm theo hướng | 159
@pre 17.2
@w surface mode=dir k=wave
| Đạo hàm theo hướng $v$: tốc độ thay đổi của $f$ khi đi theo $v$. Đạo hàm riêng là đạo hàm theo hướng các trục. Gradient $\nabla f$ chỉ hướng tăng nhanh nhất, và $D_vf=\nabla f\cdot v$ khi $f$ khả vi.
! Định nghĩa :: $D_vf(x_0)=\lim_{t\to0^+}\frac{f(x_0+tv)-f(x_0)}t$; $\frac{\partial f}{\partial x_j}=D_{e_j}f$.
! Định lý 6.3.8 :: Nếu các đạo hàm riêng tồn tại và **liên tục** gần $x_0$ thì $f$ khả vi tại $x_0$.
! Gradient :: $\nabla f=(\partial_1f,\dots,\partial_nf)$, $D_vf=\nabla f\cdot v$.
? Có đủ mọi đạo hàm riêng tại một điểm thì $f$ khả vi?
- Có
+ Không nhất thiết, ví dụ $\frac{xy}{x^2+y^2}$ tại gốc
= Cần thêm điều kiện liên tục của các đạo hàm riêng.

## 17.4 | Quy tắc chuỗi trong Giải tích nhiều biến | 166
@pre 17.3
| Đạo hàm của hợp thành là **hợp thành của các đạo hàm**: $(g\circ f)'(x_0)=g'(f(x_0))\circ f'(x_0)$, tức nhân các ma trận Jacobian.
! Quy tắc chuỗi :: $(g\circ f)'(x_0)=g'(f(x_0))\,f'(x_0)$.
! Hệ quả :: $\frac{d}{dt}f(x(t),y(t))=\partial_xf\,x'(t)+\partial_yf\,y'(t)$.
? Với $f(x,y)=x^2+y^2$ và $(x,y)=(\cos t,\sin t)$, $\frac{d}{dt}f$ bằng
+ $0$
- $2$
- $2t$
= $f\equiv1$ trên đường tròn; cũng ra $2x(-\sin t)+2y\cos t=0$.

## 17.5 | Đạo hàm bậc hai và Định lý Clairaut | 168
@pre 17.4
@w surface preset=saddle
| Đạo hàm riêng hỗn hợp $\partial_x\partial_y f$ và $\partial_y\partial_x f$ bằng nhau khi chúng liên tục. Ma trận các đạo hàm bậc hai (Hessian) cho biết mặt cong lồi, lõm hay yên ngựa.
! Định lý Clairaut :: $f$ có đạo hàm riêng cấp hai liên tục thì $\partial_i\partial_jf=\partial_j\partial_if$.
! Hessian :: Tại điểm dừng, Hessian xác định dương thì cực tiểu, xác định âm thì cực đại, có trị riêng trái dấu thì điểm yên ngựa.
? $f=x^2-y^2$ tại gốc là
+ điểm yên ngựa
- cực tiểu
- cực đại
= Tăng theo $x$, giảm theo $y$.

## 17.6 | Định lý ánh xạ co | 171
@pre 12.4
@w contraction
| Ánh xạ **co** kéo mọi cặp điểm lại gần nhau theo tỉ lệ $c<1$. Trên không gian đầy đủ, lặp lại ánh xạ từ bất kỳ điểm nào cũng hội tụ về **điểm bất động duy nhất**.
! Định nghĩa :: $f$ là ánh xạ co nếu $d(f(x),f(y))\le c\,d(x,y)$ với $c<1$.
! Định lý 6.6.4 (Banach) :: $X$ đầy đủ khác rỗng, $f$ co thì có duy nhất $x^*$ với $f(x^*)=x^*$, và $f^n(x_0)\to x^*$ với mọi $x_0$.
~ $\cos$ trên $[0,1]$ là ánh xạ co; lặp $\cos$ từ bất kỳ đâu hội tụ về $0{,}739\ldots$
? Vì sao cần không gian đầy đủ?
+ Dãy lặp là Cauchy; cần đầy đủ để nó có giới hạn
- Để ánh xạ liên tục
= Ví dụ $f(x)=x/2$ trên $(0,1]$ không có điểm bất động.

## 17.7 | Định lý hàm ngược trong giải tích nhiều biến | 173
@pre 17.6 17.4
@w linmap mode=local
| Nếu $f'(x_0)$ là ánh xạ tuyến tính khả nghịch, thì **gần $x_0$** $f$ cũng khả nghịch, vì phóng to đủ gần, $f$ trông như chính phép tuyến tính đó. Chứng minh dùng định lý ánh xạ co.
! Định lý hàm ngược :: $f$ khả vi liên tục, $f'(x_0)$ khả nghịch thì có lân cận $U\ni x_0$, $V\ni f(x_0)$ với $f:U\to V$ song ánh, $f^{-1}$ khả vi và $(f^{-1})'(f(x_0))=f'(x_0)^{-1}$.
? Định lý chỉ đảm bảo khả nghịch
+ địa phương, gần $x_0$
- trên toàn không gian
= $(r,\theta)\mapsto(r\cos\theta,r\sin\theta)$ khả nghịch địa phương nhưng không đơn ánh toàn cục.

## 17.8 | Định lý hàm ẩn (The Implicit Function Theorem) | 178
@pre 17.7
@w implicit
| Đường cong $F(x,y)=0$ nhìn gần một điểm là **đồ thị** $y=g(x)$ khi $\partial_yF\ne0$ (tiếp tuyến không thẳng đứng). Tại các điểm $\partial_yF=0$ đường cong có thể quay đầu hoặc tự cắt.
! Định lý hàm ẩn :: $F$ khả vi liên tục, $F(x_0,y_0)=0$, $\partial_yF(x_0,y_0)\ne0$ thì gần đó $\{F=0\}$ là đồ thị của $y=g(x)$ khả vi, với $g'=-\frac{\partial_xF}{\partial_yF}$.
? Trên đường tròn $x^2+y^2=1$, điểm nào **không** viết được $y=g(x)$ địa phương?
+ $(\pm1,0)$
- $(0,\pm1)$
= Tại đó $\partial_yF=2y=0$, tiếp tuyến thẳng đứng.

# 18 | Độ đo Lebesgue | 184 | II
> Gán "thể tích" cho càng nhiều tập càng tốt, kể cả tập rất lộn xộn như $\mathbb Q$.

## 18.1 | Mục tiêu: Độ đo Lebesgue | 185
@pre 12.5
| Ta muốn một hàm $m$ gán thể tích cho tập con $\mathbb R^n$ với các tính chất tự nhiên: hộp có thể tích bằng tích các cạnh, cộng tính đếm được với tập rời nhau, bất biến tịnh tiến. Hoá ra không thể làm điều đó với **mọi** tập, nên phải giới hạn ở các tập đo được.
! Mục tiêu :: $m(\emptyset)=0$; $m(A)\le m(B)$ khi $A\subseteq B$; $m(\bigcup A_j)=\sum m(A_j)$ khi rời nhau; $m(x+A)=m(A)$; $m([0,1]^n)=1$.
? Độ đo mong muốn có cộng tính
+ đếm được
- tuỳ ý (không đếm được)
- chỉ hữu hạn
= Cộng tính không đếm được sẽ cho $m([0,1])=\sum_x m(\{x\})=0$.

## 18.2 | Nỗ lực đầu tiên: Độ đo ngoài (Outer Measure) | 187
@pre 18.1
@w cover
| Độ đo ngoài $m^*(A)$: phủ $A$ bằng đếm được hộp, lấy tổng thể tích, rồi lấy **inf** trên mọi cách phủ. Vì phủ được từng điểm bằng hộp tí hon với tổng tuỳ ý nhỏ, mọi tập đếm được (như $\mathbb Q$) có độ đo ngoài $0$.
! Định nghĩa :: $m^*(\Omega)=\inf\{\sum_j|B_j|: \Omega\subseteq\bigcup_jB_j\}$ với $B_j$ là hộp mở.
! Mệnh đề :: $m^*$ đơn điệu, cộng tính dưới đếm được, bất biến tịnh tiến; $m^*$ của hộp đóng là thể tích của nó.
! Hệ quả :: Tập đếm được có $m^*=0$; $\mathbb R$ không đếm được.
? $m^*(\mathbb Q\cap[0,1])$ bằng
+ $0$
- $1$
- không xác định
= Phủ $q_j$ bằng khoảng dài $\varepsilon/2^j$, tổng $\le\varepsilon$.

## 18.3 | Độ đo ngoài không có tính chất cộng tính | 196
@pre 18.2 8.4
| Dùng tiên đề lựa chọn, xây tập Vitali $V\subseteq[0,1]$ chứa đúng một đại diện của mỗi lớp $x+\mathbb Q$. Các bản tịnh tiến hữu tỉ của $V$ rời nhau và phủ $[0,1]$, nên nếu $m^*$ cộng tính thì $1\le\sum m^*(V)\le 3$, vô lý.
! Mệnh đề :: Có các tập rời nhau $A,B$ với $m^*(A\cup B)\ne m^*(A)+m^*(B)$.
! Bài học :: Phải hạn chế ở lớp tập "đo được" để có cộng tính.
? Xây dựng tập Vitali cần
+ tiên đề lựa chọn
- chỉ tiên đề Peano
- định lý Fourier
= Phải chọn một đại diện từ mỗi trong không đếm được lớp tương đương.

## 18.4 | Các tập đo được (Measurable Sets) | 199
@pre 18.3
| Tập $E$ **đo được** (Carathéodory) khi nó cắt mọi tập $A$ "sạch sẽ": $m^*(A)=m^*(A\cap E)+m^*(A\setminus E)$. Lớp tập đo được đóng với phần bù, hợp và giao đếm được ($\sigma$-đại số), và trên đó $m^*$ cộng tính đếm được.
! Định nghĩa :: $E$ đo được nếu $m^*(A)=m^*(A\cap E)+m^*(A\setminus E)$ với mọi $A$.
! Định lý :: Tập mở, đóng, hộp, tập độ đo ngoài $0$ đều đo được; tập đo được tạo thành $\sigma$-đại số; $m$ cộng tính đếm được trên đó.
! Hội tụ đơn điệu :: $E_1\subseteq E_2\subseteq\dots$ thì $m(\bigcup E_j)=\lim m(E_j)$.
? Tập các số vô tỉ trong $[0,1]$ có độ đo
+ $1$
- $0$
- không đo được
= $m([0,1])-m(\mathbb Q\cap[0,1])=1-0$.

## 18.5 | Hàm đo được | 205
@pre 18.4
| $f$ **đo được** khi ảnh ngược của mọi tập mở là đo được, tương đương $\{f>a\}$ đo được với mọi $a$. Hàm liên tục, đơn điệu, giới hạn điểm của hàm đo được đều đo được.
! Định nghĩa :: $f:\Omega\to\mathbb R$ đo được nếu $f^{-1}(V)$ đo được với mọi $V$ mở.
! Mệnh đề :: $f$ đo được khi và chỉ khi $\{x: f(x)>a\}$ đo được với mọi $a$; $\sup f_n$, $\liminf f_n$, $\lim f_n$ của hàm đo được là đo được.
? Hàm Dirichlet $\mathbb 1_{\mathbb Q}$ có đo được?
+ Có, $\{f>a\}$ là $\emptyset$, $\mathbb Q$ hoặc $\mathbb R$
- Không
= Mọi tập này đều đo được.

# 19 | Tích phân Lebesgue | 208 | II
> Thay vì chia trục hoành, chia trục tung. Tích phân mạnh hơn và đổi giới hạn dễ hơn.

## 19.1 | Các hàm đơn giản (Simple Functions) | 208
@pre 18.5
@w simplefn
| Hàm **đơn giản** chỉ nhận hữu hạn giá trị, mỗi giá trị trên một tập đo được. Tích phân của nó là $\sum c_j m(E_j)$. Mọi hàm đo được không âm là giới hạn tăng của các hàm đơn giản: cắt trục tung thành bậc $2^{-n}$.
! Định nghĩa :: $f=\sum_{j=1}^Nc_j\mathbb 1_{E_j}$, $\int f=\sum c_jm(E_j)$ (với $c_j\ge0$).
! Bổ đề 8.1.4 :: $f\ge0$ đo được thì có hàm đơn giản $0\le f_1\le f_2\le\dots$ với $f_n\to f$ điểm.
? Tích phân của $\mathbb 1_{\mathbb Q\cap[0,1]}$ là
+ $0$
- $1$
- không xác định
= $1\cdot m(\mathbb Q\cap[0,1])=0$.

## 19.2 | Tích phân của các hàm đo được không âm | 215
@pre 19.1
@w lebesgue
| $\int f=\sup\{\int s: s\text{ đơn giản}, 0\le s\le f\}$. Hai định lý mạnh: **hội tụ đơn điệu** (dãy tăng thì đổi được giới hạn và tích phân) và **bổ đề Fatou**.
! Định nghĩa :: $\int_\Omega f=\sup\{\int s: 0\le s\le f, s \text{ đơn giản}\}$.
! Hội tụ đơn điệu :: $0\le f_1\le f_2\le\dots$, $f_n\to f$ thì $\int f_n\to\int f$.
! Fatou :: $\int\liminf f_n\le\liminf\int f_n$ với $f_n\ge0$.
! Hệ quả :: $\int\sum f_n=\sum\int f_n$ với $f_n\ge0$.
? Hội tụ đơn điệu cần
+ dãy không âm, tăng
- hội tụ đều
- bị chặn
= Không cần hội tụ đều, khác với tích phân Riemann.

## 19.3 | Tích phân của các hàm khả tích tuyệt đối | 223
@pre 19.2
| Với $f$ có dấu, viết $f=f^+-f^-$ và đặt $\int f=\int f^+-\int f^-$ khi $\int|f|<\infty$. Định lý **hội tụ bị chặn** (Lebesgue) là công cụ đổi giới hạn chủ lực.
! Định nghĩa :: $f$ khả tích tuyệt đối nếu $\int|f|<\infty$; $\int f=\int f^+-\int f^-$.
! Hội tụ bị chặn :: $f_n\to f$ điểm, $|f_n|\le F$ với $\int F<\infty$ thì $\int f_n\to\int f$.
~ $f_n=n\mathbb 1_{(0,1/n)}$ không bị chặn bởi hàm khả tích nào, và quả thật $\int f_n=1\not\to0$.
? Định lý hội tụ bị chặn cần
+ một hàm khả tích $F$ trội mọi $|f_n|$
- $f_n$ liên tục
- $f_n$ tăng
= Đó là điều kiện "bị chặn".

## 19.4 | So sánh với tích phân Riemann | 228
@pre 19.3 11.7
@w lebesgue mode=compare
| Hàm khả tích Riemann thì khả tích Lebesgue với cùng giá trị. Chiều ngược lại sai: hàm Dirichlet khả tích Lebesgue (tích phân $0$) nhưng không khả tích Riemann.
! Định lý 8.4.1 :: $f$ khả tích Riemann trên $I$ thì khả tích Lebesgue và hai tích phân bằng nhau.
! Ghi chú :: Riemann chia **miền xác định**, Lebesgue chia **miền giá trị**.
? Hàm $\mathbb 1_{\mathbb Q}$ trên $[0,1]$
+ khả tích Lebesgue, tích phân $0$
- khả tích Riemann
- không khả tích theo nghĩa nào
= Tập $\mathbb Q$ có độ đo $0$.

## 19.5 | Định lý Fubini | 230
@pre 19.3 8.2
@w fubini
| Tích phân kép trên hình chữ nhật có thể tính bằng cách lấy tích phân theo $y$ trước rồi theo $x$, hoặc ngược lại, **khi hàm khả tích tuyệt đối**. Nếu không, hai thứ tự có thể cho kết quả khác nhau.
! Định lý Fubini :: $f$ khả tích tuyệt đối trên $\mathbb R^2$ thì $\int_{\mathbb R^2}f=\int(\int f(x,y)dy)dx=\int(\int f(x,y)dx)dy$.
! Tonelli :: Với $f\ge0$ đo được, đổi thứ tự luôn được (có thể bằng $+\infty$).
? Fubini và Fubini cho chuỗi (Chương 8) có điều kiện chung là
+ hội tụ / khả tích tuyệt đối
- hàm liên tục
= Cùng một bài học: tuyệt đối thì đổi thứ tự được.
`;
