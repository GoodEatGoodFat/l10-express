<!-- prettier-ignore -->
//200 update success
//400 invalid desctiption
//201 push success
//cannot find 404
//204 完成了，无返回
![cors header](image.png)
return data:
{
msg:'task returned'
data:

}

express.json() // body-parser
-> 用来解读 client 传来的数据

cors-anywhere，建立中间 server

判断 undefined:
！==undefined

1. 获取来源数据，一般用 destruction {}= req.body
2. data validation

//一个项目的结构 其一
//--ROOT LEVEL--//
-- package.json
-- package-lock.json
-- node*modules/
-- src/
|--index.js 入口文件 （app.js,server.js） 三者可能并存，但是其中一个是入口文件，其他是 require
|--routes/(包含整个 server 包含的所有的路由 router， 一个 router 负责一个相关的 请求)
    |-- 根据功能划分，router，controller
    |-- user(s).js （user(s).router.js）
    |-- task.js
    |-- index.js (负责整合所有路径)
|-- controllers/ (*负责做逻辑处理\_ 根据项目大小，不一定在 controller 里做处理。 做逻辑关联的。验证数据)
    |-- 命名根据资源命名
    |-- user(s).js （user(s).router.js）
    |-- task.js
|-- models/ (数据模型) (数据库才做)CRUD， ORM(object relational mapping)
    |-- User.js (User.model.js) (user.js)
    |-- Task.js
|-- middleware/
    |-- cors
    |-- errorHandling
|-- utils/
    |-- helper function (公用的，或者和 server 相关的)
    |-- db connection

小 project：routers 和 controller 合并
大 project：services（从 controller 里拆出来）
根据 business logics

-- src/
|-- users/
|-- user.module.js
|-- user.controller.js
|-- user.router.js
|-- tasks/
|-- ...

导入时，const router = require('/routes/index'). 如果导入 index。js，index 可以省略
