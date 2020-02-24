# modalMore

----
- 多窗体modal组件，目的是为了实现多窗体-提供拖拽、最大化、最小化、还原、关闭、resize

### 基础用法

- 示例（代码内容基本解释了用法）来自于不同类型的或相同类型的窗体，我们将已显示的窗体进行主键重组统一维护，并提供最小化到地址栏

<div class="demo-block">
  <HButton @click="open({'type':'formView','id':'1','displayName':'fv1','stopWorkspaceLeft':true,'moreData':'...'})">
    fromView1-靠左
  </HButton>
  <HButton @click="open({'type':'formView','id':'2','displayName':'fv2','stopDocBottom':true,'moreData':'...'})">
    fromView2-靠下
  </HButton>
  <HButton @click="open({'type':'tableView','id':'1','displayName':'tb1','stopDocTop':300,'moreData':'...'})">
    tableView1-top300
  </HButton>
  <HButton @click="open({'type':'tableView','id':'2','displayName':'tb2','moreData':'...'})">
    tableView2-默认top100-工作区水平居中，高度auto
  </HButton>
  ......
</div>
<!-- 不同类型的模态框 -->
<h-modal-more
  v-for="(item,index) in viewData.formView" :key="item.feMainId"
  :ref="item.feMainId"
  :widgetShowProps="item.isShow"
  :widgetTitle="item.displayName"
  :widgetIconStyle="{iconClass:'h-icon-app'}"
  :stopWorkspaceLeft = "item.stopWorkspaceLeft"
  :stopDocBottom = "item.stopDocBottom"
  @widgetSmall ="(item.widgetSmall)(item,index)"
  @widgetClose="(item.widgetClose)(item.type,index)"
  getDocTopdomid ="common-header"
  getDocLeftdomid ="app-main-left"
  getDocRightdomid ="app-main-right"
  :widgetSize = "{defaultH:300,maxH:500}"
>
  <template v-slot:widgetBody>
    hello 大家好，我是来自于 类型：formView模态框，配置了默认高度300和最大高度500，并且可以根据循数据各自定义各项配置，例如：我都第一个兄弟是停靠在工作区左侧，第二个兄弟是停靠在document底部
  </template>
</h-modal-more>
<h-modal-more
  v-for="(item,index) in viewData.tableView" :key="item.feMainId"
  :ref="item.feMainId"
  :widgetShowProps="item.isShow"
  :widgetTitle="item.displayName"
  :widgetIconStyle="{iconType:'h-icon-app'}"
  :stopDocTop = "item.stopDocTop"
  @widgetSmall ="(item.widgetSmall)(item,index)"
  @widgetClose="(item.widgetClose)(item.type,index)"
  getDocTopdomid ="common-header"
  getDocLeftdomid ="app-main-left"
  getDocRightdomid ="app-main-right"
>
  <template v-slot:widgetBody>
     hello 大家好，我是来自于 类型：TableView模态框，默认宽（工作区宽度保留10px间距）高，并且可以根据循数据各自定义各项配置，例如：我都第一个兄弟距离document距离300
  </template>
</h-modal-more>
<!-- 状态bar -->
<div class="status-bar"  v-if="viewStatusBar.length>0">
  <div class="item" v-for="(item,index) in viewStatusBar" @click="sendSubviewEmit(item.feMainId,index)"> {{item.feMainId.split("#")[0]}} </div>
</div>
<script>
  export default {
    data(){
      return {
        viewData:{
          formView:[],
          tableView:[]
        },
        viewStatusBar:[]
      }
    },
    methods: {
      open(data){
        if(!this.getIncludeId(this.viewData[data.type],data)) {
          // 将参数传给子View
          data.isShow = true
          // 关闭回调
          data.widgetClose= (type,index)=>{
            // - bar状态
            this.viewStatusBar.forEach((ele,i,ary)=>{
              ele.feMainId === this.viewData[type][index].feMainId && ary.splice(i,1)
            })
            this.viewData[type].splice(index,1)
          }
          // 最小化回调
          data.widgetSmall = (arr) => {
            // + bar状态
            !this.dealRepeat(arr,"feMainId") && this.viewStatusBar.push(arr)
            // .....
          }
          // 类型不同或相同的窗体 - 前端自定义所有子已经显的窗体添加主键id--用来唯一性区分
          data.feMainId = `${data.type}-${data.displayName}#${Date.parse(new Date())}`
          // 给对应类型窗体添加显示数据
          this.viewData[data.type].push(data)
        }
      },
      // 判断是否重新打开
      getIncludeId(list,data){
          let flag = false
          list.forEach(item => {
            // 不管用一个id区分还是多个字段识别，能区分出来当前点击出来的弹出框即可
            if(item.id === data.id && item.type === data.type) flag = true
          })
          console.log(list,data)
          return flag
      },
      // 判断是否重复-hxj
      dealRepeat(arr,name){
        let flag = false
        if(this.viewStatusBar.length <= 0) return flag
        this.viewStatusBar.forEach((ele)=>{
          arr[name] === ele[name] && (flag = true)
        })
        return flag
      },
      // 正常化模态框-hxj
      sendSubviewEmit(feMainId,index){
        this.$refs[feMainId][0].widgetNormal()
        this.viewStatusBar.splice(index,1)
      }
    }
  }
