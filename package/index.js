
import Button from './button/index.js';
import collapseTransition from './collapse-transition/collapse-transition.js';
import Message from './message/index.js';
import BreadCrumb from './breadCrumb/index'
import ModalMore from './ModalMore/index'
import PayPwd from './payPwd/index'

const components = [
  Button,
  BreadCrumb,
  ModalMore,
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
  PayPwd,
  collapseTransition,
}
