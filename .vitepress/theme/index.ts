// https://vitepress.dev/guide/custom-theme
import Theme from "vitepress/theme";
import "./style.css";
import Home from "./pages/Home.vue";
import Layout from "./pages/Layout.vue";
import Posts from "./pages/Posts.vue";
import Sorts from "./pages/Sorts.vue";
import Tags from "./pages/Tags.vue";
import PostElements from "./components/PostElements.vue";

export default {
  extends: Theme,
  Layout,
  enhanceApp({ app }) {
    app.component("Home", Home);
    app.component("Posts", Posts);
    app.component("Sorts", Sorts);
    app.component("Tags", Tags);
    app.component("PostElements", PostElements);
  },
};
