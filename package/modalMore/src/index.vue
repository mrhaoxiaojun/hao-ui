
<template>
  <div class="h-modal-widget-wrap" ref="modalDom" v-show="!widgetSmallShow">
    <div
      ref="modalDomInner"
      :class="['h-modal-widget',widgetSmallShow?'widget-wrap widgetSmall':'widget-wrap']"
      draggable
      :width="widgetBigShow ? widgetSizes.maxW : widgetSizes.defaultW"
    >
      <!-- header -->
      <div class="widgetHead" ref="modalHeader" @mousedown="handleMoveStart">
        <!-- icon -->
        <i
          v-if="widgetSmallShow"
          :type="widgetIconStyle.iconType"
          :class="widgetIconStyle.iconClass"
          @click="widgetNormal"
        ></i>

        <i :type="widgetIconStyle.iconType" :class="widgetIconStyle.iconClass"></i>
        <!-- title -->
        <span v-if="!widgetSmallShow" class="title">{{widgetTitle}}</span>
        <!-- 操作区域 -->
      </div>
      <div class="handleDom">
        <span v-if="widgetMinShow" @click="widgetSmall">最小化</span>
        <span v-if="widgetNormalShow" @click="widgetBig">最大化</span>
        <span v-if="widgetBigShow" @click="widgetNormal">还原</span>
        <span @click="widgetClose">关闭</span>
      </div>
      <!-- body -->
      <div class="h-modal-body" ref="modalBody">
        <slot name="widgetBody"></slot>
      </div>
      <!-- footer -->
      <div class="widget-footer">
        <img
          class="widget-resize"
          v-if="!widgetBigShow"
          @mousedown.stop.prevent="mousedownResize($event)"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAAtUlEQVR42mL8//8/AyUAIICYGCgEAAFEtAFnz551AuKTQJyALA4QQKS4oA6IzYC4C1kQIIBIMWAZEP+F0nAAEECMlAYiQACx4PMzkGoH4unGxsYLZs2aBeenpaUtgKkDCCAmEvyMNQwAAoiJBD9jDQOAAKI4DAACiAlXPKenpzsB8UkgBvMZGRmdgPgkEKOkA4AAYiLBz1jDACCAmEjwM9YwAAggisMAIIAozkwAAUSxAQABBgCBl0L7jJdTdgAAAABJRU5ErkJggg=="
          alt
        />
        <div class="frame" v-show="is_moving"></div>
      </div>
    </div>
    <div class="mx-modal-mask" ref="maskDom" v-if="is_showMask"></div>
  </div>
</template>

