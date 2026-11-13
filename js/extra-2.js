/* Bổ sung Chương 5–7. */
(window.EXTRA = window.EXTRA || []).push(String.raw`
## 5.1
~ $a_n=\frac{1}{n^2}$ là Cauchy: với $j,k\ge N$, $|a_j-a_k|\le\max(a_j,a_k)\le\frac1{N^2}$.
~ $a_n=\sqrt n$ không Cauchy (trong $\mathbb R$): các số hạng tăng mãi. Dù $a_{n+1}-a_n\to0$, khoảng cách $a_{4n}-a_n=\sqrt n$ không nhỏ đi.
~ Dãy tổng riêng $1+\frac12+\cdots+\frac1n$ có hiệu liên tiếp $\to0$ nhưng không Cauchy: $a_{2n}-a_n\ge\frac12$.
? Điều kiện $|a_{n+1}-a_n|\to0$ có đủ để $(a_n)$ là Cauchy?
- Có
+ Không, ví dụ $a_n=\sqrt n$
= Cauchy đòi hỏi mọi cặp số hạng xa nhau tuỳ ý đều gần nhau, không chỉ các số hạng liền kề.
? Dãy hằng $a_n=c$ là Cauchy với $N$ bằng
+ $1$, với mọi $\varepsilon$
- phụ thuộc $\varepsilon$
- không có
= $|a_j-a_k|=0\le\varepsilon$ luôn đúng.
? Nếu $(a_n)$ Cauchy thì $(2a_n+1)$
+ cũng Cauchy
- có thể không Cauchy
= $|(2a_j+1)-(2a_k+1)|=2|a_j-a_k|$; dùng $\varepsilon/2$.
? Mệnh đề "mọi dãy Cauchy bị chặn" dùng ý chính nào?
+ Đuôi dãy nằm trong khoảng hẹp quanh $a_N$, còn đầu dãy chỉ có hữu hạn số hạng
- Dãy Cauchy tăng
- Dãy Cauchy hội tụ
= Chọn $\varepsilon=1$; mọi $n\ge N$ có $|a_n|\le|a_N|+1$; lấy max với $N$ số hạng đầu.
& Chứng minh $a_n=\frac{1}{n}$ là dãy Cauchy (theo định nghĩa).
&> Cho $\varepsilon>0$. Chọn $N$ nguyên với $N>1/\varepsilon$ (tính Archimedes).
&> Với $j,k\ge N$: $|a_j-a_k|=\left|\frac1j-\frac1k\right|\le\max\left(\frac1j,\frac1k\right)\le\frac1N<\varepsilon$.
& Chứng minh $a_n=(-1)^n$ không là dãy Cauchy.
&> Chọn $\varepsilon=1$. Với mọi $N$, lấy $j=N$, $k=N+1$: $|a_j-a_k|=2>1$.
&> Vậy không có $N$ nào làm đuôi dãy $1$-ổn định.
& Chứng minh: tổng của hai dãy Cauchy là dãy Cauchy.
&> Cho $\varepsilon>0$; chọn $N_1$ cho $(a_n)$ với $\varepsilon/2$, $N_2$ cho $(b_n)$ với $\varepsilon/2$, đặt $N=\max(N_1,N_2)$.
&> Với $j,k\ge N$: $|(a_j+b_j)-(a_k+b_k)|\le|a_j-a_k|+|b_j-b_k|\le\varepsilon$.

## 5.2
~ $a_n=\frac1n$ và $b_n=0$ tương đương: cùng đại diện số thực $0$.
~ $a_n=1$ và $b_n=1+\frac{(-1)^n}{n}$ tương đương.
? Quan hệ "tương đương" giữa các dãy Cauchy có tính
+ phản xạ, đối xứng, bắc cầu
- chỉ đối xứng
- không bắc cầu
= Bắc cầu dùng bất đẳng thức tam giác với $\varepsilon/2$.
? Nếu $(a_n)$ tương đương $(b_n)$ và $(a_n)$ Cauchy thì $(b_n)$
+ cũng Cauchy
- có thể không
= $|b_j-b_k|\le|b_j-a_j|+|a_j-a_k|+|a_k-b_k|$.
? Hai dãy chỉ khác nhau ở 1000 số hạng đầu thì
+ tương đương
- không tương đương
= Từ chỉ số 1001 hiệu bằng $0$.
& Chứng minh $a_n=1+10^{-n}$ và $b_n=1$ tương đương.
&> $|a_n-b_n|=10^{-n}\le\frac1n$. Cho $\varepsilon>0$, chọn $N>1/\varepsilon$; với $n\ge N$: $|a_n-b_n|\le\varepsilon$.
& Chứng minh tính bắc cầu: $(a_n)\sim(b_n)$, $(b_n)\sim(c_n)$ thì $(a_n)\sim(c_n)$.
&> Cho $\varepsilon$, chọn $N$ để $|a_n-b_n|\le\varepsilon/2$ và $|b_n-c_n|\le\varepsilon/2$ khi $n\ge N$.
&> Khi đó $|a_n-c_n|\le\varepsilon$.

## 5.3
~ Số thực $\frac13=\mathrm{LIM}(0{,}3;\ 0{,}33;\ 0{,}333;\dots)=\mathrm{LIM}\ \tfrac13$ (dãy hằng).
~ $\mathrm{LIM}(1+\frac1n)\cdot\mathrm{LIM}(2-\frac1n)=\mathrm{LIM}((1+\frac1n)(2-\frac1n))=2$.
~ Đại diện "tách khỏi 0": $\mathrm{LIM}(\frac1n+1)$ có $|a_n|\ge1$, dùng được để định nghĩa nghịch đảo.
? Vì sao định nghĩa $x^{-1}$ cần dãy "tách khỏi 0"?
+ Vì đại diện có thể có số hạng bằng $0$, không chia được
- Vì số thực âm không có nghịch đảo
- Không cần điều kiện gì
= Ví dụ $x=\mathrm{LIM}\,a_n$ với $a_1=0$, $a_n=1$ khi $n\ge2$; phải bỏ số hạng $0$.
? $\mathrm{LIM}\,a_n=0$ khi và chỉ khi
+ $(a_n)$ tương đương với dãy hằng $0$, tức $a_n\to0$
- $a_n=0$ với mọi $n$
- $a_1=0$
= Theo định nghĩa bằng nhau của số thực.
? Tính chất nào chứng minh $\mathbb R$ là trường?
+ Phép toán thực hiện trên từng số hạng, các luật đại số kế thừa từ $\mathbb Q$
- $\mathbb R$ đếm được
- Mọi số thực đều hữu tỉ
= Ví dụ giao hoán: $\mathrm{LIM}\,a_n+\mathrm{LIM}\,b_n=\mathrm{LIM}(a_n+b_n)=\mathrm{LIM}(b_n+a_n)$.
& Chứng minh: nếu $(a_n),(b_n)$ Cauchy thì $(a_nb_n)$ Cauchy.
&> Cả hai bị chặn: $|a_n|\le A$, $|b_n|\le B$.
&> $|a_jb_j-a_kb_k|\le|a_j||b_j-b_k|+|b_k||a_j-a_k|\le A|b_j-b_k|+B|a_j-a_k|$.
&> Chọn $N$ để $|b_j-b_k|\le\frac{\varepsilon}{2A}$ và $|a_j-a_k|\le\frac\varepsilon{2B}$, ta được $\le\varepsilon$.
& Chứng minh: nếu $x=\mathrm{LIM}\,a_n\ne0$ thì có dãy tương đương $(b_n)$ với $|b_n|\ge c>0$ với mọi $n$.
&> Vì $x\ne0$, $(a_n)$ không tương đương $0$: có $\varepsilon_0$ sao cho $|a_n|>\varepsilon_0$ vô hạn lần. Do Cauchy, từ $N$ nào đó $|a_j-a_k|\le\varepsilon_0/2$, nên với $n\ge N$: $|a_n|\ge\varepsilon_0/2$.
&> Đặt $b_n=\varepsilon_0$ với $n<N$, $b_n=a_n$ với $n\ge N$; chọn $c=\varepsilon_0/2$.

## 5.4
~ $\sqrt2>1{,}41$ vì $\sqrt2-1{,}41=\mathrm{LIM}(a_n-1{,}41)$ với $a_n$ là thập phân của $\sqrt2$, và $a_n-1{,}41\ge0{,}004$ từ $n=3$.
~ Giữa $\sqrt2$ và $1{,}5$ có số hữu tỉ $1{,}45$.
? Nếu $x<y$ và $z>0$ thì
+ $xz<yz$
- $xz>yz$
- $xz=yz$
= Nhân với số dương giữ thứ tự.
? $\mathbb Q$ trù mật trong $\mathbb R$ nghĩa là
+ giữa hai số thực khác nhau luôn có số hữu tỉ
- mọi số thực là hữu tỉ
- $\mathbb Q$ đóng với giới hạn
= Mệnh đề 5.4.14.
? Nếu $|x|\le\frac1n$ với mọi $n$ thì
+ $x=0$
- $x>0$ rất nhỏ
- không kết luận được
= Không có "vô cùng bé" khác $0$ trong $\mathbb R$ (tính Archimedes).
? Giữa hai số thực khác nhau có
+ vô hạn số hữu tỉ và vô hạn số vô tỉ
- chỉ số hữu tỉ
- hữu hạn số
= Cả $\mathbb Q$ và $\mathbb R\setminus\mathbb Q$ đều trù mật.
& Chứng minh tính Archimedes: với $x>0$ và $\varepsilon>0$ thực, có $n$ với $n\varepsilon>x$.
&> $x/\varepsilon$ là số thực dương, có đại diện Cauchy bị chặn bởi một số hữu tỉ $M$.
&> Chọn $n$ nguyên $>M$, thì $n>x/\varepsilon$, tức $n\varepsilon>x$.
& Chứng minh: giữa $x<y$ thực có số vô tỉ.
&> Áp dụng trù mật của $\mathbb Q$ cho $x/\sqrt2<y/\sqrt2$: có $q$ hữu tỉ, $q\ne0$ (chọn được $q\ne0$) nằm giữa.
&> Khi đó $q\sqrt2$ vô tỉ và $x<q\sqrt2<y$.

## 5.5
~ $\sup[0,1)=1\notin[0,1)$; $\sup[0,1]=1\in[0,1]$.
~ $\inf\{\frac1n: n\ge1\}=0$, không đạt.
~ $\sup\{x: x^2<3\}=\sqrt3$; tập này bị chặn trên bởi $2$.
? $\sup\{\sin n: n\in\mathbb N\}$ bằng
+ $1$
- $\sin 1$
- không tồn tại
= Các giá trị $\sin n$ tiến sát $1$ tuỳ ý (nhưng không bằng).
? Nếu $A\subseteq B$ bị chặn trên, khác rỗng thì
+ $\sup A\le\sup B$
- $\sup A\ge\sup B$
- $\sup A=\sup B$
= Mọi cận trên của $B$ là cận trên của $A$.
? $\sup(A+B)$ với $A+B=\{a+b\}$ bằng
+ $\sup A+\sup B$
- $\sup A\cdot\sup B$
- $\max(\sup A,\sup B)$
= Chứng minh bằng đặc trưng $\varepsilon$ của sup.
? $\inf E$ liên hệ với $\sup$ thế nào?
+ $\inf E=-\sup(-E)$
- $\inf E=\sup E$
- $\inf E=1/\sup E$
= Lật dấu biến cận dưới thành cận trên.
& Tìm $\sup$ và $\inf$ của $E=\{\frac{n}{n+1}: n\ge1\}$ và chứng minh.
&> $\inf E=\frac12$ đạt tại $n=1$ vì $\frac{n}{n+1}$ tăng.
&> $\sup E=1$: mọi phần tử $<1$, nên $1$ là cận trên. Với $\varepsilon>0$, chọn $n>\frac1\varepsilon$, thì $\frac{n}{n+1}=1-\frac1{n+1}>1-\varepsilon$. Vậy không có cận trên nào nhỏ hơn $1$.
& Chứng minh: tồn tại $x>0$ với $x^2=2$.
&> Đặt $E=\{y\ge0: y^2<2\}$, khác rỗng ($1\in E$), bị chặn bởi $2$. Đặt $x=\sup E$, $1\le x\le2$.
&> Nếu $x^2<2$: chọn $\varepsilon$ nhỏ để $(x+\varepsilon)^2\le x^2+5\varepsilon<2$, nên $x+\varepsilon\in E$, mâu thuẫn $x$ là cận trên.
&> Nếu $x^2>2$: chọn $\varepsilon$ nhỏ để $(x-\varepsilon)^2\ge x^2-4\varepsilon>2$; khi đó $x-\varepsilon$ cũng là cận trên, mâu thuẫn tính nhỏ nhất. Vậy $x^2=2$.

## 5.6
~ $27^{1/3}=3$ vì $3^3=27$ và $y\mapsto y^3$ tăng ngặt trên $[0,\infty)$.
~ $(4^{1/2})^3=2^3=8=4^{3/2}=(4^3)^{1/2}=64^{1/2}$.
~ $x^{1/n}$ tăng theo $x$: nếu $x<x'$ thì $x^{1/n}<x'^{1/n}$.
? $16^{-3/4}$ bằng
+ $\frac18$
- $-8$
- $12$
= $16^{1/4}=2$, $2^3=8$, nghịch đảo $\frac18$.
? Vì sao cần chứng minh $x^{p/q}$ không phụ thuộc cách viết phân số?
+ Vì $\frac{2}{4}=\frac12$ nhưng định nghĩa dùng $p,q$ cụ thể
- Vì luỹ thừa không xác định
= Cần $(x^{1/4})^2=(x^{1/2})^1$.
? Với $0<x<1$ và $q<r$ hữu tỉ thì
+ $x^q>x^r$
- $x^q<x^r$
- $x^q=x^r$
= Cơ số nhỏ hơn $1$ làm luỹ thừa giảm theo số mũ.
& Chứng minh $(x^{1/n})^{1/m}=x^{1/(nm)}$ với $x>0$.
&> Đặt $y=(x^{1/n})^{1/m}$. Khi đó $y^m=x^{1/n}$, nên $y^{nm}=(y^m)^n=x$.
&> Vì căn bậc $nm$ dương là duy nhất, $y=x^{1/(nm)}$.
& Chứng minh $x^{1/n}$ là duy nhất: nếu $y,y'>0$ và $y^n=y'^n$ thì $y=y'$.
&> Nếu $y<y'$ thì $y^n<y'^n$ (nhân bất đẳng thức dương $n$ lần). Tương tự nếu $y>y'$. Vậy $y=y'$.

## 6.1
~ $\frac{3n^2+1}{n^2+5}\to3$: chia tử và mẫu cho $n^2$, rồi dùng quy tắc giới hạn với $\frac1{n^2}\to0$.
~ $\sqrt{n+1}-\sqrt n=\frac{1}{\sqrt{n+1}+\sqrt n}\to0$.
~ Nếu $a_n\to a$ thì $|a_n|\to|a|$, vì $\big||a_n|-|a|\big|\le|a_n-a|$. Chiều ngược sai: $(-1)^n$.
? $\lim\frac{2n+3}{5n-1}$ bằng
+ $\frac25$
- $\frac35$
- $0$
= Chia tử và mẫu cho $n$.
? Nếu $a_n\to0$ và $(b_n)$ bị chặn thì $a_nb_n$
+ $\to0$
- có thể không hội tụ
- $\to$ giới hạn của $b_n$
= $|a_nb_n|\le M|a_n|\to0$. Ví dụ $\frac{\sin n}{n}\to0$.
? Dãy hội tụ thì
+ bị chặn
- đơn điệu
- dương
= Vì hội tụ kéo theo Cauchy, và Cauchy kéo theo bị chặn.
? Nếu $a_n\to L$ và $a_n\le 5$ với mọi $n$ thì
+ $L\le5$
- $L<5$
- $L=5$
= Bất đẳng thức không ngặt giữ qua giới hạn.
? $\lim\frac{n}{2^n}$ bằng
+ $0$
- $\frac12$
- $\infty$
= Hàm mũ lớn nhanh hơn đa thức.
& Chứng minh trực tiếp từ định nghĩa: $\frac{n}{n+1}\to1$.
&> $\left|\frac{n}{n+1}-1\right|=\frac{1}{n+1}$. Cho $\varepsilon>0$, chọn $N>\frac1\varepsilon$.
&> Với $n\ge N$: $\frac1{n+1}<\frac1N<\varepsilon$.
& Chứng minh: nếu $a_n\to a$ và $b_n\to b$ thì $a_n+b_n\to a+b$.
&> Cho $\varepsilon$. Chọn $N_1$ để $|a_n-a|\le\varepsilon/2$ khi $n\ge N_1$, $N_2$ tương tự cho $b_n$.
&> Với $n\ge\max(N_1,N_2)$: $|(a_n+b_n)-(a+b)|\le|a_n-a|+|b_n-b|\le\varepsilon$.
& Chứng minh giới hạn là duy nhất.
&> Giả sử $a_n\to L$ và $a_n\to L'$ với $L\ne L'$. Đặt $\varepsilon=|L-L'|/3$.
&> Từ $N$ nào đó $|a_n-L|\le\varepsilon$ và $|a_n-L'|\le\varepsilon$, nên $|L-L'|\le2\varepsilon<|L-L'|$, vô lý.

## 6.2
~ $\sup\mathbb N=+\infty$, $\inf\mathbb Z=-\infty$, $\sup(0,1)=1$.
~ $1+(+\infty)=+\infty$, $(-2)\cdot(+\infty)=-\infty$, nhưng $(+\infty)+(-\infty)$ không xác định.
? Trong $\mathbb R^*$, $\inf\emptyset$ là
+ $+\infty$
- $-\infty$
- $0$
= Mọi phần tử là cận dưới của $\emptyset$; lớn nhất là $+\infty$.
? $-(+\infty)$ bằng
+ $-\infty$
- $0$
- không xác định
= Phép đổi dấu được định nghĩa trên $\mathbb R^*$.
? Dãy $a_n=n^2$ trong $\mathbb R^*$
+ có $\sup=+\infty$
- không có sup
- có $\sup$ hữu hạn
= Trong $\mathbb R^*$, mọi tập đều có sup.
& Chứng minh: với $E\subseteq\mathbb R^*$, $\sup E\ge\inf E$ khi $E\ne\emptyset$.
&> Lấy $x\in E$. Khi đó $\inf E\le x\le\sup E$.
&> (Với $E=\emptyset$ thì ngược lại: $\sup\emptyset=-\infty<+\infty=\inf\emptyset$.)

## 6.3
~ $a_n=1-\frac1{n^2}$ tăng, bị chặn bởi $1$, nên hội tụ về $\sup=1$.
~ Dãy $a_1=1$, $a_{n+1}=\sqrt{2+a_n}$ tăng và bị chặn bởi $2$, nên hội tụ; giới hạn $L$ thoả $L=\sqrt{2+L}$, tức $L=2$.
~ Dãy giảm bị chặn dưới hội tụ về $\inf$.
? Dãy $a_n=\left(1+\frac1n\right)^n$
+ tăng và bị chặn, nên hội tụ (về $e$)
- giảm
- không bị chặn
= Chứng minh tăng bằng bất đẳng thức AM–GM hoặc khai triển nhị thức.
? Dãy tăng, không bị chặn trên thì
+ $\to+\infty$
- hội tụ
- dao động
= Trong $\mathbb R^*$ giới hạn là $\sup=+\infty$.
? Dãy đơn điệu hội tụ khi và chỉ khi
+ nó bị chặn
- nó dương
- hiệu liên tiếp $\to0$
= Định lý hội tụ đơn điệu.
? Dãy $a_{n+1}=\frac{a_n}{2}+1$, $a_1=0$ hội tụ về
+ $2$
- $1$
- $0$
= $L=\frac L2+1$ cho $L=2$; dãy tăng, bị chặn bởi $2$.
& Chứng minh dãy $a_1=1$, $a_{n+1}=\sqrt{2+a_n}$ hội tụ và tìm giới hạn.
&> **Bị chặn bởi 2** (quy nạp): $a_1=1<2$; nếu $a_n<2$ thì $a_{n+1}<\sqrt4=2$.
&> **Tăng**: $a_{n+1}^2-a_n^2=2+a_n-a_n^2=(2-a_n)(1+a_n)>0$.
&> Theo hội tụ đơn điệu, $a_n\to L$. Qua giới hạn $L^2=2+L$, $L\ge1$, nên $L=2$.
& Chứng minh hội tụ đơn điệu: $(a_n)$ tăng, bị chặn trên thì $a_n\to\sup a_n$.
&> Đặt $L=\sup a_n$. Cho $\varepsilon$; vì $L-\varepsilon$ không là cận trên, có $N$ với $a_N>L-\varepsilon$.
&> Với $n\ge N$: $L-\varepsilon<a_N\le a_n\le L$, nên $|a_n-L|<\varepsilon$.

## 6.4
~ $a_n=\sin\frac{n\pi}{2}$: $0,1,0,-1,\dots$ có ba điểm giới hạn $-1,0,1$; $\limsup=1$, $\liminf=-1$.
~ $a_n=n(-1)^n$: $\limsup=+\infty$, $\liminf=-\infty$.
~ Kẹp: $\frac{-1}{n}\le\frac{\cos n}{n}\le\frac1n$ nên $\frac{\cos n}{n}\to0$.
? Với $a_n=1+\frac{(-1)^n}{n}$, $\limsup a_n$ bằng
+ $1$
- $\frac32$
- $2$
= Dãy hội tụ về $1$ nên $\limsup=\liminf=1$; $\sup a_n=\frac32$ (tại $n=2$) thì khác.
? Luôn có
+ $\inf a_n\le\liminf a_n\le\limsup a_n\le\sup a_n$
- $\limsup a_n\le\liminf a_n$
- $\limsup a_n=\sup a_n$
= Cận đuôi nằm giữa cận toàn bộ.
? $\limsup(a_n+b_n)$ so với $\limsup a_n+\limsup b_n$ là
+ $\le$
- $\ge$
- $=$
= Có thể ngặt: $a_n=(-1)^n$, $b_n=-(-1)^n$.
? $c$ là điểm giới hạn của $(a_n)$ khi
+ với mọi $\varepsilon$ và mọi $N$ có $n\ge N$ với $|a_n-c|\le\varepsilon$
- $a_n=c$ với một $n$
- $a_n\to c$
= Dãy trở lại gần $c$ vô hạn lần.
& Tính $\limsup$ và $\liminf$ của $a_n=(-1)^n+\frac1n$.
&> Với $N$ chẵn, $a_N^+=\sup_{n\ge N}a_n=1+\frac1N$ (đạt tại số chẵn đầu tiên); $\inf_N a_N^+=1$, nên $\limsup=1$.
&> $a_N^-=\inf_{n\ge N}a_n=-1+$ (một lượng $\to0$, không đạt), $\sup_N=-1$, nên $\liminf=-1$.
& Chứng minh định lý kẹp.
&> $a_n\le b_n\le c_n$, $a_n,c_n\to L$. Cho $\varepsilon$, chọn $N$ để $|a_n-L|,|c_n-L|\le\varepsilon$ khi $n\ge N$.
&> Khi đó $L-\varepsilon\le a_n\le b_n\le c_n\le L+\varepsilon$.

## 6.5
~ $\lim\left(\frac23\right)^n=0$; $\lim 5^{1/n}=1$; $\lim\frac{1}{n^{1/3}}=0$.
~ $\lim\frac{1}{n^q}=0$ với mọi $q>0$ hữu tỉ.
? $\lim(-0{,}9)^n$ bằng
+ $0$
- $-\infty$
- không tồn tại
= $|x|<1$.
? $\lim(-1{,}1)^n$
+ không tồn tại (dao động, độ lớn tăng)
- $=+\infty$
- $=0$
= Với $x\le-1$, dãy không hội tụ, cũng không tiến về $\pm\infty$.
? $\lim n^{1/n}$ bằng
+ $1$
- $0$
- $e$
= Một giới hạn tiêu chuẩn nữa; chứng minh bằng bất đẳng thức nhị thức.
& Chứng minh $x^n\to0$ khi $0<x<1$.
&> Dãy $x^n$ giảm, bị chặn dưới bởi $0$, nên hội tụ về $L\ge0$.
&> Vì $x^{n+1}=x\cdot x^n$, qua giới hạn $L=xL$, mà $x\ne1$ nên $L=0$.
& Chứng minh $x^{1/n}\to1$ khi $x>1$.
&> Dãy $x^{1/n}$ giảm, bị chặn dưới bởi $1$, hội tụ về $L\ge1$.
&> Dãy con $x^{1/(2n)}=\sqrt{x^{1/n}}\to\sqrt L$, nhưng cũng $\to L$. Vậy $L=\sqrt L$, $L=1$.

## 6.6
~ $a_n=\sin n$ có dãy con hội tụ về mọi số trong $[-1,1]$.
~ Dãy $1,1,2,1,2,3,1,2,3,4,\dots$ có mọi số nguyên dương là điểm giới hạn.
? Nếu mọi dãy con của $(a_n)$ có dãy con (nhỏ hơn) hội tụ về $L$ thì
+ $a_n\to L$
- chưa chắc hội tụ
= Nếu không, có $\varepsilon$ và dãy con luôn cách $L$ hơn $\varepsilon$, mâu thuẫn.
? Dãy không bị chặn thì
+ có dãy con tiến về $+\infty$ hoặc $-\infty$
- có dãy con hội tụ
- hội tụ
= Bolzano–Weierstrass cần bị chặn.
? Dãy con của dãy Cauchy là
+ Cauchy
- có thể không Cauchy
= Chỉ số của dãy con cũng $\ge N$.
& Chứng minh Bolzano–Weierstrass bằng chia đôi.
&> $(a_n)\subseteq[-M,M]$. Một trong hai nửa chứa vô hạn số hạng; chọn nửa đó, chọn $n_1$ với $a_{n_1}$ trong nửa ấy.
&> Lặp lại: được các đoạn lồng nhau $I_k$, độ dài $2M/2^k$, và $n_1<n_2<\dots$ với $a_{n_k}\in I_k$.
&> Với $j,k\ge K$: $|a_{n_j}-a_{n_k}|\le 2M/2^K$, nên dãy con là Cauchy, do đó hội tụ.
& Chứng minh: nếu $a_n\to L$ thì mọi dãy con $a_{n_k}\to L$.
&> Cho $\varepsilon$; có $N$ với $|a_n-L|\le\varepsilon$ khi $n\ge N$. Vì $n_k\ge k$, với $k\ge N$: $|a_{n_k}-L|\le\varepsilon$.

## 6.7
~ $3^{\pi}$ là giới hạn của $3^{3}, 3^{3{,}1}, 3^{3{,}14},\dots$
~ $e^{x+y}=e^xe^y$ với $x,y$ thực: lấy giới hạn hai vế đẳng thức hữu tỉ.
? $(2^{\sqrt2})^{\sqrt2}$ bằng
+ $4$
- $2^{2\sqrt2}$
- $2$
= $(x^\alpha)^\beta=x^{\alpha\beta}$, $\sqrt2\cdot\sqrt2=2$.
? Hàm $\alpha\mapsto 2^\alpha$ trên $\mathbb R$ là
+ tăng ngặt
- giảm
- hằng
= Cơ số $>1$.
? $x^\alpha$ với $x<0$ và $\alpha=\frac12$
+ không được định nghĩa trong $\mathbb R$
- bằng $-\sqrt{|x|}$
= Chỉ định nghĩa với $x>0$ (hoặc $x\ge0$, $\alpha>0$).
& Chứng minh định nghĩa $x^\alpha$ không phụ thuộc dãy: nếu $q_n,r_n\to\alpha$ hữu tỉ thì $x^{q_n}$ và $x^{r_n}$ cùng giới hạn.
&> $x^{q_n}/x^{r_n}=x^{q_n-r_n}$, với $q_n-r_n\to0$.
&> Bổ đề: nếu $s_n\to0$ hữu tỉ thì $x^{s_n}\to1$ (vì $x^{1/k}\to1$, kẹp $s_n$ giữa $\pm\frac1k$).
&> Vậy tỉ số $\to1$, hai giới hạn bằng nhau.

## 7.1
~ $\sum_{i=1}^{5}i^2=55$; $\sum_{i=1}^n(2i-1)=n^2$.
~ Tổng lồng (telescoping): $\sum_{i=1}^n(a_{i+1}-a_i)=a_{n+1}-a_1$. Ví dụ $\sum_{i=1}^n\frac{1}{i(i+1)}=1-\frac1{n+1}$.
? $\sum_{i=1}^n c=$
+ $nc$
- $c$
- $c^n$
= Cộng $n$ số $c$.
? $\sum_{i=1}^n(a_i+b_i)$ bằng
+ $\sum a_i+\sum b_i$
- $\sum a_i\cdot\sum b_i$
= Tuyến tính.
? $\sum_{i=1}^{n}a_ib_i$ có bằng $\left(\sum a_i\right)\left(\sum b_i\right)$?
+ Không, nói chung khác
- Có
= Với $a=b=(1,1)$: vế trái $2$, vế phải $4$.
? $\sum_{x\in X}f(x)$ với $X$ hữu hạn không phụ thuộc thứ tự là nhờ
+ phép cộng giao hoán, kết hợp và song ánh đổi biến
- tiên đề lựa chọn
= Mệnh đề 7.1.11.
& Tính $\sum_{i=1}^n\frac1{i(i+1)}$.
&> $\frac1{i(i+1)}=\frac1i-\frac1{i+1}$. Tổng lồng: $\left(1-\frac12\right)+\left(\frac12-\frac13\right)+\cdots=1-\frac1{n+1}$.
& Chứng minh $\sum_{i=1}^n i=\frac{n(n+1)}2$ bằng "đổi biến" $i\mapsto n+1-i$.
&> $S=\sum_{i=1}^n i=\sum_{i=1}^n(n+1-i)$. Cộng hai cách viết: $2S=\sum_{i=1}^n(n+1)=n(n+1)$.

## 7.2
~ $\sum_{n=0}^\infty\frac1{2^n}=2$: tổng riêng $2-\frac1{2^N}\to2$.
~ $\sum\frac1{n(n+1)}=1$ (tổng lồng).
~ $\sum(-1)^n$ phân kỳ vì số hạng không $\to0$.
? $\sum_{n=1}^\infty\frac{n}{n+1}$
+ phân kỳ vì số hạng $\to1\ne0$
- hội tụ
= Điều kiện cần bị vi phạm.
? Chuỗi đan dấu $\sum\frac{(-1)^n}{\sqrt n}$
+ hội tụ (có điều kiện)
- hội tụ tuyệt đối
- phân kỳ
= $\frac1{\sqrt n}$ giảm về $0$; nhưng $\sum\frac1{\sqrt n}$ phân kỳ.
? Nếu $\sum a_n$ và $\sum b_n$ hội tụ thì $\sum(a_n+b_n)$
+ hội tụ về tổng của hai tổng
- có thể phân kỳ
= Tuyến tính của giới hạn tổng riêng.
? Bỏ đi 100 số hạng đầu của chuỗi thì
+ tính hội tụ không đổi (tổng có thể đổi)
- tổng không đổi
- luôn phân kỳ
= Hội tụ chỉ phụ thuộc vào đuôi.
& Chứng minh $\sum_{n\ge1}\frac1n$ phân kỳ.
&> Nhóm: $\frac13+\frac14\ge\frac12$, $\frac15+\cdots+\frac18\ge\frac12$, … mỗi khối $2^{k-1}<n\le2^k$ có tổng $\ge\frac12$.
&> Vậy $S_{2^k}\ge1+\frac k2\to\infty$.
& Chứng minh: hội tụ tuyệt đối kéo theo hội tụ.
&> Theo tiêu chuẩn Cauchy: $\left|\sum_{n=p}^qa_n\right|\le\sum_{n=p}^q|a_n|$.
&> Vì $\sum|a_n|$ hội tụ, vế phải $\le\varepsilon$ khi $q\ge p\ge N$, nên $\sum a_n$ thoả tiêu chuẩn Cauchy.
& Tổng $\sum_{n=0}^\infty r^n$ với $|r|<1$.
&> $S_N=\frac{1-r^{N+1}}{1-r}$. Vì $r^{N+1}\to0$, $S_N\to\frac1{1-r}$.

## 7.3
~ $\sum\frac1{n^2+n}$ hội tụ: so sánh với $\frac1{n^2}$.
~ $\sum\frac1{n\ln n}$ (với $n\ge2$) phân kỳ theo cô đặc: $\sum2^k\frac1{2^k k\ln2}=\sum\frac1{k\ln2}$ phân kỳ.
~ $\sum\frac{1}{2^n+n}$ hội tụ: $\le\frac1{2^n}$.
? $\sum\frac{1}{n^{1/2}}$
+ phân kỳ
- hội tụ
= $p=\frac12\le1$.
? $\sum\frac{\sin^2 n}{n^2}$
+ hội tụ (so sánh với $\frac1{n^2}$)
- phân kỳ
= $0\le\frac{\sin^2n}{n^2}\le\frac1{n^2}$.
? Với $a_n\ge0$, $\sum a_n=+\infty$ khi
+ tổng riêng không bị chặn
- $a_n$ không giảm
- có một $a_n=0$
= Tổng riêng tăng; không bị chặn thì $\to+\infty$.
? $\sum\frac{1}{n^2}$ bằng
+ $\frac{\pi^2}{6}$
- $2$
- $\frac{\pi}{4}$
= Bài toán Basel (Euler); chương này chỉ chứng minh nó hữu hạn.
& Chứng minh $\sum\frac1{n^2}$ hội tụ.
&> Với $n\ge2$: $\frac1{n^2}<\frac1{n(n-1)}=\frac1{n-1}-\frac1n$.
&> Tổng riêng $\le1+\sum_{n=2}^N\left(\frac1{n-1}-\frac1n\right)=2-\frac1N<2$. Bị chặn, nên hội tụ.
& Dùng cô đặc Cauchy chứng minh chuỗi $p$ hội tụ khi $p>1$.
&> $\sum_k2^k\cdot\frac{1}{(2^k)^p}=\sum_k(2^{1-p})^k$ là cấp số nhân với tỉ số $2^{1-p}<1$, hội tụ.
&> Vì $\frac1{n^p}$ giảm không âm, theo cô đặc chuỗi gốc hội tụ.

## 7.4
~ $\sum\frac{(-1)^n}{n^2}$ hội tụ tuyệt đối, nên mọi cách sắp xếp đều cho cùng tổng $-\frac{\pi^2}{12}$.
~ Sắp xếp $1-\frac12-\frac14+\frac13-\frac16-\frac18+\cdots$ (một dương, hai âm) cho tổng $\frac12\ln2$, một nửa tổng ban đầu.
? Hoán vị chuỗi là
+ $\sum a_{f(n)}$ với $f:\mathbb N\to\mathbb N$ song ánh
- nhóm các số hạng
- bỏ bớt số hạng
= Mọi số hạng dùng đúng một lần.
? Với chuỗi hội tụ có điều kiện, tổng các số hạng dương
+ bằng $+\infty$
- hữu hạn
- bằng $0$
= Nếu hữu hạn thì (vì chuỗi hội tụ) tổng phần âm cũng hữu hạn, và chuỗi hội tụ tuyệt đối.
? Có hoán vị của $1-\frac12+\frac13-\cdots$ làm tổng $=+\infty$ không?
+ Có
- Không
= Định lý Riemann cũng cho phép đích $\pm\infty$.
& Vì sao thuật toán tham lam (lấy dương khi tổng $\le T$, âm khi $>T$) cho tổng riêng hội tụ về $T$?
&> Vì tổng phần dương và tổng phần âm đều vô hạn, thuật toán không bao giờ "kẹt": luôn vượt qua $T$ được theo cả hai chiều.
&> Sau mỗi lần đổi chiều, sai số $|S-T|$ không quá số hạng vừa dùng, mà số hạng $\to0$. Vậy tổng riêng $\to T$.
& Chứng minh: hoán vị chuỗi số không âm không đổi tổng.
&> Mọi tổng riêng của chuỗi hoán vị là tổng trên một tập hữu hạn, bị chặn bởi tổng gốc $S$; ngược lại cũng vậy.
&> Hai tổng (sup của các tổng riêng) bằng nhau.

## 7.5
~ $\sum\frac{2^n}{n!}$: tỉ số $\frac{2}{n+1}\to0<1$, hội tụ (tổng $e^2-1$ khi tính từ $n=1$).
~ $\sum\frac{n^n}{n!}$: tỉ số $\left(1+\frac1n\right)^n\to e>1$, phân kỳ.
~ $\sum\left(\frac{n}{2n+1}\right)^n$: căn $\frac{n}{2n+1}\to\frac12<1$, hội tụ.
? Tiêu chuẩn tỉ số cho $\sum\frac{n^2}{3^n}$
+ tỉ số $\to\frac13$, hội tụ
- tỉ số $\to3$, phân kỳ
- không kết luận
= $\frac{(n+1)^2}{n^2}\cdot\frac13\to\frac13$.
? Chuỗi $a_n=2^{-n}$ khi $n$ chẵn, $3^{-n}$ khi $n$ lẻ: tiêu chuẩn tỉ số
+ không áp dụng được (tỉ số dao động), nhưng tiêu chuẩn căn cho $\frac12$
- cho hội tụ
- cho phân kỳ
= Ví dụ tiêu chuẩn căn mạnh hơn.
? Với $\sum\frac1{n^p}$, cả hai tiêu chuẩn đều cho
+ giới hạn $1$, không kết luận
- hội tụ
- phân kỳ
= Phải dùng so sánh hoặc cô đặc.
? Bán kính hội tụ dùng tiêu chuẩn nào?
+ Tiêu chuẩn căn
- Tiêu chuẩn so sánh với $\frac1n$
= Cauchy–Hadamard (Chương 15).
& Xét tính hội tụ của $\sum\frac{n!}{n^n}$.
&> Tỉ số: $\frac{(n+1)!}{(n+1)^{n+1}}\cdot\frac{n^n}{n!}=\left(\frac{n}{n+1}\right)^n=\frac{1}{(1+1/n)^n}\to\frac1e<1$.
&> Chuỗi hội tụ.
& Chứng minh tiêu chuẩn căn (phần hội tụ).
&> $\alpha=\limsup|a_n|^{1/n}<1$. Chọn $\alpha<r<1$; từ $N$ nào đó $|a_n|^{1/n}\le r$, tức $|a_n|\le r^n$.
&> So sánh với cấp số nhân $\sum r^n$ hội tụ.
`);
