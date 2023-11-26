// https://vitepress.dev/guide/custom-theme
import Theme from "vitepress/theme";
import "./style.css";
import Home from "./pages/Home.vue";
import Layout from "./pages/Layout.vue";
import Posts from "./pages/Posts.vue";
// import Tags from "./components/Tags.vue";

export default {
  extends: Theme,
  Layout,
  enhanceApp({ app }) {
    app.component("Home", Home);
    app.component("Posts", Posts);
  },
};
