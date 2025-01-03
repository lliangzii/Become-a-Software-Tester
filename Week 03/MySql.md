# MySql

程序员工作的本质实际上就是对数据库的增删查改。

MySQL 是最流行的关系型数据库管理系统

### 1. 登录MySQL

#### ①命令行操作

`mysql -uroot -p` 在Linux终端登录mysql

#### ②图形化操作

需要使用图形化数据库操作软件，如Navicat、DBeaver等软件

本文使用的是DBeaver，它的优点是开源免费且支持非常多的数据库类型

### 2.使用DBeaver连接至MySQL数据库

# SQL语言

SQL（Structured Query Language），结构化查询语言，用于对于关系型数据进行操作。

SQL主要包含以下几个部分：

* DQL(Data QueryLanguage)：数据查询语言，用来查询数据库的数据
* DML(Data Manipulation Language)：数据操纵语言：用于改变数据库的数据
* DDL(Data Definition Language)：数据定义语言：用于定义数据的结构（数据库/表）
* DCL(Data Control Language)：数据控制语言：用于定义数据库用户的权限

## 1. DDL语句

定义数据的结构（即数据库/表）

#### ①数据库

创建数据库：

`create database 数据库名 default character set = 'utf8';`

* 为了支持中文数据 `default character set = 'utf8'`
* 数据库名不能以数字和特殊符号开头，也不能用中文

`show database;` 查看当前连接下的数据库列表

`use 数据库名;` 切换/选择/使用数据库

`select database();` 查看当前连接的数据库

`drop database 数据库名` 删除数据库

#### ②数据表

```sql
-- 创建数据表语法：
create table 表名(
字段1 数据类型1,
字段2 数据类型2,
...
字段n 数据类型n
);

eg.
create table student(
sid int,
sname varchar(20), -- varchar(字母位数)：限制数据长度
score float,
ssex enum('男','女'), -- enmu(值)：存放所有取值可能
semail varchar(50),
sbirth date
);
```

常用数据类型：

* 整型 int
* 浮点型 float double decimal
* 字符型 char varchar
* 枚举型 enum
* 日期型 date datetime time

##### 约束

约束指的是对表中字段取值的规则限制条件，如果存在违反约束的数据行为，行为会被约束终止。

约束可以在创建表时规定（通过 CREATE TABLE 语句），或者在表创建之后规定（通过 ALTER TABLE 语句）

###### 非空约束（not null）

指示某列不能存储 NULL 值

###### 唯一约束（unique）

保证某列的每行必须有唯一的值

###### 默认值约束（default 默认值）

规定没有给列赋值时的默认值

###### 主键约束（primary key）

 NOT NULL 和 UNIQUE 的结合。确保某列（或两个列多个列的结合）有唯一标识，有助于更容易更快速地找到表中的一个特定的记录

###### 外键约束（foreign key）

保证一个表中的数据匹配另一个表中的值，即它必须是它指向的那个表中的值之一

1. 在建表时添加外键约束：

```sql
CREATE TABLE Orders
(
O_Id int NOT NULL,
OrderNo int NOT NULL,
P_Id int,
-- 主键约束
PRIMARY KEY (O_Id),
-- 外键约束：
CONSTRAINT fk_PerOrders FOREIGN KEY (P_Id)
REFERENCES Persons(P_Id)

)
```

2. 给已有的表添加外键约束：

```sql
ALTER TABLE Orders
ADD CONSTRAINT fk_PerOrders
FOREIGN KEY (P_Id)
REFERENCES Persons(P_Id)
```

3. 删除外键约束：

```sql
ALTER TABLE Orders
DROP FOREIGN KEY fk_PerOrders
```

##### 修改

`alter table 旧表名 rename to 新表名;` 修改表名

`alter table 表名 change 旧字段名 新字段名 新字段的数据类型;` 修改字段名

`alter table 表名 add 字段名 字段的数据类型;` 添加新字段

`alter table 表名 drop 字段名;` 删除字段

## 2. DML语句

改变数据库的数据

### ①插入数据

指定列名及被插入的值：

`insert into table_name (column1,column2,column3) VALUES (value1,value2,value3);`

也可只提供被插入的值：

`INSERT INTO table_name VALUES (value1,value2,value3,...);`

一次性插入多条数据：

