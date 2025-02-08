# UnitTest框架

unittest 是 Python 自带的单元测试框架，它提供了一套创建和运行测试用例的工具，并且可以用来组织、运行和报告测试结果。

## 一、UnitTest测试框架

### unittest.TestCase

TestCase用于封装一个具体的测试场景。

每个继承 unittest.TestCase 的类代表一个测试用例集合，类中的每个方法就是一个测试用例‌。

**命名规则‌：**

文件必须以 **test_** 开头，例：test_example.py

类命名规则‌：测试类必须继承 unittest.TestCase 类，并且类名以 **Test** 开头。例：TestExample‌

方法命名规则‌：测试方法必须以 **test_** 开头，例：test_example

**TestCase类封装了的方法：**

    ● unittest.TestCase().setUp()		 每个用例执行之前进行调用，用来进行测试准备操作

    ● unittest.TestCase().tearDown()	 每个用例执行之后进行调用，用来进行测试清理操作

    ● unittest.TestCase.setUpClass()         每个测试类执行之前进行调用

    ● unittest.TestCase.tearDownClass()      每个测试类执行之后进行调用

    ● unittest.TestCase().id()		          返回测试用例名称

    ● unittest.TestCase().assertEqual()         断言检测方法

    ● unittest.TestCase().assertListEqual()   断言检测方法

### unittest.TestSuite

TestSuite是一个容器，可用于存放并运行多个不同的测试用例。

可以把不同类别测试用例放在不同容器中，便于管理和执行。

**TestSuite类封装了的方法：**

    ● unittest.TestSuite().suiteA.addTest("用例名称")       添加单个用例到测试套中

### unittest.TestLoader

用于从测试模块、测试类或测试方法中加载测试用例。

**TestLoader类封装了的方法：**

    ● ‌unittest.TestLoader().loadTestsFromTestCase(testCaseClass)‌：指定测试类添加测试用例

    ● ‌unittest.TestLoader().discover(start_dir, pattern='test.py', top_level_dir=None)：对测试文件名进行模糊匹配添加测试用例

### unittest.TextTestRunner

用于加载测试用例、执行测试用例，并提供测试结果的输出。

**TextTestRunner类封装了的方法：**

    ● unittest.TextTestRunner().run(测试套对象)

## 二、
