/* Bổ sung Chương 1–4: thêm ví dụ, câu tự kiểm tra, bài tập có lời giải. */
(window.EXTRA = window.EXTRA || []).push(String.raw`
## 1.1
~ "Mọi hàm liên tục trên $[0,1]$ đều đạt giá trị lớn nhất" là đúng; nhưng với khoảng mở $(0,1)$ thì sai: $f(x)=x$ không đạt max. Chỉ đổi một dấu ngoặc mà kết luận đổi hẳn.
~ Chuỗi $1-1+1-1+\cdots$: nhóm thành $(1-1)+(1-1)+\cdots$ được $0$, nhóm thành $1+(-1+1)+\cdots$ được $1$. Thao tác “hiển nhiên” với tổng hữu hạn trở nên sai với tổng vô hạn.
? Câu nào là một **định nghĩa** chứ không phải định lý?
+ "Dãy $(a_n)$ bị chặn nếu có $M$ với $|a_n|\le M$ với mọi $n$"
- "Mọi dãy hội tụ đều bị chặn"
- "Tổng của hai dãy hội tụ là dãy hội tụ"
= Định nghĩa đặt tên cho một khái niệm; định lý khẳng định một điều cần chứng minh.
? Trong giải tích chặt chẽ, hình vẽ dùng để làm gì?
+ Gợi ý ý tưởng, sau đó phải chứng minh bằng lập luận
- Thay thế cho chứng minh
- Không bao giờ được dùng
= Hình vẽ rất có ích để đoán và hiểu, nhưng có thể đánh lừa (ví dụ hàm liên tục không khả vi ở đâu cả).
? "Mọi số thực $x$ đều có $x^2\ge0$." Để bác bỏ một mệnh đề dạng "mọi", ta cần
+ một phản ví dụ
- chứng minh cho mọi $x$
- vẽ đồ thị
= Một phản ví dụ là đủ để bác bỏ một khẳng định tổng quát. (Mệnh đề này thì đúng.)
& Tìm chỗ sai: "$\infty-\infty=0$ vì $x-x=0$ với mọi $x$."
&> $\infty$ không phải số thực, nên quy tắc $x-x=0$ (chứng minh cho số thực) không áp dụng.
&> Thực tế, $n-n\to0$, nhưng $(n+1)-n\to1$ và $2n-n\to\infty$, dù cả hai số hạng đều $\to\infty$. Vì vậy $\infty-\infty$ được để **không xác định**.
& Cho ví dụ một mệnh đề đúng với $n=1,2,\dots,40$ nhưng sai với $n=41$.
&> Xét $p(n)=n^2+n+41$. Với $n=0,1,\dots,39$, $p(n)$ là số nguyên tố, nhưng $p(40)=40\cdot41+41=41^2$ không nguyên tố.
&> Bài học: kiểm tra nhiều trường hợp không thay được chứng minh.

## 1.2
~ Đổi thứ tự tổng kép không hợp lệ: với $a_{n,n}=1$, $a_{n,n+1}=-1$, tổng theo hàng bằng $0$ còn tổng theo cột bằng $1$ (xem mục 8.2).
~ Đổi giới hạn và tích phân: $f_n=n\,\mathbb 1_{(0,1/n)}$ có $\lim_n f_n(x)=0$ với mọi $x$, nhưng $\int_0^1 f_n=1$ với mọi $n$.
~ Đạo hàm từng số hạng: $\sum \frac{\sin(n^2x)}{n^2}$ hội tụ đều nhưng chuỗi đạo hàm $\sum\cos(n^2x)$ không hội tụ.
? Với $f_n(x)=x^n$ trên $[0,1]$, $\lim_{n}\lim_{x\to1^-}f_n(x)$ bằng
+ $1$
- $0$
- không tồn tại
= Với mỗi $n$, $\lim_{x\to1^-}x^n=1$.
? Cũng với $f_n(x)=x^n$, $\lim_{x\to1^-}\lim_n f_n(x)$ bằng
+ $0$
- $1$
- $\infty$
= Với $x<1$, $x^n\to0$, nên giới hạn trong là $0$. Hai thứ tự cho hai kết quả khác nhau.
? Thao tác nào sau đây **luôn** hợp lệ?
+ Đổi thứ tự hai tổng hữu hạn
- Đổi thứ tự hai tổng vô hạn
- Đổi giới hạn với tích phân
= Với tổng hữu hạn, phép cộng giao hoán và kết hợp đủ để đổi thứ tự.
& Tính $\lim_{x\to0}\lim_{y\to0}\dfrac{x-y}{x+y}$ và $\lim_{y\to0}\lim_{x\to0}\dfrac{x-y}{x+y}$.
&> Cố định $x\ne0$, cho $y\to0$: $\frac{x-y}{x+y}\to\frac xx=1$. Rồi cho $x\to0$: kết quả $1$.
&> Cố định $y\ne0$, cho $x\to0$: $\frac{-y}{y}=-1$. Rồi cho $y\to0$: kết quả $-1$.
&> Hai giới hạn lặp khác nhau, nên giới hạn kép $\lim_{(x,y)\to(0,0)}$ không tồn tại.
& Vì sao không thể "chứng minh" $1=0$ bằng $\sum_{n\ge1}(1-1)=0$ và $\sum_{n\ge1}(1-1)=1+\sum_{n\ge1}(-1+1)=1$?
&> Cách nhóm thứ hai là đổi chỗ dấu ngoặc trong chuỗi $1-1+1-1+\cdots$, mà chuỗi này **không hội tụ** (tổng riêng dao động giữa $1$ và $0$).
&> Chỉ chuỗi hội tụ mới được nhóm số hạng tuỳ ý (mà vẫn giữ tổng); mọi "chứng minh" dựa trên chuỗi phân kỳ đều không hợp lệ.

## 2.1
~ Chứng minh $3$ là số tự nhiên: $0$ là số tự nhiên (2.1), nên $1=0{+}{+}$, $2=1{+}{+}$, $3=2{+}{+}$ đều là số tự nhiên (2.2).
~ Chứng minh $4\ne0$: $4=3{+}{+}$, và Tiên đề 2.3 nói không số kế tiếp nào bằng $0$.
~ Chứng minh $6\ne2$: nếu $6=2$ thì $5{+}{+}=1{+}{+}$, theo 2.4 suy ra $5=1$, rồi $4=0$, mâu thuẫn với ví dụ trên.
? Tiên đề nào cho phép chứng minh $1\ne 2$?
+ 2.4 (rồi dùng 2.3)
- Chỉ 2.1
- Chỉ 2.5
= $1=2$ tức $0{+}{+}=1{+}{+}$, theo 2.4 thì $0=1=0{+}{+}$, mâu thuẫn với 2.3.
? Hệ $\{0, 0.5, 1, 1.5, 2,\dots\}$ với $n{+}{+}=n+1$ vi phạm tiên đề nào?
+ 2.5 (quy nạp): tính chất "là số nguyên" đúng với $0$, truyền qua $++$, nhưng sai với $0.5$
- 2.3
- 2.4
= Tiên đề quy nạp loại bỏ các "phần tử lạ" không đến được từ $0$ bằng $++$.
? Định nghĩa đệ quy $a_0=c$, $a_{n{+}{+}}=f_n(a_n)$ định nghĩa được dãy duy nhất là nhờ
+ tiên đề quy nạp
- tiên đề lựa chọn
- tính Archimedes
= Mệnh đề 2.1.16 chứng minh bằng quy nạp.
? Trong quy nạp mạnh, ở bước truyền ta được giả sử
+ $P(m)$ đúng với **mọi** $m<n$
- chỉ $P(n-1)$ đúng
- $P(n)$ đúng
= Quy nạp mạnh: nếu $P(m)$ đúng với mọi $m<n$ kéo theo $P(n)$, thì $P$ đúng với mọi $n$.
& Chứng minh bằng quy nạp: $1+2+\cdots+n=\dfrac{n(n+1)}{2}$ với mọi $n\ge1$.
&> **Cơ sở** $n=1$: vế trái $1$, vế phải $\frac{1\cdot2}2=1$.
&> **Bước truyền**: giả sử đúng với $n$. Khi đó $1+\cdots+n+(n+1)=\frac{n(n+1)}2+(n+1)=\frac{(n+1)(n+2)}2$, đúng với $n+1$.
&> Theo nguyên lý quy nạp, công thức đúng với mọi $n\ge1$.
& Tìm lỗi trong "chứng minh" mọi con ngựa cùng màu: với $n$ ngựa, bỏ con đầu thì $n-1$ con còn lại cùng màu, bỏ con cuối cũng vậy, hai nhóm chồng nhau nên cả $n$ con cùng màu.
&> Bước truyền từ $n=1$ sang $n=2$ sai: với 2 con, nhóm "bỏ con đầu" là $\{2\}$ và "bỏ con cuối" là $\{1\}$, **không chồng nhau**.
&> Bước truyền phải đúng với **mọi** $n$; chỉ cần sai ở một $n$ là cả chứng minh sụp.
& Chứng minh mọi số tự nhiên $n\ne0$ đều là số kế tiếp của một số tự nhiên $m$ duy nhất.
&> Quy nạp: với $n=0$ khẳng định rỗng. Giả sử đúng với $n$; xét $n{+}{+}$: nó là số kế tiếp của $m=n$.
&> Duy nhất: nếu $m{+}{+}=m'{+}{+}$ thì $m=m'$ theo Tiên đề 2.4.

## 2.2
~ Chứng minh $n+0=n$ bằng quy nạp: $0+0=0$; nếu $n+0=n$ thì $(n{+}{+})+0=(n+0){+}{+}=n{+}{+}$.
~ Chứng minh $n+(m{+}{+})=(n+m){+}{+}$ bằng quy nạp theo $n$, rồi dùng nó để chứng minh tính giao hoán.
? Muốn chứng minh $n+m=m+n$, ta quy nạp theo
+ $n$, cố định $m$
- cả hai biến cùng lúc
- không cần quy nạp
= Cố định $m$ và chứng minh cho mọi $n$; cần hai bổ đề $n+0=n$ và $n+(m{+}{+})=(n+m){+}{+}$.
? Nếu $a+b=0$ với $a,b$ tự nhiên thì
+ $a=b=0$
- $a=-b$
- $a=0$ hoặc $b=0$
= Nếu $b\ne0$ thì $a+b$ là số kế tiếp, khác $0$. Vậy $b=0$, kéo theo $a=0$.
? Số $n$ là **dương** khi
+ $n\ne0$
- $n>1$
- $n$ là số kế tiếp của $0$
= Định nghĩa 2.2.7.
? Nguyên lý tam phân cho số tự nhiên nói rằng với $a,b$ bất kỳ, đúng một điều xảy ra:
+ $a<b$, $a=b$, hoặc $a>b$
- $a\le b$ hoặc $a\ge b$
- $a+b>0$
= Mệnh đề 2.2.13.
& Chứng minh tính kết hợp: $(a+b)+c=a+(b+c)$.
&> Quy nạp theo $a$, cố định $b,c$. Với $a=0$: $(0+b)+c=b+c=0+(b+c)$.
&> Giả sử đúng với $a$. Khi đó $((a{+}{+})+b)+c=((a+b){+}{+})+c=((a+b)+c){+}{+}=(a+(b+c)){+}{+}=(a{+}{+})+(b+c)$.
&> Các bước dùng định nghĩa cộng hai lần và giả thiết quy nạp ở giữa.
& Chứng minh luật giản ước: $a+b=a+c\Rightarrow b=c$.
&> Quy nạp theo $a$. Với $a=0$: $0+b=0+c$ tức $b=c$.
&> Giả sử đúng với $a$, và $(a{+}{+})+b=(a{+}{+})+c$. Theo định nghĩa: $(a+b){+}{+}=(a+c){+}{+}$. Theo Tiên đề 2.4: $a+b=a+c$, rồi giả thiết quy nạp cho $b=c$.

## 2.3
~ Tính $2\times3$: $2\times3=(1{+}{+})\times3=1\times3+3=(0\times3+3)+3=0+3+3=6$.
~ Luỹ thừa định nghĩa đệ quy: $m^0=1$, $m^{n{+}{+}}=m^n\times m$. Ví dụ $2^3=2^2\cdot2=(2^1\cdot2)\cdot2=8$.
? $0^0$ theo định nghĩa đệ quy $m^0:=1$ bằng
+ $1$
- $0$
- không xác định
= Định nghĩa đặt $m^0=1$ với mọi $m$, kể cả $m=0$.
? Nếu $a\times b=a\times c$ và $a\ne0$ thì
+ $b=c$
- $b=c$ hoặc $a=1$
- không kết luận được
= Luật giản ước của phép nhân (Hệ quả 2.3.7).
? Nếu $a<b$ và $c>0$ thì
+ $ac<bc$
- $ac\le bc$ nhưng có thể bằng
- $ac>bc$
= Phép nhân với số dương bảo toàn thứ tự ngặt.
? Khi chia $17$ cho $5$, thuật chia Euclid cho
+ $m=3$, $r=2$
- $m=2$, $r=7$
- $m=3$, $r=-2$
= $17=3\cdot5+2$, với $0\le 2<5$.
& Chứng minh tính phân phối $a(b+c)=ab+ac$.
&> Quy nạp theo $c$ (cố định $a,b$). Với $c=0$: $a(b+0)=ab=ab+0=ab+a\cdot0$.
&> Giả sử đúng với $c$. Khi đó $a(b+c{+}{+})=a((b+c){+}{+})=a(b+c)+a=ab+ac+a=ab+a(c{+}{+})$.
&> (Dùng $x(y{+}{+})=xy+x$, suy ra từ giao hoán và định nghĩa nhân.)
& Chứng minh: nếu $n\times m=0$ thì $n=0$ hoặc $m=0$.
&> Giả sử $n\ne0$ và $m\ne0$; khi đó $n=n'{+}{+}$, nên $n\times m=n'\times m+m$.
&> Vì $m$ dương nên $n'\times m+m$ dương (tổng của một số và một số dương là dương), mâu thuẫn với $n\times m=0$.

## 3.1
~ $A=\{1,2,3\}$, $B=\{2,3,4\}$: $A\cup B=\{1,2,3,4\}$, $A\cap B=\{2,3\}$, $A\setminus B=\{1\}$.
~ $\{\emptyset\}\ne\emptyset$: tập bên trái có **một** phần tử (là tập rỗng), tập bên phải không có phần tử nào.
~ Tiên đề đặc tả: $\{n\in\mathbb N: n \text{ chẵn}\}$. Tiên đề thay thế: $\{n^2: n\in\{1,2,3\}\}=\{1,4,9\}$.
? $\{1,\{1\}\}$ có bao nhiêu phần tử?
+ $2$
- $1$
- $3$
= Phần tử $1$ và phần tử $\{1\}$ là hai đối tượng khác nhau.
? $A\cap(B\cup C)$ bằng
+ $(A\cap B)\cup(A\cap C)$
- $(A\cup B)\cap C$
- $A\cup(B\cap C)$
= Luật phân phối của giao đối với hợp.
? Nếu $A\subseteq B$ và $B\subseteq A$ thì
+ $A=B$
- $A\subsetneq B$
- chưa kết luận được
= Đây là cách chuẩn để chứng minh hai tập bằng nhau.
? $A\setminus(A\setminus B)$ bằng
+ $A\cap B$
- $B$
- $\emptyset$
= Bỏ khỏi $A$ các phần tử không thuộc $B$, còn lại các phần tử của $A$ thuộc $B$.
& Chứng minh luật De Morgan $X\setminus(A\cup B)=(X\setminus A)\cap(X\setminus B)$.
&> ($\subseteq$) Lấy $x\in X\setminus(A\cup B)$: $x\in X$ và $x\notin A\cup B$, nên $x\notin A$ và $x\notin B$. Vậy $x\in X\setminus A$ và $x\in X\setminus B$.
&> ($\supseteq$) Lấy $x$ thuộc cả $X\setminus A$ lẫn $X\setminus B$: $x\in X$, $x\notin A$, $x\notin B$, nên $x\notin A\cup B$.
&> Hai bao hàm cho đẳng thức.
& Chứng minh: $A\subseteq B$ khi và chỉ khi $A\cup B=B$.
&> ($\Rightarrow$) Luôn có $B\subseteq A\cup B$. Ngược lại, $x\in A\cup B$ thì $x\in A\subseteq B$ hoặc $x\in B$; cả hai trường hợp $x\in B$.
&> ($\Leftarrow$) Mọi $x\in A$ thuộc $A\cup B=B$.

## 3.2
~ Câu "Câu này sai" cũng là một vòng tự tham chiếu: nếu nó đúng thì nó sai, nếu sai thì nó đúng.
~ Với tiên đề đặc tả, ta chỉ tạo được $\{x\in A: x\notin x\}$ bên trong một tập $A$ có sẵn. Tập này không chứa chính nó, và không có mâu thuẫn: nó đơn giản không thuộc $A$.
? Hệ quả của nghịch lý Russell là
+ không tồn tại "tập của mọi tập"
- tập rỗng không tồn tại
- mọi tập đều hữu hạn
= Nếu có tập $U$ chứa mọi tập, dùng đặc tả trên $U$ sẽ tạo lại $\Omega$ và mâu thuẫn.
? Tiên đề chính quy (nền tảng) ngăn chặn điều gì?
+ Một tập là phần tử của chính nó, $x\in x$
- Tập rỗng
- Hợp của hai tập
= Mọi tập khác rỗng có phần tử "tối thiểu" theo quan hệ $\in$.
? Trong lý thuyết tập hợp hiện đại, ta tạo tập con bằng
+ $\{x\in A: P(x)\}$ với $A$ là tập có sẵn
- $\{x: P(x)\}$ với $P$ bất kỳ
- liệt kê, kể cả với tập vô hạn
= Đây là tiên đề đặc tả (separation).
& Giả sử có tập $U$ chứa mọi tập. Suy ra mâu thuẫn.
&> Theo tiên đề đặc tả, $\Omega=\{x\in U: x\notin x\}$ là một tập. Vì $U$ chứa mọi tập, $\Omega\in U$.
&> Nếu $\Omega\in\Omega$ thì theo định nghĩa $\Omega\notin\Omega$; nếu $\Omega\notin\Omega$ thì (vì $\Omega\in U$) $\Omega\in\Omega$. Mâu thuẫn.

## 3.3
~ $f:\mathbb R\to\mathbb R$, $f(x)=2x+1$ là song ánh, hàm ngược $f^{-1}(y)=\frac{y-1}2$.
~ $\exp:\mathbb R\to\mathbb R$ đơn ánh nhưng không toàn ánh (không nhận giá trị âm); $\exp:\mathbb R\to(0,\infty)$ là song ánh. Đối miền là một phần của hàm.
~ Hàm rỗng $\emptyset\to Y$ tồn tại và duy nhất với mọi $Y$, và nó đơn ánh.
? Nếu $f$ và $g$ đều song ánh thì $g\circ f$
+ song ánh, với $(g\circ f)^{-1}=f^{-1}\circ g^{-1}$
- song ánh, với $(g\circ f)^{-1}=g^{-1}\circ f^{-1}$
- chưa chắc song ánh
= "Cởi giày trước, cởi tất sau": thứ tự đảo ngược.
? Nếu $g\circ f$ toàn ánh thì
+ $g$ toàn ánh
- $f$ toàn ánh
- cả hai toàn ánh
= Mọi $z$ có dạng $g(f(x))$, nên $z$ nằm trong ảnh của $g$.
? $f:\{1,2,3\}\to\{a,b\}$ có thể là
+ toàn ánh nhưng không đơn ánh
- đơn ánh
- song ánh
= Miền có nhiều phần tử hơn đối miền nên không đơn ánh được.
? Hai hàm $f(x)=x$ trên $\mathbb R$ và $g(x)=\frac{x^2}{x}$ có bằng nhau không?
+ Không, vì $g$ không xác định tại $0$, miền khác nhau
- Có
= Hai hàm bằng nhau cần cùng miền.
& Chứng minh: $f:X\to Y$ là song ánh khi và chỉ khi có $g:Y\to X$ với $g\circ f=\mathrm{id}_X$ và $f\circ g=\mathrm{id}_Y$.
&> ($\Rightarrow$) Với mỗi $y$ có duy nhất $x$ với $f(x)=y$; đặt $g(y)=x$. Khi đó $g(f(x))=x$ và $f(g(y))=y$.
&> ($\Leftarrow$) Nếu $f(x)=f(x')$ thì $x=g(f(x))=g(f(x'))=x'$: đơn ánh. Với $y\in Y$, $f(g(y))=y$: toàn ánh.
& Cho $f(x)=x^2$ từ $[0,\infty)$ vào $[0,\infty)$. Chứng minh $f$ song ánh.
&> Đơn ánh: nếu $x^2=x'^2$ với $x,x'\ge0$ thì $(x-x')(x+x')=0$. Nếu $x+x'=0$ thì $x=x'=0$; ngược lại $x=x'$.
&> Toàn ánh: với $y\ge0$, $x=\sqrt y\ge0$ thoả $x^2=y$ (sự tồn tại của căn bậc hai được chứng minh ở 5.5–5.6).

## 3.4
~ $f(x)=x^2$, $f([-1,2])=[0,4]$ và $f^{-1}([1,4])=[-2,-1]\cup[1,2]$.
~ $f(x)=\sin x$: $f^{-1}(\{0\})=\{k\pi: k\in\mathbb Z\}$.
~ Tập luỹ thừa: $2^{\{1,2\}}=\{\emptyset,\{1\},\{2\},\{1,2\}\}$ có $4=2^2$ phần tử.
? Luôn có $f^{-1}(f(S))$ so với $S$ là
+ $f^{-1}(f(S))\supseteq S$
- $f^{-1}(f(S))=S$
- $f^{-1}(f(S))\subseteq S$
= Bằng nhau khi $f$ đơn ánh. Với $f(x)=x^2$, $S=\{1\}$: $f^{-1}(f(S))=\{-1,1\}$.
? Luôn có $f(f^{-1}(U))$ so với $U$ là
+ $f(f^{-1}(U))\subseteq U$
- $f(f^{-1}(U))=U$
- $f(f^{-1}(U))\supseteq U$
= Bằng nhau khi $f$ toàn ánh.
? $f^{-1}(Y\setminus U)$ bằng
+ $X\setminus f^{-1}(U)$
- $Y\setminus f^{-1}(U)$
- $f^{-1}(U)$
= Ảnh ngược giữ phần bù.
? $|2^X|$ với $|X|=5$ là
+ $32$
- $25$
- $10$
= Mỗi phần tử được chọn hoặc không: $2^5$.
& Chứng minh $f(A\cup B)=f(A)\cup f(B)$.
&> ($\subseteq$) $y\in f(A\cup B)$ thì $y=f(x)$ với $x\in A$ hoặc $x\in B$, nên $y\in f(A)$ hoặc $y\in f(B)$.
&> ($\supseteq$) $y\in f(A)$ thì $y=f(x)$, $x\in A\subseteq A\cup B$. Tương tự với $f(B)$.
& Chứng minh: nếu $f$ đơn ánh thì $f(A\cap B)=f(A)\cap f(B)$.
&> Chiều $\subseteq$ luôn đúng. Ngược lại, lấy $y\in f(A)\cap f(B)$: $y=f(a)=f(b)$ với $a\in A$, $b\in B$.
&> Vì $f$ đơn ánh, $a=b\in A\cap B$, nên $y\in f(A\cap B)$.

## 3.5
~ $\{1,2\}\times\{a,b,c\}=\{(1,a),(1,b),(1,c),(2,a),(2,b),(2,c)\}$, có $6$ phần tử.
~ $\mathbb R^2=\mathbb R\times\mathbb R$ là mặt phẳng; $[0,1]\times[0,1]$ là hình vuông đơn vị.
~ $X\times\emptyset=\emptyset$ với mọi $X$.
? $(1,2)=(2,1)$?
+ Sai, cặp có thứ tự
- Đúng
= $(x,y)=(x',y')$ khi và chỉ khi $x=x'$ và $y=y'$.
? $A\times(B\cup C)$ bằng
+ $(A\times B)\cup(A\times C)$
- $(A\times B)\cap(A\times C)$
- $A\times B\times C$
= Tích Descartes phân phối với hợp.
? Số hàm từ $\{1,2,3\}$ vào $\{0,1\}$ là
+ $8$
- $6$
- $9$
= $|Y|^{|X|}=2^3$.
& Chứng minh $(A\times B)\cap(C\times D)=(A\cap C)\times(B\cap D)$.
&> $(x,y)$ thuộc vế trái khi và chỉ khi $x\in A$, $y\in B$, $x\in C$, $y\in D$, tức $x\in A\cap C$ và $y\in B\cap D$.
& Có phải $(A\times B)\cup(C\times D)=(A\cup C)\times(B\cup D)$ luôn đúng?
&> Không. Lấy $A=B=\{1\}$, $C=D=\{2\}$: vế trái $\{(1,1),(2,2)\}$, vế phải có thêm $(1,2)$ và $(2,1)$.

## 3.6
~ $\{a,b,c\}$ và $\{1,2,3\}$ có cùng lực lượng qua song ánh $a\mapsto1$, $b\mapsto2$, $c\mapsto3$.
~ Trong 13 người luôn có 2 người sinh cùng tháng (13 bồ câu, 12 chuồng).
~ Số tập con có $k$ phần tử của tập $n$ phần tử là $\binom nk$; tổng theo $k$ là $2^n$.
? Với $A,B$ hữu hạn bất kỳ, $|A\cup B|$ bằng
+ $|A|+|B|-|A\cap B|$
- $|A|+|B|$
- $\max(|A|,|B|)$
= Nguyên lý bù trừ; khi rời nhau thì $|A\cap B|=0$.
? Nếu có đơn ánh $X\to Y$ với $X,Y$ hữu hạn thì
+ $|X|\le|Y|$
- $|X|=|Y|$
- $|X|\ge|Y|$
= Ảnh của $X$ là tập con của $Y$ có $|X|$ phần tử.
? Có bao nhiêu song ánh từ $\{1,2,3,4\}$ vào chính nó?
+ $24$
- $16$
- $256$
= Số hoán vị $4!=24$.
? Tập con thực sự của tập hữu hạn $X$ có lực lượng
+ nhỏ hơn hẳn $|X|$
- có thể bằng $|X|$
= Với tập vô hạn thì có thể bằng (ví dụ số chẵn trong $\mathbb N$), nhưng với tập hữu hạn thì không.
& Chứng minh trong $n+1$ số nguyên bất kỳ, có hai số có hiệu chia hết cho $n$.
&> Có $n$ số dư khi chia cho $n$ (từ $0$ đến $n-1$). Với $n+1$ số, theo chuồng bồ câu có hai số cùng số dư.
&> Hiệu của hai số cùng số dư chia hết cho $n$.
& Chứng minh $|2^X|=2^{|X|}$ với $X$ hữu hạn.
&> Quy nạp theo $n=|X|$. Với $X=\emptyset$: $2^\emptyset=\{\emptyset\}$ có $1=2^0$ phần tử.
&> Nếu $X=X'\cup\{x\}$ với $|X'|=n$: mỗi tập con của $X$ là $S$ hoặc $S\cup\{x\}$ với $S\subseteq X'$, hai họ rời nhau mỗi họ $2^n$ tập. Tổng $2^{n+1}$.

## 4.1
~ $(3{-}{-}5)+(2{-}{-}1)=5{-}{-}6$, tức $(-2)+1=-1$.
~ $(3{-}{-}5)(2{-}{-}1)=(6+5){-}{-}(3+10)=11{-}{-}13$, tức $(-2)\cdot1=-2$.
~ Phép trừ: $x-y:=x+(-y)$, với $-(a{-}{-}b):=b{-}{-}a$.
? $-(4{-}{-}9)$ bằng
+ $9{-}{-}4$
- $-4{-}{-}9$
- $4{-}{-}9$
= Số đối đổi chỗ hai thành phần.
? Vì sao phải kiểm tra phép cộng số nguyên "định nghĩa tốt"?
+ Vì một số nguyên có nhiều cách viết $a{-}{-}b$
- Vì phép cộng có thể không giao hoán
- Không cần kiểm tra
= Ví dụ $3{-}{-}5=0{-}{-}2$; kết quả cộng không được phụ thuộc vào cách viết.
? Nếu $xy=0$ với $x,y$ nguyên thì
+ $x=0$ hoặc $y=0$
- $x=-y$
- $x=y=0$
= $\mathbb Z$ không có ước của không.
? Có số nguyên $n$ nào với $0<n<1$ không?
+ Không
- Có, $n=1/2$
= $1/2$ không phải số nguyên; giữa $0$ và $1$ không có số nguyên nào.
& Kiểm tra phép nhân định nghĩa tốt: nếu $a{-}{-}b=a'{-}{-}b'$ thì $(a{-}{-}b)(c{-}{-}d)=(a'{-}{-}b')(c{-}{-}d)$.
&> Giả thiết: $a+b'=a'+b$. Cần: $(ac+bd)+(a'd+b'c)=(a'c+b'd)+(ad+bc)$.
&> Nhóm lại: vế trái $=c(a+b')+d(a'+b)$, vế phải $=c(a'+b)+d(a+b')$. Thay $a+b'=a'+b$ vào cả hai, chúng cùng bằng $c(a'+b)+d(a'+b)$.
& Chứng minh $(-1)\cdot x=-x$ với mọi số nguyên $x$.
&> $-1=0{-}{-}1$. Với $x=a{-}{-}b$: $(0{-}{-}1)(a{-}{-}b)=(0\cdot a+1\cdot b){-}{-}(0\cdot b+1\cdot a)=b{-}{-}a=-x$.

## 4.2
~ $\frac12+\frac13$: $(1//2)+(1//3)=(1\cdot3+2\cdot1)//(2\cdot3)=5//6$.
~ Giữa $\frac13$ và $\frac12$ có $\frac{5}{12}$ (trung bình), giữa $\frac13$ và $\frac5{12}$ có $\frac{3}{8}$… luôn tìm được thêm.
~ Nghịch đảo: $(a//b)^{-1}=b//a$ khi $a\ne0$.
? Phép cộng hữu tỉ được định nghĩa là
+ $(a//b)+(c//d)=(ad+bc)//(bd)$
- $(a+c)//(b+d)$
- $(ac)//(bd)$
= Lựa chọn thứ hai là "cộng sai" quen thuộc, không định nghĩa tốt.
? Thứ tự trên $\mathbb Q$: $x>y$ khi
+ $x-y$ là số hữu tỉ dương
- $x$ có tử số lớn hơn
- $x$ có mẫu số nhỏ hơn
= Số hữu tỉ dương có dạng $a/b$ với $a,b$ nguyên dương.
? Giữa hai số hữu tỉ khác nhau có bao nhiêu số hữu tỉ?
+ Vô hạn
- Hữu hạn
- Có thể không có
= Lặp lại phép lấy trung bình.
? $\frac{1}{2}<\frac{2}{3}$ vì
+ $\frac23-\frac12=\frac16>0$
- $1<2$
- $2<3$
= So sánh qua hiệu.
& Chứng minh $\mathbb Q$ có tính Archimedes: với $x>0$ hữu tỉ, có $n$ tự nhiên để $n>x$.
&> Viết $x=a/b$ với $a,b$ nguyên dương. Chọn $n=a+1$: $n-x=\frac{(a+1)b-a}{b}=\frac{ab+b-a}{b}\ge\frac{b}{b}>0$ (vì $ab\ge a$).
& Chứng minh: nếu $0<x<y$ hữu tỉ thì $\frac1y<\frac1x$.
&> $\frac1x-\frac1y=\frac{y-x}{xy}$. Tử và mẫu đều dương nên hiệu dương.

## 4.3
~ $|{-3}|=3$; $|x-y|$ là khoảng cách giữa $x$ và $y$ trên trục số.
~ $|x|\le a$ tương đương $-a\le x\le a$. Ví dụ $|x-2|\le 0{,}5$ tương đương $x\in[1{,}5;\ 2{,}5]$.
~ $2^{-3}=\frac18$; $(2^3)(2^{-1})=2^2$.
? $|x-3|<1$ tương đương
+ $2<x<4$
- $x<4$
- $-2<x<4$
= $-1<x-3<1$.
? Bất đẳng thức tam giác ngược: $\big||x|-|y|\big|$ so với $|x-y|$ là
+ $\le$
- $\ge$
- $=$
= Suy ra từ $|x|=|(x-y)+y|\le|x-y|+|y|$ và tương tự.
? Nếu $|x-y|\le\varepsilon$ với mọi $\varepsilon>0$ (hữu tỉ) thì
+ $x=y$
- $x\le y$
- không kết luận được
= Nếu $x\ne y$, chọn $\varepsilon=|x-y|/2$.
? $(xy)^n$ bằng
+ $x^ny^n$
- $x^ny$
- $(x^n)^y$
= Tính chất luỹ thừa nguyên.
& Chứng minh $|xy|=|x||y|$.
&> Xét dấu. Nếu $x,y\ge0$: $xy\ge0$ nên $|xy|=xy=|x||y|$.
&> Nếu $x\ge0>y$: $xy\le0$, $|xy|=-xy=x(-y)=|x||y|$. Các trường hợp còn lại tương tự.
& Chứng minh: nếu $x$ và $y$ là $\varepsilon$-gần, $z\ne0$ thì $xz$ và $yz$ là $\varepsilon|z|$-gần.
&> $|xz-yz|=|x-y||z|\le\varepsilon|z|$.

## 4.4
~ $\sqrt3$ cũng không hữu tỉ: nếu $p^2=3q^2$ thì $3\mid p$, viết $p=3k$, được $3k^2=q^2$, nên $3\mid q$, mâu thuẫn tối giản.
~ $\log_2 3$ không hữu tỉ: nếu $2^{p/q}=3$ thì $2^p=3^q$, nhưng vế trái chẵn, vế phải lẻ.
~ Phần nguyên: mỗi $x$ hữu tỉ có duy nhất số nguyên $n$ với $n\le x<n+1$.
? Tập $\{x\in\mathbb Q: x^2<2\}$ trong $\mathbb Q$
+ bị chặn trên nhưng không có cận trên nhỏ nhất hữu tỉ
- không bị chặn
- có sup bằng $1{,}5$
= $\mathbb Q$ thiếu tính chất cận trên đúng.
? $\sqrt 2+\sqrt 2$ là
+ vô tỉ
- hữu tỉ
= Nếu $2\sqrt2=r$ hữu tỉ thì $\sqrt2=r/2$ hữu tỉ, vô lý.
? Tổng của hai số vô tỉ
+ có thể hữu tỉ, ví dụ $\sqrt2+(-\sqrt2)=0$
- luôn vô tỉ
= Tập số vô tỉ không đóng với phép cộng.
? Phần nguyên của $-2{,}5$ là
+ $-3$
- $-2$
- $2$
= $-3\le-2{,}5<-2$.
& Chứng minh $\sqrt2$ không hữu tỉ bằng "lùi vô hạn".
&> Giả sử $\sqrt2=p/q$ với $p,q$ nguyên dương. Khi đó $p^2=2q^2$, nên $p$ chẵn, $p=2p'$, được $2p'^2=q^2$, nên $q$ chẵn.
&> Vậy $(q,p')$ với $q<p$ cũng thoả $q^2=2p'^2$. Lặp lại vô hạn được dãy số tự nhiên giảm ngặt, vô lý.
& Chứng minh: với mọi $\varepsilon>0$ hữu tỉ có $x$ hữu tỉ với $x^2<2<(x+\varepsilon)^2$.
&> Giả sử không: khi đó với mọi $x\ge0$ có $x^2<2$ thì $(x+\varepsilon)^2<2$ (không thể $=2$).
&> Bắt đầu từ $x=0$, suy ra $(n\varepsilon)^2<2$ với mọi $n$, mâu thuẫn tính Archimedes (chọn $n\varepsilon>2$).
`);