`...VALUES (value1,value2,value3),(value4,value5,value6);`

### ②删除数据

`DELETE FROM table_name WHERE condition;` WHERE 子句规定哪条记录或者哪些记录需要删除

***关于删除：**

`DROP test;` 会删除表test，不可恢复，不保留表的结构

`TRUNCATE test;` 清空表test里的内容，不可恢复，但不删除表的定义，表的结构还在

`DELETE FROM test WHERE condition;` 删除表test中指定的的数据，必要时可回滚恢复

### ③更新数据

`UPDATE table_name SET column1 = value1, column2 = value2, ... WHERE condition;`

## DQL语句

SELECT 语句用于从数据库中选取数据，选取结果被存储在一个结果表中，称为结果集。

基本语法：

`SELECT column1, column2, ... FROM table_name;` column表示要选择的字段

或 `SELECT * FROM table_name;` 选择表中的所有列

### 单表查询

#### 1. 简单查询

即基本用法 `SELECT column1, column2, ... FROM table_name;` 或 `SELECT * FROM table_name;`

可能会因返回数据太大导致性能较差

#### 2. 别名查询

通过使用 SQL，可以为表名称或列名称指定别名。基本上，创建别名是为了让列名称的可读性更强。

设置列别名： `SELECT column_name AS alias_name FROM table_name;`

设置表别名： `SELECT column_name(s) FROM table_name AS alias_name;`

在下面的情况下，使用别名很有用：

* 在查询中涉及超过一个表
* 在查询中使用了函数
* 列名称很长或者可读性差
* 需要把两个列或者多个列结合在一起

例子：

```sql
-- 列的别名
SELECT name AS n, country AS c
FROM Websites;

-- 把三个列（url、alexa 和 country）结合在一起，并创建一个名为 "site_info" 的别名
SELECT name, CONCAT(url, ', ', alexa, ', ', country) AS site_info
FROM Websites;

-- 表的别名
SELECT w.name, w.url, a.count, a.date 
FROM Websites AS w, access_log AS a  
WHERE a.site_id=w.id and w.name="theWebsitesName";
```

#### 3. 条件查询

WHERE 子句用于提取那些满足指定条件的记录

用法：`SELECT column1, column2, ... FROM table_name WHERE condition;`

注：SQL 使用单引号来识别字符串

下面的运算符可以在 WHERE 子句中使用：

| 运算符        | 描述                                 |
| ------------- | ------------------------------------ |
| =             | 等于                                 |
| <>            | 不等于。在 SQL 部分版本中可被写成 != |
| >             | 大于                                 |
| <             | 小于                                 |
| >=            | 大于等于                             |
| <=            | 小于等于                             |
| BETWEEN...AND | 在某个范围内                         |
| LIKE          | 搜索某种模式                         |
| IN            | 指定针对某个列的多个可能值           |
| IS NULL       | 判断是不是空值                       |

（以及逻辑运算：NOT &  AND & OR）

#### 4. 模糊查询

LIKE 用于在 WHERE 子句中进行模糊查询的关键字，它允许我们根据模式匹配来选择数据，通常与 % 和 _ 通配符一起使用

用法：`SELECT column1, column2, ... FROM table_name WHERE column_name LIKE pattern;`

* %：匹配任意字符（包括零个字符）。
* _ ：匹配单个字符。

例子：

```sql
select  *  from xsb  where xm like '张%'; -- 姓张
select  *  from xsb  where xm like '%张%'; -- 名字包含张
select  *  from xsb  where xm like '%张'; -- 以张结尾
select  *  from xsb  where xm like '张_'; -- 张某
select  *  from xsb  where xm like '张__'; -- 张某某
```

#### 5. 集合查询

用于处理多个查询结果的操作

交集（INTERSECT）对应于 WHERE 中的 AND 条件

并集（UNION）对应于 WHERE 中的 OR 条件

差集（EXCEPT）获取两个查询结果不相同的部分

例子：

```sql
-- 查询计算机系且年龄不大于19岁的学生
SELECT * FROM student WHERE 系 = '计算机'
INTERSECT
SELECT * FROM student WHERE age <= 19;

-- 查询计算机系的学生或年龄不大于19岁的学生
SELECT * FROM student WHERE 系 = '计算机'
UNION
SELECT * FROM student WHERE age <= 19;

-- 查询计算机系且年龄大于19岁的学生
SELECT * FROM student WHERE 系 = '计算机'
EXCEPT
SELECT * FROM student WHERE age <= 19;
```

