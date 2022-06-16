/*
 * @Author: haoxiaojun
 * @Date: 2019-07-08 13:04:18
 * @Description: 注册
 * @LastEditors: haoxiaojun
 * @LastEditTime: 2022-06-16 11:01:21
 */

import Button from './button/index.js';
import collapseTransition from './collapse-transition/collapse-transition.js';
import Message from './message/index.js';
import BreadCrumb from './breadCrumb/index'
import ModalMore from './modalMore/index'
import Tree from './tree/index'
import PayPwd from './payPwd/index'

const components = [
  Button,
  BreadCrumb,
  ModalMore,
  Tree,
  PayPwd,
  collapseTransition,
]

const install = function(Vue) {
  components.map(component => Vue.component(component.name, component))
  Vue.prototype.$message = Message;
}

export default {
  install,
  Button,
  Message,
  BreadCrumb,
  ModalMore,
  Tree,
  PayPwd,
  collapseTransition,
}
