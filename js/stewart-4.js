/* Phần II, Ch.12–14. */
(window.STEWART = window.STEWART || []).push(String.raw`
# 12 | Vectơ và hình học không gian | 0
> Toạ độ ba chiều, vectơ, tích vô hướng, tích có hướng, đường thẳng, mặt phẳng và mặt bậc hai.

## 12.1 | Hệ toạ độ ba chiều
| Thêm trục $z$ vuông góc với mặt phẳng $xy$ theo quy tắc bàn tay phải. Một phương trình theo $x,y,z$ thường mô tả một **mặt**; phương trình chỉ có $x,y$ trong không gian là mặt trụ thẳng đứng.
! Khoảng cách :: $|P_1P_2|=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2+(z_2-z_1)^2}$.
! Mặt cầu :: $(x-h)^2+(y-k)^2+(z-l)^2=r^2$.
! Lưu ý :: $y=5$ trong $\mathbb R^3$ là một mặt phẳng, không phải đường thẳng.
~ $x^2+y^2+z^2+4x-6y+2z+6=0$ là mặt cầu tâm $(-2,3,-1)$ bán kính $\sqrt8$.
? Khoảng cách từ $(1,2,3)$ tới gốc là
+ $\sqrt{14}$
- $6$
- $\sqrt6$
= $\sqrt{1+4+9}$.
? $x^2+y^2=4$ trong $\mathbb R^3$ là
+ mặt trụ tròn trục $z$
- đường tròn
- mặt cầu
= Không ràng buộc $z$.
? Miền $1\le x^2+y^2+z^2\le4$, $z\ge0$ là
+ nửa vỏ cầu dày giữa bán kính $1$ và $2$
- hình cầu đặc
= Giữa hai mặt cầu, phía trên mặt $xy$.
& Tìm tâm và bán kính mặt cầu $2x^2+2y^2+2z^2-8x+4z=0$.
&> Chia 2: $x^2-4x+y^2+z^2+2z=0$, tức $(x-2)^2+y^2+(z+1)^2=5$.
&> Tâm $(2,0,-1)$, bán kính $\sqrt5$.

## 12.2 | Vectơ
@w vectors
| Vectơ có độ dài và hướng, không có vị trí cố định. Cộng vectơ theo quy tắc hình bình hành (nối đuôi), nhân với số thì co giãn (số âm đảo hướng).
! Thành phần :: $\vec a=\langle a_1,a_2,a_3\rangle$, $|\vec a|=\sqrt{a_1^2+a_2^2+a_3^2}$.
! Vectơ đơn vị :: $\frac{\vec a}{|\vec a|}$; vectơ cơ sở $\vec i,\vec j,\vec k$.
! Phép toán :: Cộng, trừ, nhân số theo từng thành phần.
~ Lực: hai dây kéo vật với lực $\vec F_1$, $\vec F_2$, vật cân bằng khi $\vec F_1+\vec F_2+\vec W=\vec 0$.
? $\langle2,-1,3\rangle+2\langle1,1,0\rangle$ bằng
+ $\langle4,1,3\rangle$
- $\langle3,0,3\rangle$
- $\langle4,-1,6\rangle$
= Theo từng thành phần.
? Vectơ đơn vị cùng hướng $\langle3,4\rangle$ là
+ $\langle\frac35,\frac45\rangle$
- $\langle1,1\rangle$
- $\langle3,4\rangle$
= Chia cho độ dài $5$.
? Vectơ từ $A(1,2)$ tới $B(4,6)$ là
+ $\langle3,4\rangle$
- $\langle5,8\rangle$
- $\langle-3,-4\rangle$
= Ngọn trừ gốc.
& Máy bay bay hướng đông 500 km/h, gió thổi hướng bắc 50 km/h. Tìm vận tốc thực và tốc độ.
&> $\vec v=\langle500,50\rangle$, tốc độ $\sqrt{250000+2500}\approx502{,}5$ km/h.
&> Lệch về phía bắc góc $\arctan\frac{50}{500}\approx5{,}7^\circ$.

## 12.3 | Tích vô hướng
@w vectors mode=dot
@see T33.2
| Tích vô hướng $\vec a\cdot\vec b$ là một **số**, đo mức độ hai vectơ cùng hướng: dương khi góc nhọn, $0$ khi vuông góc, âm khi góc tù. Nó cho góc giữa hai vectơ và phép chiếu.
! Định nghĩa :: $\vec a\cdot\vec b=a_1b_1+a_2b_2+a_3b_3=|\vec a||\vec b|\cos\theta$.
! Vuông góc :: $\vec a\perp\vec b\iff\vec a\cdot\vec b=0$.
! Hình chiếu :: $\operatorname{comp}_{\vec a}\vec b=\frac{\vec a\cdot\vec b}{|\vec a|}$, $\operatorname{proj}_{\vec a}\vec b=\frac{\vec a\cdot\vec b}{|\vec a|^2}\vec a$.
! Công :: $W=\vec F\cdot\vec D$.
~ Góc giữa $\langle2,2,-1\rangle$ và $\langle5,-3,2\rangle$: tích $=2$, $\cos\theta=\frac{2}{3\sqrt{38}}$, $\theta\approx84^\circ$.
? $\langle1,2,3\rangle\cdot\langle4,-5,2\rangle$ bằng
+ $0$, hai vectơ vuông góc
- $12$
- $-6$
= $4-10+6$.
? $\vec a\cdot\vec a$ bằng
+ $|\vec a|^2$
- $0$
- $|\vec a|$
= Góc $0$.
? Kéo xe với lực 70 N theo dây nghiêng $35^\circ$ đi 100 m. Công là
+ $7000\cos35^\circ\approx5734$ J
- $7000$ J
= $W=|F||D|\cos\theta$.
& Tìm hình chiếu vô hướng và vectơ của $\vec b=\langle1,1,2\rangle$ lên $\vec a=\langle-2,3,1\rangle$.
&> $\vec a\cdot\vec b=-2+3+2=3$, $|\vec a|=\sqrt{14}$.
&> $\operatorname{comp}=\frac3{\sqrt{14}}$, $\operatorname{proj}=\frac3{14}\langle-2,3,1\rangle$.

## 12.4 | Tích có hướng
| Tích có hướng $\vec a\times\vec b$ là một **vectơ** vuông góc với cả hai, hướng theo quy tắc bàn tay phải, độ dài bằng diện tích hình bình hành tạo bởi $\vec a,\vec b$. Chỉ định nghĩa trong $\mathbb R^3$.
! Định thức :: $\vec a\times\vec b=\begin{vmatrix}\vec i&\vec j&\vec k\\a_1&a_2&a_3\\b_1&b_2&b_3\end{vmatrix}$.
! Độ dài :: $|\vec a\times\vec b|=|\vec a||\vec b|\sin\theta$.
! Tính chất :: $\vec a\times\vec b=-\vec b\times\vec a$; song song $\iff\vec a\times\vec b=\vec0$.
! Tích hỗn hợp :: $|\vec a\cdot(\vec b\times\vec c)|$ là thể tích hình hộp.
! Mô-men lực :: $\vec\tau=\vec r\times\vec F$.
~ $\langle1,3,4\rangle\times\langle2,7,-5\rangle=\langle-43,13,1\rangle$.
? $\vec i\times\vec j$ bằng
+ $\vec k$
- $-\vec k$
- $0$
= Quy tắc bàn tay phải.
? Diện tích tam giác $P(1,4,6)$, $Q(-2,5,-1)$, $R(1,-1,1)$ là
+ $\frac{\sqrt{82}}{2}\cdot5=\frac{5\sqrt{82}}{2}$
- $\sqrt{82}$
= $\overrightarrow{PQ}\times\overrightarrow{PR}=\langle-40,-15,15\rangle$, độ dài $5\sqrt{82}$, chia đôi.
? $\vec a\times\vec a$ bằng
+ $\vec 0$
- $|\vec a|^2$
= Song song với chính nó.
& Kiểm tra $\vec a=\langle1,4,-7\rangle$, $\vec b=\langle2,-1,4\rangle$, $\vec c=\langle0,-9,18\rangle$ có đồng phẳng không.
&> $\vec b\times\vec c=\langle-18+36,\,0-36,\,-18\rangle=\langle18,-36,-18\rangle$.
&> $\vec a\cdot(\vec b\times\vec c)=18-144+126=0$: thể tích $0$, đồng phẳng.

## 12.5 | Phương trình đường thẳng và mặt phẳng
| Đường thẳng xác định bởi một điểm và một **vectơ chỉ phương**. Mặt phẳng xác định bởi một điểm và một **vectơ pháp tuyến** vuông góc với nó.
! Đường thẳng :: $\vec r=\vec r_0+t\vec v$, hay $x=x_0+at$, $y=y_0+bt$, $z=z_0+ct$.
! Mặt phẳng :: $a(x-x_0)+b(y-y_0)+c(z-z_0)=0$, pháp tuyến $\vec n=\langle a,b,c\rangle$.
! Khoảng cách điểm tới mặt :: $D=\frac{|ax_1+by_1+cz_1+d|}{\sqrt{a^2+b^2+c^2}}$.
~ Mặt phẳng qua $(2,4,-1)$ pháp tuyến $\langle2,3,4\rangle$: $2x+3y+4z=12$.
? Hai mặt phẳng $x+y+z=1$ và $x-2y+3z=1$ có góc giữa hai pháp tuyến với $\cos\theta$ bằng
+ $\frac{2}{\sqrt{42}}$
- $0$
- $\frac12$
= $\frac{1-2+3}{\sqrt3\sqrt{14}}$.
? Đường $x=1+t$, $y=2t$, $z=3-t$ có vectơ chỉ phương
+ $\langle1,2,-1\rangle$
- $\langle1,0,3\rangle$
= Hệ số của $t$.
? Khoảng cách từ $(1,-2,4)$ tới mặt $3x+2y+6z=5$ là
+ $\frac{16}{7}$
- $\frac{20}{7}$
- $2$
= $\frac{|3-4+24-5|}{7}$.
& Tìm mặt phẳng qua $P(1,3,2)$, $Q(3,-1,6)$, $R(5,2,0)$.
&> $\overrightarrow{PQ}=\langle2,-4,4\rangle$, $\overrightarrow{PR}=\langle4,-1,-2\rangle$, tích có hướng $\langle12,20,14\rangle$.
&> $12(x-1)+20(y-3)+14(z-2)=0$, tức $6x+10y+7z=50$.
& Tìm giao điểm của đường $x=2+3t$, $y=-4t$, $z=5+t$ với mặt $4x+5y-2z=18$.
&> $4(2+3t)+5(-4t)-2(5+t)=18$: $-10t-2=18$, $t=-2$.
&> Điểm $(-4,8,3)$.

## 12.6 | Mặt trụ và mặt bậc hai
@w surface k=saddle
| Mặt bậc hai là đồ thị phương trình bậc hai theo $x,y,z$. Nhận dạng chúng bằng các **vết**: cắt bởi mặt phẳng $z=k$ (hoặc $x=k$, $y=k$) và xem đường cong thu được.
! Elipxoit :: $\frac{x^2}{a^2}+\frac{y^2}{b^2}+\frac{z^2}{c^2}=1$.
! Paraboloit :: $\frac z c=\frac{x^2}{a^2}+\frac{y^2}{b^2}$ (elip); $\frac zc=\frac{x^2}{a^2}-\frac{y^2}{b^2}$ (hypebol, yên ngựa).
! Nón :: $\frac{z^2}{c^2}=\frac{x^2}{a^2}+\frac{y^2}{b^2}$.
! Hypeboloit :: một tầng $\frac{x^2}{a^2}+\frac{y^2}{b^2}-\frac{z^2}{c^2}=1$; hai tầng $-\frac{x^2}{a^2}-\frac{y^2}{b^2}+\frac{z^2}{c^2}=1$.
~ $z=x^2+y^2$: vết ngang là đường tròn, vết dọc là parabol: paraboloit tròn xoay.
? $z=y^2-x^2$ là
+ paraboloit hypebol (yên ngựa)
- nón
- elipxoit
= Vết ngang là hypebol.
? $x^2+y^2-z^2=1$ là
+ hypeboloit một tầng
- hai tầng
- nón
= Vết $z=k$ luôn là đường tròn bán kính $\sqrt{1+k^2}$.
? $x^2+4z^2=4$ trong $\mathbb R^3$ là
+ mặt trụ elip trục $y$
- elipxoit
= Thiếu biến $y$.
& Nhận dạng $x^2+2z^2-6x-y+10=0$.
&> Hoàn thành bình phương: $y-1=(x-3)^2+2z^2$.
&> Paraboloit elip đỉnh $(3,1,0)$, trục song song trục $y$.

# 13 | Hàm vectơ | 0
> Đường cong trong không gian, đạo hàm và tích phân của hàm vectơ, độ cong, chuyển động.

## 13.1 | Hàm vectơ và đường cong không gian
@w spacecurve
| Hàm vectơ $\vec r(t)=\langle f(t),g(t),h(t)\rangle$ gán mỗi thời điểm một điểm trong không gian; ngọn của nó vẽ ra một **đường cong không gian**. Giới hạn và liên tục tính theo từng thành phần.
! Định nghĩa :: $\vec r(t)=f(t)\vec i+g(t)\vec j+h(t)\vec k$.
! Giới hạn :: $\lim\vec r(t)=\langle\lim f,\lim g,\lim h\rangle$.
! Đường xoắn :: $\vec r(t)=\langle\cos t,\sin t,t\rangle$ quấn quanh mặt trụ $x^2+y^2=1$.
~ Giao của mặt trụ $x^2+y^2=1$ và mặt phẳng $y+z=2$: $\vec r(t)=\langle\cos t,\sin t,2-\sin t\rangle$ (một elip).
? $\vec r(t)=\langle t,t^2,t^3\rangle$ là
+ đường bậc ba xoắn
- đường thẳng
- đường tròn
= Chiếu lên $xy$ là parabol.
? $\lim_{t\to0}\langle1+t^3,\ te^{-t},\ \frac{\sin t}{t}\rangle$ bằng
+ $\langle1,0,1\rangle$
- $\langle1,0,0\rangle$
= Từng thành phần.
? Đường $\langle2\cos t,\sin t,0\rangle$ là
+ elip trong mặt $xy$
- đường tròn
= $\frac{x^2}4+y^2=1$.
& Tìm hàm vectơ mô tả đoạn thẳng từ $P(1,3,-2)$ tới $Q(2,-1,3)$.
&> $\vec r(t)=(1-t)\langle1,3,-2\rangle+t\langle2,-1,3\rangle=\langle1+t,3-4t,-2+5t\rangle$, $0\le t\le1$.

## 13.2 | Đạo hàm và tích phân của hàm vectơ
| Đạo hàm theo từng thành phần. $\vec r'(t)$ là **vectơ tiếp tuyến**, chỉ hướng chuyển động; chia độ dài được vectơ tiếp tuyến đơn vị $\vec T$. Các quy tắc tích có bản cho tích vô hướng và tích có hướng.
! Đạo hàm :: $\vec r'(t)=\langle f',g',h'\rangle$; $\vec T=\frac{\vec r'}{|\vec r'|}$.
! Quy tắc tích :: $(\vec u\cdot\vec v)'=\vec u'\cdot\vec v+\vec u\cdot\vec v'$, $(\vec u\times\vec v)'=\vec u'\times\vec v+\vec u\times\vec v'$.
! Độ dài không đổi :: $|\vec r(t)|=c$ thì $\vec r\perp\vec r'$.
~ $\vec r=\langle1+t^3,te^{-t},\sin2t\rangle$: $\vec r'=\langle3t^2,(1-t)e^{-t},2\cos2t\rangle$, $\vec r'(0)=\langle0,1,2\rangle$.
? Tiếp tuyến của đường xoắn $\langle2\cos t,\sin t,t\rangle$ tại $t=\frac\pi2$ có chỉ phương
+ $\langle-2,0,1\rangle$
- $\langle0,1,\frac\pi2\rangle$
= $\vec r'=\langle-2\sin t,\cos t,1\rangle$.
? $\int_0^{\pi/2}\langle2\cos t,\sin t,2t\rangle dt$ bằng
+ $\langle2,1,\frac{\pi^2}4\rangle$
- $\langle0,1,\pi\rangle$
= Từng thành phần.
? Vì sao vị trí trên mặt cầu thì vận tốc vuông góc với vectơ vị trí?
+ $\vec r\cdot\vec r=c^2$, đạo hàm được $2\vec r\cdot\vec r'=0$
- vì chuyển động tròn đều
= Quy tắc tích vô hướng.
& Tìm vectơ tiếp tuyến đơn vị của $\vec r(t)=\langle t^2,2t,\ln t\rangle$ tại $t=1$.
&> $\vec r'=\langle2t,2,\frac1t\rangle$, tại $t=1$: $\langle2,2,1\rangle$, độ dài $3$.
&> $\vec T(1)=\langle\frac23,\frac23,\frac13\rangle$.

## 13.3 | Độ dài cung và độ cong
@w curvature
| Độ cong $\kappa$ đo đường cong "bẻ hướng" nhanh tới đâu trên mỗi đơn vị độ dài. Đường tròn bán kính $R$ có độ cong $\frac1R$; đường thẳng có độ cong $0$. Đường tròn mật tiếp tại một điểm là đường tròn khớp nhất với đường cong tại đó.
! Độ dài cung :: $L=\int_a^b|\vec r'(t)|dt$.
! Độ cong :: $\kappa=\left|\frac{d\vec T}{ds}\right|=\frac{|\vec T'(t)|}{|\vec r'(t)|}=\frac{|\vec r'\times\vec r''|}{|\vec r'|^3}$.
! Đồ thị $y=f(x)$ :: $\kappa=\frac{|f''(x)|}{(1+f'(x)^2)^{3/2}}$.
! Khung TNB :: $\vec T$, pháp tuyến chính $\vec N=\frac{\vec T'}{|\vec T'|}$, trùng pháp tuyến $\vec B=\vec T\times\vec N$.
~ Parabol $y=x^2$: $\kappa=\frac{2}{(1+4x^2)^{3/2}}$, lớn nhất $2$ tại đỉnh.
? Độ cong của đường tròn bán kính $5$ là
+ $\frac15$
- $5$
- $25$
= $\kappa=\frac1R$.
? Độ dài một vòng đường xoắn $\langle\cos t,\sin t,t\rangle$ ($0\le t\le2\pi$) là
+ $2\sqrt2\pi$
- $2\pi$
- $4\pi$
= $|\vec r'|=\sqrt2$.
? Độ cong của $y=x^3$ tại gốc là
+ $0$
- $1$
- $6$
= $f''(0)=0$: điểm uốn.
& Tìm độ cong của đường bậc ba xoắn $\vec r=\langle t,t^2,t^3\rangle$ tại gốc.
&> $\vec r'(0)=\langle1,0,0\rangle$, $\vec r''(0)=\langle0,2,0\rangle$, tích có hướng $\langle0,0,2\rangle$.
&> $\kappa(0)=\frac{2}{1^3}=2$.
& Tìm bán kính đường tròn mật tiếp của $y=x^2$ tại $(1,1)$.
&> $\kappa(1)=\frac{2}{(1+4)^{3/2}}=\frac{2}{5\sqrt5}$. Bán kính $\frac1\kappa=\frac{5\sqrt5}2\approx5{,}59$.

## 13.4 | Chuyển động trong không gian: vận tốc và gia tốc
@w projectile
| Vận tốc là đạo hàm vị trí, gia tốc là đạo hàm vận tốc. Gia tốc tách thành hai phần: **tiếp tuyến** (thay đổi tốc độ) và **pháp tuyến** (bẻ hướng, tỉ lệ với độ cong và bình phương tốc độ).
! Chuyển động :: $\vec v=\vec r'$, $\vec a=\vec v'$, tốc độ $|\vec v|$.
! Định luật Newton :: $\vec F=m\vec a$.
! Phân tích :: $\vec a=v'\vec T+\kappa v^2\vec N$.
! Ném xiên :: Vận tốc ban đầu $v_0$, góc $\alpha$: $\vec r=\langle v_0t\cos\alpha,\ v_0t\sin\alpha-\frac12gt^2\rangle$; tầm xa $\frac{v_0^2\sin2\alpha}{g}$, lớn nhất khi $\alpha=45^\circ$.
~ Đạn bắn $v_0=150$ m/s, góc $45^\circ$ ($g=9{,}8$): tầm xa $\approx2296$ m.
? Chuyển động tròn đều có gia tốc
+ hướng vào tâm, độ lớn $\frac{v^2}R$
- bằng $0$
- tiếp tuyến
= Tốc độ không đổi nên chỉ còn thành phần pháp tuyến.
? Ném xiên, góc nào cho tầm xa bằng góc $30^\circ$?
+ $60^\circ$
- $45^\circ$
- $15^\circ$
= $\sin2\alpha$ bằng nhau.
? Khi xe vào cua với tốc độ gấp đôi, lực hướng tâm cần
+ gấp bốn
- gấp đôi
= Tỉ lệ $v^2$.
& Vật có gia tốc $\vec a=\langle6t,12t^2,-6t\rangle$, $\vec v(0)=\langle1,-1,1\rangle$, $\vec r(0)=\vec 0$. Tìm $\vec r(t)$.
&> $\vec v=\langle3t^2+1,4t^3-1,-3t^2+1\rangle$.
&> $\vec r=\langle t^3+t,\ t^4-t,\ -t^3+t\rangle$.

# 14 | Đạo hàm riêng | 0
> Hàm nhiều biến, đạo hàm riêng, mặt phẳng tiếp xúc, gradient, cực trị và nhân tử Lagrange.

## 14.1 | Hàm nhiều biến
@w contour
| Hàm hai biến $z=f(x,y)$ có đồ thị là một mặt trong $\mathbb R^3$. Cách nhìn thứ hai là **bản đồ đường mức**: các đường $f(x,y)=k$, như bản đồ địa hình. Đường mức dày đặc nghĩa là dốc.
! Miền xác định :: Tập các $(x,y)$ để công thức có nghĩa.
! Đường mức :: $\{(x,y): f(x,y)=k\}$.
! Mặt mức :: Với $f(x,y,z)$, mặt $f=k$.
~ $f(x,y)=\sqrt{9-x^2-y^2}$: miền là đĩa $x^2+y^2\le9$, đồ thị là nửa trên mặt cầu, đường mức là các đường tròn đồng tâm.
? Đường mức của $f=x^2+y^2$ là
+ các đường tròn đồng tâm
- các đường thẳng song song
- các hypebol
= $x^2+y^2=k$.
? Miền xác định của $\ln(x+y)$ là
+ nửa mặt phẳng $x+y>0$
- toàn $\mathbb R^2$
= Logarit cần đối số dương.
? Đường mức của $f=y-x^2$ là
+ các parabol
- các đường tròn
= $y=x^2+k$.
& Mô tả đường mức của $f(x,y)=4x^2+y^2$.
&> $4x^2+y^2=k$: với $k>0$ là elip $\frac{x^2}{k/4}+\frac{y^2}{k}=1$, $k=0$ là điểm gốc.
&> Đồ thị là paraboloit elip mở lên trên.

## 14.2 | Giới hạn và tính liên tục
@w contour k=disc
@see T30.2 T31.1
| Trong mặt phẳng có vô số đường tiến về một điểm. Giới hạn tồn tại chỉ khi **mọi** đường cho cùng giá trị. Tìm hai đường cho hai giá trị khác nhau là đủ để bác bỏ.
! Định nghĩa :: $\lim_{(x,y)\to(a,b)}f=L$ nếu $\forall\varepsilon\ \exists\delta$: $0<\sqrt{(x-a)^2+(y-b)^2}<\delta\Rightarrow|f-L|<\varepsilon$.
! Liên tục :: $\lim_{(x,y)\to(a,b)}f(x,y)=f(a,b)$; đa thức và hàm hữu tỉ liên tục trên miền.
~ $\frac{x^2-y^2}{x^2+y^2}$ tại gốc: dọc trục $x$ bằng $1$, dọc trục $y$ bằng $-1$: không có giới hạn.
~ $\frac{3x^2y}{x^2+y^2}\to0$ vì $\left|\frac{3x^2y}{x^2+y^2}\right|\le3|y|$.
? $\lim_{(x,y)\to(0,0)}\frac{xy}{x^2+y^2}$
+ không tồn tại
- bằng $0$
- bằng $\frac12$
= Dọc $y=x$ được $\frac12$, dọc trục được $0$.
? $\lim_{(x,y)\to(1,2)}(x^2y+3y)$ bằng
+ $8$
- $5$
- $6$
= Thế trực tiếp (đa thức).
? $\frac{xy^2}{x^2+y^4}$ tại gốc: dọc mọi đường thẳng $\to0$ nhưng dọc $x=y^2$ bằng
+ $\frac12$, nên không có giới hạn
- $0$
= Đường thẳng chưa đủ.
& Tính $\lim_{(x,y)\to(0,0)}\frac{x^2y^3}{2x^2+y^2}$.
&> $\frac{x^2}{2x^2+y^2}\le\frac12$, nên $\left|\frac{x^2y^3}{2x^2+y^2}\right|\le\frac{|y|^3}{2}\to0$.

## 14.3 | Đạo hàm riêng
@w surface
@see T34.3
| Đạo hàm riêng theo $x$: giữ $y$ cố định, đạo hàm như hàm một biến. Hình học: cắt mặt bằng mặt phẳng $y=b$, lấy hệ số góc tiếp tuyến của vết. Đạo hàm cấp cao lấy liên tiếp; đạo hàm hỗn hợp bằng nhau khi chúng liên tục (Clairaut).
! Ký hiệu :: $f_x=\frac{\partial f}{\partial x}$, $f_{xy}=(f_x)_y=\frac{\partial^2f}{\partial y\partial x}$.
! Clairaut :: $f_{xy}$, $f_{yx}$ liên tục thì bằng nhau.
! PTĐHR :: Phương trình Laplace $u_{xx}+u_{yy}=0$, phương trình sóng $u_{tt}=a^2u_{xx}$.
~ $f=x^3+x^2y^3-2y^2$: $f_x=3x^2+2xy^3$, $f_y=3x^2y^2-4y$; tại $(2,1)$: $f_x=16$, $f_y=8$.
? $\frac{\partial}{\partial x}\sin\frac{x}{1+y}$ bằng
+ $\frac{1}{1+y}\cos\frac{x}{1+y}$
- $\cos\frac{x}{1+y}$
- $-\frac{x}{(1+y)^2}\cos\frac{x}{1+y}$
= Coi $y$ là hằng.
? $f=e^{xy}$, $f_{xy}$ bằng
+ $(1+xy)e^{xy}$
- $xye^{xy}$
- $e^{xy}$
= $f_x=ye^{xy}$, đạo hàm theo $y$.
? $u=e^x\sin y$ thoả
+ phương trình Laplace
- phương trình sóng
= $u_{xx}+u_{yy}=e^x\sin y-e^x\sin y=0$.
& Tìm $\frac{\partial z}{\partial x}$ biết $x^3+y^3+z^3+6xyz=1$.
&> Đạo hàm ẩn theo $x$ ($y$ hằng): $3x^2+3z^2z_x+6yz+6xyz_x=0$.
&> $z_x=-\frac{x^2+2yz}{z^2+2xy}$.

## 14.4 | Mặt phẳng tiếp xúc và xấp xỉ tuyến tính
@w surface k=peak
@see T34.2
| Mặt khả vi, khi phóng to, trông như mặt phẳng tiếp xúc. Xấp xỉ $f$ gần $(a,b)$ bằng mặt phẳng đó. Có đạo hàm riêng chưa đủ để khả vi; cần thêm đạo hàm riêng liên tục.
! Mặt phẳng tiếp xúc :: $z-z_0=f_x(a,b)(x-a)+f_y(a,b)(y-b)$.
! Vi phân :: $dz=f_xdx+f_ydy$.
! Khả vi :: $f_x,f_y$ liên tục gần $(a,b)$ thì $f$ khả vi tại đó.
~ Mặt $z=2x^2+y^2$ tại $(1,1,3)$: $z=4x+2y-3$.
? Tuyến tính hoá của $f=xe^{xy}$ tại $(1,0)$ là
+ $L=x+y$
- $L=1+x$
- $L=x$
= $f=1$, $f_x=1$, $f_y=1$ tại $(1,0)$.
? Hình trụ $r=10$ cm, $h=25$ cm, sai số mỗi số đo $0{,}1$ cm. Sai số thể tích ước tính
+ $\approx60\pi\,\text{cm}^3$
- $\approx20\pi\,\text{cm}^3$
- $\approx0{,}2\,\text{cm}^3$
= $dV=2\pi rh\,dr+\pi r^2dh=2\pi(10)(25)(0{,}1)+\pi(100)(0{,}1)=50\pi+10\pi$.
? Hàm $\frac{xy}{x^2+y^2}$ có $f_x(0,0)=f_y(0,0)=0$ nhưng
+ không khả vi tại gốc
- khả vi tại gốc
= Nó còn không liên tục tại gốc.
& Ước lượng sai số tối đa của thể tích hình trụ $r=10$, $h=25$ (cm), mỗi phép đo sai tối đa $0{,}1$ cm.
&> $V=\pi r^2h$, $dV=2\pi rh\,dr+\pi r^2dh=2\pi(10)(25)(0{,}1)+\pi(100)(0{,}1)=50\pi+10\pi=60\pi$.
&> Sai số tối đa $\approx60\pi\approx188\,\text{cm}^3$.

## 14.5 | Quy tắc chuỗi
@see T34.4
| Nếu $z$ phụ thuộc $x,y$ và chúng phụ thuộc $t$, thì $z$ thay đổi theo $t$ qua **mọi đường** trong sơ đồ cây: cộng các tích đạo hàm dọc từng nhánh.
! Trường hợp 1 :: $\frac{dz}{dt}=\frac{\partial z}{\partial x}\frac{dx}{dt}+\frac{\partial z}{\partial y}\frac{dy}{dt}$.
! Trường hợp 2 :: $\frac{\partial z}{\partial s}=\frac{\partial z}{\partial x}\frac{\partial x}{\partial s}+\frac{\partial z}{\partial y}\frac{\partial y}{\partial s}$.
! Đạo hàm ẩn :: $F(x,y)=0$ thì $\frac{dy}{dx}=-\frac{F_x}{F_y}$.
~ $z=x^2y+3xy^4$, $x=\sin2t$, $y=\cos t$: tại $t=0$, $\frac{dz}{dt}=(2xy+3y^4)(2\cos2t)+(x^2+12xy^3)(-\sin t)=6$.
? $z=e^x\sin y$, $x=st^2$, $y=s^2t$: $\frac{\partial z}{\partial s}$ bằng
+ $t^2e^{st^2}\sin(s^2t)+2st\,e^{st^2}\cos(s^2t)$
- $e^x\sin y$
= Cộng hai nhánh.
? $x^3+y^3=6xy$: $\frac{dy}{dx}$ theo công thức $-\frac{F_x}{F_y}$ là
+ $-\frac{3x^2-6y}{3y^2-6x}$
- $\frac{3x^2}{3y^2}$
= $F=x^3+y^3-6xy$.
? Sơ đồ cây cho $w=f(x,y,z)$, $x,y,z$ theo $t$ có bao nhiêu nhánh?
+ $3$
- $1$
- $6$
= Mỗi biến trung gian một nhánh.
& Nhiệt độ $T(x,y)$, một con bọ đi theo $x=\sqrt{1+t}$, $y=2+\frac t3$. Biết $T_x(2,3)=4$, $T_y(2,3)=3$. Tìm tốc độ thay đổi nhiệt độ tại $t=3$.
&> Tại $t=3$: $(x,y)=(2,3)$. $x'=\frac1{2\sqrt{1+t}}=\frac14$, $y'=\frac13$.
&> $\frac{dT}{dt}=4\cdot\frac14+3\cdot\frac13=2$ độ/giây.

## 14.6 | Đạo hàm theo hướng và vectơ gradient
@w surface mode=dir
@see T34.3
| Đạo hàm theo hướng đơn vị $\vec u$ là tốc độ thay đổi của $f$ khi đi theo $\vec u$. Nó bằng $\nabla f\cdot\vec u$, nên lớn nhất khi $\vec u$ cùng hướng gradient. Gradient vuông góc với đường mức (mặt mức).
! Gradient :: $\nabla f=\langle f_x,f_y\rangle$ (hoặc $\langle f_x,f_y,f_z\rangle$).
! Đạo hàm theo hướng :: $D_{\vec u}f=\nabla f\cdot\vec u$.
! Cực đại :: Giá trị lớn nhất của $D_{\vec u}f$ là $|\nabla f|$, đạt khi $\vec u$ cùng hướng $\nabla f$.
! Mặt phẳng tiếp xúc mặt mức :: $\nabla F(x_0,y_0,z_0)$ là pháp tuyến của $F=k$.
~ $f=x^2y^3-4y$ tại $(2,-1)$ theo hướng $\langle2,5\rangle$: $\nabla f=\langle-4,8\rangle$, $D_uf=\frac{-8+40}{\sqrt{29}}=\frac{32}{\sqrt{29}}$.
? Hướng giảm nhanh nhất của $f$ là
+ $-\nabla f$
- $\nabla f$
- vuông góc với $\nabla f$
= Ngược gradient.
? $f=x^2+y^2$ tại $(3,4)$, $|\nabla f|$ bằng
+ $10$
- $5$
- $25$
= $\nabla f=\langle6,8\rangle$.
? Đi dọc đường mức, đạo hàm theo hướng bằng
+ $0$
- $|\nabla f|$
= $f$ không đổi trên đường mức.
& Tìm mặt phẳng tiếp xúc của elipxoit $\frac{x^2}4+y^2+\frac{z^2}9=3$ tại $(-2,1,-3)$.
&> $\nabla F=\langle\frac x2,2y,\frac{2z}9\rangle=\langle-1,2,-\frac23\rangle$.
&> $-(x+2)+2(y-1)-\frac23(z+3)=0$, tức $3x-6y+2z+18=0$.

## 14.7 | Giá trị lớn nhất và nhỏ nhất
@w surface preset=saddle k=wave
@see T34.5 T30.3
| Cực trị địa phương bên trong miền xảy ra tại điểm dừng $\nabla f=\vec0$. Kiểm tra đạo hàm cấp hai dùng định thức $D=f_{xx}f_{yy}-f_{xy}^2$. Trên miền đóng bị chặn, hàm liên tục luôn đạt max/min: so sánh giá trị tại điểm dừng bên trong với giá trị trên biên.
! Kiểm tra cấp hai :: $D>0,f_{xx}>0$: cực tiểu; $D>0,f_{xx}<0$: cực đại; $D<0$: điểm yên ngựa; $D=0$: chưa kết luận.
! Miền đóng bị chặn :: Tìm điểm dừng bên trong, tìm cực trị trên biên, so sánh tất cả.
~ $f=x^2+y^2-2x-6y+14=(x-1)^2+(y-3)^2+4$: cực tiểu $4$ tại $(1,3)$.
? $f=x^4+y^4-4xy+1$ có điểm dừng
+ $(0,0)$ (yên ngựa), $(1,1)$ và $(-1,-1)$ (cực tiểu)
- chỉ $(0,0)$
= $f_x=4x^3-4y$, $f_y=4y^3-4x$.
? $D<0$ tại điểm dừng nghĩa là
+ điểm yên ngựa
- cực đại
- cực tiểu
= Hessian có hai trị riêng trái dấu.
? Hộp không nắp thể tích $32$ có diện tích nhỏ nhất khi kích thước
+ $4\times4\times2$
- $2\times4\times4$ với chiều cao $4$
- $\sqrt[3]{32}$ mỗi cạnh
= $S=xy+\frac{64}x+\frac{64}y$, điểm dừng $x=y=4$.
& Tìm max, min của $f=x^2-2xy+2y$ trên hình chữ nhật $[0,3]\times[0,2]$.
&> Bên trong: $f_x=2x-2y=0$, $f_y=-2x+2=0$: $(1,1)$, $f=1$.
&> Biên: $y=0$: $x^2\in[0,9]$; $x=3$: $9-4y\in[1,9]$; $y=2$: $(x-2)^2\in[0,4]$; $x=0$: $2y\in[0,4]$.
&> Max $9$ tại $(3,0)$, min $0$ tại $(0,0)$ và $(2,2)$.

## 14.8 | Nhân tử Lagrange
@w lagrange
| Tìm cực trị của $f$ khi bị ràng buộc $g=k$: tại điểm tối ưu, đường mức của $f$ tiếp xúc với đường ràng buộc, tức hai gradient song song: $\nabla f=\lambda\nabla g$.
! Phương pháp :: Giải $\nabla f=\lambda\nabla g$ và $g=k$; so sánh $f$ tại các nghiệm.
! Hai ràng buộc :: $\nabla f=\lambda\nabla g+\mu\nabla h$.
~ Hộp không nắp diện tích $12$: max thể tích $xyz$ với $2xz+2yz+xy=12$ cho $x=y=2$, $z=1$, $V=4$.
? Max của $f=xy$ trên $x+y=10$ là
+ $25$
- $50$
- $100$
= $y=\lambda$, $x=\lambda$, nên $x=y=5$.
? Điểm trên $x^2+y^2=1$ có $f=x+2y$ lớn nhất là
+ $\left(\frac1{\sqrt5},\frac2{\sqrt5}\right)$
- $(0,1)$
- $(1,0)$
= $\nabla f=\langle1,2\rangle$ song song với vectơ vị trí.
? Ý nghĩa hình học của $\nabla f=\lambda\nabla g$ là
+ đường mức của $f$ tiếp xúc với đường ràng buộc
- $f$ và $g$ bằng nhau
= Gradient vuông góc với đường mức.
& Tìm cực trị của $f(x,y)=x^2+2y^2$ trên đường tròn $x^2+y^2=1$.
&> $2x=2\lambda x$, $4y=2\lambda y$. Hoặc $x=0$ ($y=\pm1$, $f=2$), hoặc $\lambda=1$ thì $y=0$ ($x=\pm1$, $f=1$).
&> Max $2$ tại $(0,\pm1)$, min $1$ tại $(\pm1,0)$.
& Tìm điểm trên mặt cầu $x^2+y^2+z^2=4$ gần điểm $(3,1,-1)$ nhất.
&> Cực tiểu bình phương khoảng cách: $\nabla$ cho $(x-3,y-1,z+1)=\lambda(x,y,z)$, nên điểm cùng phương với $(3,1,-1)$.
&> $(x,y,z)=\frac{2}{\sqrt{11}}(3,1,-1)$.
`);
