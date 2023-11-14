// https://vitepress.dev/guide/custom-theme
import Theme from "vitepress/theme";
import "./style.css";
// import Archives from "./components/Archives.vue";
// import Tags from "./components/Tags.vue";
import Home from "./pages/Home.vue";
import Layout from "./pages/Layout.vue";

export default {
  extends: Theme,
  Layout,
  enhanceApp({ app }) {
    app.component("Home", Home);
  },
};
