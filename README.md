使用github登陆你的应用，OAuth认证教程

## 注册应用
前往注册 : https://github.com/settings/applications/new

![](https://www.wangbase.com/blogimg/asset/201904/bg2019042102.jpg)

- "Application name" : 你的应用名称
- "Homepage URL" ：输入http://localhost:8080/
- "callback URL" : 输入http://localhost:8080/oauth/redirect

注册后你将获得 client_id 和 client_secret

## 获取代码

```
  $ git clone https://github.com/ounana/oath-example.git
  $ cd oauth-example

  修改配置
  index.js: 替换 clientID 和 clientSecret 的值。

  安装依赖
  $ npm install
```

## 运行服务
```
  $ node index.js

  在浏览器中访问 http://localhost:8080，然后点击链接登陆你的github。
```
