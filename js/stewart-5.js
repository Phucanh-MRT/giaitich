/* Phần II, Ch.15–17. */
(window.STEWART = window.STEWART || []).push(String.raw`
# 15 | Tích phân bội | 0
> Tích phân trên miền phẳng và trong không gian, toạ độ cực, trụ, cầu và phép đổi biến.

## 15.1 | Tích phân kép trên hình chữ nhật
@w doubleint
@see T36.5
| Thể tích dưới mặt $z=f(x,y)$ trên hình chữ nhật $R$: chia $R$ thành ô nhỏ, mỗi ô dựng cột cao $f$, cộng thể tích các cột, lấy giới hạn. **Định lý Fubini** cho phép tính bằng hai tích phân lặp, theo thứ tự nào cũng được.
! Định nghĩa :: $\iint_Rf\,dA=\lim\sum_{i,j}f(x_{ij}^*,y_{ij}^*)\Delta A$.
! Fubini :: $f$ liên tục trên $R=[a,b]\times[c,d]$: $\iint_Rf\,dA=\int_a^b\int_c^df\,dy\,dx=\int_c^d\int_a^bf\,dx\,dy$.
! Tách biến :: $\iint_Rg(x)h(y)dA=\int_a^bg\,dx\cdot\int_c^dh\,dy$.
~ $\iint_{[0,2]\times[1,2]}(x-3y^2)dA=\int_0^2(x-7)dx=-12$.
? $\iint_{[0,1]\times[0,1]}xy\,dA$ bằng
+ $\frac14$
- $\frac12$
- $1$
= $\frac12\cdot\frac12$.
? Giá trị trung bình của $f$ trên $R$ là
+ $\frac{1}{\text{diện tích }R}\iint_Rf\,dA$
- $\iint_Rf\,dA$
= Giống trường hợp một biến.
? $\iint_{[0,\pi]\times[0,\pi/2]}\sin x\cos y\,dA$ bằng
+ $2$
- $0$
- $1$
= $\int_0^\pi\sin x\,dx\cdot\int_0^{\pi/2}\cos y\,dy$.
& Tính $\iint_R y\sin(xy)\,dA$ với $R=[1,2]\times[0,\pi]$.
&> Tích phân theo $x$ trước: $\int_1^2y\sin(xy)dx=[-\cos(xy)]_1^2=-\cos2y+\cos y$.
&> $\int_0^\pi(-\cos2y+\cos y)dy=0$. (Theo $y$ trước sẽ phải dùng từng phần.)

## 15.2 | Tích phân kép trên miền tổng quát
| Miền được mô tả bằng cận biến thiên: loại I $a\le x\le b$, $g_1(x)\le y\le g_2(x)$; loại II theo $y$. Cận trong phụ thuộc biến ngoài. Đổi thứ tự lấy tích phân đôi khi biến tích phân không tính được thành tính được.
! Loại I :: $\iint_Df\,dA=\int_a^b\int_{g_1(x)}^{g_2(x)}f\,dy\,dx$.
! Loại II :: $\iint_Df\,dA=\int_c^d\int_{h_1(y)}^{h_2(y)}f\,dx\,dy$.
! Diện tích :: $A(D)=\iint_D1\,dA$.
~ $D$ giữa $y=2x^2$ và $y=1+x^2$: $\iint_D(x+2y)dA=\int_{-1}^1\int_{2x^2}^{1+x^2}(x+2y)dy\,dx=\frac{32}{15}$.
? Miền giữa $y=x$ và $y=x^2$ mô tả loại I là
+ $0\le x\le1$, $x^2\le y\le x$
- $0\le x\le1$, $x\le y\le x^2$
= Trên $[0,1]$, $x^2\le x$.
? Đổi thứ tự $\int_0^1\int_x^1e^{y^2}dy\,dx$ thành
+ $\int_0^1\int_0^ye^{y^2}dx\,dy$
- $\int_0^1\int_0^xe^{y^2}dx\,dy$
= Miền $0\le x\le y\le1$.
? Thể tích dưới $z=x^2+y^2$ trên miền tam giác $0\le y\le x\le1$ là
+ $\frac13$
- $\frac23$
- $\frac16$
= $\int_0^1\int_0^x(x^2+y^2)dy\,dx=\int_0^1\frac43x^3dx$.
& Tính $\int_0^1\int_x^1\sin(y^2)\,dy\,dx$.
&> Không có nguyên hàm theo $y$; đổi thứ tự: $\int_0^1\int_0^y\sin(y^2)dx\,dy=\int_0^1y\sin(y^2)dy$.
&> $=\frac12(1-\cos1)$.

## 15.3 | Tích phân kép trong toạ độ cực
@w doubleint mode=polar
| Miền tròn, vành khuyên, quạt mô tả gọn bằng $r,\theta$. Ô nhỏ trong toạ độ cực có diện tích $r\,dr\,d\theta$ (không phải $dr\,d\theta$): càng xa gốc ô càng rộng.
! Đổi biến :: $\iint_Rf\,dA=\int_\alpha^\beta\int_a^bf(r\cos\theta,r\sin\theta)\,r\,dr\,d\theta$.
~ $\int_{-\infty}^\infty e^{-x^2}dx=\sqrt\pi$: bình phương lên rồi chuyển sang toạ độ cực, $\iint e^{-(x^2+y^2)}dA=\int_0^{2\pi}\int_0^\infty e^{-r^2}r\,dr\,d\theta=\pi$.
? Diện tích hình tròn bán kính $a$ trong toạ độ cực
+ $\int_0^{2\pi}\int_0^ar\,dr\,d\theta=\pi a^2$
- $\int_0^{2\pi}\int_0^a1\,dr\,d\theta=2\pi a$
= Quên $r$ là lỗi thường gặp.
? $\iint_{x^2+y^2\le1}(x^2+y^2)dA$ bằng
+ $\frac\pi2$
- $\pi$
- $2\pi$
= $\int_0^{2\pi}\int_0^1r^3dr\,d\theta$.
? Miền $1\le x^2+y^2\le4$, $y\ge0$ là
+ $1\le r\le2$, $0\le\theta\le\pi$
- $1\le r\le4$, $0\le\theta\le2\pi$
= Nửa vành khuyên trên.
& Tính thể tích vật nằm dưới paraboloit $z=1-x^2-y^2$ và trên mặt $xy$.
&> Miền $r\le1$: $V=\int_0^{2\pi}\int_0^1(1-r^2)r\,dr\,d\theta=2\pi\left(\frac12-\frac14\right)=\frac\pi2$.
& Tính $\iint_R(3x+4y^2)dA$ với $R$ là nửa vành khuyên $1\le x^2+y^2\le4$, $y\ge0$.
&> $\int_0^\pi\int_1^2(3r\cos\theta+4r^2\sin^2\theta)r\,dr\,d\theta=\int_0^\pi(7\cos\theta+15\sin^2\theta)d\theta=\frac{15\pi}2$.

## 15.4 | Ứng dụng của tích phân kép
| Tấm phẳng có mật độ $\rho(x,y)$: khối lượng là tích phân của mật độ; khối tâm là trung bình vị trí có trọng số mật độ; mô-men quán tính đo khả năng chống quay. Trong xác suất, hàm mật độ đồng thời cho xác suất của một miền.
! Khối lượng :: $m=\iint_D\rho\,dA$.
! Khối tâm :: $\bar x=\frac1m\iint x\rho\,dA$, $\bar y=\frac1m\iint y\rho\,dA$.
! Mô-men quán tính :: $I_x=\iint y^2\rho\,dA$, $I_y=\iint x^2\rho\,dA$, $I_0=I_x+I_y$.
! Xác suất :: $P((X,Y)\in D)=\iint_Df(x,y)dA$ với $f\ge0$, $\iint_{\mathbb R^2}f=1$.
~ Tam giác đỉnh $(0,0),(1,0),(0,2)$, $\rho=1+3x+y$: $m=\frac83$, khối tâm $(\frac38,\frac{11}{16})$.
? Khối tâm của đĩa đồng chất là
+ tâm đĩa
- một điểm trên biên
= Đối xứng.
? Mô-men quán tính của đĩa đồng chất bán kính $a$, mật độ $\rho$, quanh tâm là
+ $\frac{\pi\rho a^4}{2}$
- $\pi\rho a^2$
= $\int_0^{2\pi}\int_0^ar^2\rho r\,dr\,d\theta$.
? $f(x,y)=Ce^{-x-y}$ ($x,y\ge0$) là mật độ khi
+ $C=1$
- $C=2$
= $\int_0^\infty\int_0^\infty e^{-x-y}=1$.
& Tìm khối tâm của nửa đĩa đồng chất $x^2+y^2\le a^2$, $y\ge0$.
&> $m=\frac{\pi a^2}2\rho$. $\iint y\,dA=\int_0^\pi\int_0^ar\sin\theta\cdot r\,dr\,d\theta=\frac{2a^3}3$.
&> $\bar y=\frac{2a^3/3}{\pi a^2/2}=\frac{4a}{3\pi}$, $\bar x=0$.

## 15.5 | Diện tích mặt
| Mặt $z=f(x,y)$ trên miền $D$: mỗi ô nhỏ $\Delta A$ ứng với một mảnh mặt phẳng tiếp xúc, diện tích lớn hơn $\Delta A$ theo hệ số $\sqrt{1+f_x^2+f_y^2}$ (mặt càng dốc, mảnh càng lớn).
! Công thức :: $A(S)=\iint_D\sqrt{1+f_x^2+f_y^2}\,dA$.
~ Phần paraboloit $z=x^2+y^2$ dưới $z=9$: $A=\int_0^{2\pi}\int_0^3\sqrt{1+4r^2}\,r\,dr\,d\theta=\frac\pi6(37\sqrt{37}-1)$.
? Diện tích mặt phẳng $z=2x+2y$ trên hình vuông đơn vị là
+ $3$
- $1$
- $\sqrt8$
= $\sqrt{1+4+4}=3$.
? Mặt nằm ngang $z=c$ trên $D$ có diện tích
+ bằng diện tích $D$
- lớn hơn
= $f_x=f_y=0$.
? Vì sao diện tích mặt dùng căn?
+ Độ dài pháp tuyến $\langle-f_x,-f_y,1\rangle$ là $\sqrt{1+f_x^2+f_y^2}$
- để đảm bảo dương
= Diện tích mảnh tiếp xúc bằng $|\vec r_x\times\vec r_y|\Delta A$.
& Tính diện tích phần mặt $z=x^2+2y$ trên tam giác $(0,0),(1,0),(1,1)$.
&> $\sqrt{1+4x^2+4}=\sqrt{5+4x^2}$. $\int_0^1\int_0^x\sqrt{5+4x^2}\,dy\,dx=\int_0^1x\sqrt{5+4x^2}dx$.
&> $=\frac1{12}(5+4x^2)^{3/2}\big|_0^1=\frac{27-5\sqrt5}{12}$.

## 15.6 | Tích phân bội ba
| Mở rộng lên ba chiều: $\iiint_Ef\,dV$. Khi $f=1$ là thể tích; khi $f=\rho$ là khối lượng. Tính bằng ba tích phân lặp, cận trong cùng phụ thuộc hai biến ngoài.
! Fubini :: $\iiint_Bf\,dV=\int\int\int f\,dx\,dy\,dz$ theo bất kỳ thứ tự nào trên hộp.
! Miền tổng quát :: $E=\{(x,y)\in D,\ u_1(x,y)\le z\le u_2(x,y)\}$: $\iiint_Ef=\iint_D\left[\int_{u_1}^{u_2}f\,dz\right]dA$.
~ Tứ diện giới hạn bởi các mặt toạ độ và $x+y+z=1$: $\iiint_Ez\,dV=\frac1{24}$.
? Thể tích hộp $[0,1]\times[0,2]\times[0,3]$ bằng tích phân bội ba của $1$, bằng
+ $6$
- $3$
- $1$
= Tích các cạnh.
? Thể tích tứ diện giới hạn bởi các mặt toạ độ và $x+y+z=1$ là
+ $\frac16$
- $\frac13$
- $\frac12$
= $\int_0^1\int_0^{1-x}(1-x-y)dy\,dx$.
? $\iiint_{[0,1]^3}xyz\,dV$ bằng
+ $\frac18$
- $\frac16$
- $1$
= $\left(\frac12\right)^3$.
& Tính $\iiint_E\sqrt{x^2+z^2}\,dV$ với $E$ giới hạn bởi paraboloit $y=x^2+z^2$ và mặt $y=4$.
&> Chiếu lên mặt $xz$: đĩa $x^2+z^2\le4$. Tích phân theo $y$ trước: $\iint_D(4-x^2-z^2)\sqrt{x^2+z^2}\,dA$.
&> Toạ độ cực trong mặt $xz$: $\int_0^{2\pi}\int_0^2(4-r^2)r\cdot r\,dr\,d\theta=2\pi\left(\frac{32}3-\frac{32}5\right)=\frac{128\pi}{15}$.

## 15.7 | Tích phân bội ba trong toạ độ trụ
| Toạ độ trụ = toạ độ cực trong mặt $xy$ + giữ nguyên $z$. Hợp với vật có trục đối xứng (ống, nón, paraboloit). Phần tử thể tích $r\,dz\,dr\,d\theta$.
! Đổi biến :: $x=r\cos\theta$, $y=r\sin\theta$, $z=z$; $dV=r\,dz\,dr\,d\theta$.
~ Vật trong mặt trụ $x^2+y^2=1$, dưới $z=4$, trên paraboloit $z=1-x^2-y^2$, mật độ tỉ lệ khoảng cách tới trục: $m=\int_0^{2\pi}\int_0^1\int_{1-r^2}^4Kr\cdot r\,dz\,dr\,d\theta=\frac{12\pi K}{5}$.
? Mặt $r=2$ trong toạ độ trụ là
+ mặt trụ bán kính 2 quanh trục $z$
- mặt cầu
- mặt phẳng
= $x^2+y^2=4$.
? Thể tích hình trụ bán kính $a$, cao $h$ bằng toạ độ trụ
+ $\int_0^{2\pi}\int_0^a\int_0^hr\,dz\,dr\,d\theta=\pi a^2h$
- $2\pi ah$
= Nhớ thừa số $r$.
? Mặt nón $z=\sqrt{x^2+y^2}$ trong toạ độ trụ là
+ $z=r$
- $z=r^2$
- $r=1$
= Thay trực tiếp.
& Tính thể tích vật nằm trong mặt trụ $r=1$, trên mặt $z=0$, dưới mặt nón $z=2-r$.
&> $V=\int_0^{2\pi}\int_0^1(2-r)r\,dr\,d\theta=2\pi\left(1-\frac13\right)=\frac{4\pi}3$.

## 15.8 | Tích phân bội ba trong toạ độ cầu
| Toạ độ cầu $(\rho,\theta,\phi)$: khoảng cách tới gốc, góc kinh độ, góc từ trục $z$ xuống. Hợp với hình cầu, nón đỉnh gốc. Phần tử thể tích $\rho^2\sin\phi\,d\rho\,d\theta\,d\phi$.
! Đổi biến :: $x=\rho\sin\phi\cos\theta$, $y=\rho\sin\phi\sin\theta$, $z=\rho\cos\phi$; $dV=\rho^2\sin\phi\,d\rho\,d\theta\,d\phi$.
~ Thể tích hình cầu: $\int_0^\pi\int_0^{2\pi}\int_0^a\rho^2\sin\phi\,d\rho\,d\theta\,d\phi=\frac{a^3}3\cdot2\pi\cdot2=\frac43\pi a^3$.
? Mặt $\phi=\frac\pi4$ là
+ nửa mặt nón $z=\sqrt{x^2+y^2}$
- mặt phẳng
- mặt cầu
= Góc với trục $z$ không đổi.
? $\iiint_{\rho\le1}e^{(x^2+y^2+z^2)^{3/2}}dV$ bằng
+ $\frac{4\pi}3(e-1)$
- $\frac{4\pi}{3}e$
= $\int\rho^2e^{\rho^3}d\rho=\frac{e^{\rho^3}}3$.
? Điểm có toạ độ Descartes $(0,0,-2)$ có $\phi$ bằng
+ $\pi$
- $0$
- $\frac\pi2$
= Nằm trên nửa âm trục $z$.
& Tính thể tích phần nằm trên nón $z=\sqrt{x^2+y^2}$ và dưới mặt cầu $x^2+y^2+z^2=z$.
&> Mặt cầu: $\rho=\cos\phi$; nón: $\phi=\frac\pi4$.
&> $V=\int_0^{2\pi}\int_0^{\pi/4}\int_0^{\cos\phi}\rho^2\sin\phi\,d\rho\,d\phi\,d\theta=2\pi\int_0^{\pi/4}\frac{\cos^3\phi}{3}\sin\phi\,d\phi=\frac{\pi}{8}$.

## 15.9 | Đổi biến trong tích phân bội
@w linmap mode=local
@see T34.7
| Một phép biến đổi $T(u,v)=(x,y)$ biến ô vuông nhỏ thành hình bình hành nhỏ, diện tích nhân với $|J|$, trị tuyệt đối của **định thức Jacobian**. Toạ độ cực là trường hợp $J=r$.
! Jacobian :: $\frac{\partial(x,y)}{\partial(u,v)}=\begin{vmatrix}x_u&x_v\\y_u&y_v\end{vmatrix}$.
! Đổi biến :: $\iint_Rf(x,y)\,dA=\iint_Sf(x(u,v),y(u,v))\left|\frac{\partial(x,y)}{\partial(u,v)}\right|du\,dv$.
! Ba chiều :: $dV=\left|\frac{\partial(x,y,z)}{\partial(u,v,w)}\right|du\,dv\,dw$; toạ độ cầu cho $\rho^2\sin\phi$.
~ $\iint_R e^{(x+y)/(x-y)}dA$ trên hình thang: đặt $u=x+y$, $v=x-y$, $|J|=\frac12$.
? Jacobian của $x=r\cos\theta$, $y=r\sin\theta$ là
+ $r$
- $1$
- $r^2$
= $\cos\theta\cdot r\cos\theta-(-r\sin\theta)\sin\theta$.
? Phép $x=2u$, $y=3v$ biến hình vuông đơn vị thành hình có diện tích
+ $6$
- $5$
- $1$
= $|J|=6$.
? Diện tích elip $\frac{x^2}{a^2}+\frac{y^2}{b^2}\le1$ bằng đổi biến $x=au$, $y=bv$
+ $ab\cdot\pi$
- $\pi$
- $\pi(a+b)$
= Đĩa đơn vị diện tích $\pi$, nhân $|J|=ab$.
& Tính $\iint_R(x+y)\,dA$ với $R$ là hình bình hành đỉnh $(0,0),(1,1),(2,0),(1,-1)$ bằng $u=x+y$, $v=x-y$.
&> $R$ thành hình vuông $0\le u\le2$, $0\le v\le2$. $x=\frac{u+v}2$, $y=\frac{u-v}2$, $|J|=\frac12$.
&> $\iint u\cdot\frac12\,du\,dv=\frac12\cdot2\cdot\frac{u^2}2\Big|_0^2=2$.

# 16 | Giải tích vectơ | 0
> Trường vectơ, tích phân đường và tích phân mặt, các định lý Green, Stokes và Divergence.

## 16.1 | Trường vectơ
@w vfield
| Trường vectơ gán mỗi điểm một vectơ: vận tốc gió, dòng chảy, lực hấp dẫn, điện trường. Trường **gradient** $\vec F=\nabla f$ đặc biệt: vectơ luôn vuông góc với đường mức của $f$ và chỉ hướng $f$ tăng nhanh nhất.
! Định nghĩa :: $\vec F(x,y)=P(x,y)\vec i+Q(x,y)\vec j$.
! Trường bảo toàn :: $\vec F=\nabla f$ với $f$ là hàm thế.
! Trường hấp dẫn :: $\vec F=-\frac{mMG}{|\vec x|^3}\vec x$, hướng vào tâm, giảm theo bình phương khoảng cách.
~ $\vec F=\langle-y,x\rangle$: các vectơ tiếp xúc với đường tròn tâm gốc, độ dài bằng bán kính (dòng xoáy).
? $\vec F=\langle x,y\rangle$ có dạng
+ toả ra từ gốc
- xoáy quanh gốc
- song song
= Mỗi vectơ cùng hướng vectơ vị trí.
? Trường gradient của $f=x^2+y^2$ là
+ $\langle2x,2y\rangle$
- $\langle x,y\rangle$
- $\langle2y,2x\rangle$
= $\nabla f$.
? Đường dòng (đường sức) của trường là
+ đường cong luôn tiếp xúc với vectơ trường
- đường mức
= Quỹ đạo của hạt trôi theo trường.
& Vẽ phác và mô tả trường $\vec F=\langle y,x\rangle$; nó có là trường gradient không?
&> $\vec F=\nabla f$ với $f=xy$. Đường mức $xy=c$ là hypebol, $\vec F$ vuông góc với chúng.
&> Đúng là trường gradient (bảo toàn).

## 16.2 | Tích phân đường
@w vfield mode=line
| Tích phân đường cộng giá trị dọc theo một đường cong. Với hàm vô hướng: khối lượng sợi dây ($\int f\,ds$). Với trường vectơ: **công** của lực dọc đường đi, $\int\vec F\cdot d\vec r$, chỉ tính thành phần lực dọc theo hướng đi.
! Vô hướng :: $\int_Cf\,ds=\int_a^bf(\vec r(t))|\vec r'(t)|dt$.
! Vectơ :: $\int_C\vec F\cdot d\vec r=\int_a^b\vec F(\vec r(t))\cdot\vec r'(t)dt=\int_CP\,dx+Q\,dy$.
! Đổi chiều :: Đi ngược thì tích phân trường vectơ đổi dấu (tích phân $ds$ thì không).
~ $\vec F=\langle x^2,-xy\rangle$ dọc phần tư đường tròn $\vec r=\langle\cos t,\sin t\rangle$, $t\in[0,\frac\pi2]$: công $=-\frac23$.
? Công của $\vec F=\langle-y,x\rangle$ quanh đường tròn đơn vị (ngược kim đồng hồ) là
+ $2\pi$
- $0$
- $\pi$
= $\vec F\cdot\vec r'=\sin^2+\cos^2=1$.
? $\int_C ds$ bằng
+ độ dài của $C$
- $0$
= Hàm $f=1$.
? Đi theo đường mà lực luôn vuông góc với hướng đi thì công
+ bằng $0$
- lớn nhất
= $\vec F\cdot\vec r'=0$.
& Tính $\int_C(2+x^2y)\,ds$ với $C$ là nửa trên đường tròn đơn vị.
&> $\vec r=\langle\cos t,\sin t\rangle$, $|\vec r'|=1$: $\int_0^\pi(2+\cos^2t\sin t)dt=2\pi+\left[-\frac{\cos^3t}3\right]_0^\pi=2\pi+\frac23$.

## 16.3 | Định lý cơ bản cho tích phân đường
@w vfield mode=conservative
| Với trường gradient, công chỉ phụ thuộc điểm đầu và điểm cuối, không phụ thuộc đường đi; quanh mọi đường kín công bằng $0$. Trên miền đơn liên, $\vec F=\langle P,Q\rangle$ là bảo toàn khi và chỉ khi $P_y=Q_x$.
! Định lý :: $\int_C\nabla f\cdot d\vec r=f(\vec r(b))-f(\vec r(a))$.
! Độc lập đường đi :: tương đương với tích phân trên mọi đường kín bằng $0$.
! Kiểm tra :: Trên miền đơn liên mở, $P_y=Q_x$ thì $\vec F$ bảo toàn.
! Bảo toàn năng lượng :: Trong trường bảo toàn, động năng + thế năng không đổi.
~ $\vec F=\langle3+2xy,x^2-3y^2\rangle$: $P_y=2x=Q_x$, hàm thế $f=3x+x^2y-y^3$.
? $\vec F=\langle x-y,x-2\rangle$ có bảo toàn không?
+ Không, $P_y=-1\ne1=Q_x$
- Có
= Kiểm tra đạo hàm chéo.
? $\vec F=\langle-\frac{y}{x^2+y^2},\frac{x}{x^2+y^2}\rangle$ có $P_y=Q_x$ nhưng tích phân quanh đường tròn đơn vị bằng $2\pi$ vì
+ miền $\mathbb R^2\setminus\{0\}$ không đơn liên
- tính sai
= Lỗ thủng tại gốc.
? Nếu $\vec F=\nabla f$ thì $\oint_C\vec F\cdot d\vec r$ trên đường kín bằng
+ $0$
- $2\pi$
= Điểm đầu trùng điểm cuối.
& Tìm hàm thế của $\vec F=\langle e^y,xe^y\rangle$ và tính $\int_C\vec F\cdot d\vec r$ từ $(0,0)$ tới $(2,1)$.
&> $f_x=e^y$ nên $f=xe^y+g(y)$; $f_y=xe^y+g'(y)=xe^y$, nên $g$ hằng. $f=xe^y$.
&> Tích phân $=f(2,1)-f(0,0)=2e$.

## 16.4 | Định lý Green
| Tích phân đường quanh biên kín bằng tích phân kép của "độ xoáy" bên trong. Trực giác: các xoáy nhỏ bên trong triệt tiêu nhau ở ranh giới chung, chỉ còn phần trên biên ngoài.
! Định lý Green :: $\oint_CP\,dx+Q\,dy=\iint_D\left(\frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y}\right)dA$, $C$ đi ngược kim đồng hồ.
! Diện tích :: $A=\oint_Cx\,dy=-\oint_Cy\,dx=\frac12\oint_C(x\,dy-y\,dx)$.
~ Diện tích elip $x=a\cos t$, $y=b\sin t$: $\frac12\int_0^{2\pi}(ab\cos^2t+ab\sin^2t)dt=\pi ab$.
? $\oint_C(3y-e^{\sin x})dx+(7x+\sqrt{y^4+1})dy$ quanh đường tròn bán kính $3$ bằng
+ $36\pi$
- $9\pi$
- $0$
= $Q_x-P_y=7-3=4$, nhân diện tích $9\pi$.
? Green áp dụng cho
+ đường cong kín, đơn, trơn từng khúc, định hướng dương
- mọi đường cong
= Có thể mở rộng cho miền có lỗ.
? Máy planimeter đo diện tích bằng cách
+ lăn dọc biên, tính $\oint x\,dy$
- đếm ô vuông
= Ứng dụng của Green.
& Tính $\oint_Cx^4dx+xy\,dy$ với $C$ là tam giác $(0,0)\to(1,0)\to(0,1)\to(0,0)$.
&> $Q_x-P_y=y-0=y$.
&> $\iint_Dy\,dA=\int_0^1\int_0^{1-x}y\,dy\,dx=\int_0^1\frac{(1-x)^2}2dx=\frac16$.

## 16.5 | Rota và divergence
@w vfield mode=curl
| **Divergence** đo trường "toả ra" (nguồn) hay "hút vào" (giếng) tại một điểm. **Rota** đo trường "xoáy" quanh điểm đó: thả một bánh xe nhỏ vào dòng chảy, rota cho biết nó quay nhanh thế nào và quanh trục nào.
! Divergence :: $\operatorname{div}\vec F=\nabla\cdot\vec F=P_x+Q_y+R_z$.
! Rota :: $\operatorname{curl}\vec F=\nabla\times\vec F$.
! Đồng nhất :: $\nabla\times(\nabla f)=\vec0$; $\nabla\cdot(\nabla\times\vec F)=0$.
! Bảo toàn :: Trên miền đơn liên, $\operatorname{curl}\vec F=\vec0$ khi và chỉ khi $\vec F$ bảo toàn.
~ $\vec F=\langle xz,xyz,-y^2\rangle$: $\operatorname{curl}\vec F=\langle-y(2+x),\,x,\,yz\rangle$, $\operatorname{div}\vec F=z+xz$.
? $\operatorname{div}\langle x,y,z\rangle$ bằng
+ $3$
- $0$
- $1$
= Trường toả đều.
? $\operatorname{curl}\langle-y,x,0\rangle$ bằng
+ $\langle0,0,2\rangle$
- $\vec 0$
- $\langle0,0,1\rangle$
= Xoáy quanh trục $z$.
? Trường vận tốc của chất lỏng không nén được có
+ divergence bằng $0$
- rota bằng $0$
= Không có nguồn hay giếng.
& Chứng minh $\vec F=\langle xz,xyz,-y^2\rangle$ không bảo toàn.
&> $\operatorname{curl}\vec F=\langle-2y-xy,\ x,\ yz\rangle\ne\vec0$ (ví dụ tại $(1,1,1)$ bằng $\langle-3,1,1\rangle$).
&> Trường bảo toàn phải có rota bằng $\vec0$.

## 16.6 | Mặt tham số và diện tích
| Mặt được mô tả bằng hai tham số $\vec r(u,v)$, như đường cong bằng một tham số. Hai vectơ tiếp tuyến $\vec r_u$, $\vec r_v$; tích có hướng của chúng là pháp tuyến, độ dài là hệ số phóng đại diện tích.
! Mặt tham số :: $\vec r(u,v)=\langle x(u,v),y(u,v),z(u,v)\rangle$.
! Mặt phẳng tiếp xúc :: pháp tuyến $\vec r_u\times\vec r_v$.
! Diện tích :: $A=\iint_D|\vec r_u\times\vec r_v|\,dA$.
~ Mặt cầu bán kính $a$: $\vec r=\langle a\sin\phi\cos\theta,a\sin\phi\sin\theta,a\cos\phi\rangle$, $|\vec r_\phi\times\vec r_\theta|=a^2\sin\phi$, diện tích $4\pi a^2$.
? Tham số hoá mặt trụ $x^2+y^2=4$, $0\le z\le1$
+ $\langle2\cos\theta,2\sin\theta,z\rangle$
- $\langle\cos\theta,\sin\theta,z\rangle$
= Bán kính $2$.
? Diện tích mặt trụ trên là
+ $4\pi$
- $2\pi$
- $8\pi$
= $|\vec r_\theta\times\vec r_z|=2$, nhân diện tích miền $2\pi\cdot1$.
? Mặt $z=f(x,y)$ tham số hoá bằng $\langle x,y,f(x,y)\rangle$ cho $|\vec r_x\times\vec r_y|$ bằng
+ $\sqrt{1+f_x^2+f_y^2}$
- $1$
= Khớp công thức ở 15.5.
& Tìm mặt phẳng tiếp xúc của mặt $\vec r=\langle u^2,v^2,u+2v\rangle$ tại $(1,1,3)$.
&> Tại $u=v=1$: $\vec r_u=\langle2,0,1\rangle$, $\vec r_v=\langle0,2,2\rangle$, tích có hướng $\langle-2,-4,4\rangle$.
&> $-2(x-1)-4(y-1)+4(z-3)=0$, tức $x+2y-2z+3=0$.

## 16.7 | Tích phân mặt
| Tích phân mặt cộng giá trị trên một mặt. Với trường vectơ, $\iint_S\vec F\cdot d\vec S$ là **thông lượng**: lượng chất lỏng chảy xuyên qua mặt mỗi đơn vị thời gian, chỉ tính thành phần vuông góc với mặt. Mặt phải được định hướng (chọn phía).
! Vô hướng :: $\iint_Sf\,dS=\iint_Df(\vec r(u,v))|\vec r_u\times\vec r_v|\,dA$.
! Thông lượng :: $\iint_S\vec F\cdot d\vec S=\iint_S\vec F\cdot\vec n\,dS=\iint_D\vec F\cdot(\vec r_u\times\vec r_v)\,dA$.
! Mặt đồ thị (hướng lên) :: $\iint_S\vec F\cdot d\vec S=\iint_D(-Pg_x-Qg_y+R)\,dA$.
~ Thông lượng của $\vec F=\langle0,0,z\rangle$ ra ngoài mặt cầu bán kính $a$: $\frac43\pi a^3$.
? Thông lượng của $\vec F=\langle0,0,1\rangle$ qua đĩa đơn vị nằm ngang (hướng lên) là
+ $\pi$
- $0$
- $2\pi$
= $\vec F\cdot\vec n=1$ nhân diện tích.
? Dải Möbius
+ không định hướng được
- có hai phía
= Chỉ có một phía.
? Thông lượng của trường song song với mặt là
+ $0$
- lớn nhất
= $\vec F\cdot\vec n=0$.
& Tính thông lượng của $\vec F=\langle x,y,z\rangle$ ra ngoài mặt cầu $x^2+y^2+z^2=a^2$.
&> Trên mặt cầu $\vec n=\frac{\langle x,y,z\rangle}a$, $\vec F\cdot\vec n=\frac{x^2+y^2+z^2}a=a$.
&> Thông lượng $=a\cdot4\pi a^2=4\pi a^3$.

## 16.8 | Định lý Stokes
| Bản ba chiều của Green: lưu số của $\vec F$ quanh biên một mặt bằng thông lượng của rota qua mặt đó. Mọi mặt có cùng biên đều cho cùng kết quả.
! Định lý Stokes :: $\oint_C\vec F\cdot d\vec r=\iint_S\operatorname{curl}\vec F\cdot d\vec S$, với $C$ định hướng phù hợp với $S$ (quy tắc bàn tay phải).
! Ý nghĩa :: $\operatorname{curl}\vec F\cdot\vec n$ là lưu số trên một đơn vị diện tích quanh trục $\vec n$.
~ $\vec F=\langle-y^2,x,z^2\rangle$, $C$ là giao của $y+z=2$ và $x^2+y^2=1$: $\oint=\iint(1+2y)\,dA$ trên đĩa đơn vị $=\pi$.
? Nếu $\vec F$ bảo toàn thì theo Stokes, $\oint_C\vec F\cdot d\vec r$ bằng
+ $0$
- diện tích mặt
= Rota bằng $\vec0$.
? Hai mặt có cùng biên $C$ (nửa cầu và đĩa) cho thông lượng rota
+ bằng nhau
- khác nhau
= Đều bằng lưu số quanh $C$.
? Green là trường hợp riêng của Stokes khi
+ mặt nằm trong mặt phẳng $xy$
- mặt là mặt cầu
= $\operatorname{curl}\vec F\cdot\vec k=Q_x-P_y$.
& Dùng Stokes tính $\iint_S\operatorname{curl}\vec F\cdot d\vec S$ với $\vec F=\langle xz,yz,xy\rangle$, $S$ là phần mặt cầu $x^2+y^2+z^2=4$ trong trụ $x^2+y^2=1$, phía trên mặt $xy$.
&> Biên $C$: $x^2+y^2=1$, $z=\sqrt3$; $\vec r=\langle\cos t,\sin t,\sqrt3\rangle$.
&> $\vec F\cdot\vec r'=\sqrt3\cos t(-\sin t)+\sqrt3\sin t\cos t+0=0$. Tích phân bằng $0$.

## 16.9 | Định lý Divergence
| Thông lượng ra khỏi một mặt kín bằng tổng divergence (tổng nguồn) bên trong. Nước chảy ra khỏi một vùng đúng bằng lượng nước được sinh ra trong vùng.
! Định lý Gauss :: $\iint_S\vec F\cdot d\vec S=\iiint_E\operatorname{div}\vec F\,dV$, $S$ là biên của $E$, định hướng ra ngoài.
! Định luật Gauss (điện) :: Thông lượng điện trường qua mặt kín bằng $\frac Q{\varepsilon_0}$.
~ Thông lượng của $\vec F=\langle z,y,x\rangle$ qua mặt cầu đơn vị: $\operatorname{div}\vec F=1$, thông lượng $\frac43\pi$.
? Thông lượng của $\vec F=\langle x,y,z\rangle$ ra khỏi khối lập phương $[0,1]^3$ là
+ $3$
- $1$
- $6$
= $\operatorname{div}=3$, thể tích $1$.
? Nếu $\operatorname{div}\vec F=0$ mọi nơi thì thông lượng qua mọi mặt kín
+ bằng $0$
- dương
= Không có nguồn bên trong.
? So với bài 16.7 (thông lượng $\langle x,y,z\rangle$ qua mặt cầu là $4\pi a^3$), định lý Divergence cho
+ $3\cdot\frac43\pi a^3=4\pi a^3$, khớp
- kết quả khác
= Hai cách cùng một đáp số.
& Tính thông lượng của $\vec F=\langle xy,\ y^2+e^{xz^2},\ \sin(xy)\rangle$ ra khỏi vật $E$ giới hạn bởi $z=1-x^2$, $z=0$, $y=0$, $y+z=2$.
&> $\operatorname{div}\vec F=y+2y=3y$. Tích phân trực tiếp trên mặt sẽ rất khó.
&> $\iiint_E3y\,dV=\int_{-1}^1\int_0^{1-x^2}\int_0^{2-z}3y\,dy\,dz\,dx=\frac{184}{35}$.

## 16.10 | Tổng kết
| Mọi định lý chính của giải tích vectơ có cùng một dạng: **tích phân của một "đạo hàm" trên một miền bằng tích phân của hàm ban đầu trên biên của miền đó**.
! Định lý cơ bản :: $\int_a^bF'(x)dx=F(b)-F(a)$ (biên của đoạn là hai điểm).
! Tích phân đường :: $\int_C\nabla f\cdot d\vec r=f(\text{cuối})-f(\text{đầu})$.
! Green :: $\iint_D(Q_x-P_y)dA=\oint_{\partial D}P\,dx+Q\,dy$.
! Stokes :: $\iint_S\operatorname{curl}\vec F\cdot d\vec S=\oint_{\partial S}\vec F\cdot d\vec r$.
! Divergence :: $\iiint_E\operatorname{div}\vec F\,dV=\iint_{\partial E}\vec F\cdot d\vec S$.
~ Trong hình học vi phân, tất cả gộp thành một công thức: $\int_\Omega d\omega=\int_{\partial\Omega}\omega$ (định lý Stokes tổng quát).
? Điểm chung của các định lý trên là
+ "đạo hàm" bên trong miền liên hệ với giá trị trên biên
- đều về đường tròn
= Định lý Stokes tổng quát.
? Biên của một mặt kín (như mặt cầu) là
+ rỗng, nên $\iint_S\operatorname{curl}\vec F\cdot d\vec S=0$
- một đường tròn
= Hệ quả của Stokes và $\operatorname{div}\operatorname{curl}=0$.
? Định lý nào liên hệ thể tích với mặt?
+ Divergence
- Green
- Stokes
= Ba chiều với biên hai chiều.
& Chứng minh $\iint_S\operatorname{curl}\vec F\cdot d\vec S=0$ với mọi mặt kín $S$ bằng hai cách.
&> Divergence: $=\iiint_E\operatorname{div}(\operatorname{curl}\vec F)\,dV=0$.
&> Stokes: cắt $S$ thành hai mảnh có chung biên $C$ nhưng định hướng ngược nhau; hai lưu số triệt tiêu.

# 17 | Phương trình vi phân cấp hai | 0
> Phương trình tuyến tính hệ số hằng, dao động, mạch điện và nghiệm bằng chuỗi.

## 17.1 | Phương trình tuyến tính cấp hai thuần nhất
| $ay''+by'+cy=0$ với hệ số hằng: thử $y=e^{rx}$ được **phương trình đặc trưng** $ar^2+br+c=0$. Ba trường hợp nghiệm cho ba dạng nghiệm tổng quát. Nghiệm tổng quát là tổ hợp tuyến tính của hai nghiệm độc lập.
! Hai nghiệm thực $r_1\ne r_2$ :: $y=c_1e^{r_1x}+c_2e^{r_2x}$.
! Nghiệm kép $r$ :: $y=c_1e^{rx}+c_2xe^{rx}$.
! Phức $\alpha\pm i\beta$ :: $y=e^{\alpha x}(c_1\cos\beta x+c_2\sin\beta x)$.
! Nguyên lý chồng chất :: Tổ hợp tuyến tính của nghiệm phương trình thuần nhất là nghiệm.
~ $y''+y'-6y=0$: $r^2+r-6=0$, $r=2,-3$: $y=c_1e^{2x}+c_2e^{-3x}$.
~ $y''-6y'+13y=0$: $r=3\pm2i$: $y=e^{3x}(c_1\cos2x+c_2\sin2x)$.
? $y''+4y=0$ có nghiệm tổng quát
+ $c_1\cos2x+c_2\sin2x$
- $c_1e^{2x}+c_2e^{-2x}$
- $c_1\cos4x+c_2\sin4x$
= $r=\pm2i$.
? $y''-4y'+4y=0$ có nghiệm tổng quát
+ $(c_1+c_2x)e^{2x}$
- $c_1e^{2x}+c_2e^{-2x}$
= Nghiệm kép $r=2$.
? Bài toán giá trị ban đầu cấp hai cần
+ hai điều kiện, $y(x_0)$ và $y'(x_0)$
- một điều kiện
= Hai hằng số $c_1,c_2$.
& Giải $y''+y'-6y=0$, $y(0)=1$, $y'(0)=0$.
&> $y=c_1e^{2x}+c_2e^{-3x}$. $c_1+c_2=1$, $2c_1-3c_2=0$.
&> $c_1=\frac35$, $c_2=\frac25$.
& Giải bài toán biên $y''+2y'+y=0$, $y(0)=1$, $y(1)=3$.
&> $r=-1$ kép: $y=(c_1+c_2x)e^{-x}$. $y(0)=c_1=1$; $y(1)=(1+c_2)e^{-1}=3$, $c_2=3e-1$.
&> $y=(1+(3e-1)x)e^{-x}$.

## 17.2 | Phương trình tuyến tính không thuần nhất
| $ay''+by'+cy=G(x)$: nghiệm tổng quát = nghiệm tổng quát của phương trình thuần nhất + **một** nghiệm riêng. Tìm nghiệm riêng bằng **hệ số bất định** (đoán dạng giống $G$) hoặc **biến thiên hằng số**.
! Cấu trúc :: $y=y_c+y_p$.
! Hệ số bất định :: $G$ đa thức → đoán đa thức cùng bậc; $Ce^{kx}$ → $Ae^{kx}$; $\cos,\sin$ → $A\cos+B\sin$. Nếu dạng đoán trùng nghiệm thuần nhất, nhân thêm $x$.
! Biến thiên hằng số :: $y_p=u_1y_1+u_2y_2$ với $u_1'y_1+u_2'y_2=0$, $a(u_1'y_1'+u_2'y_2')=G$.
~ $y''+y'-2y=x^2$: thử $y_p=Ax^2+Bx+C$ được $y_p=-\frac12x^2-\frac12x-\frac34$.
? Với $y''+4y=e^{3x}$, dạng nghiệm riêng đoán là
+ $Ae^{3x}$, với $A=\frac1{13}$
- $Axe^{3x}$
= $9A+4A=1$.
? Với $y''+y=\sin x$, dạng đoán $A\cos x+B\sin x$ thất bại vì
+ nó là nghiệm của phương trình thuần nhất; phải thử $x(A\cos x+B\sin x)$
- $\sin x$ không có đạo hàm
= Hiện tượng cộng hưởng.
? Nghiệm tổng quát của $y''-y=1$ là
+ $c_1e^x+c_2e^{-x}-1$
- $c_1e^x+c_2e^{-x}+1$
= $y_p=-1$.
& Giải $y''+y=\tan x$ ($0<x<\frac\pi2$) bằng biến thiên hằng số.
&> $y_1=\cos x$, $y_2=\sin x$. Hệ: $u_1'\cos x+u_2'\sin x=0$, $-u_1'\sin x+u_2'\cos x=\tan x$.
&> $u_2'=\sin x$, $u_1'=-\frac{\sin^2x}{\cos x}=\cos x-\sec x$. Tích phân: $u_2=-\cos x$, $u_1=\sin x-\ln(\sec x+\tan x)$.
&> $y_p=-\cos x\ln(\sec x+\tan x)$; nghiệm tổng quát $y=c_1\cos x+c_2\sin x-\cos x\ln(\sec x+\tan x)$.

## 17.3 | Ứng dụng của phương trình cấp hai
@w oscillator
| Vật nặng $m$ gắn lò xo độ cứng $k$, có lực cản tỉ lệ vận tốc $c$: $mx''+cx'+kx=F(t)$. Tuỳ $c^2-4mk$ mà vật dao động tắt dần, tắt tới hạn hay quá tắt. Mạch RLC có cùng phương trình.
! Dao động tự do :: $mx''+kx=0$: $x=A\cos(\omega t+\delta)$, $\omega=\sqrt{k/m}$.
! Tắt dần :: $c^2<4mk$: dao động biên độ giảm mũ; $c^2=4mk$: tới hạn; $c^2>4mk$: quá tắt, không dao động.
! Cưỡng bức :: $F=F_0\cos\omega_0t$ với $\omega_0=\omega$ và không cản: cộng hưởng, biên độ tăng tuyến tính.
! Mạch RLC :: $LQ''+RQ'+\frac1CQ=E(t)$.
~ Lò xo $k=4$, vật $m=1$, không cản, kéo lệch $1$ rồi thả: $x=\cos2t$, chu kỳ $\pi$.
? $x''+6x'+9x=0$ là trường hợp
+ tắt tới hạn
- dao động tắt dần
- quá tắt
= $c^2-4mk=36-36=0$.
? Tăng khối lượng vật gấp 4 lần thì chu kỳ dao động (không cản)
+ gấp đôi
- gấp 4
- giảm một nửa
= $T=2\pi\sqrt{m/k}$.
? Cộng hưởng xảy ra khi
+ tần số lực cưỡng bức bằng tần số riêng
- lực cản lớn
= Biên độ tăng không giới hạn (mô hình không cản).
& Vật $m=2$ kg, lò xo $k=128$ N/m, cản $c=16$ N·s/m. Vật ở vị trí cân bằng được truyền vận tốc $0{,}6$ m/s. Tìm $x(t)$.
&> $2x''+16x'+128x=0$: $r^2+8r+64=0$, $r=-4\pm4\sqrt3i$.
&> $x=e^{-4t}(c_1\cos4\sqrt3t+c_2\sin4\sqrt3t)$, $x(0)=0$ cho $c_1=0$, $x'(0)=4\sqrt3c_2=0{,}6$, $c_2=\frac{0{,}15}{\sqrt3}$.

## 17.4 | Nghiệm bằng chuỗi
| Khi hệ số không phải hằng số, giả sử nghiệm là chuỗi luỹ thừa $y=\sum c_nx^n$, thế vào phương trình, so sánh hệ số để được **công thức truy hồi** cho $c_n$.
! Phương pháp :: $y=\sum c_nx^n$, $y'=\sum nc_nx^{n-1}$, $y''=\sum n(n-1)c_nx^{n-2}$; dời chỉ số để cùng luỹ thừa $x^n$.
! Phương trình Hermite, Bessel, Legendre :: Các phương trình hệ số đa thức nổi tiếng giải bằng chuỗi.
~ $y''+y=0$: truy hồi $c_{n+2}=-\frac{c_n}{(n+2)(n+1)}$ cho $y=c_0\cos x+c_1\sin x$.
? Với $y'=y$, truy hồi là
+ $c_{n+1}=\frac{c_n}{n+1}$, nên $y=c_0e^x$
- $c_{n+1}=c_n$
= So sánh hệ số $x^n$.
? Hai hằng số tự do trong nghiệm chuỗi của phương trình cấp hai là
+ $c_0=y(0)$ và $c_1=y'(0)$
- $c_0$ và $c_2$
= Các hệ số khác tính từ truy hồi.
? Phương pháp chuỗi hữu ích nhất khi
+ hệ số là đa thức không hằng
- hệ số hằng
= Hệ số hằng đã có cách giải nhanh.
& Giải $y''-2xy'+y=0$ bằng chuỗi luỹ thừa (tìm truy hồi).
&> $\sum(n+2)(n+1)c_{n+2}x^n-\sum2nc_nx^n+\sum c_nx^n=0$.
&> $c_{n+2}=\frac{(2n-1)c_n}{(n+2)(n+1)}$. Ví dụ $c_2=-\frac{c_0}2$, $c_3=\frac{c_1}6$, $c_4=\frac{3c_2}{12}=-\frac{c_0}{8}$.
`);
