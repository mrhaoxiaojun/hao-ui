
import Button from './button/index.js';
import collapseTransition from './collapse-transition/collapse-transition.js';
import Message from './message/index.js';
import BreadCrumb from './breadCrumb/index'
import ModalMore from './ModalMore/index'


const components = [
  Button,
  BreadCrumb,
  ModalMore,
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
  collapseTransition,
}
