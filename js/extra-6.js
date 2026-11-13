/* Bổ sung Chương 16–19. */
(window.EXTRA = window.EXTRA || []).push(String.raw`
## 16.1
~ $\sin(2\pi x)$, $\cos(4\pi x)$, $\{x\}=x-\lfloor x\rfloor$ đều tuần hoàn chu kỳ $1$.
~ Hàm tuần hoàn chu kỳ $1$ trên $\mathbb R$ tương đương với hàm trên đường tròn $\mathbb R/\mathbb Z$.
? Tổng của hai hàm chu kỳ $1$ có chu kỳ
+ $1$
- $2$
- không tuần hoàn
= $(f+g)(x+1)=f(x)+g(x)$.
? $\sin(2\pi x)+\sin(2\pi\sqrt2x)$ có tuần hoàn không?
+ Không
- Có, chu kỳ $1$
= Hai chu kỳ $1$ và $\frac1{\sqrt2}$ có tỉ số vô tỉ.
? Hàm tuần hoàn liên tục thì
+ bị chặn và liên tục đều trên $\mathbb R$
- có thể không bị chặn
= Chỉ cần xét trên $[0,1]$ compact.
& Chứng minh hàm tuần hoàn liên tục $f:\mathbb R\to\mathbb C$ bị chặn.
&> $f$ liên tục trên $[0,1]$ compact nên $|f|\le M$ ở đó. Mọi $x$ có dạng $x=t+k$ với $t\in[0,1)$, $k\in\mathbb Z$, nên $|f(x)|=|f(t)|\le M$.

## 16.2
~ $\|e_n\|_2=1$ vì $|e^{2\pi inx}|=1$.
~ $\langle e_n,e_m\rangle=\int_0^1e^{2\pi i(n-m)x}dx=0$ khi $n\ne m$.
? $\langle f,g\rangle$ với $f,g$ phức có tính
+ $\langle g,f\rangle=\overline{\langle f,g\rangle}$
- đối xứng hoàn toàn
= Liên hợp vì có $\bar g$ trong định nghĩa.
? $\|f\|_2=0$ với $f$ liên tục tuần hoàn khi và chỉ khi
+ $f\equiv0$
- $f(0)=0$
= Hàm liên tục không âm có tích phân $0$ thì bằng $0$.
? Bất đẳng thức tam giác cho chuẩn: $\|f+g\|_2$ so với $\|f\|_2+\|g\|_2$ là
+ $\le$
- $\ge$
= Suy ra từ Cauchy–Schwarz.
& Tính $\|f\|_2$ với $f(x)=3e_1(x)+4e_2(x)$.
&> Theo Pythagoras ($e_1\perp e_2$): $\|f\|_2^2=9\|e_1\|^2+16\|e_2\|^2=25$. Vậy $\|f\|_2=5$.
& Chứng minh $\langle e_n,e_m\rangle=0$ khi $n\ne m$.
&> $\int_0^1e^{2\pi ikx}dx=\left[\frac{e^{2\pi ikx}}{2\pi ik}\right]_0^1=\frac{1-1}{2\pi ik}=0$ với $k=n-m\ne0$.

## 16.3
~ $\cos(2\pi x)=\frac{e_1+e_{-1}}{2}$, nên hệ số Fourier là $\frac12$ tại $n=\pm1$.
~ $\sin^2(2\pi x)=\frac12-\frac{e_2+e_{-2}}{4}$.
? Đa thức lượng giác $\sum_{|n|\le N}c_ne_n$ bằng $0$ khi và chỉ khi
+ mọi $c_n=0$
- $c_0=0$
= Các $e_n$ độc lập tuyến tính (trực chuẩn).
? Hệ số Fourier $\hat f(0)$ là
+ giá trị trung bình $\int_0^1f$
- $f(0)$
= $e_0\equiv1$.
? $\hat f(n)$ của $f(x)=\sin(2\pi x)$ khác $0$ tại
+ $n=1$ và $n=-1$
- chỉ $n=1$
= $\sin=\frac{e_1-e_{-1}}{2i}$.
& Tính các hệ số Fourier của $f(x)=\cos^2(2\pi x)$.
&> $\cos^2(2\pi x)=\frac{1+\cos(4\pi x)}{2}=\frac12+\frac14e_2+\frac14e_{-2}$.
&> $\hat f(0)=\frac12$, $\hat f(\pm2)=\frac14$, các hệ số khác bằng $0$.

## 16.4
~ Nhân Fejér $F_N=\sum_{|n|\le N}\left(1-\frac{|n|}{N+1}\right)e_n$ không âm, tích phân $1$, dồn về $0$: là một xấp xỉ đồng nhất.
~ Tích chập với $e_n$ chỉ "lọc" ra thành phần tần số $n$: $f*e_n=\hat f(n)e_n$.
? Hệ số Fourier của $f*g$ là
+ $\hat f(n)\hat g(n)$
- $\hat f(n)+\hat g(n)$
= Tích chập biến thành tích.
? Nhân Dirichlet $D_N=\sum_{|n|\le N}e_n$ có $f*D_N$ bằng
+ tổng Fourier riêng $S_Nf$
- $f$
= Giữ các tần số $|n|\le N$.
? $f*g$ có trơn hơn $f$ không?
+ Thường có: nó kế thừa độ trơn của $g$
- Không bao giờ
= Đây là lý do dùng tích chập để làm mượt.
& Chứng minh $f*e_n=\hat f(n)e_n$.
&> $(f*e_n)(x)=\int_0^1f(y)e^{2\pi in(x-y)}dy=e^{2\pi inx}\int_0^1f(y)e^{-2\pi iny}dy=\hat f(n)e_n(x)$.

## 16.5
~ Sóng vuông: $f=\frac4\pi\left(\sin2\pi x+\frac{\sin6\pi x}3+\frac{\sin10\pi x}5+\cdots\right)$.
~ Áp dụng Plancherel cho răng cưa $f(x)=x$ trên $[0,1)$ suy ra $\sum\frac1{n^2}=\frac{\pi^2}6$.
? Định lý Fourier đảm bảo hội tụ theo
+ chuẩn $L^2$
- từng điểm cho mọi hàm liên tục
= Có hàm liên tục mà chuỗi Fourier phân kỳ tại một điểm.
? Nếu $\sum|\hat f(n)|<\infty$ thì chuỗi Fourier
+ hội tụ đều về $f$
- có thể phân kỳ
= Tiêu chuẩn M với $|\hat f(n)e_n|=|\hat f(n)|$.
? Bất đẳng thức Bessel: $\sum|\hat f(n)|^2$ so với $\|f\|_2^2$ là
+ $\le$ (và Plancherel nói bằng)
- $\ge$
= Pythagoras cho phép chiếu trực giao.
& Tính hệ số Fourier của $f(x)=x$ trên $[0,1)$ (kéo dài tuần hoàn).
&> $\hat f(0)=\int_0^1x\,dx=\frac12$.
&> Với $n\ne0$, từng phần: $\int_0^1xe^{-2\pi inx}dx=\left[\frac{xe^{-2\pi inx}}{-2\pi in}\right]_0^1+\frac{1}{2\pi in}\int_0^1e^{-2\pi inx}dx=\frac{-1}{2\pi in}=\frac{i}{2\pi n}$.
& Từ đó suy ra $\sum_{n\ge1}\frac1{n^2}=\frac{\pi^2}6$.
&> $\|f\|_2^2=\int_0^1x^2=\frac13$. Plancherel: $\frac13=\frac14+\sum_{n\ne0}\frac1{4\pi^2n^2}=\frac14+\frac{2}{4\pi^2}\sum_{n\ge1}\frac1{n^2}$.
&> Vậy $\sum\frac1{n^2}=\left(\frac13-\frac14\right)\cdot\frac{4\pi^2}{2}=\frac{1}{12}\cdot2\pi^2=\frac{\pi^2}{6}$.

## 17.1
~ Phép quay góc $\theta$: $\begin{pmatrix}\cos\theta&-\sin\theta\\\sin\theta&\cos\theta\end{pmatrix}$, $\det=1$.
~ Phép chiếu lên trục $x$: $\begin{pmatrix}1&0\\0&0\end{pmatrix}$, $\det=0$, không khả nghịch.
~ $T(x,y)=(x+1,y)$ **không** tuyến tính vì $T(0)\ne0$.
? Ma trận của $T(x,y)=(2x+y,\,x-y)$ là
+ $\begin{pmatrix}2&1\\1&-1\end{pmatrix}$
- $\begin{pmatrix}2&1\\-1&1\end{pmatrix}$
= Hàng $i$ là hệ số của thành phần thứ $i$.
? $\det(ST)$ bằng
+ $\det S\cdot\det T$
- $\det S+\det T$
= Hệ số co giãn diện tích nhân lên.
? Ánh xạ tuyến tính $\mathbb R^n\to\mathbb R^m$ luôn
+ liên tục (thậm chí Lipschitz)
- có thể gián đoạn
= $\|Tx\|\le\|T\|\|x\|$.
& Tìm ảnh của hình vuông đơn vị qua $T=\begin{pmatrix}1&2\\0&1\end{pmatrix}$ và tính diện tích.
&> $T(1,0)=(1,0)$, $T(0,1)=(2,1)$. Ảnh là hình bình hành đỉnh $(0,0),(1,0),(3,1),(2,1)$ (phép trượt).
&> Diện tích $=|\det T|=1$.

## 17.2
~ $f(x,y)=x^2+y^2$ tại $(1,2)$: $f'(1,2)=(2,4)$, mặt phẳng tiếp xúc $z=5+2(x-1)+4(y-2)$.
~ $f:\mathbb R^2\to\mathbb R^2$, $f(x,y)=(x^2,xy)$: Jacobian $\begin{pmatrix}2x&0\\y&x\end{pmatrix}$.
? Ánh xạ tuyến tính $T$ có đạo hàm tại mọi điểm bằng
+ chính $T$
- $0$
= Xấp xỉ tuyến tính của ánh xạ tuyến tính là chính nó.
? Đạo hàm của $f:\mathbb R^n\to\mathbb R^m$ là ma trận cỡ
+ $m\times n$
- $n\times m$
- $n\times n$
= $m$ hàm thành phần, $n$ biến.
? Khả vi tại một điểm kéo theo
+ liên tục tại điểm đó
- có đạo hàm riêng liên tục
= Ngược lại sai.
& Chứng minh $f(x,y)=xy$ khả vi tại $(a,b)$ với $f'(a,b)=(b,a)$.
&> $f(a+h,b+k)-f(a,b)-(bh+ak)=hk$.
&> $\frac{|hk|}{\sqrt{h^2+k^2}}\le\frac{\sqrt{h^2+k^2}}{2}\to0$.

## 17.3
~ $f(x,y)=x^2y$: $\partial_xf=2xy$, $\partial_yf=x^2$, $\nabla f(1,3)=(6,1)$.
~ Hướng tăng nhanh nhất của $f(x,y)=x^2+y^2$ tại $(1,1)$ là $(1,1)/\sqrt2$ (hướng ra xa gốc).
? $D_vf$ với $v=(\frac35,\frac45)$ và $\nabla f=(2,1)$ bằng
+ $2$
- $3$
- $\frac{11}{5}$
= $2\cdot\frac35+1\cdot\frac45=2$.
? Gradient vuông góc với
+ đường mức $f=c$ qua điểm đó
- trục $x$
= Đạo hàm theo hướng tiếp tuyến của đường mức bằng $0$.
? $D_{-v}f$ so với $D_vf$ (khi $f$ khả vi) là
+ $-D_vf$
- $D_vf$
= Tuyến tính theo $v$.
& Tính đạo hàm theo hướng của $f(x,y)=e^x\sin y$ tại $(0,\frac\pi2)$ theo hướng $v=(1,1)/\sqrt2$.
&> $\nabla f=(e^x\sin y,\,e^x\cos y)=(1,0)$ tại điểm đó.
&> $D_vf=\frac{1}{\sqrt2}$.
& Chứng minh: hàm $\frac{xy}{x^2+y^2}$ có $\partial_xf(0,0)=\partial_yf(0,0)=0$ nhưng không khả vi tại gốc.
&> Trên trục $x$: $f(x,0)=0$, nên $\partial_xf(0,0)=0$; tương tự $\partial_y$.
&> Nếu khả vi thì $f'(0,0)=0$ và $f$ liên tục tại gốc; nhưng $f(t,t)=\frac12\not\to0$. Mâu thuẫn.

## 17.4
~ $f(t)=(\cos t,\sin t)$, $g(x,y)=x^2+y^2$: $g\circ f\equiv1$, đạo hàm $0$; khớp với $\nabla g\cdot f'=(2\cos t,2\sin t)\cdot(-\sin t,\cos t)=0$.
~ Toạ độ cực: $\frac{\partial}{\partial r}f(r\cos\theta,r\sin\theta)=\cos\theta\,f_x+\sin\theta\,f_y$.
? $\frac{d}{dt}f(t^2,\,t^3)$ bằng
+ $2t\,f_x+3t^2f_y$
- $f_x+f_y$
- $2t+3t^2$
= Quy tắc chuỗi nhiều biến.
? Ma trận đạo hàm của $g\circ f$ là
+ tích $g'(f(x))\cdot f'(x)$
- tích theo thứ tự ngược $f'\cdot g'$
= Thứ tự nhân ma trận quan trọng.
? Nếu $f:\mathbb R^2\to\mathbb R^3$ và $g:\mathbb R^3\to\mathbb R$ thì $(g\circ f)'$ có cỡ
+ $1\times2$
- $3\times2$
- $2\times1$
= $(1\times3)(3\times2)$.
& Cho $z=x^2y$, $x=s+t$, $y=st$. Tính $\frac{\partial z}{\partial s}$.
&> $\frac{\partial z}{\partial s}=z_x\frac{\partial x}{\partial s}+z_y\frac{\partial y}{\partial s}=2xy\cdot1+x^2\cdot t$.
&> Thay vào: $2(s+t)st+(s+t)^2t$.

## 17.5
~ $f=x^3y^2$: $f_{xy}=6x^2y=f_{yx}$.
~ Phản ví dụ Clairaut: $f=\frac{xy(x^2-y^2)}{x^2+y^2}$ có $f_{xy}(0,0)=-1\ne1=f_{yx}(0,0)$ (đạo hàm cấp hai không liên tục tại gốc).
? $f(x,y)=x^2+y^2$ tại $(0,0)$ là
+ cực tiểu (Hessian xác định dương)
- yên ngựa
- cực đại
= Hessian $\mathrm{diag}(2,2)$.
? $f(x,y)=xy$ tại gốc là
+ điểm yên ngựa
- cực tiểu
= Hessian $\begin{pmatrix}0&1\\1&0\end{pmatrix}$ có trị riêng $\pm1$.
? Hessian của hàm $C^2$ là ma trận
+ đối xứng
- tam giác
= Nhờ Clairaut.
& Tìm và phân loại điểm dừng của $f(x,y)=x^3-3x+y^2$.
&> $f_x=3x^2-3=0$, $f_y=2y=0$: điểm $(\pm1,0)$.
&> Hessian $\begin{pmatrix}6x&0\\0&2\end{pmatrix}$. Tại $(1,0)$: xác định dương, cực tiểu địa phương. Tại $(-1,0)$: trị riêng $-6,2$, yên ngựa.

## 17.6
~ $f(x)=\frac x2$ trên $\mathbb R$: co với $c=\frac12$, điểm bất động $0$.
~ Phương pháp Newton tìm $\sqrt2$: $x\mapsto\frac{x}2+\frac1x$ là ánh xạ co trên $[1,2]$.
~ $f(x)=x+\frac1x$ trên $[1,\infty)$: $|f(x)-f(y)|<|x-y|$ nhưng không có điểm bất động. Cần hằng số $c<1$ **đều**.
? Ánh xạ co có bao nhiêu điểm bất động trên không gian đầy đủ?
+ Đúng một
- Ít nhất hai
- Có thể không có
= Định lý Banach.
? Sai số sau $n$ lần lặp từ $x_0$ bị chặn bởi
+ $\frac{c^n}{1-c}d(x_1,x_0)$
- $c^n$
- $\frac1n$
= Tổng cấp số nhân.
? $f$ khả vi trên $[a,b]$ với $|f'|\le c<1$ và $f([a,b])\subseteq[a,b]$ thì
+ $f$ là ánh xạ co
- không kết luận
= Định lý giá trị trung bình.
& Chứng minh tính duy nhất trong định lý ánh xạ co.
&> Nếu $f(x)=x$ và $f(y)=y$ thì $d(x,y)=d(f(x),f(y))\le c\,d(x,y)$.
&> Vì $c<1$, suy ra $d(x,y)=0$.
& Chứng minh dãy lặp $x_{n+1}=f(x_n)$ là Cauchy.
&> $d(x_{n+1},x_n)\le c^nd(x_1,x_0)$. Với $m>n$: $d(x_m,x_n)\le(c^n+\cdots+c^{m-1})d(x_1,x_0)\le\frac{c^n}{1-c}d(x_1,x_0)\to0$.

## 17.7
~ $f(x,y)=(e^x\cos y,e^x\sin y)$: Jacobian có $\det=e^{2x}\ne0$ mọi nơi, khả nghịch địa phương khắp nơi, nhưng không đơn ánh ($y$ và $y+2\pi$).
~ $f(x)=x^3$ tại $0$: $f'(0)=0$, và hàm ngược $\sqrt[3]{x}$ không khả vi tại $0$.
? Định lý hàm ngược cần
+ $f$ khả vi liên tục và $\det f'(x_0)\ne0$
- $f$ đơn ánh
- $f$ tuyến tính
= Điều kiện địa phương.
? Đạo hàm của hàm ngược tại $f(x_0)$ là
+ $(f'(x_0))^{-1}$
- $f'(x_0)$
- $-f'(x_0)$
= Nghịch đảo ma trận Jacobian.
? $f(x,y)=(x^2-y^2,2xy)$ tại $(0,0)$
+ không khả nghịch địa phương ($\det=4(x^2+y^2)=0$)
- khả nghịch địa phương
= Đây là $z\mapsto z^2$, gấp đôi góc.
& Kiểm tra định lý hàm ngược cho $f(x,y)=(x+y,\,x-y)$ và tìm $f^{-1}$.
&> $f'=\begin{pmatrix}1&1\\1&-1\end{pmatrix}$, $\det=-2\ne0$.
&> Giải $u=x+y$, $v=x-y$: $x=\frac{u+v}2$, $y=\frac{u-v}2$. Đây là hàm ngược toàn cục, khớp với ma trận nghịch đảo.

## 17.8
~ Đường tròn $x^2+y^2=1$ gần $(0,1)$: $y=\sqrt{1-x^2}$, $y'=-\frac{x}{y}$, khớp công thức $-\frac{F_x}{F_y}$.
~ Mặt cầu $x^2+y^2+z^2=1$ gần $(0,0,1)$ là đồ thị $z=g(x,y)$ vì $F_z=2\ne0$.
? Với $F(x,y)=x^2-y^3$, tại $(0,0)$
+ $F_y=0$, định lý không áp dụng (đường cong có điểm nhọn)
- giải được $y=g(x)$ khả vi
= Đường $y=x^{2/3}$ có điểm nhọn tại gốc.
? Với $F(x,y)=x+y+\sin(xy)$, quanh $(0,0)$ ta viết được
+ $y=g(x)$ với $g'(0)=-1$
- không viết được
= $F_x=1+y\cos(xy)$, $F_y=1+x\cos(xy)$, cả hai bằng $1$ tại gốc.
? Định lý hàm ẩn được chứng minh từ
+ định lý hàm ngược
- định lý Fubini
= Áp dụng cho $(x,y)\mapsto(x,F(x,y))$.
& Cho $x^2y+y^3=10$. Tính $\frac{dy}{dx}$ tại $(1,2)$.
&> $F=x^2y+y^3-10$; $F_x=2xy=4$, $F_y=x^2+3y^2=13$ tại $(1,2)$.
&> $\frac{dy}{dx}=-\frac{4}{13}$.

## 18.1
~ Diện tích hình chữ nhật $[0,3]\times[0,2]$ là $6$; thể tích hộp $[0,1]^3$ là $1$.
~ Một điểm, một đường thẳng trong mặt phẳng, một mặt phẳng trong $\mathbb R^3$ đều nên có thể tích $0$.
? Tính chất nào **không** thể đòi hỏi cho mọi tập con của $\mathbb R$ cùng lúc với các tính chất khác?
+ Cộng tính đếm được cho mọi tập
- $m([0,1])=1$
- bất biến tịnh tiến
= Xem tập Vitali (18.3): phải bỏ "mọi tập".
? Độ đo của $\mathbb Q$ (mong muốn) là
+ $0$
- $\infty$
= Hợp đếm được các điểm, mỗi điểm độ đo $0$.
? Độ đo của $\mathbb R$ là
+ $+\infty$
- $1$
= Chứa vô hạn khoảng rời nhau độ dài $1$.
& Từ các tính chất mong muốn, suy ra $m(\{x\})=0$.
&> $\{x\}$ nằm trong khoảng $[x,x+\frac1n]$ có độ đo $\frac1n$ với mọi $n$ (đơn điệu).
&> Vậy $0\le m(\{x\})\le\frac1n$ với mọi $n$, nên bằng $0$.

## 18.2
~ $m^*([0,1])=1$; $m^*$ của một đường thẳng trong $\mathbb R^2$ là $0$ (phủ bằng các hộp rất dẹt).
~ Tập Cantor: bỏ dần các khoảng giữa, tổng độ dài bỏ đi $=1$, nên $m^*(\text{Cantor})=0$ dù tập này không đếm được.
? Độ đo ngoài có tính
+ cộng tính dưới đếm được: $m^*(\bigcup A_j)\le\sum m^*(A_j)$
- cộng tính đếm được cho mọi tập
= Bất đẳng thức có thể ngặt.
? Tập không đếm được có thể có độ đo ngoài
+ $0$ (tập Cantor)
- luôn dương
= Đếm được đủ để có độ đo $0$, nhưng không cần.
? $m^*(A)$ với $A\subseteq B$ thì
+ $m^*(A)\le m^*(B)$
- $m^*(A)\ge m^*(B)$
= Mỗi phủ của $B$ cũng phủ $A$.
& Chứng minh tập Cantor có độ đo ngoài $0$.
&> Sau bước $k$, tập Cantor nằm trong $2^k$ đoạn, mỗi đoạn dài $3^{-k}$; tổng $\left(\frac23\right)^k$.
&> Vì $\left(\frac23\right)^k\to0$, $m^*=0$.
& Chứng minh $m^*$ cộng tính dưới đếm được.
&> Cho $\varepsilon$, phủ mỗi $A_j$ bằng các hộp có tổng thể tích $\le m^*(A_j)+\varepsilon/2^j$.
&> Gộp tất cả là phủ đếm được của $\bigcup A_j$, tổng $\le\sum m^*(A_j)+\varepsilon$.

## 18.3
~ Hai số $x,y$ cùng lớp khi $x-y\in\mathbb Q$. Mỗi lớp là tập đếm được, có không đếm được lớp.
? Các bản $V+q$ ($q\in\mathbb Q\cap[-1,1]$) rời nhau vì
+ nếu hai bản chung một điểm thì $V$ chứa hai đại diện của cùng một lớp
- $V$ đếm được
= Mỗi lớp chỉ có một đại diện trong $V$.
? Hợp các $V+q$ với $q\in\mathbb Q\cap[-1,1]$
+ chứa $[0,1]$ và nằm trong $[-1,2]$
- bằng $\mathbb R$
= Mọi $x\in[0,1]$ có đại diện $v$ với $x-v\in\mathbb Q\cap[-1,1]$.
? Nếu $m(V)=0$ thì hợp có độ đo
+ $0$, mâu thuẫn với chứa $[0,1]$
- $1$
= Nếu $m(V)>0$ thì tổng vô hạn số bằng nhau là $\infty>3$.
& Tóm tắt vì sao $V$ không đo được.
&> Nếu đo được, các $V+q$ có cùng độ đo $a$ (bất biến tịnh tiến) và rời nhau, nên hợp có độ đo $\sum_q a$, bằng $0$ hoặc $\infty$.
&> Nhưng $1\le m(\text{hợp})\le3$. Không giá trị $a$ nào thoả mãn.

## 18.4
~ Mọi khoảng, mọi tập mở, mọi tập đóng, mọi tập Borel đều đo được.
~ Tập độ đo ngoài $0$ luôn đo được (bất kỳ tập con của tập Cantor cũng đo được).
? Phần bù của tập đo được
+ đo được
- có thể không đo được
= Định nghĩa Carathéodory đối xứng giữa $E$ và $\mathbb R^n\setminus E$.
? $m(A\cup B)$ với $A,B$ đo được bất kỳ bằng
+ $m(A)+m(B)-m(A\cap B)$ (khi hữu hạn)
- $m(A)+m(B)$
= Như nguyên lý bù trừ.
? Nếu $E_1\supseteq E_2\supseteq\cdots$ đo được và $m(E_1)<\infty$ thì
+ $m(\bigcap E_j)=\lim m(E_j)$
- không kết luận được
= Cần $m(E_1)<\infty$: $E_j=[j,\infty)$ có $m=\infty$ nhưng giao rỗng.
& Chứng minh: nếu $m^*(E)=0$ thì $E$ đo được.
&> Với mọi $A$: $m^*(A\cap E)\le m^*(E)=0$ và $m^*(A\setminus E)\le m^*(A)$.
&> Nên $m^*(A\cap E)+m^*(A\setminus E)\le m^*(A)$; chiều $\ge$ luôn đúng (cộng tính dưới).

## 18.5
~ $\mathbb 1_E$ đo được khi và chỉ khi $E$ đo được.
~ Mọi hàm liên tục đo được: $\{f>a\}$ là tập mở.
? Tổng, tích của hai hàm đo được là
+ đo được
- có thể không
= Dùng $\{f+g>a\}=\bigcup_{q\in\mathbb Q}\{f>q\}\cap\{g>a-q\}$.
? Giới hạn điểm của dãy hàm đo được là
+ đo được
- có thể không
= Khác hẳn tích phân Riemann.
? $f$ đo được thì $|f|$
+ đo được
- có thể không
= Hợp thành với hàm liên tục.
& Chứng minh hàm đơn điệu $f:\mathbb R\to\mathbb R$ đo được.
&> Nếu $f$ tăng, $\{x: f(x)>a\}$ là một khoảng (dạng $(c,\infty)$ hoặc $[c,\infty)$, hoặc $\emptyset$, $\mathbb R$).
&> Mọi khoảng đều đo được.

## 19.1
~ $s=2\cdot\mathbb 1_{[0,1]}+5\cdot\mathbb 1_{[3,4]}$: $\int s=2+5=7$.
~ $s=\mathbb 1_{\mathbb Q\cap[0,1]}+3\cdot\mathbb 1_{[0,1]\setminus\mathbb Q}$: $\int s=0+3=3$.
? Tích phân hàm đơn giản không phụ thuộc
+ cách viết $s$ thành tổ hợp hàm chỉ thị
- giá trị của $s$
= Cần chứng minh, như tích phân hằng từng đoạn.
? $\int(s+t)$ với $s,t$ đơn giản không âm bằng
+ $\int s+\int t$
- $\max(\int s,\int t)$
= Tuyến tính.
? Hàm đơn giản khác hàm hằng từng đoạn ở chỗ
+ các tập $E_j$ chỉ cần đo được, không cần là khoảng
- nhận vô hạn giá trị
= Ví dụ $\mathbb 1_{\mathbb Q}$ là hàm đơn giản, không là hằng từng đoạn.
& Xây dãy hàm đơn giản tăng về $f(x)=x$ trên $[0,1]$ và tính tích phân.
&> $\varphi_n(x)=\frac{\lfloor2^nx\rfloor}{2^n}$, lấy giá trị $\frac k{2^n}$ trên $[\frac k{2^n},\frac{k+1}{2^n})$.
&> $\int\varphi_n=\sum_{k=0}^{2^n-1}\frac{k}{2^n}\cdot\frac1{2^n}=\frac{2^n-1}{2^{n+1}}\to\frac12$.

## 19.2
~ $\int_{\mathbb R}\frac{1}{1+x^2}dx=\pi$ (hữu hạn); $\int_{\mathbb R}1\,dx=\infty$.
~ Hội tụ đơn điệu: $\int_0^1\sum_{n\ge0}x^n(1-x)\,dx=\sum\int_0^1x^n(1-x)dx=\sum\frac1{(n+1)(n+2)}=1$.
? Fatou có thể ngặt, ví dụ
+ $f_n=\mathbb 1_{[n,n+1]}$: $\int\liminf f_n=0<1=\liminf\int f_n$
- không bao giờ ngặt
= Khối lượng chạy ra vô cực.
? $\int f=0$ với $f\ge0$ đo được thì
+ $f=0$ hầu khắp nơi
- $f\equiv0$
= Có thể khác $0$ trên tập độ đo $0$.
? Hội tụ đơn điệu có cần $\int f<\infty$?
+ Không, kết luận đúng cả khi bằng $+\infty$
- Có
= Một ưu điểm lớn.
& Dùng hội tụ đơn điệu tính $\int_0^\infty e^{-x}dx$.
&> $f_n=e^{-x}\mathbb 1_{[0,n]}$ tăng về $e^{-x}$, $\int f_n=1-e^{-n}\to1$.
& Chứng minh Chebyshev: $m(\{f\ge c\})\le\frac1c\int f$ với $f\ge0$, $c>0$.
&> $c\cdot\mathbb 1_{\{f\ge c\}}\le f$ khắp nơi. Lấy tích phân hai vế (đơn điệu).

## 19.3
~ $\int_{\mathbb R}\frac{\sin x}{x}$ không tồn tại theo Lebesgue (vì $\int\frac{|\sin x|}{|x|}=\infty$), dù tích phân suy rộng Riemann bằng $\pi$.
~ $\lim_n\int_0^1\frac{n x}{1+n^2x^2}dx=0$: tính trực tiếp được $\frac{\ln(1+n^2)}{2n}\to0$, khớp với giới hạn điểm $0$.
? Tích phân Lebesgue của $f$ có dấu được định nghĩa khi
+ $\int|f|<\infty$
- $f$ bị chặn
= Tránh dạng $\infty-\infty$.
? $|\int f|$ so với $\int|f|$ là
+ $\le$
- $\ge$
= Bất đẳng thức tam giác cho tích phân.
? Hội tụ bị chặn áp dụng cho $f_n(x)=\frac{x^n}{1+x^2}$ trên $[0,1]$ với hàm trội
+ $F=1$
- không có hàm trội
= $|f_n|\le1$ khả tích trên $[0,1]$; vậy $\int f_n\to0$.
& Tính $\lim_n\int_0^1\left(1-\frac xn\right)^n dx$.
&> $(1-\frac xn)^n\to e^{-x}$ điểm, và $0\le(1-\frac xn)^n\le1$ trên $[0,1]$.
&> Hội tụ bị chặn: giới hạn $=\int_0^1e^{-x}dx=1-e^{-1}$.

## 19.4
~ $\int_{[0,1]}x^2\,dm=\frac13$, giống Riemann.
~ Tích phân suy rộng $\int_1^\infty\frac{\sin x}{x}dx$ (Riemann) hội tụ, nhưng hàm không khả tích Lebesgue trên $[1,\infty)$.
? Hàm khả tích Riemann trên $[a,b]$ thì
+ khả tích Lebesgue, cùng giá trị
- có thể không khả tích Lebesgue
= Định lý 8.4.1.
? Ưu điểm chính của Lebesgue là
+ định lý hội tụ mạnh (đơn điệu, bị chặn)
- dễ tính toán hơn
= Đổi giới hạn và tích phân dễ dàng.
? $\int_{[0,1]}\mathbb 1_{[0,1]\setminus\mathbb Q}$ bằng
+ $1$
- $0$
- không tồn tại
= $m$ của tập số vô tỉ trong $[0,1]$.
& Giải thích vì sao Riemann khả tích kéo theo Lebesgue khả tích với cùng giá trị.
&> Với hàm bậc thang $h\le f\le g$: Lebesgue cho $\int h\le\int f\le\int g$ (hàm bậc thang là hàm đơn giản).
&> Lấy sup theo $h$ và inf theo $g$, cả hai bằng tích phân Riemann, nên tích phân Lebesgue bằng nó.

## 19.5
~ $\int_0^1\int_0^1(x+y)\,dx\,dy=1$, cả hai thứ tự.
~ Phản ví dụ: $f=\frac{x^2-y^2}{(x^2+y^2)^2}$ trên $(0,1)^2$: $\int_0^1\int_0^1f\,dy\,dx=\frac\pi4$, còn $\int_0^1\int_0^1f\,dx\,dy=-\frac\pi4$.
? Tonelli cho phép đổi thứ tự khi
+ $f\ge0$ đo được
- $f$ bị chặn
= Không cần khả tích.
? Để áp dụng Fubini cho $f$ có dấu, trước hết kiểm tra
+ $\int\int|f|<\infty$ (bằng Tonelli)
- $f$ liên tục
= Quy trình chuẩn.
? $\int_0^1\int_0^xy\,dy\,dx$ bằng
+ $\frac16$
- $\frac12$
- $\frac13$
= $\int_0^1\frac{x^2}2dx$.
& Đổi thứ tự lấy tích phân: $\int_0^1\int_x^1e^{y^2}dy\,dx$.
&> Miền là $0\le x\le y\le1$. Đổi thứ tự: $\int_0^1\int_0^ye^{y^2}dx\,dy=\int_0^1ye^{y^2}dy$.
&> $=\frac{e-1}{2}$. (Thứ tự ban đầu không tính được bằng nguyên hàm sơ cấp.)
`);
