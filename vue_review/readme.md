


1. vue

vue 渐进式框架(由浅入深)
web端应用
vue采用由底至上增量开发（在底层基础增加其他设计） 设计
SPA   single  pagination  application单页面应用   （url地址没有切换， 仅#hash至部分切换 ）


开发模式


MVC
React  类的mvc框架（即是也不是mvc框架）

M       model       数据层      state
V       view        视图层      components
C       controller  逻辑层      store + reducers


Vue     是一个典型的MVVM  框架

M       model   数据
V       views   组件
VM      viewModule     vue把视图（Dom对象）和数据方法绑定在一起


angular  必须是典型的 mvc 框架

M       model       数据层        $cope
V       views       视图层        html/template(模板)
C       controller  控制器      controller 



MVP
M       model       数据层        
V       views       组件层        
P       Presenter   逻辑层   


设计模式
MVC MVP MVVM 发布订阅 单例 工厂

复杂软件 必须要有 非常清晰合理的架构
MVP MVC MVVM 就是用来解决前段页面呈现 和逻辑代码分离  而出现的设计模式

2. vue 和其他框架的比较

Vue 对比  react
相同点：
   a.  vue 和 react 都有组件的概念  ，都是用虚拟dom（virtual-dom）
   b.  vue 和 react 都提供了组件化视图  还有响应式的概念（reactive）
   c.  vue 和 react 都有自己核心的库（api），都有完整框架的生态圈 ，都有配套的路由方案，状态机制  （redux）（vuex）

不同点：
    a. react 用javascript xml语法 来渲染页面，vur组件化模板（template）
    e. vue较react 开发速度更快运行速度渲染速度更快
    f. vue 和react 有各自不同的生命周期，不同的钩子函数
