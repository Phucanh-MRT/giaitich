/* Phần I, Ch.9–11. */
(window.STEWART = window.STEWART || []).push(String.raw`
# 9 | Phương trình vi phân | 0
> Mô tả sự thay đổi bằng phương trình chứa đạo hàm, rồi giải bằng hình, bằng số và bằng công thức.

## 9.1 | Mô hình hoá bằng phương trình vi phân
| Phương trình vi phân (PTVP) liên hệ một hàm chưa biết với đạo hàm của nó. Nó nảy sinh tự nhiên khi ta biết **quy luật thay đổi**: tốc độ tăng dân số tỉ lệ với dân số, gia tốc lò xo tỉ lệ với độ lệch.
| Nghiệm là một **hàm số**. Thường có cả họ nghiệm; một điều kiện ban đầu chọn ra một nghiệm riêng (bài toán giá trị ban đầu).
! Bậc :: Bậc của PTVP là cấp đạo hàm cao nhất có mặt.
! Bài toán giá trị ban đầu :: Tìm $y$ thoả $y'=f(t,y)$ và $y(t_0)=y_0$.
! Mô hình cơ bản :: $\frac{dP}{dt}=kP$ (tăng trưởng mũ); $\frac{dP}{dt}=kP(1-\frac PM)$ (logistic); $m\frac{d^2x}{dt^2}=-kx$ (lò xo).
~ Kiểm tra $y=\frac{1+ce^t}{1-ce^t}$ là nghiệm của $y'=\frac12(y^2-1)$ bằng cách đạo hàm và thế vào.
? $y=e^{3t}$ là nghiệm của
+ $y'=3y$
- $y'=y+3$
- $y''=3y$
= $y'=3e^{3t}$.
? Phương trình $y''+y=0$ có bậc
+ $2$
- $1$
- $0$
= Đạo hàm cấp cao nhất là $y''$.
? Họ nghiệm của $y'=2x$ là
+ $y=x^2+C$
- $y=2x^2$
- $y=x^2$
= Nguyên hàm.
& Với giá trị nào của $r$ thì $y=e^{rt}$ là nghiệm của $y''+y'-6y=0$?
&> Thế vào: $(r^2+r-6)e^{rt}=0$, nên $r^2+r-6=0$, $r=2$ hoặc $r=-3$.
& Chứng minh $y=x-\frac1x$ là nghiệm của $xy'+y=2x$.
&> $y'=1+\frac1{x^2}$. $xy'+y=x+\frac1x+x-\frac1x=2x$. Đúng.

## 9.2 | Trường hướng và phương pháp Euler
@w slopefield preset=euler
| Không cần giải, vẫn **nhìn** được nghiệm: tại mỗi điểm $(x,y)$ vẽ một vạch ngắn có độ dốc $f(x,y)$. Nghiệm là đường cong đi theo các vạch. Phương pháp Euler đi theo các vạch từng bước nhỏ $h$.
! Trường hướng :: Tập các vạch độ dốc $f(x,y)$ của $y'=f(x,y)$.
! Euler :: $x_{n+1}=x_n+h$, $y_{n+1}=y_n+h\,f(x_n,y_n)$.
! Sai số :: Sai số toàn cục của Euler tỉ lệ với $h$; giảm $h$ một nửa thì sai số khoảng một nửa.
~ $y'=x+y$, $y(0)=1$, $h=0{,}1$: $y_1=1{,}1$, $y_2=1{,}22$, $y_3=1{,}362$. Nghiệm đúng $y(0{,}3)=2e^{0{,}3}-1{,}3\approx1{,}3997$.
? Trong trường hướng của $y'=y$, các vạch nằm ngang ở đâu?
+ Dọc trục $y=0$
- Dọc trục $x=0$
- Không có
= Độ dốc bằng $y$.
? Euler cho $y'=y$, $y(0)=1$, $h=0{,}5$, sau 2 bước ($x=1$) được
+ $2{,}25$
- $e$
- $2$
= $1\to1{,}5\to2{,}25$, nhỏ hơn $e$.
? Với nghiệm lõm lên, Euler cho giá trị
+ nhỏ hơn nghiệm thật
- lớn hơn
= Đi theo tiếp tuyến nằm dưới đồ thị.
& Dùng Euler với $h=0{,}2$ cho $y'=x-y^2$, $y(0)=1$, ước lượng $y(0{,}4)$.
&> $y_1=1+0{,}2(0-1)=0{,}8$.
&> $y_2=0{,}8+0{,}2(0{,}2-0{,}64)=0{,}712$.
& Mô tả trường hướng của $y'=1-y$ và đoán dáng nghiệm.
&> Độ dốc $0$ dọc $y=1$; dương khi $y<1$, âm khi $y>1$.
&> Mọi nghiệm tiến về $y=1$ khi $x\to\infty$: $y=1+Ce^{-x}$.

## 9.3 | Phương trình tách biến
@w slopefield preset=sep
| Khi $y'=g(x)h(y)$, đưa mọi $y$ về một vế, mọi $x$ về vế kia: $\frac{dy}{h(y)}=g(x)dx$, rồi lấy tích phân hai vế.
! Phương pháp :: $\int\frac{dy}{h(y)}=\int g(x)\,dx+C$.
! Quỹ đạo trực giao :: Họ đường cắt vuông góc với họ cho trước: thay độ dốc $m$ bằng $-\frac1m$.
! Bài toán hoà trộn :: $\frac{dy}{dt}=(\text{tốc độ vào})-(\text{tốc độ ra})$.
~ $\frac{dy}{dx}=\frac{x^2}{y^2}$: $y^2dy=x^2dx$, $y^3=x^3+C$, $y=\sqrt[3]{x^3+C}$.
~ Bể 5000 l nước muối chứa 20 kg muối; bơm nước chứa 0,03 kg/l vào 25 l/phút, trộn đều, chảy ra cùng tốc độ: $y'=0{,}75-\frac{y}{200}$, $y(t)=150-130e^{-t/200}$.
? $y'=xy$ có nghiệm tổng quát
+ $y=Ce^{x^2/2}$
- $y=Ce^x$
- $y=\frac{x^2}2+C$
= $\frac{dy}y=x\,dx$.
? $y'=\frac{x}{y}$, $y(0)=2$ cho
+ $y=\sqrt{x^2+4}$
- $y=x+2$
- $y=2e^x$
= $y^2=x^2+4$, chọn nhánh dương.
? Tách biến được khi vế phải có dạng
+ tích một hàm của $x$ và một hàm của $y$
- tổng một hàm của $x$ và một hàm của $y$
= Ví dụ $y'=x+y$ không tách được.
& Giải $\frac{dy}{dx}=\frac{6x^2}{2y+\cos y}$, $y(0)=\pi$.
&> $\int(2y+\cos y)dy=\int6x^2dx$: $y^2+\sin y=2x^3+C$. Thế $y(0)=\pi$: $C=\pi^2$.
&> Nghiệm ẩn $y^2+\sin y=2x^3+\pi^2$.
& Tìm quỹ đạo trực giao của họ $x=ky^2$.
&> Đạo hàm: $1=2kyy'$, thay $k=\frac x{y^2}$: $y'=\frac{y}{2x}$. Độ dốc trực giao $-\frac{2x}y$.
&> $y\,dy=-2x\,dx$: $\frac{y^2}2=-x^2+C$, tức các elip $x^2+\frac{y^2}2=C$.

## 9.4 | Mô hình tăng trưởng dân số
@w slopefield preset=logistic
| Tăng trưởng mũ không thể kéo dài mãi vì tài nguyên có hạn. Mô hình **logistic** thêm sức chứa $M$: khi $P$ nhỏ tăng gần như mũ, khi $P$ gần $M$ tốc độ chậm lại về $0$.
! Logistic :: $\frac{dP}{dt}=kP\left(1-\frac PM\right)$.
! Nghiệm :: $P(t)=\dfrac{M}{1+Ae^{-kt}}$, với $A=\frac{M-P_0}{P_0}$.
! Điểm cân bằng :: $P=0$ (không bền) và $P=M$ (bền). Tăng nhanh nhất tại $P=\frac M2$.
~ Cá trong hồ: $M=10000$, $P_0=1000$, $k=0{,}5$/năm: $P(t)=\frac{10000}{1+9e^{-0{,}5t}}$; đạt $5000$ sau $2\ln9\approx4{,}4$ năm.
? Trong mô hình logistic, nếu $P_0>M$ thì
+ $P$ giảm dần về $M$
- $P$ tăng mãi
- $P$ giảm về $0$
= $P'<0$ khi $P>M$.
? Tốc độ tăng lớn nhất khi
+ $P=\frac M2$
- $P=M$
- $P=0$
= $kP(1-\frac PM)$ là parabol theo $P$, đỉnh tại $\frac M2$.
? Mô hình có thu hoạch $\frac{dP}{dt}=kP(1-\frac PM)-c$ nghĩa là
+ mỗi đơn vị thời gian lấy đi lượng cố định $c$
- sức chứa giảm
= Nếu $c$ quá lớn thì quần thể tuyệt chủng.
& Giải phương trình logistic bằng tách biến.
&> $\frac{dP}{P(1-P/M)}=k\,dt$. Phân thức: $\frac{M}{P(M-P)}=\frac1P+\frac1{M-P}$.
&> $\ln\left|\frac{P}{M-P}\right|=kt+C$, nên $\frac{M-P}{P}=Ae^{-kt}$, $P=\frac{M}{1+Ae^{-kt}}$.
& Dân số thế giới mô hình logistic với $M=100$ tỉ, $k=0{,}03$; năm 2000 có 6 tỉ. Dự báo năm 2100.
&> $A=\frac{100-6}6\approx15{,}67$. $P(100)=\frac{100}{1+15{,}67e^{-3}}\approx56{,}2$ tỉ (minh hoạ của mô hình, không phải dự báo thật).

## 9.5 | Phương trình tuyến tính cấp một
| Dạng $y'+P(x)y=Q(x)$. Nhân hai vế với **thừa số tích phân** $I(x)=e^{\int P}$ thì vế trái trở thành đạo hàm của một tích, $(Iy)'=IQ$, rồi tích phân là xong.
! Thừa số tích phân :: $I(x)=e^{\int P(x)dx}$, khi đó $(I y)'=I Q$.
! Nghiệm :: $y=\frac{1}{I(x)}\left[\int I(x)Q(x)dx+C\right]$.
! Mạch điện RL :: $L\frac{dI}{dt}+RI=E(t)$.
~ $y'+3x^2y=6x^2$: $I=e^{x^3}$, $(e^{x^3}y)'=6x^2e^{x^3}$, $y=2+Ce^{-x^3}$.
? Thừa số tích phân của $y'+\frac{2}{x}y=x$ ($x>0$) là
+ $x^2$
- $e^{2x}$
- $\frac1{x^2}$
= $e^{2\ln x}$.
? $y'-y=e^x$ có nghiệm
+ $y=(x+C)e^x$
- $y=Ce^x$
- $y=e^x+C$
= $(e^{-x}y)'=1$.
? Mạch $L\frac{dI}{dt}+RI=E$ (hằng): khi $t\to\infty$
+ $I\to\frac ER$
- $I\to0$
- $I\to\infty$
= $I=\frac ER(1-e^{-Rt/L})$.
& Giải $xy'+y=2x$, $y(1)=0$.
&> Chia cho $x$: $y'+\frac1xy=2$. $I=x$: $(xy)'=2x$, $xy=x^2+C$.
&> $y(1)=0$ cho $C=-1$: $y=x-\frac1x$.
& Mạch RL với $E=40$ V, $R=12\,\Omega$, $L=4$ H, $I(0)=0$. Tìm $I(t)$.
&> $4I'+12I=40$, tức $I'+3I=10$. $I=\frac{10}3+Ce^{-3t}$, $C=-\frac{10}3$.
&> $I(t)=\frac{10}3(1-e^{-3t})$ A.

## 9.6 | Hệ thú – mồi
@w predprey
| Hai loài tương tác: mồi $R$ (thỏ) tăng khi một mình, bị ăn khi gặp thú; thú $W$ (sói) chết dần khi thiếu mồi, sinh sôi khi có mồi. Hệ Lotka–Volterra cho quỹ đạo khép kín: hai quần thể dao động lệch pha.
! Lotka–Volterra :: $\frac{dR}{dt}=kR-aRW$, $\frac{dW}{dt}=-rW+bRW$.
! Điểm cân bằng :: $(0,0)$ và $\left(\frac rb,\frac ka\right)$.
! Mặt phẳng pha :: Vẽ $(R(t),W(t))$; $\frac{dW}{dR}=\frac{-rW+bRW}{kR-aRW}$.
~ $k=0{,}08$, $a=0{,}001$, $r=0{,}02$, $b=0{,}00002$: cân bằng tại $R=1000$, $W=80$.
? Tại điểm cân bằng $(\frac rb,\frac ka)$
+ cả hai quần thể đứng yên
- mồi tuyệt chủng
= $R'=W'=0$.
? Đỉnh số thú xuất hiện so với đỉnh số mồi
+ muộn hơn
- sớm hơn
- cùng lúc
= Thú cần thời gian để sinh sôi sau khi mồi nhiều.
? Nếu không có thú ($W=0$), mồi
+ tăng theo hàm mũ
- giảm
- dao động
= $R'=kR$.
& Với hệ $R'=0{,}05R-0{,}0001RW$, $W'=-0{,}1W+0{,}00002RW$, tìm điểm cân bằng khác $0$.
&> $R'=0$: $W=\frac{0{,}05}{0{,}0001}=500$. $W'=0$: $R=\frac{0{,}1}{0{,}00002}=5000$.
&> Cân bằng $(5000,500)$.

# 10 | Phương trình tham số và toạ độ cực | 0
> Mô tả đường cong bằng tham số hoặc bằng góc và bán kính; tính tiếp tuyến, diện tích, độ dài; đường conic.

## 10.1 | Đường cong cho bởi phương trình tham số
@w param
| Thay vì $y=f(x)$, cho cả $x$ và $y$ theo một tham số $t$ (thường là thời gian): $(x(t),y(t))$. Đường cong có **hướng** đi, có thể tự cắt, quay vòng, điều mà đồ thị hàm số không làm được.
! Tham số hoá :: $x=f(t)$, $y=g(t)$, $t\in I$.
! Đường tròn :: $x=r\cos t$, $y=r\sin t$, $t\in[0,2\pi]$.
! Cycloid :: Điểm trên vành bánh xe lăn: $x=r(\theta-\sin\theta)$, $y=r(1-\cos\theta)$.
~ $x=t^2-2t$, $y=t+1$: khử $t$ được $x=(y-1)^2-2(y-1)$, một parabol nằm ngang.
? $x=\cos t$, $y=\sin t$ với $t\in[0,4\pi]$ vẽ
+ đường tròn đơn vị, đi hai vòng
- nửa đường tròn
= Mỗi $2\pi$ một vòng.
? $x=2\cos t$, $y=3\sin t$ là
+ elip $\frac{x^2}4+\frac{y^2}9=1$
- đường tròn
- hypebol
= $\cos^2+\sin^2=1$.
? Đổi $t\to-t$ trong $x=\cos t,y=\sin t$ làm
+ đổi chiều đi (thuận kim đồng hồ)
- đổi hình dạng
= Cùng đường tròn, ngược chiều.
& Tìm tham số hoá đoạn thẳng từ $(1,2)$ tới $(4,-1)$.
&> $x=1+3t$, $y=2-3t$, $t\in[0,1]$.
& Khử tham số: $x=\sqrt t$, $y=1-t$.
&> $t=x^2$ với $x\ge0$: $y=1-x^2$, chỉ nhánh $x\ge0$.

## 10.2 | Giải tích với đường cong tham số
@w param mode=tangent
| Hệ số góc tiếp tuyến $\frac{dy}{dx}=\frac{dy/dt}{dx/dt}$. Tiếp tuyến nằm ngang khi $y'(t)=0$, thẳng đứng khi $x'(t)=0$. Diện tích, độ dài cung, diện tích mặt đều viết lại theo $t$.
! Hệ số góc :: $\frac{dy}{dx}=\frac{\dot y}{\dot x}$, $\frac{d^2y}{dx^2}=\frac{d(dy/dx)/dt}{\dot x}$.
! Diện tích :: $A=\int y\,dx=\int_\alpha^\beta g(t)f'(t)\,dt$.
! Độ dài cung :: $L=\int_\alpha^\beta\sqrt{\dot x^2+\dot y^2}\,dt$.
! Diện tích mặt :: $S=\int2\pi y\sqrt{\dot x^2+\dot y^2}\,dt$.
~ Một vòm cycloid ($r=1$): diện tích $3\pi$, độ dài $8$.
? Với $x=t^2$, $y=t^3-3t$, tiếp tuyến nằm ngang tại
+ $t=\pm1$
- $t=0$
- $t=\pm\sqrt3$
= $\dot y=3t^2-3=0$.
? Độ dài đường tròn $x=r\cos t,y=r\sin t$ trên $[0,2\pi]$
+ $2\pi r$
- $\pi r^2$
= $\sqrt{\dot x^2+\dot y^2}=r$.
? Đường $x=t^2-3$, $y=t^3-3t$ tự cắt tại điểm mà hai tiếp tuyến có hệ số góc
+ $\pm\sqrt3$
- $\pm1$
- $0$
= Tự cắt tại $t=\pm\sqrt3$ (điểm $(0,0)$); $\frac{dy}{dx}=\frac{3t^2-3}{2t}=\frac{6}{\pm2\sqrt3}=\pm\sqrt3$.
& Tính độ dài một vòm cycloid $x=\theta-\sin\theta$, $y=1-\cos\theta$, $\theta\in[0,2\pi]$.
&> $\dot x^2+\dot y^2=(1-\cos\theta)^2+\sin^2\theta=2-2\cos\theta=4\sin^2\frac\theta2$.
&> $L=\int_0^{2\pi}2\sin\frac\theta2d\theta=\left[-4\cos\frac\theta2\right]_0^{2\pi}=8$.
& Tìm tiếp tuyến của $x=\sec t$, $y=\tan t$ tại $t=\frac\pi4$.
&> $\frac{dy}{dx}=\frac{\sec^2t}{\sec t\tan t}=\csc t=\sqrt2$. Điểm $(\sqrt2,1)$.
&> Tiếp tuyến $y-1=\sqrt2(x-\sqrt2)$, tức $y=\sqrt2x-1$.

## 10.3 | Toạ độ cực
@w polar
| Xác định điểm bằng khoảng cách $r$ tới gốc và góc $\theta$ với tia $Ox$. Nhiều đường cong (hoa hồng, xoắn ốc, hình tim) có phương trình cực rất gọn mà Descartes thì rối.
! Chuyển đổi :: $x=r\cos\theta$, $y=r\sin\theta$; $r^2=x^2+y^2$, $\tan\theta=\frac yx$.
! Đường cong quen thuộc :: $r=a$ (đường tròn), $r=2a\cos\theta$ (đường tròn qua gốc), $r=a(1+\cos\theta)$ (hình tim), $r=\cos(n\theta)$ (hoa hồng), $r=a\theta$ (xoắn ốc Archimedes).
! Tiếp tuyến :: $\frac{dy}{dx}=\frac{\frac{dr}{d\theta}\sin\theta+r\cos\theta}{\frac{dr}{d\theta}\cos\theta-r\sin\theta}$.
~ $r=\cos2\theta$: hoa hồng 4 cánh. $r=\cos3\theta$: hoa hồng 3 cánh (với $n$ lẻ có $n$ cánh, $n$ chẵn có $2n$ cánh).
? Điểm cực $(2,\frac\pi3)$ trong Descartes là
+ $(1,\sqrt3)$
- $(\sqrt3,1)$
- $(2,\frac\pi3)$
= $x=2\cos\frac\pi3$, $y=2\sin\frac\pi3$.
? $r=4\sin\theta$ là
+ đường tròn tâm $(0,2)$ bán kính $2$
- đường tròn tâm gốc bán kính $4$
- đường thẳng
= $r^2=4r\sin\theta$: $x^2+y^2=4y$.
? $r=\sin5\theta$ có bao nhiêu cánh?
+ $5$
- $10$
- $2{,}5$
= $n$ lẻ.
& Đổi $x^2+y^2=2x$ sang toạ độ cực.
&> $r^2=2r\cos\theta$, nên $r=2\cos\theta$ (đường tròn qua gốc, tâm $(1,0)$).
& Tìm điểm trên hình tim $r=1+\sin\theta$ có tiếp tuyến nằm ngang.
&> $y=r\sin\theta=\sin\theta+\sin^2\theta$, $\frac{dy}{d\theta}=\cos\theta(1+2\sin\theta)=0$.
&> $\theta=\frac\pi2,\frac{3\pi}2,\frac{7\pi}6,\frac{11\pi}6$. Tại $\frac{3\pi}2$ (gốc) cần xét riêng vì $\frac{dx}{d\theta}=0$ cũng bằng $0$ (điểm nhọn).

## 10.4 | Diện tích và độ dài trong toạ độ cực
@w polar mode=area
| Chia miền thành các **hình quạt** mỏng thay vì hình chữ nhật: quạt bán kính $r$, góc $d\theta$ có diện tích $\frac12r^2d\theta$.
! Diện tích :: $A=\int_a^b\frac12r^2\,d\theta$.
! Giữa hai đường :: $A=\frac12\int_a^b(r_{\text{ngoài}}^2-r_{\text{trong}}^2)\,d\theta$.
! Độ dài cung :: $L=\int_a^b\sqrt{r^2+\left(\frac{dr}{d\theta}\right)^2}d\theta$.
~ Một cánh của $r=\cos2\theta$ ($-\frac\pi4\le\theta\le\frac\pi4$): $A=\frac12\int\cos^22\theta\,d\theta=\frac\pi8$.
? Diện tích hình tròn $r=a$ theo công thức cực
+ $\frac12\int_0^{2\pi}a^2d\theta=\pi a^2$
- $\int_0^{2\pi}a\,d\theta$
= Đúng như mong đợi.
? Diện tích bên trong hình tim $r=1+\cos\theta$ là
+ $\frac{3\pi}2$
- $\pi$
- $2\pi$
= $\frac12\int_0^{2\pi}(1+\cos\theta)^2d\theta$.
? Độ dài hình tim $r=1+\sin\theta$ là
+ $8$
- $2\pi$
- $4$
= $r^2+r'^2=2+2\sin\theta$; tích phân cho $8$.
& Tính diện tích miền bên trong $r=3\sin\theta$ và bên ngoài $r=1+\sin\theta$.
&> Giao điểm: $3\sin\theta=1+\sin\theta$, $\sin\theta=\frac12$, $\theta=\frac\pi6,\frac{5\pi}6$.
&> $A=\frac12\int_{\pi/6}^{5\pi/6}[9\sin^2\theta-(1+\sin\theta)^2]d\theta=\int_{\pi/6}^{\pi/2}(8\sin^2\theta-1-2\sin\theta)d\theta=\pi$.

## 10.5 | Đường conic
@w conic
| Parabol, elip, hypebol là giao của mặt nón với mặt phẳng. Chúng còn được định nghĩa bằng khoảng cách: parabol cách đều tiêu điểm và đường chuẩn; elip có tổng khoảng cách tới hai tiêu điểm không đổi; hypebol có hiệu không đổi.
! Parabol :: $x^2=4py$, tiêu điểm $(0,p)$, đường chuẩn $y=-p$.
! Elip :: $\frac{x^2}{a^2}+\frac{y^2}{b^2}=1$ ($a\ge b$), tiêu điểm $(\pm c,0)$ với $c^2=a^2-b^2$.
! Hypebol :: $\frac{x^2}{a^2}-\frac{y^2}{b^2}=1$, tiêu điểm $(\pm c,0)$ với $c^2=a^2+b^2$, tiệm cận $y=\pm\frac bax$.
~ Gương parabol phản xạ tia song song trục vào tiêu điểm: chảo vệ tinh, đèn pha.
? Elip $\frac{x^2}{25}+\frac{y^2}{9}=1$ có tiêu điểm
+ $(\pm4,0)$
- $(\pm3,0)$
- $(\pm5,0)$
= $c^2=25-9$.
? Tiệm cận của $\frac{x^2}{9}-\frac{y^2}{16}=1$
+ $y=\pm\frac43x$
- $y=\pm\frac34x$
- $y=\pm\frac{16}9x$
= $\frac ba=\frac43$.
? Parabol $y^2=8x$ có tiêu điểm
+ $(2,0)$
- $(0,2)$
- $(8,0)$
= $4p=8$.
& Tìm phương trình elip có tiêu điểm $(0,\pm2)$ và đỉnh $(0,\pm3)$.
&> Trục lớn theo $y$: $a=3$, $c=2$, $b^2=9-4=5$.
&> $\frac{x^2}5+\frac{y^2}9=1$.
& Đưa $x^2+4y^2-6x+8y+9=0$ về dạng chuẩn.
&> Hoàn thành bình phương: $(x-3)^2+4(y+1)^2=9-9+4=4$.
&> $\frac{(x-3)^2}{4}+(y+1)^2=1$: elip tâm $(3,-1)$, $a=2$, $b=1$.

## 10.6 | Đường conic trong toạ độ cực
@w conic mode=polar
| Đặt một tiêu điểm tại gốc, mọi conic có dạng chung $r=\frac{ed}{1+e\cos\theta}$ với **tâm sai** $e$: $e<1$ elip, $e=1$ parabol, $e>1$ hypebol. Đây là dạng tự nhiên của quỹ đạo hành tinh (định luật Kepler).
! Định nghĩa thống nhất :: Tập điểm $P$ với $\frac{|PF|}{|Pl|}=e$ ($F$ tiêu điểm, $l$ đường chuẩn).
! Dạng cực :: $r=\dfrac{ed}{1\pm e\cos\theta}$ hoặc $\dfrac{ed}{1\pm e\sin\theta}$.
! Quỹ đạo :: Điểm gần nhất (cận nhật) $a(1-e)$, xa nhất (viễn nhật) $a(1+e)$.
~ Trái Đất: $e\approx0{,}017$, quỹ đạo gần tròn. Sao chổi Halley: $e\approx0{,}97$, elip rất dẹt.
? $r=\frac{10}{3-2\cos\theta}$ là
+ elip ($e=\frac23$)
- parabol
- hypebol
= Chia cho $3$: $\frac{10/3}{1-\frac23\cos\theta}$.
? $r=\frac{4}{1+\cos\theta}$ là
+ parabol
- elip
- đường tròn
= $e=1$.
? Tâm sai $e=0$ ứng với
+ đường tròn
- đường thẳng
= Hai tiêu điểm trùng nhau.
& Tìm dạng cực của conic có tiêu điểm tại gốc, $e=\frac12$, đường chuẩn $x=6$.
&> $r=\frac{ed}{1+e\cos\theta}=\frac{3}{1+\frac12\cos\theta}=\frac{6}{2+\cos\theta}$.
& Một hành tinh có trục lớn $a=1{,}5\times10^8$ km, $e=0{,}1$. Tìm khoảng cách gần nhất và xa nhất tới Mặt Trời.
&> Gần nhất $a(1-e)=1{,}35\times10^8$ km, xa nhất $a(1+e)=1{,}65\times10^8$ km.

# 11 | Dãy và chuỗi vô hạn | 0
> Tiêu chuẩn hội tụ, chuỗi luỹ thừa và chuỗi Taylor. Phần chặt chẽ ở Chương 23, 24 và 32.

## 11.1 | Dãy số
@w seq mode=limit k=e
@see T23.1 T23.3 T23.6
| Dãy $a_n$ hội tụ về $L$ nếu các số hạng đến gần $L$ tuỳ ý khi $n$ đủ lớn. Nếu $a_n=f(n)$ với $f$ có giới hạn tại vô cực thì dãy có cùng giới hạn, nên dùng được L'Hôpital.
! Quy tắc :: Giới hạn dãy tuân theo các quy tắc tổng, tích, thương; định lý kẹp.
! Hàm liên tục :: $a_n\to L$ và $f$ liên tục tại $L$ thì $f(a_n)\to f(L)$.
! Đơn điệu bị chặn :: Dãy tăng bị chặn trên thì hội tụ.
! Cơ bản :: $r^n\to0$ khi $|r|<1$; $\frac{n!}{n^n}\to0$; $\sqrt[n]{n}\to1$.
~ $\lim\frac{\ln n}{n}=0$ (L'Hôpital cho $\frac{\ln x}{x}$).
~ $a_n=\frac{n!}{n^n}=\frac{1\cdot2\cdots n}{n\cdot n\cdots n}\le\frac1n\to0$.
? $\lim_{n\to\infty}\frac{n}{n+1}$ bằng
+ $1$
- $0$
- $\infty$
= Chia tử và mẫu cho $n$.
? Dãy $a_n=(-1)^n$
+ phân kỳ
- hội tụ về $0$
- hội tụ về $1$
= Dao động giữa $1$ và $-1$.
? $\lim\left(1+\frac2n\right)^n$ bằng
+ $e^2$
- $1$
- $\infty$
= Dạng $1^\infty$.
& Chứng minh dãy $a_1=2$, $a_{n+1}=\frac12(a_n+6)$ hội tụ và tìm giới hạn.
&> Quy nạp: $a_n<6$ và $a_{n+1}-a_n=\frac12(6-a_n)>0$: tăng, bị chặn trên.
&> Giới hạn $L=\frac12(L+6)$, $L=6$.
& Tính $\lim\frac{n^2}{e^n}$.
&> L'Hôpital hai lần cho $\frac{x^2}{e^x}$: $\frac{2}{e^x}\to0$.

## 11.2 | Chuỗi
@w series
@see T24.2
| Chuỗi $\sum a_n$ hội tụ khi dãy tổng riêng $s_n=a_1+\cdots+a_n$ hội tụ. Hai mẫu quan trọng: **chuỗi hình học** $\sum ar^{n-1}$ (hội tụ khi $|r|<1$) và **chuỗi điều hoà** $\sum\frac1n$ (phân kỳ).
! Chuỗi hình học :: $\sum_{n=1}^\infty ar^{n-1}=\frac{a}{1-r}$ khi $|r|<1$.
! Tiêu chuẩn phân kỳ :: $a_n\not\to0$ thì $\sum a_n$ phân kỳ.
! Chuỗi lồng :: $\sum(b_n-b_{n+1})=b_1-\lim b_n$.
~ $0{,}\overline{27}=\frac{27}{100}+\frac{27}{100^2}+\cdots=\frac{27/100}{1-1/100}=\frac{3}{11}$.
~ $\sum\frac{1}{n(n+1)}=\sum\left(\frac1n-\frac1{n+1}\right)=1$.
? $\sum_{n=0}^\infty\left(\frac23\right)^n$ bằng
+ $3$
- $2$
- $\frac23$
= $\frac1{1-2/3}$.
? $\sum\frac{n^2}{5n^2+4}$
+ phân kỳ vì số hạng $\to\frac15$
- hội tụ
= Tiêu chuẩn phân kỳ.
? $\sum_{n=1}^\infty 2^{2n}3^{1-n}$
+ phân kỳ ($r=\frac43>1$)
- hội tụ về $12$
= $4^n\cdot3\cdot3^{-n}=3\left(\frac43\right)^n$.
& Một quả bóng thả từ 10 m, mỗi lần nảy lên $\frac34$ độ cao trước. Tổng quãng đường?
&> Rơi $10$, rồi mỗi lần nảy đi lên và xuống $2\cdot10\left(\frac34\right)^k$.
&> Tổng $10+2\cdot\frac{7{,}5}{1-3/4}=10+60=70$ m.
& Tìm các giá trị $x$ để $\sum_{n=0}^\infty\frac{(x-3)^n}{2^n}$ hội tụ và tính tổng.
&> Hình học với $r=\frac{x-3}2$, cần $|x-3|<2$: $1<x<5$.
&> Tổng $\frac{1}{1-\frac{x-3}2}=\frac{2}{5-x}$.

## 11.3 | Tiêu chuẩn tích phân và ước lượng tổng
@see T28.6 T24.3
| Với $a_n=f(n)$, $f$ dương, liên tục, giảm: chuỗi và tích phân $\int_1^\infty f$ cùng hội tụ hoặc cùng phân kỳ, vì tổng là các hình chữ nhật kẹp sát dưới đồ thị.
! Tiêu chuẩn tích phân :: $\sum f(n)$ hội tụ khi và chỉ khi $\int_1^\infty f(x)dx$ hội tụ.
! Chuỗi $p$ :: $\sum\frac1{n^p}$ hội tụ khi và chỉ khi $p>1$.
! Ước lượng phần dư :: $\int_{n+1}^\infty f\le R_n\le\int_n^\infty f$.
~ $\sum\frac1{n^2+1}$ hội tụ vì $\int_1^\infty\frac{dx}{x^2+1}=\frac\pi4$.
~ Ước lượng $\sum\frac{1}{n^3}$ bằng $s_{10}$: sai số $R_{10}\le\int_{10}^\infty\frac{dx}{x^3}=0{,}005$.
? $\sum\frac{\ln n}{n}$
+ phân kỳ
- hội tụ
= $\int\frac{\ln x}{x}dx=\frac{(\ln x)^2}2\to\infty$.
? $\sum\frac{1}{n\sqrt n}$
+ hội tụ ($p=\frac32$)
- phân kỳ
= Chuỗi $p$.
? Để $R_n<0{,}001$ với $\sum\frac1{n^2}$ cần
+ $n\ge1000$
- $n\ge32$
- $n\ge100$
= $R_n\le\int_n^\infty\frac{dx}{x^2}=\frac1n$.
& Xét hội tụ của $\sum_{n\ge2}\frac{1}{n(\ln n)^2}$.
&> $f(x)=\frac{1}{x(\ln x)^2}$ dương, giảm. $\int_2^\infty\frac{dx}{x(\ln x)^2}$, đặt $u=\ln x$: $\int_{\ln2}^\infty\frac{du}{u^2}=\frac1{\ln2}$.
&> Hội tụ.
& Ước lượng $\zeta(3)=\sum\frac1{n^3}$ với sai số nhỏ hơn $0{,}005$ bằng $s_{10}$ và cải tiến.
&> $s_{10}\approx1{,}1975$. Kẹp: $s_{10}+\int_{11}^\infty\le\zeta(3)\le s_{10}+\int_{10}^\infty$, tức $1{,}2016\le\zeta(3)\le1{,}2025$.
&> Lấy trung điểm $\approx1{,}2021$ (giá trị thật $1{,}20206\ldots$).

## 11.4 | Tiêu chuẩn so sánh
@see T24.3
| So chuỗi lạ với chuỗi đã biết (hình học hoặc chuỗi $p$). So sánh trực tiếp cần bất đẳng thức đúng chiều; **so sánh giới hạn** chỉ cần tỉ số $\frac{a_n}{b_n}$ tiến về một số dương hữu hạn.
! So sánh :: $0\le a_n\le b_n$: $\sum b_n$ hội tụ thì $\sum a_n$ hội tụ; $\sum a_n$ phân kỳ thì $\sum b_n$ phân kỳ.
! So sánh giới hạn :: $\frac{a_n}{b_n}\to c>0$ hữu hạn thì hai chuỗi cùng tính chất.
~ $\sum\frac{5}{2n^2+4n+3}$: $\le\frac5{2n^2}$, hội tụ.
~ $\sum\frac{1}{2^n-1}$: so sánh giới hạn với $\frac1{2^n}$, tỉ số $\to1$, hội tụ.
? $\sum\frac{1}{n-\frac12}$ so với $\sum\frac1n$
+ phân kỳ (so sánh giới hạn, tỉ số $\to1$)
- hội tụ
= Cùng tính chất với chuỗi điều hoà.
? $\sum\frac{\sin^2n}{n^3}$
+ hội tụ
- phân kỳ
= $\le\frac1{n^3}$.
? $\sum\frac{2n^2+3n}{\sqrt{5+n^5}}$ nên so sánh với
+ $\sum\frac{1}{\sqrt n}$, phân kỳ
- $\sum\frac1{n^2}$
= Bậc: $\frac{n^2}{n^{5/2}}=n^{-1/2}$.
& Xét $\sum\frac{\ln n}{n^2}$.
&> $\ln n<\sqrt n$ khi $n$ lớn, nên $\frac{\ln n}{n^2}<\frac{1}{n^{3/2}}$.
&> $\sum\frac1{n^{3/2}}$ hội tụ, nên chuỗi hội tụ.
& Xét $\sum\frac{1}{\sqrt{n^2+1}}$.
&> So sánh giới hạn với $\frac1n$: tỉ số $\frac{n}{\sqrt{n^2+1}}\to1$.
&> Chuỗi điều hoà phân kỳ, nên chuỗi phân kỳ.

## 11.5 | Chuỗi đan dấu
@w series k=alt
@see T24.2
| Chuỗi đan dấu có số hạng giảm về $0$ thì hội tụ: tổng riêng nhảy qua lại, mỗi lần một ít hơn. Và sai số khi dừng ở $s_n$ không vượt số hạng đầu tiên bị bỏ.
! Tiêu chuẩn Leibniz :: $b_n\ge b_{n+1}$, $b_n\to0$ thì $\sum(-1)^{n-1}b_n$ hội tụ.
! Ước lượng :: $|s-s_n|\le b_{n+1}$.
~ $1-\frac12+\frac13-\cdots=\ln2$.
~ $\sum\frac{(-1)^n}{n!}=e^{-1}$; dừng ở $n=6$ sai số $\le\frac1{7!}<0{,}0002$.
? $\sum\frac{(-1)^n n}{n+1}$
+ phân kỳ (số hạng không $\to0$)
- hội tụ theo Leibniz
= Phải kiểm tra $b_n\to0$.
? Ước lượng $\sum\frac{(-1)^{n-1}}{n^3}$ với sai số $<0{,}001$ cần
+ $n=10$ số hạng
- $n=3$
- $n=1000$
= Cần $b_{n+1}=\frac1{(n+1)^3}<0{,}001$, tức $n+1>10$.
? $\sum\frac{(-1)^n}{\ln n}$ ($n\ge2$)
+ hội tụ
- phân kỳ
= $\frac1{\ln n}$ giảm về $0$.
& Xét $\sum\frac{(-1)^{n+1}n^2}{n^3+1}$.
&> $b_n=\frac{n^2}{n^3+1}\to0$. Giảm khi $n\ge2$: $f(x)=\frac{x^2}{x^3+1}$ có $f'=\frac{x(2-x^3)}{(x^3+1)^2}<0$ khi $x>\sqrt[3]2$.
&> Theo Leibniz, hội tụ.

## 11.6 | Hội tụ tuyệt đối; tiêu chuẩn tỉ số và căn
@w series preset=ratio
@see T24.4 T24.5
| Hội tụ tuyệt đối ($\sum|a_n|$ hội tụ) mạnh hơn hội tụ, và cho phép sắp xếp lại tuỳ ý. Tỉ số và căn so chuỗi với chuỗi hình học: nếu số hạng giảm như $r^n$ với $r<1$ thì hội tụ.
! Hội tụ tuyệt đối :: $\sum|a_n|$ hội tụ thì $\sum a_n$ hội tụ. Hội tụ mà không tuyệt đối gọi là hội tụ có điều kiện.
! Tỉ số :: $L=\lim\left|\frac{a_{n+1}}{a_n}\right|$: $L<1$ hội tụ tuyệt đối, $L>1$ phân kỳ, $L=1$ không kết luận.
! Căn :: $L=\lim\sqrt[n]{|a_n|}$, cùng kết luận.
~ $\sum\frac{n^3}{3^n}$: tỉ số $\to\frac13$, hội tụ.
~ $\sum\left(\frac{2n+3}{3n+2}\right)^n$: căn $\to\frac23$, hội tụ.
? $\sum\frac{(-1)^n}{n}$ là
+ hội tụ có điều kiện
- hội tụ tuyệt đối
- phân kỳ
= $\sum\frac1n$ phân kỳ.
? $\sum\frac{n^n}{n!}$: tỉ số tiến về
+ $e$, phân kỳ
- $1$
- $0$
= $\left(\frac{n+1}{n}\right)^n\to e$.
? $\sum\frac{\cos n}{n^2}$
+ hội tụ tuyệt đối
- hội tụ có điều kiện
= $\left|\frac{\cos n}{n^2}\right|\le\frac1{n^2}$.
& Xét $\sum\frac{(-1)^n n^3}{3^n}$.
&> Tỉ số $\left|\frac{(n+1)^3/3^{n+1}}{n^3/3^n}\right|=\frac13\left(1+\frac1n\right)^3\to\frac13<1$.
&> Hội tụ tuyệt đối.
& Xét $\sum\frac{5^n}{n!}$ và tính tổng.
&> Tỉ số $\frac{5}{n+1}\to0$: hội tụ. Tổng (từ $n=0$) là $e^5$.

## 11.7 | Chiến lược kiểm tra chuỗi
| Nhìn dạng trước khi chọn tiêu chuẩn: chuỗi $p$ hay hình học thì kết luận ngay; số hạng không $\to0$ thì phân kỳ; giống chuỗi $p$/hình học thì so sánh; đan dấu thì Leibniz; có giai thừa hoặc mũ $n$ thì tỉ số; có $(\cdot)^n$ thì căn; dễ tích phân thì tích phân.
! Thứ tự gợi ý :: Phân kỳ → $p$/hình học → so sánh → đan dấu → tỉ số/căn → tích phân.
~ $\sum\frac{n-1}{2n+1}$: số hạng $\to\frac12$, phân kỳ.
~ $\sum ne^{-n^2}$: tích phân $\int xe^{-x^2}=\frac12e^{-1}$ hữu hạn, hội tụ.
? $\sum\frac{2^n}{n^{10}}$
+ phân kỳ (số hạng $\to\infty$)
- hội tụ
= Hàm mũ thắng đa thức.
? $\sum\frac{1}{n^{1+1/n}}$
+ phân kỳ (so sánh giới hạn với $\frac1n$, vì $n^{1/n}\to1$)
- hội tụ (vì số mũ $>1$)
= Số mũ $>1$ nhưng tiến về $1$, không đủ.
? $\sum\frac{(-1)^n}{\sqrt n}$ dùng
+ Leibniz
- tỉ số
= Tỉ số cho $L=1$.
& Xét $\sum\left(\frac{n}{n+1}\right)^{n^2}$.
&> Căn: $\left(\frac{n}{n+1}\right)^n=\frac{1}{(1+1/n)^n}\to\frac1e<1$. Hội tụ.
& Xét $\sum\sin\frac1n$.
&> So sánh giới hạn với $\frac1n$: $\frac{\sin(1/n)}{1/n}\to1$. Phân kỳ.

## 11.8 | Chuỗi luỹ thừa
@w taylor preset=geom
@see T32.1
| Chuỗi luỹ thừa $\sum c_n(x-a)^n$ là "đa thức bậc vô hạn". Nó hội tụ trên một khoảng tâm $a$ bán kính $R$; trong khoảng hội tụ tuyệt đối, ngoài khoảng phân kỳ, tại hai đầu mút phải xét riêng.
! Bán kính hội tụ :: Ba khả năng: chỉ hội tụ tại $x=a$ ($R=0$); hội tụ mọi $x$ ($R=\infty$); hoặc có $R>0$.
! Tìm $R$ :: Thường dùng tiêu chuẩn tỉ số: $\lim\left|\frac{c_{n+1}}{c_n}\right||x-a|<1$.
~ $\sum\frac{(x-3)^n}{n}$: $R=1$, khoảng $[2,4)$ (hội tụ tại $2$, phân kỳ tại $4$).
~ $\sum\frac{x^n}{n!}$: $R=\infty$. $\sum n!x^n$: $R=0$.
? Bán kính hội tụ của $\sum\frac{x^n}{3^n}$ là
+ $3$
- $\frac13$
- $1$
= $\left|\frac x3\right|<1$.
? Khoảng hội tụ của $\sum\frac{x^n}{n^2}$
+ $[-1,1]$
- $(-1,1)$
- $[-1,1)$
= Tại $\pm1$ hội tụ tuyệt đối.
? $\sum\frac{(-1)^nx^{2n}}{2^{2n}(n!)^2}$ (hàm Bessel) có bán kính
+ $\infty$
- $2$
- $1$
= Tỉ số $\frac{x^2}{4(n+1)^2}\to0$.
& Tìm bán kính và khoảng hội tụ của $\sum\frac{n(x+2)^n}{3^{n+1}}$.
&> Tỉ số $\frac{n+1}{n}\cdot\frac{|x+2|}{3}\to\frac{|x+2|}3<1$: $R=3$, khoảng $(-5,1)$.
&> Tại $x=1$: $\sum\frac n3$ phân kỳ; tại $x=-5$: $\sum\frac{(-1)^nn}3$ phân kỳ. Khoảng $(-5,1)$.

## 11.9 | Biểu diễn hàm số bằng chuỗi luỹ thừa
@see T32.2 T32.3
| Từ một chuỗi đã biết ($\frac1{1-x}=\sum x^n$), thay biến, nhân, đạo hàm hoặc tích phân **từng số hạng** để được chuỗi của hàm khác. Trong khoảng hội tụ, đạo hàm và tích phân từng số hạng là hợp lệ và giữ nguyên bán kính.
! Đạo hàm và tích phân :: $\frac{d}{dx}\sum c_nx^n=\sum nc_nx^{n-1}$, $\int\sum c_nx^n=C+\sum\frac{c_nx^{n+1}}{n+1}$, cùng bán kính $R$.
~ $\frac{1}{1+x^2}=\sum(-1)^nx^{2n}$, tích phân được $\arctan x=\sum\frac{(-1)^nx^{2n+1}}{2n+1}$ ($|x|\le1$).
~ $\ln(1+x)=\sum_{n\ge1}\frac{(-1)^{n-1}x^n}{n}$.
? Chuỗi của $\frac{1}{1-x^2}$ là
+ $\sum x^{2n}$
- $\sum x^n$
- $\sum(-1)^nx^{2n}$
= Thay $x$ bằng $x^2$.
? Chuỗi của $\frac{1}{(1-x)^2}$ là
+ $\sum_{n\ge1}nx^{n-1}$
- $\sum x^{2n}$
= Đạo hàm $\frac1{1-x}$.
? Từ chuỗi $\arctan$, cho $x=1$ được
+ $\frac\pi4=1-\frac13+\frac15-\cdots$
- $\frac\pi2=\sum\frac1n$
= Công thức Leibniz.
& Tìm chuỗi luỹ thừa của $\frac{x}{2+x}$ và bán kính hội tụ.
&> $\frac{x}{2+x}=\frac x2\cdot\frac1{1+x/2}=\frac x2\sum\left(-\frac x2\right)^n=\sum\frac{(-1)^nx^{n+1}}{2^{n+1}}$.
&> Hội tụ khi $|x|<2$: $R=2$.
& Tính $\int_0^{0{,}5}\frac{dx}{1+x^7}$ với sai số $<10^{-7}$.
&> $\frac{1}{1+x^7}=\sum(-1)^nx^{7n}$, tích phân: $\sum\frac{(-1)^n(0{,}5)^{7n+1}}{7n+1}=0{,}5-\frac{0{,}5^8}{8}+\frac{0{,}5^{15}}{15}-\cdots$
&> Chuỗi đan dấu, số hạng thứ tư $\frac{0{,}5^{22}}{22}<10^{-7}$: tổng ba số hạng $\approx0{,}4995137$.

## 11.10 | Chuỗi Taylor và Maclaurin
@w taylor
@see T32.2 T32.5 T32.7
| Nếu $f$ có biểu diễn chuỗi luỹ thừa tại $a$, hệ số buộc phải là $c_n=\frac{f^{(n)}(a)}{n!}$. Chuỗi Taylor bằng $f$ khi phần dư $R_n\to0$, kiểm tra bằng bất đẳng thức Taylor.
! Chuỗi Taylor :: $f(x)=\sum_{n=0}^\infty\frac{f^{(n)}(a)}{n!}(x-a)^n$; Maclaurin khi $a=0$.
! Bất đẳng thức Taylor :: $|f^{(n+1)}|\le M$ trên $|x-a|\le d$ thì $|R_n(x)|\le\frac{M}{(n+1)!}|x-a|^{n+1}$.
! Bảng :: $e^x=\sum\frac{x^n}{n!}$, $\sin x=\sum\frac{(-1)^nx^{2n+1}}{(2n+1)!}$, $\cos x=\sum\frac{(-1)^nx^{2n}}{(2n)!}$, $(1+x)^k=\sum\binom knx^n$ ($|x|<1$).
~ $e^{-x^2}=\sum\frac{(-1)^nx^{2n}}{n!}$, nên $\int_0^1e^{-x^2}dx=1-\frac13+\frac1{10}-\frac1{42}+\cdots\approx0{,}7468$.
? Hệ số $x^3$ trong chuỗi Maclaurin của $\sin x$ là
+ $-\frac16$
- $\frac16$
- $\frac13$
= $\frac{f'''(0)}{3!}=\frac{-1}{6}$.
? Chuỗi Taylor của $\ln x$ tại $a=1$ bắt đầu bằng
+ $(x-1)-\frac{(x-1)^2}{2}+\cdots$
- $1+(x-1)+\cdots$
= $\ln1=0$, $(\ln)'(1)=1$, $(\ln)''(1)=-1$.
? $\lim_{x\to0}\frac{e^x-1-x}{x^2}$ tính nhanh bằng chuỗi được
+ $\frac12$
- $1$
- $0$
= $e^x-1-x=\frac{x^2}2+\cdots$
& Tìm chuỗi Maclaurin của $f(x)=x\cos x$ tới $x^5$.
&> $\cos x=1-\frac{x^2}2+\frac{x^4}{24}-\cdots$, nhân $x$: $x-\frac{x^3}2+\frac{x^5}{24}-\cdots$
& Chứng minh chuỗi Maclaurin của $e^x$ hội tụ về $e^x$ với mọi $x$.
&> Trên $|t|\le d$: $|f^{(n+1)}(t)|=e^t\le e^d$. Bất đẳng thức Taylor: $|R_n(x)|\le\frac{e^d}{(n+1)!}d^{n+1}$.
&> $\frac{d^{n+1}}{(n+1)!}\to0$ (số hạng của chuỗi $e^d$ hội tụ), nên $R_n\to0$.

## 11.11 | Ứng dụng của đa thức Taylor
@w taylor k=cos
| Đa thức Taylor bậc thấp là công cụ xấp xỉ: máy tính tính $\sin$, $e^x$ bằng chúng; vật lý dùng $\sin\theta\approx\theta$ và năng lượng tương đối tính $\approx mc^2+\frac12mv^2$. Bất đẳng thức Taylor hoặc ước lượng chuỗi đan dấu cho sai số.
! Xấp xỉ :: $f(x)\approx T_n(x)$, sai số $|R_n(x)|\le\frac{M}{(n+1)!}|x-a|^{n+1}$.
! Thuyết tương đối :: $K=mc^2\left[(1-\frac{v^2}{c^2})^{-1/2}-1\right]\approx\frac12mv^2$ khi $v\ll c$.
~ $\sqrt[3]{x}\approx2+\frac{x-8}{12}-\frac{(x-8)^2}{288}$ gần $8$; trên $[7,9]$ sai số $<0{,}0004$.
? Xấp xỉ $\sin x\approx x-\frac{x^3}6$ trên $|x|\le0{,}3$ có sai số tối đa khoảng
+ $\frac{0{,}3^5}{120}\approx2\times10^{-5}$
- $0{,}3$
- $0{,}0045$
= Chuỗi đan dấu: số hạng kế tiếp.
? Vì sao máy tính không dùng chuỗi Taylor của $e^x$ tại $0$ cho $x=100$ trực tiếp?
+ Cần rất nhiều số hạng; người ta dùng $e^{100}=(e^{1})^{100}$ hoặc tách số mũ
- Chuỗi phân kỳ tại $100$
= Chuỗi hội tụ nhưng chậm.
? Đa thức Taylor bậc 2 của $\cos x$ tại $0$ là
+ $1-\frac{x^2}2$
- $1-x$
- $1+\frac{x^2}2$
= Hai số hạng đầu khác $0$.
& Ước lượng $e^{0{,}1}$ bằng $T_3$ và chặn sai số.
&> $T_3(0{,}1)=1+0{,}1+0{,}005+0{,}000167=1{,}105167$.
&> $|R_3|\le\frac{e^{0{,}1}}{24}(0{,}1)^4<\frac{1{,}2\cdot10^{-4}}{24}=5\times10^{-6}$.
& Con lắc chu kỳ $T=4\sqrt{\frac Lg}\int_0^{\pi/2}\frac{dx}{\sqrt{1-k^2\sin^2x}}$. Dùng xấp xỉ bậc một cho $k$ nhỏ.
&> $(1-k^2\sin^2x)^{-1/2}\approx1+\frac{k^2}{2}\sin^2x$.
&> $T\approx4\sqrt{\frac Lg}\left(\frac\pi2+\frac{k^2}2\cdot\frac\pi4\right)=2\pi\sqrt{\frac Lg}\left(1+\frac{k^2}4\right)$.
`);
