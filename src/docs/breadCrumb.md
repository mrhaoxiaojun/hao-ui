# hBreadcrumb 面包屑 

----

### 代码示例

<template>
  <h-bread-crumb :breadcrumb="breadcrumb"></h-bread-crumb>
</template>

<script>
export default {
  data () {
    return {
      breadcrumb:[
          {
            bcName:"home",
            path:"/"
          },
          {
            bcName:"hello",
            name:"message"
          },
        ]
    }
  },
}
</script>
<style lang="less" scoped>
</style>

### 概述
显示网站的层级结构，告知用户当前所在位置，以及在需要向上级导航时使用。

### 基本用法


```html
<h-bread-crumb :breadcrumb ="breadcrumb"></h-bread-crumb>
```

### breadcrumb 来源

通过当前路由和菜单信息做对比，得到,数组对象，支持路由的name和path两种，切记多语言的情况，bcName需要传递多语言后的名字

```js
data() {
  return {
    menuList:{...},
    breadcrumb:[]
  }
}，
mounted() {
  this.initcb();
},
watch: {
  $route(to, from) {
    this.initcb();
  }
},
initcb() {
  根据this.$route和this.menuList 写的递归，得出当前面包屑路径
},
```

### Options

| 参数        | 说明          | 类型      | 可选值                           | 默认值  |  备注 |
|----------  |-------------- |---------- |--------------------------------  |-------- | --|
| breadcrumb | 数据list | Array | — | — | [{bcName:"home",path:"/"}] or [{bcName:"home",name:"/"}] 路由支持name和path


