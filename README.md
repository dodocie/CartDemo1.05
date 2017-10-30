# cart-demo1.05

> about server

更新...

初窥组件、server、Es6模块化相关概念。

待解决的问题（已解决）：

    1. js导入图片路径

    2. webpack 只打包在src目录下的static文件夹下的，并且有被引用的图片吗？

    3. js 图片，只能采用require('/xx/xxx.jpg')或者import的写法吗？

接下来计划：

    1. 购物车增加两个链接，1个是结算页，1个是返回首页。首页做逻辑判断，默认cookie为false，用户未登录状态，点击添加购物车将跳转到登录页。

    2. 增加登录成功、异常页。

    3. 增加商品详情页。

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
