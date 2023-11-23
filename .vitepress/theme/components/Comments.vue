<template>
  <div :class="$style.giscus">
    <Giscus
      v-if="giscusOptions.show"
      repo="Octobug/blog"
      :repo-id="giscus.repo_id"
      category="Announcements"
      :category-id="giscus.category_id"
      mapping="title"
      strict="1"
      reactions-enabled="1"
      emit-metadata="0"
      input-position="top"
      :theme="giscusOptions.theme"
      lang="en"
    />
  </div>
</template>

<script lang="ts" setup>
import Giscus from "@giscus/vue";
import { onContentUpdated, useData } from "vitepress";
import { ref } from "vue";

const { isDark, theme } = useData();
const { giscus } = theme.value;

function getGiscusTheme() {
  return isDark.value ? "dark" : "light";
}

const giscusOptions = ref({
  theme: getGiscusTheme(),
  show: false,
});

function reloadGiscus() {
  // I cannot tolerate the color flash when switching, so I choose to reload it.
  giscusOptions.value = {
    theme: getGiscusTheme(),
    show: false
  };
  setTimeout(() => {
    giscusOptions.value.show = true;
  }, 1);
}

onContentUpdated(() => {
  reloadGiscus();
  const observer = new MutationObserver(reloadGiscus);
  const element = document.querySelector("button.VPSwitchAppearance");
  if (!element) return;
  observer.observe(element, { attributes: true });
});
</script>

<style module scoped>
.giscus {
  margin-top: 1.5rem;
  display: grid;
  grid-row-gap: 8px;
}
</style>
