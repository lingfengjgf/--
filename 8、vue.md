# 1、vue complier 的实现原理是什么？

在使用vue的时候，我们有两种方式来创建我们的HTML页面，第一种情况，我们会用template模板的方式，这种更易读懂也是官方推荐的方式；第二种情况是使用render函数来生成HTML，它比template更接近最终结果。

complier的主要作用是解析模板，生成渲染模板的render，而render的作用主要是为了生成vnode。

complier主要分为3大块：
parse：接受template原始模板，按着模板的节点和数据生成对应的ast；
optimize：遍历ast的每一个节点，标记静态节点，这样就知道哪部分不会变化，在页面需要更新时，通过diff减少对比这部分dom，从而提高性能；
generate：把前两步生成的ast组成render字符串，然后将render字符串通过new Function的方式转换成渲染函数。

# 2、vue2 的响应式原理是什么？

vue2的响应式是通过数据劫持和发布订阅模式实现的。

vue在初始化数据是，会通过Object.defineProperty重新定义data中的所有属性，当页面使用对应属性的时候，首先会进行依赖收集（收集当前组件的watcher），如果属性发生变化，会通知依赖进行更新操作（发布订阅）。

当把一个普通的js对象传给vue实例来作为data选项是，vue会遍历它的所有属性，用Object.defineProperty劫持各个属性的gettter、setter，使用getter收集依赖，setter通知watcher派发更新，触发对应的监听回调。

vue的双向绑定是通过Observer来监听 model 的数据变化，通过Compile来解析编译模板指令，通过watcher建立Observer和Compile之间的联系，达到数据变化 -> 视图更新，视图交互变化 -> model 数据变化的双向绑定效果。

# 3、简述 vue.mixin 的使用场景和原理。

当存在多个组件中的数据和功能很相近的时候，就可以利用mixin将公共部分提取出来。

mixin是一个js对象，它可以包含组件script中的任意选项，如data，components，methods，watch，created等，只要将共用的功能以对象的形式传入mixin选项中，当组件使用mixin对象时所有mixin对象的选项都将被混入该组件本身的选项中来，这样就可以提高代码的重用性。

mixin 和 vuex 的区别：
vuex中的数据是共用的，mixin中的数据是独立的，只属于vue组件自身。

mixin 和 组件的区别：
在父组件中引入组件，相当于在父组件中给出一片独立的空间给子组件使用，通过props传值，本质上两者是相对独立的；mixin则是在引入组件后与组件中的对象和方法进行合并，扩展了父组件的方法，相当于形成了一个新的组件（装饰器模式）。