也可以用 IN 关键字用于查询某个范围内的数据：

```sql
-- 查询在某个用户ID集合中的用户信息
SELECT * FROM user WHERE id IN (1, 2, 3);

-- NOT IN 表示不在这些列表项内选择
SELECT * FROM user WHERE id NOT IN (1, 2, 3);

-- IN 列表项的值可以通过子查询得到
SELECT * FROM article WHERE uid IN (SELECT uid FROM user WHERE status = 0);
```

也可使用 BETWEEN 关键字查询介于两个值之间的数据范围内的值：

*这些值可以是数值、文本或者日期

```sql
-- between and 选取 alexa 介于 1 和 20 之间的所有网站
SELECT * FROM Websites
WHERE alexa BETWEEN 1 AND 20;

-- not between and 显示不在上面实例范围内的网站
SELECT * FROM Websites
WHERE alexa NOT BETWEEN 1 AND 20;

-- between 与 in 组合使用
-- 选取 alexa 介于 1 和 20 之间但 country 不为 USA 和 IND 的所有网站
SELECT * FROM Websites
WHERE (alexa BETWEEN 1 AND 20)
AND country NOT IN ('USA', 'IND');
```

注意：不同数据库对between and 边界的定义不同，在MySQL中是闭区间[a，b]

#### 6. 去重查询

SELECT DISTINCT 语句用于返回唯一不同的值

在表中，一个列可能会包含多个重复值，DISTINCT 可以仅列出不同的

eg. `select distinct jg from xsb;`

#### 7. 查询空值

null 表示空值

`select * from xsb where bj='null';` 注意'null' 带单引号，表示其是一个字符串，而并非空值

`select * from xsb where nl is not null;`

#### 8. 统计查询

MySQL 有很多内置的函数，包括字符串、数学、日期等，使用数学函数可以轻松进行统计查询

常用的函数：

AVG()

`SELECT AVG(column_name) FROM table_name` 返回数值列的平均值

COUNT()

`SELECT COUNT(column_name) FROM table_name;` 返回指定列的值的数目（NULL 不计入）

`SELECT COUNT(*) FROM table_name;` 返回表中的记录数

`SELECT COUNT(DISTINCT column_name) FROM table_name;` 返回指定列的不同值的数目

MAX()

`SELECT MAX(column_name) FROM table_name;` 返回指定列的最大值

MIN()

`SELECT MIN(column_name) FROM table_name;` 返回指定列的最小值

SUM()

`SELECT SUM(column_name) FROM table_name;` 返回数值列的总数

ROUND()

`SELECT ROUND(column_name,decimals) FROM TABLE_NAME;` 把数值字段四舍五入为指定的小数位数(不写位数则输出整数)

#### 9. 分组查询

#### 10. 排序查询

#### 11. 分页查询

### 多表查询

#### 1.嵌套子查询

子查询提供了一种简单而有效的方法来处理依赖于另一个查询结果的查询

本质上是SELECT嵌入在另一个SQL语句的 WHERE子句中的查询

实例：

```sql
-- 以下语句仅返回订单表中订单价值超过5000美元的那些客户的详细信息
SELECT * FROM customers
WHERE cust_id IN (SELECT cust_id FROM orders WHERE order_value > 5000);
```

子查询也可以与INSERT语句一起使用：

```sql
-- 上面的语句将通过使用子查询返回的数据，
-- 将已下订单价值超过5000美元的客户的记录插入名为premium_customers的表中。 
INSERT INTO premium_customers 
SELECT * FROM customers 
WHERE cust_id IN (SELECT DISTINCT cust_id FROM orders WHERE order_value > 5000);
```

还可以将子查询与UPDATE语句结合使用，以更新表中的单列或多列，如下所示：

```sql
-- 通过将当前订单值增加10美元，上述语句将更新订单（orders）表中邮政编码为75016的地区的客户的订单值
UPDATE orders
SET order_value = order_value + 10
WHERE cust_id IN (SELECT cust_id FROM customers WHERE postal_code = 75016);
```