</script>

<style lang="stylus" scoped>
.status-bar{
  position: fixed;
  bottom: 0;
  right: 0;
  left:260px;
  width: 100%;
  z-index: 9999;
  padding: 0 4px;
  white-space: nowrap;
  overflow-y: auto;
  transition: all .5s cubic-bezier(.55,0,.1,1);
  /*定义滑块 内阴影+圆角*/
  &::-webkit-scrollbar-thumb {
    background-color: rgb(240, 187, 205);
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #515a6e;
  }
  &::after{
    content: "";
    position: absolute;
    z-index: -1;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    background: #da1d1d;
    height: 3px;
    animation: move 1s linear;
  } 
  @keyframes move {
    0% {
      left: -100%;
    }
    100% {
      left: 0;
    }
  }
  .item{
    display: inline-block;
    padding:5px 10px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background: steelblue;
    margin-right: 4px;
    color: #fff;
    cursor: pointer;
    user-select: none;
  }
}
</style>

:::demo 

```html
<template>
  <div>
    <HButton @click="open({'type':'formView','id':'1','displayName':'fv1','stopWorkspaceLeft':true,'moreData':'...'})">
      fromView1-靠左
    </HButton>
    <HButton @click="open({'type':'formView','id':'2','displayName':'fv2','stopDocBottom':true,'moreData':'...'})">
      fromView2-靠下
    </HButton>
    <HButton @click="open({'type':'tableView','id':'1','displayName':'tb1','stopDocTop':300,'moreData':'...'})">
      tableView1-top300
    </HButton>
    <HButton @click="open({'type':'tableView','id':'2','displayName':'tb2','moreData':'...'})">
      tableView2-默认top100-工作区水平居中，高度auto
    </HButton>

    <!-- 不同类型的模态框 -->
    <h-modal-more
      v-for="(item,index) in viewData.formView" :key="item.feMainId"
      :ref="item.feMainId"
      :widgetShowProps="item.isShow"
      :widgetTitle="item.displayName"
      :widgetIconStyle="{iconClass:'h-icon-app'}"
      :stopWorkspaceLeft = "item.stopWorkspaceLeft"
      :stopDocBottom = "item.stopDocBottom"
      @widgetSmall ="(item.widgetSmall)(item,index)"
      @widgetClose="(item.widgetClose)(item.type,index)"
      getDocTopdomid ="common-header"
      getDocLeftdomid ="app-main-left"
      getDocRightdomid ="app-main-right"
      :widgetSize = "{defaultH:300,maxH:500}"
    >
      <template v-slot:widgetBody>
        hello 大家好，我是来自于 类型：formView模态框，配置了默认高度300和最大高度500，并且可以根据循数据各自定义各项配置，例如：我都第一个兄弟是停靠在工作区左侧，第二个兄弟是停靠在document底部
      </template>
    </h-modal-more>
    <h-modal-more
      v-for="(item,index) in viewData.tableView" :key="item.feMainId"
      :ref="item.feMainId"
      :widgetShowProps="item.isShow"
      :widgetTitle="item.displayName"
      :widgetIconStyle="{iconType:'h-icon-app'}"
      :stopDocTop = "item.stopDocTop"
      @widgetSmall ="(item.widgetSmall)(item,index)"
      @widgetClose="(item.widgetClose)(item.type,index)"
      getDocTopdomid ="common-header"
      getDocLeftdomid ="app-main-left"
      getDocRightdomid ="app-main-right"
    >
      <template v-slot:widgetBody>
        hello 大家好，我是来自于 类型：TableView模态框，默认宽（工作区宽度保留10px间距）高，并且可以根据循数据各自定义各项配置，例如：我都第一个兄弟距离document距离300
      </template>
    </h-modal-more>
    <!-- 状态bar -->
    <div class="status-bar"  v-if="viewStatusBar.length>0">
      <div class="item" v-for="(item,index) in viewStatusBar" @click="sendSubviewEmit(item.feMainId,index)"> {{item.feMainId.split("#")[0]}} </div>
    </div>
  </div>
</template>
```
```javascript
<script>
  export default {
     data(){
      return {
        viewData:{
          formView:[],
          tableView:[]
        },
        viewStatusBar:[]
      }
    },
    methods: {
      open(data){
        if(!this.getIncludeId(this.viewData[data.type],data)) {
          // 将参数传给子View
          data.isShow = true
          // 关闭回调
          data.widgetClose= (type,index)=>{
            // - bar状态
            this.viewStatusBar.forEach((ele,i,ary)=>{
              ele.feMainId === this.viewData[type][index].feMainId && ary.splice(i,1)
            })
            this.viewData[type].splice(index,1)
          }
          // 最小化回调
          data.widgetSmall = (arr) => {
            // + bar状态
            !this.dealRepeat(arr,"feMainId") && this.viewStatusBar.push(arr)
            // .....
          }
          // 类型不同或相同的窗体 - 前端自定义所有子已经显的窗体添加主键id--用来唯一性区分
          data.feMainId = `${data.type}-${data.displayName}#${Date.parse(new Date())}`
          // 给对应类型窗体添加显示数据
          this.viewData[data.type].push(data)
        }
      },
      // 判断是否重新打开
      getIncludeId(list,data){
          let flag = false
          list.forEach(item => {
            // 不管用一个id区分还是多个字段识别，能区分出来当前点击出来的弹出框即可
            if(item.id === data.id && item.type === data.type) flag = true
          })
          console.log(list,data)
          return flag
      },
      // 判断是否重复-hxj
      dealRepeat(arr,name){
        let flag = false
        if(this.viewStatusBar.length <= 0) return flag
        this.viewStatusBar.forEach((ele)=>{
          arr[name] === ele[name] && (flag = true)
        })
        return flag
      },
      // 正常化模态框-hxj
      sendSubviewEmit(feMainId,index){
        this.$refs[feMainId][0].widgetNormal()
        this.viewStatusBar.splice(index,1)
      }
    }
  }
