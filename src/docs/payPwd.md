# hBreadcrumb 面包屑 

----
### 概述

- pc平台支付场景应用6位密码框

### 基础用法

- 
<div class="demo-block">
  <h-pay-pwd 
  :isCursor = "isCursor"
  :pwdWidth = 300
  :pwdHeight = 38
  :getPassword = "payPw">
  </h-pay-pwd>
  <div>获取支付密码：{{getPassword}}</div>
</div>
<script>
export default {
  data () {
    return {
      msg: 'Welcome to my vue-pay-pwd',
      isCursor:true,//是否开启光标
      getPassword:null,
    }
  },
  methods: {
    payPw(pw){
      this.getPassword = pw
    }
  }
}
</script>

:::demo 

```html
<template>
  <div>
   <h-pay-pwd 
    :isCursor = "isCursor"
    :pwdWidth = "300"
    :pwdHeight = "38"
    :getPassword = "payPw">
    </h-pay-pwd>
    <div>获取支付密码：{{getPassword}}</div>
  </div>
</template>
```
```javascript
<script>
  export default {
    data () {
      return {
        msg: 'Welcome to my vue-pay-pwd',
        isCursor:true,//是否开启光标
        getPassword:null,
      }
    },
    methods: {
      payPw(pw){
        this.getPassword = pw
      }
    }
  }
</script>
```

:::

### Attributes

| 参数        | 说明          | 类型      |  默认值  |  备注 |
|----------  |-------------- |---------- |--------------------------------  |-------- | --|
| getPassword | 拿到一个密码参数，建议必填 | Function | function | 非        |
| isCursor    | 是否显示光标        | Boolean  | true     | 非        |
| pwdWidth    | 设置宽度          | Number   | 260      | 非        |
| pwdHeight   | 设置高度          | Number   | 36       | 非        |