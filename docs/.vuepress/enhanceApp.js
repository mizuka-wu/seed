import Element from "element-ui";
import VueClipboard from "vue-clipboard2";
import "element-ui/lib/theme-chalk/index.css";
import Seed from "#/index";

export default ({ Vue }) => {
  VueClipboard.config.autoSetContainer = true;
  
  Vue.use(Seed);
  Vue.use(Element);
  Vue.use(VueClipboard);
};
