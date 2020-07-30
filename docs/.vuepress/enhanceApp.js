import Element from "element-ui";
import Fullscreen from "vue-fullscreen";
import VueClipboard from "vue-clipboard2";
import "element-ui/lib/theme-chalk/index.css";

export default ({ Vue }) => {
  VueClipboard.config.autoSetContainer = true;

  Vue.use(Element);
  Vue.use(Fullscreen);
  Vue.use(VueClipboard);
};
