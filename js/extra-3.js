/* Bổ sung Chương 8–9. */
(window.EXTRA = window.EXTRA || []).push(String.raw`
## 8.1
~ Tập số chẵn $2\mathbb N$ đếm được qua $n\mapsto2n$: một tập con thực sự có cùng lực lượng với $\mathbb N$.
~ $\mathbb N\times\mathbb N$ đếm được qua $(n,m)\mapsto 2^n(2m+1)-1$ (song ánh lên $\mathbb N$).
~ Hợp đếm được của các tập đếm được là đếm được (dùng $\mathbb N\times\mathbb N$, và tiên đề lựa chọn để chọn các song ánh).
? Tập các số nguyên tố
+ đếm được
- hữu hạn
- không đếm được
= Là tập con vô hạn của $\mathbb N$.
? Tập các đa thức hệ số nguyên
+ đếm được
- không đếm được
= Mỗi bậc là đếm được (giống $\mathbb Z^{n+1}$), hợp đếm được của chúng là đếm được.
? Nếu có toàn ánh $\mathbb N\to X$ thì $X$
+ hữu hạn hoặc đếm được
- không đếm được
- luôn hữu hạn
= Chọn mỗi $x$ một nghịch ảnh nhỏ nhất được đơn ánh $X\to\mathbb N$.
? $\mathbb Z$ và $\mathbb N$
+ có cùng lực lượng
- $\mathbb Z$ "lớn gấp đôi"
= Song ánh $0,1,-1,2,-2,\dots$
& Viết công thức một song ánh $f:\mathbb N\to\mathbb Z$.
&> $f(n)=\frac n2$ nếu $n$ chẵn, $f(n)=-\frac{n+1}2$ nếu $n$ lẻ. Cho dãy $0,-1,1,-2,2,\dots$
&> Đơn ánh: chẵn cho số $\ge0$ khác nhau, lẻ cho số $<0$ khác nhau, hai nhóm rời nhau. Toàn ánh: $k\ge0$ là $f(2k)$, $k<0$ là $f(-2k-1)$.
& Chứng minh mọi tập con vô hạn $X\subseteq\mathbb N$ đều đếm được.
&> Định nghĩa đệ quy: $a_0=\min X$, $a_{n+1}=\min\{x\in X: x>a_n\}$ (tồn tại vì $X$ vô hạn; dùng nguyên lý sắp tốt).
&> $n\mapsto a_n$ tăng ngặt nên đơn ánh. Toàn ánh: mọi $x\in X$ có hữu hạn phần tử của $X$ nhỏ hơn nó, giả sử $k$ phần tử, thì $x=a_k$.

## 8.2
~ $\sum_{n,m\ge1}\frac1{2^n3^m}=\left(\sum\frac1{2^n}\right)\left(\sum\frac1{3^m}\right)=1\cdot\frac12$.
~ Tổng trên $\mathbb Z$: $\sum_{n\in\mathbb Z}\frac1{2^{|n|}}=1+2\sum_{n\ge1}\frac1{2^n}=3$.
? Với $f\ge0$ trên tập đếm được $X$, $\sum_{x\in X}f(x)$
+ luôn có nghĩa (có thể $=+\infty$) và không phụ thuộc cách đánh số
- phụ thuộc cách đánh số
= Định nghĩa bằng sup các tổng hữu hạn.
? $\sum_{x\in X}f(x)$ với $f$ có dấu có nghĩa khi
+ $\sum|f(x)|<\infty$
- $f(x)\to0$
- $X$ hữu hạn
= Hội tụ tuyệt đối mới không phụ thuộc thứ tự.
? Tổng của $\frac1{nm}$ trên mọi $n,m\ge1$
+ $=+\infty$
- hữu hạn
= $\sum_n\frac1n\cdot\sum_m\frac1m$, mỗi chuỗi phân kỳ.
& Tính $\sum_{n\ge1}\sum_{m\ge1}\frac{1}{(n+m)!}$... gợi ý: nhóm theo $k=n+m$.
&> Với mỗi $k\ge2$ có $k-1$ cặp $(n,m)$ với $n+m=k$. Vì mọi số hạng dương, đổi thứ tự hợp lệ.
&> Tổng $=\sum_{k\ge2}\frac{k-1}{k!}=\sum_{k\ge2}\left(\frac1{(k-1)!}-\frac1{k!}\right)=1$ (tổng lồng).
& Giải thích vì sao bảng $a_{n,n}=1$, $a_{n,n+1}=-1$ không thoả điều kiện Fubini.
&> $\sum_{n,m}|a_{n,m}|$ đếm mỗi $\pm1$ một lần, có vô hạn số $1$, nên $=+\infty$. Không hội tụ tuyệt đối.

## 8.3
~ Khoảng $(0,1)$ không đếm được, và có cùng lực lượng với $\mathbb R$ qua $x\mapsto\tan(\pi(x-\frac12))$.
~ Tập số vô tỉ không đếm được: nếu nó đếm được thì $\mathbb R=\mathbb Q\cup(\mathbb R\setminus\mathbb Q)$ đếm được.
~ Tập số siêu việt (không là nghiệm của đa thức hệ số nguyên) không đếm được; tập số đại số thì đếm được.
? Tập các dãy $0/1$ có cùng lực lượng với
+ $2^{\mathbb N}$ và với $\mathbb R$
- $\mathbb N$
- $\mathbb Q$
= Mỗi dãy là hàm chỉ thị của một tập con của $\mathbb N$.
? Định lý Cantor nói rằng với **mọi** tập $X$
+ không có toàn ánh $X\to2^X$
- $|X|=|2^X|$
- $2^X$ đếm được
= Cả với tập hữu hạn: $2^n>n$.
? Hợp của một tập đếm được và một tập không đếm được là
+ không đếm được
- đếm được
= Nó chứa một tập không đếm được.
& Chứng minh định lý Cantor: không có toàn ánh $f:X\to2^X$.
&> Đặt $A=\{x\in X: x\notin f(x)\}$. Nếu $A=f(a)$ với $a$ nào đó thì: $a\in A\iff a\notin f(a)=A$. Mâu thuẫn.
&> Đây là lập luận đường chéo dưới dạng tập hợp.
& Chứng minh $[0,1]$ không đếm được bằng các đoạn lồng nhau.
&> Giả sử $[0,1]=\{x_1,x_2,\dots\}$. Chọn đoạn $I_1\subseteq[0,1]$ không chứa $x_1$ (chia ba, chọn đoạn ngoài cùng không chứa $x_1$), rồi $I_2\subseteq I_1$ không chứa $x_2$, …
&> Giao các đoạn lồng nhau khác rỗng (tính đầy đủ), chứa một điểm khác mọi $x_n$. Mâu thuẫn.

## 8.4
~ Không cần tiên đề lựa chọn: chọn số nhỏ nhất từ mỗi tập con khác rỗng của $\mathbb N$; chọn trung điểm từ mỗi đoạn $[a,b]$.
~ Cần tiên đề lựa chọn: chọn một đại diện từ mỗi lớp $x+\mathbb Q$ trong $\mathbb R$ (tập Vitali, mục 18.3).
? Tiên đề lựa chọn tương đương với
+ Bổ đề Zorn và nguyên lý sắp tốt
- Tiên đề quy nạp
- Tính Archimedes
= Ba phát biểu tương đương trong ZF.
? Chọn một phần tử từ **một** tập khác rỗng
+ không cần tiên đề lựa chọn
- cần tiên đề lựa chọn
= Chỉ là quy tắc suy luận "tồn tại thì đặt tên".
? Hệ quả lạ của tiên đề lựa chọn là
+ có tập con của $\mathbb R$ không đo được
- $\mathbb N$ không đếm được
- $\mathbb R$ đếm được
= Xem tập Vitali.
& Dùng tiên đề lựa chọn chứng minh: nếu $g:X\to Y$ toàn ánh thì có $h:Y\to X$ với $g\circ h=\mathrm{id}_Y$.
&> Với mỗi $y$, $g^{-1}(\{y\})\ne\emptyset$. Theo tiên đề lựa chọn có hàm $h$ chọn $h(y)\in g^{-1}(\{y\})$.
&> Khi đó $g(h(y))=y$. Hệ quả: $h$ đơn ánh, nên $|Y|\le|X|$.
& Vì sao "mọi dãy Cauchy hữu tỉ có giới hạn thực" không cần tiên đề lựa chọn, còn "hợp đếm được của tập đếm được là đếm được" thì cần?
&> Giới hạn được **định nghĩa** trực tiếp là lớp tương đương, không phải chọn gì.
&> Với hợp đếm được, ta phải **chọn** đồng thời một song ánh cho mỗi tập trong vô hạn tập, và không có cách chọn "chuẩn".

## 8.5
~ $(2^X,\subseteq)$ là thứ tự bộ phận; $(\mathbb R,\le)$ là thứ tự toàn phần; $(\mathbb N,\le)$ là sắp tốt.
~ Thứ tự từ điển trên $\mathbb N\times\mathbb N$: $(a,b)<(c,d)$ khi $a<c$, hoặc $a=c$ và $b<d$. Đây là sắp tốt.
~ Ứng dụng Zorn: mọi không gian vectơ có cơ sở.
? Quan hệ "$a$ chia hết $b$" trên $\{1,2,3,4,6,12\}$ là
+ thứ tự bộ phận, không toàn phần ($4$ và $6$ không so sánh được)
- thứ tự toàn phần
- không phải thứ tự
= Phản xạ, phản đối xứng, bắc cầu đều đúng.
? Phần tử tối đại khác phần tử lớn nhất ở chỗ
+ tối đại: không có phần tử lớn hơn nó; lớn nhất: lớn hơn mọi phần tử
- không khác nhau
= Trong thứ tự bộ phận có thể có nhiều phần tử tối đại.
? $\mathbb Q_{\ge0}$ với thứ tự thông thường có sắp tốt?
+ Không, $\{x>0\}$ không có phần tử nhỏ nhất
- Có
= Sắp tốt rất hạn chế với số thực/hữu tỉ.
& Chứng minh mọi tập sắp tốt $X$ là thứ tự toàn phần.
&> Với $a,b\in X$, tập $\{a,b\}$ có phần tử nhỏ nhất, chẳng hạn $a$; khi đó $a\le b$. Vậy mọi cặp so sánh được.
& Trong $(2^{\{1,2,3\}}\setminus\{\{1,2,3\}\},\subseteq)$, liệt kê các phần tử tối đại.
&> Các tập hai phần tử: $\{1,2\},\{1,3\},\{2,3\}$. Không tập nào chứa thực sự chúng (vì đã bỏ $\{1,2,3\}$).
&> Có ba phần tử tối đại nhưng không có phần tử lớn nhất.

## 9.1
~ Bao đóng của $\mathbb Q$ là $\mathbb R$; bao đóng của $\mathbb Z$ là $\mathbb Z$ (tập đóng).
~ $\{\frac1n: n\ge1\}$ không đóng, bao đóng là $\{\frac1n\}\cup\{0\}$; $0$ là điểm giới hạn duy nhất.
~ $(0,1)$: mọi điểm là điểm giới hạn của tập, không có điểm cô lập.
? $\mathbb Z$ có điểm giới hạn nào không?
+ Không, mọi điểm của $\mathbb Z$ đều cô lập
- Có, mọi số nguyên
= Quanh mỗi $n$ có khoảng $(n-\frac12,n+\frac12)$ không chứa số nguyên khác.
? Tập nào vừa đóng vừa bị chặn?
+ $[0,1]\cup\{2\}$
- $(0,1]$
- $[0,\infty)$
= $(0,1]$ không đóng; $[0,\infty)$ không bị chặn.
? Hợp của vô hạn tập đóng
+ có thể không đóng, ví dụ $\bigcup[\frac1n,1]=(0,1]$
- luôn đóng
= Chỉ hợp hữu hạn tập đóng mới chắc đóng.
? $x$ dính vào $X$ khi và chỉ khi
+ có dãy trong $X$ hội tụ về $x$
- $x\in X$
- $x$ là điểm cô lập
= Đặc trưng dãy của bao đóng.
& Chứng minh $\overline{(a,b)}=[a,b]$.
&> $a$ dính: dãy $a+\frac{b-a}{2n}\in(a,b)$ hội tụ về $a$. Tương tự $b$. Mọi điểm của $(a,b)$ dính.
&> Nếu $x>b$, khoảng $(b,x+1)$ quanh $x$ với bán kính $x-b$ không chạm $(a,b)$. Tương tự $x<a$. Vậy bao đóng là $[a,b]$.
& Chứng minh: $X$ đóng khi và chỉ khi giới hạn của mọi dãy hội tụ trong $X$ đều thuộc $X$.
&> Giới hạn của dãy trong $X$ là điểm dính của $X$. Nếu $X$ đóng, nó thuộc $X$.
&> Ngược lại, mọi điểm dính là giới hạn của dãy trong $X$ (chọn $x_n\in X$, $|x_n-x|\le\frac1n$), nên thuộc $X$.

## 9.2
~ $f(x)=x^2$, $g(x)=\sin x$: $(fg)(x)=x^2\sin x$, $(f\circ g)(x)=\sin^2x$, $(g\circ f)(x)=\sin(x^2)$.
~ $\max(f,g)=\frac{f+g+|f-g|}{2}$: hàm max có thể viết qua cộng và trị tuyệt đối.
? Miền xác định của $\frac{f}{g}$ là
+ các $x$ với $g(x)\ne0$
- mọi $x$
- các $x$ với $f(x)\ne0$
= Không chia cho $0$.
? $\min(f,g)$ bằng
+ $\frac{f+g-|f-g|}{2}$
- $\frac{f+g+|f-g|}{2}$
- $f\cdot g$
= Thử với $f>g$: $\frac{f+g-(f-g)}2=g$.
? $f(x)=x+1$, $g(x)=2x$. $(g\circ f)(x)$ bằng
+ $2x+2$
- $2x+1$
- $2x^2+2x$
= $g(f(x))=2(x+1)$.
& Tìm $f,g$ sao cho $f\circ g\ne g\circ f$.
&> $f(x)=x^2$, $g(x)=x+1$: $(f\circ g)(x)=(x+1)^2$, $(g\circ f)(x)=x^2+1$. Tại $x=1$: $4\ne2$.
& Chứng minh $\max(f,g)=\frac{f+g+|f-g|}2$.
&> Tại mỗi $x$: nếu $f(x)\ge g(x)$ thì $|f-g|=f-g$, vế phải $=\frac{2f}{2}=f=\max$. Trường hợp ngược lại tương tự cho $g$.

## 9.3
~ $\lim_{x\to2}(x^2+1)=5$: chọn $\delta=\min(1,\varepsilon/5)$ vì $|x^2-4|=|x-2||x+2|\le5|x-2|$ khi $|x-2|\le1$.
~ $\lim_{x\to0}\frac{|x|}{x}$ không tồn tại: dãy $\frac1n\to0$ cho $1$, dãy $-\frac1n$ cho $-1$.
~ $\lim_{x\to0}x\sin\frac1x=0$ dù $\sin\frac1x$ không có giới hạn.
? $\lim_{x\to 3}\frac{x^2-9}{x-3}$ bằng
+ $6$
- $0$
- không tồn tại
= Rút gọn $x+3$ khi $x\ne3$.
? Để chứng minh $\lim_{x\to x_0}f(x)$ **không** tồn tại, cách nhanh nhất là
+ tìm hai dãy $\to x_0$ cho hai giới hạn khác nhau
- vẽ đồ thị
- tính $f(x_0)$
= Đặc trưng dãy.
? Nếu $f(x)\le g(x)$ gần $x_0$ và cả hai có giới hạn thì
+ $\lim f\le\lim g$
- $\lim f<\lim g$
= Bất đẳng thức không ngặt giữ qua giới hạn.
? $\lim_{x\to0}\frac{\sin(5x)}{x}$ bằng
+ $5$
- $1$
- $0$
= $\frac{\sin5x}{5x}\cdot5$.
& Chứng minh từ định nghĩa: $\lim_{x\to 1}(3x+2)=5$.
&> $|f(x)-5|=|3x-3|=3|x-1|$. Cho $\varepsilon$, chọn $\delta=\varepsilon/3$.
&> Khi $|x-1|<\delta$: $|f(x)-5|<3\delta=\varepsilon$.
& Chứng minh $\lim_{x\to0}\sin\frac1x$ không tồn tại.
&> Dãy $x_n=\frac1{2\pi n}\to0$ cho $\sin\frac1{x_n}=0$. Dãy $y_n=\frac1{2\pi n+\pi/2}\to0$ cho $\sin\frac1{y_n}=1$.
&> Hai giới hạn khác nhau nên giới hạn hàm không tồn tại.

## 9.4
~ Đa thức, $\sin$, $\cos$, $e^x$, $|x|$ liên tục trên $\mathbb R$; $\frac1x$ liên tục trên $\mathbb R\setminus\{0\}$.
~ Hàm Dirichlet $\mathbb 1_{\mathbb Q}$ gián đoạn tại **mọi** điểm.
~ Hàm Thomae ($f(\frac pq)=\frac1q$ với phân số tối giản, $f=0$ tại số vô tỉ) liên tục tại mọi số vô tỉ, gián đoạn tại mọi số hữu tỉ.
? $f(x)=x\cdot\mathbb 1_{\mathbb Q}(x)$ liên tục tại
+ đúng một điểm $x=0$
- mọi điểm
- không điểm nào
= $|f(x)|\le|x|$ cho liên tục tại $0$; ở chỗ khác hàm nhảy giữa $0$ và $x$.
? Nếu $f$ liên tục tại $x_0$ và $f(x_0)>0$ thì
+ $f>0$ trên một khoảng quanh $x_0$
- $f>0$ mọi nơi
- không kết luận được
= Chọn $\varepsilon=f(x_0)/2$.
? $f(x)=\frac{x^2-1}{x-1}$ với $f(1)=2$ là
+ liên tục tại $1$
- gián đoạn tại $1$
= Đã "khử" gián đoạn bằng giá trị đúng.
? Hợp thành $g\circ f$ liên tục tại $x_0$ khi
+ $f$ liên tục tại $x_0$ và $g$ liên tục tại $f(x_0)$
- chỉ cần $g$ liên tục
- chỉ cần $f$ liên tục
= Mệnh đề 9.4.13.
& Chứng minh $f(x)=x^2$ liên tục tại mọi $x_0$.
&> $|x^2-x_0^2|=|x-x_0||x+x_0|$. Nếu $|x-x_0|\le1$ thì $|x+x_0|\le2|x_0|+1$.
&> Chọn $\delta=\min\left(1,\frac{\varepsilon}{2|x_0|+1}\right)$; khi $|x-x_0|<\delta$ thì $|x^2-x_0^2|<\varepsilon$.
& Chứng minh hàm Dirichlet gián đoạn tại mọi $x_0$.
&> Chọn $\varepsilon=\frac12$. Mọi khoảng $(x_0-\delta,x_0+\delta)$ chứa cả số hữu tỉ và vô tỉ, nên chứa $x$ với $|f(x)-f(x_0)|=1>\varepsilon$.

## 9.5
~ $f(x)=\lfloor x\rfloor$ tại $x=2$: $f(2^-)=1$, $f(2^+)=2=f(2)$; liên tục phải, không liên tục trái.
~ $f(x)=\frac1x$ tại $0$: $f(0^+)=+\infty$, $f(0^-)=-\infty$ (trong $\mathbb R^*$); gián đoạn loại hai.
? $f$ liên tục tại $x_0$ khi và chỉ khi
+ $f(x_0^-)=f(x_0^+)=f(x_0)$
- $f(x_0^-)=f(x_0^+)$
- $f(x_0)$ xác định
= Cần cả ba bằng nhau.
? Hàm $f(x)=\frac{\sin x}{|x|}$ tại $0$ có
+ $f(0^+)=1$, $f(0^-)=-1$: gián đoạn nhảy
- giới hạn bằng $1$
- gián đoạn khử được
= Phía trái $|x|=-x$.
? Gián đoạn khử được là khi
+ giới hạn tồn tại nhưng khác $f(x_0)$ (hoặc $f(x_0)$ không xác định)
- hai giới hạn một phía khác nhau
= Định nghĩa lại $f(x_0)$ là xong.
& Phân loại gián đoạn của $f(x)=\frac{x^2-4}{x-2}$ tại $2$ và $g(x)=\frac{|x-2|}{x-2}$ tại $2$.
&> $f$: khi $x\ne2$, $f(x)=x+2\to4$. Hai giới hạn một phía bằng $4$; $f(2)$ không xác định, nên gián đoạn khử được.
&> $g$: $g=1$ khi $x>2$, $g=-1$ khi $x<2$. $g(2^+)=1\ne-1=g(2^-)$: gián đoạn nhảy.
& Chứng minh: $f$ tăng trên $(a,b)$ thì $f(x_0^-)$ tồn tại và bằng $\sup_{x<x_0}f(x)$.
&> Đặt $L=\sup\{f(x): a<x<x_0\}$ (hữu hạn vì bị chặn bởi $f(x_0)$). Cho $\varepsilon$, có $x_1<x_0$ với $f(x_1)>L-\varepsilon$.
&> Với $x_1<x<x_0$: $L-\varepsilon<f(x_1)\le f(x)\le L$. Chọn $\delta=x_0-x_1$.

## 9.6
~ $f(x)=x^3-3x$ trên $[-2,2]$: max $=2$ tại $x=-1$ và $x=2$; min $=-2$ tại $x=1$ và $x=-2$.
~ $f(x)=\sin\frac1x$ trên $(0,1]$ bị chặn, đạt max $1$, nhưng không liên tục trên đoạn đóng nào chứa $0$.
? $f(x)=\frac1{1+x^2}$ trên $\mathbb R$
+ đạt max $1$ tại $0$, không đạt min (inf $=0$)
- đạt cả max và min
- không bị chặn
= $\mathbb R$ không bị chặn, nên định lý không áp dụng cho min.
? Định lý cực đại cần đủ các điều kiện
+ $f$ liên tục và miền là đoạn đóng, bị chặn
- $f$ khả vi
- $f$ đơn điệu
= Đóng và bị chặn chính là compact trong $\mathbb R$.
? Hàm liên tục trên $[0,1]$ có thể không bị chặn?
- Có
+ Không
= Bổ đề 9.6.3.
& Chứng minh: $f$ liên tục trên $[a,b]$ thì bị chặn.
&> Giả sử không: với mỗi $n$ có $x_n\in[a,b]$, $|f(x_n)|>n$.
&> Theo Bolzano–Weierstrass, có dãy con $x_{n_k}\to x\in[a,b]$ (đoạn đóng). Do liên tục $f(x_{n_k})\to f(x)$, bị chặn, mâu thuẫn $|f(x_{n_k})|>n_k\to\infty$.
& Chứng minh $f$ đạt max trên $[a,b]$.
&> $M=\sup f$ hữu hạn (bị chặn). Có $x_n$ với $f(x_n)>M-\frac1n$.
&> Dãy con $x_{n_k}\to x^*\in[a,b]$; liên tục cho $f(x^*)=\lim f(x_{n_k})=M$.

## 9.7
~ Mọi đa thức bậc lẻ có nghiệm thực: $p(x)\to\pm\infty$ ngược dấu ở hai đầu.
~ Có số $x$ với $\cos x=x$: $g(x)=\cos x-x$ có $g(0)=1>0$, $g(1)<0$.
~ Định lý điểm bất động: $f:[0,1]\to[0,1]$ liên tục thì có $c$ với $f(c)=c$.
? Hàm $f(x)=\frac1x$ trên $[-1,1]\setminus\{0\}$ có $f(-1)=-1$, $f(1)=1$ nhưng không có nghiệm. Vì sao không mâu thuẫn định lý?
+ Miền không phải một đoạn (thủng tại $0$)
- $f$ không đơn điệu
= Định lý cần $f$ liên tục trên cả đoạn.
? Ảnh của $[0,\pi]$ qua $\sin$ là
+ $[0,1]$
- $[-1,1]$
- $(0,1)$
= Max $1$, min $0$, và mọi giá trị ở giữa.
? Nếu $f$ liên tục trên $[a,b]$ và $f(a)f(b)<0$ thì
+ có nghiệm trong $(a,b)$
- có đúng một nghiệm
- không có nghiệm
= Hai giá trị trái dấu.
& Chứng minh định lý điểm bất động trên $[0,1]$.
&> Đặt $g(x)=f(x)-x$, liên tục. $g(0)=f(0)\ge0$, $g(1)=f(1)-1\le0$.
&> Theo giá trị trung gian, có $c$ với $g(c)=0$, tức $f(c)=c$.
& Chứng minh $x^3+x-1=0$ có đúng một nghiệm thực.
&> Tồn tại: $p(0)=-1<0$, $p(1)=1>0$, có nghiệm trong $(0,1)$.
&> Duy nhất: $p$ tăng ngặt (tổng hai hàm tăng ngặt $x^3$ và $x$), nên không nhận một giá trị hai lần.

## 9.8
~ $f(x)=x+\lfloor x\rfloor$ tăng ngặt nhưng gián đoạn tại mọi số nguyên; ảnh của nó có "lỗ hổng".
~ $\arcsin:[-1,1]\to[-\frac\pi2,\frac\pi2]$ là hàm ngược liên tục của $\sin$ hạn chế.
? Hàm đơn điệu trên $[a,b]$ có tối đa bao nhiêu điểm gián đoạn?
+ Đếm được
- Hữu hạn
- Không đếm được
= Mỗi bước nhảy chứa một số hữu tỉ riêng.
? Hàm liên tục, đơn ánh trên một khoảng thì
+ đơn điệu ngặt
- có thể không đơn điệu
= Hệ quả của định lý giá trị trung gian.
? $f(x)=x^2$ trên $[-1,1]$ có hàm ngược không?
+ Không, vì không đơn ánh
- Có, là $\sqrt x$
= Phải hạn chế lên $[0,1]$.
& Chứng minh: $f$ liên tục và tăng ngặt trên $[a,b]$ thì $f([a,b])=[f(a),f(b)]$.
&> Tăng nên $f(a)\le f(x)\le f(b)$. Mọi $y$ giữa $f(a)$ và $f(b)$ là $f(c)$ theo giá trị trung gian.
& Chứng minh hàm ngược $f^{-1}$ ở trên tăng ngặt.
&> Nếu $y<y'$ mà $f^{-1}(y)\ge f^{-1}(y')$ thì áp dụng $f$ tăng: $y\ge y'$, mâu thuẫn.

## 9.9
~ $f(x)=\sin x$ liên tục đều trên $\mathbb R$: $|\sin x-\sin y|\le|x-y|$, chọn $\delta=\varepsilon$.
~ Hàm Lipschitz ($|f(x)-f(y)|\le L|x-y|$) luôn liên tục đều với $\delta=\varepsilon/L$.
~ $\sin(x^2)$ liên tục nhưng không liên tục đều trên $\mathbb R$: dao động ngày càng nhanh.
? $f(x)=\sqrt x$ trên $[0,\infty)$
+ liên tục đều (dù không Lipschitz gần $0$)
- không liên tục đều
= $|\sqrt x-\sqrt y|\le\sqrt{|x-y|}$; chọn $\delta=\varepsilon^2$.
? $f(x)=\frac1x$ trên $[1,\infty)$
+ liên tục đều
- không liên tục đều
= $|f'(x)|\le1$ nên Lipschitz với hằng số $1$.
? Liên tục đều biến dãy Cauchy thành
+ dãy Cauchy
- dãy hội tụ
- dãy đơn điệu
= $\frac1x$ trên $(0,1)$ biến dãy Cauchy $\frac1n$ thành dãy $n$ không Cauchy, nên không liên tục đều.
? Hàm liên tục trên $(0,1)$ có thác triển liên tục lên $[0,1]$ khi và chỉ khi
+ nó liên tục đều
- nó bị chặn
- nó đơn điệu
= Liên tục đều cho giới hạn tồn tại tại hai đầu.
& Chứng minh $f(x)=x^2$ liên tục đều trên $[0,5]$ và tìm một $\delta$ cụ thể.
&> $|x^2-y^2|=|x-y||x+y|\le10|x-y|$ với $x,y\in[0,5]$.
&> Chọn $\delta=\varepsilon/10$.
& Chứng minh $f(x)=\frac1x$ không liên tục đều trên $(0,1)$.
&> Chọn $\varepsilon=1$. Với mọi $\delta$, lấy $x=\frac1n$, $y=\frac1{n+1}$ với $n$ đủ lớn để $|x-y|=\frac1{n(n+1)}<\delta$.
&> Khi đó $|f(x)-f(y)|=|n-(n+1)|=1\ge\varepsilon$. Không $\delta$ nào dùng chung được.

## 9.10
~ $\lim_{x\to+\infty}\frac{3x^2+x}{x^2-1}=3$; $\lim_{x\to-\infty}e^x=0$.
~ $\lim_{x\to\infty}\left(\sqrt{x^2+x}-x\right)=\frac12$ (nhân liên hợp).
? $\lim_{x\to\infty}\frac{\ln x}{x}$ bằng
+ $0$
- $1$
- $\infty$
= Logarit tăng chậm hơn mọi luỹ thừa dương.
? $\lim_{x\to\infty}x\sin\frac1x$ bằng
+ $1$
- $0$
- không tồn tại
= Đặt $t=\frac1x\to0^+$: $\frac{\sin t}{t}\to1$.
? $\lim_{x\to\infty}f(x)=L$ khi và chỉ khi với mọi dãy $x_n\to\infty$
+ $f(x_n)\to L$
- $f(x_n)$ bị chặn
= Đặc trưng dãy.
& Tính $\lim_{x\to\infty}\left(\sqrt{x^2+x}-x\right)$.
&> Nhân liên hợp: $\sqrt{x^2+x}-x=\frac{x}{\sqrt{x^2+x}+x}=\frac{1}{\sqrt{1+1/x}+1}$.
&> Khi $x\to\infty$, mẫu $\to2$, giới hạn $\frac12$.
& Chứng minh $\lim_{x\to\infty}\frac{\sin x}{x}=0$.
&> $\left|\frac{\sin x}{x}\right|\le\frac1x$. Cho $\varepsilon$, chọn $M=\frac1\varepsilon$; với $x>M$: $\left|\frac{\sin x}x\right|<\varepsilon$.
`);
