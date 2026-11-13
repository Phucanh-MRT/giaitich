/* Phần I, Ch.1–4 — viết riêng theo cấu trúc mục lục Calculus (Stewart), không chép văn bản sách.
   Mã gốc của mục là "S" + số mục; tham chiếu tới phần chặt chẽ viết "T" + mã gốc Tao (ví dụ T9.3). */
(window.STEWART = window.STEWART || []).push(String.raw`
# 1 | Hàm số và mô hình | 0
> Bốn cách nhìn một hàm số, danh mục hàm cơ bản, và cách tạo hàm mới từ hàm cũ.

## 1.1 | Bốn cách biểu diễn hàm số
@see T20.3
| Hàm số gán cho mỗi đầu vào đúng một đầu ra. Cùng một hàm có thể được mô tả bằng **lời**, bằng **bảng số**, bằng **đồ thị**, hoặc bằng **công thức**. Chuyển qua lại giữa bốn cách này là kỹ năng nền của giải tích.
| Đồ thị là hàm số khi mọi đường thẳng đứng cắt nó tối đa một lần (phép thử đường thẳng đứng). Miền xác định là tập các đầu vào hợp lệ, tập giá trị là tập các đầu ra.
! Hàm số :: Quy tắc $f$ gán mỗi $x$ thuộc miền $D$ với đúng một giá trị $f(x)$.
! Phép thử đường thẳng đứng :: Một đường cong trong mặt phẳng là đồ thị của hàm theo $x$ khi và chỉ khi mọi đường $x=a$ cắt nó không quá một điểm.
! Hàm chẵn, lẻ :: Chẵn: $f(-x)=f(x)$ (đối xứng qua trục tung). Lẻ: $f(-x)=-f(x)$ (đối xứng qua gốc).
! Hàm từng khúc :: Cho bởi các công thức khác nhau trên các phần của miền, ví dụ $|x|$.
~ Diện tích hình tròn $A(r)=\pi r^2$ (công thức); nhiệt độ trong ngày (bảng); điện tâm đồ (đồ thị); "giá cước theo số km" (lời).
~ Miền của $f(x)=\sqrt{x+2}$ là $[-2,\infty)$; miền của $g(x)=\frac{1}{x^2-x}$ là $\mathbb R\setminus\{0,1\}$.
? Đường tròn $x^2+y^2=1$ có là đồ thị của một hàm theo $x$?
- Có
+ Không, đường $x=0$ cắt nó tại hai điểm
= Nhưng nửa trên $y=\sqrt{1-x^2}$ là một hàm.
? $f(x)=x^3-x$ là hàm
+ lẻ
- chẵn
- không chẵn không lẻ
= $f(-x)=-x^3+x=-f(x)$.
? Miền xác định của $\frac{\sqrt{4-x}}{x}$ là
+ $(-\infty,0)\cup(0,4]$
- $[0,4]$
- $(-\infty,4]$
= Cần $4-x\ge0$ và $x\ne0$.
? Hàm vừa chẵn vừa lẻ trên $\mathbb R$ là
+ chỉ hàm $f\equiv0$
- không có
- mọi hàm hằng
= $f(x)=f(-x)=-f(x)$ nên $f(x)=0$.
& Một hộp chữ nhật không nắp có thể tích $10\,\text{m}^3$, đáy dài gấp đôi rộng. Vật liệu đáy giá $10$ nghìn/m², mặt bên $6$ nghìn/m². Viết chi phí $C$ theo chiều rộng $w$.
&> Đáy $2w\times w$, cao $h$. Thể tích $2w^2h=10$ nên $h=\frac{5}{w^2}$.
&> Chi phí $C=10\cdot2w^2+6\cdot(2\cdot2wh+2wh)=20w^2+36wh=20w^2+\frac{180}{w}$, với $w>0$.
& Tìm miền và tập giá trị của $f(x)=\sqrt{9-x^2}$.
&> Cần $9-x^2\ge0$, tức $-3\le x\le3$. Khi đó $0\le9-x^2\le9$ nên $f(x)\in[0,3]$.
&> Đồ thị là nửa trên đường tròn bán kính $3$.

## 1.2 | Mô hình toán học: danh mục các hàm cơ bản
| Một mô hình toán học mô tả hiện tượng thật bằng hàm số. Bộ công cụ cơ bản: hàm tuyến tính, đa thức, hàm luỹ thừa, hàm hữu tỉ, hàm đại số, lượng giác, mũ và logarit.
| Chọn mô hình bằng cách nhìn dữ liệu: tăng đều thì tuyến tính, tăng theo tỉ lệ thì mũ, có cực đại thì bậc hai, dao động thì lượng giác.
! Tuyến tính :: $f(x)=mx+b$; $m$ là tốc độ thay đổi không đổi.
! Đa thức :: $P(x)=a_nx^n+\cdots+a_0$; bậc $n$ là số mũ cao nhất có hệ số khác $0$.
! Hàm luỹ thừa :: $f(x)=x^a$: $a$ nguyên dương (đa thức), $a=\frac1n$ (căn), $a=-1$ (nghịch đảo).
! Hữu tỉ, đại số :: Hữu tỉ $\frac{P}{Q}$; đại số dùng thêm phép khai căn, như $\sqrt{x^2+1}$.
~ Nhiệt độ giảm $6{,}5^\circ$C mỗi km độ cao: $T(h)=T_0-6{,}5h$.
~ Vật rơi tự do: $s(t)=4{,}9t^2$ (bậc hai). Dân số nhân đôi mỗi 30 năm: $P(t)=P_02^{t/30}$ (mũ).
? Hàm $f(x)=\frac{x^2+1}{x-3}$ thuộc loại
+ hữu tỉ
- đa thức
- luỹ thừa
= Thương của hai đa thức.
? Đường thẳng qua $(1,3)$ và $(4,9)$ có hệ số góc
+ $2$
- $3$
- $\frac12$
= $\frac{9-3}{4-1}=2$.
? Dữ liệu "mỗi năm tăng thêm 5%" nên dùng mô hình
+ mũ
- tuyến tính
- bậc hai
= Tăng theo tỉ lệ cố định: $P_0(1{,}05)^t$.
& Một chiếc xe mua giá 500 triệu, mất giá đều 40 triệu mỗi năm. Viết giá trị $V(t)$ và cho biết sau bao lâu giá còn 100 triệu.
&> $V(t)=500-40t$ (triệu đồng).
&> $500-40t=100$ khi $t=10$ năm. Mô hình chỉ có nghĩa với $0\le t\le12{,}5$.
& Tìm đa thức bậc hai có đỉnh $(2,-1)$ và đi qua $(0,3)$.
&> Dạng đỉnh $f(x)=a(x-2)^2-1$. Từ $f(0)=4a-1=3$ được $a=1$.
&> $f(x)=(x-2)^2-1=x^2-4x+3$.

## 1.3 | Hàm mới từ hàm cũ
@w transform
| Từ một đồ thị quen thuộc, ta tạo ra cả họ đồ thị mới bằng **tịnh tiến, co giãn, lật**. Kéo các thanh trượt ở trên để thấy $a\,f(b(x-c))+d$ thay đổi ra sao.
| Ngoài ra còn cộng, nhân, chia hai hàm, và **hợp thành** $f\circ g$: đưa đầu ra của $g$ vào $f$.
! Tịnh tiến :: $f(x)+d$: lên $d$. $f(x-c)$: sang phải $c$.
! Co giãn :: $a\,f(x)$: giãn dọc hệ số $a$. $f(bx)$: co ngang hệ số $b$ (với $b>1$).
! Lật :: $-f(x)$: qua trục hoành. $f(-x)$: qua trục tung.
! Hợp thành :: $(f\circ g)(x)=f(g(x))$; miền là các $x$ thuộc miền $g$ mà $g(x)$ thuộc miền $f$.
~ $y=(x-3)^2+1$ là parabol $y=x^2$ dời sang phải $3$, lên $1$.
~ $f(x)=\sqrt x$, $g(x)=2-x$: $(f\circ g)(x)=\sqrt{2-x}$ (miền $x\le2$), $(g\circ f)(x)=2-\sqrt x$ (miền $x\ge0$).
? Đồ thị $y=\sin(2x)$ so với $y=\sin x$ thì
+ co ngang, chu kỳ còn $\pi$
- giãn ngang, chu kỳ $4\pi$
- cao gấp đôi
= $f(bx)$ với $b=2$ co ngang lại một nửa.
? Đồ thị $y=|x+2|-3$ có đỉnh tại
+ $(-2,-3)$
- $(2,-3)$
- $(-2,3)$
= $|x|$ dời trái $2$, xuống $3$.
? Viết $F(x)=\cos^2(x+9)$ thành $f\circ g\circ h$ với
+ $h=x+9$, $g=\cos$, $f=t^2$
- $h=\cos$, $g=x+9$, $f=t^2$
- $h=x^2$, $g=\cos$, $f=x+9$
= Thực hiện theo thứ tự: cộng 9, lấy cos, bình phương.
& Vẽ phác $y=2-\sqrt{x+1}$ từ $y=\sqrt x$, nêu từng bước.
&> $\sqrt{x+1}$: dời trái $1$. $-\sqrt{x+1}$: lật qua trục hoành. $2-\sqrt{x+1}$: dời lên $2$.
&> Đồ thị bắt đầu tại $(-1,2)$, đi xuống chậm dần; miền $[-1,\infty)$, tập giá trị $(-\infty,2]$.
& Cho $f(x)=\frac{1}{x}$, $g(x)=x^2-4$. Tìm $f\circ g$ và miền của nó.
&> $(f\circ g)(x)=\frac{1}{x^2-4}$. Cần $x^2-4\ne0$: miền $\mathbb R\setminus\{-2,2\}$.

## 1.4 | Hàm mũ
@w expfam
@see T32.5
| Hàm mũ $f(x)=b^x$ (với $b>0$) có tốc độ tăng tỉ lệ với chính giá trị của nó. $b>1$ thì tăng, $0<b<1$ thì giảm, mọi đồ thị đều đi qua $(0,1)$.
| Trong mọi cơ số, $e\approx2{,}71828$ đặc biệt nhất: tiếp tuyến của $e^x$ tại $x=0$ có hệ số góc đúng bằng $1$.
! Quy tắc :: $b^{x+y}=b^xb^y$, $b^{x-y}=\frac{b^x}{b^y}$, $(b^x)^y=b^{xy}$, $(ab)^x=a^xb^x$.
! Số $e$ :: Cơ số duy nhất để $\lim_{h\to0}\frac{e^h-1}{h}=1$.
! So sánh :: Với $b>1$, $b^x$ cuối cùng vượt mọi đa thức.
~ $2^x$ vượt $x^{10}$ khi $x>58{,}77\ldots$, dù lúc đầu $x^{10}$ lớn hơn nhiều.
~ Phân rã phóng xạ: chu kỳ bán rã $T$ cho $m(t)=m_0\left(\frac12\right)^{t/T}$.
? $\left(\frac12\right)^x$ khi $x\to+\infty$
+ $\to0$
- $\to+\infty$
- $\to\frac12$
= Cơ số nhỏ hơn $1$.
? Đồ thị $y=3^{-x}$ là đồ thị $y=3^x$
+ lật qua trục tung
- lật qua trục hoành
- dời trái 3
= $f(-x)$.
? $\frac{2^{x+3}}{2^{x}}$ bằng
+ $8$
- $2^{2x+3}$
- $3$
= $2^3$.
& Một quần thể vi khuẩn gấp đôi mỗi 3 giờ, ban đầu 500 con. Viết $N(t)$ và tính số vi khuẩn sau 15 giờ.
&> $N(t)=500\cdot2^{t/3}$. Sau 15 giờ: $500\cdot2^5=16000$ con.
& Giải $3^{2x-1}=27$.
&> $27=3^3$, nên $2x-1=3$, $x=2$ (hàm mũ đơn ánh).

## 1.5 | Hàm ngược và logarit
@w inverse k=exp
@see T26.8 T27.4
| Hàm **đơn ánh** (không nhận một giá trị hai lần) có hàm ngược $f^{-1}$: "đi ngược" từ đầu ra về đầu vào. Đồ thị của $f^{-1}$ là ảnh gương của đồ thị $f$ qua đường $y=x$.
| Logarit $\log_bx$ là hàm ngược của $b^x$: $\log_bx=y\iff b^y=x$. Logarit tự nhiên $\ln=\log_e$.
! Phép thử đường nằm ngang :: $f$ đơn ánh khi và chỉ khi mọi đường $y=c$ cắt đồ thị tối đa một lần.
! Khử nhau :: $f^{-1}(f(x))=x$ và $f(f^{-1}(y))=y$.
! Luật logarit :: $\log_b(xy)=\log_bx+\log_by$, $\log_b\frac xy=\log_bx-\log_by$, $\log_b(x^r)=r\log_bx$.
! Đổi cơ số :: $\log_bx=\frac{\ln x}{\ln b}$.
~ $f(x)=x^3+2$ có $f^{-1}(x)=\sqrt[3]{x-2}$.
~ $\arcsin$ là hàm ngược của $\sin$ hạn chế trên $[-\frac\pi2,\frac\pi2]$.
? $\ln(e^5)$ bằng
+ $5$
- $e^5$
- $\ln5$
= Hai hàm khử nhau.
? $\log_2 80-\log_2 5$ bằng
+ $4$
- $75$
- $\log_2 75$
= $\log_2 16=4$.
? Hàm nào **không** có hàm ngược trên $\mathbb R$?
+ $x^2$
- $x^3$
- $e^x$
= $x^2$ không đơn ánh.
? $\arcsin(\sin\frac{3\pi}{4})$ bằng
+ $\frac\pi4$
- $\frac{3\pi}4$
- $-\frac\pi4$
= Giá trị phải nằm trong $[-\frac\pi2,\frac\pi2]$ có cùng sin.
& Tìm hàm ngược của $f(x)=\frac{2x+1}{x-3}$.
&> Đặt $y=\frac{2x+1}{x-3}$, giải $x$: $y(x-3)=2x+1$, $x(y-2)=3y+1$, $x=\frac{3y+1}{y-2}$.
&> $f^{-1}(x)=\frac{3x+1}{x-2}$, với $x\ne2$.
& Giải $\ln(x+1)+\ln(x-1)=\ln 8$.
&> $\ln((x+1)(x-1))=\ln8$ nên $x^2-1=8$, $x=\pm3$. Điều kiện $x>1$ cho $x=3$.

# 2 | Giới hạn và đạo hàm | 0
> Từ bài toán tiếp tuyến và vận tốc đến khái niệm giới hạn, liên tục và đạo hàm.

## 2.1 | Bài toán tiếp tuyến và vận tốc
@w avgvel
| Hai bài toán cổ dẫn tới giải tích: tìm **tiếp tuyến** của đường cong, và tìm **vận tốc tức thời** khi chỉ biết quãng đường theo thời gian. Cả hai giải theo cùng một cách: lấy trung bình trên khoảng nhỏ dần.
| Hệ số góc cát tuyến qua hai điểm, và vận tốc trung bình trên một khoảng thời gian, đều là $\frac{f(b)-f(a)}{b-a}$. Cho khoảng co về $0$ ta được tiếp tuyến và vận tốc tức thời.
! Vận tốc trung bình :: $\dfrac{s(t+h)-s(t)}{h}$ trên khoảng $[t,t+h]$.
! Vận tốc tức thời :: Giới hạn của vận tốc trung bình khi $h\to0$.
~ Vật rơi $s(t)=4{,}9t^2$. Vận tốc trung bình trên $[5;5{,}1]$: $\frac{4{,}9(26{,}01-25)}{0{,}1}=49{,}49$ m/s. Khi khoảng nhỏ dần, giá trị tiến về $49$ m/s.
? Hệ số góc cát tuyến của $y=x^2$ qua $x=1$ và $x=3$ là
+ $4$
- $8$
- $2$
= $\frac{9-1}{2}$.
? Khi $h\to0$, cát tuyến của $y=x^2$ tại $x=1$ có hệ số góc tiến về
+ $2$
- $1$
- $0$
= $\frac{(1+h)^2-1}{h}=2+h$.
? Vận tốc trung bình bằng $0$ trên một khoảng nghĩa là
+ vật quay về đúng vị trí ban đầu (không nhất thiết đứng yên)
- vật đứng yên suốt khoảng
= Ví dụ ném lên rồi rơi về.
& Một quả bóng ném lên có độ cao $h(t)=20t-5t^2$ (m). Tìm vận tốc tức thời tại $t=1$.
&> $\frac{h(1+k)-h(1)}{k}=\frac{20k-5(2k+k^2)}{k}=10-5k$.
&> Cho $k\to0$: vận tốc $10$ m/s (đang đi lên).
& Tìm hệ số góc tiếp tuyến của $y=\frac1x$ tại $x=2$.
&> $\frac{\frac1{2+h}-\frac12}{h}=\frac{-h}{2h(2+h)}=\frac{-1}{2(2+h)}\to-\frac14$.

## 2.2 | Giới hạn của hàm số
@w limtable
@see T26.3
| $\lim_{x\to a}f(x)=L$ nghĩa là: cho $x$ đủ gần $a$ (nhưng khác $a$) thì $f(x)$ gần $L$ tuỳ ý. Giá trị tại chính điểm $a$ không quan trọng.
| Giới hạn có thể không tồn tại vì: hai phía khác nhau (bước nhảy), giá trị tăng vô hạn, hoặc dao động mãi như $\sin\frac1x$.
! Giới hạn một phía :: $\lim_{x\to a^-}$ và $\lim_{x\to a^+}$; giới hạn hai phía tồn tại khi và chỉ khi hai giới hạn một phía tồn tại và bằng nhau.
! Giới hạn vô cực :: $\lim_{x\to a}f(x)=\infty$ nghĩa là $f$ lớn tuỳ ý gần $a$; khi đó $x=a$ là **tiệm cận đứng**.
~ Bảng giá trị $\frac{\sin x}{x}$ tại $x=0{,}1;\ 0{,}01;\ 0{,}001$: $0{,}99833;\ 0{,}99998;\ 0{,}9999998$, gợi ý giới hạn $1$.
~ Cẩn thận với bảng: $\sin\frac{\pi}{x}$ tại $x=1,\frac12,\frac13,\dots$ đều bằng $0$, nhưng giới hạn tại $0$ không tồn tại.
? $\lim_{x\to2}\frac{x^2-4}{x-2}$ bằng
+ $4$
- $0$
- không tồn tại
= $x+2\to4$.
? $\lim_{x\to0}\frac{1}{x^2}$
+ $=+\infty$, $x=0$ là tiệm cận đứng
- $=0$
- $=1$
= Mẫu dương và tiến về $0$.
? $\lim_{x\to0^-}\frac{|x|}{x}$ bằng
+ $-1$
- $1$
- $0$
= Bên trái $|x|=-x$.
& Tìm các tiệm cận đứng của $f(x)=\frac{x+1}{x^2-x-2}$.
&> $x^2-x-2=(x-2)(x+1)$. Với $x\ne-1$: $f(x)=\frac1{x-2}$.
&> Tại $x=2$: $f\to\pm\infty$, tiệm cận đứng. Tại $x=-1$: giới hạn $-\frac13$, chỉ là "lỗ thủng", không phải tiệm cận.
& Tính $\lim_{x\to1^+}\frac{x}{x-1}$ và $\lim_{x\to1^-}\frac{x}{x-1}$.
&> Bên phải: tử $\to1$, mẫu $\to0^+$, giới hạn $+\infty$. Bên trái: mẫu $\to0^-$, giới hạn $-\infty$.

## 2.3 | Tính giới hạn bằng các quy tắc
@see T26.3
| Không cần bảng số hay đồ thị: giới hạn của tổng, hiệu, tích, thương, luỹ thừa bằng tổng, hiệu, tích, thương, luỹ thừa của các giới hạn (khi các giới hạn tồn tại và mẫu khác $0$).
| Với dạng $\frac00$: rút gọn nhân tử chung, nhân liên hợp, hoặc dùng định lý kẹp.
! Quy tắc :: $\lim(f\pm g)=\lim f\pm\lim g$, $\lim fg=\lim f\cdot\lim g$, $\lim\frac fg=\frac{\lim f}{\lim g}$ nếu $\lim g\ne0$.
! Thế trực tiếp :: Với đa thức và hàm hữu tỉ (mẫu khác $0$): $\lim_{x\to a}f(x)=f(a)$.
! Định lý kẹp :: $g\le f\le h$ gần $a$ và $\lim g=\lim h=L$ thì $\lim f=L$.
~ $\lim_{h\to0}\frac{(3+h)^2-9}{h}=\lim_{h\to0}(6+h)=6$.
~ $\lim_{t\to0}\frac{\sqrt{t^2+9}-3}{t^2}=\lim\frac{1}{\sqrt{t^2+9}+3}=\frac16$ (nhân liên hợp).
~ $\lim_{x\to0}x^2\sin\frac1x=0$ vì $-x^2\le x^2\sin\frac1x\le x^2$.
? $\lim_{x\to3}\frac{x^2-x-6}{x-3}$ bằng
+ $5$
- $0$
- $6$
= $(x-3)(x+2)$, rút gọn được $x+2$.
? $\lim_{x\to0}\frac{\sqrt{x+4}-2}{x}$ bằng
+ $\frac14$
- $\frac12$
- $0$
= Nhân liên hợp: $\frac{1}{\sqrt{x+4}+2}$.
? Nếu $\lim f=3$ và $\lim g=0$ thì $\lim\frac fg$
+ không tồn tại hữu hạn (dạng $\frac30$)
- bằng $0$
- bằng $3$
= Tử khác $0$, mẫu $\to0$.
& Tính $\lim_{x\to-4}\frac{\frac14+\frac1x}{4+x}$.
&> Quy đồng: $\frac14+\frac1x=\frac{x+4}{4x}$. Biểu thức bằng $\frac{1}{4x}$ khi $x\ne-4$.
&> Giới hạn $\frac1{-16}=-\frac1{16}$.
& Chứng minh $\lim_{x\to0}\sqrt{x^3+x^2}\sin\frac\pi x=0$.
&> $|\sin\frac\pi x|\le1$ nên $0\le\left|\sqrt{x^3+x^2}\sin\frac\pi x\right|\le\sqrt{x^3+x^2}\to0$. Theo kẹp, giới hạn bằng $0$.

## 2.4 | Định nghĩa chính xác của giới hạn
@w epsdelta preset=limit k=sinc
@pre 2.2
@see T26.3
| "Gần tuỳ ý" được định lượng bằng $\varepsilon$ và $\delta$: với mọi sai số $\varepsilon>0$ cho phép ở đầu ra, tìm được độ gần $\delta>0$ ở đầu vào đảm bảo sai số đó.
| Trong minh hoạ, dải ngang là $\varepsilon$, dải dọc là $\delta$. Bấm "Máy tìm δ" để thấy $\delta$ phải co lại khi $\varepsilon$ nhỏ đi.
! Định nghĩa :: $\lim_{x\to a}f(x)=L$ nếu $\forall\varepsilon>0\ \exists\delta>0$: $0<|x-a|<\delta\Rightarrow|f(x)-L|<\varepsilon$.
! Giới hạn vô cực :: $\lim_{x\to a}f(x)=\infty$ nếu $\forall M\ \exists\delta$: $0<|x-a|<\delta\Rightarrow f(x)>M$.
~ $\lim_{x\to3}(4x-5)=7$: $|4x-12|=4|x-3|<\varepsilon$ khi $\delta=\varepsilon/4$.
? Với $f(x)=2x+1$ tại $x=1$ và $\varepsilon=0{,}1$, $\delta$ lớn nhất dùng được là
+ $0{,}05$
- $0{,}1$
- $0{,}2$
= $|2x+1-3|=2|x-1|<0{,}1$.
? Trong định nghĩa, $\delta$ được phép phụ thuộc vào
+ $\varepsilon$ (và điểm $a$)
- $x$
= Chọn $\delta$ sau khi biết $\varepsilon$.
? Để chứng minh $\lim_{x\to a}f(x)\ne L$, ta cần
+ một $\varepsilon$ mà không $\delta$ nào dùng được
- một $\delta$ không dùng được
= Phủ định của định nghĩa.
& Chứng minh $\lim_{x\to3}x^2=9$ bằng $\varepsilon$–$\delta$.
&> $|x^2-9|=|x-3||x+3|$. Nếu $|x-3|<1$ thì $2<x<4$, nên $|x+3|<7$.
&> Chọn $\delta=\min(1,\frac\varepsilon7)$: khi $0<|x-3|<\delta$ thì $|x^2-9|<7\cdot\frac\varepsilon7=\varepsilon$.
& Chứng minh $\lim_{x\to0}\frac{1}{x^2}=\infty$.
&> Cho $M>0$, chọn $\delta=\frac1{\sqrt M}$. Khi $0<|x|<\delta$: $x^2<\frac1M$, nên $\frac1{x^2}>M$.

## 2.5 | Tính liên tục
@w ivt k=b
@see T26.4 T26.7
| $f$ liên tục tại $a$ khi $\lim_{x\to a}f(x)=f(a)$: vẽ đồ thị qua $a$ mà không nhấc bút. Ba điều cần: $f(a)$ xác định, giới hạn tồn tại, và hai thứ bằng nhau.
| Định lý giá trị trung gian: hàm liên tục trên $[a,b]$ nhận mọi giá trị giữa $f(a)$ và $f(b)$. Đây là cơ sở để chứng minh phương trình có nghiệm và để giải gần đúng bằng chia đôi.
! Định nghĩa :: $f$ liên tục tại $a$ nếu $\lim_{x\to a}f(x)=f(a)$.
! Các hàm liên tục :: Đa thức, hữu tỉ, căn, lượng giác, mũ, logarit liên tục trên miền xác định; tổng, tích, thương, hợp thành của hàm liên tục là liên tục.
! Giá trị trung gian :: $f$ liên tục trên $[a,b]$, $N$ giữa $f(a)$ và $f(b)$ thì có $c\in(a,b)$ với $f(c)=N$.
~ $4x^3-6x^2+3x-2=0$ có nghiệm trong $(1,2)$: $f(1)=-1<0<f(2)=12$.
? $f(x)=\frac{x^2-x-2}{x-2}$ (với $f(2)=1$) tại $x=2$ có
+ gián đoạn khử được (giới hạn $3\ne1$)
- liên tục
- gián đoạn nhảy
= Định nghĩa lại $f(2)=3$ thì liên tục.
? Tìm $c$ để $f(x)=cx^2+2x$ (khi $x<2$) và $x^3-cx$ (khi $x\ge2$) liên tục
+ $c=\frac23$
- $c=1$
- $c=2$
= $4c+4=8-2c$.
? Định lý giá trị trung gian đảm bảo $x^3+x-1=0$ có nghiệm trong
+ $(0,1)$
- $(1,2)$
- $(-1,0)$
= $f(0)=-1$, $f(1)=1$.
& Chứng minh phương trình $\cos x=x$ có nghiệm và tìm gần đúng bằng 3 lần chia đôi.
&> $g(x)=\cos x-x$ liên tục, $g(0)=1>0$, $g(1)\approx-0{,}46<0$: có nghiệm trong $(0,1)$.
&> $g(0{,}5)\approx0{,}38>0\Rightarrow(0{,}5;1)$. $g(0{,}75)\approx-0{,}02<0\Rightarrow(0{,}5;0{,}75)$. $g(0{,}625)\approx0{,}19>0\Rightarrow(0{,}625;0{,}75)$. Nghiệm $\approx0{,}739$.
& Xác định các điểm gián đoạn của $f(x)=\frac{\ln x+\tan^{-1}x}{x^2-1}$.
&> $\ln x$ cần $x>0$; mẫu bằng $0$ khi $x=\pm1$. Trên miền $(0,\infty)$ chỉ có $x=1$ là điểm không xác định.
&> $f$ liên tục trên $(0,1)\cup(1,\infty)$.

## 2.6 | Giới hạn tại vô cực; tiệm cận ngang
@w infty k=b
@see T26.10
| $\lim_{x\to\infty}f(x)=L$ nghĩa là đồ thị tiến sát đường ngang $y=L$ khi $x$ chạy xa về bên phải: $y=L$ là **tiệm cận ngang**.
| Với hàm hữu tỉ, chia tử và mẫu cho luỹ thừa cao nhất của $x$ ở mẫu. Bậc tử nhỏ hơn bậc mẫu cho tiệm cận $y=0$; bằng nhau cho tỉ số hệ số đầu; lớn hơn thì không có tiệm cận ngang.
! Cơ bản :: $\lim_{x\to\pm\infty}\frac1{x^r}=0$ với $r>0$; $\lim_{x\to-\infty}e^x=0$.
! Tiệm cận xiên :: Nếu $f(x)-(mx+b)\to0$ khi $x\to\infty$ thì $y=mx+b$ là tiệm cận xiên.
~ $\lim_{x\to\infty}\frac{3x^2-x-2}{5x^2+4x+1}=\frac35$.
~ $\lim_{x\to\infty}\frac{\sqrt{2x^2+1}}{3x-5}=\frac{\sqrt2}3$, còn khi $x\to-\infty$ thì $-\frac{\sqrt2}{3}$ (vì $\sqrt{x^2}=|x|$).
? $\lim_{x\to\infty}\frac{2x+1}{x^2+3}$ bằng
+ $0$
- $2$
- $\infty$
= Bậc tử nhỏ hơn bậc mẫu.
? $\lim_{x\to\infty}\arctan x$ bằng
+ $\frac\pi2$
- $\infty$
- $0$
= Tiệm cận ngang $y=\frac\pi2$.
? Hàm $\frac{x^2+1}{x}$ có tiệm cận
+ xiên $y=x$
- ngang $y=1$
- ngang $y=0$
= $\frac{x^2+1}x=x+\frac1x$.
& Tính $\lim_{x\to\infty}(\sqrt{x^2+1}-x)$.
&> Nhân liên hợp: $\frac{1}{\sqrt{x^2+1}+x}\to0$.
& Tìm tiệm cận ngang và đứng của $f(x)=\frac{2x^2+x-1}{x^2+x-2}$.
&> Ngang: tỉ số hệ số đầu $y=2$.
&> Mẫu $=(x+2)(x-1)$, tử $=(2x-1)(x+1)$. Không nhân tử chung, nên tiệm cận đứng $x=-2$ và $x=1$.

## 2.7 | Đạo hàm và tốc độ thay đổi
@w secant
@see T27.1
| Đạo hàm $f'(a)$ là giới hạn của tỉ số sai phân. Nó vừa là **hệ số góc tiếp tuyến**, vừa là **tốc độ thay đổi tức thời** của $f$ tại $a$.
| Đơn vị của $f'$ là "đơn vị của $f$ trên đơn vị của $x$": nếu $C(x)$ là chi phí (triệu) để sản xuất $x$ sản phẩm thì $C'(x)$ là triệu/sản phẩm (chi phí biên).
! Định nghĩa :: $f'(a)=\lim_{h\to0}\dfrac{f(a+h)-f(a)}{h}=\lim_{x\to a}\dfrac{f(x)-f(a)}{x-a}$.
! Tiếp tuyến :: $y-f(a)=f'(a)(x-a)$.
~ $f(x)=x^2-8x+9$: $f'(a)=\lim\frac{(a+h)^2-8(a+h)+9-(a^2-8a+9)}{h}=2a-8$. Tiếp tuyến tại $(3,-6)$: $y=-2x$.
? Nếu $s(t)$ là vị trí (m) theo thời gian (s) thì $s'(t)$ có đơn vị
+ m/s
- m
- m/s²
= Vận tốc.
? $f'(a)<0$ nghĩa là gần $a$
+ $f$ đang giảm
- $f$ âm
- $f$ đạt cực tiểu
= Hệ số góc tiếp tuyến âm.
? Tiếp tuyến của $y=\sqrt x$ tại $x=4$ có hệ số góc
+ $\frac14$
- $\frac12$
- $2$
= $\frac1{2\sqrt4}$.
& Dùng định nghĩa, tính $f'(a)$ với $f(x)=\frac{1}{x+1}$.
&> $\frac{f(a+h)-f(a)}h=\frac{1}{h}\cdot\frac{(a+1)-(a+h+1)}{(a+h+1)(a+1)}=\frac{-1}{(a+h+1)(a+1)}$.
&> Cho $h\to0$: $f'(a)=-\frac{1}{(a+1)^2}$.
& Chi phí sản xuất $x$ kg vàng là $C=f(x)$ (triệu). $f'(50)=36$ có nghĩa gì?
&> Khi đã sản xuất $50$ kg, mỗi kg thêm tốn khoảng $36$ triệu (chi phí biên).

## 2.8 | Đạo hàm như một hàm số
@w secant mode=sign k=sin
@see T27.3
| Cho $a$ chạy, ta được hàm mới $f'$. Đồ thị $f'$ đọc từ đồ thị $f$: chỗ $f$ tăng thì $f'>0$, chỗ tiếp tuyến nằm ngang thì $f'=0$, chỗ gấp khúc thì $f'$ không tồn tại.
| Đạo hàm của đạo hàm là đạo hàm cấp hai $f''$, đo độ cong. Với chuyển động: $s'$ là vận tốc, $s''$ là gia tốc.
! Khả vi :: $f$ khả vi tại $a$ nếu $f'(a)$ tồn tại. Khả vi kéo theo liên tục.
! Không khả vi :: tại góc nhọn ($|x|$ tại $0$), điểm gián đoạn, tiếp tuyến thẳng đứng ($\sqrt[3]{x}$ tại $0$).
! Ký hiệu :: $f'(x)=\dfrac{dy}{dx}=\dfrac{d}{dx}f(x)=Df(x)$; cấp hai $f''=\dfrac{d^2y}{dx^2}$.
~ $f(x)=x^3-x$: $f'(x)=3x^2-1$, $f''(x)=6x$.
? Nơi $f$ có tiếp tuyến nằm ngang thì đồ thị $f'$
+ cắt trục hoành
- có tiệm cận
- gián đoạn
= $f'=0$ ở đó.
? $f(x)=\sqrt[3]{x}$ tại $x=0$
+ liên tục nhưng không khả vi (tiếp tuyến thẳng đứng)
- khả vi với $f'(0)=0$
- gián đoạn
= $\frac{h^{1/3}}{h}=h^{-2/3}\to\infty$.
? Nếu $s(t)=t^3-6t^2$ thì gia tốc tại $t=1$ là
+ $-6$
- $-9$
- $3$
= $s''=6t-12$.
& Tìm $f'(x)$ với $f(x)=\sqrt{x}$ theo định nghĩa, và nêu miền của $f'$.
&> $\frac{\sqrt{x+h}-\sqrt x}{h}=\frac{1}{\sqrt{x+h}+\sqrt x}\to\frac1{2\sqrt x}$.
&> Miền của $f$ là $[0,\infty)$ nhưng của $f'$ là $(0,\infty)$.
& Cho đồ thị $f(x)=|x-2|$. Mô tả $f'$.
&> $f'(x)=-1$ khi $x<2$, $f'(x)=1$ khi $x>2$, không xác định tại $x=2$.

# 3 | Quy tắc tính đạo hàm | 0
> Các công thức giúp tính đạo hàm nhanh, và các bài toán ứng dụng tốc độ thay đổi.

## 3.1 | Đạo hàm của đa thức và hàm mũ
| Không cần tính giới hạn mỗi lần: đạo hàm có tính tuyến tính, và quy tắc luỹ thừa cho $(x^n)'=nx^{n-1}$ với mọi số mũ thực $n$.
| Hàm $e^x$ đặc biệt: đạo hàm của nó là chính nó. Đó là lý do $e$ là cơ số tự nhiên của giải tích.
! Quy tắc luỹ thừa :: $\dfrac{d}{dx}x^n=nx^{n-1}$.
! Tuyến tính :: $(cf)'=cf'$, $(f\pm g)'=f'\pm g'$; hằng số có đạo hàm $0$.
! Hàm mũ tự nhiên :: $\dfrac{d}{dx}e^x=e^x$.
~ $\frac{d}{dx}(x^8+12x^5-4x^4+10x^3-6x+5)=8x^7+60x^4-16x^3+30x^2-6$.
~ $\frac{d}{dx}\frac{1}{\sqrt[3]{x^2}}=\frac{d}{dx}x^{-2/3}=-\frac23x^{-5/3}$.
? $\frac{d}{dx}\left(3\sqrt x-\frac2x\right)$ bằng
+ $\frac{3}{2\sqrt x}+\frac{2}{x^2}$
- $\frac{3}{2\sqrt x}-\frac2{x^2}$
- $3\sqrt x+2$
= $(x^{-1})'=-x^{-2}$, nhân $-2$ thành $+\frac2{x^2}$.
? $\frac{d}{dx}(e^x+x^e)$ bằng
+ $e^x+ex^{e-1}$
- $e^x+x^e$
- $xe^{x-1}+ex^{e-1}$
= $x^e$ là hàm luỹ thừa, $e^x$ là hàm mũ.
? Tiếp tuyến nằm ngang của $y=x^4-2x^2+2$ tại
+ $x=0,\ \pm1$
- chỉ $x=0$
- $x=\pm2$
= $4x^3-4x=4x(x^2-1)=0$.
& Tìm phương trình tiếp tuyến của $y=x\sqrt x$ tại $(1,1)$.
&> $y=x^{3/2}$, $y'=\frac32x^{1/2}$, tại $x=1$ hệ số góc $\frac32$.
&> Tiếp tuyến $y-1=\frac32(x-1)$, tức $y=\frac32x-\frac12$.
& Tìm điểm trên $y=e^x$ có tiếp tuyến song song với $y=2x$.
&> $e^x=2$ nên $x=\ln2$, điểm $(\ln2,\,2)$.

## 3.2 | Quy tắc tích và thương
@see T27.1
| Đạo hàm của tích **không** bằng tích các đạo hàm. Hình dung hình chữ nhật cạnh $f$ và $g$: khi cả hai cạnh tăng, diện tích tăng thêm hai dải $f\,dg$ và $g\,df$.
! Quy tắc tích :: $(fg)'=f'g+fg'$.
! Quy tắc thương :: $\left(\dfrac fg\right)'=\dfrac{f'g-fg'}{g^2}$.
~ $(xe^x)'=e^x+xe^x=(x+1)e^x$.
~ $\left(\frac{x^2+x-2}{x^3+6}\right)'=\frac{(2x+1)(x^3+6)-(x^2+x-2)3x^2}{(x^3+6)^2}$.
? $(x^2e^x)'$ bằng
+ $(x^2+2x)e^x$
- $2xe^x$
- $x^2e^x$
= Quy tắc tích.
? $\left(\frac{1}{g}\right)'$ bằng
+ $-\frac{g'}{g^2}$
- $\frac{1}{g'}$
- $\frac{g'}{g^2}$
= Quy tắc thương với tử $1$.
? Nếu $f(2)=3$, $f'(2)=-1$, $g(2)=4$, $g'(2)=5$ thì $(fg)'(2)$ bằng
+ $11$
- $-5$
- $19$
= $-1\cdot4+3\cdot5$.
& Tính đạo hàm của $y=\frac{e^x}{1+x^2}$ và tìm nơi tiếp tuyến nằm ngang.
&> $y'=\frac{e^x(1+x^2)-e^x\cdot2x}{(1+x^2)^2}=\frac{e^x(x-1)^2}{(1+x^2)^2}$.
&> $y'=0$ khi $x=1$. Tiếp tuyến nằm ngang tại $(1,\frac e2)$.
& Chứng minh $(fgh)'=f'gh+fg'h+fgh'$.
&> Áp dụng quy tắc tích cho $(fg)\cdot h$: $(fg)'h+(fg)h'=(f'g+fg')h+fgh'$.

## 3.3 | Đạo hàm của hàm lượng giác
@w sinsqueeze
@see T32.7
| Mọi công thức đạo hàm lượng giác xuất phát từ giới hạn $\lim_{x\to0}\frac{\sin x}{x}=1$ (góc tính bằng radian). Thu nhỏ khung ở minh hoạ: $\sin x$ và $x$ gần như trùng nhau gần $0$.
! Giới hạn then chốt :: $\lim_{\theta\to0}\dfrac{\sin\theta}{\theta}=1$, $\lim_{\theta\to0}\dfrac{\cos\theta-1}{\theta}=0$.
! Công thức :: $(\sin x)'=\cos x$, $(\cos x)'=-\sin x$, $(\tan x)'=\sec^2x$, $(\cot x)'=-\csc^2 x$, $(\sec x)'=\sec x\tan x$, $(\csc x)'=-\csc x\cot x$.
~ $\frac{d^{27}}{dx^{27}}\cos x$: chu kỳ 4, $27=4\cdot6+3$, nên bằng $\sin x$.
~ $\lim_{x\to0}\frac{\sin7x}{4x}=\frac74$.
? $(x\sin x)'$ bằng
+ $\sin x+x\cos x$
- $\cos x$
- $x\cos x$
= Quy tắc tích.
? $\lim_{\theta\to0}\frac{\tan\theta}{\theta}$ bằng
+ $1$
- $0$
- $\infty$
= $\frac{\sin\theta}{\theta}\cdot\frac1{\cos\theta}$.
? Vì sao phải dùng radian?
+ Để $\lim\frac{\sin\theta}\theta=1$; với độ thì giới hạn là $\frac{\pi}{180}$
- Vì độ không tồn tại
= Đổi đơn vị làm xuất hiện hằng số.
& Chứng minh $(\tan x)'=\sec^2x$.
&> $\tan=\frac{\sin}{\cos}$: $\frac{\cos x\cos x-\sin x(-\sin x)}{\cos^2x}=\frac{1}{\cos^2x}=\sec^2x$.
& Một vật dao động $s(t)=4\cos t$. Tìm vận tốc và gia tốc, và khi nào vận tốc lớn nhất.
&> $v=-4\sin t$, $a=-4\cos t$. $|v|$ lớn nhất ($=4$) khi $\sin t=\pm1$, tức khi vật qua vị trí cân bằng $s=0$.

## 3.4 | Quy tắc chuỗi
@see T27.1 T34.4
| Hợp thành là đường ống: $x$ đi qua $g$ rồi qua $f$. Nếu $g$ biến đổi nhanh gấp $g'$ lần và $f$ nhanh gấp $f'$ lần thì cả ống nhanh gấp tích hai số đó.
! Quy tắc chuỗi :: $(f\circ g)'(x)=f'(g(x))\,g'(x)$, hay $\dfrac{dy}{dx}=\dfrac{dy}{du}\dfrac{du}{dx}$.
! Hệ quả :: $\dfrac{d}{dx}[g(x)]^n=n[g(x)]^{n-1}g'(x)$; $\dfrac{d}{dx}e^{g(x)}=e^{g(x)}g'(x)$; $\dfrac{d}{dx}b^x=b^x\ln b$.
~ $\frac{d}{dx}\sqrt{x^2+1}=\frac{x}{\sqrt{x^2+1}}$.
~ $\frac{d}{dx}\sin(\cos(\tan x))=\cos(\cos(\tan x))\cdot(-\sin(\tan x))\cdot\sec^2x$.
? $\frac{d}{dx}(1-2x)^{10}$ bằng
+ $-20(1-2x)^9$
- $10(1-2x)^9$
- $-2(1-2x)^{10}$
= Nhân thêm đạo hàm trong $-2$.
? $\frac{d}{dx}e^{\sin x}$ bằng
+ $e^{\sin x}\cos x$
- $e^{\cos x}$
- $e^{\sin x}$
= Chuỗi với $u=\sin x$.
? $\frac{d}{dx}2^x$ bằng
+ $2^x\ln2$
- $x2^{x-1}$
- $2^x$
= $2^x=e^{x\ln2}$.
& Tính $\frac{dy}{dx}$ với $y=\left(\frac{x-2}{2x+1}\right)^9$.
&> $y'=9\left(\frac{x-2}{2x+1}\right)^8\cdot\frac{(2x+1)-2(x-2)}{(2x+1)^2}=9\left(\frac{x-2}{2x+1}\right)^8\frac{5}{(2x+1)^2}$.
& Cho $F(x)=f(g(x))$ với $g(3)=6$, $g'(3)=4$, $f'(6)=7$. Tính $F'(3)$.
&> $F'(3)=f'(g(3))g'(3)=f'(6)\cdot4=28$.

## 3.5 | Đạo hàm hàm ẩn
@w implicit k=fol
@see T34.8
| Nhiều đường cong không giải được $y$ theo $x$, như $x^3+y^3=6xy$. Vẫn tính được $\frac{dy}{dx}$: đạo hàm hai vế theo $x$, coi $y$ là hàm của $x$ (nhớ quy tắc chuỗi), rồi giải ra $y'$.
| Tại điểm mà hệ số của $y'$ bằng $0$, tiếp tuyến thẳng đứng và quanh đó đường cong không là đồ thị $y=g(x)$.
! Cách làm :: Đạo hàm hai vế theo $x$; mỗi khi gặp $y$ thì nhân thêm $y'$; giải $y'$.
! Hàm lượng giác ngược :: $(\arcsin x)'=\frac{1}{\sqrt{1-x^2}}$, $(\arctan x)'=\frac1{1+x^2}$.
~ $x^2+y^2=25$: $2x+2yy'=0$, $y'=-\frac xy$. Tại $(3,4)$: $y'=-\frac34$.
? Với $xy=1$, $y'$ bằng
+ $-\frac yx$
- $\frac yx$
- $-\frac1{x^2}$ và không thể viết theo $y$
= $y+xy'=0$. (Cũng bằng $-\frac1{x^2}$ vì $y=\frac1x$.)
? $\frac{d}{dx}(y^2)$ bằng
+ $2yy'$
- $2y$
- $2x$
= Quy tắc chuỗi.
? Trên $x^2+y^2=25$, tiếp tuyến thẳng đứng tại
+ $(\pm5,0)$
- $(0,\pm5)$
= $y'=-\frac xy$ không xác định khi $y=0$.
& Tìm $y'$ của $x^3+y^3=6xy$ và tiếp tuyến tại $(3,3)$.
&> $3x^2+3y^2y'=6y+6xy'$, nên $y'=\frac{2y-x^2}{y^2-2x}$.
&> Tại $(3,3)$: $y'=\frac{6-9}{9-6}=-1$. Tiếp tuyến $y=-x+6$.
& Tìm $y''$ của $x^4+y^4=16$.
&> $y'=-\frac{x^3}{y^3}$. Đạo hàm tiếp: $y''=-\frac{3x^2y^3-x^3\cdot3y^2y'}{y^6}=-\frac{3x^2(y^4+x^4)}{y^7}=-\frac{48x^2}{y^7}$.

## 3.6 | Đạo hàm của hàm logarit
| Từ $e^{\ln x}=x$, đạo hàm hàm ẩn cho $(\ln x)'=\frac1x$. Kỹ thuật **đạo hàm logarit** (lấy $\ln$ hai vế trước khi đạo hàm) biến tích, thương, luỹ thừa phức tạp thành tổng.
! Công thức :: $(\ln x)'=\frac1x$, $(\ln|x|)'=\frac1x$, $(\log_bx)'=\frac{1}{x\ln b}$, $(\ln g)'=\frac{g'}{g}$.
! Số $e$ là giới hạn :: $e=\lim_{x\to0}(1+x)^{1/x}=\lim_{n\to\infty}(1+\frac1n)^n$.
~ $\frac{d}{dx}\ln(x^3+1)=\frac{3x^2}{x^3+1}$.
~ $y=x^{\sqrt x}$: $\ln y=\sqrt x\ln x$, $\frac{y'}{y}=\frac{\ln x}{2\sqrt x}+\frac{1}{\sqrt x}$, nên $y'=x^{\sqrt x}\left(\frac{2+\ln x}{2\sqrt x}\right)$.
? $\frac{d}{dx}\ln(\sin x)$ bằng
+ $\cot x$
- $\frac{1}{\sin x}$
- $\cos x$
= $\frac{\cos x}{\sin x}$.
? $\frac{d}{dx}x^x$ bằng
+ $x^x(\ln x+1)$
- $x\cdot x^{x-1}$
- $x^x\ln x$
= Đạo hàm logarit.
? $\frac{d}{dx}\log_{10}x$ bằng
+ $\frac{1}{x\ln10}$
- $\frac1x$
- $\frac{10}{x}$
= Đổi cơ số.
& Dùng đạo hàm logarit tính $y'$ với $y=\frac{x^{3/4}\sqrt{x^2+1}}{(3x+2)^5}$.
&> $\ln y=\frac34\ln x+\frac12\ln(x^2+1)-5\ln(3x+2)$.
&> $\frac{y'}{y}=\frac{3}{4x}+\frac{x}{x^2+1}-\frac{15}{3x+2}$, nhân hai vế với $y$.
& Chứng minh $\lim_{x\to0}(1+x)^{1/x}=e$.
&> $f(x)=\ln x$ có $f'(1)=1$, tức $\lim_{x\to0}\frac{\ln(1+x)}{x}=1$, hay $\ln(1+x)^{1/x}\to1$.
&> Do $\exp$ liên tục, $(1+x)^{1/x}=e^{\ln(1+x)^{1/x}}\to e$.

## 3.7 | Tốc độ thay đổi trong khoa học tự nhiên và xã hội
@w motion
| Đạo hàm là "tốc độ thay đổi" trong mọi lĩnh vực: vận tốc, gia tốc (vật lý), tốc độ phản ứng (hoá học), tốc độ tăng dân số (sinh học), chi phí biên (kinh tế), lưu lượng (dòng chảy).
| Minh hoạ: vị trí $s(t)$, vận tốc $v=s'$ và gia tốc $a=s''$ của một chuyển động. Vật đổi chiều khi $v$ đổi dấu; tăng tốc khi $v$ và $a$ cùng dấu.
! Chuyển động :: $v(t)=s'(t)$, $a(t)=v'(t)=s''(t)$; tốc độ là $|v|$.
! Chi phí biên :: $C'(x)\approx C(x+1)-C(x)$: chi phí để làm thêm một đơn vị.
! Dòng điện :: $I=\frac{dQ}{dt}$ (điện tích qua dây theo thời gian).
~ $s=t^3-6t^2+9t$: $v=3(t-1)(t-3)$; vật dừng tại $t=1,3$, đi lùi trong $(1,3)$.
~ Quãng đường thực tế trong $[0,5]$: $|s(1)-s(0)|+|s(3)-s(1)|+|s(5)-s(3)|=4+4+20=28$.
? Vật tăng tốc (tốc độ tăng) khi
+ $v$ và $a$ cùng dấu
- $a>0$
- $v>0$
= Ví dụ $v<0$, $a<0$: chạy lùi ngày càng nhanh.
? $C(x)=2000+3x+0{,}01x^2$. Chi phí biên tại $x=100$ là
+ $5$
- $3$
- $2400$
= $C'(x)=3+0{,}02x$.
? Dân số $P(t)$ có $P'(t)<0$ nghĩa là
+ dân số đang giảm
- dân số âm
= Tốc độ thay đổi âm.
& Một bóng đèn tròn có bán kính $r$ tăng dần. Tốc độ thay đổi của diện tích theo bán kính là gì, và vì sao?
&> $A=\pi r^2$, $\frac{dA}{dr}=2\pi r$: đúng bằng chu vi.
&> Hình học: tăng bán kính $dr$ thêm một vành mỏng có diện tích xấp xỉ chu vi $\times dr$.
& Cho $s=t^3-12t^2+36t$. Tìm khi nào vật tăng tốc.
&> $v=3t^2-24t+36=3(t-2)(t-6)$, $a=6t-24$.
&> $v,a$ cùng dấu khi $2<t<4$ ($v<0,a<0$) hoặc $t>6$ ($v>0,a>0$).

## 3.8 | Tăng trưởng và suy giảm mũ
@w slopefield preset=exp
| Khi tốc độ thay đổi tỉ lệ với chính đại lượng, $\frac{dy}{dt}=ky$, nghiệm là hàm mũ $y=y_0e^{kt}$. $k>0$: tăng trưởng (dân số, lãi kép); $k<0$: suy giảm (phóng xạ, nguội dần).
| Minh hoạ là trường hướng của phương trình: mỗi vạch chỉ độ dốc $y'$ tại điểm đó; nghiệm đi theo các vạch.
! Định lý :: Mọi nghiệm của $y'=ky$ có dạng $y=y(0)e^{kt}$.
! Chu kỳ bán rã :: $T=\frac{\ln2}{|k|}$.
! Định luật làm nguội Newton :: $T'=k(T-T_s)$, nên $T-T_s$ suy giảm mũ.
! Lãi kép liên tục :: $A(t)=A_0e^{rt}$, giới hạn của $A_0(1+\frac rn)^{nt}$ khi $n\to\infty$.
~ Radium-226 có chu kỳ bán rã 1590 năm. Sau 1000 năm, $100$ mg còn $100\cdot2^{-1000/1590}\approx64{,}6$ mg.
? Nếu $y'=-0{,}2y$ và $y(0)=50$ thì $y(t)$ bằng
+ $50e^{-0{,}2t}$
- $50-0{,}2t$
- $50e^{0{,}2t}$
= Suy giảm mũ.
? Tiền gửi $A_0$ với lãi $6\%$/năm ghép liên tục sau 10 năm là
+ $A_0e^{0{,}6}\approx1{,}82A_0$
- $1{,}6A_0$
- $A_0(1{,}06)^{10}$
= $e^{rt}$.
? Đại lượng tăng gấp ba mỗi 5 năm thì $k$ bằng
+ $\frac{\ln3}{5}$
- $\frac35$
- $5\ln3$
= $e^{5k}=3$.
& Cốc nước nóng $90^\circ$C đặt trong phòng $20^\circ$C, sau 10 phút còn $60^\circ$C. Khi nào còn $30^\circ$C?
&> $T-20=70e^{kt}$. Từ $40=70e^{10k}$: $k=\frac1{10}\ln\frac47$.
&> $10=70e^{kt}$: $t=\frac{\ln(1/7)}{k}=10\frac{\ln7}{\ln(7/4)}\approx34{,}8$ phút.
& Dân số một thành phố năm 2000 là 2 triệu, năm 2010 là 2,5 triệu. Dự báo năm 2030 (mô hình mũ).
&> $P=2e^{kt}$, $e^{10k}=1{,}25$.
&> Năm 2030 ($t=30$): $P=2\cdot1{,}25^3\approx3{,}91$ triệu.

## 3.9 | Tốc độ liên quan
@w ladder
| Khi hai đại lượng liên hệ với nhau và cùng thay đổi theo thời gian, tốc độ thay đổi của chúng cũng liên hệ. Đạo hàm hai vế của hệ thức theo $t$ là ra phương trình nối các tốc độ.
| Quy trình: vẽ hình, đặt tên biến, viết hệ thức, đạo hàm theo $t$, **sau đó** mới thế số (thế số trước khi đạo hàm là lỗi hay gặp).
! Ví dụ thang trượt :: $x^2+y^2=L^2$ cho $x\,x'+y\,y'=0$.
~ Thang dài 5 m trượt chân ra xa tường 1 m/s. Khi chân cách tường 3 m, đỉnh thang trượt xuống $\frac{3\cdot1}{4}=0{,}75$ m/s.
? Bơm khí vào quả bóng cầu $100\,\text{cm}^3$/s. Khi $r=25$ cm, $\frac{dr}{dt}$ bằng
+ $\frac{1}{25\pi}$ cm/s
- $\frac{100}{625}$ cm/s
- $4\pi$ cm/s
= $V'=4\pi r^2r'$, nên $r'=\frac{100}{4\pi\cdot625}$.
? Trong bài thang trượt, khi đỉnh thang gần chạm đất thì tốc độ trượt xuống
+ lớn vô hạn (mô hình không còn đúng)
- tiến về $0$
= $y'=-\frac{x}{y}x'$, $y\to0$.
? Lỗi thường gặp nhất trong bài tốc độ liên quan là
+ thế giá trị số vào biến thay đổi trước khi đạo hàm
- vẽ hình
= Biến đã thành hằng thì đạo hàm bằng $0$.
& Nước chảy vào bể hình nón úp ngược (bán kính đáy 2 m, cao 4 m) với tốc độ $2\,\text{m}^3$/phút. Mực nước dâng nhanh thế nào khi sâu 3 m?
&> Tam giác đồng dạng: $r=\frac h2$, $V=\frac13\pi r^2h=\frac{\pi h^3}{12}$.
&> $V'=\frac{\pi h^2}{4}h'$, nên $h'=\frac{4\cdot2}{\pi\cdot9}=\frac{8}{9\pi}\approx0{,}28$ m/phút.
& Xe A đi về hướng tây 50 km/h, xe B đi về hướng bắc 60 km/h, cùng hướng tới giao lộ. Khi A cách 0,3 km và B cách 0,4 km thì khoảng cách giữa hai xe thay đổi thế nào?
&> $z^2=x^2+y^2$, $zz'=xx'+yy'$, với $x'=-50$, $y'=-60$, $z=0{,}5$.
&> $z'=\frac{0{,}3(-50)+0{,}4(-60)}{0{,}5}=-78$ km/h: khoảng cách giảm 78 km/h.

## 3.10 | Xấp xỉ tuyến tính và vi phân
@w linapprox
| Phóng to đủ gần, mọi đường cong khả vi trông như tiếp tuyến của nó. Do đó gần $a$: $f(x)\approx f(a)+f'(a)(x-a)$. Đây là **tuyến tính hoá**.
| Vi phân $dy=f'(x)\,dx$ là phần thay đổi dọc theo tiếp tuyến, xấp xỉ phần thay đổi thật $\Delta y$. Dùng để ước lượng sai số đo.
! Tuyến tính hoá :: $L(x)=f(a)+f'(a)(x-a)$.
! Vi phân :: $dy=f'(x)\,dx$, $\Delta y\approx dy$ khi $dx$ nhỏ.
! Sai số tương đối :: $\frac{\Delta y}{y}\approx\frac{dy}{y}$.
~ $\sqrt{4{,}05}\approx2+\frac14(0{,}05)=2{,}0125$ (giá trị thật $2{,}01246\ldots$).
~ $\sin x\approx x$ gần $0$ (xấp xỉ góc nhỏ trong vật lý con lắc).
? Tuyến tính hoá của $\sqrt[3]{x}$ tại $a=8$ cho $\sqrt[3]{8{,}3}\approx$
+ $2{,}025$
- $2{,}3$
- $2{,}01$
= $2+\frac1{12}\cdot0{,}3$.
? Đo bán kính quả cầu $21$ cm với sai số $\pm0{,}05$ cm. Sai số thể tích ước tính
+ $\approx277\,\text{cm}^3$
- $\approx0{,}05\,\text{cm}^3$
- $\approx88\,\text{cm}^3$
= $dV=4\pi r^2dr=4\pi\cdot441\cdot0{,}05$.
? Với $f$ lõm lên, xấp xỉ tuyến tính cho giá trị
+ nhỏ hơn giá trị thật
- lớn hơn
= Tiếp tuyến nằm dưới đồ thị.
& Tìm tuyến tính hoá của $f(x)=\sqrt{x+3}$ tại $a=1$ và ước lượng $\sqrt{3{,}98}$, $\sqrt{4{,}05}$.
&> $f(1)=2$, $f'(x)=\frac{1}{2\sqrt{x+3}}$, $f'(1)=\frac14$. $L(x)=2+\frac{x-1}4$.
&> $\sqrt{3{,}98}=f(0{,}98)\approx1{,}995$; $\sqrt{4{,}05}=f(1{,}05)\approx2{,}0125$.
& Cạnh hình lập phương đo được 30 cm, sai số tối đa 0,1 cm. Ước lượng sai số tương đối của thể tích.
&> $V=x^3$, $\frac{dV}{V}=\frac{3x^2dx}{x^3}=3\frac{dx}{x}=3\cdot\frac{0{,}1}{30}=1\%$.

## 3.11 | Hàm hyperbolic
@w hyperbolic
| $\cosh x=\frac{e^x+e^{-x}}2$ và $\sinh x=\frac{e^x-e^{-x}}2$ đóng vai trò với hypebol $x^2-y^2=1$ giống như $\cos,\sin$ với đường tròn. Dây treo tự do có dạng $y=a\cosh\frac xa$ (dây xích).
! Định nghĩa :: $\sinh x=\frac{e^x-e^{-x}}2$, $\cosh x=\frac{e^x+e^{-x}}2$, $\tanh x=\frac{\sinh x}{\cosh x}$.
! Đồng nhất thức :: $\cosh^2x-\sinh^2x=1$.
! Đạo hàm :: $(\sinh x)'=\cosh x$, $(\cosh x)'=\sinh x$ (không có dấu trừ), $(\tanh x)'=\operatorname{sech}^2x$.
! Hàm ngược :: $\sinh^{-1}x=\ln(x+\sqrt{x^2+1})$.
~ $\lim_{x\to\infty}\tanh x=1$: tốc độ rơi giới hạn của vật có lực cản tỉ lệ bình phương vận tốc có dạng $\tanh$.
? $\cosh0$ bằng
+ $1$
- $0$
- $e$
= $\frac{1+1}{2}$.
? $\cosh x$ là hàm
+ chẵn, $\ge1$
- lẻ
- tuần hoàn
= Tổng của $e^x$ và $e^{-x}$.
? $(\cosh x)'$ bằng
+ $\sinh x$
- $-\sinh x$
- $\cosh x$
= Khác với $\cos$.
& Chứng minh $\cosh^2x-\sinh^2x=1$.
&> $\cosh^2x=\frac{e^{2x}+2+e^{-2x}}4$, $\sinh^2x=\frac{e^{2x}-2+e^{-2x}}4$. Hiệu bằng $\frac44=1$.
& Tính $\frac{d}{dx}\sinh^{-1}x$ bằng công thức logarit.
&> $\frac{d}{dx}\ln(x+\sqrt{x^2+1})=\frac{1+\frac{x}{\sqrt{x^2+1}}}{x+\sqrt{x^2+1}}=\frac{1}{\sqrt{x^2+1}}$.

# 4 | Ứng dụng của đạo hàm | 0
> Cực trị, định lý giá trị trung bình, khảo sát hàm số, tối ưu hoá, phương pháp Newton và nguyên hàm.

## 4.1 | Giá trị lớn nhất và nhỏ nhất
@w extreme
@see T26.6 T27.2
| Hàm liên tục trên đoạn đóng luôn đạt max và min (định lý giá trị cực trị). Chúng chỉ có thể nằm ở **điểm tới hạn** (nơi $f'=0$ hoặc $f'$ không tồn tại) hoặc ở **hai đầu mút**.
| Phương pháp đoạn đóng: tính $f$ tại mọi điểm tới hạn trong khoảng và tại hai đầu mút, rồi so sánh.
! Định lý Fermat :: $f$ có cực trị địa phương tại $c$ và $f'(c)$ tồn tại thì $f'(c)=0$.
! Điểm tới hạn :: $c$ thuộc miền với $f'(c)=0$ hoặc $f'(c)$ không tồn tại.
! Phương pháp đoạn đóng :: So sánh $f$ tại các điểm tới hạn và tại $a,b$.
~ $f(x)=x^3-3x^2+1$ trên $[-\frac12,4]$: điểm tới hạn $0,2$. $f(-\frac12)=\frac18$, $f(0)=1$, $f(2)=-3$, $f(4)=17$. Max $17$, min $-3$.
? Điểm tới hạn của $f(x)=x^{3/5}(4-x)$ là
+ $x=0$ (đạo hàm không tồn tại) và $x=\frac32$
- chỉ $x=\frac32$
- $x=4$
= $f'(x)=\frac{12-8x}{5x^{2/5}}$.
? $f'(c)=0$ đủ để kết luận cực trị?
+ Không, ví dụ $x^3$ tại $0$
- Có
= Định lý Fermat chỉ là điều kiện cần.
? Trên $[0,2\pi]$, giá trị lớn nhất của $f(x)=x-2\sin x$ là
+ $\frac{5\pi}{3}+\sqrt3\approx6{,}97$, tại $x=\frac{5\pi}3$
- $2\pi$, tại $x=2\pi$
- $0$
= Điểm tới hạn khi $\cos x=\frac12$: $\frac\pi3,\frac{5\pi}3$. So sánh $f(0)=0$, $f(\frac\pi3)<0$, $f(\frac{5\pi}3)\approx6{,}97$, $f(2\pi)\approx6{,}28$.
& Tìm max, min của $f(x)=x\sqrt{4-x^2}$ trên $[-1,2]$.
&> $f'(x)=\sqrt{4-x^2}-\frac{x^2}{\sqrt{4-x^2}}=\frac{4-2x^2}{\sqrt{4-x^2}}=0$ khi $x=\sqrt2$ (trong đoạn). $f'$ không tồn tại tại $x=2$ (đầu mút).
&> $f(-1)=-\sqrt3$, $f(\sqrt2)=2$, $f(2)=0$. Max $2$, min $-\sqrt3$.
& Vận tốc tàu con thoi (mô hình) $v(t)=0{,}001t^3-0{,}09t^2+23t-0{,}6$ trên $[0,126]$. Tìm gia tốc lớn nhất, nhỏ nhất.
&> $a(t)=0{,}003t^2-0{,}18t+23$, $a'(t)=0{,}006t-0{,}18=0$ khi $t=30$.
&> $a(0)=23$, $a(30)=20{,}3$, $a(126)\approx48{,}9$. Min $20{,}3$, max $\approx48{,}9$.

## 4.2 | Định lý giá trị trung bình
@w mvt
@see T27.2
| Trên mỗi đoạn có ít nhất một điểm mà tiếp tuyến song song với cát tuyến nối hai đầu. Về chuyển động: nếu trung bình bạn đi 80 km/h thì có lúc đồng hồ tốc độ chỉ đúng 80.
| Định lý này là cây cầu nối thông tin về $f'$ với thông tin về $f$: $f'=0$ thì $f$ hằng; $f'>0$ thì $f$ tăng.
! Định lý Rolle :: $f$ liên tục trên $[a,b]$, khả vi trên $(a,b)$, $f(a)=f(b)$ thì có $c\in(a,b)$ với $f'(c)=0$.
! Giá trị trung bình :: Có $c\in(a,b)$ với $f'(c)=\dfrac{f(b)-f(a)}{b-a}$.
! Hệ quả :: $f'=g'$ trên một khoảng thì $f-g$ là hằng số.
~ $f(x)=x^3-x$ trên $[0,2]$: hệ số góc cát tuyến $\frac{6-0}{2}=3$; $3c^2-1=3$ cho $c=\frac{2}{\sqrt3}$.
? $f(0)=-3$ và $f'(x)\le5$ với mọi $x$. Giá trị lớn nhất có thể của $f(2)$ là
+ $7$
- $5$
- $10$
= $f(2)-f(0)=2f'(c)\le10$.
? Có bao nhiêu nghiệm thực của $x^3+x-1=0$?
+ Đúng một
- Ba
- Không có
= Có ít nhất một (giá trị trung gian); nếu có hai thì Rolle cho $3c^2+1=0$, vô lý.
? Định lý giá trị trung bình cần
+ liên tục trên đoạn đóng và khả vi trên khoảng mở
- khả vi trên đoạn đóng
- $f(a)=f(b)$
= $f(a)=f(b)$ chỉ cần cho Rolle.
& Chứng minh $\sin x\le x$ với mọi $x\ge0$.
&> Với $x>0$, giá trị trung bình trên $[0,x]$: $\sin x-\sin0=x\cos c\le x$.
& Một xe đi 180 km trong 2 giờ, giới hạn tốc độ 80 km/h. Chứng minh xe đã vượt tốc độ.
&> Vận tốc trung bình $90$ km/h. Theo giá trị trung bình, có thời điểm $s'(c)=90>80$.

## 4.3 | Đạo hàm và hình dạng đồ thị
@w secant mode=concave k=cub
@see T27.3
| $f'$ cho biết hướng: tăng hay giảm. $f''$ cho biết độ cong: **lõm lên** (như cái chén, $f''>0$) hay **lõm xuống** (như cái mũ, $f''<0$). Chỗ đổi độ lõm là **điểm uốn**.
! Tăng/giảm :: $f'>0$ trên khoảng thì $f$ tăng; $f'<0$ thì giảm.
! Kiểm tra đạo hàm cấp một :: $f'$ đổi dấu từ $+$ sang $-$ tại $c$: cực đại địa phương; từ $-$ sang $+$: cực tiểu.
! Kiểm tra đạo hàm cấp hai :: $f'(c)=0$ và $f''(c)>0$: cực tiểu; $f''(c)<0$: cực đại; $f''(c)=0$: chưa kết luận.
! Điểm uốn :: Điểm mà $f$ liên tục và đổi độ lõm.
~ $f(x)=x^4-4x^3$: $f'=4x^2(x-3)$, giảm trên $(-\infty,3)$, tăng sau đó, cực tiểu tại $3$. $f''=12x(x-2)$: điểm uốn tại $0$ và $2$.
? $f''(c)=0$ có chắc $c$ là điểm uốn?
+ Không, ví dụ $x^4$ tại $0$
- Có
= Cần đổi dấu của $f''$.
? $f(x)=xe^{-x}$ đạt cực đại tại
+ $x=1$
- $x=0$
- $x=2$
= $f'=(1-x)e^{-x}$.
? Nếu $f''>0$ trên một khoảng thì đồ thị
+ nằm trên mọi tiếp tuyến trong khoảng đó
- nằm dưới tiếp tuyến
= Định nghĩa lõm lên.
& Khảo sát $f(x)=x^{2/3}(6-x)^{1/3}$: tìm khoảng tăng/giảm.
&> $f'(x)=\frac{4-x}{x^{1/3}(6-x)^{2/3}}$. Điểm tới hạn $0,4,6$.
&> $f'<0$ trên $(-\infty,0)$, $>0$ trên $(0,4)$, $<0$ trên $(4,6)$ và $(6,\infty)$. Cực tiểu tại $0$, cực đại tại $4$ với $f(4)=2^{5/3}$.
& Tìm điểm uốn của $f(x)=x^3-6x^2+5$.
&> $f''=6x-12$ đổi dấu tại $x=2$. Điểm uốn $(2,-11)$.

## 4.4 | Dạng vô định và quy tắc L'Hôpital
@w lhopital k=c
@see T27.5
| Các dạng $\frac00$, $\frac\infty\infty$: thay tỉ số hàm bằng tỉ số đạo hàm. Các dạng khác ($0\cdot\infty$, $\infty-\infty$, $0^0$, $1^\infty$, $\infty^0$) đưa về hai dạng trên bằng biến đổi đại số hoặc lấy logarit.
! L'Hôpital :: Dạng $\frac00$ hoặc $\frac{\infty}{\infty}$: $\lim\frac fg=\lim\frac{f'}{g'}$ nếu giới hạn bên phải tồn tại (hoặc là $\pm\infty$).
! Dạng mũ :: $y=f^g$: tính $\lim\ln y=\lim g\ln f$ rồi lấy $e$ mũ.
~ $\lim_{x\to\infty}\frac{e^x}{x^2}=\lim\frac{e^x}{2x}=\lim\frac{e^x}{2}=\infty$.
~ $\lim_{x\to0^+}(1+\sin4x)^{\cot x}$: $\ln y=\frac{\ln(1+\sin4x)}{\tan x}\to\frac{4}{1}$, nên giới hạn $e^4$.
? $\lim_{x\to\infty}\frac{\ln x}{\sqrt x}$ bằng
+ $0$
- $\infty$
- $1$
= $\frac{1/x}{1/(2\sqrt x)}=\frac{2}{\sqrt x}$.
? $\lim_{x\to0}\frac{\sin x}{1+\cos x}$ theo L'Hôpital là
+ không áp dụng; thế trực tiếp được $0$
- $\frac{\cos x}{-\sin x}\to\infty$
= Không phải dạng vô định.
? $\lim_{x\to\infty}\left(1+\frac{3}{x}\right)^x$ bằng
+ $e^3$
- $1$
- $\infty$
= Dạng $1^\infty$.
& Tính $\lim_{x\to(\pi/2)^-}(\sec x-\tan x)$.
&> $\sec x-\tan x=\frac{1-\sin x}{\cos x}$, dạng $\frac00$.
&> L'Hôpital: $\frac{-\cos x}{-\sin x}\to0$.
& Tính $\lim_{x\to0^+}x^{x}$ bằng logarit.
&> $\ln y=x\ln x=\frac{\ln x}{1/x}$, dạng $\frac{-\infty}{\infty}$; L'Hôpital: $\frac{1/x}{-1/x^2}=-x\to0$.
&> Vậy $y\to e^0=1$.

## 4.5 | Tóm tắt khảo sát đồ thị
@w secant mode=crit
| Danh sách kiểm tra khi vẽ đồ thị: miền; giao điểm với trục; đối xứng; tiệm cận; khoảng tăng/giảm; cực trị; độ lõm và điểm uốn. Gom hết rồi mới phác.
! Trình tự :: A. Miền. B. Giao điểm. C. Đối xứng/tuần hoàn. D. Tiệm cận. E. Tăng/giảm. F. Cực trị. G. Lõm/điểm uốn. H. Phác hình.
~ $y=\frac{2x^2}{x^2-1}$: miền $x\ne\pm1$; chẵn; tiệm cận ngang $y=2$, đứng $x=\pm1$; $y'=\frac{-4x}{(x^2-1)^2}$: tăng trên $x<0$, giảm trên $x>0$, cực đại $(0,0)$; $y''>0$ khi $|x|>1$.
? Đồ thị $y=\frac{x}{x^2+1}$ có tiệm cận ngang
+ $y=0$
- $y=1$
- không có
= Bậc tử nhỏ hơn bậc mẫu.
? $y=\frac{x}{x^2+1}$ là hàm
+ lẻ, cực đại tại $x=1$ và cực tiểu tại $x=-1$
- chẵn
= $y'=\frac{1-x^2}{(x^2+1)^2}$.
? Bước nào giúp chỉ cần vẽ nửa đồ thị?
+ Đối xứng (chẵn/lẻ)
- Tiệm cận
- Điểm uốn
= Nửa còn lại lấy đối xứng.
& Khảo sát và phác đồ thị $y=xe^x$.
&> Miền $\mathbb R$; cắt trục tại $0$; $\lim_{x\to-\infty}xe^x=0$ (tiệm cận ngang $y=0$ bên trái); $\to\infty$ bên phải.
&> $y'=(x+1)e^x$: cực tiểu $(-1,-\frac1e)$. $y''=(x+2)e^x$: điểm uốn $(-2,-\frac2{e^2})$, lõm xuống khi $x<-2$.

## 4.6 | Vẽ đồ thị bằng giải tích và máy tính
@w family
| Máy vẽ đồ thị nhanh nhưng dễ che giấu chi tiết (khung nhìn quá rộng làm mất cực trị nhỏ). Giải tích chỉ ra chỗ cần phóng to. Khảo sát **họ hàm số** theo tham số cho thấy hình dạng biến đổi ra sao.
! Nguyên tắc :: Dùng $f'$ và $f''$ để chọn khung nhìn chứa mọi điểm đặc biệt.
! Họ hàm số :: Thay tham số $c$ trong $f_c(x)$ và theo dõi số cực trị, điểm uốn.
~ Họ $f(x)=x^3+cx$: $c>0$ thì luôn tăng; $c=0$ có điểm dừng tại $0$; $c<0$ có hai cực trị tại $\pm\sqrt{-c/3}$.
? Họ $f(x)=x^4+cx^2$ có ba điểm tới hạn khi
+ $c<0$
- $c>0$
- $c=0$
= $f'=2x(2x^2+c)$.
? Với $f(x)=e^{cx}$, tham số $c$ quyết định
+ tăng ($c>0$) hay giảm ($c<0$)
- số cực trị
= Không có cực trị khi $c\ne0$.
? Vì sao cần giải tích khi đã có máy vẽ?
+ Để biết chính xác các điểm đặc biệt và chọn khung nhìn đúng
- Máy vẽ luôn sai
= Máy vẽ chỉ hiển thị điểm mẫu.
& Khảo sát họ $f(x)=\frac{1}{x^2+2x+c}$: với giá trị $c$ nào thì có tiệm cận đứng?
&> Mẫu $=(x+1)^2+c-1$. Có nghiệm khi $c\le1$: $c<1$ có hai tiệm cận đứng $x=-1\pm\sqrt{1-c}$, $c=1$ có một tại $x=-1$.
&> $c>1$: không có tiệm cận đứng, cực đại tại $x=-1$ với giá trị $\frac{1}{c-1}$.

## 4.7 | Bài toán tối ưu
@w boxopt
| Nhiều câu hỏi thực tế là tìm max/min: lợi nhuận lớn nhất, vật liệu ít nhất, đường ngắn nhất. Quy trình: đặt biến, viết đại lượng cần tối ưu theo **một** biến (dùng ràng buộc để khử biến thừa), xác định miền, rồi dùng đạo hàm.
! Quy trình :: Hiểu đề → vẽ hình → đặt biến → hàm mục tiêu → ràng buộc → một biến → miền → tìm cực trị toàn cục.
! Cực trị toàn cục trên khoảng :: Nếu $f$ chỉ có một điểm tới hạn và đó là cực đại địa phương thì nó là cực đại toàn cục.
~ Hộp không nắp từ tấm bìa $12\times12$ cắt bốn góc vuông cạnh $x$: $V=x(12-2x)^2$, lớn nhất khi $x=2$, $V=128$.
? Hình chữ nhật chu vi $40$ có diện tích lớn nhất khi
+ là hình vuông cạnh $10$
- dài $15$ rộng $5$
= $A=x(20-x)$ cực đại tại $x=10$.
? Lon trụ thể tích cố định tốn ít vật liệu nhất khi
+ chiều cao bằng đường kính
- chiều cao bằng bán kính
- chiều cao gấp đôi đường kính
= $A=2\pi r^2+\frac{2V}r$, $A'=0$ cho $h=2r$.
? Điểm trên $y^2=2x$ gần $(1,4)$ nhất là
+ $(2,2)$
- $(1,\sqrt2)$
- $(0,0)$
= Cực tiểu $d^2=(\frac{y^2}2-1)^2+(y-4)^2$ tại $y=2$.
& Người đứng ở bờ sông (rộng 3 km) muốn tới điểm cách 8 km xuôi dòng ở bờ bên kia. Chèo thuyền 6 km/h, chạy bộ 8 km/h. Nên cập bờ ở đâu?
&> Chèo tới điểm cách $x$ km xuôi dòng rồi chạy $8-x$: $T(x)=\frac{\sqrt{9+x^2}}6+\frac{8-x}8$.
&> $T'=\frac{x}{6\sqrt{9+x^2}}-\frac18=0$ cho $x=\frac{9}{\sqrt7}\approx3{,}4$ km. So sánh $T(0)=1{,}5$, $T(3{,}4)\approx1{,}33$, $T(8)\approx1{,}42$: chọn $x\approx3{,}4$ km.
& Tìm hình chữ nhật diện tích lớn nhất nội tiếp nửa đường tròn bán kính $r$.
&> Đỉnh trên đường tròn $(x,y)$, $y=\sqrt{r^2-x^2}$; $A=2x\sqrt{r^2-x^2}$.
&> Đặt $x=r\cos\theta$: $A=r^2\sin2\theta$, lớn nhất $r^2$ khi $\theta=\frac\pi4$, kích thước $\sqrt2r\times\frac{r}{\sqrt2}$.

## 4.8 | Phương pháp Newton
@w newton
@see T34.6
| Muốn giải $f(x)=0$: đoán $x_1$, thay đồ thị bằng tiếp tuyến tại đó, lấy giao điểm tiếp tuyến với trục hoành làm $x_2$, lặp lại. Khi gần nghiệm, số chữ số đúng thường **gấp đôi** sau mỗi bước.
| Phương pháp có thể thất bại: điểm đầu ở chỗ $f'\approx0$ đẩy bước tiếp đi rất xa, hoặc dãy dao động.
! Công thức :: $x_{n+1}=x_n-\dfrac{f(x_n)}{f'(x_n)}$.
! Hội tụ bậc hai :: Gần nghiệm đơn, sai số $|x_{n+1}-r|\approx C|x_n-r|^2$.
~ Tìm $\sqrt2$: $f(x)=x^2-2$, $x_{n+1}=\frac{x_n}{2}+\frac1{x_n}$. Từ $x_1=1$: $1{,}5;\ 1{,}41667;\ 1{,}4142157;\ 1{,}41421356\ldots$
? Công thức Newton cho $\sqrt[3]{5}$ là
+ $x_{n+1}=x_n-\frac{x_n^3-5}{3x_n^2}$
- $x_{n+1}=\frac{x_n+5}{2}$
= $f(x)=x^3-5$.
? Newton thất bại khi
+ $f'(x_n)=0$ tại một bước
- $f(x_n)=0$
= Tiếp tuyến nằm ngang không cắt trục hoành.
? Với $f(x)=x^{1/3}$, Newton từ $x_1\ne0$ cho
+ $x_{n+1}=-2x_n$, dãy phân kỳ
- hội tụ về $0$
= $x-\frac{x^{1/3}}{\frac13x^{-2/3}}=x-3x=-2x$.
& Dùng Newton với $x_1=2$ tìm nghiệm của $x^3-2x-5=0$ tới bước $x_3$.
&> $f'=3x^2-2$. $x_2=2-\frac{8-4-5}{10}=2{,}1$.
&> $x_3=2{,}1-\frac{9{,}261-4{,}2-5}{13{,}23-2}=2{,}1-\frac{0{,}061}{11{,}23}\approx2{,}0946$.
& Giải thích vì sao Newton cho $\sqrt a$ chính là "trung bình của $x$ và $a/x$".
&> $f(x)=x^2-a$: $x-\frac{x^2-a}{2x}=\frac{x}{2}+\frac{a}{2x}=\frac12\left(x+\frac ax\right)$.
&> Nếu $x$ lớn hơn $\sqrt a$ thì $\frac ax$ nhỏ hơn, trung bình của chúng gần $\sqrt a$ hơn.

## 4.9 | Nguyên hàm
@w antideriv
| Nguyên hàm là phép ngược của đạo hàm: $F'=f$. Nếu $F$ là một nguyên hàm thì mọi nguyên hàm khác là $F+C$, đồ thị dời lên xuống song song. Một điều kiện ban đầu chọn ra đúng một đường.
! Định lý :: $F$ là nguyên hàm của $f$ trên một khoảng thì mọi nguyên hàm có dạng $F(x)+C$.
! Bảng :: $x^n\to\frac{x^{n+1}}{n+1}$ ($n\ne-1$), $\frac1x\to\ln|x|$, $e^x\to e^x$, $\cos x\to\sin x$, $\sin x\to-\cos x$, $\sec^2x\to\tan x$, $\frac{1}{1+x^2}\to\arctan x$.
! Chuyển động :: Biết $a(t)$, $v(0)$, $s(0)$ thì tìm được $v$ và $s$.
~ $f''(x)=12x^2+6x-4$, $f(0)=4$, $f(1)=1$: $f=x^4+x^3-2x^2-3x+4$.
? Nguyên hàm tổng quát của $\frac{1}{\sqrt x}$ là
+ $2\sqrt x+C$
- $\frac{1}{2\sqrt x}+C$
- $\ln\sqrt x+C$
= $x^{-1/2}\to\frac{x^{1/2}}{1/2}$.
? Tìm $f$ biết $f'(x)=e^x+20(1+x^2)^{-1}$ và $f(0)=-2$
+ $f=e^x+20\arctan x-3$
- $f=e^x+20\arctan x-2$
= $f(0)=1+0+C=-2$.
? Vật ném thẳng lên từ mặt đất với vận tốc $20$ m/s ($g=10$). Độ cao lớn nhất là
+ $20$ m
- $40$ m
- $10$ m
= $v=20-10t=0$ tại $t=2$, $s=20\cdot2-5\cdot4$.
& Tìm $f$ với $f'(x)=4-3(1+x^2)^{-1}$, $f(1)=0$.
&> $f(x)=4x-3\arctan x+C$. $f(1)=4-\frac{3\pi}4+C=0$, nên $C=\frac{3\pi}4-4$.
& Xe đang chạy 30 m/s thì phanh với gia tốc không đổi $-6$ m/s². Quãng đường phanh?
&> $v=30-6t$, dừng tại $t=5$. $s=30t-3t^2$, $s(5)=150-75=75$ m.
`);