</script>
```
```css
<style lang="stylus" scoped>
.status-bar{
  position: fixed;
  bottom: 0;
  right: 0;
  left:260px;
  width: 100%;
  z-index: 9999;
  padding: 0 4px;
  white-space: nowrap;
  overflow-y: auto;
  transition: all .5s cubic-bezier(.55,0,.1,1);
  /*定义滑块 内阴影+圆角*/
  &::-webkit-scrollbar-thumb {
    background-color: rgb(240, 187, 205);
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #515a6e;
  }
  &::after{
    content: "";
    position: absolute;
    z-index: -1;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    background: #da1d1d;
    height: 3px;
    animation: move 1s linear;
  } 
  @keyframes move {
    0% {
      left: -100%;
    }
    100% {
      left: 0;
    }
  }
  .item{
    display: inline-block;
    padding:5px 10px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background: steelblue;
    margin-right: 4px;
    color: #fff;
    cursor: pointer;
    user-select: none;
  }
}
</style>

```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| data     | 当前窗体使用数据-（**配合widgetResize回调使用**）   | Object  |   —    |    {}     |
| widgetShowProps     | 是否显示   | Boolean  |   必填    |    false     |
| widgetTitle     | 窗体title   | String    |   — |     test    |
| widgetIconStyle     | 窗体title部分icon   | Object    | — | { iconType: 'ios-albums', iconClass: 'iconfont icon-loudou' }   |
| widgetSize     | 传入尺寸（**每个字段均为Number类型**）   | Object    | — |  { defaultW: 默认右侧工作区域宽度, defaultH: auto, maxW: 默认右侧工作区域宽度, maxH: 默认右侧工作区域高度, minW: 默认150, minH:默认150 }   |
| getDocTopdomid     | 顶部-头DOM id   | String    | 请给自己对应div添加id | common-header   |
| getDocLeftdomid     | 左侧-菜单DOM id   | String    | 请给自己对应div添加id | view-tree-left   |
| getDocRightdomid  | 右侧工作区DOM id    | String   | 请给自己对应div添加id   | view-tree-right   |
| stopWorkspaceLeft  | 是否停靠至-工作区左边    | Boolean   | —   | false   |
| stopDocBottom  | 是否停靠至-窗体底部边   | Boolean   | —   | false  |
| stopDocTop  | 多窗体距离窗体的top距离-（如果stopDocBottom为true的时候失效）    | Number   | —   | 100   |
| widgetMinShow  | 是否支持最小化按钮-最小化需要配合widgetSmall回调函数在父页面进行数据集合维护，然后用集合做菜单 | Boolean   |  —  |  true  |
| widgetClose  | 关闭回调 | Funcion   |  —  |  —  |
| widgetSmall  | 最小化回调 | Funcion   |  —  |  —  |
| widgetResize  | 多窗体拉伸回调**请务必传入data参数**，参数：{event:事件,data：数据源,size：当前宽高} | Funcion   |  —  |  —  |