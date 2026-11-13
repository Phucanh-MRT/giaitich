/* Bổ sung Chương 10–11 và phụ lục. */
(window.EXTRA = window.EXTRA || []).push(String.raw`
## 10.1
~ $f(x)=x^2$: $\frac{(x_0+h)^2-x_0^2}{h}=2x_0+h\to2x_0$.
~ $f(x)=\sqrt x$ tại $x_0>0$: nhân liên hợp được $\frac{1}{\sqrt{x_0+h}+\sqrt{x_0}}\to\frac1{2\sqrt{x_0}}$. Tại $0$ tỉ số $\frac{1}{\sqrt h}\to\infty$: không khả vi.
~ $f(x)=x^2\sin\frac1x$ ($f(0)=0$) khả vi tại $0$ với $f'(0)=0$, nhưng $f'$ không liên tục tại $0$.
? $(x^3)'$ bằng
+ $3x^2$
- $x^2$
- $3x^3$
= Quy tắc luỹ thừa, hoặc dùng quy tắc tích hai lần.
? $\left(\frac fg\right)'$ bằng
+ $\frac{f'g-fg'}{g^2}$
- $\frac{f'g+fg'}{g^2}$
- $\frac{f'}{g'}$
= Quy tắc thương.
? $(\sin(x^2))'$ bằng
+ $2x\cos(x^2)$
- $\cos(x^2)$
- $2x\cos x$
= Quy tắc chuỗi: $g=\sin$, $f=x^2$.
? Hàm khả vi tại $x_0$ thì
+ liên tục tại $x_0$
- có đạo hàm liên tục tại $x_0$
- khả vi hai lần
= Ví dụ $x^2\sin\frac1x$ cho thấy $f'$ có thể gián đoạn.
? $f(x)=|x|^3$ khả vi mấy lần tại $0$?
+ Hai lần
- Một lần
- Vô hạn lần
= $f'=3x|x|$, $f''=6|x|$, và $|x|$ không khả vi tại $0$.
& Chứng minh quy tắc tích $(fg)'=f'g+fg'$.
&> $\frac{f(x)g(x)-f(x_0)g(x_0)}{x-x_0}=\frac{f(x)-f(x_0)}{x-x_0}g(x)+f(x_0)\frac{g(x)-g(x_0)}{x-x_0}$.
&> Khi $x\to x_0$: tỉ số đầu $\to f'(x_0)$, $g(x)\to g(x_0)$ (khả vi kéo theo liên tục), tỉ số sau $\to g'(x_0)$.
& Chứng minh $f(x)=x^2\sin\frac1x$, $f(0)=0$ khả vi tại $0$.
&> $\frac{f(h)-f(0)}{h}=h\sin\frac1h$, và $|h\sin\frac1h|\le|h|\to0$. Vậy $f'(0)=0$.
&> Với $x\ne0$, $f'(x)=2x\sin\frac1x-\cos\frac1x$ không có giới hạn tại $0$.
& Tính đạo hàm của $f(x)=\frac{x}{1+x^2}$.
&> Quy tắc thương: $f'(x)=\frac{1\cdot(1+x^2)-x\cdot2x}{(1+x^2)^2}=\frac{1-x^2}{(1+x^2)^2}$.

## 10.2
~ $f(x)=x^2-4x$: $f'(x)=2x-4=0$ tại $x=2$, cực tiểu $f(2)=-4$.
~ Giá trị trung bình cho $\sin$: $|\sin a-\sin b|=|\cos c||a-b|\le|a-b|$.
~ $f(x)=|x|$ có cực tiểu tại $0$ nhưng không khả vi ở đó: điều kiện $f'=0$ chỉ áp dụng khi $f$ khả vi.
? Cực trị của $f$ trên $[a,b]$ có thể nằm ở
+ điểm dừng, điểm không khả vi, hoặc hai đầu mút
- chỉ ở điểm $f'=0$
= Phải kiểm tra cả ba loại điểm.
? Định lý Rolle cho $f(x)=x^2$ trên $[-1,1]$ cho $c=$
+ $0$
- $1$
- $\frac12$
= $f(-1)=f(1)$ và $f'(0)=0$.
? Giá trị trung bình cho $f(x)=x^3$ trên $[0,2]$: $c$ thoả
+ $3c^2=4$, $c=\frac2{\sqrt3}$
- $c=1$
- $3c^2=8$
= $\frac{f(2)-f(0)}{2}=4$.
& Chứng minh định lý giá trị trung bình từ định lý Rolle.
&> Đặt $g(x)=f(x)-\frac{f(b)-f(a)}{b-a}(x-a)$. Khi đó $g(a)=f(a)=g(b)$.
&> Rolle cho $c$ với $g'(c)=0$, tức $f'(c)=\frac{f(b)-f(a)}{b-a}$.
& Tìm max, min của $f(x)=x^3-3x+1$ trên $[0,2]$.
&> $f'(x)=3x^2-3=0$ khi $x=1$ (trong đoạn). So sánh $f(0)=1$, $f(1)=-1$, $f(2)=3$.
&> Max $3$ tại $x=2$, min $-1$ tại $x=1$.
& Chứng minh $|\arctan a-\arctan b|\le|a-b|$.
&> Giá trị trung bình: $\arctan a-\arctan b=\frac{1}{1+c^2}(a-b)$ với $c$ ở giữa, và $\frac1{1+c^2}\le1$.

## 10.3
~ $f(x)=x^3-3x$: $f'=3(x^2-1)$, tăng trên $(-\infty,-1]$ và $[1,\infty)$, giảm trên $[-1,1]$.
~ $e^x>1+x$ với $x\ne0$: $g(x)=e^x-1-x$ có $g'=e^x-1$, giảm khi $x<0$ và tăng khi $x>0$, min $g(0)=0$.
? $f'\ge0$ trên $(a,b)$ cho ta
+ $f$ tăng (không ngặt)
- $f$ tăng ngặt
- $f$ hằng
= Ngặt cần $f'>0$ (hoặc $f'=0$ chỉ tại các điểm cô lập).
? $f(x)=x+\sin x$ là
+ tăng (không giảm) trên $\mathbb R$
- giảm
- không đơn điệu
= $f'=1+\cos x\ge0$.
? Nếu $f'=g'$ trên một khoảng thì
+ $f-g$ hằng trên khoảng đó
- $f=g$
= Áp dụng hệ quả $h'=0\Rightarrow h$ hằng cho $h=f-g$.
& Chứng minh $\sin x<x$ với $x>0$.
&> $g(x)=x-\sin x$ có $g(0)=0$ và $g'(x)=1-\cos x\ge0$, bằng $0$ chỉ tại các điểm cô lập $2k\pi$, nên $g$ tăng ngặt.
&> Vậy $g(x)>g(0)=0$ khi $x>0$.
& Chứng minh $\ln(1+x)<x$ với $x>0$.
&> $g(x)=x-\ln(1+x)$, $g(0)=0$, $g'(x)=1-\frac1{1+x}=\frac{x}{1+x}>0$ khi $x>0$.

## 10.4
~ $(\sqrt x)'=\frac1{2\sqrt x}$ từ hàm ngược của $x^2$: $\frac1{2y}$ với $y=\sqrt x$.
~ $(\arcsin x)'=\frac1{\cos(\arcsin x)}=\frac1{\sqrt{1-x^2}}$.
~ $(\arctan x)'=\frac1{1+x^2}$.
? $(e^x)$ có đạo hàm $e^x$. Vậy $(\ln y)'$ tại $y=e^2$ là
+ $e^{-2}$
- $e^2$
- $2$
= $\frac1{e^x}$ với $x=2$.
? Khi nào không áp dụng được định lý đạo hàm hàm ngược?
+ Khi $f'(x_0)=0$
- Khi $f$ tăng
- Khi $f$ liên tục
= Tiếp tuyến của $f^{-1}$ thẳng đứng.
? $f(x)=x^5+x$ có $f(1)=2$. $(f^{-1})'(2)$ bằng
+ $\frac16$
- $6$
- $\frac12$
= $f'(1)=5+1=6$.
& Tính $(\arccos x)'$.
&> $y=\arccos x$, $x=\cos y$, $y\in(0,\pi)$. $(f^{-1})'(x)=\frac1{-\sin y}=-\frac1{\sqrt{1-x^2}}$ vì $\sin y>0$.
& Cho $f(x)=x^3+2x+1$. Tính $(f^{-1})'(1)$.
&> $f(0)=1$ nên $f^{-1}(1)=0$. $f'(0)=2$, vậy $(f^{-1})'(1)=\frac12$.

## 10.5
~ $\lim_{x\to0}\frac{e^x-1-x}{x^2}$: L'Hôpital hai lần, $\frac{e^x-1}{2x}\to\frac{e^x}{2}\to\frac12$.
~ $\lim_{x\to0^+}x\ln x$: viết $\frac{\ln x}{1/x}$, dạng $\frac{-\infty}{\infty}$, được $\frac{1/x}{-1/x^2}=-x\to0$.
~ Áp dụng sai: $\lim_{x\to1}\frac{x^2+1}{x+1}=1$, nhưng "đạo hàm" cho $\frac{2x}{1}\to2$. Sai vì không phải dạng $\frac00$.
? $\lim_{x\to0}\frac{\tan x-x}{x^3}$ bằng
+ $\frac13$
- $0$
- $1$
= Ba lần L'Hôpital, hoặc khai triển $\tan x=x+\frac{x^3}3+\cdots$.
? $\lim_{x\to\infty}\frac{x^2}{e^x}$ bằng
+ $0$
- $\infty$
- $1$
= Hai lần L'Hôpital (dạng $\frac\infty\infty$).
? Phiên bản trong sách chứng minh L'Hôpital bằng
+ định lý giá trị trung bình (dạng Cauchy)
- quy nạp
- tích phân
= Dạng Cauchy: $\frac{f(x)-f(a)}{g(x)-g(a)}=\frac{f'(c)}{g'(c)}$.
& Tính $\lim_{x\to0}\frac{1-\cos x}{x^2}$.
&> Dạng $\frac00$: L'Hôpital được $\frac{\sin x}{2x}\to\frac12$.
& Tính $\lim_{x\to0^+}x^x$.
&> $x^x=e^{x\ln x}$ và $x\ln x\to0$ (ví dụ trên), nên $x^x\to e^0=1$ (dùng liên tục của $\exp$).

## 11.1
~ $P=\{[0,1),[1,1],(1,3]\}$ là một phân hoạch của $[0,3]$; khoảng suy biến $[1,1]=\{1\}$ có độ dài $0$.
~ Phân hoạch đều $n$ khoảng của $[a,b]$: các điểm $a+k\frac{b-a}{n}$.
? Độ dài của $(2,5]$ là
+ $3$
- $4$
- $2$
= Độ dài khoảng không phụ thuộc đầu mút đóng hay mở.
? Trên $[0,3]$, $P$ chia tại $1$ và $P'$ chia tại $2$. Các điểm chia của $P\#P'$ là
+ $1$ và $2$, cho ba khoảng $[0,1),[1,2),[2,3]$ (cùng các khoảng suy biến)
- chỉ $1$
- không có điểm chia nào
= Gộp mọi điểm chia của cả hai phân hoạch.
? $P'$ mịn hơn $P$ nghĩa là
+ mỗi khoảng của $P'$ nằm trong một khoảng của $P$
- $P'$ có ít khoảng hơn
= Thêm điểm chia làm phân hoạch mịn hơn.
& Chứng minh $|I|=\sum_{J\in P}|J|$ cho mọi phân hoạch $P$ của khoảng $I$.
&> Quy nạp theo số khoảng của $P$. Lấy đầu mút phải $b$ của $I$: có đúng một khoảng $K\in P$ chứa $b$ ở đầu phải.
&> $I\setminus K$ là khoảng, được phân hoạch bởi $P\setminus\{K\}$; dùng giả thiết quy nạp và $|I|=|I\setminus K|+|K|$.

## 11.2
~ $f=\mathbb 1_{[1,3]}$ trên $[0,5]$: $\int f=2$.
~ Hàm bậc thang $f=3$ trên $[0,2)$, $-1$ trên $[2,4]$: $\int f=6-2=4$.
? Tích phân hằng từng đoạn không phụ thuộc phân hoạch vì
+ hai phân hoạch có phân hoạch chung mịn hơn cho cùng giá trị
- định nghĩa chỉ dùng một phân hoạch
= Mịn hoá không đổi tổng (tách một khoảng thành hai, tổng $c|J|$ không đổi).
? $\int_{[0,1]}\mathbb 1_{\{1/2\}}$ bằng
+ $0$
- $1$
- $\frac12$
= Khoảng suy biến có độ dài $0$.
? Nếu $f\le g$ đều hằng từng đoạn thì
+ $\int f\le\int g$
- $\int f\ge\int g$
= Tính đơn điệu.
& Tính tích phân hằng từng đoạn của $f(x)=\lfloor x\rfloor$ trên $[0,3]$.
&> $f=0$ trên $[0,1)$, $1$ trên $[1,2)$, $2$ trên $[2,3)$, $3$ tại $\{3\}$.
&> $\int f=0+1+2+3\cdot0=3$.

## 11.3
~ $f(x)=x$ trên $[0,1]$, $n$ khoảng đều: $U=\sum_{k=1}^n\frac kn\cdot\frac1n=\frac{n+1}{2n}$, $L=\frac{n-1}{2n}$. Cả hai $\to\frac12$.
~ $f(x)=x^2$: $U_n=\frac{(n+1)(2n+1)}{6n^2}\to\frac13$.
? Luôn có
+ $L(f,P)\le\underline\int f\le\overline\int f\le U(f,P)$
- $U(f,P)\le L(f,P)$
= Kẹp tích phân giữa tổng dưới và tổng trên.
? Hàm không bị chặn trên $[a,b]$
+ không khả tích Riemann (theo định nghĩa)
- luôn khả tích
= Định nghĩa đòi hỏi bị chặn để sup và inf hữu hạn.
? $f$ khả tích khi và chỉ khi
+ với mọi $\varepsilon$ có phân hoạch $P$ với $U(f,P)-L(f,P)\le\varepsilon$
- $U=L$ với mọi phân hoạch
= Tiêu chuẩn Riemann.
& Tính $\int_0^1x^2dx$ bằng tổng trên.
&> Phân hoạch đều $n$ khoảng; $f$ tăng nên sup trên $[\frac{k-1}n,\frac kn]$ là $\frac{k^2}{n^2}$.
&> $U_n=\frac1{n^3}\sum_{k=1}^nk^2=\frac{(n+1)(2n+1)}{6n^2}\to\frac13$. Tương tự $L_n\to\frac13$.
& Chứng minh $\underline\int f\le\overline\int f$.
&> Với $h\le f\le g$ hằng từng đoạn: $\int h\le\int g$. Lấy sup theo $h$ rồi inf theo $g$.

## 11.4
~ $\int_0^2(3x^2+1)dx=3\int_0^2x^2+\int_0^21=8+2=10$.
~ $\left|\int_0^{2\pi}\sin x\,e^{-x}dx\right|\le\int_0^{2\pi}e^{-x}dx<1$.
? $\int_a^bf$ với $f\ge0$ khả tích thì
+ $\ge0$
- $>0$
- có thể âm
= Đơn điệu so với hàm $0$.
? Nếu $f$ khả tích trên $[a,b]$ thì $|f|$
+ khả tích
- có thể không khả tích
= Ngược lại sai: $|f|$ khả tích không kéo theo $f$ khả tích.
? Tích hai hàm khả tích là
+ khả tích
- có thể không
= Định lý 11.4.5 (dùng $fg=\frac{(f+g)^2-(f-g)^2}{4}$ và bình phương).
& Chứng minh: nếu $f$ liên tục, $f\ge0$ trên $[a,b]$ và $\int_a^bf=0$ thì $f\equiv0$.
&> Nếu $f(x_0)>0$, do liên tục có khoảng $[x_0-\delta,x_0+\delta]$ (trong $[a,b]$) với $f>\frac{f(x_0)}2$.
&> Khi đó $\int f\ge\delta\cdot\frac{f(x_0)}2>0$, mâu thuẫn.
& Cho ví dụ $f$ không khả tích mà $|f|$ khả tích.
&> $f=1$ tại số hữu tỉ, $-1$ tại số vô tỉ. Mọi tổng trên $=1$, tổng dưới $=-1$; nhưng $|f|\equiv1$ khả tích.

## 11.5
~ $\sin$, $e^x$, đa thức đều khả tích trên mọi đoạn.
~ $f(x)=\sin\frac1x$ ($f(0)=0$) trên $[0,1]$: bị chặn, gián đoạn tại một điểm, vẫn khả tích.
? Hàm liên tục trên **khoảng mở** $(0,1)$ có thể không khả tích vì
+ có thể không bị chặn, ví dụ $\frac1x$
- luôn khả tích
= Cần liên tục đều (hoặc bị chặn và liên tục từng khúc).
? Hàm bị chặn có hữu hạn điểm gián đoạn trên $[a,b]$
+ khả tích
- không khả tích
= Cô lập các điểm xấu trong các khoảng nhỏ.
? Bước then chốt khi chứng minh hàm liên tục khả tích là
+ chia đủ mịn để dao động trên mỗi khoảng $<\varepsilon$
- chọn điểm giữa
= Nhờ liên tục đều.
& Chứng minh hàm liên tục đều $f$ trên $[a,b]$ khả tích.
&> Cho $\varepsilon$, chọn $\delta$ từ liên tục đều. Chia đều $N$ khoảng với $\frac{b-a}N<\delta$.
&> Trên mỗi khoảng $\sup f-\inf f\le\varepsilon$, nên $U-L\le\varepsilon(b-a)$. Vì $\varepsilon$ tuỳ ý, $f$ khả tích.

## 11.6
~ $f(x)=\lfloor 1/x\rfloor^{-1}$ trên $(0,1]$ đơn điệu, có vô hạn bước nhảy tại $\frac1n$, vẫn khả tích.
~ Tiêu chuẩn tích phân: $\sum\frac1{n^2}$ hội tụ vì $\int_1^\infty\frac{dx}{x^2}=1$; $\sum\frac1n$ phân kỳ vì $\int_1^\infty\frac{dx}x=\infty$.
? $\sum\frac{1}{n\ln^2n}$ (từ $n=2$)
+ hội tụ, vì $\int_2^\infty\frac{dx}{x\ln^2x}=\frac1{\ln2}$
- phân kỳ
= Đổi biến $u=\ln x$.
? Hàm đơn điệu trên $[a,b]$ luôn
+ bị chặn và khả tích
- liên tục
= Bị chặn bởi $f(a)$ và $f(b)$.
? Tổng $1+\frac12+\cdots+\frac1n$ xấp xỉ
+ $\ln n$
- $n$
- $\sqrt n$
= So sánh với $\int_1^n\frac{dx}x$.
& Chứng minh $\ln(n+1)\le1+\frac12+\cdots+\frac1n\le1+\ln n$.
&> Vì $\frac1x$ giảm: $\frac1{k+1}\le\int_k^{k+1}\frac{dx}x\le\frac1k$.
&> Cộng $k=1$ đến $n$: $\ln(n+1)\le\sum_{k=1}^n\frac1k$. Cộng $k=1$ đến $n-1$: $\sum_{k=2}^n\frac1k\le\ln n$.

## 11.7
~ $\mathbb 1_{\mathbb Q}$ là giới hạn điểm của dãy hàm khả tích $f_n=\mathbb 1_{\{q_1,\dots,q_n\}}$ (mỗi $f_n$ có tích phân $0$). Giới hạn điểm làm mất khả tích Riemann.
? Hàm Thomae (bằng $\frac1q$ tại $\frac pq$, $0$ tại số vô tỉ) có khả tích Riemann không?
+ Có, tích phân bằng $0$
- Không
= Chỉ hữu hạn điểm có $f\ge\varepsilon$; dù gián đoạn tại vô hạn điểm.
? Tiêu chuẩn Lebesgue: hàm bị chặn khả tích Riemann khi và chỉ khi
+ tập điểm gián đoạn có độ đo $0$
- nó liên tục
- nó đơn điệu
= Dirichlet gián đoạn mọi nơi (độ đo $1$); Thomae gián đoạn trên $\mathbb Q$ (độ đo $0$).
& Chứng minh $\overline\int_0^1\mathbb 1_{\mathbb Q}=1$.
&> Với hàm bậc thang $g\ge\mathbb 1_{\mathbb Q}$: trên mỗi khoảng không suy biến $J$ có số hữu tỉ, nên $g\ge1$ trên $J$ (trừ hữu hạn điểm). Vậy $\int g\ge1$.
&> Và $g\equiv1$ cho $\int g=1$. Do đó $\overline\int=1$.

## 11.8
~ $\alpha(x)=x^2$: $\int_0^1x\,d\alpha=\int_0^1x\cdot2x\,dx=\frac23$.
~ $\alpha=\lfloor x\rfloor$ trên $[0,n]$: $\int f\,d\alpha=f(1)+f(2)+\cdots+f(n)$. Tổng là một trường hợp riêng của tích phân Stieltjes.
? $\int_0^3x^2\,d\lfloor x\rfloor$ bằng
+ $1+4+9=14$
- $9$
- $\int_0^3x^2dx$
= Nhặt giá trị tại các điểm nhảy $1,2,3$.
? Với $\alpha$ hằng, $\int f\,d\alpha$ bằng
+ $0$
- $\int f$
= Mọi khoảng có khối lượng $0$.
& Tính $\int_0^2 x\,d\alpha$ với $\alpha(x)=x$ khi $x<1$, $\alpha(x)=x+3$ khi $x\ge1$.
&> $\alpha$ là $x$ cộng một bước nhảy $3$ tại $x=1$.
&> $\int_0^2x\,dx+3\cdot1=2+3=5$.

## 11.9
~ $\frac{d}{dx}\int_0^x e^{-t^2}dt=e^{-x^2}$, dù không có công thức sơ cấp cho nguyên hàm.
~ $\frac{d}{dx}\int_0^{x^2}\sin t\,dt=2x\sin(x^2)$ (kết hợp quy tắc chuỗi).
~ $\int_0^\pi\sin x\,dx=[-\cos x]_0^\pi=2$.
? $\int_1^e\frac{dx}{x}$ bằng
+ $1$
- $e$
- $0$
= $\ln e-\ln1$.
? $\frac{d}{dx}\int_x^1t^2dt$ bằng
+ $-x^2$
- $x^2$
- $\frac13$
= Đổi cận đổi dấu.
? Nếu $f$ khả tích nhưng gián đoạn nhảy tại $x_0$ thì $F(x)=\int_a^xf$
+ liên tục nhưng không khả vi tại $x_0$
- gián đoạn tại $x_0$
- khả vi tại $x_0$
= $F$ có "góc" tại $x_0$: hai độ dốc một phía bằng hai giới hạn một phía của $f$.
& Chứng minh: $f$ liên tục tại $x_0$ thì $F'(x_0)=f(x_0)$, với $F(x)=\int_a^xf$.
&> $\frac{F(x_0+h)-F(x_0)}h-f(x_0)=\frac1h\int_{x_0}^{x_0+h}(f(t)-f(x_0))dt$.
&> Cho $\varepsilon$, chọn $\delta$ để $|f(t)-f(x_0)|\le\varepsilon$ khi $|t-x_0|<\delta$. Với $|h|<\delta$, vế trái có trị tuyệt đối $\le\varepsilon$.
& Tính $\int_0^1\frac{dx}{1+x^2}$.
&> Nguyên hàm $\arctan x$. Kết quả $\arctan1-\arctan0=\frac\pi4$.

## 11.10
~ Đổi biến: $\int_0^1 2x\,e^{x^2}dx$, đặt $u=x^2$: $\int_0^1e^udu=e-1$.
~ Từng phần: $\int_1^e\ln x\,dx=[x\ln x]_1^e-\int_1^e1\,dx=e-(e-1)=1$.
? $\int x\cos x\,dx$ tính bằng
+ từng phần với $F=x$, $G'=\cos x$
- đổi biến $u=\cos x$
= Kết quả $x\sin x+\cos x+C$.
? $\int_0^{\pi/2}\sin^2x\cos x\,dx$ bằng
+ $\frac13$
- $\frac12$
- $1$
= Đặt $u=\sin x$: $\int_0^1u^2du$.
? Khi đổi biến tích phân xác định, phải
+ đổi cả cận theo biến mới
- giữ nguyên cận
= $x$ từ $a$ đến $b$ thì $u=\phi(x)$ từ $\phi(a)$ đến $\phi(b)$.
& Tính $\int_0^1x^2e^x\,dx$.
&> Từng phần hai lần: $\int x^2e^x=x^2e^x-2\int xe^x=x^2e^x-2(xe^x-e^x)$.
&> Thế cận: $(e-2e+2e)-(0-0+2)=e-2$.
& Tính $\int_0^{1}\sqrt{1-x^2}\,dx$ bằng đổi biến $x=\sin\theta$.
&> $dx=\cos\theta\,d\theta$, cận $0\to\frac\pi2$: $\int_0^{\pi/2}\cos^2\theta\,d\theta=\int_0^{\pi/2}\frac{1+\cos2\theta}2d\theta=\frac\pi4$.
&> Đúng bằng diện tích một phần tư hình tròn đơn vị.

## A.1
~ Mệnh đề "$x>2$" chưa phải mệnh đề cho đến khi gán giá trị cho $x$ hoặc lượng từ hoá.
~ "$P$ hoặc $Q$" trong toán: đúng khi ít nhất một đúng (bao hàm), khác "hoặc… hoặc…" trong đời thường.
? Phủ định của "$P\Rightarrow Q$" là
+ $P\land\lnot Q$
- $\lnot P\Rightarrow\lnot Q$
- $Q\Rightarrow P$
= Kéo theo chỉ sai khi $P$ đúng, $Q$ sai.
? "$P$ là điều kiện cần cho $Q$" nghĩa là
+ $Q\Rightarrow P$
- $P\Rightarrow Q$
- $P\iff Q$
= Muốn có $Q$ thì cần $P$.
? $P\Rightarrow Q$ tương đương
+ $\lnot P\lor Q$
- $P\lor\lnot Q$
- $\lnot P\land Q$
= Kiểm tra bằng bảng chân trị.
& Chứng minh bằng bảng chân trị: $(P\Rightarrow Q)\iff(\lnot Q\Rightarrow\lnot P)$.
&> Bốn dòng $(P,Q)$: $(Đ,Đ)$: cả hai đúng; $(Đ,S)$: cả hai sai; $(S,Đ)$: cả hai đúng; $(S,S)$: cả hai đúng.
&> Hai cột luôn bằng nhau.

## A.2
~ "Mọi số chẵn lớn hơn 2 là tổng hai số nguyên tố" (Goldbach): $\forall n\ (\dots)\ \exists p,q$; chưa ai chứng minh.
~ Phủ định của "$f$ liên tục tại $x_0$": $\exists\varepsilon>0\ \forall\delta>0\ \exists x: |x-x_0|<\delta$ và $|f(x)-f(x_0)|>\varepsilon$.
? Phủ định của "$\forall x\in\mathbb R,\ x^2\ge0$" là
+ $\exists x\in\mathbb R,\ x^2<0$
- $\forall x,\ x^2<0$
- $\exists x,\ x^2\ge0$
= Đổi lượng từ và phủ định phần sau.
? "$\exists y\ \forall x: x<y$" trên $\mathbb R$ là
+ sai (không có số lớn hơn mọi số)
- đúng
= Còn "$\forall x\ \exists y: x<y$" thì đúng.
? Phủ định của "$(a_n)$ bị chặn" là
+ $\forall M\ \exists n: |a_n|>M$
- $\exists M\ \forall n: |a_n|>M$
= Bị chặn: $\exists M\ \forall n:|a_n|\le M$.
& Viết phủ định của định nghĩa dãy Cauchy.
&> Cauchy: $\forall\varepsilon>0\ \exists N\ \forall j,k\ge N: |a_j-a_k|\le\varepsilon$.
&> Phủ định: $\exists\varepsilon>0\ \forall N\ \exists j,k\ge N: |a_j-a_k|>\varepsilon$.

## A.3
~ Chứng minh trực tiếp: "$n$ lẻ thì $n^2$ lẻ": $n=2k+1$, $n^2=2(2k^2+2k)+1$.
~ Phản đảo: "$n^2$ chẵn thì $n$ chẵn" tương đương "$n$ lẻ thì $n^2$ lẻ".
~ Xét trường hợp: $|x+y|\le|x|+|y|$ bằng cách xét dấu của $x$, $y$.
? Để chứng minh "$A\iff B$" ta cần
+ chứng minh cả $A\Rightarrow B$ và $B\Rightarrow A$
- chỉ $A\Rightarrow B$
= Hai chiều.
? Để chứng minh "$\exists x: P(x)$", cách trực tiếp là
+ chỉ ra một $x$ cụ thể thoả $P$
- chứng minh cho mọi $x$
= Chứng minh tồn tại kiểu xây dựng.
? Để chứng minh "$\forall x: P(x)$" sai, cần
+ một phản ví dụ
- chứng minh $P(x)$ sai với mọi $x$
= Một là đủ.
& Chứng minh có vô hạn số nguyên tố (phản chứng).
&> Giả sử chỉ có $p_1,\dots,p_k$. Xét $N=p_1p_2\cdots p_k+1$. $N>1$ nên có ước nguyên tố $p$.
&> $p$ là một $p_i$, nhưng $p_i$ chia $N$ dư $1$. Mâu thuẫn.
& Chứng minh: nếu $x$ hữu tỉ, $y$ vô tỉ thì $x+y$ vô tỉ.
&> Phản chứng: nếu $x+y=r$ hữu tỉ thì $y=r-x$ hữu tỉ (hiệu hai số hữu tỉ), mâu thuẫn.

## B.1
~ $2026=2\cdot10^3+0\cdot10^2+2\cdot10+6$.
~ Hệ nhị phân: $13=1101_2=8+4+0+1$.
? Số chữ số thập phân của $n\ge1$ là
+ $\lfloor\log_{10}n\rfloor+1$
- $\log_{10}n$
- $n/10$
= $10^{k-1}\le n<10^k$ khi $n$ có $k$ chữ số.
? $10^k$ có bao nhiêu chữ số?
+ $k+1$
- $k$
= Ví dụ $10^2=100$.
& Đổi $100$ sang hệ nhị phân.
&> Chia liên tiếp cho $2$, lấy số dư: $100\to50\,(0)\to25\,(0)\to12\,(1)\to6\,(0)\to3\,(0)\to1\,(1)\to0\,(1)$.
&> Đọc ngược: $1100100_2=64+32+4$.

## B.2
~ $\frac13=0{,}333\ldots$; $\frac17=0{,}\overline{142857}$ (tuần hoàn chu kỳ 6).
~ Số hữu tỉ khi và chỉ khi có biểu diễn thập phân tuần hoàn (từ một chỗ nào đó).
? $0{,}\overline{9}$ (tuần hoàn) bằng
+ $1$
- $0{,}9$
= $\sum_{n\ge1}9\cdot10^{-n}=1$.
? $0{,}\overline{12}=0{,}121212\ldots$ bằng
+ $\frac{12}{99}=\frac4{33}$
- $\frac{12}{100}$
- $\frac{1}{12}$
= Đặt $x$, tính $100x-x=12$.
? Số thực nào có **hai** biểu diễn thập phân?
+ Các số có biểu diễn hữu hạn khác $0$, như $0{,}5=0{,}4999\ldots$
- Mọi số vô tỉ
- Không số nào
= Chỉ những số dạng $\frac{m}{10^k}$.
& Viết $0{,}3\overline{18}=0{,}3181818\ldots$ dưới dạng phân số.
&> $x=0{,}3\overline{18}$: $1000x=318{,}\overline{18}$, $10x=3{,}\overline{18}$. Trừ: $990x=315$, $x=\frac{315}{990}=\frac7{22}$.
& Chứng minh chuỗi thập phân $\sum_{i\ge1}a_i10^{-i}$ ($a_i\in\{0,\dots,9\}$) luôn hội tụ.
&> Các số hạng không âm, tổng riêng bị chặn bởi $\sum9\cdot10^{-i}=1$. Theo hội tụ của chuỗi không âm, chuỗi hội tụ.
`);
