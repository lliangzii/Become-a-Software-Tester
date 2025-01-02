# MySql

程序员工作的本质实际上就是对数据库的增删查改。

MySQL 是最流行的关系型数据库管理系统

## 一、快速开始

### 1. 登录MySQL

#### ①命令行操作

`mysql -uroot -p` 在Linux终端登录mysql

#### ②图形化操作

需要使用图形化数据库操作软件，如Navicat、DBeaver等软件

本文使用的是DBeaver，它的优点是开源免费且支持非常多的数据库类型

### 2.使用DBeaver连接至MySQL数据库

## 二、SQL语言

SQL（Structured Query Language），结构化查询语言，用于对于关系型数据进行操作。

SQL主要包含以下几个部分：

* DQL(Data QueryLanguage)：数据查询语言，用来查询数据库的数据
* DML(Data Manipulation Language)：数据操纵语言：用于改变数据库的数据
* DDL(Data Definition Language)：数据定义语言：用于定义数据的结构（数据库/表）
* DCL(Data Control Language)：数据控制语言：用于定义数据库用户的权限

### 1. DDL语句

定义数据的结构（数据库/表）

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

### 2. DML语句

改变数据库的数据
