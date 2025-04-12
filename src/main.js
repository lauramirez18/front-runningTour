import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { Quasar } from "quasar";
import { router } from "./router/routes.js";
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import "quasar/src/css/index.sass";
import "@quasar/extras/material-icons/material-icons.css";
import { Notify } from "quasar";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedState);
app.use(pinia);
app.use(Quasar, {
  plugins: {
    Notify,
  },
  config: {
    notify: {
      timeout: 5000,
      position: "top",
      /*  classes: 'bg-blue-grey-9 text-white', */
      textColor: "white",
      actions: [{ icon: "close", color: "white" }],
    },
  },
});

app.use(router);
app.mount("#app");
