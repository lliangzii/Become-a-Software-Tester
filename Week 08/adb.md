# adb测试

Android debug Bridge（安卓调试桥），是Android自带命令行工具，可以实现电脑端与移动端设备之间通信

## 一、安卓系统

Android是一种基于Linux内核自由开发源代码的移动端操作系统，主要用于移动端设备（手机，平板电脑等等），由google公司主导研发

### 1. Android核心四层（从底向上）

linux内核层

Android运行时(ART)+运行库

应用程序框架

应用层

### 2. Android系统四大开发组件

活动 Activity

服务 Service

广播接收 BroadCast   Receive

内容提供 Content  Provider


## 二、adb

### 1. adb组成

1）adb客户端（pc端：命令行终端）

2）adb服务器端（pc端：后台进程）    客户端和服务器端不需要单独安装

3）adb守护进程 移动端设备上，后台进程

注：adb客户端，adb服务器端，adb守护进程默认都是启动状态，无需特意启动

### 2. adb常用命令

`adb version` 查看当前计算机上adb版本信息

`adb devices` 查看到连接当前电脑的移动端设备信息，参数 `-l`查看详细信息

`adb install apk文件路径(电脑上)` 安装指定app

`adb uninstall app包名` 卸载指定app

`adb push 电脑端文件路径 手机设备存放路径/` 将电脑端文件上传到移动端设备

`adb pull 手机设备上文件路径 电脑端存放路径` 下载文件到电脑端

`adb logcat` 查看日志

`adb shell screencap` app界面截图
