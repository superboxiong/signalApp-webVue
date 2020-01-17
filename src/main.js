import Vue from "vue";
import App from "./App.vue";
import VueTouch from "vue-touch";
import router from "./router/index.js";
import store from "./store/index.js";
import "mint-ui/lib/style.css";
import "./assets/css/reset.scss";
// 按需引入部分组件
import MintUI from "mint-ui";
// Vue.component(Cell.name, Cell);
Vue.use(MintUI);
Vue.use(VueTouch, { name: "v-touch" });
Vue.config.productionTip = false;
// 计算htmlfont-size
// (function(doc, win) {
//   var docEl = doc.documentElement,
//     resizeEvt = "orientationchange" in window ? "orientationchange" : "resize",
//     recalc = function() {
//       var clientWidth = docEl.clientWidth;
//       if (!clientWidth) return;
//       if (clientWidth >= 640) {
//         docEl.style.fontSize = "100px";
//       } else {
//         docEl.style.fontSize = 100 * (clientWidth / 640) + "px";
//       }
//     };
//   if (!doc.addEventListener) return;
//   win.addEventListener(resizeEvt, recalc, false);
//   doc.addEventListener("DOMContentLoaded", recalc, false);
// })(document, window);

//

(function() {
  function autoRootFontSize() {
    const width = Math.min(screen.width, document.documentElement.getBoundingClientRect().width);
    document.documentElement.style.fontSize = width > 600 ? "16px" : (width / 750) * 32 + "px";
  }
  window.addEventListener("resize", autoRootFontSize);
  autoRootFontSize();
})();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