*注：MySQL不允许SELECT FROM后面指向用作UPDATE等DML语句的表，这是因为MySQL不支持在一个查询中同时读取和写入同一张表。可以先选择其他表或者临时表中的数据，并将其与要更新的表连接起来，然后再执行UPDATE语句。*

同样，可以将子查询与DELETE语句结合使用，以删除表中的单行或多行，如下所示：

```sql
-- 将从包含product_id为5的产品的订单表中删除
DELETE FROM orders
WHERE order_id IN (SELECT order_id FROM order_details WHERE product_id = 5);
```

#### 2. 连接查询

SQL join 用于把来自两个或多个表的行结合起来

我们通常会用到以下五种连接类型：

| 类型                 | 描述                                                                 |
| -------------------- | -------------------------------------------------------------------- |
| **INNER JOIN** | 内连接：返回两个表中满足连接条件的记录（交集）。                     |
| **LEFT JOIN**  | 左连接：返回左表中的所有记录，即使右表中没有匹配的记录（保留左表）。 |
| **RIGHT JOIN** | 右连接：返回右表中的所有记录，即使左表中没有匹配的记录（保留右表）。 |
| **FULL JOIN**  | 全连接：返回两个表的并集，包含匹配和不匹配的记录。                   |
| **SELF JOIN**  | 自连接：将一个表与自身连接。                                         |

注：MySQL本身不支持 FULL JOIN ，一般用UNION 代替

##### ①内连接

用法：

`SELECT column1, column2, ... FROM table1 JOIN table2 ON condition;` 从多个表中返回满足 JOIN 条件的所有行

注：inner join 可简写为join

**实例：**

表一：**Students**

| StudentID | Name    | Age |
| --------- | ------- | --- |
| 1         | Alice   | 22  |
| 2         | Bob     | 23  |
| 3         | Charlie | 24  |

表二：**Enrollments**

| EnrollmentID | StudentID | Course  |
| ------------ | --------- | ------- |
| 101          | 1         | Math    |
| 102          | 2         | Science |
| 103          | 4         | History |

```sql
SELECT Students.Name, Enrollments.Course
FROM Students
INNER JOIN Enrollments
ON Students.StudentID = Enrollments.StudentID;
```

执行上述语句将输出以下结果：

| Name  | Course  |
| ----- | ------- |
| Alice | Math    |
| Bob   | Science |

##### ②外连接

即左连接与右连接

inner join 会查询出两张表交叉数据，有时需要某个表的数据全部展示出来

用法：

```sql
SELECT column_name(s)
FROM table1
LEFT JOIN table2
ON table1.column_name=table2.column_name;
```

LEFT JOIN 关键字从左表（table1）返回所有的行，即使右表（table2）中没有匹配。如果右表中没有匹配，则结果为 NULL

同样的：RIGHT JOIN 会返回右表中的所有记录，即使左表中没有匹配的记录。

实例：

表一：**Customers**

| CustomerID | Name    |
| ---------- | ------- |
| 1          | Alice   |
| 2          | Bob     |
| 3          | Charlie |
| 4          | David   |

表二：**Orders**

| OrderID | CustomerID | Product    |
| ------- | ---------- | ---------- |
| 101     | 1          | Laptop     |
| 102     | 2          | Smartphone |

使用 LEFT JOIN 查询：

```sql
SELECT Customers.Name,Orders.Product
FROM Customers
LEFT JOIN Orders
ON Customers.CustomerID=Orders.CustomerID;
```

执行上述语句将输出以下结果：

| Name    | Product    |
| ------- | ---------- |
| Alice   | Laptop     |
| Bob     | Smartphone |
| Charlie | NULL       |
| David   | NULL       |

 **解释** ：LEFT JOIN 返回了 Customers 表中的所有记录。对于 Charlie 和 David，由于在 Orders 表中没有匹配的 CustomerID，它们对应的 Product 列为 NULL。

##### ③自连接

将一个表连接到自身，当一个字段在显示时候被多次使用时可以使用自连接

用法：在这个语法中，T1 和 T2 是同一个表的不同别名

```sql
SELECT column_name(s)
FROM table1 T1, table1 T2
WHERE condition;
```

或：同一张表使用内连接

```sql
SELECT w1.Id
FROM weather w1
JOIN weather w2
ON DATEDIFF(w1.RecordDate,w2.RecordDate)=1
WHERE w1.Temperature>w2.Temperature
```
