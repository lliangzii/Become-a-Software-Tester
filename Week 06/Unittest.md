# UnitTest框架

unittest 是 Python 自带的单元测试框架，它提供了一套创建和运行测试用例的工具，并且可以用来组织、运行和报告测试结果，常用于自动化测试。

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

## 二、UnitTest运用实例

本次应用的目录结构如下：

```python
|MyUnittest

|--Calc

|----computer.py				模拟开发提测代码文件

|--TestCases

|----test_computer.py				测试用例文件

|--TestReports

|----test_report.html				测试报告文件，用浏览器查看结果

|--TestSuites

|----suiteA.py					测试套文件

|----suiteB.py					测试套文件

|----suiteC.py					测试套文件

|--Tools

|----HTMLTestRunner.py				第三方测试报告组件

|--Runner.py					执行器文件
```

### 3.1 开发提测代码

computer.py 由开发人员提供

```python
class  Computer:
    def add(self,data1,data2):
        result=data1+data2
        return result

    def diff(self,data1,data2):
        result=data1-data2
        return result

```

该代码实现了十进制的加减法功能

### 3.2 实现TestCase

unittest 提供了一些断言方法：

用于判断测试实际结果是否符合预期结果。 如果断言失败，则测试用例失败。

```python
assertEqual(a, b):      a==b。
assertNotEqual(a, b):   a!=b。
assertTrue(x):          x==True。
assertFalse(x):         x==False。
assertIsNone(x):        x is None。
assertIsNotNone(x):     x is not None
assertIn(a, b):         a in [] ==True
assertNotIn(a, b):      a not in b 
```

测试用例的实现：

test_computer.py

```python
from MyUnittest.Calc.computer import Computer
import unittest

class Test_Computer(unittest.TestCase):

#setUp() 方法在每个测试用例执行之前自动执行
    def setUp(self) -> None:
        print(self.id())
        print('This is setUp method --------')

#tearDown() 方法在每个测试用例执行之后自动执行

    def tearDown(self) -> None:
        print('This is tearDown method --------')

#setUpClass() 方法在每个测试类执行之前自动执行
    @classmethod
    def setUpClass(cls) -> None:
        cls.co = Computer()
        print('This is setUpClass method --------')

#tearDownClass() 方法在每个测试类执行之后自动执行
    @classmethod
    def tearDownClass(cls) -> None:
        print('This is tearDownClass method --------')

#测试用例名称（方法）必须以 test_ 开头
    def test_add_001(self):
        result=self.co.add(100,200)
        self.assertEqual(result,300)

#测试装饰器：
#unittest.skip(原因): 无条件跳过该测试用例，说明跳过测试的原因
    @unittest.skip
    def test_add_002(self):
        result=self.co.add(100,300)
        self.assertEqual(result,400)

#unittest.expectedFailure: 用例执行失败时，不要以失败的状态标记在测试报告
    @unittest.expectedFailure
    def test_diff_001(self):
        result=self.co.diff(1000,200)
        self.assertEqual(result,900)

#unittest.skipIf(条件,原因): 如果条件成立，则跳过该测试用例
    @unittest.skipIf(3>2,'')
    def test_diff_002(self):
        result=self.co.diff(1000,800)
        self.assertEqual(result,200)

if __name__ == '__main__':
    unittest.main()

```

### 3.3 实现TestSuite

SuiteA.py

```python
import unittest
from MyUnittest.TestCases import test_computer

suiteA = unittest.TestSuite()
# 添加测试类中指定测试方法
suiteA.addTest(test_computer.Test_Computer("test_add_001"))
suiteA.addTest(test_computer.Test_Computer("test_add_002"))
suiteA.addTest(test_computer.Test_Computer("test_diff_001"))
suiteA.addTest(test_computer.Test_Computer("test_diff_002"))

if __name__ == '__main__':
    runner = unittest.TextTestRunner()
    runner.run(suiteA)

```

### 3.4 使用TestLoader批量添加用例

TestLoader组件可以批量添加用例到测试套对象中

用法：

①实例化加载器对象： loader = unittest.TestLoader()

②测试套对象 suite = loader.loadTestsFromTestCase(测试类名)

eg.

```python
loader = unittest.TestLoader()
suiteB = loader.loadTestsFromTestCase(Test_Computer)
```



TestLoader类的discovery方法可以跨文件搜索满足条件的测试文件名，并将其用例添加到测试套：

SuiteC.py

```python
import unittest
import os                   # 导入OS包,用于获取当前文件的绝对路径

# 通过abspath方法获取当前文件的绝对路径
dir = os.path.dirname(os.path.abspath(__file__))   

# 根据当前路径拼接TestCases所在的位置
dir = dir+'/../TestCases'  

# 在指定的目录下查找模块名包含test开头的文件中的测试用例，将其加入测试套
suiteC = unittest.defaultTestLoader.discover(dir,pattern='test*.py')

```

### 3.5 使用TextTestRunner执行测试套

用法：

①实例化执行器对象：runner = unittest.TextTestRunner() 

②执行测试套：runner.run(测试套) 

Runner.py

```python
from MyUnittest.TestSuites.SuiteA import suiteA
from MyUnittest.TestSuites.SuiteB import suiteB
import unittest
runner = unittest.TextTestRunner()    # 创建执行器对象
runner.run(suiteA)                    # 执行测试套A
runner.run(suiteB)                    # 执行测试套B
```
