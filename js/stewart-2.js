/* Phần I, Ch.5–8. Tham chiếu "T" dùng số chương hiển thị của phần chặt chẽ (18–36). */
(window.STEWART = window.STEWART || []).push(String.raw`
# 5 | Tích phân | 0
> Diện tích dưới đường cong như giới hạn của tổng, và định lý cơ bản nối tích phân với đạo hàm.

## 5.1 | Diện tích và quãng đường
@w riemann
| Muốn đo diện tích dưới đồ thị, chia đoạn thành $n$ dải hẹp, thay mỗi dải bằng hình chữ nhật, cộng lại. Cho $n\to\infty$, tổng tiến về diện tích thật.
| Cùng ý tưởng đó tính quãng đường khi vận tốc thay đổi: quãng đường $\approx\sum v(t_i)\Delta t$.
! Tổng Riemann :: $\sum_{i=1}^nf(x_i^*)\Delta x$, với $\Delta x=\frac{b-a}n$ và $x_i^*$ trong khoảng con thứ $i$.
! Diện tích :: $A=\lim_{n\to\infty}\sum_{i=1}^nf(x_i)\Delta x$ (đầu mút phải, trái hay điểm giữa đều cho cùng giới hạn khi $f$ liên tục).
~ Diện tích dưới $y=x^2$ trên $[0,1]$: $R_n=\frac{(n+1)(2n+1)}{6n^2}\to\frac13$.
~ Xe chạy với vận tốc đo mỗi 5 giây: $v=10,14,17,19,20$ m/s; quãng đường ước lượng $5(10+14+17+19)=300$ m (đầu mút trái).
? Với $f$ tăng, tổng đầu mút trái $L_n$ so với diện tích
+ nhỏ hơn
- lớn hơn
- bằng
= Hình chữ nhật nằm dưới đồ thị.
? $R_4$ của $f(x)=x$ trên $[0,4]$ bằng
+ $10$
- $8$
- $6$
= $1+2+3+4$.
? $\sum_{i=1}^n i^2$ bằng
+ $\frac{n(n+1)(2n+1)}6$
- $\frac{n(n+1)}2$
- $n^3$
= Công thức tổng bình phương.
& Ước lượng diện tích dưới $y=\frac1x$ trên $[1,2]$ bằng $M_4$ (điểm giữa).
&> $\Delta x=\frac14$, điểm giữa $1{,}125;\ 1{,}375;\ 1{,}625;\ 1{,}875$.
&> $M_4=\frac14\left(\frac1{1{,}125}+\frac1{1{,}375}+\frac1{1{,}625}+\frac1{1{,}875}\right)\approx0{,}6912$. (Giá trị đúng $\ln2\approx0{,}6931$.)
& Tính chính xác diện tích dưới $y=x^3$ trên $[0,1]$ bằng giới hạn của $R_n$.
&> $R_n=\sum_{i=1}^n\frac{i^3}{n^3}\cdot\frac1n=\frac{1}{n^4}\left(\frac{n(n+1)}2\right)^2\to\frac14$.

## 5.2 | Tích phân xác định
@w riemann preset=cont
@see T28.3 T28.4 T28.5
| Tích phân xác định $\int_a^bf(x)\,dx$ là giới hạn của tổng Riemann. Nó là **diện tích có dấu**: phần trên trục hoành tính dương, phần dưới tính âm.
| Hàm liên tục (hoặc chỉ có hữu hạn bước nhảy) đều khả tích. Phần III (Chương 28) xây dựng tích phân này một cách chặt chẽ.
! Định nghĩa :: $\int_a^bf(x)\,dx=\lim_{n\to\infty}\sum_{i=1}^nf(x_i^*)\Delta x$.
! Tính chất :: Tuyến tính; $\int_a^b=\int_a^c+\int_c^b$; $\int_b^a=-\int_a^b$; $f\le g\Rightarrow\int f\le\int g$.
! Ước lượng :: $m\le f\le M$ trên $[a,b]$ thì $m(b-a)\le\int_a^bf\le M(b-a)$.
~ $\int_0^3(x-1)dx=\frac{(2)^2}{2}-\frac{1}{2}=\frac32$ (diện tích tam giác trên trừ tam giác dưới).
~ $\int_0^1\sqrt{1-x^2}dx=\frac\pi4$ (một phần tư hình tròn).
? $\int_{-2}^2x^3dx$ bằng
+ $0$
- $8$
- $16$
= Hàm lẻ trên khoảng đối xứng.
? $\int_1^1e^{x^2}dx$ bằng
+ $0$
- $e$
- không tính được
= Cận trùng nhau.
? $\int_0^1e^{-x^2}dx$ nằm trong khoảng
+ $[e^{-1},1]$
- $[0,e^{-1}]$
- $[1,e]$
= $e^{-1}\le e^{-x^2}\le1$ trên $[0,1]$.
& Viết $\lim_{n\to\infty}\sum_{i=1}^n\frac{i^4}{n^5}$ thành tích phân và tính.
&> $\sum\left(\frac in\right)^4\frac1n$ là tổng Riemann của $x^4$ trên $[0,1]$.
&> Giới hạn $=\int_0^1x^4dx=\frac15$.
& Tính $\int_0^5|x-2|\,dx$ bằng diện tích.
&> Hai tam giác: trên $[0,2]$ diện tích $\frac{2\cdot2}2=2$; trên $[2,5]$ diện tích $\frac{3\cdot3}2=4{,}5$. Tổng $6{,}5$.

## 5.3 | Định lý cơ bản của giải tích
@w ftc k=b
@see T28.9
| Hai phép toán tưởng chừng không liên quan (tiếp tuyến và diện tích) hoá ra là ngược nhau. **Phần 1**: hàm diện tích $g(x)=\int_a^xf$ có đạo hàm $f(x)$. **Phần 2**: $\int_a^bf=F(b)-F(a)$ với $F$ là nguyên hàm bất kỳ.
| Nhờ phần 2, tính tích phân không cần giới hạn tổng nữa, chỉ cần tìm nguyên hàm.
! Phần 1 :: $f$ liên tục thì $\dfrac{d}{dx}\displaystyle\int_a^xf(t)\,dt=f(x)$.
! Phần 2 :: $\displaystyle\int_a^bf(x)\,dx=F(b)-F(a)$ với $F'=f$.
! Kết hợp quy tắc chuỗi :: $\dfrac{d}{dx}\displaystyle\int_a^{u(x)}f(t)dt=f(u(x))\,u'(x)$.
~ $\int_1^3e^xdx=e^3-e$.
~ $\frac{d}{dx}\int_1^{x^4}\sec t\,dt=\sec(x^4)\cdot4x^3$.
? $\int_0^{\pi}\sin x\,dx$ bằng
+ $2$
- $0$
- $1$
= $[-\cos x]_0^\pi=1+1$.
? $\frac{d}{dx}\int_0^x\sqrt{1+t^2}\,dt$ bằng
+ $\sqrt{1+x^2}$
- $\frac{x}{\sqrt{1+x^2}}$
- $0$
= Phần 1.
? Vì sao $\int_{-1}^1\frac{dx}{x^2}=[-\frac1x]_{-1}^1=-2$ là sai?
+ $\frac1{x^2}$ không liên tục (không bị chặn) trên $[-1,1]$
- Tính nhầm nguyên hàm
= Phần 2 cần $f$ liên tục trên cả đoạn; hàm dương mà "tích phân âm" là dấu hiệu sai.
& Tính $\int_1^4\frac{x-1}{\sqrt x}dx$.
&> $\frac{x-1}{\sqrt x}=x^{1/2}-x^{-1/2}$, nguyên hàm $\frac23x^{3/2}-2x^{1/2}$.
&> $\left(\frac{16}3-4\right)-\left(\frac23-2\right)=\frac43+\frac43=\frac83$.
& Tìm $\frac{d}{dx}\int_{x}^{x^2}e^{t^2}dt$.
&> Viết $\int_x^{x^2}=\int_0^{x^2}-\int_0^x$. Đạo hàm: $e^{x^4}\cdot2x-e^{x^2}$.

## 5.4 | Tích phân bất định và định lý biến thiên toàn phần
| Ký hiệu $\int f(x)\,dx$ chỉ họ nguyên hàm $F(x)+C$. Phần 2 của định lý cơ bản đọc theo cách khác: **tích phân của tốc độ thay đổi bằng tổng thay đổi**.
! Tích phân bất định :: $\int f(x)\,dx=F(x)+C$ với $F'=f$.
! Biến thiên toàn phần :: $\int_a^bF'(x)\,dx=F(b)-F(a)$.
! Quãng đường :: $\int_a^bv(t)dt$ là độ dời; $\int_a^b|v(t)|dt$ là quãng đường đi được.
~ Nước chảy vào bể với tốc độ $r(t)$ lít/phút: $\int_0^{10}r(t)dt$ là lượng nước thêm vào trong 10 phút.
~ $\int(10x^4-2\sec^2x)dx=2x^5-2\tan x+C$.
? Với $v(t)=t^2-t-6$ trên $[1,4]$, độ dời là
+ $-4{,}5$
- $10\frac16$
- $4{,}5$
= $\left[\frac{t^3}3-\frac{t^2}2-6t\right]_1^4$.
? Quãng đường đi được trong câu trên là
+ $\frac{61}{6}$
- $-\frac92$
= $v<0$ trên $[1,3)$, $>0$ trên $(3,4]$; cộng trị tuyệt đối.
? $\int\frac{\sin\theta}{\cos^2\theta}d\theta$ bằng
+ $\sec\theta+C$
- $-\sec\theta+C$
- $\tan\theta+C$
= $\frac{\sin}{\cos^2}=\sec\theta\tan\theta$.
& Dân số tăng với tốc độ $P'(t)=200+50t$ người/năm. Dân số tăng bao nhiêu trong 10 năm đầu?
&> $\int_0^{10}(200+50t)dt=2000+2500=4500$ người.
& Kiểm tra $\int x\cos x\,dx=x\sin x+\cos x+C$.
&> Đạo hàm vế phải: $\sin x+x\cos x-\sin x=x\cos x$. Đúng.

## 5.5 | Quy tắc đổi biến
@see T28.10
| Đổi biến là quy tắc chuỗi chạy ngược. Nếu trong biểu thức có một hàm $u=g(x)$ cùng đạo hàm $g'(x)\,dx$ của nó, đặt $du=g'(x)dx$ và tích phân trở nên đơn giản.
| Với tích phân xác định, đổi luôn cận theo $u$, khỏi phải đổi về $x$.
! Bất định :: $\int f(g(x))g'(x)\,dx=\int f(u)\,du$ với $u=g(x)$.
! Xác định :: $\int_a^bf(g(x))g'(x)dx=\int_{g(a)}^{g(b)}f(u)du$.
! Đối xứng :: $f$ chẵn: $\int_{-a}^af=2\int_0^af$; $f$ lẻ: $\int_{-a}^af=0$.
~ $\int x^3\cos(x^4+2)dx$: $u=x^4+2$, $du=4x^3dx$, kết quả $\frac14\sin(x^4+2)+C$.
~ $\int\tan x\,dx=-\ln|\cos x|+C=\ln|\sec x|+C$ ($u=\cos x$).
? $\int\frac{2x}{x^2+1}dx$ bằng
+ $\ln(x^2+1)+C$
- $\arctan x+C$
- $\frac{1}{x^2+1}+C$
= $u=x^2+1$.
? $\int_0^2xe^{x^2}dx$ bằng
+ $\frac{e^4-1}2$
- $e^4-1$
- $2e^4$
= $u=x^2$ từ $0$ tới $4$.
? $\int_{-\pi/2}^{\pi/2}x^2\sin x\,dx$ bằng
+ $0$
- $\pi$
- $2$
= Hàm lẻ.
& Tính $\int\sqrt{1+x^2}\,x^5dx$.
&> $u=1+x^2$, $du=2xdx$, $x^4=(u-1)^2$: $\frac12\int\sqrt u(u-1)^2du=\frac12\int(u^{5/2}-2u^{3/2}+u^{1/2})du$.
&> $=\frac17u^{7/2}-\frac25u^{5/2}+\frac13u^{3/2}+C$ với $u=1+x^2$.
& Tính $\int_1^e\frac{\ln x}{x}dx$.
&> $u=\ln x$ từ $0$ tới $1$: $\int_0^1u\,du=\frac12$.

# 6 | Ứng dụng của tích phân | 0
> Diện tích, thể tích, công và giá trị trung bình: cắt nhỏ, xấp xỉ, cộng lại, lấy giới hạn.

## 6.1 | Diện tích giữa hai đường cong
@w between
| Diện tích giữa $y=f(x)$ ở trên và $y=g(x)$ ở dưới là tích phân của **chiều cao** $f-g$. Nếu hai đường cắt nhau, chia đoạn tại giao điểm, hoặc lấy tích phân $|f-g|$.
| Đôi khi cắt theo chiều ngang (tích phân theo $y$) đơn giản hơn: diện tích $=\int(\text{phải}-\text{trái})\,dy$.
! Theo $x$ :: $A=\int_a^b[f(x)-g(x)]\,dx$ khi $f\ge g$.
! Tổng quát :: $A=\int_a^b|f(x)-g(x)|\,dx$.
! Theo $y$ :: $A=\int_c^d[x_R(y)-x_L(y)]\,dy$.
~ Giữa $y=x^2$ và $y=2x-x^2$: giao tại $x=0,1$; $A=\int_0^1(2x-2x^2)dx=\frac13$.
? Diện tích giữa $y=x$ và $y=x^2$ trên $[0,1]$ là
+ $\frac16$
- $\frac12$
- $\frac13$
= $\int_0^1(x-x^2)dx$.
? Diện tích giữa $y=\sin x$ và $y=\cos x$ trên $[0,\frac\pi2]$ là
+ $2\sqrt2-2$
- $0$
- $\sqrt2$
= Chia tại $\frac\pi4$ và lấy trị tuyệt đối.
? Với miền giữa $x=y^2$ và $x=y+2$, cách tiện hơn là
+ tích phân theo $y$
- tích phân theo $x$
= Theo $x$ phải chia hai phần.
& Tính diện tích miền giới hạn bởi $y=x-1$ và $y^2=2x+6$.
&> Theo $y$: $x_R=y+1$, $x_L=\frac{y^2}2-3$; giao khi $y+1=\frac{y^2}2-3$, $y=-2,4$.
&> $A=\int_{-2}^4\left(y+4-\frac{y^2}2\right)dy=\left[\frac{y^2}2+4y-\frac{y^3}6\right]_{-2}^4=18$.
& Hai xe xuất phát cùng lúc, vận tốc $v_A$, $v_B$. Diện tích giữa hai đồ thị vận tốc trên $[0,T]$ nghĩa là gì?
&> $\int_0^T(v_A-v_B)dt$ là khoảng cách giữa hai xe tại thời điểm $T$ (nếu $v_A\ge v_B$).

## 6.2 | Thể tích
@w solids
| Cắt vật thể thành các lát mỏng vuông góc với một trục. Thể tích $\approx\sum A(x_i)\Delta x$, giới hạn là $\int A(x)dx$. Với vật tròn xoay quanh trục $x$, mỗi lát là đĩa diện tích $\pi f(x)^2$, hoặc vành khuyên $\pi(R^2-r^2)$.
! Phương pháp lát cắt :: $V=\int_a^bA(x)\,dx$.
! Đĩa :: Quay $y=f(x)$ quanh trục $x$: $V=\pi\int_a^bf(x)^2dx$.
! Vành khuyên :: $V=\pi\int_a^b(R(x)^2-r(x)^2)dx$.
~ Hình cầu bán kính $r$: quay $y=\sqrt{r^2-x^2}$: $V=\pi\int_{-r}^r(r^2-x^2)dx=\frac43\pi r^3$.
~ Hình nón: quay $y=\frac rhx$ trên $[0,h]$: $V=\frac13\pi r^2h$.
? Quay $y=\sqrt x$ trên $[0,1]$ quanh trục $x$ được thể tích
+ $\frac\pi2$
- $\pi$
- $\frac\pi3$
= $\pi\int_0^1x\,dx$.
? Quay miền giữa $y=x$ và $y=x^2$ quanh trục $x$: thể tích
+ $\frac{2\pi}{15}$
- $\frac\pi6$
- $\frac\pi3$
= $\pi\int_0^1(x^2-x^4)dx$.
? Vật có đáy là đĩa đơn vị, mọi lát vuông góc trục $x$ là hình vuông. Thể tích
+ $\frac{16}{3}$
- $\pi$
- $4$
= Cạnh $2\sqrt{1-x^2}$: $\int_{-1}^14(1-x^2)dx$.
& Tính thể tích khi quay miền giới hạn bởi $y=x^3$, $y=8$, $x=0$ quanh trục $y$.
&> Lát theo $y$: bán kính $x=y^{1/3}$, $V=\pi\int_0^8y^{2/3}dy=\pi\cdot\frac35\cdot8^{5/3}=\frac{96\pi}5$.
& Quay miền dưới $y=x^2$ trên $[0,1]$ quanh đường $y=2$.
&> Vành khuyên: $R=2$, $r=2-x^2$. $V=\pi\int_0^1[4-(2-x^2)^2]dx=\pi\int_0^1(4x^2-x^4)dx=\pi\left(\frac43-\frac15\right)=\frac{17\pi}{15}$.

## 6.3 | Thể tích bằng phương pháp vỏ trụ
@w solids mode=shell
| Khi quay quanh trục $y$ mà khó giải $x$ theo $y$, dùng **vỏ trụ**: mỗi dải dọc ở vị trí $x$, cao $f(x)$, quay thành vỏ trụ mỏng có thể tích $\approx2\pi x\,f(x)\,\Delta x$ (chu vi × cao × độ dày).
! Vỏ trụ :: $V=\int_a^b2\pi x\,f(x)\,dx$ (quay quanh trục $y$).
! Quanh trục $x=c$ :: bán kính vỏ là $|x-c|$.
~ Quay $y=2x^2-x^3$ trên $[0,2]$ quanh trục $y$: $V=2\pi\int_0^2(2x^3-x^4)dx=\frac{16\pi}5$. Dùng đĩa sẽ phải giải phương trình bậc ba.
? Quay $y=x$ trên $[0,1]$ quanh trục $y$ (miền dưới đường) bằng vỏ trụ
+ $2\pi\int_0^1x^2dx=\frac{2\pi}3$
- $\pi\int_0^1x^2dx$
= Bán kính $x$, cao $x$.
? Khi quay quanh trục $x$ và dải nằm ngang, vỏ trụ dùng
+ tích phân theo $y$ với bán kính $y$
- tích phân theo $x$
= Vỏ luôn song song với trục quay.
? Chọn đĩa hay vỏ?
+ Chọn cách mà biểu thức dễ viết và dễ tích phân hơn
- Luôn dùng đĩa
= Cả hai cho cùng kết quả.
& Tính thể tích quay miền giữa $y=x$ và $y=x^2$ quanh trục $y$ bằng vỏ trụ.
&> Chiều cao vỏ $x-x^2$: $V=2\pi\int_0^1x(x-x^2)dx=2\pi\left(\frac13-\frac14\right)=\frac\pi6$.
& Quay miền dưới $y=\sqrt x$ trên $[0,1]$ quanh trục $x$ bằng vỏ trụ, so với đĩa.
&> Vỏ ngang tại $y$: bán kính $y$, dài $1-y^2$: $V=2\pi\int_0^1y(1-y^2)dy=\frac\pi2$.
&> Đĩa: $\pi\int_0^1x\,dx=\frac\pi2$. Khớp.

## 6.4 | Công
| Công của lực không đổi là lực × quãng đường. Lực thay đổi theo vị trí thì chia nhỏ quãng đường: $W=\int_a^bF(x)\,dx$. Bơm nước khỏi bể: chia nước thành lớp mỏng, mỗi lớp nâng lên một độ cao khác nhau.
! Công :: $W=\int_a^bF(x)\,dx$ (đơn vị J = N·m).
! Định luật Hooke :: Lò xo kéo dãn $x$ khỏi vị trí tự nhiên cần lực $F=kx$.
! Bơm chất lỏng :: $W=\int\rho g\cdot A(y)\cdot(\text{quãng nâng})\,dy$.
~ Lò xo cần 40 N để giữ dãn 0,05 m: $k=800$. Kéo từ 0,05 tới 0,1 m tốn $\int_{0{,}05}^{0{,}1}800x\,dx=3$ J.
? Kéo dãn lò xo $k=100$ N/m thêm $0{,}2$ m từ vị trí tự nhiên tốn
+ $2$ J
- $20$ J
- $10$ J
= $\int_0^{0{,}2}100x\,dx$.
? Dây cáp dài 50 m nặng 2 kg/m treo thẳng. Kéo hết lên đỉnh tốn ($g\approx9{,}8$)
+ $\approx24500$ J
- $\approx980$ J
- $\approx49000$ J
= Đoạn ở độ sâu $x$ nâng $x$ m: $\int_0^{50}2\cdot9{,}8\,x\,dx$.
? Vì sao bài bơm nước phải chia theo lớp ngang?
+ Mỗi lớp được nâng một quãng khác nhau
- Vì nước không nén được
= Lực (trọng lượng lớp) không đổi nhưng quãng thay đổi.
& Bể hình nón úp ngược (cao 10 m, bán kính miệng 4 m) chứa nước sâu 8 m. Tính công bơm hết nước qua miệng ($\rho=1000$, $g=9{,}8$).
&> Lớp ở độ cao $y$ (tính từ đỉnh nón): bán kính $\frac{4y}{10}$, thể tích $\pi\frac{4y^2}{25}dy$, nâng $10-y$ m.
&> $W=\int_0^8 9800\pi\frac{4y^2}{25}(10-y)dy=1568\pi\left[\frac{10y^3}3-\frac{y^4}4\right]_0^8\approx3{,}4\times10^6$ J.

## 6.5 | Giá trị trung bình của hàm số
@w avgvalue
| Trung bình của hữu hạn số là tổng chia số lượng. Với hàm liên tục trên $[a,b]$: "tổng" là tích phân, "số lượng" là độ dài đoạn. Hình chữ nhật cao $f_{tb}$ có cùng diện tích với miền dưới đồ thị.
! Định nghĩa :: $f_{tb}=\dfrac1{b-a}\displaystyle\int_a^bf(x)\,dx$.
! Định lý giá trị trung bình cho tích phân :: $f$ liên tục thì có $c\in[a,b]$ với $f(c)=f_{tb}$.
~ Trung bình của $1+x^2$ trên $[-1,2]$: $\frac13\int_{-1}^2(1+x^2)dx=2$, đạt tại $c=\pm1$.
? Trung bình của $\sin x$ trên $[0,\pi]$ là
+ $\frac2\pi$
- $\frac12$
- $0$
= $\frac1\pi\cdot2$.
? Trung bình của $\sin x$ trên $[0,2\pi]$ là
+ $0$
- $\frac2\pi$
= Phần dương và âm triệt tiêu.
? Nhiệt độ trong ngày $T(t)$. Nhiệt độ trung bình 24 giờ là
+ $\frac1{24}\int_0^{24}T(t)dt$
- $\frac{T(0)+T(24)}2$
= Trung bình liên tục.
& Tìm trung bình của $f(x)=\sqrt x$ trên $[0,4]$ và điểm $c$ đạt giá trị đó.
&> $f_{tb}=\frac14\int_0^4\sqrt x\,dx=\frac14\cdot\frac{16}3=\frac43$.
&> $\sqrt c=\frac43$ cho $c=\frac{16}9$.

# 7 | Kỹ thuật tính tích phân | 0
> Từng phần, lượng giác, đổi biến lượng giác, phân thức, tính gần đúng và tích phân suy rộng.

## 7.1 | Tích phân từng phần
@see T28.10
| Từng phần là quy tắc tích chạy ngược: chuyển đạo hàm từ thừa số này sang thừa số kia. Chọn $u$ là phần trở nên **đơn giản hơn khi đạo hàm** (đa thức, logarit, hàm ngược), $dv$ là phần dễ lấy nguyên hàm.
| Đôi khi làm hai lần rồi tích phân ban đầu xuất hiện lại: chuyển vế mà giải (như $\int e^x\sin x\,dx$).
! Công thức :: $\int u\,dv=uv-\int v\,du$.
! Xác định :: $\int_a^bu\,dv=[uv]_a^b-\int_a^bv\,du$.
! Gợi ý chọn $u$ (LIATE) :: Logarit, hàm lượng giác ngược, đại số, lượng giác, mũ.
~ $\int x\sin x\,dx$: $u=x$, $dv=\sin x\,dx$: $-x\cos x+\sin x+C$.
~ $\int\ln x\,dx=x\ln x-x+C$ ($u=\ln x$, $dv=dx$).
? $\int xe^{2x}dx$ bằng
+ $\frac{xe^{2x}}2-\frac{e^{2x}}4+C$
- $\frac{x^2e^{2x}}{2}+C$
- $xe^{2x}-e^{2x}+C$
= $u=x$, $v=\frac{e^{2x}}2$.
? Với $\int x^2\ln x\,dx$, nên chọn
+ $u=\ln x$
- $u=x^2$
= Đạo hàm của $\ln x$ là $\frac1x$, đơn giản hơn.
? $\int_0^1\arctan x\,dx$ bằng
+ $\frac\pi4-\frac{\ln2}2$
- $\frac\pi4$
- $1$
= $u=\arctan x$: $[x\arctan x]_0^1-\int_0^1\frac{x}{1+x^2}dx$.
& Tính $\int e^x\sin x\,dx$.
&> Từng phần hai lần: $I=-e^x\cos x+\int e^x\cos x\,dx=-e^x\cos x+e^x\sin x-I$.
&> $2I=e^x(\sin x-\cos x)$, nên $I=\frac{e^x(\sin x-\cos x)}2+C$.
& Lập công thức truy hồi cho $I_n=\int_0^1x^ne^x\,dx$ và tính $I_2$.
&> $I_n=[x^ne^x]_0^1-n\int_0^1x^{n-1}e^xdx=e-nI_{n-1}$, với $I_0=e-1$.
&> $I_1=e-(e-1)=1$, $I_2=e-2$.

## 7.2 | Tích phân lượng giác
| Tích phân dạng $\int\sin^m x\cos^n x\,dx$: nếu có một số mũ **lẻ**, tách riêng một thừa số rồi đổi biến; nếu cả hai **chẵn**, hạ bậc bằng công thức góc nhân đôi.
! Số mũ lẻ :: $\sin^{2k+1}x$: tách $\sin x\,dx$, đổi $\sin^2=1-\cos^2$, đặt $u=\cos x$.
! Hạ bậc :: $\sin^2x=\frac{1-\cos2x}2$, $\cos^2x=\frac{1+\cos2x}2$.
! Tích sang tổng :: $\sin A\cos B=\frac12[\sin(A-B)+\sin(A+B)]$.
! $\tan$, $\sec$ :: $\int\sec x\,dx=\ln|\sec x+\tan x|+C$.
~ $\int\cos^3x\,dx=\int(1-\sin^2x)\cos x\,dx=\sin x-\frac{\sin^3x}3+C$.
~ $\int_0^\pi\sin^2x\,dx=\frac\pi2$.
? $\int\sin^5x\cos^2x\,dx$ nên đặt
+ $u=\cos x$
- $u=\sin x$
= Số mũ của $\sin$ lẻ.
? $\int_0^{2\pi}\sin(3x)\cos(5x)\,dx$ bằng
+ $0$
- $\pi$
- $2\pi$
= Tích sang tổng cho hai hàm $\sin$ tuần hoàn, tích phân trọn chu kỳ bằng $0$.
? $\int\tan x\,dx$ bằng
+ $\ln|\sec x|+C$
- $\sec^2x+C$
- $\ln|\cos x|+C$
= $-\ln|\cos x|$.
& Tính $\int\sin^4x\,dx$.
&> $\sin^4x=\left(\frac{1-\cos2x}2\right)^2=\frac14(1-2\cos2x+\cos^22x)=\frac14\left(\frac32-2\cos2x+\frac{\cos4x}2\right)$.
&> Kết quả $\frac{3x}8-\frac{\sin2x}4+\frac{\sin4x}{32}+C$.
& Tính $\int\tan^3x\sec^4x\,dx$.
&> Tách $\sec^2x\,dx$, đặt $u=\tan x$: $\int u^3(1+u^2)du=\frac{u^4}4+\frac{u^6}6+C$.

## 7.3 | Đổi biến lượng giác
| Căn dạng $\sqrt{a^2-x^2}$, $\sqrt{a^2+x^2}$, $\sqrt{x^2-a^2}$ biến mất khi đặt $x$ là một hàm lượng giác, nhờ $1-\sin^2=\cos^2$, $1+\tan^2=\sec^2$, $\sec^2-1=\tan^2$. Kết quả đổi về $x$ bằng tam giác vuông.
! Bảng :: $\sqrt{a^2-x^2}$: $x=a\sin\theta$. $\sqrt{a^2+x^2}$: $x=a\tan\theta$. $\sqrt{x^2-a^2}$: $x=a\sec\theta$.
~ Diện tích elip $\frac{x^2}{a^2}+\frac{y^2}{b^2}=1$: $4\frac ba\int_0^a\sqrt{a^2-x^2}dx$, đặt $x=a\sin\theta$, được $\pi ab$.
? $\int\frac{dx}{\sqrt{4-x^2}}$ bằng
+ $\arcsin\frac x2+C$
- $\arctan\frac x2+C$
- $\ln|x+\sqrt{4-x^2}|+C$
= $x=2\sin\theta$.
? Với $\int\frac{dx}{x^2\sqrt{x^2+4}}$ đặt
+ $x=2\tan\theta$
- $x=2\sin\theta$
- $x=2\sec\theta$
= Dạng $a^2+x^2$.
? $\int\frac{dx}{\sqrt{x^2+1}}$ bằng
+ $\ln(x+\sqrt{x^2+1})+C$
- $\arctan x+C$
= Cũng là $\sinh^{-1}x$.
& Tính $\int\frac{\sqrt{9-x^2}}{x^2}dx$.
&> $x=3\sin\theta$: $\int\frac{3\cos\theta}{9\sin^2\theta}3\cos\theta\,d\theta=\int\cot^2\theta\,d\theta=-\cot\theta-\theta+C$.
&> Tam giác: $\cot\theta=\frac{\sqrt{9-x^2}}x$. Kết quả $-\frac{\sqrt{9-x^2}}x-\arcsin\frac x3+C$.
& Tính $\int_0^{3\sqrt3/2}\frac{x^3}{(4x^2+9)^{3/2}}dx$.
&> $x=\frac32\tan\theta$, cận $0\to\frac\pi3$: biến thành $\frac{3}{16}\int_0^{\pi/3}\frac{\tan^3\theta}{\sec\theta}d\theta=\frac3{16}\int_0^{\pi/3}\frac{1-\cos^2\theta}{\cos^2\theta}\sin\theta\,d\theta$.
&> Đặt $u=\cos\theta$ ($1\to\frac12$): $\frac3{16}\int_{1/2}^1(u^{-2}-1)du=\frac3{16}\cdot\frac12=\frac3{32}$.

## 7.4 | Tích phân hàm hữu tỉ bằng phân thức đơn giản
| Mọi hàm hữu tỉ đều tích phân được: chia đa thức (nếu bậc tử $\ge$ bậc mẫu), phân tích mẫu thành nhân tử bậc một và bậc hai, rồi tách thành tổng các phân thức đơn giản, mỗi cái cho $\ln$ hoặc $\arctan$.
! Nhân tử bậc một khác nhau :: $\frac{A}{x-a}+\frac{B}{x-b}+\cdots$
! Lặp :: $(x-a)^k$ cho $\frac{A_1}{x-a}+\cdots+\frac{A_k}{(x-a)^k}$.
! Bậc hai không phân tích được :: $\frac{Ax+B}{x^2+bx+c}$, dẫn tới $\ln$ và $\arctan$.
~ $\frac{1}{x^2-1}=\frac12\left(\frac1{x-1}-\frac1{x+1}\right)$, nên $\int\frac{dx}{x^2-1}=\frac12\ln\left|\frac{x-1}{x+1}\right|+C$.
? Dạng phân tích của $\frac{x+5}{x^2+x-2}$ là
+ $\frac{A}{x-1}+\frac{B}{x+2}$, với $A=2$, $B=-1$
- $\frac{A}{x+1}+\frac{B}{x-2}$
= $x^2+x-2=(x-1)(x+2)$; thế $x=1$: $3A=6$.
? $\int\frac{dx}{x^2+4}$ bằng
+ $\frac12\arctan\frac x2+C$
- $\ln(x^2+4)+C$
- $\arctan\frac x2+C$
= Công thức $\int\frac{dx}{x^2+a^2}=\frac1a\arctan\frac xa$.
? Bước đầu tiên với $\int\frac{x^3}{x-1}dx$ là
+ chia đa thức
- phân thức đơn giản ngay
= Bậc tử lớn hơn bậc mẫu.
& Tính $\int\frac{x^2+2x-1}{2x^3+3x^2-2x}dx$.
&> Mẫu $=x(2x-1)(x+2)$. Tách $\frac Ax+\frac B{2x-1}+\frac C{x+2}$: $A=\frac12$, $B=\frac15$, $C=-\frac1{10}$.
&> Kết quả $\frac12\ln|x|+\frac1{10}\ln|2x-1|-\frac1{10}\ln|x+2|+C$.
& Tính $\int\frac{4x^2-3x+2}{4x^2-4x+3}dx$.
&> Chia: $1+\frac{x-1}{4x^2-4x+3}$. Viết $x-1=\frac18(8x-4)-\frac12$.
&> $\int=x+\frac18\ln(4x^2-4x+3)-\frac12\int\frac{dx}{(2x-1)^2+2}=x+\frac18\ln(4x^2-4x+3)-\frac{1}{4\sqrt2}\arctan\frac{2x-1}{\sqrt2}+C$.

## 7.5 | Chiến lược tính tích phân
| Không có thuật toán duy nhất. Một thứ tự thử hợp lý: (1) rút gọn biểu thức; (2) tìm đổi biến rõ ràng ($u$ và $du$ cùng có mặt); (3) phân loại theo dạng (lượng giác, hữu tỉ, từng phần, căn); (4) thử lại với cách viết khác.
! Hàm không có nguyên hàm sơ cấp :: $e^{x^2}$, $\frac{\sin x}x$, $\sqrt{1+x^3}$, $\frac1{\ln x}$. Những tích phân này phải tính gần đúng hoặc bằng chuỗi.
~ $\int\frac{\tan^3x}{\cos^3x}dx=\int\tan^3x\sec^3x\,dx$: tách $\sec x\tan x\,dx$, đặt $u=\sec x$.
~ $\int e^{\sqrt x}dx$: đặt $u=\sqrt x$ trước, rồi từng phần, được $2(\sqrt x-1)e^{\sqrt x}+C$.
? $\int\frac{dx}{x\ln x}$ dùng
+ đổi biến $u=\ln x$
- từng phần
- phân thức đơn giản
= Kết quả $\ln|\ln x|+C$.
? $\int x\sqrt{x+1}\,dx$ nhanh nhất bằng
+ đổi biến $u=x+1$
- đổi biến lượng giác
= $\int(u-1)\sqrt u\,du$.
? $\int e^{-x^2}dx$ có nguyên hàm sơ cấp không?
+ Không
- Có, $-\frac{e^{-x^2}}{2x}$
= Phải dùng chuỗi hoặc tích phân số (hàm lỗi erf).
& Tính $\int\frac{1}{1+e^x}dx$.
&> Viết $\frac{1}{1+e^x}=\frac{e^{-x}}{e^{-x}+1}$, đặt $u=e^{-x}+1$: $-\ln(1+e^{-x})+C$.
& Tính $\int\sqrt{\frac{1-x}{1+x}}dx$.
&> Nhân: $\frac{1-x}{\sqrt{1-x^2}}$. Tách: $\int\frac{dx}{\sqrt{1-x^2}}-\int\frac{x\,dx}{\sqrt{1-x^2}}=\arcsin x+\sqrt{1-x^2}+C$.

## 7.6 | Tích phân bằng bảng và phần mềm
| Bảng tích phân và phần mềm tính toán đại số (CAS) cho kết quả nhanh, nhưng kết quả có thể ở dạng khác với cách tự làm (chênh nhau một hằng số, hoặc dùng hàm đặc biệt). Hiểu kỹ thuật giúp kiểm tra và đơn giản hoá đáp án.
! Kiểm tra :: Luôn đạo hàm kết quả để xác nhận.
! Hàm đặc biệt :: CAS có thể trả về $\operatorname{erf}$, $\operatorname{Si}$, … cho tích phân không sơ cấp.
~ $\int\frac{dx}{x^2-1}$ có thể ra $-\operatorname{artanh}x$ hoặc $\frac12\ln\left|\frac{x-1}{x+1}\right|$: bằng nhau trên $(-1,1)$.
? Hai đáp án $\sin^2x+C$ và $-\cos^2x+C$ của $\int2\sin x\cos x\,dx$
+ đều đúng, chênh nhau hằng số $1$
- chỉ một đúng
= $\sin^2x-(-\cos^2x)=1$.
? Cách nhanh nhất kiểm tra một nguyên hàm từ bảng là
+ đạo hàm nó
- tích phân lại
= Đạo hàm luôn làm được.
? Phần mềm trả lời $\int\frac{\sin x}{x}dx=\operatorname{Si}(x)$ nghĩa là
+ không có nguyên hàm sơ cấp, người ta đặt tên cho nó
- tích phân bằng $0$
= Hàm tích phân sin.
& Dùng công thức $\int\sqrt{a^2+u^2}\,du=\frac u2\sqrt{a^2+u^2}+\frac{a^2}2\ln(u+\sqrt{a^2+u^2})+C$ để tính $\int\sqrt{4+9x^2}\,dx$.
&> Đặt $u=3x$, $du=3dx$, $a=2$: $\frac13\int\sqrt{4+u^2}du$.
&> $=\frac{x}{2}\sqrt{4+9x^2}+\frac23\ln(3x+\sqrt{4+9x^2})+C$.

## 7.7 | Tích phân gần đúng
@w approxint
| Khi không có nguyên hàm (hoặc chỉ có dữ liệu đo), tính gần đúng. Quy tắc **điểm giữa** và **hình thang** có sai số giảm như $\frac1{n^2}$; **Simpson** (xấp xỉ bằng parabol) giảm như $\frac1{n^4}$, nhanh hơn hẳn.
! Hình thang :: $T_n=\frac{\Delta x}2[f(x_0)+2f(x_1)+\cdots+2f(x_{n-1})+f(x_n)]$.
! Điểm giữa :: $M_n=\Delta x\sum f(\bar x_i)$.
! Simpson ($n$ chẵn) :: $S_n=\frac{\Delta x}3[f_0+4f_1+2f_2+4f_3+\cdots+4f_{n-1}+f_n]$.
! Sai số :: $|E_T|\le\frac{K(b-a)^3}{12n^2}$, $|E_M|\le\frac{K(b-a)^3}{24n^2}$ với $|f''|\le K$; $|E_S|\le\frac{K_4(b-a)^5}{180n^4}$ với $|f^{(4)}|\le K_4$.
~ $\int_1^2\frac{dx}x=\ln2\approx0{,}693147$: $T_4\approx0{,}697024$, $M_4\approx0{,}691220$, $S_4\approx0{,}693254$.
? Với $f$ lõm lên, quy tắc hình thang
+ lớn hơn giá trị thật
- nhỏ hơn
= Dây cung nằm trên đồ thị.
? Simpson chính xác tuyệt đối cho đa thức bậc tối đa
+ $3$
- $2$
- $1$
= Sai số tỉ lệ $f^{(4)}$.
? Muốn sai số hình thang giảm 100 lần, cần tăng $n$ lên
+ $10$ lần
- $100$ lần
- $4$ lần
= Sai số tỉ lệ $\frac1{n^2}$.
& Cần $n$ bao nhiêu để $T_n$ xấp xỉ $\int_1^2\frac{dx}{x}$ với sai số $<0{,}0001$?
&> $f''=\frac2{x^3}\le2=K$ trên $[1,2]$. $\frac{2\cdot1}{12n^2}<0{,}0001$ cho $n^2>1666{,}7$, $n\ge41$.
& Tính $S_4$ cho $\int_0^1e^{x^2}dx$.
&> $\Delta x=0{,}25$; $f$ tại $0;0{,}25;0{,}5;0{,}75;1$: $1;\ 1{,}0645;\ 1{,}2840;\ 1{,}7551;\ 2{,}7183$.
&> $S_4=\frac{0{,}25}3[1+4(1{,}0645)+2(1{,}2840)+4(1{,}7551)+2{,}7183]\approx1{,}4637$ (thật $\approx1{,}4627$).

## 7.8 | Tích phân suy rộng
@w improper
| Khi khoảng lấy tích phân vô hạn, hoặc hàm không bị chặn tại một điểm, định nghĩa tích phân là **giới hạn** của tích phân thường. Một miền dài vô hạn vẫn có thể có diện tích hữu hạn.
! Loại 1 :: $\int_a^\infty f=\lim_{t\to\infty}\int_a^tf$ (hội tụ nếu giới hạn hữu hạn).
! Loại 2 :: $f$ không bị chặn gần $b$: $\int_a^bf=\lim_{t\to b^-}\int_a^tf$.
! $p$-tích phân :: $\int_1^\infty\frac{dx}{x^p}$ hội tụ khi và chỉ khi $p>1$; $\int_0^1\frac{dx}{x^p}$ hội tụ khi và chỉ khi $p<1$.
! So sánh :: $0\le f\le g$: $\int g$ hội tụ thì $\int f$ hội tụ.
~ $\int_1^\infty\frac{dx}{x^2}=1$, nhưng $\int_1^\infty\frac{dx}x=\infty$.
~ $\int_0^1\frac{dx}{\sqrt x}=2$: hàm không bị chặn nhưng diện tích hữu hạn.
? $\int_0^\infty e^{-x}dx$ bằng
+ $1$
- $\infty$
- $0$
= $\lim(1-e^{-t})$.
? $\int_{-\infty}^\infty\frac{dx}{1+x^2}$ bằng
+ $\pi$
- $\frac\pi2$
- $\infty$
= $\arctan$ từ $-\frac\pi2$ tới $\frac\pi2$.
? $\int_0^3\frac{dx}{x-1}$
+ phân kỳ (điểm xấu $x=1$ nằm trong đoạn)
- bằng $\ln2$
= Phải tách tại $1$; $\int_0^1\frac{dx}{x-1}=-\infty$.
& Xét sự hội tụ của $\int_1^\infty\frac{1+e^{-x}}{x}dx$.
&> $\frac{1+e^{-x}}x>\frac1x$ và $\int_1^\infty\frac1x=\infty$. Theo so sánh, phân kỳ.
& Tính $\int_0^1\ln x\,dx$.
&> $\int_t^1\ln x\,dx=[x\ln x-x]_t^1=-1-t\ln t+t$.
&> $t\ln t\to0$ khi $t\to0^+$ (L'Hôpital), nên tích phân bằng $-1$.

# 8 | Các ứng dụng khác của tích phân | 0
> Độ dài cung, diện tích mặt tròn xoay, vật lý, kinh tế, sinh học và xác suất.

## 8.1 | Độ dài cung
@w arclength
| Xấp xỉ đường cong bằng đường gấp khúc. Mỗi đoạn có độ dài $\sqrt{\Delta x^2+\Delta y^2}=\sqrt{1+(\Delta y/\Delta x)^2}\,\Delta x$. Giới hạn là tích phân.
! Công thức :: $L=\int_a^b\sqrt{1+[f'(x)]^2}\,dx$.
! Hàm độ dài cung :: $s(x)=\int_a^x\sqrt{1+f'(t)^2}dt$, $ds=\sqrt{dx^2+dy^2}$.
~ $y=x^{3/2}$ trên $[1,4]$: $L=\int_1^4\sqrt{1+\frac94x}\,dx=\frac{8}{27}\left(10^{3/2}-\frac{13^{3/2}}{8}\right)\approx7{,}63$.
? Độ dài cung của $y=2x+1$ trên $[0,3]$ là
+ $3\sqrt5$
- $6$
- $3$
= $\int_0^3\sqrt{1+4}\,dx$.
? Tích phân độ dài cung thường
+ khó tính chính xác, hay phải tính gần đúng
- luôn có nguyên hàm sơ cấp
= Căn bậc hai làm mất nguyên hàm sơ cấp.
? Chu vi đường tròn bán kính $r$ suy từ $y=\sqrt{r^2-x^2}$
+ $4\int_0^r\frac{r}{\sqrt{r^2-x^2}}dx=2\pi r$
- $\pi r^2$
= $1+y'^2=\frac{r^2}{r^2-x^2}$.
& Tính độ dài cung của $y=\ln(\sec x)$ trên $[0,\frac\pi4]$.
&> $y'=\tan x$, $\sqrt{1+\tan^2x}=\sec x$.
&> $L=\int_0^{\pi/4}\sec x\,dx=\ln(\sec x+\tan x)\big|_0^{\pi/4}=\ln(\sqrt2+1)$.
& Tính độ dài của $y=\frac{x^2}{4}-\frac{\ln x}2$ trên $[1,e]$.
&> $y'=\frac x2-\frac1{2x}$, $1+y'^2=\left(\frac x2+\frac1{2x}\right)^2$.
&> $L=\int_1^e\left(\frac x2+\frac1{2x}\right)dx=\frac{e^2-1}4+\frac12=\frac{e^2+1}4$.

## 8.2 | Diện tích mặt tròn xoay
| Quay một đoạn cung ngắn $ds$ quanh trục được một dải hình nón cụt có diện tích $\approx2\pi r\,ds$. Cộng lại cho diện tích mặt tròn xoay.
! Quanh trục $x$ :: $S=\int_a^b2\pi f(x)\sqrt{1+f'(x)^2}\,dx$.
! Quanh trục $y$ :: $S=\int2\pi x\,ds$.
~ Mặt cầu: quay $y=\sqrt{r^2-x^2}$: $y\sqrt{1+y'^2}=r$, nên $S=\int_{-r}^r2\pi r\,dx=4\pi r^2$.
~ Kèn Gabriel: quay $y=\frac1x$ trên $[1,\infty)$: thể tích $\pi$ (hữu hạn) nhưng diện tích mặt $\infty$.
? Diện tích mặt khi quay $y=x$ trên $[0,1]$ quanh trục $x$ là
+ $\sqrt2\pi$
- $\pi$
- $2\pi$
= $\int_0^12\pi x\sqrt2\,dx$ (mặt nón).
? Kèn Gabriel cho thấy
+ vật có thể tích hữu hạn có thể có diện tích mặt vô hạn
- thể tích và diện tích luôn cùng hữu hạn
= $\int_1^\infty\frac{2\pi}{x}\sqrt{1+x^{-4}}dx\ge\int\frac{2\pi}x=\infty$.
? Diện tích mặt tròn xoay khác "thể tích đĩa" ở chỗ dùng
+ $ds$ (độ dài cung) thay vì $dx$
- $f^2$ thay vì $f$
= Dùng $dx$ sẽ cho kết quả sai.
& Tính diện tích mặt khi quay $y=x^3$ trên $[0,1]$ quanh trục $x$.
&> $S=\int_0^12\pi x^3\sqrt{1+9x^4}dx$. Đặt $u=1+9x^4$, $du=36x^3dx$.
&> $S=\frac{2\pi}{36}\int_1^{10}\sqrt u\,du=\frac{\pi}{27}(10^{3/2}-1)\approx3{,}56$.

## 8.3 | Ứng dụng trong vật lý và kỹ thuật
| Áp suất chất lỏng tăng theo độ sâu, nên lực tác dụng lên tấm chắn thẳng đứng phải tích phân theo các lớp ngang. Khối tâm của một tấm phẳng là trung bình vị trí, có trọng số là khối lượng.
! Áp suất thuỷ tĩnh :: $P=\rho gd$; lực lên tấm thẳng đứng $F=\int\rho g\,d(y)\,w(y)\,dy$.
! Mô-men và khối tâm :: Tấm đồng chất giữa $f\ge g$ trên $[a,b]$: $\bar x=\frac1A\int x(f-g)dx$, $\bar y=\frac1A\int\frac12(f^2-g^2)dx$.
! Định lý Pappus :: Quay miền diện tích $A$ quanh một trục không cắt nó, thể tích $V=2\pi\bar dA$ ($\bar d$: khoảng cách từ khối tâm tới trục).
~ Khối tâm nửa đĩa bán kính $r$: $\bar y=\frac{4r}{3\pi}$.
? Khối tâm của tam giác đồng chất nằm ở
+ giao ba trung tuyến
- tâm đường tròn ngoại tiếp
= Trung bình ba đỉnh.
? Quay hình tròn bán kính $1$ có tâm cách trục $3$ đơn vị, thể tích (xuyến) là
+ $6\pi^2$
- $3\pi$
- $9\pi$
= Pappus: $2\pi\cdot3\cdot\pi$.
? Đập nước hình chữ nhật rộng $w$, sâu $h$: lực nước tỉ lệ với
+ $h^2$
- $h$
- $h^3$
= $\int_0^h\rho g\,d\,w\,dd=\frac12\rho gwh^2$.
& Tìm khối tâm của miền dưới $y=\sin x$ trên $[0,\pi]$.
&> $A=2$. Đối xứng nên $\bar x=\frac\pi2$.
&> $\bar y=\frac1{2}\int_0^\pi\frac{\sin^2x}2dx=\frac14\cdot\frac\pi2=\frac\pi8$.

## 8.4 | Ứng dụng trong kinh tế và sinh học
| **Thặng dư tiêu dùng**: người mua sẵn lòng trả $p(x)$ cho sản phẩm thứ $x$; ở giá thị trường $P$ họ tiết kiệm $\int_0^X(p(x)-P)dx$. **Lưu lượng máu** qua mạch: tích phân vận tốc trên tiết diện. **Cung lượng tim** đo bằng phương pháp pha loãng thuốc nhuộm.
! Thặng dư tiêu dùng :: $\int_0^X[p(x)-P]\,dx$, với $P=p(X)$.
! Định luật Poiseuille :: Lưu lượng $F=\frac{\pi PR^4}{8\eta l}$, tích phân của $v(r)\cdot2\pi r$.
! Cung lượng tim :: $F=\frac{A}{\int_0^Tc(t)dt}$ với $A$ là lượng thuốc nhuộm.
~ Cầu $p(x)=1200-0{,}2x-0{,}0001x^2$, bán $X=500$: $P=1075$, thặng dư $\int_0^{500}(125-0{,}2x-0{,}0001x^2)dx\approx33333$.
? Bán kính mạch máu giảm một nửa thì lưu lượng (cùng áp suất) giảm còn
+ $\frac1{16}$
- $\frac12$
- $\frac14$
= Tỉ lệ $R^4$.
? Thặng dư tiêu dùng là diện tích
+ giữa đường cầu và đường giá
- dưới đường cầu
= $\int(p(x)-P)dx$.
? Doanh thu biên $R'(x)$. Doanh thu tăng thêm khi bán từ $100$ đến $200$ sản phẩm là
+ $\int_{100}^{200}R'(x)dx$
- $R'(200)-R'(100)$
= Biến thiên toàn phần.
& Nồng độ thuốc nhuộm $c(t)=20te^{-0{,}6t}$ mg/l (sau khi tiêm $A=5$ mg), đo trong 10 giây. Tính cung lượng tim.
&> $\int_0^{10}20te^{-0{,}6t}dt$ (từng phần) $=\frac{20}{0{,}36}\left[1-e^{-6}(1+6)\right]\approx54{,}6$.
&> $F\approx\frac{5}{54{,}6}\approx0{,}0916$ l/s $\approx5{,}5$ l/phút.

## 8.5 | Xác suất
@w density
| Biến ngẫu nhiên liên tục được mô tả bằng **hàm mật độ** $f\ge0$ với tổng diện tích $1$. Xác suất rơi vào $[a,b]$ là diện tích dưới $f$ trên $[a,b]$. Trung bình là "khối tâm" của mật độ.
! Mật độ :: $f\ge0$, $\int_{-\infty}^\infty f=1$, $P(a\le X\le b)=\int_a^bf$.
! Trung bình :: $\mu=\int_{-\infty}^\infty xf(x)\,dx$.
! Mũ :: $f(t)=\frac1\mu e^{-t/\mu}$ ($t\ge0$), thời gian chờ trung bình $\mu$.
! Chuẩn :: $f(x)=\frac{1}{\sigma\sqrt{2\pi}}e^{-(x-\mu)^2/(2\sigma^2)}$; khoảng 68% nằm trong $\mu\pm\sigma$, 95% trong $\mu\pm2\sigma$.
~ Thời gian chờ ở tổng đài trung bình 5 phút (phân phối mũ). $P(\text{chờ}>10)=e^{-2}\approx0{,}135$.
? $f(x)=cx(1-x)$ trên $[0,1]$ là mật độ khi
+ $c=6$
- $c=1$
- $c=4$
= $\int_0^1x(1-x)dx=\frac16$.
? Với phân phối mũ trung bình $\mu$, trung vị là
+ $\mu\ln2$
- $\mu$
- $\frac\mu2$
= $e^{-m/\mu}=\frac12$.
? Phân phối chuẩn, xác suất nằm ngoài $\mu\pm2\sigma$ khoảng
+ $5\%$
- $32\%$
- $0{,}3\%$
= Quy tắc 68–95–99,7.
& Chiều cao nam trưởng thành ~ chuẩn $\mu=170$ cm, $\sigma=7$ cm. Viết tích phân cho xác suất cao trên 180 cm.
&> $P=\int_{180}^\infty\frac{1}{7\sqrt{2\pi}}e^{-(x-170)^2/98}dx$.
&> Đặt $z=\frac{x-170}{7}$: $P=\int_{1{,}43}^\infty\frac{e^{-z^2/2}}{\sqrt{2\pi}}dz\approx0{,}077$ (tính gần đúng).
`);
