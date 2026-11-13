/* Nội dung Giải tích I — viết riêng theo cấu trúc mục lục, không chép văn bản sách.
   Cú pháp: "# chương | tên | trang", "## mục | tên | trang", "@pre", "@w widget k=v",
   "| đoạn văn", "* gạch đầu dòng", "! Nhãn :: phát biểu", "~ ví dụ",
   "? câu hỏi", "- đáp án sai", "+ đáp án đúng", "= giải thích". */
window.PART_1 = String.raw`
# 1 | Mở đầu: giải tích là gì | 15
> Giải tích nghiên cứu điều gì, và vì sao phải chứng minh chặt chẽ cả những điều tưởng hiển nhiên.

## 1.1 | Giải tích là gì? | 15
| Giải tích nghiên cứu số thực, dãy, chuỗi, hàm số và các phép toán giới hạn đi kèm: đạo hàm, tích phân. Khác với "giải tích tính toán" ở phổ thông, ở đây ta hỏi **tại sao** công thức đúng và **khi nào** nó đúng.
| Mỗi định lý đều có điều kiện. Bỏ một điều kiện nhỏ, kết luận có thể sai hoàn toàn. Học giải tích là học cách nhìn thấy các điều kiện đó.
! Tinh thần :: Mọi khẳng định phải được suy ra từ định nghĩa và các định lý đã chứng minh trước, không dựa vào trực giác hình vẽ.
? Theo tinh thần của giải tích, điều gì quan trọng nhất khi dùng một định lý?
- Nhớ đúng công thức
+ Kiểm tra các giả thiết của định lý có thoả mãn không
- Vẽ hình minh hoạ
= Định lý chỉ đúng khi mọi giả thiết của nó được thoả. Hình vẽ giúp gợi ý, không thay được chứng minh.

## 1.2 | Tại sao học Giải tích? | 16
@w swapdemo
| Nhiều thao tác quen thuộc như đổi thứ tự hai tổng, đổi giới hạn với tích phân, hay đạo hàm từng số hạng của chuỗi **không phải lúc nào cũng hợp lệ**. Giải tích cho ta tiêu chuẩn để biết khi nào được làm.
* Đổi thứ tự hai giới hạn: $\lim_{x\to 0}\lim_{y\to 0}$ có thể khác $\lim_{y\to 0}\lim_{x\to 0}$.
* Chuỗi có thể đổi tổng khi sắp xếp lại số hạng.
* Giới hạn của tích phân có thể khác tích phân của giới hạn.
! Ví dụ kinh điển :: $\displaystyle \lim_{x\to0}\lim_{y\to0}\frac{x^2}{x^2+y^2}=1$ nhưng $\displaystyle \lim_{y\to0}\lim_{x\to0}\frac{x^2}{x^2+y^2}=0$.
? Hàm $f(x,y)=\dfrac{x^2}{x^2+y^2}$ cho thấy điều gì?
- Mọi giới hạn kép đều bằng nhau
+ Thứ tự lấy giới hạn có thể làm thay đổi kết quả
- Hàm này liên tục tại $(0,0)$
= Cho $y\to0$ trước thì được $1$, cho $x\to0$ trước thì được $0$. Hai cách không đổi chỗ cho nhau được.

# 2 | Bắt đầu từ nền tảng: Các số tự nhiên | 27
> Xây dựng $\mathbb N$ chỉ từ 0 và phép "lấy số kế tiếp", rồi định nghĩa cộng, nhân.

## 2.1 | Các tiên đề Peano | 29
@w peano
| Ta không giả định đã biết số tự nhiên. Thay vào đó, ta chỉ cần: số $0$, một phép **kế tiếp** $n \mapsto n{+}{+}$, và vài tiên đề đảm bảo không có "số lạ".
| Tiên đề quy nạp là trái tim: nếu tính chất đúng với $0$ và truyền được từ $n$ sang $n{+}{+}$, thì nó đúng với mọi số tự nhiên. Hình dung một hàng domino: đổ quân đầu, và quân nào đổ cũng làm đổ quân sau.
! Tiên đề 2.1–2.2 :: $0$ là số tự nhiên; nếu $n$ là số tự nhiên thì $n{+}{+}$ cũng là số tự nhiên.
! Tiên đề 2.3 :: $0$ không là số kế tiếp của số tự nhiên nào: $n{+}{+}\neq 0$.
! Tiên đề 2.4 :: Hai số khác nhau có số kế tiếp khác nhau: $n\neq m \Rightarrow n{+}{+}\neq m{+}{+}$.
! Tiên đề 2.5 (quy nạp) :: Nếu $P(0)$ đúng và $P(n)\Rightarrow P(n{+}{+})$ với mọi $n$, thì $P(n)$ đúng với mọi $n$.
~ Nếu thiếu Tiên đề 2.4, hệ $\{0,1,2,3\}$ với $3{+}{+}=1$ vẫn thoả các tiên đề còn lại. Tiên đề 2.4 loại bỏ kiểu "vòng lặp" đó.
? Bỏ bước kiểm tra $P(0)$ thì điều gì xảy ra?
- Chứng minh vẫn đúng
+ Có thể "chứng minh" sai điều như $n = n+1$, vì bước truyền vẫn đúng một cách rỗng
- Chỉ sai với $n=0$
= Với $P(n): n=n+1$, nếu $P(n)$ đúng thì $P(n+1)$ đúng. Bước truyền hợp lệ, nhưng không có quân domino đầu tiên đổ.
? Tiên đề nào ngăn $\mathbb N$ "quay vòng" về $0$?
+ Tiên đề 2.3
- Tiên đề 2.1
- Tiên đề 2.5
= $0$ không là số kế tiếp của ai, nên dãy $0,1,2,\dots$ không thể quay về $0$.

## 2.2 | Phép cộng (Addition) | 39
@pre 2.1
| Phép cộng được định nghĩa **đệ quy**: $0+m:=m$ và $(n{+}{+})+m:=(n+m){+}{+}$. Cộng $n$ vào $m$ nghĩa là lấy kế tiếp $n$ lần.
| Mọi tính chất quen thuộc (giao hoán, kết hợp, luật giản ước) đều phải chứng minh bằng quy nạp từ định nghĩa này. Từ phép cộng ta định nghĩa thứ tự: $n\le m$ khi $m=n+a$ với $a$ tự nhiên nào đó.
! Định nghĩa 2.2.1 :: $0+m:=m$, $(n{+}{+})+m := (n+m){+}{+}$.
! Mệnh đề :: Phép cộng giao hoán $n+m=m+n$, kết hợp $(a+b)+c=a+(b+c)$, và có luật giản ước: $a+b=a+c \Rightarrow b=c$.
! Định nghĩa thứ tự :: $n\ge m$ nếu $n=m+a$ với số tự nhiên $a$ nào đó; $n>m$ nếu thêm $n\neq m$.
~ Tính $2+3$: $2+3=(1{+}{+})+3=(1+3){+}{+}=((0+3){+}{+}){+}{+}=(3{+}{+}){+}{+}=5$.
? Để chứng minh $n+0=n$ ta làm thế nào?
- Dùng trực tiếp định nghĩa
+ Quy nạp theo $n$
- Không cần chứng minh, vì là tiên đề
= Định nghĩa chỉ cho $0+m=m$. Chiều $n+0=n$ phải chứng minh bằng quy nạp theo $n$.

## 2.3 | Phép nhân | 46
@pre 2.2
| Phép nhân là phép cộng lặp lại: $0\times m:=0$ và $(n{+}{+})\times m := (n\times m)+m$. Tương tự, luỹ thừa là phép nhân lặp lại.
! Định nghĩa :: $0\times m := 0$, $(n{+}{+})\times m := n\times m + m$.
! Mệnh đề :: Phép nhân giao hoán, kết hợp, phân phối với phép cộng; nếu $n\times m=0$ thì $n=0$ hoặc $m=0$.
! Thuật chia Euclid :: Với $n$ tự nhiên và $q>0$, tồn tại duy nhất $m, r$ sao cho $0\le r<q$ và $n = mq + r$.
? Phép nhân được xây dựng từ đâu?
+ Từ phép cộng, bằng đệ quy
- Từ phép trừ
- Là một tiên đề Peano
= $(n{+}{+})\times m = n\times m + m$: nhân là cộng lặp lại.

# 3 | Lý thuyết tập hợp | 50
> Ngôn ngữ chung của toán học: tập hợp, hàm số, ảnh, tích Descartes và lực lượng.

## 3.1 | Các khái niệm cơ bản | 50
@w venn
| Tập hợp là một bộ sưu tập các đối tượng, gọi là phần tử. Hai tập bằng nhau khi có **đúng cùng** phần tử. Thứ tự và lặp lại không quan trọng: $\{1,2\}=\{2,1,1\}$.
| Các phép toán: hợp $A\cup B$, giao $A\cap B$, hiệu $A\setminus B$. Tiên đề đặc tả cho phép tạo tập con $\{x\in A: P(x)\}$; tiên đề thay thế cho phép tạo $\{f(x): x\in A\}$.
! Bằng nhau :: $A=B$ khi mọi phần tử của $A$ thuộc $B$ và ngược lại.
! Tập con :: $A\subseteq B$ khi mọi $x\in A$ đều thuộc $B$.
! Luật De Morgan :: $X\setminus(A\cup B)=(X\setminus A)\cap(X\setminus B)$ và $X\setminus(A\cap B)=(X\setminus A)\cup(X\setminus B)$.
? $\{1,2,2,3\}$ có bao nhiêu phần tử?
- 4
+ 3
- 2
= Lặp lại không tính: tập là $\{1,2,3\}$.
? $\emptyset \subseteq A$ đúng với tập $A$ nào?
+ Mọi tập $A$
- Chỉ khi $A$ rỗng
- Chỉ khi $A$ hữu hạn
= "Mọi phần tử của $\emptyset$ thuộc $A$" đúng một cách rỗng.

## 3.2 | Nghịch lý Russell (Tùy chọn) | 67
@pre 3.1
| Nếu cho phép tạo "tập của mọi tập thoả tính chất $P$" một cách tuỳ ý, ta gặp mâu thuẫn. Xét $\Omega=\{x: x\notin x\}$. Hỏi $\Omega\in\Omega$?
* Nếu $\Omega\in\Omega$ thì theo định nghĩa $\Omega\notin\Omega$.
* Nếu $\Omega\notin\Omega$ thì $\Omega$ thoả điều kiện nên $\Omega\in\Omega$.
| Lối ra: chỉ được tạo tập con bên trong một tập đã có (tiên đề đặc tả), và thêm tiên đề chính quy.
! Nghịch lý :: "Tập của mọi tập không chứa chính nó" không thể tồn tại.
~ Phiên bản đời thường: người thợ cạo cạo râu cho đúng những ai không tự cạo. Vậy ai cạo râu cho thợ cạo?
? Nghịch lý Russell cho thấy điều gì?
- Lý thuyết tập hợp là vô dụng
+ Không thể tạo tập từ một tính chất bất kỳ mà không có giới hạn
- Mọi tập đều chứa chính nó
= Cách khắc phục là chỉ cho phép tạo tập con của một tập đã có.

## 3.3 | Hàm số (Functions) | 70
@pre 3.1
@w setmap
| Hàm $f: X\to Y$ gán cho **mỗi** $x\in X$ **đúng một** $f(x)\in Y$. Hai hàm bằng nhau khi cùng miền, cùng đối miền và cùng giá trị tại mọi điểm.
| Ba tính chất quan trọng: đơn ánh (không có hai $x$ chung ảnh), toàn ánh (mọi $y$ đều được chạm tới), song ánh (cả hai, nên có hàm ngược).
! Đơn ánh :: $f(x)=f(x') \Rightarrow x=x'$.
! Toàn ánh :: Với mọi $y\in Y$ có $x\in X$ để $f(x)=y$.
! Song ánh :: Vừa đơn ánh vừa toàn ánh; khi đó tồn tại $f^{-1}: Y\to X$.
! Hợp thành :: $(g\circ f)(x)=g(f(x))$; hợp thành có tính kết hợp.
~ $f:\mathbb Z\to\mathbb Z$, $f(n)=n^2$ không đơn ánh ($f(-1)=f(1)$), không toàn ánh ($2$ không là bình phương).
? $f:\mathbb R\to[0,\infty)$, $f(x)=x^2$ là
- Đơn ánh
+ Toàn ánh nhưng không đơn ánh
- Song ánh
= Mọi số $\ge0$ đều là bình phương nên toàn ánh; $f(-2)=f(2)$ nên không đơn ánh.
? Nếu $g\circ f$ đơn ánh thì
+ $f$ đơn ánh
- $g$ đơn ánh
- Cả hai đều đơn ánh
= Nếu $f(x)=f(x')$ thì $g(f(x))=g(f(x'))$, kéo theo $x=x'$. Còn $g$ có thể không đơn ánh.

## 3.4 | Ảnh và Ảnh nghịch đảo | 81
@pre 3.3
@w setmap mode=image
| Ảnh $f(S)=\{f(x):x\in S\}$ là nơi tập $S$ "rơi xuống". Ảnh nghịch đảo $f^{-1}(U)=\{x: f(x)\in U\}$ là những điểm "rơi vào" $U$. Ảnh nghịch đảo luôn định nghĩa được, kể cả khi $f$ không có hàm ngược.
| Ảnh nghịch đảo giữ mọi phép toán tập hợp; ảnh thì không giữ giao.
! Tính chất :: $f^{-1}(U\cup V)=f^{-1}(U)\cup f^{-1}(V)$, $f^{-1}(U\cap V)=f^{-1}(U)\cap f^{-1}(V)$.
! Chỉ có bao hàm :: $f(A\cap B)\subseteq f(A)\cap f(B)$, có thể không bằng.
! Tập luỹ thừa :: $2^X$ là tập mọi tập con của $X$; hợp $\bigcup$ của một họ tập.
~ $f(x)=x^2$, $A=\{-1\}$, $B=\{1\}$: $f(A\cap B)=\emptyset$ nhưng $f(A)\cap f(B)=\{1\}$.
? Với $f(x)=x^2$ trên $\mathbb R$, $f^{-1}(\{4\})$ là
- $\{2\}$
+ $\{-2,2\}$
- $\{16\}$
= Những $x$ có $x^2=4$.

## 3.5 | Tích Descartes (Cartesian Products) | 86
@pre 3.3
@w cartesian
| $X\times Y$ là tập các cặp có thứ tự $(x,y)$. Đồ thị của hàm $f:X\to Y$ là một tập con của $X\times Y$ mà mỗi "cột" $x$ chứa đúng một điểm.
! Định nghĩa :: $X\times Y=\{(x,y): x\in X, y\in Y\}$, với $(x,y)=(x',y')$ khi và chỉ khi $x=x'$ và $y=y'$.
! Tích $n$ tập :: $\prod_{i=1}^n X_i$ gồm các bộ $(x_1,\dots,x_n)$; $X^n$ là tích $n$ lần của $X$.
! Lực lượng :: Nếu $|X|=m$, $|Y|=n$ thì $|X\times Y|=mn$.
? Tập con nào của $\{1,2\}\times\{a,b\}$ là đồ thị của một hàm $\{1,2\}\to\{a,b\}$?
+ $\{(1,a),(2,a)\}$
- $\{(1,a),(1,b)\}$
- $\{(1,a)\}$
= Mỗi phần tử của miền phải xuất hiện đúng một lần ở vị trí đầu.

## 3.6 | Lực lượng của tập hợp (Cardinality of Sets) | 95
@pre 3.3
@w pigeon
| Hai tập có **cùng lực lượng** khi có song ánh giữa chúng. Với tập hữu hạn, đó là "cùng số phần tử". Ta không đếm mà **ghép đôi**.
! Định nghĩa :: $|X|=n$ khi có song ánh $X \to \{1,\dots,n\}$.
! Nguyên lý chuồng bồ câu :: Nếu $|X|>|Y|$ hữu hạn thì không có đơn ánh $X\to Y$.
! Mệnh đề :: $|X\cup Y|\le|X|+|Y|$, bằng nhau khi rời nhau; $|X\times Y|=|X||Y|$; $|Y^X|=|Y|^{|X|}$.
? $\mathbb N$ có phải tập hữu hạn?
- Có
+ Không, không có song ánh với $\{1,\dots,n\}$ nào
= Mọi tập con hữu hạn của $\mathbb N$ đều có phần tử lớn nhất, nhưng $\mathbb N$ thì không.

# 4 | Các số nguyên và số hữu tỉ | 102
> Mở rộng $\mathbb N$ thành $\mathbb Z$ (để trừ được) và $\mathbb Q$ (để chia được), rồi phát hiện $\mathbb Q$ còn "lỗ hổng".

## 4.1 | Các số nguyên | 102
@pre 2.3
@w pairs mode=int
| Số nguyên được xây như một **hiệu hình thức** $a{-}{-}b$ của hai số tự nhiên. Hai hiệu bằng nhau khi $a+d=c+b$. Ví dụ $3{-}{-}5$ và $0{-}{-}2$ cùng biểu diễn $-2$.
| Trên mặt phẳng các cặp $(a,b)$, mỗi số nguyên là một đường chéo song song.
! Định nghĩa :: $a{-}{-}b = c{-}{-}d \iff a+d=c+b$.
! Phép toán :: $(a{-}{-}b)+(c{-}{-}d)=(a+c){-}{-}(b+d)$, $(a{-}{-}b)(c{-}{-}d)=(ac+bd){-}{-}(ad+bc)$.
! Tam phân :: Mỗi số nguyên là đúng một trong: $0$, số tự nhiên dương $n$, hoặc $-n$.
? $4{-}{-}7$ bằng hiệu nào?
+ $0{-}{-}3$
- $3{-}{-}0$
- $7{-}{-}4$
= $4+3=0+7$.

## 4.2 | Các số hữu tỉ (The Rationals) | 110
@pre 4.1
@w pairs mode=rat
| Tương tự, số hữu tỉ là **thương hình thức** $a//b$ với $b\neq0$; $a//b=c//d$ khi $ad=bc$. Trên mặt phẳng, mỗi số hữu tỉ là một đường thẳng qua gốc toạ độ.
! Định nghĩa :: $a//b=c//d \iff ad=bc$ (với $b,d\neq 0$).
! Trường :: $\mathbb Q$ có cộng, nhân, số đối, nghịch đảo (khác $0$) và thứ tự tương thích.
! Trù mật :: Giữa hai số hữu tỉ $x<y$ luôn có số hữu tỉ, ví dụ $\frac{x+y}{2}$.
? $2//6 = 1//3$ vì
+ $2\cdot 3 = 6\cdot 1$
- $2+3=6-1$
- $2/6$ rút gọn
= Định nghĩa dùng phép nhân chéo, không dùng "rút gọn" (vì chưa định nghĩa phép chia).

## 4.3 | Giá trị tuyệt đối và lũy thừa (Absolute Value and Exponentiation) | 115
@pre 4.2
@w epsclose
| $|x-y|$ đo **khoảng cách** giữa hai số. Khái niệm "$\varepsilon$-gần" ($|x-y|\le\varepsilon$) là viên gạch cho mọi định nghĩa giới hạn sau này.
! Bất đẳng thức tam giác :: $|x+y|\le|x|+|y|$, do đó $d(x,z)\le d(x,y)+d(y,z)$.
! $\varepsilon$-gần :: $x,y$ là $\varepsilon$-gần nếu $|x-y|\le\varepsilon$. Nếu $x,y$ $\varepsilon$-gần và $y,z$ $\delta$-gần thì $x,z$ là $(\varepsilon+\delta)$-gần.
! Luỹ thừa nguyên :: $x^0=1$, $x^{n+1}=x^n\cdot x$, $x^{-n}=1/x^n$; $x^{n}x^{m}=x^{n+m}$.
? Nếu $|x-y|\le 0{,}1$ và $|y-z|\le0{,}2$ thì chắc chắn
+ $|x-z|\le 0{,}3$
- $|x-z|\le 0{,}1$
- $|x-z|=0{,}3$
= Bất đẳng thức tam giác.

## 4.4 | Những khoảng trống trong tập số hữu tỉ (Gaps in the Rational Numbers) | 120
@pre 4.3
@w sqrt2
| Không có số hữu tỉ nào bình phương bằng $2$. Nhưng ta có thể kẹp $\sqrt2$ bằng các số hữu tỉ ngày càng sát. $\mathbb Q$ dày đặc nhưng "thủng lỗ".
! Mệnh đề 4.4.4 :: Không có $x\in\mathbb Q$ với $x^2=2$.
! Mệnh đề :: Với mọi $\varepsilon>0$ có $x\in\mathbb Q$, $x>0$ sao cho $x^2<2<(x+\varepsilon)^2$.
! Tính Archimedes :: Với $x>0$ hữu tỉ và $y$ hữu tỉ, có $n$ tự nhiên để $nx>y$.
~ Ý chứng minh: nếu $(p/q)^2=2$ với $p,q$ nhỏ nhất, thì $p$ chẵn, kéo theo $q$ chẵn. Mâu thuẫn với tính nhỏ nhất (lùi vô hạn).
? Ý nghĩa của Mệnh đề 4.4.4 với việc xây dựng $\mathbb R$?
+ Cần một hệ số lớn hơn $\mathbb Q$ để "lấp" các khoảng trống như $\sqrt2$
- $\mathbb Q$ đã đủ cho giải tích
- $\sqrt2$ không tồn tại
= Đây là động lực của Chương 5.

# 5 | Các số thực (The Real Numbers) | 124
> Lấp các khoảng trống của $\mathbb Q$ bằng giới hạn của dãy Cauchy.

## 5.1 | Dãy Cauchy (Cauchy Sequences) | 125
@pre 4.4
@w seq mode=cauchy
| Ta chưa có $\mathbb R$ nên chưa nói "dãy hội tụ về $\sqrt2$" được. Ý tưởng: dùng tính chất **các số hạng cuối dãy tụ lại gần nhau**, không cần biết chúng tụ về đâu.
| Kéo thanh $\varepsilon$: với mỗi độ chính xác, phải có một mốc $N$ mà từ đó mọi cặp số hạng đều $\varepsilon$-gần nhau.
! $\varepsilon$-ổn định :: $(a_n)_{n\ge N}$ $\varepsilon$-ổn định nếu $|a_j-a_k|\le\varepsilon$ với mọi $j,k\ge N$.
! Dãy Cauchy :: Với mọi $\varepsilon>0$ có $N$ sao cho $(a_n)_{n\ge N}$ $\varepsilon$-ổn định.
! Mệnh đề 5.1.15 :: Mọi dãy Cauchy đều bị chặn.
~ $1;\ 1{,}4;\ 1{,}41;\ 1{,}414;\dots$ (khai triển thập phân của $\sqrt2$) là dãy Cauchy trong $\mathbb Q$ dù $\sqrt2\notin\mathbb Q$.
? Dãy $a_n=(-1)^n$ có phải dãy Cauchy?
- Có, vì nó bị chặn
+ Không, $|a_n-a_{n+1}|=2$ mãi mãi
= Bị chặn không đủ để là Cauchy.
? Dãy $a_n = 1/n$ là Cauchy vì
+ $|1/j-1/k|\le 1/N$ khi $j,k\ge N$
- Các số hạng đều dương
- Nó giảm
= Chọn $N>1/\varepsilon$.

## 5.2 | Các dãy Cauchy tương đương (Equivalent Cauchy Sequences) | 130
@pre 5.1
@w seq mode=equiv
| Có nhiều dãy cùng "nhắm" tới một chỗ, ví dụ $1{,}4;\,1{,}41;\dots$ và $1{,}5;\,1{,}42;\dots$. Ta gọi chúng **tương đương** khi hiệu của chúng tiến về $0$ theo nghĩa $\varepsilon$.
! Định nghĩa :: $(a_n)$ và $(b_n)$ tương đương nếu với mọi $\varepsilon>0$ có $N$ để $|a_n-b_n|\le\varepsilon$ với mọi $n\ge N$.
~ $a_n=1+10^{-n}$ và $b_n=1-10^{-n}$ tương đương. Sau này cả hai đều đại diện cho số $1$.
? Hai dãy tương đương thì
+ Hiệu của chúng cuối cùng nhỏ tuỳ ý
- Bằng nhau từ một chỉ số nào đó
- Có cùng số hạng đầu
= Không cần bằng nhau ở bất kỳ chỉ số nào.

## 5.3 | Xây dựng tập số thực (The Construction of the Real Numbers) | 132
@pre 5.2
| Số thực **là** một lớp các dãy Cauchy hữu tỉ tương đương, viết là $\mathrm{LIM}_{n\to\infty} a_n$. Cộng và nhân thực hiện trên từng số hạng; cần kiểm tra chúng không phụ thuộc vào đại diện được chọn.
! Định nghĩa 5.3.1 :: Số thực là $\mathrm{LIM}\,a_n$ với $(a_n)$ Cauchy hữu tỉ; $\mathrm{LIM}\,a_n=\mathrm{LIM}\,b_n$ khi hai dãy tương đương.
! Phép toán :: $\mathrm{LIM}\,a_n+\mathrm{LIM}\,b_n := \mathrm{LIM}(a_n+b_n)$, tương tự với nhân.
! Nghịch đảo :: Nếu $x\ne0$, chọn đại diện "tách khỏi 0" ($|a_n|\ge c>0$) rồi đặt $x^{-1}=\mathrm{LIM}\,a_n^{-1}$.
! Định lý :: $\mathbb R$ là một trường, chứa $\mathbb Q$ qua $q\mapsto\mathrm{LIM}\,q$.
? Vì sao phải kiểm tra phép cộng "định nghĩa tốt"?
+ Một số thực có nhiều đại diện; kết quả không được phụ thuộc vào đại diện
- Vì phép cộng có thể không giao hoán
- Để chứng minh $\mathbb R$ đếm được
= Thay $(a_n)$ bằng dãy tương đương thì $(a_n+b_n)$ cũng chỉ đổi sang dãy tương đương.

## 5.4 | Thứ tự trên tập số thực | 141
@pre 5.3
| Số thực $x$ **dương** khi có đại diện "tách khỏi 0 và dương": $a_n\ge c>0$ với mọi $n$. Từ đó định nghĩa $x<y$ khi $y-x$ dương.
! Tam phân :: Mỗi số thực là đúng một trong: dương, âm, bằng $0$.
! Tính Archimedes :: Với $x,\varepsilon>0$ thực có $n$ tự nhiên để $n\varepsilon>x$.
! Trù mật của $\mathbb Q$ :: Giữa hai số thực $x<y$ luôn có số hữu tỉ.
! Dãy không âm :: Nếu $a_n\ge0$ với mọi $n$ thì $\mathrm{LIM}\,a_n\ge 0$ (nhưng $a_n>0$ chỉ cho $\ge0$).
~ $a_n=1/n>0$ với mọi $n$ nhưng $\mathrm{LIM}\,1/n=0$. Bất đẳng thức chặt không giữ qua giới hạn.
? Nếu $a_n>0$ với mọi $n$ thì $\mathrm{LIM}\,a_n$
- $>0$
+ $\ge 0$
- có thể âm
= Ví dụ $a_n=1/n$.

## 5.5 | Tính chất cận trên đúng (Cận trên nhỏ nhất) | 147
@pre 5.4
@w supset
| Đây là điểm khác biệt quyết định giữa $\mathbb R$ và $\mathbb Q$: mọi tập khác rỗng bị chặn trên trong $\mathbb R$ đều có **cận trên nhỏ nhất** (sup).
| Trong $\mathbb Q$, tập $\{x: x^2<2\}$ bị chặn trên nhưng không có sup hữu tỉ.
! Cận trên :: $M$ là cận trên của $E$ nếu $x\le M$ với mọi $x\in E$.
! Định lý 5.5.9 :: Mọi $E\subseteq\mathbb R$ khác rỗng, bị chặn trên, có cận trên nhỏ nhất $\sup E$.
! Đặc trưng :: $M=\sup E$ khi $M$ là cận trên và với mọi $\varepsilon>0$ có $x\in E$ với $x>M-\varepsilon$.
! Hệ quả :: Tồn tại $x>0$ thực với $x^2=2$.
? $\sup\{1-1/n: n\ge1\}$ bằng
- $0$
+ $1$
- Không tồn tại
= Mọi phần tử $<1$, và gần $1$ tuỳ ý. Sup không nhất thiết thuộc tập.
? Sup của tập có phần tử lớn nhất $m$ là
+ $m$
- lớn hơn $m$
- không xác định
= Phần tử lớn nhất là cận trên và không có cận trên nào nhỏ hơn nó.

## 5.6 | Lũy thừa với số mũ là số thực, Phần I | 151
@pre 5.5
| Căn bậc $n$: $x^{1/n}:=\sup\{y\ge0: y^n\le x\}$. Từ đó định nghĩa $x^{p/q}=(x^{1/q})^p$ và kiểm tra nó không phụ thuộc cách viết phân số.
! Định nghĩa :: Với $x\ge0$, $x^{1/n}=\sup\{y\ge0:y^n\le x\}$.
! Bổ đề :: $x^{1/n}$ tồn tại, duy nhất, và $(x^{1/n})^n=x$.
! Luỹ thừa hữu tỉ :: $x^{q}x^{r}=x^{q+r}$, $(x^q)^r=x^{qr}$ với $x>0$ và $q,r\in\mathbb Q$.
? $8^{2/3}$ bằng
+ $4$
- $\frac{16}{3}$
- $2$
= $(8^{1/3})^2=2^2=4$.

# 6 | Giới hạn của dãy số (Limits of Sequences) | 156
> Có $\mathbb R$ rồi, giờ ta nói chính xác "dãy tiến về $L$" và phát triển công cụ làm việc với giới hạn.

## 6.1 | Hội tụ và các quy tắc giới hạn (Convergence and Limit Laws) | 156
@pre 5.5
@w seq mode=limit
| Dãy $(a_n)$ **hội tụ** về $L$ nếu: bạn đưa ra sai số $\varepsilon$ bao nhiêu, tôi cũng tìm được mốc $N$ để mọi số hạng sau $N$ nằm trong dải $(L-\varepsilon, L+\varepsilon)$.
| Hãy chơi trò ở trên: máy đưa ra $\varepsilon$ ngày càng nhỏ, bạn kéo $N$ để toàn bộ "đuôi dãy" nằm trong dải.
! Định nghĩa 6.1.5 :: $a_n\to L$ nếu $\forall\varepsilon>0\ \exists N\ \forall n\ge N: |a_n-L|\le\varepsilon$.
! Định lý 6.1.12 :: Trong $\mathbb R$, dãy hội tụ khi và chỉ khi nó là dãy Cauchy (tính đầy đủ).
! Quy tắc giới hạn :: Nếu $a_n\to a$, $b_n\to b$ thì $a_n\pm b_n\to a\pm b$, $a_nb_n\to ab$, $a_n/b_n\to a/b$ (khi $b\ne0$).
! Duy nhất :: Một dãy hội tụ có duy nhất một giới hạn.
~ $a_n=\frac{n}{n+1}\to1$: $|a_n-1|=\frac1{n+1}\le\varepsilon$ khi $n\ge 1/\varepsilon$.
? Trong định nghĩa hội tụ, $N$ phụ thuộc vào
+ $\varepsilon$
- $n$
- Không phụ thuộc gì
= $\varepsilon$ càng nhỏ, $N$ thường càng lớn.
? Dãy $(-1)^n$
- hội tụ về $0$
- hội tụ về $1$
+ không hội tụ
= Với $\varepsilon=0{,}5$ không có $L$ nào để mọi số hạng sau $N$ cùng nằm trong dải rộng $1$.

## 6.2 | Hệ thống số thực mở rộng | 161
@pre 6.1
| Thêm hai phần tử $+\infty$ và $-\infty$ để mọi tập đều có sup và inf: tập không bị chặn trên có $\sup=+\infty$, tập rỗng có $\sup=-\infty$.
! Định nghĩa :: $\mathbb R^* = \mathbb R\cup\{-\infty,+\infty\}$ với $-\infty<x<+\infty$ cho mọi $x$ thực.
! Định lý :: Mọi $E\subseteq\mathbb R^*$ đều có $\sup E$ và $\inf E$ trong $\mathbb R^*$.
! Lưu ý :: $\infty-\infty$, $0\cdot\infty$ không được định nghĩa.
? $\sup\emptyset$ trong $\mathbb R^*$ là
- $0$
- $+\infty$
+ $-\infty$
= Mọi phần tử của $\mathbb R^*$ đều là cận trên của $\emptyset$, nhỏ nhất là $-\infty$.

## 6.3 | Cận trên đúng và cận dưới đúng của các dãy | 164
@pre 6.2
@w seq mode=sup
| $\sup_n a_n$ là sup của tập giá trị $\{a_n\}$. Dãy **đơn điệu bị chặn thì hội tụ**: dãy tăng bị chặn trên tiến về sup của nó.
! Định nghĩa :: $\sup(a_n)_{n\ge m}=\sup\{a_n:n\ge m\}$.
! Mệnh đề 6.3.8 (hội tụ đơn điệu) :: Dãy tăng và bị chặn trên thì hội tụ, và $\lim a_n=\sup a_n$.
? Dãy tăng $a_n = 1-\frac1n$ hội tụ về
+ $\sup a_n=1$
- $a_1=0$
- $\infty$
= Hội tụ đơn điệu.

## 6.4 | Giới hạn trên, giới hạn dưới và các điểm giới hạn | 167
@pre 6.3
@w seq mode=limsup
| Với dãy dao động, xét sup của **đuôi dãy** $a_N^+=\sup_{n\ge N}a_n$. Khi $N$ tăng, $a_N^+$ giảm dần; giới hạn của nó là $\limsup$. Tương tự với $\liminf$.
| Dãy hội tụ khi và chỉ khi $\limsup=\liminf$.
! Định nghĩa :: $\limsup a_n=\inf_N\sup_{n\ge N}a_n$, $\liminf a_n=\sup_N\inf_{n\ge N}a_n$.
! Điểm giới hạn :: $c$ là điểm giới hạn nếu dãy quay lại gần $c$ vô hạn lần; $\limsup$ là điểm giới hạn lớn nhất.
! Định lý kẹp :: $a_n\le b_n\le c_n$ và $a_n,c_n\to L$ thì $b_n\to L$.
~ $a_n=(-1)^n(1+\frac1n)$: $\limsup=1$, $\liminf=-1$, không hội tụ.
? $\limsup$ của $\sin n$ là
+ $1$
- $0$
- không tồn tại
= Các giá trị $\sin n$ trù mật trong $[-1,1]$.

## 6.5 | Một số giới hạn tiêu chuẩn | 173
@pre 6.4
@w seq mode=standard
| Bộ giới hạn hay dùng, đều suy ra được từ định nghĩa và các quy tắc giới hạn.
! Giới hạn cơ bản :: $\lim \frac1{n^{1/k}}=0$; $\lim x^n=0$ nếu $|x|<1$; $\lim x^{1/n}=1$ nếu $x>0$.
! Không hội tụ :: $x^n$ phân kỳ nếu $x>1$ hoặc $x\le -1$.
? $\lim_{n\to\infty} 2^{1/n}$ bằng
+ $1$
- $2$
- $0$
= $x^{1/n}\to1$ với mọi $x>0$.

## 6.6 | Các dãy con (Subsequences) | 174
@pre 6.4
@w seq mode=subseq
| Dãy con là chọn ra các số hạng theo chỉ số tăng dần $n_1<n_2<\dots$. Dãy hội tụ thì mọi dãy con cũng hội tụ về cùng giới hạn. Điểm giới hạn chính là giới hạn của một dãy con nào đó.
! Định nghĩa :: $(b_k)$ là dãy con của $(a_n)$ nếu $b_k=a_{f(k)}$ với $f$ tăng ngặt.
! Mệnh đề 6.6.6 :: $L$ là điểm giới hạn khi và chỉ khi có dãy con hội tụ về $L$.
! Bolzano–Weierstrass :: Mọi dãy bị chặn đều có dãy con hội tụ.
? Dãy $(-1)^n$ có dãy con hội tụ về
+ Cả $1$ và $-1$
- Chỉ $0$
- Không có dãy con hội tụ
= Lấy chỉ số chẵn thì được $1$, chỉ số lẻ thì được $-1$.

## 6.7 | Lũy thừa với số mũ là số thực, Phần II | 177
@pre 6.6 5.6
@w powers
| Với $x>0$ và $\alpha$ thực, chọn dãy hữu tỉ $q_n\to\alpha$ rồi đặt $x^\alpha=\lim x^{q_n}$. Cần chứng minh giới hạn tồn tại và không phụ thuộc dãy $q_n$.
! Định nghĩa :: $x^\alpha := \lim_{n\to\infty}x^{q_n}$ với $q_n\in\mathbb Q$, $q_n\to\alpha$.
! Tính chất :: $x^{\alpha}x^{\beta}=x^{\alpha+\beta}$, $(x^\alpha)^\beta=x^{\alpha\beta}$, $(xy)^\alpha=x^\alpha y^\alpha$.
? $2^{\sqrt2}$ được định nghĩa bằng
+ giới hạn của $2^{1},2^{1.4},2^{1.41},\dots$
- $2\cdot\sqrt2$
- không định nghĩa được
= Dùng dãy hữu tỉ tiến tới $\sqrt2$.

# 7 | Chuỗi | 180
> Từ tổng hữu hạn đến tổng vô hạn, khi nào tổng vô hạn có nghĩa và khi nào được sắp xếp lại.

## 7.1 | Chuỗi hữu hạn | 180
@pre 6.1
| $\sum_{i=m}^n a_i$ được định nghĩa đệ quy. Tổng trên một tập hữu hạn $X$ dùng song ánh với $\{1,\dots,n\}$; kết quả không phụ thuộc cách đánh số.
! Tính chất :: Tuyến tính, tách đoạn $\sum_{m}^{n}+\sum_{n+1}^{p}=\sum_m^p$, đổi biến bằng song ánh.
! Fubini hữu hạn :: $\sum_{(x,y)\in X\times Y} f = \sum_{x\in X}\sum_{y\in Y}f = \sum_{y}\sum_{x}f$.
! Bất đẳng thức tam giác :: $|\sum a_i|\le\sum|a_i|$.
? Với tổng hữu hạn, đổi thứ tự hai tổng
+ luôn được phép
- chỉ được khi các số hạng dương
- không bao giờ được
= Với tổng vô hạn mới cần điều kiện.

## 7.2 | Chuỗi vô hạn | 188
@pre 7.1
@w series k=geo
| $\sum_{n=1}^\infty a_n$ là **giới hạn của tổng riêng** $S_N=\sum_{n\le N}a_n$. Nếu $S_N$ hội tụ thì chuỗi hội tụ.
! Tiêu chuẩn Cauchy :: Chuỗi hội tụ khi và chỉ khi với mọi $\varepsilon$ có $N$ để $|\sum_{n=p}^q a_n|\le\varepsilon$ khi $q\ge p\ge N$.
! Điều kiện cần :: Chuỗi hội tụ thì $a_n\to0$ (chiều ngược lại sai).
! Hội tụ tuyệt đối :: $\sum|a_n|$ hội tụ thì $\sum a_n$ hội tụ.
! Chuỗi đan dấu :: $a_n$ giảm về $0$ thì $\sum(-1)^na_n$ hội tụ.
~ $\sum \frac1n$ phân kỳ dù $\frac1n\to0$; $\sum\frac{(-1)^{n+1}}n=\ln2$ hội tụ nhưng không tuyệt đối.
? $a_n\to0$ có đủ để $\sum a_n$ hội tụ?
- Có
+ Không, ví dụ chuỗi điều hoà $\sum 1/n$
= Điều kiện cần, không đủ.

## 7.3 | Tổng của các số không âm | 193
@pre 7.2
@w series preset=p
| Với $a_n\ge0$, tổng riêng tăng, nên chuỗi hội tụ khi và chỉ khi tổng riêng bị chặn. Từ đó có tiêu chuẩn so sánh, tiêu chuẩn cô đặc Cauchy và chuỗi $p$.
! So sánh :: $0\le a_n\le b_n$ và $\sum b_n$ hội tụ thì $\sum a_n$ hội tụ.
! Cô đặc Cauchy :: Với $a_n$ giảm không âm: $\sum a_n$ hội tụ khi và chỉ khi $\sum 2^ka_{2^k}$ hội tụ.
! Chuỗi $p$ :: $\sum\frac1{n^p}$ hội tụ khi và chỉ khi $p>1$.
? $\sum \frac1{n^{1{,}01}}$
+ hội tụ
- phân kỳ
= $p=1{,}01>1$, dù hội tụ rất chậm.

## 7.4 | Hoán vị các chuỗi | 198
@pre 7.3
@w rearrange
| Chuỗi hội tụ tuyệt đối có thể sắp xếp lại tuỳ ý mà tổng không đổi. Nhưng chuỗi hội tụ **có điều kiện** (như $1-\frac12+\frac13-\dots$) có thể sắp xếp lại để ra **bất kỳ số nào** (định lý Riemann).
| Chọn đích $T$: cộng số dương đến khi vượt $T$, rồi cộng số âm đến khi xuống dưới $T$, lặp lại.
! Mệnh đề 7.4.3 :: $\sum a_n$ hội tụ tuyệt đối thì mọi hoán vị $\sum a_{f(n)}$ hội tụ về cùng tổng.
! Định lý Riemann :: Chuỗi hội tụ có điều kiện có hoán vị hội tụ về bất kỳ $L\in\mathbb R^*$ nào.
? Vì sao định lý Riemann không áp dụng cho $\sum\frac{(-1)^n}{n^2}$?
+ Vì chuỗi này hội tụ tuyệt đối
- Vì nó phân kỳ
- Vì các số hạng không giảm
= Tổng phần dương và tổng phần âm đều hữu hạn, không đủ "nhiên liệu" để kéo tới đích tuỳ ý.

## 7.5 | Tiêu chuẩn căn thức và tiêu chuẩn tỷ số | 201
@pre 7.3 6.4
@w series preset=ratio k=fact
| So sánh với cấp số nhân: nếu số hạng giảm "nhanh như" $r^n$ với $r<1$ thì chuỗi hội tụ.
! Tiêu chuẩn căn :: $\alpha=\limsup|a_n|^{1/n}$. $\alpha<1$ thì hội tụ tuyệt đối; $\alpha>1$ thì phân kỳ.
! Tiêu chuẩn tỉ số :: $\limsup\left|\frac{a_{n+1}}{a_n}\right|<1$ thì hội tụ tuyệt đối; $\liminf>1$ thì phân kỳ.
! Bổ đề :: $\liminf\frac{c_{n+1}}{c_n}\le\liminf c_n^{1/n}\le\limsup c_n^{1/n}\le\limsup\frac{c_{n+1}}{c_n}$. Tiêu chuẩn căn mạnh hơn.
? Với $\sum\frac1{n^2}$, tiêu chuẩn tỉ số cho
+ $\lim=1$: không kết luận được
- hội tụ
- phân kỳ
= Cả $\sum 1/n$ và $\sum 1/n^2$ đều có tỉ số $\to1$.

# 8 | Tập hợp vô hạn (Infinite Sets) | 206
> Có nhiều "cỡ vô hạn" khác nhau, và một tiên đề gây tranh cãi.

## 8.1 | Tính đếm được (Countability) | 206
@pre 3.6
@w hilbert
| Tập **đếm được** khi có song ánh với $\mathbb N$, nghĩa là xếp được thành một hàng $x_0,x_1,x_2,\dots$. Bất ngờ là $\mathbb Z$, $\mathbb N\times\mathbb N$, $\mathbb Q$ đều đếm được.
! Định nghĩa :: $X$ đếm được nếu $|X|=|\mathbb N|$; không quá đếm được nếu đếm được hoặc hữu hạn.
! Mệnh đề :: Mọi tập con của $\mathbb N$ là hữu hạn hoặc đếm được.
! Hệ quả 8.1.13 :: $\mathbb N\times\mathbb N$ đếm được; do đó $\mathbb Q$ đếm được.
~ Khách sạn Hilbert: phòng đầy vẫn đón thêm vô hạn khách bằng cách chuyển khách phòng $n$ sang phòng $2n$.
? $\mathbb Z$ đếm được nhờ cách xếp
+ $0,1,-1,2,-2,3,-3,\dots$
- $\dots,-2,-1,0,1,2,\dots$
- Không thể xếp
= Cách xếp xen kẽ cho song ánh với $\mathbb N$.

## 8.2 | Phép cộng trên các tập vô hạn | 213
@pre 8.1 7.4
@w qenum
| Tổng trên một tập đếm được $X$ chỉ có nghĩa khi **không phụ thuộc cách đánh số**, tức khi tổng tuyệt đối hữu hạn. Lúc đó ta có Fubini cho chuỗi kép.
! Định nghĩa :: $\sum_{x\in X}f(x)$ hội tụ tuyệt đối khi $\sup\{\sum_{x\in A}|f(x)|: A\subseteq X \text{ hữu hạn}\}<\infty$.
! Fubini cho chuỗi :: Nếu $\sum_{n,m}|a_{n,m}|<\infty$ thì $\sum_n\sum_m a_{n,m}=\sum_m\sum_n a_{n,m}$.
~ Bảng $a_{n,n}=1$, $a_{n,n+1}=-1$: tổng theo hàng là $0$, theo cột là $1$. Đổi thứ tự cho kết quả khác vì không hội tụ tuyệt đối.
? Fubini cho chuỗi kép cần điều kiện gì?
+ Hội tụ tuyệt đối
- Các số hạng giảm
- Bảng vuông
= Không có hội tụ tuyệt đối thì đổi thứ tự có thể đổi tổng.

## 8.3 | Các tập không đếm được (Uncountable Sets) | 221
@pre 8.1
@w diagonal
| Lập luận đường chéo của Cantor: cho bất kỳ danh sách nào các dãy $0/1$, ta tạo dãy mới khác dãy thứ $k$ ở vị trí $k$, nên nó không có trong danh sách.
! Định lý Cantor :: Không có song ánh giữa $X$ và $2^X$; nói riêng $2^{\mathbb N}$ không đếm được.
! Hệ quả 8.3.4 :: $\mathbb R$ không đếm được.
? Lập luận đường chéo chứng minh điều gì?
+ Mọi danh sách đếm được các dãy 0/1 đều bỏ sót ít nhất một dãy
- $\mathbb Q$ không đếm được
- $\mathbb N$ hữu hạn
= Dãy đường chéo đảo khác mọi dãy trong danh sách.

## 8.4 | Tiên đề lựa chọn (The Axiom of Choice) | 224
@pre 8.3
| Với một họ các tập khác rỗng $(X_\alpha)$, ta có thể chọn đồng thời một phần tử từ mỗi tập. Với họ hữu hạn, điều này chứng minh được; với họ vô hạn, cần tiên đề.
! Tiên đề lựa chọn :: Nếu mọi $X_\alpha\ne\emptyset$ thì $\prod_\alpha X_\alpha\ne\emptyset$.
! Hệ quả :: Có toàn ánh $X\to Y$ thì có đơn ánh $Y\to X$.
~ Russell: với vô hạn đôi giày, chọn chiếc trái là đủ. Với vô hạn đôi tất giống hệt nhau, ta cần tiên đề lựa chọn.
? Tiên đề lựa chọn cần thiết khi
+ chọn từ vô hạn tập mà không có quy tắc chọn
- chọn từ hữu hạn tập
- chọn số nhỏ nhất trong tập con của $\mathbb N$
= Với $\mathbb N$ đã có quy tắc "lấy phần tử nhỏ nhất".

## 8.5 | Các tập được sắp xếp thứ tự (Ordered Sets) | 228
@pre 8.4
| Thứ tự bộ phận: phản xạ, phản đối xứng, bắc cầu. Thứ tự toàn phần: mọi cặp so sánh được. Tập **sắp tốt**: mọi tập con khác rỗng có phần tử nhỏ nhất (như $\mathbb N$).
! Bổ đề Zorn :: Nếu mọi xích trong tập sắp thứ tự bộ phận khác rỗng $X$ có cận trên, thì $X$ có phần tử tối đại.
! Nguyên lý quy nạp mạnh :: Trên tập sắp tốt, quy nạp hoạt động như trên $\mathbb N$.
? Tập nào sắp tốt với thứ tự thông thường?
+ $\mathbb N$
- $\mathbb Z$
- $[0,1]$
= $\mathbb Z$ không có phần tử nhỏ nhất; $(0,1]\subset[0,1]$ không có phần tử nhỏ nhất.

# 9 | Các hàm liên tục trên ℝ | 237
> Giới hạn của hàm, liên tục, và ba định lý lớn: cực đại, giá trị trung gian, liên tục đều.

## 9.1 | Các tập con của trục số thực | 237
@pre 6.6
@w adherent
| Khoảng, điểm dính, tập đóng, điểm giới hạn của tập. Điểm $x$ **dính** vào $X$ nếu mọi khoảng quanh $x$ đều chạm $X$.
! Điểm dính :: $x$ dính vào $X$ nếu với mọi $\varepsilon>0$ có $y\in X$, $|x-y|\le\varepsilon$. Bao đóng $\overline X$ là tập các điểm dính.
! Tập đóng :: $X$ đóng nếu $\overline X=X$; tương đương: giới hạn của mọi dãy hội tụ trong $X$ vẫn thuộc $X$.
! Heine–Borel :: $X\subseteq\mathbb R$ đóng và bị chặn khi và chỉ khi mọi dãy trong $X$ có dãy con hội tụ về điểm thuộc $X$.
? Bao đóng của $(0,1)$ là
+ $[0,1]$
- $(0,1)$
- $\mathbb R$
= $0$ và $1$ là điểm dính.
? Điểm cô lập của $X=(0,1)\cup\{2\}$ là
+ $2$
- $0$
- $1$
= $2\in X$ nhưng có khoảng quanh $2$ không chứa điểm nào khác của $X$.

## 9.2 | Đại số của các hàm số thực | 242
@pre 9.1
| Từ hai hàm $f,g:X\to\mathbb R$ tạo ra $f+g$, $fg$, $f/g$, $\max(f,g)$, $f\circ g$. Đây là các "phép toán" mà định lý giới hạn và liên tục sẽ tương thích.
! Định nghĩa :: $(f+g)(x)=f(x)+g(x)$, $(fg)(x)=f(x)g(x)$, $(f/g)(x)=f(x)/g(x)$ khi $g(x)\ne0$.
! Lưu ý :: $f\circ g$ và $g\circ f$ thường khác nhau.
? Với $f(x)=x^2$, $g(x)=x+1$ thì $(f\circ g)(1)$ bằng
+ $4$
- $2$
- $3$
= $f(g(1))=f(2)=4$.

## 9.3 | Các giá trị giới hạn của hàm số | 245
@pre 9.2
@w epsdelta preset=limit
| $\lim_{x\to x_0}f(x)=L$: với mọi $\varepsilon$ có $\delta$ sao cho khi $x$ cách $x_0$ không quá $\delta$ (và $x\ne x_0$) thì $f(x)$ cách $L$ không quá $\varepsilon$. Giá trị $f(x_0)$ **không** liên quan.
! Định nghĩa :: $f(x)\to L$ khi $x\to x_0$ trong $E$ nếu $\forall\varepsilon>0\ \exists\delta>0$: $x\in E$, $|x-x_0|<\delta\Rightarrow|f(x)-L|\le\varepsilon$.
! Đặc trưng dãy :: $\lim_{x\to x_0}f(x)=L$ khi và chỉ khi $f(a_n)\to L$ với mọi dãy $a_n\to x_0$ trong $E$.
! Quy tắc giới hạn :: tương thích với $+,\times,/$ như với dãy.
~ $\frac{x^2-1}{x-1}\to2$ khi $x\to1$, dù hàm không xác định tại $1$.
? Giới hạn của $f$ tại $x_0$ phụ thuộc vào $f(x_0)$?
- Có
+ Không
= Chỉ các giá trị gần $x_0$ (khác $x_0$) mới quan trọng.

## 9.4 | Hàm liên tục | 251
@pre 9.3
@w epsdelta preset=cont
| $f$ **liên tục** tại $x_0$ khi $\lim_{x\to x_0}f(x)=f(x_0)$. Nói cách khác: mọi dãy $x_n\to x_0$ đều cho $f(x_n)\to f(x_0)$.
! Định nghĩa :: $\forall\varepsilon>0\ \exists\delta>0: |x-x_0|<\delta\Rightarrow|f(x)-f(x_0)|\le\varepsilon$.
! Mệnh đề :: Tổng, tích, thương, hợp thành của hàm liên tục là liên tục; đa thức liên tục.
~ Hàm bậc thang $\mathbb 1_{x\ge0}$ không liên tục tại $0$: chọn $\varepsilon=\frac12$, không $\delta$ nào đủ.
? $f(x)=x\sin(1/x)$, $f(0)=0$ liên tục tại $0$ vì
+ $|f(x)|\le|x|$, chọn $\delta=\varepsilon$
- $\sin$ liên tục
- $f(0)=0$
= Kẹp bởi $|x|$.

## 9.5 | Giới hạn bên trái và bên phải | 255
@pre 9.4
@w epsdelta preset=sided
| Tiếp cận $x_0$ chỉ từ bên phải ($x>x_0$) hoặc bên trái. $f$ liên tục tại $x_0$ khi hai giới hạn một phía tồn tại, bằng nhau và bằng $f(x_0)$.
! Định nghĩa :: $f(x_0^+)=\lim_{x\to x_0, x>x_0}f(x)$, $f(x_0^-)=\lim_{x\to x_0,x<x_0}f(x)$.
! Phân loại gián đoạn :: Nhảy (hai giới hạn khác nhau), khử được (bằng nhau nhưng khác $f(x_0)$), loại khác (giới hạn không tồn tại, như $\sin(1/x)$).
? $\mathrm{sgn}(x)$ tại $0$ có gián đoạn loại nào?
+ Nhảy: $f(0^-)=-1$, $f(0^+)=1$
- Khử được
- Liên tục
= Hai giới hạn một phía khác nhau.

## 9.6 | Nguyên lý cực đại (The Maximum Principle) | 257
@pre 9.4 9.1
@w extreme k=c
| Hàm liên tục trên đoạn **đóng, bị chặn** $[a,b]$ thì bị chặn và đạt được giá trị lớn nhất, nhỏ nhất. Bỏ "đóng" hoặc "liên tục" là có phản ví dụ.
! Bổ đề :: $f$ liên tục trên $[a,b]$ thì bị chặn.
! Định lý 9.6.7 :: $f$ liên tục trên $[a,b]$ thì có $x_{\max},x_{\min}\in[a,b]$ với $f(x_{\min})\le f(x)\le f(x_{\max})$ với mọi $x$.
~ $f(x)=1/x$ trên $(0,1]$ không bị chặn; $f(x)=x$ trên $(0,1)$ không đạt max.
? $f(x)=x^2$ trên $(0,1)$
+ không đạt giá trị lớn nhất và nhỏ nhất
- đạt max tại $1$
- không bị chặn
= $0$ và $1$ không thuộc khoảng mở.

## 9.7 | Định lý Giá trị Trung gian | 262
@pre 9.6
@w ivt
| Hàm liên tục trên $[a,b]$ không thể "nhảy cóc": nếu $y$ nằm giữa $f(a)$ và $f(b)$ thì có $c$ với $f(c)=y$. Chứng minh bằng chia đôi khoảng, hoặc lấy $c=\sup\{x: f(x)<y\}$.
! Định lý 9.7.1 :: $f$ liên tục trên $[a,b]$, $y$ giữa $f(a)$ và $f(b)$ thì có $c\in[a,b]$ với $f(c)=y$.
! Hệ quả :: Ảnh của $[a,b]$ qua hàm liên tục là đoạn $[\min f,\max f]$.
~ $x^5-x-1$ có nghiệm trong $[1,2]$ vì $f(1)=-1<0<f(2)=29$.
? Định lý giá trị trung gian đảm bảo
+ sự tồn tại của nghiệm
- nghiệm duy nhất
- công thức nghiệm
= Chỉ tồn tại; có thể có nhiều nghiệm.

## 9.8 | Hàm đơn điệu | 264
@pre 9.7
@w inverse
| Hàm tăng ngặt và liên tục trên $[a,b]$ là song ánh lên $[f(a),f(b)]$, và hàm ngược cũng liên tục, tăng ngặt. Đồ thị hàm ngược là đối xứng qua đường $y=x$.
! Mệnh đề 9.8.3 :: $f$ liên tục, tăng ngặt trên $[a,b]$ thì $f:[a,b]\to[f(a),f(b)]$ song ánh, $f^{-1}$ liên tục và tăng ngặt.
! Lưu ý :: Hàm đơn điệu có thể gián đoạn, nhưng chỉ có gián đoạn nhảy, và không quá đếm được.
? Hàm ngược của $f(x)=x^3$ là
+ $\sqrt[3]{x}$, cũng liên tục và tăng
- $x^{-3}$
- không tồn tại
= $x^3$ tăng ngặt, liên tục trên $\mathbb R$.

## 9.9 | Tính liên tục đều (Uniform Continuity) | 266
@pre 9.4
@w unifcont
| Liên tục: $\delta$ được phép phụ thuộc vào **điểm** $x_0$. Liên tục đều: **một** $\delta$ dùng chung cho mọi điểm. Với $1/x$ trên $(0,1)$, càng gần $0$ thì $\delta$ phải càng nhỏ, không có $\delta$ chung.
! Định nghĩa :: $\forall\varepsilon>0\ \exists\delta>0\ \forall x,y\in X: |x-y|<\delta\Rightarrow|f(x)-f(y)|\le\varepsilon$.
! Định lý 9.9.16 :: $f$ liên tục trên $[a,b]$ thì liên tục đều.
! Đặc trưng dãy :: Liên tục đều biến dãy Cauchy thành dãy Cauchy.
? $f(x)=x^2$ trên $\mathbb R$ có liên tục đều?
- Có
+ Không, độ dốc tăng vô hạn
= $f(x+\delta)-f(x)=2x\delta+\delta^2$ lớn tuỳ ý khi $x$ lớn.
? $\sqrt x$ trên $[0,1]$ liên tục đều vì
+ Liên tục trên đoạn đóng bị chặn
- Đạo hàm bị chặn
- Nó tăng
= Đạo hàm của $\sqrt x$ không bị chặn gần $0$, nhưng định lý 9.9.16 vẫn áp dụng.

## 9.10 | Giới hạn tại vô cực | 271
@pre 9.3
@w infty
| $\lim_{x\to+\infty}f(x)=L$: với mọi $\varepsilon$ có ngưỡng $M$ để mọi $x>M$ cho $|f(x)-L|\le\varepsilon$. Giống giới hạn dãy, nhưng biến chạy liên tục.
! Định nghĩa :: $\forall\varepsilon>0\ \exists M: x>M \Rightarrow |f(x)-L|\le\varepsilon$.
~ $\frac{\sin x}{x}\to0$ khi $x\to\infty$; $\sin x$ không có giới hạn.
? $\lim_{x\to\infty}\frac{2x+1}{x}$ bằng
+ $2$
- $1$
- $\infty$
= $2+\frac1x\to2$.

# 10 | Phép vi phân của hàm số | 273
> Đạo hàm là giới hạn của tỉ số sai phân; cực trị, đơn điệu, hàm ngược và L'Hôpital.

## 10.1 | Các định nghĩa cơ bản | 273
@pre 9.4
@w secant k=abs
| Đạo hàm $f'(x_0)$ là giới hạn độ dốc cát tuyến khi điểm thứ hai trượt về $x_0$. Tương đương: gần $x_0$, $f$ xấp xỉ bởi đường thẳng $f(x_0)+f'(x_0)(x-x_0)$ với sai số nhỏ hơn mọi bội của $|x-x_0|$ (theo nghĩa Newton).
! Định nghĩa :: $f'(x_0)=\lim_{x\to x_0}\frac{f(x)-f(x_0)}{x-x_0}$.
! Newton :: $f$ khả vi tại $x_0$ với đạo hàm $L$ khi $\forall\varepsilon\ \exists\delta$: $|f(x)-f(x_0)-L(x-x_0)|\le\varepsilon|x-x_0|$.
! Mệnh đề :: Khả vi kéo theo liên tục; điều ngược lại sai ($|x|$ tại $0$).
! Quy tắc :: tổng, tích $(fg)'=f'g+fg'$, thương, quy tắc chuỗi $(g\circ f)'=g'(f)\cdot f'$.
? $|x|$ tại $0$
+ liên tục nhưng không khả vi
- khả vi với đạo hàm $0$
- không liên tục
= Độ dốc bên trái $-1$, bên phải $1$.

## 10.2 | Cực đại, cực tiểu địa phương và đạo hàm | 279
@pre 10.1 9.6
@w secant mode=crit k=x3
| Tại điểm cực trị địa phương bên trong, tiếp tuyến nằm ngang: $f'(x_0)=0$. Từ đó có định lý Rolle và định lý giá trị trung bình.
! Mệnh đề 10.2.6 :: $f$ khả vi tại $x_0\in(a,b)$ và đạt cực đại/cực tiểu địa phương tại đó thì $f'(x_0)=0$.
! Định lý Rolle :: $f$ liên tục trên $[a,b]$, khả vi trên $(a,b)$, $f(a)=f(b)$ thì có $c$ với $f'(c)=0$.
! Giá trị trung bình :: Có $c\in(a,b)$ với $f'(c)=\frac{f(b)-f(a)}{b-a}$.
? $f'(x_0)=0$ có kéo theo $x_0$ là cực trị?
- Có
+ Không, ví dụ $x^3$ tại $0$
= Đây là điều kiện cần, không đủ.

## 10.3 | Hàm đơn điệu và đạo hàm | 282
@pre 10.2
@w secant mode=sign
| Dấu của đạo hàm quyết định chiều biến thiên. Chứng minh dùng định lý giá trị trung bình.
! Mệnh đề 10.3.3 :: $f'>0$ trên $(a,b)$ thì $f$ tăng ngặt trên $[a,b]$.
! Lưu ý :: $f$ tăng ngặt không kéo theo $f'>0$: $x^3$ có $f'(0)=0$.
? Nếu $f'(x)=0$ với mọi $x\in(a,b)$ thì
+ $f$ hằng trên $[a,b]$
- $f=0$
- không kết luận được
= Áp dụng giá trị trung bình cho mọi cặp điểm.

## 10.4 | Hàm ngược và đạo hàm | 283
@pre 10.3 9.8
@w inverse mode=deriv
| Đồ thị của $f^{-1}$ là ảnh đối xứng qua $y=x$, nên độ dốc đổi thành nghịch đảo: $(f^{-1})'(y)=\frac1{f'(x)}$ với $y=f(x)$, miễn $f'(x)\ne0$.
! Định lý hàm ngược :: $f$ khả vi tại $x_0$, $f'(x_0)\ne0$, $f^{-1}$ liên tục tại $y_0=f(x_0)$ thì $(f^{-1})'(y_0)=1/f'(x_0)$.
~ $(\sqrt[3]{y})'$ tại $y=0$ không tồn tại vì $f'(0)=0$ với $f(x)=x^3$.
? $(\ln)'(y)$ với $\ln$ là hàm ngược của $e^x$ bằng
+ $1/e^{x}=1/y$
- $e^y$
- $\ln y$
= $(f^{-1})'(y)=1/f'(x)=1/e^x=1/y$.

## 10.5 | Quy tắc L'Hôpital | 286
@pre 10.4
@w lhopital
| Với dạng $\frac00$, gần điểm $a$ cả $f$ và $g$ xấp xỉ bởi tiếp tuyến, nên $\frac{f}{g}\approx\frac{f'(a)(x-a)}{g'(a)(x-a)}$. Thu nhỏ khung nhìn để thấy hai đồ thị gần như thẳng.
! L'Hôpital :: $f(a)=g(a)=0$, $f,g$ khả vi, $g'\ne0$ gần $a$ và $\lim\frac{f'}{g'}=L$ thì $\lim_{x\to a}\frac fg=L$.
! Lưu ý :: Phải kiểm tra dạng $\frac00$; áp dụng sai cho dạng khác cho kết quả sai.
? $\lim_{x\to0}\frac{\sin x}{x}$ theo L'Hôpital
+ $\lim\frac{\cos x}{1}=1$
- $0$
- không xác định
= Dạng $\frac00$, tỉ số đạo hàm tiến về $1$.

# 11 | Tích phân Riemann | 288
> Diện tích dưới đồ thị như là sup/inf của tổng các hình chữ nhật, và hai định lý cơ bản.

## 11.1 | Phân hoạch | 289
@pre 9.1
| Một **phân hoạch** của khoảng $I$ là cách chia $I$ thành hữu hạn khoảng rời nhau. Phân hoạch $P'$ **mịn hơn** $P$ khi mỗi khoảng của $P'$ nằm trong một khoảng của $P$.
! Định nghĩa :: Phân hoạch $P$ của $I$: tập hữu hạn khoảng con rời nhau có hợp bằng $I$.
! Mệnh đề :: $|I|=\sum_{J\in P}|J|$. Hai phân hoạch luôn có phân hoạch chung mịn hơn: $P\# P'$.
? Phân hoạch chung $P\# P'$ dùng để
+ so sánh tổng trên/dưới của hai phân hoạch
- tính đạo hàm
- chứng minh $\mathbb R$ không đếm được
= Mịn hơn thì tổng trên giảm, tổng dưới tăng.

## 11.2 | Các hàm hằng từng đoạn (Piecewise Constant Functions) | 293
@pre 11.1
@w riemann mode=step
| Với hàm hằng trên từng khoảng của phân hoạch, "tích phân" chỉ là tổng (chiều cao × độ dài). Kết quả không phụ thuộc phân hoạch được chọn.
! Định nghĩa :: $p.c.\int_I f=\sum_{J\in P}c_J|J|$ với $f=c_J$ trên $J$.
! Tính chất :: Tuyến tính, đơn điệu ($f\le g\Rightarrow\int f\le\int g$), cộng tính theo khoảng.
? Tích phân của hàm bằng $2$ trên $[0,1)$ và $5$ trên $[1,3]$ là
+ $12$
- $7$
- $10$
= $2\cdot1+5\cdot2$.

## 11.3 | Tích phân Riemann trên và dưới | 297
@pre 11.2 5.5
@w riemann k=sin
| Kẹp $f$ giữa hàm bậc thang từ trên và từ dưới. **Tích phân trên** là inf các tích phân bậc thang trội, **tích phân dưới** là sup các tích phân bậc thang bị trội. $f$ khả tích khi hai số này bằng nhau.
! Định nghĩa :: $\overline\int f=\inf\{\int g: g\ge f\}$, $\underline\int f=\sup\{\int h: h\le f\}$, với $g,h$ hằng từng đoạn.
! Tổng Riemann :: $U(f,P)=\sum_J(\sup_J f)|J|$, $L(f,P)=\sum_J(\inf_J f)|J|$; $\overline\int f=\inf_P U(f,P)$.
! Khả tích :: $f$ bị chặn, $\underline\int f=\overline\int f$.
? Khi chia mịn hơn thì
+ tổng trên giảm (hoặc giữ), tổng dưới tăng (hoặc giữ)
- cả hai tăng
- cả hai giảm
= Sup trên khoảng nhỏ hơn không vượt sup trên khoảng lớn.

## 11.4 | Các tính chất cơ bản của tích phân Riemann | 300
@pre 11.3
| Tích phân Riemann tuyến tính, đơn điệu, cộng tính theo khoảng; $\max$, $\min$, tích của hàm khả tích là khả tích.
! Định lý 11.4.1 :: $\int(f+g)=\int f+\int g$, $\int cf=c\int f$, $f\le g\Rightarrow\int f\le\int g$, $\int_I f=\int_J f+\int_{I\setminus J}f$.
! Hệ quả :: $|\int f|\le\int|f|$; $fg$ khả tích nếu $f,g$ khả tích.
? Nếu $0\le f\le 3$ trên $[0,2]$ và khả tích thì
+ $0\le\int_0^2f\le 6$
- $\int f=3$
- $\int f\le 3$
= Đơn điệu với hàm hằng.

## 11.5 | Tính khả tích Riemann của các hàm liên tục | 306
@pre 11.4 9.9
@w riemann preset=cont k=exp
| Hàm liên tục trên $[a,b]$ liên tục đều, nên trên mỗi khoảng đủ nhỏ, chênh lệch sup và inf nhỏ hơn $\varepsilon$. Do đó $U-L\le\varepsilon(b-a)$.
! Định lý 11.5.1 :: $f$ liên tục đều trên khoảng bị chặn $I$ thì khả tích Riemann.
! Mở rộng :: Hàm bị chặn, liên tục từng khúc (hữu hạn điểm gián đoạn) cũng khả tích.
? Vì sao cần liên tục **đều** trong chứng minh?
+ Để một độ dài khoảng $\delta$ dùng chung cho mọi khoảng của phân hoạch
- Để hàm bị chặn
- Để hàm có đạo hàm
= Liên tục thường cho $\delta$ phụ thuộc điểm.

## 11.6 | Tính khả tích Riemann của các hàm đơn điệu | 310
@pre 11.4
@w riemann preset=mono
| Với hàm đơn điệu, chia $N$ khoảng đều: $U-L$ là tổng "các bậc nhảy" nhân độ rộng, bằng $\frac{(f(b)-f(a))(b-a)}{N}$, tiến về $0$. Hàm đơn điệu có thể có vô hạn bước nhảy mà vẫn khả tích.
! Định lý 11.6.1 :: $f$ đơn điệu trên $[a,b]$ thì khả tích Riemann.
! Tiêu chuẩn tích phân :: $f\ge0$ giảm thì $\sum f(n)$ hội tụ khi và chỉ khi $\int_1^\infty f$ hữu hạn.
? Với $f$ tăng, $N$ khoảng đều, $U-L$ bằng
+ $\frac{(f(b)-f(a))(b-a)}{N}$
- $0$
- $f(b)-f(a)$
= Các hiệu sup–inf "lồng" thành tổng lồng nhau.

## 11.7 | Một hàm không khả tích theo Riemann | 312
@pre 11.3
@w riemann preset=dirichlet
| Hàm Dirichlet: $f=1$ tại số hữu tỉ, $0$ tại số vô tỉ. Mọi khoảng đều chứa cả hai loại, nên sup là $1$, inf là $0$ trên mọi khoảng. Tổng trên luôn là $1$, tổng dưới luôn là $0$.
! Mệnh đề 11.7.1 :: $\mathbb 1_{\mathbb Q}$ trên $[0,1]$ không khả tích Riemann: $\overline\int=1\ne0=\underline\int$.
! Ghi chú :: Tích phân Lebesgue (Giải tích II, Chương 8) xử lý được hàm này, với tích phân bằng $0$.
? Chia mịn hơn có giúp hàm Dirichlet khả tích?
- Có, khi $N$ đủ lớn
+ Không, $U=1$ và $L=0$ với mọi phân hoạch
= Do $\mathbb Q$ và $\mathbb R\setminus\mathbb Q$ đều trù mật.

## 11.8 | Tích phân Riemann-Stieltjes | 314
@pre 11.4
@w stieltjes
| Thay độ dài $|J|$ bằng "khối lượng" $\alpha(J)=\alpha(b_J)-\alpha(a_J)$ với $\alpha$ tăng. Khi $\alpha$ có bước nhảy, tích phân "nhặt" giá trị của $f$ tại điểm nhảy.
! Định nghĩa :: $\int f\,d\alpha$ thay $|J|$ bằng $\alpha[J]$ trong tổng Riemann.
! Ví dụ :: $\alpha=x$ cho tích phân Riemann thường; $\alpha=\mathbb 1_{x\ge c}$ cho $\int f\,d\alpha = f(c)$ (với $f$ liên tục).
! Liên hệ :: $\alpha$ khả vi liên tục thì $\int f\,d\alpha=\int f\alpha'\,dx$.
? $\int_0^2 x\,d\alpha$ với $\alpha$ nhảy $1$ đơn vị tại $x=1$ bằng
+ $1$
- $2$
- $0$
= Chỉ nhặt giá trị $f(1)=1$.

## 11.9 | Hai định lý cơ bản của giải tích | 317
@pre 11.5 10.2
@w ftc
| **Định lý thứ nhất**: diện tích tích luỹ $F(x)=\int_a^x f$ liên tục, và khả vi với $F'(x)=f(x)$ tại nơi $f$ liên tục. **Định lý thứ hai**: nếu $F'=f$ khả tích thì $\int_a^b f=F(b)-F(a)$.
! Định lý 1 :: $F(x)=\int_{[a,x]}f$ liên tục đều; $f$ liên tục tại $x_0$ thì $F'(x_0)=f(x_0)$.
! Định lý 2 :: $F$ khả vi trên $[a,b]$, $F'$ khả tích Riemann thì $\int_a^bF'=F(b)-F(a)$.
? Kéo thanh $x$ một chút, diện tích tăng xấp xỉ
+ $f(x)\,\Delta x$
- $F(x)\,\Delta x$
- $f'(x)\,\Delta x$
= Đó là vì sao $F'=f$.

## 11.10 | Hệ quả của các Định lý Cơ bản | 321
@pre 11.9
| Hai công cụ tính tích phân suy ra trực tiếp: tích phân từng phần (từ quy tắc tích) và đổi biến (từ quy tắc chuỗi).
! Tích phân từng phần :: $\int_a^b F G' = F(b)G(b)-F(a)G(a)-\int_a^b F'G$.
! Đổi biến :: $\phi$ tăng, khả vi liên tục thì $\int_{\phi(a)}^{\phi(b)} f = \int_a^b f(\phi(x))\phi'(x)\,dx$.
~ $\int_0^1 xe^x dx = [xe^x]_0^1-\int_0^1e^x dx = e-(e-1)=1$.
? Tích phân từng phần đến từ
+ quy tắc đạo hàm tích $(FG)'=F'G+FG'$
- quy tắc chuỗi
- L'Hôpital
= Tích phân hai vế rồi dùng định lý cơ bản thứ hai.

# A | Logic toán học và cách viết chứng minh | 326
> Mệnh đề, lượng từ và các kiểu chứng minh: hành trang trước khi xây dựng giải tích từ tiên đề.

## A.1 | Mệnh đề và các phép nối | 326
@w truth
| Một mệnh đề là phát biểu đúng hoặc sai. Phép nối: và ($\land$), hoặc ($\lor$), phủ định ($\lnot$), kéo theo ($\Rightarrow$), tương đương ($\iff$).
| "$P\Rightarrow Q$" chỉ sai khi $P$ đúng mà $Q$ sai. Khi $P$ sai, phép kéo theo đúng một cách rỗng.
! Phản đảo :: $P\Rightarrow Q$ tương đương $\lnot Q\Rightarrow\lnot P$ (không tương đương $Q\Rightarrow P$).
! De Morgan :: $\lnot(P\land Q)\iff \lnot P\lor\lnot Q$.
? "Nếu $2+2=5$ thì Mặt Trăng là pho mát" là
+ đúng
- sai
- không phải mệnh đề
= Giả thiết sai nên phép kéo theo đúng.

## A.2 | Lượng từ và phủ định | 335
@pre A.1
| $\forall$ (với mọi) và $\exists$ (tồn tại). Phủ định đổi loại lượng từ và đẩy dấu phủ định vào trong. Thứ tự lượng từ rất quan trọng.
! Phủ định :: $\lnot(\forall x\,P(x))\iff\exists x\,\lnot P(x)$; $\lnot(\exists x\,P(x))\iff\forall x\,\lnot P(x)$.
! Thứ tự :: $\forall x\,\exists y$ (y được chọn theo x) khác $\exists y\,\forall x$ (một y cho mọi x).
~ Phủ định của "$a_n\to L$": $\exists\varepsilon>0\ \forall N\ \exists n\ge N: |a_n-L|>\varepsilon$.
? Phủ định của "liên tục đều" là
+ $\exists\varepsilon\ \forall\delta\ \exists x,y: |x-y|<\delta$ và $|f(x)-f(y)|>\varepsilon$
- $\forall\varepsilon\ \exists\delta$ ...
- $f$ không liên tục
= Đổi từng lượng từ và phủ định điều kiện cuối.

## A.3 | Cách viết chứng minh | 340
@pre A.2
| Các kiểu chứng minh: trực tiếp, phản chứng, phản đảo, quy nạp, xét trường hợp. Mỗi dòng phải suy ra từ giả thiết, định nghĩa hoặc dòng trước.
! Phản chứng :: Giả sử điều cần chứng minh sai, suy ra mâu thuẫn.
! Bằng nhau :: Để chứng minh $x=y$, thường chứng minh $x\le y$ và $y\le x$, hoặc $|x-y|\le\varepsilon$ với mọi $\varepsilon>0$.
? Để chứng minh $x=0$ từ "$|x|\le\varepsilon$ với mọi $\varepsilon>0$", ta dùng
+ phản chứng: nếu $x\ne0$, chọn $\varepsilon=|x|/2$
- quy nạp
- định lý giá trị trung gian
= Đây là mẫu chứng minh xuất hiện liên tục trong giải tích.

# B | Hệ thập phân | 348
> Biểu diễn số tự nhiên và số thực bằng chữ số, và vì sao $0{,}999\ldots=1$.

## B.1 | Số tự nhiên trong hệ thập phân | 348
| Mỗi số tự nhiên dương có đúng một cách viết $\sum_{i=0}^n a_i10^i$ với $a_i\in\{0,\dots,9\}$ và $a_n\ne0$. Chứng minh bằng quy nạp mạnh và phép chia Euclid.
! Định lý :: Biểu diễn thập phân của số tự nhiên tồn tại và duy nhất.
? $10$ được chọn làm cơ số vì
+ lý do lịch sử; cơ số nào $\ge2$ cũng dùng được
- chỉ cơ số 10 mới biểu diễn được mọi số
= Máy tính dùng cơ số 2.

## B.2 | Số thực trong hệ thập phân | 351
@pre B.1 7.2
@w decimal
| Một chuỗi thập phân $a_n\dots a_0{,}a_{-1}a_{-2}\dots$ là chuỗi $\sum a_i10^i$, luôn hội tụ. Mọi số thực có biểu diễn thập phân, nhưng có số có **hai** biểu diễn.
! Định lý :: Mọi số thực có ít nhất một biểu diễn thập phân.
! $0{,}999\ldots=1$ :: Tổng riêng $1-10^{-n}\to1$, nên hai biểu diễn chỉ cùng một số.
? $0{,}999\ldots$ so với $1$ thì
+ bằng nhau
- nhỏ hơn một chút
- không so sánh được
= Không có số dương nào nhỏ hơn mọi $10^{-n}$.
`;
