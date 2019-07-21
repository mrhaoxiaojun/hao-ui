
import Button from './button/index.js';
import collapseTransition from './collapse-transition/collapse-transition.js';
import Message from './message/index.js';



const components = [
  Button,
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
  collapseTransition,
}