<script>
import { on, off } from "./dom";
export default {
  name: "HModalMore",
  props: {
    // 当前窗体使用数据-（配合widgetResize回调使用）
    data: {
      type: Object,
      default: () => {}
    },
    // 是否显示
    widgetShowProps: {
      type: Boolean,
      default: true
    },
    // 窗体title
    widgetTitle: {
      type: String,
      default: "test"
    },
    // 窗体title部分icon
    widgetIconStyle: {
      type: Object,
      default: () => {
        return {
          iconType: "h-icon-app",
          iconClass: "h-icon-app"
        };
      }
    },
    widgetSize: {
      type: Object,
      default: () => {
        return {
          defaultW: null, // 默认地图宽度
          defaultH: null, // 不设置高度
          maxW: null, // 默认地图宽度
          maxH: null, // 默认地图高度
          minW: null, // 默认150
          minH: null // 默认150
        };
      }
    },
    // 顶部-头DOM id
    getDocTopdomid: {
      type: String,
      default: "common-header"
    },
    // 左侧-菜单DOM id
    getDocLeftdomid: {
      type: String,
      default: "view-tree-left"
    },
    // 右侧工作区DOM id
    getDocRightdomid: {
      type: String,
      default: "view-tree-right"
    },
    // 是否停靠至-工作区左边
    stopWorkspaceLeft: {
      type: Boolean,
      default: false
    },
    // 是否停靠至-窗体底部边
    stopDocBottom: {
      type: Boolean,
      default: false
    },
    // 多窗体距离窗体的top距离-（如果stopWinBottom为true的时候失效）
    stopDocTop: {
      type: Number,
      default: 100
    },
    // 是否支持最小化按钮-最小化需要配合widgetSmall回调函数在父页面进行数据集合维护，然后用集合做菜单
    widgetMinShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      widgetShow: this.widgetShowProps,
      widgetNormalShow: true,
      widgetSmallShow: false,
      widgetBigShow: false,
      is_moving: false,
      is_showMask: true,
      dragging: false,
      widgetSizes: this.widgetSize,
      oldLocate: {
        left: 0,
        top: 0,
        width: 0,
        height: 0
      }
    };
  },
  watch: {
    widgetShowProps(val) {
      this.widgetShow = val;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.computedSize();
      this.computedLocate();
    });
  },
  methods: {
    // 关闭
    widgetClose() {
      this.widgetSmallShow = false;
      this.widgetBigShow = false;
      this.widgetNormalShow = false;
      this.widgetShow = false;
      this.$emit("widgetClose");
    },
    // 最小化
    widgetSmall(event) {
      this.getLocate();
      this.widgetNormalShow = false;
      this.widgetSmallShow = true;
      this.widgetBigShow = false;
      this.$emit("widgetSmall");
    },
    // 最大化
    widgetBig(event) {
      this.getLocate();
      this.widgetNormalShow = false;
      this.widgetSmallShow = false;
      this.widgetBigShow = true;
      this.getDom().left = `${document.getElementById(this.getDocLeftdomid)
        .offsetWidth + 10}px`;
      this.getDom().top = `${document.getElementById(this.getDocTopdomid)
        .offsetHeight + 10}px`;
      this.getDom().width = `${this.widgetSizes.maxW}px`;
      this.getDom().height = `${this.widgetSizes.maxH}px`;
      // h-modal-body 重置最大
      this.getDom("h-modal-body").height = `${this.widgetSizes.maxH - 24}px`;
      this.$emit("widgetResize", {
        event: event,
        data: this.data,
        size: {
          width: this.getDom().width,
          height: this.getDom().height
        }
      });
    },
    // 正常化
    widgetNormal(event) {
      this.getDom().left = this.oldLocate.left;
      this.getDom().top = this.oldLocate.top;
      this.getDom().width = this.widgetSizes.defaultW = this.oldLocate.width;
      this.getDom().height = this.oldLocate.height;
      this.getDom("h-modal-body").height = this.oldLocate.height
        ? `${Number(this.oldLocate.height.split("p")[0]) - 24}px`
        : "auto";
      this.widgetNormalShow = true;
      this.widgetSmallShow = false;
      this.widgetBigShow = false;
      this.$emit("widgetResize", {
        event: event,
        data: this.data,
        size: {
          width: this.getDom().width,
          height: this.getDom().height
        }
      });
    },
    handleMoveStart(event) {
      this.dragging = true;
      // 鼠标的位置,参照modal左上角
      this.moveStartX = event.clientX - this.$refs.modalDomInner.offsetLeft ;
      this.moveStartY = event.clientY - this.$refs.modalDomInner.offsetTop;
      on(window, "mousemove", this.handleMoveMove);
      on(window, "mouseup", this.handleMoveEnd);
    },
    handleMoveMove(event) {
      if (!this.dragging) return false;
      this.$refs.maskDom.style["pointer-events"] = "all";
      event.preventDefault();
      // 得到鼠标拖动的x,y距离
      let distX = event.clientX - this.moveStartX;
      let distY = event.clientY - this.moveStartY;
      this.getDom().left = distX + "px";
      this.getDom().top = distY + "px";
    },
    handleMoveEnd() {
      this.dragging = false;
      this.$refs.maskDom.style["pointer-events"] = "none";
      // 处理上下边界
      if (Number(this.getDom().top.split("p")[0]) <= 0) {
        this.getDom().top = 0;
      }
      if (Number(this.getDom().top.split("p")[0]) >= document.body.clientHeight) {
        this.getDom().top = `${document.body.clientHeight - 50}px`;
      }
      off(window, "mousemove", this.handleMoveMove);
      off(window, "mouseup", this.handleMoveEnd);
    },
    mousedownResize(event) {
      this.$nextTick(() => {
        this.targetDiv = this.$refs.modalDomInner;
        this.frameDiv = event.target.nextElementSibling; // 线框dom
        this.headerHeight = this.$refs.modalHeader.offsetHeight; // modal header height
        this.is_moving = true;
        // 配置靠底部，拖拽需要设置top默认值
        if (this.stopDocBottom) {
          this.getDom().top = `${this.getDom("h-modal-widget","offsetTop")}px`;
        }
        // 得到点击时该地图容器的宽高：
        this.targetDivWidth = this.targetDiv.offsetWidth;
        this.targetDivHeight = this.targetDiv.offsetHeight;
        // 鼠标的位置
        this.startX = event.clientX;
        this.startY = event.clientY;
        on(window, "mousemove", this.mousemoveResize);
        on(window, "mouseup", this.mouseupResize);
      });
    },
    mousemoveResize(event) {
      if (!this.is_moving) return false;
      this.$refs.maskDom.style["pointer-events"] = "all";
      event.preventDefault();
      // 得到鼠标拖动的宽高距离
      var distX = event.clientX - this.startX;
      var distY = event.clientY - this.startY;
      // 往右上方拖动：

      this.frameDiv.style.width = this.targetDivWidth + distX + "px";
      this.frameDiv.style.height = this.targetDivHeight + distY + "px";
      // 设置最小范围：不能无限制缩放，影响体验
      if (parseInt(this.frameDiv.style.width) <= this.widgetSizes.minW) {
        this.frameDiv.style.width = this.widgetSizes.minW + "px";
      }
      if (parseInt(this.frameDiv.style.height) <= this.widgetSizes.minH) {
        this.frameDiv.style.height = this.widgetSizes.minH + "px";
      }

      // 最大范围
      // if (parseInt(this.frameDiv.style.width) >= this.widgetSizes.maxW) {
      //   this.frameDiv.style.width = this.widgetSizes.maxW + 'px'
      // }
      // if (parseInt(this.frameDiv.style.height) >= this.widgetSizes.maxH) {
      //   this.frameDiv.style.height = this.widgetSizes.maxH + 'px'
      // }
    },
    mouseupResize(e) {
      this.targetDiv.style.width = this.frameDiv.style.width;
      this.targetDiv.style.height = this.frameDiv.style.height;
      this.$refs.modalBody.style.height = `${this.frameDiv.offsetHeight -
        this.headerHeight}px`;

      // resize 事件回调
      this.$emit("widgetResize", {
        event: event,
        data: this.data,
        size: {
          width: this.frameDiv.style.width,
          height: this.frameDiv.style.height
        }
      });
      this.is_moving = false;
      if (this.$refs.maskDom)
        this.$refs.maskDom.style["pointer-events"] = "none";
      off(window, "mousemove", this.mousemoveResize);
      off(window, "mouseup", this.mouseupResize);
    },
    // 获取content
    getDom(className = "h-modal-widget", attr = "style") {
      return this.$refs.modalDom.getElementsByClassName(className)[0][attr];
    },
    // 初始化计算尺寸
    computedSize() {
      this.widgetSizes = this.widgetSize;
      this.widgetSizes.defaultW = this.widgetSizes.defaultW
        ? this.widgetSizes.defaultW
        : document.getElementById(this.getDocRightdomid).offsetWidth - 20;
      this.getDom().width = `${this.widgetSizes.defaultW}px`;

      if (this.widgetSizes.defaultH)
        this.getDom().height = `${this.widgetSizes.defaultH}px`;
      this.widgetSizes.maxW = this.widgetSizes.maxW
        ? this.widgetSizes.maxW
        : document.getElementById(this.getDocRightdomid).offsetWidth - 20;
      this.widgetSizes.maxH = this.widgetSizes.maxH
        ? this.widgetSizes.maxH
        : document.getElementById(this.getDocRightdomid).offsetHeight - 60;
      this.widgetSizes.minW = this.widgetSizes.minW
        ? this.widgetSizes.minW
        : 150;
      this.widgetSizes.minH = this.widgetSizes.minH
        ? this.widgetSizes.minH
        : 150;
      this.getLocate();
    },
    // 初始化位置信息
    computedLocate() {
      if (this.stopWorkspaceLeft) {
        this.getDom().left = `${document.getElementById(this.getDocLeftdomid)
          .offsetWidth + 5}px`;
      } else {
        this.getDom().left =
          (document.getElementById(this.getDocRightdomid).offsetWidth -
            this.widgetSizes.defaultW) /
            2 +
          document.getElementById(this.getDocLeftdomid).offsetWidth +
          "px";
      }
      if (this.stopDocBottom) {
        this.getDom().bottom = "5px";
      } else {
        this.getDom().top = `${this.stopDocTop}px`;
      }
    },
    // 记录上一次位置
    getLocate() {
      this.oldLocate = {
        left: this.getDom().left,
        top: this.getDom().top,
        width: this.getDom().width,
        height: this.getDom().height
      };
    }
  }
};
</script>>
<style lang="less" scoped src="./_.less" />
