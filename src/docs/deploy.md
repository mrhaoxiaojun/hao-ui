
# github deploy

----
***如何在 GitHub Pages 上部署 vue-cli 项目 ***

**需要注意的坑（改成相对路径才可以直接访问生成的静态文件）**

 1、修改config => index.js => build => assetsPublicPath 中的'/'成为'./'

 2、在build => util.js 里找到ExtractTextPlugin.extract增加一行：publicPath: '../../'



**所有部署方法的第一步：**

先将本地工程push到远程master分支

**方法一：**

如果你的确想用 gh-pages（或别的什么目录名）的话，以下是一种最简单的方法：将 dist 下的所有文件夹 push 到 gh-pages

```js
  $ npm run build
  $ git checkout -b gh-pages
  $ git add -f dist
  $ git commit -m 'create project'
  $ git subtree push --prefix dist origin gh-pages
```
`dist` 代表子树所在的目录名
`origin` 是 remote name
`gh-pages` 是目标分支名称

**方法二：**

```js
cd dist // 进入dist目录
git init // git 初始化
git checkout -b gh-pages // 创建gh-pages分支
git add . 
git commit -m"init project"
git remote add origin https://github.com//xxx.xx.git // 设置远程仓库地址
git push origin gh-pages // 推送到目标分支gh-pages
```

**方法三**

1、npm 安装gh-pages `npm install gh-pages --save-dev`

2、修改package.json 

​	添加homepage："https//github账户名/github.io/项目名称"

​	scripts 里添加两个命令

```
"predeploy":"npm run build",
"deploy":"gh-pages -d build"
```

添加好之后执行上面两个命令，这样就坐等执行完成，然后再到你的仓库里面的设置看看，是不是发现gh-pages已经发布成功并设置成了github pages

3、运行`npm run deploy` 自动打包并上次到gh-pages分支

4、访问`https//github账户名/github.io/项目名称 ` 部署成功

 **注意：**

> package.json里面homepages影响项目发布后的js的相对路径，因为它编译的时候会改变js和css路径，比如：如果你添加了homepages，那么你发布的js路径就变成了/your-repository/../../xx.js了，否则就会变成/../../xx.js

- 参考：[git subtree push1](https://www.jianshu.com/p/cc053119f119)
- 参考：[git subtree push2](https://segmentfault.com/q/1010000007913675?_ea=1490992)
- 参考：[git init](https://blog.csdn.net/nqmysbd/article/details/88764425)
- 参考：[npm gh-pages](https://segmentfault.com/a/1190000010672318)